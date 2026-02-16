
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface TokenLogoProps {
    symbol: string;
    chain?: string;
    address?: string;
    size?: number;
    className?: string;
}

export default function TokenLogo({ symbol, chain, address, size = 28, className = "" }: TokenLogoProps) {
    const [logo, setLogo] = useState<string | null>(null);

    useEffect(() => {
        const fetchLogo = async () => {
            try {
                const params = new URLSearchParams();
                if (symbol) params.append("symbol", symbol);
                if (chain) params.append("chain", chain);
                if (address) params.append("address", address);

                const res = await fetch(`/api/token-logo?${params.toString()}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.logo) {
                        setLogo(data.logo);
                    } else {
                        setLogo("FALLBACK");
                    }
                } else {
                    setLogo("FALLBACK");
                }
            } catch (error) {
                console.error("Failed to fetch token logo:", error);
                setLogo("FALLBACK");
            }
        };

        fetchLogo();
    }, [symbol, chain, address]);

    if (!logo || logo === "FALLBACK") {
        return (
            <div
                className={`bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 rounded-full flex items-center justify-center font-black text-gray-500 shadow-sm ${className}`}
                style={{ width: size, height: size, fontSize: size * 0.4 }}
            >
                {symbol?.[0] || "?"}
            </div>
        );
    }

    return (
        <Image
            src={logo}
            alt={symbol}
            width={size}
            height={size}
            className={`rounded-full object-cover border border-gray-100 ${className}`}
            onError={() => setLogo("FALLBACK")}
        />
    );
}
