import {drizzle, NodePgDatabase} from "drizzle-orm/node-postgres";
import {Pool} from "pg";
import env from '@/env'
import * as schema from './schema'

let db: NodePgDatabase<typeof schema>

const pool = new Pool({
  connectionString: env.DB_URL
});

db = drizzle({
  client: pool,
});

export {db}
