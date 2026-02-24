"use client";

import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function MobileHeader() {
    const { isLoggedIn } = useAuth();

    return (
        <header className="fixed top-10 left-0 right-0 h-14 bg-black border-b border-white/5 flex items-center justify-between px-4 z-[60] transition-colors">
            {/* Left: Logo + Company Name */}
            <Link href="/" className="flex items-center gap-2 active:opacity-80 transition-opacity">
                <div className="relative w-7 h-7">
                    <Image
                        src="/Platform Logo main.png"
                        alt="Arbit Logo"
                        fill
                        className="object-contain"
                    />
                </div>
                <span className="text-white font-semibold text-base tracking-tight">
                    Arbit<span className="text-orange-500 font-bold">.</span>
                </span>
            </Link>

            {/* Right: Profile Icon */}
            <Link
                href={isLoggedIn ? "/dashboard" : "/login"}
                className="w-10 h-10 flex items-center justify-center text-gray-400 active:text-white active:bg-white/5 rounded-lg transition-all"
                aria-label="Profile"
            >
                <User size={20} strokeWidth={1.5} />
            </Link>
        </header>
    );
}
