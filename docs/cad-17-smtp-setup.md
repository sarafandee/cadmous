# CAD-17 — WP Mail SMTP via Microsoft 365

This is the runbook the school IT team follows once to wire up
transactional email for the Cadmous WordPress install. It happens
exactly one time per environment (local / staging / prod).

The code side of the integration is already in place:

- [docker-compose.yml](../docker-compose.yml) passes `WPMS_*` and `M365_*`
  env vars through to the container.
- Those env vars are read inside `WORDPRESS_CONFIG_EXTRA` and baked into
  `wp-config.php` at boot as PHP constants. WP Mail SMTP picks them up
  automatically — credentials never touch the database.
- [.env.example](../.env.example) lists every variable with sane defaults.

**Until WPMS_ON=true and the M365_* variables are filled in, WordPress
falls back to PHP's default `mail()` function** (which in a Docker
container just drops to MailHog or silently fails). The site still boots
and runs fine; only form notifications will bounce.

## Prerequisites

- The school already uses Microsoft 365 for `cadmous.edu.lb` (confirmed
  via MX record `cadmous-edu-lb.mail.protection.outlook.com`).
- An Azure AD Global Admin for the tenant.
- 10 minutes and a browser.

## One-time Azure AD app registration

1. Go to https://portal.azure.com/ → **Microsoft Entra ID** →
   **App registrations** → **New registration**.
2. Name: `Cadmous WordPress SMTP`.
3. Supported account types: **Accounts in this organizational directory
   only (single tenant)**.
4. Redirect URI: Platform **Web**, URI
   `https://cadmous.edu.lb/wp-admin/admin.php?page=wp-mail-smtp&tab=auth`
   (use `http://localhost:8080/...` for a local test first, then add the
   prod URI as a second redirect).
5. Click **Register**.
6. On the Overview page, copy:
   - **Application (client) ID** → `M365_CLIENT_ID`
   - **Directory (tenant) ID** → `M365_TENANT_ID`
7. Left sidebar → **Certificates & secrets** → **New client secret**.
   - Description: `Cadmous WP SMTP`
   - Expires: 24 months (set a calendar reminder to rotate)
   - Click **Add**, copy the **Value** (NOT the Secret ID) →
     `M365_CLIENT_SECRET`. This is the only time it's visible.
8. Left sidebar → **API permissions** → **Add a permission** →
   **Microsoft Graph** → **Delegated permissions** → search for
   **Mail.Send** → check it → **Add permissions**.
9. Click **Grant admin consent for \<tenant name\>** and confirm.

## Put the creds in .env

Edit the `.env` at the repo root (NOT `.env.example`):

```env
WPMS_ON=true
WPMS_MAIL_FROM=noreply@cadmous.edu.lb
WPMS_MAIL_FROM_NAME=Cadmous College
WPMS_MAILER=outlook

M365_TENANT_ID=<from step 6>
M365_CLIENT_ID=<from step 6>
M365_CLIENT_SECRET=<from step 7>
```

## Reboot the stack and authorize

```bash
docker compose down
docker compose up -d
```

The env vars land in `wp-config.php` via `WORDPRESS_CONFIG_EXTRA`, so
`WP Mail SMTP` boots with the Outlook mailer pre-configured.

Then go to `http://localhost:8080/wp-admin/admin.php?page=wp-mail-smtp` →
click **Authorize plugin to send emails using your Microsoft account**.
A Microsoft consent page opens; sign in as an admin and click Accept.

This exchanges an OAuth refresh token that WP Mail SMTP stores
internally — no human interaction required after the first auth.

## Verify delivery

```bash
docker compose exec -u www-data wordpress wp mail send \
  admissions@cadmous.edu.lb "CAD-17 test" "It works."
```

Check `admissions@` inbox. Message headers should show:

```
Authentication-Results: spf=pass dkim=pass dmarc=pass
```

If SPF or DKIM are failing:

- **SPF**: ensure the `cadmous.edu.lb` TXT record includes
  `include:spf.protection.outlook.com`.
- **DKIM**: in the M365 admin center → Security → Threat Management →
  Policy → DKIM, enable DKIM for `cadmous.edu.lb`.

## Rotation

Client secrets expire every 24 months. When the calendar reminder fires:

1. Azure portal → App registrations → Cadmous WordPress SMTP →
   Certificates & secrets → **New client secret**.
2. Copy the new Value into `.env` as `M365_CLIENT_SECRET`.
3. Restart the stack: `docker compose down && docker compose up -d`.
4. Re-authorize in the WP Mail SMTP admin screen.
5. Delete the old secret from the Azure portal.

## Current status

**BLOCKED:** waiting on Azure AD app registration credentials from school
IT. The code path is ready; once the three `M365_*` values are pasted
into `.env`, this runbook is a 5-minute task.
