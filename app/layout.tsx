import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import { AuthProvider } from "@/context/AuthContext";
import { PortfolioProvider } from "@/context/PortfolioContext";
import LayoutWrapper from "@/components/LayoutWrapper";

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
  icons: {
    icon: "/Platform Logo main.png",
    apple: "/Platform Logo main.png",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <AuthProvider>
          <PortfolioProvider>
            <ModalProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
            </ModalProvider>
          </PortfolioProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
