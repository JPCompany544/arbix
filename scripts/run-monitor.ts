
import { monitorPendingTransactions } from "../lib/wallet/tx-monitor";
import { prisma } from "../lib/prisma";

/**
 * Transaction Monitor Process
 * 
 * Runs continuously to check for pending transactions
 */
async function run() {
    console.log("Starting Transaction Monitor...");

    // Initial check
    await monitorPendingTransactions();

    // Loop
    setInterval(async () => {
        try {
            await monitorPendingTransactions();
        } catch (error) {
            console.error("Monitor loop error:", error);
        }
    }, 15000); // Check every 15 seconds
}

run().catch(console.error);

// Handle cleanup on exit
process.on('SIGINT', async () => {
    console.log('Stopping monitor...');
    await prisma.$disconnect();
    process.exit(0);
});
