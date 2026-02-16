/**
 * Wallet Engine Type Definitions
 * 
 * STEP 1 - Type definitions for wallet infrastructure
 * No implementation logic here - types only
 */

export type SupportedChain =
    | "ETH"
    | "BSC"
    | "SOL"
    | "BTC"
    | "XRP";

export interface WalletEngineConfig {
    masterSeedEncrypted?: string;
}

export interface DerivedAddress {
    address: string;
    chain: SupportedChain;
    derivationPath: string;
    index: number;
}
