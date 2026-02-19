import { Chain } from "./chain-interface";
import { EthChain } from "../chains/eth/EthChain";
import { BscChain } from "../chains/bsc/BscChain";
import { SolChain } from "../chains/sol/SolChain";
import { BtcChain } from "../chains/btc/BtcChain";
import { XrpChain } from "../chains/xrp/XrpChain";

/**
 * Chain Factory - Wave 4, 5, 6, 7 & 8
 * 
 * Central registry for blockchain-specific implementations.
 * Follows the abstract factory pattern to decouple business logic from chain specifics.
 */
class ChainFactory {
    private instances: Map<string, Chain> = new Map();

    /**
     * Get a chain implementation by symbol
     */
    public getChain(chain: string): Chain {
        const symbol = chain.toUpperCase();

        // Return existing instance if available
        if (this.instances.has(symbol)) {
            return this.instances.get(symbol)!;
        }

        // Initialize new instance
        let instance: Chain;
        switch (symbol) {
            case "ETH":
                instance = new EthChain();
                break;
            case "BSC":
                instance = new BscChain();
                break;
            case "SOL":
                instance = new SolChain();
                break;
            case "BTC":
                instance = new BtcChain();
                break;
            case "XRP":
                instance = new XrpChain();
                break;
            default:
                throw new Error(`Chain ${symbol} not yet implemented via ChainFactory`);
        }

        this.instances.set(symbol, instance);
        return instance;
    }

    public getSupportedChains(): string[] {
        return ["ETH", "BSC", "SOL", "BTC", "XRP"];
    }
}

export const chainFactory = new ChainFactory();
