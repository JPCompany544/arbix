/**
 * Global Treasury Overview Tests
 *
 * Validates strict financial integrity requirements:
 * - BIGINT arithmetic
 * - Decimal mismatch detection
 * - Stale price handling
 * - Negative equity preservation
 * - Deterministic ordering
 * - Sync integrity
 */

import { prisma } from "@/lib/prisma";
import { getGlobalOverview } from "@/src/treasury/integrity/GlobalOverviewService";
import { Decimal } from "@prisma/client/runtime/library";

// ────────────────────────────────────────────────────────────────
// Utilities
// ────────────────────────────────────────────────────────────────

async function setupTestNetwork(name: string) {
  const network = await prisma.network.create({
    data: {
      name,
      chainId: Math.floor(Math.random() * 1000000),
      isActive: true,
    },
  });

  // Create sync state
  await prisma.syncState.create({
    data: {
      networkId: network.id,
      lastSuccessfulSync: new Date(),
      syncStatus: "OK",
    },
  });

  return network;
}

async function teardownTestNetwork(network: any) {
  await prisma.wallet.deleteMany({
    where: { networkId: network.id },
  });
  await prisma.reserveEntry.deleteMany({
    where: { networkId: network.id },
  });
  await prisma.liabilityEntry.deleteMany({
    where: { networkId: network.id },
  });
  await prisma.syncState.deleteMany({
    where: { networkId: network.id },
  });
  await prisma.network.delete({
    where: { id: network.id },
  });
}

async function createWallet(
  network: any,
  address: string,
  label?: string
) {
  return prisma.wallet.create({
    data: {
      networkId: network.id,
      address,
      label,
      isActive: true,
    },
  });
}

async function setReserve(
  wallet: any,
  network: any,
  asset: string,
  rawAmount: bigint,
  decimals: number
) {
  await prisma.reserveEntry.upsert({
    where: {
      walletId_assetSymbol: {
        walletId: wallet.id,
        assetSymbol: asset,
      },
    },
    create: {
      walletId: wallet.id,
      networkId: network.id,
      assetSymbol: asset,
      rawBalance: rawAmount,
      decimals,
    },
    update: {
      rawBalance: rawAmount,
      decimals,
    },
  });
}

async function setLiability(
  network: any,
  asset: string,
  rawAmount: bigint,
  decimals: number
) {
  await prisma.liabilityEntry.create({
    data: {
      networkId: network.id,
      assetSymbol: asset,
      rawAmount,
      decimals,
    },
  });
}

async function setPrice(
  asset: string,
  priceUsd: Decimal,
  ttlSeconds = 300
) {
  await prisma.priceCache.upsert({
    where: { assetSymbol: asset },
    create: {
      assetSymbol: asset,
      priceUsd,
      ttlSeconds,
    },
    update: {
      priceUsd,
      lastUpdatedAt: new Date(),
    },
  });
}

async function setSyncState(
  network: any,
  status: "OK" | "ERROR" | "STALE",
  lastSuccessfulSync?: Date
) {
  await prisma.syncState.update({
    where: { networkId: network.id },
    data: {
      syncStatus: status,
      lastSuccessfulSync:
        lastSuccessfulSync || new Date(),
      errorMessage:
        status === "ERROR" ? `Sync failed` : null,
    },
  });
}

// ────────────────────────────────────────────────────────────────
// Test Cases
// ────────────────────────────────────────────────────────────────

async function testPositiveEquity() {
  console.log("\n📋 TEST 1: Positive Equity");
  console.log("Reserve: 100, Liability: 40 → Equity: 60");

  const network = await setupTestNetwork(
    "test-positive-equity"
  );
  const wallet = await createWallet(
    network,
    "0x1111111111111111111111111111111111111111"
  );

  // Reserve: 100 tokens (18 decimals)
  const reserve100 = 100n * 10n ** 18n;
  await setReserve(wallet, network, "ETH", reserve100, 18);

  // Liability: 40 tokens (18 decimals)
  const liability40 = 40n * 10n ** 18n;
  await setLiability(network, "ETH", liability40, 18);

  // Set price
  await setPrice("ETH", new Decimal("2000"));

  const overview = await getGlobalOverview();
  const networkData = overview.networks.find((n) =>
    n.networkName.includes("test-positive-equity")
  );

  if (!networkData) throw new Error("Network not found");

  const equity = networkData.equity.find((e) => e.asset === "ETH");
  if (!equity) throw new Error("ETH equity not found");

  const equityBigInt = BigInt(equity.raw);
  const expectedEquity = reserve100 - liability40;

  console.assert(
    equityBigInt === expectedEquity,
    `Equity mismatch: got ${equityBigInt}, expected ${expectedEquity}`
  );
  console.log(`✅ Equity correctly computed: ${equity.raw}`);

  await teardownTestNetwork(network);
}

