import { prisma } from '../../../lib/prisma';
import { providerRegistry } from '../../../core/provider-registry';
import { ethers } from 'ethers';

export class WalletLifecycleService {
  /**
   * Get wallets with pagination and filtering
   */
  async getWallets(params: {
    network?: string;
    currency?: string;
    status?: string;
    page?: number;
    size?: number;
  }) {
    const { network, currency, status, page = 0, size = 20 } = params;

    const where: any = {};
    if (network) where.network = network;
    if (currency) where.currency = currency;
    if (status) where.status = status;

    const [wallets, total] = await Promise.all([
      prisma.walletLifecycle.findMany({
        where,
        skip: page * size,
        take: size,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.walletLifecycle.count({ where })
    ]);

    // fetch on-chain balances in parallel
    const withBalances = await Promise.all(wallets.map(async (w) => {
      let balance = 0n;
      try {
        if (w.network === 'ETH' || w.network === 'BSC') {
          const p = providerRegistry.getEvmProvider(w.network as any);
          const b = await p.getBalance(w.walletAddress);
          balance = BigInt(b.toString());
        }
      } catch (e) {
        console.error('balance fetch error for', w.walletAddress, e);
      }
      return { ...w, balance };
    }));

    return { wallets: withBalances, total, page, size };
  }

  /**
   * Refresh a single wallet's balance and update lastSyncedAt
   */
  async refreshWalletBalance(walletAddress: string): Promise<bigint> {
    let balance = 0n;
    let network = 'ETH'; // default

    const w = await prisma.walletLifecycle.findFirst({ where: { walletAddress } });
    if (w) network = w.network;

    try {
      if (network === 'ETH' || network === 'BSC') {
        const p = providerRegistry.getEvmProvider(network as any);
        const b = await p.getBalance(walletAddress);
        balance = BigInt(b.toString());
      }
    } catch (e) {
      console.error('balance fetch error', e);
    }

    await prisma.walletLifecycle.updateMany({
      where: { walletAddress },
      data: { createdAt: new Date() } // update timestamp (proxy for lastSyncedAt)
    });

    return balance;
  }

  /**
   * Count wallets by status per network
   */
  async countByStatus(network: string) {
    const result = await prisma.$queryRaw<Array<{ status: string; count: bigint }>>`
      SELECT "status", COUNT(*) as count
      FROM "WalletLifecycle"
      WHERE "network" = ${network}
      GROUP BY "status"
    `;
    return result.reduce((acc, r) => ({ ...acc, [r.status]: Number(r.count) }), {});
  }
}

export default WalletLifecycleService;
