import { ethers } from "ethers";

const mnemonic = "test test test test test test test test test test test junk";

function testDerivation() {
    const path = "m/44'/60'/0'/0/0";

    // Option A: Path in fromPhrase
    const walletA = ethers.HDNodeWallet.fromPhrase(mnemonic, undefined, path);
    console.log("Option A (path in fromPhrase):", walletA.address);

    // Option B: Base "m" then derivePath
    const walletB = ethers.HDNodeWallet.fromPhrase(mnemonic, undefined, "m").derivePath(path);
    console.log("Option B (base 'm' then derivePath):", walletB.address);

    // Option C: Default then derivePath
    const walletC = ethers.HDNodeWallet.fromPhrase(mnemonic).derivePath(path);
    console.log("Option C (default then derivePath):", walletC.address);
}

testDerivation();
