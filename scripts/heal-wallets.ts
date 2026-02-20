import { prisma } from "../lib/prisma";
import { loadMasterSeed } from "../lib/wallet/utils";
import { ethers } from "ethers";

async function heal() {
    console.log("--- Healing UserWallet Derivation Indices ---");

    const mnemonic = await loadMasterSeed();
    const wallets = await prisma.userWallet.findMany({ where: { chain: 'ETH' } });

    console.log(`Checking ${wallets.length} wallets...`);

    for (const w of wallets) {
        if (!w.address || w.address === "ADDRESS_NOT_GENERATED_YET") continue;

        let found = false;
        // Search first 50 indices for a match
        for (let i = 0; i < 50; i++) {
            const path = `m/44'/60'/0'/0/${i}`;
            const node = ethers.HDNodeWallet.fromPhrase(mnemonic, undefined, "m").derivePath(path);

            if (node.address.toLowerCase() === w.address.toLowerCase()) {
                if (w.derivationIndex !== i) {
                    console.log(`🔧 HEALING: Wallet ${w.address} (User: ${w.userId})`);
                    console.log(`   Old Index: ${w.derivationIndex} -> New Correct Index: ${i}`);

                    await prisma.userWallet.update({
                        where: { id: w.id },
                        data: { derivationIndex: i }
                    });
                } else {
                    console.log(`✅ OK: Wallet ${w.address} matches index ${i}`);
                }
                found = true;
                break;
            }
        }

        if (!found) {
            console.error(`❌ ERROR: Could not find correct index for wallet ${w.address} in first 50 indices.`);
        }
    }

    process.exit(0);
}

heal();
