import assert from "node:assert";
import { prisma } from "../../lib/prisma";
import { DENOMINATION, toAtomic, fromAtomic } from "../../src/treasury/integrity/Denomination";
import { TreasuryService } from "../../src/treasury/TreasuryService";
import { SnapshotService } from "../../src/treasury/integrity/SnapshotService";
import { ReconciliationService } from "../../src/treasury/integrity/ReconciliationService";
import { seedAccounts } from "../../src/treasury/setup/seedAccounts";

async function resetAll() {
  await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "TreasuryEntry"`);
  await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "TreasuryLedger"`);
  await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "TreasuryAccount"`);
  // push schema again
  exec("npx prisma db push", { stdio: "inherit" });
}

import { exec } from "child_process";

async function resetData() {
  // remove our custom triggers so we can clear ledgers without violating immutability
  await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "trg_treasuryledger_before_update" ON "TreasuryLedger"`);
  await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "trg_treasuryledger_before_delete" ON "TreasuryLedger"`);
  await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "trg_treasuryentry_validate_line" ON "TreasuryEntry"`);

  // clear all records
  await prisma.$executeRawUnsafe(`DELETE FROM "TreasuryEntry"`);
  await prisma.$executeRawUnsafe(`DELETE FROM "TreasuryLedger"`);
  await prisma.$executeRawUnsafe(`DELETE FROM "TreasuryAccount"`);

  await seedAccounts();
}

async function runTests() {
  try {
    // denomination tests
    assert.strictEqual(DENOMINATION.BTC, 100_000_000n);
    assert.strictEqual(toAtomic("1.23456789", "BTC"), 123456789n);
    assert.strictEqual(fromAtomic(123456789n, "BTC"), "1.23456789");
    assert.strictEqual(toAtomic("2", "ETH"), 2n * DENOMINATION.ETH);

    // network/currency mismatch validation
    await resetData();
    const svc = new TreasuryService();
    // mutate hot wallet to different currency
    const hot = await prisma.treasuryAccount.findFirst({ where: { name: "Hot Wallet" } });
    assert(hot);
    await prisma.treasuryAccount.update({ where: { id: hot.id }, data: { currency: "BTC" } });
    let failed = false;
    try {
      await svc.journalDeposit("userx", 10n, 'test-admin');
    } catch (e) {
      failed = true;
    }
    assert.ok(failed, "currency mismatch should cause error");

    // snapshot tests
    await resetData();
    const ledger1 = await svc.journalDeposit("u1", 100n, 'test-admin');
    const ledger2 = await svc.journalWithdrawal("u1", 50n, 'test-admin');
    const snapSvc = new SnapshotService();
    const snapId = await snapSvc.generateSnapshot();
    const snap = await snapSvc.getLatestSnapshot();
    assert.strictEqual(snap?.id, snapId);
    // assets = liabilities
    assert.strictEqual(snap?.totalAssets.toString(), snap?.totalLiabilities.toString());

    // reconciliation tests
    await resetData();
    const hotAcc = await prisma.treasuryAccount.findFirst({ where: { name: "Hot Wallet" } });
    assert(hotAcc);
    // deposit 200 to hot
    const id3 = await svc.journalDeposit("u1", 200n, 'test-admin');
    const recSvc = new ReconciliationService();
    const { ledgerBalance: lb } = await recSvc.reconcile(hotAcc.id, 200n);
    assert.strictEqual(lb, 200n);
    const { status: s1 } = await recSvc.reconcile(hotAcc.id, 250n);
    assert.strictEqual(s1, "EXCESS_ON_CHAIN");
    const { status: s2 } = await recSvc.reconcile(hotAcc.id, 150n);
    assert.strictEqual(s2, "DEFICIT_ON_CHAIN");

    console.log("Integrity layer tests passed");
  } finally {
    await prisma.$disconnect();
  }
}

runTests();
