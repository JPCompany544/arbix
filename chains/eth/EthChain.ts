import { Chain, AddressResult, TxResult } from "../../core/chain-interface";
import { ethers } from "ethers";
import { prisma } from "../../lib/prisma";
import { providerRegistry } from "../../core/provider-registry";
import { networkConfig } from "../../core/network-config";
import { loadMasterSeed, allocateDerivationIndex, assertServerRuntime } from "../../lib/wallet/utils";
import { getQueue } from "../../lib/wallet/tx-queue";
import { getNextNonce, resetNonce } from "../../lib/wallet/nonce-manager";

/**
 * Ethereum Chain Implementation - Wave 4
 * 
 * Handles all ETH-specific logic including:
 * - Deterministic address derivation (BIP-44)
 * - Withdrawal signing and broadcasting
 * - Deposit monitoring (Native ETH)
 * - Balance and Fee queries
 */
export class EthChain implements Chain {
    protected chain: "ETH" | "BSC" = "ETH";

    /**
     * Generate a unique deposit address for a user (BIP-44)
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
        const path = `m/44'/60'/0'/0/${index}`;
        const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic, undefined, "m").derivePath(path);
        const address = wallet.address;

        // 3. Update DB - Fetch current on-chain balance to establish a baseline
        // This prevents the monitor from crediting historical funds as new deposits
        const provider = providerRegistry.getEvmProvider(this.chain);
        const timeout = new Promise<bigint>((_, reject) => setTimeout(() => reject(new Error("RPC Timeout")), 4000));
        const currentBalance = await Promise.race([provider.getBalance(address), timeout]).catch(() => 0n);

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
     * Monitor for incoming ETH deposits (Single Pass)
     * Performs a catch-up scan and a balance poll.
     */
    async monitorDeposits(): Promise<void> {
        try {
            // await this.catchUp(); // Disabled: Too many RPC calls on free tier providers
            await this.pollAllWallets();
        } catch (err) {
            console.error(`[${this.chain}Chain] Monitor pass error:`, err);
        }
    }

    private async catchUp(): Promise<void> {
        const provider = providerRegistry.getEvmProvider(this.chain);
        try {
            // Skip catch-up if there are no wallets to monitor
            const walletCount = await prisma.userWallet.count({ where: { chain: this.chain } });
            if (walletCount === 0) {
                return;
            }

            const latest = await provider.getBlockNumber();
            const state = await prisma.chainScanState.findUnique({ where: { chain: this.chain } });

            // Limit catch-up to last 10 blocks to avoid RPC rate limits
            const lastScanned = state ? Number(state.lastScannedBlock) : latest - 5;
            const startBlock = Math.max(lastScanned + 1, latest - 10);

            if (startBlock <= latest) {
                console.log(`[${this.chain}Chain] Catching up from block ${startBlock} to ${latest}`);
                for (let i = startBlock; i <= latest; i++) {
                    await this.scanBlock(i);
                    // Small delay to avoid RPC rate limits
                    await new Promise(r => setTimeout(r, 500));
                }
            }
        } catch (e) {
            console.error(`[${this.chain}Chain] Catch-up error:`, e);
        }
    }

    private async scanBlock(blockNumber: number): Promise<void> {
        const provider = providerRegistry.getEvmProvider(this.chain);
        try {
            const block = await provider.getBlock(blockNumber, true);
            if (!block || !block.transactions) return;

            for (const txHash of block.transactions) {
                let tx: any = txHash;
                if (typeof tx === 'string') {
                    tx = await provider.getTransaction(tx);
                }
                if (!tx || !tx.to || !tx.value || tx.value === 0n) continue;

                const toAddress = tx.to.toLowerCase();
                const wallet = await prisma.userWallet.findFirst({
                    where: { address: toAddress, chain: this.chain }
                });

                if (wallet) {
                    // NEW: Ignore historical transactions that happened before this wallet was registered in our DB
                    // block.timestamp is in seconds
                    if (Number(block.timestamp) * 1000 < wallet.createdAt.getTime() - 120000) {
                        continue;
                    }

                    // Record it
                    const existing = await prisma.chainTransaction.findUnique({
                        where: { txHash: tx.hash }
                    });
                    if (!existing) {
                        console.log(`[${this.chain}Chain] 💰 Found Inbound TX: ${tx.hash} for user ${wallet.userId}`);
                        const amountEth = ethers.formatEther(tx.value);

                        await prisma.chainTransaction.create({
                            data: {
                                userId: wallet.userId,
                                chain: this.chain,
                                to: toAddress,
                                amount: amountEth,
                                txHash: tx.hash,
                                blockNumber: BigInt(block.number),
                                direction: "INBOUND",
                                status: "BROADCASTED"
                            }
                        });

                        await this.creditDeposit(wallet, tx.value, tx.hash);
                    }
                }
            }

            await prisma.chainScanState.upsert({
                where: { chain: this.chain },
                update: { lastScannedBlock: BigInt(blockNumber) },
                create: { chain: this.chain, lastScannedBlock: BigInt(blockNumber) }
            });
        } catch (e) {
            console.error(`[${this.chain}Chain] Error scanning block ${blockNumber}:`, e);
        }
    }

