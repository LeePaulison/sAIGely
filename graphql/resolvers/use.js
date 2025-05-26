export default {
  Query: {
    me: async (_, __, context) => {
      if (!context?.user?.sub) {
        console.warn('[GraphQL] No sub found');
        return null;
      }

      const { sub } = context.user;
      if (!sub) return null;

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
};
