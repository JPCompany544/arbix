import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyUser } from "@/lib/auth";
import { getPrices } from "@/lib/pricing/price-service";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const user = await verifyUser(req);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = user.userId;

        // Fetch live prices (cached for 15 seconds)
        const livePrices = await getPrices();

        // Fetch all balances for user
        const balances = await prisma.userBalance.findMany({
            where: { userId }
        });

        // Map to portfolio format
        const portfolio = balances.map(record => {
            const rawAmount = BigInt(record.balance);
            let amount: number;

            // Convert from smallest unit to base unit
            if (record.chain === 'ETH' || record.chain === 'BSC') {
                // Convert from wei to ETH/BNB (1 ETH = 10^18 wei)
                amount = Number(rawAmount) / 1e18;
            } else if (record.chain === 'SOL') {
                // Convert from lamports to SOL (1 SOL = 10^9 lamports)
                amount = Number(rawAmount) / 1e9;
            } else if (record.chain === 'BTC') {
                // Convert from satoshis to BTC (1 BTC = 10^8 satoshis)
                amount = Number(rawAmount) / 1e8;
            } else if (record.chain === 'XRP') {
                // Convert from drops to XRP (1 XRP = 10^6 drops)
                amount = Number(rawAmount) / 1e6;
            } else {
                // For stablecoins or other tokens, assume already in correct unit
                amount = parseFloat(record.balance);
            }

            const price = livePrices[record.chain] || 0;
            const usdValue = amount * price;

            return {
                chain: record.chain,
                symbol: record.chain, // Assuming chain code = symbol for now (ETH, SOL)
                balance: amount,
                rawBalance: record.balance,
                usdValue: usdValue,
                price: price
            };
        });

        // Ensure we explicitly list supported chains even if balance is 0
        const supportedChains = ["ETH", "BSC", "SOL", "BTC", "XRP"];
        const finalPortfolio = supportedChains.map(chain => {
            const existing = portfolio.find(p => p.chain === chain);
            if (existing) return existing;

            // Return zero balance entry with live price
            return {
                chain,
                symbol: chain,
                balance: 0,
                rawBalance: "0",
                usdValue: 0,
                price: livePrices[chain] || 0
            };
        });

        // Calculate total value
        const totalValue = finalPortfolio.reduce((sum, item) => sum + item.usdValue, 0);

        // Sort by USD value descending (as requested)
        finalPortfolio.sort((a, b) => b.usdValue - a.usdValue);

        return NextResponse.json({
            totalUsdValue: totalValue,
            assets: finalPortfolio
        });

    } catch (error) {
        console.error("Portfolio API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
