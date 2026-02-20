import * as bitcoin from "bitcoinjs-lib";
import * as bip39 from "bip39";
import { BIP32Factory, BIP32Interface } from "bip32";
import * as ecc from "tiny-secp256k1";
import { Chain, AddressResult, TxResult } from "../../core/chain-interface";
import { prisma } from "../../lib/prisma";
import { networkConfig } from "../../core/network-config";
import { loadMasterSeed, allocateDerivationIndex, assertServerRuntime } from "../../lib/wallet/utils";

// Initialize BIP32 factory with secp256k1
const bip32 = BIP32Factory(ecc);

/**
 * Bitcoin Chain Implementation - Wave 7
 * 
 * Implements HD Wallet logic (BIP-84 SegWit) and UTXO-based monitoring/withdrawals.
 */
export class BtcChain implements Chain {
    private chain = "BTC" as const;

    /**
     * Get Bitcoin Network Object
     */
    private getNetwork(): bitcoin.Network {
        return networkConfig.getMode() === "mainnet"
            ? bitcoin.networks.bitcoin
            : bitcoin.networks.testnet;
    }

    /**
     * Generate unique Bech32 address for user (BIP-84)
     */
    async generateAddress(userId: string): Promise<AddressResult> {
        await assertServerRuntime();
        const mnemonic = await loadMasterSeed();
        const network = this.getNetwork();

        // 1. Check for existing wallet or allocate index
        const existing = await prisma.userWallet.findUnique({
            where: { userId_chain: { userId, chain: this.chain } }
        });

        let index: number;
        if (existing) {
            index = existing.derivationIndex;
            if (existing.address && existing.address !== "ADDRESS_NOT_GENERATED_YET" && !existing.address.startsWith("bc1qfgc08x")) {
                // If it's a real HD address (not the shared legacy one), return it
                return { address: existing.address, derivationIndex: index };
            }
        } else {
            index = await allocateDerivationIndex(userId, this.chain);
        }

        // 2. Derive HD Address (BIP-84)
        // Path: m/84'/0'/0'/0/{index} (Mainnet) or m/84'/1'/0'/0/{index} (Testnet)
        const coinType = network === bitcoin.networks.bitcoin ? "0'" : "1'";
        const path = `m/84'/${coinType}/0'/0/${index}`;

        const seed = await bip39.mnemonicToSeed(mnemonic);
        const root = bip32.fromSeed(seed, network);
        const child = root.derivePath(path);

        const { address } = bitcoin.payments.p2wpkh({
            pubkey: child.publicKey,
            network
        });

        if (!address) throw new Error("Failed to generate BTC address");

        // 3. Update DB - Fetch current on-chain balance to establish a baseline
        const baseUrl = networkConfig.getRpc(this.chain);
        const balRes = await fetch(`${baseUrl}/address/${address}`).catch(() => null);
        let currentBalance = "0";
        if (balRes?.ok) {
            const data = await balRes.json();
            const funded = data.chain_stats.funded_txo_sum || 0;
            const spent = data.chain_stats.spent_txo_sum || 0;
            currentBalance = (funded - spent).toString();
        }

        await prisma.userWallet.update({
            where: { userId_chain: { userId, chain: this.chain } },
            data: {
                address,
                lastKnownBalance: currentBalance
            }
        });

        return { address, derivationIndex: index };
    }

    /**
     * Monitor deposits for all per-user addresses
     */
    async monitorDeposits(): Promise<void> {
        try {
            const wallets = await prisma.userWallet.findMany({
                where: { chain: this.chain }
            });

            // Filter out internal/legacy addresses if any
            const activeWallets = wallets.filter(w => w.address && w.address !== "ADDRESS_NOT_GENERATED_YET");

            console.log(`[BtcChain] Monitoring ${activeWallets.length} user addresses...`);

            for (const wallet of activeWallets) {
                await this.pollAddress(wallet);
            }
        } catch (err) {
            console.error("[BtcChain] Monitor error:", err);
        }
    }

    private async pollAddress(wallet: any): Promise<void> {
        const baseUrl = networkConfig.getRpc(this.chain);
        try {
            // 1. Get Current Tip Height for confirmation check
            const heightRes = await fetch(`${baseUrl}/blocks/tip/height`);
            const currentHeight = parseInt(await heightRes.text());

            // 2. Fetch UTXOs from Blockstream/Mempool API
            const res = await fetch(`${baseUrl}/address/${wallet.address}/utxo`);
            if (!res.ok) return;
            const utxos = await res.json();

            // 3. Filter for confirmed UTXOs (Min 3 confirmations)
            for (const utxo of utxos) {
                if (utxo.status.confirmed) {
                    // NEW: Ignore historical UTXOs that happened before this wallet was registered in our DB
                    // block_time is in seconds
                    const txTimeMs = utxo.status.block_time * 1000;
                    if (txTimeMs < wallet.createdAt.getTime() - 120000) {
                        continue;
                    }

                    const confirmations = currentHeight - utxo.status.block_height + 1;

                    if (confirmations >= 3) {
                        // Check if we already recorded this UTXO (using txid:vout as ref)
                        const referenceId = `${utxo.txid}:${utxo.vout}`;
                        const existing = await prisma.ledgerEntry.findFirst({
                            where: { referenceId }
                        });

                        if (!existing) {
                            const amountSats = BigInt(utxo.value);
                            console.log(`[BtcChain] 💰 Confirmed BTC Deposit: ${wallet.address} +${Number(amountSats) / 1e8} BTC (${confirmations} confs)`);

                            await this.creditDeposit(wallet, amountSats, referenceId, utxo.txid, BigInt(utxo.status.block_height));
                        }
                    }
                }
            }
        } catch (e) {
            // Silently skip on network errors
        }
    }

