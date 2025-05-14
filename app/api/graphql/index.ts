import { GraphQLJSON } from 'graphql-type-json';
import * as userDAL from '@/lib/dal/users';
import * as prefDAL from '@/lib/dal/preferences';

export const resolvers = {
  JSON: GraphQLJSON,

  Query: {
    user: async (_: unknown, { github_id }: { github_id: string }) => {
      const user = await userDAL.getUserByGithubId(github_id);
      if (!user) return null;
      const preferences = user.preferences_id ? await prefDAL.getPreferencesById(user.preferences_id) : null;
      return { ...user, preferences };
    },
    preferences: (_: unknown, { id }: { id: number }) => {
      return prefDAL.getPreferencesById(id);
    },
  },

  Mutation: {
    createUser: async (
      _: unknown,
      {
        github_id,
        name,
        email,
        image,
      }: {
        github_id: string;
        name?: string;
        email?: string;
        image?: string;
      }
    ) => {
      const preferencesId = await prefDAL.createDefaultPreferences();
      await userDAL.createUser({
        githubId: github_id,
        name,
        email,
        image,
        preferencesId,
      });
      const user = await userDAL.getUserByGithubId(github_id);
      const preferences = await prefDAL.getPreferencesById(preferencesId);
      return { ...user, preferences };
    },
  },
};
