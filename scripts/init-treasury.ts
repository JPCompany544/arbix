import { TreasuryService } from "../src/treasury/TreasuryService";
import { prisma } from "../lib/prisma";

async function run() {
    console.log("--- Initializing Treasury Accounts ---");
    try {
        await TreasuryService.initialize();
        console.log("✅ Success: Accounts seeded and index created.");

        const accounts = await prisma.treasuryAccount.findMany();
        console.log("Current Accounts:", accounts.map(a => a.name));
    } catch (e: any) {
        console.error("❌ Error:", e.message);
    }
    process.exit(0);
}

run();
