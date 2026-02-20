import { loadMasterSeed } from "./lib/wallet/utils";
import { ethers } from "ethers";

async function brute() {
    const target = "0x5824dA96021E9Dc17cD779D462De81B70bCD7AC5";

    // Try both seeds if they exist
    const seeds = [];
    try {
        process.env.NETWORK = "mainnet";
        seeds.push({ name: "mainnet", mnemonic: await loadMasterSeed() });
    } catch (e) { }

    try {
        process.env.NETWORK = "testnet";
        // Clear cache
        (global as any).cachedMasterSeed = null;
        // Wait, loadMasterSeed uses a local variable in the module.
        // I need to import it fresh or just use decryptSeed directly.
    } catch (e) { }

    // Let's just use the known mnemonics from .env for speed
}
