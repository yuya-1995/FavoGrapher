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
      if (token) {
        session.user.id = token.id as string; // session.user.id に Google ID をセット
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
