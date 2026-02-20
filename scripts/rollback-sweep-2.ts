import { prisma } from "../lib/prisma";

async function rollback() {
    const sweepId = "cmluzjke8005c3rhtyohcuo73";
    const source = "0x86EBE6c0C92aeDb5cfA82c03ceF53f2d55B68Da5";
    const amountRaw = "1134090117393563";

    console.log(`Rolling back second ghost sweep ${sweepId}...`);

    const ledger = await prisma.treasuryLedger.findFirst({
        where: {
            referenceType: "SWEEP",
            description: { contains: source }
        },
        orderBy: { createdAt: "desc" }
    });

    await prisma.$transaction(async (tx) => {
        await tx.sweep.update({
            where: { id: sweepId },
            data: {
                status: "FAILED",
                error: "Underpriced broadcast (rejected by network). Restored balance."
            }
        });

        await tx.userWallet.update({
            where: {
                userId_chain: {
                    userId: "system_treasury_vault",
                    chain: "ETH"
                }
            },
            data: { lastKnownBalance: amountRaw }
        });

        if (ledger) {
            console.log(`Deleting ledger ${ledger.id}...`);
            await tx.treasuryEntry.deleteMany({ where: { ledgerId: ledger.id } });
            await tx.treasuryLedger.delete({ where: { id: ledger.id } });
        }
    });

    console.log("✅ Rollback complete.");
    process.exit(0);
}

rollback();
