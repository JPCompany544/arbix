import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

/**
 * GET /api/admin/withdrawals
 * 
 * Returns all withdrawal requests for admin review.
 * Shows pending, approved, rejected, and completed withdrawals.
 */
export async function GET() {
    const admin = await verifyAdmin();
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const withdrawals = await prisma.withdrawal.findMany({
            include: {
                user: {
                    select: { email: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        const formatted = withdrawals.map((w: any) => ({
            id: w.id,
            userId: w.userId,
            userEmail: w.user.email,
            amount: w.amount,
            amountRaw: w.amountRaw,
            chain: w.chain,
            walletAddress: w.walletAddress,
            status: w.status,
            date: w.createdAt,
            processedAt: w.processedAt
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error("Admin withdrawals API error:", error);
        return NextResponse.json({ error: "Failed to fetch withdrawals" }, { status: 500 });
    }
}
