#!/bin/sh
set -e

# Apply pending DB migrations against the mounted /app/data/cadmous.db volume.
node /app/scripts/migrate.mjs

# Hand off to the Next.js standalone server.
exec node /app/server.js
