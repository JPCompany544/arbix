import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";
import { chainFactory } from "@/core/chain-factory";
import { loadMasterSeed } from "@/lib/wallet/utils";
import { ethers } from "ethers";

export async function POST(req: Request) {
    const admin = await verifyAdmin();
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { chain, amount, address, sourceUserId } = await req.json();

        if (!chain || !amount || !address) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const chainImpl = chainFactory.getChain(chain);
        if (!chainImpl.isValidAddress(address)) {
            return NextResponse.json({ error: "Invalid destination address" }, { status: 400 });
        }

        // 1. Determine Source Wallet
        let effectiveSourceId = sourceUserId || 'system_treasury_vault';

        if (effectiveSourceId === 'system_treasury_vault') {
            // Ensure System Treasury User and Wallet (Index 0) exist
            await prisma.user.upsert({
                where: { email: 'system-treasury@platform.internal' },
                create: {
                    id: 'system_treasury_vault',
                    email: 'system-treasury@platform.internal',
                    password: 'SYSTEM_PROTECTED_VAULT',
                    role: 'ADMIN',
                    status: 'ACTIVE'
                },
                update: {}
            });
        }

        // 2. Perform On-Chain Withdrawal
        const result = await chainImpl.sendWithdrawal({
            userId: effectiveSourceId,
            to: address,
            value: amount
        });

        if (!result.txHash) {
            throw new Error("Withdrawal failed to produce a transaction hash");
        }

        // 3. Record the transaction in ChainTransaction for the Monitor to see
        const txRecord = await prisma.chainTransaction.create({
            data: {
                userId: admin.userId, // Record which admin actually triggered it
                chain,
                to: address,
                amount,
                txHash: result.txHash,
                direction: "OUTBOUND",
                status: "BROADCASTED"
            }
        });

        return NextResponse.json({
            success: true,
            txHash: result.txHash,
            id: txRecord.id
        });

    } catch (error: any) {
        console.error("Admin withdrawal error:", error);
        return NextResponse.json({
            error: error.message || "Failed to process admin withdrawal"
        }, { status: 500 });
    }
}
