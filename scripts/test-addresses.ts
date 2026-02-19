import * as dotenv from "dotenv";
dotenv.config();
import { generateAddress } from "../lib/wallet/wallet-service";


async function test() {
    const { prisma } from "../lib/prisma";
    const user = await prisma.user.findFirst();
    if (!user) {
        throw new Error("No users found in database. Run 'npx tsx scripts/seed-test-user.ts' first.");
    }
    const userId = user.id;
    console.log(`Using UserID: ${userId}`);

    console.log("\n=== Testing Multi-Chain Address Generation ===\n");

    // Test ETH
    console.log("🔷 Generating ETH address...");
    const ethAddress = await generateAddress(userId, "ETH");
    console.log(`✅ ETH: ${ethAddress}\n`);

    // Test BSC
    console.log("🟡 Generating BSC address...");
    const bscAddress = await generateAddress(userId, "BSC");
    console.log(`✅ BSC: ${bscAddress}\n`);

    // Test SOL
    console.log("🟣 Generating SOL address...");
    const solAddress = await generateAddress(userId, "SOL");
    console.log(`✅ SOL: ${solAddress}\n`);

    console.log("=== All addresses generated successfully! ===\n");
}

test().catch(console.error);
