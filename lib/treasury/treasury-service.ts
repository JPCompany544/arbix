/**
 * Treasury Service — Production Sweep Engine
 *
 * SOURCE OF TRUTH:
 *   - On-Chain Reserves  = SUM(UserWallet.lastKnownBalance) per chain
 *                          (maintained in real-time by the deposit monitor)
 *   - User Liabilities   = SUM(UserBalance.balance) per chain
 *                          (credited atomically on each confirmed deposit)
 *   - Sweepable Balance  = Reserves − Liabilities  (floored at 0)
 *
 * WHY lastKnownBalance instead of live RPC calls?
 *   - The deposit monitor already keeps lastKnownBalance in sync per block
 *   - Live RPC calls per-wallet on every dashboard load = slow + unreliable
 *   - lastKnownBalance is the authoritative cached value the platform operates on
 *   - For the sweep executor, a fresh live check IS done per source wallet
 */

import { prisma } from "@/lib/prisma";
import { chainFactory } from "@/core/chain-factory";
import { networkConfig } from "@/core/network-config";
import type { SupportedChain } from "@/lib/wallet/types";

const SUPPORTED_CHAINS: SupportedChain[] = ["ETH", "BSC", "SOL", "BTC", "XRP"];

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TreasuryOverviewEntry {
    chain: SupportedChain;
    symbol: string;
    totalOnchainBalance: string;    // human readable
    totalUserLiabilities: string;   // human readable
    sweepableBalance: string;       // human readable
    onchainRaw: bigint;
    liabilitiesRaw: bigint;
    sweepableRaw: bigint;
    lastSyncedAt: Date;
    locked: boolean;
    explorerUrl: string;
    walletCount: number;            // number of active wallets
}

export interface SweepParams {
    chain: SupportedChain;
    amount?: string;          // human-readable; if omitted = full sweepable
    destinationAddress: string;
    adminUserId: string;
}

export interface SweepResult {
    sweepId: string;
    txHash: string;
    amount: string;
    chain: SupportedChain;
}

// ─── Treasury Sync ────────────────────────────────────────────────────────────

/**
 * Sync a single chain's TreasuryState row.
 *
 * On-chain reserves = SUM(UserWallet.lastKnownBalance) for all wallets on chain.
 * This is maintained by the tx-monitor and deposit scanners in real time.
 *
 * User liabilities  = SUM(UserBalance.balance) — credited on confirmed deposits,
 *                     debited on confirmed withdrawals.
 */
export async function syncChain(chain: SupportedChain): Promise<void> {
    const chainImpl = chainFactory.getChain(chain);

    // 1. Determine On-Chain Reserves
    // For shared-wallet chains (XRP, BTC), we use the system address balance.
    // For HD-wallet chains (ETH, BSC, SOL), we sum unique user wallet balances.

    let totalOnchainRaw = 0n;

    if (chain === "XRP" || chain === "BTC") {
        const sysAddr = networkConfig.getSystemAddress(chain);
        if (sysAddr) {
            try {
                const liveBal = await chainImpl.getBalance(sysAddr);
                totalOnchainRaw = BigInt(liveBal);
            } catch (e) {
                console.error(`[Treasury] Failed to fetch live balance for shared chain ${chain}:`, e);
                // Fallback: For shared, we can't easily sum user rows because they represent contributions, not current total
                // So we try to find the last known balance for any wallet having that address
                const wallet = await prisma.userWallet.findFirst({
                    where: { chain, address: sysAddr }
                });
                totalOnchainRaw = BigInt(wallet?.lastKnownBalance || "0");
            }
        }
    } else {
        // Unique addresses (ETH, BSC, SOL)
        const wallets = await prisma.userWallet.findMany({
            where: {
                chain,
                NOT: { address: "ADDRESS_NOT_GENERATED_YET" }
            },
            select: { address: true, lastKnownBalance: true }
        });

        const uniqueAddresses = new Map<string, bigint>();
        for (const w of wallets) {
            // Favor unique addresses to avoid double counting if any logic error exists
            const addr = w.address.toLowerCase();
            const bal = BigInt(w.lastKnownBalance || "0");
            // In these chains, one address belongs to exactly one user record usually
            uniqueAddresses.set(addr, bal);
        }

        for (const bal of uniqueAddresses.values()) {
            totalOnchainRaw += bal;
        }
    }

    // 2. Sum user liabilities from UserBalance table (exact platform ledger)
    const userBalances = await prisma.userBalance.findMany({ where: { chain } });
    const totalLiabilitiesRaw = userBalances.reduce(
        (acc, b) => {
            try {
                return acc + BigInt(b.balance || "0");
            } catch {
                return acc;
            }
        },
        0n
    );

    // 3. Sweepable = reserves − liabilities (floor to 0; never go negative)
    const sweepableRaw = totalOnchainRaw > totalLiabilitiesRaw
        ? totalOnchainRaw - totalLiabilitiesRaw
        : 0n;

    console.log(`[Treasury] Sync ${chain}: OnChain=${chainImpl.toHumanUnit(totalOnchainRaw)}, Liabilities=${chainImpl.toHumanUnit(totalLiabilitiesRaw)}, Sweepable=${chainImpl.toHumanUnit(sweepableRaw)}`);

    await prisma.treasuryState.upsert({
        where: { chain },
        create: {
            chain,
            totalOnchainBalance: totalOnchainRaw.toString(),
            totalUserLiabilities: totalLiabilitiesRaw.toString(),
            sweepableBalance: sweepableRaw.toString(),
            lastSyncedAt: new Date(),
            locked: false,
        },
        update: {
            totalOnchainBalance: totalOnchainRaw.toString(),
            totalUserLiabilities: totalLiabilitiesRaw.toString(),
            sweepableBalance: sweepableRaw.toString(),
            lastSyncedAt: new Date(),
        }
    });
}

