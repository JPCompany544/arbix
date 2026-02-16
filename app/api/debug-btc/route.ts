import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const wallets = await prisma.userWallet.findMany({
            where: { chain: "BTC" }
        });
        const balances = await prisma.userBalance.findMany({
            where: { chain: "BTC" }
        });
        return NextResponse.json({ wallets, balances });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
