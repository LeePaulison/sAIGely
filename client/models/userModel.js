// /models/userModel.js
import { queryPostgres } from '@/lib/db.js';

// 🔹 Fetch user by internal ID
export async function getUserById(next_auth_user_id) {
  const { rows } = await queryPostgres('SELECT * FROM saigely.users WHERE next_auth_user_id = $1', [next_auth_user_id]);
  return rows[0] || null;
}

// 🔹 Fetch user by email
export async function getUserByEmail(email) {
  const { rows } = await queryPostgres('SELECT * FROM saigely.users WHERE email = $1', [email]);
  return rows[0] || null;
}

// 🔹 Create or update user (upsert)
export async function upsertUser(userData) {
  const {
    next_auth_user_id,
    name,
    email,
    email_verified,
    image,
    oauth_provider,
    tier = 'FREE',
    is_active = true,
  } = userData;

  const { rows } = await queryPostgres(
    `
    INSERT INTO saigely.users (
      next_auth_user_id,
      name,
      email,
      email_verified,
      image,
      oauth_provider,
      tier,
      is_active
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    ON CONFLICT (email)
    DO UPDATE SET
      name = EXCLUDED.name,
      email_verified = EXCLUDED.email_verified,
      image = EXCLUDED.image,
      oauth_provider = EXCLUDED.oauth_provider,
      tier = EXCLUDED.tier,
      is_active = EXCLUDED.is_active,
      updated_at = now()
    RETURNING *;
    `,
    [next_auth_user_id, name, email, email_verified, image, oauth_provider, tier, is_active]
  );

  return rows[0];
}

// 🔹 Update user’s last login timestamp
export async function updateLastLogin(userId) {
  const { rows } = await queryPostgres(
    `
    UPDATE saigely.users
    SET last_login_at = now(),
        updated_at = now()
    WHERE id = $1
    RETURNING *;
    `,
    [userId]
  );
  return rows[0];
}
