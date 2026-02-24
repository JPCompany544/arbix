"use client";

import { X, ChevronDown, Check, QrCode, CreditCard, ArrowUpRight, History, Wallet, Copy, ExternalLink, RefreshCw } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePortfolio } from "@/context/PortfolioContext";
import Image from "next/image";
import TokenLogo from "./TokenLogo";

type Token = {
    symbol: string;
    name: string;
    networks: string[];
    // balance: string; // Removed, fetched dynamically
};

const TOKENS: Token[] = [
    { symbol: "BTC", name: "Bitcoin", networks: ["Bitcoin", "BEP20"] },
    { symbol: "ETH", name: "Ethereum", networks: ["ERC20", "Arbitrum One", "Optimism"] },
    { symbol: "USDT", name: "Tether USD", networks: ["TRC20", "ERC20", "BEP20", "Solana"] },
    { symbol: "TRX", name: "TRON", networks: ["TRON"] },
    { symbol: "USDC", name: "USD Coin", networks: ["ERC20", "Solana", "Polygon"] },
    { symbol: "TON", name: "Toncoin", networks: ["TON"] },
    { symbol: "BNB", name: "BNB", networks: ["BEP20", "BEP2"] },
    { symbol: "SOL", name: "Solana", networks: ["Solana"] },
    { symbol: "XRP", name: "XRP", networks: ["Ripple"] },
    { symbol: "ADA", name: "Cardano", networks: ["Cardano"] },
    { symbol: "DOGE", name: "Dogecoin", networks: ["Dogecoin"] },
];

