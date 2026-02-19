import { prisma } from "../prisma";
import type { SupportedChain } from "./types";
import { chainFactory } from "../../core/chain-factory";
import { assertServerRuntime } from "./utils";

/**
 * Wallet Service - Wave 8 Extraction
 * 
 * High-level orchestration for multi-chain wallet operations.
 * Coordinates between ChainFactory, Prisma Internal Ledger, and security utils.
 */

/**
 * Generate (or retrieve) a deposit address for a user
 */
export async function generateAddress(
    userId: string,
    chain: SupportedChain
): Promise<string> {
    await assertServerRuntime();
    // Simply delegate to ChainFactory
    const result = await chainFactory.getChain(chain).generateAddress(userId);
    return result.address;
}

/**
 * Process a high-level withdrawal request
 */
export async function processWithdrawal(
    userId: string,
    chain: SupportedChain,
    params: { to: string; amount: string }
): Promise<{ txHash: string; id: string }> {
    await assertServerRuntime();

    const { to, amount: amountStr } = params;
    const chainImpl = chainFactory.getChain(chain);

    // 1. Calculate smallest unit for ledger
    const amountSmallestUnit = chainImpl.toSmallestUnit(amountStr);

    // 2. Atomic DB Transaction: Check Balance, Deduct, Create Ledger, Create ChainTx
    const txRecord = await prisma.$transaction(async (tx) => {
        const userBalance = await tx.userBalance.findUnique({
            where: { userId_chain: { userId, chain } }
        });

        const currentBalance = userBalance ? BigInt(userBalance.balance) : 0n;
        if (currentBalance < amountSmallestUnit) {
            throw new Error(`Insufficient internal balance. Available: ${currentBalance}, Required: ${amountSmallestUnit}`);
        }

        // Deduct
        await tx.userBalance.update({
            where: { userId_chain: { userId, chain } },
            data: { balance: (currentBalance - amountSmallestUnit).toString() }
        });

        // Ledger
        await tx.ledgerEntry.create({
            data: {
                userId,
                chain,
                amount: amountSmallestUnit.toString(),
                type: "WITHDRAWAL"
            }
        });

        // Chain Transaction (PENDING)
        return await tx.chainTransaction.create({
            data: {
                userId,
                chain,
                to,
                amount: amountStr,
                status: "PENDING"
            }
        });
    });

    try {
        // 3. Delegate Signing to Chain Module
        const result = await chainFactory.getChain(chain).sendWithdrawal({
            userId,
            to,
            value: amountStr
        });

        if (!result.txHash) throw new Error("No txHash returned from chain module");

        // 4. Update to BROADCASTED
        await prisma.chainTransaction.update({
            where: { id: txRecord.id },
            data: {
                txHash: result.txHash,
                status: "BROADCASTED"
            }
        });

        return { txHash: result.txHash, id: txRecord.id };

    } catch (error) {
        console.error(`[Wallet Service] Withdrawal failed:`, error);

        // 5. Automatic Refund
        await prisma.$transaction(async (tx) => {
            await tx.chainTransaction.update({
                where: { id: txRecord.id },
                data: { status: "FAILED" }
            });

            const refundBalance = await tx.userBalance.findUniqueOrThrow({
                where: { userId_chain: { userId, chain } }
            });
            const newBal = BigInt(refundBalance.balance) + amountSmallestUnit;

            await tx.userBalance.update({
                where: { userId_chain: { userId, chain } },
                data: { balance: newBal.toString() }
            });

            await tx.ledgerEntry.create({
                data: {
                    userId,
                    chain,
                    amount: amountSmallestUnit.toString(),
                    type: "ADJUSTMENT",
                    referenceId: `REFUND:${txRecord.id}`
                }
            });
        });

        throw error;
    }
}
