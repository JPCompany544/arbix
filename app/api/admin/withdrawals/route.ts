import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
    const admin = await verifyAdmin();
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const withdrawals = await prisma.chainTransaction.findMany({
            where: {
                direction: 'OUTBOUND',
                status: { in: ['PENDING', 'BROADCASTED'] }
            },
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
            chain: w.chain,
            walletAddress: w.to,
            status: w.status,
            date: w.createdAt
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error("Admin withdrawals API error:", error);
        return NextResponse.json({ error: "Failed to fetch withdrawals" }, { status: 500 });
    }
}
