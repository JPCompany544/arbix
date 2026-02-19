import { networkConfig } from "../core/network-config";

async function verifySecurity() {
    console.log("--- Security & Isolation Verification ---");

    // 1. Network Mode
    const mode = networkConfig.getMode();
    console.log(`Current Mode: ${mode.toUpperCase()}`);

    // 2. Mnemonic Check (Existence)
    const encryptedSeed = process.env.MASTER_SEED_ENCRYPTED;
    console.log(`MASTER_SEED_ENCRYPTED Presence: ${encryptedSeed ? "✅" : "❌"}`);

    // 3. Database Check
    const dbUrl = process.env.DATABASE_URL;
    console.log(`DATABASE_URL Presence: ${dbUrl ? "✅" : "❌"}`);

    if (dbUrl) {
        // Basic parsing to hide secrets but show separation
        try {
            const url = new URL(dbUrl);
            console.log(`DB Host: ${url.hostname}`);
            console.log(`DB Port: ${url.port || '5432'}`);
            console.log(`DB Name: ${url.pathname.substring(1)}`);
        } catch (e) {
            console.log("DB URL: [Invalid Format or Secret]");
        }
    }

    // 4. Isolation Check
    // Check if we have different variables for production
    const prodSeed = process.env.MASTER_SEED_ENCRYPTED_PRODUCTION || process.env.MASTER_SEED_ENCRYPTED_PROD;
    const prodDb = process.env.DATABASE_URL_PRODUCTION || process.env.DATABASE_URL_PROD;

    console.log(`Production Seed Isolated: ${prodSeed ? "✅" : "❌ (Using Shared Env)"}`);
    console.log(`Production DB Isolated: ${prodDb ? "✅" : "❌ (Using Shared Env)"}`);
}

verifySecurity();
