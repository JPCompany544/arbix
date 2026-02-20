"use client";

import { useState } from "react";
import {
  BarChart3,
  Wallet,
  Zap,
  FileText,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import TreasuryOverview from "./components/TreasuryOverview";
import WalletExplorer from "./components/WalletExplorer";
import SweepControlPanel from "./components/SweepControlPanel";
import TreasuryJournal from "./components/TreasuryJournal";

type TabType = "overview" | "wallets" | "sweep" | "journal";

const tabs: Array<{ id: TabType; label: string; icon: React.ReactNode }> = [
  { id: "overview", label: "Overview", icon: <BarChart3 size={18} /> },
  { id: "wallets", label: "Wallets", icon: <Wallet size={18} /> },
  { id: "sweep", label: "Sweep", icon: <Zap size={18} /> },
  { id: "journal", label: "Journal", icon: <FileText size={18} /> },
];

export default function TreasuryDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">Treasury Dashboard</h1>
            <p className="text-slate-400 mt-2">
              Institutional-grade treasury management and oversight
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            title="Refresh all data"
          >
            <RefreshCw size={20} />
          </button>
        </div>

        {/* Alert Banner */}
        <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-200">
            All treasury operations are audited and immutable. Admin actions are tracked with timestamps and 2FA validation.
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex gap-2 border-b border-slate-700 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium text-sm flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? "text-blue-400 border-blue-500"
                  : "text-slate-400 border-transparent hover:text-slate-300"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === "overview" && (
          <TreasuryOverview key={refreshKey} />
        )}
        {activeTab === "wallets" && (
          <WalletExplorer key={refreshKey} />
        )}
        {activeTab === "sweep" && (
          <SweepControlPanel key={refreshKey} />
        )}
        {activeTab === "journal" && (
          <TreasuryJournal key={refreshKey} />
        )}
      </div>
    </div>
  );
}

