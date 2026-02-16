import { JsonRpcProvider, ethers, FetchRequest } from "ethers";
import { prisma } from "../prisma";

// Helper to create a resilient RPC provider
function createResilientProvider(rpcUrl: string) {
    const fetchReq = new FetchRequest(rpcUrl);
    fetchReq.timeout = 15000; // 15 second timeout instead of default 2 minutes
    fetchReq.retryFunc = async (req, resp, attempt) => {
        // Retry up to 2 times on timeout
        if (attempt >= 2) return false;
        return true;
    };

    return new JsonRpcProvider(fetchReq, undefined, {
        staticNetwork: true,
        polling: false
    });
}

export async function checkEvmNativeDeposits(
    chain: "ETH" | "BSC",
    rpcUrl: string
) {
    if (!rpcUrl) {
        console.error(`[${chain}] RPC URL not provided.`);
        return;
    }

    const provider = createResilientProvider(rpcUrl);

    try {
        // Ensure Prisma connection is alive
        await prisma.$connect();

        const wallets = await prisma.userWallet.findMany({
            where: { chain }
        });

        if (wallets.length === 0) {
            // console.log(`[${chain}] No wallets to monitor.`);
            return;
        }

        console.log(`[${chain}] Checking ${wallets.length} wallets...`);
        // Loop through each user wallet and check balance
        for (const wallet of wallets) {
            try {
                // Get current on-chain balance (in wei) with timeout
                const onChainBalance = await Promise.race([
                    provider.getBalance(wallet.address),
                    new Promise<never>((_, reject) =>
                        setTimeout(() => reject(new Error('Balance check timeout')), 10000)
                    )
                ]);

                const previous = BigInt(wallet.lastKnownBalance || "0");
                const current = BigInt(onChainBalance.toString());

                console.log(`[${chain}] Address ${wallet.address}: previous=${previous}, current=${current}`);

                if (current > previous) {
                    const delta = current - previous;
                    const amountReadable = ethers.formatEther(delta);

                    console.log(`[${chain}] 💰 Deposit detected for ${wallet.address}: +${amountReadable} (${delta.toString()} wei)`);

                    console.log(`[${chain}] Processing credit for user ${wallet.userId}...`);
                    // Atomic Update: Balance + Ledger + Wallet Snapshot
                    await prisma.$transaction(async (tx) => {
                        // 1. Update User Balance
                        await tx.userBalance.upsert({
                            where: {
                                userId_chain: {
                                    userId: wallet.userId,
                                    chain
                                }
                            },
                            update: {
                                balance: (BigInt((await tx.userBalance.findUnique({
                                    where: { userId_chain: { userId: wallet.userId, chain } }
                                }))?.balance || "0") + delta).toString()
                            },
                            create: {
                                userId: wallet.userId,
                                chain,
                                balance: delta.toString()
                            }
                        });

                        // 2. Create Ledger Entry
                        await tx.ledgerEntry.create({
                            data: {
                                userId: wallet.userId,
                                chain,
                                type: "DEPOSIT",
                                amount: delta.toString(),
                                referenceId: `native-deposit-${Date.now()}-${wallet.id}`
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

                    console.log(`[${chain}] ✅ DB Transaction complete for user ${wallet.userId}`);
                    console.log(`[${chain}] ✅ Credited ${amountReadable} to user ${wallet.userId}`);

                } else if (current < previous) {
                    // Balance decreased (withdraw or gas fee). Just update snapshot
                    console.log(`[${chain}] Balance decreased for ${wallet.address} (Withdrawal/Gas). Updating snapshot.`);
                    await prisma.userWallet.update({
                        where: { id: wallet.id },
                        data: {
                            lastKnownBalance: current.toString()
                        }
                    });
                }
                // else: current == previous, do nothing.

            } catch (err: any) {
                // Only log if it's not a common timeout/connection issue
                if (err.code !== 'TIMEOUT' && err.message !== 'Balance check timeout' && err.code !== 'ECONNRESET') {
                    console.error(`[${chain}] Error checking wallet ${wallet.address}:`, err.message || err);
                }
                // Silently continue for timeout errors
            }
        }
    } catch (globalErr: any) {
        // Only log critical errors, not connection issues
        if (globalErr.code !== 'P1017' && globalErr.code !== 'ECONNRESET') {
            console.error(`[${chain}] Monitor Error:`, globalErr.message || globalErr);
        }
        // For P1017 (connection closed), will reconnect on next iteration
    } finally {
        // Cleanup provider connections
        try {
            provider.destroy();
        } catch (e) {
            // Ignore cleanup errors
        }
    }
}
