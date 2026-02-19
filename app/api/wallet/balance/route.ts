import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { chainFactory } from "@/core/chain-factory";

/**
 * GET /api/wallet/balance?chain=ETH&userId=xxx
 * 
 * Returns user's internal balance (NOT on-chain balance)
 */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const chain = searchParams.get("chain");
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
                { error: "userId is required" },
                { status: 400 }
            );
        }

        if (!chain || !["ETH", "BSC", "SOL", "BTC", "XRP"].includes(chain)) {
            return NextResponse.json(
                { error: "Invalid chain. Must be ETH, BSC, SOL, BTC, or XRP" },
                { status: 400 }
            );
        }

        // Get chain implementation
        const chainImpl = chainFactory.getChain(chain as any);

        // Get internal balance
        const balance = await prisma.userBalance.findUnique({
            where: {
                userId_chain: { userId, chain }
            }
        });

        const balanceSmallestUnit = balance ? balance.balance : "0";

        // Convert to human-readable via chain implementation
        const balanceHuman = chainImpl.toHumanUnit(balanceSmallestUnit);

        return NextResponse.json({
            chain,
            balance: balanceSmallestUnit, // Smallest unit (wei/lamports)
            balanceHuman, // Human readable (ETH/SOL)
            symbol: chainImpl.getSymbol()
        });

    } catch (error) {
        console.error("[API] Get balance error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
