import { prisma } from "../lib/prisma";
import { loadMasterSeed } from "../lib/wallet/utils";
import { ethers } from "ethers";

async function diag() {
    console.log("--- Treasury Sweep Diagnosis ---");

    // 1. Check TreasuryAccounts
    const accounts = await prisma.treasuryAccount.findMany();
    console.log("Treasury Accounts in DB:", accounts.map(a => a.name));

    // 2. Check UserWallets and Derivation
    const wallets = await prisma.userWallet.findMany({ where: { chain: 'ETH' } });
    console.log(`Found ${wallets.length} ETH wallets.`);

    try {
        const mnemonic = await loadMasterSeed();
        console.log("Master seed loaded successfully.");

        for (const w of wallets) {
            const path = `m/44'/60'/0'/0/${w.derivationIndex}`;
            const node = ethers.HDNodeWallet.fromPhrase(mnemonic, undefined, "m").derivePath(path);
            const derivedAddress = node.address;

            const match = derivedAddress.toLowerCase() === w.address.toLowerCase();
            console.log(`Wallet ${w.address}: index ${w.derivationIndex} -> derived ${derivedAddress} [${match ? "MATCH" : "MISMATCH"}]`);
        }
    } catch (e: any) {
        console.error("Error loading seed or deriving:", e.message);
    }

    process.exit(0);
}

diag();
