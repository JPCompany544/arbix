import { ethers } from "ethers";

async function test() {
    const rpc = "https://eth.llamarpc.com";
    console.log(`Testing RPC: ${rpc}`);
    const provider = new ethers.JsonRpcProvider(rpc);
    try {
        const block = await provider.getBlockNumber();
        console.log(`Block: ${block}`);
        const bal = await provider.getBalance("0x0000000000000000000000000000000000000000");
        console.log(`Balance: ${bal}`);
    } catch (e: any) {
        console.error(`Error: ${e.message}`);
    }
}

test();
