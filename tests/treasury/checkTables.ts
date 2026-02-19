import { prisma } from "../../lib/prisma";

async function main() {
  const res = await prisma.$queryRaw`SELECT to_regclass('"TreasuryEntry"')::text as tbl`;
  console.log('TreasuryEntry table query result:', res);

  const res2 = await prisma.$queryRaw`SELECT to_regclass('"TreasuryLedger"')::text as tbl`;
  console.log('TreasuryLedger table query result:', res2);

  const res3 = await prisma.$queryRaw`SELECT to_regclass('"TreasuryAccount"')::text as tbl`;
  console.log('TreasuryAccount table query result:', res3);

  await prisma.$disconnect();
}

main().catch(e=>{console.error(e); process.exit(1);});
