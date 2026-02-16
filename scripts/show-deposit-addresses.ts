import * as dotenv from "dotenv";
dotenv.config();
import { prisma } from "../lib/prisma";
import { ethers } from "ethers";

/**
 * Display User Address for Deposit Testing
 * 
 * STEP 14: Shows addresses where test deposits can be sent
 */
async function showDepositAddresses() {
    const userId = "cmli2bcpp0000dj58qvyfht0h";

    console.log("\n=== User Deposit Addresses ===\n");
    console.log("Send test funds to these addresses to test deposit detection:\n");

    try {
        const wallets = await prisma.userWallet.findMany({
            where: { userId }
        });

        for (const wallet of wallets) {
            console.log(`┌─ ${wallet.chain} ─────────────────────────────────────────────┐`);
            console.log(`│ Address: ${wallet.address}`);
            console.log(`│ User ID: ${wallet.userId}`);
            console.log(`│ Derivation Index: ${wallet.derivationIndex}`);
            console.log(`└${"─".repeat(60)}┘\n`);

            // Get faucet links
            if (wallet.chain === "ETH") {
                console.log(`  🚰 Faucet: https://sepoliafaucet.com`);
                console.log(`  🔍 Explorer: https://sepolia.etherscan.io/address/${wallet.address}\n`);
            } else if (wallet.chain === "BSC") {
                console.log(`  🚰 Faucet: https://testnet.bnbchain.org/faucet-smart`);
                console.log(`  🔍 Explorer: https://testnet.bscscan.com/address/${wallet.address}\n`);
            } else if (wallet.chain === "SOL") {
                console.log(`  🚰 Faucet: solana airdrop 1 ${wallet.address} --url devnet`);
                console.log(`  🔍 Explorer: https://explorer.solana.com/address/${wallet.address}?cluster=devnet\n`);
            }
        }

        // Show current balances
        console.log("\n=== Current Internal Balances ===\n");

        const balances = await prisma.userBalance.findMany({
            where: { userId }
        });

        for (const bal of balances) {
            let humanReadable = "";
            if (bal.chain === "ETH" || bal.chain === "BSC") {
                humanReadable = ethers.formatEther(bal.balance);
            } else if (bal.chain === "SOL") {
                humanReadable = (Number(bal.balance) / 1_000_000_000).toFixed(9);
            }
            console.log(`${bal.chain}: ${humanReadable}`);
        }

        // Show scan state
        console.log("\n=== Chain Scan State ===\n");

        const scanStates = await prisma.chainScanState.findMany();

        for (const state of scanStates) {
            console.log(`${state.chain}: Block ${state.lastScannedBlock}`);
        }

        console.log("\n💡 After sending test funds:");
        console.log("   1. Run: npx tsx scripts/run-deposit-monitor.ts");
        console.log("   2. Wait for confirmations (ETH: 12 blocks, BSC: 5 blocks, SOL: finalized)");
        console.log("   3. Check balance: npx tsx scripts/check-ledger.ts\n");

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

showDepositAddresses().catch(console.error);
