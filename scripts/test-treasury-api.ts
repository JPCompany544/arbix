import * as dotenv from "dotenv";
dotenv.config();
import { getTreasuryOverview } from "../lib/treasury/treasury-service";
import { prisma } from "../lib/prisma";

async function test() {
    console.log("Testing Treasury Overview Logic...");
    try {
        const start = Date.now();
        const overview = await getTreasuryOverview();
        const end = Date.now();
        console.log(`Success! Took ${end - start}ms`);
        console.log(JSON.stringify(overview, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2));
    } catch (error) {
        console.error("Treasury Overview Failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

test().catch(console.error);
