import { prisma } from "../../../lib/prisma";

export async function seedAccounts() {
  // helper to find or create by name
  async function ensure(name: string, type: string, parentId?: string) {
    let acct = await prisma.treasuryAccount.findFirst({ where: { name } });
    if (acct) return acct;
    return prisma.treasuryAccount.create({
      data: {
        name,
        type,
        network: null,
        currency: "",
        parentAccountId: parentId || undefined,
      },
    });
  }

  // root accounts
  const assetRoot = await ensure("Assets", "ASSET");
  const liabilityRoot = await ensure("Liabilities", "LIABILITY");
  const equityRoot = await ensure("Equity", "EQUITY");

  // asset children
  await ensure("Hot Wallet", "ASSET", assetRoot.id);
  await ensure("Cold Wallet", "ASSET", assetRoot.id);
  await ensure("Deposit Wallets", "ASSET", assetRoot.id);
  await ensure("Clearing Wallet", "ASSET", assetRoot.id);

  // liability children
  await ensure("User Balances", "LIABILITY", liabilityRoot.id);
  await ensure("Pending Withdrawals", "LIABILITY", liabilityRoot.id);

  // equity children
  await ensure("Treasury Equity", "EQUITY", equityRoot.id);
  await ensure("Fee Revenue", "EQUITY", equityRoot.id);
}
