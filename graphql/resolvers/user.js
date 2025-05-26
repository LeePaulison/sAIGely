import { createUserIfNotExists, getUserBySub } from '../../models/userModel.js';

const userResolvers = {
  Query: {
    me: async (_, __, context) => {
      if (!context?.user?.sub) {
        console.warn('[GraphQL] No sub found');
        return null;
      }

      const { sub } = context.user;
      if (!sub) return null;
      const user = await getUserBySub(sub);

      if (user) {
        console.log('[GraphQL] User found:', user);
        return user;
      }

      // PG lookup coming next
      return {
        id: 'demo-id',
        sub,
        name: 'From JWT',
        email: `${sub}@example.com`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    },
    hello: () => {
      console.log('[GraphQL] hello query called');
      return 'Hello, world!';
    },
  },
  Mutation: {
    createUserIfNotExists: async (_, { sub, name, email }, context) => {
      const authSub = context?.user?.sub;
      if (!authSub) {
        console.warn('[GraphQL] Unauthorized: missing JWT');
        throw new Error('Unauthorized');
      }

      if (authSub !== sub) {
        console.warn('[GraphQL] Attempted sub mismatch:', sub, authSub);
        throw new Error('Forbidden: sub mismatch');
      }

      return await createUserIfNotExists({ sub, name, email });
    },
  },
};

export default userResolvers;
