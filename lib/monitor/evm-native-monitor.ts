import { chainFactory } from "../../core/chain-factory";

/**
 * EVM Native Deposit Monitor - Wave 5
 * 
 * Delegated to localized Chain modules (EthChain, BscChain).
 */
export async function checkEvmNativeDeposits(
    chain: "ETH" | "BSC",
    rpcUrl: string
) {
    // Delegation to isolated logic
    return await chainFactory.getChain(chain).monitorDeposits();
}
