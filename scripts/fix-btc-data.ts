import { prisma } from "../lib/prisma";

async function fixBtcDisplay() {
    console.log("Fixing BTC transaction display issues...");

    // Find all BTC transactions with amount > 100 (assuming anything > 100 BTC for a test user is likely satoshis)
    const btcTxs = await prisma.chainTransaction.findMany({
        where: {
            chain: "BTC"
        }
    });

    let fixedCount = 0;

    for (const tx of btcTxs) {
        const val = parseFloat(tx.amount);

        // Heuristic: If amount is > 100, it's probably Satoshis (since 100 BTC is $6M+)
        // The user mentioned "687" -> 0.00000687
        if (val > 100) {
            console.log(`Fixing BTC Transaction ${tx.id}: ${tx.amount} -> ${val / 100_000_000}`);

            await prisma.chainTransaction.update({
                where: { id: tx.id },
                data: {
                    amount: (val / 100_000_000).toFixed(8) // Standard BTC format
                }
            });
            fixedCount++;
        }
    }

    console.log(`Fixed ${fixedCount} BTC ChainTransactions.`);

    // Also check LedgerEntries
    const btcLedger = await prisma.ledgerEntry.findMany({
        where: {
            chain: "BTC"
        }
    });

    let fixedLedgerCount = 0;
    for (const entry of btcLedger) {
        const val = parseFloat(entry.amount);
        if (val > 100) {
            console.log(`Fixing BTC LedgerEntry ${entry.id}: ${entry.amount} -> ${val / 100_000_000}`);
            await prisma.ledgerEntry.update({
                where: { id: entry.id },
                data: {
                    amount: (val / 100_000_000).toFixed(8)
                }
            });
            fixedLedgerCount++;
        }
    }
    console.log(`Fixed ${fixedLedgerCount} BTC LedgerEntries.`);
}

fixBtcDisplay().catch(console.error).finally(() => prisma.$disconnect());
