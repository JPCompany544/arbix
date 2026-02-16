"use client";

import { useEffect, useState } from "react";

interface Transaction {
    id: string;
    userId: string;
    userEmail: string;
    amount: number;
    type: string;
    status: string;
    date: string;
}

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const res = await fetch("/api/admin/transactions");
            const data = await res.json();
            if (Array.isArray(data)) {
                setTransactions(data);
            } else {
                console.error("Transactions API did not return an array:", data);
                setTransactions([]);
            }
        } catch (error) {
            console.error("Failed to fetch transactions:", error);
            setTransactions([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col space-y-1 pb-4 border-b border-gray-100">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Transaction History
                </h1>
                <p className="text-sm font-medium text-gray-500">
                    View and filter all platform transactions.
                </p>
            </div>

            {/* Filters (Placeholder) */}
            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by user email..."
                    className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gray-400 w-64"
                />
                <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gray-400">
                    <option>All Types</option>
                    <option>Deposit</option>
                    <option>Withdrawal</option>
                </select>
                <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gray-400">
                    <option>All Status</option>
                    <option>Completed</option>
                    <option>Pending</option>
                    <option>Failed</option>
                </select>
            </div>


            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                                        Loading transactions...
                                    </td>
                                </tr>
                            ) : transactions.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                                        No transactions found
                                    </td>
                                </tr>
                            ) : (
                                transactions.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-gray-400 text-xs">
                                            {tx.id.substring(0, 12)}...
                                        </td>
                                        <td className="px-6 py-4 text-gray-900 font-medium">{tx.userEmail}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${tx.type === 'DEPOSIT'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-orange-100 text-orange-700'
                                                }`}>
                                                {tx.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-gray-900 font-bold">
                                            {tx.type === 'DEPOSIT' ? '+' : '-'}${tx.amount.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${tx.status === 'COMPLETED'
                                                ? 'bg-green-100 text-green-700'
                                                : tx.status === 'PENDING'
                                                    ? 'bg-yellow-100 text-yellow-700'
                                                    : 'bg-red-100 text-red-700'
                                                }`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-right">
                                            {new Date(tx.date).toLocaleDateString()}
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
