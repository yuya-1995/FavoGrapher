"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname(); // 現在のパスを取得

  useEffect(() => {
    // /login ページはガードしない
    if (pathname !== "/login" && status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router, pathname]);

  if (status === "loading") return <div>読み込み中...</div>;
  if (!session?.user && pathname !== "/login") return null;

  return <>{children}</>;
}
