import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
    const admin = await verifyAdmin();
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const transactions = await prisma.chainTransaction.findMany({
            include: {
                user: {
                    select: { email: true }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 100
        });

        // Format the response
        const formatted = transactions.map((tx: any) => ({
            id: tx.id,
            userId: tx.userId,
            userEmail: tx.user.email,
            amount: tx.amount,
            chain: tx.chain,
            type: tx.direction === 'INBOUND' ? 'DEPOSIT' : 'WITHDRAWAL',
            status: tx.status,
            txHash: tx.txHash,
            date: tx.createdAt
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error("Admin transactions API error:", error);
        return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
    }
}