    private async creditDeposit(wallet: any, delta: bigint, referenceId: string, txHash: string, blockNumber: bigint): Promise<void> {
        await prisma.$transaction(async (tx) => {
            const balanceObj = await tx.userBalance.findUnique({
                where: { userId_chain: { userId: wallet.userId, chain: this.chain } }
            });
            const oldBal = BigInt(balanceObj?.balance || "0");

            // 1. Update User Balance
            await tx.userBalance.upsert({
                where: { userId_chain: { userId: wallet.userId, chain: this.chain } },
                update: { balance: (oldBal + delta).toString() },
                create: { userId: wallet.userId, chain: this.chain, balance: delta.toString() }
            });

            // 2. Create Ledger Entry
            await tx.ledgerEntry.create({
                data: {
                    userId: wallet.userId,
                    chain: this.chain,
                    type: "DEPOSIT",
                    amount: delta.toString(),
                    referenceId
                }
            });

            // 3. Create Chain Transaction Record
            await tx.chainTransaction.create({
                data: {
                    userId: wallet.userId,
                    chain: this.chain,
                    to: wallet.address,
                    amount: (Number(delta) / 1e8).toString(),
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
     * Send BTC Withdrawal
     */
    async sendWithdrawal(params: { userId: string; to: string; value: string }): Promise<TxResult> {
        await assertServerRuntime();
        const { userId, to, value } = params;
        const network = this.getNetwork();
        const baseUrl = networkConfig.getRpc(this.chain);

        // 1. Load Wallet & Derive Keys
        const walletRecord = await prisma.userWallet.findUniqueOrThrow({
            where: { userId_chain: { userId, chain: this.chain } }
        });

        const mnemonic = await loadMasterSeed();
        const seed = await bip39.mnemonicToSeed(mnemonic);
        const root = bip32.fromSeed(seed, network);

        const coinType = network === bitcoin.networks.bitcoin ? "0'" : "1'";
        const path = `m/84'/${coinType}/0'/0/${walletRecord.derivationIndex}`;
        const keyPair = root.derivePath(path);

        // 2. Fetch UTXOs for this user
        const utxoRes = await fetch(`${baseUrl}/address/${walletRecord.address}/utxo`);
        const utxos = await utxoRes.json();

        if (!utxos || utxos.length === 0) {
            throw new Error("No UTXOs found for this address");
        }

        // 3. Build Transaction
        const psbt = new bitcoin.Psbt({ network });
        const targetValue = BigInt(Math.floor(parseFloat(value) * 1e8));
        const fee = 2000n; // Basic fee (2000 sats)
        let currentInputSum = 0n;

        // Add inputs
        for (const utxo of utxos) {
            if (!utxo.status.confirmed) continue;

            const payment = bitcoin.payments.p2wpkh({
                pubkey: keyPair.publicKey,
                network
            });

            psbt.addInput({
                hash: utxo.txid,
                index: utxo.vout,
                witnessUtxo: {
                    script: payment.output!, // Bech32 scriptPubKey
                    value: utxo.value,
                },
            });

            currentInputSum += BigInt(utxo.value);
            if (currentInputSum >= targetValue + fee) break;
        }

        if (currentInputSum < targetValue + fee) {
            throw new Error(`Insufficient UTXO balance. Need ${Number(targetValue + fee) / 1e8} BTC, have ${Number(currentInputSum) / 1e8} BTC`);
        }

        // Add Output (Recipient)
        psbt.addOutput({
            address: to,
            value: targetValue,
        });

        // Add Change Output
        const change = currentInputSum - targetValue - fee;
        if (change > 546n) { // Dust limit
            psbt.addOutput({
                address: walletRecord.address,
                value: change,
            });
        }

        // 4. Sign and Finalize
        // Sign using the derived ECPair
        psbt.signAllInputs(keyPair);
        psbt.finalizeAllInputs();
        const txHex = psbt.extractTransaction().toHex();

        // 5. Broadcast
        console.log(`[BtcChain] Broadcasting ${value} BTC to ${to}...`);
        const broadcastRes = await fetch(`${baseUrl}/tx`, {
            method: 'POST',
            body: txHex
        });

        if (!broadcastRes.ok) {
            const errText = await broadcastRes.text();
            throw new Error(`Broadcast failed: ${errText}`);
        }

        const txHash = await broadcastRes.text();
        return { txHash };
    }

    /**
     * Get Address Balance (Satoshis)
     */
    async getBalance(address: string): Promise<string> {
        const baseUrl = networkConfig.getRpc(this.chain);
        const res = await fetch(`${baseUrl}/address/${address}`);
        const data = await res.json();
        const bal = data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum;
        return bal.toString();
    }

    /**
     * Estimate Fee (Simple static for now)
     */
    async estimateFee(params: any): Promise<string> {
        return "1000"; // 1000 satoshis
    }

    isValidAddress(address: string): boolean {
        try {
            bitcoin.address.toOutputScript(address, this.getNetwork());
            return true;
        } catch {
            return false;
        }
    }

    toSmallestUnit(humanAmount: string): bigint {
        return BigInt(Math.floor(parseFloat(humanAmount) * 1e8));
    }

    toHumanUnit(smallestAmount: string | bigint): string {
        return (Number(smallestAmount) / 1e8).toFixed(8);
    }

    getSymbol(): string {
        return "BTC";
    }

    async getTransactionStatus(txHash: string): Promise<{
        status: "PENDING" | "CONFIRMED" | "FAILED",
        confirmations?: number,
        requiredConfirmations?: number,
        blockNumber?: bigint
    }> {
        // BTC uses simple polling for now
        return { status: "CONFIRMED" };
    }
}
