import * as dotenv from "dotenv";
dotenv.config();
import { prisma } from "../lib/prisma";
import { chainFactory } from "../core/chain-factory";
import { loadMasterSeed, allocateDerivationIndex } from "../lib/wallet/utils";
import { ethers } from "ethers";
import * as bitcoin from "bitcoinjs-lib";
import * as bip39 from "bip39";
import { BIP32Factory } from "bip32";
import * as ecc from "tiny-secp256k1";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import { networkConfig } from "../core/network-config";

const bip32 = BIP32Factory(ecc);

async function testReproducibility() {
    console.log("\n🧪 STARTING TEST 4: Address Reproducibility\n");
    const testUser = await prisma.user.upsert({
        where: { email: "test-repro@example.com" },
        update: {},
        create: { email: "test-repro@example.com", password: "password" }
    });
    const userId = testUser.id;
    const chains: any[] = ["ETH", "BSC", "SOL", "BTC", "XRP"];
    const mnemonic = await loadMasterSeed();

    for (const chainType of chains) {
        console.log(`--- Testing Chain: ${chainType} ---`);
        const chain = chainFactory.getChain(chainType);
        const result = await chain.generateAddress(userId);
        const originalAddress = result.address;
        const index = result.derivationIndex!;

        console.log(`Original: Address=${originalAddress}, Index=${index}`);
        await prisma.userWallet.delete({ where: { userId_chain: { userId, chain: chainType } } });

        let rederivedAddress = "";
        let path = "";
        if (chainType === "ETH" || chainType === "BSC") {
            path = `m/44'/60'/0'/0/${index}`;
            rederivedAddress = ethers.HDNodeWallet.fromPhrase(mnemonic, undefined, "m").derivePath(path).address;
        } else if (chainType === "SOL") {
            const seed = bip39.mnemonicToSeedSync(mnemonic);
            path = `m/44'/501'/${index}'/0'`;
            rederivedAddress = Keypair.fromSeed(derivePath(path, seed.toString("hex")).key).publicKey.toBase58();
        } else if (chainType === "BTC") {
            const network = networkConfig.getMode() === "mainnet" ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;
            const coinType = network === bitcoin.networks.bitcoin ? "0'" : "1'";
            path = `m/84'/${coinType}/0'/0/${index}`;
            const root = bip32.fromSeed(await bip39.mnemonicToSeed(mnemonic), network);
            rederivedAddress = bitcoin.payments.p2wpkh({ pubkey: root.derivePath(path).publicKey, network }).address!;
        } else if (chainType === "XRP") {
            rederivedAddress = networkConfig.getSystemAddress("XRP");
        }

        if (originalAddress.toLowerCase() === rederivedAddress.toLowerCase()) {
            console.log("✅ PASS: Addresses match!");
        } else {
            console.error(`❌ FAIL: Mismatch! Expected ${originalAddress}, got ${rederivedAddress}`);
            process.exit(1);
        }
    }
}

async function testSequentialIncr(count: number) {
    console.log(`\n🧪 STARTING TEST 5: Sequential Uniqueness Test (${count} users)\n`);
    const chain = "ETH";
    const userIds = [];
    for (let i = 0; i < count; i++) {
        const u = await prisma.user.create({ data: { email: `seq-${Date.now()}-${i}@example.com`, password: "p" } });
        userIds.push(u.id);
    }
    const results = [];
    for (const u of userIds) results.push(await allocateDerivationIndex(u, chain));
    const uniqueIndices = new Set(results);
    if (uniqueIndices.size === results.length) console.log("✅ PASS: All indices are unique!");
    else { console.error("❌ FAIL: Duplicate indices!"); process.exit(1); }
}

async function runTests() {
    try {
        await testReproducibility();
        await testSequentialIncr(10);
        console.log("\n🎉 ALL TESTS PASSED!");
    } catch (err: any) {
        console.error("Test failed:", err);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}
runTests();
