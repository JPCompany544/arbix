"use client";

import { useSearchParams } from "next/navigation";
import TokenLogo from "@/components/TokenLogo";

export default function TradePage() {
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

                    {/* Chart Placeholder */}
                    <div className="bg-white border border-gray-200 min-h-[450px] flex items-center justify-center text-gray-400">
                        Chart Section Placeholder
                    </div>

                    {/* Bottom Tabs: My Open Orders & My Trading History */}
                    <div className="bg-white border border-gray-200 rounded-bl-lg p-6 min-h-[250px] overflow-hidden">
                        <div className="flex items-center gap-8 border-b border-gray-100 mb-6">
                            <button className="text-[13px] font-bold text-black border-b-2 border-orange-500 pb-3 -mb-[1px]">
                                My Open Orders
                            </button>
                            <button className="text-[13px] font-bold text-gray-400 hover:text-black pb-3 transition-colors">
                                My Trading History
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left border-b border-gray-50">
                                        {orderHistoryHeaders.map(header => (
                                            <th key={header} className="pb-4 text-[11px] font-medium text-gray-400 uppercase tracking-wider">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockOrders.map((order, i) => (
                                        <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 text-[12px] font-medium text-gray-900">{order.date}</td>
                                            <td className="py-4 text-[12px] font-bold text-black">{order.pair}</td>
                                            <td className={`py-4 text-[12px] font-bold ${order.side === 'Buy' ? 'text-green-500' : 'text-red-500'}`}>{order.side}</td>
                                            <td className="py-4 text-[12px] font-medium text-gray-600">{order.type}</td>
                                            <td className="py-4 text-[12px] font-bold text-black">{order.amount}</td>
                                            <td className="py-4 text-[12px] font-bold text-black">{order.price}</td>
                                            <td className="py-4">
                                                <button className="text-[11px] font-bold text-orange-500 hover:text-orange-600 transition-colors">Cancel</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {mockOrders.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <span className="text-[12px] text-gray-300 font-medium">No active orders found</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Section: Order Book & Trades side-by-side + Trading Panel */}
                <div className="lg:col-span-4 flex flex-col gap-1">
                    <div className="grid grid-cols-2 gap-1">
                        <div className="bg-white border border-gray-200 p-4 flex flex-col h-fit">
                            <h3 className="text-[14px] font-bold text-black mb-3">Order Book</h3>
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-medium text-gray-400 leading-none mb-1">Price (USDT)</span>
                                    <span className="text-[13px] font-bold text-black leading-none">2118.5</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-medium text-gray-400 leading-none mb-1">Size (ETH)</span>
                                    <span className="text-[11px] text-gray-200">─</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-medium text-gray-400 leading-none mb-1">Total (USDT)</span>
                                    <span className="text-[11px] text-gray-200">─</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-tr-lg p-4 flex flex-col h-fit">
                            <h3 className="text-[14px] font-bold text-black mb-3">Trades</h3>
                            <div className="flex flex-col gap-3">
                                <div className="grid grid-cols-3 gap-1">
                                    <span className="text-[11px] font-medium text-gray-400">Price</span>
                                    <span className="text-[11px] font-medium text-gray-400">Size</span>
                                    <span className="text-[11px] font-medium text-gray-400 text-right">Time</span>
                                </div>
                                <div className="text-[11px] text-gray-200 italic">No recent trades</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-br-lg p-4 flex flex-col min-h-[500px]">
                        <div className="flex items-center gap-6 mb-5">
                            <button className="text-[12px] font-bold text-black border-b-2 border-orange-500 pb-1">Limit</button>
                            <button className="text-[12px] font-bold text-gray-400 hover:text-black pb-1">Market</button>
                            <button className="text-[12px] font-bold text-gray-400 hover:text-black pb-1">Trigger Order</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-3.5">
                                <div className="flex justify-between items-center text-[11px]">
                                    <span className="text-gray-400 font-medium">Available:</span>
                                    <span className="text-black font-bold">0.00 USDT</span>
                                </div>
                                <div className="relative">
                                    <input type="text" readOnly value="Market Price" className="w-full bg-gray-50 border border-gray-100 rounded-lg py-2 px-3 text-[12px] font-bold text-gray-400 cursor-not-allowed" />
                                </div>
                                <div className="relative">
                                    <input type="text" placeholder="Amount" className="w-full bg-gray-50 border border-gray-100 rounded-lg py-2 px-3 text-[12px] font-bold text-black placeholder:text-gray-400 pr-12 focus:outline-none focus:border-orange-500" />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-gray-400">USDT</span>
                                </div>
                                <div className="flex items-center justify-between gap-1">
                                    {['0%', '25%', '50%', '75%', '100%'].map((p) => (
                                        <button key={p} className="flex-1 py-1 text-[10px] font-bold text-gray-400 bg-gray-50 hover:bg-gray-100 rounded transition-colors">{p}</button>
                                    ))}
                                </div>
                                <div className="text-[11px] text-gray-400 font-medium">Get per purchase: <span className="text-black font-bold">0 {activeSymbol}</span></div>
                                <button className="w-full py-2.5 bg-green-500 hover:bg-green-600 text-white font-black text-[13px] rounded-lg transition-colors active:scale-95">
                                    Buy {activeSymbol}
                                </button>
                            </div>

                            <div className="flex flex-col gap-3.5">
                                <div className="flex justify-between items-center text-[11px]">
                                    <span className="text-gray-400 font-medium">Available:</span>
                                    <span className="text-black font-bold">0 {activeSymbol}</span>
                                </div>
                                <div className="relative">
                                    <input type="text" readOnly value="Market Price" className="w-full bg-gray-50 border border-gray-100 rounded-lg py-2 px-3 text-[12px] font-bold text-gray-400 cursor-not-allowed" />
                                </div>
                                <div className="relative">
                                    <input type="text" placeholder="Amount" className="w-full bg-gray-50 border border-gray-100 rounded-lg py-2 px-3 text-[12px] font-bold text-black placeholder:text-gray-400 pr-12 focus:outline-none focus:border-orange-500" />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-gray-400">{activeSymbol}</span>
                                </div>
                                <div className="flex items-center justify-between gap-1">
                                    {['0%', '25%', '50%', '75%', '100%'].map((p) => (
                                        <button key={p} className="flex-1 py-1 text-[10px] font-bold text-gray-400 bg-gray-50 hover:bg-gray-100 rounded transition-colors">{p}</button>
                                    ))}
                                </div>
                                <div className="text-[11px] text-gray-400 font-medium">Get per sale: <span className="text-black font-bold">0 USDT</span></div>
                                <button className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white font-black text-[13px] rounded-lg transition-colors active:scale-95">
                                    Sell {activeSymbol}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
