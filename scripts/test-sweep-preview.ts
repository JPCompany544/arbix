import { SweepEngine } from "../src/treasury/sweep/SweepEngine";

async function main() {
    const engine = new SweepEngine();
    const result = await engine.sweepAll({
        network: "ETH",
        currency: "ETH",
        hotWalletAddress: "0x1111111111111111111111111111111111111111",
        dustThreshold: 1000000n,
        adminId: "JP",
        dryRun: true
    });

    console.log("--- SWEEP PREVIEW RESULTS ---");
    console.log("Wallet Count:", result.walletCount);
    console.log("Total Amount (Raw):", result.totalAmount);
    if (result.processed.length > 0) {
        console.log("First Entry Status:", result.processed[0].status);
        console.log("First Entry Amount:", result.processed[0].amount);
    }
}

main().catch(console.error);
