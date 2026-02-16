"use server";

/**
 * Security & Encryption Module
 * 
 * STEP 2 - Real Encryption Implementation
 * 
 * ALGORITHM: AES-256-GCM
 * KEY DERIVATION: SHA-256 hash of SEED_ENCRYPTION_KEY
 * FORMAT: iv:authTag:ciphertext (base64 encoded)
 * 
 * CRITICAL SECURITY REQUIREMENTS:
 * - Never log decrypted seed
 * - Never expose encryption key
 * - Never return partial decrypted values
 * - Use Node.js crypto only (not browser crypto)
 * - Validate all inputs before operations
 */

import crypto from "crypto";

// Constants
const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16; // 128 bits for GCM
const AUTH_TAG_LENGTH = 16; // 128 bits
const KEY_LENGTH = 32; // 256 bits
const MIN_KEY_LENGTH = 32; // Minimum characters for encryption key

/**
 * Derive a 32-byte encryption key from the environment variable
 * Uses SHA-256 to ensure consistent key length
 */
function deriveEncryptionKey(): Buffer {
    const rawKey = process.env.SEED_ENCRYPTION_KEY;

    if (!rawKey) {
        throw new Error(
            "CRITICAL SECURITY ERROR: SEED_ENCRYPTION_KEY not found in environment variables. " +
            "This key is required for wallet encryption/decryption."
        );
    }

    if (rawKey.length < MIN_KEY_LENGTH) {
        throw new Error(
            `CRITICAL SECURITY ERROR: SEED_ENCRYPTION_KEY must be at least ${MIN_KEY_LENGTH} characters. ` +
            `Current length: ${rawKey.length}`
        );
    }

    // Derive 32-byte key using SHA-256
    return crypto.createHash("sha256").update(rawKey).digest();
}

/**
 * Encrypt master seed mnemonic
 * 
 * @param plainMnemonic - The plaintext mnemonic phrase to encrypt
 * @returns Encrypted string in format: iv:authTag:ciphertext (base64)
 * 
 * SECURITY: This function should ONLY be used during initial setup
 * to create the MASTER_SEED_ENCRYPTED value for .env
 */
export async function encryptSeed(plainMnemonic: string): Promise<string> {
    if (!plainMnemonic || plainMnemonic.trim().length === 0) {
        throw new Error("Cannot encrypt empty seed");
    }

    try {
        // Derive encryption key
        const key = deriveEncryptionKey();

        // Generate random IV
        const iv = crypto.randomBytes(IV_LENGTH);

        // Create cipher
        const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

        // Encrypt
        let encrypted = cipher.update(plainMnemonic, "utf8", "base64");
        encrypted += cipher.final("base64");

        // Get auth tag
        const authTag = cipher.getAuthTag();

        // Combine: iv:authTag:ciphertext (all base64 encoded)
        const result = [
            iv.toString("base64"),
            authTag.toString("base64"),
            encrypted
        ].join(":");

        console.log("[Security] Seed encrypted successfully using AES-256-GCM");

        return result;
    } catch (error) {
        console.error("[Security] Encryption failed:", error instanceof Error ? error.message : "Unknown error");
        throw new Error(`Seed encryption failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
}

/**
 * Decrypt master seed mnemonic
 * 
 * @param encrypted - Encrypted string in format: iv:authTag:ciphertext
 * @returns Decrypted mnemonic phrase
 * 
 * CRITICAL SECURITY WARNINGS:
 * - Never log the return value
 * - Never expose the return value to client
 * - Only call from server-side wallet engine
 * - Result should be kept in memory only
 */
export async function decryptSeed(encrypted: string): Promise<string> {
    if (!encrypted || encrypted.trim().length === 0) {
        throw new Error("Cannot decrypt empty encrypted seed");
    }

    try {
        // Parse encrypted format: iv:authTag:ciphertext
        const parts = encrypted.split(":");

        if (parts.length !== 3) {
            throw new Error(
                "Invalid encrypted seed format. Expected format: iv:authTag:ciphertext"
            );
        }

        const [ivBase64, authTagBase64, ciphertext] = parts;

        // Decode components
        const iv = Buffer.from(ivBase64, "base64");
        const authTag = Buffer.from(authTagBase64, "base64");

        // Validate lengths
        if (iv.length !== IV_LENGTH) {
            throw new Error(`Invalid IV length: ${iv.length}, expected ${IV_LENGTH}`);
        }

        if (authTag.length !== AUTH_TAG_LENGTH) {
            throw new Error(`Invalid auth tag length: ${authTag.length}, expected ${AUTH_TAG_LENGTH}`);
        }

        // Derive encryption key
        const key = deriveEncryptionKey();

        // Create decipher
        const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
        decipher.setAuthTag(authTag);

        // Decrypt
        let decrypted = decipher.update(ciphertext, "base64", "utf8");
        decrypted += decipher.final("utf8");

        console.log("[Security] Seed decrypted successfully (*** NEVER LOG THE VALUE ***)");

        return decrypted;
    } catch (error) {
        console.error("[Security] Decryption failed:", error instanceof Error ? error.message : "Unknown error");
        throw new Error(`Seed decryption failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
}

/**
 * Verify encryption key is present and valid
 * 
 * @throws Error if key is missing or invalid
 */
export async function verifyEncryptionKey(): Promise<void> {
    const rawKey = process.env.SEED_ENCRYPTION_KEY;

    if (!rawKey) {
        throw new Error(
            "SEED_ENCRYPTION_KEY not found in environment variables. " +
            "Add this to your .env file before using the wallet engine."
        );
    }

    if (rawKey.length < MIN_KEY_LENGTH) {
        throw new Error(
            `SEED_ENCRYPTION_KEY must be at least ${MIN_KEY_LENGTH} characters. ` +
            `Current length: ${rawKey.length}. ` +
            "Use a strong, random key for production."
        );
    }

    console.log("[Security] Encryption key validation: PASSED");
}

/**
 * Verify master seed encrypted value is present
 * 
 * @throws Error if encrypted seed is missing
 */
export async function verifyMasterSeedEncrypted(): Promise<void> {
    const encrypted = process.env.MASTER_SEED_ENCRYPTED;

    if (!encrypted) {
        throw new Error(
            "MASTER_SEED_ENCRYPTED not found in environment variables. " +
            "Add this to your .env file before using the wallet engine."
        );
    }

    // Validate format without decrypting
    const parts = encrypted.split(":");
    if (parts.length !== 3) {
        throw new Error(
            "MASTER_SEED_ENCRYPTED has invalid format. " +
            "Expected format: iv:authTag:ciphertext (base64 encoded)"
        );
    }

    console.log("[Security] Master seed encrypted value: PRESENT");
}
