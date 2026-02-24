"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Eye, ArrowDownCircle, ArrowUpCircle, ChevronRight, CircleHelp, FileText, ShieldAlert, Lock, CreditCard, Users2, Coins, HandCoins, BarChart3, Filter, ArrowRightLeft, LayoutGrid, TrendingUp, Zap, CandlestickChart, RefreshCw, CircleDollarSign, Percent, Trophy, Menu, X, Headset } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";

import { usePortfolio } from "@/context/PortfolioContext";

const NavIcon = () => (
    <svg
        className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M19 9l-7 7-7-7"
        />
    </svg>
);

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { isLoggedIn, logout } = useAuth();
    const { openModal } = useModal();
    const { portfolio } = usePortfolio();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Markets", href: "/markets" },
        { name: "Futures", href: "/futures" },
        { name: "Tools", href: "/tools" },
        { name: "Earn", href: "/earn" },
        { name: "Buy Crypto", href: "/buy-crypto" },
        { name: "Documentation", href: "/documentation" },
    ];

    const totalValue = portfolio?.totalUsdValue || 0;
    const formattedTotal = totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Use live BTC price from portfolio if available, otherwise fallback
    const btcAsset = portfolio?.assets.find(a => a.symbol === "BTC");
    const btcPrice = btcAsset?.price || 65000;
    const btcValue = (totalValue / btcPrice).toFixed(8);

    const assetDetails = [
        { name: "Spot", percent: totalValue > 0 ? "100%" : "0.0%", amount: `$${formattedTotal}` },
        { name: "Margin", percent: "0.0%", amount: "$0.00" },
        { name: "Futures", percent: "0.0%", amount: "$0.00" },
        { name: "Earn", percent: "0.0%", amount: "$0.00" },
    ];



    const historyItems = [
        { name: "All transactions", href: "/history/all" },
        { name: "Deposits", href: "/history/deposits" },
        { name: "Withdrawals", href: "/history/withdrawals" },
        { name: "Transfers", href: "/history/transfers" },
        { name: "Earnings", href: "/history/earnings" },
    ];

    const docItems = [
        {
            name: "User Agreement",
            desc: "The User Agreement defines the terms of service, user rights, and obligations of both parties.",
            icon: FileText,
            href: "/documentation/user-agreement"
        },
        {
            name: "AML Police",
            desc: "Police on combating money laundering, countering the financing of terrorism",
            icon: ShieldAlert,
            href: "/documentation/aml-policy"
        },
        {
            name: "Privacy Police",
            desc: "The Privacy Policy governs the information collection, use, processing, storage and disclosure practices of the platform.",
            icon: Lock,
            href: "/documentation/privacy-policy"
        }
    ];

    const buyItems = [
        {
            name: "Fiat Deposit",
            desc: "Buy crypto within seconds via Bank Transfer or Bank Card",
            icon: CreditCard,
            href: "/buy-crypto/fiat"
        },
        {
            name: "P2P Trading",
            desc: "Buy crypto using local payment methods",
            icon: Users2,
            href: "/buy-crypto/p2p"
        }
    ];

    const earnItems = [
        {
            name: "Staking",
            desc: "Easily stake your coins in PoS by voting and reap rewards",
            icon: Coins,
            href: "/earn/staking"
        },
        {
            name: "Crypto Lending",
            desc: "Earn passive income With digital currencies",
            icon: HandCoins,
            href: "/earn/lending"
        }
    ];

    const toolItems = [
        {
            name: "Market Cap",
            desc: "An indicator that reflects the total value of all coins of a certain cryptocurrency on the market.",
            icon: BarChart3,
            href: "/tools/market-cap"
        },
        {
            name: "Market Screener",
            desc: "A tool that allows you to filter and track different cryptocurrencies based on multiple criteria",
            icon: Filter,
            href: "/tools/screener"
        },
        {
            name: "Cross Rates",
            desc: "Exchanges rates between two currencies expressed through a third currency",
            icon: ArrowRightLeft,
            href: "/tools/cross-rates"
        },
        {
            name: "Currency Heat map",
            desc: "A visual tool that displays price changes of different cryptocurrencies against each other in the form of a colored map",
            icon: LayoutGrid,
            href: "/tools/heatmap"
        },
        {
            name: "Technical Analysis",
            desc: "A method for predicting future price movements of cryptocurrencies based on analysis of past market data",
            icon: TrendingUp,
            href: "/tools/technical-analysis"
        }
    ];

    const futureItems = [
        {
            name: "USDT Perpetuals",
            desc: "Trade perpetual contracts, settled in USDT",
            icon: Zap,
            href: "/futures/usdt-perpetuals"
        }
    ];

    const marketItems = [
        {
            name: "Markets",
            desc: "View the latest crypto prices and volume",
            icon: CandlestickChart,
            href: "/markets"
        },
        {
            name: "Swap",
            desc: "Quick conversion, zero trading fees, no slippage",
            icon: RefreshCw,
            href: "/swap"
        },
        {
            name: "Spot",
            desc: "Buy and sell crypto within seconds via ease",
            icon: CircleDollarSign,
            href: "/trading/spot"
        },
        {
            name: "Margin",
            desc: "Trade with leverage",
            icon: Percent,
            href: "/trading/margin"
        },
        {
            name: "Tournament",
            desc: "Increase your trading volume with our Trading Tournament.",
            icon: Trophy,
            href: "/tournament"
        }
    ];

    if (pathname === "/signup" || pathname === "/login") return null;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 ${scrolled ? "py-2 bg-black/80 backdrop-blur-md border-b border-white/10" : "py-2.5 bg-black"
                }`}
        >
            <div className="max-w-[1440px] mx-auto flex items-center justify-between">
                {/* Left Side: Logo and Links */}
                <div className="flex items-center gap-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-7 h-7 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300">
                            <span className="text-black font-black text-base">A</span>
                        </div>
                        <span className="text-white font-extrabold text-lg tracking-tighter">
                            Arbit<span className="text-orange-500 text-xl leading-none">.</span>
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden lg:flex items-center gap-6">
                        {navLinks.filter(link => !["Documentation", "Buy Crypto", "Earn", "Tools", "Futures", "Markets"].includes(link.name)).map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="group flex items-center gap-1 text-white hover:text-orange-500 transition-colors text-[12px] font-bold"
                            >
                                {link.name}
                                <NavIcon />
                            </Link>
                        ))}

                        {/* Markets with Dropdown */}
                        <div className="relative group/markets py-4 -my-4">
                            <Link
                                href="/markets"
                                className="flex items-center gap-1 text-white group-hover/markets:text-orange-500 transition-colors text-[12px] font-bold"
                            >
                                Markets
                                <NavIcon />
                            </Link>

                            {/* Hover Dropdown */}
                            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover/markets:opacity-100 group-hover/markets:visible transition-all duration-300 translate-y-2 group-hover/markets:translate-y-0 z-[60]">
                                <div className="w-80 bg-black border border-white/10 rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                                    <div className="p-1.5 space-y-0.5">
                                        {marketItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="flex items-start gap-3 px-3 py-3 rounded-sm hover:bg-white/5 transition-colors group/item"
                                            >
                                                <div className="w-8 h-8 min-w-[32px] rounded-sm bg-white/5 flex items-center justify-center text-gray-400 group-hover/item:text-orange-500 transition-colors">
                                                    <item.icon size={16} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[12px] font-black text-white transition-colors">
                                                        {item.name}
                                                    </span>
                                                    <p className="text-[10px] font-bold text-gray-500 leading-tight mt-0.5">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Futures with Dropdown */}
                        <div className="relative group/futures py-4 -my-4">
                            <Link
                                href="/futures"
                                className="flex items-center gap-1 text-white group-hover/futures:text-orange-500 transition-colors text-[12px] font-bold"
                            >
                                Futures
                                <NavIcon />
                            </Link>

                            {/* Hover Dropdown */}
                            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover/futures:opacity-100 group-hover/futures:visible transition-all duration-300 translate-y-2 group-hover/futures:translate-y-0 z-[60]">
                                <div className="w-80 bg-black border border-white/10 rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                                    <div className="p-1.5 space-y-0.5">
                                        {futureItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="flex items-start gap-3 px-3 py-3 rounded-sm hover:bg-white/5 transition-colors group/item"
                                            >
                                                <div className="w-8 h-8 min-w-[32px] rounded-sm bg-white/5 flex items-center justify-center text-gray-400 group-hover/item:text-orange-500 transition-colors">
                                                    <item.icon size={16} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[12px] font-black text-white transition-colors">
                                                        {item.name}
                                                    </span>
                                                    <p className="text-[10px] font-bold text-gray-500 leading-tight mt-0.5">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tools with Dropdown */}
                        <div className="relative group/tools py-4 -my-4">
                            <Link
                                href="/tools"
                                className="flex items-center gap-1 text-white group-hover/tools:text-orange-500 transition-colors text-[12px] font-bold"
                            >
                                Tools
                                <NavIcon />
                            </Link>

                            {/* Hover Dropdown */}
                            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover/tools:opacity-100 group-hover/tools:visible transition-all duration-300 translate-y-2 group-hover/tools:translate-y-0 z-[60]">
                                <div className="w-80 bg-black border border-white/10 rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                                    <div className="p-1.5 space-y-0.5">
                                        {toolItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="flex items-start gap-3 px-3 py-3 rounded-sm hover:bg-white/5 transition-colors group/item"
                                            >
                                                <div className="w-8 h-8 min-w-[32px] rounded-sm bg-white/5 flex items-center justify-center text-gray-400 group-hover/item:text-orange-500 transition-colors">
                                                    <item.icon size={16} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[12px] font-black text-white transition-colors">
                                                        {item.name}
                                                    </span>
                                                    <p className="text-[10px] font-bold text-gray-500 leading-tight mt-0.5">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Earn with Dropdown */}
                        <div className="relative group/earn py-4 -my-4">
                            <Link
                                href="/earn"
                                className="flex items-center gap-1 text-white group-hover/earn:text-orange-500 transition-colors text-[12px] font-bold"
                            >
                                Earn
                                <NavIcon />
                            </Link>

                            {/* Hover Dropdown */}
                            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover/earn:opacity-100 group-hover/earn:visible transition-all duration-300 translate-y-2 group-hover/earn:translate-y-0 z-[60]">
                                <div className="w-80 bg-black border border-white/10 rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                                    <div className="p-1.5 space-y-0.5">
                                        {earnItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="flex items-start gap-3 px-3 py-3 rounded-sm hover:bg-white/5 transition-colors group/item"
                                            >
                                                <div className="w-8 h-8 min-w-[32px] rounded-sm bg-white/5 flex items-center justify-center text-gray-400 group-hover/item:text-orange-500 transition-colors">
                                                    <item.icon size={16} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[12px] font-black text-white transition-colors">
                                                        {item.name}
                                                    </span>
                                                    <p className="text-[10px] font-bold text-gray-500 leading-tight mt-0.5">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Buy Crypto with Dropdown */}
                        <div className="relative group/buy py-4 -my-4">
                            <Link
                                href="/buy-crypto"
                                className="flex items-center gap-1 text-white group-hover/buy:text-orange-500 transition-colors text-[12px] font-bold"
                            >
                                Buy Crypto
                                <NavIcon />
                            </Link>

                            {/* Hover Dropdown */}
                            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover/buy:opacity-100 group-hover/buy:visible transition-all duration-300 translate-y-2 group-hover/buy:translate-y-0 z-[60]">
                                <div className="w-80 bg-black border border-white/10 rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                                    <div className="p-1.5 space-y-0.5">
                                        {buyItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="flex items-start gap-3 px-3 py-3 rounded-sm hover:bg-white/5 transition-colors group/item"
                                            >
                                                <div className="w-8 h-8 min-w-[32px] rounded-sm bg-white/5 flex items-center justify-center text-gray-400 group-hover/item:text-orange-500 transition-colors">
                                                    <item.icon size={16} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[12px] font-black text-white transition-colors">
                                                        {item.name}
                                                    </span>
                                                    <p className="text-[10px] font-bold text-gray-500 leading-tight mt-0.5">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Documentation with Dropdown */}
                        <div className="relative group/doc py-4 -my-4">
                            <Link
                                href="/documentation"
                                className="flex items-center gap-1 text-white group-hover/doc:text-orange-500 transition-colors text-[12px] font-bold"
                            >
                                Documentation
                                <NavIcon />
                            </Link>

                            {/* Hover Dropdown */}
                            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover/doc:opacity-100 group-hover/doc:visible transition-all duration-300 translate-y-2 group-hover/doc:translate-y-0 z-[60]">
                                <div className="w-80 bg-black border border-white/10 rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                                    <div className="p-1.5 space-y-0.5">
                                        {docItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="flex items-start gap-3 px-3 py-3 rounded-sm hover:bg-white/5 transition-colors group/item"
                                            >
                                                <div className="w-8 h-8 min-w-[32px] rounded-sm bg-white/5 flex items-center justify-center text-gray-400 group-hover/item:text-orange-500 transition-colors">
                                                    <item.icon size={16} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[12px] font-black text-white transition-colors">
                                                        {item.name}
                                                    </span>
                                                    <p className="text-[10px] font-bold text-gray-500 leading-tight mt-0.5">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Our Card with Dropdown */}
                        <div className="relative group/card py-4 -my-4">
                            <Link
                                href="/card"
                                className="flex items-center gap-1.5 px-3 py-1 bg-white/5 group-hover/card:bg-orange-500/10 group-hover/card:text-orange-500 rounded-full text-white transition-all text-[11px] font-black border border-white/10 group-hover/card:border-orange-500/20"
                            >
                                <div className="flex items-center gap-1">
                                    <span>🔥</span>
                                    <span>Our Card</span>
                                </div>
                                <NavIcon />
                            </Link>

                            {/* Hover Dropdown */}
                            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover/card:opacity-100 group-hover/card:visible transition-all duration-300 translate-y-2 group-hover/card:translate-y-0 z-[60]">
                                <div className="w-56 bg-black border border-white/10 rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                                    <div className="p-1.5">
                                        <Link
                                            href="/card/overview"
                                            className="flex items-center gap-3 px-3 py-3 rounded-sm hover:bg-white/5 transition-colors group/item"
                                        >
                                            <div className="w-8 h-8 rounded-sm bg-white/5 flex items-center justify-center text-gray-400 group-hover/item:text-orange-500 transition-colors">
                                                <CircleHelp size={16} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[12px] font-black text-white transition-colors">
                                                    Overview
                                                </span>
                                                <span className="text-[10px] font-bold text-gray-500 leading-tight">
                                                    Learn more about our payment card
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Auth/User and Lang */}
                <div className="flex items-center gap-6">
                    {/* Support Link */}
                    <Link
                        href="/support"
                        className="flex items-center gap-1.5 text-white/70 hover:text-orange-500 transition-colors text-[12px] font-bold"
                    >
                        <Headset size={16} />
                        <span className="hidden sm:inline">Support</span>
                    </Link>

                    {!isLoggedIn ? (
                        <div className="flex items-center gap-3">
                            <Link
                                href="/login"
                                className="px-4 py-1.5 border border-white/20 rounded-lg text-white hover:text-orange-500 hover:border-orange-500/50 transition-all text-[12px] font-bold bg-black shadow-sm"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="bg-orange-500 text-white px-4 py-1.5 rounded-lg font-black text-[11px] hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-500/20 active:scale-95"
                            >
                                Sign up
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => openModal()}
                                className="hidden lg:block bg-orange-500 text-white px-4 py-1.5 rounded-md font-black text-[11px] hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-500/20 active:scale-95"
                            >
                                Deposit
                            </button>

                            {/* Assets with Dropdown */}
                            <div className="relative group/assets py-4 -my-4">
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-1 text-white group-hover/assets:text-orange-500 transition-colors text-[12px] font-bold"
                                >
                                    Assets
                                    <NavIcon />
                                </Link>

                                {/* Hover Dropdown */}
                                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover/assets:opacity-100 group-hover/assets:visible transition-all duration-300 translate-y-2 group-hover/assets:translate-y-0 z-[60]">
                                    <div className="w-72 bg-black border border-white/10 rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                                        {/* Header */}
                                        <div className="p-4 border-b border-white/5">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-[14px] font-black text-white">Assets Overview</span>
                                                <button className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors group/hide">
                                                    <span className="text-[11px] font-bold">hide</span>
                                                    <Eye size={14} className="group-hover/hide:text-orange-500 transition-colors" />
                                                </button>
                                            </div>

                                            <div className="mb-1">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-2xl font-black text-white">{formattedTotal}</span>
                                                    <span className="text-[13px] font-bold text-gray-400">USD</span>
                                                </div>
                                                <div className="text-[12px] font-bold text-gray-500 mt-0.5">≈ {btcValue} BTC</div>
                                            </div>
                                            <p className="text-[10px] font-medium text-gray-600 tracking-tight">*Data may be delayed.</p>
                                        </div>

                                        {/* Actions */}
                                        <div className="px-4 py-3 grid grid-cols-2 gap-3 bg-white/[0.02]">
                                            <button
                                                onClick={() => openModal()}
                                                className="flex items-center justify-center gap-2 py-2 bg-white text-black rounded-sm font-black text-[11px] hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm shadow-white/5 active:scale-95"
                                            >
                                                <ArrowDownCircle size={14} />
                                                Deposit
                                            </button>
                                            <button className="flex items-center justify-center gap-2 py-2 bg-white/10 text-white rounded-sm font-black text-[11px] hover:bg-white hover:text-black transition-all duration-300 border border-white/5 shadow-sm active:scale-95">
                                                <ArrowUpCircle size={14} />
                                                Withdraw
                                            </button>
                                        </div>

                                        {/* Asset Breakdown */}
                                        <div className="p-2 space-y-1">
                                            {assetDetails.map((detail) => (
                                                <div
                                                    key={detail.name}
                                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group/item"
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="text-[12px] font-black text-white group-hover/item:text-orange-500 transition-colors">{detail.name}</span>
                                                        <span className="text-[10px] font-bold text-gray-500">{detail.percent}</span>
                                                    </div>
                                                    <span className="text-[12px] font-bold text-white tracking-tight">{detail.amount}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* History with Dropdown */}
                            <div className="relative group/history py-4 -my-4">
                                <Link
                                    href="/history"
                                    className="flex items-center gap-1 text-white group-hover/history:text-orange-500 transition-colors text-[12px] font-bold"
                                >
                                    History
                                    <NavIcon />
                                </Link>

                                {/* Hover Dropdown */}
                                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover/history:opacity-100 group-hover/history:visible transition-all duration-300 translate-y-2 group-hover/history:translate-y-0 z-[60]">
                                    <div className="w-56 bg-black border border-white/10 rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                                        <div className="p-1.5 space-y-0.5">
                                            {historyItems.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className="flex items-center justify-between px-3 py-2.5 rounded-sm hover:bg-white/5 transition-colors group/item"
                                                >
                                                    <span className="text-[11px] font-black text-white group-hover/item:text-orange-500 transition-colors">
                                                        {item.name}
                                                    </span>
                                                    <ChevronRight size={12} className="text-gray-600 group-hover/item:text-orange-500 transition-colors translate-x-0 group-hover/item:translate-x-0.5" />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative group/user py-4 -my-4 hidden lg:block">
                                <Link href="/dashboard" className="text-white hover:text-orange-500 transition-colors flex items-center">
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </Link>

                                {/* User Dropdown */}
                                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover/user:opacity-100 group-hover/user:visible transition-all duration-300 translate-y-2 group-hover/user:translate-y-0 z-[60]">
                                    <div className="w-40 bg-black border border-white/10 rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden p-1.5">
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center px-3 py-2 rounded-sm hover:bg-white/5 transition-colors text-[11px] font-black text-white"
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="w-full text-left flex items-center px-3 py-2 rounded-sm hover:bg-white/5 transition-colors text-[11px] font-black text-red-500"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <button className="group flex items-center gap-1 text-white hover:text-orange-500 transition-colors text-[12px] font-black ml-1">
                        EN
                        <NavIcon />
                    </button>
                    {isLoggedIn && (
                        <button
                            className="lg:hidden text-white ml-2 hover:text-orange-500 transition-colors"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl lg:hidden">
                    <div className="flex flex-col h-full p-6">
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-white font-extrabold text-2xl tracking-tighter">
                                Arbit<span className="text-orange-500 text-xl leading-none">.</span>
                            </span>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-6">
                            {/* Main Navigation */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Menu</h3>
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-between text-lg font-bold text-white hover:text-orange-500 transition-colors"
                                    >
                                        {link.name}
                                        <ChevronRight size={16} className="text-gray-700" />
                                    </Link>
                                ))}
                            </div>

                            {/* User Actions if Logged In */}
                            {isLoggedIn && (
                                <div className="space-y-4 pt-6 border-t border-white/10">
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Account</h3>
                                    <div className="flex flex-col gap-3">
                                        <button
                                            onClick={() => {
                                                openModal();
                                                setMobileMenuOpen(false);
                                            }}
                                            className="w-full py-3 bg-orange-500 text-white rounded-lg font-black text-sm hover:bg-orange-600 transition-all text-center"
                                        >
                                            Deposit
                                        </button>
                                        <Link
                                            href="/dashboard"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="w-full py-3 bg-white/5 text-white rounded-lg font-bold text-sm hover:bg-white/10 transition-all text-center border border-white/10"
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setMobileMenuOpen(false);
                                            }}
                                            className="w-full py-3 text-red-500 font-bold text-sm hover:bg-red-500/10 rounded-lg transition-all text-center"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
