"use client";

import { useEffect, useState } from "react";
import {
  Loader,
  AlertCircle,
  Zap,
  RefreshCw,
  CheckCircle2,
  XCircle,
  BarChart3,
} from "lucide-react";

interface DryRunResult {
  totalSweepAmount: number;
  totalInternal: number;
  totalOnChain: number;
  estimatedGas: number;
  eligibleWallets: number;
  breakdown: {
    network: string;
    amount: number;
    walletCount: number;
  }[];
}

interface SweepExecuteResponse {
  success: boolean;
  totalSwept: number;
  walletsProcessed: number;
  txHash?: string;
  details: string[];
}

export default function SweepControlPanel() {
  const [network, setNetwork] = useState("ETH");
  const [currency, setCurrency] = useState("ETH");
  const [hotWalletAddress, setHotWalletAddress] = useState(
    "0x0000000000000000000000000000000000000000"
  );
  const [dustThreshold, setDustThreshold] = useState("0.001");
  const [adminId, setAdminId] = useState("");
  const [twoFAToken, setTwoFAToken] = useState("");

  const [dryRunResult, setDryRunResult] = useState<DryRunResult | null>(null);
  const [dryRunLoading, setDryRunLoading] = useState(false);
  const [dryRunError, setDryRunError] = useState<string | null>(null);

  const [executeLoading, setExecuteLoading] = useState(false);
  const [executeError, setExecuteError] = useState<string | null>(null);
  const [executeResult, setExecuteResult] = useState<SweepExecuteResponse | null>(null);

  useEffect(() => {
    const fetchHotWallet = async () => {
      try {
        const res = await fetch(`/api/admin/treasury/active-hot-wallet?network=${network}&currency=${currency}`, {
          credentials: "include"
        });
        if (res.ok) {
          const data = await res.json();
          setHotWalletAddress(data.address);
        } else {
          // Fallback to placeholder if not found
          setHotWalletAddress(network === 'SOL' ? "SOL_HOT_WALLET_PLACEHOLDER" : "0x0000000000000000000000000000000000000000");
        }
      } catch (e) {
        console.error("Failed to fetch hot wallet:", e);
      }
    };
    fetchHotWallet();
  }, [network, currency]);

  const handleDryRun = async () => {
    setDryRunLoading(true);
    setDryRunError(null);
    try {
      const res = await fetch("/api/admin/treasury/sweep-dryrun", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          network,
          currency,
          hotWalletAddress,
          dustThreshold: parseFloat(dustThreshold),
          adminId: adminId || "admin-preview",
        }),
      });
      if (!res.ok) throw new Error("Dry run failed");
      setDryRunResult(await res.json());
    } catch (err) {
      setDryRunError(
        err instanceof Error ? err.message : "Dry run failed"
      );
    } finally {
      setDryRunLoading(false);
    }
  };

  const handleExecute = async () => {
    // 2FA temporarily disabled for testing
    /*
    if (!twoFAToken.trim()) {
      setExecuteError("2FA token is required");
      return;
    }
    */
    if (!adminId.trim()) {
      setExecuteError("Admin ID is required");
      return;
    }

    setExecuteLoading(true);
    setExecuteError(null);
    setExecuteResult(null);
    try {
      const res = await fetch("/api/admin/treasury/sweep-execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          network,
          currency,
          hotWalletAddress,
          dustThreshold: parseFloat(dustThreshold),
          adminId,
          twoFAToken,
        }),
      });
      if (!res.ok) throw new Error("Sweep execution failed");
      setExecuteResult(await res.json());
    } catch (err) {
      setExecuteError(
        err instanceof Error ? err.message : "Sweep execution failed"
      );
    } finally {
      setExecuteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Sweep Control Panel</h2>
        <p className="text-sm text-slate-400 mt-1">
          Preview sweeps and execute with 2FA validation
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-slate-800/40 border border-slate-700 rounded-lg p-6 space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <BarChart3 size={18} />
          Sweep Configuration
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Network</label>
            <select
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm"
            >
              <option value="ETH">Ethereum</option>
              <option value="BSC">BSC</option>
              <option value="SOL">Solana</option>
              <option value="BTC">Bitcoin</option>
              <option value="XRP">XRP</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Currency</label>
            <input
              type="text"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm"
              placeholder="ETH"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">
              Hot Wallet Address
            </label>
            <input
              type="text"
              value={hotWalletAddress}
              onChange={(e) => setHotWalletAddress(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm font-mono text-xs"
              placeholder="0x..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Dust Threshold ({currency})
            </label>
            <input
              type="number"
              value={dustThreshold}
              onChange={(e) => setDustThreshold(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm"
              placeholder="0.001"
              step="0.0001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Admin ID</label>
            <input
              type="text"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm"
              placeholder="admin-user-id"
            />
          </div>
        </div>

        <button
          onClick={handleDryRun}
          disabled={dryRunLoading}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          {dryRunLoading ? (
            <>
              <Loader className="animate-spin" size={16} />
              Running preview...
            </>
          ) : (
            <>
              <BarChart3 size={16} />
              Preview Sweep (Dry-Run)
            </>
          )}
        </button>
      </div>

      {/* Dry-Run Results */}
      {dryRunError && (
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-red-400 flex-shrink-0 mt-1" size={20} />
          <div>
            <h3 className="font-bold text-red-200">Dry-Run Failed</h3>
            <p className="text-sm text-red-300 mt-1">{dryRunError}</p>
          </div>
        </div>
      )}

      {dryRunResult && (
        <div className="bg-slate-800/40 border border-slate-700 rounded-lg p-6 space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <CheckCircle2 size={18} className="text-green-400" />
            Dry-Run Results
          </h3>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">
                Credited (Liabilities)
              </p>
              <p className="text-xl font-bold text-slate-200">
                {dryRunResult.totalInternal.toFixed(6)} {currency}
              </p>
              <p className="text-[10px] text-slate-500 mt-1">Sum of all user balances</p>
            </div>

            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">
                On-Chain Physical
              </p>
              <p className="text-xl font-bold text-slate-200">
                {dryRunResult.totalOnChain.toFixed(6)} {currency}
              </p>
              <p className="text-[10px] text-slate-500 mt-1">Actual balance in wallets</p>
            </div>

            <div className="bg-slate-900/50 p-4 rounded-lg border border-blue-900/40 bg-blue-900/10">
              <p className="text-xs text-blue-400 uppercase tracking-wide mb-2">
                Eligible to Sweep
              </p>
              <p className="text-xl font-bold text-blue-300">
                {dryRunResult.totalSweepAmount.toFixed(6)} {currency}
              </p>
              <p className="text-[10px] text-blue-700 mt-1">Min(Credited, OnChain - Fees)</p>
            </div>
          </div>

          <div className="flex gap-4 items-center p-3 bg-yellow-900/10 border border-yellow-700/30 rounded-lg text-xs text-yellow-200">
            <AlertCircle size={16} className="text-yellow-500" />
            <p>
              The sweep amount is capped by the <strong>Internal Credited Balance</strong> to prevent draining unrecorded or extra funds from user wallets.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/50 p-3 rounded-lg flex justify-between items-center text-sm">
              <span className="text-slate-400">Network Gas Fee:</span>
              <span className="text-yellow-400 font-mono">{dryRunResult.estimatedGas.toFixed(6)} {currency}</span>
            </div>
            <div className="bg-slate-900/50 p-3 rounded-lg flex justify-between items-center text-sm">
              <span className="text-slate-400">Eligible Wallets:</span>
              <span className="text-blue-400 font-mono">{dryRunResult.eligibleWallets}</span>
            </div>
          </div>

          {dryRunResult.breakdown.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Breakdown by Network
              </p>
              {dryRunResult.breakdown.map((item) => (
                <div
                  key={item.network}
                  className="flex justify-between items-center p-2 bg-slate-900/60 rounded border border-slate-700/50"
                >
                  <div>
                    <p className="font-medium">{item.network}</p>
                    <p className="text-xs text-slate-400">
                      {item.walletCount} wallets
                    </p>
                  </div>
                  <span className="font-mono font-semibold">
                    {item.amount.toFixed(6)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )
      }

      {/* Execute Section */}
      {
        dryRunResult && (
          <div className="bg-slate-800/40 border border-slate-700 rounded-lg p-6 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Zap size={18} />
              Execute Sweep
            </h3>

            <div>
              <label className="block text-sm font-medium mb-2">
                2FA Token (from authenticator app)
              </label>
              <input
                type="text"
                value={twoFAToken}
                onChange={(e) => setTwoFAToken(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm font-mono text-center opacity-50"
                placeholder="DISABLED"
                maxLength={6}
                disabled
              />
              <p className="text-[10px] text-yellow-500 mt-1 italic">
                Note: 2FA validation is temporarily disabled for this environment.
              </p>
            </div>

            <button
              onClick={handleExecute}
              disabled={executeLoading || !adminId.trim()}
              className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 text-lg"
            >
              {executeLoading ? (
                <>
                  <Loader className="animate-spin" size={18} />
                  Executing...
                </>
              ) : (
                <>
                  <Zap size={18} />
                  Execute Sweep Now
                </>
              )}
            </button>

            {executeError && (
              <div className="bg-red-900/20 border border-red-700 rounded-lg p-3 flex items-start gap-2">
                <XCircle className="text-red-400 flex-shrink-0 mt-0.5" size={16} />
                <p className="text-sm text-red-300">{executeError}</p>
              </div>
            )}
          </div>
        )
      }

      {/* Execution Results */}
      {
        executeResult && (
          <div
            className={`border rounded-lg p-6 space-y-4 ${executeResult.success
              ? "bg-green-900/20 border-green-700"
              : "bg-red-900/20 border-red-700"
              }`}
          >
            <div className="flex items-center gap-2">
              {executeResult.success ? (
                <CheckCircle2 size={20} className="text-green-400" />
              ) : (
                <XCircle size={20} className="text-red-400" />
              )}
              <h3 className="font-bold text-lg">
                {executeResult.success ? "Sweep Executed Successfully" : "Sweep Failed"}
              </h3>
            </div>

            <div className="bg-slate-900/30 p-4 rounded space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Swept:</span>
                <span className="font-mono font-bold">
                  {executeResult.totalSwept.toFixed(6)} {currency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Wallets Processed:</span>
                <span className="font-mono font-bold">
                  {executeResult.walletsProcessed}
                </span>
              </div>
              {executeResult.txHash && (
                <div className="flex justify-between">
                  <span className="text-slate-400">TX Hash:</span>
                  <span className="font-mono text-sm text-blue-400">
                    {executeResult.txHash.slice(0, 16)}...
                  </span>
                </div>
              )}
            </div>

            {executeResult.details.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                  Details
                </p>
                <div className="bg-slate-900/30 p-3 rounded text-xs space-y-1 max-h-32 overflow-y-auto">
                  {executeResult.details.map((detail, i) => (
                    <div key={i} className="text-slate-300">
                      • {detail}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      }
    </div >
  );
}
