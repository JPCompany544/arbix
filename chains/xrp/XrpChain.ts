import * as xrpl from "xrpl";
import { Chain, AddressResult, TxResult } from "../../core/chain-interface";
import { prisma } from "../../lib/prisma";
import { networkConfig } from "../../core/network-config";
import { providerRegistry } from "../../core/provider-registry";
import { loadMasterSeed, allocateDerivationIndex, assertServerRuntime } from "../../lib/wallet/utils";

/**
 * XRP Chain Implementation - Wave 8
 * 
 * Implements Destination Tag based attribution for a shared hot wallet.
 * - Single address for all users
 * - Unique destination tag (from derivationIndex) per user
 */
export class XrpChain implements Chain {
    private chain = "XRP" as const;

    /**
     * Generate deposit "address" (shared address + unique tag)
     */
    async generateAddress(userId: string): Promise<AddressResult> {
        await assertServerRuntime();
        const hotWalletAddress = networkConfig.getSystemAddress("XRP");

        // 1. Check for existing wallet or allocate index (tag)
        const existing = await prisma.userWallet.findUnique({
            where: { userId_chain: { userId, chain: this.chain } }
        });

        let index: number;
        if (existing) {
            index = existing.derivationIndex;
            // Ensure address is updated to hot wallet if it was legacy placeholder
            if (existing.address !== hotWalletAddress) {
                await prisma.userWallet.update({
                    where: { id: existing.id },
                    data: { address: hotWalletAddress }
                });
            }
        } else {
            index = await allocateDerivationIndex(userId, this.chain);
            await prisma.userWallet.update({
                where: { userId_chain: { userId, chain: this.chain } },
                data: { address: hotWalletAddress }
            });
        }

        return { address: hotWalletAddress, derivationIndex: index };
    }

    /**
     * Monitor deposits via Destination Tag parsing
     */
    async monitorDeposits(): Promise<void> {
        const client = providerRegistry.getXrpClient();
        const hotWalletAddress = networkConfig.getSystemAddress("XRP");

        try {
            if (!client.isConnected()) await client.connect();

            console.log(`[XrpChain] Monitoring XRP Hot Wallet: ${hotWalletAddress}`);

            // 1. Fetch recent transactions
            const response = await client.request({
                command: "account_tx",
                account: hotWalletAddress,
                ledger_index_min: -1,
                ledger_index_max: -1,
                limit: 50
            });

            for (const tx of response.result.transactions) {
                const txData = tx.tx as any;

                // Only process inbound payments with a destination tag
                if (txData.TransactionType !== "Payment") continue;
                if (txData.Destination !== hotWalletAddress) continue;
                if (txData.DestinationTag === undefined) continue;
                if (typeof txData.Amount !== "string") continue; // XRP only

                const tag = txData.DestinationTag;
                const txHash = txData.hash;

                // 2. Check if already processed
                const existingTx = await prisma.chainTransaction.findUnique({
                    where: { txHash }
                });
                if (existingTx) continue;

                // 3. Find user by Tag
                const wallet = await prisma.userWallet.findFirst({
                    where: { chain: this.chain, derivationIndex: tag }
                });

                if (wallet) {
                    const amountDrops = BigInt(txData.Amount);
                    console.log(`[XrpChain] 💰 XRP Deposit Detect: Tag ${tag} (+${xrpl.dropsToXrp(txData.Amount)} XRP)`);
                    await this.creditDeposit(wallet, amountDrops, txHash, BigInt(txData.ledger_index));
                }
            }
        } catch (err) {
            console.error("[XrpChain] Monitor error:", err);
        }
    }

    private async creditDeposit(wallet: any, delta: bigint, txHash: string, blockNumber: bigint): Promise<void> {
        await prisma.$transaction(async (tx) => {
            const balanceObj = await tx.userBalance.findUnique({
                where: { userId_chain: { userId: wallet.userId, chain: this.chain } }
            });
            const oldBal = BigInt(balanceObj?.balance || "0");

            // 1. Update Balance
            await tx.userBalance.upsert({
                where: { userId_chain: { userId: wallet.userId, chain: this.chain } },
                update: { balance: (oldBal + delta).toString() },
                create: { userId: wallet.userId, chain: this.chain, balance: delta.toString() }
            });

            // 2. Ledger Entry
            await tx.ledgerEntry.create({
                data: {
                    userId: wallet.userId,
                    chain: this.chain,
                    type: "DEPOSIT",
                    amount: delta.toString(),
                    referenceId: txHash
                }
            });

            // 3. Chain Transaction
            await tx.chainTransaction.create({
                data: {
                    userId: wallet.userId,
                    chain: this.chain,
                    to: wallet.address,
                    amount: xrpl.dropsToXrp(delta.toString()).toString(),
                    txHash,
                    blockNumber,
                    direction: "INBOUND",
                    status: "CONFIRMED",
                    confirmedAt: new Date()
                }
            });

            // 4. Update Wallet Snapshot
            await tx.userWallet.update({
                where: { id: wallet.id },
                data: { lastKnownBalance: (BigInt(wallet.lastKnownBalance || "0") + delta).toString() }
            });
        });
    }

    /**
     * Send XRP withdrawal from Hot Wallet
     */
    async sendWithdrawal(params: { userId: string; to: string; value: string }): Promise<TxResult> {
        await assertServerRuntime();
        const { to, value } = params;
        const client = providerRegistry.getXrpClient();
        const mnemonic = await loadMasterSeed();

        // Standard hot wallet derivation (Index 0)
        const hotWallet = xrpl.Wallet.fromMnemonic(mnemonic);

        if (!client.isConnected()) await client.connect();

        console.log(`[XrpChain] Sending ${value} XRP to ${to}...`);

        const prepared = await client.autofill({
            TransactionType: "Payment",
            Account: hotWallet.address,
            Amount: xrpl.xrpToDrops(value),
            Destination: to
        });

        const signed = hotWallet.sign(prepared);
        const result = await client.submitAndWait(signed.tx_blob);

        if (result.result.meta && (result.result.meta as any).TransactionResult !== "tesSUCCESS") {
            throw new Error(`XRP withdrawal failed: ${(result.result.meta as any).TransactionResult}`);
        }

        return { txHash: signed.hash };
    }

    async getBalance(address: string): Promise<string> {
        const client = providerRegistry.getXrpClient();
        if (!client.isConnected()) await client.connect();
        try {
            const info = await client.request({
                command: "account_info",
                account: address,
                ledger_index: "validated"
            });
            return info.result.account_data.Balance;
        } catch (e) {
            return "0";
        }
    }

    async estimateFee(params: any): Promise<string> {
        return "12"; // 12 drops standard
    }

    isValidAddress(address: string): boolean {
        return xrpl.isValidAddress(address);
    }

    toSmallestUnit(humanAmount: string): bigint {
        return BigInt(xrpl.xrpToDrops(humanAmount));
    }

    toHumanUnit(smallestAmount: string | bigint): string {
        return xrpl.dropsToXrp(smallestAmount.toString()).toString();
    }

    getSymbol(): string {
        return "XRP";
    }

    async getTransactionStatus(txHash: string): Promise<{
        status: "PENDING" | "CONFIRMED" | "FAILED",
        confirmations?: number,
        requiredConfirmations?: number,
        blockNumber?: bigint
    }> {
        return { status: "CONFIRMED" };
    }
}
