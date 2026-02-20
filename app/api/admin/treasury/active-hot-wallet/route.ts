import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const admin = await verifyAdmin();
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const network = searchParams.get("network");
    const currency = searchParams.get("currency");

    if (!network || !currency) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    try {
        const wallet = await prisma.walletLifecycle.findFirst({
            where: { network, currency, status: 'ACTIVE' }
        });

        if (!wallet) {
            return NextResponse.json({ error: "No active hot wallet found" }, { status: 404 });
        }

        return NextResponse.json({ address: wallet.walletAddress });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