    private async pollAllWallets(): Promise<void> {
        const provider = providerRegistry.getEvmProvider(this.chain);
        try {
            const wallets = await prisma.userWallet.findMany({
                where: { chain: this.chain }
            });

            const activeWallets = wallets.filter((w: any) => w.address && w.address !== "ADDRESS_NOT_GENERATED_YET");

            if (activeWallets.length === 0) {
                return; // Skip RPC calls when no wallets to monitor
            }

            console.log(`[${this.chain}Chain] Monitoring ${activeWallets.length} user addresses...`);

            for (const wallet of activeWallets) {
                try {
                    // Refresh wallet to get latest lastKnownBalance from earlier block scan in this pulse
                    const freshWallet = await prisma.userWallet.findUnique({ where: { id: wallet.id } });
                    if (!freshWallet || !freshWallet.address) continue;

                    console.log(`[${this.chain}Chain] Polling balance for ${freshWallet.address}...`);
                    const onChainBalance = await provider.getBalance(freshWallet.address);

                    const previous = BigInt(freshWallet.lastKnownBalance || "0");
                    const current = onChainBalance;

                    if (current > previous) {
                        const delta = current - previous;
                        await this.creditDeposit(freshWallet, delta, "POLLING_DETECTED");
                    } else if (current < previous) {
                        await prisma.userWallet.update({
                            where: { id: freshWallet.id },
                            data: { lastKnownBalance: current.toString() }
                        });
                    }

                    // Increased delay to 1.5s to avoid RPC rate limits (LlamaRPC/Public)
                    await new Promise(r => setTimeout(r, 1500));
                } catch (e: any) {
                    if (e.message?.includes("429")) {
                        console.warn(`[${this.chain}Chain] RPC Rate limited. Waiting 5s...`);
                        await new Promise(r => setTimeout(r, 5000));
                    }
                }
            }
        } catch (e) { }
    }

