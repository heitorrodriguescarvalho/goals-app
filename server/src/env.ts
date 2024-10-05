import z from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  ORIGIN_URL: z.string(),
  PORT: z.coerce.number().optional()
})

export const env = envSchema.parse(process.env)
