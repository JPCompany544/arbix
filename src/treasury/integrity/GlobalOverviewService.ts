/**
 * Treasury Global Overview Service
 *
 * Implements strict financial integrity with:
 * - BIGINT processing throughout (no floating point)
 * - Deterministic asset ordering
 * - Invariant enforcement
 * - Strong error handling
 */

import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";

// ────────────────────────────────────────────────────────────────
// Type Definitions
// ────────────────────────────────────────────────────────────────

export enum SyncThresholdSeconds {
  DEFAULT = 300, // 5 minutes
}

export type NetworkMetrics = {
  networkId: string;
  networkName: string;
  walletCount: number;
  lastSync: Date | null;
  status: "OK" | "STALE" | "ERROR";
  reserves: AssetAmount[];
  liabilities: AssetAmount[];
  equity: AssetAmount[];
  usdReserves: string;
  usdLiabilities: string;
  usdEquity: string;
};

export type AssetAmount = {
  asset: string;
  raw: string; // Serialized BIGINT as string
};

export type CombinedMetrics = {
  rawByAsset: AssetAmount[];
  usdSummary: {
    totalReserveUsd: string;
    totalLiabilityUsd: string;
    totalEquityUsd: string;
    priceStatus: "FRESH" | "STALE";
  };
};

export type GlobalOverviewResponse = {
  networks: NetworkMetrics[];
  combined: CombinedMetrics;
};

// ────────────────────────────────────────────────────────────────
// Internal Types
// ────────────────────────────────────────────────────────────────

type AssetBalance = {
  asset: string;
  raw: bigint;
  decimals: number; // Must match across reserve + liability for same asset
};

type NetworkData = {
  networkId: string;
  networkName: string;
  walletCount: number;
  reserves: Map<string, { raw: bigint; decimals: number }>;
  liabilities: Map<string, { raw: bigint; decimals: number }>;
  syncState: {
    lastSuccessfulSync: Date | null;
    status: "OK" | "STALE" | "ERROR";
    error: string | null;
  };
};

// ────────────────────────────────────────────────────────────────
// Validation Layer
// ────────────────────────────────────────────────────────────────

function validateDecimalMatch(
  assetSymbol: string,
  reserveDecimals: number,
  liabilityDecimals: number
): boolean {
  if (reserveDecimals !== liabilityDecimals) {
    console.error(
      `[INTEGRITY ERROR] Asset ${assetSymbol}: decimal mismatch (reserve: ${reserveDecimals}, liability: ${liabilityDecimals})`
    );
    return false;
  }
  return true;
}

function validateBigIntArithmetic(raw: bigint): boolean {
  // Ensure raw is actually a bigint, not a float or number
  if (typeof raw !== "bigint") {
    throw new TypeError(
      `[INVARIANT VIOLATION] Expected bigint, got ${typeof raw}`
    );
  }
  return true;
}

function validateAssetSymbol(symbol: string): boolean {
  if (!symbol || symbol.length === 0 || symbol.length > 20) {
    throw new Error(`[INVARIANT VIOLATION] Invalid asset symbol: ${symbol}`);
  }
  return true;
}

// ────────────────────────────────────────────────────────────────
// Aggregation Logic
// ────────────────────────────────────────────────────────────────

