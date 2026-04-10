"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AdminSidebar from "./components/AdminSidebar";
import { Loader2, ShieldAlert, Menu } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, loading: authLoading } = useAuth();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isAdminLogin = pathname === "/admin/login";

    useEffect(() => {
        if (!authLoading && !isAdminLogin) {
            if (!user) {
                router.replace("/admin/login");
            } else if (user.role !== "ADMIN") {
                setIsAuthorized(false);
            } else {
                setIsAuthorized(true);
            }
        }
    }, [user, authLoading, router, isAdminLogin]);

    // Close sidebar on navigation for mobile
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    // If it's the login page, just render children without sidebar/check
    if (isAdminLogin) {
        return <>{children}</>;
    }

    // Show loading spinner while checking auth
    if (authLoading || (isAuthorized === null && !isAdminLogin)) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
                <Loader2 size={40} className="text-orange-500 animate-spin mb-4" />
                <p className="text-gray-400 font-mono text-xs uppercase tracking-widest animate-pulse">Establishing Secure Connection...</p>
            </div>
        );
    }

    // Show access denied for non-admins
    if (isAuthorized === false) {
        return (
            <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                    <ShieldAlert size={32} className="text-red-500" />
                </div>
                <h1 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 italic">Access <span className="text-red-500">Denied</span>.</h1>
                <p className="text-gray-500 text-sm max-w-sm mb-8 font-medium">Your credentials do not have the required clearance level to access this terminal.</p>
                <button
                    onClick={() => router.push("/")}
                    className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                    Return to Surface
                </button>
            </div>
        );
    }

    return (
        <div className="flex bg-gray-50 min-h-screen overflow-x-hidden">
            {/* Sidebar */}
            <AdminSidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col w-full md:ml-64 min-w-0">
                {/* Mobile Header */}
                <header className="h-16 bg-white border-b border-gray-100 flex items-center px-4 md:hidden sticky top-0 z-30">
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                    <div className="ml-3 font-black text-lg tracking-tighter italic">
                        ARBIT<span className="text-orange-500">.</span>ADMIN
                    </div>
                </header>

                <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
