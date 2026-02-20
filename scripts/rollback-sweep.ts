import { prisma } from "../lib/prisma";

async function rollback() {
    const sweepId = "cmluyhq42002n3rhtdnmbbwo6"; // The successful but on-chain missing sweep
    const source = "0x86EBE6c0C92aeDb5cfA82c03ceF53f2d55B68Da5";
    const amountRaw = "1134090117393563";

    console.log(`Rolling back sweep ${sweepId}...`);

    // Find the ledger
    const ledger = await prisma.treasuryLedger.findFirst({
        where: {
            referenceType: "SWEEP",
            description: { contains: source }
        },
        orderBy: { createdAt: "desc" }
    });

    await prisma.$transaction(async (tx) => {
        // 1. Mark sweep as FAILED
        await tx.sweep.update({
            where: { id: sweepId },
            data: {
                status: "FAILED",
                error: "Broadcasted with too low gas (Underpriced). Funds never left source wallet."
            }
        });

        // 2. Restore UserWallet lastKnownBalance
        await tx.userWallet.update({
            where: {
                userId_chain: {
                    userId: "system_treasury_vault",
                    chain: "ETH"
                }
            },
            data: { lastKnownBalance: amountRaw }
        });

        // 3. Delete Ledger entries if found
        if (ledger) {
            console.log(`Deleting ledger ${ledger.id} and its entries...`);
            await tx.treasuryEntry.deleteMany({ where: { ledgerId: ledger.id } });
            await tx.treasuryLedger.delete({ where: { id: ledger.id } });
        }
    });

    console.log("✅ Rollback complete. App state restored to pre-sweep.");
    process.exit(0);
}

rollback();
