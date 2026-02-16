import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
    const admin = await verifyAdmin();
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const withdrawals = await prisma.withdrawal.findMany({
            where: { status: 'PENDING' },
            include: {
                user: {
                    select: { email: true }
                }
            },
            orderBy: { createdAt: 'asc' }
        });

        // Format the response
        const formatted = withdrawals.map((w: any) => ({
            id: w.id,
            userId: w.userId,
            userEmail: w.user.email,
            amount: w.amount,
            walletAddress: w.walletAddress,
            status: w.status,
            date: w.createdAt
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch withdrawals" }, { status: 500 });
    }
}
