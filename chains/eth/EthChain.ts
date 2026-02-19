import { Chain, AddressResult, TxResult } from "../../core/chain-interface";
import { ethers } from "ethers";
import { prisma } from "../../lib/prisma";
import { providerRegistry } from "../../core/provider-registry";
import { networkConfig } from "../../core/network-config";
import { loadMasterSeed, allocateDerivationIndex, assertServerRuntime } from "../../lib/wallet/utils";
import { getQueue } from "../../lib/wallet/tx-queue";
import { getNextNonce } from "../../lib/wallet/nonce-manager";

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

        // 3. Update DB
        await prisma.userWallet.update({
            where: { userId_chain: { userId, chain: this.chain } },
            data: { address }
        });

        return { address, derivationIndex: index };
    }

    /**
     * Monitor for incoming ETH deposits (Single Pass)
     * Performs a catch-up scan and a balance poll.
     */
    async monitorDeposits(): Promise<void> {
        try {
            await this.pollAllWallets();
        } catch (err) {
            console.error(`[${this.chain}Chain] Monitor pass error:`, err);
        }
    }

    private async catchUp(): Promise<void> {
        const provider = providerRegistry.getEvmProvider(this.chain);
        try {
            const latest = await provider.getBlockNumber();
            const state = await prisma.chainScanState.findUnique({ where: { chain: this.chain } });

            // To prevent large catch-ups, limit to last 100 blocks
            const lastScanned = state ? Number(state.lastScannedBlock) : latest - 10;
            const startBlock = Math.max(lastScanned + 1, latest - 100);

            if (startBlock <= latest) {
                console.log(`[${this.chain}Chain] Catching up from block ${startBlock} to ${latest}`);
                for (let i = startBlock; i <= latest; i++) {
                    await this.scanBlock(i);
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

            const activeWallets = wallets.filter(w => w.address && w.address !== "ADDRESS_NOT_GENERATED_YET");
            console.log(`[${this.chain}Chain] Monitoring ${activeWallets.length} user addresses...`);

            for (const wallet of activeWallets) {
                try {
                    const onChainBalance = await provider.getBalance(wallet.address);
                    const previous = BigInt(wallet.lastKnownBalance || "0");
                    const current = BigInt(onChainBalance.toString());

                    if (current > previous) {
                        // This is a safety credit in case block scan missed it
                        // We don't have a txHash here, so we'll use a placeholder or skip if we want strict tx matching
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
        // Prevent double credit
        const alreadyCredited = await prisma.ledgerEntry.findFirst({
            where: { referenceId: txHash }
        });
        if (alreadyCredited && txHash !== "POLLING_DETECTED") return;

        console.log(`[${this.chain}Chain] 💰 Deposit detected: ${wallet.address} +${ethers.formatEther(delta)} ${this.chain}`);

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

                // Boost tip to ensure fast inclusion
                const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas ? (feeData.maxPriorityFeePerGas * 120n / 100n) : 2000000000n; // 2 Gwei fallback
                const maxFeePerGas = feeData.maxFeePerGas ? (feeData.maxFeePerGas * 120n / 100n) : undefined;
                const gasPrice = !feeData.maxFeePerGas ? (feeData.gasPrice ? (feeData.gasPrice * 110n / 100n) : undefined) : undefined;

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
                    // Fallback to simple gas price if fee data missing
                    const simpleGasPrice = (await provider.getFeeData()).gasPrice || 1000000000n;
                    gasCost = gasLimit * simpleGasPrice;
                }

                const totalCost = valueWei + gasCost;
                if (balance < totalCost) {
                    throw new Error(`Insufficient funds for gas. Balance: ${ethers.formatEther(balance)}, Required: ${ethers.formatEther(totalCost)} (Value + Gas)`);
                }

                console.log(`[${this.chain}Chain] Broadcasting withdrawal of ${value} ${this.chain} to ${to} (Nonce: ${nonce})...`);
                const txResponse = await wallet.sendTransaction({
                    to,
                    value: valueWei,
                    nonce,
                    maxPriorityFeePerGas,
                    maxFeePerGas,
                    gasPrice,
                    gasLimit
                });

                // Verify immediate broadcast success (check if mempool sees it)
                // Wait 2 seconds for propagation
                await new Promise(r => setTimeout(r, 2000));
                const check = await provider.getTransaction(txResponse.hash);
                if (!check) {
                    console.warn(`[${this.chain}Chain] Warning: TX ${txResponse.hash} not seen immediately after broadcast.`);
                } else {
                    console.log(`[${this.chain}Chain] ✅ Broadcast confirmed: ${txResponse.hash}`);
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
