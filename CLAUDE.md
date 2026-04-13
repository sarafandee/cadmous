# Cadmous

WordPress site with a custom block theme. Local dev runs in Docker Compose. Work tracked in Linear under team `cadmous` (key `CAD`).

## Linear

All issues for this project live in Linear under team `cadmous` (key `CAD`), project `WordPress Relaunch`. The `linear-cadmous` MCP server is wired in [.mcp.json](.mcp.json). When you call `mcp__linear-cadmous__*` tools you do NOT need to look up team/project IDs — use the constants below.

**Workspace**: `sarafandee.linear.app`
**Team**: `cadmous` — `09b62d59-eeb7-42c3-8ff5-5da38e7e9b4b` — issue prefix `CAD`
**Project**: `WordPress Relaunch` — `6384a7d1-7eb6-4da1-baf9-cc029dfc9c37` — [open in Linear](https://linear.app/sarafandee/project/wordpress-relaunch-ae6f97b3df1b)

**Milestones**:

| Milestone | ID |
|-----------|-----|
| M1 — Foundation | `e44ebcde-de35-4de1-a36c-5e6bbfb7d541` |
| M2 — Content and Plugins | `a0561515-a679-4468-85f4-2fd61403489d` |
| M3 — Editor UX | `3793e0a8-9aa2-4256-98ac-5c7ab1151e2e` |
| M4 — Polish | `66c4cb32-4b1f-4732-a064-2ca65e4e2656` |
| M5 — Deploy | `a9a3655a-225c-4be8-a5b1-b4e7c9e400e7` |

**Labels** (team-scoped, use exactly one `area:*` per issue):

| Label | ID | Use for |
|-------|-----|---------|
| `area:infra` | `8cad3ffe-1093-4737-919c-109a3df7af0b` | Docker, CI, deploy tooling, build scripts |
| `area:theme` | `c5ffc3fe-bacf-4204-8d46-31285e808afc` | FSE templates, theme.json, patterns, parts |
| `area:content` | `6e53a0eb-90b3-40ec-8a40-9588bdd5ffe8` | Seed scripts, copy, media |
| `area:plugins` | `dd12c6f9-164e-44a3-b7c7-9f09ac999a62` | Plugin install + config |
| `area:i18n` | `01f48aa1-0062-4f2b-8f53-93c8c33dcadc` | Polylang, RTL, EN/FR/AR |
| `area:editor-ux` | `4ab35abc-5231-4209-9c66-c83ab204cac2` | Block locks, admin branding, editor lockdown |
| `area:deploy` | `7d3058e6-a976-4293-8387-a19bce1bc9ce` | Dokploy, DNS, SSL, cutover |

**Issue conventions**:

- Title: imperative, ≤72 chars (e.g., "theme.json — translate DESIGN.md to design tokens")
- Description format: `## Why` → `## Tasks` (checklist) → `## Acceptance criteria` → `## Files` → optional `## Depends on`
- Always set `team`, `project`, `milestone`, exactly one `area:*` label, and `priority` (1=Urgent, 2=High, 3=Medium, 4=Low)
- Reference files in descriptions as relative markdown links: `[docker-compose.yml](docker-compose.yml)` — they render as clickable in Linear
- Branch names: use the `gitBranchName` field from `save_issue`/`get_issue` responses (Linear pre-formats them)
- Commit messages and PR titles: prefix with `CAD-N:` so Linear auto-links and moves the issue to "In Review" on PR open

**Workflow**: Say "implement CAD-N" and the [linear-implement](.claude/skills/linear-implement/SKILL.md) skill takes over — it fetches the issue, creates a branch, makes a plan, executes, and opens a PR.

**Reference plan**: `/Users/alisalem/.claude/plans/parsed-sparking-matsumoto.md` — the approved relaunch plan that all CAD-* issues derive from.

## Stack

- WordPress `latest` (official image)
- MariaDB 11
- PHP via the WordPress image (upload limits overridden by [php/uploads.ini](php/uploads.ini))
- Host port `8080` → container `80`
- Custom theme: [wp-content/themes/cadmous/](wp-content/themes/cadmous/) (bind-mounted)
- WordPress core + plugins live inside the `wordpress_data` named volume — **not** in the repo

Only the `themes/cadmous` directory is bind-mounted. Plugins, uploads, and core files are inside the Docker volume. Do not try to edit them from the host — use wp-cli inside the container.

## Running the site

```bash
docker compose up -d           # start
docker compose logs -f wordpress
docker compose down            # stop (volumes preserved)
docker compose down -v         # DESTROY db + wp files — ask the user first
```

Site: http://localhost:8080 · Admin: http://localhost:8080/wp-admin

## wp-cli

Always run wp-cli inside the container as the `www-data` user:

```bash
docker compose exec -u www-data wordpress wp <command>
```

Common examples:

```bash
docker compose exec -u www-data wordpress wp plugin list
docker compose exec -u www-data wordpress wp theme activate cadmous
docker compose exec -u www-data wordpress wp user list
docker compose exec -u www-data wordpress wp cache flush
docker compose exec -u www-data wordpress wp db query "SELECT option_name FROM wp_options LIMIT 5"
```

If `wp` isn't installed in the image, install it once:

```bash
docker compose exec wordpress bash -c 'curl -sO https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && chmod +x wp-cli.phar && mv wp-cli.phar /usr/local/bin/wp'
```

## Environment

Secrets live in `.env` (git-ignored). Template is [.env.example](.env.example). Never commit `.env` or hardcode DB credentials.

## Coding standards

Follow WordPress Coding Standards (WPCS) for PHP:

- `snake_case` for functions and variables, `PascalCase` for classes
- Prefix every global function, class, hook, and option with `cadmous_` / `Cadmous_`
- Text domain: `cadmous` (used in every `__()`, `_e()`, `esc_html__()`, etc.)
- Yoda conditions (`if ( 'foo' === $bar )`)
- Spaces inside parentheses: `function foo( $bar )`, `array( 1, 2 )`
- Use `array()` long syntax in theme code for WPCS compliance (short arrays OK inside block editor JS)
- One tab for indentation in PHP (not spaces)

## Security (non-negotiable)

These are the rules that cause real bugs and vulnerabilities when skipped. Enforce them on every PHP edit.

- **Escape on output, always.** `esc_html()`, `esc_attr()`, `esc_url()`, `esc_textarea()`, `wp_kses_post()` for rich HTML. Never echo raw user data or raw post meta.
- **Sanitize on input.** `sanitize_text_field()`, `sanitize_email()`, `absint()`, `wp_kses_post()`, `sanitize_key()` — match the sanitizer to the data shape.
- **Prepared statements only.** `$wpdb->prepare()` for every query with a variable. Never concatenate SQL.
- **Nonces on every form and AJAX action.** `wp_nonce_field()` + `check_admin_referer()` / `wp_verify_nonce()` / `check_ajax_referer()`.
- **Capability checks.** `current_user_can( 'edit_posts' )` (or tighter) before any privileged action — before the nonce check is fine, but both must exist.
- **File uploads** go through `wp_handle_upload()` with a MIME whitelist. Never trust `$_FILES['...']['type']`.
- **REST API routes** must define `permission_callback`. Returning `__return_true` without justification is a bug.

## Performance

- No queries inside `the_loop()` output (except the main query itself). Pre-compute, then render.
- Use `WP_Query` with `'no_found_rows' => true`, `'update_post_meta_cache' => false`, `'update_post_term_cache' => false` when you don't need pagination or meta/terms.
- Cache expensive reads with the object cache: `wp_cache_get()` / `wp_cache_set()` with a group key.
- Enqueue scripts and styles through `wp_enqueue_scripts` / `enqueue_block_assets`. Never hardcode `<script>` or `<link>` in template files.
- Version every enqueued asset with `filemtime()` so browsers drop the cache on deploy.

## Hook conventions

- Register hooks in a dedicated bootstrap file, not inside random template partials.
- Prefer `add_action` / `add_filter` over executing side-effects at file load.
- Remove hooks with the exact same priority and arg count you added them with.

## Debugging

Enable `WP_DEBUG` temporarily by setting these in `wp-config.php` via wp-cli:

```bash
docker compose exec -u www-data wordpress wp config set WP_DEBUG true --raw
docker compose exec -u www-data wordpress wp config set WP_DEBUG_LOG true --raw
docker compose exec -u www-data wordpress wp config set WP_DEBUG_DISPLAY false --raw
```

Tail the log:

```bash
docker compose exec wordpress tail -f /var/www/html/wp-content/debug.log
```

Turn debug back off before committing anything that touches `wp-config.php`.

## Git

- Branch off `main`, open a PR via `gh pr create`
- Do not commit: `.env`, `wordpress_data/`, `db_data/`, `debug.log`, `wp-content/uploads/`, `wp-content/plugins/` (plugins live in the volume, not the repo)
- Only [wp-content/themes/cadmous/](wp-content/themes/cadmous/) and infra files (`docker-compose.yml`, `php/`, `.env.example`) belong in git
