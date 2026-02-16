import { JsonRpcProvider } from "ethers";

// Cache to track the next expected nonce for each address
const nonceCache = new Map<string, number>();

/**
 * Get the next valid nonce for an address
 * 
 * Uses a local cache to increment nonces optimistically, preventing
 * race conditions when multiple transactions are sent rapidly.
 * 
 * @param address - The wallet address
 * @param provider - The ethers JsonRpcProvider
 * @returns The next nonce to use
 */
export async function getNextNonce(
    address: string,
    provider: JsonRpcProvider
): Promise<number> {
    // If we don't have a cached nonce, fetch the current pending one from the chain
    if (!nonceCache.has(address)) {
        const chainNonce = await provider.getTransactionCount(address, "pending");
        nonceCache.set(address, chainNonce + 1); // Next nonce will be current + 1
        return chainNonce;
    }

    // If we have a cached nonce, use it and increment
    const next = nonceCache.get(address)!;
    nonceCache.set(address, next + 1);
    return next;
}

/**
 * Reset the nonce cache for an address
 * Useful if a transaction fails or is dropped
 */
export function resetNonce(address: string) {
    nonceCache.delete(address);
}
