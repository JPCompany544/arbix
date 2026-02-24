import { NextResponse } from "next/server";

// We'll reuse the mapping from price-service if possible, but for simplicity:
const TOKEN_ID_MAP: { [key: string]: string } = {
    BTC: "bitcoin",
    ETH: "ethereum",
    BNB: "binancecoin",
    SOL: "solana",
    XRP: "ripple",
    DOGE: "dogecoin",
    TON: "the-open-network",
    TRX: "tron",
    ADA: "cardano",
    AVAX: "avalanche-2",
    WBTC: "wrapped-bitcoin",
    SHIB: "shiba-inu",
    BCH: "bitcoin-cash",
    LINK: "chainlink",
    DOT: "polkadot",
    DAI: "dai",
    LTC: "litecoin",
    NEAR: "near",
    UNI: "uniswap",
    ICP: "internet-computer",
    FET: "fetch-ai",
    PEPE: "pepe",
    WBETH: "wrapped-beacon-eth",
    APT: "aptos",
    XLM: "stellar",
    ARB: "arbitrum",
    OP: "optimism",
    MATIC: "matic-network",
    ATOM: "cosmos",
    FTM: "fantom",
    SUI: "sui",
    SEI: "sei-network",
    TIA: "celestia",
    INJ: "injective-protocol",
    RENDER: "render-token",
    JUP: "jupiter-exchange-solana",
    PYTH: "pyth-network",
    TAO: "bittensor",
    STX: "blockstack",
    STETH: "lido-staked-ether"
};

export async function GET(
    request: Request,
    { params }: { params: Promise<{ pair: string }> }
) {
    const { pair } = await params;
    const { searchParams } = new URL(request.url);
    const interval = searchParams.get("interval") || "1"; // CoinGecko supports 1, 7, 14, 30, 90, 180, 365 days. 
    // Wait, CoinGecko OHLC interval is actually '1', '7', '14', '30', '90', '180', '365', 'max'. 
    // For 1 minute candles, we might need another provider or simulate it.
    // CoinGecko's smallest interval is 30 minutes for the '1' day range.

    // For the sake of this implementation, we'll try to get data from CoinGecko's OHLC endpoint.
    // coin_id: bitcoin, vs_currency: usd, days: 1

    const pairSymbol = pair.split("USDT")[0].split("-")[0].split("_")[0].toUpperCase();
    const tokenId = TOKEN_ID_MAP[pairSymbol];

    if (!tokenId) {
        return NextResponse.json({ error: "Token not supported" }, { status: 404 });
    }

    try {
        const res = await fetch(
            `https://api.coingecko.com/api/v3/coins/${tokenId}/ohlc?vs_currency=usd&days=1`,
            { next: { revalidate: 300 } }
        );

        if (!res.ok) {
            throw new Error(`CoinGecko OHLC error: ${res.status}`);
        }

        const data = await res.json();

        // CoinGecko returns [time, open, high, low, close]
        const formattedData = data.map((item: any) => ({
            time: item[0] / 1000, // to seconds
            open: item[1],
            high: item[2],
            low: item[3],
            close: item[4]
        }));

        return NextResponse.json(formattedData);
    } catch (error) {
        console.error("Historical data fetch failed:", error);
        return NextResponse.json({ error: "Failed to fetch historical data" }, { status: 500 });
    }
}
