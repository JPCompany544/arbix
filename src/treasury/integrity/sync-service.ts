/**
 * Treasury Integrity Sync Service
 *
 * Keeps the integrity-layer tables (ReserveEntry, LiabilityEntry, PriceCache)
 * in sync with the real platform state. Called by:
 *   - The sync script (npx tsx scripts/sync-treasury-integrity.ts)
 *   - The overview API route (on each request, with rate limiting)
 *
 * DATA SOURCES:
 *   Reserves    = SUM(UserWallet.lastKnownBalance) per chain (de-duped by address)
 *   Liabilities = SUM(UserBalance.balance) per chain (excluding system accounts)
 *   Prices      = Live from CoinGecko API (with fallback)
 */

import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";

// ─── Rate Limiting ───────────────────────────────────────────────────────────

let lastSyncTime = 0;
const MIN_SYNC_INTERVAL_MS = 30_000; // 30 seconds between syncs

// ─── Network Definitions ─────────────────────────────────────────────────────

const NETWORK_DEFINITIONS = [
    { name: "ETH", chainId: 1, decimals: 18 },
    { name: "BSC", chainId: 56, decimals: 18 },
    { name: "SOL", chainId: 101, decimals: 9 },
    { name: "BTC", chainId: 0, decimals: 8 },
    { name: "XRP", chainId: 2, decimals: 6 },
];

// ─── CoinGecko Price Fetcher ─────────────────────────────────────────────────

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";
const TOKEN_MAP: Record<string, string> = {
    ETH: "ethereum",
    BNB: "binancecoin",
    BSC: "binancecoin",
    SOL: "solana",
    BTC: "bitcoin",
    XRP: "ripple",
};

async function fetchLivePrices(): Promise<Record<string, number>> {
    const ids = [...new Set(Object.values(TOKEN_MAP))].join(",");
    try {
        const res = await fetch(
            `${COINGECKO_BASE}/simple/price?ids=${ids}&vs_currencies=usd`,
            { headers: { Accept: "application/json" } }
        );
        if (!res.ok) throw new Error(`CoinGecko ${res.status}`);
        const data = await res.json();

        const prices: Record<string, number> = {};
        for (const [symbol, geckoId] of Object.entries(TOKEN_MAP)) {
            const priceObj = data[geckoId];
            if (priceObj && priceObj.usd) {
                prices[symbol] = priceObj.usd;
            }
        }
        return prices;
    } catch (err) {
        console.warn("[TreasurySync] CoinGecko fetch failed, using cached prices");
        // Return empty — existing PriceCache values will be used
        return {};
    }
}

// ─── Main Sync Function ──────────────────────────────────────────────────────

export async function syncTreasuryIntegrity(options?: {
    force?: boolean;
    skipPrices?: boolean;
}): Promise<{ synced: boolean; timestamp: Date }> {
    const now = Date.now();

    // Rate limit unless forced
    if (!options?.force && now - lastSyncTime < MIN_SYNC_INTERVAL_MS) {
        return { synced: false, timestamp: new Date(lastSyncTime) };
    }

    console.log("[TreasurySync] Starting integrity sync...");

    // 1. Ensure networks exist
    for (const def of NETWORK_DEFINITIONS) {
        await prisma.network.upsert({
            where: { name: def.name },
            update: { chainId: def.chainId, isActive: true },
            create: { name: def.name, chainId: def.chainId, isActive: true },
        });
    }

    const networks = await prisma.network.findMany();
    const networkMap = new Map(networks.map((n) => [n.name, n.id]));

    // 2. Clear old integrity data
    await prisma.reserveEntry.deleteMany({});
    await prisma.liabilityEntry.deleteMany({});
    await prisma.wallet.deleteMany({});

    // 3. Sync reserves & liabilities per chain
    for (const def of NETWORK_DEFINITIONS) {
        const networkId = networkMap.get(def.name);
        if (!networkId) continue;

        // ── RESERVES: Actual on-chain balances ──
        const wallets = await prisma.userWallet.findMany({
            where: {
                chain: def.name,
                NOT: { address: "ADDRESS_NOT_GENERATED_YET" },
            },
            select: { address: true, lastKnownBalance: true, userId: true },
        });

        // De-duplicate by address (take max balance for shared addresses)
        const uniqueAddresses = new Map<string, bigint>();
        for (const w of wallets) {
            const addr = w.address.toLowerCase();
            const bal = BigInt(w.lastKnownBalance || "0");
            const existing = uniqueAddresses.get(addr) || 0n;
            if (bal > existing) {
                uniqueAddresses.set(addr, bal);
            }
        }

        let totalOnChainRaw = 0n;
        for (const bal of uniqueAddresses.values()) {
            totalOnChainRaw += bal;
        }

        // ── LIABILITIES: User balances (exclude system accounts) ──
        const balances = await prisma.userBalance.findMany({
            where: { chain: def.name },
        });
        let totalLiabilitiesRaw = 0n;
        for (const b of balances) {
            if (b.userId === "system_treasury_vault") continue;
            const bal = BigInt(b.balance || "0");
            totalLiabilitiesRaw += bal;
        }

        // Write to integrity tables
        const vaultWallet = await prisma.wallet.create({
            data: {
                networkId,
                address: `DEPOSIT_VAULT_${def.name}`,
                label: `On-Chain Reserves (${def.name})`,
                isActive: true,
            },
        });

        await prisma.reserveEntry.create({
            data: {
                walletId: vaultWallet.id,
                networkId,
                assetSymbol: def.name,
                rawBalance: totalOnChainRaw,
                decimals: def.decimals,
            },
        });

        await prisma.liabilityEntry.create({
            data: {
                networkId,
                assetSymbol: def.name,
                rawAmount: totalLiabilitiesRaw,
                decimals: def.decimals,
            },
        });
    }

    // 4. Sync prices (unless skipped)
    if (!options?.skipPrices) {
        const livePrices = await fetchLivePrices();
        for (const [symbol, price] of Object.entries(livePrices)) {
            await prisma.priceCache.upsert({
                where: { assetSymbol: symbol },
                update: {
                    priceUsd: new Decimal(price),
                    lastUpdatedAt: new Date(),
                },
                create: {
                    assetSymbol: symbol,
                    priceUsd: new Decimal(price),
                },
            });
        }
    }

    // 5. Update sync state
    for (const n of networks) {
        await prisma.syncState.upsert({
            where: { networkId: n.id },
            update: {
                lastSuccessfulSync: new Date(),
                syncStatus: "OK",
                errorMessage: null,
            },
            create: {
                networkId: n.id,
                lastSuccessfulSync: new Date(),
                syncStatus: "OK",
            },
        });
    }

    lastSyncTime = Date.now();
    console.log("[TreasurySync] Integrity sync complete.");

    return { synced: true, timestamp: new Date() };
}
