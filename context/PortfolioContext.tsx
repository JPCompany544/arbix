"use client";

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

export interface PortfolioAsset {
    chain: string;
    symbol: string;
    balance: number;
    rawBalance: string;
    usdValue: number;
    price: number;
}

interface PortfolioData {
    totalUsdValue: number;
    assets: PortfolioAsset[];
}

interface PortfolioContextType {
    portfolio: PortfolioData | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider = ({ children }: { children: React.ReactNode }) => {
    const { isLoggedIn } = useAuth();
    const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPortfolio = useCallback(async () => {
        if (!isLoggedIn) {
            setPortfolio(null);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/wallet/portfolio');
            if (!res.ok) {
                if (res.status === 401) {
                    setError('Session expired or unauthorized');
                    setPortfolio(null);
                } else {
                    setError('Failed to load portfolio data');
                }
                return;
            }
            const data = await res.json();
            setPortfolio(data);
        } catch (err: any) {
            console.error('Portfolio fetch error:', err);
            setError('Network error: Unable to load portfolio');
        } finally {
            setIsLoading(false);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (isLoggedIn) {
            fetchPortfolio();
        }
    }, [isLoggedIn, fetchPortfolio]);

    // Optional: Auto-refresh every 30 seconds
    useEffect(() => {
        if (!isLoggedIn) return;
        const interval = setInterval(fetchPortfolio, 30000);
        return () => clearInterval(interval);
    }, [isLoggedIn, fetchPortfolio]);

    return (
        <PortfolioContext.Provider value={{ portfolio, isLoading, error, refetch: fetchPortfolio }}>
            {children}
        </PortfolioContext.Provider>
    );
};

export const usePortfolio = () => {
    const context = useContext(PortfolioContext);
    if (context === undefined) {
        throw new Error('usePortfolio must be used within a PortfolioProvider');
    }
    return context;
};
