import { ReactNode } from "react";
import { HistorySidebar } from "@/components/HistorySidebar";

interface HistoryLayoutProps {
    children: ReactNode;
}

export default function HistoryLayout({ children }: HistoryLayoutProps) {
    return (
        <div className="min-h-screen bg-black pt-20 text-white selection:bg-orange-500/30">
            <div className="max-w-[1440px] mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row gap-6 min-h-[calc(100vh-100px)]">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <HistorySidebar />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 p-4 md:p-8 backdrop-blur-sm">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
