"use client";

import { useState } from "react";
import {
    MessageSquare,
    HelpCircle,
    Ticket,
    ChevronRight,
    User,
    Shield,
    ArrowDownCircle,
    TrendingUp,
    Users,
    Zap,
    X
} from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
    const [tickets, setTickets] = useState([]); // Empty state by default

    const faqCategories = [
        {
            id: "account",
            name: "Account Management",
            desc: "Registration, login, account settings, and account management",
            icon: <User className="text-orange-500" size={24} />
        },
        {
            id: "kyc",
            name: "KYC & Security",
            desc: "Identity verification, two-factor authentication, and security features",
            icon: <Shield className="text-orange-500" size={24} />
        },
        {
            id: "deposits",
            name: "Deposits & Withdrawals",
            desc: "How to deposit and withdraw cryptocurrencies and fiat currencies",
            icon: <ArrowDownCircle className="text-orange-500" size={24} />
        },
        {
            id: "trading",
            name: "Trading",
            desc: "Spot trading, order types, order book, and trading features",
            icon: <TrendingUp className="text-orange-500" size={24} />
        },
        {
            id: "p2p",
            name: "P2P Trading",
            desc: "Peer-to-peer trading, creating ads, and completing transactions",
            icon: <Users className="text-orange-500" size={24} />
        },
        {
            id: "staking",
            name: "Staking",
            desc: "How to stake cryptocurrencies and earn rewards",
            icon: <Zap className="text-orange-500" size={24} />
        }
    ];

    return (
        <main className="min-h-screen bg-[#020202] text-white pt-10 md:pt-16 pb-20 px-4 md:px-0">
            {/* Desktop Layout (Standard Container) */}
            <div className="hidden md:block max-w-7xl mx-auto px-6">
                <div className="mb-12">
                    <h1 className="text-4xl font-black tracking-tight mb-4">Support Center</h1>
                    <p className="text-gray-400 text-lg">How can we help you today?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Col: Quick Actions & Tickets */}
                    <div className="space-y-12">
                        <section>
                            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-6">Quick Actions</h3>
                            <div className="space-y-4">
                                <button className="w-full flex items-center gap-4 p-5 bg-[#0B0E11] border border-white/5 rounded-2xl hover:border-orange-500/50 transition-all hover:bg-white/[0.02] group">
                                    <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                                        <HelpCircle className="text-orange-500" size={24} />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-lg">Ask a Question</div>
                                        <div className="text-sm text-gray-500 italic">Submit a form to our team</div>
                                    </div>
                                </button>
                                <button className="w-full flex items-center gap-4 p-5 bg-[#0B0E11] border border-white/5 rounded-2xl hover:border-orange-500/50 transition-all hover:bg-white/[0.02] group">
                                    <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                                        <MessageSquare className="text-orange-500" size={24} />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-lg">Chat with Support</div>
                                        <div className="text-sm text-gray-500 italic">Live conversation now</div>
                                    </div>
                                </button>
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold">My Support Tickets</h3>
                                <button className="text-orange-500 text-sm font-bold hover:underline">View All</button>
                            </div>
                            <div className="p-8 bg-[#0B0E11] border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                    <Ticket className="text-gray-600" size={32} />
                                </div>
                                <p className="text-gray-400">You have no support tickets yet.</p>
                            </div>
                        </section>
                    </div>

                    {/* Right Col: FAQs */}
                    <div className="md:col-span-2">
                        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-6">FAQ Categories</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {faqCategories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/support/category/${cat.id}`}
                                    className="p-6 bg-[#0B0E11] border border-white/5 rounded-3xl hover:border-orange-500/30 transition-all hover:translate-y-[-4px]"
                                >
                                    <div className="mb-4">{cat.icon}</div>
                                    <div className="text-xl font-bold mb-2 Italics">{cat.name}</div>
                                    <div className="text-sm text-gray-500 leading-relaxed italic">{cat.desc}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Layout (Stacked/Scrollable) */}
            <div className="md:hidden flex flex-col gap-10">
                {/* Header */}
                <div className="px-2">
                    <h1 className="text-3xl font-black tracking-tight mb-2 uppercase">Support Center</h1>
                    <p className="text-gray-500 text-sm font-medium">How can we help you today?</p>
                </div>

                {/* 1. Quick Actions */}
                <section>
                    <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 px-2">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3 px-1">
                        <button className="flex flex-col items-center justify-center gap-3 p-5 bg-[#0B0E11] border border-white/5 rounded-2xl active:bg-orange-500/10 active:border-orange-500/30 transition-all group h-[120px]">
                            <HelpCircle className="text-orange-500" size={30} />
                            <span className="text-[11px] font-black uppercase tracking-widest text-center leading-tight">Ask a Question</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-3 p-5 bg-[#0B0E11] border border-white/5 rounded-2xl active:bg-orange-500/10 active:border-orange-500/30 transition-all h-[120px]">
                            <MessageSquare className="text-orange-500" size={30} />
                            <span className="text-[11px] font-black uppercase tracking-widest text-center leading-tight">Live Chat</span>
                        </button>
                    </div>
                </section>

                {/* 2. My Support Tickets */}
                <section className="px-2">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-black uppercase tracking-tight text-white">My Support Tickets</h3>
                        <button className="text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] border border-orange-500/20 px-3 py-1.5 rounded-lg active:bg-orange-500/10">View All</button>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium mb-5 italic">View all your support tickets and conversations</p>

                    <div className="p-10 bg-[#0B0E11] border border-white/5 rounded-3xl flex flex-col items-center justify-center text-center shadow-2xl">
                        <div className="w-16 h-16 bg-white/[0.02] rounded-2xl flex items-center justify-center mb-4 border border-white/5">
                            <Ticket className="text-gray-800" size={32} />
                        </div>
                        <p className="text-[13px] font-bold text-gray-400 mb-1">No Active Tickets</p>
                        <p className="text-[10px] text-gray-600 font-medium uppercase tracking-widest">You have no support tickets yet.</p>
                    </div>
                </section>

                {/* 3. FAQ Categories */}
                <section className="px-2">
                    <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">FAQ Categories</h3>
                    <div className="flex flex-col gap-3">
                        {faqCategories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/support/category/${cat.id}`}
                                className="flex items-center gap-4 p-5 bg-[#0B0E11] border border-white/5 rounded-2xl active:bg-white/[0.05] transition-all"
                            >
                                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                                    {cat.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="text-[15px] font-black uppercase tracking-tight mb-0.5">{cat.name}</div>
                                    <div className="text-[11px] text-gray-500 leading-tight italic">{cat.desc}</div>
                                </div>
                                <ChevronRight className="text-gray-700" size={18} />
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
