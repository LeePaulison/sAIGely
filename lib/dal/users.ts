import { query } from '../db';

export async function getUserByGithubId(githubId: string) {
  const result = await query(`SELECT * FROM users WHERE github_id = $1`, [githubId]);
  return result.rows[0] ?? null;
}

export async function createUser({
  githubId,
  name,
  email,
  image,
  preferencesId,
}: {
  githubId: string;
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
  preferencesId: number;
}) {
  await query(
    `INSERT INTO users (github_id, name, email, image, preferences_id)
     VALUES ($1, $2, $3, $4, $5)`,
    [githubId, name, email, image, preferencesId]
  );
}
