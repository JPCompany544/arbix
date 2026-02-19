"use client";

import { useState } from "react";
import { Lock, User, RefreshCw, AlertCircle, Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminLoginPage() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Captcha state
    const [captchaInput, setCaptchaInput] = useState("");
    const [captchaValue, setCaptchaValue] = useState("7182");

    const generateCaptcha = () => {
        setCaptchaValue(Math.floor(1000 + Math.random() * 9000).toString());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!email || !password) return setError("Please enter your admin credentials.");
        if (captchaInput !== captchaValue) return setError("Security code mismatch.");

        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Access denied.");
            }

            // Verify if the user is actually an admin
            if (data.user?.role !== "ADMIN") {
                throw new Error("Unauthorized access. Admin role required.");
            }

            setSuccess("Authorized. Accessing terminal...");
            login(data.token, data.user);

            setTimeout(() => router.push("/admin"), 1200);

        } catch (err: any) {
            setError(err.message);
            generateCaptcha();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden font-mono">
            {/* Background Grid - Dark Industrial */}
            <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>

            {/* Ambient Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] animate-pulse [animation-delay:2s]"></div>

            <div className="w-full max-w-[420px] relative z-10">
                {/* Branding / Status */}
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Security Gateway v4.0</span>
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight mb-2 uppercase italic">Admin<span className="text-orange-500">Portal</span>.</h1>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Strict Protocol: Authorized Personnel Only</p>
                </div>

                {/* Login Container */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl relative">
                    {/* Glass Overlay */}
                    <div className="absolute inset-0 bg-white/[0.01] rounded-2xl pointer-events-none"></div>

                    {error && (
                        <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] py-3.5 px-4 rounded-xl flex items-center gap-3 animate-in fade-in zoom-in duration-300 font-bold uppercase tracking-tight">
                            <AlertCircle size={14} className="shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 bg-green-500/10 border border-green-500/20 text-green-500 text-[11px] py-3.5 px-4 rounded-xl flex items-center gap-3 animate-in fade-in zoom-in duration-300 font-bold uppercase tracking-tight">
                            <Check size={14} className="shrink-0" />
                            <span>{success}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Admin ID</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-orange-500 transition-colors" size={16} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/10 transition-all font-medium"
                                    placeholder="system@root.admin"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Passkey</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-orange-500 transition-colors" size={16} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/10 transition-all font-medium"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Security Verification */}
                        <div className="pt-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1 mb-2 block">Checksum Verification</label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={captchaInput}
                                    onChange={(e) => setCaptchaInput(e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded-xl pl-4 pr-24 py-4 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/10 transition-all"
                                    placeholder="Enter Code"
                                />
                                <div
                                    className="absolute right-1.5 top-1.5 bottom-1.5 w-20 bg-white/[0.03] rounded-lg flex items-center justify-center border border-white/5 select-none hover:bg-white/10 transition-colors cursor-pointer"
                                    onClick={generateCaptcha}
                                >
                                    <span className="text-sm font-black tracking-widest text-orange-500 font-mono italic">{captchaValue}</span>
                                    <RefreshCw size={10} className="absolute top-1 right-1 text-gray-700" />
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 bg-gradient-to-r from-orange-600 to-amber-600 text-black font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:translate-y-[-2px] hover:shadow-[0_10px_30px_rgba(249,115,22,0.3)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Authenticating...
                                </>
                            ) : "Initialize Login"}
                        </button>
                    </form>
                </div>

                {/* Footer Notice */}
                <div className="mt-8 flex items-center justify-center gap-4 opacity-30 select-none">
                    <div className="h-px w-12 bg-white/20"></div>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">End-to-End Encrypted Terminal</span>
                    <div className="h-px w-12 bg-white/20"></div>
                </div>
            </div>
        </div>
    );
}
