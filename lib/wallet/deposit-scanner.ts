"use server";

import { chainFactory } from "../../core/chain-factory";

/**
 * Deposit Scanner - Wave 6 Refactor
 * 
 * Fully delegated to isolated Chain modules via ChainFactory.
 */

// --- WebSocket/Persistent Monitor ---
async function startMonitor(chain: "ETH" | "BSC" | "SOL" | "BTC" | "XRP") {
    // Delegation to isolated logic (EthChain, BscChain, SolChain, BtcChain, XrpChain)
    return await chainFactory.getChain(chain).monitorDeposits();
}

// --- Main Export ---
export async function startDepositScanner() {
    console.log(`\n[Deposit Scanner] === Starting Multi-Chain Monitors ===\n`);

    // Start all supported monitors
    await startMonitor("ETH");
    await startMonitor("BSC");
    await startMonitor("SOL");
    await startMonitor("BTC");
    await startMonitor("XRP");
}

export async function scanDeposits() {
    await startDepositScanner();
}
