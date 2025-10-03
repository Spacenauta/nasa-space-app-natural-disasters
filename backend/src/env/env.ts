import z from "zod"

const port = 3333

const envSchema = z.object({
  PORT: z.coerce.number().default(port),
  DATABASE_URL: z.string().url().startsWith("postgresql://"),
  JWT_SECRET: z.string(),
  NASA_API_KEY: z.string(),
})

export const env = envSchema.parse(process.env)
