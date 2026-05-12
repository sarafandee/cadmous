#!/bin/sh
set -e

# Apply pending DB migrations against the mounted /app/data/cadmous.db volume.
node /app/scripts/migrate.mjs

# Idempotently ensure an admin user exists. Skips silently if
# ADMIN_EMAIL/ADMIN_PASSWORD aren't set in the environment.
node /app/scripts/seed-admin.mjs || echo "[entrypoint] seed-admin exited non-zero; continuing"

# Seed scraped news + events into the DB. The --if-stale flag compares
# the SEED_VERSION baked into the script against the stored value in
# site_settings (key `seed.news-events.version`) — seed only when the
# stored version is older. Lets us push translation updates by bumping
# SEED_VERSION; subsequent boots no-op once seeded.
node /app/scripts/seed-news-events.mjs --if-stale || echo "[entrypoint] seed-news-events exited non-zero; continuing"

# Same versioned-seed pattern for site_settings (contact info, social links).
# Bumping SEED_VERSION in scripts/seed-settings.ts triggers a re-upsert on
# the next deploy.
node /app/scripts/seed-settings.mjs --if-stale || echo "[entrypoint] seed-settings exited non-zero; continuing"

# Hand off to the Next.js standalone server.
exec node /app/server.js
