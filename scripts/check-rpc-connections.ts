import { ethers } from "ethers";
import { Connection } from "@solana/web3.js";
import { networkConfig } from "../core/network-config";
import * as dotenv from "dotenv";

dotenv.config();

async function checkRpc() {
    console.log("--- RPC Connection Check ---");
    const chains = ["ETH", "BSC", "SOL"];
    const mode = networkConfig.getMode();
    console.log(`Current Mode: ${mode.toUpperCase()}`);

    for (const chain of chains) {
        const url = networkConfig.getRpc(chain);
        console.log(`[${chain}] URL: ${url}`);

        try {
            if (chain === "ETH" || chain === "BSC") {
                const provider = new ethers.JsonRpcProvider(url);
                const block = await provider.getBlockNumber();
                console.log(`[${chain}] ✅ Success! Block: ${block}`);
            } else if (chain === "SOL") {
                const connection = new Connection(url);
                const slot = await connection.getSlot();
                console.log(`[${chain}] ✅ Success! Slot: ${slot}`);
            }
        } catch (err: any) {
            console.error(`[${chain}] ❌ Failed: ${err.message}`);
        }
    }
}

checkRpc();
