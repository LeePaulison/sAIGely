import { query } from '../db';

export async function getUserByGithubId(githubId: string) {
  const result = await query(`SELECT * FROM users WHERE github_id = $1`, [githubId]);
  return result.rows[0] ?? null;
}
export interface CreateUserDBInput {
  githubId: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  preferencesId: number;
}

export async function createUser(input: CreateUserDBInput) {
  const { githubId, name, email, image, preferencesId } = input;
  await query(
    `INSERT INTO users (github_id, name, email, image, preferences_id)
     VALUES ($1, $2, $3, $4, $5)`,
    [githubId, name, email, image, preferencesId]
  );
}
