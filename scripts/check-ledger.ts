import * as dotenv from "dotenv";
dotenv.config();
import { prisma } from "../lib/prisma";
import { ethers } from "ethers";

/**
 * Check User Internal Balances and Ledger History
 * 
 * STEP 13: Helper to view internal ledger state
 */
async function checkLedger() {
    const userId = "cmli2bcpp0000dj58qvyfht0h";

    console.log("\n=== Internal Ledger Report ===\n");

    try {
        // Get Balances
        console.log("📊 Current Balances:");
        console.log("─".repeat(50));

        const balances = await prisma.userBalance.findMany({
            where: { userId }
        });

        for (const bal of balances) {
            let humanReadable = "";
            if (bal.chain === "ETH" || bal.chain === "BSC") {
                humanReadable = ethers.formatEther(bal.balance);
            } else if (bal.chain === "SOL") {
                humanReadable = (Number(bal.balance) / 1_000_000_000).toFixed(9);
            }
            console.log(`${bal.chain.padEnd(5)} ${humanReadable.padStart(15)} (${bal.balance} smallest units)`);
        }

        // Get Ledger Entries
        console.log("\n📜 Ledger History (Last 20 entries):");
        console.log("─".repeat(80));

        const entries = await prisma.ledgerEntry.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            take: 20
        });

        for (const entry of entries) {
            let humanReadable = "";
            if (entry.chain === "ETH" || entry.chain === "BSC") {
                humanReadable = ethers.formatEther(entry.amount);
            } else if (entry.chain === "SOL") {
                humanReadable = (Number(entry.amount) / 1_000_000_000).toFixed(9);
            }

            const typeIcon = entry.type === "DEPOSIT" ? "📥" : entry.type === "WITHDRAWAL" ? "📤" : "⚙️";
            const ref = entry.referenceId ? ` [${entry.referenceId.substring(0, 20)}...]` : "";

            console.log(
                `${typeIcon} ${entry.type.padEnd(12)} ${entry.chain.padEnd(5)} ` +
                `${humanReadable.padStart(15)} ${entry.createdAt.toISOString().substring(0, 19)}${ref}`
            );
        }

        // Get Chain Transactions
        console.log("\n🔗 Chain Transactions (Last 10):");
        console.log("─".repeat(80));

        const chainTxs = await prisma.chainTransaction.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            take: 10
        });

        for (const tx of chainTxs) {
            const statusIcon = tx.status === "CONFIRMED" ? "✅" :
                tx.status === "BROADCASTED" ? "🔄" :
                    tx.status === "FAILED" ? "❌" : "⏳";
            const hash = tx.txHash ? tx.txHash.substring(0, 20) + "..." : "pending";

            console.log(
                `${statusIcon} ${tx.status.padEnd(12)} ${tx.chain.padEnd(5)} ` +
                `${tx.amount.padStart(10)} to ${tx.to.substring(0, 15)}... ${hash}`
            );
        }

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await prisma.$disconnect();
    }

    console.log("\n" + "═".repeat(80) + "\n");
}

checkLedger().catch(console.error);