async function aggregateNetworkData(
  networkId: string,
  networkName: string,
  syncThresholdSeconds: number = SyncThresholdSeconds.DEFAULT
): Promise<NetworkData> {
  // Fetch wallet count
  const walletCount = await prisma.wallet.count({
    where: {
      networkId,
      isActive: true,
    },
  });

  // Fetch all reserves for this network
  const reserves = await prisma.reserveEntry.findMany({
    where: { networkId },
    select: {
      assetSymbol: true,
      rawBalance: true,
      decimals: true,
    },
  });

  // Fetch all liabilities for this network
  const liabilities = await prisma.liabilityEntry.findMany({
    where: { networkId },
    select: {
      assetSymbol: true,
      rawAmount: true,
      decimals: true,
    },
  });

  // Fetch sync state
  const syncState = await prisma.syncState.findUnique({
    where: { networkId },
    select: {
      lastSuccessfulSync: true,
      syncStatus: true,
      errorMessage: true,
    },
  });

  // Build aggregated reserves map
  const reservesMap = new Map<string, { raw: bigint; decimals: number }>();
  for (const reserve of reserves) {
    validateAssetSymbol(reserve.assetSymbol);
    validateBigIntArithmetic(reserve.rawBalance);

    const key = reserve.assetSymbol;
    const existing = reservesMap.get(key) || {
      raw: 0n,
      decimals: reserve.decimals,
    };

    // Ensure decimals consistency within reserves
    if (existing.decimals !== reserve.decimals) {
      console.warn(
        `[WARNING] Reserve ${key} has inconsistent decimals in wallet entries`
      );
    }

    reservesMap.set(key, {
      raw: existing.raw + reserve.rawBalance,
      decimals: reserve.decimals,
    });
  }

  // Build aggregated liabilities map
  const liabilitiesMap = new Map<string, { raw: bigint; decimals: number }>();
  for (const liability of liabilities) {
    validateAssetSymbol(liability.assetSymbol);
    validateBigIntArithmetic(liability.rawAmount);

    const key = liability.assetSymbol;
    const existing = liabilitiesMap.get(key) || {
      raw: 0n,
      decimals: liability.decimals,
    };

    liabilitiesMap.set(key, {
      raw: existing.raw + liability.rawAmount,
      decimals: liability.decimals,
    });
  }

  // Determine sync status
  const now = new Date();
  let status: "OK" | "STALE" | "ERROR" = "OK";
  let error: string | null = syncState?.errorMessage || null;

  if (syncState?.syncStatus === "ERROR") {
    status = "ERROR";
  } else if (!syncState?.lastSuccessfulSync) {
    status = "ERROR";
    error = "No successful sync recorded";
  } else {
    const syncAge = Math.floor(
      (now.getTime() - syncState.lastSuccessfulSync.getTime()) / 1000
    );
    if (syncAge > syncThresholdSeconds) {
      status = "STALE";
      error = `Sync is ${syncAge}s old (threshold: ${syncThresholdSeconds}s)`;
    }
  }

  return {
    networkId,
    networkName,
    walletCount,
    reserves: reservesMap,
    liabilities: liabilitiesMap,
    syncState: {
      lastSuccessfulSync: syncState?.lastSuccessfulSync || null,
      status,
      error,
    },
  };
}

function computeEquity(
  reserves: Map<string, { raw: bigint; decimals: number }>,
  liabilities: Map<string, { raw: bigint; decimals: number }>
): Map<string, { raw: bigint; decimals: number }> {
  const equity = new Map<string, { raw: bigint; decimals: number }>();

  // Get union of all assets
  const allAssets = new Set([...reserves.keys(), ...liabilities.keys()]);

  for (const asset of allAssets) {
    const reserve = reserves.get(asset) || {
      raw: 0n,
      decimals: 0,
    };
    const liability = liabilities.get(asset) || { raw: 0n, decimals: 0 };

    // Validate decimals match
    if (reserve.raw > 0n && liability.raw > 0n) {
      if (
        !validateDecimalMatch(
          asset,
          reserve.decimals,
          liability.decimals
        )
      ) {
        // Mark entire network as error in caller
        throw new Error(
          `[INVARIANT VIOLATION] Decimal mismatch for ${asset}`
        );
      }
    }

    const decimals = Math.max(reserve.decimals, liability.decimals);
    const equityRaw = reserve.raw - liability.raw; // Can be negative!

    equity.set(asset, {
      raw: equityRaw,
      decimals,
    });
  }

  return equity;
}

// ────────────────────────────────────────────────────────────────
// Normalization & Pricing
// ────────────────────────────────────────────────────────────────

