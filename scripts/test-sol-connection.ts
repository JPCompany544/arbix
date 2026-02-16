import "dotenv/config";
import { Connection } from "@solana/web3.js";

async function test() {
    const rpc = process.env.SOLANA_DEVNET_RPC!;
    const connection = new Connection(rpc);

    const version = await connection.getVersion();
    console.log("Connected to Solana:", version);
}

test().catch(console.error);
