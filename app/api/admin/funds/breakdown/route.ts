import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";
import { getPrices } from "@/lib/pricing/price-service";
import { chainFactory } from "@/core/chain-factory";
import { SupportedChain } from "@/lib/wallet/types";

export async function GET() {
    const admin = await verifyAdmin();
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const prices = await getPrices();
        const chains: SupportedChain[] = ['ETH', 'BSC', 'SOL', 'BTC', 'XRP'];

        const breakdown = await Promise.all(chains.map(async (chain) => {
            const chainImpl = chainFactory.getChain(chain);
            const price = prices[chain] || 0;

            // 1. Calculate collective user pool from DB balances
            const balances = await prisma.userBalance.findMany({
                where: { chain }
            });
            const totalSmallestUnit = balances.reduce((acc, curr) => acc + BigInt(curr.balance), 0n);
            const poolHuman = chainImpl.toHumanUnit(totalSmallestUnit);

            // 2. Fetch live treasury balance (Index 0)
            const systemUser = 'system_treasury_vault';
            let treasuryHuman = "0.0";
            try {
                const wallet = await prisma.userWallet.findUnique({
                    where: { userId_chain: { userId: systemUser, chain } }
                });
                if (wallet && wallet.address) {
                    const balanceWei = await chainImpl.getBalance(wallet.address);
                    treasuryHuman = chainImpl.toHumanUnit(balanceWei);
                }
            } catch (e) {
                console.error(`Failed to fetch treasury balance for ${chain}`, e);
            }

            // 3. Get Top Holders for this chain
            const topHolders = await prisma.userBalance.findMany({
                where: { chain, balance: { not: "0" } },
                orderBy: { balance: "desc" },
                take: 5,
                include: { user: { select: { email: true, id: true } } }
            });

            return {
                chain,
                symbol: chainImpl.getSymbol(),
                poolBalance: poolHuman,
                treasuryBalance: treasuryHuman,
                valueUSD: parseFloat(poolHuman) * price,
                treasuryValueUSD: parseFloat(treasuryHuman) * price,
                price: price,
                topHolders: topHolders.map(h => ({
                    userId: h.userId,
                    email: h.user.email,
                    balance: chainImpl.toHumanUnit(h.balance),
                    usdValue: parseFloat(chainImpl.toHumanUnit(h.balance)) * price
                }))
            };
        }));

        return NextResponse.json(breakdown);
    } catch (error: any) {
        console.error("Admin funds breakdown API error:", error);
        return NextResponse.json({ error: "Failed to fetch funds breakdown" }, { status: 500 });
    }
}
