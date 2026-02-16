import { ethers, JsonRpcProvider } from "ethers";

async function check() {
    const rpc = "https://sepolia.infura.io/v3/a095fe9b9e4a4048a6817c913e00fa31";
    const provider = new JsonRpcProvider(rpc);
    const addr = "0x0D6B4f80A27882Af0e012E49df99849E2D2ED909";
    const bal = await provider.getBalance(addr);
    console.log(`Address: ${addr}`);
    console.log(`Balance: ${bal.toString()} wei (${ethers.formatEther(bal)} ETH)`);
}

check();
