"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./Header";
import Footer from "./Footer";
import { SessionProvider, useSession } from "next-auth/react";
import { AuthGuard } from "./AuthGuard";

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
          <AuthGuard>
            <LayoutContent>{children}</LayoutContent>
          </AuthGuard>
        </SessionProvider>
      </body>
    </html>
  );
}

// Footer の表示を session に応じて切り替えるためのラッパーコンポーネント
function LayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  return (
    <>
      {children}
      {session?.user && <Footer />}
    </>
  );
}
