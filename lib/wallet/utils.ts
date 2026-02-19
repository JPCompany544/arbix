import { prisma } from "../prisma";
import { decryptSeed, verifyEncryptionKey, verifyMasterSeedEncrypted } from "../security/encryption";
import { networkConfig } from "../../core/network-config";
import type { SupportedChain } from "./types";

// Singleton cache for decrypted master seed
let cachedMasterSeed: string | null = null;

/**
 * Runtime Safety Guard
 */
export async function assertServerRuntime(): Promise<void> {
    if (process.env.NEXT_RUNTIME === "edge") {
        throw new Error("CRITICAL SECURITY ERROR: Cannot run in Edge runtime.");
    }
    if (typeof window !== "undefined") {
        throw new Error("CRITICAL SECURITY ERROR: Cannot run in browser context.");
    }
}

/**
 * Load and decrypt master seed
 */
export async function loadMasterSeed(): Promise<string> {
    await assertServerRuntime();
    if (cachedMasterSeed) return cachedMasterSeed;

    await verifyEncryptionKey();

    const mode = networkConfig.getMode();
    const envVar = mode === "mainnet" ? "MASTER_SEED_ENCRYPTED_MAINNET" : "MASTER_SEED_ENCRYPTED";
    const encrypted = process.env[envVar];

    if (!encrypted) {
        throw new Error(`CRITICAL SECURITY ERROR: ${envVar} not found in environment. Mode: ${mode}`);
    }

    // Safety: If in mainnet, ensure it's DIFFERENT from testnet seed to prevent logic leak
    if (mode === "mainnet" && encrypted === process.env.MASTER_SEED_ENCRYPTED) {
        throw new Error("CRITICAL SECURITY ERROR: Mainnet seed MUST be distinct from testnet seed.");
    }

    const decryptedMnemonic = await decryptSeed(encrypted);
    cachedMasterSeed = decryptedMnemonic;
    return decryptedMnemonic;
}

/**
 * Get master seed as Buffer
 */
export async function getMasterSeedBuffer(): Promise<Buffer> {
    const mnemonic = await loadMasterSeed();
    // Simple Buffer from hash for now (consistent with legacy engine)
    const crypto = await import("crypto");
    return crypto.createHash("sha512").update(mnemonic).digest();
}

/**
 * Verify complete seed configuration
 */
export async function verifySeedConfiguration(): Promise<boolean> {
    try {
        await loadMasterSeed();
        await getMasterSeedBuffer();
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Allocate Derivation Index
 */
export async function allocateDerivationIndex(
    userId: string,
    chain: SupportedChain
): Promise<number> {
    await assertServerRuntime();

    let retries = 0;
    const maxRetries = 5;

    while (retries < maxRetries) {
        try {
            return await prisma.$transaction(async (tx) => {
                const existing = await tx.userWallet.findUnique({
                    where: { userId_chain: { userId, chain } }
                });

                if (existing) return existing.derivationIndex;

                const maxResult = await tx.userWallet.aggregate({
                    _max: { derivationIndex: true },
                    where: { chain }
                });

                const nextIndex = (maxResult._max.derivationIndex ?? 0) + 1;

                await tx.userWallet.create({
                    data: {
                        userId,
                        chain,
                        derivationIndex: nextIndex,
                        address: "ADDRESS_NOT_GENERATED_YET"
                    }
                });

                return nextIndex;
            });
        } catch (error: any) {
            // P2002 is Prisma error for unique constraint violation
            if (error.code === 'P2002') {
                retries++;
                console.warn(`[Wallet Utils] Index collision for ${chain}, retrying... (${retries}/${maxRetries})`);
                // Short random backoff (jitter) to avoid synchronized retries
                await new Promise(r => setTimeout(r, 5 + Math.random() * 45));
                continue;
            }
            throw error;
        }
    }

    throw new Error(`Failed to allocate derivation index for ${chain} after ${maxRetries} retries.`);
}
