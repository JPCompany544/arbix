
const cache = new Map<string, { logo: string; timestamp: number }>();
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

const PLATFORM_MAP: Record<string, string> = {
    'ethereum': 'ethereum',
    'eth': 'ethereum',
    'bsc': 'binance-smart-chain',
    'solana': 'solana',
    'sol': 'solana'
};

const NATIVE_MAP: Record<string, string> = {
    'BTC': 'bitcoin',
    'ETH': 'ethereum',
    'BNB': 'binancecoin',
    'SOL': 'solana',
    'XRP': 'ripple'
};

export async function getTokenLogo(params: { chain?: string; address?: string; symbol?: string }): Promise<string> {
    const { chain, address, symbol } = params;

    // 1. Generate Cache Key
    let cacheKey = '';
    if (chain && address) {
        cacheKey = `${chain.toLowerCase()}:${address.toLowerCase()}`;
    } else if (symbol) {
        cacheKey = `symbol:${symbol.toUpperCase()}`;
    }

    if (!cacheKey) return '/images/token-placeholder.png';

    // 2. Check Cache
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.logo;
    }

    // 3. Fetch Logic
    let logoUrl = '/images/token-placeholder.png';

    try {
        if (chain && address) {
            const platform = PLATFORM_MAP[chain.toLowerCase()];
            if (platform) {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${platform}/contract/${address}`);
                if (response.ok) {
                    const data = await response.json();
                    logoUrl = data.image?.large || logoUrl;
                }
            }
        } else if (symbol) {
            const coinId = NATIVE_MAP[symbol.toUpperCase()];
            if (coinId) {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
                if (response.ok) {
                    const data = await response.json();
                    logoUrl = data.image?.large || logoUrl;
                }
            }
        }
    } catch (error) {
        console.error('Coingecko fetch error:', error);
        // Fallback to placeholder already set
    }

    // 4. Update Cache
    cache.set(cacheKey, { logo: logoUrl, timestamp: Date.now() });

    return logoUrl;
}
