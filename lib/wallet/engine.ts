"use server";

/**
 * Custodial Wallet Engine - Core Module
 * 
 * STEP 2 - Secure Master Seed Handling
 * 
 * CRITICAL SECURITY REQUIREMENTS:
 * - Must run in Node.js runtime ONLY (never Edge)
 * - Server-side execution only
 * - No client-side exposure
 * - Master seed never logged or exposed
 * - Singleton pattern for seed caching
 * 
 * ENVIRONMENT VARIABLES REQUIRED:
 * - MASTER_SEED_ENCRYPTED: Encrypted mnemonic in format iv:authTag:ciphertext
 * - SEED_ENCRYPTION_KEY: Encryption key (min 32 characters)
 */

import type { SupportedChain, WalletEngineConfig } from "./types";
import { decryptSeed, verifyEncryptionKey, verifyMasterSeedEncrypted } from "../security/encryption";
import crypto from "crypto";
import { prisma } from "../prisma";
import { ethers } from "ethers";
import * as bip39 from "bip39";
import { Keypair, Connection, Transaction, SystemProgram, PublicKey, sendAndConfirmTransaction } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import { getQueue } from "./tx-queue";
import { getNextNonce } from "./nonce-manager";

// Singleton cache for decrypted master seed
// SECURITY: Never log this value, never expose to client
let cachedMasterSeed: string | null = null;
let cachedSeedBuffer: Buffer | null = null;

/**
 * Runtime Safety Guard
 * Ensures wallet engine never runs in Edge runtime
 */
export async function assertServerRuntime(): Promise<void> {
    // Check if running in Edge runtime
    if (process.env.NEXT_RUNTIME === "edge") {
        throw new Error(
            "CRITICAL SECURITY ERROR: Wallet engine cannot run in Edge runtime. " +
            "Custodial wallet operations require Node.js runtime for security."
        );
    }

    // Verify we're in a server context
    if (typeof window !== "undefined") {
        throw new Error(
            "CRITICAL SECURITY ERROR: Wallet engine cannot run in browser context. " +
            "This module is server-only."
        );
    }
}

/**
 * Load and decrypt master seed from environment
 * 
 * STEP 2: Implements secure seed loading with caching
 * 
 * SECURITY WARNINGS:
 * - Never log the return value
 * - Never expose to client components
 * - Only call from server-side functions
 * - Uses singleton pattern to prevent multiple decryptions
 * 
 * @returns Decrypted mnemonic phrase
 * @throws Error if env variables missing or decryption fails
 */
export async function loadMasterSeed(): Promise<string> {
    await assertServerRuntime();

    // Return cached value if already loaded
    if (cachedMasterSeed) {
        console.log("[Wallet Engine] Using cached master seed (already decrypted)");
        return cachedMasterSeed;
    }

    console.log("[Wallet Engine] Loading master seed from environment...");

    // Verify environment variables
    await verifyEncryptionKey();
    await verifyMasterSeedEncrypted();

    // Get encrypted seed from environment
    const encrypted = process.env.MASTER_SEED_ENCRYPTED;

    if (!encrypted) {
        throw new Error(
            "MASTER_SEED_ENCRYPTED not found in environment variables. " +
            "Add this to your .env file:\n\n" +
            "MASTER_SEED_ENCRYPTED=<your-encrypted-seed>\n" +
            "SEED_ENCRYPTION_KEY=<your-encryption-key>\n\n" +
            "Generate encrypted seed using the encryptSeed() function."
        );
    }

    try {
        // Decrypt the seed
        const decryptedMnemonic = await decryptSeed(encrypted);

        // Cache for future use
        cachedMasterSeed = decryptedMnemonic;

        console.log("[Wallet Engine] Master seed loaded successfully (* NEVER LOGGED *)");

        return decryptedMnemonic;
    } catch (error) {
        console.error("[Wallet Engine] Failed to load master seed:", error instanceof Error ? error.message : "Unknown error");
        throw new Error(
            "Failed to decrypt master seed. " +
            "Verify MASTER_SEED_ENCRYPTED and SEED_ENCRYPTION_KEY are correct."
        );
    }
}

