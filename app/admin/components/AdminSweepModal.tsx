"use client";

import { useState } from "react";
import {
    X, ShieldCheck, Loader2, AlertCircle, CheckCircle2,
    Wallet, ArrowUpRight, ExternalLink, AlertTriangle
} from "lucide-react";

interface TreasuryEntry {
    chain: string;
    symbol: string;
    totalOnchainBalance: string;
    totalUserLiabilities: string;
    sweepableBalance: string;
    sweepableUSD: number;
    explorerUrl: string;
}

interface Props {
    entry: TreasuryEntry;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

function fmtUSD(n: number) {
    return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

export default function AdminSweepModal({ entry, isOpen, onClose, onSuccess }: Props) {
    const [amount, setAmount] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<{ txHash: string; amount: string } | null>(null);

    const sweepableNum = parseFloat(entry.sweepableBalance);

    const handleSubmit = async () => {
        if (!address.trim()) return setError("Destination address is required.");
        const amt = amount.trim();
        if (amt && parseFloat(amt) <= 0) return setError("Amount must be greater than 0.");
        if (amt && parseFloat(amt) > sweepableNum) {
            return setError(`Amount exceeds sweepable balance (${sweepableNum} ${entry.symbol}).`);
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/admin/treasury/sweep", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    network: entry.chain,
                    destination_address: address,
                    ...(amt ? { amount: amt } : {}),
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Sweep failed.");

            setSuccess({ txHash: data.txHash, amount: data.amount });
            onSuccess();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const explorerTxUrl = (hash: string) => {
        if (entry.explorerUrl.includes("etherscan")) return `${entry.explorerUrl}/tx/${hash}`;
        if (entry.explorerUrl.includes("bscscan")) return `${entry.explorerUrl}/tx/${hash}`;
        if (entry.explorerUrl.includes("solscan") || entry.explorerUrl.includes("solana")) return `${entry.explorerUrl}/tx/${hash}`;
        return `${entry.explorerUrl}/${hash}`;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-gray-100 overflow-hidden">

                {/* Header */}
                <div className="bg-gray-50/50 p-5 flex items-center justify-between border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center">
                            <ShieldCheck className="text-orange-600" size={18} />
                        </div>
                        <div>
                            <p className="font-black text-gray-900 text-sm">Treasury Sweep</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{entry.chain} Network</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    {success ? (
                        /* ── Success State ── */
                        <div className="py-6 flex flex-col items-center text-center space-y-4 animate-in zoom-in duration-300">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="text-green-500" size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-gray-900">Sweep Complete</h3>
                                <p className="text-sm text-gray-400 mt-1">
                                    {success.amount} {entry.symbol} broadcasted successfully.
                                </p>
                            </div>
                            <div className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-left">
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">TX Hash</p>
                                <p className="font-mono text-xs text-gray-700 truncate">{success.txHash}</p>
                                {entry.explorerUrl && (
                                    <a
                                        href={explorerTxUrl(success.txHash)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-600 hover:underline mt-2"
                                    >
                                        View on Explorer <ExternalLink size={10} />
                                    </a>
                                )}
                            </div>
                            <button
                                onClick={onClose}
                                className="w-full h-12 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition-all text-sm"
                            >
                                Done
                            </button>
                        </div>
                    ) : (
                        /* ── Input State ── */
                        <>
                            {/* Balance Summary */}
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-4 space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="font-bold text-gray-500">On-Chain Reserves</span>
                                    <span className="font-black text-gray-900">{parseFloat(entry.totalOnchainBalance).toFixed(6)} {entry.symbol}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="font-bold text-red-400">User Liabilities</span>
                                    <span className="font-black text-red-500">− {parseFloat(entry.totalUserLiabilities).toFixed(6)} {entry.symbol}</span>
                                </div>
                                <div className="h-px bg-green-200/60" />
                                <div className="flex justify-between text-sm">
                                    <span className="font-black text-green-700">Sweepable Balance</span>
                                    <div className="text-right">
                                        <span className="font-black text-green-700">{parseFloat(entry.sweepableBalance).toFixed(6)} {entry.symbol}</span>
                                        <p className="text-[10px] text-green-500">{fmtUSD(entry.sweepableUSD)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Solvency Warning */}
                            <div className="flex items-start gap-2 text-[11px] text-amber-700 bg-amber-50 border border-amber-100 rounded-xl p-3">
                                <AlertTriangle size={13} className="mt-0.5 text-amber-500 shrink-0" />
                                <span>The server will reject any amount that would breach user liabilities. Only the sweepable balance is transferable.</span>
                            </div>

                            {/* Amount Input */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount ({entry.symbol}) — leave blank for full sweepable</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={e => setAmount(e.target.value)}
                                        placeholder={sweepableNum.toFixed(6)}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-base font-bold text-gray-900 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 transition-all"
                                    />
                                    <button
                                        onClick={() => setAmount(entry.sweepableBalance)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase text-orange-600 hover:bg-orange-50 px-2 py-1 rounded-lg transition-colors"
                                    >
                                        Max
                                    </button>
                                </div>
                            </div>

                            {/* Destination Address */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Destination Address</label>
                                <div className="relative">
                                    <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                        placeholder="Cold wallet address…"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-5 py-3.5 text-sm font-bold text-gray-900 font-mono focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="flex items-start gap-2 text-[11px] font-bold text-red-600 bg-red-50 border border-red-100 rounded-xl p-3">
                                    <AlertCircle size={13} className="mt-0.5 shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3 pt-1">
                                <button
                                    onClick={onClose}
                                    className="flex-1 h-12 border border-gray-200 rounded-2xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading || !address.trim()}
                                    className="flex-[2] h-12 bg-orange-500 text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-orange-500/20"
                                >
                                    {loading ? (
                                        <><Loader2 size={16} className="animate-spin" /> Executing…</>
                                    ) : (
                                        <><ArrowUpRight size={16} /> Confirm Sweep</>
                                    )}
                                </button>
                            </div>

                            <p className="text-[9px] text-center text-gray-300 font-bold uppercase tracking-widest">
                                Secured · Audited · Non-Destructive to User Balances
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
