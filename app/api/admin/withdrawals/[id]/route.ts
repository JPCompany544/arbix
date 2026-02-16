import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const admin = await verifyAdmin();
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;
        const { status } = await req.json();

        if (!['APPROVED', 'REJECTED'].includes(status)) {
            return NextResponse.json({ error: "Invalid status" }, { status: 400 });
        }

        // Get withdrawal details first
        const withdrawal = await prisma.withdrawal.findUnique({
            where: { id },
            include: { user: true }
        });

        if (!withdrawal) {
            return NextResponse.json({ error: "Withdrawal not found" }, { status: 404 });
        }

        if (withdrawal.status !== 'PENDING') {
            return NextResponse.json({ error: "Withdrawal already processed" }, { status: 400 });
        }

        // If rejecting, refund the user's balance
        if (status === 'REJECTED') {
            await prisma.$transaction([
                prisma.withdrawal.update({
                    where: { id },
                    data: { status: 'REJECTED' }
                }),
                prisma.user.update({
                    where: { id: withdrawal.userId },
                    data: { balance: { increment: withdrawal.amount } }
                })
            ]);
        } else {
            // Just approve
            await prisma.withdrawal.update({
                where: { id },
                data: { status: 'APPROVED' }
            });
        }

        const updated = await prisma.withdrawal.findUnique({
            where: { id },
            include: { user: { select: { email: true } } }
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Withdrawal update error:", error);
        return NextResponse.json({ error: "Failed to update withdrawal" }, { status: 500 });
    }
}