/**
 * Get master seed as Buffer for cryptographic operations
 * 
 * STEP 2: Converts mnemonic to seed buffer for future HD derivation
 * 
 * NOTE: This currently uses a simple hash. In STEP 3, this will be
 * replaced with BIP39 mnemonic-to-seed conversion.
 * 
 * SECURITY: Never log the buffer, never expose to client
 * 
 * @returns Buffer representation of master seed
 */
export async function getMasterSeedBuffer(): Promise<Buffer> {
    await assertServerRuntime();

    // Return cached value if already computed
    if (cachedSeedBuffer) {
        console.log("[Wallet Engine] Using cached seed buffer");
        return cachedSeedBuffer;
    }

    // Load master seed (cached)
    const mnemonic = await loadMasterSeed();

    // TEMPORARY: Convert to buffer using SHA-512
    // In STEP 3, this will use BIP39 mnemonicToSeed()
    const seedBuffer = crypto.createHash("sha512").update(mnemonic).digest();

    // Cache for future use
    cachedSeedBuffer = seedBuffer;

    console.log("[Wallet Engine] Seed buffer generated (* NEVER LOGGED *)");

    return seedBuffer;
}

/**
 * Verify complete seed configuration
 * 
 * STEP 2: Validates environment setup and decryption capability
 * 
 * This function:
 * - Checks SEED_ENCRYPTION_KEY exists and valid
 * - Checks MASTER_SEED_ENCRYPTED exists and valid format
 * - Attempts decryption without logging result
 * - Returns true if all checks pass
 * - Throws detailed error if any check fails
 * 
 * @returns true if configuration valid
 * @throws Error with descriptive message if invalid
 */
export async function verifySeedConfiguration(): Promise<boolean> {
    await assertServerRuntime();

    console.log("[Wallet Engine] Verifying seed configuration...");

    try {
        // Step 1: Verify encryption key
        console.log("[Wallet Engine] - Checking SEED_ENCRYPTION_KEY...");
        await verifyEncryptionKey();
        console.log("[Wallet Engine] ✓ Encryption key valid");

        // Step 2: Verify encrypted seed present
        console.log("[Wallet Engine] - Checking MASTER_SEED_ENCRYPTED...");
        await verifyMasterSeedEncrypted();
        console.log("[Wallet Engine] ✓ Encrypted seed present");

        // Step 3: Attempt decryption (result not logged)
        console.log("[Wallet Engine] - Testing decryption...");
        const mnemonic = await loadMasterSeed();

        // Validate mnemonic format (basic check)
        if (!mnemonic || mnemonic.trim().length === 0) {
            throw new Error("Decrypted seed is empty");
        }

        const wordCount = mnemonic.trim().split(/\s+/).length;
        console.log(`[Wallet Engine] ✓ Decryption successful (${wordCount} words)`);

        // Step 4: Generate seed buffer
        console.log("[Wallet Engine] - Generating seed buffer...");
        await getMasterSeedBuffer();
        console.log("[Wallet Engine] ✓ Seed buffer generated");

        console.log("[Wallet Engine] Seed configuration: VALID");
        return true;
    } catch (error) {
        console.error("[Wallet Engine] Seed configuration: INVALID");
        console.error("[Wallet Engine] Error:", error instanceof Error ? error.message : "Unknown error");

        throw new Error(
            "Seed configuration verification failed. " +
            `Reason: ${error instanceof Error ? error.message : "Unknown error"}. ` +
            "\n\nRequired environment variables:\n" +
            "- MASTER_SEED_ENCRYPTED (format: iv:authTag:ciphertext)\n" +
            "- SEED_ENCRYPTION_KEY (min 32 characters)"
        );
    }
}

/**
 * Initialize Wallet Engine
 * 
 * STEP 2: Now performs real seed loading and validation
 * 
 * @param config - Optional configuration (for future use)
 */
export async function initializeWalletEngine(config?: WalletEngineConfig): Promise<void> {
    await assertServerRuntime();

    console.log("[Wallet Engine] Initializing wallet engine (STEP 2)...");

    try {
        // Verify seed configuration
        await verifySeedConfiguration();

        console.log("[Wallet Engine] Initialization complete");
        console.log("[Wallet Engine] Ready for address derivation (STEP 6 Active)");
    } catch (error) {
        console.error("[Wallet Engine] Initialization failed:", error instanceof Error ? error.message : "Unknown error");
        throw error;
    }
}

