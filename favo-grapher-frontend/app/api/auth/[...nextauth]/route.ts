import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // JWT に Google の固有IDを追加
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.sub; // Google 固有IDを token に追加
      }
      return token;
    },
    // session に JWT の id を追加
    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = token.id as string;
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${token.id}`
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
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
