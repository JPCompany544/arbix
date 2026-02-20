import { prisma } from "../lib/prisma";
import { loadMasterSeed } from "../lib/wallet/utils";
import { ethers } from "ethers";

async function run() {
    console.log("--- Healing & De-duplicating ETH Wallets ---");
    const mnemonic = await loadMasterSeed();

    // 1. Get all ETH wallets
    const wallets = await prisma.userWallet.findMany({ where: { chain: 'ETH' } });

    // 2. Map correct address to index
    const correctIndices: Record<string, number> = {};
    for (let i = 0; i < 20; i++) {
        const path = `m/44'/60'/0'/0/${i}`;
        const node = ethers.HDNodeWallet.fromPhrase(mnemonic, undefined, "m").derivePath(path);
        correctIndices[node.address.toLowerCase()] = i;
    }

    // 3. Process wallets
    const seenAddresses = new Set<string>();

    for (const w of wallets) {
        const addr = w.address.toLowerCase();
        const correctIndex = correctIndices[addr];

        if (correctIndex === undefined) {
            console.log(`⚠️ Wallet ${w.address} index not found in first 20. Skipping index correction.`);
            continue;
        }

        if (seenAddresses.has(addr)) {
            console.log(`🗑️ DELETING DUPLICATE: ${w.address} (User: ${w.userId}, Index: ${w.derivationIndex})`);
            await prisma.userWallet.delete({ where: { id: w.id } });
            continue;
        }

        if (w.derivationIndex !== correctIndex) {
            console.log(`🔧 FIXING INDEX: ${w.address} (User: ${w.userId})`);
            console.log(`   ${w.derivationIndex} -> ${correctIndex}`);

            // Check if another wallet currently has the target index
            const collision = await prisma.userWallet.findFirst({
                where: { chain: 'ETH', derivationIndex: correctIndex }
            });

            if (collision) {
                console.log(`   💥 COLLISION with index ${correctIndex}. Temporary swap needed.`);
                // Temp move collision to index 999
                await prisma.userWallet.update({
                    where: { id: collision.id },
                    data: { derivationIndex: 999 + correctIndex }
                });
            }

            await prisma.userWallet.update({
                where: { id: w.id },
                data: { derivationIndex: correctIndex }
            });
        }

        seenAddresses.add(addr);
    }

    console.log("✅ Done.");
    process.exit(0);
}

run();
