import { NextResponse } from "next/server";
import { chainFactory } from "@/core/chain-factory";

export async function GET() {
    try {
        const chains = chainFactory.getSupportedChains();
        const config = chains.map(chain => {
            const impl = chainFactory.getChain(chain);
            return {
                chain,
                symbol: impl.getSymbol()
            };
        });

        return NextResponse.json({ chains: config });
    } catch (error) {
        console.error("[API] Get config error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
