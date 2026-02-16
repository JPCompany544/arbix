"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, RefreshCw, AlertCircle, Check } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    // State for form fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Captcha state
    const [captchaInput, setCaptchaInput] = useState("");
    const [captchaValue, setCaptchaValue] = useState("8924");

    const generateCaptcha = () => {
        setCaptchaValue(Math.floor(1000 + Math.random() * 9000).toString());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Validation
        if (!email || !password) return setError("Please fill in all fields.");
        if (captchaInput !== captchaValue) return setError("Invalid security check code.");

        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Login failed");
            }

            setSuccess("Login successful! Redirecting...");

            // Save token and redirect
            login(data.token, data.user);

            // Check role and redirect
            try {
                const res = await fetch("/api/auth/me");
                const userData = await res.json();

                if (userData.user?.role === "ADMIN") {
                    setTimeout(() => router.push("/admin"), 1000);
                } else {
                    setTimeout(() => router.push("/dashboard"), 1000);
                }
            } catch (e) {
                // Fallback
                setTimeout(() => router.push("/dashboard"), 1000);
            }

        } catch (err: any) {
            setError(err.message);
            generateCaptcha();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-black text-white font-sans">
            {/* Left Side - Image (PC only) */}
            <div className="hidden lg:block lg:w-1/2 relative h-screen sticky top-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black z-10" />
                <div className="relative w-full h-full">
                    <Image
                        src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop"
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-black min-h-screen">
                <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Header */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Log In</h1>
                        <p className="text-sm text-gray-400 font-medium">
                            Don't have an account yet?{" "}
                            <Link href="/signup" className="text-orange-500 hover:text-orange-400 transition-colors">
                                Create Account
                            </Link>
                        </p>
                    </div>

                    <div className="space-y-5">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-3 px-4 rounded-xl flex items-center gap-2 animate-in fade-in zoom-in duration-200">
                                <AlertCircle size={14} />
                                <span className="font-bold">{error}</span>
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-500/10 border border-green-500/20 text-green-500 text-xs py-3 px-4 rounded-xl flex items-center gap-2 animate-in fade-in zoom-in duration-200">
                                <Check size={14} />
                                <span className="font-bold">{success}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email Input */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all font-medium text-sm hover:border-white/[0.15]"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Password</label>
                                    <div className="relative group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all font-medium text-sm pr-10 hover:border-white/[0.15]"
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Link href="#" className="text-xs font-medium text-gray-500 hover:text-white transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            <div className="border-t border-white/[0.08] my-6"></div>

                            {/* Captcha */}
                            <div className="pt-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 mb-1.5 block">Security Check</label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        value={captchaInput}
                                        onChange={(e) => setCaptchaInput(e.target.value)}
                                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-4 pr-24 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all font-medium text-sm hover:border-white/[0.15]"
                                        placeholder="Enter the number"
                                    />
                                    <div
                                        className="absolute right-1 top-1 bottom-1 w-20 bg-white/[0.05] rounded-lg flex items-center justify-center border border-white/[0.05] select-none hover:bg-white/[0.1] transition-colors cursor-pointer group/captcha"
                                        onClick={generateCaptcha}
                                        title="Click to refresh"
                                    >
                                        <span className="text-sm font-black tracking-widest text-orange-500 font-mono drop-shadow-[0_2px_10px_rgba(249,115,22,0.3)]">{captchaValue}</span>
                                        <RefreshCw size={10} className="absolute top-1 right-1 text-gray-600 opacity-0 group-hover/captcha:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            </div>

                            {/* Continue Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-black font-black text-sm uppercase tracking-widest py-4 rounded-xl hover:from-orange-400 hover:to-amber-400 hover:scale-[1.01] transition-all shadow-xl shadow-orange-500/20 active:scale-[0.98] mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isLoading ? "Logging in..." : "Continue"}
                            </button>
                        </form>

                    </div>

                    {/* Footer text (optional) */}
                    <div className="text-center pt-4">
                        <p className="text-[10px] text-gray-600 font-medium">
                            &copy; 2026 Arbitrage Platform. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
