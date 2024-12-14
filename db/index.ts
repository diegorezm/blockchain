import {drizzle} from 'drizzle-orm/node-postgres';

const DB_URL = process.env.DB_URL;

if (!DB_URL) {
  throw new Error('DATABASE_URL is not set');
}

export const db = drizzle(DB_URL);
