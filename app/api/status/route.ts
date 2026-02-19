import { NextResponse } from "next/server";
import { networkConfig } from "@/core/network-config";

export async function GET() {
    const mode = networkConfig.getMode();
    // These are the IDs we just seeded
    const testUserId = mode === "mainnet"
        ? "cmls3y8ln0000bvlvadozewlq"
        : "cmls3zx810000uqo2h7j7bwej";

    return NextResponse.json({
        mode,
        isMainnet: mode === "mainnet",
        testUserId,
        env: process.env.NETWORK || process.env.NETWORK_MODE || "testnet",
        timestamp: new Date().toISOString()
    });
}
