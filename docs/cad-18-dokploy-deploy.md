# CAD-18 — Dokploy staging deployment

Runbook for standing up `staging.cadmous.edu.lb` on the Dokploy-ali
instance. Partially blocked — see **Prerequisites** below.

## Current Dokploy state

There is already a `Cadmous` project in the Dokploy-ali instance
(`projectId: rLV31WEaHUV6sffUUrv2n`, created 2026-04-07). It contains a
`production` environment with one compose service named `wordpress`
(`composeId: 26vR03dBj2Drknl3iocz1`, status `done`, **0 domains
attached**).

This compose service is from the prior Payload CMS attempt and does not
reflect the current repo. Before going live, **decide**:

1. **Replace it in place**: re-point the existing compose service at
   this git repo + branch, wipe its volumes, redeploy. Keeps the
   project ID stable.
2. **Create a new compose service** next to it (e.g. `wordpress-v2`) and
   remove the old one after cutover.

The rest of this runbook assumes **option 1**.

## Prerequisites

Before running this runbook you need **all** of:

- [ ] Dokploy-ali admin access (you have it — `dokploy-ali` MCP is
      already wired in [.mcp.json](../.mcp.json))
- [ ] Repo is pushed to `main` with all CAD-* PRs merged (this is the
      case as of CAD-10 shipping)
- [ ] Decision on whether to wipe the existing `wordpress` compose
      service volumes (legacy Payload data vs. fresh start)
- [ ] **School IT has added a DNS A record** for
      `staging.cadmous.edu.lb` pointing at the Dokploy-ali public IP
- [ ] (Optional) ACF Pro license key for full editor experience
- [ ] (Optional) M365 Azure AD app credentials per
      [cad-17-smtp-setup.md](./cad-17-smtp-setup.md)

The site still boots and serves content without ACF Pro and M365 —
those just leave certain sub-features (custom-field-driven blocks,
outbound form notifications) inactive.

## Deployment flow

1. **Git URL** — point the compose service at
   `https://github.com/sarafandee/cadmous`, branch `main`, compose file
   `docker-compose.yml`.
2. **Environment variables** — copy the variables from
   [../.env.example](../.env.example) into the Dokploy compose service's
   Environment tab, filling in real secrets for `DB_PASSWORD`,
   `DB_ROOT_PASSWORD`, `WP_ADMIN_*`, `ACF_LICENSE_KEY`, `M365_*`,
   `WP_SITE_URL=https://staging.cadmous.edu.lb`.
3. **Domain** — in Dokploy → Compose service → Domains, add
   `staging.cadmous.edu.lb` with Let's Encrypt enabled.
4. **Bind mount warning** — the current
   [../docker-compose.yml](../docker-compose.yml) bind-mounts
   `wp-content/themes/cadmous`, `wp-content/plugins`,
   `wp-content/uploads` from the host. In Dokploy those host paths
   resolve to the clone of this repo, so bind-mounting the theme is
   fine but plugins/uploads must switch to named volumes in production
   so user content isn't overwritten on redeploy. See the
   `docker-compose.prod.yml` override in this repo once it ships.
5. **First deploy** — click Deploy. Wait for `wordpress` container
   healthy.
6. **Post-deploy hooks** — from the Dokploy terminal, run in order:
   ```bash
   bin/bootstrap.sh
   bin/setup-polylang.sh
   bin/setup-events.sh
   bin/setup-plugins.sh
   bin/setup-forms.sh
   docker compose exec -u www-data wordpress wp cadmous seed
   ```
7. **Verify**:
   - `https://staging.cadmous.edu.lb` → 200, shows Cadmous homepage
   - Valid Let's Encrypt cert
   - Admin login at `/wp-admin` works
   - `wp post-type list` shows `cadmous_news/staff/program`
   - `/news/`, `/staff/`, `/programs/`, `/events/` all return 200
   - Submitting the application form logs to WP Mail SMTP (delivery
     real once M365 creds are in)
8. **Backups** — Dokploy → MariaDB service → Schedules → daily at 03:00
   Beirut, retention 14 days. Since the current compose has MariaDB
   inside the compose stack, the daily backup must target the compose
   volume `db_data`. Long-term, split MariaDB out into a dedicated
   Dokploy MariaDB service for first-class backups.

## What I cannot do autonomously from here

- **Touch the legacy `wordpress` compose service**: destructive to
  pre-existing Payload data on that volume. Needs explicit user OK.
- **Add the DNS A record**: belongs to school IT.
- **Deploy to production `cadmous.edu.lb`**: see CAD-19.
- **Set real admin / DB / M365 secrets** in Dokploy env: secrets live
  outside this repo.

## Progress so far

- [x] Dokploy-ali MCP connected + verified
- [x] Existing `Cadmous` project located (reusable)
- [x] Runbook written
- [ ] Compose service re-pointed at this repo (BLOCKED on user OK)
- [ ] DNS A record for `staging.cadmous.edu.lb` (BLOCKED on school IT)
- [ ] First deploy + bootstrap run
- [ ] Backup schedule
