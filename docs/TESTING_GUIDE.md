# End-to-End Testing Guide

## Overview

This guide walks through comprehensive testing of the complete custodial wallet system, from blockchain settlement to frontend UI.

---

## Prerequisites

### 1. Environment Setup
Ensure all environment variables are configured:
```bash
DATABASE_URL="postgresql://..."
MASTER_SEED_ENCRYPTED="..."
SEED_ENCRYPTION_KEY="..."
ETH_SEPOLIA_RPC="https://..."
BSC_TESTNET_RPC="https://..."
SOLANA_DEVNET_RPC="https://..."
```

### 2. Database Migration
```bash
npx prisma migrate deploy
npx prisma generate
```

### 3. Testnet Funds
Ensure derivation index 1 wallet has testnet gas funds:
- ETH Sepolia: Use https://sepoliafaucet.com
- BSC Testnet: Use https://testnet.bnbchain.org/faucet-smart
- SOL Devnet: Use `solana airdrop`

---

## Test Suite

### TEST 1: Deposit Flow ✅

**Objective:** Verify entire deposit detection and crediting pipeline

#### Steps:

1. **Get Deposit Address**
```bash
npx tsx scripts/show-deposit-addresses.ts
```
Copy the displayed ETH address.

2. **Send Test Deposit**
Send 0.01 ETH from a testnet faucet or existing wallet to the address.

3. **Start Deposit Monitor**
```bash
npx tsx scripts/run-deposit-monitor.ts
```

4. **Verify Detection**
Watch console output for:
```
[Deposit Scanner] 💰 ETH DEPOSIT: 0.01 to cmli2bcpp0000dj58qvyfht0h (0x...)
```

5. **Wait for Confirmations**
Monitor console for confirmation count:
```
[Tx Monitor] ETH TX 0x...: 5/12 confirmations
[Tx Monitor] ETH TX 0x...: 12/12 confirmations
[Tx Monitor] ETH TX 0x... CONFIRMED
[Tx Monitor] ✅ Credited 0.01 ETH to user cmli2bcpp0000dj58qvyfht0h
```

6. **Verify Balance Update**
```bash
npx tsx scripts/check-ledger.ts
```

Expected output:
```
📊 Current Balances:
ETH   0.01 (10000000000000000 smallest units)

📜 Ledger History:
📥 DEPOSIT      ETH   0.01
```

**Success Criteria:**
- ✅ Deposit detected within 30 seconds of confirmation
- ✅ Status: PENDING → BROADCASTED → CONFIRMED
- ✅ UserBalance increased by exact amount
- ✅ LedgerEntry created with type DEPOSIT
- ✅ No duplicate credits

---

### TEST 2: Withdrawal Flow ✅

**Objective:** Verify balance deduction, transaction signing, and refund on failure

#### Steps:

1. **Verify Starting Balance**
```bash
npx tsx scripts/check-ledger.ts
```

2. **Execute Withdrawal**

**Option A: Via Script**
```bash
npx tsx scripts/test-unified-signing.ts
```

**Option B: Via Frontend**
1. Start dev server: `npm run dev`
2. Navigate to http://localhost:3000/wallet
3. Select ETH chain
4. Enter recipient address: `0x070FB771612106e2F3F6b7d150F9AA724b2f5CF0`
5. Amount: `0.001`
6. Click "Withdraw"

3. **Verify Immediate Deduction**
```bash
npx tsx scripts/check-ledger.ts
```

Expected:
```
📊 Current Balances:
ETH   0.009 (9000000000000000 smallest units)

📜 Ledger History:
📤 WITHDRAWAL   ETH   0.001
📥 DEPOSIT      ETH   0.01
```

4. **Monitor Confirmation**
```bash
npx tsx scripts/run-deposit-monitor.ts
```

Watch for:
```
[Tx Monitor] ETH OUTBOUND TX: 0x...
[Tx Monitor] ETH TX 0x...: 12/12 confirmations
[Tx Monitor] ETH TX 0x... CONFIRMED
```

5. **Check Transaction History**
In frontend UI or via API:
- Status should update: PENDING → BROADCASTED → CONFIRMED
- Amount: 0.001 ETH
- Direction: OUTBOUND

**Success Criteria:**
- ✅ Balance deducted immediately (atomic)
- ✅ LedgerEntry created with type WITHDRAWAL
- ✅ ChainTransaction created with PENDING status
- ✅ Transaction broadcasted successfully
- ✅ Status updates to CONFIRMED after 12 blocks
- ✅ No balance refund (successful withdrawal)

