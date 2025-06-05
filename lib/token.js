import jwt from 'jsonwebtoken';

export function getSubFromAuthHeader(authHeader) {
  const JWT_SECRET = process.env.NEXTAUTH_SECRET;
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
