
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  detectRuntime,
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.10.2
 * Query Engine version: 5a9203d0590c951969e85a7d07215503f4672eb9
 */
Prisma.prismaVersion = {
  client: "5.10.2",
  engine: "5a9203d0590c951969e85a7d07215503f4672eb9"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  throw new Error(`Extensions.getExtensionContext is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  throw new Error(`Extensions.defineExtension is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  role: 'role',
  status: 'status',
  balance: 'balance',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TransactionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  amount: 'amount',
  type: 'type',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.ChainTransactionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  chain: 'chain',
  to: 'to',
  amount: 'amount',
  txHash: 'txHash',
  status: 'status',
  createdAt: 'createdAt',
  confirmedAt: 'confirmedAt',
  blockNumber: 'blockNumber',
  direction: 'direction'
};

exports.Prisma.LedgerEntryScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  chain: 'chain',
  amount: 'amount',
  type: 'type',
  referenceId: 'referenceId',
  createdAt: 'createdAt'
};

exports.Prisma.UserBalanceScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  chain: 'chain',
  balance: 'balance'
};

exports.Prisma.WithdrawalScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  amount: 'amount',
  walletAddress: 'walletAddress',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.SystemSettingScalarFieldEnum = {
  key: 'key',
  value: 'value'
};

exports.Prisma.UserWalletScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  chain: 'chain',
  derivationIndex: 'derivationIndex',
  address: 'address',
  createdAt: 'createdAt',
  lastKnownBalance: 'lastKnownBalance'
};

exports.Prisma.ChainScanStateScalarFieldEnum = {
  chain: 'chain',
  lastScannedBlock: 'lastScannedBlock',
  updatedAt: 'updatedAt'
};

exports.Prisma.TreasuryAccountScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type: 'type',
  network: 'network',
  currency: 'currency',
  walletAddress: 'walletAddress',
  parentAccountId: 'parentAccountId',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.TreasuryLedgerScalarFieldEnum = {
  id: 'id',
  referenceType: 'referenceType',
  referenceId: 'referenceId',
  description: 'description',
  network: 'network',
  currency: 'currency',
  createdByAdminId: 'createdByAdminId',
  locked: 'locked',
  createdAt: 'createdAt'
};

exports.Prisma.TreasuryEntryScalarFieldEnum = {
  id: 'id',
  ledgerId: 'ledgerId',
  accountId: 'accountId',
  debitAmount: 'debitAmount',
  creditAmount: 'creditAmount',
  currency: 'currency',
  network: 'network',
  createdAt: 'createdAt'
};

exports.Prisma.BalanceSnapshotScalarFieldEnum = {
  id: 'id',
  snapshotTime: 'snapshotTime',
  network: 'network',
  currency: 'currency',
  totalAssets: 'totalAssets',
  totalLiabilities: 'totalLiabilities',
  totalEquity: 'totalEquity'
};

exports.Prisma.TreasuryStateScalarFieldEnum = {
  chain: 'chain',
  totalOnchainBalance: 'totalOnchainBalance',
  totalUserLiabilities: 'totalUserLiabilities',
  sweepableBalance: 'sweepableBalance',
  lastSyncedAt: 'lastSyncedAt',
  locked: 'locked',
  lockedAt: 'lockedAt',
  lockedBy: 'lockedBy'
};

exports.Prisma.SweepScalarFieldEnum = {
  id: 'id',
  chain: 'chain',
  amount: 'amount',
  amountRaw: 'amountRaw',
  fromWallet: 'fromWallet',
  toWallet: 'toWallet',
  txHash: 'txHash',
  status: 'status',
  initiatedBy: 'initiatedBy',
  error: 'error',
  createdAt: 'createdAt',
  confirmedAt: 'confirmedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Role = exports.$Enums.Role = {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

exports.Status = exports.$Enums.Status = {
  ACTIVE: 'ACTIVE',
  BANNED: 'BANNED'
};

exports.TxType = exports.$Enums.TxType = {
  DEPOSIT: 'DEPOSIT',
  WITHDRAWAL: 'WITHDRAWAL'
};

exports.TxStatus = exports.$Enums.TxStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

exports.ChainTxStatus = exports.$Enums.ChainTxStatus = {
  PENDING: 'PENDING',
  BROADCASTED: 'BROADCASTED',
  CONFIRMED: 'CONFIRMED',
  FAILED: 'FAILED'
};

exports.TxDirection = exports.$Enums.TxDirection = {
  INBOUND: 'INBOUND',
  OUTBOUND: 'OUTBOUND'
};

exports.LedgerType = exports.$Enums.LedgerType = {
  DEPOSIT: 'DEPOSIT',
  WITHDRAWAL: 'WITHDRAWAL',
  ADJUSTMENT: 'ADJUSTMENT',
  TRANSFER: 'TRANSFER',
  EARNING: 'EARNING'
};

exports.TreasuryAccountType = exports.$Enums.TreasuryAccountType = {
  ASSET: 'ASSET',
  LIABILITY: 'LIABILITY',
  EQUITY: 'EQUITY'
};

exports.TreasuryLedgerReferenceType = exports.$Enums.TreasuryLedgerReferenceType = {
  DEPOSIT: 'DEPOSIT',
  WITHDRAWAL_REQUEST: 'WITHDRAWAL_REQUEST',
  WITHDRAWAL_EXECUTED: 'WITHDRAWAL_EXECUTED',
  SWEEP: 'SWEEP',
  TREASURY_MOVE: 'TREASURY_MOVE',
  ADJUSTMENT: 'ADJUSTMENT'
};

exports.SweepStatus = exports.$Enums.SweepStatus = {
  PENDING: 'PENDING',
  BROADCASTING: 'BROADCASTING',
  CONFIRMED: 'CONFIRMED',
  FAILED: 'FAILED'
};

exports.Prisma.ModelName = {
  User: 'User',
  Transaction: 'Transaction',
  ChainTransaction: 'ChainTransaction',
  LedgerEntry: 'LedgerEntry',
  UserBalance: 'UserBalance',
  Withdrawal: 'Withdrawal',
  SystemSetting: 'SystemSetting',
  UserWallet: 'UserWallet',
  ChainScanState: 'ChainScanState',
  TreasuryAccount: 'TreasuryAccount',
  TreasuryLedger: 'TreasuryLedger',
  TreasuryEntry: 'TreasuryEntry',
  BalanceSnapshot: 'BalanceSnapshot',
  TreasuryState: 'TreasuryState',
  Sweep: 'Sweep'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        const runtime = detectRuntime()
        const edgeRuntimeName = {
          'workerd': 'Cloudflare Workers',
          'deno': 'Deno and Deno Deploy',
          'netlify': 'Netlify Edge Functions',
          'edge-light': 'Vercel Edge Functions or Edge Middleware',
        }[runtime]

        let message = 'PrismaClient is unable to run in '
        if (edgeRuntimeName !== undefined) {
          message += edgeRuntimeName + '. As an alternative, try Accelerate: https://pris.ly/d/accelerate.'
        } else {
          message += 'this browser environment, or has been bundled for the browser (running in `' + runtime + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
