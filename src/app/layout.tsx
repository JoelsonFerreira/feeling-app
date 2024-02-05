import { Inter } from "next/font/google";

import type { Metadata } from "next";

import { Navbar } from "@/components/common/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ThemeProvider } from "@/contexts/theme-provider";

import "./globals.css";
import { ServerProvider } from "@/contexts/server-context";
import { QueryProvider } from "@/contexts/query-provider";
import { cookies } from "next/headers";
import { AuthProvider } from "@/contexts/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Página inicial / FeelingApp",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <ServerProvider>
              <AuthProvider>
                <div className="min-h-screen w-full max-w-4xl mx-auto lg:grid grid-cols-[1fr_3fr] gap-4">
                  <Navbar />
                  <ScrollArea className="h-svh p-4 lg:pl-0" id="posts-list">
                    {children}
                  </ScrollArea>
                </div>
              </AuthProvider>
            </ServerProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
