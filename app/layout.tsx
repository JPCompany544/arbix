import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arbit - Premium Arbitrage Platform",
  description: "Advanced crypto arbitrage and market analytics platform.",
};

import { ModalProvider } from "@/context/ModalContext";
import { AuthProvider } from "@/context/AuthContext";
import DepositModal from "@/components/DepositModal";



import { PortfolioProvider } from "@/context/PortfolioContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <PortfolioProvider>
            <ModalProvider>
              <Navbar />
              {children}
              <Footer />
              <DepositModal />
            </ModalProvider>
          </PortfolioProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
