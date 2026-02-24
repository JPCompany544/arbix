"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, LayoutDashboard, LogOut, Headset } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import MarketTicker from "./MarketTicker";

export default function TradeMobileHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isLoggedIn, logout } = useAuth();
    const { openModal } = useModal();

    const navLinks = [
        { name: "Markets", href: "/markets" },
        { name: "Trade", href: "/trade" },
        { name: "Futures", href: "/futures" },
        { name: "Earn", href: "/earn" },
        { name: "Support", href: "/support" }
    ];

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] md:hidden">
            {/* 1. Live Market Ticker */}
            <MarketTicker />

            {/* 2. Logo + Actions Row */}
            <div className="mt-10 h-14 bg-[#0B0E11] border-b border-white/5 flex items-center justify-between px-4">
                {/* Left: Logo + Name */}
                <Link href="/" className="flex items-center gap-2 active:opacity-80 transition-opacity">
                    <div className="relative w-7 h-7">
                        <Image
                            src="/Platform Logo main.png"
                            alt="Arbit Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-white font-bold text-[17px] tracking-tight">
                        Arbit<span className="text-orange-500 font-black">.</span>
                    </span>
                </Link>

                {/* Right: Actions */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => openModal()}
                        className="px-4 h-8 bg-orange-500 text-white font-black text-[11px] rounded-md active:scale-[0.98] transition-all uppercase tracking-wider"
                    >
                        Deposit
                    </button>
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 active:text-white transition-colors"
                    >
                        <Menu size={24} strokeWidth={2} />
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {menuOpen && (
                <div className="fixed inset-0 z-[110] bg-black/98 backdrop-blur-2xl">
                    <div className="flex flex-col h-full p-6">
                        <div className="flex items-center justify-between mb-10">
                            <Link href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
                                <div className="relative w-10 h-10">
                                    <Image
                                        src="/Platform Logo main.png"
                                        alt="Arbit Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-white font-extrabold text-2xl tracking-tighter">
                                    Arbit<span className="text-orange-500 text-xl leading-none">.</span>
                                </span>
                            </Link>
                            <button
                                onClick={() => setMenuOpen(false)}
                                className="w-11 h-11 flex items-center justify-center text-gray-400 active:text-white transition-colors"
                            >
                                <X size={28} />
                            </button>
                        </div>

                        <div className="flex-1 space-y-10 overflow-y-auto">
                            <nav className="space-y-5">
                                <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.25em] mb-6">Trading Terminal</h3>
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="block text-2xl font-black text-white active:text-orange-500 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>

                            <div className="pt-10 border-t border-white/10 space-y-6">
                                <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.25em]">Account Management</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {isLoggedIn ? (
                                        <>
                                            <Link
                                                href="/dashboard"
                                                onClick={() => setMenuOpen(false)}
                                                className="flex items-center gap-4 text-lg font-bold text-white p-5 bg-white/[0.03] rounded-2xl border border-white/5 active:bg-white/10 transition-colors"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                                                    <LayoutDashboard size={20} className="text-orange-500" />
                                                </div>
                                                Dashboard
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setMenuOpen(false);
                                                }}
                                                className="flex items-center gap-4 text-lg font-bold text-red-500 p-5 bg-red-500/5 rounded-2xl border border-red-500/10 active:bg-red-500/10 transition-colors"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                                                    <LogOut size={20} />
                                                </div>
                                                Sign Out
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                href="/login"
                                                onClick={() => setMenuOpen(false)}
                                                className="block text-center p-4 bg-white text-black font-black rounded-xl active:scale-[0.98] transition-all"
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                href="/signup"
                                                onClick={() => setMenuOpen(false)}
                                                className="block text-center p-4 bg-orange-500 text-white font-black rounded-xl shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all"
                                            >
                                                Sign Up
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
