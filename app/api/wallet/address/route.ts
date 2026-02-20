import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateAddress } from "@/lib/wallet/wallet-service";

/**
 * GET /api/wallet/address?chain=ETH&userId=xxx
 * 
 * Returns user's deposit address for specified chain
 */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const chain = searchParams.get("chain") as any;
        const userId = searchParams.get("userId") as string;

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

        // 0. Verify user exists in this environment
        const userExists = await prisma.user.findUnique({ where: { id: userId } });
        if (!userExists) {
            console.warn(`[API] Address request for non-existent user: ${userId}`);
            return NextResponse.json(
                { error: "User not found in this environment. Please log out and log in again." },
                { status: 404 }
            );
        }

        // Generate/Retrieve address via WalletService
        await generateAddress(userId, chain);

        const wallet = await prisma.userWallet.findUniqueOrThrow({
            where: { userId_chain: { userId, chain } }
        });

        return NextResponse.json({
            chain,
            address: wallet.address,
            derivationIndex: wallet.derivationIndex,
            createdAt: wallet.createdAt
        });

    } catch (error: any) {
        console.error("[API] Get address error:", error);

        // Return more descriptive error message for setup issues
        if (error.message?.includes("not found in environment") || error.message?.includes("SECURITY ERROR")) {
            return NextResponse.json(
                { error: `Configuration error: ${error.message}` },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
