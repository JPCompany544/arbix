"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp, TrendingDown, Shield, Zap, Award, Apple, Smartphone, Download, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import TokenLogo from "@/components/TokenLogo";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("popular");
  const [expandedCoin, setExpandedCoin] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollRef.current || isHovering.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;

      if (scrollLeft >= maxScroll - 5) {
        // Reset to start
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Scroll by one card width (approx)
        scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

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
      <section className="relative pt-64 pb-48 px-6 md:px-12 lg:px-24 overflow-hidden">
        {/* SVG Background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url("/layered-steps-haikei (right).svg")',
            backgroundSize: 'cover',
            backgroundPosition: '100% 50%',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>

        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="max-w-2xl lg:ml-12">
            <h1 className="text-4xl md:text-5xl font-black text-black mb-8 leading-tight tracking-tight">
              Gateway to Digital Asset,<br />
              Highway to Wealth
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-medium mb-12 max-w-xl">
              Buy, sell, trade, and hold cryptocurrencies on <span className="font-extrabold text-orange-600 tracking-tight">CRYPTOZEP</span>
            </p>

            <div className="flex flex-col items-start gap-8">
              <div className="flex items-center gap-4 bg-gray-50/50 backdrop-blur-sm border border-gray-200 py-3.5 px-6 rounded-2xl">
                <span className="text-2xl">🎁</span>
                <div>
                  <p className="text-[13px] font-bold text-gray-900 leading-none">Exclusive New Users Reward</p>
                  <p className="text-[11px] font-bold text-orange-600 mt-1.5 uppercase tracking-widest">is Waiting for You!</p>
                </div>
              </div>

              <Link
                href="/signup"
                className="group flex items-center justify-center gap-4 bg-black text-white px-12 py-4.5 rounded-2xl font-black text-[14px] hover:bg-gray-900 transition-all shadow-xl shadow-black/10 active:scale-95"
              >
                Claim Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Card Carousel Section */}
      <section className="py-20 px-6 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <div
            ref={scrollRef}
            onMouseEnter={() => isHovering.current = true}
            onMouseLeave={() => isHovering.current = false}
            className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide lg:px-12 scroll-smooth"
          >
            {[1, 2, 3, 4, 5].map((card) => (
              <div
                key={card}
                className="min-w-[280px] md:min-w-[320px] snap-start bg-[#0A0A0A] border border-amber-900/30 rounded-2xl p-6 text-white transition-all hover:border-amber-500/50 hover:bg-[#111] group relative flex flex-col justify-between h-[200px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform">
                      <Award className="w-5 h-5 text-amber-500" />
                    </div>
                    <span className="text-[10px] font-bold text-amber-500/60 uppercase tracking-widest">Featured</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">Elite Trading <br />Program {card}</h3>
                  <p className="text-[11px] text-gray-500 font-medium">
                    Institutional-grade benefits for high-volume traders.
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[10px] font-black text-amber-500 uppercase">Pro Access</span>
                  <button className="text-[11px] font-bold text-white hover:text-amber-400 transition-colors flex items-center gap-1">
                    Details <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-[1440px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-black text-black mb-4">
              Crypto Markets
            </h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto text-sm md:text-base">
              Real-time prices of the most popular assets. Trade with deep liquidity and tight spreads.
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50">
            {/* Category Header Bar - Acts as Table Heading */}
            <div className="flex items-center bg-gray-50 border-b border-gray-100 overflow-x-auto scrollbar-hide">
              {[
                { key: "popular", label: "Popular" },
                { key: "new", label: "New Listing" },
                { key: "gainers", label: "Gainers" },
                { key: "losers", label: "Losers" }
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`flex-1 min-w-[100px] py-4 px-2 font-bold text-[10px] uppercase tracking-wider transition-all border-r border-gray-100 last:border-r-0 ${activeCategory === cat.key
                    ? "bg-white text-black border-b-2 border-b-black"
                    : "bg-gray-50/50 text-gray-400 hover:text-black hover:bg-gray-50"
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Market Data Display */}
            <div className="hidden md:block overflow-x-auto">
              {/* Desktop Table */}
              <table className="w-full">
                <thead className="bg-white">
                  <tr>
                    <th className="px-8 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Name</th>
                    <th className="px-8 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Last Price</th>
                    <th className="px-8 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">24H Change</th>
                    <th className="px-8 py-5 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {marketData[activeCategory as keyof typeof marketData].map((coin) => (
                    <tr key={coin.symbol} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <TokenLogo symbol={coin.symbol} size={28} />
                          <div>
                            <div className="font-bold text-sm text-black">{coin.pair}</div>
                            <div className="text-[11px] text-gray-400 font-semibold">{coin.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 font-bold text-black">${coin.price.toLocaleString()}</td>
                      <td className="px-8 py-5">
                        <span className={`inline-flex items-center gap-1 font-bold text-sm ${coin.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {coin.change >= 0 ? "+" : ""}{coin.change}%
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right font-bold text-gray-500">
                        <Link href={`/trade?symbol=${coin.symbol}`} className="bg-black text-white px-8 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-wider hover:bg-gray-800 transition-colors inline-block">
                          Trade
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile List View */}
            <div className="md:hidden">
              {/* Mobile Header Labels */}
              <div className="flex items-center px-5 py-3 bg-gray-50/50 border-b border-gray-50 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                <span className="flex-1 text-left">Asset</span>
                <span className="w-24 text-right">Price</span>
                <span className="w-20 text-right pr-6">Change</span>
              </div>

              <div className="divide-y divide-gray-50">
                {marketData[activeCategory as keyof typeof marketData].map((coin) => (
                  <div key={coin.symbol} className="flex flex-col">
                    {/* Row Summary */}
                    <button
                      onClick={() => setExpandedCoin(expandedCoin === coin.symbol ? null : coin.symbol)}
                      className="flex items-center p-5 hover:bg-gray-50 transition-colors active:bg-gray-100"
                    >
                      <div className="flex-1 flex items-center gap-3">
                        <TokenLogo symbol={coin.symbol} size={28} />
                        <div className="text-left">
                          <div className="font-bold text-[13px] text-black leading-none mb-1">{coin.symbol}</div>
                          <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-tight">USDT</div>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="w-24 text-right">
                          <div className="font-bold text-[13px] text-black">${coin.price < 1 ? coin.price.toFixed(4) : coin.price.toLocaleString()}</div>
                        </div>
                        <div className="w-20 text-right pr-6">
                          <div className={`font-bold text-[12px] ${coin.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {coin.change >= 0 ? "+" : ""}{coin.change}%
                          </div>
                        </div>
                        <div className="absolute right-4 text-gray-300">
                          {expandedCoin === coin.symbol ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    </button>

                    {/* Expanded Actions Dropdown */}
                    {expandedCoin === coin.symbol && (
                      <div className="px-5 pb-6 pt-2 bg-gray-50/40 border-t border-gray-50 animate-in slide-in-from-top-1 duration-200">
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="bg-white/80 p-3 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter mb-1 text-center">24h High</p>
                            <p className="text-[12px] font-bold text-black text-center">${(coin.price * 1.05).toLocaleString()}</p>
                          </div>
                          <div className="bg-white/80 p-3 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter mb-1 text-center">24h Low</p>
                            <p className="text-[12px] font-bold text-black text-center">${(coin.price * 0.95).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/trade?symbol=${coin.symbol}`}
                            className="flex-1 bg-black text-white py-3.5 rounded-xl font-bold text-[12px] uppercase tracking-widest text-center shadow-lg active:scale-[0.98] transition-all"
                          >
                            Trade
                          </Link>
                          <Link
                            href={`/trade?symbol=${coin.symbol}`}
                            className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-black hover:bg-gray-50 transition-colors shadow-sm"
                          >
                            <TrendingUp className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 text-center bg-gray-50/50">
              <Link href="/markets" className="text-black font-black text-[12px] uppercase tracking-widest hover:text-orange-600 transition-colors inline-flex items-center gap-2 group">
                View All Markets
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
              <div key={idx} className="group bg-white border border-gray-100 rounded-2xl p-8 hover:border-black transition-all hover:shadow-xl relative overflow-hidden">
                <div className={`mb-6 w-14 h-14 rounded-xl flex items-center justify-center text-3xl bg-gray-50 group-hover:scale-110 transition-transform`}>
                  {product.icon}
                </div>
                <h3 className="text-xl font-black text-black mb-3">{product.title}</h3>
                <p className="text-gray-500 text-sm font-medium mb-8 leading-relaxed">{product.desc}</p>
                <button className={`flex items-center gap-2 text-sm font-black text-black group-hover:translate-x-2 transition-transform`}>
                  Start Now <ArrowRight className="w-4 h-4" />
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
              <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-8 hover:border-black transition-all group">
                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-black transition-colors">
                  <adv.icon className="w-6 h-6 text-black group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-black text-black mb-4">{adv.title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{adv.desc}</p>
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
              <a key={idx} href={dl.link} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-3 text-sm">
                <dl.icon className="w-5 h-5" />
                {dl.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-black mb-16">
            Start your journey to digital assets now
          </h2>

          <div className="grid md:grid-cols-3 gap-12 mb-20 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Create Account", desc: "Sign up in seconds" },
              { step: "2", title: "Deposit", desc: "Fund your account" },
              { step: "3", title: "Trade", desc: "Start trading crypto" }
            ].map((item) => (
              <div key={item.step} className="relative group">
                <div className="text-7xl font-black text-gray-50 mb-4 group-hover:text-gray-100 transition-colors">{item.step}</div>
                <h3 className="text-xl font-black text-black mb-2 relative z-10">{item.title}</h3>
                <p className="text-gray-400 font-medium text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 flex-wrap">
            <Link href="/signup" className="bg-black text-white px-12 py-4 rounded-2xl font-black text-[15px] hover:bg-gray-900 transition-all shadow-xl shadow-black/10 active:scale-95">
              Get Started
            </Link>
            <Link href="/login" className="bg-white text-black border-2 border-black px-12 py-4 rounded-2xl font-black text-[15px] hover:bg-gray-50 transition-all active:scale-95">
              Log in
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
