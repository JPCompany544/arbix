import assert from "node:assert";
import { execSync } from "child_process";
import { prisma } from "../../lib/prisma";
import { seedAccounts } from "../../src/treasury/setup/seedAccounts";
import { TreasuryService } from "../../src/treasury/TreasuryService";

// Ensure database schema (tables + triggers) for treasury exist before running tests
async function ensureTreasurySchema() {
  // use prisma db push to create tables/enums
  execSync("npx prisma db push", { stdio: "inherit" });

  // create triggers/functions; we replicate the ones from migration
  await prisma.$executeRawUnsafe(`
    CREATE OR REPLACE FUNCTION "fn_treasuryentry_validate_line"()
    RETURNS TRIGGER AS $$
    BEGIN
      IF NEW."debitAmount" < 0 OR NEW."creditAmount" < 0 THEN
        RAISE EXCEPTION 'TreasuryEntry amounts must be non-negative';
      END IF;

      IF NEW."debitAmount" > 0 AND NEW."creditAmount" > 0 THEN
        RAISE EXCEPTION 'TreasuryEntry cannot have both debit and credit positive';
      END IF;

      IF NEW."debitAmount" = 0 AND NEW."creditAmount" = 0 THEN
        RAISE EXCEPTION 'TreasuryEntry must have either debit or credit > 0';
      END IF;

      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "trg_treasuryentry_validate_line" ON "TreasuryEntry";`);
  await prisma.$executeRawUnsafe(`
    CREATE TRIGGER "trg_treasuryentry_validate_line"
    BEFORE INSERT ON "TreasuryEntry"
    FOR EACH ROW
    EXECUTE FUNCTION "fn_treasuryentry_validate_line"();
  `);

  await prisma.$executeRawUnsafe(`
    CREATE OR REPLACE FUNCTION "fn_treasuryledger_before_update"()
    RETURNS TRIGGER AS $$
    DECLARE
      v_debits  BIGINT;
      v_credits BIGINT;
      v_count   INTEGER;
    BEGIN
      IF TG_OP = 'DELETE' THEN
        RAISE EXCEPTION 'TreasuryLedger rows cannot be deleted';
      END IF;

      IF NEW."locked" = TRUE AND OLD."locked" = FALSE THEN
        SELECT
          COALESCE(SUM("debitAmount"), 0),
          COALESCE(SUM("creditAmount"), 0),
          COUNT(*)
        INTO v_debits, v_credits, v_count
        FROM "TreasuryEntry"
        WHERE "ledgerId" = OLD."id";

        IF v_count < 2 THEN
          RAISE EXCEPTION 'TreasuryLedger must have at least 2 entries before locking';
        END IF;

        IF v_debits <> v_credits THEN
          RAISE EXCEPTION 'TreasuryLedger is not balanced: debits=% credits=%', v_debits, v_credits;
        END IF;

        RETURN NEW;
      END IF;

      IF OLD."locked" = TRUE THEN
        RAISE EXCEPTION 'Locked TreasuryLedger rows are immutable';
      END IF;

      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "trg_treasuryledger_before_update" ON "TreasuryLedger";`);
  await prisma.$executeRawUnsafe(`
    CREATE TRIGGER "trg_treasuryledger_before_update"
    BEFORE UPDATE ON "TreasuryLedger"
    FOR EACH ROW
    EXECUTE FUNCTION "fn_treasuryledger_before_update"();
  `);

  await prisma.$executeRawUnsafe(`
    CREATE OR REPLACE FUNCTION "fn_treasuryledger_block_delete"()
    RETURNS TRIGGER AS $$
    BEGIN
      RAISE EXCEPTION 'TreasuryLedger rows cannot be deleted';
    END;
    $$ LANGUAGE plpgsql;
  `);

  await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "trg_treasuryledger_before_delete" ON "TreasuryLedger";`);
  await prisma.$executeRawUnsafe(`
    CREATE TRIGGER "trg_treasuryledger_before_delete"
    BEFORE DELETE ON "TreasuryLedger"
    FOR EACH ROW
    EXECUTE FUNCTION "fn_treasuryledger_block_delete"();
  `);

}

async function resetTreasuryData() {
  // drop custom triggers so we can wipe ledgers without hitting immutability
  await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "trg_treasuryledger_before_update" ON "TreasuryLedger"`);
  await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "trg_treasuryledger_before_delete" ON "TreasuryLedger"`);
  await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "trg_treasuryentry_validate_line" ON "TreasuryEntry"`);

  // clear entries and ledgers
  await prisma.$executeRawUnsafe(`DELETE FROM "TreasuryEntry"`);
  await prisma.$executeRawUnsafe(`DELETE FROM "TreasuryLedger"`);

  // accounts may have parent relations; just purge them
  await prisma.$executeRawUnsafe(`DELETE FROM "TreasuryAccount"`);

  // recreate triggers so later operations are guarded again
  await ensureTreasurySchema();
}

