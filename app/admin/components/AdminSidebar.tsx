"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, ArrowRightLeft, ArrowUpCircle, Settings, LogOut, ShieldAlert, TrendingUp, X } from "lucide-react";

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
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
        { name: "Price Overrides", href: "/admin/price-overrides", icon: TrendingUp },
    ];

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />
            )}

            <aside className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-50 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
                {/* Logo Area */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 italic font-black text-xl tracking-tighter">
                    <span className="text-gray-900 leading-none">
                        ARBIT<span className="text-orange-500">.</span>ADMIN
                    </span>
                    <button onClick={onClose} className="md:hidden text-gray-400 hover:text-gray-900 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? "bg-gray-100 text-gray-900 shadow-sm"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                            >
                                <item.icon size={18} className={isActive ? "text-orange-500" : "text-gray-400"} />
                                {item.name}
                            </Link>
                        );
                    })}

                    {/* Secured Section */}
                    <div className="pt-6 pb-2 px-3">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Secured Terminal</p>
                    </div>
                    {secureItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group ${isActive
                                    ? "bg-orange-50 text-orange-700 shadow-sm"
                                    : "text-gray-600 hover:bg-orange-50/60 hover:text-orange-700"
                                    }`}
                            >
                                <item.icon size={18} className={isActive ? "text-orange-500" : "text-orange-300 group-hover:text-orange-500"} />
                                {item.name}
                                <span className={`ml-auto text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md transition-colors ${
                                    isActive ? "bg-orange-200 text-orange-600" : "bg-gray-100 text-gray-400 group-hover:bg-orange-200 group-hover:text-orange-600"
                                }`}>Vault</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-3 px-2 py-2">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-[10px] font-black text-orange-600 border border-orange-200">
                            AD
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-900 truncate">Administrator</p>
                            <p className="text-[10px] text-gray-500 truncate font-medium">admin@platform.com</p>
                        </div>
                        <button
                            onClick={() => window.location.href = "/"}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            title="Logout"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
