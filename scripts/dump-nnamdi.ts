import { prisma } from "../lib/prisma";

async function check() {
    const user = await prisma.user.findUnique({
        where: { email: "nnamdionyekej@gmail.com" },
        include: {
            wallets: {
                where: { chain: "ETH" }
            }
        }
    });
    console.log(JSON.stringify(user, null, 2));
}

check();
