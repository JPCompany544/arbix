-- CreateEnum
CREATE TYPE "Chain" AS ENUM ('ETH', 'BSC', 'SOL', 'BTC', 'XRP');

-- AlterTable
ALTER TABLE "UserWallet" ADD COLUMN     "memoTag" TEXT;

-- CreateTable
CREATE TABLE "UTXO" (
    "id" TEXT NOT NULL,
    "txid" TEXT NOT NULL,
    "vout" INTEGER NOT NULL,
    "amount" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "spent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UTXO_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UTXO_address_idx" ON "UTXO"("address");

-- CreateIndex
CREATE INDEX "UTXO_spent_idx" ON "UTXO"("spent");

-- CreateIndex
CREATE UNIQUE INDEX "UTXO_txid_vout_key" ON "UTXO"("txid", "vout");
