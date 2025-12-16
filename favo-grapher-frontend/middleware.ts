import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // 認証不要
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // 未ログイン
  if (!token?.sub) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ユーザー登録チェック
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${token.sub}`,
    { cache: "no-store" }
  );

  if (res.status === 404) {
    return NextResponse.redirect(new URL("/register", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
