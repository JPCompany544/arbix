import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth";
import { getSweepHistory } from "@/lib/treasury/treasury-service";

export async function GET(req: NextRequest) {
    const admin = await verifyAdmin();
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100);
        const chain = searchParams.get("chain") || undefined;

        const result = await getSweepHistory(page, limit, chain);
        return NextResponse.json(result);
    } catch (error: any) {
        console.error("[Treasury Sweeps] Error:", error);
        return NextResponse.json({ error: error.message || "Internal error" }, { status: 500 });
    }
}
