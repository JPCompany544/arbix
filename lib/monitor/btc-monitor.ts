import { prisma } from "../prisma";

/**
 * Monitors a hardcoded BTC address for balance changes.
 * Since we don't have a full Node, we use a public explorer API.
 */
export async function checkBitcoinDeposits() {
    const address = "bc1qfgc08xen820n6ak0jf8mf3j9gaqtfqxalvc09z";

    try {
        // Fetch balance from Mempool.space (Public API)
        const res = await fetch(`https://mempool.space/api/address/${address}`);
        if (!res.ok) throw new Error("Mempool API error");

        const data = await res.json();
        const totalReceived = data.chain_stats.funded_txo_sum;
        const totalSpent = data.chain_stats.spent_txo_sum;
        const currentBalance = BigInt(totalReceived - totalSpent);

        // We need to associate this with a user. Since the address is hardcoded,
        // we'll apply it to any user that has a BTC wallet record, or just use a default for demo.
        // For this implementation, we look for ALL users who have this BTC address in their wallet table.
        const wallets = await prisma.userWallet.findMany({
            where: {
                chain: "BTC",
                address: address
            }
        });

        console.log(`[BTC] Checking ${wallets.length} wallets for address ${address}`);
        for (const wallet of wallets) {
            const previous = BigInt(wallet.lastKnownBalance || "0");
            console.log(`[BTC] User ${wallet.userId} previous: ${previous}, current: ${currentBalance}`);
            if (currentBalance > previous) {
                const delta = currentBalance - previous;

                await prisma.$transaction(async (tx) => {
                    // 1. Update Ledger
                    await tx.userBalance.upsert({
                        where: { userId_chain: { userId: wallet.userId, chain: "BTC" } },
                        update: {
                            balance: (BigInt((await tx.userBalance.findUnique({
                                where: { userId_chain: { userId: wallet.userId, chain: "BTC" } }
                            }))?.balance || "0") + delta).toString()
                        },
                        create: {
                            userId: wallet.userId,
                            chain: "BTC",
                            balance: delta.toString()
                        }
                    });

                    // 2. Create Ledger Entry
                    await tx.ledgerEntry.create({
                        data: {
                            userId: wallet.userId,
                            chain: "BTC",
                            type: "DEPOSIT",
                            amount: delta.toString(),
                            referenceId: `btc-deposit-${Date.now()}-${wallet.id}`
                        }
                    });

                    // 3. Create Chain Transaction (for UI History)
                    await tx.chainTransaction.create({
                        data: {
                            userId: wallet.userId,
                            chain: "BTC",
                            to: address,
                            amount: delta.toString(),
                            direction: "INBOUND",
                            status: "CONFIRMED",
                            txHash: `btc-deposit-${Date.now()}-${wallet.id.substring(0, 8)}`,
                            confirmedAt: new Date()
                        }
                    });

                    // 4. Wallet Update
                    await tx.userWallet.update({
                        where: { id: wallet.id },
                        data: { lastKnownBalance: currentBalance.toString() }
                    });
                });

                console.log(`[BTC] 💰 Deposit detected for ${address}: +${Number(delta) / 1e8} BTC`);
            } else if (currentBalance < previous) {
                // Update snapshot if decreased
                await prisma.userWallet.update({
                    where: { id: wallet.id },
                    data: { lastKnownBalance: currentBalance.toString() }
                });
            }
        }

    } catch (error) {
        console.error("[BTC] Monitor Error:", (error as Error).message);
    }
}
