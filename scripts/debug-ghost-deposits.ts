import { prisma } from "../lib/prisma";

async function main() {
    console.log("--- Recent Inbound Transactions ---");
    const txs = await prisma.chainTransaction.findMany({
        where: { direction: "INBOUND" },
        orderBy: { createdAt: "desc" },
        take: 20
    });

    for (const tx of txs) {
        console.log(`[${tx.chain}] ${tx.amount} to ${tx.to} | TX: ${tx.txHash} | User: ${tx.userId} | Date: ${tx.createdAt}`);
    }

    console.log("\n--- Ledger Entries ---");
    const ledger = await prisma.ledgerEntry.findMany({
        where: { type: "DEPOSIT" },
        orderBy: { createdAt: "desc" },
        take: 20
    });

    for (const entry of ledger) {
        console.log(`[${entry.chain}] ${entry.amount} | Ref: ${entry.referenceId} | User: ${entry.userId}`);
    }
}

main();
