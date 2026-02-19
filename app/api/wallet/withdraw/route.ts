import { NextRequest, NextResponse } from "next/server";
import { processWithdrawal } from "@/lib/wallet/wallet-service";
import { chainFactory } from "@/core/chain-factory";

/**
 * POST /api/wallet/withdraw
 * 
 * Initiates a withdrawal from internal balance to external address
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

        // Execute withdrawal via WalletService
        const result = await processWithdrawal(userId, chain as any, {
            to,
            amount // Standard string value
        });

        return NextResponse.json({
            success: true,
            txId: result.id,
            txHash: result.txHash,
            chain,
            amount
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
            { error: error.message || "Withdrawal failed. Please try again." },
            { status: 500 }
        );
    }
}
