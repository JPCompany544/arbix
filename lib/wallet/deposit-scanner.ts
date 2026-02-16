"use server";

import { prisma } from "../prisma";
import { ethers, WebSocketProvider } from "ethers";
import { Connection, PublicKey } from "@solana/web3.js";

// Confirmation thresholds
const CONFIRMATIONS = {
    ETH: 2,
    BSC: 1,
    SOL: 0
};

// --- Single Block Processor ---
async function scanSingleBlock(chain: "ETH" | "BSC", blockNumber: number, provider: any) {
    try {
        const block = await provider.getBlock(blockNumber, true);
        if (!block || !block.transactions) return;

        console.log(`[Deposit Scanner] ${chain} - Processing block ${blockNumber} (${block.transactions.length} txs)`);

        for (const txHash of block.transactions) {
            try {
                let tx: any = txHash;
                // Fallback if tx string
                if (typeof tx === 'string') {
                    tx = await provider.getTransaction(tx);
                }

                if (!tx || !tx.to || !tx.value) continue;
                if (tx.value === BigInt(0)) continue;

                const toAddress = tx.to.toLowerCase();

                // Check user wallet
                const wallet = await prisma.userWallet.findFirst({
                    where: { address: toAddress, chain }
                });

                if (!wallet) continue;

                // Check duplicate
                const existing = await prisma.chainTransaction.findUnique({
                    where: { txHash: tx.hash }
                });
                if (existing) continue;

                // Record Deposit
                const amountEth = ethers.formatEther(tx.value);
                console.log(`[Deposit Scanner] 💰 ${chain} DEPOSIT: ${amountEth} to ${wallet.userId} (${tx.hash})`);

                await prisma.chainTransaction.create({
                    data: {
                        userId: wallet.userId,
                        chain,
                        to: toAddress,
                        amount: amountEth,
                        txHash: tx.hash,
                        blockNumber: BigInt(block.number),
                        direction: "INBOUND",
                        status: "BROADCASTED"
                    }
                });
            } catch (e) {
                // Ignore individual tx errors
            }
        }

        // Update last scanned ONLY if we are moving forward
        const state = await prisma.chainScanState.findUnique({ where: { chain } });
        if (!state || Number(state.lastScannedBlock) < blockNumber) {
            await prisma.chainScanState.upsert({
                where: { chain },
                update: { lastScannedBlock: BigInt(blockNumber) },
                create: { chain, lastScannedBlock: BigInt(blockNumber) }
            });
        }

    } catch (error) {
        console.error(`[Deposit Scanner] ${chain} - Block ${blockNumber} Error:`, error);
    }
}

// --- Catch Up Routine ---
async function catchUp(chain: "ETH" | "BSC", provider: any) {
    console.log(`[Deposit Scanner] ${chain} - Starting Catch-Up...`);
    const latest = await provider.getBlockNumber();
    const state = await prisma.chainScanState.findUnique({ where: { chain } });
    const lastScanned = state ? Number(state.lastScannedBlock) : latest - 1;

    if (lastScanned >= latest) {
        console.log(`[Deposit Scanner] ${chain} - Fully synced.`);
        return;
    }

    console.log(`[Deposit Scanner] ${chain} - Catching up from ${lastScanned + 1} to ${latest} (${latest - lastScanned} blocks)`);

    // Sequential safe catchup
    for (let i = lastScanned + 1; i <= latest; i++) {
        await scanSingleBlock(chain, i, provider);
        // Tiny throttle to be nice
        if (i % 10 === 0) await new Promise(r => setTimeout(r, 100));
    }
    console.log(`[Deposit Scanner] ${chain} - Catch-Up Complete.`);
}

