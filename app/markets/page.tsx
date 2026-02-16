import Link from "next/link";
import { getMarketData } from "@/lib/pricing/price-service";
import MarketTable from "@/components/MarketTable";

export default async function MarketsPage() {
    const initialMarketData = await getMarketData();

    return (
        <main className="min-h-screen bg-white pt-20 px-6 md:px-12 lg:px-24 pb-20">
            <div className="max-w-[1440px] mx-auto">
                <section className="py-4">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-3xl md:text-5xl font-black text-black tracking-tight uppercase italic">
                            Markets
                        </h1>
                        <div className="hidden md:flex items-center gap-4">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Market Cap</span>
                                <span className="text-xl font-black text-black">$2.64T</span>
                            </div>
                            <div className="flex flex-col items-end border-l border-gray-100 pl-4">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">24H Volume</span>
                                <span className="text-xl font-black text-black text-orange-500">$84.2B</span>
                            </div>
                        </div>
                    </div>

                    {/* First Row: Categories and Search */}
                    <div className="flex items-center justify-between mt-12 border-b-2 border-gray-100 flex-wrap gap-4">
                        <div className="flex items-center gap-6">
                            <button className="flex items-center gap-1.5 pb-3 text-[12px] font-black text-orange-500 border-b-2 border-orange-500 -mb-[2px] transition-colors uppercase tracking-widest">
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                                Favourites
                            </button>
                            <button className="pb-3 text-[12px] font-black text-gray-400 hover:text-orange-400 transition-colors uppercase tracking-widest">
                                Spot Markets
                            </button>
                            <button className="pb-3 text-[12px] font-black text-gray-400 hover:text-orange-400 transition-colors uppercase tracking-widest">
                                Futures
                            </button>
                        </div>

                        <div className="flex-1 max-w-xs mb-3">
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search Asset Pair..."
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-2 pl-10 pr-4 text-[12px] font-bold text-black focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-gray-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table Container - New Live Component */}
                    <MarketTable initialData={initialMarketData} />

                    {/* Pagination Navigation */}
                    <div className="mt-12 flex justify-center items-center gap-2">
                        {[1, 2, 3, 4].map((page) => (
                            <button
                                key={page}
                                className={`w-10 h-10 flex items-center justify-center text-[13px] font-black rounded-xl transition-all ${page === 1
                                    ? "bg-black text-white shadow-lg"
                                    : "text-gray-400 hover:text-black hover:bg-gray-100 border-2 border-transparent hover:border-gray-200"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