/**
 * Sync all chains — best-effort parallel, per-chain errors don't block others.
 */
export async function syncAllChains(): Promise<void> {
    await Promise.allSettled(
        SUPPORTED_CHAINS.map(chain =>
            syncChain(chain).catch(e => {
                console.error(`[Treasury] Sync failed for ${chain}:`, e);
            })
        )
    );
}

// ─── Overview ─────────────────────────────────────────────────────────────────

export async function getTreasuryOverview(): Promise<TreasuryOverviewEntry[]> {
    // Sync state from DB (fast — no RPC calls)
    await syncAllChains();

    const states = await prisma.treasuryState.findMany();

    // Get wallet counts per chain for context
    const walletCounts = await prisma.userWallet.groupBy({
        by: ["chain"],
        where: { NOT: { address: "ADDRESS_NOT_GENERATED_YET" } },
        _count: { id: true }
    });
    const countMap: Record<string, number> = {};
    for (const wc of walletCounts) {
        countMap[wc.chain] = wc._count.id;
    }

    return SUPPORTED_CHAINS.map(chain => {
        const chainImpl = chainFactory.getChain(chain);
        const state = states.find(s => s.chain === chain);

        const onchainRaw = state ? BigInt(state.totalOnchainBalance) : 0n;
        const liabilitiesRaw = state ? BigInt(state.totalUserLiabilities) : 0n;
        const sweepableRaw = state ? BigInt(state.sweepableBalance) : 0n;

        return {
            chain,
            symbol: chainImpl.getSymbol(),
            totalOnchainBalance: chainImpl.toHumanUnit(onchainRaw),
            totalUserLiabilities: chainImpl.toHumanUnit(liabilitiesRaw),
            sweepableBalance: chainImpl.toHumanUnit(sweepableRaw),
            onchainRaw,
            liabilitiesRaw,
            sweepableRaw,
            lastSyncedAt: state?.lastSyncedAt ?? new Date(),
            locked: state?.locked ?? false,
            explorerUrl: networkConfig.getExplorerUrl(chain),
            walletCount: countMap[chain] ?? 0,
        };
    });
}

// ─── Sweep Execution ──────────────────────────────────────────────────────────

/**
 * Execute a treasury sweep with full solvency validation and mutex locking.
 *
 * Before sweeping, we do a live RPC call on candidate wallets to confirm
 * real on-chain balance, not just cached lastKnownBalance.
 */
