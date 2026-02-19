import { chainFactory } from "../../core/chain-factory";

/**
 * XRP Deposit Monitor - Wave 8 Refactor
 * 
 * Fully delegated to isolated XrpChain module.
 * Uses Destination Tag attribution.
 */
export async function checkXrpDeposits() {
    return await chainFactory.getChain("XRP").monitorDeposits();
}
