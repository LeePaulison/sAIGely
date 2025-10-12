import GitHubProvider from 'next-auth/providers/github';
import { getSubFromAuthHeader } from './token.js';

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    encryption: false,
  },
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          token.id = user.id;
        }
      } catch (error) {
        console.error('[NextAuth] JWT error:', error);
      }
      return token;
    },
    async session({ session, token }) {
      try {
        if (token?.id) session.user.id = token.id;
      } catch (error) {
        console.error('[NextAuth] Session error:', error);
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export { getSubFromAuthHeader };
