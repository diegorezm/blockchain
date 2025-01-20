import {db} from "./index";
import {sql} from "drizzle-orm";

async function main() {
  await db.transaction(async (t) => {
    await t.execute(sql.raw(`DROP SCHEMA IF EXISTS "drizzle" CASCADE;`));
    await t.execute(sql.raw(`DROP SCHEMA public CASCADE;`));
    await t.execute(sql.raw(`CREATE SCHEMA public;`));
    await t.execute(sql.raw(`GRANT ALL ON SCHEMA public TO postgres;`));
    await t.execute(sql.raw(`GRANT ALL ON SCHEMA public TO public;`));
    await t.execute(
      sql.raw(`COMMENT ON SCHEMA public IS 'standard public schema';`)
    );
  })
}

main();