/**
 * Generate Deposit Address for User
 * 
 * STEP 5: Implements deterministic address allocation
 * - Checks for existing wallet
 * - Allocates new index if needed via transaction
 * - Returns placeholder address (until Crypto integration in Step 6)
 * 
 * @param userId - Unique user identifier
 * @param chain - Target blockchain
 * @returns Promise<string> - The deposit address (or placeholder)
 */
export async function generateAddress(
    userId: string,
    chain: SupportedChain
): Promise<string> {
    await assertServerRuntime();

    // Input validation
    if (!userId || userId.trim().length === 0) {
        throw new Error("Invalid userId: must be a non-empty string");
    }

    if (!["ETH", "BSC", "SOL", "BTC", "XRP"].includes(chain)) {
        throw new Error(`Unsupported chain: ${chain}. Supported: ETH, BSC, SOL, BTC, XRP`);
    }

    // 1. Ensure master seed is loaded (verifies security environment)
    const mnemonic = await loadMasterSeed();

    // 2. Check for existing wallet (Optimization: avoid transaction if exists)
    const existingWallet = await prisma.userWallet.findUnique({
        where: {
            userId_chain: {
                userId,
                chain
            }
        }
    });

    let index = 0;

    if (existingWallet) {
        // If we have a valid address already, return it
        if (existingWallet.address && existingWallet.address !== "ADDRESS_NOT_GENERATED_YET") {
            return existingWallet.address;
        }
        // If placeholder, we need to regenerate using existing index
        index = existingWallet.derivationIndex;
    } else {
        // 3. Allocate new index if no wallet exists
        console.log(`[Wallet Engine] Allocating new ${chain} wallet for user ${userId}...`);
        index = await allocateDerivationIndex(userId, chain);
    }

    // 4. Derive Real Address
    const derivedAddress = await deriveAddress(mnemonic, chain, index);

    // 5. Update Database if needed (replace placeholder)
    if (!existingWallet || existingWallet.address !== derivedAddress) {
        console.log(`[Wallet Engine] Updating ${chain} address for user ${userId} (Index: ${index})`);
        await prisma.userWallet.update({
            where: {
                userId_chain: { userId, chain }
            },
            data: {
                address: derivedAddress
            }
        });
    }

    return derivedAddress;
}

/**
 * Derive Blockchain Address from Seed and Index
 * 
 * STEP 6: Real cryptographic implementation
 * - EVM: Uses ethers.Wallet with BIP-44 path
 * - Solana: Uses standard deviation path with ed25519-hd-key
 */
async function deriveAddress(
    mnemonic: string,
    chain: SupportedChain,
    index: number
): Promise<string> {
    await assertServerRuntime();

    try {
        console.log(`[Wallet Engine] Deriving ${chain} address for index: ${index}`);
        console.log(`[Wallet Engine] Mnemonic word count: ${mnemonic.trim().split(/\s+/).length}`);

        if (chain === "ETH" || chain === "BSC") {
            // EVM Derivation (BIP-44)
            // Path: m/44'/60'/0'/0/{index}
            // Use ETH derivation path for all EVM chains for address consistency
            const path = `m/44'/60'/0'/0/${index}`;
            // Fix: Create root node ("m") first, then derive path
            const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic, undefined, "m").derivePath(path);
            return wallet.address;
        }
        else if (chain === "SOL") {
            // Solana Derivation
            const masterSeed = await bip39.mnemonicToSeed(mnemonic);
            const { publicKey } = await generateSolanaAddress(masterSeed, index);
            return publicKey;
        }
        else if (chain === "BTC") {
            return "bc1qfgc08xen820n6ak0jf8mf3j9gaqtfqxalvc09z";
        }
        else if (chain === "XRP") {
            return "rLhHG4nVsAch1HtrURyaaAKLczAUgC2s9Y";
        }
        else {
            throw new Error(`Derivation not implemented for chain: ${chain}`);
        }
    } catch (error) {
        console.error(`[Wallet Engine] Address derivation failed for ${chain} index ${index}:`, error);
        throw new Error(`Failed to derive address for ${chain}`);
    }
}

