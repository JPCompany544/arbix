import { checkEvmNativeDeposits } from "../lib/monitor/evm-native-monitor";
import { startSolanaMonitor, checkSolanaDeposits } from "../lib/monitor/solana-monitor";
import { checkBitcoinDeposits } from "../lib/monitor/btc-monitor";
import { checkXrpDeposits } from "../lib/monitor/xrp-monitor";
import { prisma } from "../lib/prisma";

// Keep Prisma connection alive
async function keepConnectionAlive() {
    try {
        await prisma.$executeRaw`SELECT 1`;
    } catch (error: any) {
        if (error.code === 'P1017') {
            // Reconnect if connection was lost
            console.log('[DB] Reconnecting to database...');
            await prisma.$connect();
        }
    }
}

async function start() {
    console.log("------------------------------------------------");
    console.log("🚀 Starting Address-Only Deposit Monitor");
    console.log("   Mode: Balance Delta Detection (No Block Scanning)");
    console.log("------------------------------------------------");

    // Ensure Prisma is connected
    await prisma.$connect();

    // Keep connection alive with periodic heartbeat (every 30s)
    setInterval(keepConnectionAlive, 30000);

    // 1. Polling Monitor (Every 10s)
    const POLL_INTERVAL = 10000;

    console.log(`[MONITOR] Starting Poller (Interval: ${POLL_INTERVAL}ms)...`);

    async function runMonitors() {
        console.log(`[MONITOR] Pulse at ${new Date().toLocaleTimeString()}`);
        await Promise.allSettled([
            checkEvmNativeDeposits("ETH", process.env.ETH_SEPOLIA_RPC!),
            checkEvmNativeDeposits("BSC", process.env.BSC_TESTNET_RPC!),
            checkSolanaDeposits(process.env.SOLANA_DEVNET_RPC!),
            checkBitcoinDeposits(),
            checkXrpDeposits()
        ]);
    }

    // Initial Run
    await runMonitors();

    setInterval(runMonitors, POLL_INTERVAL);

    console.log("\n✅ Monitors Active. Press Ctrl+C to stop.");
}

start().catch((error) => {
    console.error('Failed to start monitor:', error);
    process.exit(1);
});

// Cleanup
process.on('SIGINT', async () => {
    console.log('\nStopping monitor...');
    try {
        await prisma.$disconnect();
        console.log('Database connection closed.');
    } catch (e) {
        console.error('Error during cleanup:', e);
    }
    process.exit(0);
});
