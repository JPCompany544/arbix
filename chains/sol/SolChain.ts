import { Chain, AddressResult, TxResult } from "../../core/chain-interface";
import {
    Connection,
    PublicKey,
    Keypair,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    LAMPORTS_PER_SOL
} from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import * as bip39 from "bip39";
import { prisma } from "../../lib/prisma";
import { providerRegistry } from "../../core/provider-registry";
import { loadMasterSeed, allocateDerivationIndex, assertServerRuntime } from "../../lib/wallet/utils";
import { getQueue } from "../../lib/wallet/tx-queue";

/**
 * Solana Chain Implementation - Wave 6
 * 
 * Handles all SOL-specific logic including:
 * - Deterministic address derivation (BIP-44/Solana path)
 * - Withdrawal signing and broadcasting
 * - Deposit monitoring (Signature scanning + Balance Delta)
 * - Balance and Fee queries
 */
export class SolChain implements Chain {
    private chain = "SOL" as const;

    /**
     * Generate a unique deposit address for a user
     */
    async generateAddress(userId: string): Promise<AddressResult> {
        await assertServerRuntime();
        const mnemonic = await loadMasterSeed();

        // 1. Check for existing wallet or allocate index
        const existing = await prisma.userWallet.findUnique({
            where: { userId_chain: { userId, chain: this.chain } }
        });

        let index: number;
        if (existing) {
            index = existing.derivationIndex;
            if (existing.address && existing.address !== "ADDRESS_NOT_GENERATED_YET") {
                return { address: existing.address, derivationIndex: index };
            }
        } else {
            index = await allocateDerivationIndex(userId, this.chain);
        }

        // 2. Derive Real Address
        // Solana Path: m/44'/501'/{index}'/0'
        const seed = bip39.mnemonicToSeedSync(mnemonic);
        const path = `m/44'/501'/${index}'/0'`;
        const derived = derivePath(path, seed.toString("hex"));
        const keypair = Keypair.fromSeed(derived.key);
        const address = keypair.publicKey.toBase58();

        // 3. Update DB - Fetch current on-chain balance to establish a baseline
        const connection = providerRegistry.getSolanaConnection();
        const currentBalance = await connection.getBalance(keypair.publicKey).catch(() => 0);

        await prisma.userWallet.update({
            where: { userId_chain: { userId, chain: this.chain } },
            data: {
                address,
                lastKnownBalance: currentBalance.toString()
            }
        });

        return { address, derivationIndex: index };
    }

    /**
     * Monitor for incoming SOL deposits
     * Uses hybrid strategy: 
     * 1. Bulk check balances (1 RPC call)
     * 2. Only if balance increases, scan signatures to find TX (Heavy RPC calls)
     */
    async monitorDeposits(): Promise<void> {
        const connection = providerRegistry.getSolanaConnection();
        try {
            const wallets = await prisma.userWallet.findMany({ where: { chain: this.chain } });
            const activeWallets = wallets.filter(w => w.address && w.address !== "ADDRESS_NOT_GENERATED_YET");

            if (activeWallets.length === 0) return;

            console.log(`[SolChain] Bulk polling ${activeWallets.length} addresses...`);

            // 1. Bulk fetch all account info (Balances) in 1 RPC call
            const publicKeys = activeWallets.map(w => new PublicKey(w.address!));
            const accounts = await connection.getMultipleAccountsInfo(publicKeys);

            for (let i = 0; i < activeWallets.length; i++) {
                const wallet = activeWallets[i];
                const account = accounts[i];

                const current = BigInt(account?.lamports || 0);
                const previous = BigInt(wallet.lastKnownBalance || "0");

                if (current > previous) {
                    const delta = current - previous;
                    console.log(`[SolChain] 📈 Balance increase detected for ${wallet.address} (+${delta} lamports). Searching for TX...`);

                    // Trigger signature scan for this specific wallet to find the TX hash
                    await this.scanTransactionsForWallet(wallet, delta);

                    // Small delay between scans if multiple wallets changed
                    await new Promise(r => setTimeout(r, 2000));
                } else if (current < previous) {
                    // Update baseline if it dropped (likely a sweep or withdrawal)
                    await prisma.userWallet.update({
                        where: { id: wallet.id },
                        data: { lastKnownBalance: current.toString() }
                    });
                }
            }
        } catch (err: any) {
            if (err.message?.includes("429")) {
                console.warn("[SolChain] RPC Rate limited during bulk poll. Waiting 10s...");
                await new Promise(r => setTimeout(r, 10000));
            } else {
                console.error("[SolChain] Monitor error:", err);
            }
        }
    }

