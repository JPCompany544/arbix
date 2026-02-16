"use client";

import { useEffect, useState } from "react";

interface Stats {
    totalUsers: number;
    activeUsers: number;
    pendingWithdrawalsCount: number;
    totalFunds: number;
}

export default function AdminPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/admin/stats");
                const data = await res.json();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header */}
            <div className="flex flex-col space-y-1 pb-4 border-b border-gray-100">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Dashboard Overview
                </h1>
                <p className="text-sm font-medium text-gray-500">
                    Your platform metrics at a glance.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Total Users Card */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                        Total Users
                    </h2>
                    <div className="text-3xl font-bold text-gray-900">
                        {loading ? "..." : stats?.totalUsers ?? 0}
                    </div>
                </div>

                {/* Active Users Card */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                        Active Users
                    </h2>
                    <div className="text-3xl font-bold text-gray-900">
                        {loading ? "..." : stats?.activeUsers ?? 0}
                    </div>
                </div>

                {/* Pending Withdrawals Card */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                        Pending Requests
                    </h2>
                    <div className="text-3xl font-bold text-orange-500">
                        {loading ? "..." : stats?.pendingWithdrawalsCount ?? 0}
                    </div>
                </div>

                {/* Total Funds Card */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                        Total Funds
                    </h2>
                    <div className="text-3xl font-bold text-gray-900">
                        {loading ? "..." : `$${stats?.totalFunds?.toFixed(2) ?? "0.00"}`}
                    </div>
                </div>

            </div>

            {/* Recent Activity Placeholder */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 rounded-lg transition-colors cursor-pointer">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900">New Signup: user@example.com</span>
                            <span className="text-xs text-gray-400">2 minutes ago</span>
                        </div>
                        <div className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-md">
                            Signup
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 rounded-lg transition-colors cursor-pointer">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900">Deposit: +$500.00 (BTC)</span>
                            <span className="text-xs text-gray-400">15 minutes ago</span>
                        </div>
                        <div className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded-md">
                            Deposit
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 rounded-lg transition-colors cursor-pointer">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900">Withdrawal Request: -$1,200.00</span>
                            <span className="text-xs text-gray-400">1 hour ago</span>
                        </div>
                        <div className="px-2 py-1 bg-orange-100 text-orange-700 text-[10px] font-bold uppercase rounded-md">
                            Pending
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