function normalizeBalance(raw: bigint, decimals: number): Decimal {
  validateBigIntArithmetic(raw);

  // Convert to Decimal for precise arithmetic
  const divisor = Decimal.pow(10, decimals);
  return new Decimal(raw.toString()).div(divisor);
}

async function fetchPriceWithTTL(
  assetSymbol: string,
  ttlSeconds: number = 300
): Promise<{ price: Decimal; stale: boolean } | null> {
  const cache = await prisma.priceCache.findUnique({
    where: { assetSymbol },
    select: {
      priceUsd: true,
      lastUpdatedAt: true,
      ttlSeconds: true,
    },
  });

  if (!cache) {
    return null;
  }

  const now = new Date();
  const age = Math.floor(
    (now.getTime() - cache.lastUpdatedAt.getTime()) / 1000
  );
  const isStale = age > cache.ttlSeconds;

  return {
    price: cache.priceUsd,
    stale: isStale,
  };
}

// ────────────────────────────────────────────────────────────────
// Main Service Method
// ────────────────────────────────────────────────────────────────

export async function getGlobalOverview(
  syncThresholdSeconds: number = SyncThresholdSeconds.DEFAULT
): Promise<GlobalOverviewResponse> {
  // Fetch all active networks
  const networks = await prisma.network.findMany({
    where: { isActive: true },
    select: {
      id: true,
      name: true,
    },
  });

  // Aggregate per network
  const networkDataMap = new Map<string, NetworkData>();
  const networkMetrics: NetworkMetrics[] = [];
  let anyStalePrice = false;

  for (const network of networks) {
    try {
      const data = await aggregateNetworkData(
        network.id,
        network.name,
        syncThresholdSeconds
      );
      networkDataMap.set(network.id, data);

      // Compute equity (may throw on decimal mismatch)
      let equity: Map<string, { raw: bigint; decimals: number }>;
      try {
        equity = computeEquity(data.reserves, data.liabilities);
      } catch (err) {
        console.error(
          `[INTEGRITY ERROR] Network ${network.name}: ${(err as Error).message}`
        );
        networkMetrics.push({
          networkId: network.id,
          networkName: network.name,
          walletCount: data.walletCount,
          lastSync: data.syncState.lastSuccessfulSync,
          status: "ERROR",
          reserves: [],
          liabilities: [],
          equity: [],
        });
        continue;
      }

      // Convert to ordered arrays
      const reservesArray = Array.from(data.reserves.entries())
        .map(([asset, { raw }]) => ({
          asset,
          raw: raw.toString(),
        }))
        .sort((a, b) => a.asset.localeCompare(b.asset));

      const liabilitiesArray = Array.from(data.liabilities.entries())
        .map(([asset, { raw }]) => ({
          asset,
          raw: raw.toString(),
        }))
        .sort((a, b) => a.asset.localeCompare(b.asset));

      const equityArray = Array.from(equity.entries())
        .map(([asset, { raw }]) => ({
          asset,
          raw: raw.toString(),
        }))
        .sort((a, b) => a.asset.localeCompare(b.asset));

      // Compute USD for this network
      let networkReserveUsd = new Decimal(0);
      let networkLiabilityUsd = new Decimal(0);

      const networkAssets = new Set([...data.reserves.keys(), ...data.liabilities.keys()]);
      for (const asset of networkAssets) {
        const pData = await fetchPriceWithTTL(asset);
        if (pData) {
          const price = pData.price;
          if (pData.stale) anyStalePrice = true;

          const r = data.reserves.get(asset);
          if (r && r.raw > 0n) {
            networkReserveUsd = networkReserveUsd.plus(normalizeBalance(r.raw, r.decimals).times(price));
          }

          const l = data.liabilities.get(asset);
          if (l && l.raw > 0n) {
            networkLiabilityUsd = networkLiabilityUsd.plus(normalizeBalance(l.raw, l.decimals).times(price));
          }
        }
      }

      networkMetrics.push({
        networkId: network.id,
        networkName: network.name,
        walletCount: data.walletCount,
        lastSync: data.syncState.lastSuccessfulSync,
        status: data.syncState.status,
        reserves: reservesArray,
        liabilities: liabilitiesArray,
        equity: equityArray,
        usdReserves: networkReserveUsd.toFixed(2),
        usdLiabilities: networkLiabilityUsd.toFixed(2),
        usdEquity: networkReserveUsd.minus(networkLiabilityUsd).toFixed(2)
      });
    } catch (err) {
      console.error(
        `[CASCADE ERROR] Network ${network.name}: ${(err as Error).message}`
      );
      networkMetrics.push({
        networkId: network.id,
        networkName: network.name,
        walletCount: 0,
        lastSync: null,
        status: "ERROR",
        reserves: [],
        liabilities: [],
        equity: [],
        usdReserves: "0.00",
        usdLiabilities: "0.00",
        usdEquity: "0.00"
      });
    }
  }

  // Combine across all networks
  const combinedReserves = new Map<string, bigint>();
  const combinedLiabilities = new Map<string, bigint>();
  const assetDecimals = new Map<string, number>();

  for (const data of networkDataMap.values()) {
    for (const [asset, { raw, decimals }] of data.reserves) {
      combinedReserves.set(
        asset,
        (combinedReserves.get(asset) || 0n) + raw
      );
      assetDecimals.set(asset, decimals);
    }

    for (const [asset, { raw, decimals }] of data.liabilities) {
      combinedLiabilities.set(
        asset,
        (combinedLiabilities.get(asset) || 0n) + raw
      );
      assetDecimals.set(asset, decimals);
    }
  }

  // Fetch all prices and compute USD summary
  const allAssets = new Set([
    ...combinedReserves.keys(),
    ...combinedLiabilities.keys(),
  ]);
  const priceMap = new Map<string, Decimal>();

  for (const asset of allAssets) {
    const priceData = await fetchPriceWithTTL(asset);
    if (priceData) {
      priceMap.set(asset, priceData.price);
      if (priceData.stale) {
        anyStalePrice = true;
      }
    }
  }

  // Compute USD totals
  let totalReserveUsd = new Decimal(0);
  let totalLiabilityUsd = new Decimal(0);

  for (const asset of allAssets) {
    const price = priceMap.get(asset);
    if (!price) {
      // Missing price: exclude from USD totals
      console.warn(
        `[PRICE WARNING] No price for ${asset}, excluding from USD totals`
      );
      continue;
    }

    const reserveRaw = combinedReserves.get(asset) || 0n;
    const liabilityRaw = combinedLiabilities.get(asset) || 0n;
    const decimals = assetDecimals.get(asset) || 18;

    if (reserveRaw > 0n) {
      const normalized = normalizeBalance(reserveRaw, decimals);
      totalReserveUsd = totalReserveUsd.plus(normalized.times(price));
    }

    if (liabilityRaw > 0n) {
      const normalized = normalizeBalance(liabilityRaw, decimals);
      totalLiabilityUsd = totalLiabilityUsd.plus(normalized.times(price));
    }
  }

  const totalEquityUsd = totalReserveUsd.minus(totalLiabilityUsd);

  // Build combined asset list
  const rawByAsset = Array.from(allAssets)
    .map((asset) => {
      const raw = combinedReserves.get(asset) || 0n;
      return {
        asset,
        raw: raw.toString(),
      };
    })
    .sort((a, b) => a.asset.localeCompare(b.asset));

  return {
    networks: networkMetrics,
    combined: {
      rawByAsset,
      usdSummary: {
        totalReserveUsd: totalReserveUsd.toFixed(2),
        totalLiabilityUsd: totalLiabilityUsd.toFixed(2),
        totalEquityUsd: totalEquityUsd.toFixed(2),
        priceStatus: anyStalePrice ? "STALE" : "FRESH",
      },
    },
  };
}
