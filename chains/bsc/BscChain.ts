import { EthChain } from "../eth/EthChain";
import { Chain } from "../../core/chain-interface";

/**
 * Binance Smart Chain (BSC) Implementation - Wave 5
 * 
 * Reuses all EVM logic from EthChain with BSC-specific overrides.
 */
export class BscChain extends EthChain implements Chain {
    constructor() {
        super();
        this.chain = "BSC";
    }

    /**
     * BSC Specific Fee Estimation
     * While super.estimateFee works, we can explicitly note BSC gas defaults here.
     */
    async estimateFee(params: { to: string; value: string }): Promise<string> {
        // BSC usually has lower gas prices but uses the same 21k gas for native transfers
        return super.estimateFee(params);
    }
}
