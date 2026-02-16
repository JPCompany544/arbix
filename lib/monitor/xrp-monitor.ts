import { prisma } from "../prisma";

/**
 * Monitors a hardcoded XRP address for balance changes.
 * Uses a public XRPL JSON-RPC endpoint.
 */
export async function checkXrpDeposits() {
    const address = "rLhHG4nVsAch1HtrURyaaAKLczAUgC2s9Y";

    try {
        const res = await fetch("https://xrplcluster.com", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                method: "account_info",
                params: [{ account: address, ledger_index: "validated" }]
            })
        });

        if (!res.ok) throw new Error("XRPL RPC error");

        const data = await res.json();
        if (data.result?.error) {
            if (data.result.error === 'actNotFound') {
                console.log(`[XRP] Account ${address} not yet activated (requires 10 XRP)`);
            }
            return;
        }

        const currentBalance = BigInt(data.result.account_data.Balance); // Balance is in drops (1 XRP = 1e6 drops)

        const wallets = await prisma.userWallet.findMany({
            where: {
                chain: "XRP",
                address: address
            }
        });

        for (const wallet of wallets) {
            const previous = BigInt(wallet.lastKnownBalance || "0");

            if (currentBalance > previous) {
                const delta = currentBalance - previous;

                await prisma.$transaction(async (tx) => {
                    await tx.userBalance.upsert({
                        where: { userId_chain: { userId: wallet.userId, chain: "XRP" } },
                        update: {
                            balance: (BigInt((await tx.userBalance.findUnique({
                                where: { userId_chain: { userId: wallet.userId, chain: "XRP" } }
                            }))?.balance || "0") + delta).toString()
                        },
                        create: {
                            userId: wallet.userId,
                            chain: "XRP",
                            balance: delta.toString()
                        }
                    });

                    // 2. Create Ledger Entry
                    await tx.ledgerEntry.create({
                        data: {
                            userId: wallet.userId,
                            chain: "XRP",
                            type: "DEPOSIT",
                            amount: delta.toString(),
                            referenceId: `xrp-deposit-${Date.now()}-${wallet.id}`
                        }
                    });

                    // 3. Create Chain Transaction (for UI History)
                    await tx.chainTransaction.create({
                        data: {
                            userId: wallet.userId,
                            chain: "XRP",
                            to: address,
                            amount: delta.toString(),
                            direction: "INBOUND",
                            status: "CONFIRMED",
                            txHash: `xrp-deposit-${Date.now()}-${wallet.id.substring(0, 8)}`,
                            confirmedAt: new Date()
                        }
                    });

                    // 4. Wallet Update
                    await tx.userWallet.update({
                        where: { id: wallet.id },
                        data: { lastKnownBalance: currentBalance.toString() }
                    });
                });

                console.log(`[XRP] 💰 Deposit detected for ${address}: +${Number(delta) / 1e6} XRP`);
            } else if (currentBalance < previous) {
                await prisma.userWallet.update({
                    where: { id: wallet.id },
                    data: { lastKnownBalance: currentBalance.toString() }
                });
            }
        }

    } catch (error) {
        console.error("[XRP] Monitor Error:", (error as Error).message);
    }
}
