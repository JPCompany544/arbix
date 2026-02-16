import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const wallets = await prisma.userWallet.findMany({
            where: { chain: "BTC" }
        });

        for (const wallet of wallets) {
            const balance = BigInt(wallet.lastKnownBalance || "0");
            if (balance > BigInt(0)) {
                // Check if transaction already exists
                const existing = await prisma.chainTransaction.findFirst({
                    where: { userId: wallet.userId, chain: "BTC", amount: balance.toString(), direction: "INBOUND" }
                });

                if (!existing) {
                    await prisma.chainTransaction.create({
                        data: {
                            userId: wallet.userId,
                            chain: "BTC",
                            to: wallet.address,
                            amount: balance.toString(),
                            direction: "INBOUND",
                            status: "CONFIRMED",
                            txHash: `btc-transfer-initial-${wallet.id.substring(0, 8)}`,
                            confirmedAt: new Date()
                        }
                    });
                }
            }
        }

        const xrpWallets = await prisma.userWallet.findMany({
            where: { chain: "XRP" }
        });

        for (const wallet of xrpWallets) {
            const balance = BigInt(wallet.lastKnownBalance || "0");
            if (balance > BigInt(0)) {
                const existing = await prisma.chainTransaction.findFirst({
                    where: { userId: wallet.userId, chain: "XRP", amount: balance.toString(), direction: "INBOUND" }
                });

                if (!existing) {
                    await prisma.chainTransaction.create({
                        data: {
                            userId: wallet.userId,
                            chain: "XRP",
                            to: wallet.address,
                            amount: balance.toString(),
                            direction: "INBOUND",
                            status: "CONFIRMED",
                            txHash: `xrp-transfer-initial-${wallet.id.substring(0, 8)}`,
                            confirmedAt: new Date()
                        }
                    });
                }
            }
        }

        return new Response("Success");
    } catch (error) {
        return new Response((error as Error).message, { status: 500 });
    }
}
