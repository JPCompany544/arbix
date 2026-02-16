"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, RefreshCw, Star } from "lucide-react";
import { MarketData } from "@/lib/pricing/price-service";
import TokenLogo from "./TokenLogo";

interface MarketTableProps {
    initialData: MarketData[];
}

export default function MarketTable({ initialData }: MarketTableProps) {
    const [marketData, setMarketData] = useState<MarketData[]>(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
    const [mounted, setMounted] = useState(false);

    const tableHeaders = [
        { name: "Trading Pairs", sortable: false },
        { name: "Last Price", sortable: true },
        { name: "24H Change%", sortable: false },
        { name: "24H High", sortable: true },
        { name: "24H Low", sortable: true },
        { name: "24H Volume", sortable: true },
        { name: "Action", sortable: false },
    ];

    const fetchPrices = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/prices/markets");
            if (res.ok) {
                const data = await res.json();
                if (data.length > 0) {
                    setMarketData(data);
                    setLastUpdated(new Date());
                }
            }
        } catch (error) {
            console.error("Failed to fetch market data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(fetchPrices, 30000); // Poll every 30 seconds
        return () => clearInterval(interval);
    }, []);

    const formatPrice = (price: number) => {
        if (price >= 1) {
            return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 });
    };

    const formatVolume = (volume: number) => {
        if (volume >= 1000000) {
            return (volume / 1000000).toFixed(2) + "M";
        }
        if (volume >= 1000) {
            return (volume / 1000).toFixed(2) + "K";
        }
        return volume.toFixed(2);
    };

    return (
        <div className="mt-8 overflow-x-auto">
            <div className="flex justify-end mb-4 items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {isLoading ? (
                    <RefreshCw className="w-3 h-3 animate-spin text-orange-500" />
                ) : (
                    <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                )}
                Last Live Sync: {mounted ? lastUpdated.toLocaleTimeString() : "--:--:--"}
            </div>

            <div className="min-w-[1000px]">
                {/* Table Headers */}
                <div className="bg-gray-100 rounded-lg py-2.5 px-6 grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1.5fr_1fr] items-center mb-2">
                    {tableHeaders.map((header, idx) => (
                        <div key={idx} className={`flex items-center gap-1 group cursor-pointer ${idx === 6 ? "justify-end" : "justify-start"}`}>
                            <span className="text-[11px] font-bold text-gray-500 group-hover:text-black transition-colors uppercase tracking-tight">
                                {header.name}
                            </span>
                            {header.sortable && (
                                <span className="text-[10px] text-gray-400 group-hover:text-black transition-colors -mt-0.5">↑</span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Table Body */}
                <div className="space-y-1">
                    {marketData.map((coin, idx) => (
                        <div key={idx} className="px-6 py-4 grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1.5fr_1fr] items-center hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-none group">
                            <div className="flex items-center gap-3">
                                <TokenLogo
                                    symbol={coin.symbol}
                                    size={28}
                                    className="shadow-sm border border-gray-100 group-hover:border-orange-200 transition-all bg-white"
                                />
                                <div className="flex flex-col">
                                    <span className="text-[13px] font-bold text-black group-hover:text-orange-500 transition-colors">
                                        {coin.pair}
                                    </span>
                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Spot / USDT</span>
                                </div>
                            </div>
                            <div className="text-[13px] font-black text-black tracking-tight tracking-[-0.02em]">
                                ${formatPrice(coin.price)}
                            </div>
                            <div className={`text-[13px] font-bold ${coin.change24h < 0 ? 'text-red-500' : coin.change24h === 0 ? 'text-gray-400' : 'text-green-500'}`}>
                                {coin.change24h > 0 ? "+" : ""}{coin.change24h?.toFixed(2)}%
                            </div>
                            <div className="text-[13px] font-bold text-gray-700 tracking-tight">${formatPrice(coin.high24h)}</div>
                            <div className="text-[13px] font-bold text-gray-700 tracking-tight">${formatPrice(coin.low24h)}</div>
                            <div className="text-[13px] font-bold text-gray-600">
                                {formatVolume(coin.volume24h)} <span className="text-[10px] text-gray-400 ml-1 font-bold">(USDT)</span>
                            </div>
                            <div className="flex justify-end gap-2">
                                <Link href={`/trade?symbol=${coin.symbol}`} className="px-5 py-2 bg-black text-white text-[11px] font-bold rounded-lg hover:bg-orange-600 hover:scale-105 transition-all active:scale-95 shadow-sm">
                                    Trade
                                </Link>
                            </div>
                        </div>
                    ))}

                    {marketData.length === 0 && !isLoading && (
                        <div className="py-20 text-center text-gray-400 font-bold">
                            No market data available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
