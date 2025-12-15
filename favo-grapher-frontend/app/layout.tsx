"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./Header";
import Footer from "./Footer";
import { SessionProvider } from "next-auth/react";
import { AuthGuard } from "./AuthGuard"; // 別ファイルから import

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <SessionProvider>
          <Header />
          <AuthGuard>{children}</AuthGuard>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
