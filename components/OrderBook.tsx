"use client";

import { useState, useEffect, useMemo } from "react";

interface OrderBookRow {
    price: number;
    volume: number;
    cumulative: number;
    type: "bid" | "ask";
}

interface OrderBookProps {
    symbol: string;
    currentPrice: number;
}

export default function OrderBook({ symbol, currentPrice }: OrderBookProps) {
    const [bids, setBids] = useState<OrderBookRow[]>([]);
    const [asks, setAsks] = useState<OrderBookRow[]>([]);

    useEffect(() => {
        if (!currentPrice) return;

        const generateOrders = () => {
            const newBids: OrderBookRow[] = [];
            const newAsks: OrderBookRow[] = [];
            let bidCumulative = 0;
            let askCumulative = 0;

            for (let i = 1; i <= 50; i++) {
                const bidVol = Math.random() * 2 + 0.1;
                const askVol = Math.random() * 2 + 0.1;
                bidCumulative += bidVol;
                askCumulative += askVol;

                newBids.push({
                    price: currentPrice * (1 - (i * 0.00015) - (Math.random() * 0.0001)),
                    volume: bidVol,
                    cumulative: bidCumulative,
                    type: "bid"
                });
                newAsks.push({
                    price: currentPrice * (1 + (i * 0.00015) + (Math.random() * 0.0001)),
                    volume: askVol,
                    cumulative: askCumulative,
                    type: "ask"
                });
            }

            setBids(newBids.sort((a, b) => b.price - a.price));
            setAsks(newAsks.sort((a, b) => a.price - b.price));
        };

        generateOrders();
        const interval = setInterval(() => {
            setBids(prev => {
                const next = [...prev];
                const idx = Math.floor(Math.random() * next.length);
                next[idx] = { ...next[idx], volume: Math.max(0.01, next[idx].volume + (Math.random() - 0.5) * 0.2) };
                return next;
            });
            setAsks(prev => {
                const next = [...prev];
                const idx = Math.floor(Math.random() * next.length);
                next[idx] = { ...next[idx], volume: Math.max(0.01, next[idx].volume + (Math.random() - 0.5) * 0.2) };
                return next;
            });
        }, 1500);

        return () => clearInterval(interval);
    }, [symbol, currentPrice]);

    const spread = asks.length > 0 && bids.length > 0
        ? asks[0].price - bids[0].price
        : 0;

    const spreadPercentage = currentPrice > 0 ? (spread / currentPrice) * 100 : 0;

    const maxCumulative = useMemo(() => {
        const lastBid = bids[bids.length - 1]?.cumulative || 1;
        const lastAsk = asks[asks.length - 1]?.cumulative || 1;
        return Math.max(lastBid, lastAsk);
    }, [bids, asks]);

    return (
        <div className="flex flex-col h-full bg-[#0B0E11] border border-white/5 rounded-xl overflow-hidden font-mono">
            {/* Header Content for Desktop (Optional) */}
            <div className="hidden lg:grid grid-cols-2 px-4 py-2 border-b border-white/5 bg-white/[0.02]">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Price(USDT)</span>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Amount({symbol})</span>
            </div>

            {/* Asks Section (Sells) - Descending price */}
            <div className="flex-1 flex flex-col justify-end overflow-hidden">
                <div className="flex flex-col">
                    {asks.slice(0, 25).reverse().map((ask, i) => (
                        <div key={`ask-${i}`} className="relative h-[44px] md:h-[28px] lg:h-[24px] flex items-center justify-between px-4 group cursor-pointer hover:bg-white/[0.03] transition-colors">
                            <div
                                className="absolute right-0 top-0 bottom-0 bg-[#ea3943]/[0.08] transition-all duration-500"
                                style={{ width: `${(ask.cumulative / maxCumulative) * 100}%` }}
                            />
                            <span className="relative text-[13px] md:text-[12px] font-bold text-[#ea3943] z-10">
                                {ask.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                            <span className="relative text-[12px] md:text-[11px] font-medium text-gray-400 group-hover:text-white transition-colors z-10">
                                {ask.volume.toFixed(4)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Spread Row */}
            <div className="px-4 py-3 bg-[#171A1E] border-y border-white/5 flex flex-col justify-center gap-1">
                <div className="flex items-center justify-between">
                    <span className="text-[18px] md:text-[16px] font-black text-white leading-none">
                        {currentPrice?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className={`text-[12px] md:text-[11px] font-black ${spreadPercentage > 0.01 ? 'text-[#ea3943]' : 'text-[#16c784]'}`}>
                        Spread: {spread.toFixed(2)} ({spreadPercentage.toFixed(2)}%)
                    </span>
                </div>
                <span className="text-[10px] font-bold text-gray-400">
                    ≈ ${currentPrice?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                </span>
            </div>

            {/* Bids Section (Buys) - Ascending price from spread */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex flex-col">
                    {bids.slice(0, 25).map((bid, i) => (
                        <div key={`bid-${i}`} className="relative h-[44px] md:h-[28px] lg:h-[24px] flex items-center justify-between px-4 group cursor-pointer hover:bg-white/[0.03] transition-colors">
                            <div
                                className="absolute right-0 top-0 bottom-0 bg-[#16c784]/[0.08] transition-all duration-500"
                                style={{ width: `${(bid.cumulative / maxCumulative) * 100}%` }}
                            />
                            <span className="relative text-[13px] md:text-[12px] font-bold text-[#16c784] z-10">
                                {bid.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                            <span className="relative text-[12px] md:text-[11px] font-medium text-gray-400 group-hover:text-white transition-colors z-10">
                                {bid.volume.toFixed(4)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