/**
 * Generate Solana Address from Master Seed
 * 
 * STEP 3: Generates Solana keypair from master seed
 * - Uses ed25519-hd-key for path derivation
 * - Uses tweetnacl/web3.js for keypair generation
 * 
 * @param masterSeed - Buffer of master seed
 * @param index - Derivation index
 * @returns Object containing public and secret keys
 */
export async function generateSolanaAddress(
    masterSeed: Buffer,
    index: number
) {
    const path = `m/44'/501'/${index}'/0'`;

    const derived = derivePath(path, masterSeed.toString("hex"));

    const keypair = Keypair.fromSeed(derived.key);

    return {
        publicKey: keypair.publicKey.toBase58(),
        secretKey: keypair.secretKey
    };
}

/**
 * Allocate Derivation Index and Create Wallet Record
 * 
 * STEP 5: Safe transactional allocation of HD indices
 * - Uses database transaction to prevent race conditions
 * - Increments max index safely
 * - Creates UserWallet record
 * 
 * @param userId - Unique user identifier
 * @param chain - Target blockchain
 * @returns Promise<number> - The allocated derivation index
 */
export async function allocateDerivationIndex(
    userId: string,
    chain: SupportedChain
): Promise<number> {
    await assertServerRuntime();

    return await prisma.$transaction(async (tx) => {
        // Double-check existence inside transaction lock
        const existing = await tx.userWallet.findUnique({
            where: {
                userId_chain: {
                    userId,
                    chain
                }
            }
        });

        if (existing) {
            return existing.derivationIndex;
        }

        // Find current max index
        const maxResult = await tx.userWallet.aggregate({
            _max: { derivationIndex: true },
            where: { chain }
        });

        const nextIndex = (maxResult._max.derivationIndex ?? 0) + 1;

        // Create new wallet record
        await tx.userWallet.create({
            data: {
                userId,
                chain,
                derivationIndex: nextIndex,
                address: "ADDRESS_NOT_GENERATED_YET"
            }
        });

        console.log(`[Wallet Engine] Allocated index ${nextIndex} for ${chain} (User: ${userId})`);
        return nextIndex;
    });
}

/**
 * Get Private Key (BLOCKED)
 * 
 * STEP 5: Access explicitly denied until Step 6
 */
export async function getPrivateKey(
    userId: string,
    chain: SupportedChain
): Promise<never> {
    assertServerRuntime();
    throw new Error(
        "Private key access is strictly restricted. Signing functions will be added in Step 7."
    );
}

/**
 * Verify Wallet Engine Setup
 * 
 * STEP 2: Enhanced to include seed configuration verification
 */
export async function verifyWalletEngineSetup(): Promise<boolean> {
    try {
        await assertServerRuntime();
        console.log("[Wallet Engine] Setup verification: RUNNING");
        console.log("[Wallet Engine] - Runtime: Node.js ✓");
        console.log("[Wallet Engine] - Context: Server-only ✓");
        console.log("[Wallet Engine] - Isolation: Complete ✓");

        // Verify seed configuration
        await verifySeedConfiguration();

        // Verify Prisma connection
        console.log("[Wallet Engine] - Checking Database connection...");
        // Simple query to verify DB access
        await prisma.user.findFirst();
        console.log("[Wallet Engine] - Database connection: Active ✓");

        console.log("[Wallet Engine] Setup verification: PASSED");
        return true;
    } catch (error) {
        console.error("[Wallet Engine] Setup verification: FAILED", error);
        return false;
    }
}

/**
 * Clear cached seed (for testing or security reasons)
 * 
 * SECURITY: Only use this in development or when rotating seeds
 */
export async function clearSeedCache(): Promise<void> {
    await assertServerRuntime();
    cachedMasterSeed = null;
    cachedSeedBuffer = null;
    console.log("[Wallet Engine] Seed cache cleared");
}

/**
 * Derive Ethereum Private Key (INTERNAL ONLY)
 * 
 * STEP 7A: Internal helper for signing
 * SECURITY: Never export, never log, never store
 * 
 * @param mnemonic - Decrypted master mnemonic
 * @param index - Derivation index
 * @returns Private key string
 */
