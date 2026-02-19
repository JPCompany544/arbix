import { prisma } from "../lib/prisma";
import { chainFactory } from "../core/chain-factory";

async function cleanUpBadData() {
    console.log("Cleaning up bad transaction data...");

    const txs = await prisma.chainTransaction.findMany();
    let deletedCount = 0;

    for (const tx of txs) {
        const chainImpl = chainFactory.getChain(tx.chain);
        const val = parseFloat(tx.amount);
        let isBad = false;

        // Custom threshold per chain (Human readable units)
        const thresholds: Record<string, number> = {
            ETH: 1_000_000,
            BSC: 1_000_000,
            SOL: 10_000_000,
            BTC: 100_000,
            XRP: 100_000_000
        };

        if (val > (thresholds[tx.chain] || 1_000_000)) {
            isBad = true;
        }

        if (isBad) {
            console.log(`Deleting bad ChainTransaction: ${tx.id} (${tx.amount} ${chainImpl.getSymbol()})`);
            await prisma.chainTransaction.delete({ where: { id: tx.id } });
            deletedCount++;
        }
    }

    console.log(`Deleted ${deletedCount} bad ChainTransactions.`);

    // Clean up LedgerEntries
    const entries = await prisma.ledgerEntry.findMany();
    let deletedLedgerCount = 0;

    for (const entry of entries) {
        const chainImpl = chainFactory.getChain(entry.chain);
        const val = parseFloat(entry.amount);
        // Note: LedgerEntry amount is stored as Smallest Unit string, but parseFloat works for basic comparison
        // Let's use toHumanUnit for more accurate comparison if needed
        const humanAmount = parseFloat(chainImpl.toHumanUnit(entry.amount));

        const thresholds: Record<string, number> = {
            ETH: 1_000_000,
            BSC: 1_000_000,
            SOL: 10_000_000,
            BTC: 100_000,
            XRP: 100_000_000
        };

        if (humanAmount > (thresholds[entry.chain] || 1_000_000)) {
            console.log(`Deleting bad LedgerEntry: ${entry.id} (${humanAmount} ${chainImpl.getSymbol()})`);
            await prisma.ledgerEntry.delete({ where: { id: entry.id } });
            deletedLedgerCount++;
        }
    }

    console.log(`Deleted ${deletedLedgerCount} bad LedgerEntries.`);
    process.exit(0);
}

cleanUpBadData().catch(console.error);