async function testDepositFlow() {
  await resetTreasuryData();
  await seedAccounts();

  const svc = new TreasuryService();
  const ledgerId = await svc.journalDeposit("user1", 100n);

  const ledger = await prisma.treasuryLedger.findUnique({
    where: { id: ledgerId },
    include: { entries: true }
  });
  assert(ledger && ledger.locked, "ledger must exist and be locked");

  const hot = await prisma.treasuryAccount.findFirst({ where: { name: "Hot Wallet" } });
  const userBal = await prisma.treasuryAccount.findFirst({ where: { name: "User Balances" } });
  assert(hot && userBal);

  const debitSum = ledger.entries.reduce((a, e) => a + e.debitAmount, 0n);
  const creditSum = ledger.entries.reduce((a, e) => a + e.creditAmount, 0n);
  assert.strictEqual(debitSum, creditSum, "ledger must balance");
  assert.strictEqual(debitSum, 100n);

  assert.ok(ledger.entries.some(e => e.accountId === hot.id && e.debitAmount === 100n));
  assert.ok(ledger.entries.some(e => e.accountId === userBal.id && e.creditAmount === 100n));

  // balances
  const hotBal = await svc.getAccountBalance(hot.id);
  const userBalVal = await svc.getAccountBalance(userBal.id);
  assert.strictEqual(hotBal, 100n);
  assert.strictEqual(userBalVal, -100n);

  // locked ledger should be immutable
  let failed = false;
  try {
    await prisma.treasuryLedger.update({ where: { id: ledgerId }, data: { description: "foo" } });
  } catch (_) {
    failed = true;
  }
  assert.ok(failed, "cannot update locked ledger");
}

async function testWithdrawalFlow() {
  await resetTreasuryData();
  await seedAccounts();

  const svc = new TreasuryService();
  const ledgerId = await svc.journalWithdrawal("user2", 50n);

  const ledger = await prisma.treasuryLedger.findUnique({ where: { id: ledgerId }, include: { entries: true } });
  assert(ledger && ledger.locked);

  const hot = await prisma.treasuryAccount.findFirst({ where: { name: "Hot Wallet" } });
  const userBal = await prisma.treasuryAccount.findFirst({ where: { name: "User Balances" } });
  assert(hot && userBal);

  const debitSum = ledger.entries.reduce((a, e) => a + e.debitAmount, 0n);
  const creditSum = ledger.entries.reduce((a, e) => a + e.creditAmount, 0n);
  assert.strictEqual(debitSum, creditSum);
  assert.strictEqual(debitSum, 50n);

  assert.ok(ledger.entries.some(e => e.accountId === userBal.id && e.debitAmount === 50n));
  assert.ok(ledger.entries.some(e => e.accountId === hot.id && e.creditAmount === 50n));

  const hotBal = await svc.getAccountBalance(hot.id);
  const userBalVal = await svc.getAccountBalance(userBal.id);
  assert.strictEqual(hotBal, -50n);
  assert.strictEqual(userBalVal, 50n);
}

async function testSweepFlow() {
  await resetTreasuryData();
  await seedAccounts();

  // create a deposit wallet to sweep from
  const depositWallet = await prisma.treasuryAccount.create({
    data: { name: "Test Deposit", type: "ASSET", currency: "", parentAccountId: undefined }
  });

  const svc = new TreasuryService();
  const ledgerId = await svc.journalSweep(depositWallet.id, 20n);

  const ledger = await prisma.treasuryLedger.findUnique({ where: { id: ledgerId }, include: { entries: true } });
  assert(ledger && ledger.locked);

  const hot = await prisma.treasuryAccount.findFirst({ where: { name: "Hot Wallet" } });
  assert(hot);

  const debitSum = ledger.entries.reduce((a, e) => a + e.debitAmount, 0n);
  const creditSum = ledger.entries.reduce((a, e) => a + e.creditAmount, 0n);
  assert.strictEqual(debitSum, creditSum);
  assert.ok(ledger.entries.some(e => e.accountId === hot.id && e.debitAmount === 20n));
  assert.ok(ledger.entries.some(e => e.accountId === depositWallet.id && e.creditAmount === 20n));

  // ensure liability accounts unchanged
  const userBal = await prisma.treasuryAccount.findFirst({ where: { name: "User Balances" } });
  const userBalVal = await svc.getAccountBalance(userBal!.id);
  assert.strictEqual(userBalVal, 0n);
}

