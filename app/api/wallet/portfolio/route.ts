import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyUser } from "@/lib/auth";
import { getPrices } from "@/lib/pricing/price-service";
import { chainFactory } from "@/core/chain-factory";

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
            const chainImpl = chainFactory.getChain(record.chain as any);

            // Convert from smallest unit to base unit via chain implementation
            const amount = parseFloat(chainImpl.toHumanUnit(record.balance));

            const price = livePrices[record.chain] || 0;
            const usdValue = amount * price;

            return {
                chain: record.chain,
                symbol: chainImpl.getSymbol(),
                balance: amount,
                rawBalance: record.balance,
                usdValue: usdValue,
                price: price
            };
        });

        // Ensure we explicitly list supported chains even if balance is 0
        const supportedChains = chainFactory.getSupportedChains();
        const finalPortfolio = supportedChains.map(chain => {
            const existing = portfolio.find(p => p.chain === chain);
            if (existing) return existing;

            const chainImpl = chainFactory.getChain(chain as any);

            // Return zero balance entry with live price
            return {
                chain,
                symbol: chainImpl.getSymbol(),
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
