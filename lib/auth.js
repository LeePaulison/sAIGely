import GitHubProvider from 'next-auth/providers/github';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET;

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
      if (user) {
        console.log('[NextAuth] Issuing new token for:', user.id);
        token.id = user.id;
      }
      if (token?.id) {
        console.log('[NextAuth] Token ID:', token.id);
      } else {
        console.log('[NextAuth] No user ID in token');
      }
      console.log('[NextAuth] Token:', token);
      console.log('[NextAuth] Token (raw):', JSON.stringify(token));
      return token;
    },
    async session({ session, token }) {
      if (token?.id) session.user.id = token.id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export function getSubFromAuthHeader(authHeader) {
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.slice(7); // remove 'Bearer '
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload?.sub || null;
  } catch (err) {
    console.warn('[JWT] Invalid token:', err);
    return null;
  }
}
