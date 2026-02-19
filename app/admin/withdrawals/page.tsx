"use client";

import { useEffect, useState } from "react";

interface Withdrawal {
    id: string;
    userId: string;
    userEmail: string;
    amount: string;
    chain: string;
    walletAddress: string | null;
    status: string;
    date: string;
}

export default function WithdrawalsPage() {
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
    const [loading, setLoading] = useState(true);

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
                setWithdrawals([]);
            }
        } catch (error) {
            console.error("Failed to fetch withdrawals:", error);
            setWithdrawals([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col space-y-1 pb-4 border-b border-gray-100">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Withdrawal Monitor
                </h1>
                <p className="text-sm font-medium text-gray-500">
                    Track all outgoing on-chain movements.
                </p>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Chain</th>
                                <th className="px-6 py-4">Destination Address</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                                        Loading movements...
                                    </td>
                                </tr>
                            ) : withdrawals.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                                        No active withdrawals found
                                    </td>
                                </tr>
                            ) : (
                                withdrawals.map((w) => (
                                    <tr key={w.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{w.userEmail}</td>
                                        <td className="px-6 py-4 text-gray-600 font-bold">{w.chain}</td>
                                        <td className="px-6 py-4 font-mono text-xs text-gray-500 truncate max-w-[200px]">
                                            {w.walletAddress || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-900">
                                            {parseFloat(w.amount).toFixed(6)} {w.chain}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${w.status === 'CONFIRMED'
                                                ? 'bg-green-100 text-green-700'
                                                : w.status === 'BROADCASTED'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {w.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-right">
                                            {new Date(w.date).toLocaleDateString()}
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
