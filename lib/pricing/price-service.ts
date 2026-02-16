const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

const TOKEN_MAP: { [key: string]: string } = {
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
    XLM: "stellar"
};

export type MarketData = {
    symbol: string;
    pair: string;
    price: number;
    change24h: number;
    high24h: number;
    low24h: number;
    volume24h: number;
};

export type PriceData = {
    [key: string]: number;
};

// In-memory cache
let cachedMarketData: MarketData[] | null = null;
let lastFetch = 0;

/**
 * Fetch full market data from CoinGecko
 */
async function fetchFullMarketData(): Promise<MarketData[]> {
    const ids = Object.values(TOKEN_MAP).join(",");

    try {
        const res = await fetch(
            `${COINGECKO_BASE}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
            {
                next: { revalidate: 30 }, // Cache for 30 seconds in Next.js
                headers: {
                    'Accept': 'application/json'
                }
            }
        );

        if (!res.ok) {
            throw new Error(`CoinGecko API error: ${res.status}`);
        }

        const data = await res.json();

        // Create a reverse map for easier lookup
        const idToSymbol: { [key: string]: string } = {};
        for (const [symbol, id] of Object.entries(TOKEN_MAP)) {
            idToSymbol[id] = symbol;
        }

        return data.map((item: any) => ({
            symbol: idToSymbol[item.id] || item.symbol.toUpperCase(),
            pair: `${idToSymbol[item.id] || item.symbol.toUpperCase()} / USDT`,
            price: item.current_price,
            change24h: item.price_change_percentage_24h,
            high24h: item.high_24h,
            low24h: item.low_24h,
            volume24h: item.total_volume
        }));
    } catch (error) {
        console.error("Failed to fetch full market data from CoinGecko:", error);
        return [];
    }
}

/**
 * Get all market data
 */
export async function getMarketData(): Promise<MarketData[]> {
    const now = Date.now();
    const CACHE_DURATION = 30000; // 30 seconds

    if (cachedMarketData && now - lastFetch < CACHE_DURATION) {
        return cachedMarketData;
    }

    const freshData = await fetchFullMarketData();
    if (freshData.length > 0) {
        cachedMarketData = freshData;
        lastFetch = now;
    }

    return cachedMarketData || [];
}

/**
 * Legacy support for getPrices (used in dashboard/portfolio)
 */
export async function getPrices(): Promise<PriceData> {
    const marketData = await getMarketData();
    const prices: PriceData = {};

    marketData.forEach(item => {
        prices[item.symbol] = item.price;
    });

    // Handle BSC alias if missing
    if (prices.BNB && !prices.BSC) prices.BSC = prices.BNB;

    return prices;
}

/**
 * Get price for a specific token
 */
export async function getPrice(symbol: string): Promise<number> {
    const prices = await getPrices();
    return prices[symbol] || 0;
}
