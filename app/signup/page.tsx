"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ChevronDown, Check, RefreshCw, AlertCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function RequirementItem({ met, text }: { met: boolean; text: string }) {
    return (
        <div className={`flex items-center gap-2 text-[10px] font-bold transition-colors ${met ? "text-green-500" : "text-gray-500"}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${met ? "bg-green-500" : "bg-gray-600"}`} />
            {text}
        </div>
    )
}

export default function SignupPage() {
    const router = useRouter();
    const { login } = useAuth();
    // State for form fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Accordion states
    const [showPromo, setShowPromo] = useState(false);
    const [showReferral, setShowReferral] = useState(false);
    const [promoCode, setPromoCode] = useState("");
    const [referralCode, setReferralCode] = useState("");

    // Captcha state
    const [captchaInput, setCaptchaInput] = useState("");
    const [captchaValue, setCaptchaValue] = useState("8924");

    // Checkboxes
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [citizenshipConfirmed, setCitizenshipConfirmed] = useState(false);

    // Password Validation
    const hasMinLength = password.length >= 8;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);

    const generateCaptcha = () => {
        setCaptchaValue(Math.floor(1000 + Math.random() * 9000).toString());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Validation
        if (!email || !password) return setError("Please fill in all fields.");
        if (!hasMinLength || !hasLower || !hasUpper || !hasNumber || !hasSymbol) {
            return setError("Password does not meet all requirements.");
        }
        if (captchaInput !== captchaValue) return setError("Invalid security check code.");
        if (!termsAccepted || !citizenshipConfirmed) return setError("Please accept the terms and conditions.");

        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Signup failed");
            }

            setSuccess("Account created successfully! Redirecting...");

            // Save token and redirect
            login(data.token, data.user);
            setTimeout(() => {
                router.push("/dashboard");
            }, 1500);

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
                        <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Create Account</h1>
                        <p className="text-sm text-gray-400 font-medium">
                            Already have an account?{" "}
                            <Link href="/login" className="text-orange-500 hover:text-orange-400 transition-colors">
                                Log In
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

                                {/* Password Requirements */}
                                <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-3 pl-1 pt-1">
                                    <RequirementItem met={hasMinLength} text="8+ characters" />
                                    <RequirementItem met={hasLower} text="Lowercase" />
                                    <RequirementItem met={hasUpper} text="Capital" />
                                    <RequirementItem met={hasNumber} text="Number" />
                                    <RequirementItem met={hasSymbol} text="Symbol" />
                                </div>
                            </div>

                            <div className="border-t border-white/[0.08] my-6"></div>

                            {/* Promo Code - Accordion */}
                            <div className="space-y-2">
                                <button
                                    onClick={() => setShowPromo(!showPromo)}
                                    className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors py-1 group w-full"
                                >
                                    <div className={`p-1 rounded bg-white/5 border border-white/5 transition-transform duration-200 group-hover:border-white/20 ${showPromo ? "rotate-180" : ""}`}>
                                        <ChevronDown size={12} />
                                    </div>
                                    <span className="uppercase tracking-wide">Promocode (Optional)</span>
                                </button>
                                {showPromo && (
                                    <input
                                        type="text"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-all font-medium text-sm animate-in fade-in slide-in-from-top-1 duration-200"
                                        placeholder="Enter promocode"
                                    />
                                )}
                            </div>

                            {/* Referral Code - Accordion */}
                            <div className="space-y-2">
                                <button
                                    onClick={() => setShowReferral(!showReferral)}
                                    className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors py-1 group w-full"
                                >
                                    <div className={`p-1 rounded bg-white/5 border border-white/5 transition-transform duration-200 group-hover:border-white/20 ${showReferral ? "rotate-180" : ""}`}>
                                        <ChevronDown size={12} />
                                    </div>
                                    <span className="uppercase tracking-wide">Referral Code (Optional)</span>
                                </button>
                                {showReferral && (
                                    <input
                                        type="text"
                                        value={referralCode}
                                        onChange={(e) => setReferralCode(e.target.value)}
                                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-all font-medium text-sm animate-in fade-in slide-in-from-top-1 duration-200"
                                        placeholder="Enter referral code"
                                    />
                                )}
                            </div>

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

                            {/* Checkboxes */}
                            <div className="space-y-4 pt-4">
                                <label className="flex items-start gap-3 cursor-pointer group select-none">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-all duration-200 mt-0.5 ${termsAccepted ? "bg-orange-500 border-orange-500 text-black" : "border-white/20 bg-white/5 group-hover:border-orange-500/50 group-hover:bg-white/10"}`}>
                                        {termsAccepted && <Check size={12} strokeWidth={4} />}
                                    </div>
                                    <input type="checkbox" className="hidden" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} />
                                    <span className="text-[11px] text-gray-400 leading-snug font-medium group-hover:text-gray-300 transition-colors">
                                        I accept the <Link href="/terms" className="text-orange-500 hover:text-orange-400 hover:underline transition-colors">Terms of Use</Link> and <Link href="/privacy" className="text-orange-500 hover:text-orange-400 hover:underline transition-colors">Privacy Policy</Link>
                                    </span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer group select-none">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-all duration-200 mt-0.5 ${citizenshipConfirmed ? "bg-orange-500 border-orange-500 text-black" : "border-white/20 bg-white/5 group-hover:border-orange-500/50 group-hover:bg-white/10"}`}>
                                        {citizenshipConfirmed && <Check size={12} strokeWidth={4} />}
                                    </div>
                                    <input type="checkbox" className="hidden" checked={citizenshipConfirmed} onChange={() => setCitizenshipConfirmed(!citizenshipConfirmed)} />
                                    <span className="text-[11px] text-gray-400 leading-snug font-medium group-hover:text-gray-300 transition-colors">
                                        I confirm I am not a citizen/resident of restricted countries
                                    </span>
                                </label>
                            </div>

                            {/* Continue Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-black font-black text-sm uppercase tracking-widest py-4 rounded-xl hover:from-orange-400 hover:to-amber-400 hover:scale-[1.01] transition-all shadow-xl shadow-orange-500/20 active:scale-[0.98] mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isLoading ? "Processing..." : "Continue"}
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
