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
            console.log(`[Provider Registry] Initializing new EVM provider for ${c} at ${rpcUrl}`);

            // Using resilient settings (timeout and retries)
            const fetchReq = new ethers.FetchRequest(rpcUrl);
            fetchReq.timeout = 15000; // 15s timeout
            fetchReq.retryFunc = async (req, resp, attempt) => {
                if (attempt >= 2) return false;
                return true;
            };

            // Using staticNetwork: true to avoid extra 'eth_chainId' calls on every request
            const provider = new ethers.JsonRpcProvider(fetchReq, undefined, {
                staticNetwork: true,
                polling: false
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
