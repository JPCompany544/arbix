import { prisma } from "../lib/prisma";

async function check() {
    const userId = "cmlkl9925000cawdip9dycmslpk";
    const wallet = await prisma.userWallet.findUnique({
        where: { userId_chain: { userId, chain: "ETH" } }
    });
    console.log("Wallet for test3@gmail.com (ETH):", wallet);
}

check();
