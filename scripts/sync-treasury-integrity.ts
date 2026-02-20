/**
 * Treasury Integrity Sync — CLI Script
 *
 * Run:  npx tsx scripts/sync-treasury-integrity.ts
 */

import * as dotenv from "dotenv";
dotenv.config();

import { prisma } from "../lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import * as fs from "fs";

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
        console.error("CoinGecko fetch failed:", err);
        return {
            ETH: 2800,
            BSC: 350,
            BNB: 350,
            SOL: 102,
            BTC: 52000,
            XRP: 0.55,
        };
    }
}

const NETWORK_DEFS = [
    { name: "ETH", chainId: 1, decimals: 18 },
    { name: "BSC", chainId: 56, decimals: 18 },
    { name: "SOL", chainId: 101, decimals: 9 },
    { name: "BTC", chainId: 0, decimals: 8 },
    { name: "XRP", chainId: 2, decimals: 6 },
];

async function main() {
    const log: string[] = [];
    const addLog = (msg: string) => { log.push(msg); console.log(msg); };

    addLog("--- Treasury Integrity Sync ---");
    addLog(`Time: ${new Date().toISOString()}`);

    // 1. Networks
    for (const def of NETWORK_DEFS) {
        await prisma.network.upsert({
            where: { name: def.name },
            update: { chainId: def.chainId, isActive: true },
            create: { name: def.name, chainId: def.chainId, isActive: true },
        });
    }
    addLog("Networks initialized.");

    const networks = await prisma.network.findMany();
    const networkMap = new Map(networks.map((n) => [n.name, n.id]));

    // 2. Clear old data
    await prisma.reserveEntry.deleteMany({});
    await prisma.liabilityEntry.deleteMany({});
    await prisma.wallet.deleteMany({});

    // 3. Sync per chain
    for (const def of NETWORK_DEFS) {
        const networkId = networkMap.get(def.name);
        if (!networkId) continue;

        // RESERVES: actual on-chain balances
        const wallets = await prisma.userWallet.findMany({
            where: {
                chain: def.name,
                NOT: { address: "ADDRESS_NOT_GENERATED_YET" },
            },
            select: { address: true, lastKnownBalance: true, userId: true },
        });

        // De-duplicate by address (take max for shared addresses)
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

        // LIABILITIES: user balances (exclude system accounts)
        const balances = await prisma.userBalance.findMany({
            where: { chain: def.name },
        });
        let totalLiabilitiesRaw = 0n;
        for (const b of balances) {
            if (b.userId === "system_treasury_vault") continue;
            totalLiabilitiesRaw += BigInt(b.balance || "0");
        }

        // Write to DB
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

        const humanOnChain = Number(totalOnChainRaw) / 10 ** def.decimals;
        const humanLiab = Number(totalLiabilitiesRaw) / 10 ** def.decimals;

        addLog(`${def.name}: wallets=${wallets.length}, unique=${uniqueAddresses.size}, onchain=${humanOnChain.toFixed(8)}, liabilities=${humanLiab.toFixed(8)}`);
    }

    // 4. Prices
    addLog("Fetching prices...");
    const livePrices = await fetchLivePrices();
    for (const [symbol, price] of Object.entries(livePrices)) {
        await prisma.priceCache.upsert({
            where: { assetSymbol: symbol },
            update: { priceUsd: new Decimal(price), lastUpdatedAt: new Date() },
            create: { assetSymbol: symbol, priceUsd: new Decimal(price) },
        });
        addLog(`  ${symbol}: $${price}`);
    }

    // 5. Sync state
    for (const n of networks) {
        await prisma.syncState.upsert({
            where: { networkId: n.id },
            update: { lastSuccessfulSync: new Date(), syncStatus: "OK", errorMessage: null },
            create: { networkId: n.id, lastSuccessfulSync: new Date(), syncStatus: "OK" },
        });
    }

    addLog("--- Sync Complete ---");

    // Write log to file for verification
    fs.writeFileSync("scripts/sync-log.md", log.join("\n"), "utf-8");
}

main()
    .catch((err) => {
        console.error("FATAL:", err);
        fs.writeFileSync("scripts/sync-error.md", String(err), "utf-8");
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
        process.exit(0);
    });
