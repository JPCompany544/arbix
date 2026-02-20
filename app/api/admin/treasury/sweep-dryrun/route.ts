import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth";
import { SweepEngine } from "@/src/treasury/sweep/SweepEngine";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const admin = await verifyAdmin();
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { network, currency, hotWalletAddress, dustThreshold, adminId } = body;
    const decimals = network === "SOL" ? 9 : (network === "BTC" ? 8 : (network === "XRP" ? 6 : 18));
    const engine = new SweepEngine();
    const result = await engine.sweepAll({
      network,
      currency,
      hotWalletAddress,
      dustThreshold: BigInt(Math.floor(dustThreshold * Math.pow(10, decimals))),
      adminId,
      dryRun: true
    });

    const divisor = Math.pow(10, decimals);

    // Fetch total liabilities for this network to show in preview
    const liabilities = await prisma.userBalance.findMany({ where: { chain: network } });
    const totalInternal = liabilities.reduce((sum, b) => sum + BigInt(b.balance || "0"), 0n);

    // Fetch total on-chain balance registered in UserWallet
    const wallets = await prisma.userWallet.findMany({ where: { chain: network } });
    const totalOnChain = wallets.reduce((sum, w) => sum + BigInt(w.lastKnownBalance || "0"), 0n);

    return NextResponse.json({
      totalSweepAmount: parseFloat(result.totalAmount) / divisor,
      totalInternal: parseFloat(totalInternal.toString()) / divisor,
      totalOnChain: parseFloat(totalOnChain.toString()) / divisor,
      estimatedGas: network === "SOL" ? 0.000005 : 0.001,
      eligibleWallets: result.walletCount,
      breakdown: [
        {
          network,
          amount: parseFloat(result.totalAmount) / divisor,
          walletCount: result.walletCount
        }
      ]
    });
  } catch (error: any) {
    console.error("[Sweep Dry-Run API] Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
