"use client";

import { useEffect, useState, useCallback } from "react";
import {
    ShieldAlert, RefreshCw, Lock, CheckCircle2,
    XCircle, Clock, ArrowUpRight, ExternalLink,
    AlertTriangle, ChevronLeft, ChevronRight, Filter,
    Wallet, TrendingDown, TrendingUp, Minus
} from "lucide-react";
import AdminSweepModal from "../components/AdminSweepModal";

// ─── Types ───────────────────────────────────────────────────────────────────

interface TreasuryEntry {
    chain: string;
    symbol: string;
    totalOnchainBalance: string;
    totalUserLiabilities: string;
    sweepableBalance: string;
    onchainUSD: number;
    liabilitiesUSD: number;
    sweepableUSD: number;
    lastSyncedAt: string;
    locked: boolean;
    explorerUrl: string;
    price: number;
    walletCount: number;
}

interface SweepRecord {
    id: string;
    chain: string;
    amount: string;
    fromWallet: string;
    toWallet: string;
    txHash: string | null;
    status: "PENDING" | "BROADCASTING" | "CONFIRMED" | "FAILED";
    initiatedBy: string;
    error: string | null;
    createdAt: string;
    confirmedAt: string | null;
}

interface SweepHistoryResponse {
    sweeps: SweepRecord[];
    total: number;
    page: number;
    pages: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<string, string> = {
    CONFIRMED: "bg-green-100 text-green-700",
    BROADCASTING: "bg-blue-100 text-blue-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    FAILED: "bg-red-100 text-red-700",
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
    CONFIRMED: <CheckCircle2 size={12} />,
    BROADCASTING: <RefreshCw size={12} className="animate-spin" />,
    PENDING: <Clock size={12} />,
    FAILED: <XCircle size={12} />,
};

const CHAIN_ICON: Record<string, string> = {
    ETH: "Ξ", BSC: "BNB", SOL: "◎", BTC: "₿", XRP: "✕"
};

const CHAIN_GRADIENT: Record<string, string> = {
    ETH: "from-blue-50  to-indigo-50  border-blue-100",
    BSC: "from-yellow-50 to-amber-50  border-yellow-100",
    SOL: "from-purple-50 to-violet-50 border-purple-100",
    BTC: "from-orange-50 to-amber-50  border-orange-100",
    XRP: "from-sky-50   to-cyan-50    border-sky-100",
};

const CHAIN_ACCENT: Record<string, string> = {
    ETH: "text-blue-600", BSC: "text-yellow-600",
    SOL: "text-purple-600", BTC: "text-orange-500", XRP: "text-sky-500",
};

function fmt(n: string | number, d = 6) {
    const v = parseFloat(String(n));
    if (v === 0) return "0";
    return v.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: d });
}

