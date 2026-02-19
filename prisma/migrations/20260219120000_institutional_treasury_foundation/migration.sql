-- Institutional Treasury Foundation Migration
-- Non-destructive: only creates new types, tables, indexes, and triggers.

-- Rollback notes:
-- To roll back this migration, drop the triggers, functions, tables, and types
-- created here in the reverse order of their dependencies.

-- Ensure UUID generation is available
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enums -----------------------------------------------------------------------

CREATE TYPE "TreasuryAccountType" AS ENUM ('ASSET', 'LIABILITY', 'EQUITY');

CREATE TYPE "TreasuryLedgerReferenceType" AS ENUM (
  'DEPOSIT',
  'WITHDRAWAL_REQUEST',
  'WITHDRAWAL_EXECUTED',
  'SWEEP',
  'TREASURY_MOVE',
  'ADJUSTMENT'
);

CREATE TYPE "WalletLifecycleStatus" AS ENUM ('ACTIVE', 'SWEPT', 'ARCHIVED');

-- Tables ----------------------------------------------------------------------

CREATE TABLE "TreasuryAccount" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "type" "TreasuryAccountType" NOT NULL,
  "network" TEXT,
  "currency" TEXT NOT NULL,
  "walletAddress" TEXT,
  "parentAccountId" UUID,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "TreasuryAccount_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "TreasuryAccount_walletAddress_key"
  ON "TreasuryAccount"("walletAddress")
  WHERE "walletAddress" IS NOT NULL;

CREATE INDEX "TreasuryAccount_type_network_currency_idx"
  ON "TreasuryAccount"("type", "network", "currency");

CREATE INDEX "TreasuryAccount_walletAddress_idx"
  ON "TreasuryAccount"("walletAddress");

CREATE INDEX "TreasuryAccount_parentAccountId_idx"
  ON "TreasuryAccount"("parentAccountId");

ALTER TABLE "TreasuryAccount"
  ADD CONSTRAINT "TreasuryAccount_parentAccountId_fkey"
  FOREIGN KEY ("parentAccountId")
  REFERENCES "TreasuryAccount"("id")
  ON DELETE RESTRICT
  ON UPDATE CASCADE;

CREATE TABLE "TreasuryLedger" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "referenceType" "TreasuryLedgerReferenceType" NOT NULL,
  "referenceId" TEXT,
  "description" TEXT NOT NULL,
  "network" TEXT NOT NULL,
  "currency" TEXT NOT NULL,
  "createdByAdminId" UUID,
  "locked" BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "TreasuryLedger_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "TreasuryLedger_referenceType_idx"
  ON "TreasuryLedger"("referenceType");

CREATE INDEX "TreasuryLedger_network_currency_idx"
  ON "TreasuryLedger"("network", "currency");

CREATE INDEX "TreasuryLedger_createdAt_idx"
  ON "TreasuryLedger"("createdAt");

CREATE TABLE "TreasuryEntry" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "ledgerId" UUID NOT NULL,
  "accountId" UUID NOT NULL,
  "debitAmount" BIGINT NOT NULL DEFAULT 0,
  "creditAmount" BIGINT NOT NULL DEFAULT 0,
  "currency" TEXT NOT NULL,
  "network" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "TreasuryEntry_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "TreasuryEntry"
  ADD CONSTRAINT "TreasuryEntry_ledgerId_fkey"
  FOREIGN KEY ("ledgerId")
  REFERENCES "TreasuryLedger"("id")
  ON DELETE RESTRICT
  ON UPDATE CASCADE;

ALTER TABLE "TreasuryEntry"
  ADD CONSTRAINT "TreasuryEntry_accountId_fkey"
  FOREIGN KEY ("accountId")
  REFERENCES "TreasuryAccount"("id")
  ON DELETE RESTRICT
  ON UPDATE CASCADE;

CREATE INDEX "TreasuryEntry_ledgerId_idx"
  ON "TreasuryEntry"("ledgerId");

CREATE INDEX "TreasuryEntry_accountId_idx"
  ON "TreasuryEntry"("accountId");

CREATE INDEX "TreasuryEntry_network_currency_idx"
  ON "TreasuryEntry"("network", "currency");

