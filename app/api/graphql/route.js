import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import path from 'path';
import { fileURLToPath } from 'url';

import { getSubFromAuthHeader } from '@/lib/auth';

// degub
import { print } from 'graphql';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawTypeDefs = loadFilesSync(path.join(process.cwd(), 'graphql/schemas'));
const typeDefs = mergeTypeDefs(rawTypeDefs);

const rawResolvers = loadFilesSync(path.join(process.cwd(), 'graphql/resolvers'));
const resolvers = mergeResolvers(rawResolvers);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // Enable introspection for development
  playground: true, // Enable GraphQL Playground for development
});

const authObject = {
  context: async (req) => {
    console.log('[GRAPHQL] Context creation started');
    console.log('[GRAPHQL] Headers:', req.headers);

    const authHeader = req.headers.get('authorization') || '';
    console.log('[GRAPHQL] Authorization header:', authHeader);
    const sub = getSubFromAuthHeader(authHeader);
    console.log('[GRAPHQL] Extracted sub:', sub);

    if (!sub) {
      console.warn('[GRAPHQL] No sub found');
      return { user: null };
    }

    console.log('[GRAPHQL] Authenticated user sub:', sub);
    return {
      user: { sub },
    };
  },
};

console.log('[GraphQL] I am logging from the GraphQL route file');

console.log('[GRAPHQL] Integration:', startServerAndCreateNextHandler.name);

const handler = startServerAndCreateNextHandler(server, authObject);

export { handler as GET, handler as POST };