// --- WebSocket Monitor ---
async function startMonitor(chain: "ETH" | "BSC") {
    // Note: User must provide WSS URL in env
    const rpcUrl = chain === "ETH" ? process.env.ETH_SEPOLIA_RPC?.replace("testnet.infura.io/v3", "sepolia.infura.io/ws/v3") : process.env.BSC_TESTNET_RPC;

    // Attempt automatic conversion for Infura if exact WSS missing
    let wsUrl = rpcUrl;
    if (chain === "ETH" && process.env.ETH_SEPOLIA_RPC?.includes("infura.io")) {
        // "https://sepolia.infura.io/v3/YOUR-KEY" -> "wss://sepolia.infura.io/ws/v3/YOUR-KEY"
        wsUrl = process.env.ETH_SEPOLIA_RPC.replace("https://", "wss://").replace("/v3/", "/ws/v3/");
    }

    // Fallback if WSS not set, warn user
    if (!wsUrl || !wsUrl.startsWith("wss")) {
        console.error(`[Deposit Scanner] ${chain} WSS URL invalid! Using polling fallback.`);
        return;
    }

    console.log(`[Deposit Scanner] ${chain} - Connecting to WebSocket at ${wsUrl}...`);

    try {
        const provider = new WebSocketProvider(wsUrl);

        // 1. First, catch up missed blocks
        await catchUp(chain, provider);

        // 2. Subscribe
        console.log(`[Deposit Scanner] ${chain} - Subscribed to new blocks 🟢`);
        provider.on("block", async (blockNumber) => {
            console.log(`[Deposit Scanner] ${chain} - New Block detected: ${blockNumber}`);
            await scanSingleBlock(chain, blockNumber, provider);
        });

        // 3. Handle errors/close (Basic keep-alive)
        // Ethers v6 handles some reconnects, but if it dies hard:
        if (provider.websocket) {
            (provider.websocket as any).onclose = () => {
                console.error(`[Deposit Scanner] ${chain} - WS Closed. Restarting in 5s...`);
                setTimeout(() => startMonitor(chain), 5000);
            };
            (provider.websocket as any).onerror = (e: any) => {
                console.error(`[Deposit Scanner] ${chain} - WS Error:`, e);
            };
        }

    } catch (e) {
        console.error(`[Deposit Scanner] ${chain} - Connection Error:`, e);
        setTimeout(() => startMonitor(chain), 10000);
    }
}


// --- Legacy Solana Scanner (Polling is fine for Sol) ---
async function scanSolanaDeposits() {
    // Keep existing polling logic for now as it's address-based
    const rpcUrl = process.env.SOLANA_DEVNET_RPC;
    if (!rpcUrl) return;
    const connection = new Connection(rpcUrl, "confirmed");
    try {
        const wallets = await prisma.userWallet.findMany({ where: { chain: "SOL" } });
        for (const wallet of wallets) {
            try {
                const publicKey = new PublicKey(wallet.address);
                const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 5 });
                for (const sig of signatures) {
                    const existing = await prisma.chainTransaction.findUnique({ where: { txHash: sig.signature } });
                    if (existing) continue;

                    const tx = await connection.getParsedTransaction(sig.signature, { maxSupportedTransactionVersion: 0 });
                    if (!tx?.meta) continue;
                    const pre = tx.meta.preBalances[0] || 0;
                    const post = tx.meta.postBalances[0] || 0;
                    const diff = post - pre;
                    if (diff <= 0) continue;

                    const amountLamports = BigInt(diff);
                    const amountSol = Number(amountLamports) / 1_000_000_000;

                    console.log(`[Deposit Scanner] 💰 SOL DEPOSIT: ${amountSol} to ${wallet.userId}`);
                    await prisma.chainTransaction.create({
                        data: {
                            userId: wallet.userId,
                            chain: "SOL",
                            to: wallet.address,
                            amount: amountSol.toString(),
                            txHash: sig.signature,
                            blockNumber: BigInt(sig.slot),
                            direction: "INBOUND",
                            status: "BROADCASTED"
                        }
                    });
                }
            } catch (e) { }
        }
    } catch (e) {
        console.error("SOL Scan Error", e);
    }
}

// --- Main Export ---
export async function startDepositScanner() {
    console.log(`\n[Deposit Scanner] === Starting WebSocket Monitors ===\n`);

    // Start independent listeners
    startMonitor("ETH");
    // startMonitor("BSC"); // Disabled for now if no WSS

    // Poll Solana (hybrid approach)
    setInterval(scanSolanaDeposits, 30000);
    scanSolanaDeposits(); // Initial run
}

// Export legacy function signature to not break runner script initially
export async function scanDeposits() {
    // This file is now designed to be persistent.
    // We will call the new start function from the runner.
    await startDepositScanner();
}
