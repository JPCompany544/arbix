
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model ChainTransaction
 * 
 */
export type ChainTransaction = $Result.DefaultSelection<Prisma.$ChainTransactionPayload>
/**
 * Model LedgerEntry
 * 
 */
export type LedgerEntry = $Result.DefaultSelection<Prisma.$LedgerEntryPayload>
/**
 * Model UserBalance
 * 
 */
export type UserBalance = $Result.DefaultSelection<Prisma.$UserBalancePayload>
/**
 * Model Withdrawal
 * 
 */
export type Withdrawal = $Result.DefaultSelection<Prisma.$WithdrawalPayload>
/**
 * Model SystemSetting
 * 
 */
export type SystemSetting = $Result.DefaultSelection<Prisma.$SystemSettingPayload>
/**
 * Model UserWallet
 * 
 */
export type UserWallet = $Result.DefaultSelection<Prisma.$UserWalletPayload>
/**
 * Model ChainScanState
 * 
 */
export type ChainScanState = $Result.DefaultSelection<Prisma.$ChainScanStatePayload>
/**
 * Model TreasuryAccount
 * 
 */
export type TreasuryAccount = $Result.DefaultSelection<Prisma.$TreasuryAccountPayload>
/**
 * Model TreasuryLedger
 * 
 */
export type TreasuryLedger = $Result.DefaultSelection<Prisma.$TreasuryLedgerPayload>
/**
 * Model TreasuryEntry
 * 
 */
export type TreasuryEntry = $Result.DefaultSelection<Prisma.$TreasuryEntryPayload>
/**
 * Model BalanceSnapshot
 * 
 */
export type BalanceSnapshot = $Result.DefaultSelection<Prisma.$BalanceSnapshotPayload>
/**
 * Model TreasuryState
 * 
 */
export type TreasuryState = $Result.DefaultSelection<Prisma.$TreasuryStatePayload>
/**
 * Model Sweep
 * 
 */
export type Sweep = $Result.DefaultSelection<Prisma.$SweepPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Status: {
  ACTIVE: 'ACTIVE',
  BANNED: 'BANNED'
};

export type Status = (typeof Status)[keyof typeof Status]


export const TxType: {
  DEPOSIT: 'DEPOSIT',
  WITHDRAWAL: 'WITHDRAWAL'
};

export type TxType = (typeof TxType)[keyof typeof TxType]


export const TxStatus: {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type TxStatus = (typeof TxStatus)[keyof typeof TxStatus]


export const ChainTxStatus: {
  PENDING: 'PENDING',
  BROADCASTED: 'BROADCASTED',
  CONFIRMED: 'CONFIRMED',
  FAILED: 'FAILED'
};

export type ChainTxStatus = (typeof ChainTxStatus)[keyof typeof ChainTxStatus]


export const TxDirection: {
  INBOUND: 'INBOUND',
  OUTBOUND: 'OUTBOUND'
};

export type TxDirection = (typeof TxDirection)[keyof typeof TxDirection]


export const LedgerType: {
  DEPOSIT: 'DEPOSIT',
  WITHDRAWAL: 'WITHDRAWAL',
  ADJUSTMENT: 'ADJUSTMENT',
  TRANSFER: 'TRANSFER',
  EARNING: 'EARNING'
};

export type LedgerType = (typeof LedgerType)[keyof typeof LedgerType]


export const TreasuryAccountType: {
  ASSET: 'ASSET',
  LIABILITY: 'LIABILITY',
  EQUITY: 'EQUITY'
};

export type TreasuryAccountType = (typeof TreasuryAccountType)[keyof typeof TreasuryAccountType]


export const TreasuryLedgerReferenceType: {
  DEPOSIT: 'DEPOSIT',
  WITHDRAWAL_REQUEST: 'WITHDRAWAL_REQUEST',
  WITHDRAWAL_EXECUTED: 'WITHDRAWAL_EXECUTED',
  SWEEP: 'SWEEP',
  TREASURY_MOVE: 'TREASURY_MOVE',
  ADJUSTMENT: 'ADJUSTMENT'
};

export type TreasuryLedgerReferenceType = (typeof TreasuryLedgerReferenceType)[keyof typeof TreasuryLedgerReferenceType]


export const SweepStatus: {
  PENDING: 'PENDING',
  BROADCASTING: 'BROADCASTING',
  CONFIRMED: 'CONFIRMED',
  FAILED: 'FAILED'
};

export type SweepStatus = (typeof SweepStatus)[keyof typeof SweepStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

export type TxType = $Enums.TxType

export const TxType: typeof $Enums.TxType

export type TxStatus = $Enums.TxStatus

export const TxStatus: typeof $Enums.TxStatus

export type ChainTxStatus = $Enums.ChainTxStatus

export const ChainTxStatus: typeof $Enums.ChainTxStatus

export type TxDirection = $Enums.TxDirection

export const TxDirection: typeof $Enums.TxDirection

export type LedgerType = $Enums.LedgerType

export const LedgerType: typeof $Enums.LedgerType

export type TreasuryAccountType = $Enums.TreasuryAccountType

export const TreasuryAccountType: typeof $Enums.TreasuryAccountType

export type TreasuryLedgerReferenceType = $Enums.TreasuryLedgerReferenceType

export const TreasuryLedgerReferenceType: typeof $Enums.TreasuryLedgerReferenceType

export type SweepStatus = $Enums.SweepStatus

export const SweepStatus: typeof $Enums.SweepStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs>;

  /**
   * `prisma.chainTransaction`: Exposes CRUD operations for the **ChainTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChainTransactions
    * const chainTransactions = await prisma.chainTransaction.findMany()
    * ```
    */
  get chainTransaction(): Prisma.ChainTransactionDelegate<ExtArgs>;

  /**
   * `prisma.ledgerEntry`: Exposes CRUD operations for the **LedgerEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LedgerEntries
    * const ledgerEntries = await prisma.ledgerEntry.findMany()
    * ```
    */
  get ledgerEntry(): Prisma.LedgerEntryDelegate<ExtArgs>;

  /**
   * `prisma.userBalance`: Exposes CRUD operations for the **UserBalance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserBalances
    * const userBalances = await prisma.userBalance.findMany()
    * ```
    */
  get userBalance(): Prisma.UserBalanceDelegate<ExtArgs>;

  /**
   * `prisma.withdrawal`: Exposes CRUD operations for the **Withdrawal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Withdrawals
    * const withdrawals = await prisma.withdrawal.findMany()
    * ```
    */
  get withdrawal(): Prisma.WithdrawalDelegate<ExtArgs>;

  /**
   * `prisma.systemSetting`: Exposes CRUD operations for the **SystemSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemSettings
    * const systemSettings = await prisma.systemSetting.findMany()
    * ```
    */
  get systemSetting(): Prisma.SystemSettingDelegate<ExtArgs>;

  /**
   * `prisma.userWallet`: Exposes CRUD operations for the **UserWallet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserWallets
    * const userWallets = await prisma.userWallet.findMany()
    * ```
    */
  get userWallet(): Prisma.UserWalletDelegate<ExtArgs>;

  /**
   * `prisma.chainScanState`: Exposes CRUD operations for the **ChainScanState** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChainScanStates
    * const chainScanStates = await prisma.chainScanState.findMany()
    * ```
    */
  get chainScanState(): Prisma.ChainScanStateDelegate<ExtArgs>;

  /**
   * `prisma.treasuryAccount`: Exposes CRUD operations for the **TreasuryAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TreasuryAccounts
    * const treasuryAccounts = await prisma.treasuryAccount.findMany()
    * ```
    */
  get treasuryAccount(): Prisma.TreasuryAccountDelegate<ExtArgs>;

  /**
   * `prisma.treasuryLedger`: Exposes CRUD operations for the **TreasuryLedger** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TreasuryLedgers
    * const treasuryLedgers = await prisma.treasuryLedger.findMany()
    * ```
    */
  get treasuryLedger(): Prisma.TreasuryLedgerDelegate<ExtArgs>;

  /**
   * `prisma.treasuryEntry`: Exposes CRUD operations for the **TreasuryEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TreasuryEntries
    * const treasuryEntries = await prisma.treasuryEntry.findMany()
    * ```
    */
  get treasuryEntry(): Prisma.TreasuryEntryDelegate<ExtArgs>;

  /**
   * `prisma.balanceSnapshot`: Exposes CRUD operations for the **BalanceSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BalanceSnapshots
    * const balanceSnapshots = await prisma.balanceSnapshot.findMany()
    * ```
    */
  get balanceSnapshot(): Prisma.BalanceSnapshotDelegate<ExtArgs>;

  /**
   * `prisma.treasuryState`: Exposes CRUD operations for the **TreasuryState** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TreasuryStates
    * const treasuryStates = await prisma.treasuryState.findMany()
    * ```
    */
  get treasuryState(): Prisma.TreasuryStateDelegate<ExtArgs>;

  /**
   * `prisma.sweep`: Exposes CRUD operations for the **Sweep** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sweeps
    * const sweeps = await prisma.sweep.findMany()
    * ```
    */
  get sweep(): Prisma.SweepDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.10.2
   * Query Engine version: 5a9203d0590c951969e85a7d07215503f4672eb9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'user' | 'transaction' | 'chainTransaction' | 'ledgerEntry' | 'userBalance' | 'withdrawal' | 'systemSetting' | 'userWallet' | 'chainScanState' | 'treasuryAccount' | 'treasuryLedger' | 'treasuryEntry' | 'balanceSnapshot' | 'treasuryState' | 'sweep'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>,
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>,
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>,
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      ChainTransaction: {
        payload: Prisma.$ChainTransactionPayload<ExtArgs>
        fields: Prisma.ChainTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChainTransactionFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChainTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChainTransactionFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChainTransactionPayload>
          }
          findFirst: {
            args: Prisma.ChainTransactionFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChainTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChainTransactionFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChainTransactionPayload>
          }
          findMany: {
            args: Prisma.ChainTransactionFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChainTransactionPayload>[]
          }
          create: {
            args: Prisma.ChainTransactionCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChainTransactionPayload>
          }
          createMany: {
            args: Prisma.ChainTransactionCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ChainTransactionDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChainTransactionPayload>
          }
          update: {
            args: Prisma.ChainTransactionUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChainTransactionPayload>
          }
          deleteMany: {
            args: Prisma.ChainTransactionDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ChainTransactionUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ChainTransactionUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChainTransactionPayload>
          }
          aggregate: {
            args: Prisma.ChainTransactionAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateChainTransaction>
          }
          groupBy: {
            args: Prisma.ChainTransactionGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ChainTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChainTransactionCountArgs<ExtArgs>,
            result: $Utils.Optional<ChainTransactionCountAggregateOutputType> | number
          }
        }
      }
      LedgerEntry: {
        payload: Prisma.$LedgerEntryPayload<ExtArgs>
        fields: Prisma.LedgerEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LedgerEntryFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LedgerEntryFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>
          }
          findFirst: {
            args: Prisma.LedgerEntryFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LedgerEntryFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>
          }
          findMany: {
            args: Prisma.LedgerEntryFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>[]
          }
          create: {
            args: Prisma.LedgerEntryCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>
          }
          createMany: {
            args: Prisma.LedgerEntryCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.LedgerEntryDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>
          }
          update: {
            args: Prisma.LedgerEntryUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>
          }
          deleteMany: {
            args: Prisma.LedgerEntryDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.LedgerEntryUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.LedgerEntryUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$LedgerEntryPayload>
          }
          aggregate: {
            args: Prisma.LedgerEntryAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateLedgerEntry>
          }
          groupBy: {
            args: Prisma.LedgerEntryGroupByArgs<ExtArgs>,
            result: $Utils.Optional<LedgerEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.LedgerEntryCountArgs<ExtArgs>,
            result: $Utils.Optional<LedgerEntryCountAggregateOutputType> | number
          }
        }
      }
      UserBalance: {
        payload: Prisma.$UserBalancePayload<ExtArgs>
        fields: Prisma.UserBalanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserBalanceFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserBalancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserBalanceFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserBalancePayload>
          }
          findFirst: {
            args: Prisma.UserBalanceFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserBalancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserBalanceFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserBalancePayload>
          }
          findMany: {
            args: Prisma.UserBalanceFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserBalancePayload>[]
          }
          create: {
            args: Prisma.UserBalanceCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserBalancePayload>
          }
          createMany: {
            args: Prisma.UserBalanceCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserBalanceDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserBalancePayload>
          }
          update: {
            args: Prisma.UserBalanceUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserBalancePayload>
          }
          deleteMany: {
            args: Prisma.UserBalanceDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserBalanceUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserBalanceUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserBalancePayload>
          }
          aggregate: {
            args: Prisma.UserBalanceAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUserBalance>
          }
          groupBy: {
            args: Prisma.UserBalanceGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserBalanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserBalanceCountArgs<ExtArgs>,
            result: $Utils.Optional<UserBalanceCountAggregateOutputType> | number
          }
        }
      }
      Withdrawal: {
        payload: Prisma.$WithdrawalPayload<ExtArgs>
        fields: Prisma.WithdrawalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WithdrawalFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WithdrawalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WithdrawalFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WithdrawalPayload>
          }
          findFirst: {
            args: Prisma.WithdrawalFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WithdrawalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WithdrawalFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WithdrawalPayload>
          }
          findMany: {
            args: Prisma.WithdrawalFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WithdrawalPayload>[]
          }
          create: {
            args: Prisma.WithdrawalCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WithdrawalPayload>
          }
          createMany: {
            args: Prisma.WithdrawalCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.WithdrawalDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WithdrawalPayload>
          }
          update: {
            args: Prisma.WithdrawalUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WithdrawalPayload>
          }
          deleteMany: {
            args: Prisma.WithdrawalDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.WithdrawalUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.WithdrawalUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$WithdrawalPayload>
          }
          aggregate: {
            args: Prisma.WithdrawalAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateWithdrawal>
          }
          groupBy: {
            args: Prisma.WithdrawalGroupByArgs<ExtArgs>,
            result: $Utils.Optional<WithdrawalGroupByOutputType>[]
          }
          count: {
            args: Prisma.WithdrawalCountArgs<ExtArgs>,
            result: $Utils.Optional<WithdrawalCountAggregateOutputType> | number
          }
        }
      }
      SystemSetting: {
        payload: Prisma.$SystemSettingPayload<ExtArgs>
        fields: Prisma.SystemSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemSettingFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemSettingFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          findFirst: {
            args: Prisma.SystemSettingFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemSettingFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          findMany: {
            args: Prisma.SystemSettingFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>[]
          }
          create: {
            args: Prisma.SystemSettingCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          createMany: {
            args: Prisma.SystemSettingCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.SystemSettingDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          update: {
            args: Prisma.SystemSettingUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          deleteMany: {
            args: Prisma.SystemSettingDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.SystemSettingUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.SystemSettingUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          aggregate: {
            args: Prisma.SystemSettingAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateSystemSetting>
          }
          groupBy: {
            args: Prisma.SystemSettingGroupByArgs<ExtArgs>,
            result: $Utils.Optional<SystemSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemSettingCountArgs<ExtArgs>,
            result: $Utils.Optional<SystemSettingCountAggregateOutputType> | number
          }
        }
      }
      UserWallet: {
        payload: Prisma.$UserWalletPayload<ExtArgs>
        fields: Prisma.UserWalletFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserWalletFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserWalletPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserWalletFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserWalletPayload>
          }
          findFirst: {
            args: Prisma.UserWalletFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserWalletPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserWalletFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserWalletPayload>
          }
          findMany: {
            args: Prisma.UserWalletFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserWalletPayload>[]
          }
          create: {
            args: Prisma.UserWalletCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserWalletPayload>
          }
          createMany: {
            args: Prisma.UserWalletCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserWalletDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserWalletPayload>
          }
          update: {
            args: Prisma.UserWalletUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserWalletPayload>
          }
          deleteMany: {
            args: Prisma.UserWalletDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserWalletUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserWalletUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserWalletPayload>
          }
          aggregate: {
            args: Prisma.UserWalletAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUserWallet>
          }
          groupBy: {
            args: Prisma.UserWalletGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserWalletGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserWalletCountArgs<ExtArgs>,
            result: $Utils.Optional<UserWalletCountAggregateOutputType> | number
          }
        }
      }
      ChainScanState: {
        payload: Prisma.$ChainScanStatePayload<ExtArgs>
        fields: Prisma.ChainScanStateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChainScanStateFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChainScanStatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChainScanStateFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChainScanStatePayload>
          }
          findFirst: {
            args: Prisma.ChainScanStateFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChainScanStatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChainScanStateFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChainScanStatePayload>
          }
          findMany: {
            args: Prisma.ChainScanStateFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChainScanStatePayload>[]
          }
          create: {
            args: Prisma.ChainScanStateCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChainScanStatePayload>
          }
          createMany: {
            args: Prisma.ChainScanStateCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ChainScanStateDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChainScanStatePayload>
          }
          update: {
            args: Prisma.ChainScanStateUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChainScanStatePayload>
          }
          deleteMany: {
            args: Prisma.ChainScanStateDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ChainScanStateUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ChainScanStateUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ChainScanStatePayload>
          }
          aggregate: {
            args: Prisma.ChainScanStateAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateChainScanState>
          }
          groupBy: {
            args: Prisma.ChainScanStateGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ChainScanStateGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChainScanStateCountArgs<ExtArgs>,
            result: $Utils.Optional<ChainScanStateCountAggregateOutputType> | number
          }
        }
      }
      TreasuryAccount: {
        payload: Prisma.$TreasuryAccountPayload<ExtArgs>
        fields: Prisma.TreasuryAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TreasuryAccountFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TreasuryAccountFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryAccountPayload>
          }
          findFirst: {
            args: Prisma.TreasuryAccountFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TreasuryAccountFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryAccountPayload>
          }
          findMany: {
            args: Prisma.TreasuryAccountFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryAccountPayload>[]
          }
          create: {
            args: Prisma.TreasuryAccountCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryAccountPayload>
          }
          createMany: {
            args: Prisma.TreasuryAccountCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.TreasuryAccountDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryAccountPayload>
          }
          update: {
            args: Prisma.TreasuryAccountUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryAccountPayload>
          }
          deleteMany: {
            args: Prisma.TreasuryAccountDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.TreasuryAccountUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.TreasuryAccountUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryAccountPayload>
          }
          aggregate: {
            args: Prisma.TreasuryAccountAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateTreasuryAccount>
          }
          groupBy: {
            args: Prisma.TreasuryAccountGroupByArgs<ExtArgs>,
            result: $Utils.Optional<TreasuryAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.TreasuryAccountCountArgs<ExtArgs>,
            result: $Utils.Optional<TreasuryAccountCountAggregateOutputType> | number
          }
        }
      }
      TreasuryLedger: {
        payload: Prisma.$TreasuryLedgerPayload<ExtArgs>
        fields: Prisma.TreasuryLedgerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TreasuryLedgerFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryLedgerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TreasuryLedgerFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryLedgerPayload>
          }
          findFirst: {
            args: Prisma.TreasuryLedgerFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryLedgerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TreasuryLedgerFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryLedgerPayload>
          }
          findMany: {
            args: Prisma.TreasuryLedgerFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryLedgerPayload>[]
          }
          create: {
            args: Prisma.TreasuryLedgerCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryLedgerPayload>
          }
          createMany: {
            args: Prisma.TreasuryLedgerCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.TreasuryLedgerDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryLedgerPayload>
          }
          update: {
            args: Prisma.TreasuryLedgerUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryLedgerPayload>
          }
          deleteMany: {
            args: Prisma.TreasuryLedgerDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.TreasuryLedgerUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.TreasuryLedgerUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryLedgerPayload>
          }
          aggregate: {
            args: Prisma.TreasuryLedgerAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateTreasuryLedger>
          }
          groupBy: {
            args: Prisma.TreasuryLedgerGroupByArgs<ExtArgs>,
            result: $Utils.Optional<TreasuryLedgerGroupByOutputType>[]
          }
          count: {
            args: Prisma.TreasuryLedgerCountArgs<ExtArgs>,
            result: $Utils.Optional<TreasuryLedgerCountAggregateOutputType> | number
          }
        }
      }
      TreasuryEntry: {
        payload: Prisma.$TreasuryEntryPayload<ExtArgs>
        fields: Prisma.TreasuryEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TreasuryEntryFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TreasuryEntryFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryEntryPayload>
          }
          findFirst: {
            args: Prisma.TreasuryEntryFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TreasuryEntryFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryEntryPayload>
          }
          findMany: {
            args: Prisma.TreasuryEntryFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryEntryPayload>[]
          }
          create: {
            args: Prisma.TreasuryEntryCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryEntryPayload>
          }
          createMany: {
            args: Prisma.TreasuryEntryCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.TreasuryEntryDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryEntryPayload>
          }
          update: {
            args: Prisma.TreasuryEntryUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryEntryPayload>
          }
          deleteMany: {
            args: Prisma.TreasuryEntryDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.TreasuryEntryUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.TreasuryEntryUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryEntryPayload>
          }
          aggregate: {
            args: Prisma.TreasuryEntryAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateTreasuryEntry>
          }
          groupBy: {
            args: Prisma.TreasuryEntryGroupByArgs<ExtArgs>,
            result: $Utils.Optional<TreasuryEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.TreasuryEntryCountArgs<ExtArgs>,
            result: $Utils.Optional<TreasuryEntryCountAggregateOutputType> | number
          }
        }
      }
      BalanceSnapshot: {
        payload: Prisma.$BalanceSnapshotPayload<ExtArgs>
        fields: Prisma.BalanceSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BalanceSnapshotFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BalanceSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BalanceSnapshotFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BalanceSnapshotPayload>
          }
          findFirst: {
            args: Prisma.BalanceSnapshotFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BalanceSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BalanceSnapshotFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BalanceSnapshotPayload>
          }
          findMany: {
            args: Prisma.BalanceSnapshotFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BalanceSnapshotPayload>[]
          }
          create: {
            args: Prisma.BalanceSnapshotCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BalanceSnapshotPayload>
          }
          createMany: {
            args: Prisma.BalanceSnapshotCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.BalanceSnapshotDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BalanceSnapshotPayload>
          }
          update: {
            args: Prisma.BalanceSnapshotUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BalanceSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.BalanceSnapshotDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.BalanceSnapshotUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.BalanceSnapshotUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$BalanceSnapshotPayload>
          }
          aggregate: {
            args: Prisma.BalanceSnapshotAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateBalanceSnapshot>
          }
          groupBy: {
            args: Prisma.BalanceSnapshotGroupByArgs<ExtArgs>,
            result: $Utils.Optional<BalanceSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.BalanceSnapshotCountArgs<ExtArgs>,
            result: $Utils.Optional<BalanceSnapshotCountAggregateOutputType> | number
          }
        }
      }
      TreasuryState: {
        payload: Prisma.$TreasuryStatePayload<ExtArgs>
        fields: Prisma.TreasuryStateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TreasuryStateFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryStatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TreasuryStateFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryStatePayload>
          }
          findFirst: {
            args: Prisma.TreasuryStateFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryStatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TreasuryStateFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryStatePayload>
          }
          findMany: {
            args: Prisma.TreasuryStateFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryStatePayload>[]
          }
          create: {
            args: Prisma.TreasuryStateCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryStatePayload>
          }
          createMany: {
            args: Prisma.TreasuryStateCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.TreasuryStateDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryStatePayload>
          }
          update: {
            args: Prisma.TreasuryStateUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryStatePayload>
          }
          deleteMany: {
            args: Prisma.TreasuryStateDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.TreasuryStateUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.TreasuryStateUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TreasuryStatePayload>
          }
          aggregate: {
            args: Prisma.TreasuryStateAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateTreasuryState>
          }
          groupBy: {
            args: Prisma.TreasuryStateGroupByArgs<ExtArgs>,
            result: $Utils.Optional<TreasuryStateGroupByOutputType>[]
          }
          count: {
            args: Prisma.TreasuryStateCountArgs<ExtArgs>,
            result: $Utils.Optional<TreasuryStateCountAggregateOutputType> | number
          }
        }
      }
      Sweep: {
        payload: Prisma.$SweepPayload<ExtArgs>
        fields: Prisma.SweepFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SweepFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SweepPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SweepFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SweepPayload>
          }
          findFirst: {
            args: Prisma.SweepFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SweepPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SweepFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SweepPayload>
          }
          findMany: {
            args: Prisma.SweepFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SweepPayload>[]
          }
          create: {
            args: Prisma.SweepCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SweepPayload>
          }
          createMany: {
            args: Prisma.SweepCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.SweepDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SweepPayload>
          }
          update: {
            args: Prisma.SweepUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SweepPayload>
          }
          deleteMany: {
            args: Prisma.SweepDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.SweepUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.SweepUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SweepPayload>
          }
          aggregate: {
            args: Prisma.SweepAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateSweep>
          }
          groupBy: {
            args: Prisma.SweepGroupByArgs<ExtArgs>,
            result: $Utils.Optional<SweepGroupByOutputType>[]
          }
          count: {
            args: Prisma.SweepCountArgs<ExtArgs>,
            result: $Utils.Optional<SweepCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    chainTransactions: number
    transactions: number
    wallets: number
    withdrawals: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chainTransactions?: boolean | UserCountOutputTypeCountChainTransactionsArgs
    transactions?: boolean | UserCountOutputTypeCountTransactionsArgs
    wallets?: boolean | UserCountOutputTypeCountWalletsArgs
    withdrawals?: boolean | UserCountOutputTypeCountWithdrawalsArgs
  }

  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountChainTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChainTransactionWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWalletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWalletWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWithdrawalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WithdrawalWhereInput
  }



  /**
   * Count Type TreasuryAccountCountOutputType
   */

  export type TreasuryAccountCountOutputType = {
    children: number
    entries: number
  }

  export type TreasuryAccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | TreasuryAccountCountOutputTypeCountChildrenArgs
    entries?: boolean | TreasuryAccountCountOutputTypeCountEntriesArgs
  }

  // Custom InputTypes

  /**
   * TreasuryAccountCountOutputType without action
   */
  export type TreasuryAccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryAccountCountOutputType
     */
    select?: TreasuryAccountCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * TreasuryAccountCountOutputType without action
   */
  export type TreasuryAccountCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TreasuryAccountWhereInput
  }


  /**
   * TreasuryAccountCountOutputType without action
   */
  export type TreasuryAccountCountOutputTypeCountEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TreasuryEntryWhereInput
  }



  /**
   * Count Type TreasuryLedgerCountOutputType
   */

  export type TreasuryLedgerCountOutputType = {
    entries: number
  }

  export type TreasuryLedgerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entries?: boolean | TreasuryLedgerCountOutputTypeCountEntriesArgs
  }

  // Custom InputTypes

  /**
   * TreasuryLedgerCountOutputType without action
   */
  export type TreasuryLedgerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryLedgerCountOutputType
     */
    select?: TreasuryLedgerCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * TreasuryLedgerCountOutputType without action
   */
  export type TreasuryLedgerCountOutputTypeCountEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TreasuryEntryWhereInput
  }



  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    balance: number | null
  }

  export type UserSumAggregateOutputType = {
    balance: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    status: $Enums.Status | null
    balance: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    status: $Enums.Status | null
    balance: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    role: number
    status: number
    balance: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    balance?: true
  }

  export type UserSumAggregateInputType = {
    balance?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    status?: true
    balance?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    status?: true
    balance?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    status?: true
    balance?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    role: $Enums.Role
    status: $Enums.Status
    balance: number
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    status?: boolean
    balance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    chainTransactions?: boolean | User$chainTransactionsArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    wallets?: boolean | User$walletsArgs<ExtArgs>
    withdrawals?: boolean | User$withdrawalsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    status?: boolean
    balance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chainTransactions?: boolean | User$chainTransactionsArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    wallets?: boolean | User$walletsArgs<ExtArgs>
    withdrawals?: boolean | User$withdrawalsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      chainTransactions: Prisma.$ChainTransactionPayload<ExtArgs>[]
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
      wallets: Prisma.$UserWalletPayload<ExtArgs>[]
      withdrawals: Prisma.$WithdrawalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      role: $Enums.Role
      status: $Enums.Status
      balance: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }


  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    chainTransactions<T extends User$chainTransactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$chainTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChainTransactionPayload<ExtArgs>, T, 'findMany'> | Null>;

    transactions<T extends User$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'findMany'> | Null>;

    wallets<T extends User$walletsArgs<ExtArgs> = {}>(args?: Subset<T, User$walletsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWalletPayload<ExtArgs>, T, 'findMany'> | Null>;

    withdrawals<T extends User$withdrawalsArgs<ExtArgs> = {}>(args?: Subset<T, User$withdrawalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WithdrawalPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly status: FieldRef<"User", 'Status'>
    readonly balance: FieldRef<"User", 'Float'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }


  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }


  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }


  /**
   * User.chainTransactions
   */
  export type User$chainTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChainTransaction
     */
    select?: ChainTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChainTransactionInclude<ExtArgs> | null
    where?: ChainTransactionWhereInput
    orderBy?: ChainTransactionOrderByWithRelationInput | ChainTransactionOrderByWithRelationInput[]
    cursor?: ChainTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChainTransactionScalarFieldEnum | ChainTransactionScalarFieldEnum[]
  }


  /**
   * User.transactions
   */
  export type User$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }


  /**
   * User.wallets
   */
  export type User$walletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWallet
     */
    select?: UserWalletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserWalletInclude<ExtArgs> | null
    where?: UserWalletWhereInput
    orderBy?: UserWalletOrderByWithRelationInput | UserWalletOrderByWithRelationInput[]
    cursor?: UserWalletWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserWalletScalarFieldEnum | UserWalletScalarFieldEnum[]
  }


  /**
   * User.withdrawals
   */
  export type User$withdrawalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Withdrawal
     */
    select?: WithdrawalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WithdrawalInclude<ExtArgs> | null
    where?: WithdrawalWhereInput
    orderBy?: WithdrawalOrderByWithRelationInput | WithdrawalOrderByWithRelationInput[]
    cursor?: WithdrawalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WithdrawalScalarFieldEnum | WithdrawalScalarFieldEnum[]
  }


  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
  }



  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amount: number | null
  }

  export type TransactionSumAggregateOutputType = {
    amount: number | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    amount: number | null
    type: $Enums.TxType | null
    status: $Enums.TxStatus | null
    createdAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    amount: number | null
    type: $Enums.TxType | null
    status: $Enums.TxStatus | null
    createdAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    userId: number
    amount: number
    type: number
    status: number
    createdAt: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amount?: true
  }

  export type TransactionSumAggregateInputType = {
    amount?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    type?: true
    status?: true
    createdAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    type?: true
    status?: true
    createdAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    type?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    userId: string
    amount: number
    type: $Enums.TxType
    status: $Enums.TxStatus
    createdAt: Date
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    type?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    userId?: boolean
    amount?: boolean
    type?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      amount: number
      type: $Enums.TxType
      status: $Enums.TxStatus
      createdAt: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }


  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TransactionFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>
    ): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Transaction that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TransactionFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>
    ): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TransactionFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
    **/
    create<T extends TransactionCreateArgs<ExtArgs>>(
      args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>
    ): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Transactions.
     *     @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     *     @example
     *     // Create many Transactions
     *     const transaction = await prisma.transaction.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TransactionCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
    **/
    delete<T extends TransactionDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>
    ): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TransactionUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>
    ): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TransactionDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TransactionUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
    **/
    upsert<T extends TransactionUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>
    ): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Transaction model
   */ 
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly userId: FieldRef<"Transaction", 'String'>
    readonly amount: FieldRef<"Transaction", 'Float'>
    readonly type: FieldRef<"Transaction", 'TxType'>
    readonly status: FieldRef<"Transaction", 'TxStatus'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }


  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }


  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }


  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }


  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }


  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }


  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }


  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
  }


  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }


  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }


  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
  }


  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TransactionInclude<ExtArgs> | null
  }



  /**
   * Model ChainTransaction
   */

  export type AggregateChainTransaction = {
    _count: ChainTransactionCountAggregateOutputType | null
    _avg: ChainTransactionAvgAggregateOutputType | null
    _sum: ChainTransactionSumAggregateOutputType | null
    _min: ChainTransactionMinAggregateOutputType | null
    _max: ChainTransactionMaxAggregateOutputType | null
  }

  export type ChainTransactionAvgAggregateOutputType = {
    blockNumber: number | null
  }

  export type ChainTransactionSumAggregateOutputType = {
    blockNumber: bigint | null
  }

  export type ChainTransactionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    chain: string | null
    to: string | null
    amount: string | null
    txHash: string | null
    status: $Enums.ChainTxStatus | null
    createdAt: Date | null
    confirmedAt: Date | null
    blockNumber: bigint | null
    direction: $Enums.TxDirection | null
  }

  export type ChainTransactionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    chain: string | null
    to: string | null
    amount: string | null
    txHash: string | null
    status: $Enums.ChainTxStatus | null
    createdAt: Date | null
    confirmedAt: Date | null
    blockNumber: bigint | null
    direction: $Enums.TxDirection | null
  }

  export type ChainTransactionCountAggregateOutputType = {
    id: number
    userId: number
    chain: number
    to: number
    amount: number
    txHash: number
    status: number
    createdAt: number
    confirmedAt: number
    blockNumber: number
    direction: number
    _all: number
  }


  export type ChainTransactionAvgAggregateInputType = {
    blockNumber?: true
  }

  export type ChainTransactionSumAggregateInputType = {
    blockNumber?: true
  }

  export type ChainTransactionMinAggregateInputType = {
    id?: true
    userId?: true
    chain?: true
    to?: true
    amount?: true
    txHash?: true
    status?: true
    createdAt?: true
    confirmedAt?: true
    blockNumber?: true
    direction?: true
  }

  export type ChainTransactionMaxAggregateInputType = {
    id?: true
    userId?: true
    chain?: true
    to?: true
    amount?: true
    txHash?: true
    status?: true
    createdAt?: true
    confirmedAt?: true
    blockNumber?: true
    direction?: true
  }

  export type ChainTransactionCountAggregateInputType = {
    id?: true
    userId?: true
    chain?: true
    to?: true
    amount?: true
    txHash?: true
    status?: true
    createdAt?: true
    confirmedAt?: true
    blockNumber?: true
    direction?: true
    _all?: true
  }

  export type ChainTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChainTransaction to aggregate.
     */
    where?: ChainTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChainTransactions to fetch.
     */
    orderBy?: ChainTransactionOrderByWithRelationInput | ChainTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChainTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChainTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChainTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChainTransactions
    **/
    _count?: true | ChainTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChainTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChainTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChainTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChainTransactionMaxAggregateInputType
  }

  export type GetChainTransactionAggregateType<T extends ChainTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateChainTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChainTransaction[P]>
      : GetScalarType<T[P], AggregateChainTransaction[P]>
  }




  export type ChainTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChainTransactionWhereInput
    orderBy?: ChainTransactionOrderByWithAggregationInput | ChainTransactionOrderByWithAggregationInput[]
    by: ChainTransactionScalarFieldEnum[] | ChainTransactionScalarFieldEnum
    having?: ChainTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChainTransactionCountAggregateInputType | true
    _avg?: ChainTransactionAvgAggregateInputType
    _sum?: ChainTransactionSumAggregateInputType
    _min?: ChainTransactionMinAggregateInputType
    _max?: ChainTransactionMaxAggregateInputType
  }

  export type ChainTransactionGroupByOutputType = {
    id: string
    userId: string
    chain: string
    to: string
    amount: string
    txHash: string | null
    status: $Enums.ChainTxStatus
    createdAt: Date
    confirmedAt: Date | null
    blockNumber: bigint | null
    direction: $Enums.TxDirection
    _count: ChainTransactionCountAggregateOutputType | null
    _avg: ChainTransactionAvgAggregateOutputType | null
    _sum: ChainTransactionSumAggregateOutputType | null
    _min: ChainTransactionMinAggregateOutputType | null
    _max: ChainTransactionMaxAggregateOutputType | null
  }

  type GetChainTransactionGroupByPayload<T extends ChainTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChainTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChainTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChainTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], ChainTransactionGroupByOutputType[P]>
        }
      >
    >


  export type ChainTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    chain?: boolean
    to?: boolean
    amount?: boolean
    txHash?: boolean
    status?: boolean
    createdAt?: boolean
    confirmedAt?: boolean
    blockNumber?: boolean
    direction?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chainTransaction"]>

  export type ChainTransactionSelectScalar = {
    id?: boolean
    userId?: boolean
    chain?: boolean
    to?: boolean
    amount?: boolean
    txHash?: boolean
    status?: boolean
    createdAt?: boolean
    confirmedAt?: boolean
    blockNumber?: boolean
    direction?: boolean
  }

  export type ChainTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $ChainTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChainTransaction"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      chain: string
      to: string
      amount: string
      txHash: string | null
      status: $Enums.ChainTxStatus
      createdAt: Date
      confirmedAt: Date | null
      blockNumber: bigint | null
      direction: $Enums.TxDirection
    }, ExtArgs["result"]["chainTransaction"]>
    composites: {}
  }


  type ChainTransactionGetPayload<S extends boolean | null | undefined | ChainTransactionDefaultArgs> = $Result.GetResult<Prisma.$ChainTransactionPayload, S>

  type ChainTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ChainTransactionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ChainTransactionCountAggregateInputType | true
    }

  export interface ChainTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChainTransaction'], meta: { name: 'ChainTransaction' } }
    /**
     * Find zero or one ChainTransaction that matches the filter.
     * @param {ChainTransactionFindUniqueArgs} args - Arguments to find a ChainTransaction
     * @example
     * // Get one ChainTransaction
     * const chainTransaction = await prisma.chainTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ChainTransactionFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ChainTransactionFindUniqueArgs<ExtArgs>>
    ): Prisma__ChainTransactionClient<$Result.GetResult<Prisma.$ChainTransactionPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one ChainTransaction that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ChainTransactionFindUniqueOrThrowArgs} args - Arguments to find a ChainTransaction
     * @example
     * // Get one ChainTransaction
     * const chainTransaction = await prisma.chainTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ChainTransactionFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ChainTransactionFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ChainTransactionClient<$Result.GetResult<Prisma.$ChainTransactionPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first ChainTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChainTransactionFindFirstArgs} args - Arguments to find a ChainTransaction
     * @example
     * // Get one ChainTransaction
     * const chainTransaction = await prisma.chainTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ChainTransactionFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ChainTransactionFindFirstArgs<ExtArgs>>
    ): Prisma__ChainTransactionClient<$Result.GetResult<Prisma.$ChainTransactionPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first ChainTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChainTransactionFindFirstOrThrowArgs} args - Arguments to find a ChainTransaction
     * @example
     * // Get one ChainTransaction
     * const chainTransaction = await prisma.chainTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ChainTransactionFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ChainTransactionFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ChainTransactionClient<$Result.GetResult<Prisma.$ChainTransactionPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more ChainTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChainTransactionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChainTransactions
     * const chainTransactions = await prisma.chainTransaction.findMany()
     * 
     * // Get first 10 ChainTransactions
     * const chainTransactions = await prisma.chainTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chainTransactionWithIdOnly = await prisma.chainTransaction.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ChainTransactionFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChainTransactionFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChainTransactionPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a ChainTransaction.
     * @param {ChainTransactionCreateArgs} args - Arguments to create a ChainTransaction.
     * @example
     * // Create one ChainTransaction
     * const ChainTransaction = await prisma.chainTransaction.create({
     *   data: {
     *     // ... data to create a ChainTransaction
     *   }
     * })
     * 
    **/
    create<T extends ChainTransactionCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ChainTransactionCreateArgs<ExtArgs>>
    ): Prisma__ChainTransactionClient<$Result.GetResult<Prisma.$ChainTransactionPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many ChainTransactions.
     *     @param {ChainTransactionCreateManyArgs} args - Arguments to create many ChainTransactions.
     *     @example
     *     // Create many ChainTransactions
     *     const chainTransaction = await prisma.chainTransaction.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ChainTransactionCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChainTransactionCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ChainTransaction.
     * @param {ChainTransactionDeleteArgs} args - Arguments to delete one ChainTransaction.
     * @example
     * // Delete one ChainTransaction
     * const ChainTransaction = await prisma.chainTransaction.delete({
     *   where: {
     *     // ... filter to delete one ChainTransaction
     *   }
     * })
     * 
    **/
    delete<T extends ChainTransactionDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ChainTransactionDeleteArgs<ExtArgs>>
    ): Prisma__ChainTransactionClient<$Result.GetResult<Prisma.$ChainTransactionPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one ChainTransaction.
     * @param {ChainTransactionUpdateArgs} args - Arguments to update one ChainTransaction.
     * @example
     * // Update one ChainTransaction
     * const chainTransaction = await prisma.chainTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ChainTransactionUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ChainTransactionUpdateArgs<ExtArgs>>
    ): Prisma__ChainTransactionClient<$Result.GetResult<Prisma.$ChainTransactionPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more ChainTransactions.
     * @param {ChainTransactionDeleteManyArgs} args - Arguments to filter ChainTransactions to delete.
     * @example
     * // Delete a few ChainTransactions
     * const { count } = await prisma.chainTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ChainTransactionDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChainTransactionDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChainTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChainTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChainTransactions
     * const chainTransaction = await prisma.chainTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ChainTransactionUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ChainTransactionUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ChainTransaction.
     * @param {ChainTransactionUpsertArgs} args - Arguments to update or create a ChainTransaction.
     * @example
     * // Update or create a ChainTransaction
     * const chainTransaction = await prisma.chainTransaction.upsert({
     *   create: {
     *     // ... data to create a ChainTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChainTransaction we want to update
     *   }
     * })
    **/
    upsert<T extends ChainTransactionUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ChainTransactionUpsertArgs<ExtArgs>>
    ): Prisma__ChainTransactionClient<$Result.GetResult<Prisma.$ChainTransactionPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of ChainTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChainTransactionCountArgs} args - Arguments to filter ChainTransactions to count.
     * @example
     * // Count the number of ChainTransactions
     * const count = await prisma.chainTransaction.count({
     *   where: {
     *     // ... the filter for the ChainTransactions we want to count
     *   }
     * })
    **/
    count<T extends ChainTransactionCountArgs>(
      args?: Subset<T, ChainTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChainTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChainTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChainTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChainTransactionAggregateArgs>(args: Subset<T, ChainTransactionAggregateArgs>): Prisma.PrismaPromise<GetChainTransactionAggregateType<T>>

    /**
     * Group by ChainTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChainTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChainTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChainTransactionGroupByArgs['orderBy'] }
        : { orderBy?: ChainTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChainTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChainTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChainTransaction model
   */
  readonly fields: ChainTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChainTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChainTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the ChainTransaction model
   */ 
  interface ChainTransactionFieldRefs {
    readonly id: FieldRef<"ChainTransaction", 'String'>
    readonly userId: FieldRef<"ChainTransaction", 'String'>
    readonly chain: FieldRef<"ChainTransaction", 'String'>
    readonly to: FieldRef<"ChainTransaction", 'String'>
    readonly amount: FieldRef<"ChainTransaction", 'String'>
    readonly txHash: FieldRef<"ChainTransaction", 'String'>
    readonly status: FieldRef<"ChainTransaction", 'ChainTxStatus'>
    readonly createdAt: FieldRef<"ChainTransaction", 'DateTime'>
    readonly confirmedAt: FieldRef<"ChainTransaction", 'DateTime'>
    readonly blockNumber: FieldRef<"ChainTransaction", 'BigInt'>
    readonly direction: FieldRef<"ChainTransaction", 'TxDirection'>
  }
    

  // Custom InputTypes

  /**
   * ChainTransaction findUnique
   */
  export type ChainTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChainTransaction
     */
    select?: ChainTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChainTransactionInclude<ExtArgs> | null
    /**
     * Filter, which ChainTransaction to fetch.
     */
    where: ChainTransactionWhereUniqueInput
  }


  /**
   * ChainTransaction findUniqueOrThrow
   */
  export type ChainTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChainTransaction
     */
    select?: ChainTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChainTransactionInclude<ExtArgs> | null
    /**
     * Filter, which ChainTransaction to fetch.
     */
    where: ChainTransactionWhereUniqueInput
  }


  /**
   * ChainTransaction findFirst
   */
  export type ChainTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChainTransaction
     */
    select?: ChainTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChainTransactionInclude<ExtArgs> | null
    /**
     * Filter, which ChainTransaction to fetch.
     */
    where?: ChainTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChainTransactions to fetch.
     */
    orderBy?: ChainTransactionOrderByWithRelationInput | ChainTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChainTransactions.
     */
    cursor?: ChainTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChainTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChainTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChainTransactions.
     */
    distinct?: ChainTransactionScalarFieldEnum | ChainTransactionScalarFieldEnum[]
  }


  /**
   * ChainTransaction findFirstOrThrow
   */
  export type ChainTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChainTransaction
     */
    select?: ChainTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChainTransactionInclude<ExtArgs> | null
    /**
     * Filter, which ChainTransaction to fetch.
     */
    where?: ChainTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChainTransactions to fetch.
     */
    orderBy?: ChainTransactionOrderByWithRelationInput | ChainTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChainTransactions.
     */
    cursor?: ChainTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChainTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChainTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChainTransactions.
     */
    distinct?: ChainTransactionScalarFieldEnum | ChainTransactionScalarFieldEnum[]
  }


  /**
   * ChainTransaction findMany
   */
  export type ChainTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChainTransaction
     */
    select?: ChainTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChainTransactionInclude<ExtArgs> | null
    /**
     * Filter, which ChainTransactions to fetch.
     */
    where?: ChainTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChainTransactions to fetch.
     */
    orderBy?: ChainTransactionOrderByWithRelationInput | ChainTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChainTransactions.
     */
    cursor?: ChainTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChainTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChainTransactions.
     */
    skip?: number
    distinct?: ChainTransactionScalarFieldEnum | ChainTransactionScalarFieldEnum[]
  }


  /**
   * ChainTransaction create
   */
  export type ChainTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChainTransaction
     */
    select?: ChainTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChainTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a ChainTransaction.
     */
    data: XOR<ChainTransactionCreateInput, ChainTransactionUncheckedCreateInput>
  }


  /**
   * ChainTransaction createMany
   */
  export type ChainTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChainTransactions.
     */
    data: ChainTransactionCreateManyInput | ChainTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * ChainTransaction update
   */
  export type ChainTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChainTransaction
     */
    select?: ChainTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChainTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a ChainTransaction.
     */
    data: XOR<ChainTransactionUpdateInput, ChainTransactionUncheckedUpdateInput>
    /**
     * Choose, which ChainTransaction to update.
     */
    where: ChainTransactionWhereUniqueInput
  }


  /**
   * ChainTransaction updateMany
   */
  export type ChainTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChainTransactions.
     */
    data: XOR<ChainTransactionUpdateManyMutationInput, ChainTransactionUncheckedUpdateManyInput>
    /**
     * Filter which ChainTransactions to update
     */
    where?: ChainTransactionWhereInput
  }


  /**
   * ChainTransaction upsert
   */
  export type ChainTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChainTransaction
     */
    select?: ChainTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChainTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the ChainTransaction to update in case it exists.
     */
    where: ChainTransactionWhereUniqueInput
    /**
     * In case the ChainTransaction found by the `where` argument doesn't exist, create a new ChainTransaction with this data.
     */
    create: XOR<ChainTransactionCreateInput, ChainTransactionUncheckedCreateInput>
    /**
     * In case the ChainTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChainTransactionUpdateInput, ChainTransactionUncheckedUpdateInput>
  }


  /**
   * ChainTransaction delete
   */
  export type ChainTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChainTransaction
     */
    select?: ChainTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChainTransactionInclude<ExtArgs> | null
    /**
     * Filter which ChainTransaction to delete.
     */
    where: ChainTransactionWhereUniqueInput
  }


  /**
   * ChainTransaction deleteMany
   */
  export type ChainTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChainTransactions to delete
     */
    where?: ChainTransactionWhereInput
  }


  /**
   * ChainTransaction without action
   */
  export type ChainTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChainTransaction
     */
    select?: ChainTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChainTransactionInclude<ExtArgs> | null
  }



  /**
   * Model LedgerEntry
   */

  export type AggregateLedgerEntry = {
    _count: LedgerEntryCountAggregateOutputType | null
    _min: LedgerEntryMinAggregateOutputType | null
    _max: LedgerEntryMaxAggregateOutputType | null
  }

  export type LedgerEntryMinAggregateOutputType = {
    id: string | null
    userId: string | null
    chain: string | null
    amount: string | null
    type: $Enums.LedgerType | null
    referenceId: string | null
    createdAt: Date | null
  }

  export type LedgerEntryMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    chain: string | null
    amount: string | null
    type: $Enums.LedgerType | null
    referenceId: string | null
    createdAt: Date | null
  }

  export type LedgerEntryCountAggregateOutputType = {
    id: number
    userId: number
    chain: number
    amount: number
    type: number
    referenceId: number
    createdAt: number
    _all: number
  }


  export type LedgerEntryMinAggregateInputType = {
    id?: true
    userId?: true
    chain?: true
    amount?: true
    type?: true
    referenceId?: true
    createdAt?: true
  }

  export type LedgerEntryMaxAggregateInputType = {
    id?: true
    userId?: true
    chain?: true
    amount?: true
    type?: true
    referenceId?: true
    createdAt?: true
  }

  export type LedgerEntryCountAggregateInputType = {
    id?: true
    userId?: true
    chain?: true
    amount?: true
    type?: true
    referenceId?: true
    createdAt?: true
    _all?: true
  }

  export type LedgerEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LedgerEntry to aggregate.
     */
    where?: LedgerEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LedgerEntries to fetch.
     */
    orderBy?: LedgerEntryOrderByWithRelationInput | LedgerEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LedgerEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LedgerEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LedgerEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LedgerEntries
    **/
    _count?: true | LedgerEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LedgerEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LedgerEntryMaxAggregateInputType
  }

  export type GetLedgerEntryAggregateType<T extends LedgerEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateLedgerEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLedgerEntry[P]>
      : GetScalarType<T[P], AggregateLedgerEntry[P]>
  }




  export type LedgerEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LedgerEntryWhereInput
    orderBy?: LedgerEntryOrderByWithAggregationInput | LedgerEntryOrderByWithAggregationInput[]
    by: LedgerEntryScalarFieldEnum[] | LedgerEntryScalarFieldEnum
    having?: LedgerEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LedgerEntryCountAggregateInputType | true
    _min?: LedgerEntryMinAggregateInputType
    _max?: LedgerEntryMaxAggregateInputType
  }

  export type LedgerEntryGroupByOutputType = {
    id: string
    userId: string
    chain: string
    amount: string
    type: $Enums.LedgerType
    referenceId: string | null
    createdAt: Date
    _count: LedgerEntryCountAggregateOutputType | null
    _min: LedgerEntryMinAggregateOutputType | null
    _max: LedgerEntryMaxAggregateOutputType | null
  }

  type GetLedgerEntryGroupByPayload<T extends LedgerEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LedgerEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LedgerEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LedgerEntryGroupByOutputType[P]>
            : GetScalarType<T[P], LedgerEntryGroupByOutputType[P]>
        }
      >
    >


  export type LedgerEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    chain?: boolean
    amount?: boolean
    type?: boolean
    referenceId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["ledgerEntry"]>

  export type LedgerEntrySelectScalar = {
    id?: boolean
    userId?: boolean
    chain?: boolean
    amount?: boolean
    type?: boolean
    referenceId?: boolean
    createdAt?: boolean
  }


  export type $LedgerEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LedgerEntry"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      chain: string
      amount: string
      type: $Enums.LedgerType
      referenceId: string | null
      createdAt: Date
    }, ExtArgs["result"]["ledgerEntry"]>
    composites: {}
  }


  type LedgerEntryGetPayload<S extends boolean | null | undefined | LedgerEntryDefaultArgs> = $Result.GetResult<Prisma.$LedgerEntryPayload, S>

  type LedgerEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LedgerEntryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LedgerEntryCountAggregateInputType | true
    }

  export interface LedgerEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LedgerEntry'], meta: { name: 'LedgerEntry' } }
    /**
     * Find zero or one LedgerEntry that matches the filter.
     * @param {LedgerEntryFindUniqueArgs} args - Arguments to find a LedgerEntry
     * @example
     * // Get one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends LedgerEntryFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, LedgerEntryFindUniqueArgs<ExtArgs>>
    ): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one LedgerEntry that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {LedgerEntryFindUniqueOrThrowArgs} args - Arguments to find a LedgerEntry
     * @example
     * // Get one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends LedgerEntryFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, LedgerEntryFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first LedgerEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryFindFirstArgs} args - Arguments to find a LedgerEntry
     * @example
     * // Get one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends LedgerEntryFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, LedgerEntryFindFirstArgs<ExtArgs>>
    ): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first LedgerEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryFindFirstOrThrowArgs} args - Arguments to find a LedgerEntry
     * @example
     * // Get one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends LedgerEntryFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, LedgerEntryFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more LedgerEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LedgerEntries
     * const ledgerEntries = await prisma.ledgerEntry.findMany()
     * 
     * // Get first 10 LedgerEntries
     * const ledgerEntries = await prisma.ledgerEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ledgerEntryWithIdOnly = await prisma.ledgerEntry.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends LedgerEntryFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, LedgerEntryFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a LedgerEntry.
     * @param {LedgerEntryCreateArgs} args - Arguments to create a LedgerEntry.
     * @example
     * // Create one LedgerEntry
     * const LedgerEntry = await prisma.ledgerEntry.create({
     *   data: {
     *     // ... data to create a LedgerEntry
     *   }
     * })
     * 
    **/
    create<T extends LedgerEntryCreateArgs<ExtArgs>>(
      args: SelectSubset<T, LedgerEntryCreateArgs<ExtArgs>>
    ): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many LedgerEntries.
     *     @param {LedgerEntryCreateManyArgs} args - Arguments to create many LedgerEntries.
     *     @example
     *     // Create many LedgerEntries
     *     const ledgerEntry = await prisma.ledgerEntry.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends LedgerEntryCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, LedgerEntryCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a LedgerEntry.
     * @param {LedgerEntryDeleteArgs} args - Arguments to delete one LedgerEntry.
     * @example
     * // Delete one LedgerEntry
     * const LedgerEntry = await prisma.ledgerEntry.delete({
     *   where: {
     *     // ... filter to delete one LedgerEntry
     *   }
     * })
     * 
    **/
    delete<T extends LedgerEntryDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, LedgerEntryDeleteArgs<ExtArgs>>
    ): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one LedgerEntry.
     * @param {LedgerEntryUpdateArgs} args - Arguments to update one LedgerEntry.
     * @example
     * // Update one LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends LedgerEntryUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, LedgerEntryUpdateArgs<ExtArgs>>
    ): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more LedgerEntries.
     * @param {LedgerEntryDeleteManyArgs} args - Arguments to filter LedgerEntries to delete.
     * @example
     * // Delete a few LedgerEntries
     * const { count } = await prisma.ledgerEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends LedgerEntryDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, LedgerEntryDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LedgerEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LedgerEntries
     * const ledgerEntry = await prisma.ledgerEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends LedgerEntryUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, LedgerEntryUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LedgerEntry.
     * @param {LedgerEntryUpsertArgs} args - Arguments to update or create a LedgerEntry.
     * @example
     * // Update or create a LedgerEntry
     * const ledgerEntry = await prisma.ledgerEntry.upsert({
     *   create: {
     *     // ... data to create a LedgerEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LedgerEntry we want to update
     *   }
     * })
    **/
    upsert<T extends LedgerEntryUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, LedgerEntryUpsertArgs<ExtArgs>>
    ): Prisma__LedgerEntryClient<$Result.GetResult<Prisma.$LedgerEntryPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of LedgerEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryCountArgs} args - Arguments to filter LedgerEntries to count.
     * @example
     * // Count the number of LedgerEntries
     * const count = await prisma.ledgerEntry.count({
     *   where: {
     *     // ... the filter for the LedgerEntries we want to count
     *   }
     * })
    **/
    count<T extends LedgerEntryCountArgs>(
      args?: Subset<T, LedgerEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LedgerEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LedgerEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LedgerEntryAggregateArgs>(args: Subset<T, LedgerEntryAggregateArgs>): Prisma.PrismaPromise<GetLedgerEntryAggregateType<T>>

    /**
     * Group by LedgerEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LedgerEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LedgerEntryGroupByArgs['orderBy'] }
        : { orderBy?: LedgerEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LedgerEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLedgerEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LedgerEntry model
   */
  readonly fields: LedgerEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LedgerEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LedgerEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the LedgerEntry model
   */ 
  interface LedgerEntryFieldRefs {
    readonly id: FieldRef<"LedgerEntry", 'String'>
    readonly userId: FieldRef<"LedgerEntry", 'String'>
    readonly chain: FieldRef<"LedgerEntry", 'String'>
    readonly amount: FieldRef<"LedgerEntry", 'String'>
    readonly type: FieldRef<"LedgerEntry", 'LedgerType'>
    readonly referenceId: FieldRef<"LedgerEntry", 'String'>
    readonly createdAt: FieldRef<"LedgerEntry", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * LedgerEntry findUnique
   */
  export type LedgerEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Filter, which LedgerEntry to fetch.
     */
    where: LedgerEntryWhereUniqueInput
  }


  /**
   * LedgerEntry findUniqueOrThrow
   */
  export type LedgerEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Filter, which LedgerEntry to fetch.
     */
    where: LedgerEntryWhereUniqueInput
  }


  /**
   * LedgerEntry findFirst
   */
  export type LedgerEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Filter, which LedgerEntry to fetch.
     */
    where?: LedgerEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LedgerEntries to fetch.
     */
    orderBy?: LedgerEntryOrderByWithRelationInput | LedgerEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LedgerEntries.
     */
    cursor?: LedgerEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LedgerEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LedgerEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LedgerEntries.
     */
    distinct?: LedgerEntryScalarFieldEnum | LedgerEntryScalarFieldEnum[]
  }


  /**
   * LedgerEntry findFirstOrThrow
   */
  export type LedgerEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Filter, which LedgerEntry to fetch.
     */
    where?: LedgerEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LedgerEntries to fetch.
     */
    orderBy?: LedgerEntryOrderByWithRelationInput | LedgerEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LedgerEntries.
     */
    cursor?: LedgerEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LedgerEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LedgerEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LedgerEntries.
     */
    distinct?: LedgerEntryScalarFieldEnum | LedgerEntryScalarFieldEnum[]
  }


  /**
   * LedgerEntry findMany
   */
  export type LedgerEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Filter, which LedgerEntries to fetch.
     */
    where?: LedgerEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LedgerEntries to fetch.
     */
    orderBy?: LedgerEntryOrderByWithRelationInput | LedgerEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LedgerEntries.
     */
    cursor?: LedgerEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LedgerEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LedgerEntries.
     */
    skip?: number
    distinct?: LedgerEntryScalarFieldEnum | LedgerEntryScalarFieldEnum[]
  }


  /**
   * LedgerEntry create
   */
  export type LedgerEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * The data needed to create a LedgerEntry.
     */
    data: XOR<LedgerEntryCreateInput, LedgerEntryUncheckedCreateInput>
  }


  /**
   * LedgerEntry createMany
   */
  export type LedgerEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LedgerEntries.
     */
    data: LedgerEntryCreateManyInput | LedgerEntryCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * LedgerEntry update
   */
  export type LedgerEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * The data needed to update a LedgerEntry.
     */
    data: XOR<LedgerEntryUpdateInput, LedgerEntryUncheckedUpdateInput>
    /**
     * Choose, which LedgerEntry to update.
     */
    where: LedgerEntryWhereUniqueInput
  }


  /**
   * LedgerEntry updateMany
   */
  export type LedgerEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LedgerEntries.
     */
    data: XOR<LedgerEntryUpdateManyMutationInput, LedgerEntryUncheckedUpdateManyInput>
    /**
     * Filter which LedgerEntries to update
     */
    where?: LedgerEntryWhereInput
  }


  /**
   * LedgerEntry upsert
   */
  export type LedgerEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * The filter to search for the LedgerEntry to update in case it exists.
     */
    where: LedgerEntryWhereUniqueInput
    /**
     * In case the LedgerEntry found by the `where` argument doesn't exist, create a new LedgerEntry with this data.
     */
    create: XOR<LedgerEntryCreateInput, LedgerEntryUncheckedCreateInput>
    /**
     * In case the LedgerEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LedgerEntryUpdateInput, LedgerEntryUncheckedUpdateInput>
  }


  /**
   * LedgerEntry delete
   */
  export type LedgerEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
    /**
     * Filter which LedgerEntry to delete.
     */
    where: LedgerEntryWhereUniqueInput
  }


  /**
   * LedgerEntry deleteMany
   */
  export type LedgerEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LedgerEntries to delete
     */
    where?: LedgerEntryWhereInput
  }


  /**
   * LedgerEntry without action
   */
  export type LedgerEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerEntry
     */
    select?: LedgerEntrySelect<ExtArgs> | null
  }



  /**
   * Model UserBalance
   */

  export type AggregateUserBalance = {
    _count: UserBalanceCountAggregateOutputType | null
    _min: UserBalanceMinAggregateOutputType | null
    _max: UserBalanceMaxAggregateOutputType | null
  }

  export type UserBalanceMinAggregateOutputType = {
    id: string | null
    userId: string | null
    chain: string | null
    balance: string | null
  }

  export type UserBalanceMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    chain: string | null
    balance: string | null
  }

  export type UserBalanceCountAggregateOutputType = {
    id: number
    userId: number
    chain: number
    balance: number
    _all: number
  }


  export type UserBalanceMinAggregateInputType = {
    id?: true
    userId?: true
    chain?: true
    balance?: true
  }

  export type UserBalanceMaxAggregateInputType = {
    id?: true
    userId?: true
    chain?: true
    balance?: true
  }

  export type UserBalanceCountAggregateInputType = {
    id?: true
    userId?: true
    chain?: true
    balance?: true
    _all?: true
  }

  export type UserBalanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserBalance to aggregate.
     */
    where?: UserBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBalances to fetch.
     */
    orderBy?: UserBalanceOrderByWithRelationInput | UserBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserBalances
    **/
    _count?: true | UserBalanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserBalanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserBalanceMaxAggregateInputType
  }

  export type GetUserBalanceAggregateType<T extends UserBalanceAggregateArgs> = {
        [P in keyof T & keyof AggregateUserBalance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserBalance[P]>
      : GetScalarType<T[P], AggregateUserBalance[P]>
  }




  export type UserBalanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserBalanceWhereInput
    orderBy?: UserBalanceOrderByWithAggregationInput | UserBalanceOrderByWithAggregationInput[]
    by: UserBalanceScalarFieldEnum[] | UserBalanceScalarFieldEnum
    having?: UserBalanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserBalanceCountAggregateInputType | true
    _min?: UserBalanceMinAggregateInputType
    _max?: UserBalanceMaxAggregateInputType
  }

  export type UserBalanceGroupByOutputType = {
    id: string
    userId: string
    chain: string
    balance: string
    _count: UserBalanceCountAggregateOutputType | null
    _min: UserBalanceMinAggregateOutputType | null
    _max: UserBalanceMaxAggregateOutputType | null
  }

  type GetUserBalanceGroupByPayload<T extends UserBalanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserBalanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserBalanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserBalanceGroupByOutputType[P]>
            : GetScalarType<T[P], UserBalanceGroupByOutputType[P]>
        }
      >
    >


  export type UserBalanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    chain?: boolean
    balance?: boolean
  }, ExtArgs["result"]["userBalance"]>

  export type UserBalanceSelectScalar = {
    id?: boolean
    userId?: boolean
    chain?: boolean
    balance?: boolean
  }


  export type $UserBalancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserBalance"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      chain: string
      balance: string
    }, ExtArgs["result"]["userBalance"]>
    composites: {}
  }


  type UserBalanceGetPayload<S extends boolean | null | undefined | UserBalanceDefaultArgs> = $Result.GetResult<Prisma.$UserBalancePayload, S>

  type UserBalanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserBalanceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserBalanceCountAggregateInputType | true
    }

  export interface UserBalanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserBalance'], meta: { name: 'UserBalance' } }
    /**
     * Find zero or one UserBalance that matches the filter.
     * @param {UserBalanceFindUniqueArgs} args - Arguments to find a UserBalance
     * @example
     * // Get one UserBalance
     * const userBalance = await prisma.userBalance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserBalanceFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserBalanceFindUniqueArgs<ExtArgs>>
    ): Prisma__UserBalanceClient<$Result.GetResult<Prisma.$UserBalancePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one UserBalance that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserBalanceFindUniqueOrThrowArgs} args - Arguments to find a UserBalance
     * @example
     * // Get one UserBalance
     * const userBalance = await prisma.userBalance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserBalanceFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserBalanceFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserBalanceClient<$Result.GetResult<Prisma.$UserBalancePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first UserBalance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBalanceFindFirstArgs} args - Arguments to find a UserBalance
     * @example
     * // Get one UserBalance
     * const userBalance = await prisma.userBalance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserBalanceFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserBalanceFindFirstArgs<ExtArgs>>
    ): Prisma__UserBalanceClient<$Result.GetResult<Prisma.$UserBalancePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first UserBalance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBalanceFindFirstOrThrowArgs} args - Arguments to find a UserBalance
     * @example
     * // Get one UserBalance
     * const userBalance = await prisma.userBalance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserBalanceFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserBalanceFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserBalanceClient<$Result.GetResult<Prisma.$UserBalancePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more UserBalances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBalanceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserBalances
     * const userBalances = await prisma.userBalance.findMany()
     * 
     * // Get first 10 UserBalances
     * const userBalances = await prisma.userBalance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userBalanceWithIdOnly = await prisma.userBalance.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserBalanceFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserBalanceFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserBalancePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a UserBalance.
     * @param {UserBalanceCreateArgs} args - Arguments to create a UserBalance.
     * @example
     * // Create one UserBalance
     * const UserBalance = await prisma.userBalance.create({
     *   data: {
     *     // ... data to create a UserBalance
     *   }
     * })
     * 
    **/
    create<T extends UserBalanceCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserBalanceCreateArgs<ExtArgs>>
    ): Prisma__UserBalanceClient<$Result.GetResult<Prisma.$UserBalancePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many UserBalances.
     *     @param {UserBalanceCreateManyArgs} args - Arguments to create many UserBalances.
     *     @example
     *     // Create many UserBalances
     *     const userBalance = await prisma.userBalance.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserBalanceCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserBalanceCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserBalance.
     * @param {UserBalanceDeleteArgs} args - Arguments to delete one UserBalance.
     * @example
     * // Delete one UserBalance
     * const UserBalance = await prisma.userBalance.delete({
     *   where: {
     *     // ... filter to delete one UserBalance
     *   }
     * })
     * 
    **/
    delete<T extends UserBalanceDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserBalanceDeleteArgs<ExtArgs>>
    ): Prisma__UserBalanceClient<$Result.GetResult<Prisma.$UserBalancePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one UserBalance.
     * @param {UserBalanceUpdateArgs} args - Arguments to update one UserBalance.
     * @example
     * // Update one UserBalance
     * const userBalance = await prisma.userBalance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserBalanceUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserBalanceUpdateArgs<ExtArgs>>
    ): Prisma__UserBalanceClient<$Result.GetResult<Prisma.$UserBalancePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more UserBalances.
     * @param {UserBalanceDeleteManyArgs} args - Arguments to filter UserBalances to delete.
     * @example
     * // Delete a few UserBalances
     * const { count } = await prisma.userBalance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserBalanceDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserBalanceDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserBalances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBalanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserBalances
     * const userBalance = await prisma.userBalance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserBalanceUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserBalanceUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserBalance.
     * @param {UserBalanceUpsertArgs} args - Arguments to update or create a UserBalance.
     * @example
     * // Update or create a UserBalance
     * const userBalance = await prisma.userBalance.upsert({
     *   create: {
     *     // ... data to create a UserBalance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserBalance we want to update
     *   }
     * })
    **/
    upsert<T extends UserBalanceUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserBalanceUpsertArgs<ExtArgs>>
    ): Prisma__UserBalanceClient<$Result.GetResult<Prisma.$UserBalancePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of UserBalances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBalanceCountArgs} args - Arguments to filter UserBalances to count.
     * @example
     * // Count the number of UserBalances
     * const count = await prisma.userBalance.count({
     *   where: {
     *     // ... the filter for the UserBalances we want to count
     *   }
     * })
    **/
    count<T extends UserBalanceCountArgs>(
      args?: Subset<T, UserBalanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserBalanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserBalance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBalanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserBalanceAggregateArgs>(args: Subset<T, UserBalanceAggregateArgs>): Prisma.PrismaPromise<GetUserBalanceAggregateType<T>>

    /**
     * Group by UserBalance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBalanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserBalanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserBalanceGroupByArgs['orderBy'] }
        : { orderBy?: UserBalanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserBalanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserBalanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserBalance model
   */
  readonly fields: UserBalanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserBalance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserBalanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the UserBalance model
   */ 
  interface UserBalanceFieldRefs {
    readonly id: FieldRef<"UserBalance", 'String'>
    readonly userId: FieldRef<"UserBalance", 'String'>
    readonly chain: FieldRef<"UserBalance", 'String'>
    readonly balance: FieldRef<"UserBalance", 'String'>
  }
    

  // Custom InputTypes

  /**
   * UserBalance findUnique
   */
  export type UserBalanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBalance
     */
    select?: UserBalanceSelect<ExtArgs> | null
    /**
     * Filter, which UserBalance to fetch.
     */
    where: UserBalanceWhereUniqueInput
  }


  /**
   * UserBalance findUniqueOrThrow
   */
  export type UserBalanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBalance
     */
    select?: UserBalanceSelect<ExtArgs> | null
    /**
     * Filter, which UserBalance to fetch.
     */
    where: UserBalanceWhereUniqueInput
  }


  /**
   * UserBalance findFirst
   */
  export type UserBalanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBalance
     */
    select?: UserBalanceSelect<ExtArgs> | null
    /**
     * Filter, which UserBalance to fetch.
     */
    where?: UserBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBalances to fetch.
     */
    orderBy?: UserBalanceOrderByWithRelationInput | UserBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserBalances.
     */
    cursor?: UserBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserBalances.
     */
    distinct?: UserBalanceScalarFieldEnum | UserBalanceScalarFieldEnum[]
  }


  /**
   * UserBalance findFirstOrThrow
   */
  export type UserBalanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBalance
     */
    select?: UserBalanceSelect<ExtArgs> | null
    /**
     * Filter, which UserBalance to fetch.
     */
    where?: UserBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBalances to fetch.
     */
    orderBy?: UserBalanceOrderByWithRelationInput | UserBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserBalances.
     */
    cursor?: UserBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserBalances.
     */
    distinct?: UserBalanceScalarFieldEnum | UserBalanceScalarFieldEnum[]
  }


  /**
   * UserBalance findMany
   */
  export type UserBalanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBalance
     */
    select?: UserBalanceSelect<ExtArgs> | null
    /**
     * Filter, which UserBalances to fetch.
     */
    where?: UserBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBalances to fetch.
     */
    orderBy?: UserBalanceOrderByWithRelationInput | UserBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserBalances.
     */
    cursor?: UserBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBalances.
     */
    skip?: number
    distinct?: UserBalanceScalarFieldEnum | UserBalanceScalarFieldEnum[]
  }


  /**
   * UserBalance create
   */
  export type UserBalanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBalance
     */
    select?: UserBalanceSelect<ExtArgs> | null
    /**
     * The data needed to create a UserBalance.
     */
    data: XOR<UserBalanceCreateInput, UserBalanceUncheckedCreateInput>
  }


  /**
   * UserBalance createMany
   */
  export type UserBalanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserBalances.
     */
    data: UserBalanceCreateManyInput | UserBalanceCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * UserBalance update
   */
  export type UserBalanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBalance
     */
    select?: UserBalanceSelect<ExtArgs> | null
    /**
     * The data needed to update a UserBalance.
     */
    data: XOR<UserBalanceUpdateInput, UserBalanceUncheckedUpdateInput>
    /**
     * Choose, which UserBalance to update.
     */
    where: UserBalanceWhereUniqueInput
  }


  /**
   * UserBalance updateMany
   */
  export type UserBalanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserBalances.
     */
    data: XOR<UserBalanceUpdateManyMutationInput, UserBalanceUncheckedUpdateManyInput>
    /**
     * Filter which UserBalances to update
     */
    where?: UserBalanceWhereInput
  }


  /**
   * UserBalance upsert
   */
  export type UserBalanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBalance
     */
    select?: UserBalanceSelect<ExtArgs> | null
    /**
     * The filter to search for the UserBalance to update in case it exists.
     */
    where: UserBalanceWhereUniqueInput
    /**
     * In case the UserBalance found by the `where` argument doesn't exist, create a new UserBalance with this data.
     */
    create: XOR<UserBalanceCreateInput, UserBalanceUncheckedCreateInput>
    /**
     * In case the UserBalance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserBalanceUpdateInput, UserBalanceUncheckedUpdateInput>
  }


  /**
   * UserBalance delete
   */
  export type UserBalanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBalance
     */
    select?: UserBalanceSelect<ExtArgs> | null
    /**
     * Filter which UserBalance to delete.
     */
    where: UserBalanceWhereUniqueInput
  }


  /**
   * UserBalance deleteMany
   */
  export type UserBalanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserBalances to delete
     */
    where?: UserBalanceWhereInput
  }


  /**
   * UserBalance without action
   */
  export type UserBalanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBalance
     */
    select?: UserBalanceSelect<ExtArgs> | null
  }



  /**
   * Model Withdrawal
   */

  export type AggregateWithdrawal = {
    _count: WithdrawalCountAggregateOutputType | null
    _avg: WithdrawalAvgAggregateOutputType | null
    _sum: WithdrawalSumAggregateOutputType | null
    _min: WithdrawalMinAggregateOutputType | null
    _max: WithdrawalMaxAggregateOutputType | null
  }

  export type WithdrawalAvgAggregateOutputType = {
    amount: number | null
  }

  export type WithdrawalSumAggregateOutputType = {
    amount: number | null
  }

  export type WithdrawalMinAggregateOutputType = {
    id: string | null
    userId: string | null
    amount: number | null
    walletAddress: string | null
    status: $Enums.TxStatus | null
    createdAt: Date | null
  }

  export type WithdrawalMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    amount: number | null
    walletAddress: string | null
    status: $Enums.TxStatus | null
    createdAt: Date | null
  }

  export type WithdrawalCountAggregateOutputType = {
    id: number
    userId: number
    amount: number
    walletAddress: number
    status: number
    createdAt: number
    _all: number
  }


  export type WithdrawalAvgAggregateInputType = {
    amount?: true
  }

  export type WithdrawalSumAggregateInputType = {
    amount?: true
  }

  export type WithdrawalMinAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    walletAddress?: true
    status?: true
    createdAt?: true
  }

  export type WithdrawalMaxAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    walletAddress?: true
    status?: true
    createdAt?: true
  }

  export type WithdrawalCountAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    walletAddress?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type WithdrawalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Withdrawal to aggregate.
     */
    where?: WithdrawalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Withdrawals to fetch.
     */
    orderBy?: WithdrawalOrderByWithRelationInput | WithdrawalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WithdrawalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Withdrawals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Withdrawals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Withdrawals
    **/
    _count?: true | WithdrawalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WithdrawalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WithdrawalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WithdrawalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WithdrawalMaxAggregateInputType
  }

  export type GetWithdrawalAggregateType<T extends WithdrawalAggregateArgs> = {
        [P in keyof T & keyof AggregateWithdrawal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWithdrawal[P]>
      : GetScalarType<T[P], AggregateWithdrawal[P]>
  }




  export type WithdrawalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WithdrawalWhereInput
    orderBy?: WithdrawalOrderByWithAggregationInput | WithdrawalOrderByWithAggregationInput[]
    by: WithdrawalScalarFieldEnum[] | WithdrawalScalarFieldEnum
    having?: WithdrawalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WithdrawalCountAggregateInputType | true
    _avg?: WithdrawalAvgAggregateInputType
    _sum?: WithdrawalSumAggregateInputType
    _min?: WithdrawalMinAggregateInputType
    _max?: WithdrawalMaxAggregateInputType
  }

  export type WithdrawalGroupByOutputType = {
    id: string
    userId: string
    amount: number
    walletAddress: string | null
    status: $Enums.TxStatus
    createdAt: Date
    _count: WithdrawalCountAggregateOutputType | null
    _avg: WithdrawalAvgAggregateOutputType | null
    _sum: WithdrawalSumAggregateOutputType | null
    _min: WithdrawalMinAggregateOutputType | null
    _max: WithdrawalMaxAggregateOutputType | null
  }

  type GetWithdrawalGroupByPayload<T extends WithdrawalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WithdrawalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WithdrawalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WithdrawalGroupByOutputType[P]>
            : GetScalarType<T[P], WithdrawalGroupByOutputType[P]>
        }
      >
    >


  export type WithdrawalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    walletAddress?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["withdrawal"]>

  export type WithdrawalSelectScalar = {
    id?: boolean
    userId?: boolean
    amount?: boolean
    walletAddress?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type WithdrawalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $WithdrawalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Withdrawal"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      amount: number
      walletAddress: string | null
      status: $Enums.TxStatus
      createdAt: Date
    }, ExtArgs["result"]["withdrawal"]>
    composites: {}
  }


  type WithdrawalGetPayload<S extends boolean | null | undefined | WithdrawalDefaultArgs> = $Result.GetResult<Prisma.$WithdrawalPayload, S>

  type WithdrawalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WithdrawalFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WithdrawalCountAggregateInputType | true
    }

  export interface WithdrawalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Withdrawal'], meta: { name: 'Withdrawal' } }
    /**
     * Find zero or one Withdrawal that matches the filter.
     * @param {WithdrawalFindUniqueArgs} args - Arguments to find a Withdrawal
     * @example
     * // Get one Withdrawal
     * const withdrawal = await prisma.withdrawal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends WithdrawalFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, WithdrawalFindUniqueArgs<ExtArgs>>
    ): Prisma__WithdrawalClient<$Result.GetResult<Prisma.$WithdrawalPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Withdrawal that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {WithdrawalFindUniqueOrThrowArgs} args - Arguments to find a Withdrawal
     * @example
     * // Get one Withdrawal
     * const withdrawal = await prisma.withdrawal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends WithdrawalFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, WithdrawalFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__WithdrawalClient<$Result.GetResult<Prisma.$WithdrawalPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Withdrawal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WithdrawalFindFirstArgs} args - Arguments to find a Withdrawal
     * @example
     * // Get one Withdrawal
     * const withdrawal = await prisma.withdrawal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends WithdrawalFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, WithdrawalFindFirstArgs<ExtArgs>>
    ): Prisma__WithdrawalClient<$Result.GetResult<Prisma.$WithdrawalPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Withdrawal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WithdrawalFindFirstOrThrowArgs} args - Arguments to find a Withdrawal
     * @example
     * // Get one Withdrawal
     * const withdrawal = await prisma.withdrawal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends WithdrawalFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, WithdrawalFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__WithdrawalClient<$Result.GetResult<Prisma.$WithdrawalPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Withdrawals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WithdrawalFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Withdrawals
     * const withdrawals = await prisma.withdrawal.findMany()
     * 
     * // Get first 10 Withdrawals
     * const withdrawals = await prisma.withdrawal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const withdrawalWithIdOnly = await prisma.withdrawal.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends WithdrawalFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, WithdrawalFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WithdrawalPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Withdrawal.
     * @param {WithdrawalCreateArgs} args - Arguments to create a Withdrawal.
     * @example
     * // Create one Withdrawal
     * const Withdrawal = await prisma.withdrawal.create({
     *   data: {
     *     // ... data to create a Withdrawal
     *   }
     * })
     * 
    **/
    create<T extends WithdrawalCreateArgs<ExtArgs>>(
      args: SelectSubset<T, WithdrawalCreateArgs<ExtArgs>>
    ): Prisma__WithdrawalClient<$Result.GetResult<Prisma.$WithdrawalPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Withdrawals.
     *     @param {WithdrawalCreateManyArgs} args - Arguments to create many Withdrawals.
     *     @example
     *     // Create many Withdrawals
     *     const withdrawal = await prisma.withdrawal.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends WithdrawalCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, WithdrawalCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Withdrawal.
     * @param {WithdrawalDeleteArgs} args - Arguments to delete one Withdrawal.
     * @example
     * // Delete one Withdrawal
     * const Withdrawal = await prisma.withdrawal.delete({
     *   where: {
     *     // ... filter to delete one Withdrawal
     *   }
     * })
     * 
    **/
    delete<T extends WithdrawalDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, WithdrawalDeleteArgs<ExtArgs>>
    ): Prisma__WithdrawalClient<$Result.GetResult<Prisma.$WithdrawalPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Withdrawal.
     * @param {WithdrawalUpdateArgs} args - Arguments to update one Withdrawal.
     * @example
     * // Update one Withdrawal
     * const withdrawal = await prisma.withdrawal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends WithdrawalUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, WithdrawalUpdateArgs<ExtArgs>>
    ): Prisma__WithdrawalClient<$Result.GetResult<Prisma.$WithdrawalPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Withdrawals.
     * @param {WithdrawalDeleteManyArgs} args - Arguments to filter Withdrawals to delete.
     * @example
     * // Delete a few Withdrawals
     * const { count } = await prisma.withdrawal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends WithdrawalDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, WithdrawalDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Withdrawals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WithdrawalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Withdrawals
     * const withdrawal = await prisma.withdrawal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends WithdrawalUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, WithdrawalUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Withdrawal.
     * @param {WithdrawalUpsertArgs} args - Arguments to update or create a Withdrawal.
     * @example
     * // Update or create a Withdrawal
     * const withdrawal = await prisma.withdrawal.upsert({
     *   create: {
     *     // ... data to create a Withdrawal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Withdrawal we want to update
     *   }
     * })
    **/
    upsert<T extends WithdrawalUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, WithdrawalUpsertArgs<ExtArgs>>
    ): Prisma__WithdrawalClient<$Result.GetResult<Prisma.$WithdrawalPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Withdrawals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WithdrawalCountArgs} args - Arguments to filter Withdrawals to count.
     * @example
     * // Count the number of Withdrawals
     * const count = await prisma.withdrawal.count({
     *   where: {
     *     // ... the filter for the Withdrawals we want to count
     *   }
     * })
    **/
    count<T extends WithdrawalCountArgs>(
      args?: Subset<T, WithdrawalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WithdrawalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Withdrawal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WithdrawalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WithdrawalAggregateArgs>(args: Subset<T, WithdrawalAggregateArgs>): Prisma.PrismaPromise<GetWithdrawalAggregateType<T>>

    /**
     * Group by Withdrawal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WithdrawalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WithdrawalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WithdrawalGroupByArgs['orderBy'] }
        : { orderBy?: WithdrawalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WithdrawalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWithdrawalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Withdrawal model
   */
  readonly fields: WithdrawalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Withdrawal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WithdrawalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Withdrawal model
   */ 
  interface WithdrawalFieldRefs {
    readonly id: FieldRef<"Withdrawal", 'String'>
    readonly userId: FieldRef<"Withdrawal", 'String'>
    readonly amount: FieldRef<"Withdrawal", 'Float'>
    readonly walletAddress: FieldRef<"Withdrawal", 'String'>
    readonly status: FieldRef<"Withdrawal", 'TxStatus'>
    readonly createdAt: FieldRef<"Withdrawal", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * Withdrawal findUnique
   */
  export type WithdrawalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Withdrawal
     */
    select?: WithdrawalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WithdrawalInclude<ExtArgs> | null
    /**
     * Filter, which Withdrawal to fetch.
     */
    where: WithdrawalWhereUniqueInput
  }


  /**
   * Withdrawal findUniqueOrThrow
   */
  export type WithdrawalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Withdrawal
     */
    select?: WithdrawalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WithdrawalInclude<ExtArgs> | null
    /**
     * Filter, which Withdrawal to fetch.
     */
    where: WithdrawalWhereUniqueInput
  }


  /**
   * Withdrawal findFirst
   */
  export type WithdrawalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Withdrawal
     */
    select?: WithdrawalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WithdrawalInclude<ExtArgs> | null
    /**
     * Filter, which Withdrawal to fetch.
     */
    where?: WithdrawalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Withdrawals to fetch.
     */
    orderBy?: WithdrawalOrderByWithRelationInput | WithdrawalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Withdrawals.
     */
    cursor?: WithdrawalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Withdrawals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Withdrawals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Withdrawals.
     */
    distinct?: WithdrawalScalarFieldEnum | WithdrawalScalarFieldEnum[]
  }


  /**
   * Withdrawal findFirstOrThrow
   */
  export type WithdrawalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Withdrawal
     */
    select?: WithdrawalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WithdrawalInclude<ExtArgs> | null
    /**
     * Filter, which Withdrawal to fetch.
     */
    where?: WithdrawalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Withdrawals to fetch.
     */
    orderBy?: WithdrawalOrderByWithRelationInput | WithdrawalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Withdrawals.
     */
    cursor?: WithdrawalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Withdrawals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Withdrawals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Withdrawals.
     */
    distinct?: WithdrawalScalarFieldEnum | WithdrawalScalarFieldEnum[]
  }


  /**
   * Withdrawal findMany
   */
  export type WithdrawalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Withdrawal
     */
    select?: WithdrawalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WithdrawalInclude<ExtArgs> | null
    /**
     * Filter, which Withdrawals to fetch.
     */
    where?: WithdrawalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Withdrawals to fetch.
     */
    orderBy?: WithdrawalOrderByWithRelationInput | WithdrawalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Withdrawals.
     */
    cursor?: WithdrawalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Withdrawals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Withdrawals.
     */
    skip?: number
    distinct?: WithdrawalScalarFieldEnum | WithdrawalScalarFieldEnum[]
  }


  /**
   * Withdrawal create
   */
  export type WithdrawalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Withdrawal
     */
    select?: WithdrawalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WithdrawalInclude<ExtArgs> | null
    /**
     * The data needed to create a Withdrawal.
     */
    data: XOR<WithdrawalCreateInput, WithdrawalUncheckedCreateInput>
  }


  /**
   * Withdrawal createMany
   */
  export type WithdrawalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Withdrawals.
     */
    data: WithdrawalCreateManyInput | WithdrawalCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Withdrawal update
   */
  export type WithdrawalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Withdrawal
     */
    select?: WithdrawalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WithdrawalInclude<ExtArgs> | null
    /**
     * The data needed to update a Withdrawal.
     */
    data: XOR<WithdrawalUpdateInput, WithdrawalUncheckedUpdateInput>
    /**
     * Choose, which Withdrawal to update.
     */
    where: WithdrawalWhereUniqueInput
  }


  /**
   * Withdrawal updateMany
   */
  export type WithdrawalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Withdrawals.
     */
    data: XOR<WithdrawalUpdateManyMutationInput, WithdrawalUncheckedUpdateManyInput>
    /**
     * Filter which Withdrawals to update
     */
    where?: WithdrawalWhereInput
  }


  /**
   * Withdrawal upsert
   */
  export type WithdrawalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Withdrawal
     */
    select?: WithdrawalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WithdrawalInclude<ExtArgs> | null
    /**
     * The filter to search for the Withdrawal to update in case it exists.
     */
    where: WithdrawalWhereUniqueInput
    /**
     * In case the Withdrawal found by the `where` argument doesn't exist, create a new Withdrawal with this data.
     */
    create: XOR<WithdrawalCreateInput, WithdrawalUncheckedCreateInput>
    /**
     * In case the Withdrawal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WithdrawalUpdateInput, WithdrawalUncheckedUpdateInput>
  }


  /**
   * Withdrawal delete
   */
  export type WithdrawalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Withdrawal
     */
    select?: WithdrawalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WithdrawalInclude<ExtArgs> | null
    /**
     * Filter which Withdrawal to delete.
     */
    where: WithdrawalWhereUniqueInput
  }


  /**
   * Withdrawal deleteMany
   */
  export type WithdrawalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Withdrawals to delete
     */
    where?: WithdrawalWhereInput
  }


  /**
   * Withdrawal without action
   */
  export type WithdrawalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Withdrawal
     */
    select?: WithdrawalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WithdrawalInclude<ExtArgs> | null
  }



  /**
   * Model SystemSetting
   */

  export type AggregateSystemSetting = {
    _count: SystemSettingCountAggregateOutputType | null
    _min: SystemSettingMinAggregateOutputType | null
    _max: SystemSettingMaxAggregateOutputType | null
  }

  export type SystemSettingMinAggregateOutputType = {
    key: string | null
    value: string | null
  }

  export type SystemSettingMaxAggregateOutputType = {
    key: string | null
    value: string | null
  }

  export type SystemSettingCountAggregateOutputType = {
    key: number
    value: number
    _all: number
  }


  export type SystemSettingMinAggregateInputType = {
    key?: true
    value?: true
  }

  export type SystemSettingMaxAggregateInputType = {
    key?: true
    value?: true
  }

  export type SystemSettingCountAggregateInputType = {
    key?: true
    value?: true
    _all?: true
  }

  export type SystemSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemSetting to aggregate.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemSettings
    **/
    _count?: true | SystemSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemSettingMaxAggregateInputType
  }

  export type GetSystemSettingAggregateType<T extends SystemSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemSetting[P]>
      : GetScalarType<T[P], AggregateSystemSetting[P]>
  }




  export type SystemSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemSettingWhereInput
    orderBy?: SystemSettingOrderByWithAggregationInput | SystemSettingOrderByWithAggregationInput[]
    by: SystemSettingScalarFieldEnum[] | SystemSettingScalarFieldEnum
    having?: SystemSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemSettingCountAggregateInputType | true
    _min?: SystemSettingMinAggregateInputType
    _max?: SystemSettingMaxAggregateInputType
  }

  export type SystemSettingGroupByOutputType = {
    key: string
    value: string
    _count: SystemSettingCountAggregateOutputType | null
    _min: SystemSettingMinAggregateOutputType | null
    _max: SystemSettingMaxAggregateOutputType | null
  }

  type GetSystemSettingGroupByPayload<T extends SystemSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemSettingGroupByOutputType[P]>
            : GetScalarType<T[P], SystemSettingGroupByOutputType[P]>
        }
      >
    >


  export type SystemSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
  }, ExtArgs["result"]["systemSetting"]>

  export type SystemSettingSelectScalar = {
    key?: boolean
    value?: boolean
  }


  export type $SystemSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemSetting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      key: string
      value: string
    }, ExtArgs["result"]["systemSetting"]>
    composites: {}
  }


  type SystemSettingGetPayload<S extends boolean | null | undefined | SystemSettingDefaultArgs> = $Result.GetResult<Prisma.$SystemSettingPayload, S>

  type SystemSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SystemSettingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SystemSettingCountAggregateInputType | true
    }

  export interface SystemSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemSetting'], meta: { name: 'SystemSetting' } }
    /**
     * Find zero or one SystemSetting that matches the filter.
     * @param {SystemSettingFindUniqueArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SystemSettingFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, SystemSettingFindUniqueArgs<ExtArgs>>
    ): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one SystemSetting that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {SystemSettingFindUniqueOrThrowArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SystemSettingFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SystemSettingFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first SystemSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingFindFirstArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SystemSettingFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, SystemSettingFindFirstArgs<ExtArgs>>
    ): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first SystemSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingFindFirstOrThrowArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SystemSettingFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SystemSettingFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more SystemSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemSettings
     * const systemSettings = await prisma.systemSetting.findMany()
     * 
     * // Get first 10 SystemSettings
     * const systemSettings = await prisma.systemSetting.findMany({ take: 10 })
     * 
     * // Only select the `key`
     * const systemSettingWithKeyOnly = await prisma.systemSetting.findMany({ select: { key: true } })
     * 
    **/
    findMany<T extends SystemSettingFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SystemSettingFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a SystemSetting.
     * @param {SystemSettingCreateArgs} args - Arguments to create a SystemSetting.
     * @example
     * // Create one SystemSetting
     * const SystemSetting = await prisma.systemSetting.create({
     *   data: {
     *     // ... data to create a SystemSetting
     *   }
     * })
     * 
    **/
    create<T extends SystemSettingCreateArgs<ExtArgs>>(
      args: SelectSubset<T, SystemSettingCreateArgs<ExtArgs>>
    ): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many SystemSettings.
     *     @param {SystemSettingCreateManyArgs} args - Arguments to create many SystemSettings.
     *     @example
     *     // Create many SystemSettings
     *     const systemSetting = await prisma.systemSetting.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SystemSettingCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SystemSettingCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SystemSetting.
     * @param {SystemSettingDeleteArgs} args - Arguments to delete one SystemSetting.
     * @example
     * // Delete one SystemSetting
     * const SystemSetting = await prisma.systemSetting.delete({
     *   where: {
     *     // ... filter to delete one SystemSetting
     *   }
     * })
     * 
    **/
    delete<T extends SystemSettingDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, SystemSettingDeleteArgs<ExtArgs>>
    ): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one SystemSetting.
     * @param {SystemSettingUpdateArgs} args - Arguments to update one SystemSetting.
     * @example
     * // Update one SystemSetting
     * const systemSetting = await prisma.systemSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SystemSettingUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, SystemSettingUpdateArgs<ExtArgs>>
    ): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more SystemSettings.
     * @param {SystemSettingDeleteManyArgs} args - Arguments to filter SystemSettings to delete.
     * @example
     * // Delete a few SystemSettings
     * const { count } = await prisma.systemSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SystemSettingDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SystemSettingDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemSettings
     * const systemSetting = await prisma.systemSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SystemSettingUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, SystemSettingUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SystemSetting.
     * @param {SystemSettingUpsertArgs} args - Arguments to update or create a SystemSetting.
     * @example
     * // Update or create a SystemSetting
     * const systemSetting = await prisma.systemSetting.upsert({
     *   create: {
     *     // ... data to create a SystemSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemSetting we want to update
     *   }
     * })
    **/
    upsert<T extends SystemSettingUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, SystemSettingUpsertArgs<ExtArgs>>
    ): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of SystemSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingCountArgs} args - Arguments to filter SystemSettings to count.
     * @example
     * // Count the number of SystemSettings
     * const count = await prisma.systemSetting.count({
     *   where: {
     *     // ... the filter for the SystemSettings we want to count
     *   }
     * })
    **/
    count<T extends SystemSettingCountArgs>(
      args?: Subset<T, SystemSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SystemSettingAggregateArgs>(args: Subset<T, SystemSettingAggregateArgs>): Prisma.PrismaPromise<GetSystemSettingAggregateType<T>>

    /**
     * Group by SystemSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SystemSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemSettingGroupByArgs['orderBy'] }
        : { orderBy?: SystemSettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SystemSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemSetting model
   */
  readonly fields: SystemSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the SystemSetting model
   */ 
  interface SystemSettingFieldRefs {
    readonly key: FieldRef<"SystemSetting", 'String'>
    readonly value: FieldRef<"SystemSetting", 'String'>
  }
    

  // Custom InputTypes

  /**
   * SystemSetting findUnique
   */
  export type SystemSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where: SystemSettingWhereUniqueInput
  }


  /**
   * SystemSetting findUniqueOrThrow
   */
  export type SystemSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where: SystemSettingWhereUniqueInput
  }


  /**
   * SystemSetting findFirst
   */
  export type SystemSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemSettings.
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemSettings.
     */
    distinct?: SystemSettingScalarFieldEnum | SystemSettingScalarFieldEnum[]
  }


  /**
   * SystemSetting findFirstOrThrow
   */
  export type SystemSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemSettings.
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemSettings.
     */
    distinct?: SystemSettingScalarFieldEnum | SystemSettingScalarFieldEnum[]
  }


  /**
   * SystemSetting findMany
   */
  export type SystemSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Filter, which SystemSettings to fetch.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemSettings.
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    distinct?: SystemSettingScalarFieldEnum | SystemSettingScalarFieldEnum[]
  }


  /**
   * SystemSetting create
   */
  export type SystemSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * The data needed to create a SystemSetting.
     */
    data: XOR<SystemSettingCreateInput, SystemSettingUncheckedCreateInput>
  }


  /**
   * SystemSetting createMany
   */
  export type SystemSettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemSettings.
     */
    data: SystemSettingCreateManyInput | SystemSettingCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * SystemSetting update
   */
  export type SystemSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * The data needed to update a SystemSetting.
     */
    data: XOR<SystemSettingUpdateInput, SystemSettingUncheckedUpdateInput>
    /**
     * Choose, which SystemSetting to update.
     */
    where: SystemSettingWhereUniqueInput
  }


  /**
   * SystemSetting updateMany
   */
  export type SystemSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemSettings.
     */
    data: XOR<SystemSettingUpdateManyMutationInput, SystemSettingUncheckedUpdateManyInput>
    /**
     * Filter which SystemSettings to update
     */
    where?: SystemSettingWhereInput
  }


  /**
   * SystemSetting upsert
   */
  export type SystemSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * The filter to search for the SystemSetting to update in case it exists.
     */
    where: SystemSettingWhereUniqueInput
    /**
     * In case the SystemSetting found by the `where` argument doesn't exist, create a new SystemSetting with this data.
     */
    create: XOR<SystemSettingCreateInput, SystemSettingUncheckedCreateInput>
    /**
     * In case the SystemSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemSettingUpdateInput, SystemSettingUncheckedUpdateInput>
  }


  /**
   * SystemSetting delete
   */
  export type SystemSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Filter which SystemSetting to delete.
     */
    where: SystemSettingWhereUniqueInput
  }


  /**
   * SystemSetting deleteMany
   */
  export type SystemSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemSettings to delete
     */
    where?: SystemSettingWhereInput
  }


  /**
   * SystemSetting without action
   */
  export type SystemSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
  }



  /**
   * Model UserWallet
   */

  export type AggregateUserWallet = {
    _count: UserWalletCountAggregateOutputType | null
    _avg: UserWalletAvgAggregateOutputType | null
    _sum: UserWalletSumAggregateOutputType | null
    _min: UserWalletMinAggregateOutputType | null
    _max: UserWalletMaxAggregateOutputType | null
  }

  export type UserWalletAvgAggregateOutputType = {
    derivationIndex: number | null
  }

  export type UserWalletSumAggregateOutputType = {
    derivationIndex: number | null
  }

  export type UserWalletMinAggregateOutputType = {
    id: string | null
    userId: string | null
    chain: string | null
    derivationIndex: number | null
    address: string | null
    createdAt: Date | null
    lastKnownBalance: string | null
  }

  export type UserWalletMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    chain: string | null
    derivationIndex: number | null
    address: string | null
    createdAt: Date | null
    lastKnownBalance: string | null
  }

  export type UserWalletCountAggregateOutputType = {
    id: number
    userId: number
    chain: number
    derivationIndex: number
    address: number
    createdAt: number
    lastKnownBalance: number
    _all: number
  }


  export type UserWalletAvgAggregateInputType = {
    derivationIndex?: true
  }

  export type UserWalletSumAggregateInputType = {
    derivationIndex?: true
  }

  export type UserWalletMinAggregateInputType = {
    id?: true
    userId?: true
    chain?: true
    derivationIndex?: true
    address?: true
    createdAt?: true
    lastKnownBalance?: true
  }

  export type UserWalletMaxAggregateInputType = {
    id?: true
    userId?: true
    chain?: true
    derivationIndex?: true
    address?: true
    createdAt?: true
    lastKnownBalance?: true
  }

  export type UserWalletCountAggregateInputType = {
    id?: true
    userId?: true
    chain?: true
    derivationIndex?: true
    address?: true
    createdAt?: true
    lastKnownBalance?: true
    _all?: true
  }

  export type UserWalletAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserWallet to aggregate.
     */
    where?: UserWalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWallets to fetch.
     */
    orderBy?: UserWalletOrderByWithRelationInput | UserWalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserWallets
    **/
    _count?: true | UserWalletCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserWalletAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserWalletSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserWalletMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserWalletMaxAggregateInputType
  }

  export type GetUserWalletAggregateType<T extends UserWalletAggregateArgs> = {
        [P in keyof T & keyof AggregateUserWallet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserWallet[P]>
      : GetScalarType<T[P], AggregateUserWallet[P]>
  }




  export type UserWalletGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWalletWhereInput
    orderBy?: UserWalletOrderByWithAggregationInput | UserWalletOrderByWithAggregationInput[]
    by: UserWalletScalarFieldEnum[] | UserWalletScalarFieldEnum
    having?: UserWalletScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserWalletCountAggregateInputType | true
    _avg?: UserWalletAvgAggregateInputType
    _sum?: UserWalletSumAggregateInputType
    _min?: UserWalletMinAggregateInputType
    _max?: UserWalletMaxAggregateInputType
  }

  export type UserWalletGroupByOutputType = {
    id: string
    userId: string
    chain: string
    derivationIndex: number
    address: string
    createdAt: Date
    lastKnownBalance: string
    _count: UserWalletCountAggregateOutputType | null
    _avg: UserWalletAvgAggregateOutputType | null
    _sum: UserWalletSumAggregateOutputType | null
    _min: UserWalletMinAggregateOutputType | null
    _max: UserWalletMaxAggregateOutputType | null
  }

  type GetUserWalletGroupByPayload<T extends UserWalletGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserWalletGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserWalletGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserWalletGroupByOutputType[P]>
            : GetScalarType<T[P], UserWalletGroupByOutputType[P]>
        }
      >
    >


  export type UserWalletSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    chain?: boolean
    derivationIndex?: boolean
    address?: boolean
    createdAt?: boolean
    lastKnownBalance?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userWallet"]>

  export type UserWalletSelectScalar = {
    id?: boolean
    userId?: boolean
    chain?: boolean
    derivationIndex?: boolean
    address?: boolean
    createdAt?: boolean
    lastKnownBalance?: boolean
  }

  export type UserWalletInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $UserWalletPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserWallet"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      chain: string
      derivationIndex: number
      address: string
      createdAt: Date
      lastKnownBalance: string
    }, ExtArgs["result"]["userWallet"]>
    composites: {}
  }


  type UserWalletGetPayload<S extends boolean | null | undefined | UserWalletDefaultArgs> = $Result.GetResult<Prisma.$UserWalletPayload, S>

  type UserWalletCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserWalletFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserWalletCountAggregateInputType | true
    }

  export interface UserWalletDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserWallet'], meta: { name: 'UserWallet' } }
    /**
     * Find zero or one UserWallet that matches the filter.
     * @param {UserWalletFindUniqueArgs} args - Arguments to find a UserWallet
     * @example
     * // Get one UserWallet
     * const userWallet = await prisma.userWallet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserWalletFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserWalletFindUniqueArgs<ExtArgs>>
    ): Prisma__UserWalletClient<$Result.GetResult<Prisma.$UserWalletPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one UserWallet that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserWalletFindUniqueOrThrowArgs} args - Arguments to find a UserWallet
     * @example
     * // Get one UserWallet
     * const userWallet = await prisma.userWallet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserWalletFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserWalletFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserWalletClient<$Result.GetResult<Prisma.$UserWalletPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first UserWallet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWalletFindFirstArgs} args - Arguments to find a UserWallet
     * @example
     * // Get one UserWallet
     * const userWallet = await prisma.userWallet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserWalletFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserWalletFindFirstArgs<ExtArgs>>
    ): Prisma__UserWalletClient<$Result.GetResult<Prisma.$UserWalletPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first UserWallet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWalletFindFirstOrThrowArgs} args - Arguments to find a UserWallet
     * @example
     * // Get one UserWallet
     * const userWallet = await prisma.userWallet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserWalletFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserWalletFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserWalletClient<$Result.GetResult<Prisma.$UserWalletPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more UserWallets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWalletFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserWallets
     * const userWallets = await prisma.userWallet.findMany()
     * 
     * // Get first 10 UserWallets
     * const userWallets = await prisma.userWallet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWalletWithIdOnly = await prisma.userWallet.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserWalletFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserWalletFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWalletPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a UserWallet.
     * @param {UserWalletCreateArgs} args - Arguments to create a UserWallet.
     * @example
     * // Create one UserWallet
     * const UserWallet = await prisma.userWallet.create({
     *   data: {
     *     // ... data to create a UserWallet
     *   }
     * })
     * 
    **/
    create<T extends UserWalletCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserWalletCreateArgs<ExtArgs>>
    ): Prisma__UserWalletClient<$Result.GetResult<Prisma.$UserWalletPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many UserWallets.
     *     @param {UserWalletCreateManyArgs} args - Arguments to create many UserWallets.
     *     @example
     *     // Create many UserWallets
     *     const userWallet = await prisma.userWallet.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserWalletCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserWalletCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserWallet.
     * @param {UserWalletDeleteArgs} args - Arguments to delete one UserWallet.
     * @example
     * // Delete one UserWallet
     * const UserWallet = await prisma.userWallet.delete({
     *   where: {
     *     // ... filter to delete one UserWallet
     *   }
     * })
     * 
    **/
    delete<T extends UserWalletDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserWalletDeleteArgs<ExtArgs>>
    ): Prisma__UserWalletClient<$Result.GetResult<Prisma.$UserWalletPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one UserWallet.
     * @param {UserWalletUpdateArgs} args - Arguments to update one UserWallet.
     * @example
     * // Update one UserWallet
     * const userWallet = await prisma.userWallet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserWalletUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserWalletUpdateArgs<ExtArgs>>
    ): Prisma__UserWalletClient<$Result.GetResult<Prisma.$UserWalletPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more UserWallets.
     * @param {UserWalletDeleteManyArgs} args - Arguments to filter UserWallets to delete.
     * @example
     * // Delete a few UserWallets
     * const { count } = await prisma.userWallet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserWalletDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserWalletDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserWallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWalletUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserWallets
     * const userWallet = await prisma.userWallet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserWalletUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserWalletUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserWallet.
     * @param {UserWalletUpsertArgs} args - Arguments to update or create a UserWallet.
     * @example
     * // Update or create a UserWallet
     * const userWallet = await prisma.userWallet.upsert({
     *   create: {
     *     // ... data to create a UserWallet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserWallet we want to update
     *   }
     * })
    **/
    upsert<T extends UserWalletUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserWalletUpsertArgs<ExtArgs>>
    ): Prisma__UserWalletClient<$Result.GetResult<Prisma.$UserWalletPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of UserWallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWalletCountArgs} args - Arguments to filter UserWallets to count.
     * @example
     * // Count the number of UserWallets
     * const count = await prisma.userWallet.count({
     *   where: {
     *     // ... the filter for the UserWallets we want to count
     *   }
     * })
    **/
    count<T extends UserWalletCountArgs>(
      args?: Subset<T, UserWalletCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserWalletCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserWallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWalletAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserWalletAggregateArgs>(args: Subset<T, UserWalletAggregateArgs>): Prisma.PrismaPromise<GetUserWalletAggregateType<T>>

    /**
     * Group by UserWallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWalletGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserWalletGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserWalletGroupByArgs['orderBy'] }
        : { orderBy?: UserWalletGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserWalletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserWalletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserWallet model
   */
  readonly fields: UserWalletFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserWallet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserWalletClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the UserWallet model
   */ 
  interface UserWalletFieldRefs {
    readonly id: FieldRef<"UserWallet", 'String'>
    readonly userId: FieldRef<"UserWallet", 'String'>
    readonly chain: FieldRef<"UserWallet", 'String'>
    readonly derivationIndex: FieldRef<"UserWallet", 'Int'>
    readonly address: FieldRef<"UserWallet", 'String'>
    readonly createdAt: FieldRef<"UserWallet", 'DateTime'>
    readonly lastKnownBalance: FieldRef<"UserWallet", 'String'>
  }
    

  // Custom InputTypes

  /**
   * UserWallet findUnique
   */
  export type UserWalletFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWallet
     */
    select?: UserWalletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserWalletInclude<ExtArgs> | null
    /**
     * Filter, which UserWallet to fetch.
     */
    where: UserWalletWhereUniqueInput
  }


  /**
   * UserWallet findUniqueOrThrow
   */
  export type UserWalletFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWallet
     */
    select?: UserWalletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserWalletInclude<ExtArgs> | null
    /**
     * Filter, which UserWallet to fetch.
     */
    where: UserWalletWhereUniqueInput
  }


  /**
   * UserWallet findFirst
   */
  export type UserWalletFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWallet
     */
    select?: UserWalletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserWalletInclude<ExtArgs> | null
    /**
     * Filter, which UserWallet to fetch.
     */
    where?: UserWalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWallets to fetch.
     */
    orderBy?: UserWalletOrderByWithRelationInput | UserWalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserWallets.
     */
    cursor?: UserWalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserWallets.
     */
    distinct?: UserWalletScalarFieldEnum | UserWalletScalarFieldEnum[]
  }


  /**
   * UserWallet findFirstOrThrow
   */
  export type UserWalletFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWallet
     */
    select?: UserWalletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserWalletInclude<ExtArgs> | null
    /**
     * Filter, which UserWallet to fetch.
     */
    where?: UserWalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWallets to fetch.
     */
    orderBy?: UserWalletOrderByWithRelationInput | UserWalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserWallets.
     */
    cursor?: UserWalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserWallets.
     */
    distinct?: UserWalletScalarFieldEnum | UserWalletScalarFieldEnum[]
  }


  /**
   * UserWallet findMany
   */
  export type UserWalletFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWallet
     */
    select?: UserWalletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserWalletInclude<ExtArgs> | null
    /**
     * Filter, which UserWallets to fetch.
     */
    where?: UserWalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWallets to fetch.
     */
    orderBy?: UserWalletOrderByWithRelationInput | UserWalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserWallets.
     */
    cursor?: UserWalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWallets.
     */
    skip?: number
    distinct?: UserWalletScalarFieldEnum | UserWalletScalarFieldEnum[]
  }


  /**
   * UserWallet create
   */
  export type UserWalletCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWallet
     */
    select?: UserWalletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserWalletInclude<ExtArgs> | null
    /**
     * The data needed to create a UserWallet.
     */
    data: XOR<UserWalletCreateInput, UserWalletUncheckedCreateInput>
  }


  /**
   * UserWallet createMany
   */
  export type UserWalletCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserWallets.
     */
    data: UserWalletCreateManyInput | UserWalletCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * UserWallet update
   */
  export type UserWalletUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWallet
     */
    select?: UserWalletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserWalletInclude<ExtArgs> | null
    /**
     * The data needed to update a UserWallet.
     */
    data: XOR<UserWalletUpdateInput, UserWalletUncheckedUpdateInput>
    /**
     * Choose, which UserWallet to update.
     */
    where: UserWalletWhereUniqueInput
  }


  /**
   * UserWallet updateMany
   */
  export type UserWalletUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserWallets.
     */
    data: XOR<UserWalletUpdateManyMutationInput, UserWalletUncheckedUpdateManyInput>
    /**
     * Filter which UserWallets to update
     */
    where?: UserWalletWhereInput
  }


  /**
   * UserWallet upsert
   */
  export type UserWalletUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWallet
     */
    select?: UserWalletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserWalletInclude<ExtArgs> | null
    /**
     * The filter to search for the UserWallet to update in case it exists.
     */
    where: UserWalletWhereUniqueInput
    /**
     * In case the UserWallet found by the `where` argument doesn't exist, create a new UserWallet with this data.
     */
    create: XOR<UserWalletCreateInput, UserWalletUncheckedCreateInput>
    /**
     * In case the UserWallet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserWalletUpdateInput, UserWalletUncheckedUpdateInput>
  }


  /**
   * UserWallet delete
   */
  export type UserWalletDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWallet
     */
    select?: UserWalletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserWalletInclude<ExtArgs> | null
    /**
     * Filter which UserWallet to delete.
     */
    where: UserWalletWhereUniqueInput
  }


  /**
   * UserWallet deleteMany
   */
  export type UserWalletDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserWallets to delete
     */
    where?: UserWalletWhereInput
  }


  /**
   * UserWallet without action
   */
  export type UserWalletDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWallet
     */
    select?: UserWalletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserWalletInclude<ExtArgs> | null
  }



  /**
   * Model ChainScanState
   */

  export type AggregateChainScanState = {
    _count: ChainScanStateCountAggregateOutputType | null
    _avg: ChainScanStateAvgAggregateOutputType | null
    _sum: ChainScanStateSumAggregateOutputType | null
    _min: ChainScanStateMinAggregateOutputType | null
    _max: ChainScanStateMaxAggregateOutputType | null
  }

  export type ChainScanStateAvgAggregateOutputType = {
    lastScannedBlock: number | null
  }

  export type ChainScanStateSumAggregateOutputType = {
    lastScannedBlock: bigint | null
  }

  export type ChainScanStateMinAggregateOutputType = {
    chain: string | null
    lastScannedBlock: bigint | null
    updatedAt: Date | null
  }

  export type ChainScanStateMaxAggregateOutputType = {
    chain: string | null
    lastScannedBlock: bigint | null
    updatedAt: Date | null
  }

  export type ChainScanStateCountAggregateOutputType = {
    chain: number
    lastScannedBlock: number
    updatedAt: number
    _all: number
  }


  export type ChainScanStateAvgAggregateInputType = {
    lastScannedBlock?: true
  }

  export type ChainScanStateSumAggregateInputType = {
    lastScannedBlock?: true
  }

  export type ChainScanStateMinAggregateInputType = {
    chain?: true
    lastScannedBlock?: true
    updatedAt?: true
  }

  export type ChainScanStateMaxAggregateInputType = {
    chain?: true
    lastScannedBlock?: true
    updatedAt?: true
  }

  export type ChainScanStateCountAggregateInputType = {
    chain?: true
    lastScannedBlock?: true
    updatedAt?: true
    _all?: true
  }

  export type ChainScanStateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChainScanState to aggregate.
     */
    where?: ChainScanStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChainScanStates to fetch.
     */
    orderBy?: ChainScanStateOrderByWithRelationInput | ChainScanStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChainScanStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChainScanStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChainScanStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChainScanStates
    **/
    _count?: true | ChainScanStateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChainScanStateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChainScanStateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChainScanStateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChainScanStateMaxAggregateInputType
  }

  export type GetChainScanStateAggregateType<T extends ChainScanStateAggregateArgs> = {
        [P in keyof T & keyof AggregateChainScanState]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChainScanState[P]>
      : GetScalarType<T[P], AggregateChainScanState[P]>
  }




  export type ChainScanStateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChainScanStateWhereInput
    orderBy?: ChainScanStateOrderByWithAggregationInput | ChainScanStateOrderByWithAggregationInput[]
    by: ChainScanStateScalarFieldEnum[] | ChainScanStateScalarFieldEnum
    having?: ChainScanStateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChainScanStateCountAggregateInputType | true
    _avg?: ChainScanStateAvgAggregateInputType
    _sum?: ChainScanStateSumAggregateInputType
    _min?: ChainScanStateMinAggregateInputType
    _max?: ChainScanStateMaxAggregateInputType
  }

  export type ChainScanStateGroupByOutputType = {
    chain: string
    lastScannedBlock: bigint
    updatedAt: Date
    _count: ChainScanStateCountAggregateOutputType | null
    _avg: ChainScanStateAvgAggregateOutputType | null
    _sum: ChainScanStateSumAggregateOutputType | null
    _min: ChainScanStateMinAggregateOutputType | null
    _max: ChainScanStateMaxAggregateOutputType | null
  }

  type GetChainScanStateGroupByPayload<T extends ChainScanStateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChainScanStateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChainScanStateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChainScanStateGroupByOutputType[P]>
            : GetScalarType<T[P], ChainScanStateGroupByOutputType[P]>
        }
      >
    >


  export type ChainScanStateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chain?: boolean
    lastScannedBlock?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chainScanState"]>

  export type ChainScanStateSelectScalar = {
    chain?: boolean
    lastScannedBlock?: boolean
    updatedAt?: boolean
  }


  export type $ChainScanStatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChainScanState"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      chain: string
      lastScannedBlock: bigint
      updatedAt: Date
    }, ExtArgs["result"]["chainScanState"]>
    composites: {}
  }


  type ChainScanStateGetPayload<S extends boolean | null | undefined | ChainScanStateDefaultArgs> = $Result.GetResult<Prisma.$ChainScanStatePayload, S>

  type ChainScanStateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ChainScanStateFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ChainScanStateCountAggregateInputType | true
    }

  export interface ChainScanStateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChainScanState'], meta: { name: 'ChainScanState' } }
    /**
     * Find zero or one ChainScanState that matches the filter.
     * @param {ChainScanStateFindUniqueArgs} args - Arguments to find a ChainScanState
     * @example
     * // Get one ChainScanState
     * const chainScanState = await prisma.chainScanState.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ChainScanStateFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ChainScanStateFindUniqueArgs<ExtArgs>>
    ): Prisma__ChainScanStateClient<$Result.GetResult<Prisma.$ChainScanStatePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one ChainScanState that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ChainScanStateFindUniqueOrThrowArgs} args - Arguments to find a ChainScanState
     * @example
     * // Get one ChainScanState
     * const chainScanState = await prisma.chainScanState.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ChainScanStateFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ChainScanStateFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ChainScanStateClient<$Result.GetResult<Prisma.$ChainScanStatePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first ChainScanState that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChainScanStateFindFirstArgs} args - Arguments to find a ChainScanState
     * @example
     * // Get one ChainScanState
     * const chainScanState = await prisma.chainScanState.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ChainScanStateFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ChainScanStateFindFirstArgs<ExtArgs>>
    ): Prisma__ChainScanStateClient<$Result.GetResult<Prisma.$ChainScanStatePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first ChainScanState that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChainScanStateFindFirstOrThrowArgs} args - Arguments to find a ChainScanState
     * @example
     * // Get one ChainScanState
     * const chainScanState = await prisma.chainScanState.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ChainScanStateFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ChainScanStateFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ChainScanStateClient<$Result.GetResult<Prisma.$ChainScanStatePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more ChainScanStates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChainScanStateFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChainScanStates
     * const chainScanStates = await prisma.chainScanState.findMany()
     * 
     * // Get first 10 ChainScanStates
     * const chainScanStates = await prisma.chainScanState.findMany({ take: 10 })
     * 
     * // Only select the `chain`
     * const chainScanStateWithChainOnly = await prisma.chainScanState.findMany({ select: { chain: true } })
     * 
    **/
    findMany<T extends ChainScanStateFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChainScanStateFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChainScanStatePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a ChainScanState.
     * @param {ChainScanStateCreateArgs} args - Arguments to create a ChainScanState.
     * @example
     * // Create one ChainScanState
     * const ChainScanState = await prisma.chainScanState.create({
     *   data: {
     *     // ... data to create a ChainScanState
     *   }
     * })
     * 
    **/
    create<T extends ChainScanStateCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ChainScanStateCreateArgs<ExtArgs>>
    ): Prisma__ChainScanStateClient<$Result.GetResult<Prisma.$ChainScanStatePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many ChainScanStates.
     *     @param {ChainScanStateCreateManyArgs} args - Arguments to create many ChainScanStates.
     *     @example
     *     // Create many ChainScanStates
     *     const chainScanState = await prisma.chainScanState.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ChainScanStateCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChainScanStateCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ChainScanState.
     * @param {ChainScanStateDeleteArgs} args - Arguments to delete one ChainScanState.
     * @example
     * // Delete one ChainScanState
     * const ChainScanState = await prisma.chainScanState.delete({
     *   where: {
     *     // ... filter to delete one ChainScanState
     *   }
     * })
     * 
    **/
    delete<T extends ChainScanStateDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ChainScanStateDeleteArgs<ExtArgs>>
    ): Prisma__ChainScanStateClient<$Result.GetResult<Prisma.$ChainScanStatePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one ChainScanState.
     * @param {ChainScanStateUpdateArgs} args - Arguments to update one ChainScanState.
     * @example
     * // Update one ChainScanState
     * const chainScanState = await prisma.chainScanState.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ChainScanStateUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ChainScanStateUpdateArgs<ExtArgs>>
    ): Prisma__ChainScanStateClient<$Result.GetResult<Prisma.$ChainScanStatePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more ChainScanStates.
     * @param {ChainScanStateDeleteManyArgs} args - Arguments to filter ChainScanStates to delete.
     * @example
     * // Delete a few ChainScanStates
     * const { count } = await prisma.chainScanState.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ChainScanStateDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ChainScanStateDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChainScanStates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChainScanStateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChainScanStates
     * const chainScanState = await prisma.chainScanState.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ChainScanStateUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ChainScanStateUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ChainScanState.
     * @param {ChainScanStateUpsertArgs} args - Arguments to update or create a ChainScanState.
     * @example
     * // Update or create a ChainScanState
     * const chainScanState = await prisma.chainScanState.upsert({
     *   create: {
     *     // ... data to create a ChainScanState
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChainScanState we want to update
     *   }
     * })
    **/
    upsert<T extends ChainScanStateUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ChainScanStateUpsertArgs<ExtArgs>>
    ): Prisma__ChainScanStateClient<$Result.GetResult<Prisma.$ChainScanStatePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of ChainScanStates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChainScanStateCountArgs} args - Arguments to filter ChainScanStates to count.
     * @example
     * // Count the number of ChainScanStates
     * const count = await prisma.chainScanState.count({
     *   where: {
     *     // ... the filter for the ChainScanStates we want to count
     *   }
     * })
    **/
    count<T extends ChainScanStateCountArgs>(
      args?: Subset<T, ChainScanStateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChainScanStateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChainScanState.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChainScanStateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChainScanStateAggregateArgs>(args: Subset<T, ChainScanStateAggregateArgs>): Prisma.PrismaPromise<GetChainScanStateAggregateType<T>>

    /**
     * Group by ChainScanState.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChainScanStateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChainScanStateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChainScanStateGroupByArgs['orderBy'] }
        : { orderBy?: ChainScanStateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChainScanStateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChainScanStateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChainScanState model
   */
  readonly fields: ChainScanStateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChainScanState.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChainScanStateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the ChainScanState model
   */ 
  interface ChainScanStateFieldRefs {
    readonly chain: FieldRef<"ChainScanState", 'String'>
    readonly lastScannedBlock: FieldRef<"ChainScanState", 'BigInt'>
    readonly updatedAt: FieldRef<"ChainScanState", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * ChainScanState findUnique
   */
  export type ChainScanStateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChainScanState
     */
    select?: ChainScanStateSelect<ExtArgs> | null
    /**
     * Filter, which ChainScanState to fetch.
     */
    where: ChainScanStateWhereUniqueInput
  }


  /**
   * ChainScanState findUniqueOrThrow
   */
  export type ChainScanStateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChainScanState
     */
    select?: ChainScanStateSelect<ExtArgs> | null
    /**
     * Filter, which ChainScanState to fetch.
     */
    where: ChainScanStateWhereUniqueInput
  }


  /**
   * ChainScanState findFirst
   */
  export type ChainScanStateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChainScanState
     */
    select?: ChainScanStateSelect<ExtArgs> | null
    /**
     * Filter, which ChainScanState to fetch.
     */
    where?: ChainScanStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChainScanStates to fetch.
     */
    orderBy?: ChainScanStateOrderByWithRelationInput | ChainScanStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChainScanStates.
     */
    cursor?: ChainScanStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChainScanStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChainScanStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChainScanStates.
     */
    distinct?: ChainScanStateScalarFieldEnum | ChainScanStateScalarFieldEnum[]
  }


  /**
   * ChainScanState findFirstOrThrow
   */
  export type ChainScanStateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChainScanState
     */
    select?: ChainScanStateSelect<ExtArgs> | null
    /**
     * Filter, which ChainScanState to fetch.
     */
    where?: ChainScanStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChainScanStates to fetch.
     */
    orderBy?: ChainScanStateOrderByWithRelationInput | ChainScanStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChainScanStates.
     */
    cursor?: ChainScanStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChainScanStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChainScanStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChainScanStates.
     */
    distinct?: ChainScanStateScalarFieldEnum | ChainScanStateScalarFieldEnum[]
  }


  /**
   * ChainScanState findMany
   */
  export type ChainScanStateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChainScanState
     */
    select?: ChainScanStateSelect<ExtArgs> | null
    /**
     * Filter, which ChainScanStates to fetch.
     */
    where?: ChainScanStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChainScanStates to fetch.
     */
    orderBy?: ChainScanStateOrderByWithRelationInput | ChainScanStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChainScanStates.
     */
    cursor?: ChainScanStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChainScanStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChainScanStates.
     */
    skip?: number
    distinct?: ChainScanStateScalarFieldEnum | ChainScanStateScalarFieldEnum[]
  }


  /**
   * ChainScanState create
   */
  export type ChainScanStateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChainScanState
     */
    select?: ChainScanStateSelect<ExtArgs> | null
    /**
     * The data needed to create a ChainScanState.
     */
    data: XOR<ChainScanStateCreateInput, ChainScanStateUncheckedCreateInput>
  }


  /**
   * ChainScanState createMany
   */
  export type ChainScanStateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChainScanStates.
     */
    data: ChainScanStateCreateManyInput | ChainScanStateCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * ChainScanState update
   */
  export type ChainScanStateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChainScanState
     */
    select?: ChainScanStateSelect<ExtArgs> | null
    /**
     * The data needed to update a ChainScanState.
     */
    data: XOR<ChainScanStateUpdateInput, ChainScanStateUncheckedUpdateInput>
    /**
     * Choose, which ChainScanState to update.
     */
    where: ChainScanStateWhereUniqueInput
  }


  /**
   * ChainScanState updateMany
   */
  export type ChainScanStateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChainScanStates.
     */
    data: XOR<ChainScanStateUpdateManyMutationInput, ChainScanStateUncheckedUpdateManyInput>
    /**
     * Filter which ChainScanStates to update
     */
    where?: ChainScanStateWhereInput
  }


  /**
   * ChainScanState upsert
   */
  export type ChainScanStateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChainScanState
     */
    select?: ChainScanStateSelect<ExtArgs> | null
    /**
     * The filter to search for the ChainScanState to update in case it exists.
     */
    where: ChainScanStateWhereUniqueInput
    /**
     * In case the ChainScanState found by the `where` argument doesn't exist, create a new ChainScanState with this data.
     */
    create: XOR<ChainScanStateCreateInput, ChainScanStateUncheckedCreateInput>
    /**
     * In case the ChainScanState was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChainScanStateUpdateInput, ChainScanStateUncheckedUpdateInput>
  }


  /**
   * ChainScanState delete
   */
  export type ChainScanStateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChainScanState
     */
    select?: ChainScanStateSelect<ExtArgs> | null
    /**
     * Filter which ChainScanState to delete.
     */
    where: ChainScanStateWhereUniqueInput
  }


  /**
   * ChainScanState deleteMany
   */
  export type ChainScanStateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChainScanStates to delete
     */
    where?: ChainScanStateWhereInput
  }


  /**
   * ChainScanState without action
   */
  export type ChainScanStateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChainScanState
     */
    select?: ChainScanStateSelect<ExtArgs> | null
  }



  /**
   * Model TreasuryAccount
   */

  export type AggregateTreasuryAccount = {
    _count: TreasuryAccountCountAggregateOutputType | null
    _min: TreasuryAccountMinAggregateOutputType | null
    _max: TreasuryAccountMaxAggregateOutputType | null
  }

  export type TreasuryAccountMinAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.TreasuryAccountType | null
    network: string | null
    currency: string | null
    walletAddress: string | null
    parentAccountId: string | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type TreasuryAccountMaxAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.TreasuryAccountType | null
    network: string | null
    currency: string | null
    walletAddress: string | null
    parentAccountId: string | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type TreasuryAccountCountAggregateOutputType = {
    id: number
    name: number
    type: number
    network: number
    currency: number
    walletAddress: number
    parentAccountId: number
    isActive: number
    createdAt: number
    _all: number
  }


  export type TreasuryAccountMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    network?: true
    currency?: true
    walletAddress?: true
    parentAccountId?: true
    isActive?: true
    createdAt?: true
  }

  export type TreasuryAccountMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    network?: true
    currency?: true
    walletAddress?: true
    parentAccountId?: true
    isActive?: true
    createdAt?: true
  }

  export type TreasuryAccountCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    network?: true
    currency?: true
    walletAddress?: true
    parentAccountId?: true
    isActive?: true
    createdAt?: true
    _all?: true
  }

  export type TreasuryAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TreasuryAccount to aggregate.
     */
    where?: TreasuryAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasuryAccounts to fetch.
     */
    orderBy?: TreasuryAccountOrderByWithRelationInput | TreasuryAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TreasuryAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasuryAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasuryAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TreasuryAccounts
    **/
    _count?: true | TreasuryAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TreasuryAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TreasuryAccountMaxAggregateInputType
  }

  export type GetTreasuryAccountAggregateType<T extends TreasuryAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateTreasuryAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTreasuryAccount[P]>
      : GetScalarType<T[P], AggregateTreasuryAccount[P]>
  }




  export type TreasuryAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TreasuryAccountWhereInput
    orderBy?: TreasuryAccountOrderByWithAggregationInput | TreasuryAccountOrderByWithAggregationInput[]
    by: TreasuryAccountScalarFieldEnum[] | TreasuryAccountScalarFieldEnum
    having?: TreasuryAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TreasuryAccountCountAggregateInputType | true
    _min?: TreasuryAccountMinAggregateInputType
    _max?: TreasuryAccountMaxAggregateInputType
  }

  export type TreasuryAccountGroupByOutputType = {
    id: string
    name: string
    type: $Enums.TreasuryAccountType
    network: string | null
    currency: string
    walletAddress: string | null
    parentAccountId: string | null
    isActive: boolean
    createdAt: Date
    _count: TreasuryAccountCountAggregateOutputType | null
    _min: TreasuryAccountMinAggregateOutputType | null
    _max: TreasuryAccountMaxAggregateOutputType | null
  }

  type GetTreasuryAccountGroupByPayload<T extends TreasuryAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TreasuryAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TreasuryAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TreasuryAccountGroupByOutputType[P]>
            : GetScalarType<T[P], TreasuryAccountGroupByOutputType[P]>
        }
      >
    >


  export type TreasuryAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    network?: boolean
    currency?: boolean
    walletAddress?: boolean
    parentAccountId?: boolean
    isActive?: boolean
    createdAt?: boolean
    parentAccount?: boolean | TreasuryAccount$parentAccountArgs<ExtArgs>
    children?: boolean | TreasuryAccount$childrenArgs<ExtArgs>
    entries?: boolean | TreasuryAccount$entriesArgs<ExtArgs>
    _count?: boolean | TreasuryAccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["treasuryAccount"]>

  export type TreasuryAccountSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    network?: boolean
    currency?: boolean
    walletAddress?: boolean
    parentAccountId?: boolean
    isActive?: boolean
    createdAt?: boolean
  }

  export type TreasuryAccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parentAccount?: boolean | TreasuryAccount$parentAccountArgs<ExtArgs>
    children?: boolean | TreasuryAccount$childrenArgs<ExtArgs>
    entries?: boolean | TreasuryAccount$entriesArgs<ExtArgs>
    _count?: boolean | TreasuryAccountCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $TreasuryAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TreasuryAccount"
    objects: {
      parentAccount: Prisma.$TreasuryAccountPayload<ExtArgs> | null
      children: Prisma.$TreasuryAccountPayload<ExtArgs>[]
      entries: Prisma.$TreasuryEntryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      type: $Enums.TreasuryAccountType
      network: string | null
      currency: string
      walletAddress: string | null
      parentAccountId: string | null
      isActive: boolean
      createdAt: Date
    }, ExtArgs["result"]["treasuryAccount"]>
    composites: {}
  }


  type TreasuryAccountGetPayload<S extends boolean | null | undefined | TreasuryAccountDefaultArgs> = $Result.GetResult<Prisma.$TreasuryAccountPayload, S>

  type TreasuryAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TreasuryAccountFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TreasuryAccountCountAggregateInputType | true
    }

  export interface TreasuryAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TreasuryAccount'], meta: { name: 'TreasuryAccount' } }
    /**
     * Find zero or one TreasuryAccount that matches the filter.
     * @param {TreasuryAccountFindUniqueArgs} args - Arguments to find a TreasuryAccount
     * @example
     * // Get one TreasuryAccount
     * const treasuryAccount = await prisma.treasuryAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TreasuryAccountFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, TreasuryAccountFindUniqueArgs<ExtArgs>>
    ): Prisma__TreasuryAccountClient<$Result.GetResult<Prisma.$TreasuryAccountPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one TreasuryAccount that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TreasuryAccountFindUniqueOrThrowArgs} args - Arguments to find a TreasuryAccount
     * @example
     * // Get one TreasuryAccount
     * const treasuryAccount = await prisma.treasuryAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TreasuryAccountFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TreasuryAccountFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__TreasuryAccountClient<$Result.GetResult<Prisma.$TreasuryAccountPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first TreasuryAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryAccountFindFirstArgs} args - Arguments to find a TreasuryAccount
     * @example
     * // Get one TreasuryAccount
     * const treasuryAccount = await prisma.treasuryAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TreasuryAccountFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, TreasuryAccountFindFirstArgs<ExtArgs>>
    ): Prisma__TreasuryAccountClient<$Result.GetResult<Prisma.$TreasuryAccountPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first TreasuryAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryAccountFindFirstOrThrowArgs} args - Arguments to find a TreasuryAccount
     * @example
     * // Get one TreasuryAccount
     * const treasuryAccount = await prisma.treasuryAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TreasuryAccountFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TreasuryAccountFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__TreasuryAccountClient<$Result.GetResult<Prisma.$TreasuryAccountPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more TreasuryAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryAccountFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TreasuryAccounts
     * const treasuryAccounts = await prisma.treasuryAccount.findMany()
     * 
     * // Get first 10 TreasuryAccounts
     * const treasuryAccounts = await prisma.treasuryAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const treasuryAccountWithIdOnly = await prisma.treasuryAccount.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TreasuryAccountFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TreasuryAccountFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreasuryAccountPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a TreasuryAccount.
     * @param {TreasuryAccountCreateArgs} args - Arguments to create a TreasuryAccount.
     * @example
     * // Create one TreasuryAccount
     * const TreasuryAccount = await prisma.treasuryAccount.create({
     *   data: {
     *     // ... data to create a TreasuryAccount
     *   }
     * })
     * 
    **/
    create<T extends TreasuryAccountCreateArgs<ExtArgs>>(
      args: SelectSubset<T, TreasuryAccountCreateArgs<ExtArgs>>
    ): Prisma__TreasuryAccountClient<$Result.GetResult<Prisma.$TreasuryAccountPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many TreasuryAccounts.
     *     @param {TreasuryAccountCreateManyArgs} args - Arguments to create many TreasuryAccounts.
     *     @example
     *     // Create many TreasuryAccounts
     *     const treasuryAccount = await prisma.treasuryAccount.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TreasuryAccountCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TreasuryAccountCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TreasuryAccount.
     * @param {TreasuryAccountDeleteArgs} args - Arguments to delete one TreasuryAccount.
     * @example
     * // Delete one TreasuryAccount
     * const TreasuryAccount = await prisma.treasuryAccount.delete({
     *   where: {
     *     // ... filter to delete one TreasuryAccount
     *   }
     * })
     * 
    **/
    delete<T extends TreasuryAccountDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, TreasuryAccountDeleteArgs<ExtArgs>>
    ): Prisma__TreasuryAccountClient<$Result.GetResult<Prisma.$TreasuryAccountPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one TreasuryAccount.
     * @param {TreasuryAccountUpdateArgs} args - Arguments to update one TreasuryAccount.
     * @example
     * // Update one TreasuryAccount
     * const treasuryAccount = await prisma.treasuryAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TreasuryAccountUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, TreasuryAccountUpdateArgs<ExtArgs>>
    ): Prisma__TreasuryAccountClient<$Result.GetResult<Prisma.$TreasuryAccountPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more TreasuryAccounts.
     * @param {TreasuryAccountDeleteManyArgs} args - Arguments to filter TreasuryAccounts to delete.
     * @example
     * // Delete a few TreasuryAccounts
     * const { count } = await prisma.treasuryAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TreasuryAccountDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TreasuryAccountDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TreasuryAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TreasuryAccounts
     * const treasuryAccount = await prisma.treasuryAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TreasuryAccountUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, TreasuryAccountUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TreasuryAccount.
     * @param {TreasuryAccountUpsertArgs} args - Arguments to update or create a TreasuryAccount.
     * @example
     * // Update or create a TreasuryAccount
     * const treasuryAccount = await prisma.treasuryAccount.upsert({
     *   create: {
     *     // ... data to create a TreasuryAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TreasuryAccount we want to update
     *   }
     * })
    **/
    upsert<T extends TreasuryAccountUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, TreasuryAccountUpsertArgs<ExtArgs>>
    ): Prisma__TreasuryAccountClient<$Result.GetResult<Prisma.$TreasuryAccountPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of TreasuryAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryAccountCountArgs} args - Arguments to filter TreasuryAccounts to count.
     * @example
     * // Count the number of TreasuryAccounts
     * const count = await prisma.treasuryAccount.count({
     *   where: {
     *     // ... the filter for the TreasuryAccounts we want to count
     *   }
     * })
    **/
    count<T extends TreasuryAccountCountArgs>(
      args?: Subset<T, TreasuryAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TreasuryAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TreasuryAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TreasuryAccountAggregateArgs>(args: Subset<T, TreasuryAccountAggregateArgs>): Prisma.PrismaPromise<GetTreasuryAccountAggregateType<T>>

    /**
     * Group by TreasuryAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryAccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TreasuryAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TreasuryAccountGroupByArgs['orderBy'] }
        : { orderBy?: TreasuryAccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TreasuryAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTreasuryAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TreasuryAccount model
   */
  readonly fields: TreasuryAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TreasuryAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TreasuryAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    parentAccount<T extends TreasuryAccount$parentAccountArgs<ExtArgs> = {}>(args?: Subset<T, TreasuryAccount$parentAccountArgs<ExtArgs>>): Prisma__TreasuryAccountClient<$Result.GetResult<Prisma.$TreasuryAccountPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    children<T extends TreasuryAccount$childrenArgs<ExtArgs> = {}>(args?: Subset<T, TreasuryAccount$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreasuryAccountPayload<ExtArgs>, T, 'findMany'> | Null>;

    entries<T extends TreasuryAccount$entriesArgs<ExtArgs> = {}>(args?: Subset<T, TreasuryAccount$entriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreasuryEntryPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the TreasuryAccount model
   */ 
  interface TreasuryAccountFieldRefs {
    readonly id: FieldRef<"TreasuryAccount", 'String'>
    readonly name: FieldRef<"TreasuryAccount", 'String'>
    readonly type: FieldRef<"TreasuryAccount", 'TreasuryAccountType'>
    readonly network: FieldRef<"TreasuryAccount", 'String'>
    readonly currency: FieldRef<"TreasuryAccount", 'String'>
    readonly walletAddress: FieldRef<"TreasuryAccount", 'String'>
    readonly parentAccountId: FieldRef<"TreasuryAccount", 'String'>
    readonly isActive: FieldRef<"TreasuryAccount", 'Boolean'>
    readonly createdAt: FieldRef<"TreasuryAccount", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * TreasuryAccount findUnique
   */
  export type TreasuryAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryAccount
     */
    select?: TreasuryAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryAccountInclude<ExtArgs> | null
    /**
     * Filter, which TreasuryAccount to fetch.
     */
    where: TreasuryAccountWhereUniqueInput
  }


  /**
   * TreasuryAccount findUniqueOrThrow
   */
  export type TreasuryAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryAccount
     */
    select?: TreasuryAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryAccountInclude<ExtArgs> | null
    /**
     * Filter, which TreasuryAccount to fetch.
     */
    where: TreasuryAccountWhereUniqueInput
  }


  /**
   * TreasuryAccount findFirst
   */
  export type TreasuryAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryAccount
     */
    select?: TreasuryAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryAccountInclude<ExtArgs> | null
    /**
     * Filter, which TreasuryAccount to fetch.
     */
    where?: TreasuryAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasuryAccounts to fetch.
     */
    orderBy?: TreasuryAccountOrderByWithRelationInput | TreasuryAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TreasuryAccounts.
     */
    cursor?: TreasuryAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasuryAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasuryAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TreasuryAccounts.
     */
    distinct?: TreasuryAccountScalarFieldEnum | TreasuryAccountScalarFieldEnum[]
  }


  /**
   * TreasuryAccount findFirstOrThrow
   */
  export type TreasuryAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryAccount
     */
    select?: TreasuryAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryAccountInclude<ExtArgs> | null
    /**
     * Filter, which TreasuryAccount to fetch.
     */
    where?: TreasuryAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasuryAccounts to fetch.
     */
    orderBy?: TreasuryAccountOrderByWithRelationInput | TreasuryAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TreasuryAccounts.
     */
    cursor?: TreasuryAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasuryAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasuryAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TreasuryAccounts.
     */
    distinct?: TreasuryAccountScalarFieldEnum | TreasuryAccountScalarFieldEnum[]
  }


  /**
   * TreasuryAccount findMany
   */
  export type TreasuryAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryAccount
     */
    select?: TreasuryAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryAccountInclude<ExtArgs> | null
    /**
     * Filter, which TreasuryAccounts to fetch.
     */
    where?: TreasuryAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasuryAccounts to fetch.
     */
    orderBy?: TreasuryAccountOrderByWithRelationInput | TreasuryAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TreasuryAccounts.
     */
    cursor?: TreasuryAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasuryAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasuryAccounts.
     */
    skip?: number
    distinct?: TreasuryAccountScalarFieldEnum | TreasuryAccountScalarFieldEnum[]
  }


  /**
   * TreasuryAccount create
   */
  export type TreasuryAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryAccount
     */
    select?: TreasuryAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryAccountInclude<ExtArgs> | null
    /**
     * The data needed to create a TreasuryAccount.
     */
    data: XOR<TreasuryAccountCreateInput, TreasuryAccountUncheckedCreateInput>
  }


  /**
   * TreasuryAccount createMany
   */
  export type TreasuryAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TreasuryAccounts.
     */
    data: TreasuryAccountCreateManyInput | TreasuryAccountCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * TreasuryAccount update
   */
  export type TreasuryAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryAccount
     */
    select?: TreasuryAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryAccountInclude<ExtArgs> | null
    /**
     * The data needed to update a TreasuryAccount.
     */
    data: XOR<TreasuryAccountUpdateInput, TreasuryAccountUncheckedUpdateInput>
    /**
     * Choose, which TreasuryAccount to update.
     */
    where: TreasuryAccountWhereUniqueInput
  }


  /**
   * TreasuryAccount updateMany
   */
  export type TreasuryAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TreasuryAccounts.
     */
    data: XOR<TreasuryAccountUpdateManyMutationInput, TreasuryAccountUncheckedUpdateManyInput>
    /**
     * Filter which TreasuryAccounts to update
     */
    where?: TreasuryAccountWhereInput
  }


  /**
   * TreasuryAccount upsert
   */
  export type TreasuryAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryAccount
     */
    select?: TreasuryAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryAccountInclude<ExtArgs> | null
    /**
     * The filter to search for the TreasuryAccount to update in case it exists.
     */
    where: TreasuryAccountWhereUniqueInput
    /**
     * In case the TreasuryAccount found by the `where` argument doesn't exist, create a new TreasuryAccount with this data.
     */
    create: XOR<TreasuryAccountCreateInput, TreasuryAccountUncheckedCreateInput>
    /**
     * In case the TreasuryAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TreasuryAccountUpdateInput, TreasuryAccountUncheckedUpdateInput>
  }


  /**
   * TreasuryAccount delete
   */
  export type TreasuryAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryAccount
     */
    select?: TreasuryAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryAccountInclude<ExtArgs> | null
    /**
     * Filter which TreasuryAccount to delete.
     */
    where: TreasuryAccountWhereUniqueInput
  }


  /**
   * TreasuryAccount deleteMany
   */
  export type TreasuryAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TreasuryAccounts to delete
     */
    where?: TreasuryAccountWhereInput
  }


  /**
   * TreasuryAccount.parentAccount
   */
  export type TreasuryAccount$parentAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryAccount
     */
    select?: TreasuryAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryAccountInclude<ExtArgs> | null
    where?: TreasuryAccountWhereInput
  }


  /**
   * TreasuryAccount.children
   */
  export type TreasuryAccount$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryAccount
     */
    select?: TreasuryAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryAccountInclude<ExtArgs> | null
    where?: TreasuryAccountWhereInput
    orderBy?: TreasuryAccountOrderByWithRelationInput | TreasuryAccountOrderByWithRelationInput[]
    cursor?: TreasuryAccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TreasuryAccountScalarFieldEnum | TreasuryAccountScalarFieldEnum[]
  }


  /**
   * TreasuryAccount.entries
   */
  export type TreasuryAccount$entriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryEntry
     */
    select?: TreasuryEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryEntryInclude<ExtArgs> | null
    where?: TreasuryEntryWhereInput
    orderBy?: TreasuryEntryOrderByWithRelationInput | TreasuryEntryOrderByWithRelationInput[]
    cursor?: TreasuryEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TreasuryEntryScalarFieldEnum | TreasuryEntryScalarFieldEnum[]
  }


  /**
   * TreasuryAccount without action
   */
  export type TreasuryAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryAccount
     */
    select?: TreasuryAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryAccountInclude<ExtArgs> | null
  }



  /**
   * Model TreasuryLedger
   */

  export type AggregateTreasuryLedger = {
    _count: TreasuryLedgerCountAggregateOutputType | null
    _min: TreasuryLedgerMinAggregateOutputType | null
    _max: TreasuryLedgerMaxAggregateOutputType | null
  }

  export type TreasuryLedgerMinAggregateOutputType = {
    id: string | null
    referenceType: $Enums.TreasuryLedgerReferenceType | null
    referenceId: string | null
    description: string | null
    network: string | null
    currency: string | null
    createdByAdminId: string | null
    locked: boolean | null
    createdAt: Date | null
  }

  export type TreasuryLedgerMaxAggregateOutputType = {
    id: string | null
    referenceType: $Enums.TreasuryLedgerReferenceType | null
    referenceId: string | null
    description: string | null
    network: string | null
    currency: string | null
    createdByAdminId: string | null
    locked: boolean | null
    createdAt: Date | null
  }

  export type TreasuryLedgerCountAggregateOutputType = {
    id: number
    referenceType: number
    referenceId: number
    description: number
    network: number
    currency: number
    createdByAdminId: number
    locked: number
    createdAt: number
    _all: number
  }


  export type TreasuryLedgerMinAggregateInputType = {
    id?: true
    referenceType?: true
    referenceId?: true
    description?: true
    network?: true
    currency?: true
    createdByAdminId?: true
    locked?: true
    createdAt?: true
  }

  export type TreasuryLedgerMaxAggregateInputType = {
    id?: true
    referenceType?: true
    referenceId?: true
    description?: true
    network?: true
    currency?: true
    createdByAdminId?: true
    locked?: true
    createdAt?: true
  }

  export type TreasuryLedgerCountAggregateInputType = {
    id?: true
    referenceType?: true
    referenceId?: true
    description?: true
    network?: true
    currency?: true
    createdByAdminId?: true
    locked?: true
    createdAt?: true
    _all?: true
  }

  export type TreasuryLedgerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TreasuryLedger to aggregate.
     */
    where?: TreasuryLedgerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasuryLedgers to fetch.
     */
    orderBy?: TreasuryLedgerOrderByWithRelationInput | TreasuryLedgerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TreasuryLedgerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasuryLedgers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasuryLedgers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TreasuryLedgers
    **/
    _count?: true | TreasuryLedgerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TreasuryLedgerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TreasuryLedgerMaxAggregateInputType
  }

  export type GetTreasuryLedgerAggregateType<T extends TreasuryLedgerAggregateArgs> = {
        [P in keyof T & keyof AggregateTreasuryLedger]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTreasuryLedger[P]>
      : GetScalarType<T[P], AggregateTreasuryLedger[P]>
  }




  export type TreasuryLedgerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TreasuryLedgerWhereInput
    orderBy?: TreasuryLedgerOrderByWithAggregationInput | TreasuryLedgerOrderByWithAggregationInput[]
    by: TreasuryLedgerScalarFieldEnum[] | TreasuryLedgerScalarFieldEnum
    having?: TreasuryLedgerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TreasuryLedgerCountAggregateInputType | true
    _min?: TreasuryLedgerMinAggregateInputType
    _max?: TreasuryLedgerMaxAggregateInputType
  }

  export type TreasuryLedgerGroupByOutputType = {
    id: string
    referenceType: $Enums.TreasuryLedgerReferenceType
    referenceId: string | null
    description: string
    network: string
    currency: string
    createdByAdminId: string | null
    locked: boolean
    createdAt: Date
    _count: TreasuryLedgerCountAggregateOutputType | null
    _min: TreasuryLedgerMinAggregateOutputType | null
    _max: TreasuryLedgerMaxAggregateOutputType | null
  }

  type GetTreasuryLedgerGroupByPayload<T extends TreasuryLedgerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TreasuryLedgerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TreasuryLedgerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TreasuryLedgerGroupByOutputType[P]>
            : GetScalarType<T[P], TreasuryLedgerGroupByOutputType[P]>
        }
      >
    >


  export type TreasuryLedgerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    referenceType?: boolean
    referenceId?: boolean
    description?: boolean
    network?: boolean
    currency?: boolean
    createdByAdminId?: boolean
    locked?: boolean
    createdAt?: boolean
    entries?: boolean | TreasuryLedger$entriesArgs<ExtArgs>
    _count?: boolean | TreasuryLedgerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["treasuryLedger"]>

  export type TreasuryLedgerSelectScalar = {
    id?: boolean
    referenceType?: boolean
    referenceId?: boolean
    description?: boolean
    network?: boolean
    currency?: boolean
    createdByAdminId?: boolean
    locked?: boolean
    createdAt?: boolean
  }

  export type TreasuryLedgerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entries?: boolean | TreasuryLedger$entriesArgs<ExtArgs>
    _count?: boolean | TreasuryLedgerCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $TreasuryLedgerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TreasuryLedger"
    objects: {
      entries: Prisma.$TreasuryEntryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      referenceType: $Enums.TreasuryLedgerReferenceType
      referenceId: string | null
      description: string
      network: string
      currency: string
      createdByAdminId: string | null
      locked: boolean
      createdAt: Date
    }, ExtArgs["result"]["treasuryLedger"]>
    composites: {}
  }


  type TreasuryLedgerGetPayload<S extends boolean | null | undefined | TreasuryLedgerDefaultArgs> = $Result.GetResult<Prisma.$TreasuryLedgerPayload, S>

  type TreasuryLedgerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TreasuryLedgerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TreasuryLedgerCountAggregateInputType | true
    }

  export interface TreasuryLedgerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TreasuryLedger'], meta: { name: 'TreasuryLedger' } }
    /**
     * Find zero or one TreasuryLedger that matches the filter.
     * @param {TreasuryLedgerFindUniqueArgs} args - Arguments to find a TreasuryLedger
     * @example
     * // Get one TreasuryLedger
     * const treasuryLedger = await prisma.treasuryLedger.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TreasuryLedgerFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, TreasuryLedgerFindUniqueArgs<ExtArgs>>
    ): Prisma__TreasuryLedgerClient<$Result.GetResult<Prisma.$TreasuryLedgerPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one TreasuryLedger that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TreasuryLedgerFindUniqueOrThrowArgs} args - Arguments to find a TreasuryLedger
     * @example
     * // Get one TreasuryLedger
     * const treasuryLedger = await prisma.treasuryLedger.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TreasuryLedgerFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TreasuryLedgerFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__TreasuryLedgerClient<$Result.GetResult<Prisma.$TreasuryLedgerPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first TreasuryLedger that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryLedgerFindFirstArgs} args - Arguments to find a TreasuryLedger
     * @example
     * // Get one TreasuryLedger
     * const treasuryLedger = await prisma.treasuryLedger.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TreasuryLedgerFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, TreasuryLedgerFindFirstArgs<ExtArgs>>
    ): Prisma__TreasuryLedgerClient<$Result.GetResult<Prisma.$TreasuryLedgerPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first TreasuryLedger that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryLedgerFindFirstOrThrowArgs} args - Arguments to find a TreasuryLedger
     * @example
     * // Get one TreasuryLedger
     * const treasuryLedger = await prisma.treasuryLedger.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TreasuryLedgerFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TreasuryLedgerFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__TreasuryLedgerClient<$Result.GetResult<Prisma.$TreasuryLedgerPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more TreasuryLedgers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryLedgerFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TreasuryLedgers
     * const treasuryLedgers = await prisma.treasuryLedger.findMany()
     * 
     * // Get first 10 TreasuryLedgers
     * const treasuryLedgers = await prisma.treasuryLedger.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const treasuryLedgerWithIdOnly = await prisma.treasuryLedger.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TreasuryLedgerFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TreasuryLedgerFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreasuryLedgerPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a TreasuryLedger.
     * @param {TreasuryLedgerCreateArgs} args - Arguments to create a TreasuryLedger.
     * @example
     * // Create one TreasuryLedger
     * const TreasuryLedger = await prisma.treasuryLedger.create({
     *   data: {
     *     // ... data to create a TreasuryLedger
     *   }
     * })
     * 
    **/
    create<T extends TreasuryLedgerCreateArgs<ExtArgs>>(
      args: SelectSubset<T, TreasuryLedgerCreateArgs<ExtArgs>>
    ): Prisma__TreasuryLedgerClient<$Result.GetResult<Prisma.$TreasuryLedgerPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many TreasuryLedgers.
     *     @param {TreasuryLedgerCreateManyArgs} args - Arguments to create many TreasuryLedgers.
     *     @example
     *     // Create many TreasuryLedgers
     *     const treasuryLedger = await prisma.treasuryLedger.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TreasuryLedgerCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TreasuryLedgerCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TreasuryLedger.
     * @param {TreasuryLedgerDeleteArgs} args - Arguments to delete one TreasuryLedger.
     * @example
     * // Delete one TreasuryLedger
     * const TreasuryLedger = await prisma.treasuryLedger.delete({
     *   where: {
     *     // ... filter to delete one TreasuryLedger
     *   }
     * })
     * 
    **/
    delete<T extends TreasuryLedgerDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, TreasuryLedgerDeleteArgs<ExtArgs>>
    ): Prisma__TreasuryLedgerClient<$Result.GetResult<Prisma.$TreasuryLedgerPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one TreasuryLedger.
     * @param {TreasuryLedgerUpdateArgs} args - Arguments to update one TreasuryLedger.
     * @example
     * // Update one TreasuryLedger
     * const treasuryLedger = await prisma.treasuryLedger.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TreasuryLedgerUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, TreasuryLedgerUpdateArgs<ExtArgs>>
    ): Prisma__TreasuryLedgerClient<$Result.GetResult<Prisma.$TreasuryLedgerPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more TreasuryLedgers.
     * @param {TreasuryLedgerDeleteManyArgs} args - Arguments to filter TreasuryLedgers to delete.
     * @example
     * // Delete a few TreasuryLedgers
     * const { count } = await prisma.treasuryLedger.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TreasuryLedgerDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TreasuryLedgerDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TreasuryLedgers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryLedgerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TreasuryLedgers
     * const treasuryLedger = await prisma.treasuryLedger.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TreasuryLedgerUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, TreasuryLedgerUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TreasuryLedger.
     * @param {TreasuryLedgerUpsertArgs} args - Arguments to update or create a TreasuryLedger.
     * @example
     * // Update or create a TreasuryLedger
     * const treasuryLedger = await prisma.treasuryLedger.upsert({
     *   create: {
     *     // ... data to create a TreasuryLedger
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TreasuryLedger we want to update
     *   }
     * })
    **/
    upsert<T extends TreasuryLedgerUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, TreasuryLedgerUpsertArgs<ExtArgs>>
    ): Prisma__TreasuryLedgerClient<$Result.GetResult<Prisma.$TreasuryLedgerPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of TreasuryLedgers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryLedgerCountArgs} args - Arguments to filter TreasuryLedgers to count.
     * @example
     * // Count the number of TreasuryLedgers
     * const count = await prisma.treasuryLedger.count({
     *   where: {
     *     // ... the filter for the TreasuryLedgers we want to count
     *   }
     * })
    **/
    count<T extends TreasuryLedgerCountArgs>(
      args?: Subset<T, TreasuryLedgerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TreasuryLedgerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TreasuryLedger.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryLedgerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TreasuryLedgerAggregateArgs>(args: Subset<T, TreasuryLedgerAggregateArgs>): Prisma.PrismaPromise<GetTreasuryLedgerAggregateType<T>>

    /**
     * Group by TreasuryLedger.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryLedgerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TreasuryLedgerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TreasuryLedgerGroupByArgs['orderBy'] }
        : { orderBy?: TreasuryLedgerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TreasuryLedgerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTreasuryLedgerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TreasuryLedger model
   */
  readonly fields: TreasuryLedgerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TreasuryLedger.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TreasuryLedgerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    entries<T extends TreasuryLedger$entriesArgs<ExtArgs> = {}>(args?: Subset<T, TreasuryLedger$entriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreasuryEntryPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the TreasuryLedger model
   */ 
  interface TreasuryLedgerFieldRefs {
    readonly id: FieldRef<"TreasuryLedger", 'String'>
    readonly referenceType: FieldRef<"TreasuryLedger", 'TreasuryLedgerReferenceType'>
    readonly referenceId: FieldRef<"TreasuryLedger", 'String'>
    readonly description: FieldRef<"TreasuryLedger", 'String'>
    readonly network: FieldRef<"TreasuryLedger", 'String'>
    readonly currency: FieldRef<"TreasuryLedger", 'String'>
    readonly createdByAdminId: FieldRef<"TreasuryLedger", 'String'>
    readonly locked: FieldRef<"TreasuryLedger", 'Boolean'>
    readonly createdAt: FieldRef<"TreasuryLedger", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * TreasuryLedger findUnique
   */
  export type TreasuryLedgerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryLedger
     */
    select?: TreasuryLedgerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryLedgerInclude<ExtArgs> | null
    /**
     * Filter, which TreasuryLedger to fetch.
     */
    where: TreasuryLedgerWhereUniqueInput
  }


  /**
   * TreasuryLedger findUniqueOrThrow
   */
  export type TreasuryLedgerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryLedger
     */
    select?: TreasuryLedgerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryLedgerInclude<ExtArgs> | null
    /**
     * Filter, which TreasuryLedger to fetch.
     */
    where: TreasuryLedgerWhereUniqueInput
  }


  /**
   * TreasuryLedger findFirst
   */
  export type TreasuryLedgerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryLedger
     */
    select?: TreasuryLedgerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryLedgerInclude<ExtArgs> | null
    /**
     * Filter, which TreasuryLedger to fetch.
     */
    where?: TreasuryLedgerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasuryLedgers to fetch.
     */
    orderBy?: TreasuryLedgerOrderByWithRelationInput | TreasuryLedgerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TreasuryLedgers.
     */
    cursor?: TreasuryLedgerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasuryLedgers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasuryLedgers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TreasuryLedgers.
     */
    distinct?: TreasuryLedgerScalarFieldEnum | TreasuryLedgerScalarFieldEnum[]
  }


  /**
   * TreasuryLedger findFirstOrThrow
   */
  export type TreasuryLedgerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryLedger
     */
    select?: TreasuryLedgerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryLedgerInclude<ExtArgs> | null
    /**
     * Filter, which TreasuryLedger to fetch.
     */
    where?: TreasuryLedgerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasuryLedgers to fetch.
     */
    orderBy?: TreasuryLedgerOrderByWithRelationInput | TreasuryLedgerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TreasuryLedgers.
     */
    cursor?: TreasuryLedgerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasuryLedgers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasuryLedgers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TreasuryLedgers.
     */
    distinct?: TreasuryLedgerScalarFieldEnum | TreasuryLedgerScalarFieldEnum[]
  }


  /**
   * TreasuryLedger findMany
   */
  export type TreasuryLedgerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryLedger
     */
    select?: TreasuryLedgerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryLedgerInclude<ExtArgs> | null
    /**
     * Filter, which TreasuryLedgers to fetch.
     */
    where?: TreasuryLedgerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasuryLedgers to fetch.
     */
    orderBy?: TreasuryLedgerOrderByWithRelationInput | TreasuryLedgerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TreasuryLedgers.
     */
    cursor?: TreasuryLedgerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasuryLedgers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasuryLedgers.
     */
    skip?: number
    distinct?: TreasuryLedgerScalarFieldEnum | TreasuryLedgerScalarFieldEnum[]
  }


  /**
   * TreasuryLedger create
   */
  export type TreasuryLedgerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryLedger
     */
    select?: TreasuryLedgerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryLedgerInclude<ExtArgs> | null
    /**
     * The data needed to create a TreasuryLedger.
     */
    data: XOR<TreasuryLedgerCreateInput, TreasuryLedgerUncheckedCreateInput>
  }


  /**
   * TreasuryLedger createMany
   */
  export type TreasuryLedgerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TreasuryLedgers.
     */
    data: TreasuryLedgerCreateManyInput | TreasuryLedgerCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * TreasuryLedger update
   */
  export type TreasuryLedgerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryLedger
     */
    select?: TreasuryLedgerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryLedgerInclude<ExtArgs> | null
    /**
     * The data needed to update a TreasuryLedger.
     */
    data: XOR<TreasuryLedgerUpdateInput, TreasuryLedgerUncheckedUpdateInput>
    /**
     * Choose, which TreasuryLedger to update.
     */
    where: TreasuryLedgerWhereUniqueInput
  }


  /**
   * TreasuryLedger updateMany
   */
  export type TreasuryLedgerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TreasuryLedgers.
     */
    data: XOR<TreasuryLedgerUpdateManyMutationInput, TreasuryLedgerUncheckedUpdateManyInput>
    /**
     * Filter which TreasuryLedgers to update
     */
    where?: TreasuryLedgerWhereInput
  }


  /**
   * TreasuryLedger upsert
   */
  export type TreasuryLedgerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryLedger
     */
    select?: TreasuryLedgerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryLedgerInclude<ExtArgs> | null
    /**
     * The filter to search for the TreasuryLedger to update in case it exists.
     */
    where: TreasuryLedgerWhereUniqueInput
    /**
     * In case the TreasuryLedger found by the `where` argument doesn't exist, create a new TreasuryLedger with this data.
     */
    create: XOR<TreasuryLedgerCreateInput, TreasuryLedgerUncheckedCreateInput>
    /**
     * In case the TreasuryLedger was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TreasuryLedgerUpdateInput, TreasuryLedgerUncheckedUpdateInput>
  }


  /**
   * TreasuryLedger delete
   */
  export type TreasuryLedgerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryLedger
     */
    select?: TreasuryLedgerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryLedgerInclude<ExtArgs> | null
    /**
     * Filter which TreasuryLedger to delete.
     */
    where: TreasuryLedgerWhereUniqueInput
  }


  /**
   * TreasuryLedger deleteMany
   */
  export type TreasuryLedgerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TreasuryLedgers to delete
     */
    where?: TreasuryLedgerWhereInput
  }


  /**
   * TreasuryLedger.entries
   */
  export type TreasuryLedger$entriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryEntry
     */
    select?: TreasuryEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryEntryInclude<ExtArgs> | null
    where?: TreasuryEntryWhereInput
    orderBy?: TreasuryEntryOrderByWithRelationInput | TreasuryEntryOrderByWithRelationInput[]
    cursor?: TreasuryEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TreasuryEntryScalarFieldEnum | TreasuryEntryScalarFieldEnum[]
  }


  /**
   * TreasuryLedger without action
   */
  export type TreasuryLedgerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryLedger
     */
    select?: TreasuryLedgerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryLedgerInclude<ExtArgs> | null
  }



  /**
   * Model TreasuryEntry
   */

  export type AggregateTreasuryEntry = {
    _count: TreasuryEntryCountAggregateOutputType | null
    _avg: TreasuryEntryAvgAggregateOutputType | null
    _sum: TreasuryEntrySumAggregateOutputType | null
    _min: TreasuryEntryMinAggregateOutputType | null
    _max: TreasuryEntryMaxAggregateOutputType | null
  }

  export type TreasuryEntryAvgAggregateOutputType = {
    debitAmount: number | null
    creditAmount: number | null
  }

  export type TreasuryEntrySumAggregateOutputType = {
    debitAmount: bigint | null
    creditAmount: bigint | null
  }

  export type TreasuryEntryMinAggregateOutputType = {
    id: string | null
    ledgerId: string | null
    accountId: string | null
    debitAmount: bigint | null
    creditAmount: bigint | null
    currency: string | null
    network: string | null
    createdAt: Date | null
  }

  export type TreasuryEntryMaxAggregateOutputType = {
    id: string | null
    ledgerId: string | null
    accountId: string | null
    debitAmount: bigint | null
    creditAmount: bigint | null
    currency: string | null
    network: string | null
    createdAt: Date | null
  }

  export type TreasuryEntryCountAggregateOutputType = {
    id: number
    ledgerId: number
    accountId: number
    debitAmount: number
    creditAmount: number
    currency: number
    network: number
    createdAt: number
    _all: number
  }


  export type TreasuryEntryAvgAggregateInputType = {
    debitAmount?: true
    creditAmount?: true
  }

  export type TreasuryEntrySumAggregateInputType = {
    debitAmount?: true
    creditAmount?: true
  }

  export type TreasuryEntryMinAggregateInputType = {
    id?: true
    ledgerId?: true
    accountId?: true
    debitAmount?: true
    creditAmount?: true
    currency?: true
    network?: true
    createdAt?: true
  }

  export type TreasuryEntryMaxAggregateInputType = {
    id?: true
    ledgerId?: true
    accountId?: true
    debitAmount?: true
    creditAmount?: true
    currency?: true
    network?: true
    createdAt?: true
  }

  export type TreasuryEntryCountAggregateInputType = {
    id?: true
    ledgerId?: true
    accountId?: true
    debitAmount?: true
    creditAmount?: true
    currency?: true
    network?: true
    createdAt?: true
    _all?: true
  }

  export type TreasuryEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TreasuryEntry to aggregate.
     */
    where?: TreasuryEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasuryEntries to fetch.
     */
    orderBy?: TreasuryEntryOrderByWithRelationInput | TreasuryEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TreasuryEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasuryEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasuryEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TreasuryEntries
    **/
    _count?: true | TreasuryEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TreasuryEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TreasuryEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TreasuryEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TreasuryEntryMaxAggregateInputType
  }

  export type GetTreasuryEntryAggregateType<T extends TreasuryEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateTreasuryEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTreasuryEntry[P]>
      : GetScalarType<T[P], AggregateTreasuryEntry[P]>
  }




  export type TreasuryEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TreasuryEntryWhereInput
    orderBy?: TreasuryEntryOrderByWithAggregationInput | TreasuryEntryOrderByWithAggregationInput[]
    by: TreasuryEntryScalarFieldEnum[] | TreasuryEntryScalarFieldEnum
    having?: TreasuryEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TreasuryEntryCountAggregateInputType | true
    _avg?: TreasuryEntryAvgAggregateInputType
    _sum?: TreasuryEntrySumAggregateInputType
    _min?: TreasuryEntryMinAggregateInputType
    _max?: TreasuryEntryMaxAggregateInputType
  }

  export type TreasuryEntryGroupByOutputType = {
    id: string
    ledgerId: string
    accountId: string
    debitAmount: bigint
    creditAmount: bigint
    currency: string
    network: string
    createdAt: Date
    _count: TreasuryEntryCountAggregateOutputType | null
    _avg: TreasuryEntryAvgAggregateOutputType | null
    _sum: TreasuryEntrySumAggregateOutputType | null
    _min: TreasuryEntryMinAggregateOutputType | null
    _max: TreasuryEntryMaxAggregateOutputType | null
  }

  type GetTreasuryEntryGroupByPayload<T extends TreasuryEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TreasuryEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TreasuryEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TreasuryEntryGroupByOutputType[P]>
            : GetScalarType<T[P], TreasuryEntryGroupByOutputType[P]>
        }
      >
    >


  export type TreasuryEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ledgerId?: boolean
    accountId?: boolean
    debitAmount?: boolean
    creditAmount?: boolean
    currency?: boolean
    network?: boolean
    createdAt?: boolean
    ledger?: boolean | TreasuryLedgerDefaultArgs<ExtArgs>
    account?: boolean | TreasuryAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["treasuryEntry"]>

  export type TreasuryEntrySelectScalar = {
    id?: boolean
    ledgerId?: boolean
    accountId?: boolean
    debitAmount?: boolean
    creditAmount?: boolean
    currency?: boolean
    network?: boolean
    createdAt?: boolean
  }

  export type TreasuryEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ledger?: boolean | TreasuryLedgerDefaultArgs<ExtArgs>
    account?: boolean | TreasuryAccountDefaultArgs<ExtArgs>
  }


  export type $TreasuryEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TreasuryEntry"
    objects: {
      ledger: Prisma.$TreasuryLedgerPayload<ExtArgs>
      account: Prisma.$TreasuryAccountPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ledgerId: string
      accountId: string
      debitAmount: bigint
      creditAmount: bigint
      currency: string
      network: string
      createdAt: Date
    }, ExtArgs["result"]["treasuryEntry"]>
    composites: {}
  }


  type TreasuryEntryGetPayload<S extends boolean | null | undefined | TreasuryEntryDefaultArgs> = $Result.GetResult<Prisma.$TreasuryEntryPayload, S>

  type TreasuryEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TreasuryEntryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TreasuryEntryCountAggregateInputType | true
    }

  export interface TreasuryEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TreasuryEntry'], meta: { name: 'TreasuryEntry' } }
    /**
     * Find zero or one TreasuryEntry that matches the filter.
     * @param {TreasuryEntryFindUniqueArgs} args - Arguments to find a TreasuryEntry
     * @example
     * // Get one TreasuryEntry
     * const treasuryEntry = await prisma.treasuryEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TreasuryEntryFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, TreasuryEntryFindUniqueArgs<ExtArgs>>
    ): Prisma__TreasuryEntryClient<$Result.GetResult<Prisma.$TreasuryEntryPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one TreasuryEntry that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TreasuryEntryFindUniqueOrThrowArgs} args - Arguments to find a TreasuryEntry
     * @example
     * // Get one TreasuryEntry
     * const treasuryEntry = await prisma.treasuryEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TreasuryEntryFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TreasuryEntryFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__TreasuryEntryClient<$Result.GetResult<Prisma.$TreasuryEntryPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first TreasuryEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryEntryFindFirstArgs} args - Arguments to find a TreasuryEntry
     * @example
     * // Get one TreasuryEntry
     * const treasuryEntry = await prisma.treasuryEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TreasuryEntryFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, TreasuryEntryFindFirstArgs<ExtArgs>>
    ): Prisma__TreasuryEntryClient<$Result.GetResult<Prisma.$TreasuryEntryPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first TreasuryEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryEntryFindFirstOrThrowArgs} args - Arguments to find a TreasuryEntry
     * @example
     * // Get one TreasuryEntry
     * const treasuryEntry = await prisma.treasuryEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TreasuryEntryFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TreasuryEntryFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__TreasuryEntryClient<$Result.GetResult<Prisma.$TreasuryEntryPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more TreasuryEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryEntryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TreasuryEntries
     * const treasuryEntries = await prisma.treasuryEntry.findMany()
     * 
     * // Get first 10 TreasuryEntries
     * const treasuryEntries = await prisma.treasuryEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const treasuryEntryWithIdOnly = await prisma.treasuryEntry.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TreasuryEntryFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TreasuryEntryFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreasuryEntryPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a TreasuryEntry.
     * @param {TreasuryEntryCreateArgs} args - Arguments to create a TreasuryEntry.
     * @example
     * // Create one TreasuryEntry
     * const TreasuryEntry = await prisma.treasuryEntry.create({
     *   data: {
     *     // ... data to create a TreasuryEntry
     *   }
     * })
     * 
    **/
    create<T extends TreasuryEntryCreateArgs<ExtArgs>>(
      args: SelectSubset<T, TreasuryEntryCreateArgs<ExtArgs>>
    ): Prisma__TreasuryEntryClient<$Result.GetResult<Prisma.$TreasuryEntryPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many TreasuryEntries.
     *     @param {TreasuryEntryCreateManyArgs} args - Arguments to create many TreasuryEntries.
     *     @example
     *     // Create many TreasuryEntries
     *     const treasuryEntry = await prisma.treasuryEntry.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TreasuryEntryCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TreasuryEntryCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TreasuryEntry.
     * @param {TreasuryEntryDeleteArgs} args - Arguments to delete one TreasuryEntry.
     * @example
     * // Delete one TreasuryEntry
     * const TreasuryEntry = await prisma.treasuryEntry.delete({
     *   where: {
     *     // ... filter to delete one TreasuryEntry
     *   }
     * })
     * 
    **/
    delete<T extends TreasuryEntryDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, TreasuryEntryDeleteArgs<ExtArgs>>
    ): Prisma__TreasuryEntryClient<$Result.GetResult<Prisma.$TreasuryEntryPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one TreasuryEntry.
     * @param {TreasuryEntryUpdateArgs} args - Arguments to update one TreasuryEntry.
     * @example
     * // Update one TreasuryEntry
     * const treasuryEntry = await prisma.treasuryEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TreasuryEntryUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, TreasuryEntryUpdateArgs<ExtArgs>>
    ): Prisma__TreasuryEntryClient<$Result.GetResult<Prisma.$TreasuryEntryPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more TreasuryEntries.
     * @param {TreasuryEntryDeleteManyArgs} args - Arguments to filter TreasuryEntries to delete.
     * @example
     * // Delete a few TreasuryEntries
     * const { count } = await prisma.treasuryEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TreasuryEntryDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TreasuryEntryDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TreasuryEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TreasuryEntries
     * const treasuryEntry = await prisma.treasuryEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TreasuryEntryUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, TreasuryEntryUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TreasuryEntry.
     * @param {TreasuryEntryUpsertArgs} args - Arguments to update or create a TreasuryEntry.
     * @example
     * // Update or create a TreasuryEntry
     * const treasuryEntry = await prisma.treasuryEntry.upsert({
     *   create: {
     *     // ... data to create a TreasuryEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TreasuryEntry we want to update
     *   }
     * })
    **/
    upsert<T extends TreasuryEntryUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, TreasuryEntryUpsertArgs<ExtArgs>>
    ): Prisma__TreasuryEntryClient<$Result.GetResult<Prisma.$TreasuryEntryPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of TreasuryEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryEntryCountArgs} args - Arguments to filter TreasuryEntries to count.
     * @example
     * // Count the number of TreasuryEntries
     * const count = await prisma.treasuryEntry.count({
     *   where: {
     *     // ... the filter for the TreasuryEntries we want to count
     *   }
     * })
    **/
    count<T extends TreasuryEntryCountArgs>(
      args?: Subset<T, TreasuryEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TreasuryEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TreasuryEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TreasuryEntryAggregateArgs>(args: Subset<T, TreasuryEntryAggregateArgs>): Prisma.PrismaPromise<GetTreasuryEntryAggregateType<T>>

    /**
     * Group by TreasuryEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TreasuryEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TreasuryEntryGroupByArgs['orderBy'] }
        : { orderBy?: TreasuryEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TreasuryEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTreasuryEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TreasuryEntry model
   */
  readonly fields: TreasuryEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TreasuryEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TreasuryEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    ledger<T extends TreasuryLedgerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TreasuryLedgerDefaultArgs<ExtArgs>>): Prisma__TreasuryLedgerClient<$Result.GetResult<Prisma.$TreasuryLedgerPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    account<T extends TreasuryAccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TreasuryAccountDefaultArgs<ExtArgs>>): Prisma__TreasuryAccountClient<$Result.GetResult<Prisma.$TreasuryAccountPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the TreasuryEntry model
   */ 
  interface TreasuryEntryFieldRefs {
    readonly id: FieldRef<"TreasuryEntry", 'String'>
    readonly ledgerId: FieldRef<"TreasuryEntry", 'String'>
    readonly accountId: FieldRef<"TreasuryEntry", 'String'>
    readonly debitAmount: FieldRef<"TreasuryEntry", 'BigInt'>
    readonly creditAmount: FieldRef<"TreasuryEntry", 'BigInt'>
    readonly currency: FieldRef<"TreasuryEntry", 'String'>
    readonly network: FieldRef<"TreasuryEntry", 'String'>
    readonly createdAt: FieldRef<"TreasuryEntry", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * TreasuryEntry findUnique
   */
  export type TreasuryEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryEntry
     */
    select?: TreasuryEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryEntryInclude<ExtArgs> | null
    /**
     * Filter, which TreasuryEntry to fetch.
     */
    where: TreasuryEntryWhereUniqueInput
  }


  /**
   * TreasuryEntry findUniqueOrThrow
   */
  export type TreasuryEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryEntry
     */
    select?: TreasuryEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryEntryInclude<ExtArgs> | null
    /**
     * Filter, which TreasuryEntry to fetch.
     */
    where: TreasuryEntryWhereUniqueInput
  }


  /**
   * TreasuryEntry findFirst
   */
  export type TreasuryEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryEntry
     */
    select?: TreasuryEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryEntryInclude<ExtArgs> | null
    /**
     * Filter, which TreasuryEntry to fetch.
     */
    where?: TreasuryEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasuryEntries to fetch.
     */
    orderBy?: TreasuryEntryOrderByWithRelationInput | TreasuryEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TreasuryEntries.
     */
    cursor?: TreasuryEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasuryEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasuryEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TreasuryEntries.
     */
    distinct?: TreasuryEntryScalarFieldEnum | TreasuryEntryScalarFieldEnum[]
  }


  /**
   * TreasuryEntry findFirstOrThrow
   */
  export type TreasuryEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryEntry
     */
    select?: TreasuryEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryEntryInclude<ExtArgs> | null
    /**
     * Filter, which TreasuryEntry to fetch.
     */
    where?: TreasuryEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasuryEntries to fetch.
     */
    orderBy?: TreasuryEntryOrderByWithRelationInput | TreasuryEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TreasuryEntries.
     */
    cursor?: TreasuryEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasuryEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasuryEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TreasuryEntries.
     */
    distinct?: TreasuryEntryScalarFieldEnum | TreasuryEntryScalarFieldEnum[]
  }


  /**
   * TreasuryEntry findMany
   */
  export type TreasuryEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryEntry
     */
    select?: TreasuryEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryEntryInclude<ExtArgs> | null
    /**
     * Filter, which TreasuryEntries to fetch.
     */
    where?: TreasuryEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasuryEntries to fetch.
     */
    orderBy?: TreasuryEntryOrderByWithRelationInput | TreasuryEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TreasuryEntries.
     */
    cursor?: TreasuryEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasuryEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasuryEntries.
     */
    skip?: number
    distinct?: TreasuryEntryScalarFieldEnum | TreasuryEntryScalarFieldEnum[]
  }


  /**
   * TreasuryEntry create
   */
  export type TreasuryEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryEntry
     */
    select?: TreasuryEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a TreasuryEntry.
     */
    data: XOR<TreasuryEntryCreateInput, TreasuryEntryUncheckedCreateInput>
  }


  /**
   * TreasuryEntry createMany
   */
  export type TreasuryEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TreasuryEntries.
     */
    data: TreasuryEntryCreateManyInput | TreasuryEntryCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * TreasuryEntry update
   */
  export type TreasuryEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryEntry
     */
    select?: TreasuryEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a TreasuryEntry.
     */
    data: XOR<TreasuryEntryUpdateInput, TreasuryEntryUncheckedUpdateInput>
    /**
     * Choose, which TreasuryEntry to update.
     */
    where: TreasuryEntryWhereUniqueInput
  }


  /**
   * TreasuryEntry updateMany
   */
  export type TreasuryEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TreasuryEntries.
     */
    data: XOR<TreasuryEntryUpdateManyMutationInput, TreasuryEntryUncheckedUpdateManyInput>
    /**
     * Filter which TreasuryEntries to update
     */
    where?: TreasuryEntryWhereInput
  }


  /**
   * TreasuryEntry upsert
   */
  export type TreasuryEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryEntry
     */
    select?: TreasuryEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the TreasuryEntry to update in case it exists.
     */
    where: TreasuryEntryWhereUniqueInput
    /**
     * In case the TreasuryEntry found by the `where` argument doesn't exist, create a new TreasuryEntry with this data.
     */
    create: XOR<TreasuryEntryCreateInput, TreasuryEntryUncheckedCreateInput>
    /**
     * In case the TreasuryEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TreasuryEntryUpdateInput, TreasuryEntryUncheckedUpdateInput>
  }


  /**
   * TreasuryEntry delete
   */
  export type TreasuryEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryEntry
     */
    select?: TreasuryEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryEntryInclude<ExtArgs> | null
    /**
     * Filter which TreasuryEntry to delete.
     */
    where: TreasuryEntryWhereUniqueInput
  }


  /**
   * TreasuryEntry deleteMany
   */
  export type TreasuryEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TreasuryEntries to delete
     */
    where?: TreasuryEntryWhereInput
  }


  /**
   * TreasuryEntry without action
   */
  export type TreasuryEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryEntry
     */
    select?: TreasuryEntrySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TreasuryEntryInclude<ExtArgs> | null
  }



  /**
   * Model BalanceSnapshot
   */

  export type AggregateBalanceSnapshot = {
    _count: BalanceSnapshotCountAggregateOutputType | null
    _avg: BalanceSnapshotAvgAggregateOutputType | null
    _sum: BalanceSnapshotSumAggregateOutputType | null
    _min: BalanceSnapshotMinAggregateOutputType | null
    _max: BalanceSnapshotMaxAggregateOutputType | null
  }

  export type BalanceSnapshotAvgAggregateOutputType = {
    totalAssets: number | null
    totalLiabilities: number | null
    totalEquity: number | null
  }

  export type BalanceSnapshotSumAggregateOutputType = {
    totalAssets: bigint | null
    totalLiabilities: bigint | null
    totalEquity: bigint | null
  }

  export type BalanceSnapshotMinAggregateOutputType = {
    id: string | null
    snapshotTime: Date | null
    network: string | null
    currency: string | null
    totalAssets: bigint | null
    totalLiabilities: bigint | null
    totalEquity: bigint | null
  }

  export type BalanceSnapshotMaxAggregateOutputType = {
    id: string | null
    snapshotTime: Date | null
    network: string | null
    currency: string | null
    totalAssets: bigint | null
    totalLiabilities: bigint | null
    totalEquity: bigint | null
  }

  export type BalanceSnapshotCountAggregateOutputType = {
    id: number
    snapshotTime: number
    network: number
    currency: number
    totalAssets: number
    totalLiabilities: number
    totalEquity: number
    _all: number
  }


  export type BalanceSnapshotAvgAggregateInputType = {
    totalAssets?: true
    totalLiabilities?: true
    totalEquity?: true
  }

  export type BalanceSnapshotSumAggregateInputType = {
    totalAssets?: true
    totalLiabilities?: true
    totalEquity?: true
  }

  export type BalanceSnapshotMinAggregateInputType = {
    id?: true
    snapshotTime?: true
    network?: true
    currency?: true
    totalAssets?: true
    totalLiabilities?: true
    totalEquity?: true
  }

  export type BalanceSnapshotMaxAggregateInputType = {
    id?: true
    snapshotTime?: true
    network?: true
    currency?: true
    totalAssets?: true
    totalLiabilities?: true
    totalEquity?: true
  }

  export type BalanceSnapshotCountAggregateInputType = {
    id?: true
    snapshotTime?: true
    network?: true
    currency?: true
    totalAssets?: true
    totalLiabilities?: true
    totalEquity?: true
    _all?: true
  }

  export type BalanceSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BalanceSnapshot to aggregate.
     */
    where?: BalanceSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BalanceSnapshots to fetch.
     */
    orderBy?: BalanceSnapshotOrderByWithRelationInput | BalanceSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BalanceSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BalanceSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BalanceSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BalanceSnapshots
    **/
    _count?: true | BalanceSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BalanceSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BalanceSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BalanceSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BalanceSnapshotMaxAggregateInputType
  }

  export type GetBalanceSnapshotAggregateType<T extends BalanceSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateBalanceSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBalanceSnapshot[P]>
      : GetScalarType<T[P], AggregateBalanceSnapshot[P]>
  }




  export type BalanceSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BalanceSnapshotWhereInput
    orderBy?: BalanceSnapshotOrderByWithAggregationInput | BalanceSnapshotOrderByWithAggregationInput[]
    by: BalanceSnapshotScalarFieldEnum[] | BalanceSnapshotScalarFieldEnum
    having?: BalanceSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BalanceSnapshotCountAggregateInputType | true
    _avg?: BalanceSnapshotAvgAggregateInputType
    _sum?: BalanceSnapshotSumAggregateInputType
    _min?: BalanceSnapshotMinAggregateInputType
    _max?: BalanceSnapshotMaxAggregateInputType
  }

  export type BalanceSnapshotGroupByOutputType = {
    id: string
    snapshotTime: Date
    network: string
    currency: string
    totalAssets: bigint
    totalLiabilities: bigint
    totalEquity: bigint
    _count: BalanceSnapshotCountAggregateOutputType | null
    _avg: BalanceSnapshotAvgAggregateOutputType | null
    _sum: BalanceSnapshotSumAggregateOutputType | null
    _min: BalanceSnapshotMinAggregateOutputType | null
    _max: BalanceSnapshotMaxAggregateOutputType | null
  }

  type GetBalanceSnapshotGroupByPayload<T extends BalanceSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BalanceSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BalanceSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BalanceSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], BalanceSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type BalanceSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    snapshotTime?: boolean
    network?: boolean
    currency?: boolean
    totalAssets?: boolean
    totalLiabilities?: boolean
    totalEquity?: boolean
  }, ExtArgs["result"]["balanceSnapshot"]>

  export type BalanceSnapshotSelectScalar = {
    id?: boolean
    snapshotTime?: boolean
    network?: boolean
    currency?: boolean
    totalAssets?: boolean
    totalLiabilities?: boolean
    totalEquity?: boolean
  }


  export type $BalanceSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BalanceSnapshot"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      snapshotTime: Date
      network: string
      currency: string
      totalAssets: bigint
      totalLiabilities: bigint
      totalEquity: bigint
    }, ExtArgs["result"]["balanceSnapshot"]>
    composites: {}
  }


  type BalanceSnapshotGetPayload<S extends boolean | null | undefined | BalanceSnapshotDefaultArgs> = $Result.GetResult<Prisma.$BalanceSnapshotPayload, S>

  type BalanceSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BalanceSnapshotFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BalanceSnapshotCountAggregateInputType | true
    }

  export interface BalanceSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BalanceSnapshot'], meta: { name: 'BalanceSnapshot' } }
    /**
     * Find zero or one BalanceSnapshot that matches the filter.
     * @param {BalanceSnapshotFindUniqueArgs} args - Arguments to find a BalanceSnapshot
     * @example
     * // Get one BalanceSnapshot
     * const balanceSnapshot = await prisma.balanceSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends BalanceSnapshotFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, BalanceSnapshotFindUniqueArgs<ExtArgs>>
    ): Prisma__BalanceSnapshotClient<$Result.GetResult<Prisma.$BalanceSnapshotPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one BalanceSnapshot that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {BalanceSnapshotFindUniqueOrThrowArgs} args - Arguments to find a BalanceSnapshot
     * @example
     * // Get one BalanceSnapshot
     * const balanceSnapshot = await prisma.balanceSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends BalanceSnapshotFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, BalanceSnapshotFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__BalanceSnapshotClient<$Result.GetResult<Prisma.$BalanceSnapshotPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first BalanceSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BalanceSnapshotFindFirstArgs} args - Arguments to find a BalanceSnapshot
     * @example
     * // Get one BalanceSnapshot
     * const balanceSnapshot = await prisma.balanceSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends BalanceSnapshotFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, BalanceSnapshotFindFirstArgs<ExtArgs>>
    ): Prisma__BalanceSnapshotClient<$Result.GetResult<Prisma.$BalanceSnapshotPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first BalanceSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BalanceSnapshotFindFirstOrThrowArgs} args - Arguments to find a BalanceSnapshot
     * @example
     * // Get one BalanceSnapshot
     * const balanceSnapshot = await prisma.balanceSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends BalanceSnapshotFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, BalanceSnapshotFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__BalanceSnapshotClient<$Result.GetResult<Prisma.$BalanceSnapshotPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more BalanceSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BalanceSnapshotFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BalanceSnapshots
     * const balanceSnapshots = await prisma.balanceSnapshot.findMany()
     * 
     * // Get first 10 BalanceSnapshots
     * const balanceSnapshots = await prisma.balanceSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const balanceSnapshotWithIdOnly = await prisma.balanceSnapshot.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends BalanceSnapshotFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, BalanceSnapshotFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BalanceSnapshotPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a BalanceSnapshot.
     * @param {BalanceSnapshotCreateArgs} args - Arguments to create a BalanceSnapshot.
     * @example
     * // Create one BalanceSnapshot
     * const BalanceSnapshot = await prisma.balanceSnapshot.create({
     *   data: {
     *     // ... data to create a BalanceSnapshot
     *   }
     * })
     * 
    **/
    create<T extends BalanceSnapshotCreateArgs<ExtArgs>>(
      args: SelectSubset<T, BalanceSnapshotCreateArgs<ExtArgs>>
    ): Prisma__BalanceSnapshotClient<$Result.GetResult<Prisma.$BalanceSnapshotPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many BalanceSnapshots.
     *     @param {BalanceSnapshotCreateManyArgs} args - Arguments to create many BalanceSnapshots.
     *     @example
     *     // Create many BalanceSnapshots
     *     const balanceSnapshot = await prisma.balanceSnapshot.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends BalanceSnapshotCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, BalanceSnapshotCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a BalanceSnapshot.
     * @param {BalanceSnapshotDeleteArgs} args - Arguments to delete one BalanceSnapshot.
     * @example
     * // Delete one BalanceSnapshot
     * const BalanceSnapshot = await prisma.balanceSnapshot.delete({
     *   where: {
     *     // ... filter to delete one BalanceSnapshot
     *   }
     * })
     * 
    **/
    delete<T extends BalanceSnapshotDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, BalanceSnapshotDeleteArgs<ExtArgs>>
    ): Prisma__BalanceSnapshotClient<$Result.GetResult<Prisma.$BalanceSnapshotPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one BalanceSnapshot.
     * @param {BalanceSnapshotUpdateArgs} args - Arguments to update one BalanceSnapshot.
     * @example
     * // Update one BalanceSnapshot
     * const balanceSnapshot = await prisma.balanceSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends BalanceSnapshotUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, BalanceSnapshotUpdateArgs<ExtArgs>>
    ): Prisma__BalanceSnapshotClient<$Result.GetResult<Prisma.$BalanceSnapshotPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more BalanceSnapshots.
     * @param {BalanceSnapshotDeleteManyArgs} args - Arguments to filter BalanceSnapshots to delete.
     * @example
     * // Delete a few BalanceSnapshots
     * const { count } = await prisma.balanceSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends BalanceSnapshotDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, BalanceSnapshotDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BalanceSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BalanceSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BalanceSnapshots
     * const balanceSnapshot = await prisma.balanceSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends BalanceSnapshotUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, BalanceSnapshotUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BalanceSnapshot.
     * @param {BalanceSnapshotUpsertArgs} args - Arguments to update or create a BalanceSnapshot.
     * @example
     * // Update or create a BalanceSnapshot
     * const balanceSnapshot = await prisma.balanceSnapshot.upsert({
     *   create: {
     *     // ... data to create a BalanceSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BalanceSnapshot we want to update
     *   }
     * })
    **/
    upsert<T extends BalanceSnapshotUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, BalanceSnapshotUpsertArgs<ExtArgs>>
    ): Prisma__BalanceSnapshotClient<$Result.GetResult<Prisma.$BalanceSnapshotPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of BalanceSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BalanceSnapshotCountArgs} args - Arguments to filter BalanceSnapshots to count.
     * @example
     * // Count the number of BalanceSnapshots
     * const count = await prisma.balanceSnapshot.count({
     *   where: {
     *     // ... the filter for the BalanceSnapshots we want to count
     *   }
     * })
    **/
    count<T extends BalanceSnapshotCountArgs>(
      args?: Subset<T, BalanceSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BalanceSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BalanceSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BalanceSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BalanceSnapshotAggregateArgs>(args: Subset<T, BalanceSnapshotAggregateArgs>): Prisma.PrismaPromise<GetBalanceSnapshotAggregateType<T>>

    /**
     * Group by BalanceSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BalanceSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BalanceSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BalanceSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: BalanceSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BalanceSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBalanceSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BalanceSnapshot model
   */
  readonly fields: BalanceSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BalanceSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BalanceSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the BalanceSnapshot model
   */ 
  interface BalanceSnapshotFieldRefs {
    readonly id: FieldRef<"BalanceSnapshot", 'String'>
    readonly snapshotTime: FieldRef<"BalanceSnapshot", 'DateTime'>
    readonly network: FieldRef<"BalanceSnapshot", 'String'>
    readonly currency: FieldRef<"BalanceSnapshot", 'String'>
    readonly totalAssets: FieldRef<"BalanceSnapshot", 'BigInt'>
    readonly totalLiabilities: FieldRef<"BalanceSnapshot", 'BigInt'>
    readonly totalEquity: FieldRef<"BalanceSnapshot", 'BigInt'>
  }
    

  // Custom InputTypes

  /**
   * BalanceSnapshot findUnique
   */
  export type BalanceSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BalanceSnapshot
     */
    select?: BalanceSnapshotSelect<ExtArgs> | null
    /**
     * Filter, which BalanceSnapshot to fetch.
     */
    where: BalanceSnapshotWhereUniqueInput
  }


  /**
   * BalanceSnapshot findUniqueOrThrow
   */
  export type BalanceSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BalanceSnapshot
     */
    select?: BalanceSnapshotSelect<ExtArgs> | null
    /**
     * Filter, which BalanceSnapshot to fetch.
     */
    where: BalanceSnapshotWhereUniqueInput
  }


  /**
   * BalanceSnapshot findFirst
   */
  export type BalanceSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BalanceSnapshot
     */
    select?: BalanceSnapshotSelect<ExtArgs> | null
    /**
     * Filter, which BalanceSnapshot to fetch.
     */
    where?: BalanceSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BalanceSnapshots to fetch.
     */
    orderBy?: BalanceSnapshotOrderByWithRelationInput | BalanceSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BalanceSnapshots.
     */
    cursor?: BalanceSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BalanceSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BalanceSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BalanceSnapshots.
     */
    distinct?: BalanceSnapshotScalarFieldEnum | BalanceSnapshotScalarFieldEnum[]
  }


  /**
   * BalanceSnapshot findFirstOrThrow
   */
  export type BalanceSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BalanceSnapshot
     */
    select?: BalanceSnapshotSelect<ExtArgs> | null
    /**
     * Filter, which BalanceSnapshot to fetch.
     */
    where?: BalanceSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BalanceSnapshots to fetch.
     */
    orderBy?: BalanceSnapshotOrderByWithRelationInput | BalanceSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BalanceSnapshots.
     */
    cursor?: BalanceSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BalanceSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BalanceSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BalanceSnapshots.
     */
    distinct?: BalanceSnapshotScalarFieldEnum | BalanceSnapshotScalarFieldEnum[]
  }


  /**
   * BalanceSnapshot findMany
   */
  export type BalanceSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BalanceSnapshot
     */
    select?: BalanceSnapshotSelect<ExtArgs> | null
    /**
     * Filter, which BalanceSnapshots to fetch.
     */
    where?: BalanceSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BalanceSnapshots to fetch.
     */
    orderBy?: BalanceSnapshotOrderByWithRelationInput | BalanceSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BalanceSnapshots.
     */
    cursor?: BalanceSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BalanceSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BalanceSnapshots.
     */
    skip?: number
    distinct?: BalanceSnapshotScalarFieldEnum | BalanceSnapshotScalarFieldEnum[]
  }


  /**
   * BalanceSnapshot create
   */
  export type BalanceSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BalanceSnapshot
     */
    select?: BalanceSnapshotSelect<ExtArgs> | null
    /**
     * The data needed to create a BalanceSnapshot.
     */
    data: XOR<BalanceSnapshotCreateInput, BalanceSnapshotUncheckedCreateInput>
  }


  /**
   * BalanceSnapshot createMany
   */
  export type BalanceSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BalanceSnapshots.
     */
    data: BalanceSnapshotCreateManyInput | BalanceSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * BalanceSnapshot update
   */
  export type BalanceSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BalanceSnapshot
     */
    select?: BalanceSnapshotSelect<ExtArgs> | null
    /**
     * The data needed to update a BalanceSnapshot.
     */
    data: XOR<BalanceSnapshotUpdateInput, BalanceSnapshotUncheckedUpdateInput>
    /**
     * Choose, which BalanceSnapshot to update.
     */
    where: BalanceSnapshotWhereUniqueInput
  }


  /**
   * BalanceSnapshot updateMany
   */
  export type BalanceSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BalanceSnapshots.
     */
    data: XOR<BalanceSnapshotUpdateManyMutationInput, BalanceSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which BalanceSnapshots to update
     */
    where?: BalanceSnapshotWhereInput
  }


  /**
   * BalanceSnapshot upsert
   */
  export type BalanceSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BalanceSnapshot
     */
    select?: BalanceSnapshotSelect<ExtArgs> | null
    /**
     * The filter to search for the BalanceSnapshot to update in case it exists.
     */
    where: BalanceSnapshotWhereUniqueInput
    /**
     * In case the BalanceSnapshot found by the `where` argument doesn't exist, create a new BalanceSnapshot with this data.
     */
    create: XOR<BalanceSnapshotCreateInput, BalanceSnapshotUncheckedCreateInput>
    /**
     * In case the BalanceSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BalanceSnapshotUpdateInput, BalanceSnapshotUncheckedUpdateInput>
  }


  /**
   * BalanceSnapshot delete
   */
  export type BalanceSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BalanceSnapshot
     */
    select?: BalanceSnapshotSelect<ExtArgs> | null
    /**
     * Filter which BalanceSnapshot to delete.
     */
    where: BalanceSnapshotWhereUniqueInput
  }


  /**
   * BalanceSnapshot deleteMany
   */
  export type BalanceSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BalanceSnapshots to delete
     */
    where?: BalanceSnapshotWhereInput
  }


  /**
   * BalanceSnapshot without action
   */
  export type BalanceSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BalanceSnapshot
     */
    select?: BalanceSnapshotSelect<ExtArgs> | null
  }



  /**
   * Model TreasuryState
   */

  export type AggregateTreasuryState = {
    _count: TreasuryStateCountAggregateOutputType | null
    _min: TreasuryStateMinAggregateOutputType | null
    _max: TreasuryStateMaxAggregateOutputType | null
  }

  export type TreasuryStateMinAggregateOutputType = {
    chain: string | null
    totalOnchainBalance: string | null
    totalUserLiabilities: string | null
    sweepableBalance: string | null
    lastSyncedAt: Date | null
    locked: boolean | null
    lockedAt: Date | null
    lockedBy: string | null
  }

  export type TreasuryStateMaxAggregateOutputType = {
    chain: string | null
    totalOnchainBalance: string | null
    totalUserLiabilities: string | null
    sweepableBalance: string | null
    lastSyncedAt: Date | null
    locked: boolean | null
    lockedAt: Date | null
    lockedBy: string | null
  }

  export type TreasuryStateCountAggregateOutputType = {
    chain: number
    totalOnchainBalance: number
    totalUserLiabilities: number
    sweepableBalance: number
    lastSyncedAt: number
    locked: number
    lockedAt: number
    lockedBy: number
    _all: number
  }


  export type TreasuryStateMinAggregateInputType = {
    chain?: true
    totalOnchainBalance?: true
    totalUserLiabilities?: true
    sweepableBalance?: true
    lastSyncedAt?: true
    locked?: true
    lockedAt?: true
    lockedBy?: true
  }

  export type TreasuryStateMaxAggregateInputType = {
    chain?: true
    totalOnchainBalance?: true
    totalUserLiabilities?: true
    sweepableBalance?: true
    lastSyncedAt?: true
    locked?: true
    lockedAt?: true
    lockedBy?: true
  }

  export type TreasuryStateCountAggregateInputType = {
    chain?: true
    totalOnchainBalance?: true
    totalUserLiabilities?: true
    sweepableBalance?: true
    lastSyncedAt?: true
    locked?: true
    lockedAt?: true
    lockedBy?: true
    _all?: true
  }

  export type TreasuryStateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TreasuryState to aggregate.
     */
    where?: TreasuryStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasuryStates to fetch.
     */
    orderBy?: TreasuryStateOrderByWithRelationInput | TreasuryStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TreasuryStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasuryStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasuryStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TreasuryStates
    **/
    _count?: true | TreasuryStateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TreasuryStateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TreasuryStateMaxAggregateInputType
  }

  export type GetTreasuryStateAggregateType<T extends TreasuryStateAggregateArgs> = {
        [P in keyof T & keyof AggregateTreasuryState]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTreasuryState[P]>
      : GetScalarType<T[P], AggregateTreasuryState[P]>
  }




  export type TreasuryStateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TreasuryStateWhereInput
    orderBy?: TreasuryStateOrderByWithAggregationInput | TreasuryStateOrderByWithAggregationInput[]
    by: TreasuryStateScalarFieldEnum[] | TreasuryStateScalarFieldEnum
    having?: TreasuryStateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TreasuryStateCountAggregateInputType | true
    _min?: TreasuryStateMinAggregateInputType
    _max?: TreasuryStateMaxAggregateInputType
  }

  export type TreasuryStateGroupByOutputType = {
    chain: string
    totalOnchainBalance: string
    totalUserLiabilities: string
    sweepableBalance: string
    lastSyncedAt: Date
    locked: boolean
    lockedAt: Date | null
    lockedBy: string | null
    _count: TreasuryStateCountAggregateOutputType | null
    _min: TreasuryStateMinAggregateOutputType | null
    _max: TreasuryStateMaxAggregateOutputType | null
  }

  type GetTreasuryStateGroupByPayload<T extends TreasuryStateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TreasuryStateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TreasuryStateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TreasuryStateGroupByOutputType[P]>
            : GetScalarType<T[P], TreasuryStateGroupByOutputType[P]>
        }
      >
    >


  export type TreasuryStateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chain?: boolean
    totalOnchainBalance?: boolean
    totalUserLiabilities?: boolean
    sweepableBalance?: boolean
    lastSyncedAt?: boolean
    locked?: boolean
    lockedAt?: boolean
    lockedBy?: boolean
  }, ExtArgs["result"]["treasuryState"]>

  export type TreasuryStateSelectScalar = {
    chain?: boolean
    totalOnchainBalance?: boolean
    totalUserLiabilities?: boolean
    sweepableBalance?: boolean
    lastSyncedAt?: boolean
    locked?: boolean
    lockedAt?: boolean
    lockedBy?: boolean
  }


  export type $TreasuryStatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TreasuryState"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      chain: string
      totalOnchainBalance: string
      totalUserLiabilities: string
      sweepableBalance: string
      lastSyncedAt: Date
      locked: boolean
      lockedAt: Date | null
      lockedBy: string | null
    }, ExtArgs["result"]["treasuryState"]>
    composites: {}
  }


  type TreasuryStateGetPayload<S extends boolean | null | undefined | TreasuryStateDefaultArgs> = $Result.GetResult<Prisma.$TreasuryStatePayload, S>

  type TreasuryStateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TreasuryStateFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TreasuryStateCountAggregateInputType | true
    }

  export interface TreasuryStateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TreasuryState'], meta: { name: 'TreasuryState' } }
    /**
     * Find zero or one TreasuryState that matches the filter.
     * @param {TreasuryStateFindUniqueArgs} args - Arguments to find a TreasuryState
     * @example
     * // Get one TreasuryState
     * const treasuryState = await prisma.treasuryState.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TreasuryStateFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, TreasuryStateFindUniqueArgs<ExtArgs>>
    ): Prisma__TreasuryStateClient<$Result.GetResult<Prisma.$TreasuryStatePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one TreasuryState that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TreasuryStateFindUniqueOrThrowArgs} args - Arguments to find a TreasuryState
     * @example
     * // Get one TreasuryState
     * const treasuryState = await prisma.treasuryState.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TreasuryStateFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TreasuryStateFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__TreasuryStateClient<$Result.GetResult<Prisma.$TreasuryStatePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first TreasuryState that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryStateFindFirstArgs} args - Arguments to find a TreasuryState
     * @example
     * // Get one TreasuryState
     * const treasuryState = await prisma.treasuryState.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TreasuryStateFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, TreasuryStateFindFirstArgs<ExtArgs>>
    ): Prisma__TreasuryStateClient<$Result.GetResult<Prisma.$TreasuryStatePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first TreasuryState that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryStateFindFirstOrThrowArgs} args - Arguments to find a TreasuryState
     * @example
     * // Get one TreasuryState
     * const treasuryState = await prisma.treasuryState.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TreasuryStateFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TreasuryStateFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__TreasuryStateClient<$Result.GetResult<Prisma.$TreasuryStatePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more TreasuryStates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryStateFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TreasuryStates
     * const treasuryStates = await prisma.treasuryState.findMany()
     * 
     * // Get first 10 TreasuryStates
     * const treasuryStates = await prisma.treasuryState.findMany({ take: 10 })
     * 
     * // Only select the `chain`
     * const treasuryStateWithChainOnly = await prisma.treasuryState.findMany({ select: { chain: true } })
     * 
    **/
    findMany<T extends TreasuryStateFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TreasuryStateFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreasuryStatePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a TreasuryState.
     * @param {TreasuryStateCreateArgs} args - Arguments to create a TreasuryState.
     * @example
     * // Create one TreasuryState
     * const TreasuryState = await prisma.treasuryState.create({
     *   data: {
     *     // ... data to create a TreasuryState
     *   }
     * })
     * 
    **/
    create<T extends TreasuryStateCreateArgs<ExtArgs>>(
      args: SelectSubset<T, TreasuryStateCreateArgs<ExtArgs>>
    ): Prisma__TreasuryStateClient<$Result.GetResult<Prisma.$TreasuryStatePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many TreasuryStates.
     *     @param {TreasuryStateCreateManyArgs} args - Arguments to create many TreasuryStates.
     *     @example
     *     // Create many TreasuryStates
     *     const treasuryState = await prisma.treasuryState.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TreasuryStateCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TreasuryStateCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TreasuryState.
     * @param {TreasuryStateDeleteArgs} args - Arguments to delete one TreasuryState.
     * @example
     * // Delete one TreasuryState
     * const TreasuryState = await prisma.treasuryState.delete({
     *   where: {
     *     // ... filter to delete one TreasuryState
     *   }
     * })
     * 
    **/
    delete<T extends TreasuryStateDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, TreasuryStateDeleteArgs<ExtArgs>>
    ): Prisma__TreasuryStateClient<$Result.GetResult<Prisma.$TreasuryStatePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one TreasuryState.
     * @param {TreasuryStateUpdateArgs} args - Arguments to update one TreasuryState.
     * @example
     * // Update one TreasuryState
     * const treasuryState = await prisma.treasuryState.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TreasuryStateUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, TreasuryStateUpdateArgs<ExtArgs>>
    ): Prisma__TreasuryStateClient<$Result.GetResult<Prisma.$TreasuryStatePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more TreasuryStates.
     * @param {TreasuryStateDeleteManyArgs} args - Arguments to filter TreasuryStates to delete.
     * @example
     * // Delete a few TreasuryStates
     * const { count } = await prisma.treasuryState.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TreasuryStateDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TreasuryStateDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TreasuryStates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryStateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TreasuryStates
     * const treasuryState = await prisma.treasuryState.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TreasuryStateUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, TreasuryStateUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TreasuryState.
     * @param {TreasuryStateUpsertArgs} args - Arguments to update or create a TreasuryState.
     * @example
     * // Update or create a TreasuryState
     * const treasuryState = await prisma.treasuryState.upsert({
     *   create: {
     *     // ... data to create a TreasuryState
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TreasuryState we want to update
     *   }
     * })
    **/
    upsert<T extends TreasuryStateUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, TreasuryStateUpsertArgs<ExtArgs>>
    ): Prisma__TreasuryStateClient<$Result.GetResult<Prisma.$TreasuryStatePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of TreasuryStates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryStateCountArgs} args - Arguments to filter TreasuryStates to count.
     * @example
     * // Count the number of TreasuryStates
     * const count = await prisma.treasuryState.count({
     *   where: {
     *     // ... the filter for the TreasuryStates we want to count
     *   }
     * })
    **/
    count<T extends TreasuryStateCountArgs>(
      args?: Subset<T, TreasuryStateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TreasuryStateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TreasuryState.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryStateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TreasuryStateAggregateArgs>(args: Subset<T, TreasuryStateAggregateArgs>): Prisma.PrismaPromise<GetTreasuryStateAggregateType<T>>

    /**
     * Group by TreasuryState.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreasuryStateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TreasuryStateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TreasuryStateGroupByArgs['orderBy'] }
        : { orderBy?: TreasuryStateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TreasuryStateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTreasuryStateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TreasuryState model
   */
  readonly fields: TreasuryStateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TreasuryState.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TreasuryStateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the TreasuryState model
   */ 
  interface TreasuryStateFieldRefs {
    readonly chain: FieldRef<"TreasuryState", 'String'>
    readonly totalOnchainBalance: FieldRef<"TreasuryState", 'String'>
    readonly totalUserLiabilities: FieldRef<"TreasuryState", 'String'>
    readonly sweepableBalance: FieldRef<"TreasuryState", 'String'>
    readonly lastSyncedAt: FieldRef<"TreasuryState", 'DateTime'>
    readonly locked: FieldRef<"TreasuryState", 'Boolean'>
    readonly lockedAt: FieldRef<"TreasuryState", 'DateTime'>
    readonly lockedBy: FieldRef<"TreasuryState", 'String'>
  }
    

  // Custom InputTypes

  /**
   * TreasuryState findUnique
   */
  export type TreasuryStateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryState
     */
    select?: TreasuryStateSelect<ExtArgs> | null
    /**
     * Filter, which TreasuryState to fetch.
     */
    where: TreasuryStateWhereUniqueInput
  }


  /**
   * TreasuryState findUniqueOrThrow
   */
  export type TreasuryStateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryState
     */
    select?: TreasuryStateSelect<ExtArgs> | null
    /**
     * Filter, which TreasuryState to fetch.
     */
    where: TreasuryStateWhereUniqueInput
  }


  /**
   * TreasuryState findFirst
   */
  export type TreasuryStateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryState
     */
    select?: TreasuryStateSelect<ExtArgs> | null
    /**
     * Filter, which TreasuryState to fetch.
     */
    where?: TreasuryStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasuryStates to fetch.
     */
    orderBy?: TreasuryStateOrderByWithRelationInput | TreasuryStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TreasuryStates.
     */
    cursor?: TreasuryStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasuryStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasuryStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TreasuryStates.
     */
    distinct?: TreasuryStateScalarFieldEnum | TreasuryStateScalarFieldEnum[]
  }


  /**
   * TreasuryState findFirstOrThrow
   */
  export type TreasuryStateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryState
     */
    select?: TreasuryStateSelect<ExtArgs> | null
    /**
     * Filter, which TreasuryState to fetch.
     */
    where?: TreasuryStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasuryStates to fetch.
     */
    orderBy?: TreasuryStateOrderByWithRelationInput | TreasuryStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TreasuryStates.
     */
    cursor?: TreasuryStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasuryStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasuryStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TreasuryStates.
     */
    distinct?: TreasuryStateScalarFieldEnum | TreasuryStateScalarFieldEnum[]
  }


  /**
   * TreasuryState findMany
   */
  export type TreasuryStateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryState
     */
    select?: TreasuryStateSelect<ExtArgs> | null
    /**
     * Filter, which TreasuryStates to fetch.
     */
    where?: TreasuryStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TreasuryStates to fetch.
     */
    orderBy?: TreasuryStateOrderByWithRelationInput | TreasuryStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TreasuryStates.
     */
    cursor?: TreasuryStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TreasuryStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TreasuryStates.
     */
    skip?: number
    distinct?: TreasuryStateScalarFieldEnum | TreasuryStateScalarFieldEnum[]
  }


  /**
   * TreasuryState create
   */
  export type TreasuryStateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryState
     */
    select?: TreasuryStateSelect<ExtArgs> | null
    /**
     * The data needed to create a TreasuryState.
     */
    data: XOR<TreasuryStateCreateInput, TreasuryStateUncheckedCreateInput>
  }


  /**
   * TreasuryState createMany
   */
  export type TreasuryStateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TreasuryStates.
     */
    data: TreasuryStateCreateManyInput | TreasuryStateCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * TreasuryState update
   */
  export type TreasuryStateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryState
     */
    select?: TreasuryStateSelect<ExtArgs> | null
    /**
     * The data needed to update a TreasuryState.
     */
    data: XOR<TreasuryStateUpdateInput, TreasuryStateUncheckedUpdateInput>
    /**
     * Choose, which TreasuryState to update.
     */
    where: TreasuryStateWhereUniqueInput
  }


  /**
   * TreasuryState updateMany
   */
  export type TreasuryStateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TreasuryStates.
     */
    data: XOR<TreasuryStateUpdateManyMutationInput, TreasuryStateUncheckedUpdateManyInput>
    /**
     * Filter which TreasuryStates to update
     */
    where?: TreasuryStateWhereInput
  }


  /**
   * TreasuryState upsert
   */
  export type TreasuryStateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryState
     */
    select?: TreasuryStateSelect<ExtArgs> | null
    /**
     * The filter to search for the TreasuryState to update in case it exists.
     */
    where: TreasuryStateWhereUniqueInput
    /**
     * In case the TreasuryState found by the `where` argument doesn't exist, create a new TreasuryState with this data.
     */
    create: XOR<TreasuryStateCreateInput, TreasuryStateUncheckedCreateInput>
    /**
     * In case the TreasuryState was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TreasuryStateUpdateInput, TreasuryStateUncheckedUpdateInput>
  }


  /**
   * TreasuryState delete
   */
  export type TreasuryStateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryState
     */
    select?: TreasuryStateSelect<ExtArgs> | null
    /**
     * Filter which TreasuryState to delete.
     */
    where: TreasuryStateWhereUniqueInput
  }


  /**
   * TreasuryState deleteMany
   */
  export type TreasuryStateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TreasuryStates to delete
     */
    where?: TreasuryStateWhereInput
  }


  /**
   * TreasuryState without action
   */
  export type TreasuryStateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreasuryState
     */
    select?: TreasuryStateSelect<ExtArgs> | null
  }



  /**
   * Model Sweep
   */

  export type AggregateSweep = {
    _count: SweepCountAggregateOutputType | null
    _min: SweepMinAggregateOutputType | null
    _max: SweepMaxAggregateOutputType | null
  }

  export type SweepMinAggregateOutputType = {
    id: string | null
    chain: string | null
    amount: string | null
    amountRaw: string | null
    fromWallet: string | null
    toWallet: string | null
    txHash: string | null
    status: $Enums.SweepStatus | null
    initiatedBy: string | null
    error: string | null
    createdAt: Date | null
    confirmedAt: Date | null
  }

  export type SweepMaxAggregateOutputType = {
    id: string | null
    chain: string | null
    amount: string | null
    amountRaw: string | null
    fromWallet: string | null
    toWallet: string | null
    txHash: string | null
    status: $Enums.SweepStatus | null
    initiatedBy: string | null
    error: string | null
    createdAt: Date | null
    confirmedAt: Date | null
  }

  export type SweepCountAggregateOutputType = {
    id: number
    chain: number
    amount: number
    amountRaw: number
    fromWallet: number
    toWallet: number
    txHash: number
    status: number
    initiatedBy: number
    error: number
    createdAt: number
    confirmedAt: number
    _all: number
  }


  export type SweepMinAggregateInputType = {
    id?: true
    chain?: true
    amount?: true
    amountRaw?: true
    fromWallet?: true
    toWallet?: true
    txHash?: true
    status?: true
    initiatedBy?: true
    error?: true
    createdAt?: true
    confirmedAt?: true
  }

  export type SweepMaxAggregateInputType = {
    id?: true
    chain?: true
    amount?: true
    amountRaw?: true
    fromWallet?: true
    toWallet?: true
    txHash?: true
    status?: true
    initiatedBy?: true
    error?: true
    createdAt?: true
    confirmedAt?: true
  }

  export type SweepCountAggregateInputType = {
    id?: true
    chain?: true
    amount?: true
    amountRaw?: true
    fromWallet?: true
    toWallet?: true
    txHash?: true
    status?: true
    initiatedBy?: true
    error?: true
    createdAt?: true
    confirmedAt?: true
    _all?: true
  }

  export type SweepAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sweep to aggregate.
     */
    where?: SweepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sweeps to fetch.
     */
    orderBy?: SweepOrderByWithRelationInput | SweepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SweepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sweeps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sweeps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sweeps
    **/
    _count?: true | SweepCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SweepMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SweepMaxAggregateInputType
  }

  export type GetSweepAggregateType<T extends SweepAggregateArgs> = {
        [P in keyof T & keyof AggregateSweep]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSweep[P]>
      : GetScalarType<T[P], AggregateSweep[P]>
  }




  export type SweepGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SweepWhereInput
    orderBy?: SweepOrderByWithAggregationInput | SweepOrderByWithAggregationInput[]
    by: SweepScalarFieldEnum[] | SweepScalarFieldEnum
    having?: SweepScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SweepCountAggregateInputType | true
    _min?: SweepMinAggregateInputType
    _max?: SweepMaxAggregateInputType
  }

  export type SweepGroupByOutputType = {
    id: string
    chain: string
    amount: string
    amountRaw: string
    fromWallet: string
    toWallet: string
    txHash: string | null
    status: $Enums.SweepStatus
    initiatedBy: string
    error: string | null
    createdAt: Date
    confirmedAt: Date | null
    _count: SweepCountAggregateOutputType | null
    _min: SweepMinAggregateOutputType | null
    _max: SweepMaxAggregateOutputType | null
  }

  type GetSweepGroupByPayload<T extends SweepGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SweepGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SweepGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SweepGroupByOutputType[P]>
            : GetScalarType<T[P], SweepGroupByOutputType[P]>
        }
      >
    >


  export type SweepSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chain?: boolean
    amount?: boolean
    amountRaw?: boolean
    fromWallet?: boolean
    toWallet?: boolean
    txHash?: boolean
    status?: boolean
    initiatedBy?: boolean
    error?: boolean
    createdAt?: boolean
    confirmedAt?: boolean
  }, ExtArgs["result"]["sweep"]>

  export type SweepSelectScalar = {
    id?: boolean
    chain?: boolean
    amount?: boolean
    amountRaw?: boolean
    fromWallet?: boolean
    toWallet?: boolean
    txHash?: boolean
    status?: boolean
    initiatedBy?: boolean
    error?: boolean
    createdAt?: boolean
    confirmedAt?: boolean
  }


  export type $SweepPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sweep"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chain: string
      amount: string
      amountRaw: string
      fromWallet: string
      toWallet: string
      txHash: string | null
      status: $Enums.SweepStatus
      initiatedBy: string
      error: string | null
      createdAt: Date
      confirmedAt: Date | null
    }, ExtArgs["result"]["sweep"]>
    composites: {}
  }


  type SweepGetPayload<S extends boolean | null | undefined | SweepDefaultArgs> = $Result.GetResult<Prisma.$SweepPayload, S>

  type SweepCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SweepFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SweepCountAggregateInputType | true
    }

  export interface SweepDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sweep'], meta: { name: 'Sweep' } }
    /**
     * Find zero or one Sweep that matches the filter.
     * @param {SweepFindUniqueArgs} args - Arguments to find a Sweep
     * @example
     * // Get one Sweep
     * const sweep = await prisma.sweep.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SweepFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, SweepFindUniqueArgs<ExtArgs>>
    ): Prisma__SweepClient<$Result.GetResult<Prisma.$SweepPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Sweep that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {SweepFindUniqueOrThrowArgs} args - Arguments to find a Sweep
     * @example
     * // Get one Sweep
     * const sweep = await prisma.sweep.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SweepFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SweepFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SweepClient<$Result.GetResult<Prisma.$SweepPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Sweep that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SweepFindFirstArgs} args - Arguments to find a Sweep
     * @example
     * // Get one Sweep
     * const sweep = await prisma.sweep.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SweepFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, SweepFindFirstArgs<ExtArgs>>
    ): Prisma__SweepClient<$Result.GetResult<Prisma.$SweepPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Sweep that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SweepFindFirstOrThrowArgs} args - Arguments to find a Sweep
     * @example
     * // Get one Sweep
     * const sweep = await prisma.sweep.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SweepFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SweepFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SweepClient<$Result.GetResult<Prisma.$SweepPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Sweeps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SweepFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sweeps
     * const sweeps = await prisma.sweep.findMany()
     * 
     * // Get first 10 Sweeps
     * const sweeps = await prisma.sweep.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sweepWithIdOnly = await prisma.sweep.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends SweepFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SweepFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SweepPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Sweep.
     * @param {SweepCreateArgs} args - Arguments to create a Sweep.
     * @example
     * // Create one Sweep
     * const Sweep = await prisma.sweep.create({
     *   data: {
     *     // ... data to create a Sweep
     *   }
     * })
     * 
    **/
    create<T extends SweepCreateArgs<ExtArgs>>(
      args: SelectSubset<T, SweepCreateArgs<ExtArgs>>
    ): Prisma__SweepClient<$Result.GetResult<Prisma.$SweepPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Sweeps.
     *     @param {SweepCreateManyArgs} args - Arguments to create many Sweeps.
     *     @example
     *     // Create many Sweeps
     *     const sweep = await prisma.sweep.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SweepCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SweepCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Sweep.
     * @param {SweepDeleteArgs} args - Arguments to delete one Sweep.
     * @example
     * // Delete one Sweep
     * const Sweep = await prisma.sweep.delete({
     *   where: {
     *     // ... filter to delete one Sweep
     *   }
     * })
     * 
    **/
    delete<T extends SweepDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, SweepDeleteArgs<ExtArgs>>
    ): Prisma__SweepClient<$Result.GetResult<Prisma.$SweepPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Sweep.
     * @param {SweepUpdateArgs} args - Arguments to update one Sweep.
     * @example
     * // Update one Sweep
     * const sweep = await prisma.sweep.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SweepUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, SweepUpdateArgs<ExtArgs>>
    ): Prisma__SweepClient<$Result.GetResult<Prisma.$SweepPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Sweeps.
     * @param {SweepDeleteManyArgs} args - Arguments to filter Sweeps to delete.
     * @example
     * // Delete a few Sweeps
     * const { count } = await prisma.sweep.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SweepDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SweepDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sweeps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SweepUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sweeps
     * const sweep = await prisma.sweep.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SweepUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, SweepUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Sweep.
     * @param {SweepUpsertArgs} args - Arguments to update or create a Sweep.
     * @example
     * // Update or create a Sweep
     * const sweep = await prisma.sweep.upsert({
     *   create: {
     *     // ... data to create a Sweep
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sweep we want to update
     *   }
     * })
    **/
    upsert<T extends SweepUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, SweepUpsertArgs<ExtArgs>>
    ): Prisma__SweepClient<$Result.GetResult<Prisma.$SweepPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Sweeps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SweepCountArgs} args - Arguments to filter Sweeps to count.
     * @example
     * // Count the number of Sweeps
     * const count = await prisma.sweep.count({
     *   where: {
     *     // ... the filter for the Sweeps we want to count
     *   }
     * })
    **/
    count<T extends SweepCountArgs>(
      args?: Subset<T, SweepCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SweepCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sweep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SweepAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SweepAggregateArgs>(args: Subset<T, SweepAggregateArgs>): Prisma.PrismaPromise<GetSweepAggregateType<T>>

    /**
     * Group by Sweep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SweepGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SweepGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SweepGroupByArgs['orderBy'] }
        : { orderBy?: SweepGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SweepGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSweepGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sweep model
   */
  readonly fields: SweepFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sweep.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SweepClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Sweep model
   */ 
  interface SweepFieldRefs {
    readonly id: FieldRef<"Sweep", 'String'>
    readonly chain: FieldRef<"Sweep", 'String'>
    readonly amount: FieldRef<"Sweep", 'String'>
    readonly amountRaw: FieldRef<"Sweep", 'String'>
    readonly fromWallet: FieldRef<"Sweep", 'String'>
    readonly toWallet: FieldRef<"Sweep", 'String'>
    readonly txHash: FieldRef<"Sweep", 'String'>
    readonly status: FieldRef<"Sweep", 'SweepStatus'>
    readonly initiatedBy: FieldRef<"Sweep", 'String'>
    readonly error: FieldRef<"Sweep", 'String'>
    readonly createdAt: FieldRef<"Sweep", 'DateTime'>
    readonly confirmedAt: FieldRef<"Sweep", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * Sweep findUnique
   */
  export type SweepFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sweep
     */
    select?: SweepSelect<ExtArgs> | null
    /**
     * Filter, which Sweep to fetch.
     */
    where: SweepWhereUniqueInput
  }


  /**
   * Sweep findUniqueOrThrow
   */
  export type SweepFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sweep
     */
    select?: SweepSelect<ExtArgs> | null
    /**
     * Filter, which Sweep to fetch.
     */
    where: SweepWhereUniqueInput
  }


  /**
   * Sweep findFirst
   */
  export type SweepFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sweep
     */
    select?: SweepSelect<ExtArgs> | null
    /**
     * Filter, which Sweep to fetch.
     */
    where?: SweepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sweeps to fetch.
     */
    orderBy?: SweepOrderByWithRelationInput | SweepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sweeps.
     */
    cursor?: SweepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sweeps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sweeps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sweeps.
     */
    distinct?: SweepScalarFieldEnum | SweepScalarFieldEnum[]
  }


  /**
   * Sweep findFirstOrThrow
   */
  export type SweepFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sweep
     */
    select?: SweepSelect<ExtArgs> | null
    /**
     * Filter, which Sweep to fetch.
     */
    where?: SweepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sweeps to fetch.
     */
    orderBy?: SweepOrderByWithRelationInput | SweepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sweeps.
     */
    cursor?: SweepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sweeps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sweeps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sweeps.
     */
    distinct?: SweepScalarFieldEnum | SweepScalarFieldEnum[]
  }


  /**
   * Sweep findMany
   */
  export type SweepFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sweep
     */
    select?: SweepSelect<ExtArgs> | null
    /**
     * Filter, which Sweeps to fetch.
     */
    where?: SweepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sweeps to fetch.
     */
    orderBy?: SweepOrderByWithRelationInput | SweepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sweeps.
     */
    cursor?: SweepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sweeps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sweeps.
     */
    skip?: number
    distinct?: SweepScalarFieldEnum | SweepScalarFieldEnum[]
  }


  /**
   * Sweep create
   */
  export type SweepCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sweep
     */
    select?: SweepSelect<ExtArgs> | null
    /**
     * The data needed to create a Sweep.
     */
    data: XOR<SweepCreateInput, SweepUncheckedCreateInput>
  }


  /**
   * Sweep createMany
   */
  export type SweepCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sweeps.
     */
    data: SweepCreateManyInput | SweepCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Sweep update
   */
  export type SweepUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sweep
     */
    select?: SweepSelect<ExtArgs> | null
    /**
     * The data needed to update a Sweep.
     */
    data: XOR<SweepUpdateInput, SweepUncheckedUpdateInput>
    /**
     * Choose, which Sweep to update.
     */
    where: SweepWhereUniqueInput
  }


  /**
   * Sweep updateMany
   */
  export type SweepUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sweeps.
     */
    data: XOR<SweepUpdateManyMutationInput, SweepUncheckedUpdateManyInput>
    /**
     * Filter which Sweeps to update
     */
    where?: SweepWhereInput
  }


  /**
   * Sweep upsert
   */
  export type SweepUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sweep
     */
    select?: SweepSelect<ExtArgs> | null
    /**
     * The filter to search for the Sweep to update in case it exists.
     */
    where: SweepWhereUniqueInput
    /**
     * In case the Sweep found by the `where` argument doesn't exist, create a new Sweep with this data.
     */
    create: XOR<SweepCreateInput, SweepUncheckedCreateInput>
    /**
     * In case the Sweep was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SweepUpdateInput, SweepUncheckedUpdateInput>
  }


  /**
   * Sweep delete
   */
  export type SweepDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sweep
     */
    select?: SweepSelect<ExtArgs> | null
    /**
     * Filter which Sweep to delete.
     */
    where: SweepWhereUniqueInput
  }


  /**
   * Sweep deleteMany
   */
  export type SweepDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sweeps to delete
     */
    where?: SweepWhereInput
  }


  /**
   * Sweep without action
   */
  export type SweepDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sweep
     */
    select?: SweepSelect<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    role: 'role',
    status: 'status',
    balance: 'balance',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    amount: 'amount',
    type: 'type',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const ChainTransactionScalarFieldEnum: {
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

  export type ChainTransactionScalarFieldEnum = (typeof ChainTransactionScalarFieldEnum)[keyof typeof ChainTransactionScalarFieldEnum]


  export const LedgerEntryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    chain: 'chain',
    amount: 'amount',
    type: 'type',
    referenceId: 'referenceId',
    createdAt: 'createdAt'
  };

  export type LedgerEntryScalarFieldEnum = (typeof LedgerEntryScalarFieldEnum)[keyof typeof LedgerEntryScalarFieldEnum]


  export const UserBalanceScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    chain: 'chain',
    balance: 'balance'
  };

  export type UserBalanceScalarFieldEnum = (typeof UserBalanceScalarFieldEnum)[keyof typeof UserBalanceScalarFieldEnum]


  export const WithdrawalScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    amount: 'amount',
    walletAddress: 'walletAddress',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type WithdrawalScalarFieldEnum = (typeof WithdrawalScalarFieldEnum)[keyof typeof WithdrawalScalarFieldEnum]


  export const SystemSettingScalarFieldEnum: {
    key: 'key',
    value: 'value'
  };

  export type SystemSettingScalarFieldEnum = (typeof SystemSettingScalarFieldEnum)[keyof typeof SystemSettingScalarFieldEnum]


  export const UserWalletScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    chain: 'chain',
    derivationIndex: 'derivationIndex',
    address: 'address',
    createdAt: 'createdAt',
    lastKnownBalance: 'lastKnownBalance'
  };

  export type UserWalletScalarFieldEnum = (typeof UserWalletScalarFieldEnum)[keyof typeof UserWalletScalarFieldEnum]


  export const ChainScanStateScalarFieldEnum: {
    chain: 'chain',
    lastScannedBlock: 'lastScannedBlock',
    updatedAt: 'updatedAt'
  };

  export type ChainScanStateScalarFieldEnum = (typeof ChainScanStateScalarFieldEnum)[keyof typeof ChainScanStateScalarFieldEnum]


  export const TreasuryAccountScalarFieldEnum: {
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

  export type TreasuryAccountScalarFieldEnum = (typeof TreasuryAccountScalarFieldEnum)[keyof typeof TreasuryAccountScalarFieldEnum]


  export const TreasuryLedgerScalarFieldEnum: {
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

  export type TreasuryLedgerScalarFieldEnum = (typeof TreasuryLedgerScalarFieldEnum)[keyof typeof TreasuryLedgerScalarFieldEnum]


  export const TreasuryEntryScalarFieldEnum: {
    id: 'id',
    ledgerId: 'ledgerId',
    accountId: 'accountId',
    debitAmount: 'debitAmount',
    creditAmount: 'creditAmount',
    currency: 'currency',
    network: 'network',
    createdAt: 'createdAt'
  };

  export type TreasuryEntryScalarFieldEnum = (typeof TreasuryEntryScalarFieldEnum)[keyof typeof TreasuryEntryScalarFieldEnum]


  export const BalanceSnapshotScalarFieldEnum: {
    id: 'id',
    snapshotTime: 'snapshotTime',
    network: 'network',
    currency: 'currency',
    totalAssets: 'totalAssets',
    totalLiabilities: 'totalLiabilities',
    totalEquity: 'totalEquity'
  };

  export type BalanceSnapshotScalarFieldEnum = (typeof BalanceSnapshotScalarFieldEnum)[keyof typeof BalanceSnapshotScalarFieldEnum]


  export const TreasuryStateScalarFieldEnum: {
    chain: 'chain',
    totalOnchainBalance: 'totalOnchainBalance',
    totalUserLiabilities: 'totalUserLiabilities',
    sweepableBalance: 'sweepableBalance',
    lastSyncedAt: 'lastSyncedAt',
    locked: 'locked',
    lockedAt: 'lockedAt',
    lockedBy: 'lockedBy'
  };

  export type TreasuryStateScalarFieldEnum = (typeof TreasuryStateScalarFieldEnum)[keyof typeof TreasuryStateScalarFieldEnum]


  export const SweepScalarFieldEnum: {
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

  export type SweepScalarFieldEnum = (typeof SweepScalarFieldEnum)[keyof typeof SweepScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Status'
   */
  export type EnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status'>
    


  /**
   * Reference to a field of type 'Status[]'
   */
  export type ListEnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'TxType'
   */
  export type EnumTxTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TxType'>
    


  /**
   * Reference to a field of type 'TxType[]'
   */
  export type ListEnumTxTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TxType[]'>
    


  /**
   * Reference to a field of type 'TxStatus'
   */
  export type EnumTxStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TxStatus'>
    


  /**
   * Reference to a field of type 'TxStatus[]'
   */
  export type ListEnumTxStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TxStatus[]'>
    


  /**
   * Reference to a field of type 'ChainTxStatus'
   */
  export type EnumChainTxStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChainTxStatus'>
    


  /**
   * Reference to a field of type 'ChainTxStatus[]'
   */
  export type ListEnumChainTxStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChainTxStatus[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'TxDirection'
   */
  export type EnumTxDirectionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TxDirection'>
    


  /**
   * Reference to a field of type 'TxDirection[]'
   */
  export type ListEnumTxDirectionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TxDirection[]'>
    


  /**
   * Reference to a field of type 'LedgerType'
   */
  export type EnumLedgerTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LedgerType'>
    


  /**
   * Reference to a field of type 'LedgerType[]'
   */
  export type ListEnumLedgerTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LedgerType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'TreasuryAccountType'
   */
  export type EnumTreasuryAccountTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TreasuryAccountType'>
    


  /**
   * Reference to a field of type 'TreasuryAccountType[]'
   */
  export type ListEnumTreasuryAccountTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TreasuryAccountType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'TreasuryLedgerReferenceType'
   */
  export type EnumTreasuryLedgerReferenceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TreasuryLedgerReferenceType'>
    


  /**
   * Reference to a field of type 'TreasuryLedgerReferenceType[]'
   */
  export type ListEnumTreasuryLedgerReferenceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TreasuryLedgerReferenceType[]'>
    


  /**
   * Reference to a field of type 'SweepStatus'
   */
  export type EnumSweepStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SweepStatus'>
    


  /**
   * Reference to a field of type 'SweepStatus[]'
   */
  export type ListEnumSweepStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SweepStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    status?: EnumStatusFilter<"User"> | $Enums.Status
    balance?: FloatFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    chainTransactions?: ChainTransactionListRelationFilter
    transactions?: TransactionListRelationFilter
    wallets?: UserWalletListRelationFilter
    withdrawals?: WithdrawalListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    status?: SortOrder
    balance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    chainTransactions?: ChainTransactionOrderByRelationAggregateInput
    transactions?: TransactionOrderByRelationAggregateInput
    wallets?: UserWalletOrderByRelationAggregateInput
    withdrawals?: WithdrawalOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    status?: EnumStatusFilter<"User"> | $Enums.Status
    balance?: FloatFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    chainTransactions?: ChainTransactionListRelationFilter
    transactions?: TransactionListRelationFilter
    wallets?: UserWalletListRelationFilter
    withdrawals?: WithdrawalListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    status?: SortOrder
    balance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    status?: EnumStatusWithAggregatesFilter<"User"> | $Enums.Status
    balance?: FloatWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    userId?: StringFilter<"Transaction"> | string
    amount?: FloatFilter<"Transaction"> | number
    type?: EnumTxTypeFilter<"Transaction"> | $Enums.TxType
    status?: EnumTxStatusFilter<"Transaction"> | $Enums.TxStatus
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    userId?: StringFilter<"Transaction"> | string
    amount?: FloatFilter<"Transaction"> | number
    type?: EnumTxTypeFilter<"Transaction"> | $Enums.TxType
    status?: EnumTxStatusFilter<"Transaction"> | $Enums.TxStatus
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    userId?: StringWithAggregatesFilter<"Transaction"> | string
    amount?: FloatWithAggregatesFilter<"Transaction"> | number
    type?: EnumTxTypeWithAggregatesFilter<"Transaction"> | $Enums.TxType
    status?: EnumTxStatusWithAggregatesFilter<"Transaction"> | $Enums.TxStatus
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
  }

  export type ChainTransactionWhereInput = {
    AND?: ChainTransactionWhereInput | ChainTransactionWhereInput[]
    OR?: ChainTransactionWhereInput[]
    NOT?: ChainTransactionWhereInput | ChainTransactionWhereInput[]
    id?: StringFilter<"ChainTransaction"> | string
    userId?: StringFilter<"ChainTransaction"> | string
    chain?: StringFilter<"ChainTransaction"> | string
    to?: StringFilter<"ChainTransaction"> | string
    amount?: StringFilter<"ChainTransaction"> | string
    txHash?: StringNullableFilter<"ChainTransaction"> | string | null
    status?: EnumChainTxStatusFilter<"ChainTransaction"> | $Enums.ChainTxStatus
    createdAt?: DateTimeFilter<"ChainTransaction"> | Date | string
    confirmedAt?: DateTimeNullableFilter<"ChainTransaction"> | Date | string | null
    blockNumber?: BigIntNullableFilter<"ChainTransaction"> | bigint | number | null
    direction?: EnumTxDirectionFilter<"ChainTransaction"> | $Enums.TxDirection
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ChainTransactionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    to?: SortOrder
    amount?: SortOrder
    txHash?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    confirmedAt?: SortOrderInput | SortOrder
    blockNumber?: SortOrderInput | SortOrder
    direction?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ChainTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    txHash?: string
    AND?: ChainTransactionWhereInput | ChainTransactionWhereInput[]
    OR?: ChainTransactionWhereInput[]
    NOT?: ChainTransactionWhereInput | ChainTransactionWhereInput[]
    userId?: StringFilter<"ChainTransaction"> | string
    chain?: StringFilter<"ChainTransaction"> | string
    to?: StringFilter<"ChainTransaction"> | string
    amount?: StringFilter<"ChainTransaction"> | string
    status?: EnumChainTxStatusFilter<"ChainTransaction"> | $Enums.ChainTxStatus
    createdAt?: DateTimeFilter<"ChainTransaction"> | Date | string
    confirmedAt?: DateTimeNullableFilter<"ChainTransaction"> | Date | string | null
    blockNumber?: BigIntNullableFilter<"ChainTransaction"> | bigint | number | null
    direction?: EnumTxDirectionFilter<"ChainTransaction"> | $Enums.TxDirection
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "txHash">

  export type ChainTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    to?: SortOrder
    amount?: SortOrder
    txHash?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    confirmedAt?: SortOrderInput | SortOrder
    blockNumber?: SortOrderInput | SortOrder
    direction?: SortOrder
    _count?: ChainTransactionCountOrderByAggregateInput
    _avg?: ChainTransactionAvgOrderByAggregateInput
    _max?: ChainTransactionMaxOrderByAggregateInput
    _min?: ChainTransactionMinOrderByAggregateInput
    _sum?: ChainTransactionSumOrderByAggregateInput
  }

  export type ChainTransactionScalarWhereWithAggregatesInput = {
    AND?: ChainTransactionScalarWhereWithAggregatesInput | ChainTransactionScalarWhereWithAggregatesInput[]
    OR?: ChainTransactionScalarWhereWithAggregatesInput[]
    NOT?: ChainTransactionScalarWhereWithAggregatesInput | ChainTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ChainTransaction"> | string
    userId?: StringWithAggregatesFilter<"ChainTransaction"> | string
    chain?: StringWithAggregatesFilter<"ChainTransaction"> | string
    to?: StringWithAggregatesFilter<"ChainTransaction"> | string
    amount?: StringWithAggregatesFilter<"ChainTransaction"> | string
    txHash?: StringNullableWithAggregatesFilter<"ChainTransaction"> | string | null
    status?: EnumChainTxStatusWithAggregatesFilter<"ChainTransaction"> | $Enums.ChainTxStatus
    createdAt?: DateTimeWithAggregatesFilter<"ChainTransaction"> | Date | string
    confirmedAt?: DateTimeNullableWithAggregatesFilter<"ChainTransaction"> | Date | string | null
    blockNumber?: BigIntNullableWithAggregatesFilter<"ChainTransaction"> | bigint | number | null
    direction?: EnumTxDirectionWithAggregatesFilter<"ChainTransaction"> | $Enums.TxDirection
  }

  export type LedgerEntryWhereInput = {
    AND?: LedgerEntryWhereInput | LedgerEntryWhereInput[]
    OR?: LedgerEntryWhereInput[]
    NOT?: LedgerEntryWhereInput | LedgerEntryWhereInput[]
    id?: StringFilter<"LedgerEntry"> | string
    userId?: StringFilter<"LedgerEntry"> | string
    chain?: StringFilter<"LedgerEntry"> | string
    amount?: StringFilter<"LedgerEntry"> | string
    type?: EnumLedgerTypeFilter<"LedgerEntry"> | $Enums.LedgerType
    referenceId?: StringNullableFilter<"LedgerEntry"> | string | null
    createdAt?: DateTimeFilter<"LedgerEntry"> | Date | string
  }

  export type LedgerEntryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    referenceId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type LedgerEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LedgerEntryWhereInput | LedgerEntryWhereInput[]
    OR?: LedgerEntryWhereInput[]
    NOT?: LedgerEntryWhereInput | LedgerEntryWhereInput[]
    userId?: StringFilter<"LedgerEntry"> | string
    chain?: StringFilter<"LedgerEntry"> | string
    amount?: StringFilter<"LedgerEntry"> | string
    type?: EnumLedgerTypeFilter<"LedgerEntry"> | $Enums.LedgerType
    referenceId?: StringNullableFilter<"LedgerEntry"> | string | null
    createdAt?: DateTimeFilter<"LedgerEntry"> | Date | string
  }, "id">

  export type LedgerEntryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    referenceId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: LedgerEntryCountOrderByAggregateInput
    _max?: LedgerEntryMaxOrderByAggregateInput
    _min?: LedgerEntryMinOrderByAggregateInput
  }

  export type LedgerEntryScalarWhereWithAggregatesInput = {
    AND?: LedgerEntryScalarWhereWithAggregatesInput | LedgerEntryScalarWhereWithAggregatesInput[]
    OR?: LedgerEntryScalarWhereWithAggregatesInput[]
    NOT?: LedgerEntryScalarWhereWithAggregatesInput | LedgerEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LedgerEntry"> | string
    userId?: StringWithAggregatesFilter<"LedgerEntry"> | string
    chain?: StringWithAggregatesFilter<"LedgerEntry"> | string
    amount?: StringWithAggregatesFilter<"LedgerEntry"> | string
    type?: EnumLedgerTypeWithAggregatesFilter<"LedgerEntry"> | $Enums.LedgerType
    referenceId?: StringNullableWithAggregatesFilter<"LedgerEntry"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LedgerEntry"> | Date | string
  }

  export type UserBalanceWhereInput = {
    AND?: UserBalanceWhereInput | UserBalanceWhereInput[]
    OR?: UserBalanceWhereInput[]
    NOT?: UserBalanceWhereInput | UserBalanceWhereInput[]
    id?: StringFilter<"UserBalance"> | string
    userId?: StringFilter<"UserBalance"> | string
    chain?: StringFilter<"UserBalance"> | string
    balance?: StringFilter<"UserBalance"> | string
  }

  export type UserBalanceOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    balance?: SortOrder
  }

  export type UserBalanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_chain?: UserBalanceUserIdChainCompoundUniqueInput
    AND?: UserBalanceWhereInput | UserBalanceWhereInput[]
    OR?: UserBalanceWhereInput[]
    NOT?: UserBalanceWhereInput | UserBalanceWhereInput[]
    userId?: StringFilter<"UserBalance"> | string
    chain?: StringFilter<"UserBalance"> | string
    balance?: StringFilter<"UserBalance"> | string
  }, "id" | "userId_chain">

  export type UserBalanceOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    balance?: SortOrder
    _count?: UserBalanceCountOrderByAggregateInput
    _max?: UserBalanceMaxOrderByAggregateInput
    _min?: UserBalanceMinOrderByAggregateInput
  }

  export type UserBalanceScalarWhereWithAggregatesInput = {
    AND?: UserBalanceScalarWhereWithAggregatesInput | UserBalanceScalarWhereWithAggregatesInput[]
    OR?: UserBalanceScalarWhereWithAggregatesInput[]
    NOT?: UserBalanceScalarWhereWithAggregatesInput | UserBalanceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserBalance"> | string
    userId?: StringWithAggregatesFilter<"UserBalance"> | string
    chain?: StringWithAggregatesFilter<"UserBalance"> | string
    balance?: StringWithAggregatesFilter<"UserBalance"> | string
  }

  export type WithdrawalWhereInput = {
    AND?: WithdrawalWhereInput | WithdrawalWhereInput[]
    OR?: WithdrawalWhereInput[]
    NOT?: WithdrawalWhereInput | WithdrawalWhereInput[]
    id?: StringFilter<"Withdrawal"> | string
    userId?: StringFilter<"Withdrawal"> | string
    amount?: FloatFilter<"Withdrawal"> | number
    walletAddress?: StringNullableFilter<"Withdrawal"> | string | null
    status?: EnumTxStatusFilter<"Withdrawal"> | $Enums.TxStatus
    createdAt?: DateTimeFilter<"Withdrawal"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type WithdrawalOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    walletAddress?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type WithdrawalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WithdrawalWhereInput | WithdrawalWhereInput[]
    OR?: WithdrawalWhereInput[]
    NOT?: WithdrawalWhereInput | WithdrawalWhereInput[]
    userId?: StringFilter<"Withdrawal"> | string
    amount?: FloatFilter<"Withdrawal"> | number
    walletAddress?: StringNullableFilter<"Withdrawal"> | string | null
    status?: EnumTxStatusFilter<"Withdrawal"> | $Enums.TxStatus
    createdAt?: DateTimeFilter<"Withdrawal"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type WithdrawalOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    walletAddress?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: WithdrawalCountOrderByAggregateInput
    _avg?: WithdrawalAvgOrderByAggregateInput
    _max?: WithdrawalMaxOrderByAggregateInput
    _min?: WithdrawalMinOrderByAggregateInput
    _sum?: WithdrawalSumOrderByAggregateInput
  }

  export type WithdrawalScalarWhereWithAggregatesInput = {
    AND?: WithdrawalScalarWhereWithAggregatesInput | WithdrawalScalarWhereWithAggregatesInput[]
    OR?: WithdrawalScalarWhereWithAggregatesInput[]
    NOT?: WithdrawalScalarWhereWithAggregatesInput | WithdrawalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Withdrawal"> | string
    userId?: StringWithAggregatesFilter<"Withdrawal"> | string
    amount?: FloatWithAggregatesFilter<"Withdrawal"> | number
    walletAddress?: StringNullableWithAggregatesFilter<"Withdrawal"> | string | null
    status?: EnumTxStatusWithAggregatesFilter<"Withdrawal"> | $Enums.TxStatus
    createdAt?: DateTimeWithAggregatesFilter<"Withdrawal"> | Date | string
  }

  export type SystemSettingWhereInput = {
    AND?: SystemSettingWhereInput | SystemSettingWhereInput[]
    OR?: SystemSettingWhereInput[]
    NOT?: SystemSettingWhereInput | SystemSettingWhereInput[]
    key?: StringFilter<"SystemSetting"> | string
    value?: StringFilter<"SystemSetting"> | string
  }

  export type SystemSettingOrderByWithRelationInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type SystemSettingWhereUniqueInput = Prisma.AtLeast<{
    key?: string
    AND?: SystemSettingWhereInput | SystemSettingWhereInput[]
    OR?: SystemSettingWhereInput[]
    NOT?: SystemSettingWhereInput | SystemSettingWhereInput[]
    value?: StringFilter<"SystemSetting"> | string
  }, "key">

  export type SystemSettingOrderByWithAggregationInput = {
    key?: SortOrder
    value?: SortOrder
    _count?: SystemSettingCountOrderByAggregateInput
    _max?: SystemSettingMaxOrderByAggregateInput
    _min?: SystemSettingMinOrderByAggregateInput
  }

  export type SystemSettingScalarWhereWithAggregatesInput = {
    AND?: SystemSettingScalarWhereWithAggregatesInput | SystemSettingScalarWhereWithAggregatesInput[]
    OR?: SystemSettingScalarWhereWithAggregatesInput[]
    NOT?: SystemSettingScalarWhereWithAggregatesInput | SystemSettingScalarWhereWithAggregatesInput[]
    key?: StringWithAggregatesFilter<"SystemSetting"> | string
    value?: StringWithAggregatesFilter<"SystemSetting"> | string
  }

  export type UserWalletWhereInput = {
    AND?: UserWalletWhereInput | UserWalletWhereInput[]
    OR?: UserWalletWhereInput[]
    NOT?: UserWalletWhereInput | UserWalletWhereInput[]
    id?: StringFilter<"UserWallet"> | string
    userId?: StringFilter<"UserWallet"> | string
    chain?: StringFilter<"UserWallet"> | string
    derivationIndex?: IntFilter<"UserWallet"> | number
    address?: StringFilter<"UserWallet"> | string
    createdAt?: DateTimeFilter<"UserWallet"> | Date | string
    lastKnownBalance?: StringFilter<"UserWallet"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type UserWalletOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    derivationIndex?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    lastKnownBalance?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserWalletWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    chain_derivationIndex?: UserWalletChainDerivationIndexCompoundUniqueInput
    userId_chain?: UserWalletUserIdChainCompoundUniqueInput
    AND?: UserWalletWhereInput | UserWalletWhereInput[]
    OR?: UserWalletWhereInput[]
    NOT?: UserWalletWhereInput | UserWalletWhereInput[]
    userId?: StringFilter<"UserWallet"> | string
    chain?: StringFilter<"UserWallet"> | string
    derivationIndex?: IntFilter<"UserWallet"> | number
    address?: StringFilter<"UserWallet"> | string
    createdAt?: DateTimeFilter<"UserWallet"> | Date | string
    lastKnownBalance?: StringFilter<"UserWallet"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "chain_derivationIndex" | "userId_chain">

  export type UserWalletOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    derivationIndex?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    lastKnownBalance?: SortOrder
    _count?: UserWalletCountOrderByAggregateInput
    _avg?: UserWalletAvgOrderByAggregateInput
    _max?: UserWalletMaxOrderByAggregateInput
    _min?: UserWalletMinOrderByAggregateInput
    _sum?: UserWalletSumOrderByAggregateInput
  }

  export type UserWalletScalarWhereWithAggregatesInput = {
    AND?: UserWalletScalarWhereWithAggregatesInput | UserWalletScalarWhereWithAggregatesInput[]
    OR?: UserWalletScalarWhereWithAggregatesInput[]
    NOT?: UserWalletScalarWhereWithAggregatesInput | UserWalletScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserWallet"> | string
    userId?: StringWithAggregatesFilter<"UserWallet"> | string
    chain?: StringWithAggregatesFilter<"UserWallet"> | string
    derivationIndex?: IntWithAggregatesFilter<"UserWallet"> | number
    address?: StringWithAggregatesFilter<"UserWallet"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserWallet"> | Date | string
    lastKnownBalance?: StringWithAggregatesFilter<"UserWallet"> | string
  }

  export type ChainScanStateWhereInput = {
    AND?: ChainScanStateWhereInput | ChainScanStateWhereInput[]
    OR?: ChainScanStateWhereInput[]
    NOT?: ChainScanStateWhereInput | ChainScanStateWhereInput[]
    chain?: StringFilter<"ChainScanState"> | string
    lastScannedBlock?: BigIntFilter<"ChainScanState"> | bigint | number
    updatedAt?: DateTimeFilter<"ChainScanState"> | Date | string
  }

  export type ChainScanStateOrderByWithRelationInput = {
    chain?: SortOrder
    lastScannedBlock?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChainScanStateWhereUniqueInput = Prisma.AtLeast<{
    chain?: string
    AND?: ChainScanStateWhereInput | ChainScanStateWhereInput[]
    OR?: ChainScanStateWhereInput[]
    NOT?: ChainScanStateWhereInput | ChainScanStateWhereInput[]
    lastScannedBlock?: BigIntFilter<"ChainScanState"> | bigint | number
    updatedAt?: DateTimeFilter<"ChainScanState"> | Date | string
  }, "chain">

  export type ChainScanStateOrderByWithAggregationInput = {
    chain?: SortOrder
    lastScannedBlock?: SortOrder
    updatedAt?: SortOrder
    _count?: ChainScanStateCountOrderByAggregateInput
    _avg?: ChainScanStateAvgOrderByAggregateInput
    _max?: ChainScanStateMaxOrderByAggregateInput
    _min?: ChainScanStateMinOrderByAggregateInput
    _sum?: ChainScanStateSumOrderByAggregateInput
  }

  export type ChainScanStateScalarWhereWithAggregatesInput = {
    AND?: ChainScanStateScalarWhereWithAggregatesInput | ChainScanStateScalarWhereWithAggregatesInput[]
    OR?: ChainScanStateScalarWhereWithAggregatesInput[]
    NOT?: ChainScanStateScalarWhereWithAggregatesInput | ChainScanStateScalarWhereWithAggregatesInput[]
    chain?: StringWithAggregatesFilter<"ChainScanState"> | string
    lastScannedBlock?: BigIntWithAggregatesFilter<"ChainScanState"> | bigint | number
    updatedAt?: DateTimeWithAggregatesFilter<"ChainScanState"> | Date | string
  }

  export type TreasuryAccountWhereInput = {
    AND?: TreasuryAccountWhereInput | TreasuryAccountWhereInput[]
    OR?: TreasuryAccountWhereInput[]
    NOT?: TreasuryAccountWhereInput | TreasuryAccountWhereInput[]
    id?: StringFilter<"TreasuryAccount"> | string
    name?: StringFilter<"TreasuryAccount"> | string
    type?: EnumTreasuryAccountTypeFilter<"TreasuryAccount"> | $Enums.TreasuryAccountType
    network?: StringNullableFilter<"TreasuryAccount"> | string | null
    currency?: StringFilter<"TreasuryAccount"> | string
    walletAddress?: StringNullableFilter<"TreasuryAccount"> | string | null
    parentAccountId?: StringNullableFilter<"TreasuryAccount"> | string | null
    isActive?: BoolFilter<"TreasuryAccount"> | boolean
    createdAt?: DateTimeFilter<"TreasuryAccount"> | Date | string
    parentAccount?: XOR<TreasuryAccountNullableRelationFilter, TreasuryAccountWhereInput> | null
    children?: TreasuryAccountListRelationFilter
    entries?: TreasuryEntryListRelationFilter
  }

  export type TreasuryAccountOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    network?: SortOrderInput | SortOrder
    currency?: SortOrder
    walletAddress?: SortOrderInput | SortOrder
    parentAccountId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    parentAccount?: TreasuryAccountOrderByWithRelationInput
    children?: TreasuryAccountOrderByRelationAggregateInput
    entries?: TreasuryEntryOrderByRelationAggregateInput
  }

  export type TreasuryAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    walletAddress?: string
    name_currency_network?: TreasuryAccountNameCurrencyNetworkCompoundUniqueInput
    AND?: TreasuryAccountWhereInput | TreasuryAccountWhereInput[]
    OR?: TreasuryAccountWhereInput[]
    NOT?: TreasuryAccountWhereInput | TreasuryAccountWhereInput[]
    name?: StringFilter<"TreasuryAccount"> | string
    type?: EnumTreasuryAccountTypeFilter<"TreasuryAccount"> | $Enums.TreasuryAccountType
    network?: StringNullableFilter<"TreasuryAccount"> | string | null
    currency?: StringFilter<"TreasuryAccount"> | string
    parentAccountId?: StringNullableFilter<"TreasuryAccount"> | string | null
    isActive?: BoolFilter<"TreasuryAccount"> | boolean
    createdAt?: DateTimeFilter<"TreasuryAccount"> | Date | string
    parentAccount?: XOR<TreasuryAccountNullableRelationFilter, TreasuryAccountWhereInput> | null
    children?: TreasuryAccountListRelationFilter
    entries?: TreasuryEntryListRelationFilter
  }, "id" | "walletAddress" | "name_currency_network">

  export type TreasuryAccountOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    network?: SortOrderInput | SortOrder
    currency?: SortOrder
    walletAddress?: SortOrderInput | SortOrder
    parentAccountId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    _count?: TreasuryAccountCountOrderByAggregateInput
    _max?: TreasuryAccountMaxOrderByAggregateInput
    _min?: TreasuryAccountMinOrderByAggregateInput
  }

  export type TreasuryAccountScalarWhereWithAggregatesInput = {
    AND?: TreasuryAccountScalarWhereWithAggregatesInput | TreasuryAccountScalarWhereWithAggregatesInput[]
    OR?: TreasuryAccountScalarWhereWithAggregatesInput[]
    NOT?: TreasuryAccountScalarWhereWithAggregatesInput | TreasuryAccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TreasuryAccount"> | string
    name?: StringWithAggregatesFilter<"TreasuryAccount"> | string
    type?: EnumTreasuryAccountTypeWithAggregatesFilter<"TreasuryAccount"> | $Enums.TreasuryAccountType
    network?: StringNullableWithAggregatesFilter<"TreasuryAccount"> | string | null
    currency?: StringWithAggregatesFilter<"TreasuryAccount"> | string
    walletAddress?: StringNullableWithAggregatesFilter<"TreasuryAccount"> | string | null
    parentAccountId?: StringNullableWithAggregatesFilter<"TreasuryAccount"> | string | null
    isActive?: BoolWithAggregatesFilter<"TreasuryAccount"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"TreasuryAccount"> | Date | string
  }

  export type TreasuryLedgerWhereInput = {
    AND?: TreasuryLedgerWhereInput | TreasuryLedgerWhereInput[]
    OR?: TreasuryLedgerWhereInput[]
    NOT?: TreasuryLedgerWhereInput | TreasuryLedgerWhereInput[]
    id?: StringFilter<"TreasuryLedger"> | string
    referenceType?: EnumTreasuryLedgerReferenceTypeFilter<"TreasuryLedger"> | $Enums.TreasuryLedgerReferenceType
    referenceId?: StringNullableFilter<"TreasuryLedger"> | string | null
    description?: StringFilter<"TreasuryLedger"> | string
    network?: StringFilter<"TreasuryLedger"> | string
    currency?: StringFilter<"TreasuryLedger"> | string
    createdByAdminId?: StringNullableFilter<"TreasuryLedger"> | string | null
    locked?: BoolFilter<"TreasuryLedger"> | boolean
    createdAt?: DateTimeFilter<"TreasuryLedger"> | Date | string
    entries?: TreasuryEntryListRelationFilter
  }

  export type TreasuryLedgerOrderByWithRelationInput = {
    id?: SortOrder
    referenceType?: SortOrder
    referenceId?: SortOrderInput | SortOrder
    description?: SortOrder
    network?: SortOrder
    currency?: SortOrder
    createdByAdminId?: SortOrderInput | SortOrder
    locked?: SortOrder
    createdAt?: SortOrder
    entries?: TreasuryEntryOrderByRelationAggregateInput
  }

  export type TreasuryLedgerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TreasuryLedgerWhereInput | TreasuryLedgerWhereInput[]
    OR?: TreasuryLedgerWhereInput[]
    NOT?: TreasuryLedgerWhereInput | TreasuryLedgerWhereInput[]
    referenceType?: EnumTreasuryLedgerReferenceTypeFilter<"TreasuryLedger"> | $Enums.TreasuryLedgerReferenceType
    referenceId?: StringNullableFilter<"TreasuryLedger"> | string | null
    description?: StringFilter<"TreasuryLedger"> | string
    network?: StringFilter<"TreasuryLedger"> | string
    currency?: StringFilter<"TreasuryLedger"> | string
    createdByAdminId?: StringNullableFilter<"TreasuryLedger"> | string | null
    locked?: BoolFilter<"TreasuryLedger"> | boolean
    createdAt?: DateTimeFilter<"TreasuryLedger"> | Date | string
    entries?: TreasuryEntryListRelationFilter
  }, "id">

  export type TreasuryLedgerOrderByWithAggregationInput = {
    id?: SortOrder
    referenceType?: SortOrder
    referenceId?: SortOrderInput | SortOrder
    description?: SortOrder
    network?: SortOrder
    currency?: SortOrder
    createdByAdminId?: SortOrderInput | SortOrder
    locked?: SortOrder
    createdAt?: SortOrder
    _count?: TreasuryLedgerCountOrderByAggregateInput
    _max?: TreasuryLedgerMaxOrderByAggregateInput
    _min?: TreasuryLedgerMinOrderByAggregateInput
  }

  export type TreasuryLedgerScalarWhereWithAggregatesInput = {
    AND?: TreasuryLedgerScalarWhereWithAggregatesInput | TreasuryLedgerScalarWhereWithAggregatesInput[]
    OR?: TreasuryLedgerScalarWhereWithAggregatesInput[]
    NOT?: TreasuryLedgerScalarWhereWithAggregatesInput | TreasuryLedgerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TreasuryLedger"> | string
    referenceType?: EnumTreasuryLedgerReferenceTypeWithAggregatesFilter<"TreasuryLedger"> | $Enums.TreasuryLedgerReferenceType
    referenceId?: StringNullableWithAggregatesFilter<"TreasuryLedger"> | string | null
    description?: StringWithAggregatesFilter<"TreasuryLedger"> | string
    network?: StringWithAggregatesFilter<"TreasuryLedger"> | string
    currency?: StringWithAggregatesFilter<"TreasuryLedger"> | string
    createdByAdminId?: StringNullableWithAggregatesFilter<"TreasuryLedger"> | string | null
    locked?: BoolWithAggregatesFilter<"TreasuryLedger"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"TreasuryLedger"> | Date | string
  }

  export type TreasuryEntryWhereInput = {
    AND?: TreasuryEntryWhereInput | TreasuryEntryWhereInput[]
    OR?: TreasuryEntryWhereInput[]
    NOT?: TreasuryEntryWhereInput | TreasuryEntryWhereInput[]
    id?: StringFilter<"TreasuryEntry"> | string
    ledgerId?: StringFilter<"TreasuryEntry"> | string
    accountId?: StringFilter<"TreasuryEntry"> | string
    debitAmount?: BigIntFilter<"TreasuryEntry"> | bigint | number
    creditAmount?: BigIntFilter<"TreasuryEntry"> | bigint | number
    currency?: StringFilter<"TreasuryEntry"> | string
    network?: StringFilter<"TreasuryEntry"> | string
    createdAt?: DateTimeFilter<"TreasuryEntry"> | Date | string
    ledger?: XOR<TreasuryLedgerRelationFilter, TreasuryLedgerWhereInput>
    account?: XOR<TreasuryAccountRelationFilter, TreasuryAccountWhereInput>
  }

  export type TreasuryEntryOrderByWithRelationInput = {
    id?: SortOrder
    ledgerId?: SortOrder
    accountId?: SortOrder
    debitAmount?: SortOrder
    creditAmount?: SortOrder
    currency?: SortOrder
    network?: SortOrder
    createdAt?: SortOrder
    ledger?: TreasuryLedgerOrderByWithRelationInput
    account?: TreasuryAccountOrderByWithRelationInput
  }

  export type TreasuryEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TreasuryEntryWhereInput | TreasuryEntryWhereInput[]
    OR?: TreasuryEntryWhereInput[]
    NOT?: TreasuryEntryWhereInput | TreasuryEntryWhereInput[]
    ledgerId?: StringFilter<"TreasuryEntry"> | string
    accountId?: StringFilter<"TreasuryEntry"> | string
    debitAmount?: BigIntFilter<"TreasuryEntry"> | bigint | number
    creditAmount?: BigIntFilter<"TreasuryEntry"> | bigint | number
    currency?: StringFilter<"TreasuryEntry"> | string
    network?: StringFilter<"TreasuryEntry"> | string
    createdAt?: DateTimeFilter<"TreasuryEntry"> | Date | string
    ledger?: XOR<TreasuryLedgerRelationFilter, TreasuryLedgerWhereInput>
    account?: XOR<TreasuryAccountRelationFilter, TreasuryAccountWhereInput>
  }, "id">

  export type TreasuryEntryOrderByWithAggregationInput = {
    id?: SortOrder
    ledgerId?: SortOrder
    accountId?: SortOrder
    debitAmount?: SortOrder
    creditAmount?: SortOrder
    currency?: SortOrder
    network?: SortOrder
    createdAt?: SortOrder
    _count?: TreasuryEntryCountOrderByAggregateInput
    _avg?: TreasuryEntryAvgOrderByAggregateInput
    _max?: TreasuryEntryMaxOrderByAggregateInput
    _min?: TreasuryEntryMinOrderByAggregateInput
    _sum?: TreasuryEntrySumOrderByAggregateInput
  }

  export type TreasuryEntryScalarWhereWithAggregatesInput = {
    AND?: TreasuryEntryScalarWhereWithAggregatesInput | TreasuryEntryScalarWhereWithAggregatesInput[]
    OR?: TreasuryEntryScalarWhereWithAggregatesInput[]
    NOT?: TreasuryEntryScalarWhereWithAggregatesInput | TreasuryEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TreasuryEntry"> | string
    ledgerId?: StringWithAggregatesFilter<"TreasuryEntry"> | string
    accountId?: StringWithAggregatesFilter<"TreasuryEntry"> | string
    debitAmount?: BigIntWithAggregatesFilter<"TreasuryEntry"> | bigint | number
    creditAmount?: BigIntWithAggregatesFilter<"TreasuryEntry"> | bigint | number
    currency?: StringWithAggregatesFilter<"TreasuryEntry"> | string
    network?: StringWithAggregatesFilter<"TreasuryEntry"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TreasuryEntry"> | Date | string
  }

  export type BalanceSnapshotWhereInput = {
    AND?: BalanceSnapshotWhereInput | BalanceSnapshotWhereInput[]
    OR?: BalanceSnapshotWhereInput[]
    NOT?: BalanceSnapshotWhereInput | BalanceSnapshotWhereInput[]
    id?: StringFilter<"BalanceSnapshot"> | string
    snapshotTime?: DateTimeFilter<"BalanceSnapshot"> | Date | string
    network?: StringFilter<"BalanceSnapshot"> | string
    currency?: StringFilter<"BalanceSnapshot"> | string
    totalAssets?: BigIntFilter<"BalanceSnapshot"> | bigint | number
    totalLiabilities?: BigIntFilter<"BalanceSnapshot"> | bigint | number
    totalEquity?: BigIntFilter<"BalanceSnapshot"> | bigint | number
  }

  export type BalanceSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    snapshotTime?: SortOrder
    network?: SortOrder
    currency?: SortOrder
    totalAssets?: SortOrder
    totalLiabilities?: SortOrder
    totalEquity?: SortOrder
  }

  export type BalanceSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BalanceSnapshotWhereInput | BalanceSnapshotWhereInput[]
    OR?: BalanceSnapshotWhereInput[]
    NOT?: BalanceSnapshotWhereInput | BalanceSnapshotWhereInput[]
    snapshotTime?: DateTimeFilter<"BalanceSnapshot"> | Date | string
    network?: StringFilter<"BalanceSnapshot"> | string
    currency?: StringFilter<"BalanceSnapshot"> | string
    totalAssets?: BigIntFilter<"BalanceSnapshot"> | bigint | number
    totalLiabilities?: BigIntFilter<"BalanceSnapshot"> | bigint | number
    totalEquity?: BigIntFilter<"BalanceSnapshot"> | bigint | number
  }, "id">

  export type BalanceSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    snapshotTime?: SortOrder
    network?: SortOrder
    currency?: SortOrder
    totalAssets?: SortOrder
    totalLiabilities?: SortOrder
    totalEquity?: SortOrder
    _count?: BalanceSnapshotCountOrderByAggregateInput
    _avg?: BalanceSnapshotAvgOrderByAggregateInput
    _max?: BalanceSnapshotMaxOrderByAggregateInput
    _min?: BalanceSnapshotMinOrderByAggregateInput
    _sum?: BalanceSnapshotSumOrderByAggregateInput
  }

  export type BalanceSnapshotScalarWhereWithAggregatesInput = {
    AND?: BalanceSnapshotScalarWhereWithAggregatesInput | BalanceSnapshotScalarWhereWithAggregatesInput[]
    OR?: BalanceSnapshotScalarWhereWithAggregatesInput[]
    NOT?: BalanceSnapshotScalarWhereWithAggregatesInput | BalanceSnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BalanceSnapshot"> | string
    snapshotTime?: DateTimeWithAggregatesFilter<"BalanceSnapshot"> | Date | string
    network?: StringWithAggregatesFilter<"BalanceSnapshot"> | string
    currency?: StringWithAggregatesFilter<"BalanceSnapshot"> | string
    totalAssets?: BigIntWithAggregatesFilter<"BalanceSnapshot"> | bigint | number
    totalLiabilities?: BigIntWithAggregatesFilter<"BalanceSnapshot"> | bigint | number
    totalEquity?: BigIntWithAggregatesFilter<"BalanceSnapshot"> | bigint | number
  }

  export type TreasuryStateWhereInput = {
    AND?: TreasuryStateWhereInput | TreasuryStateWhereInput[]
    OR?: TreasuryStateWhereInput[]
    NOT?: TreasuryStateWhereInput | TreasuryStateWhereInput[]
    chain?: StringFilter<"TreasuryState"> | string
    totalOnchainBalance?: StringFilter<"TreasuryState"> | string
    totalUserLiabilities?: StringFilter<"TreasuryState"> | string
    sweepableBalance?: StringFilter<"TreasuryState"> | string
    lastSyncedAt?: DateTimeFilter<"TreasuryState"> | Date | string
    locked?: BoolFilter<"TreasuryState"> | boolean
    lockedAt?: DateTimeNullableFilter<"TreasuryState"> | Date | string | null
    lockedBy?: StringNullableFilter<"TreasuryState"> | string | null
  }

  export type TreasuryStateOrderByWithRelationInput = {
    chain?: SortOrder
    totalOnchainBalance?: SortOrder
    totalUserLiabilities?: SortOrder
    sweepableBalance?: SortOrder
    lastSyncedAt?: SortOrder
    locked?: SortOrder
    lockedAt?: SortOrderInput | SortOrder
    lockedBy?: SortOrderInput | SortOrder
  }

  export type TreasuryStateWhereUniqueInput = Prisma.AtLeast<{
    chain?: string
    AND?: TreasuryStateWhereInput | TreasuryStateWhereInput[]
    OR?: TreasuryStateWhereInput[]
    NOT?: TreasuryStateWhereInput | TreasuryStateWhereInput[]
    totalOnchainBalance?: StringFilter<"TreasuryState"> | string
    totalUserLiabilities?: StringFilter<"TreasuryState"> | string
    sweepableBalance?: StringFilter<"TreasuryState"> | string
    lastSyncedAt?: DateTimeFilter<"TreasuryState"> | Date | string
    locked?: BoolFilter<"TreasuryState"> | boolean
    lockedAt?: DateTimeNullableFilter<"TreasuryState"> | Date | string | null
    lockedBy?: StringNullableFilter<"TreasuryState"> | string | null
  }, "chain">

  export type TreasuryStateOrderByWithAggregationInput = {
    chain?: SortOrder
    totalOnchainBalance?: SortOrder
    totalUserLiabilities?: SortOrder
    sweepableBalance?: SortOrder
    lastSyncedAt?: SortOrder
    locked?: SortOrder
    lockedAt?: SortOrderInput | SortOrder
    lockedBy?: SortOrderInput | SortOrder
    _count?: TreasuryStateCountOrderByAggregateInput
    _max?: TreasuryStateMaxOrderByAggregateInput
    _min?: TreasuryStateMinOrderByAggregateInput
  }

  export type TreasuryStateScalarWhereWithAggregatesInput = {
    AND?: TreasuryStateScalarWhereWithAggregatesInput | TreasuryStateScalarWhereWithAggregatesInput[]
    OR?: TreasuryStateScalarWhereWithAggregatesInput[]
    NOT?: TreasuryStateScalarWhereWithAggregatesInput | TreasuryStateScalarWhereWithAggregatesInput[]
    chain?: StringWithAggregatesFilter<"TreasuryState"> | string
    totalOnchainBalance?: StringWithAggregatesFilter<"TreasuryState"> | string
    totalUserLiabilities?: StringWithAggregatesFilter<"TreasuryState"> | string
    sweepableBalance?: StringWithAggregatesFilter<"TreasuryState"> | string
    lastSyncedAt?: DateTimeWithAggregatesFilter<"TreasuryState"> | Date | string
    locked?: BoolWithAggregatesFilter<"TreasuryState"> | boolean
    lockedAt?: DateTimeNullableWithAggregatesFilter<"TreasuryState"> | Date | string | null
    lockedBy?: StringNullableWithAggregatesFilter<"TreasuryState"> | string | null
  }

  export type SweepWhereInput = {
    AND?: SweepWhereInput | SweepWhereInput[]
    OR?: SweepWhereInput[]
    NOT?: SweepWhereInput | SweepWhereInput[]
    id?: StringFilter<"Sweep"> | string
    chain?: StringFilter<"Sweep"> | string
    amount?: StringFilter<"Sweep"> | string
    amountRaw?: StringFilter<"Sweep"> | string
    fromWallet?: StringFilter<"Sweep"> | string
    toWallet?: StringFilter<"Sweep"> | string
    txHash?: StringNullableFilter<"Sweep"> | string | null
    status?: EnumSweepStatusFilter<"Sweep"> | $Enums.SweepStatus
    initiatedBy?: StringFilter<"Sweep"> | string
    error?: StringNullableFilter<"Sweep"> | string | null
    createdAt?: DateTimeFilter<"Sweep"> | Date | string
    confirmedAt?: DateTimeNullableFilter<"Sweep"> | Date | string | null
  }

  export type SweepOrderByWithRelationInput = {
    id?: SortOrder
    chain?: SortOrder
    amount?: SortOrder
    amountRaw?: SortOrder
    fromWallet?: SortOrder
    toWallet?: SortOrder
    txHash?: SortOrderInput | SortOrder
    status?: SortOrder
    initiatedBy?: SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    confirmedAt?: SortOrderInput | SortOrder
  }

  export type SweepWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    txHash?: string
    AND?: SweepWhereInput | SweepWhereInput[]
    OR?: SweepWhereInput[]
    NOT?: SweepWhereInput | SweepWhereInput[]
    chain?: StringFilter<"Sweep"> | string
    amount?: StringFilter<"Sweep"> | string
    amountRaw?: StringFilter<"Sweep"> | string
    fromWallet?: StringFilter<"Sweep"> | string
    toWallet?: StringFilter<"Sweep"> | string
    status?: EnumSweepStatusFilter<"Sweep"> | $Enums.SweepStatus
    initiatedBy?: StringFilter<"Sweep"> | string
    error?: StringNullableFilter<"Sweep"> | string | null
    createdAt?: DateTimeFilter<"Sweep"> | Date | string
    confirmedAt?: DateTimeNullableFilter<"Sweep"> | Date | string | null
  }, "id" | "txHash">

  export type SweepOrderByWithAggregationInput = {
    id?: SortOrder
    chain?: SortOrder
    amount?: SortOrder
    amountRaw?: SortOrder
    fromWallet?: SortOrder
    toWallet?: SortOrder
    txHash?: SortOrderInput | SortOrder
    status?: SortOrder
    initiatedBy?: SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    confirmedAt?: SortOrderInput | SortOrder
    _count?: SweepCountOrderByAggregateInput
    _max?: SweepMaxOrderByAggregateInput
    _min?: SweepMinOrderByAggregateInput
  }

  export type SweepScalarWhereWithAggregatesInput = {
    AND?: SweepScalarWhereWithAggregatesInput | SweepScalarWhereWithAggregatesInput[]
    OR?: SweepScalarWhereWithAggregatesInput[]
    NOT?: SweepScalarWhereWithAggregatesInput | SweepScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Sweep"> | string
    chain?: StringWithAggregatesFilter<"Sweep"> | string
    amount?: StringWithAggregatesFilter<"Sweep"> | string
    amountRaw?: StringWithAggregatesFilter<"Sweep"> | string
    fromWallet?: StringWithAggregatesFilter<"Sweep"> | string
    toWallet?: StringWithAggregatesFilter<"Sweep"> | string
    txHash?: StringNullableWithAggregatesFilter<"Sweep"> | string | null
    status?: EnumSweepStatusWithAggregatesFilter<"Sweep"> | $Enums.SweepStatus
    initiatedBy?: StringWithAggregatesFilter<"Sweep"> | string
    error?: StringNullableWithAggregatesFilter<"Sweep"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Sweep"> | Date | string
    confirmedAt?: DateTimeNullableWithAggregatesFilter<"Sweep"> | Date | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    status?: $Enums.Status
    balance?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    chainTransactions?: ChainTransactionCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
    wallets?: UserWalletCreateNestedManyWithoutUserInput
    withdrawals?: WithdrawalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    status?: $Enums.Status
    balance?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    chainTransactions?: ChainTransactionUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    wallets?: UserWalletUncheckedCreateNestedManyWithoutUserInput
    withdrawals?: WithdrawalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    balance?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chainTransactions?: ChainTransactionUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    wallets?: UserWalletUpdateManyWithoutUserNestedInput
    withdrawals?: WithdrawalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    balance?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chainTransactions?: ChainTransactionUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    wallets?: UserWalletUncheckedUpdateManyWithoutUserNestedInput
    withdrawals?: WithdrawalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    status?: $Enums.Status
    balance?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    balance?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    balance?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateInput = {
    id?: string
    amount: number
    type: $Enums.TxType
    status?: $Enums.TxStatus
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    userId: string
    amount: number
    type: $Enums.TxType
    status?: $Enums.TxStatus
    createdAt?: Date | string
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumTxTypeFieldUpdateOperationsInput | $Enums.TxType
    status?: EnumTxStatusFieldUpdateOperationsInput | $Enums.TxStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumTxTypeFieldUpdateOperationsInput | $Enums.TxType
    status?: EnumTxStatusFieldUpdateOperationsInput | $Enums.TxStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyInput = {
    id?: string
    userId: string
    amount: number
    type: $Enums.TxType
    status?: $Enums.TxStatus
    createdAt?: Date | string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumTxTypeFieldUpdateOperationsInput | $Enums.TxType
    status?: EnumTxStatusFieldUpdateOperationsInput | $Enums.TxStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumTxTypeFieldUpdateOperationsInput | $Enums.TxType
    status?: EnumTxStatusFieldUpdateOperationsInput | $Enums.TxStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChainTransactionCreateInput = {
    id?: string
    chain: string
    to: string
    amount: string
    txHash?: string | null
    status?: $Enums.ChainTxStatus
    createdAt?: Date | string
    confirmedAt?: Date | string | null
    blockNumber?: bigint | number | null
    direction?: $Enums.TxDirection
    user: UserCreateNestedOneWithoutChainTransactionsInput
  }

  export type ChainTransactionUncheckedCreateInput = {
    id?: string
    userId: string
    chain: string
    to: string
    amount: string
    txHash?: string | null
    status?: $Enums.ChainTxStatus
    createdAt?: Date | string
    confirmedAt?: Date | string | null
    blockNumber?: bigint | number | null
    direction?: $Enums.TxDirection
  }

  export type ChainTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumChainTxStatusFieldUpdateOperationsInput | $Enums.ChainTxStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    direction?: EnumTxDirectionFieldUpdateOperationsInput | $Enums.TxDirection
    user?: UserUpdateOneRequiredWithoutChainTransactionsNestedInput
  }

  export type ChainTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumChainTxStatusFieldUpdateOperationsInput | $Enums.ChainTxStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    direction?: EnumTxDirectionFieldUpdateOperationsInput | $Enums.TxDirection
  }

  export type ChainTransactionCreateManyInput = {
    id?: string
    userId: string
    chain: string
    to: string
    amount: string
    txHash?: string | null
    status?: $Enums.ChainTxStatus
    createdAt?: Date | string
    confirmedAt?: Date | string | null
    blockNumber?: bigint | number | null
    direction?: $Enums.TxDirection
  }

  export type ChainTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumChainTxStatusFieldUpdateOperationsInput | $Enums.ChainTxStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    direction?: EnumTxDirectionFieldUpdateOperationsInput | $Enums.TxDirection
  }

  export type ChainTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumChainTxStatusFieldUpdateOperationsInput | $Enums.ChainTxStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    direction?: EnumTxDirectionFieldUpdateOperationsInput | $Enums.TxDirection
  }

  export type LedgerEntryCreateInput = {
    id?: string
    userId: string
    chain: string
    amount: string
    type: $Enums.LedgerType
    referenceId?: string | null
    createdAt?: Date | string
  }

  export type LedgerEntryUncheckedCreateInput = {
    id?: string
    userId: string
    chain: string
    amount: string
    type: $Enums.LedgerType
    referenceId?: string | null
    createdAt?: Date | string
  }

  export type LedgerEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    type?: EnumLedgerTypeFieldUpdateOperationsInput | $Enums.LedgerType
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    type?: EnumLedgerTypeFieldUpdateOperationsInput | $Enums.LedgerType
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerEntryCreateManyInput = {
    id?: string
    userId: string
    chain: string
    amount: string
    type: $Enums.LedgerType
    referenceId?: string | null
    createdAt?: Date | string
  }

  export type LedgerEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    type?: EnumLedgerTypeFieldUpdateOperationsInput | $Enums.LedgerType
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    type?: EnumLedgerTypeFieldUpdateOperationsInput | $Enums.LedgerType
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBalanceCreateInput = {
    id?: string
    userId: string
    chain: string
    balance: string
  }

  export type UserBalanceUncheckedCreateInput = {
    id?: string
    userId: string
    chain: string
    balance: string
  }

  export type UserBalanceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    balance?: StringFieldUpdateOperationsInput | string
  }

  export type UserBalanceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    balance?: StringFieldUpdateOperationsInput | string
  }

  export type UserBalanceCreateManyInput = {
    id?: string
    userId: string
    chain: string
    balance: string
  }

  export type UserBalanceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    balance?: StringFieldUpdateOperationsInput | string
  }

  export type UserBalanceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    balance?: StringFieldUpdateOperationsInput | string
  }

  export type WithdrawalCreateInput = {
    id?: string
    amount: number
    walletAddress?: string | null
    status?: $Enums.TxStatus
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutWithdrawalsInput
  }

  export type WithdrawalUncheckedCreateInput = {
    id?: string
    userId: string
    amount: number
    walletAddress?: string | null
    status?: $Enums.TxStatus
    createdAt?: Date | string
  }

  export type WithdrawalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTxStatusFieldUpdateOperationsInput | $Enums.TxStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWithdrawalsNestedInput
  }

  export type WithdrawalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTxStatusFieldUpdateOperationsInput | $Enums.TxStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WithdrawalCreateManyInput = {
    id?: string
    userId: string
    amount: number
    walletAddress?: string | null
    status?: $Enums.TxStatus
    createdAt?: Date | string
  }

  export type WithdrawalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTxStatusFieldUpdateOperationsInput | $Enums.TxStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WithdrawalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTxStatusFieldUpdateOperationsInput | $Enums.TxStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingCreateInput = {
    key: string
    value: string
  }

  export type SystemSettingUncheckedCreateInput = {
    key: string
    value: string
  }

  export type SystemSettingUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type SystemSettingUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type SystemSettingCreateManyInput = {
    key: string
    value: string
  }

  export type SystemSettingUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type SystemSettingUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type UserWalletCreateInput = {
    id?: string
    chain: string
    derivationIndex: number
    address: string
    createdAt?: Date | string
    lastKnownBalance?: string
    user: UserCreateNestedOneWithoutWalletsInput
  }

  export type UserWalletUncheckedCreateInput = {
    id?: string
    userId: string
    chain: string
    derivationIndex: number
    address: string
    createdAt?: Date | string
    lastKnownBalance?: string
  }

  export type UserWalletUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    derivationIndex?: IntFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastKnownBalance?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutWalletsNestedInput
  }

  export type UserWalletUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    derivationIndex?: IntFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastKnownBalance?: StringFieldUpdateOperationsInput | string
  }

  export type UserWalletCreateManyInput = {
    id?: string
    userId: string
    chain: string
    derivationIndex: number
    address: string
    createdAt?: Date | string
    lastKnownBalance?: string
  }

  export type UserWalletUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    derivationIndex?: IntFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastKnownBalance?: StringFieldUpdateOperationsInput | string
  }

  export type UserWalletUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    derivationIndex?: IntFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastKnownBalance?: StringFieldUpdateOperationsInput | string
  }

  export type ChainScanStateCreateInput = {
    chain: string
    lastScannedBlock?: bigint | number
    updatedAt?: Date | string
  }

  export type ChainScanStateUncheckedCreateInput = {
    chain: string
    lastScannedBlock?: bigint | number
    updatedAt?: Date | string
  }

  export type ChainScanStateUpdateInput = {
    chain?: StringFieldUpdateOperationsInput | string
    lastScannedBlock?: BigIntFieldUpdateOperationsInput | bigint | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChainScanStateUncheckedUpdateInput = {
    chain?: StringFieldUpdateOperationsInput | string
    lastScannedBlock?: BigIntFieldUpdateOperationsInput | bigint | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChainScanStateCreateManyInput = {
    chain: string
    lastScannedBlock?: bigint | number
    updatedAt?: Date | string
  }

  export type ChainScanStateUpdateManyMutationInput = {
    chain?: StringFieldUpdateOperationsInput | string
    lastScannedBlock?: BigIntFieldUpdateOperationsInput | bigint | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChainScanStateUncheckedUpdateManyInput = {
    chain?: StringFieldUpdateOperationsInput | string
    lastScannedBlock?: BigIntFieldUpdateOperationsInput | bigint | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreasuryAccountCreateInput = {
    id?: string
    name: string
    type: $Enums.TreasuryAccountType
    network?: string | null
    currency: string
    walletAddress?: string | null
    isActive?: boolean
    createdAt?: Date | string
    parentAccount?: TreasuryAccountCreateNestedOneWithoutChildrenInput
    children?: TreasuryAccountCreateNestedManyWithoutParentAccountInput
    entries?: TreasuryEntryCreateNestedManyWithoutAccountInput
  }

  export type TreasuryAccountUncheckedCreateInput = {
    id?: string
    name: string
    type: $Enums.TreasuryAccountType
    network?: string | null
    currency: string
    walletAddress?: string | null
    parentAccountId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    children?: TreasuryAccountUncheckedCreateNestedManyWithoutParentAccountInput
    entries?: TreasuryEntryUncheckedCreateNestedManyWithoutAccountInput
  }

  export type TreasuryAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTreasuryAccountTypeFieldUpdateOperationsInput | $Enums.TreasuryAccountType
    network?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentAccount?: TreasuryAccountUpdateOneWithoutChildrenNestedInput
    children?: TreasuryAccountUpdateManyWithoutParentAccountNestedInput
    entries?: TreasuryEntryUpdateManyWithoutAccountNestedInput
  }

  export type TreasuryAccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTreasuryAccountTypeFieldUpdateOperationsInput | $Enums.TreasuryAccountType
    network?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    parentAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: TreasuryAccountUncheckedUpdateManyWithoutParentAccountNestedInput
    entries?: TreasuryEntryUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type TreasuryAccountCreateManyInput = {
    id?: string
    name: string
    type: $Enums.TreasuryAccountType
    network?: string | null
    currency: string
    walletAddress?: string | null
    parentAccountId?: string | null
    isActive?: boolean
    createdAt?: Date | string
  }

  export type TreasuryAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTreasuryAccountTypeFieldUpdateOperationsInput | $Enums.TreasuryAccountType
    network?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreasuryAccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTreasuryAccountTypeFieldUpdateOperationsInput | $Enums.TreasuryAccountType
    network?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    parentAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreasuryLedgerCreateInput = {
    id?: string
    referenceType: $Enums.TreasuryLedgerReferenceType
    referenceId?: string | null
    description: string
    network: string
    currency: string
    createdByAdminId?: string | null
    locked?: boolean
    createdAt?: Date | string
    entries?: TreasuryEntryCreateNestedManyWithoutLedgerInput
  }

  export type TreasuryLedgerUncheckedCreateInput = {
    id?: string
    referenceType: $Enums.TreasuryLedgerReferenceType
    referenceId?: string | null
    description: string
    network: string
    currency: string
    createdByAdminId?: string | null
    locked?: boolean
    createdAt?: Date | string
    entries?: TreasuryEntryUncheckedCreateNestedManyWithoutLedgerInput
  }

  export type TreasuryLedgerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    referenceType?: EnumTreasuryLedgerReferenceTypeFieldUpdateOperationsInput | $Enums.TreasuryLedgerReferenceType
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    createdByAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    locked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entries?: TreasuryEntryUpdateManyWithoutLedgerNestedInput
  }

  export type TreasuryLedgerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    referenceType?: EnumTreasuryLedgerReferenceTypeFieldUpdateOperationsInput | $Enums.TreasuryLedgerReferenceType
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    createdByAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    locked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entries?: TreasuryEntryUncheckedUpdateManyWithoutLedgerNestedInput
  }

  export type TreasuryLedgerCreateManyInput = {
    id?: string
    referenceType: $Enums.TreasuryLedgerReferenceType
    referenceId?: string | null
    description: string
    network: string
    currency: string
    createdByAdminId?: string | null
    locked?: boolean
    createdAt?: Date | string
  }

  export type TreasuryLedgerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    referenceType?: EnumTreasuryLedgerReferenceTypeFieldUpdateOperationsInput | $Enums.TreasuryLedgerReferenceType
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    createdByAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    locked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreasuryLedgerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    referenceType?: EnumTreasuryLedgerReferenceTypeFieldUpdateOperationsInput | $Enums.TreasuryLedgerReferenceType
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    createdByAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    locked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreasuryEntryCreateInput = {
    id?: string
    debitAmount?: bigint | number
    creditAmount?: bigint | number
    currency: string
    network: string
    createdAt?: Date | string
    ledger: TreasuryLedgerCreateNestedOneWithoutEntriesInput
    account: TreasuryAccountCreateNestedOneWithoutEntriesInput
  }

  export type TreasuryEntryUncheckedCreateInput = {
    id?: string
    ledgerId: string
    accountId: string
    debitAmount?: bigint | number
    creditAmount?: bigint | number
    currency: string
    network: string
    createdAt?: Date | string
  }

  export type TreasuryEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    debitAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    creditAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ledger?: TreasuryLedgerUpdateOneRequiredWithoutEntriesNestedInput
    account?: TreasuryAccountUpdateOneRequiredWithoutEntriesNestedInput
  }

  export type TreasuryEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ledgerId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    debitAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    creditAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreasuryEntryCreateManyInput = {
    id?: string
    ledgerId: string
    accountId: string
    debitAmount?: bigint | number
    creditAmount?: bigint | number
    currency: string
    network: string
    createdAt?: Date | string
  }

  export type TreasuryEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    debitAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    creditAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreasuryEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ledgerId?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    debitAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    creditAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BalanceSnapshotCreateInput = {
    id?: string
    snapshotTime?: Date | string
    network: string
    currency: string
    totalAssets: bigint | number
    totalLiabilities: bigint | number
    totalEquity: bigint | number
  }

  export type BalanceSnapshotUncheckedCreateInput = {
    id?: string
    snapshotTime?: Date | string
    network: string
    currency: string
    totalAssets: bigint | number
    totalLiabilities: bigint | number
    totalEquity: bigint | number
  }

  export type BalanceSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    snapshotTime?: DateTimeFieldUpdateOperationsInput | Date | string
    network?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    totalAssets?: BigIntFieldUpdateOperationsInput | bigint | number
    totalLiabilities?: BigIntFieldUpdateOperationsInput | bigint | number
    totalEquity?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type BalanceSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    snapshotTime?: DateTimeFieldUpdateOperationsInput | Date | string
    network?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    totalAssets?: BigIntFieldUpdateOperationsInput | bigint | number
    totalLiabilities?: BigIntFieldUpdateOperationsInput | bigint | number
    totalEquity?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type BalanceSnapshotCreateManyInput = {
    id?: string
    snapshotTime?: Date | string
    network: string
    currency: string
    totalAssets: bigint | number
    totalLiabilities: bigint | number
    totalEquity: bigint | number
  }

  export type BalanceSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    snapshotTime?: DateTimeFieldUpdateOperationsInput | Date | string
    network?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    totalAssets?: BigIntFieldUpdateOperationsInput | bigint | number
    totalLiabilities?: BigIntFieldUpdateOperationsInput | bigint | number
    totalEquity?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type BalanceSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    snapshotTime?: DateTimeFieldUpdateOperationsInput | Date | string
    network?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    totalAssets?: BigIntFieldUpdateOperationsInput | bigint | number
    totalLiabilities?: BigIntFieldUpdateOperationsInput | bigint | number
    totalEquity?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type TreasuryStateCreateInput = {
    chain: string
    totalOnchainBalance?: string
    totalUserLiabilities?: string
    sweepableBalance?: string
    lastSyncedAt?: Date | string
    locked?: boolean
    lockedAt?: Date | string | null
    lockedBy?: string | null
  }

  export type TreasuryStateUncheckedCreateInput = {
    chain: string
    totalOnchainBalance?: string
    totalUserLiabilities?: string
    sweepableBalance?: string
    lastSyncedAt?: Date | string
    locked?: boolean
    lockedAt?: Date | string | null
    lockedBy?: string | null
  }

  export type TreasuryStateUpdateInput = {
    chain?: StringFieldUpdateOperationsInput | string
    totalOnchainBalance?: StringFieldUpdateOperationsInput | string
    totalUserLiabilities?: StringFieldUpdateOperationsInput | string
    sweepableBalance?: StringFieldUpdateOperationsInput | string
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locked?: BoolFieldUpdateOperationsInput | boolean
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lockedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TreasuryStateUncheckedUpdateInput = {
    chain?: StringFieldUpdateOperationsInput | string
    totalOnchainBalance?: StringFieldUpdateOperationsInput | string
    totalUserLiabilities?: StringFieldUpdateOperationsInput | string
    sweepableBalance?: StringFieldUpdateOperationsInput | string
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locked?: BoolFieldUpdateOperationsInput | boolean
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lockedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TreasuryStateCreateManyInput = {
    chain: string
    totalOnchainBalance?: string
    totalUserLiabilities?: string
    sweepableBalance?: string
    lastSyncedAt?: Date | string
    locked?: boolean
    lockedAt?: Date | string | null
    lockedBy?: string | null
  }

  export type TreasuryStateUpdateManyMutationInput = {
    chain?: StringFieldUpdateOperationsInput | string
    totalOnchainBalance?: StringFieldUpdateOperationsInput | string
    totalUserLiabilities?: StringFieldUpdateOperationsInput | string
    sweepableBalance?: StringFieldUpdateOperationsInput | string
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locked?: BoolFieldUpdateOperationsInput | boolean
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lockedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TreasuryStateUncheckedUpdateManyInput = {
    chain?: StringFieldUpdateOperationsInput | string
    totalOnchainBalance?: StringFieldUpdateOperationsInput | string
    totalUserLiabilities?: StringFieldUpdateOperationsInput | string
    sweepableBalance?: StringFieldUpdateOperationsInput | string
    lastSyncedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locked?: BoolFieldUpdateOperationsInput | boolean
    lockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lockedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SweepCreateInput = {
    id?: string
    chain: string
    amount: string
    amountRaw: string
    fromWallet: string
    toWallet: string
    txHash?: string | null
    status?: $Enums.SweepStatus
    initiatedBy: string
    error?: string | null
    createdAt?: Date | string
    confirmedAt?: Date | string | null
  }

  export type SweepUncheckedCreateInput = {
    id?: string
    chain: string
    amount: string
    amountRaw: string
    fromWallet: string
    toWallet: string
    txHash?: string | null
    status?: $Enums.SweepStatus
    initiatedBy: string
    error?: string | null
    createdAt?: Date | string
    confirmedAt?: Date | string | null
  }

  export type SweepUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    amountRaw?: StringFieldUpdateOperationsInput | string
    fromWallet?: StringFieldUpdateOperationsInput | string
    toWallet?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSweepStatusFieldUpdateOperationsInput | $Enums.SweepStatus
    initiatedBy?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SweepUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    amountRaw?: StringFieldUpdateOperationsInput | string
    fromWallet?: StringFieldUpdateOperationsInput | string
    toWallet?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSweepStatusFieldUpdateOperationsInput | $Enums.SweepStatus
    initiatedBy?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SweepCreateManyInput = {
    id?: string
    chain: string
    amount: string
    amountRaw: string
    fromWallet: string
    toWallet: string
    txHash?: string | null
    status?: $Enums.SweepStatus
    initiatedBy: string
    error?: string | null
    createdAt?: Date | string
    confirmedAt?: Date | string | null
  }

  export type SweepUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    amountRaw?: StringFieldUpdateOperationsInput | string
    fromWallet?: StringFieldUpdateOperationsInput | string
    toWallet?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSweepStatusFieldUpdateOperationsInput | $Enums.SweepStatus
    initiatedBy?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SweepUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    amountRaw?: StringFieldUpdateOperationsInput | string
    fromWallet?: StringFieldUpdateOperationsInput | string
    toWallet?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSweepStatusFieldUpdateOperationsInput | $Enums.SweepStatus
    initiatedBy?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type EnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ChainTransactionListRelationFilter = {
    every?: ChainTransactionWhereInput
    some?: ChainTransactionWhereInput
    none?: ChainTransactionWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type UserWalletListRelationFilter = {
    every?: UserWalletWhereInput
    some?: UserWalletWhereInput
    none?: UserWalletWhereInput
  }

  export type WithdrawalListRelationFilter = {
    every?: WithdrawalWhereInput
    some?: WithdrawalWhereInput
    none?: WithdrawalWhereInput
  }

  export type ChainTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserWalletOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WithdrawalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    status?: SortOrder
    balance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    balance?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    status?: SortOrder
    balance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    status?: SortOrder
    balance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    balance?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type EnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumTxTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TxType | EnumTxTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TxType[] | ListEnumTxTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TxType[] | ListEnumTxTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTxTypeFilter<$PrismaModel> | $Enums.TxType
  }

  export type EnumTxStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TxStatus | EnumTxStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TxStatus[] | ListEnumTxStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TxStatus[] | ListEnumTxStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTxStatusFilter<$PrismaModel> | $Enums.TxStatus
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumTxTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TxType | EnumTxTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TxType[] | ListEnumTxTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TxType[] | ListEnumTxTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTxTypeWithAggregatesFilter<$PrismaModel> | $Enums.TxType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTxTypeFilter<$PrismaModel>
    _max?: NestedEnumTxTypeFilter<$PrismaModel>
  }

  export type EnumTxStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TxStatus | EnumTxStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TxStatus[] | ListEnumTxStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TxStatus[] | ListEnumTxStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTxStatusWithAggregatesFilter<$PrismaModel> | $Enums.TxStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTxStatusFilter<$PrismaModel>
    _max?: NestedEnumTxStatusFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumChainTxStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ChainTxStatus | EnumChainTxStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ChainTxStatus[] | ListEnumChainTxStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChainTxStatus[] | ListEnumChainTxStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumChainTxStatusFilter<$PrismaModel> | $Enums.ChainTxStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type EnumTxDirectionFilter<$PrismaModel = never> = {
    equals?: $Enums.TxDirection | EnumTxDirectionFieldRefInput<$PrismaModel>
    in?: $Enums.TxDirection[] | ListEnumTxDirectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.TxDirection[] | ListEnumTxDirectionFieldRefInput<$PrismaModel>
    not?: NestedEnumTxDirectionFilter<$PrismaModel> | $Enums.TxDirection
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ChainTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    to?: SortOrder
    amount?: SortOrder
    txHash?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    confirmedAt?: SortOrder
    blockNumber?: SortOrder
    direction?: SortOrder
  }

  export type ChainTransactionAvgOrderByAggregateInput = {
    blockNumber?: SortOrder
  }

  export type ChainTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    to?: SortOrder
    amount?: SortOrder
    txHash?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    confirmedAt?: SortOrder
    blockNumber?: SortOrder
    direction?: SortOrder
  }

  export type ChainTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    to?: SortOrder
    amount?: SortOrder
    txHash?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    confirmedAt?: SortOrder
    blockNumber?: SortOrder
    direction?: SortOrder
  }

  export type ChainTransactionSumOrderByAggregateInput = {
    blockNumber?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumChainTxStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChainTxStatus | EnumChainTxStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ChainTxStatus[] | ListEnumChainTxStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChainTxStatus[] | ListEnumChainTxStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumChainTxStatusWithAggregatesFilter<$PrismaModel> | $Enums.ChainTxStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChainTxStatusFilter<$PrismaModel>
    _max?: NestedEnumChainTxStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type EnumTxDirectionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TxDirection | EnumTxDirectionFieldRefInput<$PrismaModel>
    in?: $Enums.TxDirection[] | ListEnumTxDirectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.TxDirection[] | ListEnumTxDirectionFieldRefInput<$PrismaModel>
    not?: NestedEnumTxDirectionWithAggregatesFilter<$PrismaModel> | $Enums.TxDirection
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTxDirectionFilter<$PrismaModel>
    _max?: NestedEnumTxDirectionFilter<$PrismaModel>
  }

  export type EnumLedgerTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LedgerType | EnumLedgerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LedgerType[] | ListEnumLedgerTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LedgerType[] | ListEnumLedgerTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLedgerTypeFilter<$PrismaModel> | $Enums.LedgerType
  }

  export type LedgerEntryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    referenceId?: SortOrder
    createdAt?: SortOrder
  }

  export type LedgerEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    referenceId?: SortOrder
    createdAt?: SortOrder
  }

  export type LedgerEntryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    referenceId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumLedgerTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LedgerType | EnumLedgerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LedgerType[] | ListEnumLedgerTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LedgerType[] | ListEnumLedgerTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLedgerTypeWithAggregatesFilter<$PrismaModel> | $Enums.LedgerType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLedgerTypeFilter<$PrismaModel>
    _max?: NestedEnumLedgerTypeFilter<$PrismaModel>
  }

  export type UserBalanceUserIdChainCompoundUniqueInput = {
    userId: string
    chain: string
  }

  export type UserBalanceCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    balance?: SortOrder
  }

  export type UserBalanceMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    balance?: SortOrder
  }

  export type UserBalanceMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    balance?: SortOrder
  }

  export type WithdrawalCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    walletAddress?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type WithdrawalAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type WithdrawalMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    walletAddress?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type WithdrawalMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    walletAddress?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type WithdrawalSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type SystemSettingCountOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type SystemSettingMaxOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type SystemSettingMinOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UserWalletChainDerivationIndexCompoundUniqueInput = {
    chain: string
    derivationIndex: number
  }

  export type UserWalletUserIdChainCompoundUniqueInput = {
    userId: string
    chain: string
  }

  export type UserWalletCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    derivationIndex?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    lastKnownBalance?: SortOrder
  }

  export type UserWalletAvgOrderByAggregateInput = {
    derivationIndex?: SortOrder
  }

  export type UserWalletMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    derivationIndex?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    lastKnownBalance?: SortOrder
  }

  export type UserWalletMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    chain?: SortOrder
    derivationIndex?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    lastKnownBalance?: SortOrder
  }

  export type UserWalletSumOrderByAggregateInput = {
    derivationIndex?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type ChainScanStateCountOrderByAggregateInput = {
    chain?: SortOrder
    lastScannedBlock?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChainScanStateAvgOrderByAggregateInput = {
    lastScannedBlock?: SortOrder
  }

  export type ChainScanStateMaxOrderByAggregateInput = {
    chain?: SortOrder
    lastScannedBlock?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChainScanStateMinOrderByAggregateInput = {
    chain?: SortOrder
    lastScannedBlock?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChainScanStateSumOrderByAggregateInput = {
    lastScannedBlock?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type EnumTreasuryAccountTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TreasuryAccountType | EnumTreasuryAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TreasuryAccountType[] | ListEnumTreasuryAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TreasuryAccountType[] | ListEnumTreasuryAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTreasuryAccountTypeFilter<$PrismaModel> | $Enums.TreasuryAccountType
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TreasuryAccountNullableRelationFilter = {
    is?: TreasuryAccountWhereInput | null
    isNot?: TreasuryAccountWhereInput | null
  }

  export type TreasuryAccountListRelationFilter = {
    every?: TreasuryAccountWhereInput
    some?: TreasuryAccountWhereInput
    none?: TreasuryAccountWhereInput
  }

  export type TreasuryEntryListRelationFilter = {
    every?: TreasuryEntryWhereInput
    some?: TreasuryEntryWhereInput
    none?: TreasuryEntryWhereInput
  }

  export type TreasuryAccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TreasuryEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TreasuryAccountNameCurrencyNetworkCompoundUniqueInput = {
    name: string
    currency: string
    network: string
  }

  export type TreasuryAccountCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    network?: SortOrder
    currency?: SortOrder
    walletAddress?: SortOrder
    parentAccountId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type TreasuryAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    network?: SortOrder
    currency?: SortOrder
    walletAddress?: SortOrder
    parentAccountId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type TreasuryAccountMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    network?: SortOrder
    currency?: SortOrder
    walletAddress?: SortOrder
    parentAccountId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumTreasuryAccountTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TreasuryAccountType | EnumTreasuryAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TreasuryAccountType[] | ListEnumTreasuryAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TreasuryAccountType[] | ListEnumTreasuryAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTreasuryAccountTypeWithAggregatesFilter<$PrismaModel> | $Enums.TreasuryAccountType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTreasuryAccountTypeFilter<$PrismaModel>
    _max?: NestedEnumTreasuryAccountTypeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumTreasuryLedgerReferenceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TreasuryLedgerReferenceType | EnumTreasuryLedgerReferenceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TreasuryLedgerReferenceType[] | ListEnumTreasuryLedgerReferenceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TreasuryLedgerReferenceType[] | ListEnumTreasuryLedgerReferenceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTreasuryLedgerReferenceTypeFilter<$PrismaModel> | $Enums.TreasuryLedgerReferenceType
  }

  export type TreasuryLedgerCountOrderByAggregateInput = {
    id?: SortOrder
    referenceType?: SortOrder
    referenceId?: SortOrder
    description?: SortOrder
    network?: SortOrder
    currency?: SortOrder
    createdByAdminId?: SortOrder
    locked?: SortOrder
    createdAt?: SortOrder
  }

  export type TreasuryLedgerMaxOrderByAggregateInput = {
    id?: SortOrder
    referenceType?: SortOrder
    referenceId?: SortOrder
    description?: SortOrder
    network?: SortOrder
    currency?: SortOrder
    createdByAdminId?: SortOrder
    locked?: SortOrder
    createdAt?: SortOrder
  }

  export type TreasuryLedgerMinOrderByAggregateInput = {
    id?: SortOrder
    referenceType?: SortOrder
    referenceId?: SortOrder
    description?: SortOrder
    network?: SortOrder
    currency?: SortOrder
    createdByAdminId?: SortOrder
    locked?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumTreasuryLedgerReferenceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TreasuryLedgerReferenceType | EnumTreasuryLedgerReferenceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TreasuryLedgerReferenceType[] | ListEnumTreasuryLedgerReferenceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TreasuryLedgerReferenceType[] | ListEnumTreasuryLedgerReferenceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTreasuryLedgerReferenceTypeWithAggregatesFilter<$PrismaModel> | $Enums.TreasuryLedgerReferenceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTreasuryLedgerReferenceTypeFilter<$PrismaModel>
    _max?: NestedEnumTreasuryLedgerReferenceTypeFilter<$PrismaModel>
  }

  export type TreasuryLedgerRelationFilter = {
    is?: TreasuryLedgerWhereInput
    isNot?: TreasuryLedgerWhereInput
  }

  export type TreasuryAccountRelationFilter = {
    is?: TreasuryAccountWhereInput
    isNot?: TreasuryAccountWhereInput
  }

  export type TreasuryEntryCountOrderByAggregateInput = {
    id?: SortOrder
    ledgerId?: SortOrder
    accountId?: SortOrder
    debitAmount?: SortOrder
    creditAmount?: SortOrder
    currency?: SortOrder
    network?: SortOrder
    createdAt?: SortOrder
  }

  export type TreasuryEntryAvgOrderByAggregateInput = {
    debitAmount?: SortOrder
    creditAmount?: SortOrder
  }

  export type TreasuryEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    ledgerId?: SortOrder
    accountId?: SortOrder
    debitAmount?: SortOrder
    creditAmount?: SortOrder
    currency?: SortOrder
    network?: SortOrder
    createdAt?: SortOrder
  }

  export type TreasuryEntryMinOrderByAggregateInput = {
    id?: SortOrder
    ledgerId?: SortOrder
    accountId?: SortOrder
    debitAmount?: SortOrder
    creditAmount?: SortOrder
    currency?: SortOrder
    network?: SortOrder
    createdAt?: SortOrder
  }

  export type TreasuryEntrySumOrderByAggregateInput = {
    debitAmount?: SortOrder
    creditAmount?: SortOrder
  }

  export type BalanceSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    snapshotTime?: SortOrder
    network?: SortOrder
    currency?: SortOrder
    totalAssets?: SortOrder
    totalLiabilities?: SortOrder
    totalEquity?: SortOrder
  }

  export type BalanceSnapshotAvgOrderByAggregateInput = {
    totalAssets?: SortOrder
    totalLiabilities?: SortOrder
    totalEquity?: SortOrder
  }

  export type BalanceSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    snapshotTime?: SortOrder
    network?: SortOrder
    currency?: SortOrder
    totalAssets?: SortOrder
    totalLiabilities?: SortOrder
    totalEquity?: SortOrder
  }

  export type BalanceSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    snapshotTime?: SortOrder
    network?: SortOrder
    currency?: SortOrder
    totalAssets?: SortOrder
    totalLiabilities?: SortOrder
    totalEquity?: SortOrder
  }

  export type BalanceSnapshotSumOrderByAggregateInput = {
    totalAssets?: SortOrder
    totalLiabilities?: SortOrder
    totalEquity?: SortOrder
  }

  export type TreasuryStateCountOrderByAggregateInput = {
    chain?: SortOrder
    totalOnchainBalance?: SortOrder
    totalUserLiabilities?: SortOrder
    sweepableBalance?: SortOrder
    lastSyncedAt?: SortOrder
    locked?: SortOrder
    lockedAt?: SortOrder
    lockedBy?: SortOrder
  }

  export type TreasuryStateMaxOrderByAggregateInput = {
    chain?: SortOrder
    totalOnchainBalance?: SortOrder
    totalUserLiabilities?: SortOrder
    sweepableBalance?: SortOrder
    lastSyncedAt?: SortOrder
    locked?: SortOrder
    lockedAt?: SortOrder
    lockedBy?: SortOrder
  }

  export type TreasuryStateMinOrderByAggregateInput = {
    chain?: SortOrder
    totalOnchainBalance?: SortOrder
    totalUserLiabilities?: SortOrder
    sweepableBalance?: SortOrder
    lastSyncedAt?: SortOrder
    locked?: SortOrder
    lockedAt?: SortOrder
    lockedBy?: SortOrder
  }

  export type EnumSweepStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SweepStatus | EnumSweepStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SweepStatus[] | ListEnumSweepStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SweepStatus[] | ListEnumSweepStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSweepStatusFilter<$PrismaModel> | $Enums.SweepStatus
  }

  export type SweepCountOrderByAggregateInput = {
    id?: SortOrder
    chain?: SortOrder
    amount?: SortOrder
    amountRaw?: SortOrder
    fromWallet?: SortOrder
    toWallet?: SortOrder
    txHash?: SortOrder
    status?: SortOrder
    initiatedBy?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    confirmedAt?: SortOrder
  }

  export type SweepMaxOrderByAggregateInput = {
    id?: SortOrder
    chain?: SortOrder
    amount?: SortOrder
    amountRaw?: SortOrder
    fromWallet?: SortOrder
    toWallet?: SortOrder
    txHash?: SortOrder
    status?: SortOrder
    initiatedBy?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    confirmedAt?: SortOrder
  }

  export type SweepMinOrderByAggregateInput = {
    id?: SortOrder
    chain?: SortOrder
    amount?: SortOrder
    amountRaw?: SortOrder
    fromWallet?: SortOrder
    toWallet?: SortOrder
    txHash?: SortOrder
    status?: SortOrder
    initiatedBy?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    confirmedAt?: SortOrder
  }

  export type EnumSweepStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SweepStatus | EnumSweepStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SweepStatus[] | ListEnumSweepStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SweepStatus[] | ListEnumSweepStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSweepStatusWithAggregatesFilter<$PrismaModel> | $Enums.SweepStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSweepStatusFilter<$PrismaModel>
    _max?: NestedEnumSweepStatusFilter<$PrismaModel>
  }

  export type ChainTransactionCreateNestedManyWithoutUserInput = {
    create?: XOR<ChainTransactionCreateWithoutUserInput, ChainTransactionUncheckedCreateWithoutUserInput> | ChainTransactionCreateWithoutUserInput[] | ChainTransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChainTransactionCreateOrConnectWithoutUserInput | ChainTransactionCreateOrConnectWithoutUserInput[]
    createMany?: ChainTransactionCreateManyUserInputEnvelope
    connect?: ChainTransactionWhereUniqueInput | ChainTransactionWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type UserWalletCreateNestedManyWithoutUserInput = {
    create?: XOR<UserWalletCreateWithoutUserInput, UserWalletUncheckedCreateWithoutUserInput> | UserWalletCreateWithoutUserInput[] | UserWalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserWalletCreateOrConnectWithoutUserInput | UserWalletCreateOrConnectWithoutUserInput[]
    createMany?: UserWalletCreateManyUserInputEnvelope
    connect?: UserWalletWhereUniqueInput | UserWalletWhereUniqueInput[]
  }

  export type WithdrawalCreateNestedManyWithoutUserInput = {
    create?: XOR<WithdrawalCreateWithoutUserInput, WithdrawalUncheckedCreateWithoutUserInput> | WithdrawalCreateWithoutUserInput[] | WithdrawalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WithdrawalCreateOrConnectWithoutUserInput | WithdrawalCreateOrConnectWithoutUserInput[]
    createMany?: WithdrawalCreateManyUserInputEnvelope
    connect?: WithdrawalWhereUniqueInput | WithdrawalWhereUniqueInput[]
  }

  export type ChainTransactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ChainTransactionCreateWithoutUserInput, ChainTransactionUncheckedCreateWithoutUserInput> | ChainTransactionCreateWithoutUserInput[] | ChainTransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChainTransactionCreateOrConnectWithoutUserInput | ChainTransactionCreateOrConnectWithoutUserInput[]
    createMany?: ChainTransactionCreateManyUserInputEnvelope
    connect?: ChainTransactionWhereUniqueInput | ChainTransactionWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type UserWalletUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserWalletCreateWithoutUserInput, UserWalletUncheckedCreateWithoutUserInput> | UserWalletCreateWithoutUserInput[] | UserWalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserWalletCreateOrConnectWithoutUserInput | UserWalletCreateOrConnectWithoutUserInput[]
    createMany?: UserWalletCreateManyUserInputEnvelope
    connect?: UserWalletWhereUniqueInput | UserWalletWhereUniqueInput[]
  }

  export type WithdrawalUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WithdrawalCreateWithoutUserInput, WithdrawalUncheckedCreateWithoutUserInput> | WithdrawalCreateWithoutUserInput[] | WithdrawalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WithdrawalCreateOrConnectWithoutUserInput | WithdrawalCreateOrConnectWithoutUserInput[]
    createMany?: WithdrawalCreateManyUserInputEnvelope
    connect?: WithdrawalWhereUniqueInput | WithdrawalWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type EnumStatusFieldUpdateOperationsInput = {
    set?: $Enums.Status
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ChainTransactionUpdateManyWithoutUserNestedInput = {
    create?: XOR<ChainTransactionCreateWithoutUserInput, ChainTransactionUncheckedCreateWithoutUserInput> | ChainTransactionCreateWithoutUserInput[] | ChainTransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChainTransactionCreateOrConnectWithoutUserInput | ChainTransactionCreateOrConnectWithoutUserInput[]
    upsert?: ChainTransactionUpsertWithWhereUniqueWithoutUserInput | ChainTransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ChainTransactionCreateManyUserInputEnvelope
    set?: ChainTransactionWhereUniqueInput | ChainTransactionWhereUniqueInput[]
    disconnect?: ChainTransactionWhereUniqueInput | ChainTransactionWhereUniqueInput[]
    delete?: ChainTransactionWhereUniqueInput | ChainTransactionWhereUniqueInput[]
    connect?: ChainTransactionWhereUniqueInput | ChainTransactionWhereUniqueInput[]
    update?: ChainTransactionUpdateWithWhereUniqueWithoutUserInput | ChainTransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ChainTransactionUpdateManyWithWhereWithoutUserInput | ChainTransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ChainTransactionScalarWhereInput | ChainTransactionScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutUserInput | TransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutUserInput | TransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutUserInput | TransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type UserWalletUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserWalletCreateWithoutUserInput, UserWalletUncheckedCreateWithoutUserInput> | UserWalletCreateWithoutUserInput[] | UserWalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserWalletCreateOrConnectWithoutUserInput | UserWalletCreateOrConnectWithoutUserInput[]
    upsert?: UserWalletUpsertWithWhereUniqueWithoutUserInput | UserWalletUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserWalletCreateManyUserInputEnvelope
    set?: UserWalletWhereUniqueInput | UserWalletWhereUniqueInput[]
    disconnect?: UserWalletWhereUniqueInput | UserWalletWhereUniqueInput[]
    delete?: UserWalletWhereUniqueInput | UserWalletWhereUniqueInput[]
    connect?: UserWalletWhereUniqueInput | UserWalletWhereUniqueInput[]
    update?: UserWalletUpdateWithWhereUniqueWithoutUserInput | UserWalletUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserWalletUpdateManyWithWhereWithoutUserInput | UserWalletUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserWalletScalarWhereInput | UserWalletScalarWhereInput[]
  }

  export type WithdrawalUpdateManyWithoutUserNestedInput = {
    create?: XOR<WithdrawalCreateWithoutUserInput, WithdrawalUncheckedCreateWithoutUserInput> | WithdrawalCreateWithoutUserInput[] | WithdrawalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WithdrawalCreateOrConnectWithoutUserInput | WithdrawalCreateOrConnectWithoutUserInput[]
    upsert?: WithdrawalUpsertWithWhereUniqueWithoutUserInput | WithdrawalUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WithdrawalCreateManyUserInputEnvelope
    set?: WithdrawalWhereUniqueInput | WithdrawalWhereUniqueInput[]
    disconnect?: WithdrawalWhereUniqueInput | WithdrawalWhereUniqueInput[]
    delete?: WithdrawalWhereUniqueInput | WithdrawalWhereUniqueInput[]
    connect?: WithdrawalWhereUniqueInput | WithdrawalWhereUniqueInput[]
    update?: WithdrawalUpdateWithWhereUniqueWithoutUserInput | WithdrawalUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WithdrawalUpdateManyWithWhereWithoutUserInput | WithdrawalUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WithdrawalScalarWhereInput | WithdrawalScalarWhereInput[]
  }

  export type ChainTransactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ChainTransactionCreateWithoutUserInput, ChainTransactionUncheckedCreateWithoutUserInput> | ChainTransactionCreateWithoutUserInput[] | ChainTransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ChainTransactionCreateOrConnectWithoutUserInput | ChainTransactionCreateOrConnectWithoutUserInput[]
    upsert?: ChainTransactionUpsertWithWhereUniqueWithoutUserInput | ChainTransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ChainTransactionCreateManyUserInputEnvelope
    set?: ChainTransactionWhereUniqueInput | ChainTransactionWhereUniqueInput[]
    disconnect?: ChainTransactionWhereUniqueInput | ChainTransactionWhereUniqueInput[]
    delete?: ChainTransactionWhereUniqueInput | ChainTransactionWhereUniqueInput[]
    connect?: ChainTransactionWhereUniqueInput | ChainTransactionWhereUniqueInput[]
    update?: ChainTransactionUpdateWithWhereUniqueWithoutUserInput | ChainTransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ChainTransactionUpdateManyWithWhereWithoutUserInput | ChainTransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ChainTransactionScalarWhereInput | ChainTransactionScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutUserInput | TransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutUserInput | TransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutUserInput | TransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type UserWalletUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserWalletCreateWithoutUserInput, UserWalletUncheckedCreateWithoutUserInput> | UserWalletCreateWithoutUserInput[] | UserWalletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserWalletCreateOrConnectWithoutUserInput | UserWalletCreateOrConnectWithoutUserInput[]
    upsert?: UserWalletUpsertWithWhereUniqueWithoutUserInput | UserWalletUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserWalletCreateManyUserInputEnvelope
    set?: UserWalletWhereUniqueInput | UserWalletWhereUniqueInput[]
    disconnect?: UserWalletWhereUniqueInput | UserWalletWhereUniqueInput[]
    delete?: UserWalletWhereUniqueInput | UserWalletWhereUniqueInput[]
    connect?: UserWalletWhereUniqueInput | UserWalletWhereUniqueInput[]
    update?: UserWalletUpdateWithWhereUniqueWithoutUserInput | UserWalletUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserWalletUpdateManyWithWhereWithoutUserInput | UserWalletUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserWalletScalarWhereInput | UserWalletScalarWhereInput[]
  }

  export type WithdrawalUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WithdrawalCreateWithoutUserInput, WithdrawalUncheckedCreateWithoutUserInput> | WithdrawalCreateWithoutUserInput[] | WithdrawalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WithdrawalCreateOrConnectWithoutUserInput | WithdrawalCreateOrConnectWithoutUserInput[]
    upsert?: WithdrawalUpsertWithWhereUniqueWithoutUserInput | WithdrawalUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WithdrawalCreateManyUserInputEnvelope
    set?: WithdrawalWhereUniqueInput | WithdrawalWhereUniqueInput[]
    disconnect?: WithdrawalWhereUniqueInput | WithdrawalWhereUniqueInput[]
    delete?: WithdrawalWhereUniqueInput | WithdrawalWhereUniqueInput[]
    connect?: WithdrawalWhereUniqueInput | WithdrawalWhereUniqueInput[]
    update?: WithdrawalUpdateWithWhereUniqueWithoutUserInput | WithdrawalUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WithdrawalUpdateManyWithWhereWithoutUserInput | WithdrawalUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WithdrawalScalarWhereInput | WithdrawalScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumTxTypeFieldUpdateOperationsInput = {
    set?: $Enums.TxType
  }

  export type EnumTxStatusFieldUpdateOperationsInput = {
    set?: $Enums.TxStatus
  }

  export type UserUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    upsert?: UserUpsertWithoutTransactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTransactionsInput, UserUpdateWithoutTransactionsInput>, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserCreateNestedOneWithoutChainTransactionsInput = {
    create?: XOR<UserCreateWithoutChainTransactionsInput, UserUncheckedCreateWithoutChainTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutChainTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumChainTxStatusFieldUpdateOperationsInput = {
    set?: $Enums.ChainTxStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type EnumTxDirectionFieldUpdateOperationsInput = {
    set?: $Enums.TxDirection
  }

  export type UserUpdateOneRequiredWithoutChainTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutChainTransactionsInput, UserUncheckedCreateWithoutChainTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutChainTransactionsInput
    upsert?: UserUpsertWithoutChainTransactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutChainTransactionsInput, UserUpdateWithoutChainTransactionsInput>, UserUncheckedUpdateWithoutChainTransactionsInput>
  }

  export type EnumLedgerTypeFieldUpdateOperationsInput = {
    set?: $Enums.LedgerType
  }

  export type UserCreateNestedOneWithoutWithdrawalsInput = {
    create?: XOR<UserCreateWithoutWithdrawalsInput, UserUncheckedCreateWithoutWithdrawalsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWithdrawalsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutWithdrawalsNestedInput = {
    create?: XOR<UserCreateWithoutWithdrawalsInput, UserUncheckedCreateWithoutWithdrawalsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWithdrawalsInput
    upsert?: UserUpsertWithoutWithdrawalsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWithdrawalsInput, UserUpdateWithoutWithdrawalsInput>, UserUncheckedUpdateWithoutWithdrawalsInput>
  }

  export type UserCreateNestedOneWithoutWalletsInput = {
    create?: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletsInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutWalletsNestedInput = {
    create?: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletsInput
    upsert?: UserUpsertWithoutWalletsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWalletsInput, UserUpdateWithoutWalletsInput>, UserUncheckedUpdateWithoutWalletsInput>
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type TreasuryAccountCreateNestedOneWithoutChildrenInput = {
    create?: XOR<TreasuryAccountCreateWithoutChildrenInput, TreasuryAccountUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: TreasuryAccountCreateOrConnectWithoutChildrenInput
    connect?: TreasuryAccountWhereUniqueInput
  }

  export type TreasuryAccountCreateNestedManyWithoutParentAccountInput = {
    create?: XOR<TreasuryAccountCreateWithoutParentAccountInput, TreasuryAccountUncheckedCreateWithoutParentAccountInput> | TreasuryAccountCreateWithoutParentAccountInput[] | TreasuryAccountUncheckedCreateWithoutParentAccountInput[]
    connectOrCreate?: TreasuryAccountCreateOrConnectWithoutParentAccountInput | TreasuryAccountCreateOrConnectWithoutParentAccountInput[]
    createMany?: TreasuryAccountCreateManyParentAccountInputEnvelope
    connect?: TreasuryAccountWhereUniqueInput | TreasuryAccountWhereUniqueInput[]
  }

  export type TreasuryEntryCreateNestedManyWithoutAccountInput = {
    create?: XOR<TreasuryEntryCreateWithoutAccountInput, TreasuryEntryUncheckedCreateWithoutAccountInput> | TreasuryEntryCreateWithoutAccountInput[] | TreasuryEntryUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: TreasuryEntryCreateOrConnectWithoutAccountInput | TreasuryEntryCreateOrConnectWithoutAccountInput[]
    createMany?: TreasuryEntryCreateManyAccountInputEnvelope
    connect?: TreasuryEntryWhereUniqueInput | TreasuryEntryWhereUniqueInput[]
  }

  export type TreasuryAccountUncheckedCreateNestedManyWithoutParentAccountInput = {
    create?: XOR<TreasuryAccountCreateWithoutParentAccountInput, TreasuryAccountUncheckedCreateWithoutParentAccountInput> | TreasuryAccountCreateWithoutParentAccountInput[] | TreasuryAccountUncheckedCreateWithoutParentAccountInput[]
    connectOrCreate?: TreasuryAccountCreateOrConnectWithoutParentAccountInput | TreasuryAccountCreateOrConnectWithoutParentAccountInput[]
    createMany?: TreasuryAccountCreateManyParentAccountInputEnvelope
    connect?: TreasuryAccountWhereUniqueInput | TreasuryAccountWhereUniqueInput[]
  }

  export type TreasuryEntryUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<TreasuryEntryCreateWithoutAccountInput, TreasuryEntryUncheckedCreateWithoutAccountInput> | TreasuryEntryCreateWithoutAccountInput[] | TreasuryEntryUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: TreasuryEntryCreateOrConnectWithoutAccountInput | TreasuryEntryCreateOrConnectWithoutAccountInput[]
    createMany?: TreasuryEntryCreateManyAccountInputEnvelope
    connect?: TreasuryEntryWhereUniqueInput | TreasuryEntryWhereUniqueInput[]
  }

  export type EnumTreasuryAccountTypeFieldUpdateOperationsInput = {
    set?: $Enums.TreasuryAccountType
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type TreasuryAccountUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<TreasuryAccountCreateWithoutChildrenInput, TreasuryAccountUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: TreasuryAccountCreateOrConnectWithoutChildrenInput
    upsert?: TreasuryAccountUpsertWithoutChildrenInput
    disconnect?: TreasuryAccountWhereInput | boolean
    delete?: TreasuryAccountWhereInput | boolean
    connect?: TreasuryAccountWhereUniqueInput
    update?: XOR<XOR<TreasuryAccountUpdateToOneWithWhereWithoutChildrenInput, TreasuryAccountUpdateWithoutChildrenInput>, TreasuryAccountUncheckedUpdateWithoutChildrenInput>
  }

  export type TreasuryAccountUpdateManyWithoutParentAccountNestedInput = {
    create?: XOR<TreasuryAccountCreateWithoutParentAccountInput, TreasuryAccountUncheckedCreateWithoutParentAccountInput> | TreasuryAccountCreateWithoutParentAccountInput[] | TreasuryAccountUncheckedCreateWithoutParentAccountInput[]
    connectOrCreate?: TreasuryAccountCreateOrConnectWithoutParentAccountInput | TreasuryAccountCreateOrConnectWithoutParentAccountInput[]
    upsert?: TreasuryAccountUpsertWithWhereUniqueWithoutParentAccountInput | TreasuryAccountUpsertWithWhereUniqueWithoutParentAccountInput[]
    createMany?: TreasuryAccountCreateManyParentAccountInputEnvelope
    set?: TreasuryAccountWhereUniqueInput | TreasuryAccountWhereUniqueInput[]
    disconnect?: TreasuryAccountWhereUniqueInput | TreasuryAccountWhereUniqueInput[]
    delete?: TreasuryAccountWhereUniqueInput | TreasuryAccountWhereUniqueInput[]
    connect?: TreasuryAccountWhereUniqueInput | TreasuryAccountWhereUniqueInput[]
    update?: TreasuryAccountUpdateWithWhereUniqueWithoutParentAccountInput | TreasuryAccountUpdateWithWhereUniqueWithoutParentAccountInput[]
    updateMany?: TreasuryAccountUpdateManyWithWhereWithoutParentAccountInput | TreasuryAccountUpdateManyWithWhereWithoutParentAccountInput[]
    deleteMany?: TreasuryAccountScalarWhereInput | TreasuryAccountScalarWhereInput[]
  }

  export type TreasuryEntryUpdateManyWithoutAccountNestedInput = {
    create?: XOR<TreasuryEntryCreateWithoutAccountInput, TreasuryEntryUncheckedCreateWithoutAccountInput> | TreasuryEntryCreateWithoutAccountInput[] | TreasuryEntryUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: TreasuryEntryCreateOrConnectWithoutAccountInput | TreasuryEntryCreateOrConnectWithoutAccountInput[]
    upsert?: TreasuryEntryUpsertWithWhereUniqueWithoutAccountInput | TreasuryEntryUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: TreasuryEntryCreateManyAccountInputEnvelope
    set?: TreasuryEntryWhereUniqueInput | TreasuryEntryWhereUniqueInput[]
    disconnect?: TreasuryEntryWhereUniqueInput | TreasuryEntryWhereUniqueInput[]
    delete?: TreasuryEntryWhereUniqueInput | TreasuryEntryWhereUniqueInput[]
    connect?: TreasuryEntryWhereUniqueInput | TreasuryEntryWhereUniqueInput[]
    update?: TreasuryEntryUpdateWithWhereUniqueWithoutAccountInput | TreasuryEntryUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: TreasuryEntryUpdateManyWithWhereWithoutAccountInput | TreasuryEntryUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: TreasuryEntryScalarWhereInput | TreasuryEntryScalarWhereInput[]
  }

  export type TreasuryAccountUncheckedUpdateManyWithoutParentAccountNestedInput = {
    create?: XOR<TreasuryAccountCreateWithoutParentAccountInput, TreasuryAccountUncheckedCreateWithoutParentAccountInput> | TreasuryAccountCreateWithoutParentAccountInput[] | TreasuryAccountUncheckedCreateWithoutParentAccountInput[]
    connectOrCreate?: TreasuryAccountCreateOrConnectWithoutParentAccountInput | TreasuryAccountCreateOrConnectWithoutParentAccountInput[]
    upsert?: TreasuryAccountUpsertWithWhereUniqueWithoutParentAccountInput | TreasuryAccountUpsertWithWhereUniqueWithoutParentAccountInput[]
    createMany?: TreasuryAccountCreateManyParentAccountInputEnvelope
    set?: TreasuryAccountWhereUniqueInput | TreasuryAccountWhereUniqueInput[]
    disconnect?: TreasuryAccountWhereUniqueInput | TreasuryAccountWhereUniqueInput[]
    delete?: TreasuryAccountWhereUniqueInput | TreasuryAccountWhereUniqueInput[]
    connect?: TreasuryAccountWhereUniqueInput | TreasuryAccountWhereUniqueInput[]
    update?: TreasuryAccountUpdateWithWhereUniqueWithoutParentAccountInput | TreasuryAccountUpdateWithWhereUniqueWithoutParentAccountInput[]
    updateMany?: TreasuryAccountUpdateManyWithWhereWithoutParentAccountInput | TreasuryAccountUpdateManyWithWhereWithoutParentAccountInput[]
    deleteMany?: TreasuryAccountScalarWhereInput | TreasuryAccountScalarWhereInput[]
  }

  export type TreasuryEntryUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<TreasuryEntryCreateWithoutAccountInput, TreasuryEntryUncheckedCreateWithoutAccountInput> | TreasuryEntryCreateWithoutAccountInput[] | TreasuryEntryUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: TreasuryEntryCreateOrConnectWithoutAccountInput | TreasuryEntryCreateOrConnectWithoutAccountInput[]
    upsert?: TreasuryEntryUpsertWithWhereUniqueWithoutAccountInput | TreasuryEntryUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: TreasuryEntryCreateManyAccountInputEnvelope
    set?: TreasuryEntryWhereUniqueInput | TreasuryEntryWhereUniqueInput[]
    disconnect?: TreasuryEntryWhereUniqueInput | TreasuryEntryWhereUniqueInput[]
    delete?: TreasuryEntryWhereUniqueInput | TreasuryEntryWhereUniqueInput[]
    connect?: TreasuryEntryWhereUniqueInput | TreasuryEntryWhereUniqueInput[]
    update?: TreasuryEntryUpdateWithWhereUniqueWithoutAccountInput | TreasuryEntryUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: TreasuryEntryUpdateManyWithWhereWithoutAccountInput | TreasuryEntryUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: TreasuryEntryScalarWhereInput | TreasuryEntryScalarWhereInput[]
  }

  export type TreasuryEntryCreateNestedManyWithoutLedgerInput = {
    create?: XOR<TreasuryEntryCreateWithoutLedgerInput, TreasuryEntryUncheckedCreateWithoutLedgerInput> | TreasuryEntryCreateWithoutLedgerInput[] | TreasuryEntryUncheckedCreateWithoutLedgerInput[]
    connectOrCreate?: TreasuryEntryCreateOrConnectWithoutLedgerInput | TreasuryEntryCreateOrConnectWithoutLedgerInput[]
    createMany?: TreasuryEntryCreateManyLedgerInputEnvelope
    connect?: TreasuryEntryWhereUniqueInput | TreasuryEntryWhereUniqueInput[]
  }

  export type TreasuryEntryUncheckedCreateNestedManyWithoutLedgerInput = {
    create?: XOR<TreasuryEntryCreateWithoutLedgerInput, TreasuryEntryUncheckedCreateWithoutLedgerInput> | TreasuryEntryCreateWithoutLedgerInput[] | TreasuryEntryUncheckedCreateWithoutLedgerInput[]
    connectOrCreate?: TreasuryEntryCreateOrConnectWithoutLedgerInput | TreasuryEntryCreateOrConnectWithoutLedgerInput[]
    createMany?: TreasuryEntryCreateManyLedgerInputEnvelope
    connect?: TreasuryEntryWhereUniqueInput | TreasuryEntryWhereUniqueInput[]
  }

  export type EnumTreasuryLedgerReferenceTypeFieldUpdateOperationsInput = {
    set?: $Enums.TreasuryLedgerReferenceType
  }

  export type TreasuryEntryUpdateManyWithoutLedgerNestedInput = {
    create?: XOR<TreasuryEntryCreateWithoutLedgerInput, TreasuryEntryUncheckedCreateWithoutLedgerInput> | TreasuryEntryCreateWithoutLedgerInput[] | TreasuryEntryUncheckedCreateWithoutLedgerInput[]
    connectOrCreate?: TreasuryEntryCreateOrConnectWithoutLedgerInput | TreasuryEntryCreateOrConnectWithoutLedgerInput[]
    upsert?: TreasuryEntryUpsertWithWhereUniqueWithoutLedgerInput | TreasuryEntryUpsertWithWhereUniqueWithoutLedgerInput[]
    createMany?: TreasuryEntryCreateManyLedgerInputEnvelope
    set?: TreasuryEntryWhereUniqueInput | TreasuryEntryWhereUniqueInput[]
    disconnect?: TreasuryEntryWhereUniqueInput | TreasuryEntryWhereUniqueInput[]
    delete?: TreasuryEntryWhereUniqueInput | TreasuryEntryWhereUniqueInput[]
    connect?: TreasuryEntryWhereUniqueInput | TreasuryEntryWhereUniqueInput[]
    update?: TreasuryEntryUpdateWithWhereUniqueWithoutLedgerInput | TreasuryEntryUpdateWithWhereUniqueWithoutLedgerInput[]
    updateMany?: TreasuryEntryUpdateManyWithWhereWithoutLedgerInput | TreasuryEntryUpdateManyWithWhereWithoutLedgerInput[]
    deleteMany?: TreasuryEntryScalarWhereInput | TreasuryEntryScalarWhereInput[]
  }

  export type TreasuryEntryUncheckedUpdateManyWithoutLedgerNestedInput = {
    create?: XOR<TreasuryEntryCreateWithoutLedgerInput, TreasuryEntryUncheckedCreateWithoutLedgerInput> | TreasuryEntryCreateWithoutLedgerInput[] | TreasuryEntryUncheckedCreateWithoutLedgerInput[]
    connectOrCreate?: TreasuryEntryCreateOrConnectWithoutLedgerInput | TreasuryEntryCreateOrConnectWithoutLedgerInput[]
    upsert?: TreasuryEntryUpsertWithWhereUniqueWithoutLedgerInput | TreasuryEntryUpsertWithWhereUniqueWithoutLedgerInput[]
    createMany?: TreasuryEntryCreateManyLedgerInputEnvelope
    set?: TreasuryEntryWhereUniqueInput | TreasuryEntryWhereUniqueInput[]
    disconnect?: TreasuryEntryWhereUniqueInput | TreasuryEntryWhereUniqueInput[]
    delete?: TreasuryEntryWhereUniqueInput | TreasuryEntryWhereUniqueInput[]
    connect?: TreasuryEntryWhereUniqueInput | TreasuryEntryWhereUniqueInput[]
    update?: TreasuryEntryUpdateWithWhereUniqueWithoutLedgerInput | TreasuryEntryUpdateWithWhereUniqueWithoutLedgerInput[]
    updateMany?: TreasuryEntryUpdateManyWithWhereWithoutLedgerInput | TreasuryEntryUpdateManyWithWhereWithoutLedgerInput[]
    deleteMany?: TreasuryEntryScalarWhereInput | TreasuryEntryScalarWhereInput[]
  }

  export type TreasuryLedgerCreateNestedOneWithoutEntriesInput = {
    create?: XOR<TreasuryLedgerCreateWithoutEntriesInput, TreasuryLedgerUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: TreasuryLedgerCreateOrConnectWithoutEntriesInput
    connect?: TreasuryLedgerWhereUniqueInput
  }

  export type TreasuryAccountCreateNestedOneWithoutEntriesInput = {
    create?: XOR<TreasuryAccountCreateWithoutEntriesInput, TreasuryAccountUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: TreasuryAccountCreateOrConnectWithoutEntriesInput
    connect?: TreasuryAccountWhereUniqueInput
  }

  export type TreasuryLedgerUpdateOneRequiredWithoutEntriesNestedInput = {
    create?: XOR<TreasuryLedgerCreateWithoutEntriesInput, TreasuryLedgerUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: TreasuryLedgerCreateOrConnectWithoutEntriesInput
    upsert?: TreasuryLedgerUpsertWithoutEntriesInput
    connect?: TreasuryLedgerWhereUniqueInput
    update?: XOR<XOR<TreasuryLedgerUpdateToOneWithWhereWithoutEntriesInput, TreasuryLedgerUpdateWithoutEntriesInput>, TreasuryLedgerUncheckedUpdateWithoutEntriesInput>
  }

  export type TreasuryAccountUpdateOneRequiredWithoutEntriesNestedInput = {
    create?: XOR<TreasuryAccountCreateWithoutEntriesInput, TreasuryAccountUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: TreasuryAccountCreateOrConnectWithoutEntriesInput
    upsert?: TreasuryAccountUpsertWithoutEntriesInput
    connect?: TreasuryAccountWhereUniqueInput
    update?: XOR<XOR<TreasuryAccountUpdateToOneWithWhereWithoutEntriesInput, TreasuryAccountUpdateWithoutEntriesInput>, TreasuryAccountUncheckedUpdateWithoutEntriesInput>
  }

  export type EnumSweepStatusFieldUpdateOperationsInput = {
    set?: $Enums.SweepStatus
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedEnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumTxTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TxType | EnumTxTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TxType[] | ListEnumTxTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TxType[] | ListEnumTxTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTxTypeFilter<$PrismaModel> | $Enums.TxType
  }

  export type NestedEnumTxStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TxStatus | EnumTxStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TxStatus[] | ListEnumTxStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TxStatus[] | ListEnumTxStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTxStatusFilter<$PrismaModel> | $Enums.TxStatus
  }

  export type NestedEnumTxTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TxType | EnumTxTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TxType[] | ListEnumTxTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TxType[] | ListEnumTxTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTxTypeWithAggregatesFilter<$PrismaModel> | $Enums.TxType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTxTypeFilter<$PrismaModel>
    _max?: NestedEnumTxTypeFilter<$PrismaModel>
  }

  export type NestedEnumTxStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TxStatus | EnumTxStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TxStatus[] | ListEnumTxStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TxStatus[] | ListEnumTxStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTxStatusWithAggregatesFilter<$PrismaModel> | $Enums.TxStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTxStatusFilter<$PrismaModel>
    _max?: NestedEnumTxStatusFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumChainTxStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ChainTxStatus | EnumChainTxStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ChainTxStatus[] | ListEnumChainTxStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChainTxStatus[] | ListEnumChainTxStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumChainTxStatusFilter<$PrismaModel> | $Enums.ChainTxStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedEnumTxDirectionFilter<$PrismaModel = never> = {
    equals?: $Enums.TxDirection | EnumTxDirectionFieldRefInput<$PrismaModel>
    in?: $Enums.TxDirection[] | ListEnumTxDirectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.TxDirection[] | ListEnumTxDirectionFieldRefInput<$PrismaModel>
    not?: NestedEnumTxDirectionFilter<$PrismaModel> | $Enums.TxDirection
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumChainTxStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChainTxStatus | EnumChainTxStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ChainTxStatus[] | ListEnumChainTxStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChainTxStatus[] | ListEnumChainTxStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumChainTxStatusWithAggregatesFilter<$PrismaModel> | $Enums.ChainTxStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChainTxStatusFilter<$PrismaModel>
    _max?: NestedEnumChainTxStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumTxDirectionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TxDirection | EnumTxDirectionFieldRefInput<$PrismaModel>
    in?: $Enums.TxDirection[] | ListEnumTxDirectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.TxDirection[] | ListEnumTxDirectionFieldRefInput<$PrismaModel>
    not?: NestedEnumTxDirectionWithAggregatesFilter<$PrismaModel> | $Enums.TxDirection
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTxDirectionFilter<$PrismaModel>
    _max?: NestedEnumTxDirectionFilter<$PrismaModel>
  }

  export type NestedEnumLedgerTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LedgerType | EnumLedgerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LedgerType[] | ListEnumLedgerTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LedgerType[] | ListEnumLedgerTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLedgerTypeFilter<$PrismaModel> | $Enums.LedgerType
  }

  export type NestedEnumLedgerTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LedgerType | EnumLedgerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LedgerType[] | ListEnumLedgerTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LedgerType[] | ListEnumLedgerTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLedgerTypeWithAggregatesFilter<$PrismaModel> | $Enums.LedgerType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLedgerTypeFilter<$PrismaModel>
    _max?: NestedEnumLedgerTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedEnumTreasuryAccountTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TreasuryAccountType | EnumTreasuryAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TreasuryAccountType[] | ListEnumTreasuryAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TreasuryAccountType[] | ListEnumTreasuryAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTreasuryAccountTypeFilter<$PrismaModel> | $Enums.TreasuryAccountType
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumTreasuryAccountTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TreasuryAccountType | EnumTreasuryAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TreasuryAccountType[] | ListEnumTreasuryAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TreasuryAccountType[] | ListEnumTreasuryAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTreasuryAccountTypeWithAggregatesFilter<$PrismaModel> | $Enums.TreasuryAccountType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTreasuryAccountTypeFilter<$PrismaModel>
    _max?: NestedEnumTreasuryAccountTypeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumTreasuryLedgerReferenceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TreasuryLedgerReferenceType | EnumTreasuryLedgerReferenceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TreasuryLedgerReferenceType[] | ListEnumTreasuryLedgerReferenceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TreasuryLedgerReferenceType[] | ListEnumTreasuryLedgerReferenceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTreasuryLedgerReferenceTypeFilter<$PrismaModel> | $Enums.TreasuryLedgerReferenceType
  }

  export type NestedEnumTreasuryLedgerReferenceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TreasuryLedgerReferenceType | EnumTreasuryLedgerReferenceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TreasuryLedgerReferenceType[] | ListEnumTreasuryLedgerReferenceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TreasuryLedgerReferenceType[] | ListEnumTreasuryLedgerReferenceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTreasuryLedgerReferenceTypeWithAggregatesFilter<$PrismaModel> | $Enums.TreasuryLedgerReferenceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTreasuryLedgerReferenceTypeFilter<$PrismaModel>
    _max?: NestedEnumTreasuryLedgerReferenceTypeFilter<$PrismaModel>
  }

  export type NestedEnumSweepStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SweepStatus | EnumSweepStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SweepStatus[] | ListEnumSweepStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SweepStatus[] | ListEnumSweepStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSweepStatusFilter<$PrismaModel> | $Enums.SweepStatus
  }

  export type NestedEnumSweepStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SweepStatus | EnumSweepStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SweepStatus[] | ListEnumSweepStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SweepStatus[] | ListEnumSweepStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSweepStatusWithAggregatesFilter<$PrismaModel> | $Enums.SweepStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSweepStatusFilter<$PrismaModel>
    _max?: NestedEnumSweepStatusFilter<$PrismaModel>
  }

  export type ChainTransactionCreateWithoutUserInput = {
    id?: string
    chain: string
    to: string
    amount: string
    txHash?: string | null
    status?: $Enums.ChainTxStatus
    createdAt?: Date | string
    confirmedAt?: Date | string | null
    blockNumber?: bigint | number | null
    direction?: $Enums.TxDirection
  }

  export type ChainTransactionUncheckedCreateWithoutUserInput = {
    id?: string
    chain: string
    to: string
    amount: string
    txHash?: string | null
    status?: $Enums.ChainTxStatus
    createdAt?: Date | string
    confirmedAt?: Date | string | null
    blockNumber?: bigint | number | null
    direction?: $Enums.TxDirection
  }

  export type ChainTransactionCreateOrConnectWithoutUserInput = {
    where: ChainTransactionWhereUniqueInput
    create: XOR<ChainTransactionCreateWithoutUserInput, ChainTransactionUncheckedCreateWithoutUserInput>
  }

  export type ChainTransactionCreateManyUserInputEnvelope = {
    data: ChainTransactionCreateManyUserInput | ChainTransactionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutUserInput = {
    id?: string
    amount: number
    type: $Enums.TxType
    status?: $Enums.TxStatus
    createdAt?: Date | string
  }

  export type TransactionUncheckedCreateWithoutUserInput = {
    id?: string
    amount: number
    type: $Enums.TxType
    status?: $Enums.TxStatus
    createdAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutUserInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput>
  }

  export type TransactionCreateManyUserInputEnvelope = {
    data: TransactionCreateManyUserInput | TransactionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserWalletCreateWithoutUserInput = {
    id?: string
    chain: string
    derivationIndex: number
    address: string
    createdAt?: Date | string
    lastKnownBalance?: string
  }

  export type UserWalletUncheckedCreateWithoutUserInput = {
    id?: string
    chain: string
    derivationIndex: number
    address: string
    createdAt?: Date | string
    lastKnownBalance?: string
  }

  export type UserWalletCreateOrConnectWithoutUserInput = {
    where: UserWalletWhereUniqueInput
    create: XOR<UserWalletCreateWithoutUserInput, UserWalletUncheckedCreateWithoutUserInput>
  }

  export type UserWalletCreateManyUserInputEnvelope = {
    data: UserWalletCreateManyUserInput | UserWalletCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WithdrawalCreateWithoutUserInput = {
    id?: string
    amount: number
    walletAddress?: string | null
    status?: $Enums.TxStatus
    createdAt?: Date | string
  }

  export type WithdrawalUncheckedCreateWithoutUserInput = {
    id?: string
    amount: number
    walletAddress?: string | null
    status?: $Enums.TxStatus
    createdAt?: Date | string
  }

  export type WithdrawalCreateOrConnectWithoutUserInput = {
    where: WithdrawalWhereUniqueInput
    create: XOR<WithdrawalCreateWithoutUserInput, WithdrawalUncheckedCreateWithoutUserInput>
  }

  export type WithdrawalCreateManyUserInputEnvelope = {
    data: WithdrawalCreateManyUserInput | WithdrawalCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ChainTransactionUpsertWithWhereUniqueWithoutUserInput = {
    where: ChainTransactionWhereUniqueInput
    update: XOR<ChainTransactionUpdateWithoutUserInput, ChainTransactionUncheckedUpdateWithoutUserInput>
    create: XOR<ChainTransactionCreateWithoutUserInput, ChainTransactionUncheckedCreateWithoutUserInput>
  }

  export type ChainTransactionUpdateWithWhereUniqueWithoutUserInput = {
    where: ChainTransactionWhereUniqueInput
    data: XOR<ChainTransactionUpdateWithoutUserInput, ChainTransactionUncheckedUpdateWithoutUserInput>
  }

  export type ChainTransactionUpdateManyWithWhereWithoutUserInput = {
    where: ChainTransactionScalarWhereInput
    data: XOR<ChainTransactionUpdateManyMutationInput, ChainTransactionUncheckedUpdateManyWithoutUserInput>
  }

  export type ChainTransactionScalarWhereInput = {
    AND?: ChainTransactionScalarWhereInput | ChainTransactionScalarWhereInput[]
    OR?: ChainTransactionScalarWhereInput[]
    NOT?: ChainTransactionScalarWhereInput | ChainTransactionScalarWhereInput[]
    id?: StringFilter<"ChainTransaction"> | string
    userId?: StringFilter<"ChainTransaction"> | string
    chain?: StringFilter<"ChainTransaction"> | string
    to?: StringFilter<"ChainTransaction"> | string
    amount?: StringFilter<"ChainTransaction"> | string
    txHash?: StringNullableFilter<"ChainTransaction"> | string | null
    status?: EnumChainTxStatusFilter<"ChainTransaction"> | $Enums.ChainTxStatus
    createdAt?: DateTimeFilter<"ChainTransaction"> | Date | string
    confirmedAt?: DateTimeNullableFilter<"ChainTransaction"> | Date | string | null
    blockNumber?: BigIntNullableFilter<"ChainTransaction"> | bigint | number | null
    direction?: EnumTxDirectionFilter<"ChainTransaction"> | $Enums.TxDirection
  }

  export type TransactionUpsertWithWhereUniqueWithoutUserInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutUserInput, TransactionUncheckedUpdateWithoutUserInput>
    create: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutUserInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutUserInput, TransactionUncheckedUpdateWithoutUserInput>
  }

  export type TransactionUpdateManyWithWhereWithoutUserInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutUserInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    userId?: StringFilter<"Transaction"> | string
    amount?: FloatFilter<"Transaction"> | number
    type?: EnumTxTypeFilter<"Transaction"> | $Enums.TxType
    status?: EnumTxStatusFilter<"Transaction"> | $Enums.TxStatus
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
  }

  export type UserWalletUpsertWithWhereUniqueWithoutUserInput = {
    where: UserWalletWhereUniqueInput
    update: XOR<UserWalletUpdateWithoutUserInput, UserWalletUncheckedUpdateWithoutUserInput>
    create: XOR<UserWalletCreateWithoutUserInput, UserWalletUncheckedCreateWithoutUserInput>
  }

  export type UserWalletUpdateWithWhereUniqueWithoutUserInput = {
    where: UserWalletWhereUniqueInput
    data: XOR<UserWalletUpdateWithoutUserInput, UserWalletUncheckedUpdateWithoutUserInput>
  }

  export type UserWalletUpdateManyWithWhereWithoutUserInput = {
    where: UserWalletScalarWhereInput
    data: XOR<UserWalletUpdateManyMutationInput, UserWalletUncheckedUpdateManyWithoutUserInput>
  }

  export type UserWalletScalarWhereInput = {
    AND?: UserWalletScalarWhereInput | UserWalletScalarWhereInput[]
    OR?: UserWalletScalarWhereInput[]
    NOT?: UserWalletScalarWhereInput | UserWalletScalarWhereInput[]
    id?: StringFilter<"UserWallet"> | string
    userId?: StringFilter<"UserWallet"> | string
    chain?: StringFilter<"UserWallet"> | string
    derivationIndex?: IntFilter<"UserWallet"> | number
    address?: StringFilter<"UserWallet"> | string
    createdAt?: DateTimeFilter<"UserWallet"> | Date | string
    lastKnownBalance?: StringFilter<"UserWallet"> | string
  }

  export type WithdrawalUpsertWithWhereUniqueWithoutUserInput = {
    where: WithdrawalWhereUniqueInput
    update: XOR<WithdrawalUpdateWithoutUserInput, WithdrawalUncheckedUpdateWithoutUserInput>
    create: XOR<WithdrawalCreateWithoutUserInput, WithdrawalUncheckedCreateWithoutUserInput>
  }

  export type WithdrawalUpdateWithWhereUniqueWithoutUserInput = {
    where: WithdrawalWhereUniqueInput
    data: XOR<WithdrawalUpdateWithoutUserInput, WithdrawalUncheckedUpdateWithoutUserInput>
  }

  export type WithdrawalUpdateManyWithWhereWithoutUserInput = {
    where: WithdrawalScalarWhereInput
    data: XOR<WithdrawalUpdateManyMutationInput, WithdrawalUncheckedUpdateManyWithoutUserInput>
  }

  export type WithdrawalScalarWhereInput = {
    AND?: WithdrawalScalarWhereInput | WithdrawalScalarWhereInput[]
    OR?: WithdrawalScalarWhereInput[]
    NOT?: WithdrawalScalarWhereInput | WithdrawalScalarWhereInput[]
    id?: StringFilter<"Withdrawal"> | string
    userId?: StringFilter<"Withdrawal"> | string
    amount?: FloatFilter<"Withdrawal"> | number
    walletAddress?: StringNullableFilter<"Withdrawal"> | string | null
    status?: EnumTxStatusFilter<"Withdrawal"> | $Enums.TxStatus
    createdAt?: DateTimeFilter<"Withdrawal"> | Date | string
  }

  export type UserCreateWithoutTransactionsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    status?: $Enums.Status
    balance?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    chainTransactions?: ChainTransactionCreateNestedManyWithoutUserInput
    wallets?: UserWalletCreateNestedManyWithoutUserInput
    withdrawals?: WithdrawalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTransactionsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    status?: $Enums.Status
    balance?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    chainTransactions?: ChainTransactionUncheckedCreateNestedManyWithoutUserInput
    wallets?: UserWalletUncheckedCreateNestedManyWithoutUserInput
    withdrawals?: WithdrawalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
  }

  export type UserUpsertWithoutTransactionsInput = {
    update: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    balance?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chainTransactions?: ChainTransactionUpdateManyWithoutUserNestedInput
    wallets?: UserWalletUpdateManyWithoutUserNestedInput
    withdrawals?: WithdrawalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    balance?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chainTransactions?: ChainTransactionUncheckedUpdateManyWithoutUserNestedInput
    wallets?: UserWalletUncheckedUpdateManyWithoutUserNestedInput
    withdrawals?: WithdrawalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutChainTransactionsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    status?: $Enums.Status
    balance?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionCreateNestedManyWithoutUserInput
    wallets?: UserWalletCreateNestedManyWithoutUserInput
    withdrawals?: WithdrawalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutChainTransactionsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    status?: $Enums.Status
    balance?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    wallets?: UserWalletUncheckedCreateNestedManyWithoutUserInput
    withdrawals?: WithdrawalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutChainTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutChainTransactionsInput, UserUncheckedCreateWithoutChainTransactionsInput>
  }

  export type UserUpsertWithoutChainTransactionsInput = {
    update: XOR<UserUpdateWithoutChainTransactionsInput, UserUncheckedUpdateWithoutChainTransactionsInput>
    create: XOR<UserCreateWithoutChainTransactionsInput, UserUncheckedCreateWithoutChainTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutChainTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutChainTransactionsInput, UserUncheckedUpdateWithoutChainTransactionsInput>
  }

  export type UserUpdateWithoutChainTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    balance?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    wallets?: UserWalletUpdateManyWithoutUserNestedInput
    withdrawals?: WithdrawalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutChainTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    balance?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    wallets?: UserWalletUncheckedUpdateManyWithoutUserNestedInput
    withdrawals?: WithdrawalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutWithdrawalsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    status?: $Enums.Status
    balance?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    chainTransactions?: ChainTransactionCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
    wallets?: UserWalletCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWithdrawalsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    status?: $Enums.Status
    balance?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    chainTransactions?: ChainTransactionUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    wallets?: UserWalletUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWithdrawalsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWithdrawalsInput, UserUncheckedCreateWithoutWithdrawalsInput>
  }

  export type UserUpsertWithoutWithdrawalsInput = {
    update: XOR<UserUpdateWithoutWithdrawalsInput, UserUncheckedUpdateWithoutWithdrawalsInput>
    create: XOR<UserCreateWithoutWithdrawalsInput, UserUncheckedCreateWithoutWithdrawalsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWithdrawalsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWithdrawalsInput, UserUncheckedUpdateWithoutWithdrawalsInput>
  }

  export type UserUpdateWithoutWithdrawalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    balance?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chainTransactions?: ChainTransactionUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    wallets?: UserWalletUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWithdrawalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    balance?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chainTransactions?: ChainTransactionUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    wallets?: UserWalletUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutWalletsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    status?: $Enums.Status
    balance?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    chainTransactions?: ChainTransactionCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
    withdrawals?: WithdrawalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWalletsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.Role
    status?: $Enums.Status
    balance?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    chainTransactions?: ChainTransactionUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    withdrawals?: WithdrawalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWalletsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
  }

  export type UserUpsertWithoutWalletsInput = {
    update: XOR<UserUpdateWithoutWalletsInput, UserUncheckedUpdateWithoutWalletsInput>
    create: XOR<UserCreateWithoutWalletsInput, UserUncheckedCreateWithoutWalletsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWalletsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWalletsInput, UserUncheckedUpdateWithoutWalletsInput>
  }

  export type UserUpdateWithoutWalletsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    balance?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chainTransactions?: ChainTransactionUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    withdrawals?: WithdrawalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWalletsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    balance?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chainTransactions?: ChainTransactionUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    withdrawals?: WithdrawalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TreasuryAccountCreateWithoutChildrenInput = {
    id?: string
    name: string
    type: $Enums.TreasuryAccountType
    network?: string | null
    currency: string
    walletAddress?: string | null
    isActive?: boolean
    createdAt?: Date | string
    parentAccount?: TreasuryAccountCreateNestedOneWithoutChildrenInput
    entries?: TreasuryEntryCreateNestedManyWithoutAccountInput
  }

  export type TreasuryAccountUncheckedCreateWithoutChildrenInput = {
    id?: string
    name: string
    type: $Enums.TreasuryAccountType
    network?: string | null
    currency: string
    walletAddress?: string | null
    parentAccountId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    entries?: TreasuryEntryUncheckedCreateNestedManyWithoutAccountInput
  }

  export type TreasuryAccountCreateOrConnectWithoutChildrenInput = {
    where: TreasuryAccountWhereUniqueInput
    create: XOR<TreasuryAccountCreateWithoutChildrenInput, TreasuryAccountUncheckedCreateWithoutChildrenInput>
  }

  export type TreasuryAccountCreateWithoutParentAccountInput = {
    id?: string
    name: string
    type: $Enums.TreasuryAccountType
    network?: string | null
    currency: string
    walletAddress?: string | null
    isActive?: boolean
    createdAt?: Date | string
    children?: TreasuryAccountCreateNestedManyWithoutParentAccountInput
    entries?: TreasuryEntryCreateNestedManyWithoutAccountInput
  }

  export type TreasuryAccountUncheckedCreateWithoutParentAccountInput = {
    id?: string
    name: string
    type: $Enums.TreasuryAccountType
    network?: string | null
    currency: string
    walletAddress?: string | null
    isActive?: boolean
    createdAt?: Date | string
    children?: TreasuryAccountUncheckedCreateNestedManyWithoutParentAccountInput
    entries?: TreasuryEntryUncheckedCreateNestedManyWithoutAccountInput
  }

  export type TreasuryAccountCreateOrConnectWithoutParentAccountInput = {
    where: TreasuryAccountWhereUniqueInput
    create: XOR<TreasuryAccountCreateWithoutParentAccountInput, TreasuryAccountUncheckedCreateWithoutParentAccountInput>
  }

  export type TreasuryAccountCreateManyParentAccountInputEnvelope = {
    data: TreasuryAccountCreateManyParentAccountInput | TreasuryAccountCreateManyParentAccountInput[]
    skipDuplicates?: boolean
  }

  export type TreasuryEntryCreateWithoutAccountInput = {
    id?: string
    debitAmount?: bigint | number
    creditAmount?: bigint | number
    currency: string
    network: string
    createdAt?: Date | string
    ledger: TreasuryLedgerCreateNestedOneWithoutEntriesInput
  }

  export type TreasuryEntryUncheckedCreateWithoutAccountInput = {
    id?: string
    ledgerId: string
    debitAmount?: bigint | number
    creditAmount?: bigint | number
    currency: string
    network: string
    createdAt?: Date | string
  }

  export type TreasuryEntryCreateOrConnectWithoutAccountInput = {
    where: TreasuryEntryWhereUniqueInput
    create: XOR<TreasuryEntryCreateWithoutAccountInput, TreasuryEntryUncheckedCreateWithoutAccountInput>
  }

  export type TreasuryEntryCreateManyAccountInputEnvelope = {
    data: TreasuryEntryCreateManyAccountInput | TreasuryEntryCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type TreasuryAccountUpsertWithoutChildrenInput = {
    update: XOR<TreasuryAccountUpdateWithoutChildrenInput, TreasuryAccountUncheckedUpdateWithoutChildrenInput>
    create: XOR<TreasuryAccountCreateWithoutChildrenInput, TreasuryAccountUncheckedCreateWithoutChildrenInput>
    where?: TreasuryAccountWhereInput
  }

  export type TreasuryAccountUpdateToOneWithWhereWithoutChildrenInput = {
    where?: TreasuryAccountWhereInput
    data: XOR<TreasuryAccountUpdateWithoutChildrenInput, TreasuryAccountUncheckedUpdateWithoutChildrenInput>
  }

  export type TreasuryAccountUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTreasuryAccountTypeFieldUpdateOperationsInput | $Enums.TreasuryAccountType
    network?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentAccount?: TreasuryAccountUpdateOneWithoutChildrenNestedInput
    entries?: TreasuryEntryUpdateManyWithoutAccountNestedInput
  }

  export type TreasuryAccountUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTreasuryAccountTypeFieldUpdateOperationsInput | $Enums.TreasuryAccountType
    network?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    parentAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entries?: TreasuryEntryUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type TreasuryAccountUpsertWithWhereUniqueWithoutParentAccountInput = {
    where: TreasuryAccountWhereUniqueInput
    update: XOR<TreasuryAccountUpdateWithoutParentAccountInput, TreasuryAccountUncheckedUpdateWithoutParentAccountInput>
    create: XOR<TreasuryAccountCreateWithoutParentAccountInput, TreasuryAccountUncheckedCreateWithoutParentAccountInput>
  }

  export type TreasuryAccountUpdateWithWhereUniqueWithoutParentAccountInput = {
    where: TreasuryAccountWhereUniqueInput
    data: XOR<TreasuryAccountUpdateWithoutParentAccountInput, TreasuryAccountUncheckedUpdateWithoutParentAccountInput>
  }

  export type TreasuryAccountUpdateManyWithWhereWithoutParentAccountInput = {
    where: TreasuryAccountScalarWhereInput
    data: XOR<TreasuryAccountUpdateManyMutationInput, TreasuryAccountUncheckedUpdateManyWithoutParentAccountInput>
  }

  export type TreasuryAccountScalarWhereInput = {
    AND?: TreasuryAccountScalarWhereInput | TreasuryAccountScalarWhereInput[]
    OR?: TreasuryAccountScalarWhereInput[]
    NOT?: TreasuryAccountScalarWhereInput | TreasuryAccountScalarWhereInput[]
    id?: StringFilter<"TreasuryAccount"> | string
    name?: StringFilter<"TreasuryAccount"> | string
    type?: EnumTreasuryAccountTypeFilter<"TreasuryAccount"> | $Enums.TreasuryAccountType
    network?: StringNullableFilter<"TreasuryAccount"> | string | null
    currency?: StringFilter<"TreasuryAccount"> | string
    walletAddress?: StringNullableFilter<"TreasuryAccount"> | string | null
    parentAccountId?: StringNullableFilter<"TreasuryAccount"> | string | null
    isActive?: BoolFilter<"TreasuryAccount"> | boolean
    createdAt?: DateTimeFilter<"TreasuryAccount"> | Date | string
  }

  export type TreasuryEntryUpsertWithWhereUniqueWithoutAccountInput = {
    where: TreasuryEntryWhereUniqueInput
    update: XOR<TreasuryEntryUpdateWithoutAccountInput, TreasuryEntryUncheckedUpdateWithoutAccountInput>
    create: XOR<TreasuryEntryCreateWithoutAccountInput, TreasuryEntryUncheckedCreateWithoutAccountInput>
  }

  export type TreasuryEntryUpdateWithWhereUniqueWithoutAccountInput = {
    where: TreasuryEntryWhereUniqueInput
    data: XOR<TreasuryEntryUpdateWithoutAccountInput, TreasuryEntryUncheckedUpdateWithoutAccountInput>
  }

  export type TreasuryEntryUpdateManyWithWhereWithoutAccountInput = {
    where: TreasuryEntryScalarWhereInput
    data: XOR<TreasuryEntryUpdateManyMutationInput, TreasuryEntryUncheckedUpdateManyWithoutAccountInput>
  }

  export type TreasuryEntryScalarWhereInput = {
    AND?: TreasuryEntryScalarWhereInput | TreasuryEntryScalarWhereInput[]
    OR?: TreasuryEntryScalarWhereInput[]
    NOT?: TreasuryEntryScalarWhereInput | TreasuryEntryScalarWhereInput[]
    id?: StringFilter<"TreasuryEntry"> | string
    ledgerId?: StringFilter<"TreasuryEntry"> | string
    accountId?: StringFilter<"TreasuryEntry"> | string
    debitAmount?: BigIntFilter<"TreasuryEntry"> | bigint | number
    creditAmount?: BigIntFilter<"TreasuryEntry"> | bigint | number
    currency?: StringFilter<"TreasuryEntry"> | string
    network?: StringFilter<"TreasuryEntry"> | string
    createdAt?: DateTimeFilter<"TreasuryEntry"> | Date | string
  }

  export type TreasuryEntryCreateWithoutLedgerInput = {
    id?: string
    debitAmount?: bigint | number
    creditAmount?: bigint | number
    currency: string
    network: string
    createdAt?: Date | string
    account: TreasuryAccountCreateNestedOneWithoutEntriesInput
  }

  export type TreasuryEntryUncheckedCreateWithoutLedgerInput = {
    id?: string
    accountId: string
    debitAmount?: bigint | number
    creditAmount?: bigint | number
    currency: string
    network: string
    createdAt?: Date | string
  }

  export type TreasuryEntryCreateOrConnectWithoutLedgerInput = {
    where: TreasuryEntryWhereUniqueInput
    create: XOR<TreasuryEntryCreateWithoutLedgerInput, TreasuryEntryUncheckedCreateWithoutLedgerInput>
  }

  export type TreasuryEntryCreateManyLedgerInputEnvelope = {
    data: TreasuryEntryCreateManyLedgerInput | TreasuryEntryCreateManyLedgerInput[]
    skipDuplicates?: boolean
  }

  export type TreasuryEntryUpsertWithWhereUniqueWithoutLedgerInput = {
    where: TreasuryEntryWhereUniqueInput
    update: XOR<TreasuryEntryUpdateWithoutLedgerInput, TreasuryEntryUncheckedUpdateWithoutLedgerInput>
    create: XOR<TreasuryEntryCreateWithoutLedgerInput, TreasuryEntryUncheckedCreateWithoutLedgerInput>
  }

  export type TreasuryEntryUpdateWithWhereUniqueWithoutLedgerInput = {
    where: TreasuryEntryWhereUniqueInput
    data: XOR<TreasuryEntryUpdateWithoutLedgerInput, TreasuryEntryUncheckedUpdateWithoutLedgerInput>
  }

  export type TreasuryEntryUpdateManyWithWhereWithoutLedgerInput = {
    where: TreasuryEntryScalarWhereInput
    data: XOR<TreasuryEntryUpdateManyMutationInput, TreasuryEntryUncheckedUpdateManyWithoutLedgerInput>
  }

  export type TreasuryLedgerCreateWithoutEntriesInput = {
    id?: string
    referenceType: $Enums.TreasuryLedgerReferenceType
    referenceId?: string | null
    description: string
    network: string
    currency: string
    createdByAdminId?: string | null
    locked?: boolean
    createdAt?: Date | string
  }

  export type TreasuryLedgerUncheckedCreateWithoutEntriesInput = {
    id?: string
    referenceType: $Enums.TreasuryLedgerReferenceType
    referenceId?: string | null
    description: string
    network: string
    currency: string
    createdByAdminId?: string | null
    locked?: boolean
    createdAt?: Date | string
  }

  export type TreasuryLedgerCreateOrConnectWithoutEntriesInput = {
    where: TreasuryLedgerWhereUniqueInput
    create: XOR<TreasuryLedgerCreateWithoutEntriesInput, TreasuryLedgerUncheckedCreateWithoutEntriesInput>
  }

  export type TreasuryAccountCreateWithoutEntriesInput = {
    id?: string
    name: string
    type: $Enums.TreasuryAccountType
    network?: string | null
    currency: string
    walletAddress?: string | null
    isActive?: boolean
    createdAt?: Date | string
    parentAccount?: TreasuryAccountCreateNestedOneWithoutChildrenInput
    children?: TreasuryAccountCreateNestedManyWithoutParentAccountInput
  }

  export type TreasuryAccountUncheckedCreateWithoutEntriesInput = {
    id?: string
    name: string
    type: $Enums.TreasuryAccountType
    network?: string | null
    currency: string
    walletAddress?: string | null
    parentAccountId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    children?: TreasuryAccountUncheckedCreateNestedManyWithoutParentAccountInput
  }

  export type TreasuryAccountCreateOrConnectWithoutEntriesInput = {
    where: TreasuryAccountWhereUniqueInput
    create: XOR<TreasuryAccountCreateWithoutEntriesInput, TreasuryAccountUncheckedCreateWithoutEntriesInput>
  }

  export type TreasuryLedgerUpsertWithoutEntriesInput = {
    update: XOR<TreasuryLedgerUpdateWithoutEntriesInput, TreasuryLedgerUncheckedUpdateWithoutEntriesInput>
    create: XOR<TreasuryLedgerCreateWithoutEntriesInput, TreasuryLedgerUncheckedCreateWithoutEntriesInput>
    where?: TreasuryLedgerWhereInput
  }

  export type TreasuryLedgerUpdateToOneWithWhereWithoutEntriesInput = {
    where?: TreasuryLedgerWhereInput
    data: XOR<TreasuryLedgerUpdateWithoutEntriesInput, TreasuryLedgerUncheckedUpdateWithoutEntriesInput>
  }

  export type TreasuryLedgerUpdateWithoutEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    referenceType?: EnumTreasuryLedgerReferenceTypeFieldUpdateOperationsInput | $Enums.TreasuryLedgerReferenceType
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    createdByAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    locked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreasuryLedgerUncheckedUpdateWithoutEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    referenceType?: EnumTreasuryLedgerReferenceTypeFieldUpdateOperationsInput | $Enums.TreasuryLedgerReferenceType
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    createdByAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    locked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreasuryAccountUpsertWithoutEntriesInput = {
    update: XOR<TreasuryAccountUpdateWithoutEntriesInput, TreasuryAccountUncheckedUpdateWithoutEntriesInput>
    create: XOR<TreasuryAccountCreateWithoutEntriesInput, TreasuryAccountUncheckedCreateWithoutEntriesInput>
    where?: TreasuryAccountWhereInput
  }

  export type TreasuryAccountUpdateToOneWithWhereWithoutEntriesInput = {
    where?: TreasuryAccountWhereInput
    data: XOR<TreasuryAccountUpdateWithoutEntriesInput, TreasuryAccountUncheckedUpdateWithoutEntriesInput>
  }

  export type TreasuryAccountUpdateWithoutEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTreasuryAccountTypeFieldUpdateOperationsInput | $Enums.TreasuryAccountType
    network?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentAccount?: TreasuryAccountUpdateOneWithoutChildrenNestedInput
    children?: TreasuryAccountUpdateManyWithoutParentAccountNestedInput
  }

  export type TreasuryAccountUncheckedUpdateWithoutEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTreasuryAccountTypeFieldUpdateOperationsInput | $Enums.TreasuryAccountType
    network?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    parentAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: TreasuryAccountUncheckedUpdateManyWithoutParentAccountNestedInput
  }

  export type ChainTransactionCreateManyUserInput = {
    id?: string
    chain: string
    to: string
    amount: string
    txHash?: string | null
    status?: $Enums.ChainTxStatus
    createdAt?: Date | string
    confirmedAt?: Date | string | null
    blockNumber?: bigint | number | null
    direction?: $Enums.TxDirection
  }

  export type TransactionCreateManyUserInput = {
    id?: string
    amount: number
    type: $Enums.TxType
    status?: $Enums.TxStatus
    createdAt?: Date | string
  }

  export type UserWalletCreateManyUserInput = {
    id?: string
    chain: string
    derivationIndex: number
    address: string
    createdAt?: Date | string
    lastKnownBalance?: string
  }

  export type WithdrawalCreateManyUserInput = {
    id?: string
    amount: number
    walletAddress?: string | null
    status?: $Enums.TxStatus
    createdAt?: Date | string
  }

  export type ChainTransactionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumChainTxStatusFieldUpdateOperationsInput | $Enums.ChainTxStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    direction?: EnumTxDirectionFieldUpdateOperationsInput | $Enums.TxDirection
  }

  export type ChainTransactionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumChainTxStatusFieldUpdateOperationsInput | $Enums.ChainTxStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    direction?: EnumTxDirectionFieldUpdateOperationsInput | $Enums.TxDirection
  }

  export type ChainTransactionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumChainTxStatusFieldUpdateOperationsInput | $Enums.ChainTxStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    direction?: EnumTxDirectionFieldUpdateOperationsInput | $Enums.TxDirection
  }

  export type TransactionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumTxTypeFieldUpdateOperationsInput | $Enums.TxType
    status?: EnumTxStatusFieldUpdateOperationsInput | $Enums.TxStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumTxTypeFieldUpdateOperationsInput | $Enums.TxType
    status?: EnumTxStatusFieldUpdateOperationsInput | $Enums.TxStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumTxTypeFieldUpdateOperationsInput | $Enums.TxType
    status?: EnumTxStatusFieldUpdateOperationsInput | $Enums.TxStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserWalletUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    derivationIndex?: IntFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastKnownBalance?: StringFieldUpdateOperationsInput | string
  }

  export type UserWalletUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    derivationIndex?: IntFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastKnownBalance?: StringFieldUpdateOperationsInput | string
  }

  export type UserWalletUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    derivationIndex?: IntFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastKnownBalance?: StringFieldUpdateOperationsInput | string
  }

  export type WithdrawalUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTxStatusFieldUpdateOperationsInput | $Enums.TxStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WithdrawalUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTxStatusFieldUpdateOperationsInput | $Enums.TxStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WithdrawalUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTxStatusFieldUpdateOperationsInput | $Enums.TxStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreasuryAccountCreateManyParentAccountInput = {
    id?: string
    name: string
    type: $Enums.TreasuryAccountType
    network?: string | null
    currency: string
    walletAddress?: string | null
    isActive?: boolean
    createdAt?: Date | string
  }

  export type TreasuryEntryCreateManyAccountInput = {
    id?: string
    ledgerId: string
    debitAmount?: bigint | number
    creditAmount?: bigint | number
    currency: string
    network: string
    createdAt?: Date | string
  }

  export type TreasuryAccountUpdateWithoutParentAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTreasuryAccountTypeFieldUpdateOperationsInput | $Enums.TreasuryAccountType
    network?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: TreasuryAccountUpdateManyWithoutParentAccountNestedInput
    entries?: TreasuryEntryUpdateManyWithoutAccountNestedInput
  }

  export type TreasuryAccountUncheckedUpdateWithoutParentAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTreasuryAccountTypeFieldUpdateOperationsInput | $Enums.TreasuryAccountType
    network?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: TreasuryAccountUncheckedUpdateManyWithoutParentAccountNestedInput
    entries?: TreasuryEntryUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type TreasuryAccountUncheckedUpdateManyWithoutParentAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTreasuryAccountTypeFieldUpdateOperationsInput | $Enums.TreasuryAccountType
    network?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreasuryEntryUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    debitAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    creditAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ledger?: TreasuryLedgerUpdateOneRequiredWithoutEntriesNestedInput
  }

  export type TreasuryEntryUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    ledgerId?: StringFieldUpdateOperationsInput | string
    debitAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    creditAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreasuryEntryUncheckedUpdateManyWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    ledgerId?: StringFieldUpdateOperationsInput | string
    debitAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    creditAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreasuryEntryCreateManyLedgerInput = {
    id?: string
    accountId: string
    debitAmount?: bigint | number
    creditAmount?: bigint | number
    currency: string
    network: string
    createdAt?: Date | string
  }

  export type TreasuryEntryUpdateWithoutLedgerInput = {
    id?: StringFieldUpdateOperationsInput | string
    debitAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    creditAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: TreasuryAccountUpdateOneRequiredWithoutEntriesNestedInput
  }

  export type TreasuryEntryUncheckedUpdateWithoutLedgerInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    debitAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    creditAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TreasuryEntryUncheckedUpdateManyWithoutLedgerInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    debitAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    creditAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TreasuryAccountCountOutputTypeDefaultArgs instead
     */
    export type TreasuryAccountCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TreasuryAccountCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TreasuryLedgerCountOutputTypeDefaultArgs instead
     */
    export type TreasuryLedgerCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TreasuryLedgerCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TransactionDefaultArgs instead
     */
    export type TransactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TransactionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ChainTransactionDefaultArgs instead
     */
    export type ChainTransactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ChainTransactionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LedgerEntryDefaultArgs instead
     */
    export type LedgerEntryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LedgerEntryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserBalanceDefaultArgs instead
     */
    export type UserBalanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserBalanceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WithdrawalDefaultArgs instead
     */
    export type WithdrawalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WithdrawalDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SystemSettingDefaultArgs instead
     */
    export type SystemSettingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SystemSettingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserWalletDefaultArgs instead
     */
    export type UserWalletArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserWalletDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ChainScanStateDefaultArgs instead
     */
    export type ChainScanStateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ChainScanStateDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TreasuryAccountDefaultArgs instead
     */
    export type TreasuryAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TreasuryAccountDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TreasuryLedgerDefaultArgs instead
     */
    export type TreasuryLedgerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TreasuryLedgerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TreasuryEntryDefaultArgs instead
     */
    export type TreasuryEntryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TreasuryEntryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BalanceSnapshotDefaultArgs instead
     */
    export type BalanceSnapshotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BalanceSnapshotDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TreasuryStateDefaultArgs instead
     */
    export type TreasuryStateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TreasuryStateDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SweepDefaultArgs instead
     */
    export type SweepArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SweepDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}