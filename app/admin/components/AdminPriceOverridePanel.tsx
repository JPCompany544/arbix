"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DollarSign,
  Plus,
  Trash2,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Edit3,
  X,
} from "lucide-react";
import {
  fetchPriceOverrides,
  setTokenPriceOverride,
  removeTokenPriceOverride,
  togglePriceOverride,
  type TokenPriceOverride,
} from "@/lib/pricing/price-override-client";

// ─── Known tokens for autocomplete ────────────────────────────────────────────
const KNOWN_TOKENS = [
  "BTC", "ETH", "BNB", "SOL", "XRP", "DOGE", "TON", "TRX", "ADA",
  "AVAX", "WBTC", "SHIB", "BCH", "LINK", "DOT", "DAI", "LTC", "NEAR",
  "UNI", "ICP", "FET", "PEPE", "APT", "XLM", "ARB", "OP", "MATIC",
  "ATOM", "FTM", "SUI", "SEI", "TIA", "INJ", "RENDER", "JUP", "PYTH",
  "TAO", "STX", "STETH", "WBETH", "USDT", "USDC",
];

type Toast = { id: string; type: "success" | "error"; message: string };

export default function AdminPriceOverridePanel() {
  const [overrides, setOverrides] = useState<TokenPriceOverride[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Form state
  const [symbol, setSymbol] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [note, setNote] = useState("");
  const [editingSymbol, setEditingSymbol] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Toast state
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: "success" | "error", message: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchPriceOverrides();
      setOverrides(data);
    } catch (e) {
      addToast("error", (e as Error).message || "Failed to load overrides");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => { load(); }, [load]);

  // ─── Autocomplete ───────────────────────────────────────────────────────────
  const handleSymbolChange = (val: string) => {
    const upper = val.toUpperCase();
    setSymbol(upper);
    if (upper.length >= 1) {
      const existing = overrides.map((o) => o.symbol);
      setSuggestions(
        KNOWN_TOKENS.filter(
          (t) => t.startsWith(upper) && !existing.includes(t)
        ).slice(0, 6)
      );
    } else {
      setSuggestions([]);
    }
  };

  // ─── Fill form for editing ──────────────────────────────────────────────────
  const startEdit = (override: TokenPriceOverride) => {
    setEditingSymbol(override.symbol);
    setSymbol(override.symbol);
    setPriceInput(String(override.priceUsd));
    setNote(override.note ?? "");
    setSuggestions([]);
  };

  const clearForm = () => {
    setSymbol("");
    setPriceInput("");
    setNote("");
    setEditingSymbol(null);
    setSuggestions([]);
  };

  // ─── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!symbol.trim()) {
      addToast("error", "Token symbol is required");
      return;
    }

    const price = parseFloat(priceInput);
    if (isNaN(price) || price <= 0) {
      addToast("error", "Enter a valid positive price in USD");
      return;
    }

    const key = `set-${symbol}`;
    setActionLoading(key);
    try {
      await setTokenPriceOverride(symbol, price, note || undefined);
      addToast("success", `Price override set: ${symbol} → $${price.toLocaleString()}`);
      clearForm();
      await load();
    } catch (e) {
      addToast("error", (e as Error).message);
    } finally {
      setActionLoading(null);
    }
  };

  // ─── Toggle active ──────────────────────────────────────────────────────────
  const handleToggle = async (sym: string, currentActive: boolean) => {
    const key = `toggle-${sym}`;
    setActionLoading(key);
    try {
      await togglePriceOverride(sym, !currentActive);
      addToast(
        "success",
        `${sym} override ${!currentActive ? "enabled" : "disabled"}`
      );
      await load();
    } catch (e) {
      addToast("error", (e as Error).message);
    } finally {
      setActionLoading(null);
    }
  };

  // ─── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async (sym: string) => {
    if (!confirm(`Remove price override for ${sym}? This cannot be undone.`)) return;
    const key = `del-${sym}`;
    setActionLoading(key);
    try {
      await removeTokenPriceOverride(sym);
      addToast("success", `Removed override for ${sym}`);
      await load();
    } catch (e) {
      addToast("error", (e as Error).message);
    } finally {
      setActionLoading(null);
    }
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Toast Notifications */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-medium pointer-events-auto
              transition-all duration-300 animate-in slide-in-from-right-4
              ${t.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
              }`}
          >
            {t.type === "success"
              ? <CheckCircle2 size={16} className="text-green-500 shrink-0" />
              : <AlertCircle size={16} className="text-red-500 shrink-0" />
            }
            {t.message}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-start justify-between pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Price Override Control
          </h1>
          <p className="mt-1 text-sm font-medium text-gray-500">
            Manually pin token prices displayed across the platform. Overrides take
            priority over live market data.
          </p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
          title="Refresh"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* ── Left: Form ─────────────────────────────────────────────────────── */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <DollarSign size={16} className="text-orange-500" />
                </div>
                <h2 className="text-sm font-bold text-gray-900">
                  {editingSymbol ? `Edit ${editingSymbol}` : "Set New Override"}
                </h2>
              </div>
              {editingSymbol && (
                <button
                  onClick={clearForm}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  title="Cancel edit"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Symbol */}
              <div className="relative">
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Token Symbol
                </label>
                <input
                  id="price-override-symbol"
                  type="text"
                  value={symbol}
                  onChange={(e) => handleSymbolChange(e.target.value)}
                  onBlur={() => setTimeout(() => setSuggestions([]), 200)}
                  placeholder="e.g. SOL"
                  disabled={!!editingSymbol}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-bold
                    text-gray-900 placeholder:text-gray-300 placeholder:font-normal uppercase
                    focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100
                    transition-all disabled:bg-gray-50 disabled:text-gray-500"
                />
                {/* Autocomplete suggestions */}
                {suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onMouseDown={() => { setSymbol(s); setSuggestions([]); }}
                        className="w-full text-left px-4 py-2.5 text-sm font-semibold text-gray-700
                          hover:bg-orange-50 hover:text-orange-700 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Price (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
                  <input
                    id="price-override-amount"
                    type="number"
                    step="any"
                    min="0"
                    value={priceInput}
                    onChange={(e) => setPriceInput(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-white border border-gray-200 rounded-lg pl-7 pr-4 py-2.5 text-sm font-bold
                      text-gray-900 placeholder:text-gray-300 placeholder:font-normal
                      focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                </div>
                {priceInput && !isNaN(parseFloat(priceInput)) && (
                  <p className="mt-1 text-[11px] text-gray-400 font-medium">
                    Stored as: {Math.floor(parseFloat(priceInput) * 1_000_000).toLocaleString()} (1e6 precision)
                  </p>
                )}
              </div>

              {/* Note */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Admin Note <span className="text-gray-300 font-normal normal-case">(optional)</span>
                </label>
                <input
                  id="price-override-note"
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Reason for override..."
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm
                    text-gray-900 placeholder:text-gray-300
                    focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>

              <button
                id="price-override-submit"
                type="submit"
                disabled={actionLoading?.startsWith("set-")}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 text-white
                  text-sm font-bold rounded-lg hover:bg-orange-600 active:scale-95 transition-all
                  shadow-md shadow-orange-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {actionLoading?.startsWith("set-") ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <Plus size={14} />
                )}
                {editingSymbol ? "Update Override" : "Set Price Override"}
              </button>
            </form>

            {/* Info box */}
            <div className="mt-5 p-3 bg-amber-50 rounded-lg border border-amber-100">
              <p className="text-[11px] text-amber-700 leading-relaxed font-medium">
                <strong>Active overrides</strong> replace live CoinGecko prices across all
                platform views including deposits, withdrawals, and portfolio valuation.
                Inactive overrides are saved but not applied.
              </p>
            </div>
          </div>
        </div>

        {/* ── Right: Table ────────────────────────────────────────────────────── */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900">
                Active Overrides
                <span className="ml-2 px-2 py-0.5 text-[10px] font-black bg-gray-100 text-gray-500 rounded-full">
                  {overrides.length}
                </span>
              </h2>
              {overrides.filter((o) => o.isActive).length > 0 && (
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-green-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  {overrides.filter((o) => o.isActive).length} live
                </span>
              )}
            </div>

            {loading ? (
              <div className="py-16 text-center">
                <RefreshCw size={22} className="animate-spin text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-400">Loading overrides...</p>
              </div>
            ) : overrides.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <DollarSign size={20} className="text-gray-300" />
                </div>
                <p className="text-sm font-medium text-gray-400">No price overrides set</p>
                <p className="text-xs text-gray-300 mt-1">Use the form to create your first override.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-50">
                      <th className="text-left px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400">Token</th>
                      <th className="text-right px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400">Price (USD)</th>
                      <th className="text-left px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400">Note</th>
                      <th className="text-center px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                      <th className="text-center px-4 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {overrides.map((row) => (
                      <tr
                        key={row.id}
                        className={`group transition-colors ${
                          row.isActive ? "hover:bg-orange-50/30" : "opacity-60 hover:bg-gray-50"
                        }`}
                      >
                        {/* Symbol */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-black
                              ${row.isActive ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-400"}`}>
                              {row.symbol.slice(0, 2)}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{row.symbol}</p>
                              <p className="text-[10px] text-gray-400">
                                Updated {new Date(row.updatedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="px-6 py-4 text-right">
                          <span className={`font-bold tabular-nums ${row.isActive ? "text-gray-900" : "text-gray-400"}`}>
                            ${row.priceUsd.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 8,
                            })}
                          </span>
                        </td>

                        {/* Note */}
                        <td className="px-6 py-4">
                          <span className="text-xs text-gray-400 italic truncate max-w-[140px] block">
                            {row.note || "—"}
                          </span>
                        </td>

                        {/* Status toggle */}
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleToggle(row.symbol, row.isActive)}
                            disabled={actionLoading === `toggle-${row.symbol}`}
                            className="inline-flex items-center gap-1.5 transition-transform active:scale-95"
                            title={row.isActive ? "Disable override" : "Enable override"}
                          >
                            {actionLoading === `toggle-${row.symbol}` ? (
                              <RefreshCw size={18} className="animate-spin text-gray-400" />
                            ) : row.isActive ? (
                              <>
                                <ToggleRight size={22} className="text-green-500" />
                                <span className="text-[10px] font-bold text-green-600">ACTIVE</span>
                              </>
                            ) : (
                              <>
                                <ToggleLeft size={22} className="text-gray-300" />
                                <span className="text-[10px] font-bold text-gray-400">OFF</span>
                              </>
                            )}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => startEdit(row)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                              title="Edit override"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(row.symbol)}
                              disabled={actionLoading === `del-${row.symbol}`}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                              title="Remove override"
                            >
                              {actionLoading === `del-${row.symbol}` ? (
                                <RefreshCw size={14} className="animate-spin" />
                              ) : (
                                <Trash2 size={14} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
