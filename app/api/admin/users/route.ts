import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

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
                balance: true
            },
            orderBy: { createdAt: 'desc' }
        });

        // Calculate totals efficiently
        const depositSums = await prisma.transaction.groupBy({
            by: ['userId'],
            _sum: { amount: true },
            where: { type: 'DEPOSIT', status: 'COMPLETED' }
        });

        const withdrawalSums = await prisma.transaction.groupBy({
            by: ['userId'],
            _sum: { amount: true },
            where: { type: 'WITHDRAWAL', status: 'COMPLETED' }
        });

        const userWithStats = users.map((user: any) => {
            const deposit = depositSums.find((d: any) => d.userId === user.id)?._sum.amount || 0;
            const withdrawal = withdrawalSums.find((w: any) => w.userId === user.id)?._sum.amount || 0;
            return { ...user, totalDeposits: deposit, totalWithdrawals: withdrawal };
        });

        return NextResponse.json(userWithStats);
    } catch (error) {
        console.error("Admin users API error:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}
