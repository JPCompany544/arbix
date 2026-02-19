import { NextResponse } from "next/server";
import { processWithdrawal } from "@/lib/wallet/wallet-service";

export async function GET() {
    try {
        const userId = "cmli2bcpp0000dj58qvyfht0h"; // use the same user whose address you funded

        console.log("[Test] Starting Ethereum transaction sign test...");

        const result = await processWithdrawal(userId, "ETH", {
            to: "0x070FB771612106e2F3F6b7d150F9AA724b2f5CF0", // second test wallet OR same wallet
            amount: "0.0005"               // ETH amount to send
        });

        console.log("[Test] Transaction Hash:", result.txHash);

        return NextResponse.json({
            success: true,
            txHash: result.txHash
        });
    } catch (error: any) {
        console.error("[Test] Error:", error);
        return NextResponse.json({
            success: false,
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
