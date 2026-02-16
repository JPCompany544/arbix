import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/wallet/transactions?chain=ETH&userId=xxx&limit=50
 * 
 * Returns user's transaction history
 */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const chain = searchParams.get("chain");
        const userId = searchParams.get("userId");
        const limitStr = searchParams.get("limit") || "50";
        const limit = parseInt(limitStr);

        if (!userId) {
            return NextResponse.json(
                { error: "userId is required" },
                { status: 400 }
            );
        }

        // Build where clause
        const where: any = { userId };

        if (chain && ["ETH", "BSC", "SOL", "BTC", "XRP"].includes(chain)) {
            where.chain = chain;
        }

        // Fetch transactions
        const transactions = await prisma.chainTransaction.findMany({
            where,
            orderBy: { createdAt: "desc" },
            take: limit
        });

        // Format response
        const formatted = transactions.map(tx => {
            let amountHuman = tx.amount;
            const amt = BigInt(tx.amount);

            if (tx.chain === 'ETH' || tx.chain === 'BSC') {
                amountHuman = (Number(amt) / 1e18).toFixed(18).replace(/\.?0+$/, "");
            } else if (tx.chain === 'SOL') {
                amountHuman = (Number(amt) / 1e9).toFixed(9).replace(/\.?0+$/, "");
            } else if (tx.chain === 'BTC') {
                amountHuman = (Number(amt) / 1e8).toFixed(8).replace(/\.?0+$/, "");
            } else if (tx.chain === 'XRP') {
                amountHuman = (Number(amt) / 1e6).toFixed(6).replace(/\.?0+$/, "");
            }

            return {
                id: tx.id,
                chain: tx.chain,
                txHash: tx.txHash,
                amount: tx.amount,
                amountHuman,
                to: tx.to,
                status: tx.status,
                direction: tx.direction,
                blockNumber: tx.blockNumber?.toString(),
                createdAt: tx.createdAt.toISOString(),
                confirmedAt: tx.confirmedAt?.toISOString() || null
            };
        });

        return NextResponse.json({
            transactions: formatted,
            count: formatted.length
        });

    } catch (error) {
        console.error("[API] Get transactions error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
