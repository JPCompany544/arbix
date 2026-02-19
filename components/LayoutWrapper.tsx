"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DepositModal from "@/components/DepositModal";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPath = pathname?.startsWith("/admin");

    return (
        <>
            {!isAdminPath && <Navbar />}
            {children}
            {!isAdminPath && <Footer />}
            {!isAdminPath && <DepositModal />}
        </>
    );
}
