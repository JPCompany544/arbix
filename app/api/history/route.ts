import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyUser } from "@/lib/auth";
import { getPrices } from "@/lib/pricing/price-service";
import { chainFactory } from "@/core/chain-factory";
import { SupportedChain } from "@/lib/wallet/types";
import { networkConfig } from "@/core/network-config";

export async function GET(req: Request) {
    const user = await verifyUser(req);
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("type"); // "deposits", "withdrawals", "transfers", "earnings", or "all"

    try {
        const prices = await getPrices();

        // 1. Fetch Chain Transactions (Deposits/Withdrawals)
        const chainWhere: any = { userId: user.userId };
        if (filter === "deposits") chainWhere.direction = "INBOUND";
        else if (filter === "withdrawals") chainWhere.direction = "OUTBOUND";

        const chainTxs = await prisma.chainTransaction.findMany({
            where: chainWhere,
            orderBy: { createdAt: "desc" },
        });

        // 2. Fetch Ledger Entries (Transfers/Earnings/Adjustments)
        const ledgerWhere: any = { userId: user.userId };
        if (filter === "transfers") ledgerWhere.type = "TRANSFER";
        else if (filter === "earnings") ledgerWhere.type = "EARNING";

        const ledgerEntries = await prisma.ledgerEntry.findMany({
            where: ledgerWhere,
            orderBy: { createdAt: "desc" },
        });

        // 3. Normalize & Transform
        const normalizedChainTxs = chainTxs.map(tx => {
            const amount = tx.amount;
            const explorerBase = networkConfig.getExplorerUrl(tx.chain);
            const explorerUrl = tx.txHash ? `${explorerBase}/tx/${tx.txHash}` : null;

            return {
                id: tx.id,
                type: tx.direction === "INBOUND" ? "DEPOSIT" : "WITHDRAWAL",
                amount,
                chain: tx.chain,
                status: tx.status,
                txHash: tx.txHash,
                explorerUrl,
                createdAt: tx.createdAt,
                to: tx.to,
                source: "chain",
                usdAmount: parseFloat(amount) * (prices[tx.chain] || 0)
            };
        });

        const normalizedLedgerEntries = ledgerEntries.map(entry => {
            const chain = entry.chain as SupportedChain;
            let humanAmount = entry.amount;

            try {
                // Ledger 'amount' is stored as smallest unit
                const chainImpl = chainFactory.getChain(chain);
                humanAmount = chainImpl.toHumanUnit(entry.amount);
            } catch (e) {
                console.warn(`Could not convert units for entry ${entry.id}`, e);
            }

            const explorerBase = networkConfig.getExplorerUrl(entry.chain);
            const explorerUrl = entry.referenceId && entry.referenceId !== "POLLING_DETECTED" && entry.referenceId.startsWith('0x')
                ? `${explorerBase}/tx/${entry.referenceId}`
                : null;

            return {
                id: entry.id,
                type: entry.type === "ADJUSTMENT" ? "DEPOSIT" : entry.type,
                amount: humanAmount,
                chain: entry.chain,
                status: "COMPLETED",
                txHash: entry.referenceId,
                explorerUrl,
                createdAt: entry.createdAt,
                source: "ledger",
                usdAmount: parseFloat(humanAmount) * (prices[entry.chain] || 0)
            };
        });

        // 4. Combine and deduplicate
        const knownHashes = new Set(normalizedChainTxs.map(tx => tx.txHash).filter(Boolean));

        const deduplicatedLedger = normalizedLedgerEntries.filter(entry => {
            if (!entry.txHash) return true;
            return !knownHashes.has(entry.txHash);
        });

        let allItems = [...normalizedChainTxs, ...deduplicatedLedger];

        // 5. Final Filter & Sort
        if (filter && filter !== "all") {
            allItems = allItems.filter(item => {
                const f = filter.toLowerCase();
                if (f === "deposits") return item.type === "DEPOSIT";
                if (f === "withdrawals") return item.type === "WITHDRAWAL";
                if (f === "transfers") return item.type === "TRANSFER";
                if (f === "earnings") return item.type === "EARNING";
                return true;
            });
        }

        allItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return NextResponse.json(allItems);

    } catch (error) {
        console.error("History API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
