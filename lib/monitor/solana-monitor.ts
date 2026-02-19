import { chainFactory } from "../../core/chain-factory";

/**
 * Solana Deposit Monitor - Wave 6 Refactor
 * 
 * Delegated to localized SolChain module.
 */
export async function checkSolanaDeposits(rpcUrl: string) {
    return await chainFactory.getChain("SOL").monitorDeposits();
}

/**
 * Legacy initializer for compatibility.
 */
export async function startSolanaMonitor(rpcUrl: string) {
    console.log("[SOL] External monitor starting (Delegated to SolChain)...");
}
