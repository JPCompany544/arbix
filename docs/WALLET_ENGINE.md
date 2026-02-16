# Wallet Engine - Complete Implementation Guide

## Overview

This document outlines the complete custodial wallet infrastructure implemented for the arbitrage platform, covering blockchain operations, internal ledger, and deposit monitoring across Ethereum (Sepolia), BSC (Testnet), and Solana (Devnet).

---

## Architecture Layers

### 1. **Blockchain Settlement Layer**
- Multi-chain support (ETH, BSC, SOL)
- HD wallet derivation (BIP-44)
- Transaction signing & broadcasting
- Nonce management (EVM chains)
- Transaction queuing per address

### 2. **Persistent Transaction Tracking**
- Database records for all blockchain operations
- Status lifecycle: PENDING → BROADCASTED → CONFIRMED/FAILED
- Automatic refunds on failure
- Block-level confirmation tracking

### 3. **Internal Ledger System**
- Double-entry ready accounting
- Atomic balance updates
- Append-only audit log
- Precision handling (wei/lamports)
- Balance enforcement

### 4. **Deposit Monitoring Engine**
- Block-by-block scanning (EVM)
- Signature-based detection (Solana)
- Confirmation thresholds (ETH: 12, BSC: 5, SOL: finalized)
- Automatic ledger crediting
- Deduplication by txHash

---

## Database Schema

### Core Tables

**UserWallet**
- Maps users to derived blockchain addresses
- Tracks derivation index for HD wallets
- Indexed by address for fast deposit lookup

**ChainTransaction**
- Records all blockchain operations
- Direction: INBOUND (deposit) | OUTBOUND (withdrawal)
- Status: PENDING → BROADCASTED → CONFIRMED/FAILED
- Stores blockNumber for confirmation tracking

**UserBalance**
- Real-time balance snapshot per user/chain
- Stored as string (smallest units) for precision
- Source of truth for withdrawal authorization

**LedgerEntry**
- Immutable audit log
- Type: DEPOSIT | WITHDRAWAL | ADJUSTMENT
- Links to ChainTransaction via referenceId

**ChainScanState**
- Tracks last scanned block per chain
- Prevents duplicate scanning and missed blocks

---

## Transaction Flows

### Withdrawal Flow

```
1. Check UserBalance (atomic DB transaction)
   ├─ Verify sufficient balance
   ├─ Deduct balance
   ├─ Create LedgerEntry (WITHDRAWAL)
   └─ Create ChainTransaction (PENDING, OUTBOUND)

2. Sign & Broadcast
   ├─ Derive private key (internal only)
   ├─ Get managed nonce (EVM) or queue (SOL)
   └─ Send via RPC

3. On Success
   └─ Update ChainTransaction (BROADCASTED)

4. On Failure
   ├─ Mark ChainTransaction (FAILED)
   ├─ Refund UserBalance (atomic)
   └─ Create LedgerEntry (ADJUSTMENT)

5. Confirmation Monitor
   ├─ Check confirmations (ETH: 12, BSC: 5, SOL: finalized)
   └─ Update to CONFIRMED when threshold met
```

### Deposit Flow

```
1. Scanner Detects Deposit
   ├─ Scan blocks/signatures
   ├─ Check if tx.to matches user address
   ├─ Verify amount > 0
   └─ Check for duplicate txHash

2. Create Record
   └─ ChainTransaction (BROADCASTED, INBOUND)

3. Confirmation Monitor
   ├─ Check confirmations against threshold
   └─ When sufficient: Mark CONFIRMED

4. Credit to Ledger (atomic)
   ├─ Increase UserBalance
   └─ Create LedgerEntry (DEPOSIT)
```

---

## Security Principles

### Never Trust Before Confirmation
- ❌ Never credit from mempool
- ❌ Never trust webhooks blindly
- ✅ Only credit after on-chain confirmation
- ✅ Enforce confirmation thresholds

### Atomic Operations
- All balance updates wrapped in `prisma.$transaction`
- Debit-before-broadcast for withdrawals
- No partial state updates

### Private Key Isolation
- Keys never logged or exposed
- Derived on-demand from encrypted master seed
- Server-side only (runtime enforcement)

### Balance Integrity
- Internal balance = source of truth for withdrawals
- Never rely on `provider.getBalance()` for authorization
- Blockchain = settlement layer only

---

## Scripts & Tools

### Setup & Initialization
```bash
# Generate encrypted master seed
npx tsx scripts/generate-master-seed.ts

# Verify engine configuration
npx tsx scripts/verify-engine.ts
```

