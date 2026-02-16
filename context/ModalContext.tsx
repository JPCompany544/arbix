"use client";

import { createContext, useContext, useState } from 'react';

export type ModalTab = 'deposit' | 'withdraw' | 'activity';

type ModalContextType = {
    isModalOpen: boolean;
    selectedToken: string;
    activeTab: ModalTab;
    openModal: (token?: string, tab?: ModalTab) => void;
    closeModal: () => void;
    setSelectedToken: (token: string) => void;
    setActiveTab: (tab: ModalTab) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedToken, setSelectedToken] = useState<string>("BTC");
    const [activeTab, setActiveTab] = useState<ModalTab>('deposit');

    const openModal = (token?: string, tab: ModalTab = 'deposit') => {
        if (token) setSelectedToken(token);
        else setSelectedToken("BTC");

        setActiveTab(tab);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // Reset tab to deposit on close? Or keep last state?
        // Resetting to deposit is safer for UX.
        setTimeout(() => setActiveTab('deposit'), 300);
    };

    return (
        <ModalContext.Provider value={{
            isModalOpen,
            selectedToken,
            activeTab,
            openModal,
            closeModal,
            setSelectedToken,
            setActiveTab
        }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
