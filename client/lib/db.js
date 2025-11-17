import { MongoClient } from 'mongodb';
import { Pool } from 'pg';

const mongoUri = process.env.MONGO_DATABASE_URL;
if (!mongoUri) {
  throw new Error('MONGO_DATABASE_URL is not defined in environment variables');
}

const pgUri = process.env.NEON_DATABASE_URL;
if (!pgUri) {
  throw new Error('NEON_DATABASE_URL is not defined in environment variables');
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(mongoUri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(mongoUri);
  clientPromise = client.connect();
}

export async function getMongoDB() {
  const client = await clientPromise;
  return client.db('ai');
}

let pgPool;
const pool = new Pool({
  connectionString: pgUri,
  ssl: { rejectUnauthorized: false },
});

if (process.env.NODE_ENV === 'development') {
  if (!global._pgPool) {
    global._pgPool = pool;
  }
  pgPool = global._pgPool;
} else {
  pgPool = pool;
}

export async function getPostgresDB() {
  const client = await pgPool.connect();
  return client;
}

export const queryPostgres = async (text, params) => {
  try {
    const res = await pgPool.query(text, params);
    return res;
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
};
