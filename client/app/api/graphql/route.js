// app/api/graphql/route.js
import { createYoga } from 'graphql-yoga';
import { schema } from '@/graphql/schema.js';
import { auth } from '@/lib/auth/auth.js'; // ✅ use this instead
import { getMongoDB, queryPostgres } from '@/lib/db.js';

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  context: async ({ initialContext }) => ({
    getMongoDB,
    queryPostgres,
    session: initialContext?.session,
  }),
  cors: {
    origin: 'http://localhost:3000',
    credentials: true, // ✅ allow cookies to flow
  },
  fetchAPI: { Response },
});

export async function POST(request) {
  const session = await auth(); // ✅ Get session without passing request
  return yoga.handleRequest(request, { initialContext: { session } });
}

export async function GET(request) {
  const session = await auth(); // ✅ Get session without passing request
  return yoga.handleRequest(request, { initialContext: { session } });
}

export async function OPTIONS(request) {
  return yoga.handleRequest(request);
}
