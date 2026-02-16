import { NextRequest, NextResponse } from "next/server";
import { getTokenLogo } from "@/lib/logoService";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const chain = searchParams.get("chain") || undefined;
    const address = searchParams.get("address") || undefined;
    const symbol = searchParams.get("symbol") || undefined;

    const logo = await getTokenLogo({ chain, address, symbol });

    return NextResponse.json({ logo });
}
