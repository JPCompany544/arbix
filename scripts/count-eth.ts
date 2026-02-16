import { prisma } from "../lib/prisma";

async function check() {
    const count = await prisma.userWallet.count({
        where: { chain: "ETH" }
    });
    console.log(`Total ETH wallets in UserWallet table: ${count}`);

    const wallets = await prisma.userWallet.findMany({
        where: { chain: "ETH" }
    });
    for (const w of wallets) {
        console.log(`- ID: ${w.id}, User: ${w.userId}, Address: ${w.address}`);
    }
}

check();
