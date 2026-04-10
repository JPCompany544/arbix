/**
 * Price Override Store
 * Handles all DB interactions for admin-controlled token price overrides.
 * Overrides are keyed by token symbol (e.g. "SOL", "BTC") and stored with
 * 8-decimal precision. isActive flag allows soft-disabling without deletion.
 */

import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";

export type TokenPriceOverride = {
  id: string;
  symbol: string;
  priceUsd: number;
  isActive: boolean;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
};

function toOverride(row: {
  id: string;
  symbol: string;
  priceUsd: Decimal;
  isActive: boolean;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
}): TokenPriceOverride {
  return {
    ...row,
    priceUsd: Number(row.priceUsd),
  };
}

/** Return all overrides (active + inactive) */
export async function getAllOverrides(): Promise<TokenPriceOverride[]> {
  const rows = await prisma.tokenPriceOverride.findMany({
    orderBy: { updatedAt: "desc" },
  });
  return rows.map(toOverride);
}

/** Return only active overrides — used by the price resolver */
export async function getActiveOverrides(): Promise<TokenPriceOverride[]> {
  const rows = await prisma.tokenPriceOverride.findMany({
    where: { isActive: true },
    orderBy: { symbol: "asc" },
  });
  return rows.map(toOverride);
}

/** Upsert an override. Creates if new, updates price/note/isActive if exists. */
export async function upsertOverride(
  symbol: string,
  priceUsd: number,
  note?: string
): Promise<TokenPriceOverride> {
  const upperSymbol = symbol.trim().toUpperCase();
  const row = await prisma.tokenPriceOverride.upsert({
    where: { symbol: upperSymbol },
    create: {
      symbol: upperSymbol,
      priceUsd,
      isActive: true,
      note: note ?? null,
    },
    update: {
      priceUsd,
      isActive: true,
      note: note !== undefined ? note : undefined,
    },
  });
  return toOverride(row);
}

/** Toggle active state without deleting the record */
export async function setOverrideActive(
  symbol: string,
  isActive: boolean
): Promise<TokenPriceOverride> {
  const row = await prisma.tokenPriceOverride.update({
    where: { symbol: symbol.trim().toUpperCase() },
    data: { isActive },
  });
  return toOverride(row);
}

/** Hard-delete an override by symbol */
export async function deleteOverride(symbol: string): Promise<void> {
  await prisma.tokenPriceOverride.delete({
    where: { symbol: symbol.trim().toUpperCase() },
  });
}

/**
 * Build a lookup map: { SYMBOL -> priceUsd } for active overrides.
 * Efficient for checking inside price-service without N+1 queries.
 */
export async function buildOverrideMap(): Promise<Record<string, number>> {
  const active = await getActiveOverrides();
  const map: Record<string, number> = {};
  for (const o of active) {
    map[o.symbol] = o.priceUsd;
  }
  return map;
}
