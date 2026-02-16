# Admin Dashboard Blueprint

This document outlines the structure, components, and API design for the Admin Dashboard of the custom SaaS platform.

## 1. Sidebar Structure
The sidebar will be a persistent vertical navigation component on the left side of the screen.

### Navigation Items
| Label | Route | Icon (Lucide-React) | Description |
| :--- | :--- | :--- | :--- |
| **Dashboard** | `/admin` | `LayoutDashboard` | Overview stats and charts |
| **Users** | `/admin/users` | `Users` | User management and details |
| **Transactions** | `/admin/transactions` | `ArrowRightLeft` | All platform transactions |
| **Withdrawals** | `/admin/withdrawals` | `ArrowUpCircle` | Withdrawal request management |
| **Settings** | `/admin/settings` | `Settings` | Platform configurations |

### Interaction
- **Active State**: Highlight the current page background (e.g., `bg-gray-100 text-black`).
- **Hover State**: Subtle background change (e.g., `hover:bg-gray-50`).
- **Responsive**: Hidden behind a hamburger menu on mobile.

---

## 2. Page Components

### A. Dashboard (`/admin/page.tsx`)
**Header**: "Overview"
**Components**:
1.  **Stats Grid** (4 Columns):
    -   **Total Users**: count (integer)
    -   **Active Users**: count (integer)
    -   **Pending Withdrawals**: count (integer)
    -   **Total Funds**: currency ($ value)
    -   *Design*: White bg, rounded-xl, soft shadow, label uppercase muted, value large bold.
2.  **Recent Activity** (Optional Placeholder):
    -   List of 5 most recent actions (signups, deposits).
3.  **Charts** (Placeholder):
    -   "Revenue over time" area chart.

### B. Users (`/admin/users/page.tsx`)
**Header**: "User Management"
**Components**:
1.  **Data Table**:
    -   **Columns**: Email, Role (Admin/User), Status (Active/Banned), Signup Date, Total Deposits, Total Withdrawals.
    -   **Sorting**: Sort by Date, Deposits.
2.  **Row Actions** (Dropdown/Buttons):
    -   **Deactivate / Activate**: Toggle user status.
    -   **Change Role**: Promote to Admin / Demote to User.
    -   **View Details**: Link to specific user profile (optional future).

### C. Transactions (`/admin/transactions/page.tsx`)
**Header**: "Transaction History"
**Components**:
1.  **Filters**:
    -   **Search**: By User Email.
    -   **Status Filter**: Dropdown (All, Completed, Pending, Failed).
    -   **Type Filter**: Dropdown (All, Deposit, Withdrawal).
2.  **Data Table**:
    -   **Columns**: User, Amount, Type, Status, Date, ID (truncate).

### D. Withdrawals (`/admin/withdrawals/page.tsx`)
**Header**: "Withdrawal Requests"
**Components**:
1.  **Pending Requests Table**:
    -   **Columns**: User, Amount, Wallet Address, Request Date, Status (Pending).
2.  **Action Buttons**:
    -   **Approve**: Triggers payout logic (or marks as paid).
    -   **Reject**: Refunds balance to user and marks as rejected.

### E. Settings (`/admin/settings/page.tsx`)
**Header**: "Platform Settings"
**Components**:
1.  **General Configuration**:
    -   **Platform Name**: Input field.
    -   **Maintenance Mode**: Toggle switch.
    -   **Withdrawals Enabled**: Toggle switch.
2.  **Save Button**: Persist changes.

---

## 3. API Endpoints

All admin endpoints should be protected by middleware ensuring `auth.user.role === 'ADMIN'`.

### User Management
-   **GET** `/api/admin/users`
    -   *Query Params*: `page`, `limit`, `search`
    -   *Returns*: List of users with aggregated stats.
-   **PATCH** `/api/admin/users/[id]`
    -   *Body*: `{ status?: 'ACTIVE' | 'BANNED', role?: 'USER' | 'ADMIN' }`
    -   *Action*: Update specific user fields.

### Transactions
-   **GET** `/api/admin/transactions`
    -   *Query Params*: `page`, `limit`, `type`, `status`, `userId`
    -   *Returns*: Paginated list of transactions.

### Withdrawals
-   **GET** `/api/admin/withdrawals`
    -   *Query Params*: `status` (default: 'PENDING')
    -   *Returns*: List of withdrawal requests.
-   **PATCH** `/api/admin/withdrawals/[id]`
    -   *Body*: `{ status: 'APPROVED' | 'REJECTED', note?: string }`
    -   *Action*: Update withdrawal status and adjust user balance if rejected.

### Dashboard Stats
-   **GET** `/api/admin/stats`
    -   *Returns*:
        ```json
        {
          "totalUsers": 1250,
          "activeUsers": 890,
          "pendingWithdrawalsCount": 12,
          "totalFunds": 450000.00
        }
        ```

---

## 4. Actions Mapping

| UI Action | API Method | Endpoint | Payload |
| :--- | :--- | :--- | :--- |
| **Ban User** | `PATCH` | `/api/admin/users/:id` | `{ status: 'BANNED' }` |
| **Activate User** | `PATCH` | `/api/admin/users/:id` | `{ status: 'ACTIVE' }` |
| **Make Admin** | `PATCH` | `/api/admin/users/:id` | `{ role: 'ADMIN' }` |
| **Approve Valid Withdrawal** | `PATCH` | `/api/admin/withdrawals/:id` | `{ status: 'APPROVED' }` |
| **Reject Invalid Withdrawal** | `PATCH` | `/api/admin/withdrawals/:id` | `{ status: 'REJECTED' }` |
| **Load Dashboard Data** | `GET` | `/api/admin/stats` | - |
| **Search Transactions** | `GET` | `/api/admin/transactions` | `?search=email@example.com` |

---

## 5. Design Guidelines (Tailwind CSS)

-   **Layout**:
    -   `flex h-screen bg-gray-50`
    -   Sidebar: `w-64 bg-white border-r border-gray-200 hidden md:block`
    -   Main Content: `flex-1 overflow-y-auto p-8`
-   **Cards**:
    -   `bg-white rounded-xl shadow-sm border border-gray-100 p-6`
-   **Typography**:
    -   Headings: `text-2xl font-bold text-gray-900`
    -   Subheadings: `text-sm font-medium text-gray-500 uppercase tracking-wider`
    -   Body: `text-sm text-gray-600`
-   **Tables**:
    -   Header: `bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`
    -   Rows: `bg-white border-b border-gray-100 hover:bg-gray-50`
    -   Status Badges:
        -   Active/Approved: `bg-green-100 text-green-800`
        -   Pending: `bg-yellow-100 text-yellow-800`
        -   Banned/Rejected: `bg-red-100 text-red-800`
