import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "CarbonWatcher — Docs",
  description:
    "Track the energy, carbon footprint, and cost of ML training runs and LLM API calls — automatically.",
  keywords: ["carbon", "ml", "energy", "sustainability", "llm", "green ai"],
  openGraph: {
    title: "CarbonWatcher",
    description: "Track energy, carbon, and cost of every ML run and LLM call.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans">
        <TopBar />
        <div className="layout-shell">
          <Sidebar />
          <main className="main-content">
            <div className="content-inner">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
