"use client";

import Link from "next/link";
import {
    BarChart3,
    ArrowDownCircle,
    ArrowUpCircle,
    RefreshCw,
    ArrowRightLeft,
    Wallet,
    Search,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import { useState } from "react";
import { useModal } from "@/context/ModalContext";
import { usePortfolio } from "@/context/PortfolioContext";
import TokenLogo from "@/components/TokenLogo";

export default function DashboardPage() {
    const { openModal } = useModal();
    const { portfolio, isLoading } = usePortfolio();
    const [expandedAsset, setExpandedAsset] = useState<string | null>(null);

    const toggleAsset = (symbol: string) => {
        if (expandedAsset === symbol) {
            setExpandedAsset(null);
        } else {
            setExpandedAsset(symbol);
        }
    };

    const sidebarItems = [
        { name: "Asset Overview", icon: BarChart3, active: true },
        { name: "Deposit", icon: ArrowDownCircle },
        { name: "Withdraw", icon: ArrowUpCircle },
        { name: "Transfer", icon: ArrowRightLeft },
        { name: "Swap", icon: RefreshCw },
    ];

    const staticAssets = [
        { symbol: "BTC", name: "Bitcoin" },
        { symbol: "ETH", name: "Ethereum" },
        { symbol: "USDT", name: "Tether" },
        { symbol: "BNB", name: "BNB" },
        { symbol: "SOL", name: "Solana" },
        { symbol: "XRP", name: "Ripple" },
        { symbol: "DOGE", name: "Dogecoin" },
        { symbol: "TON", name: "Toncoin" },
        { symbol: "TRX", name: "TRON" },
        { symbol: "ADA", name: "Cardano" },
        { symbol: "AVAX", name: "Avalanche" },
        { symbol: "WBTC", name: "Wrapped Bitcoin" },
        { symbol: "SHIB", name: "SHIBA INU" },
        { symbol: "BCH", name: "Bitcoin Cash" },
        { symbol: "LINK", name: "ChainLink" },
        { symbol: "DOT", name: "Polkadot" },
        { symbol: "DAI", name: "Dai" },
    ];

    // Merge portfolio data with static asset list
    const displayedAssets = staticAssets.map(asset => {
        const portfolioItem = portfolio?.assets.find(p => p.symbol === asset.symbol);
        return {
            ...asset,
            balance: portfolioItem?.balance || 0,
            usdValue: portfolioItem?.usdValue || 0,
            price: portfolioItem?.price || 0
        };
    }).sort((a, b) => {
        // Sort by USD value descending
        return b.usdValue - a.usdValue;
    });

    const totalValue = portfolio?.totalUsdValue || 0;

    return (
        <main className="min-h-screen bg-[#FDFDFD] pt-16 flex overflow-x-hidden">
            {/* Side Panel */}
            <aside className="hidden lg:flex w-64 bg-white border-r border-gray-100 flex-col fixed h-full shadow-[2px_0_10px_rgba(0,0,0,0.02)] z-10">
                <div className="flex flex-col gap-1 px-4 py-8 flex-1">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.name}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${item.active
                                ? "bg-gray-100 text-black shadow-sm"
                                : "text-gray-400 hover:text-black hover:bg-gray-50"
                                }`}
                        >
                            <item.icon size={18} className={item.active ? "text-orange-500" : "group-hover:text-orange-500 transition-colors"} />
                            <span className="text-[13px] font-bold tracking-tight">
                                {item.name}
                            </span>
                        </button>
                    ))}

                    {/* Centered Wallet Connect Button */}
                    <div className="mt-6">
                        <button className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-orange-500 text-white rounded-xl font-bold text-[13px] transition-all duration-200 hover:bg-gray-100 hover:text-gray-600 active:bg-gray-200 shadow-lg shadow-orange-500/10">
                            <Wallet size={18} />
                            <span>Wallet Connect</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <section className="flex-1 ml-0 lg:ml-64 p-4 lg:p-12 text-black overflow-x-hidden">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="bg-gray-100 rounded-2xl p-6 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 gap-6 lg:gap-0">
                        <div className="flex flex-col gap-4 w-full lg:w-auto">
                            <h1 className="text-xl font-black tracking-tight">Asset Overview</h1>
                            <div className="grid grid-cols-2 gap-2 lg:flex lg:items-center lg:gap-3">
                                <button
                                    onClick={() => openModal(undefined, 'deposit')}
                                    className="px-4 py-2 bg-black text-white rounded-lg font-bold text-[11px] hover:bg-orange-500 transition-colors shadow-lg shadow-black/5 active:scale-95 text-center"
                                >
                                    Deposit
                                </button>
                                <button
                                    onClick={() => openModal(undefined, 'withdraw')}
                                    className="px-4 py-2 bg-white border border-gray-200 text-black rounded-lg font-bold text-[11px] hover:bg-gray-50 transition-colors active:scale-95 text-center"
                                >
                                    Withdraw
                                </button>
                                <button
                                    onClick={() => openModal(undefined, 'activity')}
                                    className="px-4 py-2 bg-white border border-gray-200 text-black rounded-lg font-bold text-[11px] hover:bg-gray-50 transition-colors active:scale-95 text-center"
                                >
                                    Transfer
                                </button>
                                <button
                                    className="px-4 py-2 bg-white border border-gray-200 text-black rounded-lg font-bold text-[11px] hover:bg-gray-50 transition-colors active:scale-95 text-center"
                                >
                                    Swap
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col items-start lg:items-end border-l-0 lg:border-l border-gray-200 pt-6 lg:pt-0 lg:pl-8 h-full justify-center w-full lg:w-auto border-t lg:border-t-0 mt-2 lg:mt-0">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Estimated Balance</span>
                            <div className="flex flex-col items-end w-full lg:w-auto">
                                <div className="flex items-baseline gap-2 w-full lg:w-auto justify-between lg:justify-end">
                                    <span className="text-2xl font-black">
                                        ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                    <span className="text-gray-400 font-bold text-xs">USD</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex justify-end mb-2 px-1">
                        <div className="relative group w-full max-w-xs">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-orange-500 transition-colors" size={14} />
                            <input
                                type="text"
                                placeholder="Search Coin"
                                className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-[11px] font-bold text-black placeholder:text-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Asset Category Heading */}
                    <div className="bg-gray-100 rounded-lg py-2 shadow-sm grid grid-cols-[45%_55%] lg:grid-cols-[22%_43%_35%] items-center mb-2 gap-0 overflow-hidden">
                        {/* Assets - Left */}
                        <div className="pl-6">
                            <button className="text-[12px] font-black text-black">Assets</button>
                        </div>

                        {/* Categories - Centered in middle section (Hidden on Mobile) */}
                        <div className="hidden lg:flex items-center justify-center gap-8">
                            <button className="text-[11px] font-bold text-gray-400 hover:text-black transition-colors w-[75px] text-center">Overall</button>
                            <button className="text-[11px] font-bold text-gray-400 hover:text-black transition-colors w-[75px] text-center">Main</button>
                            <button className="text-[11px] font-bold text-gray-400 hover:text-black transition-colors w-[75px] text-center">Trade</button>
                            <button className="text-[11px] font-bold text-gray-400 hover:text-black transition-colors w-[75px] text-center">Collateral</button>
                        </div>

                        {/* Overall Header for Mobile */}
                        <div className="flex lg:hidden justify-end pr-10">
                            <button className="text-[12px] font-black text-black">Overall</button>
                        </div>

                        {/* Dead Space - 35% (Hidden on Mobile) */}
                        <div className="hidden lg:block w-full"></div>
                    </div>

                    {/* Table Container */}
                    <div className="w-full overflow-hidden">
                        {isLoading ? (
                            <div className="p-8 text-center text-gray-400 text-xs">Loading...</div>
                        ) : (
                            displayedAssets.map((asset, index) => (
                                <div key={asset.symbol}>
                                    <div
                                        onClick={() => toggleAsset(asset.symbol)}
                                        className={`grid grid-cols-[45%_55%] lg:grid-cols-[22%_43%_35%] items-center py-4 gap-0 group cursor-pointer transition-colors hover:bg-gray-50/30 ${index !== displayedAssets.length - 1 ? 'border-b border-gray-100' : ''
                                            }`}
                                    >
                                        {/* Asset Info - Left */}
                                        <div className="flex items-center gap-3 pl-6 overflow-hidden">
                                            <TokenLogo
                                                symbol={asset.symbol}
                                                size={32}
                                                className="min-w-[32px] bg-gray-50 border border-gray-100 group-hover:border-gray-300 transition-colors"
                                            />
                                            <div className="flex flex-col truncate">
                                                <span className="text-[13px] font-black text-black leading-tight group-hover:text-gray-900 transition-colors truncate">{asset.symbol}</span>
                                                <span className="text-[9px] font-bold text-gray-400 leading-tight truncate">{asset.name}</span>
                                            </div>
                                        </div>

                                        {/* Categories Data - Middle (Desktop) */}
                                        <div className="hidden lg:flex items-center justify-center gap-8">
                                            {/* Overall */}
                                            <div className="flex flex-col items-center w-[75px]">
                                                <span className={`text-[12px] font-bold transition-colors ${asset.balance > 0 ? 'text-black group-hover:text-gray-900' : 'text-gray-300'}`}>
                                                    {asset.balance > 0
                                                        ? (asset.balance < 0.01 ? asset.balance.toFixed(8) : asset.balance.toFixed(4))
                                                        : "0.00"}
                                                </span>
                                                <span className="text-[9px] font-medium text-gray-300">
                                                    {asset.usdValue > 0 ? `$${asset.usdValue.toFixed(2)}` : "0.00 USD"}
                                                </span>
                                            </div>
                                            {/* Main */}
                                            <div className="flex flex-col items-center w-[75px]">
                                                <span className={`text-[12px] font-bold transition-colors text-gray-300`}>0.00</span>
                                                <span className="text-[9px] font-medium text-gray-300">0.00 USD</span>
                                            </div>
                                            {/* Trade */}
                                            <div className="flex flex-col items-center w-[75px]">
                                                <span className={`text-[12px] font-bold transition-colors text-gray-300`}>0.00</span>
                                                <span className="text-[9px] font-medium text-gray-300">0.00 USD</span>
                                            </div>
                                            {/* Collateral */}
                                            <div className="flex flex-col items-center w-[75px]">
                                                <span className={`text-[12px] font-bold transition-colors text-gray-300`}>0.00</span>
                                                <span className="text-[9px] font-medium text-gray-300">0.00 USD</span>
                                            </div>
                                        </div>

                                        {/* Mobile Overall Balance + Chevron (Right Side) */}
                                        <div className="flex lg:hidden items-center justify-end pr-6 gap-3">
                                            <div className="flex flex-col items-end">
                                                <span className={`text-[12px] font-bold transition-colors ${asset.balance > 0 ? 'text-black' : 'text-gray-300'}`}>
                                                    {asset.balance > 0
                                                        ? (asset.balance < 0.01 ? asset.balance.toFixed(8) : asset.balance.toFixed(4))
                                                        : "0.00"}
                                                </span>
                                                <span className="text-[9px] font-medium text-gray-300">
                                                    {asset.usdValue > 0 ? `$${asset.usdValue.toFixed(2)}` : "0.00 USD"}
                                                </span>
                                            </div>
                                            <div className="text-gray-400">
                                                {expandedAsset === asset.symbol ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                            </div>
                                        </div>

                                        {/* Action Buttons - Right (Desktop Only) */}
                                        <div className="hidden lg:flex items-center justify-end gap-2 pr-6">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openModal(asset.symbol, 'deposit');
                                                }}
                                                className="px-3 py-1.5 bg-white text-black border border-gray-200 rounded text-[9px] font-bold hover:bg-black hover:text-white hover:border-black transition-colors shadow-sm whitespace-nowrap"
                                            >
                                                Deposit
                                            </button>
                                            <Link
                                                href={`/trade?symbol=${asset.symbol}`}
                                                className="px-3 py-1.5 bg-white text-black border border-gray-200 rounded text-[9px] font-bold hover:bg-black hover:text-white hover:border-black transition-colors shadow-sm whitespace-nowrap text-center flex items-center justify-center"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                Trade
                                            </Link>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openModal(asset.symbol, 'withdraw');
                                                }}
                                                className="px-3 py-1.5 bg-white text-black border border-gray-200 rounded text-[9px] font-bold hover:bg-black hover:text-white hover:border-black transition-colors shadow-sm whitespace-nowrap"
                                            >
                                                Withdraw
                                            </button>
                                        </div>
                                    </div>

                                    {/* Mobile Expandable Section */}
                                    <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${expandedAsset === asset.symbol ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                                        <div className="bg-gray-50/50 p-4 border-b border-gray-100 space-y-4">
                                            <div className="grid grid-cols-3 gap-4 text-center">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-[10px] font-bold text-gray-400 mb-1">Main</span>
                                                    <span className="text-[11px] font-bold text-gray-300">0.00</span>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <span className="text-[10px] font-bold text-gray-400 mb-1">Trade</span>
                                                    <span className="text-[11px] font-bold text-gray-300">0.00</span>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <span className="text-[10px] font-bold text-gray-400 mb-1">Collateral</span>
                                                    <span className="text-[11px] font-bold text-gray-300">0.00</span>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        openModal(asset.symbol, 'deposit');
                                                    }}
                                                    className="w-full py-2 bg-black text-white rounded font-bold text-[10px] hover:bg-orange-500 transition-colors shadow-lg shadow-black/5 active:scale-95"
                                                >
                                                    Deposit
                                                </button>
                                                <Link
                                                    href={`/trade?symbol=${asset.symbol}`}
                                                    className="w-full py-2 bg-white text-black border border-gray-200 rounded font-bold text-[10px] hover:bg-black hover:text-white hover:border-black transition-colors shadow-sm active:scale-95 text-center flex items-center justify-center"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    Trade
                                                </Link>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        openModal(asset.symbol, 'withdraw');
                                                    }}
                                                    className="w-full py-2 bg-white text-black border border-gray-200 rounded font-bold text-[10px] hover:bg-black hover:text-white hover:border-black transition-colors shadow-sm active:scale-95"
                                                >
                                                    Withdraw
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </main >
    );
}
