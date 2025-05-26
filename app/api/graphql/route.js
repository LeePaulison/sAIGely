import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import path from 'path';

import { getSubFromAuthHeader } from '@/lib/auth';

import { print } from 'graphql';

const rawTypeDefs = loadFilesSync(path.join(process.cwd(), 'graphql/schemas'));
const typeDefs = mergeTypeDefs(rawTypeDefs);

// Log the merged typeDefs for debugging
console.log('[GraphQL] Merged TypeDefs:', print(typeDefs));

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
    const authHeader = req.headers.get('authorization') || '';
    const sub = getSubFromAuthHeader(authHeader);

    console.log('[GraphQL] Auth context:', { sub });

    if (!sub) {
      return { user: null };
    }

    return {
      user: { sub },
    };
  },
};

const handler = startServerAndCreateNextHandler(server, authObject);

export { handler as GET, handler as POST };
