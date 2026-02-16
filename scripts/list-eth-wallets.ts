import { prisma } from "../lib/prisma";

async function list() {
    const wallets = await prisma.userWallet.findMany({
        where: { chain: "ETH" }
    });
    console.log(`Found ${wallets.length} ETH wallets.`);
    for (const w of wallets) {
        console.log(`User: ${w.userId}, Address: ${w.address}, Balance: ${w.lastKnownBalance}`);
    }
}

list().catch(console.error);
