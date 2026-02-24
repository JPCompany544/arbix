"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp, TrendingDown, Shield, Zap, Award, Apple, Smartphone, Download, ChevronDown, ChevronUp, HandCoins, Trophy, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import TokenLogo from "@/components/TokenLogo";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { isLoggedIn } = useAuth();
  const [activeCategory, setActiveCategory] = useState("popular");
  const [expandedCoin, setExpandedCoin] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  const carouselCards = [
    {
      title: "Elite Trading Program 1",
      desc: "Institutional grade benefits for high-volume traders.",
      tag: "Featured",
      footerTag: "Pro Access",
      icon: Award,
      titleBr: true,
      href: "/trade"
    },
    {
      title: "Crypto Loan",
      desc: "Access instant liquidity using your crypto as collateral. Borrow without selling your assets and maintain market exposure.",
      tag: "Liquidity",
      footerTag: "Collateral",
      icon: HandCoins,
      titleBr: false,
      href: "https://vault.trustloan.app"
    },
    {
      title: "Premium Points",
      desc: "Earn platform points through trading activity and unlock reduced fees, exclusive features, and priority benefits.",
      tag: "Rewards",
      footerTag: "Exclusive",
      icon: Trophy,
      titleBr: false,
      href: "https://trust-premium.vercel.app/"
    },
    {
      title: "Staking Boost",
      desc: "Earn up to 25% APR on supported stablecoins through optimized staking strategies.",
      tag: "Earning",
      footerTag: "High Yield",
      icon: Zap,
      titleBr: false,
      href: "/earn"
    }
  ];

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

  const [searchQuery, setSearchQuery] = useState("");
  const [allMarkets, setAllMarkets] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllMarkets = async () => {
      try {
        const res = await fetch("/api/prices/markets");
        const data = await res.json();
        setAllMarkets(data);
      } catch (e) {
        console.error("Failed to fetch markets for mobile list");
      }
    };
    fetchAllMarkets();
    const interval = setInterval(fetchAllMarkets, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredMarkets = allMarkets.filter(m =>
    m.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.pair.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Mobile Hero Section (Visible only on mobile) */}
      <section className="md:hidden pt-32 pb-16 px-6 bg-white overflow-hidden">
        <div className="max-w-[400px] mx-auto bg-gray-50 border border-gray-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-black mb-2 tracking-tight">
            Welcome to Arbix
          </h2>
          <p className="text-sm text-gray-500 font-medium mb-10">
            {isLoggedIn ? "Welcome back! Ready to grow your portfolio?" : "Login or signup to start trading."}
          </p>

          <div className="w-full flex flex-col gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="w-full py-4 bg-orange-500 text-white rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors shadow-sm active:scale-[0.98] text-center"
                >
                  View Assets
                </Link>
                <Link
                  href="/trade"
                  className="w-full py-4 bg-white border border-gray-200 text-black rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors text-center active:scale-[0.98]"
                >
                  Trade Now
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    window.location.href = "/signup";
                  }}
                  className="w-full py-4 bg-orange-500 text-white rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors shadow-sm active:scale-[0.98]"
                >
                  Deposit to Start
                </button>
                <Link
                  href="/login"
                  className="w-full py-4 bg-white border border-gray-200 text-black rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors text-center active:scale-[0.98]"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="w-full py-4 bg-white border border-gray-100 text-gray-400 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors text-center active:scale-[0.98]"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Desktop Hero Section (Hidden on mobile) */}
      <section className="hidden md:block relative pt-64 pb-48 px-6 md:px-12 lg:px-24 overflow-hidden">
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
            {carouselCards.map((card, idx) => (
              <div
                key={idx}
                className="min-w-[280px] md:min-w-[320px] snap-center bg-[#0A0A0A] border border-amber-900/30 rounded-2xl p-6 text-white transition-all hover:border-amber-500/50 hover:bg-[#111] group relative flex flex-col justify-between h-[210px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform">
                      <card.icon className="w-5 h-5 text-amber-500" />
                    </div>
                    <span className="text-[10px] font-bold text-amber-500/60 uppercase tracking-widest">{card.tag}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                    {card.titleBr ? (
                      <>Elite Trading <br />Program 1</>
                    ) : card.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[10px] font-black text-amber-500 uppercase">{card.footerTag}</span>
                  <Link
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    className="text-[11px] font-bold text-white hover:text-amber-400 transition-colors flex items-center gap-1"
                  >
                    Details <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Crypto Markets Section (Unified for Desktop and Mobile) */}
      <section className="py-20 px-4 md:px-6 bg-white min-h-[600px]">
        <div className="max-w-[1440px] mx-auto">
          {/* Section Title */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-black text-black mb-4">
              Crypto Markets
            </h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto text-sm md:text-base">
              Real-time prices for high-liquidity spot pairs.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8 max-w-md mx-auto">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search token"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder:text-gray-400 text-black"
              suppressHydrationWarning
            />
          </div>

          {/* Token List */}
          <div className="space-y-0 text-black max-w-4xl mx-auto">
            {filteredMarkets.length > 0 ? (
              filteredMarkets.map((coin) => (
                <Link
                  key={coin.symbol}
                  href={`/trade?symbol=${coin.symbol}`}
                  className="flex items-center justify-between py-4 border-b border-gray-50 hover:bg-gray-50 active:bg-gray-50 transition-colors px-2 rounded-lg"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-[15px] md:text-lg">{coin.symbol}/USDT</span>
                    <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">Spot Market</span>
                  </div>
                  <div className="text-right flex flex-col gap-1">
                    <span className="font-bold text-[15px] md:text-lg">
                      {coin.price ? coin.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: (coin.price < 1 ? 4 : 2) }) : "0.00"}
                    </span>
                    <span className={`text-[12px] md:text-sm font-black ${(coin.change24h || 0) >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {(coin.change24h || 0) >= 0 ? "+" : ""}{(coin.change24h || 0).toFixed(2)}%
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="py-20 text-center text-gray-400 font-bold text-sm">
                No tokens found
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
