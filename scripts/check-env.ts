import { networkConfig } from "../core/network-config";
import { loadMasterSeed } from "../lib/wallet/utils";

async function check() {
    console.log("NETWORK env:", process.env.NETWORK);
    console.log("NetworkConfig Mode:", networkConfig.getMode());

    try {
        const seed = await loadMasterSeed();
        console.log("Seed loaded. Length:", seed.length);
        console.log("Seed starts with:", seed.substring(0, 10), "...");
    } catch (e: any) {
        console.error("Error:", e.message);
    }
    process.exit(0);
}

check();
