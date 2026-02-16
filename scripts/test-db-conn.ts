import { prisma } from "../lib/prisma";

async function test() {
    try {
        console.log("Testing Prisma connection...");
        await prisma.$connect();
        console.log("Connected!");
        const res = await prisma.$executeRaw`SELECT 1`;
        console.log("Query result:", res);
    } catch (e: any) {
        console.error("Connection failed:", e.message);
    } finally {
        await prisma.$disconnect();
    }
}

test();