export async function executeSweep(params: SweepParams): Promise<SweepResult> {
    const { chain, destinationAddress, adminUserId } = params;
    const chainImpl = chainFactory.getChain(chain);

    // ── 1. Validate destination address ───────────────────────────────────────
    if (!chainImpl.isValidAddress(destinationAddress)) {
        throw new Error(`Invalid destination address for ${chain}: ${destinationAddress}`);
    }

    // ── 2. Fresh sync then read current state ─────────────────────────────────
    await syncChain(chain);

    const state = await prisma.treasuryState.findUnique({ where: { chain } });
    if (!state) throw new Error(`No treasury state found for ${chain}`);
    if (state.locked) {
        throw new Error(`Treasury for ${chain} is currently locked by another operation. Try again later.`);
    }

    // ── 3. Compute sweepable amount ────────────────────────────────────────────
    const onchainRaw = BigInt(state.totalOnchainBalance);
    const liabilitiesRaw = BigInt(state.totalUserLiabilities);
    const sweepableRaw = onchainRaw > liabilitiesRaw ? onchainRaw - liabilitiesRaw : 0n;

    if (sweepableRaw === 0n) {
        throw new Error(
            `No sweepable balance on ${chain}. ` +
            `On-chain reserves (${chainImpl.toHumanUnit(onchainRaw)} ${chain}) ` +
            `do not exceed user liabilities (${chainImpl.toHumanUnit(liabilitiesRaw)} ${chain}).`
        );
    }

    // Determine amount to sweep
    let amountRaw: bigint;
    let amountHuman: string;

    if (params.amount) {
        amountRaw = chainImpl.toSmallestUnit(params.amount);
        amountHuman = params.amount;
    } else {
        amountRaw = sweepableRaw;
        amountHuman = chainImpl.toHumanUnit(sweepableRaw);
    }

    // ── 4. Solvency guard ──────────────────────────────────────────────────────
    if (amountRaw > sweepableRaw) {
        throw new Error(
            `Solvency violation: requested ${chainImpl.toHumanUnit(amountRaw)} ${chain} ` +
            `but only ${chainImpl.toHumanUnit(sweepableRaw)} ${chain} is sweepable. ` +
            `On-chain reserves must stay >= user liabilities.`
        );
    }

    // ── 5. Find source wallet with sufficient balance (live RPC check) ─────────
    const wallets = await prisma.userWallet.findMany({
        where: {
            chain,
            NOT: { address: "ADDRESS_NOT_GENERATED_YET" }
        },
        orderBy: { derivationIndex: "asc" }
    });

    let sourceWalletUserId: string | null = null;
    let sourceAddress: string | null = null;

    for (const wallet of wallets) {
        try {
            // Live RPC balance check for sweep source confirmation
            const balStr = await chainImpl.getBalance(wallet.address);
            if (BigInt(balStr) >= amountRaw) {
                sourceWalletUserId = wallet.userId;
                sourceAddress = wallet.address;
                break;
            }
        } catch { }
    }

    if (!sourceWalletUserId || !sourceAddress) {
        throw new Error(
            `No single wallet found on ${chain} with sufficient live balance for ${amountHuman} ${chain}. ` +
            `Funds may be spread across multiple deposit wallets — consolidation required first.`
        );
    }

    // ── 6. Acquire lock ───────────────────────────────────────────────────────
    await prisma.treasuryState.update({
        where: { chain },
        data: { locked: true, lockedAt: new Date(), lockedBy: adminUserId }
    });

    // ── 7. Create sweep record ─────────────────────────────────────────────────
    const sweepRecord = await prisma.sweep.create({
        data: {
            chain,
            amount: amountHuman,
            amountRaw: amountRaw.toString(),
            fromWallet: sourceAddress,
            toWallet: destinationAddress,
            status: "BROADCASTING",
            initiatedBy: adminUserId,
        }
    });

    try {
        // ── 8. Execute on-chain transaction ───────────────────────────────────
        console.log(`[Treasury] Sweeping ${amountHuman} ${chain} from ${sourceAddress} → ${destinationAddress}`);

        const result = await chainImpl.sendWithdrawal({
            userId: sourceWalletUserId,
            to: destinationAddress,
            value: amountHuman,
        });

        if (!result.txHash) throw new Error("Chain module returned no txHash");

        // ── 9. Mark confirmed ─────────────────────────────────────────────────
        await prisma.sweep.update({
            where: { id: sweepRecord.id },
            data: {
                txHash: result.txHash,
                status: "CONFIRMED",
                confirmedAt: new Date(),
            }
        });

        // Update source wallet's lastKnownBalance in DB immediately to prevent stale state
        try {
            const freshBal = await chainImpl.getBalance(sourceAddress);
            await prisma.userWallet.update({
                where: { userId_chain: { userId: sourceWalletUserId, chain } },
                data: { lastKnownBalance: freshBal }
            });
        } catch (e) {
            console.warn(`[Treasury] Post-sweep balance update failed for ${sourceAddress}:`, e);
        }

        // Re-sync treasury state post-sweep
        await syncChain(chain);

        console.log(`[Treasury] ✅ Sweep confirmed: ${result.txHash}`);
        return { sweepId: sweepRecord.id, txHash: result.txHash, amount: amountHuman, chain };

    } catch (error: any) {
        console.error(`[Treasury] ❌ Sweep failed for ${chain}:`, error);

        await prisma.sweep.update({
            where: { id: sweepRecord.id },
            data: { status: "FAILED", error: error.message }
        }).catch(() => { });

        throw error;
    } finally {
        // ── 10. Always release lock ────────────────────────────────────────────
        await prisma.treasuryState.update({
            where: { chain },
            data: { locked: false, lockedAt: null, lockedBy: null }
        }).catch(() => { });
    }
}

// ─── Sweep History ────────────────────────────────────────────────────────────

export async function getSweepHistory(
    page = 1,
    limit = 20,
    chain?: string
): Promise<{ sweeps: any[]; total: number; page: number; pages: number }> {
    const where = chain ? { chain } : {};
    const [sweeps, total] = await Promise.all([
        prisma.sweep.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * limit,
            take: limit,
        }),
        prisma.sweep.count({ where })
    ]);

    return { sweeps, total, page, pages: Math.ceil(total / limit) };
}
