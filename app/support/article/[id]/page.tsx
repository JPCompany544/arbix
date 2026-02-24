"use client";

import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Share2, Printer, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import Link from "next/link";

const ARTICLE_CONTENT = {
    "register-account": {
        title: "How to Register an Account?",
        category: "Account Management",
        updated: "Feb 24, 2026",
        content: `
            <h2 class="text-xl font-bold text-white mb-4">How to Register an Account on Arbix</h2>
            
            <h3 class="text-lg font-bold text-orange-500 mb-4">Registration Methods</h3>
            <p class="text-gray-400 mb-6 leading-relaxed">You can register using your email address or mobile phone number.</p>
            
            <h3 class="text-md font-black text-white uppercase tracking-widest mb-4">Registration via Email</h3>
            <ul class="list-decimal list-inside text-gray-400 space-y-3 mb-8 ml-4">
                <li>Go to the registration page</li>
                <li>Enter your email address</li>
                <li>Set a strong password (minimum 8 characters, including letters and numbers)</li>
                <li>Enter referral code if you have one (optional)</li>
                <li>Complete the reCAPTCHA verification</li>
                <li>Enter the verification code sent to your email</li>
                <li>Complete registration</li>
            </ul>

            <h3 class="text-md font-black text-white uppercase tracking-widest mb-4">Registration via Mobile Phone</h3>
            <ul class="list-decimal list-inside text-gray-400 space-y-3 mb-8 ml-4">
                <li>Select your country code</li>
                <li>Enter your mobile phone number (without the first zero)</li>
                <li>Set a password</li>
                <li>Complete the reCAPTCHA verification</li>
                <li>Enter the SMS verification code</li>
                <li>Complete registration</li>
            </ul>

            <div class="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                <h3 class="text-lg font-bold text-white mb-4">Important Notes</h3>
                <ul class="list-disc list-inside text-gray-500 space-y-2 text-sm">
                    <li>We recommend using email addresses from providers like Gmail, iCloud, or ProtonMail</li>
                    <li>Each email address and phone number can only be linked to one account</li>
                    <li>For withdrawals, you need to bind your email and enable two-factor authentication</li>
                    <li>Use single-byte characters (Latin letters and numbers) only</li>
                    <li>Do not use email addresses provided by mobile service providers</li>
                </ul>
            </div>
        `
    },
    "login-account": {
        title: "How to Log In to Your Account?",
        category: "Account Management",
        updated: "Feb 24, 2026",
        content: `
            <h2 class="text-xl font-bold text-white mb-6">How to Log In to Your Account</h2>
            
            <h3 class="text-lg font-bold text-emerald-500 mb-4 uppercase tracking-tight">Login Methods</h3>
            
            <section class="mb-8 pl-4 border-l-2 border-emerald-500/30">
                <h4 class="font-black text-white mb-3">Login with Email and Password</h4>
                <ul class="list-decimal list-inside text-gray-400 space-y-2">
                    <li>Go to the login page</li>
                    <li>Enter your registered email address</li>
                    <li>Enter your password</li>
                    <li>Complete two-factor authentication if enabled</li>
                    <li>Click "Log In"</li>
                </ul>
            </section>

            <section class="mb-8 pl-4 border-l-2 border-emerald-500/30">
                <h4 class="font-black text-white mb-3">Login with Mobile Phone</h4>
                <ul class="list-decimal list-inside text-gray-400 space-y-2">
                    <li>Go to the login page</li>
                    <li>Select your country code</li>
                    <li>Enter your registered phone number</li>
                    <li>Enter your password</li>
                    <li>Complete two-factor authentication if enabled</li>
                    <li>Click "Log In"</li>
                </ul>
            </section>

            <section class="mb-8 pl-4 border-l-2 border-orange-500/30">
                <h4 class="font-black text-white mb-3">Login with QR Code (Mobile App)</h4>
                <ul class="list-decimal list-inside text-gray-400 space-y-2">
                    <li>Open the Arbix mobile app</li>
                    <li>Tap "QR Code Login"</li>
                    <li>Scan the QR code displayed on the web page</li>
                    <li>Confirm login on your mobile device</li>
                </ul>
            </section>

            <div class="mt-10 p-6 bg-[#171A1E] rounded-2xl border border-white/5">
                <h4 class="text-lg font-bold text-white mb-4 underline">Troubleshooting</h4>
                <div class="space-y-4 text-sm">
                    <p class="text-gray-400"><span class="text-white font-black uppercase tracking-widest text-[10px] mr-2">Forgot Password?</span> Click "Forgot Password" and follow the instructions to reset it</p>
                    <p class="text-gray-400"><span class="text-white font-black uppercase tracking-widest text-[10px] mr-2">Account Locked?</span> Contact support if your account is locked after multiple failed login attempts</p>
                    <p class="text-gray-400"><span class="text-white font-black uppercase tracking-widest text-[10px] mr-2">2FA Issues?</span> Use backup codes or contact support</p>
                </div>
            </div>
        `
    },
    // Adding detailed KYC & Security articles
    "kyc-verification": {
        title: "How to Complete KYC Verification?",
        category: "KYC & Security",
        updated: "Feb 24, 2026",
        content: `
            <div class="space-y-8">
                <section>
                    <h2 class="text-xl font-bold text-white mb-4">KYC Levels</h2>
                    <p class="text-gray-400 leading-relaxed mb-6 italic">Arbix offers multiple KYC levels with increasing limits and features:</p>
                    <div class="space-y-3">
                        <div class="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                            <span class="text-orange-500 font-black text-xs uppercase tracking-widest mr-2">Level 1:</span>
                            <span class="text-gray-300 text-sm italic">Basic verification (email/phone)</span>
                        </div>
                        <div class="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                            <span class="text-orange-500 font-black text-xs uppercase tracking-widest mr-2">Level 2:</span>
                            <span class="text-gray-300 text-sm italic">Identity verification (ID document)</span>
                        </div>
                        <div class="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                            <span class="text-orange-500 font-black text-xs uppercase tracking-widest mr-2">Level 3:</span>
                            <span class="text-gray-300 text-sm italic">Address verification (proof of residence)</span>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 class="text-lg font-bold text-white mb-4 underline uppercase tracking-tighter">Level 1 Verification</h3>
                    <ul class="list-decimal list-inside text-gray-400 space-y-2 italic">
                        <li>Log in to your account</li>
                        <li>Go to <span class="text-white font-bold">Account → Verification</span></li>
                        <li>Verify your email address</li>
                        <li>Verify your phone number</li>
                        <li>Complete Level 1</li>
                    </ul>
                </section>

                <section>
                    <h3 class="text-lg font-bold text-white mb-4 underline uppercase tracking-tighter">Level 2 Verification (Identity)</h3>
                    <ul class="list-decimal list-inside text-gray-400 space-y-2 mb-6 ml-2 italic leading-relaxed">
                        <li>Go to Account → Verification</li>
                        <li>Click "Start Level 2 Verification"</li>
                        <li>Select your country/region</li>
                        <li>Choose your ID document (Passport, National ID, or Driver's License)</li>
                        <li>Take clear photos of the <strong>Front</strong> and <strong>Back</strong> of ID</li>
                        <li>Provide a selfie holding your ID document</li>
                        <li>Submit for review</li>
                    </ul>
                </section>

                <section class="bg-[#171A1E] p-6 rounded-2xl border border-white/5">
                    <h4 class="font-black text-white text-xs uppercase tracking-widest mb-4">Document Requirements</h4>
                    <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-[11px] text-gray-500 font-bold">
                        <li class="flex items-center gap-2 italic">• Document must be valid</li>
                        <li class="flex items-center gap-2 italic">• Photos must be readable</li>
                        <li class="flex items-center gap-2 italic">• All corners visible</li>
                        <li class="flex items-center gap-2 italic">• No glare or reflections</li>
                        <li class="flex items-center gap-2 italic">• Max size: 10MB per image</li>
                        <li class="flex items-center gap-2 italic">• JPG, PNG, PDF formats</li>
                    </ul>
                </section>

                <section>
                    <h4 class="text-orange-500 font-black text-xs uppercase tracking-[0.3em] mb-4">Common Issues</h4>
                    <div class="space-y-3">
                        <p class="text-xs text-gray-500 italic"><strong class="text-white uppercase tracking-widest mr-1 text-[9px]">Rejected?</strong> Ensure photos are clear and information is visible</p>
                        <p class="text-xs text-gray-500 italic"><strong class="text-white uppercase tracking-widest mr-1 text-[9px]">Pending?</strong> Processing takes 1-24 hours</p>
                        <p class="text-xs text-gray-500 italic"><strong class="text-white uppercase tracking-widest mr-1 text-[9px]">Delayed?</strong> Contact support if longer than 48 hours</p>
                    </div>
                </section>
            </div>
        `
    },
    "address-whitelist": {
        title: "How to Use Address Whitelist?",
        category: "KYC & Security",
        updated: "Feb 24, 2026",
        content: `
            <h2 class="text-xl font-bold text-white mb-6">Restricting Withdrawals for Security</h2>
            <p class="text-gray-400 mb-8 leading-relaxed italic">Address Whitelist is a security feature that restricts cryptocurrency withdrawals to only pre-approved addresses.</p>
            
            <h3 class="text-lg font-bold text-white mb-4">Benefits</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
                <div class="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center gap-3">
                    <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    <span class="text-xs font-bold text-gray-400 italic">Enhanced Security</span>
                </div>
                <div class="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center gap-3">
                    <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    <span class="text-xs font-bold text-gray-400 italic">Anti-Hacking Protection</span>
                </div>
                <div class="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center gap-3">
                    <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    <span class="text-xs font-bold text-gray-400 italic">Peace of Mind</span>
                </div>
                <div class="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center gap-3">
                    <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    <span class="text-xs font-bold text-gray-400 italic">Accident Prevention</span>
                </div>
            </div>

            <h3 class="text-md font-black text-white uppercase tracking-[0.2em] mb-6 underline">Setting Up Address Whitelist</h3>
            
            <div class="space-y-8 mb-12">
                <div class="pl-4 border-l-2 border-white/5">
                    <h4 class="font-bold text-white mb-2 italic text-sm">Step 1: Enable Whitelist</h4>
                    <p class="text-xs text-gray-500 leading-relaxed italic">Go to Account Settings → Security → Address Whitelist. Toggle 'Enable Address Whitelist' to ON and confirm activation.</p>
                </div>
                <div class="pl-4 border-l-2 border-white/5">
                    <h4 class="font-bold text-white mb-2 italic text-sm">Step 2: Add Addresses</h4>
                    <p class="text-xs text-gray-500 leading-relaxed italic">Click 'Add Address', select the crypto (BTC, ETH, etc.) and network (ERC-20, TRC-20, etc.). Enter the address and a descriptive label, then verify with 2FA.</p>
                </div>
                <div class="pl-4 border-l-2 border-white/5">
                    <h4 class="font-bold text-white mb-2 italic text-sm">Step 3: Verify Address</h4>
                    <p class="text-xs text-gray-500 leading-relaxed italic">New addresses have a 24-hour verification period. After 24 hours, you will receive an email confirmation and the address will be activated.</p>
                </div>
            </div>

            <div class="p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl italic">
                <h4 class="text-xs font-black text-rose-500 uppercase tracking-widest mb-2">Important Note</h4>
                <p class="text-[11px] text-gray-500 italic">Whitelist only affects withdrawals, not deposits. New addresses always require a 24-hour waiting period.</p>
            </div>
        `
    },
    "enable-2fa": {
        title: "Two-Factor Authentication (2FA) Guide",
        category: "KYC & Security",
        updated: "Feb 24, 2026",
        content: `
            <h2 class="text-xl font-bold text-white mb-6">Protective Layering</h2>
            <p class="text-gray-400 mb-10 leading-relaxed italic">Two-Factor Authentication adds an extra layer of security to your account by requiring a second verification method in addition to your password.</p>
            
            <div class="space-y-10">
                <section>
                    <h3 class="text-md font-black text-emerald-500 uppercase tracking-widest mb-4">Google Authenticator (Recommended)</h3>
                    <ul class="list-decimal list-inside text-gray-400 space-y-2 text-sm italic">
                        <li>Download Google Authenticator app on your mobile</li>
                        <li>Go to <span class="text-white">Account Settings → Security → 2FA</span></li>
                        <li>Click "Enable 2FA" → "Google Authenticator"</li>
                        <li>Scan the QR code and save your backup codes safely</li>
                        <li>Enter the 6-digit code to Enable</li>
                    </ul>
                </section>

                <section>
                    <h3 class="text-md font-black text-white uppercase tracking-widest mb-4 border-b border-white/5 pb-2">SMS Authentication</h3>
                    <p class="text-sm text-gray-500 italic mb-3">Enable SMS as a secondary method by linking your phone number and entering the verification codes sent during sensitive actions.</p>
                </section>

                <section>
                    <h3 class="text-md font-black text-white uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Email Authentication</h3>
                    <p class="text-sm text-gray-500 italic mb-3">Enforce mandatory email verification for all withdrawals and security changes.</p>
                </section>
            </div>

            <div class="mt-12 p-8 bg-orange-500/10 border border-orange-500/20 rounded-3xl text-center shadow-xl shadow-orange-500/5">
                <h4 class="text-lg font-black text-white uppercase tracking-tight mb-2 italic italic">Backup Codes</h4>
                <p class="text-[11px] text-gray-400 italic leading-relaxed">Always save your backup codes in a secure location. You can use them to access your account if you lose access to your 2FA device.</p>
            </div>
        `
    },
    "use-passkey": {
        title: "Passkey (WebAuthn) Authentication Guide",
        category: "KYC & Security",
        updated: "Feb 24, 2026",
        content: `
            <h2 class="text-xl font-bold text-white mb-4">Modern Passwordless Security</h2>
            <p class="text-gray-400 mb-6 italic">Passkeys are a modern, passwordless authentication method using biometric data or hardware keys.</p>
            
            <div class="bg-[#0B0E11] p-8 rounded-3xl border border-white/5 mb-8">
                <p class="text-sm text-gray-500 italic leading-relaxed mb-6">By linking your device's biometrics (FaceID, TouchID, or Windows Hello) to Arbix, you can log in with a single touch, eliminating the risk of phishing or password theft.</p>
                <div class="flex items-center gap-2">
                    <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span class="text-[10px] font-black text-white uppercase tracking-widest">Supported on All Modern Platforms</span>
                </div>
            </div>

            <h3 class="text-md font-black text-orange-500 uppercase tracking-widest mb-4">How to Setup</h3>
            <p class="text-sm text-gray-400 italic leading-relaxed">Navigate to Security → Passkeys and select 'Add Passkey'. Your device will prompt for biometric verification. Once completed, your device is permanently linked for secure, zero-password login.</p>
        `
    },
    "recover-google-auth": {
        title: "How to Recover Google Authenticator?",
        category: "KYC & Security",
        updated: "Feb 24, 2026",
        content: `
            <div class="relative p-10 bg-rose-500/5 border border-rose-500/10 rounded-[2.5rem] mb-12">
                <h2 class="text-2xl font-black text-rose-500 mb-4 uppercase tracking-tighter italic">Authenticator Recovery</h2>
                <p class="text-gray-400 leading-relaxed italic font-medium">Lost your device? Recovery is possible through either your secret backup key or direct platform verification.</p>
            </div>
            
            <div class="space-y-8">
                <section>
                    <h3 class="text-lg font-bold text-white mb-2 italic uppercase tracking-tight">Using Backup Keys</h3>
                    <p class="text-sm text-gray-500 leading-relaxed italic">If you saved your 16-digit secret key, simply enter it into a new Google Authenticator app instance to immediately restore access to your account codes.</p>
                </section>
                
                <section>
                    <h3 class="text-lg font-bold text-white mb-2 italic uppercase tracking-tight">Manual Account Reset</h3>
                    <p class="text-sm text-gray-500 leading-relaxed italic">If you have no backup, contact Arbix Support to initiate a manual 2FA reset. You will be required to provide selfie verification holding your government ID and a handwritten note. This process takes 48-72 hours for security reasons.</p>
                </section>
            </div>
        `
    },
    "deposit-crypto": {
        title: "How to Deposit Cryptocurrency?",
        category: "Deposits & Withdrawals",
        updated: "Feb 24, 2026",
        content: `
            <h2 class="text-xl font-bold text-white mb-6 uppercase tracking-tight">Deposit Process</h2>
            
            <div class="space-y-10">
                <section class="pl-4 border-l-2 border-orange-500/50">
                    <h3 class="font-black text-white mb-2 uppercase text-sm tracking-widest">Step 1: Get Your Deposit Address</h3>
                    <p class="text-sm text-gray-500 leading-relaxed italic mb-4">Log in to your Arbix account and navigate to <span class="text-white">Assets → Deposit</span>. Select the cryptocurrency you wish to fund.</p>
                </section>

                <section class="pl-4 border-l-2 border-orange-500/50">
                    <h3 class="font-black text-white mb-2 uppercase text-sm tracking-widest">Step 2: Select Network</h3>
                    <p class="text-sm text-gray-500 leading-relaxed italic mb-4">Choose the correct network (e.g., BTC, ERC-20, TRC-20, BEP-20). <span class="text-rose-500 font-bold">CRITICAL:</span> Ensure the network on your external wallet matches the network selected on Arbix or your funds will be lost permanently.</p>
                </section>

                <section class="pl-4 border-l-2 border-orange-500/50">
                    <h3 class="font-black text-white mb-2 uppercase text-sm tracking-widest">Step 3: Copy/Scan Address</h3>
                    <p class="text-sm text-gray-500 leading-relaxed italic">Copy the unique deposit address or scan the QR code using your external wallet app. Initiate the transfer from your source wallet.</p>
                </section>
            </div>

            <div class="mt-12 p-6 bg-[#171A1E] border border-white/5 rounded-2xl italic text-[11px] text-gray-500">
                <span class="text-white font-black uppercase tracking-widest block mb-2">Confirmation Time:</span>
                Deposits are credited after a specific number of network confirmations (e.g., 2 for BTC, 12 for ETH). This typically takes 5-30 minutes depending on network congestion.
            </div>
        `
    },
    "withdraw-crypto": {
        title: "How to Withdraw Cryptocurrency?",
        category: "Deposits & Withdrawals",
        updated: "Feb 24, 2026",
        content: `
            <h2 class="text-xl font-bold text-white mb-6 uppercase tracking-tight">Withdrawal Process</h2>
            
            <div class="space-y-8">
                <section class="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-2xl">
                    <h3 class="font-black text-emerald-500 mb-2 uppercase text-xs tracking-widest">Step 1: Whitelist Address (Recommended)</h3>
                    <p class="text-[13px] text-gray-400 italic">For maximum security, enable the <span class="text-white">Withdrawal Address Whitelist</span> in your security settings before initiating a transfer.</p>
                </section>

                <section class="pl-4 border-l-2 border-white/10">
                    <h3 class="font-bold text-white mb-2 text-sm italic">Step 2: Initiate Withdrawal</h3>
                    <p class="text-sm text-gray-500 italic leading-relaxed">Navigate to Assets → Withdraw. Select your token and enter the destination address and amount.</p>
                </section>

                <section class="pl-4 border-l-2 border-white/10">
                    <h3 class="font-bold text-white mb-2 text-sm italic">Step 3: Verification</h3>
                    <p class="text-sm text-gray-500 italic leading-relaxed">Complete 2FA (Google Authenticator) and Email confirmation. Requests are typically processed within 5-10 minutes.</p>
                </section>
            </div>

            <div class="mt-8 p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl italic">
                <h4 class="text-xs font-black text-rose-500 uppercase tracking-widest mb-1 italic">Withdrawal Warnings</h4>
                <p class="text-[11px] text-gray-500 italic">Double-check the destination address and network. Arbix cannot recover tokens sent to the wrong address or network.</p>
            </div>
        `
    },
    "deposit-fiat": {
        title: "How to Deposit Fiat via Bank Transfer?",
        category: "Deposits & Withdrawals",
        updated: "Feb 24, 2026",
        content: `
            <h2 class="text-xl font-bold text-white mb-4">Funding with Local Currency</h2>
            <p class="text-gray-400 mb-6 italic">Arbix supports SEPA, SWIFT, and Faster Payments for direct bank-to-wallet funding.</p>
            <p class="text-sm text-gray-500 leading-relaxed italic">Navigate to Deposit → Fiat, select your currency, and follow the unique payment instructions provided. <span class="text-orange-500">Note:</span> Your bank account name must exactly match your Arbix KYC name.</p>
        `
    },
    "withdrawal-limits": {
        title: "Withdrawal Limits and Fees",
        category: "Deposits & Withdrawals",
        updated: "Feb 24, 2026",
        content: `
            <h2 class="text-xl font-bold text-white mb-4 italic">Tiered Limits</h2>
            <div class="space-y-4 mb-8">
                <p class="text-gray-400 text-sm">Withdrawal limits are determined by your KYC verification level and account history. Check your current tier in the <span class="text-white">Account Settings</span>.</p>
                <div class="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                    <p class="text-xs text-gray-500 italic uppercase tracking-widest"><strong class="text-white">Standard Fee:</strong> Dynamic based on network congestion at the time of withdrawal.</p>
                </div>
            </div>
        `
    },
    "spot-trading": {
        title: "How to Trade Spot Markets?",
        category: "Trading",
        updated: "Feb 24, 2026",
        content: `
            <div class="space-y-8">
                <section>
                    <h2 class="text-xl font-bold text-white mb-4 uppercase">Getting Started</h2>
                    <p class="text-gray-400 mb-6 italic">Arbix Spot Trading allows you to exchange one cryptocurrency for another instantly at current market prices.</p>
                    
                    <div class="pl-4 border-l-2 border-orange-500/50 space-y-4">
                        <p class="text-sm text-gray-400 italic"><strong>Step 1: Fund Your Account</strong> — Deposit crypto into your Arbix wallet.</p>
                        <p class="text-sm text-gray-400 italic"><strong>Step 2: Choose a Pair</strong> — Select from hundreds of pairs like BTC/USDT or ETH/BTC.</p>
                        <p class="text-sm text-gray-400 italic"><strong>Step 3: Execute Trade</strong> — Enter your amount and click Buy or Sell.</p>
                    </div>
                </section>
                
                <div class="p-6 bg-[#171A1E] rounded-2xl border border-white/5">
                    <h4 class="text-[10px] font-black text-white uppercase tracking-widest mb-2">Pro Tip</h4>
                    <p class="text-[11px] text-gray-500 leading-relaxed italic">Use the 'Favorites' feature (star icon) to pin your most traded pairs for instant access on the mobile app.</p>
                </div>
            </div>
        `
    },
    "order-types": {
        title: "Order Types Explained",
        category: "Trading",
        updated: "Feb 24, 2026",
        content: `
            <h2 class="text-xl font-black text-white mb-6 uppercase tracking-tight">Understanding Order Execution</h2>
            
            <div class="space-y-6">
                <section class="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <h3 class="text-emerald-500 font-bold mb-2 uppercase tracking-wide">Market Orders</h3>
                    <p class="text-[13px] text-gray-400 leading-relaxed italic">Market orders execute immediately at the best available current price. Use this when you need speed over a specific price point.</p>
                </section>

                <section class="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <h3 class="text-orange-500 font-bold mb-2 uppercase tracking-wide">Limit Orders</h3>
                    <p class="text-[13px] text-gray-400 leading-relaxed italic">Set a maximum purchase price or minimum sell price. The order will only execute if the market reaches your specified target.</p>
                </section>

                <section class="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <h3 class="text-rose-500 font-bold mb-2 uppercase tracking-wide">Stop-Limit Orders</h3>
                    <p class="text-[13px] text-gray-400 leading-relaxed italic">Triggered only after a certain price level (Stop Price) is reached. Essential for protecting assets against sudden market drops.</p>
                </section>
            </div>
        `
    },
    "trading-fees": {
        title: "Trading Fees Explained",
        category: "Trading",
        updated: "Feb 24, 2026",
        content: `
            <h2 class="text-xl font-bold text-white mb-4 italic">Arbix Fee Structure</h2>
            <p class="text-gray-400 mb-8 italic">We use a competitive maker-taker model to ensure high liquidity and fair pricing for all traders.</p>
            
            <div class="grid grid-cols-2 gap-4 mb-8">
                <div class="p-6 bg-[#0B0E11] border border-white/5 rounded-3xl text-center">
                    <div class="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Maker Fee</div>
                    <div class="text-3xl font-black text-white">0.1%</div>
                    <p class="text-[9px] text-gray-600 mt-2 uppercase">Providing Liquidity</p>
                </div>
                <div class="p-6 bg-[#0B0E11] border border-white/5 rounded-3xl text-center">
                    <div class="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Taker Fee</div>
                    <div class="text-3xl font-black text-white">0.1%</div>
                    <p class="text-[9px] text-gray-600 mt-2 uppercase">Taking Liquidity</p>
                </div>
            </div>

            <p class="text-sm text-gray-500 leading-relaxed italic text-center">Fees are automatically deducted from the settled asset. High-volume traders may qualify for tier-based discounts.</p>
        `
    },
    "p2p-trading": {
        title: "How to Use P2P Trading?",
        category: "P2P Trading",
        updated: "Feb 24, 2026",
        content: `
            <h2 class="text-xl font-bold text-white mb-4">What is P2P Trading?</h2>
            <p class="text-gray-400 mb-6 italic leading-relaxed">Arbix P2P (Peer-to-Peer) allows you to buy and sell cryptocurrencies directly between users without an intermediary. This enables a wide range of local payment methods.</p>
            
            <div class="space-y-4">
                <div class="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                    <p class="text-sm text-gray-300 italic"><span class="font-black mr-2">1. Selection:</span> Browse ads for the best price and local payment method.</p>
                </div>
                <div class="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                    <p class="text-sm text-gray-300 italic"><span class="font-black mr-2">2. Payment:</span> Transfer funds directly to the seller's account.</p>
                </div>
                <div class="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                    <p class="text-sm text-gray-300 italic"><span class="font-black mr-2">3. Release:</span> Once the seller confirms receipt, Arbix releases the crypto to your wallet via escrow.</p>
                </div>
            </div>
        `
    },
    "p2p-dispute": {
        title: "How to Submit P2P Order Dispute?",
        category: "P2P Trading",
        updated: "Feb 24, 2026",
        content: `
            <div class="p-8 bg-rose-500/5 border border-rose-500/20 rounded-[2rem] mb-8">
                <h2 class="text-xl font-black text-rose-500 uppercase tracking-tighter mb-4 italic">When to Submit a Dispute</h2>
                <ul class="text-sm text-gray-400 space-y-2 italic list-disc list-inside">
                    <li>Seller hasn't released crypto after your payment</li>
                    <li>Buyer marked paid but you haven't received funds</li>
                    <li>Payment amount or method doesn't match the order</li>
                </ul>
            </div>
            
            <h3 class="text-lg font-bold text-white mb-4">Process:</h3>
            <p class="text-sm text-gray-500 leading-relaxed italic mb-6">In the order details page, click the <span class="text-white font-bold">'Help/Appeal'</span> button. Our 24/7 support agents will intervene, audit the provided screenshots/proofs, and release or return the funds accordingly.</p>
        `
    },
    "what-is-staking": {
        title: "What is Staking?",
        category: "Staking",
        updated: "Feb 24, 2026",
        content: `
            <h2 class="text-xl font-bold text-white mb-4">Earning Passive Rewards</h2>
            <p class="text-gray-400 mb-8 font-medium leading-relaxed italic">Staking is the process of locking your cryptocurrencies to support a blockchain network. In return, you earn rewards in the form of additional tokens.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div class="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <span class="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-1">Estimated APY</span>
                    <p class="text-sm text-gray-300 italic">Target rewards range from 2% to 25% depending on the asset and lock duration.</p>
                </div>
                <div class="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <span class="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-1">Flexibility</span>
                    <p class="text-sm text-gray-300 italic">Choose between Flexible (redeem any time) or Fixed (higher rewards for longer locks).</p>
                </div>
            </div>
        `
    },
    "start-staking": {
        title: "How to Start Staking?",
        category: "Staking",
        updated: "Feb 24, 2026",
        content: `
            <h2 class="text-xl font-bold text-white mb-6 uppercase tracking-tighter italic">Step-by-Step Staking</h2>
            
            <div class="space-y-6">
                <section class="pl-4 border-l-2 border-orange-500/30">
                    <h4 class="font-bold text-white mb-1 uppercase text-xs tracking-widest">1. Selection</h4>
                    <p class="text-sm text-gray-500 italic">Go to the Earn/Staking tab and browse available products and target APYs.</p>
                </section>
                <section class="pl-4 border-l-2 border-orange-500/30">
                    <h4 class="font-bold text-white mb-1 uppercase text-xs tracking-widest">2. Subscription</h4>
                    <p class="text-sm text-gray-500 italic">Enter the amount you wish to stake and agree to the staking duration terms.</p>
                </section>
                <section class="pl-4 border-l-2 border-orange-500/30">
                    <h4 class="font-bold text-white mb-1 uppercase text-xs tracking-widest">3. Rewards</h4>
                    <p class="text-sm text-gray-500 italic">Distributions begin within 24-48 hours and are paid directly to your Earn/Funding wallet.</p>
                </section>
            </div>
        `
    }
};

