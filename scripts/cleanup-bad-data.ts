import { prisma } from "../lib/prisma";

async function cleanUpBadData() {
    console.log("Cleaning up bad transaction data...");

    // Delete ChainTransactions where amount is excessively large (Raw units)
    // For ETH/BSC: > 1,000,000 ETH is definitely wrong (Total supply ~120M)
    // For SOL: > 500,000,000 SOL is wrong (Total supply ~580M)
    // For BTC: > 21,000,000 BTC is wrong

    // However, finding them by string comparison might be tricky if they are scientific notation or just strings.
    // Let's just fetch all and filter in JS for safety.

    const txs = await prisma.chainTransaction.findMany();
    let deletedCount = 0;

    for (const tx of txs) {
        const val = parseFloat(tx.amount);
        let isBad = false;

        if (tx.chain === "ETH" || tx.chain === "BSC") {
            if (val > 1_000_000) isBad = true; // 1M ETH is huge
        } else if (tx.chain === "SOL") {
            if (val > 10_000_000) isBad = true; // 10M SOL is huge
        } else if (tx.chain === "BTC") {
            if (val > 100_000) isBad = true; // 100k BTC is huge
        }

        if (isBad) {
            console.log(`Deleting bad ChainTransaction: ${tx.id} (${tx.amount} ${tx.chain})`);
            await prisma.chainTransaction.delete({ where: { id: tx.id } });
            deletedCount++;
        }
    }

    console.log(`Deleted ${deletedCount} bad ChainTransactions.`);

    // Clean up LedgerEntries
    const entries = await prisma.ledgerEntry.findMany();
    let deletedLedgerCount = 0;

    for (const entry of entries) {
        const val = parseFloat(entry.amount);
        let isBad = false;

        if (entry.chain === "ETH" || entry.chain === "BSC") {
            if (val > 1_000_000) isBad = true;
        } else if (entry.chain === "SOL") {
            if (val > 10_000_000) isBad = true;
        }

        if (isBad) {
            console.log(`Deleting bad LedgerEntry: ${entry.id} (${entry.amount} ${entry.chain})`);
            await prisma.ledgerEntry.delete({ where: { id: entry.id } });
            deletedLedgerCount++;
        }
    }

    console.log(`Deleted ${deletedLedgerCount} bad LedgerEntries.`);
    process.exit(0);
}

cleanUpBadData().catch(console.error);
