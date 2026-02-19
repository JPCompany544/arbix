import * as dotenv from "dotenv";
dotenv.config();
import { prisma } from "../lib/prisma";

async function main() {
    console.log("--- DB Connection Test ---");
    const mode = process.env.NETWORK || "testnet";
    console.log(`Mode: ${mode}`);

    try {
        const tables = await prisma.$queryRaw<any[]>`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'`;
        const tableNames = tables.map(t => t.tablename);
        console.log("--- TABLES LIST START ---");
        for (const name of tableNames) {
            console.log(`- ${name}`);
        }
        console.log("--- TABLES LIST END ---");
        console.log("CHECK_TREASURY_STATE:", tableNames.includes("TreasuryState"));
        console.log("CHECK_LOWERCASE:", tableNames.includes("treasurystate"));
    } catch (err) {
        console.error("Failed to query tables:", err);
        process.exit(0);
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
