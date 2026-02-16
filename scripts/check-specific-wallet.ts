import { prisma } from "../lib/prisma";

async function check() {
    const wallet = await prisma.userWallet.findFirst({
        where: { address: { contains: "0x0D6B4" } }
    });
    console.log("Wallet:", wallet);

    if (wallet) {
        const balance = await prisma.userBalance.findUnique({
            where: { userId_chain: { userId: wallet.userId, chain: "ETH" } }
        });
        console.log("Balance:", balance);

        const ledger = await prisma.ledgerEntry.findMany({
            where: { userId: wallet.userId, chain: "ETH" }
        });
        console.log("Ledger Count:", ledger.length);
        console.log("Ledger Entries:", ledger);
    }
}

check().catch(console.error);
