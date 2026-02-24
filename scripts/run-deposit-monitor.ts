import { checkEvmNativeDeposits } from "../lib/monitor/evm-native-monitor";
import { startSolanaMonitor, checkSolanaDeposits } from "../lib/monitor/solana-monitor";
import { checkBitcoinDeposits } from "../lib/monitor/btc-monitor";
import { checkXrpDeposits } from "../lib/monitor/xrp-monitor";
import { prisma } from "../lib/prisma";
import { networkConfig } from "../core/network-config";

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
    console.log("🚀 Starting Multi-Chain Deposit Monitor");
    console.log("   Mode: Hybrid (Block Scanning + Balance Polling)");
    console.log("------------------------------------------------");

    // Ensure Prisma is connected
    await prisma.$connect();

    // Keep connection alive with periodic heartbeat (every 30s)
    setInterval(keepConnectionAlive, 30000);

    // 1. Polling Monitor (Every 30s to respect RPC rate limits)
    const POLL_INTERVAL = 30000;

    console.log(`[MONITOR] Starting Poller (Interval: ${POLL_INTERVAL}ms)...`);

    async function runMonitors() {
        console.log(`[MONITOR] Pulse at ${new Date().toLocaleTimeString()}`);

        const chains = [
            { name: "ETH", fn: () => checkEvmNativeDeposits("ETH", networkConfig.getRpc("ETH")) },
            { name: "BSC", fn: () => checkEvmNativeDeposits("BSC", networkConfig.getRpc("BSC")) },
            { name: "SOL", fn: () => checkSolanaDeposits(networkConfig.getRpc("SOL")) },
            { name: "BTC", fn: () => checkBitcoinDeposits() },
            { name: "XRP", fn: () => checkXrpDeposits() }
        ];

        for (const chain of chains) {
            try {
                console.log(`[MONITOR] Checking ${chain.name}...`);
                await chain.fn();
                // Increased delay between chains to respect aggressive RPC limits
                await new Promise(r => setTimeout(r, 5000));
            } catch (err: any) {
                console.error(`[MONITOR] Error monitoring ${chain.name}:`, err.message);
            }
        }
    }

    // Initial Run & Loop
    while (true) {
        try {
            await runMonitors();
        } catch (err: any) {
            console.error('[MONITOR] Global pulse error:', err.message);
        }

        console.log(`[MONITOR] Cooldown (${POLL_INTERVAL}ms)...`);
        await new Promise(r => setTimeout(r, POLL_INTERVAL));
    }

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
