import { providerRegistry } from "../../../core/provider-registry";
import { loadMasterSeed } from "../../../lib/wallet/utils";
import { getQueue } from "../../../lib/wallet/tx-queue";
import { getNextNonce, resetNonce } from "../../../lib/wallet/nonce-manager";
import { prisma } from "../../../lib/prisma";
import { ethers } from "ethers";

export class EvmAdapter {
  chain: "ETH" | "BSC" = "ETH";

  async getBalance(address: string): Promise<bigint> {
    const p = providerRegistry.getEvmProvider(this.chain);
    const b = await p.getBalance(address);
    return BigInt(b.toString());
  }

  async estimateFee(params: { to: string; value: bigint }): Promise<bigint> {
    const p = providerRegistry.getEvmProvider(this.chain);
    const feeData = await p.getFeeData();
    const gasLimit = 21000n;

    const isMainnet = process.env.NETWORK === "mainnet";
    const minGasPrice = isMainnet ? 10000000000n : 0n; // 10 Gwei

    if (feeData.maxFeePerGas) {
      let maxFee = (feeData.maxFeePerGas * 130n) / 100n;
      if (maxFee < minGasPrice) maxFee = minGasPrice;
      return gasLimit * maxFee;
    } else {
      let gp = feeData.gasPrice ? (feeData.gasPrice * 120n) / 100n : 1000000000n;
      if (gp < minGasPrice) gp = minGasPrice;
      return gasLimit * gp;
    }
  }

  private async derivePrivateKeyForAddress(address: string): Promise<string> {
    // Find the userWallet entry that maps to this address (derived from master seed)
    const uw = await prisma.userWallet.findFirst({
      where: {
        address: { equals: address, mode: 'insensitive' },
        chain: this.chain
      }
    });
    if (!uw) throw new Error(`No derivation index found for address ${address}`);

    const mnemonic = await loadMasterSeed();
    const path = `m/44'/60'/0'/0/${uw.derivationIndex}`;
    const node = ethers.HDNodeWallet.fromPhrase(mnemonic, undefined, "m").derivePath(path);
    return node.privateKey;
  }

  async send(params: { from: string; to: string; value: bigint }): Promise<{ txHash: string }> {
    const { from, to, value } = params;
    const provider = providerRegistry.getEvmProvider(this.chain);

    const queue = getQueue(from);
    return queue.enqueue(async () => {
      try {
        const pk = await this.derivePrivateKeyForAddress(from);
        const wallet = new ethers.Wallet(pk, provider);

        if (wallet.address.toLowerCase() !== from.toLowerCase()) {
          throw new Error(`Derivation mismatch! Expected ${from}, but derived ${wallet.address}. Path might be incorrect.`);
        }

        const nonce = await getNextNonce(from, provider);
        const feeData = await provider.getFeeData();

        // MAINNET SAFETY: Enforce minimum gas prices
        const isMainnet = process.env.NETWORK === "mainnet";
        const minPriorityFee = isMainnet ? 1500000000n : 0n; // 1.5 Gwei
        const minGasPrice = isMainnet ? 10000000000n : 0n;   // 10 Gwei

        const gasLimit = 21000n;
        const txParams: any = {
          to,
          value: value as any,
          nonce,
          gasLimit: gasLimit as any
        };

        if (feeData.maxFeePerGas && feeData.maxPriorityFeePerGas) {
          let maxPriority = (feeData.maxPriorityFeePerGas * 150n) / 100n;
          if (maxPriority < minPriorityFee) maxPriority = minPriorityFee;

          let maxFee = (feeData.maxFeePerGas * 130n) / 100n;
          if (maxFee < minGasPrice) maxFee = minGasPrice;

          txParams.maxFeePerGas = maxFee;
          txParams.maxPriorityFeePerGas = maxPriority;
        } else {
          let gp = feeData.gasPrice ? (feeData.gasPrice * 120n) / 100n : 1000000000n;
          if (gp < minGasPrice) gp = minGasPrice;
          txParams.gasPrice = gp;
        }

        console.log(`[EvmAdapter] Broadcasting sweep of ${ethers.formatEther(value)} ${this.chain} (Nonce: ${nonce}, MaxFee: ${txParams.maxFeePerGas ? ethers.formatUnits(txParams.maxFeePerGas, "gwei") : ethers.formatUnits(txParams.gasPrice, "gwei")} Gwei)`);

        const txResponse = await wallet.sendTransaction(txParams);

        // Verify broadcast success (wait for it to appear in mempool)
        await new Promise(r => setTimeout(r, 4000));
        const check = await provider.getTransaction(txResponse.hash);
        if (!check) {
          throw new Error(`Transaction ${txResponse.hash} was rejected by nodes. It likely didn't meet minimum gas price requirements.`);
        }

        return { txHash: txResponse.hash };
      } catch (error) {
        // reset nonce to avoid cache drift
        resetNonce(from);
        throw error;
      }
    });
  }

  async getTransactionStatus(txHash: string) {
    const provider = providerRegistry.getEvmProvider(this.chain);
    const receipt = await provider.getTransactionReceipt(txHash);
    if (!receipt) return { status: 'PENDING' as const };
    if (receipt.status === 0) return { status: 'FAILED' as const };
    const current = await provider.getBlockNumber();
    const confirmations = current - receipt.blockNumber;
    const required = 12;
    return { status: confirmations >= required ? 'CONFIRMED' as const : 'PENDING' as const };
  }
}

export default EvmAdapter;
