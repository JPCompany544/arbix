import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth";
import { getTreasuryOverview } from "@/lib/treasury/treasury-service";
import { getPrices } from "@/lib/pricing/price-service";

export async function GET() {
    const admin = await verifyAdmin();
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const [overview, prices] = await Promise.all([
            getTreasuryOverview(),
            getPrices(),
        ]);

        const enriched = overview.map(entry => {
            const price = prices[entry.chain] ?? 0;
            return {
                chain: entry.chain,
                symbol: entry.symbol,
                // Human-readable amounts
                totalOnchainBalance: entry.totalOnchainBalance,
                totalUserLiabilities: entry.totalUserLiabilities,
                sweepableBalance: entry.sweepableBalance,
                // Raw strings (BigInt serialised)
                onchainRaw: entry.onchainRaw.toString(),
                liabilitiesRaw: entry.liabilitiesRaw.toString(),
                sweepableRaw: entry.sweepableRaw.toString(),
                // USD values
                price,
                onchainUSD: parseFloat(entry.totalOnchainBalance) * price,
                liabilitiesUSD: parseFloat(entry.totalUserLiabilities) * price,
                sweepableUSD: parseFloat(entry.sweepableBalance) * price,
                // Metadata
                lastSyncedAt: entry.lastSyncedAt,
                locked: entry.locked,
                explorerUrl: entry.explorerUrl,
                walletCount: entry.walletCount,
            };
        });

        return NextResponse.json(enriched);
    } catch (error: any) {
        console.error("[Treasury Overview] Error:", error);
        return NextResponse.json({ error: error.message || "Internal error" }, { status: 500 });
    }
}
