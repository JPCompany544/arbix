import { prisma } from "../lib/prisma";

async function check() {
    const balances = await prisma.userBalance.findMany({
        where: { chain: "ETH" }
    });
    console.log(`ETH Balances records: ${balances.length}`);
    for (const b of balances) {
        console.log(`User: ${b.userId}, Balance: ${b.balance}`);
    }
}

check();
