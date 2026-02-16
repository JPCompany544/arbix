"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        platformName: "",
        maintenanceMode: "false",
        withdrawalsEnabled: "true"
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/admin/settings");
            const data = await res.json();
            setSettings({
                platformName: data.platformName || "Arbitrage Platform",
                maintenanceMode: data.maintenanceMode || "false",
                withdrawalsEnabled: data.withdrawalsEnabled || "true"
            });
        } catch (error) {
            console.error("Failed to fetch settings:", error);
        } finally {
            setLoading(false);
        }
    };

    const saveSettings = async () => {
        setSaving(true);
        try {
            await fetch("/api/admin/settings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings)
            });
            alert("Settings saved successfully!");
        } catch (error) {
            console.error("Failed to save settings:", error);
            alert("Failed to save settings");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
            {/* Header */}
            <div className="flex flex-col space-y-1 pb-4 border-b border-gray-100">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Platform Settings
                </h1>
                <p className="text-sm font-medium text-gray-500">
                    Configure general platform settings.
                </p>
            </div>

            {/* General Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
                {loading ? (
                    <div className="py-8 text-center text-gray-400">Loading settings...</div>
                ) : (
                    <>
                        <div className="space-y-4">
                            <div className="flex flex-col space-y-1.5">
                                <label className="text-sm font-bold text-gray-900">Platform Name</label>
                                <input
                                    type="text"
                                    value={settings.platformName}
                                    onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                                    className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all font-medium text-gray-900"
                                />
                            </div>

                            <div className="flex items-center justify-between py-4 border-t border-gray-50 border-b">
                                <div className="flex flex-col space-y-0.5">
                                    <span className="text-sm font-bold text-gray-900">Maintenance Mode</span>
                                    <span className="text-xs text-gray-500">Disable platform access for all users.</span>
                                </div>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.maintenanceMode === "true"}
                                        onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked ? "true" : "false" })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <div className="flex flex-col space-y-0.5">
                                    <span className="text-sm font-bold text-gray-900">Enable Withdrawals</span>
                                    <span className="text-xs text-gray-500">Allow users to request withdrawals.</span>
                                </div>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.withdrawalsEnabled === "true"}
                                        onChange={(e) => setSettings({ ...settings, withdrawalsEnabled: e.target.checked ? "true" : "false" })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                onClick={saveSettings}
                                disabled={saving}
                                className="px-6 py-2.5 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors shadow-lg shadow-black/5 active:scale-95 disabled:opacity-50"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
