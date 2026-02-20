import { Connection, PublicKey, Transaction, SystemProgram, Keypair } from "@solana/web3.js";
import { providerRegistry } from "../../../core/provider-registry";
import { loadMasterSeed } from "../../../lib/wallet/utils";
import { prisma } from "../../../lib/prisma";
import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";

export class SolAdapter {
    async getBalance(address: string): Promise<bigint> {
        const connection = providerRegistry.getSolanaConnection();
        const balance = await connection.getBalance(new PublicKey(address));
        return BigInt(balance);
    }

    async estimateFee(params: { to: string; value: bigint }): Promise<bigint> {
        // Standard SOL transfer fee is ~5000 lamports
        return 5000n;
    }

    private async deriveKeypairForAddress(address: string): Promise<Keypair> {
        const uw = await prisma.userWallet.findFirst({ where: { address, chain: "SOL" } });
        if (!uw) throw new Error(`No derivation index found for address ${address}`);

        const mnemonic = await loadMasterSeed();
        const seed = bip39.mnemonicToSeedSync(mnemonic);
        const path = `m/44'/501'/${uw.derivationIndex}'/0'`;
        const derived = derivePath(path, seed.toString("hex"));
        return Keypair.fromSeed(derived.key);
    }

    async send(params: { from: string; to: string; value: bigint }): Promise<{ txHash: string }> {
        const { from, to, value } = params;
        const connection = providerRegistry.getSolanaConnection();
        const keypair = await this.deriveKeypairForAddress(from);

        // Security check: Ensure derived address matches the source address
        if (keypair.publicKey.toBase58() !== from) {
            throw new Error(`Derivation mismatch! Expected ${from}, but derived ${keypair.publicKey.toBase58()}. Path might be incorrect.`);
        }

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: keypair.publicKey,
                toPubkey: new PublicKey(to),
                lamports: Number(value),
            })
        );

        try {
            const { blockhash } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = keypair.publicKey;

            const signature = await connection.sendTransaction(transaction, [keypair]);

            // Wait for confirmation
            await connection.confirmTransaction(signature, "confirmed");

            return { txHash: signature };
        } catch (error: any) {
            let message = error.message;
            if (error.logs) {
                message += ` | Logs: ${JSON.stringify(error.logs)}`;
            }
            throw new Error(`Solana Send Error: ${message}`);
        }
    }
}

export default SolAdapter;
