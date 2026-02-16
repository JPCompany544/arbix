import { prisma } from "../lib/prisma";
import { ethers, JsonRpcProvider } from "ethers";

async function check() {
    const rpc = "https://sepolia.infura.io/v3/a095fe9b9e4a4048a6817c913e00fa31";
    const provider = new JsonRpcProvider(rpc);

    const wallets = await prisma.userWallet.findMany({
        where: { chain: "ETH" },
        include: { user: true }
    });

    console.log(`Found ${wallets.length} ETH wallets.`);

    for (const w of wallets) {
        const onChain = await provider.getBalance(w.address);
        console.log(`User: ${w.user.email} (${w.userId})`);
        console.log(`Address: ${w.address}`);
        console.log(`DB Balance: ${w.lastKnownBalance} wei`);
        console.log(`On-Chain: ${onChain.toString()} wei (${ethers.formatEther(onChain)} ETH)`);
        console.log("---");
    }
}

check().catch(console.error);