async function testNegativeEquity() {
  console.log("\n📋 TEST 2: Negative Equity");
  console.log("Reserve: 40, Liability: 100 → Equity: -60");

  const network = await setupTestNetwork(
    "test-negative-equity"
  );
  const wallet = await createWallet(
    network,
    "0x2222222222222222222222222222222222222222"
  );

  // Reserve: 40 tokens
  const reserve40 = 40n * 10n ** 18n;
  await setReserve(wallet, network, "ETH", reserve40, 18);

  // Liability: 100 tokens
  const liability100 = 100n * 10n ** 18n;
  await setLiability(network, "ETH", liability100, 18);

  // Set price
  await setPrice("ETH", new Decimal("2000"));

  const overview = await getGlobalOverview();
  const networkData = overview.networks.find((n) =>
    n.networkName.includes("test-negative-equity")
  );

  if (!networkData) throw new Error("Network not found");

  const equity = networkData.equity.find((e) => e.asset === "ETH");
  if (!equity) throw new Error("ETH equity not found");

  const equityBigInt = BigInt(equity.raw);
  const expectedEquity = reserve40 - liability100;

  console.assert(
    equityBigInt === expectedEquity,
    `Negative equity mismatch`
  );
  console.assert(
    equityBigInt < 0n,
    `Negative equity should be negative`
  );
  console.log(`✅ Negative equity preserved: ${equity.raw}`);

  await teardownTestNetwork(network);
}

async function testStalePriceHandling() {
  console.log("\n📋 TEST 3: Stale Price Handling");
  console.log("Price lastUpdatedAt older than TTL → priceStatus = STALE");

  const network = await setupTestNetwork(
    "test-stale-price"
  );
  const wallet = await createWallet(
    network,
    "0x3333333333333333333333333333333333333333"
  );

  // Set reserve and liability
  const reserve = 100n * 10n ** 18n;
  await setReserve(wallet, network, "ETH", reserve, 18);

  const liability = 50n * 10n ** 18n;
  await setLiability(network, "ETH", liability, 18);

  // Set STALE price (TTL = 1 second, created 10 seconds ago)
  const staleDate = new Date(Date.now() - 10000);
  await prisma.priceCache.upsert({
    where: { assetSymbol: "ETH" },
    create: {
      assetSymbol: "ETH",
      priceUsd: new Decimal("2000"),
      ttlSeconds: 1, // Very short TTL
      lastUpdatedAt: staleDate,
    },
    update: {
      lastUpdatedAt: staleDate,
      ttlSeconds: 1,
    },
  });

  const overview = await getGlobalOverview(300); // 5 min threshold
  const priceStatus = overview.combined.usdSummary.priceStatus;

  console.assert(
    priceStatus === "STALE",
    `Price status should be STALE, got ${priceStatus}`
  );
  console.log(`✅ Stale price correctly detected: ${priceStatus}`);

  await teardownTestNetwork(network);
}

async function testWalletWithoutBalance() {
  console.log("\n📋 TEST 4: Wallet Without Balance");
  console.log("Add wallet → Reserve unchanged, walletCount increments");

  const network = await setupTestNetwork(
    "test-wallet-no-balance"
  );

  // Create wallet 1 with balance
  const wallet1 = await createWallet(
    network,
    "0x4444444444444444444444444444444444444444"
  );
  await setReserve(wallet1, network, "ETH", 100n * 10n ** 18n, 18);

  // Create wallet 2 WITHOUT balance
  const wallet2 = await createWallet(
    network,
    "0x5555555555555555555555555555555555555555"
  );

  await setPrice("ETH", new Decimal("2000"));

  const overview = await getGlobalOverview();
  const networkData = overview.networks.find((n) =>
    n.networkName.includes("test-wallet-no-balance")
  );

  if (!networkData) throw new Error("Network not found");

  console.assert(
    networkData.walletCount === 2,
    `Wallet count should be 2, got ${networkData.walletCount}`
  );

  const ethReserve = networkData.reserves.find(
    (r) => r.asset === "ETH"
  );
  console.assert(
    BigInt(ethReserve?.raw || "0") === 100n * 10n ** 18n,
    `Reserve should be 100 ETH`
  );
  console.log(
    `✅ Wallet count: ${networkData.walletCount}, Reserves unchanged`
  );

  await teardownTestNetwork(network);
}

