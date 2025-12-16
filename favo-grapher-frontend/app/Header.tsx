"use client";

import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between", // 左右に分ける
        alignItems: "center",
        padding: "1rem",
        borderBottom: "1px solid #eaeaea",
      }}
    >
      {/* 左側：サービス名 */}
      <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
        FavoGraph
      </div>

      {/* 右側：ログアウトボタン */}
      {session?.user && (
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ログアウト
        </button>
      )}
    </header>
  );
}
