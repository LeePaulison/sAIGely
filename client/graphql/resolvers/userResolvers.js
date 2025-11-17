export const userResolvers = {
  Query: {
    authUser: async (_, __, { queryPostgres, session }) => {
      console.log('Session in authUser resolver:', session);

      if (!session || !session.user) {
        throw new Error('Not authenticated');
      }

      const result = await queryPostgres('SELECT id, name, email, image FROM users WHERE id = $1', [session.user.id]);
      console.log('DB result:', result.rows ?? result);
      return result.rows?.[0];
    },
  },
};
