import { ethers } from "ethers";
import * as fs from "fs";

async function checkPublic() {
    const txHash = "0x0d90fd46d3d1a68ecaeaa8f1eb8bc5a70fa77fa86cb80a4416b20cf02888dbe4";
    const rpcs = [
        "https://eth.llamarpc.com",
        "https://rpc.ankr.com/eth",
        "https://cloudflare-eth.com"
    ];

    const log = [];
    log.push(`Checking TX: ${txHash} on public RPCs`);

    for (const rpc of rpcs) {
        try {
            const provider = new ethers.JsonRpcProvider(rpc);
            const tx = await provider.getTransaction(txHash);
            log.push(`${rpc}: ${tx ? "FOUND" : "NOT FOUND"}`);
        } catch (e: any) {
            log.push(`${rpc}: ERROR (${e.message})`);
        }
    }

    fs.writeFileSync("scripts/public-tx-check.log", log.join("\n"), "utf8");
    process.exit(0);
}

checkPublic();
