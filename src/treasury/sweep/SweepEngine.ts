import { prisma } from "../../../lib/prisma";
import { providerRegistry } from "../../../core/provider-registry";
import { TreasuryService } from "../TreasuryService";
import EvmAdapter from "./evmAdapter";
import SolAdapter from "./solAdapter";

export type ChainAdapter = {
  getBalance(address: string): Promise<bigint>;
  estimateFee(params: { to: string; value: bigint }): Promise<bigint>;
  send(params: { from: string; to: string; value: bigint }): Promise<{ txHash: string }>;
  getTransactionStatus?(txHash: string): Promise<{ status: "PENDING" | "CONFIRMED" | "FAILED" }>;
};

export type SweepEngineConfig = {
  chainAdapter?: ChainAdapter;
  validate2FA?: (adminId: string, token?: string) => Promise<boolean>;
  rateLimitMs?: number;
};

export class SweepEngine {
  private svc: TreasuryService;
  private cfg: SweepEngineConfig;

  constructor(cfg: SweepEngineConfig = {}) {
    this.svc = new TreasuryService();
    this.cfg = { rateLimitMs: 2000, ...cfg };
  }

  private async defaultRpcHealthCheck(network: string): Promise<boolean> {
    try {
      console.log(`[SweepEngine] Checking health for ${network}...`);
      if (network === "ETH" || network === "BSC") {
        const p = providerRegistry.getEvmProvider(network as any);
        // Race with a timeout
        await Promise.race([
          p.getBlockNumber(),
          new Promise((_, r) => setTimeout(() => r(new Error("RPC Timeout")), 15000))
        ]);
        console.log(`[SweepEngine] ${network} RPC is healthy.`);
        return true;
      }
      if (network === "SOL") {
        const c = providerRegistry.getSolanaConnection();
        await c.getSlot();
        console.log(`[SweepEngine] ${network} RPC is healthy.`);
        return true;
      }
      return true;
    } catch (e: any) {
      console.warn(`[SweepEngine] Health check failed for ${network}:`, e.message);
      return false;
    }
  }

  async sweepAll(params: {
    network: string;
    currency: string;
    hotWalletAddress: string;
    dustThreshold: bigint;
    adminId: string;
    twoFAToken?: string;
    batchSize?: number;
    dryRun?: boolean;
  }) {
    const { network, currency, hotWalletAddress, dustThreshold, adminId, twoFAToken, batchSize = 20, dryRun = false } = params;

    // 2FA (Skip check for dryRun if wanted, but safest to keep if adminId is checked)
    if (!dryRun && this.cfg.validate2FA) {
      const ok = await this.cfg.validate2FA(adminId, twoFAToken);
      if (!ok) throw new Error("2FA validation failed");
    }

    // RPC health
    const healthy = await this.defaultRpcHealthCheck(network);
    if (!healthy) throw new Error(`${network} RPC is currently unreachable`);

    // Fetch wallets to sweep from UserWallet (the deposit addresses)
    // We only sweep wallets that actually have a balance registered in our DB
    const wallets = await prisma.userWallet.findMany({
      where: {
        chain: network,
        lastKnownBalance: { not: "0" }
      }
    });

    let adapter = this.cfg.chainAdapter;
    if (!adapter) {
      if (network === 'ETH' || network === 'BSC') {
        const evm = new EvmAdapter();
        evm.chain = network as any;
        adapter = evm;
      } else if (network === 'SOL') {
        adapter = new SolAdapter();
      }
    }

    const processed: Array<{ address: string; txHash?: string; amount: string; status: string }> = [];
    let totalAmount = 0n;

    for (const w of wallets.slice(0, batchSize)) {
      try {
        // get on-chain balance
        let balance: bigint;
        if (adapter) {
          balance = await adapter.getBalance(w.address);
        } else {
          // Fallback for EVM if no adapter
          const p = providerRegistry.getEvmProvider(network as any);
          const b = await p.getBalance(w.address);
          balance = b;
        }

        if (balance <= dustThreshold) continue;

        // get internal balance (what we actually owe the user)
        const userBalance = await prisma.userBalance.findUnique({
          where: { userId_chain: { userId: w.userId, chain: network } }
        });
        const internalBal = BigInt(userBalance?.balance || "0");

        // estimate fee
        let fee: bigint;
        if (adapter) {
          fee = await adapter.estimateFee({ to: hotWalletAddress, value: balance });
        } else {
          const p = providerRegistry.getEvmProvider(network as any);
          const feeData = await p.getFeeData();
          fee = 21000n * (feeData.gasPrice || 1000000000n);
        }

        // Calculation: Sweep only what was CREDITED, but cannot exceed on-chain minus fees
        let sweepAmount = internalBal;
        const maxPossible = balance > fee ? balance - fee : 0n;
        if (sweepAmount > maxPossible) {
          sweepAmount = maxPossible;
        }

        if (sweepAmount <= 0n) continue;
        totalAmount += sweepAmount;

        if (dryRun) {
          processed.push({ address: w.address, amount: sweepAmount.toString(), status: "ELIGIBLE" });
        } else {
          // Rate limit between real transactions
          if (this.cfg.rateLimitMs) await new Promise(r => setTimeout(r, this.cfg.rateLimitMs));

          // Record Sweep Intent
          const sweepRec = await prisma.sweep.create({
            data: {
              chain: network,
              amount: sweepAmount.toString(),
              amountRaw: balance.toString(),
              fromWallet: w.address,
              toWallet: hotWalletAddress,
              initiatedBy: adminId,
              status: 'BROADCASTING'
            }
          });

          // Execute
          if (!adapter) throw new Error(`No adapter for ${network}`);

          try {
            const { txHash } = await adapter.send({
              from: w.address,
              to: hotWalletAddress,
              value: sweepAmount
            });

            // Update records - SUCCESS
            await prisma.sweep.update({
              where: { id: sweepRec.id },
              data: { status: 'CONFIRMED', txHash }
            });

            // Update UserWallet baseline to prevent double-count in monitor
            await prisma.userWallet.update({
              where: { id: w.id },
              data: { lastKnownBalance: "0" }
            });

            // Accounting Ledger entry
            await this.svc.journalSweep(w.address, sweepAmount, adminId, network);

            processed.push({ address: w.address, txHash, amount: sweepAmount.toString(), status: "SUCCESS" });
          } catch (sendError: any) {
            // Update records - FAILURE
            await prisma.sweep.update({
              where: { id: sweepRec.id },
              data: { status: 'FAILED', error: sendError.message }
            });
            throw sendError; // Rethrow to outer catch
          }
        }
      } catch (e: any) {
        console.error(`[SweepEngine] Error sweeping ${w.address}:`, e.message);
        processed.push({ address: w.address, amount: "0", status: `FAILED: ${e.message}` });
      }
    }

    return {
      processed,
      totalAmount: totalAmount.toString(),
      walletCount: processed.length
    };
  }
}

export default SweepEngine;
