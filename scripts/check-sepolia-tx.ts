import { ethers } from "ethers";
import * as fs from "fs";

async function checkSepolia() {
    const txHash = "0x0d90fd46d3d1a68ecaeaa8f1eb8bc5a70fa77fa86cb80a4416b20cf02888dbe4";
    const rpc = "https://eth-sepolia.g.alchemy.com/v2/qE99NzHtbbRNfpetHDaOVVe2UjMvKmKl";

    const log = [];
    log.push(`Checking TX: ${txHash} on SEPOLIA`);

    try {
        const provider = new ethers.JsonRpcProvider(rpc);
        const tx = await provider.getTransaction(txHash);
        log.push(`RESULT: ${tx ? "FOUND" : "NOT FOUND"}`);
        if (tx) {
            log.push(`From: ${tx.from}`);
            log.push(`To: ${tx.to}`);
            log.push(`Value: ${ethers.formatEther(tx.value || 0n)} ETH`);
        }
    } catch (e: any) {
        log.push(`ERROR: ${e.message}`);
    }

    fs.writeFileSync("scripts/sepolia-tx-check.log", log.join("\n"), "utf8");
    process.exit(0);
}

checkSepolia();