export default function DepositModal() {
    const { isModalOpen, closeModal, selectedToken, setSelectedToken } = useModal();
    const { user } = useAuth();
    const { refetch } = usePortfolio();

    // Refresh portfolio when modal closes
    useEffect(() => {
        if (!isModalOpen && refetch) {
            refetch();
        }
    }, [isModalOpen, refetch]);

    // UI State
    const { activeTab, setActiveTab } = useModal();
    const [selectedNetwork, setSelectedNetwork] = useState<string>("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    // Data State
    const [balance, setBalance] = useState<string>("0.0");
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Withdraw Form State
    const [withdrawAddress, setWithdrawAddress] = useState("");
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [withdrawStatus, setWithdrawStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
    const [withdrawError, setWithdrawError] = useState("");
    const activeRequestRef = useRef(0);

    // Get current token details or default
    const currentToken = TOKENS.find(t => t.symbol === selectedToken) || TOKENS[0];

    // Helper to map network names to API chain IDs
    const getChainId = (network: string, symbol: string) => {
        // Simple mapping logic - expand as needed
        if (network === "ERC20" || network === "Ethereum") return "ETH";
        if (network === "BEP20" || network === "BNB Smart Chain") return "BSC";
        if (network === "Solana") return "SOL";
        if (network === "Bitcoin") return "BTC";
        if (network === "Ripple") return "XRP";

        // Fallback or specific overrides
        if (symbol === "ETH") return "ETH";
        if (symbol === "BNB") return "BSC";
        if (symbol === "SOL") return "SOL";
        if (symbol === "BTC") return "BTC";
        if (symbol === "XRP") return "XRP";
        return null;
    };

    // Reset state when token/network changes
    useEffect(() => {
        if (isModalOpen) {
            setSelectedNetwork(currentToken.networks[0]);
            setWalletAddress(null);
            setBalance("0.0");
            setWithdrawStatus('idle');
            setWithdrawAddress("");
            setWithdrawAmount("");
        }
    }, [isModalOpen, selectedToken, currentToken]);

    // Fetch Data
    useEffect(() => {
        if (!isModalOpen || !user || !selectedNetwork) return;

        const chain = getChainId(selectedNetwork, currentToken.symbol);
        if (!chain) {
            setWalletAddress(null);
            return;
        }

        const fetchData = async () => {
            const requestId = ++activeRequestRef.current;
            setLoading(true);

            // Immediately clear address on new fetch if it's the first attempt for this selection
            // We usually do this in the dependencies effect, but let's be safe
            if (activeTab === 'deposit') setWalletAddress(null);

            try {
                const userId = user.id || "demo-user";

                // 1. Fetch Balance
                const balRes = await fetch(`/api/wallet/balance?chain=${chain}&userId=${userId}`);
                if (balRes.ok && requestId === activeRequestRef.current) {
                    const balData = await balRes.json();
                    setBalance(balData.balanceHuman || "0.0");
                }

                // 2. Fetch Address (if Deposit)
                if (activeTab === 'deposit') {
                    const addrRes = await fetch(`/api/wallet/address?chain=${chain}&userId=${userId}`);
                    if (requestId === activeRequestRef.current) {
                        if (addrRes.ok) {
                            const addrData = await addrRes.json();
                            setWalletAddress(addrData.address);
                        } else {
                            setWalletAddress(null);
                        }
                    }
                }

                // 3. Fetch History (if Activity)
                if (activeTab === 'activity') {
                    const txRes = await fetch(`/api/wallet/transactions?chain=${chain}&userId=${userId}`);
                    if (txRes.ok && requestId === activeRequestRef.current) {
                        const txData = await txRes.json();
                        setTransactions(txData.transactions || []);
                    }
                }

            } catch (error) {
                console.error("Wallet data fetch error:", error);
            } finally {
                if (requestId === activeRequestRef.current) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        // Poll for updates every 10s if open
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);

    }, [isModalOpen, user, selectedNetwork, currentToken, activeTab]);

    const handleCopy = () => {
        if (walletAddress) {
            navigator.clipboard.writeText(walletAddress);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleWithdraw = async () => {
        if (!user) return;
        const chain = getChainId(selectedNetwork, currentToken.symbol);
        if (!chain) {
            setWithdrawError("Network not supported for withdrawal");
            return;
        }

        setWithdrawStatus('pending');
        setWithdrawError("");

        try {
            const res = await fetch('/api/wallet/withdraw', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id || "demo-user",
                    chain,
                    to: withdrawAddress,
                    amount: withdrawAmount
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Withdrawal failed");
            }

            setWithdrawStatus('success');
            refetch();
            // successes handled by UI feedback
        } catch (error: any) {
            setWithdrawError(error.message);
            setWithdrawStatus('error');
        }
    };

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl h-auto max-h-[90vh] lg:h-[550px] flex flex-col lg:flex-row overflow-hidden overflow-y-auto lg:overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200 custom-scrollbar">
                {/* Close Button */}
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                {/* Left Container - Selection & Config */}
                <div className="w-full lg:w-1/2 p-6 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col h-auto lg:h-full bg-white">
                    {/* Tabs */}
                    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg mb-6">
                        {(['deposit', 'withdraw', 'activity'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-1.5 px-3 rounded-md text-[11px] font-bold uppercase tracking-wide transition-all ${activeTab === tab
                                    ? "bg-white text-black shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="border border-gray-200 rounded-xl p-5 flex flex-col h-full relative">
                        {/* Header */}
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-0.5 capitalize">
                                    {activeTab} {currentToken.symbol}
                                </h2>
                                <div className="flex items-center gap-1.5">
                                    <span className={`w-1.5 h-1.5 rounded-full ${getChainId(selectedNetwork, currentToken.symbol) ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></span>
                                    <span className="text-[10px] font-medium text-green-600 uppercase tracking-wider">
                                        {getChainId(selectedNetwork, currentToken.symbol) ? 'Network Operational' : 'Devnet Mode'}
                                    </span>
                                </div>
                            </div>
                            {/* Balance Info */}
                            <div className="text-right">
                                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">Available Balance</span>
                                <span className="text-xs font-black text-gray-900">{balance} {currentToken.symbol}</span>
                            </div>
                        </div>

                        {/* Token Selection & Network Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            {/* Token Select */}
                            <div className="relative">
                                <label className="block text-[9px] font-bold text-gray-400 mb-1 pointer-events-none uppercase tracking-wide">Asset</label>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="w-full flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 hover:border-orange-500 hover:ring-1 hover:ring-orange-500/20 transition-all group"
                                >
                                    <div className="flex items-center gap-2">
                                        <TokenLogo symbol={currentToken.symbol} size={20} className="border border-orange-200" />
                                        <span className="text-xs font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{currentToken.symbol}</span>
                                    </div>
                                    <ChevronDown className="w-3 h-3 text-gray-400" />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-lg shadow-xl max-h-48 overflow-y-auto z-20 custom-scrollbar">
                                        {TOKENS.map((token) => (
                                            <button
                                                key={token.symbol}
                                                onClick={() => {
                                                    setSelectedToken(token.symbol);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <TokenLogo symbol={token.symbol} size={18} />
                                                    <span className="font-bold text-xs text-gray-700">{token.name}</span>
                                                </div>
                                                {currentToken.symbol === token.symbol && <Check className="w-3 h-3 text-orange-500" />}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Network Select */}
                            <div className="relative">
                                <label className="block text-[9px] font-bold text-gray-400 mb-1 uppercase tracking-wide">Network</label>
                                <button
                                    onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}
                                    className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2 hover:border-orange-500 hover:ring-1 hover:ring-orange-500/20 transition-all"
                                >
                                    <span className="text-xs font-bold text-gray-900 truncate pr-1">{selectedNetwork}</span>
                                    <ChevronDown className="w-3 h-3 text-gray-400 flex-shrink-0" />
                                </button>
                                {isNetworkDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-lg shadow-xl z-20 overflow-hidden max-h-[140px] overflow-y-auto custom-scrollbar">
                                        {currentToken.networks.map((net) => (
                                            <button
                                                key={net}
                                                onClick={() => {
                                                    setSelectedNetwork(net);
                                                    setIsNetworkDropdownOpen(false);
                                                }}
                                                className="w-full text-left px-3 py-2 text-xs font-bold text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 flex justify-between items-center"
                                            >
                                                {net}
                                                {selectedNetwork === net && <Check className="w-3 h-3 text-orange-500" />}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Actions / Tips */}
                        <div className="mt-auto">
                            {activeTab === 'deposit' && (
                                <div className="bg-orange-50/50 border border-orange-100 rounded-lg p-3 flex gap-2.5 items-start">
                                    <div className="w-4 h-4 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-[9px] flex-shrink-0 mt-0.5">!</div>
                                    <p className="text-[10px] text-orange-800 leading-snug font-medium">
                                        Send only <span className="font-bold">{currentToken.symbol}</span> to this address. Sending other coins may result in loss.
                                    </p>
                                </div>
                            )}

                            {activeTab === 'withdraw' && (
                                <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 flex gap-2.5 items-start">
                                    <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[9px] flex-shrink-0 mt-0.5">i</div>
                                    <p className="text-[10px] text-blue-800 leading-snug font-medium">
                                        Withdrawals are processed automatically. Ensure the destination address supports {selectedNetwork}.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Container - Dynamic Content */}
                <div className="w-full lg:w-1/2 bg-gray-50 p-6 flex flex-col relative overflow-hidden min-h-[250px] lg:h-full">

                    {/* DEPOSIT VIEW */}
                    {activeTab === 'deposit' && (
                        <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in duration-300">
                            {loading && !walletAddress ? (
                                <div className="flex flex-col items-center">
                                    <RefreshCw className="w-8 h-8 text-orange-500 animate-spin mb-4" />
                                    <p className="text-xs font-bold text-gray-500 italic">Generating Secure Address...</p>
                                </div>
                            ) : walletAddress ? (
                                <>
                                    <div
                                        key={`${selectedToken}-${selectedNetwork}`}
                                        className="w-full max-w-[320px] animate-in fade-in slide-in-from-bottom-2 duration-300"
                                    >
                                        <p className="text-[10px] uppercase font-bold text-gray-400 mb-2 flex justify-between">
                                            <span>Deposit Address</span>
                                            {copied && <span className="text-green-500 animate-in fade-in slide-in-from-right-2">Copied!</span>}
                                        </p>
                                        <button
                                            onClick={handleCopy}
                                            className={`w-full flex items-center gap-3 bg-white border ${copied ? 'border-green-500 ring-2 ring-green-500/10' : 'border-gray-200 hover:border-orange-400'} rounded-xl p-4 shadow-sm group transition-all active:scale-[0.98] text-left overflow-hidden relative`}
                                        >
                                            <div className="flex-1 min-w-0">
                                                <code className={`text-[11px] font-mono ${copied ? 'text-green-600' : 'text-gray-900'} break-all leading-relaxed`}>
                                                    {walletAddress}
                                                </code>
                                            </div>
                                            <div className={`p-2 rounded-lg flex-shrink-0 transition-colors ${copied ? 'bg-green-50' : 'bg-gray-50 group-hover:bg-orange-50'}`}>
                                                {copied ? (
                                                    <Check className="w-4 h-4 text-green-600" />
                                                ) : (
                                                    <Copy className="w-4 h-4 text-gray-400 group-hover:text-orange-500" />
                                                )}
                                            </div>
                                        </button>
                                        {loading && (
                                            <div className="mt-2 flex items-center justify-center gap-2">
                                                <RefreshCw className="w-3 h-3 text-orange-500 animate-spin" />
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Syncing...</span>
                                            </div>
                                        )}
                                        <p className="mt-3 text-[10px] text-gray-400 font-medium italic">
                                            Tap address to copy to clipboard
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-400">
                                        <Wallet className="w-6 h-6" />
                                    </div>
                                    <p className="text-sm font-bold text-gray-900 mb-1">No Address Found</p>
                                    <p className="text-xs text-gray-500 max-w-[200px]">Network may not be supported yet or services are currently offline.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* WITHDRAW VIEW */}
                    {activeTab === 'withdraw' && (
                        <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
                            <h3 className="text-sm font-black text-gray-900 mb-6">Withdraw Details</h3>

                            <div className="space-y-4 flex-1">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 mb-1.5 uppercase">Destination Address</label>
                                    <input
                                        type="text"
                                        value={withdrawAddress}
                                        onChange={(e) => setWithdrawAddress(e.target.value)}
                                        placeholder={`Enter ${currentToken.symbol} address`}
                                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-medium focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all font-mono"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-gray-500 mb-1.5 uppercase">Amount</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={withdrawAmount}
                                            onChange={(e) => setWithdrawAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="w-full bg-white border border-gray-200 rounded-lg pl-3 pr-12 py-2.5 text-xs font-medium focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">
                                            {currentToken.symbol}
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-1 text-[9px]">
                                        <span className="text-gray-400">Fee: ~0.0001 {currentToken.symbol}</span>
                                        <button
                                            onClick={() => setWithdrawAmount(balance)}
                                            className="text-orange-600 font-bold hover:underline"
                                        >
                                            Max: {balance}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Status Message */}
                            {withdrawError && (
                                <div className="mb-4 p-2 bg-red-50 border border-red-100 rounded text-[10px] text-red-600 font-medium">
                                    {withdrawError}
                                </div>
                            )}

                            {withdrawStatus === 'success' && (
                                <div className="mb-4 p-2 bg-green-50 border border-green-100 rounded text-[10px] text-green-600 font-medium flex items-center gap-2">
                                    <Check className="w-3 h-3" /> Withdrawal Submitted!
                                </div>
                            )}

                            <button
                                onClick={handleWithdraw}
                                disabled={withdrawStatus === 'pending' || parseFloat(balance) <= 0 || !withdrawAddress}
                                className="w-full bg-black text-white py-3 rounded-xl font-bold text-xs hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                            >
                                {withdrawStatus === 'pending' ? (
                                    <>Processing...</>
                                ) : (
                                    <>Confirm Withdrawal <ArrowUpRight className="w-3 h-3" /></>
                                )}
                            </button>
                        </div>
                    )}

                    {/* ACTIVITY VIEW */}
                    {activeTab === 'activity' && (
                        <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
                            <h3 className="text-sm font-black text-gray-900 mb-4 flex items-center justify-between">
                                <span>Recent Activity</span>
                                <button className="text-[10px] text-orange-600 font-bold hover:underline flex items-center gap-1">
                                    Explorer <ExternalLink className="w-2.5 h-2.5" />
                                </button>
                            </h3>

                            <div className="flex-1 overflow-y-auto custom-scrollbar -mr-2 pr-2">
                                {loading ? (
                                    <div className="flex flex-col items-center justify-center h-40">
                                        <RefreshCw className="w-5 h-5 text-gray-300 animate-spin mb-2" />
                                    </div>
                                ) : transactions.length > 0 ? (
                                    <div className="space-y-2">
                                        {transactions.map((tx) => (
                                            <div key={tx.id || tx.txHash} className="bg-white border border-gray-100 p-3 rounded-lg flex items-center justify-between shadow-sm hover:border-orange-100 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.direction === 'INBOUND' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                                        }`}>
                                                        {tx.direction === 'INBOUND' ? <ArrowUpRight className="w-4 h-4 rotate-180" /> : <ArrowUpRight className="w-4 h-4" />}
                                                    </div>
                                                    <div>
                                                        <div className="text-[11px] font-bold text-gray-900">
                                                            {tx.direction === 'INBOUND' ? 'Received' : 'Sent'} {tx.amountHuman || tx.amount}
                                                        </div>
                                                        <div className="text-[9px] font-medium text-gray-400 uppercase">
                                                            {tx.status} • {new Date(tx.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                                <a
                                                    href="#" // Link to explorer
                                                    target="_blank"
                                                    className="text-gray-300 hover:text-orange-500 transition-colors"
                                                >
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                                        <History className="w-8 h-8 mb-2 opacity-20" />
                                        <p className="text-[10px] font-medium">No transactions found</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
