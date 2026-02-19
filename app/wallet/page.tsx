"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";

type Chain = "ETH" | "BSC" | "SOL" | "BTC" | "XRP";
type TxStatus = "PENDING" | "BROADCASTED" | "CONFIRMED" | "FAILED";
type TxDirection = "INBOUND" | "OUTBOUND";

interface ChainConfig {
    chain: Chain;
    symbol: string;
}

interface WalletData {
    address: string;
    balance: string;
    balanceHuman: string;
    symbol: string;
}

interface Transaction {
    id: string;
    chain: string;
    txHash: string | null;
    amount: string;
    to: string;
    status: TxStatus;
    direction: TxDirection;
    createdAt: string;
    confirmedAt: string | null;
    symbol?: string; // Optional symbol override from API
}

export default function WalletPage() {
    const [userId, setUserId] = useState("cmls3zx810000uqo2h7j7bwej"); // Default to testnet seed
    const [selectedChain, setSelectedChain] = useState<Chain>("ETH");
    const [supportedChains, setSupportedChains] = useState<ChainConfig[]>([]);
    const [wallet, setWallet] = useState<WalletData | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);
    const [withdrawing, setWithdrawing] = useState(false);
    const [status, setStatus] = useState<{ mode: string; isMainnet: boolean; testUserId?: string } | null>(null);

    // Withdraw form
    const [withdrawTo, setWithdrawTo] = useState("");
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [withdrawError, setWithdrawError] = useState("");
    const [withdrawSuccess, setWithdrawSuccess] = useState("");

    const [error, setError] = useState<string | null>(null);

    // Fetch wallet data
    const fetchWalletData = async (chain: Chain) => {
        if (!userId) return;
        setLoading(true);
        setError(null);
        try {
            // Get address
            const addrRes = await fetch(`/api/wallet/address?chain=${chain}&userId=${userId}`);
            if (!addrRes.ok) {
                const errData = await addrRes.json();
                throw new Error(errData.error || "Failed to generate/fetch address");
            }
            const addrData = await addrRes.json();

            // Get balance
            const balRes = await fetch(`/api/wallet/balance?chain=${chain}&userId=${userId}`);
            if (!balRes.ok) throw new Error("Failed to fetch balance");
            const balData = await balRes.json();

            setWallet({
                address: addrData.address,
                balance: balData.balance,
                balanceHuman: balData.balanceHuman,
                symbol: balData.symbol
            });

            // Get transactions
            const txRes = await fetch(`/api/wallet/transactions?chain=${chain}&userId=${userId}&limit=20`);
            const txData = await txRes.json();
            setTransactions(txData.transactions || []);

        } catch (e: any) {
            console.error("Fetch error:", e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle withdraw
    const handleWithdraw = async (e: React.FormEvent) => {
        e.preventDefault();
        setWithdrawError("");
        setWithdrawSuccess("");

        if (!withdrawTo || !withdrawAmount) {
            setWithdrawError("Please fill in all fields");
            return;
        }

        if (parseFloat(withdrawAmount) <= 0) {
            setWithdrawError("Amount must be greater than 0");
            return;
        }

        if (wallet && parseFloat(withdrawAmount) > parseFloat(wallet.balanceHuman)) {
            setWithdrawError("Insufficient balance");
            return;
        }

        setWithdrawing(true);

        try {
            const res = await fetch("/api/wallet/withdraw", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    chain: selectedChain,
                    to: withdrawTo,
                    amount: withdrawAmount
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Withdrawal failed");
            }

            setWithdrawSuccess(`Withdrawal initiated! TX ID: ${data.txId}`);
            setWithdrawTo("");
            setWithdrawAmount("");

            // Refresh wallet data
            await fetchWalletData(selectedChain);

        } catch (error: any) {
            setWithdrawError(error.message);
        } finally {
            setWithdrawing(false);
        }
    };

    // Copy to clipboard
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    // Initial load
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const [configRes, statusRes] = await Promise.all([
                    fetch("/api/wallet/config"),
                    fetch("/api/status")
                ]);
                const configData = await configRes.json();
                const statusData = await statusRes.json();

                if (configData.chains) setSupportedChains(configData.chains);
                setStatus(statusData);
                if (statusData.testUserId) setUserId(statusData.testUserId);
            } catch (e) { }
        };
        fetchConfig();
    }, []);

    // Fetch wallet when chain or user changes
    useEffect(() => {
        if (userId) fetchWalletData(selectedChain);
    }, [selectedChain, userId]);

    // Auto-refresh
    useEffect(() => {
        const interval = setInterval(() => {
            fetchWalletData(selectedChain);
        }, 15000); // Refresh every 15 seconds

        return () => clearInterval(interval);
    }, [selectedChain]);

    // Status indicator
    const getStatusColor = (status: TxStatus) => {
        switch (status) {
            case "CONFIRMED": return "bg-green-100 text-green-800";
            case "BROADCASTED": return "bg-blue-100 text-blue-800";
            case "PENDING": return "bg-yellow-100 text-yellow-800";
            case "FAILED": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusIcon = (status: TxStatus) => {
        switch (status) {
            case "CONFIRMED": return "✅";
            case "BROADCASTED": return "🔄";
            case "PENDING": return "⏳";
            case "FAILED": return "❌";
            default: return "⚪";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Wallet Management</h1>
                        <p className="text-gray-600 mt-2">Manage your multi-chain wallet balances and transactions</p>
                    </div>
                    {status && (
                        <div className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${status.isMainnet
                            ? "bg-red-100 text-red-700 border border-red-200"
                            : "bg-green-100 text-green-700 border border-green-200"
                            }`}>
                            ● {status.mode.toUpperCase()} MODE
                        </div>
                    )}
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="mr-2">⚠</span>
                            <span>{error}</span>
                        </div>
                        <button
                            onClick={() => window.location.href = "/signup"}
                            className="text-sm font-bold underline"
                        >
                            Sign Up instead
                        </button>
                    </div>
                )}

                {/* Chain Selector */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Chain</label>
                    <div className="flex gap-4">
                        {supportedChains.map((c) => (
                            <button
                                key={c.chain}
                                onClick={() => setSelectedChain(c.chain)}
                                className={`px-6 py-3 rounded-lg font-medium transition-colors ${selectedChain === c.chain
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {c.symbol}
                            </button>
                        ))}
                    </div>
                </div>

                {loading && !wallet ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-600">Loading wallet...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Wallet Info & Deposit */}
                        <div className="space-y-6">
                            {/* Balance Card */}
                            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                                <div className="text-sm opacity-90 mb-2">Available Balance</div>
                                <div className="text-4xl font-bold mb-4">
                                    {wallet?.balanceHuman || "0"} {wallet?.symbol || selectedChain}
                                </div>
                                <div className="text-xs opacity-75">
                                    {wallet?.balance || "0"} smallest units
                                </div>
                            </div>

                            {/* Deposit Address */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Deposit Address</h3>
                                <div className="bg-gray-50 p-4 rounded border border-gray-200">
                                    <div className="text-xs text-gray-600 mb-2">Send {selectedChain} to this address:</div>
                                    <div className="flex items-center justify-between">
                                        <code className="text-sm text-gray-900 break-all flex-1">
                                            {wallet?.address || "Loading..."}
                                        </code>
                                        <button
                                            onClick={() => wallet && copyToClipboard(wallet.address)}
                                            className="ml-4 px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                                        >
                                            Copy
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-4 text-sm text-gray-600">
                                    <span className="font-medium">Note:</span> Deposits require confirmations:
                                    ETH (12 blocks), BSC (5 blocks), SOL (finalized)
                                </div>
                            </div>

                            {/* Withdraw Form */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Withdraw</h3>
                                <form onSubmit={handleWithdraw} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Recipient Address
                                        </label>
                                        <input
                                            type="text"
                                            value={withdrawTo}
                                            onChange={(e) => setWithdrawTo(e.target.value)}
                                            placeholder={`Enter ${selectedChain} address`}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            disabled={withdrawing}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Amount ({wallet?.symbol || selectedChain})
                                        </label>
                                        <input
                                            type="number"
                                            step="any"
                                            value={withdrawAmount}
                                            onChange={(e) => setWithdrawAmount(e.target.value)}
                                            placeholder="0.0"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            disabled={withdrawing}
                                        />
                                        <div className="mt-1 text-sm text-gray-500">
                                            Available: {wallet?.balanceHuman || "0"} {wallet?.symbol || selectedChain}
                                        </div>
                                    </div>

                                    {withdrawError && (
                                        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                                            {withdrawError}
                                        </div>
                                    )}

                                    {withdrawSuccess && (
                                        <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm">
                                            {withdrawSuccess}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={withdrawing || !wallet || parseFloat(wallet.balanceHuman) === 0}
                                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {withdrawing ? "Processing..." : "Withdraw"}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Transaction History */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
                            </div>
                            <div className="divide-y divide-gray-200 max-h-[800px] overflow-y-auto">
                                {transactions.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500">
                                        No transactions yet
                                    </div>
                                ) : (
                                    transactions.map((tx) => (
                                        <div key={tx.id} className="p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start gap-3 flex-1">
                                                    <div className="text-2xl">{getStatusIcon(tx.status)}</div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${tx.direction === "INBOUND"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-blue-100 text-blue-800"
                                                                }`}>
                                                                {tx.direction === "INBOUND" ? "📥 Deposit" : "📤 Withdrawal"}
                                                            </span>
                                                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${tx.status === "CONFIRMED" ? "bg-green-100 text-green-800" :
                                                                tx.status === "BROADCASTED" ? "bg-yellow-100 text-yellow-800" :
                                                                    tx.status === "PENDING" ? "bg-blue-100 text-blue-800" :
                                                                        "bg-red-100 text-red-800"
                                                                }`}>
                                                                {tx.status}
                                                            </span>
                                                        </div>
                                                        <div className="text-sm font-medium text-gray-900 mb-1">
                                                            {tx.amount} {supportedChains.find(c => c.chain === tx.chain)?.symbol || tx.chain}
                                                        </div>
                                                        {tx.txHash && (
                                                            <div className="text-xs text-gray-500 truncate">
                                                                Hash: {tx.txHash.substring(0, 20)}...
                                                            </div>
                                                        )}
                                                        <div className="text-xs text-gray-400 mt-1">
                                                            {new Date(tx.createdAt).toLocaleString()}
                                                            {tx.confirmedAt && ` • Confirmed ${new Date(tx.confirmedAt).toLocaleString()}`}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
