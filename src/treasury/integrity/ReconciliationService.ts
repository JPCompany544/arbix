import { prisma } from "../../../lib/prisma";

export type ReconciliationResult = {
  ledgerBalance: bigint;
  onChainBalance: bigint;
  delta: bigint;
  status: "MATCH" | "EXCESS_ON_CHAIN" | "DEFICIT_ON_CHAIN";
};

export class ReconciliationService {
  async reconcile(
    accountId: string,
    onChainBalance: bigint
  ): Promise<ReconciliationResult> {
    const ledgerBalanceRow: Array<{ balance: string }> = await prisma.$queryRaw`
      SELECT COALESCE(SUM("debitAmount" - "creditAmount"),0) AS balance
      FROM "TreasuryEntry"
      WHERE "accountId" = ${accountId}
    `;
    const ledgerBal = BigInt(ledgerBalanceRow[0]?.balance ?? "0");
    const delta = onChainBalance - ledgerBal;
    let status: ReconciliationResult['status'];
    if (delta === 0n) status = "MATCH";
    else if (delta > 0n) status = "EXCESS_ON_CHAIN";
    else status = "DEFICIT_ON_CHAIN";

    // optional table check - commented out as table doesn't exist yet
    // try {
    //   await prisma.reconciliationRecord.create({
    //     data: {
    //       accountId,
    //       ledgerBalance: ledgerBal,
    //       onChainBalance,
    //       delta,
    //       status,
    //     },
    //   });
    // } catch (e) {
    //   // table likely doesn't exist; ignore
    //   // console.warn("ReconciliationRecord table missing, skipping insert");
    // }

    return { ledgerBalance: ledgerBal, onChainBalance, delta, status };
  }
}
