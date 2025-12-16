"use client";

import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  const menuItems = [
    { label: "🔍", path: "/" },
    { label: "🏠", path: "/posts" },
    { label: "投稿", path: "/posts/new" },
    { label: "👤", path: "/mypage" },
  ];

  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#fff",
        borderTop: "1px solid #eaeaea",
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 0",
        boxShadow: "0 -1px 5px rgba(0,0,0,0.1)",
        zIndex: 100,
      }}
    >
      {menuItems.map((item) => (
        <button
          key={item.label}
          onClick={() => router.push(item.path)}
          style={{
            background: "none",
            border: "none",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          {item.label}
        </button>
      ))}
    </footer>
  );
}
