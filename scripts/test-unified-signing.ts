import * as dotenv from "dotenv";
dotenv.config();
import { generateAddress, processWithdrawal } from "../lib/wallet/wallet-service";
import { Keypair } from "@solana/web3.js";

async function test() {
    const userId = "cmli2bcpp0000dj58qvyfht0h";

    console.log("\n=== Testing Multi-Chain Wallet Service ===\n");

    try {
        // 1. Generate Addresses (Ensure wallets exist in DB)
        console.log("1. Generating Addresses...");

        const ethAddr = await generateAddress(userId, "ETH");
        console.log(`✅ ETH Address: ${ethAddr}`);

        const bscAddr = await generateAddress(userId, "BSC");
        console.log(`✅ BSC Address: ${bscAddr}`);

        const solAddr = await generateAddress(userId, "SOL");
        console.log(`✅ SOL Address: ${solAddr}`);

        console.log("\n2. Testing Signing...");

        // Use a random valid Solana address for testing destination
        const randomSolDest = Keypair.generate().publicKey.toBase58();

        // ----------------------------------------------------------------
        // ETHEREUM TEST
        // ----------------------------------------------------------------
        console.log("🔷 Testing ETH transaction...");
        try {
            const ethResult = await processWithdrawal(userId, "ETH", {
                to: "0x070FB771612106e2F3F6b7d150F9AA724b2f5CF0",
                amount: "0.0001"
            });
            console.log(`✅ ETH TX Hash: ${ethResult.txHash} (ID: ${ethResult.id})\n`);
        } catch (error) {
            console.error(`❌ ETH failed:`, error);
        }

        // ----------------------------------------------------------------
        // BSC TEST
        // ----------------------------------------------------------------
        console.log("🟡 Testing BSC transaction...");
        try {
            const bscResult = await processWithdrawal(userId, "BSC", {
                to: "0x070FB771612106e2F3F6b7d150F9AA724b2f5CF0",
                amount: "0.0001"
            });
            console.log(`✅ BSC TX Hash: ${bscResult.txHash} (ID: ${bscResult.id})\n`);
        } catch (error) {
            console.error(`❌ BSC failed:`, error);
        }

        // ----------------------------------------------------------------
        // SOLANA TEST
        // ----------------------------------------------------------------
        console.log("🟣 Testing SOL transaction...");
        try {
            console.log(`Using random destination: ${randomSolDest}`);
            const solResult = await processWithdrawal(userId, "SOL", {
                to: randomSolDest,
                amount: "0.001"
            });
            console.log(`✅ SOL TX Signature: ${solResult.txHash} (ID: ${solResult.id})\n`);
        } catch (error) {
            console.error(`❌ SOL failed:`, error);
        }

    } catch (error) {
        console.error("Critical Setup Error:", error);
    }

    console.log("=== Tests complete! ===\n");
}

test().catch(console.error);