    private async creditDeposit(wallet: any, delta: bigint, txHash: string): Promise<void> {
        // 1. DEDUPLICATION & RECONCILIATION
        if (txHash === "POLLING_DETECTED") {
            // Check if we already credited this user for this amount recently (last 5 mins)
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
                console.log(`[${this.chain}Chain] Polling detected balance increase, but recent credit of ${delta} exists. Skipping duplicate.`);
                return;
            }
        } else {
            // Real TX Hash deduplication
            const alreadyCredited = await prisma.ledgerEntry.findFirst({
                where: { referenceId: txHash }
            });
            if (alreadyCredited) return;

            // RECONCILIATION: Check if this TX was already credited via POLLING_DETECTED
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
                console.log(`[${this.chain}Chain] Reconciling TX ${txHash} with earlier polling entry ${pollingMatch.id}`);
                await prisma.ledgerEntry.update({
                    where: { id: pollingMatch.id },
                    data: { referenceId: txHash }
                });
                return;
            }
        }

        console.log(`[${this.chain}Chain] 💰 Deposit detected: ${wallet.address} +${ethers.formatEther(delta)} ${this.chain} (Ref: ${txHash})`);

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
     * Send ETH withdrawal
     */
    async sendWithdrawal(params: { userId: string; to: string; value: string }): Promise<TxResult> {
        await assertServerRuntime();
        const { userId, to, value } = params;

        // 1. Load Wallet
        const walletRecord = await prisma.userWallet.findUniqueOrThrow({
            where: { userId_chain: { userId, chain: this.chain } }
        });

        // 2. Derive Private Key
        const mnemonic = await loadMasterSeed();
        const path = `m/44'/60'/0'/0/${walletRecord.derivationIndex}`;
        const privateKey = ethers.HDNodeWallet.fromPhrase(mnemonic, undefined, "m").derivePath(path).privateKey;

        // 3. Queue and Execute
        const queue = getQueue(walletRecord.address);
        return queue.enqueue(async () => {
            const provider = providerRegistry.getEvmProvider(this.chain);

            // Safety: Verify Network
            const network = await provider.getNetwork();
            const expectedId = BigInt(networkConfig.getChainId(this.chain));
            if (network.chainId !== expectedId) {
                throw new Error(`ChainID Mismatch: Expected ${expectedId}, got ${network.chainId}`);
            }

            try {
                const nonce = await getNextNonce(walletRecord.address, provider);
                const wallet = new ethers.Wallet(privateKey, provider);

                // Fetch current fee data for competitive pricing
                const feeData = await provider.getFeeData();

                // MAINNET SAFETY: Enforce minimum gas prices to prevent underpriced rejection
                const isMainnet = networkConfig.getMode() === "mainnet";
                const minPriorityFee = isMainnet ? 1500000000n : 0n; // 1.5 Gwei min tip on mainnet
                const minGasPrice = isMainnet ? 10000000000n : 0n;   // 10 Gwei min total on mainnet

                // Boost tip to ensure fast inclusion
                let maxPriorityFeePerGas = feeData.maxPriorityFeePerGas ? (feeData.maxPriorityFeePerGas * 150n / 100n) : 2000000000n;
                if (maxPriorityFeePerGas < minPriorityFee) maxPriorityFeePerGas = minPriorityFee;

                let maxFeePerGas = feeData.maxFeePerGas ? (feeData.maxFeePerGas * 130n / 100n) : undefined;
                if (maxFeePerGas && maxFeePerGas < minGasPrice) maxFeePerGas = minGasPrice;

                let gasPrice = !feeData.maxFeePerGas ? (feeData.gasPrice ? (feeData.gasPrice * 120n / 100n) : undefined) : undefined;
                if (gasPrice && gasPrice < minGasPrice) gasPrice = minGasPrice;

                // Pre-flight Balance Check
                const balance = await provider.getBalance(walletRecord.address);
                const valueWei = ethers.parseEther(value);
                const gasLimit = 21000n;

                // Estimate max cost
                let gasCost = 0n;
                if (maxFeePerGas) {
                    gasCost = gasLimit * maxFeePerGas;
                } else if (gasPrice) {
                    gasCost = gasLimit * gasPrice;
                } else {
                    const simpleGasPrice = (await provider.getFeeData()).gasPrice || 1000000000n;
                    gasCost = gasLimit * (simpleGasPrice < minGasPrice ? minGasPrice : simpleGasPrice);
                }

                const totalCost = valueWei + gasCost;
                if (balance < totalCost) {
                    throw new Error(`Insufficient funds for gas. Balance: ${ethers.formatEther(balance)}, Required: ${ethers.formatEther(totalCost)} (Value + Gas). Try sweeping a slightly smaller amount.`);
                }

                console.log(`[${this.chain}Chain] Broadcasting withdrawal of ${value} ${this.chain} to ${to} (Nonce: ${nonce}, MaxFee: ${maxFeePerGas ? ethers.formatUnits(maxFeePerGas, "gwei") : "N/A"} Gwei)`);
                const txResponse = await wallet.sendTransaction({
                    to,
                    value: valueWei,
                    nonce,
                    maxPriorityFeePerGas,
                    maxFeePerGas,
                    gasPrice,
                    gasLimit
                });

                // Verify immediate broadcast success
                await new Promise(r => setTimeout(r, 3000));
                const check = await provider.getTransaction(txResponse.hash);
                if (!check) {
                    throw new Error(`Transaction ${txResponse.hash} was broadcasted but is not visible in the mempool. It may have been rejected due to low gas or nonce issues.`);
                }

                return { txHash: txResponse.hash };
            } catch (error) {
                console.error(`[${this.chain}Chain] Broadcast failed, resetting nonce. Error:`, error);
                resetNonce(walletRecord.address);
                throw error;
            }
        });
    }

    /**
     * Get Address Balance
     */
    async getBalance(address: string): Promise<string> {
        const provider = providerRegistry.getEvmProvider(this.chain);
        const bal = await provider.getBalance(address);
        return bal.toString(); // returns Wei
    }

    /**
     * Estimate Fee
     */
    async estimateFee(params: { to: string; value: string }): Promise<string> {
        const provider = providerRegistry.getEvmProvider(this.chain);
        const { to, value } = params;

        try {
            const feeData = await provider.getFeeData();
            const gasPrice = feeData.gasPrice || 0n;

            // Standard ETH transfer is 21k gas
            const gasLimit = 21000n;
            const feeWei = gasLimit * gasPrice;

            return feeWei.toString();
        } catch (e) {
            return "0";
        }
    }

    isValidAddress(address: string): boolean {
        return ethers.isAddress(address);
    }

    toSmallestUnit(humanAmount: string): bigint {
        return ethers.parseEther(humanAmount);
    }

    toHumanUnit(smallestAmount: string | bigint): string {
        return ethers.formatEther(smallestAmount);
    }

    async getTransactionStatus(txHash: string): Promise<{
        status: "PENDING" | "CONFIRMED" | "FAILED" | "DROPPED",
        confirmations?: number,
        requiredConfirmations?: number,
        blockNumber?: bigint
    }> {
        const provider = providerRegistry.getEvmProvider(this.chain);

        try {
            const receipt = await provider.getTransactionReceipt(txHash);

            if (!receipt) {
                // Check if it's in the mempool
                const tx = await provider.getTransaction(txHash);
                if (!tx) {
                    return { status: "DROPPED" };
                }
                return { status: "PENDING" };
            }

            const currentBlock = await provider.getBlockNumber();
            const confirmations = currentBlock - receipt.blockNumber;
            const required = this.chain === "ETH" ? 12 : 5;

            if (receipt.status === 0) {
                return { status: "FAILED" };
            }

            return {
                status: confirmations >= required ? "CONFIRMED" : "PENDING",
                confirmations,
                requiredConfirmations: required,
                blockNumber: BigInt(receipt.blockNumber)
            };
        } catch (error) {
            console.error(`[${this.chain}] Error checking tx status:`, error);
            // Default to PENDING on error to prevent premature failure
            return { status: "PENDING" };
        }
    }

    getSymbol(): string {
        return this.chain === "BSC" ? "BNB" : "ETH";
    }
}
