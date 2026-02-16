import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { prisma } from "../prisma";

/**
 * Checks for Solana balance changes via polling.
 * This is more robust than WebSockets for public RPCs and handles new wallets automatically.
 */
export async function checkSolanaDeposits(rpcUrl: string) {
    if (!rpcUrl) {
        console.error("[SOL] RPC URL not provided.");
        return;
    }

    const connection = new Connection(rpcUrl, "confirmed");

    try {
        // Ensure Prisma is connected
        await prisma.$connect();

        const wallets = await prisma.userWallet.findMany({
            where: { chain: "SOL" }
        });

        if (wallets.length === 0) return;

        // Loop through each user wallet and check balance
        for (const wallet of wallets) {
            try {
                const pubkey = new PublicKey(wallet.address);

                // Get current on-chain balance with timeout
                const balance = await Promise.race([
                    connection.getBalance(pubkey),
                    new Promise<number>((_, reject) =>
                        setTimeout(() => reject(new Error('Solana balance check timeout')), 10000)
                    )
                ]);

                const previous = BigInt(wallet.lastKnownBalance || "0");
                const current = BigInt(balance);

                if (current > previous) {
                    const delta = current - previous;
                    const amountSol = Number(delta) / LAMPORTS_PER_SOL;

                    console.log(`[SOL] 💰 Deposit detected for ${wallet.address}: +${amountSol} SOL`);

                    await prisma.$transaction(async (tx) => {
                        // 1. Update User Balance (Ledger)
                        await tx.userBalance.upsert({
                            where: {
                                userId_chain: {
                                    userId: wallet.userId,
                                    chain: "SOL"
                                }
                            },
                            update: {
                                balance: (BigInt((await tx.userBalance.findUnique({
                                    where: { userId_chain: { userId: wallet.userId, chain: "SOL" } }
                                }))?.balance || "0") + delta).toString()
                            },
                            create: {
                                userId: wallet.userId,
                                chain: "SOL",
                                balance: delta.toString()
                            }
                        });

                        // 2. Ledger Entry
                        await tx.ledgerEntry.create({
                            data: {
                                userId: wallet.userId,
                                chain: "SOL",
                                type: "DEPOSIT",
                                amount: delta.toString(),
                                referenceId: `sol-deposit-${Date.now()}-${wallet.id}`
                            }
                        });

                        // 3. Update Wallet Snapshot
                        await tx.userWallet.update({
                            where: { id: wallet.id },
                            data: {
                                lastKnownBalance: current.toString()
                            }
                        });
                    });

                    console.log(`[SOL] ✅ Credited ${amountSol} SOL to user ${wallet.userId}`);
                } else if (current < previous) {
                    // Balance decreased (spending), just update snapshot
                    await prisma.userWallet.update({
                        where: { id: wallet.id },
                        data: {
                            lastKnownBalance: current.toString()
                        }
                    });
                }
            } catch (err: any) {
                if (err.message !== 'Solana balance check timeout') {
                    console.error(`[SOL] Error checking wallet ${wallet.address}:`, err.message || err);
                }
            }
        }
    } catch (globalErr: any) {
        if (globalErr.code !== 'P1017' && globalErr.code !== 'ECONNRESET') {
            console.error("[SOL] Monitor Error:", globalErr.message || globalErr);
        }
    }
}

// Legacy function for compatibility, redirected to polling or can be kept if needed
export async function startSolanaMonitor(rpcUrl: string) {
    console.log("[SOL] Initializing Polling Monitor...");
    // The actual polling is now handled in run-deposit-monitor.ts calling checkSolanaDeposits
}
