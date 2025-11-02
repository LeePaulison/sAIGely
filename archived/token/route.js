import { getToken } from 'next-auth/jwt';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  const payload = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!payload) {
    console.warn('[API] No payload found');
    return new Response('Unauthorized', { status: 401 });
  }

  const signed = jwt.sign(payload, process.env.NEXTAUTH_SECRET, {
    algorithm: 'HS256',
  });

  const parts = signed.split('.');

  if (parts.length !== 3) {
    return new Response('Invalid token', { status: 400 });
  }

  return Response.json({ token: signed });
}
