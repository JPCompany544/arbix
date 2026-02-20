import { providerRegistry } from "../core/provider-registry";
import { ethers } from "ethers";
import * as fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

async function checkTx() {
    const txHash = "0x0d90fd46d3d1a68ecaeaa8f1eb8bc5a70fa77fa86cb80a4416b20cf02888dbe4";
    const log = [];

    log.push(`Checking transaction: ${txHash}`);
    log.push(`Network: ${process.env.NETWORK}`);

    const provider = providerRegistry.getEvmProvider("ETH");

    try {
        const tx = await provider.getTransaction(txHash);
        if (!tx) {
            log.push("RESULT: Transaction NOT FOUND");
        } else {
            log.push("RESULT: Transaction Found");
            log.push(`From: ${tx.from}`);
            log.push(`To: ${tx.to}`);
            log.push(`Value: ${ethers.formatEther(tx.value || 0n)} ETH`);

            const receipt = await provider.getTransactionReceipt(txHash);
            if (receipt) {
                log.push(`Receipt: Found`);
                log.push(`Status: ${receipt.status === 1 ? "SUCCESS" : "FAILED"}`);
            } else {
                log.push("Receipt: Pending");
            }
        }

        const source = "0x86EBE6c0C92aeDb5cfA82c03ceF53f2d55B68Da5";
        const balance = await provider.getBalance(source);
        log.push(`Source Balance: ${ethers.formatEther(balance)} ETH`);

        const dest = "0x7cc9B83DE23937D9D3d9c5282c7C1882d9A2Db83";
        const destBal = await provider.getBalance(dest);
        log.push(`Dest Balance: ${ethers.formatEther(destBal)} ETH`);

    } catch (e: any) {
        log.push(`Error: ${e.message}`);
    }

    fs.writeFileSync("scripts/tx-check.log", log.join("\n"), "utf8");
    process.exit(0);
}

checkTx();
