import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth";
import { executeSweep } from "@/lib/treasury/treasury-service";
import type { SupportedChain } from "@/lib/wallet/types";

export async function POST(req: NextRequest) {
    const admin = await verifyAdmin();
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { network, amount, destination_address } = body;

        if (!network || !destination_address) {
            return NextResponse.json(
                { error: "Missing required fields: network, destination_address" },
                { status: 400 }
            );
        }

        const supportedChains: SupportedChain[] = ["ETH", "BSC", "SOL", "BTC", "XRP"];
        const chain = network.toUpperCase() as SupportedChain;
        if (!supportedChains.includes(chain)) {
            return NextResponse.json({ error: `Unsupported network: ${network}` }, { status: 400 });
        }

        const result = await executeSweep({
            chain,
            amount: amount || undefined,
            destinationAddress: destination_address,
            adminUserId: admin.userId,
        });

        return NextResponse.json({
            success: true,
            sweepId: result.sweepId,
            txHash: result.txHash,
            amount: result.amount,
            chain: result.chain,
        });
    } catch (error: any) {
        console.error("[Treasury Sweep] Error:", error);
        return NextResponse.json({ error: error.message || "Sweep failed" }, { status: 500 });
    }
}
