import { prisma } from "../lib/prisma";

async function debugHistory() {
    const userId = "cmli2bcpp0000dj58qvyfht0h"; // The test user

    console.log(`Checking history data for user: ${userId}`);

    const txCount = await prisma.transaction.count({ where: { userId } });
    const chainTxCount = await prisma.chainTransaction.count({ where: { userId } });
    const ledgerCount = await prisma.ledgerEntry.count({ where: { userId } });
    const withdrawalCount = await prisma.withdrawal.count({ where: { userId } });

    console.log("------------------------------------------------");
    console.log(`Model: Transaction (Generic) -> Count: ${txCount}`);
    console.log(`Model: ChainTransaction      -> Count: ${chainTxCount}`);
    console.log(`Model: LedgerEntry           -> Count: ${ledgerCount}`);
    console.log(`Model: Withdrawal (Request)  -> Count: ${withdrawalCount}`);
    console.log("------------------------------------------------");

    if (txCount > 0) {
        const txs = await prisma.transaction.findMany({ where: { userId }, take: 5 });
        console.log("Sample Transactions:", txs);
    }

    if (chainTxCount > 0) {
        const cTxs = await prisma.chainTransaction.findMany({ where: { userId }, take: 5 });
        console.log("Sample ChainTransactions:", cTxs);
    }

    if (ledgerCount > 0) {
        const lEntries = await prisma.ledgerEntry.findMany({ where: { userId }, take: 5 });
        console.log("Sample LedgerEntries:", lEntries);
    }
}

debugHistory()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
