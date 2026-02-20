/**
 * FULL TREASURY DIAGNOSIS — JSON output
 */

import * as dotenv from "dotenv";
dotenv.config();

import { prisma } from "../lib/prisma";
import * as fs from "fs";

async function main() {
    const result: any = { timestamp: new Date().toISOString(), layers: {} };

    // LAYER 1: TreasuryState
    const treasuryStates = await prisma.treasuryState.findMany();
    result.layers.treasuryState = treasuryStates.map(s => ({
        chain: s.chain,
        totalOnchainBalance: s.totalOnchainBalance,
        totalUserLiabilities: s.totalUserLiabilities,
        sweepableBalance: s.sweepableBalance,
        lastSyncedAt: s.lastSyncedAt.toISOString(),
        locked: s.locked,
    }));

    // LAYER 2: UserWallet lastKnownBalance
    result.layers.userWallets = {};
    for (const chain of ["ETH", "BSC", "SOL", "BTC", "XRP"]) {
        const wallets = await prisma.userWallet.findMany({
            where: { chain },
            select: { address: true, lastKnownBalance: true, userId: true },
        });
        let rawSum = 0n;
        const nonZeroWallets: any[] = [];
        for (const w of wallets) {
            const bal = BigInt(w.lastKnownBalance || "0");
            rawSum += bal;
            if (bal > 0n) {
                nonZeroWallets.push({
                    address: w.address,
                    userId: w.userId,
                    balance: bal.toString(),
                });
            }
        }
        result.layers.userWallets[chain] = {
            totalWallets: wallets.length,
            nonZeroCount: nonZeroWallets.length,
            rawSum: rawSum.toString(),
            nonZeroWallets,
        };
    }

    // LAYER 3: UserBalance (liabilities)
    result.layers.userBalances = {};
    for (const chain of ["ETH", "BSC", "SOL", "BTC", "XRP"]) {
        const balances = await prisma.userBalance.findMany({ where: { chain } });
        let rawSum = 0n;
        const nonZero: any[] = [];
        for (const b of balances) {
            const bal = BigInt(b.balance || "0");
            rawSum += bal;
            if (bal > 0n) {
                nonZero.push({ userId: b.userId, balance: bal.toString() });
            }
        }
        result.layers.userBalances[chain] = {
            totalEntries: balances.length,
            nonZeroCount: nonZero.length,
            rawSum: rawSum.toString(),
            nonZeroEntries: nonZero,
        };
    }

    // LAYER 4: Integrity layer — Network, Wallet, ReserveEntry, LiabilityEntry
    const networks = await prisma.network.findMany({
        include: {
            wallets: { include: { reserves: true } },
            liabilities: true,
            syncState: true,
        },
    });

    result.layers.integrityNetworks = {
        count: networks.length,
        networks: networks.map(net => {
            const reservesByAsset: Record<string, string> = {};
            for (const w of net.wallets) {
                for (const r of w.reserves) {
                    const existing = BigInt(reservesByAsset[r.assetSymbol] || "0");
                    reservesByAsset[r.assetSymbol] = (existing + r.rawBalance).toString();
                }
            }

            const liabByAsset: Record<string, string> = {};
            for (const l of net.liabilities) {
                const existing = BigInt(liabByAsset[l.assetSymbol] || "0");
                liabByAsset[l.assetSymbol] = (existing + l.rawAmount).toString();
            }

            return {
                name: net.name,
                id: net.id,
                isActive: net.isActive,
                chainId: net.chainId,
                walletCount: net.wallets.length,
                activeWalletCount: net.wallets.filter(w => w.isActive).length,
                reserveEntryCount: net.wallets.reduce((s, w) => s + w.reserves.length, 0),
                liabilityEntryCount: net.liabilities.length,
                reservesByAsset,
                liabilitiesByAsset: liabByAsset,
                syncState: net.syncState
                    ? {
                        status: net.syncState.syncStatus,
                        lastSync: net.syncState.lastSuccessfulSync?.toISOString() ?? null,
                        error: net.syncState.errorMessage,
                    }
                    : null,
                reserveDetails: net.wallets.flatMap(w =>
                    w.reserves.map(r => ({
                        walletAddress: w.address,
                        walletLabel: w.label,
                        assetSymbol: r.assetSymbol,
                        rawBalance: r.rawBalance.toString(),
                        decimals: r.decimals,
                        lastUpdated: r.lastUpdatedAt.toISOString(),
                    }))
                ),
                liabilityDetails: net.liabilities.map(l => ({
                    assetSymbol: l.assetSymbol,
                    rawAmount: l.rawAmount.toString(),
                    decimals: l.decimals,
                })),
            };
        }),
    };

    // LAYER 5: PriceCache
    const prices = await prisma.priceCache.findMany();
    result.layers.priceCache = prices.map(p => ({
        assetSymbol: p.assetSymbol,
        priceUsd: p.priceUsd.toString(),
        lastUpdatedAt: p.lastUpdatedAt.toISOString(),
        ttlSeconds: p.ttlSeconds,
        ageSeconds: Math.floor((Date.now() - p.lastUpdatedAt.getTime()) / 1000),
        isStale: Math.floor((Date.now() - p.lastUpdatedAt.getTime()) / 1000) > p.ttlSeconds,
    }));

    // LAYER 6: Manual USD calculation
    const assetTotals: Record<string, { reserves: bigint; liabilities: bigint; decimals: number }> = {};
    for (const net of networks) {
        for (const wallet of net.wallets) {
            for (const r of wallet.reserves) {
                if (!assetTotals[r.assetSymbol]) {
                    assetTotals[r.assetSymbol] = { reserves: 0n, liabilities: 0n, decimals: r.decimals };
                }
                assetTotals[r.assetSymbol].reserves += r.rawBalance;
            }
        }
        for (const l of net.liabilities) {
            if (!assetTotals[l.assetSymbol]) {
                assetTotals[l.assetSymbol] = { reserves: 0n, liabilities: 0n, decimals: l.decimals };
            }
            assetTotals[l.assetSymbol].liabilities += l.rawAmount;
        }
    }

    let grandTotalReserveUsd = 0;
    let grandTotalLiabilityUsd = 0;

    const usdCalc: any[] = [];
    for (const [asset, totals] of Object.entries(assetTotals)) {
        const priceEntry = prices.find(p => p.assetSymbol === asset);
        const priceUsd = priceEntry ? Number(priceEntry.priceUsd) : 0;
        const divisor = 10 ** totals.decimals;

        const reserveHuman = Number(totals.reserves) / divisor;
        const liabHuman = Number(totals.liabilities) / divisor;
        const reserveUsd = reserveHuman * priceUsd;
        const liabUsd = liabHuman * priceUsd;

        grandTotalReserveUsd += reserveUsd;
        grandTotalLiabilityUsd += liabUsd;

        usdCalc.push({
            asset,
            rawReserves: totals.reserves.toString(),
            rawLiabilities: totals.liabilities.toString(),
            decimals: totals.decimals,
            humanReserves: reserveHuman,
            humanLiabilities: liabHuman,
            priceUsd,
            priceMissing: !priceEntry,
            usdReserves: reserveUsd.toFixed(2),
            usdLiabilities: liabUsd.toFixed(2),
        });
    }

    result.layers.usdCalculation = {
        perAsset: usdCalc,
        grandTotalReserveUsd: grandTotalReserveUsd.toFixed(2),
        grandTotalLiabilityUsd: grandTotalLiabilityUsd.toFixed(2),
        grandTotalEquityUsd: (grandTotalReserveUsd - grandTotalLiabilityUsd).toFixed(2),
    };

    // LAYER 7: Confirmed deposits
    const confirmedDeposits = await prisma.chainTransaction.findMany({
        where: { direction: "INBOUND", status: "CONFIRMED" },
        orderBy: { confirmedAt: "desc" },
        take: 20,
    });
    const depositCount = await prisma.chainTransaction.count({
        where: { direction: "INBOUND", status: "CONFIRMED" },
    });
    result.layers.confirmedDeposits = {
        totalCount: depositCount,
        latest20: confirmedDeposits.map(tx => ({
            chain: tx.chain,
            amount: tx.amount,
            txHash: tx.txHash,
            confirmedAt: tx.confirmedAt?.toISOString(),
            userId: tx.userId,
        })),
    };

    // DIAGNOSIS
    const issues: string[] = [];
    if (networks.length === 0) {
        issues.push("Network table is EMPTY - GlobalOverviewService sees no active networks -> $0.00");
    }
    const reserveEntryCount = networks.reduce(
        (sum, n) => sum + n.wallets.reduce((s, w) => s + w.reserves.length, 0), 0
    );
    if (reserveEntryCount === 0 && networks.length > 0) {
        issues.push("ReserveEntry table is EMPTY");
    }
    if (prices.length === 0) {
        issues.push("PriceCache is EMPTY - no USD conversion possible");
    }
    for (const [asset] of Object.entries(assetTotals)) {
        if (!prices.some(p => p.assetSymbol === asset)) {
            issues.push(`No price for asset '${asset}'`);
        }
    }

    result.diagnosis = {
        issues,
        computedTotalAssets: grandTotalReserveUsd.toFixed(2),
        explanation: issues.length === 0
            ? "Data pipeline looks correct."
            : "Issues found that explain the miscalculation.",
    };

    // Write output
    const output = JSON.stringify(result, null, 2);
    fs.writeFileSync("scripts/diagnosis-result.json", output, "utf-8");
    console.log("Diagnosis written to scripts/diagnosis-result.json");
    console.log("Computed Total Assets: $" + grandTotalReserveUsd.toFixed(2));
    console.log("Issues: " + (issues.length > 0 ? issues.join("; ") : "none"));

    process.exit(0);
}

main().catch(err => {
    console.error("FATAL:", err);
    process.exit(1);
});
