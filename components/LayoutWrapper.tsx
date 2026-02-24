"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DepositModal from "@/components/DepositModal";
import MarketTicker from "@/components/MarketTicker";
import MobileHeader from "@/components/MobileHeader";
import TradeMobileHeader from "@/components/TradeMobileHeader";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPath = pathname?.startsWith("/admin");
    const isSupportPath = pathname?.startsWith("/support");
    const isP2PPath = pathname?.startsWith("/p2p");
    const isHomePage = pathname === "/";
    const isTradePage = pathname === "/trade";

    return (
        <>
            {!isAdminPath && !isSupportPath && !isP2PPath && (
                <>
                    {/* Header logic: Substitute standard Navbar on specific pages (mobile) */}
                    <div className="hidden md:block">
                        <Navbar />
                    </div>
                    <div className="block md:hidden">
                        {isHomePage && (
                            <>
                                <MarketTicker />
                                <MobileHeader />
                            </>
                        )}
                        {isTradePage && <TradeMobileHeader />}
                        {!isHomePage && !isTradePage && <Navbar />}
                    </div>
                </>
            )}
            <div className={!isAdminPath ? "pb-20 md:pb-0" : ""}>
                {children}
            </div>
            {!isAdminPath && <Footer />}
            {!isAdminPath && <DepositModal />}
            {!isAdminPath && <MobileBottomNav />}
        </>
    );
}
