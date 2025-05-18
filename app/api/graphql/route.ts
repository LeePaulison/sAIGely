// app/api/graphql/route.ts
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { typeDefs } from '@/app/api/graphql/typeDefs';
import { resolvers } from '@/app/api/graphql/index';

export interface GraphQLContext {
  session: {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  } | null;
}

type SessionToken = {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

const server = new ApolloServer<GraphQLContext>({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest) => {
    const token = (await getToken({ req, secret: process.env.NEXTAUTH_SECRET })) as SessionToken | null;

    return token?.id
      ? {
          session: {
            user: {
              id: token.id,
              name: token.name,
              email: token.email,
              image: token.image,
            },
          },
        }
      : { session: null };
  },
});

export { handler as GET, handler as POST };
