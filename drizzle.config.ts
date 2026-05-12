import { defineConfig } from 'drizzle-kit'

const dbUrl = process.env.DATABASE_URL ?? 'file:./data/cadmous.db'

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: dbUrl,
  },
  strict: true,
  verbose: true,
})