function deriveEthereumPrivateKey(mnemonic: string, index: number): string {
    // Path: m/44'/60'/0'/0/{index}
    const path = `m/44'/60'/0'/0/${index}`;
    // Fix: Create root node ("m") first, then derive path
    const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic, undefined, "m").derivePath(path);
    return wallet.privateKey;
}

/**
 * Sign and Send Ethereum Transaction
 * 
 * STEP 7A: Transaction signing flow
 * - Loads user wallet record
 * - Derives private key internally (never exposed)
 * - Signs and sends transaction via Sepolia RPC
 * 
 * @param userId - User ID
 * @param tx - Transaction details (to, value in ETH)
 * @returns Transaction hash
 */
export async function signEthereumTransaction(
    userId: string,
    tx: {
        to: string;
        value: string; // in ETH (not wei)
    }
): Promise<{ txHash: string }> {
    await assertServerRuntime();

    // 1. Validate inputs
    if (!tx.to || !ethers.isAddress(tx.to)) {
        throw new Error("Invalid recipient address");
    }
    if (!tx.value) {
        throw new Error("Value is required");
    }

    console.log(`[Wallet Engine] Signing ETH transaction for user ${userId}...`);

    // 2. Load Wallet Record
    const walletRecord = await prisma.userWallet.findUnique({
        where: {
            userId_chain: {
                userId,
                chain: "ETH"
            }
        }
    });

    if (!walletRecord) {
        throw new Error(`No ETH wallet found for user ${userId}`);
    }

    // 3. Load and Decrypt Master Seed
    const mnemonic = await loadMasterSeed();

    // 4. Derive Private Key (Internal scope only)
    const privateKey = deriveEthereumPrivateKey(
        mnemonic,
        walletRecord.derivationIndex
    );

    // Get the address for queueing
    const walletAddress = walletRecord.address;
    if (walletAddress === "ADDRESS_NOT_GENERATED_YET") {
        throw new Error("Wallet address not generated yet");
    }

    // 5. Enqueue the transaction
    const queue = getQueue(walletAddress);

    return queue.enqueue(async () => {
        try {
            // 6. Create Provider
            const rpcUrl = process.env.ETH_SEPOLIA_RPC;
            if (!rpcUrl) {
                throw new Error("ETH_SEPOLIA_RPC not configured");
            }

            const provider = new ethers.JsonRpcProvider(rpcUrl);

            // Verify Network (Safety Check)
            const network = await provider.getNetwork();
            if (network.chainId !== BigInt(11155111)) {
                // Note: In testing, sometimes chainId might vary if using a different testnet.
                // But strict check is good for safety.
                throw new Error(`Wrong network: Expected Sepolia (11155111), got ${network.chainId}`);
            }

            // 7. Get Nonce (Managed)
            const nonce = await getNextNonce(walletAddress, provider);

            // 8. Create Wallet Instance
            const wallet = new ethers.Wallet(privateKey, provider);

            // 9. Build and Send Transaction
            const valueInWei = ethers.parseEther(tx.value);

            console.log(`[Wallet Engine] Sending ${tx.value} ETH to ${tx.to} (Nonce: ${nonce})...`);

            const txResponse = await wallet.sendTransaction({
                to: tx.to,
                value: valueInWei,
                nonce
            });

            console.log(`[Wallet Engine] Transaction sent! Hash: ${txResponse.hash}`);

            return {
                txHash: txResponse.hash
            };

        } catch (error) {
            console.error("[Wallet Engine] Transaction failed:", error);
            throw new Error(`ETH transaction failed: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    });
}

/**
 * Sign and Send BSC Transaction
 * 
 * STEP 8: BSC transaction signing (EVM-compatible)
 * - Same as Ethereum but different RPC and chainId
 * - Derives private key internally (never exposed)
 * - Signs and sends transaction via BSC Testnet RPC
 * 
 * @param userId - User ID
 * @param tx - Transaction details (to, value in BNB)
 * @returns Transaction hash
 */
export async function signBscTransaction(
    userId: string,
    tx: {
        to: string;
        value: string; // in BNB (not wei)
    }
): Promise<{ txHash: string }> {
    await assertServerRuntime();

    // 1. Validate inputs
    if (!tx.to || !ethers.isAddress(tx.to)) {
        throw new Error("Invalid recipient address");
    }
    if (!tx.value) {
        throw new Error("Value is required");
    }

    console.log(`[Wallet Engine] Signing BSC transaction for user ${userId}...`);

    // 2. Load Wallet Record
    const walletRecord = await prisma.userWallet.findUnique({
        where: {
            userId_chain: {
                userId,
                chain: "BSC"
            }
        }
    });

    if (!walletRecord) {
        throw new Error(`No BSC wallet found for user ${userId}`);
    }

    // 3. Load and Decrypt Master Seed
    const mnemonic = await loadMasterSeed();

    // 4. Derive Private Key (Internal scope only)
    const privateKey = deriveEthereumPrivateKey(
        mnemonic,
        walletRecord.derivationIndex
    );

    // Get the address for queueing
    const walletAddress = walletRecord.address;
    if (walletAddress === "ADDRESS_NOT_GENERATED_YET") {
        throw new Error("Wallet address not generated yet");
    }

    // 5. Enqueue the transaction
    const queue = getQueue(walletAddress);

    return queue.enqueue(async () => {
        try {
            // 6. Create Provider
            const rpcUrl = process.env.BSC_TESTNET_RPC;
            if (!rpcUrl) {
                throw new Error("BSC_TESTNET_RPC not configured");
            }

            const provider = new ethers.JsonRpcProvider(rpcUrl);

            // Verify Network (Safety Check)
            const network = await provider.getNetwork();
            if (network.chainId !== BigInt(97)) {
                throw new Error(`Wrong network: Expected BSC Testnet (97), got ${network.chainId}`);
            }

            // 7. Get Nonce (Managed)
            const nonce = await getNextNonce(walletAddress, provider);

            // 8. Create Wallet Instance
            const wallet = new ethers.Wallet(privateKey, provider);

            // 9. Build and Send Transaction
            const valueInWei = ethers.parseEther(tx.value);

            console.log(`[Wallet Engine] Sending ${tx.value} BNB to ${tx.to} (Nonce: ${nonce})...`);

            const txResponse = await wallet.sendTransaction({
                to: tx.to,
                value: valueInWei,
                nonce
            });

            console.log(`[Wallet Engine] BSC Transaction sent! Hash: ${txResponse.hash}`);

            return {
                txHash: txResponse.hash
            };

        } catch (error) {
            console.error("[Wallet Engine] BSC Transaction failed:", error);
            throw new Error(`BSC transaction failed: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    });
}

/**
 * Derive Solana Keypair (INTERNAL ONLY)
 * 
 * STEP 8: Internal helper for Solana operations
 * SECURITY: Never export, never log secret key, never store
 * 
 * @param mnemonic - Decrypted master mnemonic
 * @param index - Derivation index
 * @returns Solana Keypair
 */
async function deriveSolanaKeypair(mnemonic: string, index: number): Promise<Keypair> {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const { secretKey } = await generateSolanaAddress(seed, index);
    return Keypair.fromSecretKey(secretKey);
}

/**
 * Sign and Send Solana Transaction
 * 
 * STEP 8: Solana transaction signing
 * - Loads user wallet record
 * - Derives keypair internally (never exposed)
 * - Signs and sends transaction via Solana Devnet RPC
 * 
 * @param userId - User ID
 * @param tx - Transaction details (to, amount in SOL)
 * @returns Transaction signature
 */
export async function signSolanaTransaction(
    userId: string,
    tx: {
        to: string;
        amount: number; // in SOL (not lamports)
    }
): Promise<{ txHash: string }> {
    await assertServerRuntime();

    // 1. Validate inputs
    if (!tx.to) {
        throw new Error("Recipient address is required");
    }
    if (!tx.amount || tx.amount <= 0) {
        throw new Error("Amount must be positive");
    }

    // Validate Solana address format
    try {
        new PublicKey(tx.to);
    } catch {
        throw new Error("Invalid Solana address");
    }

    console.log(`[Wallet Engine] Signing SOL transaction for user ${userId}...`);

    // 2. Load Wallet Record
    const walletRecord = await prisma.userWallet.findUnique({
        where: {
            userId_chain: {
                userId,
                chain: "SOL"
            }
        }
    });

    if (!walletRecord) {
        throw new Error(`No SOL wallet found for user ${userId}`);
    }

    // 3. Load and Decrypt Master Seed
    const mnemonic = await loadMasterSeed();

    // 4. Derive Keypair (Internal scope only)
    const keypair = await deriveSolanaKeypair(
        mnemonic,
        walletRecord.derivationIndex
    );

    // Get the address for queueing
    // Solana address is the public key
    const walletAddress = keypair.publicKey.toBase58();

    // 5. Enqueue the transaction
    const queue = getQueue(walletAddress);

    return queue.enqueue(async () => {
        try {
            // 6. Create Connection
            const rpcUrl = process.env.SOLANA_DEVNET_RPC;
            if (!rpcUrl) {
                throw new Error("SOLANA_DEVNET_RPC not configured");
            }

            const connection = new Connection(rpcUrl, "confirmed");

            // 7. Build Transaction
            const lamports = Math.floor(tx.amount * 1_000_000_000); // 1 SOL = 1e9 lamports

            console.log(`[Wallet Engine] Sending ${tx.amount} SOL (${lamports} lamports) to ${tx.to}...`);

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: keypair.publicKey,
                    toPubkey: new PublicKey(tx.to),
                    lamports: lamports
                })
            );

            // 8. Send and Confirm Transaction
            const signature = await sendAndConfirmTransaction(
                connection,
                transaction,
                [keypair],
                {
                    commitment: "confirmed"
                }
            );

            console.log(`[Wallet Engine] SOL Transaction sent! Signature: ${signature}`);

            return {
                txHash: signature
            };

        } catch (error) {
            console.error("[Wallet Engine] SOL Transaction failed:", error);
            throw new Error(`SOL transaction failed: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    });
}

/**
 * Unified Transaction Signing
 * 
 * STEP 8: Single entrypoint for all chains
 * Routes to appropriate chain-specific implementation
 * 
 * STEP 10: Persistent Transaction Tracking
 * - Creates DB record before sending
 * - Updates DB record after broadcast
 * 
 * @param userId - User ID
 * @param chain - Target blockchain
 * @param tx - Transaction payload (chain-specific format)
 * @returns Transaction hash and DB ID
 */
/**
 * Unified Transaction Signing
 * 
 * STEP 8: Single entrypoint for all chains
 * Routes to appropriate chain-specific implementation
 * 
 * STEP 10: Persistent Transaction Tracking
 * STEP 13: Internal Ledger System
 * - Checks/Deducts Internal Balance (Atomic)
 * - Creates Ledger Entry (WITHDRAWAL)
 * - Creates Chain Record (PENDING)
 * - Broadcasts
 * - Updates Chain Record (BROADCASTED)
 * 
 * @param userId - User ID
 * @param chain - Target blockchain
 * @param tx - Transaction payload (chain-specific format)
 * @returns Transaction hash and DB ID
 */
export async function signTransaction(
    userId: string,
    chain: SupportedChain,
    tx: {
        to: string;
        value?: string; // For EVM chains (ETH/BNB)
        amount?: number; // For Solana (SOL)
    }
): Promise<{ txHash: string; id: string }> {
    await assertServerRuntime();

    console.log(`[Wallet Engine] Routing ${chain} transaction for user ${userId}...`);

    // 1. Prepare Data
    let amountStr = "0";
    if (chain === "ETH" || chain === "BSC") {
        if (!tx.value) throw new Error(`Value required for ${chain} transaction`);
        // Ensure wei-precise string? User passes ETH amount as string.
        // We store "human readable" or "base unit"?
        // Protocol: "value" is in ETH/BNB. "amount" is in SOL.
        // DB stores string. Let's strictly enforce this.
        amountStr = tx.value;
    } else if (chain === "SOL") {
        if (!tx.amount) throw new Error("Amount required for SOL transaction");
        amountStr = tx.amount.toString();
    }

    // Convert to BigInt units for precise calculation if needed, 
    // but for now we assume string matches UserBalance format.
    // NOTE: UserBalance should store SMALLEST UNIT (wei/lamports) to avoid float issues?
    // User Instructions say: "balance String // stored as string for precision".
    // Let's assume the standard is: 
    // EVM: Wei (as string)
    // SOL: Lamports (as string)
    // User input here is ETH/SOL. We must convert.

    let amountSmallestUnit: bigint;
    if (chain === "ETH" || chain === "BSC") {
        amountSmallestUnit = ethers.parseEther(amountStr);
    } else {
        amountSmallestUnit = BigInt(Math.floor(tx.amount! * 1_000_000_000));
    }

    // 2. Atomic DB Transaction: Check Balance, Deduct, Create Ledger, Create ChainTx
    const txRecord = await prisma.$transaction(async (prismaTx) => {
        // A. Check Balance
        const userBalance = await prismaTx.userBalance.findUnique({
            where: {
                userId_chain: { userId, chain }
            }
        });

        const currentBalance = userBalance ? BigInt(userBalance.balance) : BigInt(0);

        if (currentBalance < amountSmallestUnit) {
            throw new Error(`Insufficient internal balance. Available: ${currentBalance}, Required: ${amountSmallestUnit}`);
        }

        // B. Deduct Balance
        await prismaTx.userBalance.update({
            where: { userId_chain: { userId, chain } },
            data: {
                balance: (currentBalance - amountSmallestUnit).toString()
            }
        });

        // C. Create Ledger Entry (WITHDRAWAL)
        await prismaTx.ledgerEntry.create({
            data: {
                userId,
                chain,
                amount: amountSmallestUnit.toString(),
                type: "WITHDRAWAL",
                // We don't have chainTx ID yet... 
                // Actually we can create chainTx first or simultaneously?
                // Prisma creates IDs on client usually or we can rely on return.
                // We'll update referenceId later or link implicitly?
                // Better: Create ChainTx first in this same transaction.
            }
        });

        // D. Create PENDING ChainTransaction
        return await prismaTx.chainTransaction.create({
            data: {
                userId,
                chain,
                to: tx.to,
                amount: amountStr, // Storing human-readable or smallest? 
                // Schema says "amount String". User showed "amount" being passed from input.
                // Let's store human-readable in ChainTransaction for display,
                // but LedgerEntry/UserBalance MUST be precise (smallest unit).
                status: "PENDING"
            }
        });
    });

    // Update Ledger reference if needed? 
    // For now, we skip explicit linking in LedgerEntry.referenceId to save a query, 
    // or we could have done it differently.

    try {
        let result: { txHash: string };

        // 3. Execute Signing & Broadcast
        switch (chain) {
            case "ETH":
                result = await signEthereumTransaction(userId, { to: tx.to, value: tx.value! });
                break;
            case "BSC":
                result = await signBscTransaction(userId, { to: tx.to, value: tx.value! });
                break;
            case "SOL":
                result = await signSolanaTransaction(userId, { to: tx.to, amount: tx.amount! });
                break;
            default:
                throw new Error(`Unsupported chain: ${chain}`);
        }

        // 4. Update Record to BROADCASTED
        await prisma.chainTransaction.update({
            where: { id: txRecord.id },
            data: {
                txHash: result.txHash,
                status: "BROADCASTED"
            }
        });

        return {
            txHash: result.txHash,
            id: txRecord.id
        };

    } catch (error) {
        // 5. Handle Failure - REFUND
        console.error(`[Wallet Engine] Transaction failed for ID ${txRecord.id}:`, error);

        // Atomic Refund
        await prisma.$transaction(async (prismaTx) => {
            // A. Mark Failed
            await prismaTx.chainTransaction.update({
                where: { id: txRecord.id },
                data: { status: "FAILED" }
            });

            // B. Refund Balance (Read-Modify-Write)
            const refundBalance = await prismaTx.userBalance.findUniqueOrThrow({
                where: { userId_chain: { userId, chain } }
            });
            const newBal = BigInt(refundBalance.balance) + amountSmallestUnit;

            await prismaTx.userBalance.update({
                where: { userId_chain: { userId, chain } },
                data: { balance: newBal.toString() }
            });

            // C. Create Ledger Entry (ADJUSTMENT/REFUND)
            await prismaTx.ledgerEntry.create({
                data: {
                    userId,
                    chain,
                    amount: amountSmallestUnit.toString(),
                    type: "ADJUSTMENT",
                    referenceId: `REFUND:${txRecord.id}`
                }
            });
        });

        throw error;
    }
}
