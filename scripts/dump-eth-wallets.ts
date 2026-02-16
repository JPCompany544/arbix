import { prisma } from "../lib/prisma";

async function check() {
    const wallets = await prisma.userWallet.findMany({
        where: { chain: "ETH" }
    });
    console.log(JSON.stringify(wallets, null, 2));
}

check();
