import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { chainFactory } from "@/core/chain-factory";

/**
 * POST /api/wallet/withdraw
 * 
 * Creates a pending withdrawal request that requires admin approval.
 * Balance is deducted (reserved) immediately, but blockchain transfer
 * only occurs after admin approves the request.
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, chain, to, amount } = body;

        // Validation
        if (!userId) {
            return NextResponse.json(
                { error: "userId is required" },
                { status: 400 }
            );
        }

        if (!chain || !["ETH", "BSC", "SOL", "BTC", "XRP"].includes(chain)) {
            return NextResponse.json(
                { error: "Invalid chain. Must be ETH, BSC, SOL, BTC, or XRP" },
                { status: 400 }
            );
        }

        if (!to) {
            return NextResponse.json(
                { error: "Recipient address is required" },
                { status: 400 }
            );
        }

        if (!amount || parseFloat(amount) <= 0) {
            return NextResponse.json(
                { error: "Amount must be greater than 0" },
                { status: 400 }
            );
        }

        // Validate address format via chain implementation
        const chainImpl = chainFactory.getChain(chain as any);
        if (!chainImpl.isValidAddress(to)) {
            return NextResponse.json(
                { error: `Invalid ${chain} address` },
                { status: 400 }
            );
        }

        const amountStr = amount.toString();
        const amountFloat = parseFloat(amountStr);
        const amountSmallestUnit = chainImpl.toSmallestUnit(amountStr);

        // Atomic: check balance, deduct (reserve), create Withdrawal record
        const withdrawal = await prisma.$transaction(async (tx) => {
            // Check balance
            const userBalance = await tx.userBalance.findUnique({
                where: { userId_chain: { userId, chain } }
            });

            const currentBalance = userBalance ? BigInt(userBalance.balance) : 0n;
            if (currentBalance < amountSmallestUnit) {
                throw new Error("Insufficient internal balance");
            }

            // Deduct balance (reserve funds)
            await tx.userBalance.update({
                where: { userId_chain: { userId, chain } },
                data: { balance: (currentBalance - amountSmallestUnit).toString() }
            });

            // Create ledger entry for the hold
            await tx.ledgerEntry.create({
                data: {
                    userId,
                    chain,
                    amount: amountSmallestUnit.toString(),
                    type: "WITHDRAWAL",
                    referenceId: "PENDING_WITHDRAWAL"
                }
            });

            // Create Withdrawal record with PENDING status
            return await tx.withdrawal.create({
                data: {
                    userId,
                    chain,
                    amount: amountFloat,
                    amountRaw: amountSmallestUnit.toString(),
                    walletAddress: to,
                    status: "PENDING"
                }
            });
        });

        return NextResponse.json({
            success: true,
            withdrawalId: withdrawal.id,
            message: "Withdrawal request submitted. Awaiting approval.",
            status: "PENDING"
        });

    } catch (error: any) {
        console.error("[API] Withdraw error:", error);

        if (error.message?.includes("Insufficient internal balance")) {
            return NextResponse.json(
                { error: "Insufficient balance" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: error.message || "Withdrawal request failed. Please try again." },
            { status: 500 }
        );
    }
}
