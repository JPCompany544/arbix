"use client";

import { useEffect, useState } from "react";

interface Withdrawal {
    id: string;
    userId: string;
    userEmail: string;
    amount: number;
    walletAddress: string | null;
    status: string;
    date: string;
}

export default function WithdrawalsPage() {
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState<string | null>(null);

    useEffect(() => {
        fetchWithdrawals();
    }, []);

    const fetchWithdrawals = async () => {
        try {
            const res = await fetch("/api/admin/withdrawals");
            const data = await res.json();
            if (Array.isArray(data)) {
                setWithdrawals(data);
            } else {
                console.error("Withdrawals API did not return an array:", data);
                setWithdrawals([]);
            }
        } catch (error) {
            console.error("Failed to fetch withdrawals:", error);
            setWithdrawals([]);
        } finally {
            setLoading(false);
        }
    };

    const updateWithdrawal = async (id: string, status: string) => {
        setProcessing(id);
        try {
            await fetch(`/api/admin/withdrawals/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            await fetchWithdrawals(); // Refresh list
        } catch (error) {
            console.error("Failed to update withdrawal:", error);
        } finally {
            setProcessing(null);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col space-y-1 pb-4 border-b border-gray-100">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Withdrawal Requests
                </h1>
                <p className="text-sm font-medium text-gray-500">
                    Manage and approve pending withdrawals.
                </p>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Wallet Address</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                                        Loading withdrawals...
                                    </td>
                                </tr>
                            ) : withdrawals.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                                        No pending withdrawals
                                    </td>
                                </tr>
                            ) : (
                                withdrawals.map((w) => (
                                    <tr key={w.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{w.userEmail}</td>
                                        <td className="px-6 py-4 font-mono text-xs text-gray-500 truncate max-w-[150px]">
                                            {w.walletAddress || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-900">${w.amount.toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${w.status === 'PENDING'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : w.status === 'APPROVED'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                                }`}>
                                                {w.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(w.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {w.status === 'PENDING' ? (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => updateWithdrawal(w.id, 'APPROVED')}
                                                        disabled={processing === w.id}
                                                        className="px-3 py-1 bg-green-600 text-white rounded text-xs font-bold hover:bg-green-700 transition-colors shadow-sm disabled:opacity-50"
                                                    >
                                                        {processing === w.id ? 'Processing...' : 'Approve'}
                                                    </button>
                                                    <button
                                                        onClick={() => updateWithdrawal(w.id, 'REJECTED')}
                                                        disabled={processing === w.id}
                                                        className="px-3 py-1 bg-white border border-gray-200 text-red-600 rounded text-xs font-bold hover:bg-red-50 hover:border-red-200 transition-colors disabled:opacity-50"
                                                    >
                                                        {processing === w.id ? 'Processing...' : 'Reject'}
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-xs font-bold text-gray-400">Completed</span>
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
