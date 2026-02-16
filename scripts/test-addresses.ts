import * as dotenv from "dotenv";
dotenv.config();
import { generateAddress } from "../lib/wallet/engine";


async function test() {
    const userId = "cmli2bcpp0000dj58qvyfht0h";

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
