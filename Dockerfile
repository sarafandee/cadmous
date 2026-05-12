FROM node:22.17.0-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate && pnpm i --frozen-lockfile

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN corepack enable && corepack prepare pnpm@10.33.0 --activate && pnpm run build

# Bundle the admin-seed script into a single self-contained .mjs so the
# runtime image doesn't need src/, tsx, or better-auth's node_modules.
RUN node_modules/.bin/esbuild scripts/seed-admin.ts \
  --bundle --platform=node --target=node22 --format=esm \
  --tsconfig=tsconfig.json \
  --external:better-sqlite3 \
  --banner:js='import {createRequire} from "module"; const require=createRequire(import.meta.url);' \
  --outfile=.next/seed-admin.mjs

# Production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Migration runner + SQL files (applied on every container start).
# Next.js's standalone bundle excludes drizzle-orm (only used by the
# migrate script, never by server.js). Pull the deps the script needs
# directly from the deps stage so the entrypoint can import them.
COPY --from=builder --chown=nextjs:nodejs /app/scripts/migrate.mjs ./scripts/migrate.mjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/seed-admin.mjs ./scripts/seed-admin.mjs
COPY --from=builder --chown=nextjs:nodejs /app/drizzle ./drizzle
COPY --from=deps --chown=nextjs:nodejs /app/node_modules/drizzle-orm ./node_modules/drizzle-orm
COPY --chown=nextjs:nodejs docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

# Persistent SQLite + uploads volume mount point.
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data
VOLUME ["/app/data"]

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["./docker-entrypoint.sh"]
