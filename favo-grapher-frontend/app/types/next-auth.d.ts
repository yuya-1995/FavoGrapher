// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    idToken?: string; // ここで拡張
  }

  interface User {
    // 必要であれば追加プロパティ
    
  }
}
