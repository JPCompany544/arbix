import { NextResponse } from "next/server";

export async function GET() {
    const results: Record<string, string> = {};

    // Test each import individually
    try {
        await import("ethers");
        results["ethers"] = "OK";
    } catch (e: any) {
        results["ethers"] = `FAIL: ${e.message?.substring(0, 200)}`;
    }

    try {
        await import("@solana/web3.js");
        results["solana"] = "OK";
    } catch (e: any) {
        results["solana"] = `FAIL: ${e.message?.substring(0, 200)}`;
    }

    try {
        await import("tiny-secp256k1");
        results["tiny-secp256k1"] = "OK";
    } catch (e: any) {
        results["tiny-secp256k1"] = `FAIL: ${e.message?.substring(0, 200)}`;
    }

    try {
        await import("bip32");
        results["bip32"] = "OK";
    } catch (e: any) {
        results["bip32"] = `FAIL: ${e.message?.substring(0, 200)}`;
    }

    try {
        await import("bitcoinjs-lib");
        results["bitcoinjs-lib"] = "OK";
    } catch (e: any) {
        results["bitcoinjs-lib"] = `FAIL: ${e.message?.substring(0, 200)}`;
    }

    try {
        await import("xrpl");
        results["xrpl"] = "OK";
    } catch (e: any) {
        results["xrpl"] = `FAIL: ${e.message?.substring(0, 200)}`;
    }

    try {
        await import("bip39");
        results["bip39"] = "OK";
    } catch (e: any) {
        results["bip39"] = `FAIL: ${e.message?.substring(0, 200)}`;
    }

    try {
        await import("ed25519-hd-key");
        results["ed25519-hd-key"] = "OK";
    } catch (e: any) {
        results["ed25519-hd-key"] = `FAIL: ${e.message?.substring(0, 200)}`;
    }

    // Test chain factory
    try {
        const { chainFactory } = await import("@/core/chain-factory");
        results["chain-factory"] = "OK";
    } catch (e: any) {
        results["chain-factory"] = `FAIL: ${e.message?.substring(0, 200)}`;
    }

    // Test wallet service
    try {
        const { generateAddress } = await import("@/lib/wallet/wallet-service");
        results["wallet-service"] = "OK";
    } catch (e: any) {
        results["wallet-service"] = `FAIL: ${e.message?.substring(0, 200)}`;
    }

    return NextResponse.json(results);
}
