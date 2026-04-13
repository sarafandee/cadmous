#!/usr/bin/env bash
#
# bin/bootstrap.sh — one-shot Cadmous WordPress install bootstrap.
#
# Takes a docker-compose WordPress container from "just booted" to
# "lean 2026 stack installed, configured, and seeded". Idempotent: every
# step checks the current state before acting, so it's safe to re-run any
# time the stack feels drifted.
#
# Run from the repo root:
#
#   bin/bootstrap.sh
#
# Or with explicit admin creds (otherwise sensible dev defaults are used):
#
#   WP_ADMIN_USER=admin WP_ADMIN_PASS=my-secret \
#   WP_ADMIN_EMAIL=admin@example.com bin/bootstrap.sh
#
# For ACF Pro (paid plugin) set ACF_LICENSE_KEY to pull the authorized
# download URL. Without a license, ACF Pro is skipped and the rest of the
# stack still installs.
#
# Exits non-zero on any failed step so CI can fail loudly.

set -euo pipefail

cd "$(dirname "$0")/.."

WP="docker compose exec -u www-data wordpress wp"
WP_NO_USER="docker compose exec wordpress wp"

: "${WP_ADMIN_USER:=admin}"
: "${WP_ADMIN_PASS:=admin}"
: "${WP_ADMIN_EMAIL:=admin@cadmous.edu.lb}"
: "${WP_SITE_URL:=http://localhost:8080}"
: "${WP_SITE_TITLE:=Cadmous College}"
: "${WP_SITE_TAGLINE:=IB World School in Tyre, Lebanon}"
: "${ACF_LICENSE_KEY:=}"

say() { printf '\033[1;34m[bootstrap]\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m[bootstrap]\033[0m %s\n' "$*" >&2; }
die() { printf '\033[1;31m[bootstrap]\033[0m %s\n' "$*" >&2; exit 1; }

# ---- 0. wait for the WP container to be healthy ----------------------------

say "waiting for WordPress container to accept requests…"
for i in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15; do
	if curl -sf -o /dev/null "${WP_SITE_URL}/wp-login.php"; then
		say "WordPress is up"
		break
	fi
	sleep 1
	if [ "$i" = 15 ]; then
		die "WordPress did not respond within 15s — is 'docker compose up -d' running?"
	fi
done

# ---- 1. install wp-cli inside the container if missing ---------------------

if ! $WP_NO_USER --version >/dev/null 2>&1; then
	say "installing wp-cli inside the container…"
	docker compose exec wordpress bash -c '
		curl -sO https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar &&
		chmod +x wp-cli.phar &&
		mv wp-cli.phar /usr/local/bin/wp
	'
fi

# ---- 2. install wordpress core ---------------------------------------------

if $WP core is-installed 2>/dev/null; then
	say "WordPress core already installed — skipping"
else
	say "running wp core install…"
	$WP core install \
		--url="${WP_SITE_URL}" \
		--title="${WP_SITE_TITLE}" \
		--admin_user="${WP_ADMIN_USER}" \
		--admin_password="${WP_ADMIN_PASS}" \
		--admin_email="${WP_ADMIN_EMAIL}" \
		--skip-email
fi

# ---- 3. activate the cadmous theme -----------------------------------------

if [ "$($WP theme get cadmous --field=status 2>/dev/null)" != "active" ]; then
	say "activating the cadmous theme…"
	$WP theme activate cadmous
else
	say "cadmous theme already active — skipping"
fi

# ---- 4. install and activate the lean 2026 plugin stack --------------------

# Plugin slug => human name. Free plugins from wordpress.org.
PLUGINS=(
	"the-events-calendar:The Events Calendar"
	"fluentform:Fluent Forms"
	"polylang:Polylang"
	"seo-by-rank-math:Rank Math SEO"
	"wordfence:Wordfence Security"
	"litespeed-cache:LiteSpeed Cache"
	"wp-mail-smtp:WP Mail SMTP"
)

for entry in "${PLUGINS[@]}"; do
	slug="${entry%%:*}"
	name="${entry##*:}"
	if [ "$($WP plugin get "$slug" --field=status 2>/dev/null || echo missing)" = "active" ]; then
		say "$name already active"
	else
		say "installing + activating ${name}…"
		$WP plugin install "$slug" --activate --force
	fi
done

# ---- 5. ACF Pro (paid) — only if license key provided ----------------------

if [ -n "$ACF_LICENSE_KEY" ]; then
	if [ "$($WP plugin get advanced-custom-fields-pro --field=status 2>/dev/null || echo missing)" = "active" ]; then
		say "ACF Pro already active"
	else
		say "installing ACF Pro via license token…"
		$WP plugin install "https://connect.advancedcustomfields.com/v2/plugins/download?token=${ACF_LICENSE_KEY}" --activate --force
	fi
else
	warn "ACF_LICENSE_KEY not set — skipping ACF Pro. News/Staff/Program custom fields will not render until it's installed."
fi

# ---- 6. remove the default bundled plugins we never use --------------------

for default_plugin in akismet hello; do
	if $WP plugin is-installed "$default_plugin" 2>/dev/null; then
		say "removing default plugin: $default_plugin"
		$WP plugin uninstall "$default_plugin" --deactivate || true
	fi
done

# ---- 7. site options --------------------------------------------------------

say "setting site options…"
$WP option update blogname "${WP_SITE_TITLE}"
$WP option update blogdescription "${WP_SITE_TAGLINE}"
$WP option update timezone_string "Asia/Beirut"
$WP option update date_format "j F Y"
$WP option update time_format "H:i"
$WP option update start_of_week 1
$WP rewrite structure "/%postname%/" --hard
$WP rewrite flush --hard

# ---- 8. clear the WP_Theme pattern cache so new patterns show up -----------

say "clearing theme pattern cache…"
$WP eval '$theme=wp_get_theme(); if(method_exists($theme,"delete_pattern_cache")){$theme->delete_pattern_cache();}'

# ---- 9. run the cadmous seed command ---------------------------------------

if $WP cadmous --help >/dev/null 2>&1; then
	say "running wp cadmous seed…"
	$WP cadmous seed
else
	warn "wp cadmous seed command not registered yet — CAD-10 will ship it. Site options + plugins are in place."
fi

# ---- 10. summary ------------------------------------------------------------

say "done."
echo
echo "  site:  ${WP_SITE_URL}"
echo "  admin: ${WP_SITE_URL}/wp-admin"
echo "  user:  ${WP_ADMIN_USER}"
echo "  pass:  ${WP_ADMIN_PASS}"
echo
