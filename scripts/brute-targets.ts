import { decryptSeed } from "../lib/security/encryption";
import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

async function brute() {
    const targets = [
        "0x86EBE6c0C92aeDb5cfA82c03ceF53f2d55B68Da5",
        "0x5660d66aa65E11200D47E6Fc77193DAfE988dF4B"
    ].map(t => t.toLowerCase());

    const mainnetSeedEnc = process.env.MASTER_SEED_ENCRYPTED_MAINNET;
    const testnetSeedEnc = process.env.MASTER_SEED_ENCRYPTED;

    const seeds = [
        { name: "Mainnet Seed", enc: mainnetSeedEnc },
        { name: "Testnet Seed", enc: testnetSeedEnc }
    ];

    for (const s of seeds) {
        if (!s.enc) continue;
        console.log(`\n--- Checking ${s.name} ---`);
        const mnemonic = await decryptSeed(s.enc);

        for (let i = 0; i < 5; i++) {
            const path = `m/44'/60'/0'/0/${i}`;
            const node = ethers.HDNodeWallet.fromPhrase(mnemonic, undefined, "m").derivePath(path);
            const addr = node.address.toLowerCase();
            console.log(`  [${i}] ${node.address}`);

            if (targets.includes(addr)) {
                console.log(`  ✅ MATCH FOUND: ${node.address} at index ${i}`);
            }
        }
    }
    process.exit(0);
}

brute();
