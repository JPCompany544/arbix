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
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                status: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' }
        });

        // Get prices for conversion
        const prices = await getPrices();

        // Get all balances to map to users
        const allBalances = await prisma.userBalance.findMany();

        // Get ledger totals for each user (deposits vs withdrawals)
        const entries = await prisma.ledgerEntry.findMany({
            where: { type: { in: ['DEPOSIT', 'WITHDRAWAL'] } }
        });

        const userWithStats = users.map((user: any) => {
            // Calculate current USD balance
            let totalBalanceUSD = 0;
            const userBalances = allBalances.filter(b => b.userId === user.id);

            for (const b of userBalances) {
                const price = prices[b.chain] || 0;
                const rawVal = parseFloat(b.balance);

                if (b.chain === 'ETH' || b.chain === 'BSC') totalBalanceUSD += (rawVal / 1e18) * price;
                else if (b.chain === 'SOL') totalBalanceUSD += (rawVal / 1e9) * price;
                else if (b.chain === 'BTC') totalBalanceUSD += (rawVal / 1e8) * price;
                else if (b.chain === 'XRP') totalBalanceUSD += (rawVal / 1e6) * price;
            }

            // Calculate total volume (optional but good for 'Realness')
            const userEntries = entries.filter(e => e.userId === user.id);
            let totalDeposits = 0;
            let totalWithdrawals = 0;

            for (const e of userEntries) {
                const price = prices[e.chain] || 0;
                const rawVal = parseFloat(e.amount);
                let usdVal = 0;

                if (e.chain === 'ETH' || e.chain === 'BSC') usdVal = (rawVal / 1e18) * price;
                else if (e.chain === 'SOL') usdVal = (rawVal / 1e9) * price;
                else if (e.chain === 'BTC') usdVal = (rawVal / 1e8) * price;
                else if (e.chain === 'XRP') usdVal = (rawVal / 1e6) * price;

                if (e.type === 'DEPOSIT') totalDeposits += usdVal;
                else if (e.type === 'WITHDRAWAL') totalWithdrawals += usdVal;
            }

            return {
                ...user,
                balance: totalBalanceUSD,
                totalDeposits,
                totalWithdrawals
            };
        });

        return NextResponse.json(userWithStats);
    } catch (error) {
        console.error("Admin users API error:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}
