import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
    const admin = await verifyAdmin();
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Fetch last 5 signups
        const newUsers = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5,
            select: { email: true, createdAt: true }
        });

        // Fetch last 10 chain transactions (deposits/withdrawals)
        const txs = await prisma.chainTransaction.findMany({
            orderBy: { createdAt: 'desc' },
            take: 10,
            include: {
                user: { select: { email: true } }
            }
        });

        // Combine and sort
        const activities: any[] = [
            ...newUsers.map(u => ({
                id: `user-${u.email}-${u.createdAt}`,
                type: 'SIGNUP',
                title: `New Signup: ${u.email}`,
                date: u.createdAt
            })),
            ...txs.map(tx => ({
                id: `tx-${tx.id}`,
                type: tx.direction === 'INBOUND' ? 'DEPOSIT' : 'WITHDRAWAL',
                title: `${tx.direction === 'INBOUND' ? 'Deposit' : 'Withdrawal'}: ${tx.amount} ${tx.chain} (${tx.user.email})`,
                date: tx.createdAt,
                status: tx.status
            }))
        ];

        // Sort by date descending
        activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return NextResponse.json(activities.slice(0, 10)); // Top 10 combined
    } catch (error) {
        console.error("Admin activity API error:", error);
        return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 });
    }
}
