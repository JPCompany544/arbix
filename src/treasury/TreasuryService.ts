import { prisma } from "../../lib/prisma";
import { seedAccounts } from "./setup/seedAccounts";

const NETWORK = "ETH";
const CURRENCY = "ETH";

const ACCOUNT_NAMES = {
  HOT_WALLET: "Hot Wallet",
  COLD_WALLET: "Cold Wallet",
  DEPOSIT_WALLETS: "Deposit Wallets",
  CLEARING_WALLET: "Clearing Wallet",
  USER_BALANCES: "User Balances",
  PENDING_WITHDRAWALS: "Pending Withdrawals",
  TREASURY_EQUITY: "Treasury Equity",
  FEE_REVENUE: "Fee Revenue",
};

export class TreasuryService {
  /**
   * ensure accounts exist in database, must be called prior to using other methods
   */
  public static async initialize(): Promise<void> {
    await seedAccounts();
  }

  private async createLedger(
    tx: typeof prisma,
    referenceType: string,
    referenceId: string | null,
    description: string
  ) {
    const ledger = await tx.treasuryLedger.create({
      data: {
        referenceType,
        referenceId,
        description,
        network: NETWORK,
        currency: CURRENCY,
      },
    });
    return ledger;
  }

  private async addEntry(
    tx: typeof prisma,
    ledgerId: string,
    accountId: string,
    debit: bigint,
    credit: bigint
  ) {
    if (debit < 0n || credit < 0n) {
      throw new Error("Amounts must be non-negative");
    }
    if (debit > 0n && credit > 0n) {
      throw new Error("Entry cannot have both debit and credit positive");
    }
    await tx.treasuryEntry.create({
      data: {
        ledgerId,
        accountId,
        debitAmount: debit,
        creditAmount: credit,
        currency: CURRENCY,
        network: NETWORK,
      },
    });
  }

  private async lockLedger(tx: typeof prisma, ledgerId: string) {
    // setting locked will fire DB trigger which enforces balance/immutability
    await tx.treasuryLedger.update({
      where: { id: ledgerId },
      data: { locked: true },
    });
  }

  private async lookupAccount(
    tx: typeof prisma,
    name: string
  ): Promise<{
    id: string;
    currency: string;
    network: string | null;
  }> {
    const acct = await tx.treasuryAccount.findFirst({ where: { name } });
    if (!acct) throw new Error(`Missing treasury account: ${name}`);
    return acct as any;
  }

  private validateAccountCompatibility(
    a: { currency: string; network: string | null },
    b: { currency: string; network: string | null }
  ) {
    if (a.currency !== b.currency) {
      throw new Error(`Currency mismatch: ${a.currency} vs ${b.currency}`);
    }
    if (a.network !== b.network) {
      throw new Error(`Network mismatch: ${a.network} vs ${b.network}`);
    }
  }

  async journalDeposit(userId: string, amount: bigint) {
    return await prisma.$transaction(async (tx) => {
      const ledger = await this.createLedger(
        tx,
        "DEPOSIT",
        userId,
        `deposit for ${userId}`
      );

      const hot = await this.lookupAccount(tx, ACCOUNT_NAMES.HOT_WALLET);
      const userBal = await this.lookupAccount(tx, ACCOUNT_NAMES.USER_BALANCES);
      // ensure currency/network match
      this.validateAccountCompatibility(hot, userBal);

      await this.addEntry(tx, ledger.id, hot.id, amount, 0n);
      await this.addEntry(tx, ledger.id, userBal.id, 0n, amount);

      await this.lockLedger(tx, ledger.id);
      return ledger.id;
    });
  }

  async journalWithdrawal(userId: string, amount: bigint) {
    return await prisma.$transaction(async (tx) => {
      const ledger = await this.createLedger(
        tx,
        // using executed withdrawal enum value since schema defines no plain WITHDRAWAL
        "WITHDRAWAL_EXECUTED",
        userId,
        `withdrawal for ${userId}`
      );

      const hot = await this.lookupAccount(tx, ACCOUNT_NAMES.HOT_WALLET);
      const userBal = await this.lookupAccount(tx, ACCOUNT_NAMES.USER_BALANCES);
      this.validateAccountCompatibility(hot, userBal);

      await this.addEntry(tx, ledger.id, userBal.id, amount, 0n);
      await this.addEntry(tx, ledger.id, hot.id, 0n, amount);

      await this.lockLedger(tx, ledger.id);
      return ledger.id;
    });
  }

  async journalSweep(fromDepositWalletId: string, amount: bigint) {
    return await prisma.$transaction(async (tx) => {
      const ledger = await this.createLedger(
        tx,
        "SWEEP",
        fromDepositWalletId,
        `sweep from ${fromDepositWalletId}`
      );

      const hot = await this.lookupAccount(tx, ACCOUNT_NAMES.HOT_WALLET);
      const depositAcct = await tx.treasuryAccount.findUnique({ where: { id: fromDepositWalletId } });
      if (!depositAcct) throw new Error("deposit wallet not found");
      this.validateAccountCompatibility(hot, depositAcct as any);

      // debit hot asset increase
      await this.addEntry(tx, ledger.id, hot.id, amount, 0n);
      // credit deposit wallet asset decrease
      await this.addEntry(tx, ledger.id, fromDepositWalletId, 0n, amount);

      await this.lockLedger(tx, ledger.id);
      return ledger.id;
    });
  }

  async journalColdTransfer(amount: bigint) {
    return await prisma.$transaction(async (tx) => {
      const ledger = await this.createLedger(
        tx,
        // use treasury move to represent internal transfers
        "TREASURY_MOVE",
        null,
        "cold storage transfer"
      );

      const hot = await this.lookupAccount(tx, ACCOUNT_NAMES.HOT_WALLET);
      const cold = await this.lookupAccount(tx, ACCOUNT_NAMES.COLD_WALLET);
      this.validateAccountCompatibility(hot, cold);

      await this.addEntry(tx, ledger.id, cold.id, amount, 0n);
      await this.addEntry(tx, ledger.id, hot.id, 0n, amount);

      await this.lockLedger(tx, ledger.id);
      return ledger.id;
    });
  }

  async getAccountBalance(accountId: string): Promise<bigint> {
    const result: Array<{ balance: string }> = await prisma.$queryRaw`
      SELECT COALESCE(SUM("debitAmount") - SUM("creditAmount"),0) AS balance
      FROM "TreasuryEntry"
      WHERE "accountId" = ${accountId}
    `;
    const bal = result[0]?.balance ?? "0";
    return BigInt(bal);
  }
}
