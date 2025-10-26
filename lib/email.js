import { Resend } from 'resend';
import EmailProvider from 'next-auth/providers/email';

const resend = new Resend(process.env.RESEND_API_KEY);

EmailProvider({
  async sendVerificationRequest({ identifier, url, provider }) {
    const { host } = new URL(url);
    await resend.emails.send({
      from: 'sAIgely <no-reply@saigely.app>',
      to: identifier,
      subject: `Sign in to ${host}`,
      html: `<p><a href="${url}">Sign in</a></p>`,
    });
  },
});
