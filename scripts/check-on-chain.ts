import { ethers } from "ethers";
import { providerRegistry } from "../core/provider-registry";

async function check() {
    const provider = providerRegistry.getEvmProvider("ETH");
    const addr = "0x0D6B4f80A27882Af0e012E49df99849E2D2ED909";
    const bal = await provider.getBalance(addr);
    console.log(`Address: ${addr}`);
    console.log(`Balance: ${bal.toString()} wei (${ethers.formatEther(bal)} ETH)`);
}

check();
