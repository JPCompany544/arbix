import { chainFactory } from "../../core/chain-factory";

/**
 * Bitcoin Deposit Monitor - Wave 7 Refactor
 * 
 * Fully delegated to isolated BtcChain module.
 */
export async function checkBitcoinDeposits() {
    return await chainFactory.getChain("BTC").monitorDeposits();
}
