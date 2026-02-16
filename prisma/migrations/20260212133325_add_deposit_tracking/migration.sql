-- CreateEnum
CREATE TYPE "TxDirection" AS ENUM ('INBOUND', 'OUTBOUND');

-- AlterTable
ALTER TABLE "ChainTransaction" ADD COLUMN     "blockNumber" BIGINT,
ADD COLUMN     "direction" "TxDirection" NOT NULL DEFAULT 'OUTBOUND';

-- CreateTable
CREATE TABLE "ChainScanState" (
    "chain" TEXT NOT NULL,
    "lastScannedBlock" BIGINT NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChainScanState_pkey" PRIMARY KEY ("chain")
);

-- CreateIndex
CREATE INDEX "ChainTransaction_status_idx" ON "ChainTransaction"("status");

-- CreateIndex
CREATE INDEX "UserWallet_address_idx" ON "UserWallet"("address");
