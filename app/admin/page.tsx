"use client";

import { useEffect, useState } from "react";
import AdminWithdrawModal from "./components/AdminWithdrawModal";
import { ArrowUpRight } from "lucide-react";

interface Stats {
    totalUsers: number;
    activeUsers: number;
    pendingWithdrawalsCount: number;
    totalFunds: number;
}

interface Activity {
    id: string;
    type: string;
    title: string;
    date: string;
    status?: string;
}

export default function AdminPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

    const loadData = async () => {
        try {
            const [statsRes, activityRes] = await Promise.all([
                fetch("/api/admin/stats"),
                fetch("/api/admin/activities")
            ]);

            const statsData = await statsRes.json();
            const activityData = await activityRes.json();

            setStats(statsData);
            setActivities(Array.isArray(activityData) ? activityData : []);
        } catch (error) {
            console.error("Failed to fetch admin data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const getRelativeTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMin = Math.floor(diffMs / 60000);

        if (diffMin < 1) return "Just now";
        if (diffMin < 60) return `${diffMin}m ago`;

        const diffHours = Math.floor(diffMin / 60);
        if (diffHours < 24) return `${diffHours}h ago`;

        return date.toLocaleDateString();
    };

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
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                                Total Funds
                            </h2>
                            <div className="text-3xl font-bold text-gray-900">
                                {loading ? "..." : `$${stats?.totalFunds?.toFixed(2) ?? "0.00"}`}
                            </div>
                        </div>
                        <button
                            onClick={() => setIsWithdrawModalOpen(true)}
                            className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition-all group shadow-sm"
                            title="Withdraw Funds"
                        >
                            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                </div>

            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    {loading ? (
                        <div className="py-4 text-center text-gray-400">Loading feed...</div>
                    ) : activities.length === 0 ? (
                        <div className="py-4 text-center text-gray-400">No recent activity</div>
                    ) : (
                        activities.map(activity => (
                            <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 rounded-lg transition-colors">
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-900">{activity.title}</span>
                                    <span className="text-xs text-gray-400">{getRelativeTime(activity.date)}</span>
                                </div>
                                <div className={`px-2 py-1 text-[10px] font-bold uppercase rounded-md ${activity.type === 'SIGNUP' ? 'bg-green-100 text-green-700' :
                                        activity.type === 'DEPOSIT' ? 'bg-blue-100 text-blue-700' :
                                            'bg-orange-100 text-orange-700'
                                    }`}>
                                    {activity.type}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <AdminWithdrawModal
                isOpen={isWithdrawModalOpen}
                onClose={() => setIsWithdrawModalOpen(false)}
                onSuccess={() => loadData()}
            />

        </div>
    );
}
