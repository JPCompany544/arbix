
import * as dotenv from "dotenv";
dotenv.config();
import { prisma } from "../lib/prisma";

async function test() {
    try {
        console.log("Testing Prisma connection...");
        const count = await prisma.user.count();
        console.log("User count:", count);

        const userId = "cmli2bcpp0000dj58qvyfht0h";
        console.log("Testing findUnique with userId_chain for:", userId);

        const wallet = await prisma.userWallet.findUnique({
            where: {
                userId_chain: {
                    userId,
                    chain: "ETH"
                }
            }
        });

        console.log("Wallet found:", wallet ? wallet.address : "NOT FOUND");

    } catch (err) {
        console.error("TEST FAILED:", err);
    } finally {
        await prisma.$disconnect();
    }
}

test();
