import { NextResponse } from "next/server";
import { getPrices, refreshPrices } from "@/lib/pricing/price-service";

export const dynamic = 'force-dynamic';

/**
 * GET /api/prices - Fetch current cached prices
 * GET /api/prices?refresh=true - Force refresh from CoinGecko
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const shouldRefresh = searchParams.get('refresh') === 'true';

        const prices = shouldRefresh ? await refreshPrices() : await getPrices();

        return NextResponse.json({
            success: true,
            prices,
            timestamp: new Date().toISOString(),
            cached: !shouldRefresh
        });
    } catch (error) {
        console.error("Prices API Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch prices" },
            { status: 500 }
        );
    }
}
