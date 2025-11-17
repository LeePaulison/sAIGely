// lib/auth/auth.js
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Resend from 'next-auth/providers/resend';
import NeonAdapter from '@auth/neon-adapter';
import { Pool } from '@neondatabase/serverless';

const neon = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
});

export const authOptions = {
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
};

// Export all NextAuth handlers and utilities
export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
