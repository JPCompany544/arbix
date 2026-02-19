import assert from 'node:assert';
import { prisma } from '../../lib/prisma';
import { seedAccounts } from '../../src/treasury/setup/seedAccounts';
import { TreasuryService } from '../../src/treasury/TreasuryService';

async function resetAll() {
  // ensure triggers are in place via existing helper in accounting tests
}

async function run() {
  try {
    // ensure triggers and guard functions exist (same setup as accounting tests)
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

    await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "trg_treasuryentry_validate_line" ON "TreasuryEntry"`);
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

    await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "trg_treasuryledger_before_update" ON "TreasuryLedger"`);
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

    await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "trg_treasuryledger_before_delete" ON "TreasuryLedger"`);
    await prisma.$executeRawUnsafe(`
      CREATE TRIGGER "trg_treasuryledger_before_delete"
      BEFORE DELETE ON "TreasuryLedger"
      FOR EACH ROW
      EXECUTE FUNCTION "fn_treasuryledger_block_delete"();
    `);

    // guards requiring service session
    await prisma.$executeRawUnsafe(`
      CREATE OR REPLACE FUNCTION "fn_treasuryledger_require_admin"()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NEW."createdByAdminId" IS NULL OR NEW."createdByAdminId" = '' THEN
          RAISE EXCEPTION 'TreasuryLedger.createdByAdminId is required';
        END IF;
        IF current_setting('treasury.is_service', true) IS DISTINCT FROM '1' THEN
          RAISE EXCEPTION 'TreasuryLedger inserts allowed only from service layer';
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);
    await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "trg_treasuryledger_require_admin" ON "TreasuryLedger"`);
    await prisma.$executeRawUnsafe(`
      CREATE TRIGGER "trg_treasuryledger_require_admin"
      BEFORE INSERT ON "TreasuryLedger"
      FOR EACH ROW
      EXECUTE FUNCTION "fn_treasuryledger_require_admin"();
    `);
    await prisma.$executeRawUnsafe(`
      CREATE OR REPLACE FUNCTION "fn_treasuryentry_guard"()
      RETURNS TRIGGER AS $$
      BEGIN
        IF current_setting('treasury.is_service', true) IS DISTINCT FROM '1' THEN
          RAISE EXCEPTION 'TreasuryEntry inserts allowed only from service layer';
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);
    await prisma.$executeRawUnsafe(`DROP TRIGGER IF EXISTS "trg_treasuryentry_guard" ON "TreasuryEntry"`);
    await prisma.$executeRawUnsafe(`
      CREATE TRIGGER "trg_treasuryentry_guard"
      BEFORE INSERT ON "TreasuryEntry"
      FOR EACH ROW
      EXECUTE FUNCTION "fn_treasuryentry_guard"();
    `);

    await seedAccounts();
    const svc = new TreasuryService();
    await TreasuryService.initialize();

    // service-layer create should succeed
    const lid = await svc.journalDeposit('sec-user', 10n, 'sec-admin');
    const ledger = await prisma.treasuryLedger.findUnique({ where: { id: lid } });
    assert.ok(ledger && ledger.createdByAdminId === 'sec-admin');

    // direct UPDATE attempt on locked ledger should fail
    let failed = false;
    try {
      await prisma.treasuryLedger.update({ where: { id: lid }, data: { description: 'bad' } });
    } catch (e) {
      failed = true;
    }
    assert.ok(failed, 'direct update on locked ledger must fail');

    // direct DELETE attempt should fail
    failed = false;
    try {
      await prisma.treasuryLedger.delete({ where: { id: lid } });
    } catch (e) {
      failed = true;
    }
    assert.ok(failed, 'direct delete on ledger must fail');

    // direct insert of TreasuryEntry without session marker should be rejected by trigger
    failed = false;
    try {
      await prisma.treasuryEntry.create({ data: {
        ledgerId: lid,
        accountId: (await prisma.treasuryAccount.findFirst({ where: { name: 'Hot Wallet' } }))!.id,
        debitAmount: 1n,
        creditAmount: 0n,
        currency: 'ETH',
        network: 'ETH',
      }});
    } catch (e) {
      failed = true;
    }
    assert.ok(failed, 'direct insert to TreasuryEntry without service marker must fail');

    console.log('security tests passed');
  } finally {
    await prisma.$disconnect();
  }
}

run().catch(e=>{ console.error(e); process.exit(1); });
