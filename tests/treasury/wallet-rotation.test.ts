import assert from 'node:assert';
import { prisma } from '../../lib/prisma';
import { TreasuryService } from '../../src/treasury/TreasuryService';
import { seedAccounts } from '../../src/treasury/setup/seedAccounts';

async function resetWallets() {
  // remove any existing lifecycle rows for a clean slate
  await prisma.$executeRawUnsafe(`DELETE FROM "WalletLifecycle"`);
}

async function run() {
  try {
    await resetWallets();
    await seedAccounts();
    const svc = new TreasuryService();
    await TreasuryService.initialize();

    // create an initial ACTIVE wallet
    const w1 = await prisma.walletLifecycle.create({ data: { walletAddress: 'addr1', network: 'ETH', currency: 'ETH', userId: 'ops', status: 'ACTIVE' } });

    const active = await svc.getActiveWallet('ETH', 'ETH');
    assert.strictEqual(active.id, w1.id);

    // rotate once
    const res = await svc.rotateWallet('ETH', 'ETH', 'ops');
    const newActive = await svc.getActiveWallet('ETH', 'ETH');
    assert.strictEqual(newActive.id, res.newWalletId);

    const old = await prisma.walletLifecycle.findUnique({ where: { id: res.oldWalletId } });
    assert.ok(old);
    assert.strictEqual(old?.status, 'ROTATED');
    assert.strictEqual(old?.replacedByWalletId, res.newWalletId);

    // rotate again
    const res2 = await svc.rotateWallet('ETH', 'ETH', 'ops');
    const active2 = await svc.getActiveWallet('ETH', 'ETH');
    assert.strictEqual(active2.id, res2.newWalletId);

    // ensure chain of replacements
    const prev = await prisma.walletLifecycle.findUnique({ where: { id: res.newWalletId } });
    assert.ok(prev);

    console.log('wallet rotation tests passed');
  } finally {
    await prisma.$disconnect();
  }
}

run().catch(e=>{ console.error(e); process.exit(1); });
