export const DENOMINATION: Record<string, bigint> = {
  BTC: 100_000_000n,
  ETH: 1_000_000_000_000_000_000n,
  USDT: 1_000_000n,
  // add other currencies as needed
};

function getDecimals(currency: string): number {
  const denom = DENOMINATION[currency];
  if (denom === undefined) throw new Error(`Unknown currency ${currency}`);
  let count = 0;
  let temp = denom;
  while (temp % 10n === 0n && temp !== 0n) {
    temp /= 10n;
    count += 1;
  }
  return count;
}

export function toAtomic(amountDecimal: string, currency: string): bigint {
  if (!(currency in DENOMINATION)) {
    throw new Error(`Unknown currency ${currency}`);
  }
  const denom = DENOMINATION[currency];
  const decimals = getDecimals(currency);
  // amountDecimal should be a string like "1.23" or "5"
  if (!/^\d+(\.\d+)?$/.test(amountDecimal)) {
    throw new Error(`Invalid decimal amount '${amountDecimal}'`);
  }
  const [intPart, fracPart = ""] = amountDecimal.split(".");
  if (fracPart.length > decimals) {
    throw new Error(`Too many decimal places for ${currency}, max ${decimals}`);
  }
  const whole = BigInt(intPart) * denom;
  const frac = fracPart === "" ? 0n : BigInt(fracPart.padEnd(decimals, "0"));
  return whole + frac;
}

export function fromAtomic(amount: bigint, currency: string): string {
  if (!(currency in DENOMINATION)) {
    throw new Error(`Unknown currency ${currency}`);
  }
  const denom = DENOMINATION[currency];
  const decimals = getDecimals(currency);
  const whole = amount / denom;
  let remainder = amount % denom;
  if (decimals === 0) return `${whole}`;
  let fracStr = remainder.toString().padStart(decimals, "0");
  // trim trailing zeros
  fracStr = fracStr.replace(/0+$/g, "");
  return fracStr === "" ? `${whole}` : `${whole}.${fracStr}`;
}