---

### TEST 3: Withdrawal Failure & Refund ✅

**Objective:** Test automatic refund when withdrawal fails

#### Steps:

1. **Simulate Failure Condition**

Temporarily modify RPC endpoint to point to invalid URL in `.env`:
```bash
ETH_SEPOLIA_RPC="https://invalid-rpc-endpoint.com"
```

2. **Attempt Withdrawal**
```bash
npx tsx scripts/test-unified-signing.ts
```

3. **Observe Failure**
Expected console output:
```
[Wallet Engine] Transaction failed for ID clx...:
ETH transaction failed: ...
```

4. **Verify Refund**
```bash
npx tsx scripts/check-ledger.ts
```

Expected ledger entries:
```
📜 Ledger History:
⚙️ ADJUSTMENT   ETH   0.001 [REFUND:clx...]
📤 WITHDRAWAL   ETH   0.001
```

Balance should be restored to original amount.

5. **Restore RPC**
Revert `.env` to correct RPC endpoint.

**Success Criteria:**
- ✅ ChainTransaction marked as FAILED
- ✅ Balance refunded (atomic transaction)
- ✅ ADJUSTMENT ledger entry created
- ✅ Net balance unchanged (withdrawal + refund = 0)

---

### TEST 4: Concurrency & Nonce Management ✅

**Objective:** Test sequential transaction processing

#### Steps:

1. **Prepare Test Script**
Create `scripts/test-concurrent.ts`:
```typescript
import * as dotenv from "dotenv";
dotenv.config();
import { signTransaction } from "../lib/wallet/engine";

async function test() {
    const userId = "cmli2bcpp0000dj58qvyfht0h";
    
    console.log("Testing 3 concurrent withdrawals...\n");
    
    const results = await Promise.all([
        signTransaction(userId, "ETH", { to: "0x070FB771612106e2F3F6b7d150F9AA724b2f5CF0", value: "0.0001" }),
        signTransaction(userId, "ETH", { to: "0x070FB771612106e2F3F6b7d150F9AA724b2f5CF0", value: "0.0001" }),
        signTransaction(userId, "ETH", { to: "0x070FB771612106e2F3F6b7d150F9AA724b2f5CF0", value: "0.0001" })
    ]);
    
    console.log("\n✅ Results:");
    results.forEach((r, i) => {
        console.log(`TX ${i + 1}: ${r.txHash}`);
    });
}

test().catch(console.error);
```

2. **Execute Test**
```bash
npx tsx scripts/test-concurrent.ts
```

3. **Verify Results**
- All 3 transactions should succeed
- Each should have unique nonce
- Check on Etherscan that all 3 txs are valid

4. **Check Explorer**
Visit https://sepolia.etherscan.io/address/[YOUR_WALLET_ADDRESS]

Verify:
- 3 outbound transactions
- Each with sequential nonce (N, N+1, N+2)
- All successful

**Success Criteria:**
- ✅ No nonce collisions
- ✅ All transactions broadcasted
- ✅ Sequential nonce assignment
- ✅ All balances correct

---

### TEST 5: Restart & State Recovery ✅

**Objective:** Verify scanner state persistence

#### Steps:

1. **Check Initial State**
```bash
npx tsx scripts/scan-deposits-once.ts
```

Note the `ChainScanState` output:
```
=== Chain Scan State ===
ETH: Block 10245600
```

2. **Send Deposit**
Send 0.005 ETH to your deposit address.

3. **Start Monitor**
```bash
npx tsx scripts/run-deposit-monitor.ts
```

Wait for deposit detection (not confirmation).

4. **Kill Monitor**
Press `Ctrl+C` to stop the monitor.

5. **Verify State Saved**
```sql
SELECT * FROM "ChainScanState" WHERE chain = 'ETH';
```

Should show updated block number.

6. **Restart Monitor**
```bash
npx tsx scripts/run-deposit-monitor.ts
```

7. **Verify Resume**
Console should show:
```
[Deposit Scanner] ETH - Last: 10245605, Latest: 10245610
```

Should resume from saved block, not re-scan all blocks.

8. **Verify No Duplicate**
```bash
npx tsx scripts/check-ledger.ts
```

Deposit should appear exactly once in ledger.

**Success Criteria:**
- ✅ ChainScanState persisted correctly
- ✅ Monitor resumes from last scanned block
- ✅ No duplicate deposit detection
- ✅ No skipped blocks

---

