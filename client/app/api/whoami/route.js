import { auth } from '@/lib/auth/betterAuth';

export async function GET(request) {
  const session = await auth.api.getSession(request);
  return Response.json({ user: session?.user || null });
}
