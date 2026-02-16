import { prisma } from "../lib/prisma";

async function check() {
    const users = await prisma.user.findMany({
        include: {
            wallets: {
                where: { chain: "ETH" }
            }
        }
    });
    for (const u of users) {
        console.log(`User: ${u.email}, ID: ${u.id}`);
        for (const w of u.wallets) {
            console.log(`  ETH Address: ${w.address}, Balance: ${w.lastKnownBalance}`);
        }
    }
}

check();
