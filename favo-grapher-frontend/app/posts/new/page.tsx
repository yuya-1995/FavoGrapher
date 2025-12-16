"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function NewPostPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user) {
      alert("ログインしてください");
      return;
    }

    // ここで API に投稿データを送信
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, { // NestJS のサーバーURL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        title, 
        content, 
        author: session.user?.session_nm || "匿名",
        user_id: session.user?.session_id || "999"
        })
    });

    if (res.ok) {
      router.push("/posts"); // 投稿後はトップページに遷移
    } else {
      alert("投稿に失敗しました");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "5rem" }}>
      <h1>新しい投稿</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "0.5rem" }}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <textarea
            placeholder="内容"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", height: "150px" }}
            required
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <button type="submit" style={{ padding: "0.5rem 1rem" }}>
            投稿
          </button>
        </div>
      </form>
    </div>
  );
}
