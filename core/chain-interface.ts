export type AddressResult = {
    address: string;
    derivationIndex?: number;
};

export type TxResult = {
    txHash?: string;
};

export interface Chain {
    /**
     * Generate a unique deposit address for a user
     */
    generateAddress(userId: string): Promise<AddressResult>;

    /**
     * Scan for incoming deposits
     */
    monitorDeposits(): Promise<void>;

    /**
     * Send funds to a destination
     */
    sendWithdrawal(params: any): Promise<TxResult>;

    /**
     * Retrieve current balance of a given address
     */
    getBalance(address: string): Promise<string>;

    /**
     * Estimate transaction fee for the chain
     */
    estimateFee(params: any): Promise<string>;

    /**
     * Validate if an address is syntactically correct for the chain
     */
    isValidAddress(address: string): boolean;

    /**
     * Convert human readable amount (e.g. 1.5 ETH) to smallest unit (e.g. Wei)
     */
    toSmallestUnit(humanAmount: string): bigint;

    /**
     * Convert smallest unit (e.g. Wei) to human readable string (e.g. 1.5)
     */
    toHumanUnit(smallestAmount: string | bigint): string;

    /**
     * Get the native currency symbol for the chain (e.g. "ETH", "BNB")
     */
    getSymbol(): string;

    /**
     * Check the status of a transaction on-chain
     */
    getTransactionStatus(txHash: string, direction: "INBOUND" | "OUTBOUND"): Promise<{
        status: "PENDING" | "CONFIRMED" | "FAILED" | "DROPPED",
        confirmations?: number,
        requiredConfirmations?: number,
        blockNumber?: bigint
    }>;
}
