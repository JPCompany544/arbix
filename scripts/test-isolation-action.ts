import { prisma } from "../lib/prisma";
import { networkConfig } from "../core/network-config";
import * as dotenv from "dotenv";

dotenv.config();

async function testIsolation() {
    const mode = networkConfig.getMode();
    console.log(`\n--- RUNNING ISOLATION TEST (Mode: ${mode.toUpperCase()}) ---`);

    try {
        const key = `isolation_test_${mode}`;
        const val = `value_${Date.now()}`;

        console.log(`[TEST] Writing ${key} to database...`);

        await prisma.systemSetting.upsert({
            where: { key },
            update: { value: val },
            create: { key, value: val }
        });

        const check = await prisma.systemSetting.findUnique({ where: { key } });
        console.log(`[TEST] ✅ Verify ${key} exists: ${check?.value === val ? "YES" : "NO"}`);

        // Also check if the OTHER mode's key exists
        const otherMode = mode === "mainnet" ? "testnet" : "mainnet";
        const otherKey = `isolation_test_${otherMode}`;
        const otherCheck = await prisma.systemSetting.findUnique({ where: { key: otherKey } });
        console.log(`[TEST] 🛡️ Check ${otherKey} presence (Should be null if first run): ${otherCheck ? "FOUND (Unexpected unless previously run)" : "NULL (Good)"}`);

    } catch (e: any) {
        console.error(`[TEST] ❌ FAILED: ${e.message}`);
    } finally {
        await prisma.$disconnect();
    }
}

testIsolation();
