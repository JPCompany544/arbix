"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Zap, BarChart3, Coins, User, Wallet, Headset } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const MobileBottomNav = () => {
    const pathname = usePathname();
    const { isLoggedIn } = useAuth();

    const navItems = [
        { label: "Home", icon: Home, href: "/" },
        { label: "P2P", icon: Zap, href: "/p2p" },
        { label: "Trade", icon: BarChart3, href: "/trade" },
        { label: "Support", icon: Headset, href: "/support" },
        {
            label: isLoggedIn ? "Assets" : "Login",
            icon: isLoggedIn ? Wallet : User,
            href: isLoggedIn ? "/dashboard" : "/login"
        },
    ];

    return (
        <nav className="md:hidden fixed bottom-1.5 left-1.5 right-1.5 bg-black/90 border border-white/10 px-2 pt-3.5 pb-[calc(14px+env(safe-area-inset-bottom))] z-[70] backdrop-blur-xl rounded-2xl shadow-2xl">
            <div className="flex justify-around items-center max-w-lg mx-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex flex-col items-center justify-center gap-1.5 px-3 py-1 rounded-xl active:scale-95 transition-all ${isActive ? "text-orange-500" : "text-gray-400"
                                }`}
                        >
                            <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            <span className={`text-[9px] font-black tracking-widest uppercase ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default MobileBottomNav;
