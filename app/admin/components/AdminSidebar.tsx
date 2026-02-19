"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, ArrowRightLeft, ArrowUpCircle, Settings, LogOut, ShieldAlert } from "lucide-react";

export default function AdminSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Users", href: "/admin/users", icon: Users },
        { name: "Transactions", href: "/admin/transactions", icon: ArrowRightLeft },
        { name: "Withdrawals", href: "/admin/withdrawals", icon: ArrowUpCircle },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    const secureItems = [
        { name: "Treasury", href: "/admin/treasury", icon: ShieldAlert },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-screen fixed left-0 top-0 z-30">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-gray-100">
                <span className="text-xl font-bold tracking-tight text-gray-900">
                    Arbit<span className="text-orange-500">.</span> Admin
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <item.icon size={18} className={isActive ? "text-orange-500" : "text-gray-400"} />
                            {item.name}
                        </Link>
                    );
                })}

                {/* Secured Section */}
                <div className="pt-4 pb-1">
                    <p className="px-3 text-[9px] font-black uppercase tracking-widest text-gray-300">Secured</p>
                </div>
                {secureItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                ? "bg-orange-50 text-orange-700"
                                : "text-gray-600 hover:bg-orange-50/60 hover:text-orange-700"
                                }`}
                        >
                            <item.icon size={18} className={isActive ? "text-orange-500" : "text-orange-300"} />
                            {item.name}
                            <span className="ml-auto text-[8px] font-black uppercase tracking-widest bg-orange-100 text-orange-500 px-1.5 py-0.5 rounded-md">Vault</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / User Profile */}
            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3 px-2 py-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                        AD
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900 truncate">Administrator</p>
                        <p className="text-[10px] text-gray-500 truncate">admin@platform.com</p>
                    </div>
                    <button
                        onClick={() => window.location.href = "/"}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Logout"
                    >
                        <LogOut size={16} />
                    </button>
                </div>
            </div>
        </aside>
    );
}
