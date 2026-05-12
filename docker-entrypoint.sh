#!/bin/sh
set -e

# Apply pending DB migrations against the mounted /app/data/cadmous.db volume.
node /app/scripts/migrate.mjs

# Idempotently ensure an admin user exists. Skips silently if
# ADMIN_EMAIL/ADMIN_PASSWORD aren't set in the environment.
node /app/scripts/seed-admin.mjs || echo "[entrypoint] seed-admin exited non-zero; continuing"

# Hand off to the Next.js standalone server.
exec node /app/server.js
