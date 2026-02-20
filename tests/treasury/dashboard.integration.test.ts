import assert from 'node:assert';
import { prisma } from '../../lib/prisma';
import { seedAccounts } from '../../src/treasury/setup/seedAccounts';
import SnapshotService from '../../src/treasury/services/SnapshotService';
import WalletLifecycleService from '../../src/treasury/services/WalletLifecycleService';
import SweepEngine from '../../src/treasury/sweep/SweepEngine';
import { TreasuryService } from '../../src/treasury/TreasuryService';

async function resetAll() {
  await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "trg_treasuryledger_before_update" ON "TreasuryLedger"`);
  await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "trg_treasuryledger_before_delete" ON "TreasuryLedger"`);
  await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "trg_treasuryentry_validate_line" ON "TreasuryEntry"`);
  await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "trg_treasuryledger_require_admin" ON "TreasuryLedger"`);
  await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "trg_treasuryentry_guard" ON "TreasuryEntry"`);

  await prisma.$executeRawUnsafe(`DELETE FROM "TreasuryEntry"`);
  await prisma.$executeRawUnsafe(`DELETE FROM "TreasuryLedger"`);
  await prisma.$executeRawUnsafe(`DELETE FROM "BalanceSnapshot"`);
  await prisma.$executeRawUnsafe(`DELETE FROM "Sweep"`);
  await prisma.$executeRawUnsafe(`DELETE FROM "WalletLifecycle"`);
  await prisma.$executeRawUnsafe(`DELETE FROM "TreasuryAccount"`);
}

async function run() {
  try {
    await resetAll();
    await seedAccounts();

    console.log('Testing SnapshotService...');
    const snapSvc = new SnapshotService();
    const combined = await snapSvc.getCombinedSnapshot();
    assert.ok(combined.totalAssets !== undefined);

    const ethSnap = await snapSvc.getNetworkSnapshot('ETH');
    assert.strictEqual(ethSnap.network, 'ETH');

    console.log('Testing WalletLifecycleService...');
    const wlSvc = new WalletLifecycleService();

    // create test wallets (unique per network/currency for ACTIVE status) using valid eth addresses
    await prisma.walletLifecycle.create({ data: { walletAddress: '0x1111111111111111111111111111111111111111', network: 'ETH', currency: 'ETH', userId: 'u1', status: 'ACTIVE' } });
    await prisma.walletLifecycle.create({ data: { walletAddress: '0x2222222222222222222222222222222222222222', network: 'BSC', currency: 'BNB', userId: 'u2', status: 'ACTIVE' } });

    const wallets = await wlSvc.getWallets({ page: 0, size: 10 });
    assert.ok(wallets.wallets.length >= 2);
    assert.ok(wallets.total >= 2);

    console.log('Testing SweepEngine dry-run...');
    const hot = await prisma.treasuryAccount.findFirst({ where: { name: 'Hot Wallet' } });
    if (!hot) throw new Error('hot missing');
    await prisma.treasuryAccount.update({ where: { id: hot.id }, data: { walletAddress: '0xhot', network: 'ETH', currency: 'ETH' } });

    const engine = new SweepEngine();
    const dryRun = await engine.sweepAll({
      network: 'ETH',
      currency: 'ETH',
      hotWalletAddress: '0xhot',
      dustThreshold: 1000000000000000n,
      adminId: 'test-admin',
      dryRun: true
    });

    // dry run should not create sweep or ledger records
    const sweepsBefore = await prisma.sweep.count();
    assert.strictEqual(sweepsBefore, 0, 'dry-run should not create sweep records');

    console.log('Dashboard integration tests passed');
  } finally {
    await prisma.$disconnect();
  }
}

run().catch(e => { console.error(e); process.exit(1); });
