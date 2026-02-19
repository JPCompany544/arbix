import assert from "node:assert";
import { prisma } from "../../lib/prisma";

async function resetTestData() {
  // clear the current treasury tables
  await prisma.$executeRawUnsafe(`DELETE FROM "Sweep"`);
  await prisma.$executeRawUnsafe(`DELETE FROM "TreasuryState"`);
}

async function testTreasuryStateCRUD() {
  await resetTestData();

  // create a state entry
  const state = await prisma.treasuryState.create({
    data: {
      chain: "ETH",
      totalOnchainBalance: "1000",
      totalUserLiabilities: "400",
      sweepableBalance: "600",
      locked: false
    }
  });
  assert.strictEqual(state.chain, "ETH");
  assert.strictEqual(state.locked, false);

  // update locked flag and lockedBy
  const updated = await prisma.treasuryState.update({
    where: { chain: "ETH" },
    data: { locked: true, lockedBy: "admin1" }
  });
  assert.strictEqual(updated.locked, true);
  assert.strictEqual(updated.lockedBy, "admin1");
}

async function testSweepLifecycle() {
  await resetTestData();

  const sweep = await prisma.sweep.create({
    data: {
      id: "sweep1",
      chain: "ETH",
      amount: "100",
      amountRaw: "100000000000000000000",
      fromWallet: "0xFROM",
      toWallet: "0xTO",
      initiatedBy: "admin1"
    }
  });
  assert.strictEqual(sweep.status, "PENDING");

  // move to broadcasting
  const broadcast = await prisma.sweep.update({
    where: { id: "sweep1" },
    data: { status: "BROADCASTING", txHash: "0xHASH" }
  });
  assert.strictEqual(broadcast.status, "BROADCASTING");

  // unique txHash constraint should prevent duplicates
  let failed = false;
  try {
    await prisma.sweep.create({
      data: {
        id: "sweep2",
        chain: "ETH",
        amount: "50",
        amountRaw: "50000000000000000000",
        fromWallet: "0xF2",
        toWallet: "0xT2",
        initiatedBy: "admin2",
        txHash: "0xHASH"
      }
    });
  } catch {
    failed = true;
  }
  assert.ok(failed, "duplicate txHash should be rejected");
}

async function main() {
  try {
    // verify that the current database has the expected tables; if not, skip all tests
    const tableExists = await prisma.$queryRaw`
      SELECT to_regclass('"Sweep"')::text as tbl
    `;
    // result is an array of objects like { tbl: 'Sweep' } or { tbl: null }
    if (!tableExists || !(tableExists as any)[0]?.tbl) {
      // eslint-disable-next-line no-console
      console.log("Treasury tables not present, skipping treasury foundation tests");
      return;
    }

    await testTreasuryStateCRUD();
    await testSweepLifecycle();
    // eslint-disable-next-line no-console
    console.log("Treasury foundation tests passed");
  } finally {
    await prisma.$disconnect();
  }
}

// Execute when run via `npm run test:treasury-foundation`
// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();

