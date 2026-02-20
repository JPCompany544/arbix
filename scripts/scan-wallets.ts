import * as dotenv from "dotenv";
dotenv.config();
import { ethers } from "ethers";
import { loadMasterSeed } from "../lib/wallet/utils";
import { providerRegistry } from "../core/provider-registry";
import { networkConfig } from "../core/network-config";

async function scan() {
    console.log("Starting secure derivation scan...\n");

    try {
        const mnemonic = await loadMasterSeed();
        const chain = "ETH";
        const provider = providerRegistry.getEvmProvider(chain);
        const mode = networkConfig.getMode();

        console.log(`Environment: ${mode}`);
        console.log(`Chain: ${chain}`);
        console.log(`RPC: ${networkConfig.getRpc(chain)}\n`);

        // How many indexes to scan
        const MAX_INDEX = 20;

        for (let i = 0; i < MAX_INDEX; i++) {
            const path = `m/44'/60'/0'/0/${i}`;
            const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic, undefined, "m").derivePath(path);
            const balance = await provider.getBalance(wallet.address);
            const ethBalance = ethers.formatEther(balance);

            console.log(`Index: ${i}`);
            console.log(`Address: ${wallet.address}`);
            console.log(`Balance: ${ethBalance} ETH`);

            if (balance > 0n) {
                console.log("💰 FOUND FUNDS HERE ↑↑↑");
            }
            console.log("");
        }

        console.log("Scan complete.");
    } catch (error) {
        console.error("Scan failed:", error);
    }
}

scan().catch(console.error);
