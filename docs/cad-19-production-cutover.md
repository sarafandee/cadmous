# CAD-19 — Production cutover runbook

Moving `cadmous.edu.lb` from the legacy static-HTML server at
`164.92.82.33` to the new Dokploy WordPress install. **This is the
riskiest step in the entire project** — the site is live and serving
real families researching the school. Read this whole document before
touching anything, and follow it in order.

## Hard rule — autonomous execution is refused

Claude Code will not flip production DNS autonomously, even with bypass
permissions on. Every DNS / cutover step below must be executed by a
human (you, with school IT on standby). The prep work and rollback
tooling are ready; the trigger is manual.

## Prerequisites (all must be TRUE before T-48h)

- [ ] CAD-18 staging has been live and stable for ≥ 7 days
- [ ] All school staff have logged into staging admin and walked
      through editor flows (adding a news article, editing a page)
- [ ] Director and at least one head of department have approved the
      visual + content
- [ ] Lighthouse 95+ on performance, accessibility, best practices, SEO
      on staging
- [ ] `bin/archive-legacy-site.sh` has been run and produced
      `archive/cadmous.edu.lb.tar.gz` as the pre-cutover backup
- [ ] MX record snapshot saved separately — we are NOT touching mail,
      only the A/AAAA records, but record what the MX looks like today
      so we can double-check nothing changed afterwards
- [ ] Real DB + admin + ACF + M365 secrets live in Dokploy env (not in
      git)

## T-48h (two days before cutover)

1. Take a final staging snapshot in Dokploy (Compose → Backups → now).
2. Run `bin/archive-legacy-site.sh` from the repo root to capture the
   legacy HTML mirror. This is your offline fallback.
3. School IT lowers the DNS TTL on `cadmous.edu.lb` and
   `www.cadmous.edu.lb` A records to **300 seconds** (5 minutes). Do
   NOT touch the MX or TXT records.
4. Verify the TTL change propagated:
   ```bash
   dig +noall +answer cadmous.edu.lb    A | awk '{print $2}'
   dig +noall +answer www.cadmous.edu.lb A | awk '{print $2}'
   ```
   Both should read `300`.

## T-0 (cutover start)

1. In Dokploy, on the `cadmous` compose service (the production target
   from CAD-18), attach the two domains via Dokploy → Domains:
   - `cadmous.edu.lb` with Let's Encrypt
   - `www.cadmous.edu.lb` with Let's Encrypt, redirect to the non-www
     canonical
2. Wait for both certs to provision (~30 s each).
3. School IT updates the A records (still at TTL 300) to point at the
   Dokploy-ali public IP:
   - `cadmous.edu.lb` A → `<dokploy-ip>`
   - `www.cadmous.edu.lb` A → `<dokploy-ip>`

## T+5 min — propagation check

Run from a laptop that is NOT on the school's LAN:

```bash
for r in 1.1.1.1 8.8.8.8 9.9.9.9; do
  dig @$r +short cadmous.edu.lb
done
```

All three should return `<dokploy-ip>`. If any still show
`164.92.82.33`, wait another minute and retry.

## T+10 min — smoke test

```bash
curl -I https://cadmous.edu.lb/
curl -I https://cadmous.edu.lb/directors-message/
curl -I https://cadmous.edu.lb/news/
curl -I https://cadmous.edu.lb/admissions-apply/
curl -I https://cadmous.edu.lb/programs/kindergarten/
```

Every response should be `HTTP/2 200`. In a browser, open each URL and
visually confirm the homepage hero, news strip, divisions grid, and
application form all render.

## T+15 min — legacy URL 301 check

The `inc/redirects.php` module (this PR) 301-redirects the known
legacy paths to their new homes. Verify:

```bash
curl -I https://cadmous.edu.lb/english_application
curl -I https://cadmous.edu.lb/director
curl -I https://cadmous.edu.lb/kindergarten
curl -I https://cadmous.edu.lb/requirements
```

Every response should be `HTTP/2 301` with a `location:` header
pointing at the new URL. Full map in
[../wp-content/themes/cadmous/inc/redirects.php](../wp-content/themes/cadmous/inc/redirects.php).

## T+30 min — log sweep

From Dokploy → Compose → Logs, search the nginx access log for `404`.
Anything legitimate (real legacy URLs we missed) goes into
`inc/redirects.php` as a new entry.

## T+1 h — form delivery sanity check

Open `https://cadmous.edu.lb/admissions-apply/` in a browser, submit a
fake application with your own email as the parent email. The email
should land in `admissions@cadmous.edu.lb` within 60 seconds (if CAD-17
M365 SMTP is already in place; otherwise it silently falls through to
PHP `mail()` and will NOT be delivered).

## T+24 h

- [ ] Raise DNS TTL back to `86400` (24 h) to resume normal caching.
- [ ] Announce the new site on the school's Facebook page.
- [ ] Tear down the legacy server at `164.92.82.33` only after
      confirming the new site is stable for a full business day.

## Rollback — if anything catches fire

Pre-condition: DNS TTL is still 300 seconds (from T-48h).

1. School IT reverts the A records to `164.92.82.33` (the legacy IP).
2. Within ~5 minutes global caches expire and traffic returns to the
   legacy site.
3. Leave `staging.cadmous.edu.lb` running for post-mortem.
4. File a new CAD-* issue describing the failure mode and what needs
   to change before a retry.

## URL preservation — what I already covered

`inc/redirects.php` 301-redirects every legacy URL I could identify
from the recon files in `/tmp/cadmous-*.txt`. The full map:

| Legacy path | New path |
|---|---|
| `/english_application/` | `/admissions-apply/` |
| `/french_application/` | `/fr/fr-admissions-apply/` |
| `/arabic_application/` | `/ar/ar-admissions-apply/` |
| `/director/` | `/directors-message/` |
| `/kindergarten/` | `/programs/kindergarten/` |
| `/elementary/` | `/programs/elementary/` |
| `/intermediate/` | `/programs/intermediate/` |
| `/integrative_program/` | `/programs/integrative-program/` |
| `/secondary_lebanese/` | `/programs/secondary-lebanese/` |
| `/international_programs/` | `/programs/international-programs/` |
| `/requirements/` | `/admissions-requirements/` |
| `/mission/` | `/vision-mission/` |

If the T+30 log sweep turns up 404s for other URLs, extend the map,
commit, redeploy via Dokploy.

## Current status

- [x] 301 redirect table in `inc/redirects.php`
- [x] Archive script `bin/archive-legacy-site.sh`
- [x] Runbook (this file)
- [ ] Pre-cutover checklist complete (blocks on CAD-18 staging being
      live for 7+ days + stakeholder approval)
- [ ] Actual DNS flip (manual, school IT + stakeholder GO)
