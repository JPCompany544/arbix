"use client";

import { useEffect, useState } from "react";

interface MarketItem {
    symbol: string;
    pair: string;
    price: number;
    change24h: number;
}

export default function MarketTicker() {
    const [markets, setMarkets] = useState<MarketItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMarkets = async () => {
            try {
                const res = await fetch("/api/prices/markets");
                const data = await res.json();
                if (Array.isArray(data)) {
                    // Filter or take top 10
                    setMarkets(data.slice(0, 15));
                }
            } catch (error) {
                console.error("Failed to fetch market data for ticker:", error);
                // Fallback mock data if API fails
                setMarkets([
                    { symbol: "BTC", pair: "BTC / USDT", price: 64320.50, change24h: 2.14 },
                    { symbol: "ETH", pair: "ETH / USDT", price: 3420.15, change24h: -1.03 },
                    { symbol: "SOL", pair: "SOL / USDT", price: 142.55, change24h: 4.22 },
                    { symbol: "BNB", pair: "BNB / USDT", price: 585.20, change24h: 0.45 },
                    { symbol: "XRP", pair: "XRP / USDT", price: 0.62, change24h: -1.20 },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchMarkets();
        const interval = setInterval(fetchMarkets, 30000); // Update every 30s
        return () => clearInterval(interval);
    }, []);

    if (loading && markets.length === 0) {
        return (
            <div className="fixed top-0 left-0 right-0 h-10 bg-black border-b border-white/5 flex items-center px-4 z-[60]">
                <div className="w-full h-2 bg-white/5 animate-pulse rounded-full" />
            </div>
        );
    }

    // Duplicate markets for infinite scroll
    const displayMarkets = [...markets, ...markets];

    return (
        <div className="fixed top-0 left-0 right-0 h-10 bg-black border-b-2 border-white/10 flex items-center overflow-hidden z-[60] select-none">
            <div className="flex animate-marquee whitespace-nowrap">
                {displayMarkets.map((item, idx) => (
                    <div
                        key={`${item.symbol}-${idx}`}
                        className="flex items-center gap-2 px-6 border-r border-white/5 last:border-r-0"
                    >
                        <span className="text-[11px] font-black text-white tracking-tighter italic">
                            {item.symbol}/USDT
                        </span>
                        <span className="text-[11px] font-mono text-gray-300 font-bold">
                            {item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span className={`text-[10px] font-black ${item.change24h >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                            {item.change24h >= 0 ? "+" : ""}{item.change24h.toFixed(2)}%
                        </span>
                    </div>
                ))}
            </div>

            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
}
