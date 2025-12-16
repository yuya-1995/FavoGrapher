"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [user_id, setUser_id] = useState("");
  const [name, setName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user) {
      alert("ログインしてください");
      return;
    }

    // ここで API に入力ユーザーデータを送信
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, { // NestJS のサーバーURL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        id: session.user?.id || "999",
        image,
        user_id, 
        name, 
        introduction,
        email
        })
    });

    // セッションに情報追加
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${session.user?.id}`
      );
      if (res.ok) {
        const user = await res.json();
        // 登録済み → user_id を session に入れる
        session.user.session_id = user.user_id;
        session.user.session_nm = user.name;
      }
    } catch (e) {
      console.error("user fetch error", e);
    }

    if (res.ok) {
      router.push("/posts"); // 登録後はトップページに遷移
    } else {
      alert("投稿に失敗しました");
    }

  };

  return (
    <form
    onSubmit={handleSubmit}
    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>ユーザー登録</h1>
      <div style={{ marginBottom: "1rem" }}>
        <textarea
          placeholder="紹介写真"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", height: "150px" }}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="ユーザーID"
          value={user_id}
          onChange={(e) => setUser_id(e.target.value)}
          style={{ width: "100%", padding: "0.5rem" }}
          required
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <input
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <input
          placeholder="名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "0.5rem" }}
          required
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <textarea
          placeholder="紹介文"
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", height: "150px" }}
        />
      </div>
      <button type="submit" style={{ padding: "0.5rem 1rem" }}>
        登録
      </button>
    </form>
  );
}
