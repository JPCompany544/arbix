# Admin Dashboard API Integration Blueprint

This document outlines the API structure, database integration, and security measures for the Admin Dashboard backend.

## 1. Security & Authentication Middleware

All admin endpoints must be protected by a reusable authentication check.

-   **Mechanism**: JWT stored in `httpOnly` cookie named `token`.
-   **Validation Steps**:
    1.  Read `token` from request cookies.
    2.  Verify JWT signature using `process.env.JWT_SECRET`.
    3.  Decode payload to retrieve `userId` and `role`.
    4.  **Critical Check**: Verify `role === 'ADMIN'`.
    5.  If any step fails, return `RGBA 401 Unauthorized` or `403 Forbidden`.

---

## 2. API Endpoints

### A. Dashboard Stats
**Route**: `/api/admin/stats`
**Method**: `GET`
**Description**: Aggregates high-level metrics for the dashboard summary cards.

**Prisma Integration**:
```typescript
const totalUsers = await prisma.user.count();
const activeUsers = await prisma.user.count({ where: { status: 'ACTIVE' } });
const pendingWithdrawals = await prisma.withdrawal.count({ where: { status: 'PENDING' } });
// Aggregate total funds (e.g., sum of all user balances or deposits)
const totalFunds = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { type: 'DEPOSIT', status: 'COMPLETED' } // Example logic
});
```

**Response**:
```json
{
  "totalUsers": 1250,
  "activeUsers": 890,
  "pendingWithdrawalsCount": 12,
  "totalFunds": 450000.00
}
```

### B. Users Management

#### 1. Fetch All Users
**Route**: `/api/admin/users`
**Method**: `GET`
**Description**: Retrieves a list of all registered users with their key details.

**Prisma Integration**:
```typescript
const users = await prisma.user.findMany({
    select: {
        id: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        // Optional: Include relations for aggregations if schema supports
        // _count: { select: { deposits: true, withdrawals: true } }
    },
    orderBy: { createdAt: 'desc' }
});
```

**Response**:
```json
[
  {
    "id": "cm...",
    "email": "user@example.com",
    "role": "USER",
    "status": "ACTIVE",
    "signupDate": "2024-01-15T...",
     // Calculated fields or joined data
    "totalDeposits": 5000,
    "totalWithdrawals": 200
  }
]
```

#### 2. Update User
**Route**: `/api/admin/users/[id]`
**Method**: `PATCH`
**Description**: Updates a user's role or account status.

**Request Body**:
```json
{
  "role": "ADMIN",    // Optional
  "status": "BANNED"  // Optional
}
```

**Prisma Integration**:
```typescript
const updatedUser = await prisma.user.update({
    where: { id: params.id },
    data: { role, status }
});
```

### C. Transactions Management

#### Fetch All Transactions
**Route**: `/api/admin/transactions`
**Method**: `GET`
**Description**: Retrieves platform-wide transaction history.

**Prisma Integration**:
```typescript
const transactions = await prisma.transaction.findMany({
    include: { user: { select: { email: true } } }, // Join to get user email
    orderBy: { createdAt: 'desc' }
});
```

**Response**:
```json
[
  {
    "id": "tx_...",
    "userId": "user_...",
    "userEmail": "user@example.com", // Flatted from relation
    "amount": 150.00,
    "type": "DEPOSIT", // 'DEPOSIT' | 'WITHDRAWAL'
    "status": "COMPLETED", // 'PENDING' | 'COMPLETED' | 'FAILED'
    "date": "2024-02-10T..."
  }
]
```

### D. Withdrawals Management

#### 1. Fetch Pending Withdrawals
**Route**: `/api/admin/withdrawals`
**Method**: `GET`
**Description**: specific endpoint to get only pending requests for the approval queue.

**Prisma Integration**:
```typescript
const requests = await prisma.withdrawal.findMany({
    where: { status: 'PENDING' },
    include: { user: { select: { email: true, walletAddress: true } } },
    orderBy: { createdAt: 'asc' }
});
```

#### 2. Process Withdrawal
**Route**: `/api/admin/withdrawals/[id]`
**Method**: `PATCH`
**Description**: Approve or reject a specific withdrawal request.

**Request Body**:
```json
{
  "status": "APPROVED" // or "REJECTED"
}
```

**Logic**:
-   **Approved**: Mark status as APPROVED. (Deduct balance logic handled at request time or here depending on system design).
-   **Rejected**: Mark status as REJECTED. **Crucial**: Refund the user's balance if it was deducted upon request creation.

**Prisma Integration**:
```typescript
// Example for rejection refund logic
if (status === 'REJECTED') {
    await prisma.$transaction([
        prisma.withdrawal.update({ where: { id }, data: { status: 'REJECTED' } }),
        prisma.user.update({ 
            where: { id: userId }, 
            data: { balance: { increment: amount } } 
        })
    ]);
}
```

### E. Settings
**Route**: `/api/admin/settings`
**Method**: `GET` / `PATCH`
**Description**: Manage global platform configurations.

**Request Body**:
```json
{
  "platformName": "New Name",
  "maintenanceMode": true
}
```

**Prisma Integration**:
-   Requires a `SystemSetting` table key-value pairs or a singleton row.
-   `prisma.systemSetting.upsert(...)`

---

## 3. Database Schema Requirements (Prisma)

To support the above, the `schema.prisma` must include at least:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  role      Role     @default(USER)
  status    Status   @default(ACTIVE)
  balance   Float    @default(0)
  createdAt DateTime @default(now())
  
  transactions Transaction[]
  withdrawals  Withdrawal[]
}

model Transaction {
  id        String   @id @default(cuid())
  userId    String
  amount    Float
  type      TxType
  status    TxStatus @default(PENDING)
  createdAt DateTime @default(now())
  
  user      User     @relation(fields: [userId], references: [id])
}

model Withdrawal {
  id        String   @id @default(cuid())
  userId    String
  amount    Float
  walletAddress String?
  status    TxStatus @default(PENDING)
  createdAt DateTime @default(now())
  
  user      User     @relation(fields: [userId], references: [id])
}

enum Role {
  USER
  ADMIN
}

enum Status {
  ACTIVE
  BANNED
}

enum TxType {
  DEPOSIT
  WITHDRAWAL
}

enum TxStatus {
  PENDING
  COMPLETED
  FAILED
  APPROVED
  REJECTED
}
```

---

## 4. Actions Mapping Summary

| User Action | API Endpoint | Http Method | Payload / Query |
| :--- | :--- | :--- | :--- |
| **View Dashboard** | `/api/admin/stats` | `GET` | - |
| **List Users** | `/api/admin/users` | `GET` | `?page=1&limit=20` |
| **Ban User** | `/api/admin/users/:id` | `PATCH` | `{ "status": "BANNED" }` |
| **Promote User** | `/api/admin/users/:id` | `PATCH` | `{ "role": "ADMIN" }` |
| **View Transactions** | `/api/admin/transactions` | `GET` | `?userId=...` |
| **View Withdrawal Queue** | `/api/admin/withdrawals` | `GET` | `?status=PENDING` |
| **Approve Withdrawal** | `/api/admin/withdrawals/:id` | `PATCH` | `{ "status": "APPROVED" }` |
| **Reject Withdrawal** | `/api/admin/withdrawals/:id` | `PATCH` | `{ "status": "REJECTED" }` |
