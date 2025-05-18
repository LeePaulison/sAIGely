import * as userDAL from '@/lib/dal/users';
import * as prefDAL from '@/lib/dal/preferences';

import { CreateUserInput } from '@/lib/types/user';

export async function createUserWithDefaults(input: CreateUserInput) {
  const preferencesId = await prefDAL.createDefaultPreferences();

  await userDAL.createUser({ ...input, preferencesId });

  const user = await userDAL.getUserByGithubId(input.githubId);
  const preferences = await prefDAL.getPreferencesById(preferencesId);

  return {
    ...user,
    preferences,
  };
}
