"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TokenLogo from "@/components/TokenLogo";
import TradingChart from "@/components/TradingChart";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import OrderBook from "@/components/OrderBook";
import TradeActionModal from "@/components/TradeActionModal";

function TradePageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const activeSymbol = searchParams.get("symbol") || "ETH";
    const { openModal } = useModal();

    const [allMarkets, setAllMarkets] = useState<any[]>([]);
    const [activeMarket, setActiveMarket] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isActionModalOpen, setIsActionModalOpen] = useState(false);
    const [actionModalSide, setActionModalSide] = useState<"buy" | "sell">("buy");

    useEffect(() => {
        const fetchMarkets = async () => {
            try {
                const res = await fetch("/api/prices/markets");
                const data = await res.json();
                if (Array.isArray(data)) {
                    setAllMarkets(data);
                    const found = data.find(m => m.symbol === activeSymbol);
                    if (found) setActiveMarket(found);
                }
            } catch (error) {
                console.error("Failed to fetch markets:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMarkets();
        const interval = setInterval(fetchMarkets, 10000); // 10s updates
        return () => clearInterval(interval);
    }, [activeSymbol]);

    const stats = activeMarket ? [
        { label: "24h Change", value: `${activeMarket.change24h >= 0 ? "+" : ""}${activeMarket.change24h.toFixed(2)}%`, color: activeMarket.change24h >= 0 ? "text-emerald-500" : "text-rose-500" },
        { label: "24h High", value: activeMarket.high24h.toLocaleString(undefined, { minimumFractionDigits: 2 }) },
        { label: "24h Low", value: activeMarket.low24h.toLocaleString(undefined, { minimumFractionDigits: 2 }) },
        { label: "24h Volume (" + activeSymbol + ")", value: activeMarket.volume24h.toLocaleString(undefined, { maximumFractionDigits: 0 }) },
        { label: "24h Volume (USDT)", value: (activeMarket.volume24h * activeMarket.price).toLocaleString(undefined, { maximumFractionDigits: 0 }) },
    ] : [
        { label: "24h Change", value: "0.00%", color: "text-gray-500" },
        { label: "24h High", value: "0.00" },
        { label: "24h Low", value: "0.00" },
        { label: "24h Volume", value: "0" },
        { label: "24h Volume (USDT)", value: "0" },
    ];

    const orderHistoryHeaders = [
        "Date", "Pair", "Side", "Type", "Amount", "Price", "Action"
    ];

    const mockOrders = [
        { date: "2026-02-10 03:20", pair: `${activeSymbol}/USDT`, side: "Buy", type: "Limit", amount: "1.50", price: "2115.00", status: "Active" },
    ];

    return (
        <main className="min-h-screen bg-[#020202] pt-[112px] md:pt-24 px-4 md:px-6 pb-20 md:pb-12 text-white">
            <div className="max-w-[1536px] mx-auto flex flex-col gap-1.5 lg:grid lg:grid-cols-12 lg:gap-1.5">

                {/* 1. Mobile Only: Price Summary & Pair Selector */}
                <div className="md:hidden flex flex-col gap-6 mb-6">
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                            <h1 className="text-[32px] font-black font-mono tracking-tighter leading-none">
                                {activeMarket?.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}
                            </h1>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-bold text-gray-500">
                                ≈ ${activeMarket?.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"} USD
                            </span>
                            <span className={`text-sm font-black ${activeMarket?.change24h >= 0 ? "text-[#16c784]" : "text-[#ea3943]"}`}>
                                {activeMarket?.change24h >= 0 ? "+" : ""}{activeMarket?.change24h.toFixed(2) || "0.00"}%
                            </span>
                        </div>

                        {/* High/Low/Vol Row */}
                        <div className="grid grid-cols-3 gap-4 mt-6 border-t border-white/5 pt-6">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">24H High</span>
                                <span className="text-[13px] font-bold font-mono">{activeMarket?.high24h.toLocaleString(undefined, { minimumFractionDigits: 2 }) || "0.00"}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">24H Low</span>
                                <span className="text-[13px] font-bold font-mono">{activeMarket?.low24h.toLocaleString(undefined, { minimumFractionDigits: 2 }) || "0.00"}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">24H Volume</span>
                                <span className="text-[13px] font-bold font-mono">{activeMarket?.volume24h.toLocaleString(undefined, { maximumFractionDigits: 0 }) || "0"}</span>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center">
                            <button
                                onClick={() => openModal()}
                                className="text-xs font-black text-orange-500 hover:text-orange-400 flex items-center gap-1 uppercase tracking-widest"
                            >
                                <span className="text-[16px] leading-none">•</span> Deposit
                            </button>
                        </div>
                    </div>

                    <div className="h-[1px] bg-white/5 w-full" />

                    <div className="relative">
                        <select
                            onChange={(e) => {
                                const symbol = e.target.value;
                                router.push(`/trade?symbol=${symbol}`);
                            }}
                            value={activeSymbol}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        >
                            {allMarkets.map(m => (
                                <option key={m.symbol} value={m.symbol}>{m.symbol} / USDT</option>
                            ))}
                        </select>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xl font-black tracking-tighter uppercase">{activeSymbol} / USDT</h2>
                                    <ChevronDown size={18} className="text-gray-500" />
                                </div>
                                <span className={`text-[11px] font-black mt-0.5 ${activeMarket?.change24h >= 0 ? "text-[#16c784]" : "text-[#ea3943]"}`}>
                                    {activeMarket?.change24h >= 0 ? "+" : ""}{activeMarket?.change24h.toFixed(2) || "0.00"}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Desktop Order Book (Sidebar) */}
                <div className="hidden lg:block lg:col-span-2 h-[800px]">
                    <OrderBook symbol={activeSymbol} currentPrice={activeMarket?.price} />
                </div>

                {/* 3. Main Center Content (Ticker + Chart + History) */}
                <div className="lg:col-span-7 flex flex-col gap-1.5">
                    {/* Desktop Ticker Header */}
                    <div className="hidden md:flex bg-[#0B0E11] border border-white/5 rounded-t-xl px-6 py-4 items-center justify-between overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <div className="flex items-center gap-8 divide-x divide-white/5">
                            <div className="flex items-center gap-5 pr-8">
                                <div className="flex items-center gap-3">
                                    <TokenLogo symbol={activeSymbol} size={28} />
                                    <h2 className="text-[18px] font-black text-white uppercase tracking-tighter">{activeSymbol}/USDT</h2>
                                </div>
                                <span className="text-[20px] font-black text-[#16c784] font-mono">
                                    {activeMarket?.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}
                                </span>
                            </div>
                            <div className="flex items-center gap-10 pl-8">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{stat.label}</span>
                                        <span className={`text-[13px] font-bold ${stat.color || 'text-white'} leading-none`}>
                                            {stat.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Chart Area */}
                    <div className="bg-[#0B0E11] border border-white/5 p-1 min-h-[500px]">
                        <TradingChart symbol={activeSymbol} />
                    </div>

                    {/* Mobile Quick Actions: Buy/Sell Buttons */}
                    <div className="md:hidden flex gap-3 px-1">
                        <button
                            onClick={() => {
                                setActionModalSide("buy");
                                setIsActionModalOpen(true);
                            }}
                            className="flex-1 py-4 bg-[#16c784] hover:bg-[#12a66e] text-black font-black uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]"
                        >
                            Buy {activeSymbol}
                        </button>
                        <button
                            onClick={() => {
                                setActionModalSide("sell");
                                setIsActionModalOpen(true);
                            }}
                            className="flex-1 py-4 bg-[#ea3943] hover:bg-[#cf2d36] text-white font-black uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]"
                        >
                            Sell {activeSymbol}
                        </button>
                    </div>

                    {/* Mobile Order Book */}
                    <div className="md:hidden mt-4">
                        <OrderBook symbol={activeSymbol} currentPrice={activeMarket?.price} />
                    </div>

                </div>

                {/* 4. Order Form (Right Sidebar) */}
                <div className="hidden lg:flex lg:col-span-3 bg-[#0B0E11] border border-white/5 rounded-xl p-6 flex-col h-fit">

                    <div className="flex items-center justify-between mb-8 p-1 bg-[#1E2329] rounded-xl">
                        <button className="flex-1 py-3 text-xs font-black uppercase tracking-widest text-emerald-500 bg-[#0B0E11] rounded-lg shadow-sm">Buy</button>
                        <button className="flex-1 py-3 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-rose-500 transition-colors">Sell</button>
                    </div>

                    <div className="mb-6">
                        <div className="flex items-center justify-between px-1">
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Available</span>
                            <span className="text-xs font-bold text-white">0.00 USDT</span>
                        </div>
                    </div>

                    <div className="mb-5">
                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 px-1">Order Type</label>
                        <select className="w-full bg-[#1E2329] border border-white/5 rounded-xl px-4 py-3.5 text-sm font-bold text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all appearance-none cursor-pointer">
                            <option>Limit Order</option>
                            <option>Market Order</option>
                        </select>
                    </div>

                    <div className="mb-5">
                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 px-1">Price</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="0.00"
                                className="w-full bg-[#1E2329] border border-white/5 rounded-xl px-4 py-3.5 pr-16 text-sm font-bold text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-gray-600"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-500 uppercase">USDT</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 px-1">Amount</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="0.00"
                                className="w-full bg-[#1E2329] border border-white/5 rounded-xl px-4 py-3.5 pr-16 text-sm font-bold text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-gray-600"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-500 uppercase">{activeSymbol}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 mb-8">
                        {['25%', '50%', '75%', '100%'].map((pct) => (
                            <button key={pct} className="py-2.5 text-[10px] font-black text-gray-400 bg-[#1E2329] hover:bg-[#2B3139] hover:text-white rounded-lg transition-all border border-white/5">
                                {pct}
                            </button>
                        ))}
                    </div>

                    <div className="mb-8 p-4 bg-white/5 border border-white/5 rounded-xl">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Est. Total</span>
                            <span className="text-sm font-bold text-emerald-500">0.00 USDT</span>
                        </div>
                    </div>

                    <button className="w-full py-4.5 bg-emerald-500 hover:bg-emerald-600 text-[#020202] text-sm font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-500/10 active:scale-[0.98]">
                        Buy {activeSymbol}
                    </button>

                    <p className="mt-6 text-[11px] text-center text-gray-500 font-medium">
                        Please <span className="text-orange-500 font-bold cursor-pointer hover:underline">Log In</span> or <span className="text-orange-500 font-bold cursor-pointer hover:underline">Register</span> to trade
                    </p>
                </div>
            </div>

            <TradeActionModal
                isOpen={isActionModalOpen}
                onClose={() => setIsActionModalOpen(false)}
                symbol={activeSymbol}
                currentPrice={activeMarket?.price || 0}
                initialSide={actionModalSide}
            />
        </main>
    );
}

export default function TradePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#020202] pt-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Initialising Terminal...</p>
                </div>
            </div>
        }>
            <TradePageContent />
        </Suspense>
    );
}
