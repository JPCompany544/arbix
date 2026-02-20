import { prisma } from "../lib/prisma";

async function main() {
    console.log("Starting cleanup of 'Ghost' deposits...");

    // 1. Delete Ledger Entries marked as POLLING_DETECTED
    const deletedLedger = await prisma.ledgerEntry.deleteMany({
        where: { referenceId: "POLLING_DETECTED" }
    });
    console.log(`✅ Deleted ${deletedLedger.count} ledger entries (POLLING_DETECTED).`);

    // 2. Delete Chain Transactions marked as POLLING_DETECTED (if any)
    const deletedChainTx = await prisma.chainTransaction.deleteMany({
        where: { txHash: "POLLING_DETECTED" }
    });
    console.log(`✅ Deleted ${deletedChainTx.count} chain transactions (POLLING_DETECTED).`);

    // 3. Reset User Balances based on remaining Ledger Entries
    // This is safer than just deleting, as it ensures internal consistency
    const users = await prisma.user.findMany({
        include: { balances: true }
    });

    for (const user of users) {
        console.log(`Processing user ${user.email}...`);

        // Group ledger entries by chain
        const ledgerEntries = await prisma.ledgerEntry.findMany({
            where: { userId: user.id }
        });

        // Delete all current balances and re-calculate
        await prisma.userBalance.deleteMany({ where: { userId: user.id } });

        const balanceMap: Record<string, bigint> = {};
        for (const entry of ledgerEntries) {
            const amount = BigInt(entry.amount);
            if (entry.type === "DEPOSIT") {
                balanceMap[entry.chain] = (balanceMap[entry.chain] || 0n) + amount;
            } else if (entry.type === "WITHDRAWAL") {
                balanceMap[entry.chain] = (balanceMap[entry.chain] || 0n) - amount;
            }
        }

        for (const [chain, bal] of Object.entries(balanceMap)) {
            await prisma.userBalance.create({
                data: {
                    userId: user.id,
                    chain,
                    balance: bal.toString()
                }
            });
            console.log(`   - Fixed ${chain} balance to ${bal.toString()}`);
        }
    }

    console.log("\nCleanup Complete. Your dashboard stats should now reflect only transactions with valid on-chain hashes.");
}

main().catch(console.error);
