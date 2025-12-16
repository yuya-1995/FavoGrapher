// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id?: string | null; // Google ID を追加
      session_id?: string | null; // ユーザーID
      session_nm?: string | null; // ユーザーネームを追加
    };
  }

  interface User {
    // 必要であれば追加プロパティ
    id: string | null; // JWT に追加した Google ID
  }
}
