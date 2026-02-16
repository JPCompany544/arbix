import { prisma } from "../lib/prisma";

async function list() {
    const wallets = await prisma.userWallet.findMany();
    for (const w of wallets) {
        console.log(`User: ${w.userId}, Chain: ${w.chain}, Address: ${w.address}, Balance: ${w.lastKnownBalance}`);
    }
}

list().catch(console.error);