async function testColdTransferFlow() {
  await resetTreasuryData();
  await seedAccounts();

  const svc = new TreasuryService();
  const ledgerId = await svc.journalColdTransfer(30n);

  const ledger = await prisma.treasuryLedger.findUnique({ where: { id: ledgerId }, include: { entries: true } });
  assert(ledger && ledger.locked);

  const hot = await prisma.treasuryAccount.findFirst({ where: { name: "Hot Wallet" } });
  const cold = await prisma.treasuryAccount.findFirst({ where: { name: "Cold Wallet" } });
  assert(hot && cold);

  const debitSum = ledger.entries.reduce((a, e) => a + e.debitAmount, 0n);
  const creditSum = ledger.entries.reduce((a, e) => a + e.creditAmount, 0n);
  assert.strictEqual(debitSum, creditSum);
  assert.ok(ledger.entries.some(e => e.accountId === cold.id && e.debitAmount === 30n));
  assert.ok(ledger.entries.some(e => e.accountId === hot.id && e.creditAmount === 30n));

  // liability accounts unaffected
  const userBal = await prisma.treasuryAccount.findFirst({ where: { name: "User Balances" } });
  const userBalVal = await svc.getAccountBalance(userBal!.id);
  assert.strictEqual(userBalVal, 0n);
}

// perform a full scenario sequence and verify global accounting identity
async function testFullScenario() {
  await resetTreasuryData();
  await seedAccounts();
  const svc = new TreasuryService();

  // helper to lookup by name
  const acct = async (name: string) => (await prisma.treasuryAccount.findFirst({ where: { name } }))!;

  const hot = await acct("Hot Wallet");
  const cold = await acct("Cold Wallet");
  const deposit = await prisma.treasuryAccount.create({ data: { name: "Scenario Deposit", type: "ASSET", currency: "" } });
  const userBal = await acct("User Balances");

  // sequence: deposit 100, withdraw 40, sweep 20, cold 30, deposit 50, withdraw 10
  await svc.journalDeposit("foo", 100n);
  await svc.journalWithdrawal("foo", 40n);
  await svc.journalSweep(deposit.id, 20n);
  await svc.journalColdTransfer(30n);
  await svc.journalDeposit("foo", 50n);
  await svc.journalWithdrawal("foo", 10n);

  const hotBal = await svc.getAccountBalance(hot.id);
  const coldBal = await svc.getAccountBalance(cold.id);
  const depBal = await svc.getAccountBalance(deposit.id);
  const userBalVal = await svc.getAccountBalance(userBal.id);

  console.log("scenario balances:", { hotBal, coldBal, depBal, userBalVal });

  // manual expected: hot initial 0 +100 -40 +20? wait sweep increases hot +20 then cold -30 etc
  // compute via formula: hot = (100-40+20-30+50-10) = 90
  assert.strictEqual(hotBal, 90n);
  assert.strictEqual(coldBal, 30n);
  assert.strictEqual(depBal, -20n);
  assert.strictEqual(userBalVal, 100n - 40n + 50n - 10n); // =100

  // global identity: assets == liabilities + equity (equity zero here)
  const assetSum: Array<{ total: string }> = await prisma.$queryRaw`
    SELECT COALESCE(SUM(e."debitAmount" - e."creditAmount"),0) AS total
    FROM "TreasuryEntry" e
    JOIN "TreasuryAccount" a ON a.id = e."accountId"
    WHERE a.type = 'ASSET';
  `;
  const liabilitySum: Array<{ total: string }> = await prisma.$queryRaw`
    SELECT COALESCE(SUM(e."debitAmount" - e."creditAmount"),0) AS total
    FROM "TreasuryEntry" e
    JOIN "TreasuryAccount" a ON a.id = e."accountId"
    WHERE a.type = 'LIABILITY';
  `;
  assert.strictEqual(assetSum[0].total, liabilitySum[0].total);
}

async function main() {
  try {
    await ensureTreasurySchema();
    await seedAccounts();
    await testDepositFlow();
    await testWithdrawalFlow();
    await testSweepFlow();
    await testColdTransferFlow();
    console.log("Accounting logic tests passed");
  } finally {
    await prisma.$disconnect();
  }
}

// run when invoked
// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
