"use client";

import { useEffect, useState } from "react";
import {
  Loader,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

interface Snapshot {
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
  networks: {
    name: string;
    assets: number;
    liabilities: number;
    equity: number;
    walletCount: number;
    lastSyncedAt: string;
  }[];
}

export default function TreasuryOverview() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSnapshot = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await fetch("/api/admin/treasury/overview", {
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to fetch overview");
      const data = await res.json();
      setSnapshot(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch overview"
      );
    } finally {
      if (isRefresh) setRefreshing(false);
      else setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnapshot();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="animate-spin text-blue-400" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="text-red-400 flex-shrink-0 mt-1" size={20} />
        <div>
          <h3 className="font-bold text-red-200">Failed to Load Overview</h3>
          <p className="text-sm text-red-300 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!snapshot) {
    return (
      <div className="text-center py-12 text-slate-400">
        No snapshot data available
      </div>
    );
  }

  const equity =
    snapshot.totalAssets - snapshot.totalLiabilities;
  const equity_pct =
    snapshot.totalAssets > 0 ? ((equity / snapshot.totalAssets) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      {/* Header with Refresh */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Global Financial Snapshot</h2>
        <button
          onClick={() => fetchSnapshot(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors text-sm font-medium"
        >
          <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Top Stats - 3 Column Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Total Assets */}
        <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
              Total Assets
            </p>
            <TrendingUp className="text-green-400" size={18} />
          </div>
          <p className="text-2xl font-bold text-green-200">
            $
            {snapshot.totalAssets.toLocaleString("en-US", {
              maximumFractionDigits: 2,
            })}
          </p>
          <p className="text-xs text-slate-400 mt-2">
            All on-chain reserves across networks
          </p>
        </div>

        {/* Total Liabilities */}
        <div className="bg-gradient-to-br from-red-900/30 to-rose-900/30 border border-red-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
              Total Liabilities
            </p>
            <TrendingDown className="text-red-400" size={18} />
          </div>
          <p className="text-2xl font-bold text-red-200">
            $
            {snapshot.totalLiabilities.toLocaleString("en-US", {
              maximumFractionDigits: 2,
            })}
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Total owed to users
          </p>
        </div>

        {/* Equity */}
        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
              Equity (Surplus)
            </p>
            <AlertCircle className="text-blue-400" size={18} />
          </div>
          <p className="text-2xl font-bold text-blue-200">
            $
            {equity.toLocaleString("en-US", {
              maximumFractionDigits: 2,
            })}
          </p>
          <p className="text-xs text-slate-400 mt-2">
            {equity_pct}% of total assets
          </p>
        </div>
      </div>

      {/* Accounting Equation */}
      <div className="bg-slate-800/40 border border-slate-700 rounded-lg p-4">
        <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide mb-3">
          Accounting Equation
        </p>
        <div className="flex items-center justify-center gap-4 text-lg font-mono font-bold">
          <span className="text-green-300">
            ${snapshot.totalAssets.toFixed(2)}
          </span>
          <span className="text-slate-400">=</span>
          <span className="text-red-300">
            ${snapshot.totalLiabilities.toFixed(2)}
          </span>
          <span className="text-slate-400">+</span>
          <span className="text-blue-300">
            ${equity.toFixed(2)}
          </span>
        </div>
        <p className="text-center text-xs text-slate-400 mt-2">
          Assets = Liabilities + Equity
        </p>
      </div>

      {/* Per-Network Breakdown */}
      <div>
        <h3 className="text-lg font-bold mb-4">Per-Network Breakdown</h3>
        <div className="grid grid-cols-2 gap-4">
          {snapshot.networks.map((network) => (
            <div
              key={network.name}
              className="bg-slate-800/40 border border-slate-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-slate-100">{network.name}</h4>
                <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">
                  {network.walletCount} wallets
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Assets:</span>
                  <span className="font-mono text-green-300">
                    ${network.assets.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Liabilities:</span>
                  <span className="font-mono text-red-300">
                    ${network.liabilities.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="border-t border-slate-700 pt-2 flex justify-between">
                  <span className="text-slate-400">Equity:</span>
                  <span className="font-mono font-bold text-blue-300">
                    ${network.equity.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-3">
                Last synced: {new Date(network.lastSyncedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
