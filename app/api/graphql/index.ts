import { GraphQLJSON } from 'graphql-type-json';
import * as userDAL from '@/lib/dal/users';
import * as prefDAL from '@/lib/dal/preferences';
import { GraphQLContext } from '@/app/api/graphql/route';
import { createUserWithDefaults } from '@/lib/services/userServices';

export const resolvers = {
  JSON: GraphQLJSON,

  Query: {
    user: async (_: unknown, { github_id }: { github_id: string }) => {
      const user = await userDAL.getUserByGithubId(github_id);
      if (!user) return null;
      const preferences = user.preferences_id ? await prefDAL.getPreferencesById(user.preferences_id) : null;
      return { ...user, preferences };
    },
    me: async (_: unknown, __: unknown, context: GraphQLContext) => {
      const userId = context.session?.user?.id;
      if (!userId) {
        return null;
      }
      const user = await userDAL.getUserByGithubId(userId);

      if (!user) return null;

      const preferences = user.preferences_id ? await prefDAL.getPreferencesById(user.preferences_id) : null;

      return {
        ...user,
        preferences,
      };
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
      return await createUserWithDefaults({
        githubId: github_id,
        name,
        email,
        image,
      });
    },
    updatePreferences: async (
      _: unknown,
      {
        id,
        theme,
        ai_settings,
        data_retention,
      }: {
        id: number;
        theme?: string;
        ai_settings?: string;
        data_retention?: string;
      }
    ) => {
      const preferences = await prefDAL.updatePreferences(id, {
        theme,
        ai_settings,
        data_retention,
      });
      return preferences;
    },
  },
};
