"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Loader2, Clock, AlertCircle } from "lucide-react";

interface Withdrawal {
    id: string;
    userId: string;
    userEmail: string;
    amount: number;
    chain: string;
    walletAddress: string;
    status: string;
    date: string;
    processedAt: string | null;
}

export default function WithdrawalsPage() {
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);
    const [actionSuccess, setActionSuccess] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>("ALL");

    useEffect(() => {
        fetchWithdrawals();
    }, []);

    // Auto-dismiss success/error messages
    useEffect(() => {
        if (actionSuccess) {
            const t = setTimeout(() => setActionSuccess(null), 4000);
            return () => clearTimeout(t);
        }
    }, [actionSuccess]);

    useEffect(() => {
        if (actionError) {
            const t = setTimeout(() => setActionError(null), 6000);
            return () => clearTimeout(t);
        }
    }, [actionError]);

    const fetchWithdrawals = async () => {
        try {
            const res = await fetch("/api/admin/withdrawals");
            const data = await res.json();
            if (Array.isArray(data)) {
                setWithdrawals(data);
            } else {
                setWithdrawals([]);
            }
        } catch (error) {
            console.error("Failed to fetch withdrawals:", error);
            setWithdrawals([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id: string, status: "APPROVED" | "REJECTED") => {
        setActionLoading(id);
        setActionError(null);
        setActionSuccess(null);

        try {
            const res = await fetch(`/api/admin/withdrawals/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Action failed");
            }

            setActionSuccess(
                status === "APPROVED"
                    ? `Withdrawal approved and executed. TX: ${data.txHash || 'Submitted'}`
                    : "Withdrawal rejected. User balance restored."
            );

            // Refresh list
            await fetchWithdrawals();
        } catch (err: any) {
            setActionError(err.message);
        } finally {
            setActionLoading(null);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'PENDING':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock size={10} /> Pending
                    </span>
                );
            case 'APPROVED':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-blue-50 text-blue-700 border border-blue-200">
                        <CheckCircle size={10} /> Approved
                    </span>
                );
            case 'COMPLETED':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-green-50 text-green-700 border border-green-200">
                        <CheckCircle size={10} /> Completed
                    </span>
                );
            case 'REJECTED':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-red-50 text-red-700 border border-red-200">
                        <XCircle size={10} /> Rejected
                    </span>
                );
            case 'FAILED':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-gray-100 text-gray-600 border border-gray-200">
                        <AlertCircle size={10} /> Failed
                    </span>
                );
            default:
                return (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-gray-100 text-gray-500">
                        {status}
                    </span>
                );
        }
    };

    const filteredWithdrawals = filter === "ALL"
        ? withdrawals
        : withdrawals.filter(w => w.status === filter);

    const pendingCount = withdrawals.filter(w => w.status === 'PENDING').length;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-gray-100 gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            Withdrawal Requests
                        </h1>
                        {pendingCount > 0 && (
                            <span className="bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">
                                {pendingCount} pending
                            </span>
                        )}
                    </div>
                    <p className="text-sm font-medium text-gray-500 mt-1">
                        Review and approve or reject user withdrawal requests.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                    {["ALL", "PENDING", "COMPLETED", "REJECTED"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wide transition-all ${
                                filter === f
                                    ? "bg-white text-gray-900 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            {f === "ALL" ? `All (${withdrawals.length})` : f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Status Messages */}
            {actionSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700 text-sm font-medium animate-in slide-in-from-top-2 duration-300">
                    <CheckCircle size={18} />
                    {actionSuccess}
                </div>
            )}
            {actionError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm font-medium animate-in slide-in-from-top-2 duration-300">
                    <AlertCircle size={18} />
                    {actionError}
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Token</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Destination Address</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Requested</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                                        <Loader2 className="animate-spin inline-block mr-2" size={16} />
                                        Loading withdrawal requests...
                                    </td>
                                </tr>
                            ) : filteredWithdrawals.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                                        No {filter !== "ALL" ? filter.toLowerCase() : ""} withdrawal requests found
                                    </td>
                                </tr>
                            ) : (
                                filteredWithdrawals.map((w) => (
                                    <tr key={w.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-medium text-gray-900 text-xs">{w.userEmail}</div>
                                                <div className="text-[10px] text-gray-400 font-mono truncate max-w-[120px]">{w.userId}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-gray-900">{w.chain}</span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-900">
                                            {typeof w.amount === 'number' ? w.amount.toFixed(6) : w.amount} {w.chain}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-xs text-gray-500 truncate block max-w-[180px]" title={w.walletAddress}>
                                                {w.walletAddress}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(w.status)}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-xs">
                                            <div>{new Date(w.date).toLocaleDateString()}</div>
                                            <div className="text-[10px] text-gray-400">{new Date(w.date).toLocaleTimeString()}</div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {w.status === 'PENDING' ? (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleAction(w.id, "APPROVED")}
                                                        disabled={actionLoading === w.id}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg text-[11px] font-bold hover:bg-green-700 transition-colors disabled:opacity-50 shadow-sm"
                                                    >
                                                        {actionLoading === w.id ? (
                                                            <Loader2 size={12} className="animate-spin" />
                                                        ) : (
                                                            <CheckCircle size={12} />
                                                        )}
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(w.id, "REJECTED")}
                                                        disabled={actionLoading === w.id}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-red-200 text-red-600 rounded-lg text-[11px] font-bold hover:bg-red-50 transition-colors disabled:opacity-50"
                                                    >
                                                        {actionLoading === w.id ? (
                                                            <Loader2 size={12} className="animate-spin" />
                                                        ) : (
                                                            <XCircle size={12} />
                                                        )}
                                                        Reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-gray-400 italic">
                                                    {w.processedAt ? new Date(w.processedAt).toLocaleString() : '—'}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
