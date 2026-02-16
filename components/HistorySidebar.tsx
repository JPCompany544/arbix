"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutList, ArrowDownLeft, ArrowUpRight, ArrowRightLeft, DollarSign } from "lucide-react";

export function HistorySidebar() {
    const pathname = usePathname();

    const links = [
        { name: "All transactions", href: "/history/all", icon: LayoutList },
        { name: "Deposits", href: "/history/deposits", icon: ArrowDownLeft },
        { name: "Withdrawals", href: "/history/withdrawals", icon: ArrowUpRight },
        { name: "Transfers", href: "/history/transfers", icon: ArrowRightLeft },
        { name: "Earnings", href: "/history/earnings", icon: DollarSign },
    ];

    return (
        <aside className="w-full h-full bg-black/40 border border-white/5 rounded-2xl overflow-y-auto backdrop-blur-sm">
            <div className="p-4 md:p-6">
                <h2 className="text-xl font-bold text-white mb-6 hidden md:block">History</h2>
                <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
                    {links.map((link) => {
                        const isActive = pathname === link.href || (link.href === "/history/all" && pathname === "/history");

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group flex-shrink-0 md:flex-shrink ${isActive
                                    ? "bg-gradient-to-r from-orange-500/20 to-orange-500/5 text-orange-500 border border-orange-500/20"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <div className={`p-2 rounded-lg ${isActive ? "bg-orange-500/20" : "bg-white/5 group-hover:bg-white/10"
                                    }`}>
                                    <link.icon size={18} />
                                </div>
                                <span className="font-medium text-sm whitespace-nowrap">{link.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}
