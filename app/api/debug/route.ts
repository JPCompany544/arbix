import { NextResponse } from "next/server";

export async function GET() {
    // Safe diagnostic — never expose actual credentials
    const dbUrl = process.env.DATABASE_URL || "NOT_SET";
    const dbUrlMainnet = process.env.DATABASE_URL_MAINNET || "NOT_SET";
    const network = process.env.NETWORK || "NOT_SET";
    const seedKey = process.env.SEED_ENCRYPTION_KEY ? "SET" : "NOT_SET";
    const seedMainnet = process.env.MASTER_SEED_ENCRYPTED_MAINNET ? "SET" : "NOT_SET";
    const seedTestnet = process.env.MASTER_SEED_ENCRYPTED ? "SET" : "NOT_SET";

    // Test Prisma connection
    let prismaStatus = "UNKNOWN";
    let prismaError = "";
    try {
        const { prisma } = await import("@/lib/prisma");
        const count = await prisma.user.count();
        prismaStatus = `CONNECTED (${count} users)`;
    } catch (e: any) {
        prismaStatus = "FAILED";
        prismaError = e.message?.substring(0, 300) || "Unknown error";
    }

    return NextResponse.json({
        network,
        DATABASE_URL: dbUrl.includes("@") ? dbUrl.replace(/:[^@:]+@/, ":****@") : dbUrl,
        DATABASE_URL_MAINNET: dbUrlMainnet.includes("@") ? dbUrlMainnet.replace(/:[^@:]+@/, ":****@") : dbUrlMainnet,
        SEED_ENCRYPTION_KEY: seedKey,
        MASTER_SEED_ENCRYPTED_MAINNET: seedMainnet,
        MASTER_SEED_ENCRYPTED: seedTestnet,
        prismaStatus,
        prismaError: prismaError || undefined,
    });
}
