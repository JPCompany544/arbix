import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateAddress } from "@/lib/wallet/engine";

/**
 * GET /api/wallet/address?chain=ETH&userId=xxx
 * 
 * Returns user's deposit address for specified chain
 */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const chain = searchParams.get("chain");
        const userId = searchParams.get("userId");

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

        let wallet;

        // Hardcoded addresses for BTC and XRP
        if (chain === "BTC" || chain === "XRP") {
            const hardcodedAddress = chain === "BTC"
                ? "bc1qfgc08xen820n6ak0jf8mf3j9gaqtfqxalvc09z"
                : "rLhHG4nVsAch1HtrURyaaAKLczAUgC2s9Y";

            wallet = await prisma.userWallet.upsert({
                where: { userId_chain: { userId, chain } },
                update: { address: hardcodedAddress },
                create: {
                    userId,
                    chain,
                    address: hardcodedAddress,
                    derivationIndex: 0,
                    lastKnownBalance: "0"
                }
            });

            return NextResponse.json({
                chain,
                address: wallet.address,
                createdAt: wallet.createdAt
            });
        }

        // Check if wallet exists for other chains
        wallet = await prisma.userWallet.findUnique({
            where: {
                userId_chain: { userId, chain }
            }
        });

        // If not, generate it
        if (!wallet) {
            const address = await generateAddress(userId, chain as "ETH" | "BSC" | "SOL");
            wallet = await prisma.userWallet.findUnique({
                where: {
                    userId_chain: { userId, chain }
                }
            });
        }

        if (!wallet) {
            return NextResponse.json(
                { error: "Failed to generate wallet" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            chain,
            address: wallet.address,
            derivationIndex: wallet.derivationIndex,
            createdAt: wallet.createdAt
        });

    } catch (error) {
        console.error("[API] Get address error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
