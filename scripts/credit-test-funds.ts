import * as dotenv from "dotenv";
dotenv.config();
import { prisma } from "../lib/prisma";
import { ethers } from "ethers";

/**
 * Credit Test Funds to User Internal Balance
 * 
 * STEP 13: Helper script to add funds for testing withdrawals
 */
async function creditTestFunds() {
    const userId = "cmli2bcpp0000dj58qvyfht0h";

    console.log("\n=== Crediting Test Funds to Internal Ledger ===\n");

    try {
        // Credit ETH
        const ethAmount = ethers.parseEther("0.01"); // 0.01 ETH in wei
        await prisma.$transaction(async (tx) => {
            await tx.userBalance.upsert({
                where: { userId_chain: { userId, chain: "ETH" } },
                update: {
                    balance: ethers.formatEther(ethAmount)
                },
                create: {
                    userId,
                    chain: "ETH",
                    balance: ethers.formatEther(ethAmount)
                }
            });

            await tx.ledgerEntry.create({
                data: {
                    userId,
                    chain: "ETH",
                    amount: ethers.formatEther(ethAmount),
                    type: "ADJUSTMENT",
                    referenceId: "TEST_CREDIT"
                }
            });
        });
        console.log(`✅ Credited 0.01 ETH (${ethAmount} wei) to user ${userId}`);

        // Credit BSC
        const bscAmount = ethers.parseEther("0.01"); // 0.01 BNB in wei
        await prisma.$transaction(async (tx) => {
            await tx.userBalance.upsert({
                where: { userId_chain: { userId, chain: "BSC" } },
                update: {
                    balance: ethers.formatEther(bscAmount)
                },
                create: {
                    userId,
                    chain: "BSC",
                    balance: ethers.formatEther(bscAmount)
                }
            });

            await tx.ledgerEntry.create({
                data: {
                    userId,
                    chain: "BSC",
                    amount: ethers.formatEther(bscAmount),
                    type: "ADJUSTMENT",
                    referenceId: "TEST_CREDIT"
                }
            });
        });
        console.log(`✅ Credited 0.01 BNB (${bscAmount} wei) to user ${userId}`);

        // Credit SOL
        const solAmount = BigInt(10_000_000); // 0.01 SOL in lamports
        await prisma.$transaction(async (tx) => {
            await tx.userBalance.upsert({
                where: { userId_chain: { userId, chain: "SOL" } },
                update: {
                    balance: (Number(solAmount) / 1_000_000_000).toString()
                },
                create: {
                    userId,
                    chain: "SOL",
                    balance: (Number(solAmount) / 1_000_000_000).toString()
                }
            });

            await tx.ledgerEntry.create({
                data: {
                    userId,
                    chain: "SOL",
                    amount: (Number(solAmount) / 1_000_000_000).toString(),
                    type: "ADJUSTMENT",
                    referenceId: "TEST_CREDIT"
                }
            });
        });
        console.log(`✅ Credited 0.01 SOL (${solAmount} lamports) to user ${userId}`);

        console.log("\n=== Checking Balances ===\n");

        const balances = await prisma.userBalance.findMany({
            where: { userId }
        });

        for (const bal of balances) {
            let humanReadable = bal.balance;
            // if (bal.chain === "ETH" || bal.chain === "BSC") {
            //    humanReadable = ethers.formatEther(bal.balance); // No longer needed
            // } else if (bal.chain === "SOL") {
            //    humanReadable = (Number(bal.balance) / 1_000_000_000).toString(); // No longer needed
            // }
            console.log(`${bal.chain}: ${humanReadable} (Standard Units)`);
        }

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

creditTestFunds().catch(console.error);
