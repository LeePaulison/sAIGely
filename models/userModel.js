import db from '../lib/db.js';
import { getUserByNextAuthUserId } from './getUser.js'; // make sure this exists

export async function createUser({
  next_auth_user_id,
  name,
  email,
  email_verified,
  image,
  oauth_provider,
  tier,
  is_active,
}) {
  const existing = await getUserByNextAuthUserId(next_auth_user_id);
  if (existing) return existing;

  const result = await db.saigely.query(
    `
    INSERT INTO saigely.users
      (next_auth_user_id, name, email, email_verified, image, oauth_provider, tier, is_active)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT (next_auth_user_id)
    DO UPDATE SET
      name = EXCLUDED.name,
      email = EXCLUDED.email,
      email_verified = EXCLUDED.email_verified,
      image = EXCLUDED.image,
      oauth_provider = EXCLUDED.oauth_provider,
      tier = EXCLUDED.tier,
      is_active = EXCLUDED.is_active,
      updated_at = now()
    RETURNING
      id,
      next_auth_user_id AS "nextauthUserId",
      name,
      email,
      email_verified AS "emailVerified",
      image,
      oauth_provider AS "oauthProvider",
      tier,
      is_active AS "isActive",
      created_at AS "createdAt",
      updated_at AS "updatedAt";
    `,
    [next_auth_user_id, name, email, email_verified, image, oauth_provider, tier, is_active]
  );

  return result.rows[0];
}
