import * as dotenv from "dotenv";
dotenv.config();
import { scanDeposits } from "../lib/wallet/deposit-scanner";
import { monitorPendingTransactions } from "../lib/wallet/tx-monitor";
import { prisma } from "../lib/prisma";

/**
 * One-time Deposit Scan
 * 
 * STEP 14: Manually trigger deposit scan and confirmation check
 */
async function main() {
    console.log("\n" + "=".repeat(70));
    console.log("  Manual Deposit Scan & Confirmation Check");
    console.log("=".repeat(70) + "\n");

    try {
        // Step 1: Scan for new deposits
        console.log("📡 STEP 1: Scanning for new deposits...\n");
        await scanDeposits();

        // Step 2: Check confirmations
        console.log("\n⏱️  STEP 2: Checking pending transaction confirmations...\n");
        await monitorPendingTransactions();

        // Step 3: Show summary
        console.log("\n📊 STEP 3: Summary\n");

        const pending = await prisma.chainTransaction.count({
            where: { status: "BROADCASTED" }
        });

        const confirmed = await prisma.chainTransaction.count({
            where: { status: "CONFIRMED", direction: "INBOUND" }
        });

        const deposits = await prisma.chainTransaction.findMany({
            where: { direction: "INBOUND" },
            orderBy: { createdAt: "desc" },
            take: 5
        });

        console.log(`Pending confirmations: ${pending}`);
        console.log(`Total confirmed deposits: ${confirmed}`);

        if (deposits.length > 0) {
            console.log("\nRecent deposits:");
            for (const dep of deposits) {
                const statusIcon = dep.status === "CONFIRMED" ? "✅" :
                    dep.status === "BROADCASTED" ? "🔄" : "❌";
                console.log(`  ${statusIcon} ${dep.chain} ${dep.amount} - ${dep.status}`);
            }
        }

    } catch (error) {
        console.error("\n❌ Error:", error);
    } finally {
        await prisma.$disconnect();
    }

    console.log("\n" + "=".repeat(70) + "\n");
}

main().catch(console.error);
