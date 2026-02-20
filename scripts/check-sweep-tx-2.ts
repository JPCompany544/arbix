import { providerRegistry } from "../core/provider-registry";
import { ethers } from "ethers";
import * as fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

async function checkTx() {
    const txHash = "0x41b0ae8e4e34bb225dcaf05ce14a25fb8feed260d2405278323a906cc0dd4ba1";
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

        // Check balance of source
        const source = "0x86EBE6c0C92aeDb5cfA82c03ceF53f2d55B68Da5";
        const balance = await provider.getBalance(source);
        log.push(`Source Balance: ${ethers.formatEther(balance)} ETH`);

    } catch (e: any) {
        log.push(`Error: ${e.message}`);
    }

    fs.writeFileSync("scripts/tx-check-2.log", log.join("\n"), "utf8");
    process.exit(0);
}

checkTx();
