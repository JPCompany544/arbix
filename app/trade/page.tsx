"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TokenLogo from "@/components/TokenLogo";

function TradePageContent() {
    const searchParams = useSearchParams();
    const activeSymbol = searchParams.get("symbol") || "ETH";

    const stats = [
        { label: "24h Change", value: "-0.19%", color: "text-red-500" },
        { label: "24h High", value: "2147.73" },
        { label: "24h Low", value: "2008.62" },
        { label: "24h Volume (" + activeSymbol + ")", value: "65689" },
        { label: "24h Volume (USDT)", value: "136,514,721.00" },
    ];

    const orderHistoryHeaders = [
        "Date", "Pair", "Side", "Type", "Amount", "Price", "Action"
    ];

    const mockOrders = [
        { date: "2026-02-10 03:20", pair: `${activeSymbol}/USDT`, side: "Buy", type: "Limit", amount: "1.50", price: "2115.00", status: "Active" },
    ];

    return (
        <main className="min-h-screen bg-gray-50 pt-20 px-6 pb-12">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-1">

                {/* Left Section: Ticker + Chart + History Tabs */}
                <div className="lg:col-span-8 flex flex-col gap-1">
                    {/* Top Ticker Header */}
                    <div className="bg-white border border-gray-200 rounded-tl-lg px-6 py-3 flex items-center justify-between overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <div className="flex items-center gap-6 divide-x divide-gray-100">
                            <div className="flex items-center gap-4 pr-6">
                                <div className="flex items-center gap-2">
                                    <TokenLogo symbol={activeSymbol} size={24} />
                                    <h2 className="text-[16px] font-black text-black uppercase">{activeSymbol}/USDT</h2>
                                </div>
                                <span className="text-[18px] font-black text-red-500">2118.5</span>
                            </div>
                            <div className="flex items-center gap-10 pl-6">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="flex flex-col">
                                        <span className="text-[11px] font-medium text-gray-400 leading-none mb-1">{stat.label}</span>
                                        <span className={`text-[12px] font-bold ${stat.color || 'text-black'} leading-none`}>
                                            {stat.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Chart Area */}
                    <div className="bg-white border border-gray-200 p-6 flex items-center justify-center min-h-[500px]">
                        <div className="text-center text-gray-400">
                            <svg className="mx-auto mb-4" width="80" height="80" viewBox="0 0 80 80" fill="none">
                                <rect x="10" y="30" width="8" height="40" fill="currentColor" opacity="0.3" />
                                <rect x="24" y="20" width="8" height="50" fill="currentColor" opacity="0.5" />
                                <rect x="38" y="35" width="8" height="35" fill="currentColor" opacity="0.4" />
                                <rect x="52" y="15" width="8" height="55" fill="currentColor" opacity="0.6" />
                                <rect x="66" y="25" width="8" height="45" fill="currentColor" opacity="0.5" />
                            </svg>
                            <p className="text-sm font-semibold">TradingView Chart Coming Soon</p>
                            <p className="text-xs mt-1">Real-time price action for {activeSymbol}/USDT</p>
                        </div>
                    </div>

                    {/* History Tabs */}
                    <div className="bg-white border border-gray-200 rounded-bl-lg">
                        <div className="flex items-center border-b border-gray-100 px-6">
                            <button className="px-4 py-3 text-sm font-bold text-black border-b-2 border-black">Order History</button>
                            <button className="px-4 py-3 text-sm font-medium text-gray-400 hover:text-black">Trade History</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {orderHistoryHeaders.map((header) => (
                                            <th key={header} className="px-6 py-3 text-left text-[11px] font-black text-gray-500 uppercase tracking-wider">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {mockOrders.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                                                <div className="flex flex-col items-center gap-2">
                                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="opacity-30">
                                                        <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
                                                        <path d="M16 24h16M24 16v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                    </svg>
                                                    <p className="text-sm font-semibold">No Orders Yet</p>
                                                    <p className="text-xs">Place your first order to get started</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        mockOrders.map((order, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="px-6 py-3 font-medium text-gray-600">{order.date}</td>
                                                <td className="px-6 py-3 font-bold text-black">{order.pair}</td>
                                                <td className="px-6 py-3">
                                                    <span className={`font-bold ${order.side === 'Buy' ? 'text-green-500' : 'text-red-500'}`}>
                                                        {order.side}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-3 text-gray-600">{order.type}</td>
                                                <td className="px-6 py-3 font-semibold text-black">{order.amount}</td>
                                                <td className="px-6 py-3 font-semibold text-black">{order.price}</td>
                                                <td className="px-6 py-3">
                                                    <button className="text-xs font-bold text-red-500 hover:text-red-600">Cancel</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Section: Order Form */}
                <div className="lg:col-span-4 bg-white border border-gray-200 rounded-tr-lg rounded-br-lg p-6">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                        <button className="flex-1 py-2 text-sm font-bold text-green-500 border-b-2 border-green-500">Buy</button>
                        <button className="flex-1 py-2 text-sm font-medium text-gray-400 hover:text-red-500">Sell</button>
                    </div>

                    {/* Available Balance */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-500">Available</span>
                            <span className="text-sm font-bold text-black">0.00 USDT</span>
                        </div>
                    </div>

                    {/* Order Type */}
                    <div className="mb-4">
                        <label className="block text-xs font-bold text-gray-600 mb-2">Order Type</label>
                        <select className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-500">
                            <option>Limit</option>
                            <option>Market</option>
                        </select>
                    </div>

                    {/* Price Input */}
                    <div className="mb-4">
                        <label className="block text-xs font-bold text-gray-600 mb-2">Price</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="0.00"
                                className="w-full px-4 py-3 pr-16 border border-gray-200 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">USDT</span>
                        </div>
                    </div>

                    {/* Amount Input */}
                    <div className="mb-4">
                        <label className="block text-xs font-bold text-gray-600 mb-2">Amount</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="0.00"
                                className="w-full px-4 py-3 pr-16 border border-gray-200 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">{activeSymbol}</span>
                        </div>
                    </div>

                    {/* Percentage selectors */}
                    <div className="grid grid-cols-4 gap-2 mb-6">
                        {['25%', '50%', '75%', '100%'].map((pct) => (
                            <button key={pct} className="py-2 text-xs font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                {pct}
                            </button>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-500">Total</span>
                            <span className="text-sm font-bold text-black">0.00 USDT</span>
                        </div>
                    </div>

                    {/* Buy Button */}
                    <button className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors shadow-lg shadow-green-500/20">
                        Buy {activeSymbol}
                    </button>

                    {/* Info */}
                    <p className="mt-4 text-xs text-center text-gray-400">
                        Please <span className="text-green-500 font-semibold">log in</span> or <span className="text-green-500 font-semibold">sign up</span> to start trading
                    </p>
                </div>

            </div>
        </main>
    );
}

export default function TradePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                    <p className="text-sm font-semibold text-gray-600">Loading trade page...</p>
                </div>
            </div>
        }>
            <TradePageContent />
        </Suspense>
    );
}