CREATE INDEX "TreasuryEntry_accountId_createdAt_idx"
  ON "TreasuryEntry"("accountId", "createdAt");

CREATE TABLE "BalanceSnapshot" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "network" TEXT NOT NULL,
  "currency" TEXT NOT NULL,
  "totalAssets" BIGINT NOT NULL,
  "totalLiabilities" BIGINT NOT NULL,
  "totalEquity" BIGINT NOT NULL,
  "snapshotTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "BalanceSnapshot_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "BalanceSnapshot_network_currency_idx"
  ON "BalanceSnapshot"("network", "currency");

CREATE INDEX "BalanceSnapshot_snapshotTime_idx"
  ON "BalanceSnapshot"("snapshotTime");

CREATE TABLE "WalletLifecycle" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "walletAddress" TEXT NOT NULL,
  "network" TEXT NOT NULL,
  "currency" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "status" "WalletLifecycleStatus" NOT NULL,
  "sweptAt" TIMESTAMP(3),
  "replacedByWalletId" UUID,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "WalletLifecycle_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "WalletLifecycle_walletAddress_key"
  ON "WalletLifecycle"("walletAddress");

CREATE INDEX "WalletLifecycle_userId_idx"
  ON "WalletLifecycle"("userId");

CREATE INDEX "WalletLifecycle_network_currency_idx"
  ON "WalletLifecycle"("network", "currency");

CREATE INDEX "WalletLifecycle_status_idx"
  ON "WalletLifecycle"("status");

ALTER TABLE "WalletLifecycle"
  ADD CONSTRAINT "WalletLifecycle_replacedByWalletId_fkey"
  FOREIGN KEY ("replacedByWalletId")
  REFERENCES "WalletLifecycle"("id")
  ON DELETE RESTRICT
  ON UPDATE CASCADE;

-- Invariants & immutability ---------------------------------------------------

-- 1) TreasuryEntry line-level constraints (debit/credit rules)
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

CREATE TRIGGER "trg_treasuryentry_validate_line"
BEFORE INSERT ON "TreasuryEntry"
FOR EACH ROW
EXECUTE FUNCTION "fn_treasuryentry_validate_line"();

-- 2) Immutability for TreasuryEntry (no UPDATE/DELETE)
CREATE OR REPLACE FUNCTION "fn_treasuryentry_immutable"()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'TreasuryEntry rows are immutable';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "trg_treasuryentry_block_update"
BEFORE UPDATE ON "TreasuryEntry"
FOR EACH ROW
EXECUTE FUNCTION "fn_treasuryentry_immutable"();

CREATE TRIGGER "trg_treasuryentry_block_delete"
BEFORE DELETE ON "TreasuryEntry"
FOR EACH ROW
EXECUTE FUNCTION "fn_treasuryentry_immutable"();

-- 3) Double-entry enforcement + immutability guard for TreasuryLedger
CREATE OR REPLACE FUNCTION "fn_treasuryledger_before_update"()
RETURNS TRIGGER AS $$
DECLARE
  v_debits  BIGINT;
  v_credits BIGINT;
  v_count   INTEGER;
BEGIN
  -- Deletion is not allowed
  IF TG_OP = 'DELETE' THEN
    RAISE EXCEPTION 'TreasuryLedger rows cannot be deleted';
  END IF;

  -- If attempting to change locked from false -> true, enforce double-entry
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

  -- Once locked, forbid any further changes
  IF OLD."locked" = TRUE THEN
    RAISE EXCEPTION 'Locked TreasuryLedger rows are immutable';
  END IF;

  -- Allow other updates while unlocked (e.g. description tweaks)
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "trg_treasuryledger_before_update"
BEFORE UPDATE ON "TreasuryLedger"
FOR EACH ROW
EXECUTE FUNCTION "fn_treasuryledger_before_update"();

CREATE OR REPLACE FUNCTION "fn_treasuryledger_block_delete"()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'TreasuryLedger rows cannot be deleted';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "trg_treasuryledger_before_delete"
BEFORE DELETE ON "TreasuryLedger"
FOR EACH ROW
EXECUTE FUNCTION "fn_treasuryledger_block_delete"();