### Balance Management
```bash
# Credit test funds (development only)
npx tsx scripts/credit-test-funds.ts

# Check balances and ledger history
npx tsx scripts/check-ledger.ts

# Show deposit addresses
npx tsx scripts/show-deposit-addresses.ts
```

### Transaction Testing
```bash
# Test unified signing (ETH, BSC, SOL)
npx tsx scripts/test-unified-signing.ts
```

### Monitoring (Production)
```bash
# Run combined deposit scanner + confirmation monitor
npx tsx scripts/run-deposit-monitor.ts

# One-time manual scan
npx tsx scripts/scan-deposits-once.ts
```

---

## Confirmation Thresholds

| Chain | Confirmations | Rationale |
|-------|---------------|-----------|
| ETH   | 12 blocks     | Industry standard for finality |
| BSC   | 5 blocks      | Faster block time, lower threshold |
| SOL   | finalized     | Uses Solana's finality status |

---

## API Integration Points

### Withdrawal Endpoint (Example)
```typescript
// POST /api/admin/withdraw
await signTransaction(userId, "ETH", {
  to: "0x...",
  value: "0.1" // ETH
});
// Returns: { txHash, id }
// Automatically deducts from UserBalance
```

### Balance Check
```typescript
const balance = await prisma.userBalance.findUnique({
  where: { userId_chain: { userId, chain: "ETH" } }
});
// Returns balance in wei (string)
```

### Transaction History
```typescript
const txs = await prisma.chainTransaction.findMany({
  where: { userId, chain: "ETH" },
  orderBy: { createdAt: "desc" }
});
// Returns all deposits and withdrawals
```

---

## Environment Variables Required

```env
# Database
DATABASE_URL="postgresql://..."

# Master Seed Security
MASTER_SEED_ENCRYPTED="..."
SEED_ENCRYPTION_KEY="..."

# RPC Endpoints
ETH_SEPOLIA_RPC="https://..."
BSC_TESTNET_RPC="https://..."
SOLANA_DEVNET_RPC="https://..."
```

---

## Production Considerations

### Scaling Deposit Detection
- Current: Polling blocks/signatures
- Upgrade to: Webhooks (Helius, QuickNode) + fallback polling
- Implement: Redis-based deduplication

### High-Availability Monitoring
- Run monitors as separate processes/containers
- Implement health checks and restart logic
- Use job queue (BullMQ) for better error handling

### Enhanced Security
- Move to HSM or AWS KMS for key management
- Implement withdrawal limits and velocity checks
- Add multi-signature approval workflow
- Enable withdrawal whitelist addresses

### Performance Optimization
- Batch RPC requests during scanning
- Implement caching for block data
- Add database read replicas
- Use connection pooling

---

## Testing Strategy

### Unit Tests
- Balance calculation logic
- Atomic transaction boundaries
- Refund mechanisms

### Integration Tests
- End-to-end withdrawal flow
- Deposit detection accuracy
- Confirmation threshold enforcement

### Testnet Validation
- Send real testnet transactions
- Verify balance updates
- Test failure scenarios (insufficient gas, etc.)

---

## Monitoring & Alerts

### Critical Metrics
- Pending transaction age
- Failed transaction rate
- Balance discrepancies
- Scanner lag (blocks behind)
- RPC endpoint health

### Recommended Alerts
- Transaction stuck > 30 minutes
- Scanner lag > 100 blocks
- Failed transaction spike
- RPC endpoint down
- Balance mismatch detected

---

## Support & Troubleshooting

### Common Issues

**Deposit not detected**
1. Check scanner is running: `npx tsx scripts/scan-deposits-once.ts`
2. Verify address ownership in `UserWallet` table
3. Check `ChainScanState` for scan progress

**Withdrawal stuck**
1. Check internal balance sufficient
2. Verify testnet has gas funds
3. Review transaction monitor logs
4. Check RPC endpoint status

**Balance mismatch**
1. Audit `LedgerEntry` records
2. Sum all entries per user/chain
3. Compare with `UserBalance`
4. Investigate any ADJUSTMENT entries

---

## Maintenance Procedures

### Daily
- Monitor scanner lag
- Review failed transactions
- Check RPC endpoint latency

### Weekly
- Audit ledger integrity
- Review unusual balance changes
- Update confirmation thresholds if needed

### Monthly
- Rotate encryption keys (if policy requires)
- Review and archive old transactions
- Performance analysis and optimization

---

*Last Updated: 2026-02-12*
*Version: 1.0.0*
