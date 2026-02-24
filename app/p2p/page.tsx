"use client";

import Link from "next/link";
import { ShieldAlert, ArrowLeft, MessageSquare } from "lucide-react";

export default function P2PPage() {
    return (
        <main className="min-h-[100dvh] bg-[#020202] text-white flex flex-col items-center justify-center px-6 pb-16 relative overflow-hidden">
            {/* Subtle Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-rose-500/5 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="w-full max-w-[320px] text-center space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Security Shield Icon - Reduced Size */}
                <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                    <div className="absolute inset-0 bg-rose-600/10 rounded-full blur-2xl"></div>
                    <div className="relative w-16 h-16 bg-[#0B0E11] border border-rose-500/20 rounded-2xl flex items-center justify-center shadow-lg">
                        <ShieldAlert className="text-rose-500" size={32} strokeWidth={2} />
                    </div>
                </div>

                {/* Typography - Downscaled for Mobile */}
                <div className="space-y-3">
                    <h1 className="text-2xl font-black uppercase tracking-tight text-white leading-none">
                        Access <span className="text-rose-500">Restricted</span>
                    </h1>
                    <div className="space-y-3 px-2">
                        <p className="text-gray-400 text-[13px] leading-snug font-bold">
                            You do not have access to this service. Please contact support for more information.
                        </p>
                        <p className="text-gray-500 text-[11px] italic leading-relaxed">
                            Our team will assist you in clarifying your account status or restoring access.
                        </p>
                    </div>
                </div>

                {/* Compact Actions */}
                <div className="flex flex-col gap-3 pt-2">
                    <Link
                        href="/support"
                        className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-xl flex items-center justify-center gap-2 text-[12px] font-black uppercase tracking-widest shadow-lg shadow-orange-500/10 transition-all active:scale-[0.97]"
                    >
                        <MessageSquare size={18} />
                        <span>Contact Support</span>
                    </Link>
                    <Link
                        href="/"
                        className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all active:scale-[0.97]"
                    >
                        <ArrowLeft size={16} />
                        <span>Return Home</span>
                    </Link>
                </div>

                {/* Footer Note */}
                <div className="pt-6">
                    <p className="text-[8px] text-gray-700 font-bold uppercase tracking-[0.3em]">
                        REF: 403-ARBIX-P2P
                    </p>
                </div>
            </div>
        </main>
    );
}
