"use client";

import { useEffect, useState } from "react";
import {
  Loader,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Copy,
  ExternalLink,
} from "lucide-react";

interface Wallet {
  id: string;
  address: string;
  network: string;
  currency: string;
  balance: string;
  balanceUSD: number;
  status: "GENERATED" | "ACTIVE" | "ROTATING" | "ROTATED" | "DISABLED" | "SWEPT" | "ARCHIVED";
  lastSyncedAt: string;
}

interface WalletsResponse {
  wallets: Wallet[];
  total: number;
  page: number;
  size: number;
}

export default function WalletExplorer() {
  const [data, setData] = useState<WalletsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [network, setNetwork] = useState("ETH");
  const [copied, setCopied] = useState<string | null>(null);

  const pageSize = 10;

  const fetchWallets = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        size: String(pageSize),
        network,
      });
      const res = await fetch(`/api/admin/treasury/wallets?${params}`, {
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to fetch wallets");
      const responseData = await res.json();
      setData(responseData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch wallets"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, [page, network]);

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(address);
    setTimeout(() => setCopied(null), 2000);
  };

  const statusColors: Record<Wallet["status"], string> = {
    GENERATED: "bg-slate-600 text-slate-100",
    ACTIVE: "bg-green-600 text-green-100",
    ROTATING: "bg-yellow-600 text-yellow-100",
    ROTATED: "bg-orange-600 text-orange-100",
    DISABLED: "bg-red-600 text-red-100",
    SWEPT: "bg-blue-600 text-blue-100",
    ARCHIVED: "bg-slate-500 text-slate-100",
  };

  if (loading && !data) {
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
          <h3 className="font-bold text-red-200">Failed to Load Wallets</h3>
          <p className="text-sm text-red-300 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  const totalPages = data ? Math.ceil(data.total / pageSize) : 1;

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Wallet Explorer</h2>
          <p className="text-sm text-slate-400 mt-1">
            All managed wallets with real-time on-chain balances
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={network}
            onChange={(e) => {
              setNetwork(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-medium hover:border-slate-600 transition-colors"
          >
            <option value="ETH">Ethereum</option>
            <option value="BSC">BSC</option>
            <option value="SOL">Solana</option>
            <option value="BTC">Bitcoin</option>
            <option value="XRP">XRP</option>
          </select>
          <button
            onClick={fetchWallets}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-800/40 border border-slate-700 rounded-lg overflow-hidden">
        {data && data.wallets.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-900/50">
                    <th className="px-4 py-3 text-left font-semibold text-slate-300 text-xs uppercase tracking-wide">
                      Address
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-300 text-xs uppercase tracking-wide">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-slate-300 text-xs uppercase tracking-wide">
                      Balance
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-slate-300 text-xs uppercase tracking-wide">
                      USD Value
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-300 text-xs uppercase tracking-wide">
                      Last Synced
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-300 text-xs uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {data.wallets.map((wallet) => (
                    <tr
                      key={wallet.id}
                      className="hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm text-slate-200">
                            {wallet.address.slice(0, 10)}...
                            {wallet.address.slice(-8)}
                          </span>
                          <button
                            onClick={() => handleCopy(wallet.address)}
                            className="p-1 hover:bg-slate-700 rounded transition-colors"
                            title="Copy address"
                          >
                            <Copy
                              size={14}
                              className={
                                copied === wallet.address
                                  ? "text-green-400"
                                  : "text-slate-400"
                              }
                            />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                            statusColors[wallet.status]
                          }`}
                        >
                          {wallet.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-sm">
                        {parseFloat(wallet.balance).toFixed(6)} {wallet.currency}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold">
                        $
                        {wallet.balanceUSD.toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-400">
                        {new Date(wallet.lastSyncedAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          className="p-1 hover:bg-slate-700 rounded transition-colors"
                          title="View on explorer"
                        >
                          <ExternalLink size={14} className="text-blue-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 border-t border-slate-700 flex items-center justify-between bg-slate-900/30">
              <span className="text-xs text-slate-400">
                Showing {(page - 1) * pageSize + 1}-
                {Math.min(page * pageSize, data.total)} of {data.total} wallets
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page <= 1}
                  className="p-1.5 hover:bg-slate-700 disabled:opacity-30 rounded transition-colors"
                  title="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs font-medium">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page >= totalPages}
                  className="p-1.5 hover:bg-slate-700 disabled:opacity-30 rounded transition-colors"
                  title="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="py-12 text-center">
            <p className="text-slate-400">No wallets found for this network</p>
          </div>
        )}
      </div>
    </div>
  );
}
