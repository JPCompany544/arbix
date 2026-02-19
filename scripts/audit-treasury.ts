import * as dotenv from "dotenv";
dotenv.config();
import { prisma } from "../lib/prisma";

async function main() {
    console.log("--- Treasury Data Audit ---");

    const treasuryStates = await prisma.treasuryState.findMany();
    console.log("\nTreasuryState entries:");
    console.table(treasuryStates.map(s => ({
        chain: s.chain,
        onchain: s.totalOnchainBalance,
        liabilities: s.totalUserLiabilities,
        sweepable: s.sweepableBalance,
        lastSynced: s.lastSyncedAt
    })));

    const userWallets = await prisma.userWallet.groupBy({
        by: ['chain'],
        _sum: {
            // lastKnownBalance is a String, we can't sum it in Prisma groupBy easily if we want BigInt
        },
        _count: {
            id: true
        }
    });

    console.log("\nUserWallets count by chain:");
    console.table(userWallets);

    // Sum lastKnownBalance manually for each chain
    for (const chain of ["ETH", "BSC", "SOL", "BTC", "XRP"]) {
        const wallets = await prisma.userWallet.findMany({ where: { chain } });
        let total = 0n;
        for (const w of wallets) {
            total += BigInt(w.lastKnownBalance || "0");
        }
        console.log(`${chain} Sum of UserWallet.lastKnownBalance: ${total.toString()}`);
    }

    console.log("\nUserBalance (Liabilities) sum by chain:");
    for (const chain of ["ETH", "BSC", "SOL", "BTC", "XRP"]) {
        const balances = await prisma.userBalance.findMany({ where: { chain } });
        let total = 0n;
        for (const b of balances) {
            total += BigInt(b.balance || "0");
        }
        console.log(`${chain} Sum of UserBalance.balance: ${total.toString()}`);
    }

    process.exit(0);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
