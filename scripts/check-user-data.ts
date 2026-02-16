import { prisma } from "../lib/prisma";

async function check() {
    const userId = "cmlka7d7m001rxy2h6za9y5it";
    console.log(`Checking data for User: ${userId}`);

    const balance = await prisma.userBalance.findUnique({
        where: { userId_chain: { userId, chain: "ETH" } }
    });
    console.log("UserBalance (ETH):", balance);

    const ledger = await prisma.ledgerEntry.findMany({
        where: { userId, chain: "ETH" },
        orderBy: { createdAt: "desc" },
        take: 5
    });
    console.log("Recent Ledger Entries (ETH):", ledger);

    const wallet = await prisma.userWallet.findUnique({
        where: { userId_chain: { userId, chain: "ETH" } }
    });
    console.log("UserWallet (ETH):", wallet);
}

check().catch(console.error);
