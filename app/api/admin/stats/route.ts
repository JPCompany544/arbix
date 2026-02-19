import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";
import { getPrices } from "@/lib/pricing/price-service";

export async function GET() {
    const admin = await verifyAdmin();
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const [totalUsers, activeUsers, pendingWithdrawalsCount] = await Promise.all([
            prisma.user.count(),
            prisma.user.count({ where: { status: 'ACTIVE' } }),
            prisma.chainTransaction.count({
                where: {
                    direction: 'OUTBOUND',
                    status: { in: ['PENDING', 'BROADCASTED'] }
                }
            })
        ]);

        // Calculate total real funds across all chains in USD
        const allBalances = await prisma.userBalance.findMany();
        const prices = await getPrices();

        let totalFundsUSD = 0;
        for (const record of allBalances) {
            const price = prices[record.chain] || 0;
            // Balance is stored as smallest unit string, but we need to know the chain's decimals
            // For simplicity in this aggregator, we'll assume standard ones or use a rough estimate if decimals not available
            // Better: use chainFactory if we have it here
            const amount = parseFloat(record.balance);
            if (record.chain === 'ETH' || record.chain === 'BSC') {
                totalFundsUSD += (amount / 1e18) * price;
            } else if (record.chain === 'SOL') {
                totalFundsUSD += (amount / 1e9) * price;
            } else if (record.chain === 'BTC') {
                totalFundsUSD += (amount / 1e8) * price;
            } else if (record.chain === 'XRP') {
                totalFundsUSD += (amount / 1e6) * price;
            }
        }

        return NextResponse.json({
            totalUsers,
            activeUsers,
            pendingWithdrawalsCount,
            totalFunds: totalFundsUSD
        });
    } catch (error) {
        console.error("Admin stats API error:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
