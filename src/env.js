import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DB_URL: z.string(),
  SALT: z.string().default("SALTING"),
});

export const env = envSchema.parse(process.env);
