import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // optional place to add domain filters or block accounts
      return true;
    },
    async jwt({ token, user }) {
      // Only runs on first sign-in
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom props from token to session
      session.user ??= {};
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.image = token.image as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
