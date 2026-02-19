"use client";

import { useEffect, useState, use } from "react";
import { Loader2, ArrowDownLeft, ArrowUpRight, ArrowRightLeft, DollarSign, CheckCircle, AlertCircle, Clock } from "lucide-react";


// Define the shape of our transaction data
interface Transaction {
    id: string;
    type: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER" | "EARNING";
    amount: string | number;
    chain?: string;
    status: string;
    txHash?: string;
    explorerUrl?: string | null;
    createdAt: string;
    to?: string;
    source: "chain" | "ledger";
    usdAmount?: number;
}

const statusColors: Record<string, string> = {
    COMPLETED: "text-green-500",
    CONFIRMED: "text-green-500",
    PENDING: "text-yellow-500",
    BROADCASTED: "text-blue-500",
    FAILED: "text-red-500",
    REJECTED: "text-red-500",
};

const typeIcons = {
    DEPOSIT: ArrowDownLeft,
    WITHDRAWAL: ArrowUpRight,
    TRANSFER: ArrowRightLeft,
    EARNING: DollarSign,
};

export default function HistoryTypePage({ params }: { params: Promise<{ type: string }> }) {
    const { type } = use(params); // Unwrapping params in Next 15+ or generally safe
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            setError("");
            try {
                // Determine the correct API endpoint type parameter
                // The API expects 'deposits', 'withdrawals', 'transfers', 'earnings', or 'all'
                const res = await fetch(`/api/history?type=${type}`);
                if (!res.ok) throw new Error("Failed to fetch history");
                const data = await res.json();
                setTransactions(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load transactions. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [type]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Loader2 className="w-10 h-10 animate-spin mb-4 text-orange-500" />
                <p>Loading transactions...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-red-400">
                <AlertCircle className="w-10 h-10 mb-4" />
                <p>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (transactions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <Clock className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-medium text-white mb-1">No transactions found</h3>
                <p className="text-sm">You haven't made any {type === 'all' ? 'transactions' : type} yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold capitalize text-white">{type === 'all' ? 'All Transactions' : type}</h1>
                <span className="text-sm text-gray-400">{transactions.length} entries</span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-xs font-bold text-gray-500 uppercase border-b border-white/10">
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3 text-right">Details</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {transactions.map((tx) => {
                            const Icon = typeIcons[tx.type] || Clock;
                            const isPositive = tx.type === "DEPOSIT" || tx.type === "EARNING";
                            const formattedDate = new Date(tx.createdAt).toLocaleString();
                            const statusColor = statusColors[tx.status] || "text-gray-400";

                            return (
                                <tr key={tx.id} className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isPositive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                                                }`}>
                                                <Icon size={16} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm text-white">{tx.type}</div>
                                                <div className="text-xs text-gray-500">{tx.chain || "Internal"}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 font-mono font-medium text-sm text-white">
                                        <div className="flex flex-col">
                                            <span className={isPositive ? "text-green-400" : "text-white"}>
                                                {isPositive ? "+" : "-"}{Number(tx.amount).toFixed(6)} {tx.chain}
                                            </span>
                                            {tx.usdAmount !== undefined && (
                                                <span className="text-xs text-gray-500 mt-1">
                                                    ≈ ${tx.usdAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className={`flex items-center gap-1.5 text-xs font-bold ${statusColor}`}>
                                            {tx.status === "COMPLETED" || tx.status === "CONFIRMED" ? <CheckCircle size={12} /> :
                                                tx.status === "FAILED" ? <AlertCircle size={12} /> :
                                                    <Clock size={12} />}
                                            {tx.status}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-xs font-medium text-gray-400">
                                        {formattedDate}
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        {tx.explorerUrl && (
                                            <a
                                                href={tx.explorerUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs font-bold text-orange-500 hover:text-orange-400 hover:underline"
                                            >
                                                View Explorer
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
