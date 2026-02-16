import { NextRequest, NextResponse } from "next/server";
import { signTransaction } from "@/lib/wallet/engine";
import { ethers } from "ethers";

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

        if (!chain || !["ETH", "BSC", "SOL"].includes(chain)) {
            return NextResponse.json(
                { error: "Invalid chain. Must be ETH, BSC, or SOL" },
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

        // Validate address format
        if (chain === "ETH" || chain === "BSC") {
            if (!ethers.isAddress(to)) {
                return NextResponse.json(
                    { error: "Invalid EVM address" },
                    { status: 400 }
                );
            }
        } else if (chain === "SOL") {
            // Basic Solana address validation (44 characters, base58)
            if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(to)) {
                return NextResponse.json(
                    { error: "Invalid Solana address" },
                    { status: 400 }
                );
            }
        }

        // Execute withdrawal
        let result;

        if (chain === "ETH" || chain === "BSC") {
            result = await signTransaction(userId, chain, {
                to,
                value: amount // ETH/BNB amount as string
            });
        } else if (chain === "SOL") {
            result = await signTransaction(userId, chain, {
                to,
                amount: parseFloat(amount) // SOL amount as number
            });
        }

        if (!result) {
            return NextResponse.json(
                { error: "Failed to process withdrawal" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            txId: result.id,
            txHash: result.txHash,
            chain,
            amount
        });

    } catch (error: any) {
        console.error("[API] Withdraw error:", error);

        // Handle specific errors
        if (error.message?.includes("Insufficient internal balance")) {
            return NextResponse.json(
                { error: "Insufficient balance" },
                { status: 400 }
            );
        }

        if (error.message?.includes("Invalid")) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Withdrawal failed. Please try again." },
            { status: 500 }
        );
    }
}
