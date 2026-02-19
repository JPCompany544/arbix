import { networkConfig } from "../core/network-config";

async function verifyConfig() {
    console.log("--- Network Config Verification ---");

    // Test env aliases
    // We can't easily change process.env here for the class already initialized,
    // but we can check what it currently says.

    console.log(`Mode: ${networkConfig.getMode()}`);
    console.log(`ETH Explorer: ${networkConfig.getExplorerUrl("ETH")}`);
    console.log(`SOL Explorer: ${networkConfig.getExplorerUrl("SOL")}`);
    console.log(`BSC Explorer: ${networkConfig.getExplorerUrl("BSC")}`);
}

verifyConfig();
