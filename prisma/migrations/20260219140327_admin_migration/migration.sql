/*
  Warnings:

  - You are about to drop the column `memoTag` on the `UserWallet` table. All the data in the column will be lost.
  - You are about to drop the `BalanceSnapshot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TreasuryAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TreasuryEntry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TreasuryLedger` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UTXO` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WalletLifecycle` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SweepStatus" AS ENUM ('PENDING', 'BROADCASTING', 'CONFIRMED', 'FAILED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "LedgerType" ADD VALUE 'TRANSFER';
ALTER TYPE "LedgerType" ADD VALUE 'EARNING';

-- DropForeignKey
ALTER TABLE "TreasuryAccount" DROP CONSTRAINT "TreasuryAccount_parentAccountId_fkey";

-- DropForeignKey
ALTER TABLE "TreasuryEntry" DROP CONSTRAINT "TreasuryEntry_accountId_fkey";

-- DropForeignKey
ALTER TABLE "TreasuryEntry" DROP CONSTRAINT "TreasuryEntry_ledgerId_fkey";

-- DropForeignKey
ALTER TABLE "WalletLifecycle" DROP CONSTRAINT "WalletLifecycle_replacedByWalletId_fkey";

-- AlterTable
ALTER TABLE "UserWallet" DROP COLUMN "memoTag";

-- DropTable
DROP TABLE "BalanceSnapshot";

-- DropTable
DROP TABLE "TreasuryAccount";

-- DropTable
DROP TABLE "TreasuryEntry";

-- DropTable
DROP TABLE "TreasuryLedger";

-- DropTable
DROP TABLE "UTXO";

-- DropTable
DROP TABLE "WalletLifecycle";

-- DropEnum
DROP TYPE "Chain";

-- DropEnum
DROP TYPE "TreasuryAccountType";

-- DropEnum
DROP TYPE "TreasuryLedgerReferenceType";

-- DropEnum
DROP TYPE "WalletLifecycleStatus";

-- CreateTable
CREATE TABLE "TreasuryState" (
    "chain" TEXT NOT NULL,
    "totalOnchainBalance" TEXT NOT NULL DEFAULT '0',
    "totalUserLiabilities" TEXT NOT NULL DEFAULT '0',
    "sweepableBalance" TEXT NOT NULL DEFAULT '0',
    "lastSyncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "locked" BOOLEAN NOT NULL DEFAULT false,
    "lockedAt" TIMESTAMP(3),
    "lockedBy" TEXT,

    CONSTRAINT "TreasuryState_pkey" PRIMARY KEY ("chain")
);

-- CreateTable
CREATE TABLE "Sweep" (
    "id" TEXT NOT NULL,
    "chain" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "amountRaw" TEXT NOT NULL,
    "fromWallet" TEXT NOT NULL,
    "toWallet" TEXT NOT NULL,
    "txHash" TEXT,
    "status" "SweepStatus" NOT NULL DEFAULT 'PENDING',
    "initiatedBy" TEXT NOT NULL,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmedAt" TIMESTAMP(3),

    CONSTRAINT "Sweep_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sweep_txHash_key" ON "Sweep"("txHash");

-- CreateIndex
CREATE INDEX "Sweep_chain_idx" ON "Sweep"("chain");

-- CreateIndex
CREATE INDEX "Sweep_status_idx" ON "Sweep"("status");

-- CreateIndex
CREATE INDEX "Sweep_initiatedBy_idx" ON "Sweep"("initiatedBy");
