import { prisma } from "../lib/prisma";

async function main() {
    const ethNetwork = await prisma.network.findFirst({
        where: { name: "ETH" }
    });

    if (!ethNetwork) {
        console.log("ETH network not found in Network table.");
        return;
    }

    const reserves = await prisma.reserveEntry.findMany({
        where: { networkId: ethNetwork.id },
        include: { wallet: true }
    });

    console.log("--- ETH Reserve Breakdown ---");
    reserves.forEach(r => {
        const balance = Number(r.rawBalance) / (10 ** r.decimals);
        console.log(`Address: ${r.wallet.address}`);
        console.log(`Label:   ${r.wallet.label}`);
        console.log(`Balance: ${balance} ETH`);
        console.log(`Raw:     ${r.rawBalance.toString()}`);
        console.log("----------------------------");
    });

    const userWallets = await prisma.userWallet.findMany({
        where: { chain: "ETH" }
    });

    console.log("\n--- ETH UserWallet Table (Sweepable) ---");
    userWallets.forEach(uw => {
        const balance = Number(uw.lastKnownBalance) / 1e18;
        console.log(`Address: ${uw.address}`);
        console.log(`Balance: ${balance} ETH`);
        console.log(`Raw:     ${uw.lastKnownBalance}`);
        console.log("----------------------------");
    });
}

main().catch(console.error);
