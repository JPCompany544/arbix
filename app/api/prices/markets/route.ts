import { NextResponse } from "next/server";
import { getMarketData } from "@/lib/pricing/price-service";

export async function GET() {
    try {
        const data = await getMarketData();
        return NextResponse.json(data);
    } catch (error) {
        console.error("[API] Failed to fetch market data:", error);
        return NextResponse.json({ error: "Failed to fetch market data" }, { status: 500 });
    }
}
