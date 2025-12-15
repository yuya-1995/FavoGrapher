"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // すでにログインしていたらトップページへ
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "5rem" }}>
      <h1>ログイン</h1>
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "1rem",
        }}
      >
        Googleでログイン
      </button>
    </div>
  );
}
