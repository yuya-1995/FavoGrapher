// app/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  // サーバー側でセッション確認
  const session = await getServerSession(authOptions);

  if (!session) {
    // 未ログイン・セッション切れの場合はログイン画面へ
    redirect("/login");
  }

  // ログイン済みの場合は /posts へ遷移
  redirect("/posts");
}
