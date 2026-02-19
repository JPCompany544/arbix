import { PrismaClient } from "../prisma/client";

const prismaClientSingleton = () => {
    // Determine which DB to use
    const envMode = process.env.NETWORK || process.env.NETWORK_MODE || "testnet";
    const mode = envMode.toLowerCase();
    const isMainnet = mode === "mainnet" || mode === "production";

    let url = process.env.DATABASE_URL;

    if (isMainnet) {
        if (process.env.DATABASE_URL_MAINNET) {
            url = process.env.DATABASE_URL_MAINNET;
        } else {
            console.warn(`[DB] WARNING: Mainnet mode but DATABASE_URL_MAINNET is missing. Falling back to DATABASE_URL.`);
        }
    }

    // Safety check for common pollution
    if (url?.includes("user:Johnpaul%403")) {
        console.warn("[DB] CRITICAL: Environment pollution detected. Using 'user' instead of 'postgres'. Auto-correcting...");
        url = url.replace("user:Johnpaul%403", "postgres:Johnpaul%403");
    }

    const redactedUrl = url ? url.replace(/:[^@:]+@/, ":****@") : "MISSING";
    console.log(`[DB] Initializing Prisma - Mode: ${mode.toUpperCase()}, Target: ${redactedUrl}`);

    return new PrismaClient({
        datasources: {
            db: { url }
        }
    });
};

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
