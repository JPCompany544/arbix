import { prisma } from "../lib/prisma";
import { ethers, JsonRpcProvider } from "ethers";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function check() {
    const ethRpc = process.env.ETH_SEPOLIA_RPC;
    if (!ethRpc) {
        console.error("ETH_SEPOLIA_RPC not found in environment");
        return;
    }
    const provider = new JsonRpcProvider(ethRpc);

    console.log("Checking ETH wallets in DB...");
    const wallets = await prisma.userWallet.findMany({
        where: { chain: "ETH" }
    });

    if (wallets.length === 0) {
        console.log("No ETH wallets found in database.");
        return;
    }

    for (const wallet of wallets) {
        try {
            const onChainBalance = await provider.getBalance(wallet.address);
            console.log(`Address: ${wallet.address}`);
            console.log(`User ID: ${wallet.userId}`);
            console.log(`DB Last Known Balance: ${wallet.lastKnownBalance} wei`);
            console.log(`On-Chain Balance: ${onChainBalance.toString()} wei (${ethers.formatEther(onChainBalance)} ETH)`);

            const previous = BigInt(wallet.lastKnownBalance || "0");
            const current = BigInt(onChainBalance.toString());

            if (current > previous) {
                console.log(`>>> DEPOSIT DETECTED: +${ethers.formatEther(current - previous)} ETH`);
            } else if (current < previous) {
                console.log(`>>> BALANCE DECREASED: -${ethers.formatEther(previous - current)} ETH`);
            } else {
                console.log(">>> No change detected.");
            }
        } catch (e: any) {
            console.error(`Error checking address ${wallet.address}:`, e.message);
        }
    }
}

check().catch(console.error);
