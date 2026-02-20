import { decryptSeed } from "../lib/security/encryption";
import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

async function brute() {
    const target = "0x86EBE6c0C92aeDb5cfA82c03ceF53f2d55B68Da5".toLowerCase();
    const derivedTarget = "0x5824dA96021E9Dc17cD779D462De81B70bCD7AC5".toLowerCase();

    console.log("Searching for derivation of:", target);
    console.log("Error says it derived instead:", derivedTarget);

    const mainnetSeedEnc = process.env.MASTER_SEED_ENCRYPTED_MAINNET;
    const testnetSeedEnc = process.env.MASTER_SEED_ENCRYPTED;

    const seeds = [
        { name: "Mainnet Seed", enc: mainnetSeedEnc },
        { name: "Testnet Seed", enc: testnetSeedEnc }
    ];

    for (const s of seeds) {
        if (!s.enc) {
            console.log(`\n--- Skipping ${s.name} (not in .env) ---`);
            continue;
        }

        console.log(`\n--- Checking ${s.name} ---`);
        try {
            const mnemonic = await decryptSeed(s.enc);
            const path = `m/44'/60'/0'/0/0`;
            const node = ethers.HDNodeWallet.fromPhrase(mnemonic, undefined, "m").derivePath(path);

            console.log(`  Path ${path}: ${node.address}`);

            if (node.address.toLowerCase() === target) {
                console.log(`  ✅ MATCH FOUND with ${s.name} at index 0!`);
            } else if (node.address.toLowerCase() === derivedTarget) {
                console.log(`  ⚠️ This seed produces the WRONG address (observed in error) at index 0.`);
            } else {
                console.log(`  ❌ No match at index 0.`);
            }

            // Try common alternative paths just in case
            const altPath = `m/44'/60'/0'/0/1`;
            const altNode = ethers.HDNodeWallet.fromPhrase(mnemonic, undefined, "m").derivePath(altPath);
            console.log(`  Path ${altPath}: ${altNode.address}`);
            if (altNode.address.toLowerCase() === target) console.log(`  ✅ MATCH FOUND with ${s.name} at index 1!`);

        } catch (e: any) {
            console.error(`  Error: ${e.message}`);
        }
    }
    process.exit(0);
}

brute();
