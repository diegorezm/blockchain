import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  DB_URL: z.string(),

  SALT: z.string(),
  SECRET_KEY: z.string(),

  AWS_ACCESS_KEY: z.string(),
  AWS_SECRET_KEY: z.string(),
  S3_BUCKET_NAME: z.string(),
  S3_BUCKET_REGION: z.string()
})

const env = envSchema.parse(process.env)

export default env;
