import { prisma } from "./lib/prisma";
async function test() {
    console.log("NETWORK:", process.env.NETWORK);
    const count = await prisma.userWallet.count();
    console.log("Total Wallets:", count);
    const wallets = await prisma.userWallet.findMany();
    console.log(JSON.stringify(wallets.map(w => ({ chain: w.chain, address: w.address })), null, 2));
}
test().catch(console.error);
