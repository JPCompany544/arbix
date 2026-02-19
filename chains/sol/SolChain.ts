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

        // 3. Update DB
        await prisma.userWallet.update({
            where: { userId_chain: { userId, chain: this.chain } },
            data: { address }
        });

        return { address, derivationIndex: index };
    }

    /**
     * Monitor for incoming SOL deposits
     * Uses hybrid: Signature scanning (tx history) and Balance polling (delta).
     */
    async monitorDeposits(): Promise<void> {
        try {
            await this.pollSignatureHistory();
            await this.pollBalanceDeltas();
        } catch (err) {
            console.error("[SolChain] Monitor error:", err);
        }
    }

    /**
     * Scan recent signatures for all user wallets
     */
    private async pollSignatureHistory(): Promise<void> {
        const connection = providerRegistry.getSolanaConnection();
        try {
            const wallets = await prisma.userWallet.findMany({ where: { chain: this.chain } });
            for (const wallet of wallets) {
                try {
                    const publicKey = new PublicKey(wallet.address);
                    const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 10 });

                    for (const sig of signatures) {
                        if (sig.err) continue;

                        const existing = await prisma.chainTransaction.findUnique({
                            where: { txHash: sig.signature }
                        });
                        if (existing) continue;

                        const tx = await connection.getParsedTransaction(sig.signature, {
                            maxSupportedTransactionVersion: 0,
                            commitment: "confirmed"
                        });

                        if (!tx?.meta) continue;

                        // Calculate net change for this address
                        const accountIndex = tx.transaction.message.accountKeys.findIndex(
                            ak => ak.pubkey.toBase58() === wallet.address
                        );
                        if (accountIndex === -1) continue;

                        const pre = tx.meta.preBalances[accountIndex] || 0;
                        const post = tx.meta.postBalances[accountIndex] || 0;
                        const diff = post - pre;

                        if (diff > 0) {
                            console.log(`[SolChain] 💰 Found Inbound TX: ${sig.signature} (+${diff / LAMPORTS_PER_SOL} SOL)`);

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
                        }
                    }
                } catch (e) { }
            }
        } catch (e) {
            console.error("[SolChain] Signature poll failed:", e);
        }
    }

    /**
     * Backup poll for balance changes (delta detection)
     */
    private async pollBalanceDeltas(): Promise<void> {
        const connection = providerRegistry.getSolanaConnection();
        try {
            const wallets = await prisma.userWallet.findMany({ where: { chain: this.chain } });
            const activeWallets = wallets.filter(w => w.address && w.address !== "ADDRESS_NOT_GENERATED_YET");
            console.log(`[SolChain] Monitoring ${activeWallets.length} user addresses...`);

            for (const wallet of activeWallets) {
                try {
                    const pubkey = new PublicKey(wallet.address);
                    const balance = await connection.getBalance(pubkey);
                    const previous = BigInt(wallet.lastKnownBalance || "0");
                    const current = BigInt(balance);

                    if (current > previous) {
                        const delta = current - previous;
                        await this.creditDeposit(wallet, delta, "POLLING_DETECTED");
                    } else if (current < previous) {
                        await prisma.userWallet.update({
                            where: { id: wallet.id },
                            data: { lastKnownBalance: current.toString() }
                        });
                    }
                } catch (e) { }
            }
        } catch (e) { }
    }

    private async creditDeposit(wallet: any, delta: bigint, txHash: string): Promise<void> {
        const alreadyCredited = await prisma.ledgerEntry.findFirst({
            where: { referenceId: txHash }
        });
        if (alreadyCredited && txHash !== "POLLING_DETECTED") return;

        console.log(`[SolChain] 💰 Credit: ${delta} lamports for user ${wallet.userId}`);

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
