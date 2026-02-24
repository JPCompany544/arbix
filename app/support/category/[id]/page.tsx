"use client";

import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, User, Shield, ArrowDownCircle, TrendingUp, Users, Zap, Search } from "lucide-react";
import Link from "next/link";

const CATEGORY_DATA = {
    account: {
        name: "Account Management",
        desc: "Registration, login, account settings, and account management",
        icon: <User className="text-orange-500" size={32} />,
        articles: [
            { id: "register-account", title: "How to Register an Account?", snippet: "Registration methods, email/mobile registration process..." },
            { id: "login-account", title: "How to Log In to Your Account?", snippet: "Login methods, email/password security..." },
            { id: "qr-login", title: "How to Log In Using QR Code?", snippet: "What is QR code login and how to use it safely..." },
            { id: "reset-password", title: "How to Reset Your Password?", snippet: "Password reset process via email or mobile..." },
            { id: "account-settings", title: "Account Settings Guide", snippet: "Profile settings, email updates, and preferences..." },
            { id: "export-data", title: "How to Export Account Data?", snippet: "What data can be exported and how to initiate..." },
            { id: "delete-account", title: "How to Delete Your Account?", snippet: "Important warnings and permanent deletion process..." }
        ]
    },
    // Placeholders for other categories
    kyc: {
        name: "KYC & Security",
        desc: "Identity verification, two-factor authentication, and security features",
        icon: <Shield className="text-orange-500" size={32} />,
        articles: [
            { id: "kyc-verification", title: "How to Complete KYC Verification?", snippet: "KYC levels, limits, and submission process..." },
            { id: "address-whitelist", title: "How to Use Address Whitelist?", snippet: "Secure your withdrawals by restricting addresses..." },
            { id: "enable-2fa", title: "How to Enable Two-Factor Authentication (2FA)?", snippet: "Google Authenticator and Email/SMS setup..." },
            { id: "use-passkey", title: "How to Use Passkey (WebAuthn) Authentication?", snippet: "Modern passwordless security for your account..." },
            { id: "recover-google-auth", title: "How to Recover Google Authenticator?", snippet: "Recovery codes and account access restoration..." }
        ]
    },
    deposits: {
        name: "Deposits & Withdrawals",
        desc: "How to deposit and withdraw cryptocurrencies and fiat currencies",
        icon: <ArrowDownCircle className="text-orange-500" size={32} />,
        articles: [
            { id: "deposit-crypto", title: "How to Deposit Cryptocurrency?", snippet: "Step-by-step guide to funding your account..." },
            { id: "withdraw-crypto", title: "How to Withdraw Cryptocurrency?", snippet: "Securely move your assets to external wallets..." },
            { id: "deposit-fiat", title: "How to Deposit Fiat via Bank Transfer?", snippet: "Funding your account with traditional currency..." },
            { id: "withdrawal-limits", title: "Withdrawal Limits and Fees", snippet: "Understanding tier-based limits and processing costs..." }
        ]
    },
    trading: {
        name: "Trading",
        desc: "Spot trading, order types, order book, and trading features",
        icon: <TrendingUp className="text-orange-500" size={32} />,
        articles: [
            { id: "spot-trading", title: "How to Trade Spot Markets?", snippet: "Getting started with spot trading on Arbix..." },
            { id: "order-types", title: "Order Types Explained", snippet: "Market, Limit, and Stop orders simplified..." },
            { id: "trading-fees", title: "Trading Fees Explained", snippet: "Maker-taker model and platform fee structure..." }
        ]
    },
    p2p: {
        name: "P2P Trading",
        desc: "Peer-to-peer trading, creating ads, and completing transactions",
        icon: <Users className="text-orange-500" size={32} />,
        articles: [
            { id: "p2p-trading", title: "How to Use P2P Trading?", snippet: "Buying and selling directly with other users..." },
            { id: "p2p-dispute", title: "How to Submit P2P Order Dispute?", snippet: "Resolving transaction issues with our support team..." }
        ]
    },
    staking: {
        name: "Staking",
        desc: "How to stake cryptocurrencies and earn rewards",
        icon: <Zap className="text-orange-500" size={32} />,
        articles: [
            { id: "what-is-staking", title: "What is Staking?", snippet: "Introduction to earning passive rewards..." },
            { id: "start-staking", title: "How to Start Staking?", snippet: "Step-by-step guide to locking your assets..." }
        ]
    }
};

export default function CategoryPage() {
    const params = useParams();
    const router = useRouter();
    const categoryId = params.id as string;
    const category = CATEGORY_DATA[categoryId as keyof typeof CATEGORY_DATA];

    if (!category) return <div>Category not found</div>;

    return (
        <main className="min-h-screen bg-[#020202] text-white pt-10 md:pt-16 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Breadcrumbs / Back */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 group"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">Back to Support</span>
                </button>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12 p-8 bg-[#0B0E11] border border-white/5 rounded-3xl">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center shrink-0">
                        {category.icon || <User className="text-orange-500" size={32} />}
                    </div>
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tight mb-2">{category.name}</h1>
                        <p className="text-gray-500 italic">{category.desc}</p>
                    </div>
                </div>

                {/* Article List */}
                <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-6 ml-2">Articles in this category</h3>
                    {category.articles.length > 0 ? (
                        category.articles.map((article) => (
                            <Link
                                key={article.id}
                                href={`/support/article/${article.id}`}
                                className="flex items-center justify-between p-6 bg-[#0B0E11] border border-white/5 rounded-2xl hover:border-orange-500/30 active:bg-white/[0.02] transition-all group"
                            >
                                <div className="flex-1">
                                    <h4 className="text-[17px] font-black uppercase tracking-tight mb-1 group-hover:text-orange-500 transition-colors">
                                        {article.title}
                                    </h4>
                                    <p className="text-sm text-gray-500 italic">{article.snippet}</p>
                                </div>
                                <ChevronRight className="text-gray-700 group-hover:text-orange-500 transition-colors" size={24} />
                            </Link>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-[#0B0E11] rounded-3xl border border-dashed border-white/5">
                            <p className="text-gray-500 italic">No articles yet in this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
