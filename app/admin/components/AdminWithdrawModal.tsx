"use client";

import { useState, useEffect } from "react";
import { X, Loader2, AlertCircle, CheckCircle2, ArrowRight, ShieldCheck, Wallet, ExternalLink, User, Layers } from "lucide-react";

interface FundsBreakdown {
    chain: string;
    symbol: string;
    poolBalance: string;
    treasuryBalance: string;
    valueUSD: number;
    treasuryValueUSD: number;
    price: number;
    topHolders: {
        userId: string;
        email: string;
        balance: string;
        usdValue: number;
    }[];
}

export default function AdminWithdrawModal({
    isOpen,
    onClose,
    onSuccess
}: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}) {
    const [step, setStep] = useState(1); // 1: Amount/Chain/Source, 2: Address/Confirm, 3: Success
    const [loading, setLoading] = useState(false);
    const [fetchingBreakdown, setFetchingBreakdown] = useState(true);
    const [breakdown, setBreakdown] = useState<FundsBreakdown[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [selectedChain, setSelectedChain] = useState<string>("");
    const [sourceUserId, setSourceUserId] = useState<string | null>(null); // null = treasury
    const [amount, setAmount] = useState("");
    const [address, setAddress] = useState("");
    const [txHash, setTxHash] = useState("");

    useEffect(() => {
        if (isOpen) {
            fetchBreakdown();
            setStep(1);
            setError(null);
            setSourceUserId(null);
        }
    }, [isOpen]);

    const fetchBreakdown = async () => {
        setFetchingBreakdown(true);
        try {
            const res = await fetch("/api/admin/funds/breakdown");
            const data = await res.json();
            if (res.ok) {
                setBreakdown(data);
                if (data.length > 0) setSelectedChain(data[0].chain);
            }
        } catch (err) {
            console.error("Failed to fetch breakdown", err);
        } finally {
            setFetchingBreakdown(false);
        }
    };

    const handleProceed = async () => {
        const selected = breakdown.find(b => b.chain === selectedChain);
        if (!amount || parseFloat(amount) <= 0) {
            return setError("Please enter a valid amount");
        }

        const sourceLimit = sourceUserId
            ? selected?.topHolders.find(h => h.userId === sourceUserId)?.balance
            : selected?.treasuryBalance;

        if (sourceLimit && parseFloat(amount) > parseFloat(sourceLimit)) {
            return setError(`Insufficient funds in selected source. Available: ${sourceLimit} ${selected?.symbol}.`);
        }

        setError(null);
        setStep(2);
    };

    const handleWithdraw = async () => {
        if (!address) return setError("Destination address is required");

        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/admin/withdraw", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chain: selectedChain,
                    amount,
                    address,
                    sourceUserId
                })
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Withdrawal failed");

            setTxHash(data.txHash);
            setStep(3);
            if (onSuccess) onSuccess();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getExplorerUrl = (chain: string, hash: string) => {
        const isTestnet = true;
        if (chain === 'ETH') return `https://${isTestnet ? 'sepolia.' : ''}etherscan.io/tx/${hash}`;
        if (chain === 'BSC') return `https://${isTestnet ? 'testnet.' : ''}bscscan.com/tx/${hash}`;
        if (chain === 'SOL') return `https://explorer.solana.com/tx/${hash}?cluster=${isTestnet ? 'devnet' : 'mainnet-beta'}`;
        return "#";
    };

    if (!isOpen) return null;

    const selectedData = breakdown.find(b => b.chain === selectedChain);
    const sourceEmail = sourceUserId ? selectedData?.topHolders.find(h => h.userId === sourceUserId)?.email : "Platform Hot Wallet";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 font-sans">
            <div className="bg-white rounded-3xl w-full max-w-[550px] shadow-2xl overflow-hidden relative border border-gray-100 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="bg-gray-50/50 p-6 flex items-center justify-between border-b border-gray-100 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
                            <ShieldCheck className="text-orange-600" size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Admin Treasury Sweep</h3>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Withdrawal Management</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto overflow-x-hidden custom-scrollbar flex-1">
                    {fetchingBreakdown ? (
                        <div className="py-12 flex flex-col items-center justify-center">
                            <Loader2 className="animate-spin text-orange-500 mb-4" size={32} />
                            <p className="text-sm font-medium text-gray-400">Scanning treasury across chains...</p>
                        </div>
                    ) : step === 1 ? (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            {/* 1. Chain Selection */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Step 1: Select Chain</label>
                                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                                    {breakdown.map((item) => (
                                        <button
                                            key={item.chain}
                                            onClick={() => { setSelectedChain(item.chain); setSourceUserId(null); }}
                                            className={`px-4 py-3 rounded-xl border-2 transition-all flex items-center gap-2 shrink-0 ${selectedChain === item.chain
                                                ? "border-orange-500 bg-orange-50/30 text-orange-600"
                                                : "border-gray-100 hover:border-gray-200 text-gray-400"
                                                }`}
                                        >
                                            <span className="text-xs font-black">{item.symbol}</span>
                                            <span className="text-[10px] font-bold">{item.chain}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 2. Source Selection */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Step 2: Select Funding Source</label>
                                <div className="space-y-2 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                                    {/* Treasury Option */}
                                    <button
                                        onClick={() => setSourceUserId(null)}
                                        className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${sourceUserId === null
                                            ? "border-orange-500 bg-orange-50/30"
                                            : "border-gray-50 bg-gray-50/50 hover:border-gray-100"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 text-left">
                                            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white shrink-0">
                                                <Layers size={16} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-900">Platform Hot Wallet (Index 0)</p>
                                                <p className="text-[10px] font-medium text-gray-400">Verified System Treasury</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-black text-gray-900">{parseFloat(selectedData?.treasuryBalance || "0").toFixed(6)} {selectedData?.symbol}</p>
                                            <p className="text-[9px] font-medium text-gray-400">${selectedData?.treasuryValueUSD.toFixed(2)}</p>
                                        </div>
                                    </button>

                                    {/* Top User Pools */}
                                    <div className="pt-2">
                                        <div className="flex items-center gap-2 mb-2 px-1">
                                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">User Deposit Pools</p>
                                            <div className="h-[1px] flex-1 bg-gray-100"></div>
                                        </div>
                                        <div className="space-y-2">
                                            {selectedData?.topHolders.map((holder) => (
                                                <button
                                                    key={holder.userId}
                                                    onClick={() => setSourceUserId(holder.userId)}
                                                    className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${sourceUserId === holder.userId
                                                        ? "border-orange-500 bg-orange-50/30"
                                                        : "border-gray-50 bg-gray-50/50 hover:border-gray-100"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3 text-left">
                                                        <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 shrink-0">
                                                            <User size={16} />
                                                        </div>
                                                        <div className="max-w-[140px]">
                                                            <p className="text-xs font-bold text-gray-900 truncate">{holder.email}</p>
                                                            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter">Custodial Pool</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-xs font-black text-gray-900">{parseFloat(holder.balance).toFixed(6)} {selectedData?.symbol}</p>
                                                        <p className="text-[9px] font-medium text-gray-400">${holder.usdValue.toFixed(2)}</p>
                                                    </div>
                                                </button>
                                            ))}
                                            {selectedData?.topHolders.length === 0 && (
                                                <div className="py-4 text-center text-gray-400 text-xs italic">No user pool detected on this chain.</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Amount Input */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Step 3: Sweep Amount ({selectedData?.symbol})</label>
                                <div className="relative group">
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-lg font-bold text-gray-900 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-gray-300"
                                        placeholder="0.00"
                                    />
                                    <button
                                        onClick={() => setAmount(sourceUserId ? (selectedData?.topHolders.find(h => h.userId === sourceUserId)?.balance || "") : (selectedData?.treasuryBalance || ""))}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-orange-600 uppercase tracking-tighter hover:bg-orange-100 px-2 py-1 rounded transition-colors"
                                    >
                                        Max Source
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-3 text-red-600 text-[11px] font-medium leading-relaxed">
                                    <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <button
                                onClick={handleProceed}
                                className="w-full h-14 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-black/10"
                            >
                                Continue to Destination
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    ) : step === 2 ? (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            {/* Order Summary */}
                            <div className="p-5 bg-orange-50/50 rounded-2xl border border-orange-100">
                                <div className="flex justify-between items-center mb-4 pb-4 border-b border-orange-100/50">
                                    <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider">Withdrawing</span>
                                    <span className="text-lg font-black text-gray-900">{amount} {selectedData?.symbol}</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Chain</span>
                                        <span className="text-xs font-bold text-gray-700">{selectedData?.chain} Mainnet</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Source</span>
                                        <span className="text-xs font-bold text-gray-700 truncate max-w-[200px]">{sourceEmail}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Address Input */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Destination Address</label>
                                <div className="relative">
                                    <Wallet className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:border-orange-500 transition-all font-mono"
                                        placeholder="0x... or Address"
                                    />
                                </div>
                            </div>

                            <p className="text-[10px] text-gray-400 text-center px-4 leading-relaxed">
                                <span className="text-orange-500 font-bold">Security Notice:</span> Administrative withdrawals are logged and irrevokable. Ensure the destination is an approved cold wallet for the platform.
                            </p>

                            {error && (
                                <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-3 text-red-600 text-xs font-bold">
                                    <AlertCircle size={14} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex-1 h-14 border border-gray-200 rounded-2xl text-gray-500 font-bold hover:bg-gray-50 transition-all font-sans"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleWithdraw}
                                    disabled={loading}
                                    className="flex-[2] h-14 bg-orange-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all disabled:opacity-50 active:scale-95 shadow-xl shadow-orange-500/20 font-sans"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Signing...
                                        </>
                                    ) : (
                                        "Confirm & Withdraw"
                                    )}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-300">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="text-green-500" size={40} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-gray-900 mb-2">Withdrawal Initiated</h1>
                                <p className="text-sm text-gray-500 max-w-sm">The sweep of <b>{amount} {selectedData?.symbol}</b> has been broadcasted to the blockchain.</p>
                            </div>

                            <div className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 overflow-hidden">
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 text-left">Transaction Hash</p>
                                <p className="text-[11px] font-mono text-gray-600 bg-white border border-gray-100 p-3 rounded-xl truncate mb-2">{txHash}</p>
                                <a
                                    href={getExplorerUrl(selectedChain, txHash)}
                                    target="_blank"
                                    className="text-[11px] font-bold text-orange-600 hover:underline flex items-center justify-center gap-1"
                                >
                                    View on Explorer <ExternalLink size={12} />
                                </a>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full h-14 bg-black text-white rounded-2xl font-bold flex items-center justify-center hover:bg-gray-800 transition-all font-sans"
                            >
                                Return to Dashboard
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer Notice */}
                <div className="p-4 bg-gray-50/50 border-t border-gray-100 text-center shrink-0">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
                        <ShieldCheck size={10} /> Fully Encrypted Admin Command
                    </p>
                </div>

            </div>
        </div>
    );
}