export default function ArticlePage() {
    const params = useParams();
    const router = useRouter();
    const articleId = params.id as string;
    const article = ARTICLE_CONTENT[articleId as keyof typeof ARTICLE_CONTENT];

    if (!article) return <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center italic">Article not found</div>;

    return (
        <main className="min-h-screen bg-[#020202] text-white pt-10 md:pt-16 pb-20 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Navigation Toolbar */}
                <div className="flex items-center justify-between mb-12">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-bold uppercase tracking-widest italic">{article.category}</span>
                    </button>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-500 hover:text-white transition-colors"><Share2 size={18} /></button>
                        <button className="p-2 text-gray-500 hover:text-white transition-colors"><Printer size={18} /></button>
                    </div>
                </div>

                {/* Article Header */}
                <header className="mb-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4 leading-tight">
                        {article.title}
                    </h1>
                    <div className="text-gray-500 text-xs font-bold uppercase tracking-widest italic">
                        Last Updated: {article.updated}
                    </div>
                </header>

                {/* Article Body */}
                <article
                    className="prose prose-invert max-w-none bg-[#0B0E11] border border-white/5 p-8 md:p-12 rounded-3xl shadow-2xl"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Feedback Section */}
                <div className="mt-12 p-8 border-t border-white/5 flex flex-col items-center">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 italic">Was this article helpful?</p>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/5 rounded-full hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all group">
                            <ThumbsUp size={18} className="text-gray-500 group-hover:text-emerald-500" />
                            <span className="text-xs font-bold text-gray-400 group-hover:text-white">Yes</span>
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/5 rounded-full hover:bg-rose-500/10 hover:border-rose-500/30 transition-all group">
                            <ThumbsDown size={18} className="text-gray-500 group-hover:text-rose-500" />
                            <span className="text-xs font-bold text-gray-400 group-hover:text-white">No</span>
                        </button>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-12 bg-orange-500/5 border border-orange-500/10 p-8 rounded-3xl flex flex-col items-center text-center">
                    <MessageSquare className="text-orange-500 mb-4" size={32} />
                    <h4 className="text-lg font-bold mb-2 Italics uppercase tracking-tight">Still need help?</h4>
                    <p className="text-sm text-gray-400 mb-6 italic max-w-sm">Our support team is available 24/7 to assist with any account issues or questions.</p>
                    <Link
                        href="/support"
                        className="px-8 py-3 bg-orange-500 text-white font-black uppercase tracking-[0.2em] rounded-xl hover:bg-orange-600 transition-all active:scale-95"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </main>
    );
}
