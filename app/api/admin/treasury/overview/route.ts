import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth";
import { getGlobalOverview, NetworkMetrics } from "@/src/treasury/integrity/GlobalOverviewService";
import { syncTreasuryIntegrity } from "@/src/treasury/integrity/sync-service";

export interface Snapshot {
    totalAssets: number;
    totalLiabilities: number;
    totalEquity: number;
    networks: Array<{
        name: string;
        assets: number;
        liabilities: number;
        equity: number;
        walletCount: number;
        lastSyncedAt: string;
    }>;
}

export async function GET(): Promise<NextResponse<Snapshot | { error: string }>> {
    console.log("[Treasury Overview API] Request received");

    const admin = await verifyAdmin();
    if (!admin) {
        console.log("[Treasury Overview API] Unauthorized");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Auto-sync integrity layer before computing overview (rate-limited to every 30s)
        await syncTreasuryIntegrity().catch((err) => {
            console.warn("[Treasury Overview API] Sync warning:", err.message);
        });

        const overviewData = await getGlobalOverview();

        const snapshot: Snapshot = {
            totalAssets: parseFloat(overviewData.combined.usdSummary.totalReserveUsd),
            totalLiabilities: parseFloat(overviewData.combined.usdSummary.totalLiabilityUsd),
            totalEquity: parseFloat(overviewData.combined.usdSummary.totalEquityUsd),
            networks: overviewData.networks.map((n: NetworkMetrics) => ({
                name: n.networkName,
                assets: parseFloat(n.usdReserves),
                liabilities: parseFloat(n.usdLiabilities),
                equity: parseFloat(n.usdEquity),
                walletCount: n.walletCount,
                lastSyncedAt: n.lastSync ? n.lastSync.toISOString() : new Date().toISOString()
            }))
        };

        return NextResponse.json(snapshot);
    } catch (error: any) {
        console.error("[Treasury Overview API] Error:", error);
        return NextResponse.json({ error: error.message || "Internal error" }, { status: 500 });
    }
}
