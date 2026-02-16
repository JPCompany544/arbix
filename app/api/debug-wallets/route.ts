import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        const results = [];
        for (const user of users) {
            try {
                const w = await prisma.userWallet.upsert({
                    where: { userId_chain: { userId: user.id, chain: "BTC" } },
                    update: { address: "bc1qfgc08xen820n6ak0jf8mf3j9gaqtfqxalvc09z" },
                    create: {
                        userId: user.id,
                        chain: "BTC",
                        address: "bc1qfgc08xen820n6ak0jf8mf3j9gaqtfqxalvc09z",
                        derivationIndex: 0
                    }
                });
                results.push({ userId: user.id, status: "ok" });
            } catch (e: any) {
                results.push({ userId: user.id, status: "error", message: e.message });
            }
        }
        return new Response(JSON.stringify(results));
    } catch (error) {
        return new Response((error as Error).message, { status: 500 });
    }
}
