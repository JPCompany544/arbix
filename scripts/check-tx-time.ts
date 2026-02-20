import { Connection, PublicKey } from "@solana/web3.js";

async function main() {
    const connection = new Connection("https://api.devnet.solana.com");
    const signature = "GMe6AFDegjKE36sS6cuRvsNNqyzdBmuK3oihBkYPXnbaeumFwUwvXxYofwfovpu21qkZ8AWwjSLQ7KEN7B8pntb";

    console.log(`Fetching transaction: ${signature}`);
    const tx = await connection.getParsedTransaction(signature, {
        maxSupportedTransactionVersion: 0,
        commitment: "confirmed"
    });

    if (tx) {
        console.log("Transaction found!");
        console.log("Block Time:", tx.blockTime);
        if (tx.blockTime) {
            console.log("Human Date:", new Date(tx.blockTime * 1000).toLocaleString());
        }
        console.log("Slot:", tx.slot);
    } else {
        console.log("Transaction not found on Devnet.");
    }
}

main().catch(console.error);
