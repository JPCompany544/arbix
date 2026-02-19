import { prisma } from "../lib/prisma";
import { ethers } from "ethers";
import { providerRegistry } from "../core/provider-registry";

async function check() {
    const provider = providerRegistry.getEvmProvider("ETH");

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
