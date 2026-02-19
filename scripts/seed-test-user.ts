import { prisma } from "../lib/prisma";
import { networkConfig } from "../core/network-config";
import * as bcrypt from "bcryptjs";

async function seedUser() {
    const mode = networkConfig.getMode();
    console.log(`\n--- Seeding Test User (${mode.toUpperCase()}) ---`);

    try {
        const email = "test@example.com";
        const password = await bcrypt.hash("password123", 10);

        const user = await prisma.user.upsert({
            where: { email },
            update: {},
            create: {
                email,
                password,
                role: "USER",
                status: "ACTIVE"
            }
        });

        console.log(`✅ User ${email} is ready! ID: ${user.id}`);
        console.log(`\nTo test this user in the UI, update the userId in app/wallet/page.tsx to: ${user.id}`);

    } catch (e: any) {
        console.error(`❌ Seed failed: ${e.message}`);
    } finally {
        await prisma.$disconnect();
    }
}

seedUser();