### TEST 6: Frontend UI Validation ✅

**Objective:** Test complete user workflow

#### Steps:

1. **Start Development Server**
```bash
npm run dev
```

2. **Start Background Monitor**
In separate terminal:
```bash
npx tsx scripts/run-deposit-monitor.ts
```

3. **Open Wallet Page**
Navigate to: http://localhost:3000/wallet

4. **Verify Initial State**
- ✅ Chain selector shows ETH, BSC, SOL
- ✅ Balance displays correctly
- ✅ Deposit address shown and copyable
- ✅ Transaction history loads

5. **Test Deposit Flow**
- Copy deposit address
- Send 0.01 ETH from external wallet
- Wait 15 seconds for auto-refresh
- Verify transaction appears with "BROADCASTED" status
- Wait for 12 confirmations
- Verify status updates to "CONFIRMED"
- Verify balance increases

6. **Test Withdrawal Flow**
- Enter recipient address
- Enter amount: 0.001
- Click "Withdraw"
- Verify immediate feedback
- Verify balance decreases immediately
- Verify transaction appears in history
- Verify status progresses: PENDING → BROADCASTED → CONFIRMED

7. **Test Error Handling**
- Try withdrawing more than balance
- Verify error message: "Insufficient balance"
- Try invalid address
- Verify error message: "Invalid EVM address"
- Try zero amount
- Verify validation

8. **Test Multi-Chain**
- Switch to BSC
- Verify address changes
- Verify balance loads
- Verify transaction history filters to BSC only

**Success Criteria:**
- ✅ All UI elements render correctly
- ✅ Real-time balance updates
- ✅ Transaction status transitions visible
- ✅ Error messages clear and helpful
- ✅ Multi-chain switching works
- ✅ No console errors
- ✅ Auto-refresh works (15s interval)

---

## Troubleshooting Common Issues

### Deposit Not Detected

**Symptoms:** Sent funds but scanner doesn't detect

**Diagnosis:**
1. Check scanner is running: `npx tsx scripts/scan-deposits-once.ts`
2. Verify address ownership:
```sql
SELECT * FROM "UserWallet" WHERE address = 'YOUR_ADDRESS';
```
3. Check scan state:
```sql
SELECT * FROM "ChainScanState";
```

**Solution:**
- If scanner not running: Start monitor
- If address not in DB: Regenerate with `generateAddress()`
- If scan state behind: Wait for scanner to catch up

### Withdrawal Stuck

**Symptoms:** Transaction shows PENDING for >30 minutes

**Diagnosis:**
1. Check internal balance:
```bash
npx tsx scripts/check-ledger.ts
```
2. Check wallet gas funds (on-chain):
Visit Etherscan for your derived address
3. Review logs for errors

**Solution:**
- Insufficient balance: Credit more funds
- Insufficient gas: Send ETH to derived wallet
- RPC issue: Check endpoints in `.env`

### Balance Mismatch

**Symptoms:** `UserBalance` doesn't match sum of `LedgerEntry`

**Diagnosis:**
```sql
-- Check balance
SELECT * FROM "UserBalance" WHERE userId = 'XXX' AND chain = 'ETH';

-- Sum ledger entries
SELECT 
    SUM(CASE WHEN type = 'DEPOSIT' THEN CAST(amount AS NUMERIC) 
             WHEN type = 'WITHDRAWAL' THEN -CAST(amount AS NUMERIC)
             ELSE CAST(amount AS NUMERIC) END) as total
FROM "LedgerEntry" 
WHERE userId = 'XXX' AND chain = 'ETH';
```

**Solution:**
If mismatch found:
1. Audit all ledger entries
2. Check for missing refund entries
3. Manually reconcile if needed

---

## Production Checklist

Before deploying to production:

- [ ] All tests passing
- [ ] Environment variables secured (use secrets manager)
- [ ] RPC endpoints configured for mainnet
- [ ] Confirmation thresholds reviewed
- [ ] Monitoring & alerting configured
- [ ] Database backups enabled
- [ ] Rate limiting on API endpoints
- [ ] Frontend authentication enforced
- [ ] Withdrawal limits implemented
- [ ] Multi-signature approval (recommended)
- [ ] HSM/KMS key management (recommended)

---

## Support

For issues or questions:
1. Check logs in console output
2. Review database state with provided SQL queries
3. Consult WALLET_ENGINE.md documentation
4. Check blockchain explorers for on-chain status

---

*Last Updated: 2026-02-12*
*Version: 1.0.0*