function fmtUSD(n: number) {
    return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

function timeAgo(date: string) {
    const secs = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (secs < 60) return `${secs}s ago`;
    if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
    if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
    return new Date(date).toLocaleDateString();
}

function getHealthStatus(entry: TreasuryEntry) {
    const onchain = parseFloat(entry.totalOnchainBalance);
    const liabilities = parseFloat(entry.totalUserLiabilities);
    if (liabilities === 0 && onchain === 0) return "empty";
    if (onchain < liabilities) return "underfunded";
    if (onchain === liabilities) return "exact";
    return "healthy";
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TreasuryPage() {
    const [overview, setOverview] = useState<TreasuryEntry[]>([]);
    const [history, setHistory] = useState<SweepHistoryResponse | null>(null);
    const [loadingOverview, setLoadingOverview] = useState(true);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const [historyPage, setHistoryPage] = useState(1);
    const [historyChainFilter, setHistoryChainFilter] = useState("");
    const [sweepTarget, setSweepTarget] = useState<TreasuryEntry | null>(null);
    const [syncing, setSyncing] = useState(false);

    const fetchOverview = useCallback(async () => {
        setSyncing(true);
        try {
            const res = await fetch("/api/admin/treasury/overview");
            if (res.ok) setOverview(await res.json());
        } finally {
            setSyncing(false);
            setLoadingOverview(false);
        }
    }, []);

    const fetchHistory = useCallback(async () => {
        setLoadingHistory(true);
        try {
            const params = new URLSearchParams({
                page: String(historyPage),
                limit: "15",
                ...(historyChainFilter ? { chain: historyChainFilter } : {}),
            });
            const res = await fetch(`/api/admin/treasury/sweeps?${params}`);
            if (res.ok) setHistory(await res.json());
        } finally {
            setLoadingHistory(false);
        }
    }, [historyPage, historyChainFilter]);

    useEffect(() => { fetchOverview(); }, [fetchOverview]);
    useEffect(() => { fetchHistory(); }, [fetchHistory]);

    // Only include chains with activity in USD totals
    const totals = overview.reduce(
        (acc, e) => ({
            onchain: acc.onchain + e.onchainUSD,
            liabilities: acc.liabilities + e.liabilitiesUSD,
            sweepable: acc.sweepable + e.sweepableUSD,
        }),
        { onchain: 0, liabilities: 0, sweepable: 0 }
    );

    // Count chains that are underfunded
    const underfundedChains = overview.filter(e => getHealthStatus(e) === "underfunded");

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header */}
            <div className="flex items-start justify-between pb-5 border-b border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                        <ShieldAlert className="text-orange-500" size={22} />
                        Treasury
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Real balances from on-chain wallet monitors. Liabilities = total owed to users.
                    </p>
                </div>
                <button
                    onClick={fetchOverview}
                    disabled={syncing}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50"
                >
                    <RefreshCw size={14} className={syncing ? "animate-spin" : ""} />
                    {syncing ? "Syncing…" : "Refresh"}
                </button>
            </div>

            {/* Underfunded Warning */}
            {underfundedChains.length > 0 && !loadingOverview && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl">
                    <TrendingDown size={18} className="text-red-500 mt-0.5 shrink-0" />
                    <div>
                        <p className="text-sm font-bold text-red-700">
                            ⚠️ Underfunded chains detected: {underfundedChains.map(e => e.chain).join(", ")}
                        </p>
                        <p className="text-xs text-red-500 mt-0.5">
                            On-chain reserves are less than user liabilities. Deposits may be pending confirmation or funds were moved off-chain.
                        </p>
                    </div>
                </div>
            )}

            {/* Platform Totals */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    {
                        label: "Total On-Chain Reserves",
                        value: totals.onchain,
                        color: "text-gray-900",
                        sub: "Sum of all wallet balances tracked by monitor",
                        icon: <Wallet size={16} className="text-gray-400" />
                    },
                    {
                        label: "Total User Liabilities",
                        value: totals.liabilities,
                        color: "text-red-600",
                        sub: "Total owed to users per internal ledger",
                        icon: <TrendingDown size={16} className="text-red-400" />
                    },
                    {
                        label: "Total Sweepable",
                        value: totals.sweepable,
                        color: "text-green-600",
                        sub: "Reserves beyond user obligations",
                        icon: <TrendingUp size={16} className="text-green-400" />
                    },
                ].map(item => (
                    <div key={item.label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            {item.icon}
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.label}</p>
                        </div>
                        <p className={`text-2xl font-black ${item.color}`}>
                            {loadingOverview ? "—" : fmtUSD(item.value)}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1">{item.sub}</p>
                    </div>
                ))}
            </div>

            {/* Per-Chain Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {loadingOverview
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-56 bg-gray-50 border border-gray-100 rounded-2xl animate-pulse" />
                    ))
                    : overview.map(entry => {
                        const health = getHealthStatus(entry);
                        const canSweep = parseFloat(entry.sweepableBalance) > 0 && !entry.locked;

                        return (
                            <div
                                key={entry.chain}
                                className={`bg-gradient-to-br ${CHAIN_GRADIENT[entry.chain] || "from-gray-50 to-gray-50 border-gray-100"} border rounded-2xl p-5 relative overflow-hidden`}
                            >
                                {/* Health / Lock badge */}
                                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                                    {entry.locked && (
                                        <span className="flex items-center gap-1 bg-red-100 text-red-600 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                                            <Lock size={8} /> Locked
                                        </span>
                                    )}
                                    {health === "underfunded" && (
                                        <span className="flex items-center gap-1 bg-red-100 text-red-600 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                                            <AlertTriangle size={8} /> Under
                                        </span>
                                    )}
                                    {health === "healthy" && (
                                        <span className="flex items-center gap-1 bg-green-100 text-green-600 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                                            <CheckCircle2 size={8} /> Solvent
                                        </span>
                                    )}
                                    {health === "exact" && (
                                        <span className="flex items-center gap-1 bg-yellow-100 text-yellow-600 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                                            <Minus size={8} /> Exact
                                        </span>
                                    )}
                                </div>

                                {/* Chain header */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className={`w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center font-black text-sm ${CHAIN_ACCENT[entry.chain]}`}>
                                        {CHAIN_ICON[entry.chain] || entry.symbol}
                                    </div>
                                    <div>
                                        <p className="font-black text-gray-900">{entry.chain}</p>
                                        <p className="text-[9px] text-gray-400">
                                            {entry.walletCount} wallet{entry.walletCount !== 1 ? "s" : ""} · {fmtUSD(entry.price)}
                                        </p>
                                    </div>
                                </div>

                                {/* Balance rows */}
                                <div className="space-y-2.5 mb-4">
                                    {/* On-chain */}
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">On-Chain</span>
                                        <div className="text-right">
                                            <span className="text-sm font-black text-gray-900">
                                                {fmt(entry.totalOnchainBalance)} {entry.symbol}
                                            </span>
                                            {entry.onchainUSD > 0 && (
                                                <span className="block text-[9px] text-gray-400">{fmtUSD(entry.onchainUSD)}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Liabilities */}
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Liabilities</span>
                                        <div className="text-right">
                                            <span className={`text-sm font-black ${health === "underfunded" ? "text-red-600" : "text-red-500"}`}>
                                                − {fmt(entry.totalUserLiabilities)} {entry.symbol}
                                            </span>
                                            {entry.liabilitiesUSD > 0 && (
                                                <span className="block text-[9px] text-red-300">{fmtUSD(entry.liabilitiesUSD)}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="h-px bg-black/5" />

                                    {/* Sweepable */}
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Sweepable</span>
                                        <div className="text-right">
                                            <span className={`text-sm font-black ${parseFloat(entry.sweepableBalance) > 0 ? "text-green-600" : "text-gray-400"}`}>
                                                {fmt(entry.sweepableBalance)} {entry.symbol}
                                            </span>
                                            {entry.sweepableUSD > 0 && (
                                                <span className="block text-[9px] text-green-400">{fmtUSD(entry.sweepableUSD)}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] text-gray-400">
                                        Synced {timeAgo(entry.lastSyncedAt)}
                                    </span>
                                    <button
                                        onClick={() => canSweep && setSweepTarget(entry)}
                                        disabled={!canSweep}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black transition-all ${canSweep
                                            ? "bg-black text-white hover:bg-gray-800 active:scale-95"
                                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            }`}
                                    >
                                        <ArrowUpRight size={12} />
                                        {entry.locked ? "Locked" : parseFloat(entry.sweepableBalance) > 0 ? "Sweep" : "No Surplus"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </div>

            {/* Solvency Explanation */}
            <div className="flex items-start gap-3 p-4 bg-blue-50/60 border border-blue-100 rounded-2xl text-sm text-blue-800">
                <AlertTriangle size={16} className="mt-0.5 shrink-0 text-blue-400" />
                <div>
                    <p><strong>How balances are calculated:</strong></p>
                    <ul className="mt-1 text-xs space-y-1 text-blue-700 list-disc list-inside">
                        <li><strong>On-Chain Reserves</strong> = sum of <code>UserWallet.lastKnownBalance</code> — updated each time the deposit monitor confirms a transaction</li>
                        <li><strong>User Liabilities</strong> = sum of <code>UserBalance.balance</code> — exactly what users are owed per the internal ledger</li>
                        <li><strong>Sweepable</strong> = Reserves − Liabilities (floored at 0). Only this surplus can be swept safely</li>
                    </ul>
                </div>
            </div>

            {/* Sweep History */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-gray-50">
                    <h2 className="text-sm font-black text-gray-900 uppercase tracking-wider">Sweep Audit Log</h2>
                    <div className="flex items-center gap-2">
                        <Filter size={12} className="text-gray-400" />
                        <select
                            value={historyChainFilter}
                            onChange={e => { setHistoryChainFilter(e.target.value); setHistoryPage(1); }}
                            className="text-xs font-bold text-gray-600 border border-gray-100 rounded-lg px-2 py-1.5 focus:outline-none focus:border-orange-300 bg-white"
                        >
                            <option value="">All Chains</option>
                            {["ETH", "BSC", "SOL", "BTC", "XRP"].map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {loadingHistory ? (
                    <div className="py-12 flex items-center justify-center">
                        <RefreshCw className="animate-spin text-orange-400" size={22} />
                    </div>
                ) : !history || history.sweeps.length === 0 ? (
                    <div className="py-16 text-center">
                        <ShieldAlert className="mx-auto text-gray-200 mb-3" size={40} />
                        <p className="text-gray-400 text-sm">No sweep records yet. This log is immutable for audit purposes.</p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[9px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                                        <th className="px-5 py-3">Chain</th>
                                        <th className="px-5 py-3">Amount</th>
                                        <th className="px-5 py-3">Destination</th>
                                        <th className="px-5 py-3">Status</th>
                                        <th className="px-5 py-3">TX Hash</th>
                                        <th className="px-5 py-3">Time</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {history.sweeps.map(sweep => (
                                        <tr key={sweep.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-5 py-3.5">
                                                <span className={`text-xs font-black ${CHAIN_ACCENT[sweep.chain] || "text-gray-700"}`}>
                                                    {sweep.chain}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3.5 font-mono text-xs font-bold text-gray-800">
                                                {sweep.amount} {sweep.chain}
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <span className="font-mono text-[10px] text-gray-500">
                                                    {sweep.toWallet.slice(0, 8)}…{sweep.toWallet.slice(-6)}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black ${STATUS_STYLES[sweep.status]}`}>
                                                    {STATUS_ICONS[sweep.status]}
                                                    {sweep.status}
                                                </span>
                                                {sweep.error && (
                                                    <p className="text-[9px] text-red-400 mt-0.5 max-w-[160px] truncate" title={sweep.error}>
                                                        {sweep.error}
                                                    </p>
                                                )}
                                            </td>
                                            <td className="px-5 py-3.5">
                                                {sweep.txHash ? (
                                                    <span className="font-mono text-[10px] text-orange-600">
                                                        {sweep.txHash.slice(0, 10)}…
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-300 text-[10px]">—</span>
                                                )}
                                            </td>
                                            <td className="px-5 py-3.5 text-[10px] text-gray-400">
                                                {timeAgo(sweep.createdAt)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-50 text-xs text-gray-400">
                            <span>{history.total} records total</span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setHistoryPage(p => Math.max(1, p - 1))}
                                    disabled={historyPage <= 1}
                                    className="p-1.5 rounded-lg border border-gray-100 hover:bg-gray-50 disabled:opacity-30 transition-all"
                                >
                                    <ChevronLeft size={12} />
                                </button>
                                <span className="font-bold">Page {historyPage} / {history.pages}</span>
                                <button
                                    onClick={() => setHistoryPage(p => Math.min(history.pages, p + 1))}
                                    disabled={historyPage >= history.pages}
                                    className="p-1.5 rounded-lg border border-gray-100 hover:bg-gray-50 disabled:opacity-30 transition-all"
                                >
                                    <ChevronRight size={12} />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Sweep Modal */}
            {sweepTarget && (
                <AdminSweepModal
                    entry={sweepTarget}
                    isOpen={!!sweepTarget}
                    onClose={() => setSweepTarget(null)}
                    onSuccess={() => {
                        setSweepTarget(null);
                        fetchOverview();
                        fetchHistory();
                    }}
                />
            )}
        </div>
    );
}
