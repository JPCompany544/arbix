"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp, TrendingDown, Shield, Zap, Award, Apple, Smartphone, Download } from "lucide-react";
import { useState, useEffect } from "react";
import TokenLogo from "@/components/TokenLogo";
import Image from "next/image";

export default function HomePage() {
    const [activeCategory, setActiveCategory] = useState("popular");

    const marketData = {
        popular: [
            { symbol: "BTC", pair: "BTC/USDT", price: 69696.98, change: 1.58 },
            { symbol: "ETH", pair: "ETH/USDT", price: 2080.69, change: 2.54 },
            { symbol: "BNB", pair: "BNB/USDT", price: 631.61, change: 3.96 },
            { symbol: "SOL", pair: "SOL/USDT", price: 97.3495, change: 4.88 },
        ],
        new: [
            { symbol: "XRP", pair: "XRP/USDT", price: 1.4717, change: 4.07 },
            { symbol: "DOGE", pair: "DOGE/USDT", price: 0.10502, change: 8.11 },
            { symbol: "TON", pair: "TON/USDT", price: 1.498, change: 3.17 },
            { symbol: "TRX", pair: "TRX/USDT", price: 0.2832, change: 1.79 },
        ],
        gainers: [
            { symbol: "DOGE", pair: "DOGE/USDT", price: 0.10502, change: 8.11 },
            { symbol: "SOL", pair: "SOL/USDT", price: 97.3495, change: 4.88 },
            { symbol: "XRP", pair: "XRP/USDT", price: 1.4717, change: 4.07 },
            { symbol: "BNB", pair: "BNB/USDT", price: 631.61, change: 3.96 },
        ],
        losers: [
            { symbol: "BTC", pair: "BTC/USDT", price: 69696.98, change: -1.58 },
            { symbol: "ETH", pair: "ETH/USDT", price: 2080.69, change: -2.54 },
            { symbol: "TRX", pair: "TRX/USDT", price: 0.2832, change: -1.79 },
            { symbol: "TON", pair: "TON/USDT", price: 1.498, change: -3.17 },
        ]
    };

    const products = [
        {
            title: "Spot",
            desc: "Ultra-low trading fees, 800+ cryptocurrencies",
            icon: "📊",
            gradient: "from-orange-500 to-red-500"
        },
        {
            title: "Futures",
            desc: "Up to 125x leverage, USDT/COIN-M products available",
            icon: "⚡",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            title: "Savings",
            desc: "Earn great rewards from your crypto holdings",
            icon: "💰",
            gradient: "from-blue-500 to-cyan-500"
        }
    ];

    const advantages = [
        {
            title: "Diversified trading options",
            desc: "A wide range of trading products can help you explore and play with cryptocurrencies, including spot, leverage, futures, ETF, index, and other trading varieties.",
            icon: Zap
        },
        {
            title: "Top security risk control system",
            desc: "Industry-leading security technology and 24/7 platform monitoring ensure that your assets are protected in all aspects.",
            icon: Shield
        },
        {
            title: "Top-class experience",
            desc: "With low barriers to entry, we offer you all-in-one investment services in derivatives and finance based on spot trading.",
            icon: Award
        }
    ];

    const downloads = [
        { name: "App Store", icon: Apple, link: "#" },
        { name: "Google Play", icon: Smartphone, link: "#" },
        { name: "Android APK", icon: Download, link: "#" },
        { name: "MacOS", icon: Apple, link: "#" },
        { name: "Windows", icon: Download, link: "#" }
    ];

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-black via-gray-900 to-orange-950 pt-32 pb-20 px-6 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="max-w-[1440px] mx-auto relative z-10">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                            Gateway to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Digital Asset</span>,<br />
                            Highway to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Wealth</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 font-medium mb-8">
                            Buy, sell, trade, and hold cryptocurrencies on <span className="font-black text-orange-500">CRYPTOZEP</span>
                        </p>
                        <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 p-1 rounded-2xl shadow-2xl shadow-orange-500/50 animate-in zoom-in duration-500">
                            <div className="bg-black px-8 py-6 rounded-xl">
                                <p className="text-2xl font-black text-white mb-2">🎁 Exclusive New Users Reward</p>
                                <p className="text-orange-400 font-bold">is Waiting for You!</p>
                                <Link href="/signup" className="inline-block mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-black text-lg hover:scale-105 transition-transform shadow-lg">
                                    Claim Now <ArrowRight className="inline w-5 h-5 ml-2" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Card Carousel Section */}
            <section className="py-16 px-6 bg-gray-50">
                <div className="max-w-[1440px] mx-auto">
                    <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                        {[1, 2, 3, 4].map((card) => (
                            <div key={card} className="min-w-[320px] md:min-w-[400px] snap-start bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 text-white shadow-xl hover:scale-105 transition-transform">
                                <div className="text-6xl mb-4">🚀</div>
                                <h3 className="text-2xl font-black mb-3">Trading Promotion {card}</h3>
                                <p className="text-orange-100 font-medium mb-6">
                                    Get exclusive benefits and bonuses for active trading
                                </p>
                                <button className="bg-white text-orange-600 px-6 py-2 rounded-xl font-bold hover:bg-orange-50 transition-colors">
                                    Learn More
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Markets Section */}
            <section className="py-20 px-6">
                <div className="max-w-[1440px] mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black text-black mb-12 text-center">
                        Crypto Markets
                    </h2>

                    {/* Category Tabs */}
                    <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
                        {[
                            { key: "popular", label: "Popular coins", icon: "🔥" },
                            { key: "new", label: "New coins", icon: "✨" },
                            { key: "gainers", label: "Showing growth", icon: "📈" },
                            { key: "losers", label: "Showing decline", icon: "📉" }
                        ].map((cat) => (
                            <button
                                key={cat.key}
                                onClick={() => setActiveCategory(cat.key)}
                                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeCategory === cat.key
                                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                <span className="mr-2">{cat.icon}</span>
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Market Table */}
                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Last Price</th>
                                        <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">24H Change</th>
                                        <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-wider">Operation</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {marketData[activeCategory as keyof typeof marketData].map((coin) => (
                                        <tr key={coin.symbol} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <TokenLogo symbol={coin.symbol} size={32} />
                                                    <div>
                                                        <div className="font-black text-sm text-black">{coin.pair}</div>
                                                        <div className="text-xs text-gray-400 font-bold">{coin.symbol}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-black text-black">${coin.price.toLocaleString()}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1 font-bold ${coin.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                    {coin.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                                    {Math.abs(coin.change)}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link href={`/trade?symbol=${coin.symbol}`} className="bg-orange-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600 transition-colors inline-block">
                                                    Trade
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="border-t border-gray-200 p-6 text-center">
                            <Link href="/markets" className="text-orange-500 font-black hover:underline inline-flex items-center">
                                View more <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-[1440px] mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black text-black mb-4 text-center">
                        Explore our products
                    </h2>
                    <p className="text-center text-gray-600 font-medium text-lg mb-12">
                        Ultra-low trading fees, 800+ cryptocurrencies
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {products.map((product, idx) => (
                            <div key={idx} className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                                <div className={`text-7xl mb-6 group-hover:scale-110 transition-transform`}>
                                    {product.icon}
                                </div>
                                <h3 className="text-3xl font-black text-black mb-3">{product.title}</h3>
                                <p className="text-gray-600 font-medium mb-6">{product.desc}</p>
                                <button className={`bg-gradient-to-r ${product.gradient} text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform`}>
                                    Start Trading
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Advantages Section */}
            <section className="py-20 px-6">
                <div className="max-w-[1440px] mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black text-black mb-4 text-center">
                        Our advantages
                    </h2>
                    <p className="text-center text-gray-600 font-bold text-xl mb-4 max-w-3xl mx-auto">
                        Top-class experience in digital assets investment
                    </p>
                    <p className="text-center text-gray-500 font-medium mb-16 max-w-3xl mx-auto">
                        With low barriers to entry, we will offer you all-in-one investment services in derivatives and finance based on spot trading.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {advantages.map((adv, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:border-orange-500 transition-all hover:shadow-xl">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                                    <adv.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-black mb-4">{adv.title}</h3>
                                <p className="text-gray-600 font-medium leading-relaxed">{adv.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Download Section */}
            <section className="py-20 px-6 bg-gradient-to-br from-black to-gray-900">
                <div className="max-w-[1440px] mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Trade Anywhere, Anytime
                    </h2>
                    <p className="text-gray-400 font-medium text-lg mb-12">
                        Download our app and start trading on the go
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {downloads.map((dl, idx) => (
                            <a key={idx} href={dl.link} className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 flex items-center gap-3">
                                <dl.icon className="w-6 h-6" />
                                {dl.name}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-gradient-to-r from-orange-500 to-red-600">
                <div className="max-w-[1440px] mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-12">
                        Start your journey to digital assets now
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {[
                            { step: "1", title: "Create Account", desc: "Sign up in seconds" },
                            { step: "2", title: "Deposit", desc: "Fund your account" },
                            { step: "3", title: "Trade", desc: "Start trading crypto" }
                        ].map((item) => (
                            <div key={item.step} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                                <div className="text-6xl font-black text-white/40 mb-4">{item.step}</div>
                                <h3 className="text-2xl font-black text-white mb-2">{item.title}</h3>
                                <p className="text-orange-100 font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <Link href="/signup" className="bg-white text-orange-600 px-10 py-4 rounded-xl font-black text-lg hover:scale-105 transition-transform shadow-2xl">
                            Sign up
                        </Link>
                        <Link href="/login" className="bg-black text-white px-10 py-4 rounded-xl font-black text-lg hover:scale-105 transition-transform shadow-2xl">
                            Log in
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
