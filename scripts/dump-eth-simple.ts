import { prisma } from "../lib/prisma";

async function check() {
    console.log("Dumping all ETH wallets...");
    const wallets = await prisma.userWallet.findMany({
        where: { chain: "ETH" }
    });
    for (const w of wallets) {
        console.log(`User: ${w.userId}, Address: ${w.address}, lastKnownBalance: ${w.lastKnownBalance}`);
    }
}

check();
