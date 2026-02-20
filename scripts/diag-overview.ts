import { getGlobalOverview } from "../src/treasury/integrity/GlobalOverviewService";

async function main() {
    const res = await getGlobalOverview();
    console.log("Overall Summary:");
    console.log("Total Reserve USD:", res.combined.usdSummary.totalReserveUsd);
    console.log("Total Liability USD:", res.combined.usdSummary.totalLiabilityUsd);
    console.log("Total Equity USD:", res.combined.usdSummary.totalEquityUsd);

    console.log("\nPer-Network Breakdown:");
    res.networks.forEach(n => {
        console.log(`- ${n.networkName}: Reserves $${n.usdReserves}, Liabilities $${n.usdLiabilities}, Wallets: ${n.walletCount}`);
        if (n.reserves.length > 0) {
            console.log(`  Assets: ${JSON.stringify(n.reserves)}`);
        }
    });
}

main().catch(console.error);
