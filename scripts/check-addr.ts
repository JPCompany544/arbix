import { prisma } from "../lib/prisma";
import { ethers } from "ethers";
import { loadMasterSeed } from "../lib/wallet/utils";

async function main() {
    console.log("Looking up 0x86EBE6c0C92aeDb5cfA82c03ceF53f2d55B68Da5");
    const wallets = await prisma.userWallet.findMany({ where: { address: '0x86EBE6c0C92aeDb5cfA82c03ceF53f2d55B68Da5' } });
    console.log("Found:", wallets);

    const mnemonic = await loadMasterSeed();
    if(wallets.length > 0) {
        for(const w of wallets) {
            const path = `m/44'/60'/0'/0/${w.derivationIndex}`;
            const node = ethers.HDNodeWallet.fromPhrase(mnemonic, undefined, "m").derivePath(path);
            console.log(`Index ${w.derivationIndex} derives -> ${node.address}`);
        }
    }
}

main().finally(() => prisma.$disconnect());
