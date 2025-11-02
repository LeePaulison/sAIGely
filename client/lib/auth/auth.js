import NextAuth from 'next-auth';
// Provider
import GitHub from 'next-auth/providers/github';
import Resend from 'next-auth/providers/resend';
// Database adapter
import NeonAdapter from '@auth/neon-adapter';
import { Pool } from '@neondatabase/serverless';

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
  const neon = new Pool({
    connectionString: process.env.NEON_DATABASE_URL,
  });
  const resend = new Resend(process.env.AUTH_RESEND_KEY);
  return {
    adapter: NeonAdapter(neon),
    providers: [
      GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      Resend({
        apiKey: process.env.AUTH_RESEND_KEY,
        from: 'onboarding@resend.dev',
      }),
    ],
    secret: process.env.AUTH_SECRET,
    authUrl: process.env.AUTH_URL,
  };
});
