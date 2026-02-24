/**
 * Centralized Network Configuration
 * 
 * Wave 2: Single source of truth for all chain network parameters.
 * Supports switching between mainnet and testnet modes.
 */

export type NetworkMode = "mainnet" | "testnet";

export interface ChainNetworkInfo {
    rpc: string;
    chainId: number;
    explorer: string;
}

class NetworkConfig {
    private mode: NetworkMode;

    constructor() {
        // Read mode from environment, default to testnet
        const envMode = (process.env.NETWORK || process.env.NETWORK_MODE || "testnet").toLowerCase();
        this.mode = (envMode === "mainnet" || envMode === "production") ? "mainnet" : "testnet";

        console.log(`[Network Config] Initialized in ${this.mode.toUpperCase()} mode (env: ${envMode})`);
    }

    public getMode(): NetworkMode {
        return this.mode;
    }

    /**
     * Get RPC URL for a given chain
     */
    public getRpc(chain: string): string {
        const c = chain.toUpperCase();

        if (this.mode === "testnet") {
            switch (c) {
                case "ETH": return process.env.ETH_TESTNET_RPC || process.env.ETH_SEPOLIA_RPC || "https://rpc.ankr.com/eth_sepolia";
                case "BSC": return process.env.BSC_TESTNET_RPC || "https://data-seed-prebsc-1-s1.binance.org:8545/";
                case "SOL": return process.env.SOLANA_TESTNET_RPC || process.env.SOLANA_DEVNET_RPC || "https://api.devnet.solana.com";
                case "BTC": return process.env.BTC_TESTNET_RPC || "https://blockstream.info/testnet/api";
                case "XRP": return process.env.XRP_TESTNET_RPC || "wss://s.altnet.rippletest.net:51233";
                default: throw new Error(`Unsupported chain for testnet: ${chain}`);
            }
        } else {
            // Mainnet - Use LlamaRPC/Public for basic monitoring to avoid Alchemy 429
            switch (c) {
                case "ETH": return "https://eth.llamarpc.com";
                case "BSC": return "https://bsc-dataseed.binance.org/";
                case "SOL": return process.env.SOLANA_MAINNET_RPC || "https://api.mainnet-beta.solana.com";
                case "BTC": return process.env.BTC_MAINNET_RPC || "https://mempool.space/api";
                case "XRP": return process.env.XRP_MAINNET_RPC || "wss://xrplcluster.com";
                default: throw new Error(`Unsupported chain for mainnet: ${chain}`);
            }
        }
    }

    /**
     * Get Chain ID for EVM chains or standard markers for others
     */
    public getChainId(chain: string): number {
        const c = chain.toUpperCase();

        if (this.mode === "testnet") {
            switch (c) {
                case "ETH": return 11155111; // Sepolia
                case "BSC": return 97;       // BSC Testnet
                case "SOL": return 102;      // Marker for Devnet
                case "BTC": return 1;        // Marker for Testnet
                case "XRP": return 1;        // Marker for Testnet
                default: return 0;
            }
        } else {
            switch (c) {
                case "ETH": return 1;        // Mainnet
                case "BSC": return 56;       // Mainnet
                case "SOL": return 101;      // Marker for Mainnet Beta
                case "BTC": return 0;
                case "XRP": return 0;
                default: return 0;
            }
        }
    }

    /**
     * Get block explorer URL
     */
    public getExplorerUrl(chain: string): string {
        const c = chain.toUpperCase();

        if (this.mode === "testnet") {
            switch (c) {
                case "ETH": return "https://sepolia.etherscan.io";
                case "BSC": return "https://testnet.bscscan.com";
                case "SOL": return "https://explorer.solana.com/?cluster=devnet";
                case "BTC": return "https://blockstream.info/testnet";
                case "XRP": return "https://testnet.xrpl.org";
                default: return "";
            }
        } else {
            switch (c) {
                case "ETH": return "https://etherscan.io";
                case "BSC": return "https://bscscan.com";
                case "SOL": return "https://solscan.io";
                case "BTC": return "https://mempool.space";
                case "XRP": return "https://xrpscan.com";
                default: return "";
            }
        }
    }

    /**
     * Get the hardcoded system address for non-HD chains (BTC, XRP)
     */
    public getSystemAddress(chain: string): string {
        const c = chain.toUpperCase();
        if (c === "BTC") {
            return "bc1qfgc08xen820n6ak0jf8mf3j9gaqtfqxalvc09z";
        }
        if (c === "XRP") {
            return "rLhHG4nVsAch1HtrURyaaAKLczAUgC2s9Y";
        }
        return "";
    }
}

export const networkConfig = new NetworkConfig();
