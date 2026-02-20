import { prisma } from '../../../lib/prisma';

export class SnapshotService {
  /**
   * Get combined snapshot across all networks
   */
  async getCombinedSnapshot() {
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

    const assets = BigInt(assetRes[0]?.total ?? '0');
    let liabilities = BigInt(liabilityRes[0]?.total ?? '0');
    if (liabilities < 0n) liabilities = -liabilities; // normalize sign
    const equity = assets - liabilities;

    const lastSnapshot = await prisma.balanceSnapshot.findFirst({
      orderBy: { snapshotTime: 'desc' },
      take: 1
    });

    return {
      totalAssets: assets.toString(),
      totalLiabilities: liabilities.toString(),
      totalEquity: equity.toString(),
      lastSyncedAt: lastSnapshot?.snapshotTime || new Date()
    };
  }

  /**
   * Get snapshot for a specific network
   */
  async getNetworkSnapshot(network: string) {
    const assetRes: Array<{ total: string }> = await prisma.$queryRaw`
      SELECT COALESCE(SUM(e."debitAmount" - e."creditAmount"),0) AS total
      FROM "TreasuryEntry" e
      JOIN "TreasuryAccount" a ON a.id = e."accountId"
      WHERE a.type = 'ASSET' AND e."network" = ${network};
    `;
    const liabilityRes: Array<{ total: string }> = await prisma.$queryRaw`
      SELECT COALESCE(SUM(e."debitAmount" - e."creditAmount"),0) AS total
      FROM "TreasuryEntry" e
      JOIN "TreasuryAccount" a ON a.id = e."accountId"
      WHERE a.type = 'LIABILITY' AND e."network" = ${network};
    `;

    const assets = BigInt(assetRes[0]?.total ?? '0');
    let liabilities = BigInt(liabilityRes[0]?.total ?? '0');
    if (liabilities < 0n) liabilities = -liabilities;
    const equity = assets - liabilities;

    const walletCount = await prisma.walletLifecycle.count({ where: { network } });

    const lastSnapshot = await prisma.balanceSnapshot.findFirst({
      where: { network },
      orderBy: { snapshotTime: 'desc' },
      take: 1
    });

    return {
      network,
      totalAssets: assets.toString(),
      totalLiabilities: liabilities.toString(),
      totalEquity: equity.toString(),
      walletCount,
      lastSyncedAt: lastSnapshot?.snapshotTime || new Date()
    };
  }

  /**
   * Generate immutable snapshot
   */
  async generateSnapshot(): Promise<string> {
    const combined = await this.getCombinedSnapshot();
    const snap = await prisma.balanceSnapshot.create({
      data: {
        network: 'ETH',
        currency: 'ETH',
        totalAssets: BigInt(combined.totalAssets),
        totalLiabilities: BigInt(combined.totalLiabilities),
        totalEquity: BigInt(combined.totalEquity)
      }
    });
    return snap.id;
  }
}

export default SnapshotService;
