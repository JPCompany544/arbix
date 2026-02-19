import * as bip39 from "bip39";
import { encryptSeed } from "../lib/security/encryption";
import * as dotenv from "dotenv";

dotenv.config();

async function generateProductionSeed() {
    console.log("--- Production Seed Generator ---");

    // 1. Generate new 24-word mnemonic
    const mnemonic = bip39.generateMnemonic(256); // 256 bits = 24 words

    console.log("Generated Production Mnemonic (KEEP THIS SECURE):");
    console.log("------------------------------------------------");
    console.log(mnemonic);
    console.log("------------------------------------------------");

    // 2. Encrypt it using the current SEED_ENCRYPTION_KEY
    if (!process.env.SEED_ENCRYPTION_KEY) {
        console.error("Error: SEED_ENCRYPTION_KEY not found in .env. Cannot encrypt.");
        process.exit(1);
    }

    const encrypted = await encryptSeed(mnemonic);

    console.log("\nAdd the following to your .env file for PRODUCTION use:");
    console.log("------------------------------------------------");
    console.log(`MASTER_SEED_ENCRYPTED_MAINNET="${encrypted}"`);
    console.log("------------------------------------------------");

    console.log("\nWARNING: Once added, the platform will use this for mainnet operations.");
}

generateProductionSeed().catch(console.error);