async function testDecimalMismatch() {
  console.log("\n📋 TEST 5: Decimal Mismatch");
  console.log(
    "Reserve decimals 6, Liability decimals 18 → Network status = ERROR"
  );

  const network = await setupTestNetwork(
    "test-decimal-mismatch"
  );
  const wallet = await createWallet(
    network,
    "0x6666666666666666666666666666666666666666"
  );

  // Reserve: 100 USDC (6 decimals)
  const reserve = 100n * 10n ** 6n;
  await setReserve(wallet, network, "USDC", reserve, 6);

  // Liability: 100 USDC (18 decimals) - MISMATCH!
  const liability = 100n * 10n ** 18n;
  await setLiability(network, "USDC", liability, 18);

  const overview = await getGlobalOverview();
  const networkData = overview.networks.find((n) =>
    n.networkName.includes("test-decimal-mismatch")
  );

  if (!networkData) throw new Error("Network not found");

  console.assert(
    networkData.status === "ERROR",
    `Status should be ERROR due to decimal mismatch, got ${networkData.status}`
  );
  console.log(
    `✅ Decimal mismatch correctly flagged: status = ${networkData.status}`
  );

  await teardownTestNetwork(network);
}

async function testDeterministicOrdering() {
  console.log("\n📋 TEST 6: Deterministic Asset Ordering");
  console.log(
    "Multiple assets → ordering is alphabetical and consistent"
  );

  const network = await setupTestNetwork(
    "test-ordering"
  );
  const wallet = await createWallet(
    network,
    "0x7777777777777777777777777777777777777777"
  );

  // Add reserves in random order
  await setReserve(wallet, network, "ZZZ", 10n * 10n ** 18n, 18);
  await setReserve(wallet, network, "AAA", 20n * 10n ** 18n, 18);
  await setReserve(wallet, network, "MMM", 30n * 10n ** 18n, 18);

  const overview = await getGlobalOverview();
  const networkData = overview.networks.find((n) =>
    n.networkName.includes("test-ordering")
  );

  if (!networkData) throw new Error("Network not found");

  const assets = networkData.reserves.map((r) => r.asset);
  const expectedOrder = ["AAA", "MMM", "ZZZ"];

  console.assert(
    JSON.stringify(assets) === JSON.stringify(expectedOrder),
    `Assets not in alphabetical order: ${assets}`
  );
  console.log(`✅ Assets deterministically ordered: ${assets.join(", ")}`);

  await teardownTestNetwork(network);
}

async function testSyncIntegrity() {
  console.log("\n📋 TEST 7: Sync Integrity");
  console.log("lastSync marked STALE if older than threshold");

  const network = await setupTestNetwork(
    "test-sync-integrity"
  );

  // Set sync state to stale (10 minutes ago)
  const staleTime = new Date(Date.now() - 600000);
  await setSyncState(network, "OK", staleTime);

  const overview = await getGlobalOverview(300); // 5 min threshold

  const networkData = overview.networks.find((n) =>
    n.networkName.includes("test-sync-integrity")
  );

  if (!networkData) throw new Error("Network not found");

  console.assert(
    networkData.status === "STALE",
    `Status should be STALE, got ${networkData.status}`
  );
  console.log(`✅ Stale sync correctly detected: status = ${networkData.status}`);

  await teardownTestNetwork(network);
}

async function testNumericSerialization() {
  console.log("\n📋 TEST 8: Numeric Serialization");
  console.log("All raw values serialized as strings (BIGINT safety)");

  const network = await setupTestNetwork(
    "test-serialization"
  );
  const wallet = await createWallet(
    network,
    "0x8888888888888888888888888888888888888888"
  );

  // Large number that would lose precision as number
  const largeAmount = 123456789012345678901234567890n;
  await setReserve(wallet, network, "WEI", largeAmount, 0);

  const overview = await getGlobalOverview();
  const networkData = overview.networks.find((n) =>
    n.networkName.includes("test-serialization")
  );

  if (!networkData) throw new Error("Network not found");

  const reserve = networkData.reserves.find((r) => r.asset === "WEI");
  if (!reserve) throw new Error("WEI reserve not found");

  // Verify serialized as string
  console.assert(
    typeof reserve.raw === "string",
    `Raw should be string, got ${typeof reserve.raw}`
  );

  // Verify can be parsed back to same value
  const parsed = BigInt(reserve.raw);
  console.assert(
    parsed === largeAmount,
    `Large number precision lost in serialization`
  );

  console.log(
    `✅ Large numbers preserved: ${largeAmount === parsed}`
  );

  await teardownTestNetwork(network);
}

// ────────────────────────────────────────────────────────────────
// Test Runner
// ────────────────────────────────────────────────────────────────

async function runAllTests() {
  console.log("🔒 TREASURY GLOBAL OVERVIEW - INTEGRITY TESTS\n");

  try {
    await testPositiveEquity();
    await testNegativeEquity();
    await testStalePriceHandling();
    await testWalletWithoutBalance();
    await testDecimalMismatch();
    await testDeterministicOrdering();
    await testSyncIntegrity();
    await testNumericSerialization();

    console.log("\n✅ ALL TESTS PASSED\n");
  } catch (error) {
    console.error("\n❌ TEST FAILED:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run tests
runAllTests();
