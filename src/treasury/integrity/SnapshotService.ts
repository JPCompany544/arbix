import { prisma } from "../../../lib/prisma";

export class SnapshotService {
  async generateSnapshot(): Promise<string> {
    // aggregate assets and liabilities
    const assetRes: Array<{ total: string }> = await prisma.$queryRaw`
      SELECT COALESCE(SUM(e."debitAmount" - e."creditAmount"),0) AS total
      FROM "TreasuryEntry" e
      JOIN "TreasuryAccount" a ON a.id = e."accountId"
      WHERE a.type = 'ASSET';
    `;
    const liabilityRes: Array<{ total: string }> = await prisma.$queryRaw`
      SELECT COALESCE(SUM(e."debitAmount" - e."creditAmount"),0) AS total
      FROM "TreasuryEntry" e
      JOIN "TreasuryAccount" a ON a.id = e."accountId"
      WHERE a.type = 'LIABILITY';
    `;
    const assets = BigInt(assetRes[0]?.total ?? "0");
    let liabilities = BigInt(liabilityRes[0]?.total ?? "0");
    // liabilities may be recorded as negative (credit-heavy). Normalize to magnitude.
    if (liabilities < 0n) liabilities = -liabilities;
    const equity = assets - liabilities;

    if (assets !== liabilities + equity) {
      throw new Error("Accounting identity does not hold, snapshot aborted");
    }

    const snap = await prisma.balanceSnapshot.create({
      data: {
        network: "ETH",
        currency: "ETH",
        totalAssets: assets,
        totalLiabilities: liabilities,
        totalEquity: equity,
      },
    });
    return snap.id;
  }

  async getLatestSnapshot() {
    return prisma.balanceSnapshot.findFirst({
      orderBy: { snapshotTime: "desc" },
    });
  }
}
