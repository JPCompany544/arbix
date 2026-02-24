"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
    const pathname = usePathname();
    const footerSections = [
        {
            title: "Trading",
            links: [
                "Markets",
                "Swap",
                "Spot",
                "Margin",
                "Futures",
                "Tournament",
                "P2P",
                "Buy Crypto",
            ],
        },
        {
            title: "Support",
            links: [
                "About Us",
                "Verify Official Channels",
                "Fees",
                "Bug Bounty",
                "Corporate Identity",
                "Institutional Services",
            ],
        },
        {
            title: "Products",
            links: ["Staking", "Crypto Lending", "Referral Program", "Token Listing"],
        },
        {
            title: "Legal & Disclosures",
            links: [
                "User Agreement",
                "AML Policy",
                "Privacy Policy",
                "Cookies Policy",
                "Risk Disclosure Statement",
                "Special Treatment",
                "Regulatory License",
                "Law Enforcement Requests",
            ],
        },
    ];

    if (pathname === "/signup" || pathname === "/login") return null;

    return (
        <footer className="hidden md:block bg-black text-white pt-16 pb-12 px-6 md:px-12 lg:px-24 relative z-20">
            <div className="max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Logo */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 group mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-black font-black text-lg">A</span>
                            </div>
                            <span className="text-white font-extrabold text-xl tracking-tighter">
                                Arbit<span className="text-orange-500 text-xl leading-none">.</span>
                            </span>
                        </Link>
                    </div>

                    {/* Footer Sections */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-white font-bold text-[13px] mb-4 tracking-wide">
                                {section.title}
                            </h4>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <Link
                                            href="#"
                                            className="text-gray-400 hover:text-orange-500 transition-colors text-[12px] font-medium"
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Copyright */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-[11px]">
                        © 2026 Arbit. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="text-gray-500 hover:text-white transition-colors">
                            <span className="sr-only">Twitter</span>
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                        </Link>
                        <Link href="#" className="text-gray-500 hover:text-white transition-colors">
                            <span className="sr-only">Telegram</span>
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.462 15.581c-.2.232-.406.313-.642.313-.171 0-3.33-1.061-3.69-1.2-.413-.16-.673-.348-.673-.556 0-.155.132-.303.413-.464 1.353-.8 2.56-1.637 3.593-2.613.232-.219.464-.541.464-.773 0-.116-.046-.194-.141-.231-.113-.046-.232-.016-.363.078-1.352 1.031-2.73 2.039-4.143 2.943-.094.062-.213.116-.345.161-.26.077-.488.116-.683.116-.519 0-.909-.271-1.123-.742l-.226-.503c-.156-.37-.43-.551-.818-.551-.08 0-.171.016-.271.047-1.611.512-3.141 1.011-4.593 1.488-.41.132-.619.349-.619.645 0 .284.187.522.566.71l1.109.52c.313.141.516.425.61.851.359 1.58.706 3.12 1.041 4.613.063.284.218.423.469.423a.81.81 0 0 0 .584-.249c.28-.276.541-.55.787-.822l.969-.96c.204-.202.433-.298.694-.298.077 0 .148.016.21.046.211.094 3.791 2.378 4.298 2.7.47.299.8.441.989.441.281 0 .47-.202.564-.614.406-1.782.805-3.538 1.192-5.267.118-.507.234-1.003.344-1.487.126-.549.252-1.077.378-1.586.078-.344.116-.611.116-.803 1e-3-.524-.265-.794-.805-.824z" /></svg>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
