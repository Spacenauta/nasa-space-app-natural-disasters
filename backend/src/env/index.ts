import "dotenv/config"
import z from "zod"

const port = 3333

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(port),
  DATABASE_URL: z.string().url().startsWith("postgresql://"),
  JWT_SECRET: z.coerce.string(),
  NASA_API_KEY: z.coerce.string(),
  BASE_URL_EONET_EVENTS: z.string(),
  BASE_URL_EONET_CATEGORIES: z.string(),
  GEMINI_API_KEY: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  // biome-ignore lint/suspicious/noConsole: show exception
  console.log("❌ Invalid environment variables", _env.error.format())

  throw new Error("Invalid environment variables.")
}

export const env = _env.data
