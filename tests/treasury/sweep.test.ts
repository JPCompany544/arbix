import assert from 'node:assert';
import { prisma } from '../../lib/prisma';
import { seedAccounts } from '../../src/treasury/setup/seedAccounts';
import SweepEngine from '../../src/treasury/sweep/SweepEngine';
import { TreasuryService } from '../../src/treasury/TreasuryService';

class MockChain {
  balances: Record<string, bigint> = {};
  constructor() {}
  async getBalance(address: string) { return this.balances[address] || 0n; }
  async estimateFee(_params: { to: string; value: bigint }) { return 21000n * 1000000000n; }
  async send(_params: { from: string; to: string; value: bigint }) { return { txHash: '0xdeadbeef' }; }
  async getTransactionStatus(_txHash: string) { return { status: 'CONFIRMED' as const }; }
}

async function resetAll() {
  // remove triggers that enforce immutability for test reset
  await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "trg_treasuryledger_before_update" ON "TreasuryLedger"`);
  await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "trg_treasuryledger_before_delete" ON "TreasuryLedger"`);
  await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "trg_treasuryentry_validate_line" ON "TreasuryEntry"`);
  await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "trg_treasuryledger_require_admin" ON "TreasuryLedger"`);
  await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "trg_treasuryentry_guard" ON "TreasuryEntry"`);

  await prisma.$executeRawUnsafe(`DELETE FROM "TreasuryEntry"`);
  await prisma.$executeRawUnsafe(`DELETE FROM "TreasuryLedger"`);
  await prisma.$executeRawUnsafe(`DELETE FROM "Sweep"`);
  await prisma.$executeRawUnsafe(`DELETE FROM "WalletLifecycle"`);
  await prisma.$executeRawUnsafe(`DELETE FROM "TreasuryAccount"`);
}

async function run() {
  try {
    await resetAll();
    await seedAccounts();

    // create deposit treasury account and wallet lifecycle
    const depositAccount = await prisma.treasuryAccount.create({ data: { name: 'Deposit A', type: 'ASSET', currency: 'ETH', network: 'ETH', walletAddress: '0xdep' } });
    let hotAccount = await prisma.treasuryAccount.findFirst({ where: { name: 'Hot Wallet' } });
    if (!hotAccount) throw new Error('hot missing');
    // ensure hot wallet has an on-chain address for sweeping target
    if (!hotAccount.walletAddress) {
      hotAccount = await prisma.treasuryAccount.update({ where: { id: hotAccount.id }, data: { walletAddress: '0xhot', network: 'ETH', currency: 'ETH' } });
    } else {
      // ensure network/currency set
      await prisma.treasuryAccount.update({ where: { id: hotAccount.id }, data: { network: 'ETH', currency: 'ETH' } });
    }
    if (!hotAccount) throw new Error('hot missing');
    await prisma.walletLifecycle.create({ data: { walletAddress: '0xdep', network: 'ETH', currency: 'ETH', userId: 'ops', status: 'ACTIVE' } });

    const mock = new MockChain();
    mock.balances['0xdep'] = 1000000000000000000n; // 1 ETH

    const engine = new SweepEngine({ chainAdapter: mock as any, validate2FA: async () => true, rateLimitMs: 0 });

    const res = await engine.sweepAll({ network: 'ETH', currency: 'ETH', hotWalletAddress: hotAccount.walletAddress!, dustThreshold: 1000n, adminId: 'ops' });

    // assert sweep record
    const sweepRec = await prisma.sweep.findFirst({ where: { fromWallet: '0xdep' } });
    assert.ok(sweepRec && sweepRec.status === 'CONFIRMED');

    // wallet lifecycle updated
    const w = await prisma.walletLifecycle.findFirst({ where: { walletAddress: '0xdep' } });
    assert.ok(w && w.status === 'SWEPT');

    // ledger created and locked
    const ledger = await prisma.treasuryLedger.findFirst({ where: { referenceType: 'SWEEP' }, include: { entries: true } });
    assert.ok(ledger && ledger.locked && ledger.entries.length === 2);
    assert.strictEqual(ledger.createdByAdminId, 'ops');

    console.log('sweep engine tests passed');
  } finally {
    await prisma.$disconnect();
  }
}

run().catch(e=>{ console.error(e); process.exit(1); });
