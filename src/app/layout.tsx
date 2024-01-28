import { Inter } from "next/font/google";

import type { Metadata } from "next";

import { Navbar } from "@/components/common/navbar";
import { Trends } from "@/components/common/trends";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Página inicial / X",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-black xl:grid xl:justify-center xl:grid-cols-[auto_min(600px,100%)_auto] gap-8">
          <Navbar />
          <main className="lg:border-x border-[#2F3336] w-full pb-16 lg:pb-0">
            {children}
          </main>
          <Trends />
        </div>
      </body>
    </html>
  );
}
