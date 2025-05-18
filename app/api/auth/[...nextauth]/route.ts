import NextAuth, { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import * as userDAL from '@/lib/dal/users';
import * as prefDAL from '@/lib/dal/preferences';

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

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
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
    async signIn({ user }) {
      if (!user || !user.id) return false;

      // Does the user already exist?
      const existing = await userDAL.getUserByGithubId(user.id.toString());

      if (!existing) {
        const preferencesId = await prefDAL.createDefaultPreferences();
        await userDAL.createUser({
          githubId: user.id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          preferencesId,
        });
      }
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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