    /**
     * Scan recent signatures for a specific wallet that we know has a balance increase
     */
    private async scanTransactionsForWallet(wallet: any, expectedDelta: bigint): Promise<void> {
        const connection = providerRegistry.getSolanaConnection();
        try {
            const publicKey = new PublicKey(wallet.address);
            // Limit to 5 signatures to find the recent deposit
            const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 5 });

            for (const sig of signatures) {
                if (sig.err) continue;

                // Check if already processed
                const existing = await prisma.chainTransaction.findUnique({
                    where: { txHash: sig.signature }
                });
                if (existing) continue;

                // Fetch full TX detail
                const tx = await connection.getParsedTransaction(sig.signature, {
                    maxSupportedTransactionVersion: 0,
                    commitment: "confirmed"
                });

                if (!tx?.meta || !tx.blockTime) continue;

                // Ignore historical transactions before wallet registration
                const txTimeMs = tx.blockTime * 1000;
                if (txTimeMs < wallet.createdAt.getTime() - 120000) continue;

                // Calculate net change for this address in this TX
                const accountIndex = tx.transaction.message.accountKeys.findIndex(
                    ak => ak.pubkey.toBase58() === wallet.address
                );
                if (accountIndex === -1) continue;

                const pre = tx.meta.preBalances[accountIndex] || 0;
                const post = tx.meta.postBalances[accountIndex] || 0;
                const diff = post - pre;

                if (diff > 0) {
                    console.log(`[SolChain] 💰 Found matching TX: ${sig.signature} (+${diff / LAMPORTS_PER_SOL} SOL)`);

                    await prisma.chainTransaction.create({
                        data: {
                            userId: wallet.userId,
                            chain: this.chain,
                            to: wallet.address,
                            amount: (diff / LAMPORTS_PER_SOL).toString(),
                            txHash: sig.signature,
                            blockNumber: BigInt(sig.slot),
                            direction: "INBOUND",
                            status: "BROADCASTED"
                        }
                    });

                    await this.creditDeposit(wallet, BigInt(diff), sig.signature);

                    // If we found a TX that matches or explains the delta, we can stop
                    // (Though there might be multiple deposits, we process them one by one)
                }

                // Respect RPC limits between TX fetches
                await new Promise(r => setTimeout(r, 2000));
            }
        } catch (e: any) {
            if (e.message?.includes("429")) {
                console.warn(`[SolChain] RPC Rate limited scanning ${wallet.address}.`);
                await new Promise(r => setTimeout(r, 5000));
            }
        }
    }

    private async creditDeposit(wallet: any, delta: bigint, txHash: string): Promise<void> {
        // 1. DEDUPLICATION & RECONCILIATION
        if (txHash === "POLLING_DETECTED") {
            // For polling, check if we already credited this user for this amount recently (last 5 mins)
            // Or if there's a real TX that matches this amount already
            const windowStart = new Date(Date.now() - 5 * 60 * 1000);
            const recentMatch = await prisma.ledgerEntry.findFirst({
                where: {
                    userId: wallet.userId,
                    chain: this.chain,
                    amount: delta.toString(),
                    createdAt: { gte: windowStart }
                }
            });
            if (recentMatch) {
                console.log(`[SolChain] Polling detected balance increase, but recent credit of ${delta} exists. Skipping duplicate.`);
                return;
            }
        } else {
            // For real TX hashes, check if we already have it
            const existingHash = await prisma.ledgerEntry.findFirst({
                where: { referenceId: txHash }
            });
            if (existingHash) return;

            // RECONCILIATION: Check if this TX was already credited via POLLING_DETECTED
            // If so, we "upgrade" the polling entry instead of double-crediting
            const windowStart = new Date(Date.now() - 10 * 60 * 1000);
            const pollingMatch = await prisma.ledgerEntry.findFirst({
                where: {
                    userId: wallet.userId,
                    chain: this.chain,
                    amount: delta.toString(),
                    referenceId: "POLLING_DETECTED",
                    createdAt: { gte: windowStart }
                }
            });

            if (pollingMatch) {
                console.log(`[SolChain] Reconciling TX ${txHash} with earlier polling entry ${pollingMatch.id}`);
                await prisma.ledgerEntry.update({
                    where: { id: pollingMatch.id },
                    data: { referenceId: txHash }
                });
                // Chain transaction record still needs to be created, but balance is already updated
                return;
            }
        }

        console.log(`[SolChain] 💰 Credit: ${delta} lamports for user ${wallet.userId} (Ref: ${txHash})`);

        await prisma.$transaction(async (tx) => {
            const balanceObj = await tx.userBalance.findUnique({
                where: { userId_chain: { userId: wallet.userId, chain: this.chain } }
            });
            const oldBal = BigInt(balanceObj?.balance || "0");

            await tx.userBalance.upsert({
                where: { userId_chain: { userId: wallet.userId, chain: this.chain } },
                update: { balance: (oldBal + delta).toString() },
                create: { userId: wallet.userId, chain: this.chain, balance: delta.toString() }
            });

            await tx.ledgerEntry.create({
                data: {
                    userId: wallet.userId,
                    chain: this.chain,
                    type: "DEPOSIT",
                    amount: delta.toString(),
                    referenceId: txHash
                }
            });

            await tx.userWallet.update({
                where: { id: wallet.id },
                data: { lastKnownBalance: (BigInt(wallet.lastKnownBalance || "0") + delta).toString() }
            });
        });
    }

    /**
     * Send SOL withdrawal
     */
    async sendWithdrawal(params: { userId: string; to: string; value: string }): Promise<TxResult> {
        await assertServerRuntime();
        const { userId, to, value } = params;

        // 1. Load Wallet
        const walletRecord = await prisma.userWallet.findUniqueOrThrow({
            where: { userId_chain: { userId, chain: this.chain } }
        });

        // 2. Derive Keypair
        const mnemonic = await loadMasterSeed();
        const seed = bip39.mnemonicToSeedSync(mnemonic);
        const path = `m/44'/501'/${walletRecord.derivationIndex}'/0'`;
        const derived = derivePath(path, seed.toString("hex"));
        const keypair = Keypair.fromSeed(derived.key);

        // 3. Queue and Execute
        const queue = getQueue(keypair.publicKey.toBase58());
        return queue.enqueue(async () => {
            const connection = providerRegistry.getSolanaConnection();
            const lamports = Math.floor(parseFloat(value) * LAMPORTS_PER_SOL);

            console.log(`[SolChain] Broadcasting withdrawal of ${value} SOL to ${to}...`);

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: keypair.publicKey,
                    toPubkey: new PublicKey(to),
                    lamports
                })
            );

            const signature = await sendAndConfirmTransaction(
                connection,
                transaction,
                [keypair],
                { commitment: "confirmed" }
            );

            return { txHash: signature };
        });
    }

    /**
     * Get Address Balance
     */
    async getBalance(address: string): Promise<string> {
        const connection = providerRegistry.getSolanaConnection();
        const bal = await connection.getBalance(new PublicKey(address));
        return bal.toString(); // returns Lamports
    }

    /**
     * Estimate Fee
     */
    async estimateFee(params: { to: string; value: string }): Promise<string> {
        return "5000"; // Standard Solana fee is 5000 lamports
    }

    isValidAddress(address: string): boolean {
        try {
            new PublicKey(address);
            return true;
        } catch {
            return false;
        }
    }

    toSmallestUnit(humanAmount: string): bigint {
        return BigInt(Math.floor(parseFloat(humanAmount) * LAMPORTS_PER_SOL));
    }

    toHumanUnit(smallestAmount: string | bigint): string {
        return (Number(smallestAmount) / LAMPORTS_PER_SOL).toFixed(9);
    }

    getSymbol(): string {
        return "SOL";
    }

    async getTransactionStatus(txHash: string, direction: "INBOUND" | "OUTBOUND"): Promise<{
        status: "PENDING" | "CONFIRMED" | "FAILED",
        confirmations?: number,
        requiredConfirmations?: number,
        blockNumber?: bigint
    }> {
        const connection = providerRegistry.getSolanaConnection();
        let result = await connection.getSignatureStatus(txHash);
        let status = result.value;

        // If not found in cache, check history
        if (!status) {
            const histories = await connection.getSignatureStatuses([txHash], { searchTransactionHistory: true });
            status = histories.value[0];
        }

        if (!status) {
            return { status: "PENDING" };
        }

        if (status.err) {
            return { status: "FAILED" };
        }

        // For Solana, require "finalized" for deposits, "confirmed" is enough for withdrawals
        const requiredStatus = direction === "INBOUND" ? "finalized" : "confirmed";
        const isConfirmed = status.confirmationStatus === "finalized" ||
            (status.confirmationStatus === "confirmed" && requiredStatus === "confirmed");

        return {
            status: isConfirmed ? "CONFIRMED" : "PENDING",
            confirmations: status.confirmations || 0
        };
    }
}
