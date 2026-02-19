"use server";

import { prisma } from "../prisma";
import { ethers } from "ethers";
import { Connection } from "@solana/web3.js";
import { networkConfig } from "../../core/network-config";
import { providerRegistry } from "../../core/provider-registry";

import { chainFactory } from "../../core/chain-factory";

// Confirmation thresholds - DEPRECATED: Thresholds are now inside chain modules
const CONFIRMATIONS = {
    ETH: 12,
    BSC: 5,
    SOL: 0
};

/**
 * Credit Deposit to Internal Ledger
 * 
 * STEP 13 & 14: Atomic ledger credit for confirmed deposits
 */
async function creditDeposit(chainTx: any) {
    console.log(`[Tx Monitor] Crediting deposit ${chainTx.id} to user ${chainTx.userId}`);

    const chainImpl = chainFactory.getChain(chainTx.chain);
    const amountSmallestUnit = chainImpl.toSmallestUnit(chainTx.amount);

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
// Helper to refund failed withdrawals
async function refundFailedWithdrawal(chainTx: any) {
    if (chainTx.direction !== "OUTBOUND") return;

    // Check if already refunded
    const alreadyAdjusted = await prisma.ledgerEntry.findFirst({
        where: { referenceId: `REFUND:${chainTx.id}` }
    });
    if (alreadyAdjusted) return;

    console.log(`[Tx Monitor] Refunding failed withdrawal ${chainTx.id} for user ${chainTx.userId}`);

    const chainImpl = chainFactory.getChain(chainTx.chain);
    const amountSmallestUnit = chainImpl.toSmallestUnit(chainTx.amount);

    await prisma.$transaction(async (tx) => {
        // Refund Balance
        const balance = await tx.userBalance.findUnique({
            where: { userId_chain: { userId: chainTx.userId, chain: chainTx.chain } }
        });
        const currentBalance = balance ? BigInt(balance.balance) : 0n;
        const newBalance = currentBalance + amountSmallestUnit;

        await tx.userBalance.upsert({
            where: { userId_chain: { userId: chainTx.userId, chain: chainTx.chain } },
            update: { balance: newBalance.toString() },
            create: { userId: chainTx.userId, chain: chainTx.chain, balance: newBalance.toString() }
        });

        // Add Ledger Entry
        await tx.ledgerEntry.create({
            data: {
                userId: chainTx.userId,
                chain: chainTx.chain,
                amount: amountSmallestUnit.toString(),
                type: "ADJUSTMENT",
                referenceId: `REFUND:${chainTx.id}`
            }
        });
    });
}

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
                    await refundFailedWithdrawal(tx);
                    continue;
                }

                console.log(`[Tx Monitor] Checking ${tx.chain} ${tx.direction} TX: ${tx.txHash}`);

                const chainImpl = chainFactory.getChain(tx.chain as any);
                // Cast to allow DROPPED status which we added to EthChain but interface might not reflect yet
                const result = await chainImpl.getTransactionStatus(tx.txHash, tx.direction as any) as any;

                if (result.status === "CONFIRMED") {
                    console.log(`[Tx Monitor] ${tx.chain} TX ${tx.txHash} CONFIRMED`);

                    await prisma.chainTransaction.update({
                        where: { id: tx.id },
                        data: {
                            status: "CONFIRMED",
                            confirmedAt: new Date(),
                            blockNumber: result.blockNumber
                        }
                    });

                    // Credit if deposit
                    if (tx.direction === "INBOUND") {
                        await creditDeposit(tx);
                    }
                } else if (result.status === "FAILED" || result.status === "DROPPED") {
                    console.log(`[Tx Monitor] ${tx.chain} TX ${tx.txHash} ${result.status} - Processing Refund`);

                    await prisma.chainTransaction.update({
                        where: { id: tx.id },
                        data: { status: "FAILED" }
                    });

                    // Automatically refund user for failed withdrawals
                    if (tx.direction === "OUTBOUND") {
                        await refundFailedWithdrawal(tx);
                    }

                } else {
                    // PENDING
                    if (result.confirmations !== undefined) {
                        console.log(`[Tx Monitor] ${tx.chain} TX ${tx.txHash}: ${result.confirmations}/${result.requiredConfirmations || '?'} confirmations`);
                    } else {
                        // Check if it's been pending for too long (e.g. > 15 mins) and assume dropped?
                        // For now, let's trust "DROPPED" status from chain impl or just wait.
                        const ageMinutes = (Date.now() - new Date(tx.createdAt).getTime()) / 60000;
                        if (ageMinutes > 30) {
                            console.warn(`[Tx Monitor] TX ${tx.txHash} pending for ${ageMinutes.toFixed(0)} mins. Marking FAILED (Timeout).`);
                            await prisma.chainTransaction.update({
                                where: { id: tx.id },
                                data: { status: "FAILED" }
                            });
                            await refundFailedWithdrawal(tx);
                        } else {
                            console.log(`[Tx Monitor] ${tx.chain} TX ${tx.txHash} still pending (${ageMinutes.toFixed(1)}m)...`);
                        }
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
