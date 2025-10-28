import GitHubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
import NeonAdapter from '@auth/neon-adapter';
import { Resend } from 'resend';
import { Pool } from '@neondatabase/serverless';

console.log('Database URL:', process.env.DATABASE_URL ? 'Loaded' : 'Not Loaded');
console.log('Resend API Key:', process.env.RESEND_API_KEY ? 'Loaded' : 'Not Loaded');

const resend = new Resend(process.env.RESEND_API_KEY);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function getPoolClient() {
  const client = await pool.connect();
  await client.query('SET search_path TO next_auth, public;');
  return client;
}

export const authOptions = {
  adapter: NeonAdapter({
    query: async (...args) => {
      const client = await getPoolClient();
      try {
        return await client.query(...args);
      } finally {
        client.release();
      }
    },
  }),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    EmailProvider({
      from: 'onboarding@resend.dev',
      async sendVerificationRequest({ identifier, url, provider }) {
        const { host } = new URL(url);
        console.log(`Sending magic link to ${identifier} for host ${host}: ${url}`);
        try {
          await resend.emails.send({
            from: provider.from,
            to: identifier,
            subject: `Sign in to ${host}`,
            html: `<p><a href="${url}">Sign in</a></p>`,
          });
          console.log('Verification email sent successfully with resend:', resend);
        } catch (error) {
          console.error('Error sending verification email:', error);
          throw new Error('Failed to send verification email');
        }
      },
    }),
  ],
  session: {
    strategy: 'database',
  },
  callbacks: {
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
