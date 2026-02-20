"use client";

import { useEffect, useState } from "react";
import {
  Loader,
  AlertCircle,
  Lock,
  Filter,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

interface JournalEntry {
  id: string;
  date: string;
  referenceType: string;
  referenceId: string;
  description: string;
  createdByAdminId: string;
  locked: boolean;
  entries: Array<{
    accountName: string;
    debit: number;
    credit: number;
  }>;
}

interface JournalResponse {
  entries: JournalEntry[];
  total: number;
  page: number;
  size: number;
}

export default function TreasuryJournal() {
  const [data, setData] = useState<JournalResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [network, setNetwork] = useState("");
  const [actionType, setActionType] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const pageSize = 10;

  const fetchJournal = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        size: String(pageSize),
      });
      if (network) params.append("network", network);
      if (actionType) params.append("actionType", actionType);

      const res = await fetch(`/api/admin/treasury/journal?${params}`, {
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to fetch journal");
      setData(await res.json());
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch journal"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournal();
  }, [page, network, actionType]);

  const totalPages = data ? Math.ceil(data.total / pageSize) : 1;

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
          <h3 className="font-bold text-red-200">Failed to Load Journal</h3>
          <p className="text-sm text-red-300 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Treasury Journal</h2>
          <p className="text-sm text-slate-400 mt-1">
            Immutable ledger of all treasury transactions
          </p>
        </div>
        <button
          onClick={fetchJournal}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-400" />
          <select
            value={network}
            onChange={(e) => {
              setNetwork(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-medium hover:border-slate-600 transition-colors"
          >
            <option value="">All Networks</option>
            <option value="ETH">Ethereum</option>
            <option value="BSC">BSC</option>
            <option value="SOL">Solana</option>
            <option value="BTC">Bitcoin</option>
            <option value="XRP">XRP</option>
          </select>
        </div>

        <select
          value={actionType}
          onChange={(e) => {
            setActionType(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-medium hover:border-slate-600 transition-colors"
        >
          <option value="">All Action Types</option>
          <option value="DEPOSIT">Deposits</option>
          <option value="WITHDRAWAL">Withdrawals</option>
          <option value="SWEEP">Sweeps</option>
          <option value="TRANSFER">Transfers</option>
        </select>
      </div>

      {/* Immutability Notice */}
      <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 flex items-start gap-3">
        <Lock className="text-blue-400 flex-shrink-0 mt-1" size={20} />
        <div className="text-sm text-blue-200">
          <strong>Immutable Audit Trail:</strong> All locked entries cannot be modified or deleted.
          This journal serves as the definitive source of truth for all treasury transactions.
        </div>
      </div>

      {/* Journal Entries */}
      <div className="space-y-3">
        {data && data.entries.length > 0 ? (
          data.entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-slate-800/40 border border-slate-700 rounded-lg overflow-hidden hover:border-slate-600 transition-colors"
            >
              {/* Entry Header - Clickable */}
              <button
                onClick={() =>
                  setExpandedId(expandedId === entry.id ? null : entry.id)
                }
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-700/30 transition-colors text-left"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{entry.description}</p>
                    {entry.locked && (
                      <div title="This entry is locked and immutable">
                        <Lock
                          size={14}
                          className="text-green-400"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span>{entry.referenceType}</span>
                    <span>{new Date(entry.date).toLocaleString()}</span>
                    <span>By: {entry.createdByAdminId}</span>
                  </div>
                </div>
                <div
                  className={`transform transition-transform ${
                    expandedId === entry.id ? "rotate-180" : ""
                  }`}
                >
                  <ChevronRight size={20} className="text-slate-400" />
                </div>
              </button>

              {/* Expanded Details */}
              {expandedId === entry.id && (
                <div className="px-4 py-3 border-t border-slate-700 bg-slate-900/30 space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide mb-2">
                      Journal Entries
                    </p>
                    <div className="space-y-2">
                      <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-slate-400 px-2">
                        <div className="col-span-6">Account</div>
                        <div className="col-span-3 text-right">Debit</div>
                        <div className="col-span-3 text-right">Credit</div>
                      </div>
                      {entry.entries.map((e, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-12 gap-2 text-sm px-2 py-1 hover:bg-slate-800/30 rounded"
                        >
                          <div className="col-span-6 font-mono">{e.accountName}</div>
                          <div className="col-span-3 text-right font-mono">
                            {e.debit > 0 ? `$${e.debit.toFixed(2)}` : "-"}
                          </div>
                          <div className="col-span-3 text-right font-mono">
                            {e.credit > 0 ? `$${e.credit.toFixed(2)}` : "-"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 p-2 bg-slate-900/50 rounded">
                    <strong>ID:</strong> {entry.id}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="py-12 text-center">
            <p className="text-slate-400">No journal entries found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {data && data.entries.length > 0 && (
        <div className="bg-slate-800/40 border border-slate-700 rounded-lg px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Showing {(page - 1) * pageSize + 1}-
            {Math.min(page * pageSize, data.total)} of {data.total} entries
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page <= 1}
              className="p-1.5 hover:bg-slate-700 disabled:opacity-30 rounded transition-colors"
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
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
