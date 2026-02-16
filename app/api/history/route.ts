import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyUser } from "@/lib/auth";
import { getPrices } from "@/lib/pricing/price-service";

export async function GET(req: Request) {
    const user = await verifyUser(req);
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("type"); // "deposits", "withdrawals", "transfers", "earnings", or "all"

    try {
        let chainTxs: any[] = [];
        let ledgerEntries: any[] = [];
        const prices = await getPrices();

        // Fetch Chain Transactions (Deposits/Withdrawals)
        if (!filter || filter === "all" || filter === "deposits" || filter === "withdrawals") {
            const where: any = { userId: user.userId };

            if (filter === "deposits") {
                where.direction = "INBOUND";
            } else if (filter === "withdrawals") {
                where.direction = "OUTBOUND";
            }

            chainTxs = await prisma.chainTransaction.findMany({
                where,
                orderBy: { createdAt: "desc" },

            });
        }

        // Fetch Ledger Entries (Transfers/Earnings and potentially completed dep/with)
        if (!filter || filter === "all" || filter === "transfers" || filter === "earnings") {
            const where: any = { userId: user.userId };

            if (filter === "transfers") {
                where.type = "TRANSFER";
            } else if (filter === "earnings") {
                where.type = "EARNING";
            } else if (filter === "deposits") {
                where.type = "DEPOSIT"; // Fetch deposits from ledger too if filtering
            } else if (filter === "withdrawals") {
                where.type = "WITHDRAWAL";
            }
            // If filter is "all" or undefined, we intentionally do NOT filter by type, 
            // so we capture ADJUSTMENT, DEPOSIT, WITHDRAWAL, TRANSFER, EARNING


            ledgerEntries = await prisma.ledgerEntry.findMany({
                where,
                orderBy: { createdAt: "desc" },

            });
        }

        // Normalize and Combine
        // We define a unified shape:
        // { id, type, amount, chain, status, txHash, createdAt, from, to }

        const normalizedChainTxs = chainTxs.map(tx => ({
            id: tx.id,
            type: tx.direction === "INBOUND" ? "DEPOSIT" : "WITHDRAWAL",
            amount: tx.amount,
            chain: tx.chain,
            status: tx.status,
            txHash: tx.txHash,

            createdAt: tx.createdAt,
            to: tx.to,
            source: "chain",
            usdAmount: Number(tx.amount) * (prices[tx.chain] || 0)
        }));

        const normalizedLedgerEntries = ledgerEntries.map(entry => ({
            id: entry.id,
            type: entry.type === "ADJUSTMENT" ? "DEPOSIT" : entry.type,
            amount: entry.amount,
            chain: entry.chain,
            status: "COMPLETED", // Ledger entries are final
            txHash: entry.referenceId, // Or null
            createdAt: entry.createdAt,
            source: "ledger",
            usdAmount: Number(entry.amount) * (prices[entry.chain] || 0)
        }));

        // Combine and Sort
        // De-duplicate strategies: 
        // If a ledger entry has a referenceId matching a chain tx, prefer the chain tx (as it has more info like hash/status updates)? 
        // Or prefer ledger?
        // Let's just concat for now and filter duplicates if needed.
        // Simple distinct by ID is not enough since they are from diff tables.

        // Use a map to handle duplicates if referenceId matches txHash (this is hypothetical)
        // For this task, simply concatenating is safe unless we see data duplication in UI.

        let allItems = [...normalizedChainTxs, ...normalizedLedgerEntries];

        // Filter based on requested type again to be sure (since "all" fetches everything)
        if (filter && filter !== "all") {
            const targetType = filter.toUpperCase().replace("S", ""); // DEPOSIT, WITHDRAWAL, TRANSFER, EARNING
            // Special handling because "deposits" -> "DEPOSIT", "withdrawals" -> "WITHDRAWAL"
            // "transfers" -> "TRANSFER", "earnings" -> "EARNING"
            // But strict split:
            // deposits -> type === DEPOSIT
            // withdrawals -> type === WITHDRAWAL
            // transfers -> type === TRANSFER
            // earnings -> type === EARNING

            allItems = allItems.filter(item => {
                if (filter === "deposits") return item.type === "DEPOSIT";
                if (filter === "withdrawals") return item.type === "WITHDRAWAL";
                if (filter === "transfers") return item.type === "TRANSFER";
                if (filter === "earnings") return item.type === "EARNING";
                return true;
            });
        }

        // Sort by Date Descending
        allItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return NextResponse.json(allItems);

    } catch (error) {
        console.error("History API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
