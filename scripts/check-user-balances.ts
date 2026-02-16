import { prisma } from "../lib/prisma";

async function check() {
    const userId = "cmlkl9925000cawdipfxp7gslpk"; // Guessing the full ID
    const balances = await prisma.userBalance.findMany({
        where: { userId: { contains: "cmlkl9925" } }
    });
    console.log(JSON.stringify(balances, null, 2));
}

check();
