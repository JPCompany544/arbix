import { providerRegistry } from "../core/provider-registry";

async function test() {
    const connection = providerRegistry.getSolanaConnection();

    const version = await connection.getVersion();
    console.log("Connected to Solana:", version);
}

test().catch(console.error);
