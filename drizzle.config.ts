import { defineConfig } from "drizzle-kit";
import { env } from "./src/env.js";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/server/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: env.DB_URL,
  },
});
