import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth";
import { SweepEngine } from "@/src/treasury/sweep/SweepEngine";

export async function POST(req: NextRequest) {
  try {
    const admin = await verifyAdmin();
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { network, currency, hotWalletAddress, dustThreshold, adminId, twoFAToken } = body;

    // In a real app, we would validate 2FA here
    // if (!validate2FA(adminId, twoFAToken)) throw new Error("Invalid 2FA");

    const decimals = network === "SOL" ? 9 : (network === "BTC" ? 8 : (network === "XRP" ? 6 : 18));
    const engine = new SweepEngine();
    const result = await engine.sweepAll({
      network,
      currency,
      hotWalletAddress,
      dustThreshold: BigInt(Math.floor(dustThreshold * Math.pow(10, decimals))),
      adminId,
      twoFAToken,
      dryRun: false
    });

    const divisor = Math.pow(10, decimals);
    return NextResponse.json({
      success: true,
      totalSwept: parseFloat(result.totalAmount) / divisor,
      walletsProcessed: result.walletCount,
      details: result.processed.map(p => `${p.status}: ${p.address} (${p.txHash || "no tx"})`)
    });
  } catch (error: any) {
    console.error("[Sweep Execute API] Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
