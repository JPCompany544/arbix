"use server";

import { prisma } from "../prisma";
import { ethers } from "ethers";
import { Connection } from "@solana/web3.js";

// Confirmation thresholds
const CONFIRMATIONS = {
    ETH: 12,
    BSC: 5,
    SOL: 0 // Uses "finalized" status
};

/**
 * Credit Deposit to Internal Ledger
 * 
 * STEP 13 & 14: Atomic ledger credit for confirmed deposits
 */
async function creditDeposit(chainTx: any) {
    console.log(`[Tx Monitor] Crediting deposit ${chainTx.id} to user ${chainTx.userId}`);

    // Convert amount to smallest unit
    let amountSmallestUnit: bigint;

    if (chainTx.chain === "ETH" || chainTx.chain === "BSC") {
        amountSmallestUnit = ethers.parseEther(chainTx.amount);
    } else if (chainTx.chain === "SOL") {
        amountSmallestUnit = BigInt(Math.floor(parseFloat(chainTx.amount) * 1_000_000_000));
    } else {
        console.error(`[Tx Monitor] Unknown chain: ${chainTx.chain}`);
        return;
    }

    // Atomic credit
    await prisma.$transaction(async (tx) => {
        // Get or create balance
        const balance = await tx.userBalance.findUnique({
            where: { userId_chain: { userId: chainTx.userId, chain: chainTx.chain } }
        });

        const currentBalance = balance ? BigInt(balance.balance) : BigInt(0);
        const newBalance = currentBalance + amountSmallestUnit;

        await tx.userBalance.upsert({
            where: { userId_chain: { userId: chainTx.userId, chain: chainTx.chain } },
            update: { balance: newBalance.toString() },
            create: {
                userId: chainTx.userId,
                chain: chainTx.chain,
                balance: newBalance.toString()
            }
        });

        // Create ledger entry
        await tx.ledgerEntry.create({
            data: {
                userId: chainTx.userId,
                chain: chainTx.chain,
                amount: amountSmallestUnit.toString(),
                type: "DEPOSIT",
                referenceId: chainTx.id
            }
        });
    });

    console.log(`[Tx Monitor] ✅ Credited ${chainTx.amount} ${chainTx.chain} to user ${chainTx.userId}`);
}

/**
 * Monitor Pending Transactions
 * 
 * STEP 10: Background Poller
 * - Fetches BROADCASTED transactions
 * - Checks status on-chain
 * - Updates DB to CONFIRMED or FAILED
 * 
 * STEP 14: Credits deposits when confirmed
 */
export async function monitorPendingTransactions() {
    console.log("[Tx Monitor] Checking pending transactions...");

    try {
        const pending = await prisma.chainTransaction.findMany({
            where: {
                status: "BROADCASTED"
            }
        });

        if (pending.length === 0) {
            console.log("[Tx Monitor] No pending transactions found.");
            return;
        }

        console.log(`[Tx Monitor] Found ${pending.length} pending transactions.`);

        for (const tx of pending) {
            try {
                if (!tx.txHash) {
                    console.warn(`[Tx Monitor] Transaction ${tx.id} has status BROADCASTED but no txHash. Marking FAILED.`);
                    await prisma.chainTransaction.update({
                        where: { id: tx.id },
                        data: { status: "FAILED" }
                    });
                    continue;
                }

                console.log(`[Tx Monitor] Checking ${tx.chain} ${tx.direction} TX: ${tx.txHash}`);

                if (tx.chain === "ETH" || tx.chain === "BSC") {
                    const rpcUrl = tx.chain === "ETH" ? process.env.ETH_SEPOLIA_RPC : process.env.BSC_TESTNET_RPC;
                    if (!rpcUrl) {
                        console.error(`[Tx Monitor] RPC URL not configured for ${tx.chain}`);
                        continue;
                    }

                    const provider = new ethers.JsonRpcProvider(rpcUrl);
                    const receipt = await provider.getTransactionReceipt(tx.txHash);

                    if (receipt) {
                        const currentBlock = await provider.getBlockNumber();
                        const confirmations = currentBlock - receipt.blockNumber;
                        const requiredConfs = CONFIRMATIONS[tx.chain];

                        console.log(`[Tx Monitor] ${tx.chain} TX ${tx.txHash}: ${confirmations}/${requiredConfs} confirmations`);

                        // Check if we have enough confirmations
                        if (confirmations >= requiredConfs) {
                            if (receipt.status === 1) {
                                console.log(`[Tx Monitor] ${tx.chain} TX ${tx.txHash} CONFIRMED`);

                                await prisma.chainTransaction.update({
                                    where: { id: tx.id },
                                    data: {
                                        status: "CONFIRMED",
                                        confirmedAt: new Date(),
                                        blockNumber: BigInt(receipt.blockNumber)
                                    }
                                });

                                // Credit if deposit
                                if (tx.direction === "INBOUND") {
                                    await creditDeposit(tx);
                                }
                            } else if (receipt.status === 0) {
                                console.log(`[Tx Monitor] ${tx.chain} TX ${tx.txHash} FAILED (Reverted)`);
                                await prisma.chainTransaction.update({
                                    where: { id: tx.id },
                                    data: { status: "FAILED" }
                                });
                                // Note: For withdrawals, refund was already handled in signTransaction catch
                            }
                        } else {
                            console.log(`[Tx Monitor] ${tx.chain} TX ${tx.txHash} waiting for confirmations...`);
                        }
                    } else {
                        console.log(`[Tx Monitor] ${tx.chain} TX ${tx.txHash} still pending (no receipt)`);
                    }
                }

                if (tx.chain === "SOL") {
                    const rpcUrl = process.env.SOLANA_DEVNET_RPC;
                    if (!rpcUrl) {
                        console.error("[Tx Monitor] SOLANA_DEVNET_RPC not configured");
                        continue;
                    }

                    const connection = new Connection(rpcUrl, "confirmed");
                    const result = await connection.getSignatureStatus(tx.txHash);

                    const status = result.value;

                    if (status) {
                        // For Solana, require "finalized" for deposits, "confirmed" for withdrawals
                        const requiredStatus = tx.direction === "INBOUND" ? "finalized" : "confirmed";

                        if (status.confirmationStatus === "finalized" ||
                            (status.confirmationStatus === "confirmed" && requiredStatus === "confirmed")) {

                            console.log(`[Tx Monitor] SOL TX ${tx.txHash} CONFIRMED`);

                            await prisma.chainTransaction.update({
                                where: { id: tx.id },
                                data: {
                                    status: "CONFIRMED",
                                    confirmedAt: new Date()
                                }
                            });

                            // Credit if deposit
                            if (tx.direction === "INBOUND") {
                                await creditDeposit(tx);
                            }
                        } else if (status.err) {
                            console.log(`[Tx Monitor] SOL TX ${tx.txHash} FAILED:`, status.err);
                            await prisma.chainTransaction.update({
                                where: { id: tx.id },
                                data: { status: "FAILED" }
                            });
                        } else {
                            console.log(`[Tx Monitor] SOL TX ${tx.txHash} status: ${status.confirmationStatus}`);
                        }
                    } else {
                        console.log(`[Tx Monitor] SOL TX ${tx.txHash} status unknown (pending)`);
                    }
                }

            } catch (err) {
                console.error(`[Tx Monitor] Error processing tx ${tx.id}:`, err);
            }
        }
    } catch (err) {
        console.error("[Tx Monitor] Global error:", err);
    }
}
