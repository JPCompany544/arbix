import { prisma } from "../lib/prisma";

async function list() {
    const balances = await prisma.userBalance.findMany({
        where: { chain: "ETH" }
    });
    console.log(`Found ${balances.length} ETH balances.`);
    for (const b of balances) {
        console.log(`User: ${b.userId}, Balance: ${b.balance}`);
    }
}

list().catch(console.error);
