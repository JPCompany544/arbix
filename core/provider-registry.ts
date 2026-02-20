import { ethers } from "ethers";
import { Connection } from "@solana/web3.js";
import * as xrpl from "xrpl";
import { networkConfig } from "./network-config";

/**
 * Provider Registry - Wave 3
 * 
 * Centralized singleton for blockchain connections.
 * Ensures we reuse instances and don't leak sockets or HTTP connections.
 */
class ProviderRegistry {
    private evmProviders: Map<string, ethers.JsonRpcProvider> = new Map();
    private solanaConnection: Connection | null = null;
    private xrpClient: xrpl.Client | null = null;

    /**
     * Get or create an Ethers JsonRpcProvider for EVM chains (ETH, BSC)
     */
    public getEvmProvider(chain: "ETH" | "BSC"): ethers.JsonRpcProvider {
        const c = chain.toUpperCase();
        if (!this.evmProviders.has(c)) {
            const rpcUrl = networkConfig.getRpc(c);
            const chainId = networkConfig.getChainId(c);
            console.log(`[Provider Registry] Initializing new EVM provider for ${c} at ${rpcUrl} (ChainID: ${chainId})`);

            // Use explicit network to avoid 'eth_chainId' call
            const provider = new ethers.JsonRpcProvider(rpcUrl, {
                chainId: chainId,
                name: c.toLowerCase()
            }, {
                staticNetwork: true
            });

            this.evmProviders.set(c, provider);
        }
        return this.evmProviders.get(c)!;
    }

    /**
     * Get or create a Solana Connection
     */
    public getSolanaConnection(): Connection {
        if (!this.solanaConnection) {
            const rpcUrl = networkConfig.getRpc("SOL");
            console.log(`[Provider Registry] Initializing new Solana connection at ${rpcUrl}`);
            this.solanaConnection = new Connection(rpcUrl, "confirmed");
        }
        return this.solanaConnection;
    }

    /**
     * Get or create an XRP Client
     */
    public getXrpClient(): xrpl.Client {
        if (!this.xrpClient) {
            const rpcUrl = networkConfig.getRpc("XRP");
            console.log(`[Provider Registry] Initializing new XRP client at ${rpcUrl}`);
            this.xrpClient = new xrpl.Client(rpcUrl);
        }
        return this.xrpClient;
    }

    /**
     * Get Bitcoin Provider/Client
     * 
     * Note: Currently uses public REST APIs (Mempool.space / Blockstream).
     * Returns the base URL for fetching.
     */
    public getBitcoinClient(): string {
        return networkConfig.getRpc("BTC");
    }
}

export const providerRegistry = new ProviderRegistry();
