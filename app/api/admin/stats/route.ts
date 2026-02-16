import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
    const admin = await verifyAdmin();
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const totalUsers = await prisma.user.count();
        const activeUsers = await prisma.user.count({ where: { status: 'ACTIVE' } });
        const pendingWithdrawals = await prisma.withdrawal.count({ where: { status: 'PENDING' } });

        const totalFundsResult = await prisma.transaction.aggregate({
            _sum: { amount: true },
            where: { type: 'DEPOSIT', status: 'COMPLETED' }
        });
        const totalFunds = totalFundsResult._sum.amount || 0;

        return NextResponse.json({
            totalUsers,
            activeUsers,
            pendingWithdrawalsCount: pendingWithdrawals,
            totalFunds
        });
    } catch (error) {
        console.error("Admin stats API error:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
