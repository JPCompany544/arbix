/**
 * Price Override Client Helpers
 * Frontend-facing API helpers for managing token price overrides.
 * All prices are stored as integers at 1e6 precision on-chain,
 * but this client works in human-readable USD floats — conversion
 * is handled at the boundary (parsedPrice = Math.floor(price * 1_000_000)).
 */

export type TokenPriceOverride = {
  id: string;
  symbol: string;
  priceUsd: number;
  isActive: boolean;
  note: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PriceOverrideListResponse = {
  overrides: TokenPriceOverride[];
};

/** Fetch all price overrides (admin only) */
export async function fetchPriceOverrides(): Promise<TokenPriceOverride[]> {
  const res = await fetch("/api/admin/price-overrides");
  if (!res.ok) throw new Error(`Failed to fetch overrides: ${res.statusText}`);
  const data: PriceOverrideListResponse = await res.json();
  return data.overrides;
}

/**
 * Set or update a token price override.
 * @param symbol - Token symbol, e.g. "SOL"
 * @param priceUsd - Price in USD, e.g. 145.50
 * @param note - Optional admin note
 */
export async function setTokenPriceOverride(
  symbol: string,
  priceUsd: number,
  note?: string
): Promise<TokenPriceOverride> {
  // Validate price is a positive finite number with no float precision issues
  const parsedPrice = parseFloat(priceUsd.toFixed(8));
  if (!isFinite(parsedPrice) || parsedPrice <= 0) {
    throw new Error("Price must be a positive number");
  }

  const res = await fetch("/api/admin/price-overrides", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ symbol: symbol.trim().toUpperCase(), priceUsd: parsedPrice, note }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? "Failed to set price override");
  }

  const data = await res.json();
  return data.override;
}

/**
 * Toggle an override's active state.
 */
export async function togglePriceOverride(
  symbol: string,
  isActive: boolean
): Promise<TokenPriceOverride> {
  const res = await fetch("/api/admin/price-overrides", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ symbol: symbol.trim().toUpperCase(), isActive }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? "Failed to toggle override");
  }

  const data = await res.json();
  return data.override;
}

/**
 * Hard-delete a token price override.
 */
export async function removeTokenPriceOverride(symbol: string): Promise<void> {
  const res = await fetch(
    `/api/admin/price-overrides?symbol=${encodeURIComponent(symbol.trim().toUpperCase())}`,
    { method: "DELETE" }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? "Failed to remove override");
  }
}

/**
 * Resolve the display price for a token given overrides and a market price fallback.
 * @param symbol - Token symbol
 * @param overrides - Array from fetchPriceOverrides()
 * @param marketPrice - Fallback market price
 * @returns Resolved price in USD
 */
export function resolveTokenPrice(
  symbol: string,
  overrides: TokenPriceOverride[],
  marketPrice: number
): number {
  const override = overrides.find(
    (o) => o.symbol === symbol.toUpperCase() && o.isActive
  );
  return override ? override.priceUsd : marketPrice;
}
