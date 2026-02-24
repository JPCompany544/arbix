"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface TradeActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    symbol: string;
    currentPrice: number;
    initialSide: "buy" | "sell";
}

export default function TradeActionModal({
    isOpen,
    onClose,
    symbol,
    currentPrice,
    initialSide
}: TradeActionModalProps) {
    const [activeSide, setActiveSide] = useState<"buy" | "sell">(initialSide);
    const [tradeType, setTradeType] = useState<"market" | "limit" | "conditional">("market");
    const [amount, setAmount] = useState<string>("");

    // Sync initial side when modal opens
    useEffect(() => {
        if (isOpen) {
            setActiveSide(initialSide);
            setAmount("");
        }
    }, [isOpen, initialSide]);

    if (!isOpen) return null;

    const availableBalance = activeSide === "buy" ? "0.00 USDT" : `0.0000 ${symbol}`;
    const minAmount = 0.0001;
    const minOrderUsdt = 10;

    // Calculate total USDT
    const totalUsdt = amount ? parseFloat(amount) * currentPrice : 0;
    const isValid = parseFloat(amount) >= minAmount && totalUsdt >= minOrderUsdt;

    const percentButtons = ["0%", "25%", "50%", "75%", "100%"];

    return (
        <div className="fixed inset-0 z-[150] flex items-end md:items-center justify-center bg-black/80 backdrop-blur-sm p-0 md:p-4">
            <div className="w-full max-w-lg bg-[#0B0E11] rounded-t-2xl md:rounded-2xl border-t md:border border-white/10 flex flex-col max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom duration-300">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                    <h2 className="text-xl font-black text-white uppercase tracking-tight">
                        {activeSide} {symbol}
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors bg-white/5 rounded-full"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">

                    {/* 1. Buy/Sell Toggle */}
                    <div className="flex p-1 bg-[#171A1E] rounded-xl">
                        <button
                            onClick={() => setActiveSide("buy")}
                            className={`flex-1 py-3 text-sm font-black uppercase tracking-widest rounded-lg transition-all ${activeSide === "buy"
                                    ? "bg-[#16c784] text-black shadow-lg"
                                    : "text-gray-500 hover:text-gray-300"
                                }`}
                        >
                            Buy
                        </button>
                        <button
                            onClick={() => setActiveSide("sell")}
                            className={`flex-1 py-3 text-sm font-black uppercase tracking-widest rounded-lg transition-all ${activeSide === "sell"
                                    ? "bg-[#ea3943] text-white shadow-lg"
                                    : "text-gray-500 hover:text-gray-300"
                                }`}
                        >
                            Sell
                        </button>
                    </div>

                    {/* 2. Trade Types */}
                    <div className="flex gap-2 border-b border-white/5 pb-1">
                        {["market", "limit", "conditional"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setTradeType(type as any)}
                                className={`px-4 py-2 text-xs font-black uppercase tracking-widest transition-all relative ${tradeType === type ? "text-white" : "text-gray-500"
                                    }`}
                            >
                                {type}
                                {tradeType === type && (
                                    <div className="absolute bottom-[-5px] left-0 right-0 h-0.5 bg-orange-500" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* 3. Amount Input */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end px-1">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Amount</label>
                            <span className="text-[11px] font-bold text-gray-400">Available: <span className="text-white">{availableBalance}</span></span>
                        </div>
                        <div className="relative">
                            <input
                                type="number"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-[#171A1E] border border-white/10 rounded-xl px-5 py-4 text-lg font-black font-mono text-white focus:outline-none focus:border-orange-500 transition-all placeholder:text-gray-700 h-[56px]"
                            />
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-3">
                                <span className="text-xs font-black text-gray-500 uppercase">{symbol}</span>
                            </div>
                        </div>
                        <div className="flex justify-between px-1">
                            <span className="text-[10px] font-bold text-gray-500">Min: {minAmount} {symbol}</span>
                            <span className="text-[10px] font-bold text-gray-400 font-mono">≈ ${totalUsdt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT</span>
                        </div>
                    </div>

                    {/* 4. Quick Percent Select */}
                    <div className="grid grid-cols-5 gap-2">
                        {percentButtons.map((pct) => (
                            <button
                                key={pct}
                                className="h-11 bg-white/5 border border-white/5 hover:bg-white/10 text-[10px] font-black text-gray-400 hover:text-white rounded-lg transition-all active:scale-95"
                            >
                                {pct}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/5 bg-[#171A1E]/30 space-y-4">
                    <div className="flex justify-between items-center px-1">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest Italics">Total Order</span>
                        <span className="text-lg font-black text-white font-mono">
                            {totalUsdt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-sm text-gray-500">USDT</span>
                        </span>
                    </div>

                    <button
                        disabled={!isValid}
                        className={`w-full py-4.5 rounded-xl text-sm font-black uppercase tracking-[0.2em] transition-all shadow-xl active:scale-[0.98] h-[56px] border ${isValid
                                ? activeSide === "buy"
                                    ? "bg-[#16c784] hover:bg-[#12a66e] text-black border-transparent"
                                    : "bg-[#ea3943] hover:bg-[#cf2d36] text-white border-transparent"
                                : "bg-white/5 text-gray-600 border-white/5 cursor-not-allowed"
                            }`}
                    >
                        {activeSide} {symbol}
                    </button>

                    {amount && !isValid && (
                        <p className="text-center text-[10px] font-bold text-rose-500 uppercase tracking-wider">
                            Min Order: {minOrderUsdt} USDT Required
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
