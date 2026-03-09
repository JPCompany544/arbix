import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";
import { chainFactory } from "@/core/chain-factory";
import type { SupportedChain } from "@/lib/wallet/types";

/**
 * PATCH /api/admin/withdrawals/[id]
 * 
 * Admin approves or rejects a pending withdrawal request.
 * 
 * - APPROVE: Executes the on-chain withdrawal using the existing chain module,
 *   then marks the withdrawal as COMPLETED.
 * - REJECT: Restores the user's reserved balance and marks the withdrawal as REJECTED.
 */
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const admin = await verifyAdmin();
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;
        const { status } = await req.json();

        if (!['APPROVED', 'REJECTED'].includes(status)) {
            return NextResponse.json({ error: "Invalid status. Must be APPROVED or REJECTED." }, { status: 400 });
        }

        // Get withdrawal details
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

        // ─── REJECT ───
        if (status === 'REJECTED') {
            const chain = withdrawal.chain;
            const amountSmallestUnit = BigInt(withdrawal.amountRaw);

            await prisma.$transaction(async (tx) => {
                // Restore user balance
                const userBalance = await tx.userBalance.findUnique({
                    where: { userId_chain: { userId: withdrawal.userId, chain } }
                });

                const currentBalance = userBalance ? BigInt(userBalance.balance) : 0n;
                const newBalance = currentBalance + amountSmallestUnit;

                await tx.userBalance.upsert({
                    where: { userId_chain: { userId: withdrawal.userId, chain } },
                    create: {
                        userId: withdrawal.userId,
                        chain,
                        balance: newBalance.toString()
                    },
                    update: {
                        balance: newBalance.toString()
                    }
                });

                // Add refund ledger entry
                await tx.ledgerEntry.create({
                    data: {
                        userId: withdrawal.userId,
                        chain,
                        amount: amountSmallestUnit.toString(),
                        type: "ADJUSTMENT",
                        referenceId: `WITHDRAWAL_REJECTED:${withdrawal.id}`
                    }
                });

                // Update withdrawal status
                await tx.withdrawal.update({
                    where: { id },
                    data: {
                        status: 'REJECTED',
                        processedAt: new Date()
                    }
                });
            });

            const updated = await prisma.withdrawal.findUnique({
                where: { id },
                include: { user: { select: { email: true } } }
            });

            return NextResponse.json({
                ...updated,
                message: "Withdrawal rejected. User balance restored."
            });
        }

        // ─── APPROVE ───
        if (status === 'APPROVED') {
            const chain = withdrawal.chain as SupportedChain;
            const amountStr = withdrawal.amount.toString();
            const chainImpl = chainFactory.getChain(chain);

            // Mark as APPROVED before executing (prevents double-processing)
            await prisma.withdrawal.update({
                where: { id },
                data: { status: 'APPROVED' }
            });

            try {
                // Execute on-chain withdrawal using existing chain module
                const result = await chainImpl.sendWithdrawal({
                    userId: withdrawal.userId,
                    to: withdrawal.walletAddress,
                    value: amountStr
                });

                if (!result.txHash) {
                    throw new Error("No txHash returned from chain module");
                }

                // Record in ChainTransaction for the withdrawal monitor
                await prisma.chainTransaction.create({
                    data: {
                        userId: withdrawal.userId,
                        chain: withdrawal.chain,
                        to: withdrawal.walletAddress,
                        amount: amountStr,
                        txHash: result.txHash,
                        direction: "OUTBOUND",
                        status: "BROADCASTED"
                    }
                });

                // Mark withdrawal as COMPLETED
                await prisma.withdrawal.update({
                    where: { id },
                    data: {
                        status: 'COMPLETED',
                        processedAt: new Date()
                    }
                });

                const updated = await prisma.withdrawal.findUnique({
                    where: { id },
                    include: { user: { select: { email: true } } }
                });

                return NextResponse.json({
                    ...updated,
                    txHash: result.txHash,
                    message: "Withdrawal approved and executed successfully."
                });

            } catch (execError: any) {
                console.error("[Admin] Withdrawal execution failed:", execError);

                // Execution failed — revert to PENDING so admin can retry
                // Also refund the user's balance
                const amountSmallestUnit = BigInt(withdrawal.amountRaw);

                await prisma.$transaction(async (tx) => {
                    // Restore balance
                    const userBalance = await tx.userBalance.findUnique({
                        where: { userId_chain: { userId: withdrawal.userId, chain } }
                    });

                    const currentBalance = userBalance ? BigInt(userBalance.balance) : 0n;
                    const newBalance = currentBalance + amountSmallestUnit;

                    await tx.userBalance.upsert({
                        where: { userId_chain: { userId: withdrawal.userId, chain } },
                        create: {
                            userId: withdrawal.userId,
                            chain: withdrawal.chain,
                            balance: newBalance.toString()
                        },
                        update: {
                            balance: newBalance.toString()
                        }
                    });

                    // Add refund ledger entry
                    await tx.ledgerEntry.create({
                        data: {
                            userId: withdrawal.userId,
                            chain: withdrawal.chain,
                            amount: amountSmallestUnit.toString(),
                            type: "ADJUSTMENT",
                            referenceId: `WITHDRAWAL_EXEC_FAILED:${withdrawal.id}`
                        }
                    });

                    // Revert status to FAILED
                    await tx.withdrawal.update({
                        where: { id },
                        data: { status: 'FAILED' }
                    });
                });

                return NextResponse.json({
                    error: `Withdrawal execution failed: ${execError.message}. User balance has been restored.`
                }, { status: 500 });
            }
        }

    } catch (error: any) {
        console.error("Withdrawal update error:", error);
        return NextResponse.json({ error: "Failed to update withdrawal" }, { status: 500 });
    }
}
