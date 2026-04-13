#!/usr/bin/env bash
#
# bin/setup-polylang.sh — configure Polylang for EN / FR / AR.
#
# Idempotent: creates English, Français, and العربية if they don't exist,
# then writes Polylang options for:
#   - URL modifications = directory name (/fr/, /ar/)
#   - Hide URL for default language (English)
#   - Force lang when empty (fallback to default)
#   - Translatable post types: cadmous_news, cadmous_staff, cadmous_program,
#     tribe_events (if The Events Calendar is active)
#
# Run after bin/bootstrap.sh has activated Polylang.

set -euo pipefail
cd "$(dirname "$0")/.."

WP="docker compose exec -u www-data wordpress wp"

if ! $WP plugin is-active polylang 2>/dev/null; then
	echo "[polylang] Polylang is not active. Run bin/bootstrap.sh first." >&2
	exit 1
fi

# Polylang free doesn't ship a wp-cli command, so create languages via the
# admin model directly. Idempotent: skips any language whose slug already
# exists.
$WP eval '
	if ( ! function_exists( "PLL" ) ) {
		WP_CLI::error( "Polylang not active." );
	}
	$model = PLL()->model;
	$langs = array(
		array( "slug" => "en", "name" => "English",   "locale" => "en_US", "rtl" => 0, "flag" => "us", "term_group" => 0 ),
		array( "slug" => "fr", "name" => "Français",  "locale" => "fr_FR", "rtl" => 0, "flag" => "fr", "term_group" => 1 ),
		array( "slug" => "ar", "name" => "العربية",    "locale" => "ar",    "rtl" => 1, "flag" => "lb", "term_group" => 2 ),
	);
	foreach ( $langs as $lang ) {
		if ( $model->get_language( $lang["slug"] ) ) {
			WP_CLI::log( "language exists: " . $lang["slug"] );
			continue;
		}
		$result = $model->add_language( $lang );
		if ( is_wp_error( $result ) ) {
			WP_CLI::warning( "failed to add " . $lang["slug"] . ": " . $result->get_error_message() );
		} else {
			WP_CLI::log( "added language: " . $lang["slug"] );
		}
	}
'

# Set Polylang settings via pll_options option.
$WP eval '
	$opts = get_option( "polylang", array() );
	$opts["default_lang"]    = "en";
	$opts["force_lang"]      = 1; // 1 = directory
	$opts["hide_default"]    = 1; // hide /en/ prefix for default language
	$opts["rewrite"]         = 1; // pretty permalinks on
	$opts["redirect_lang"]   = 1; // redirect mismatches
	$opts["browser"]         = 0; // no auto-detect
	$opts["media_support"]   = 0; // media language optional
	$opts["sync"]            = array();
	$cpts = array();
	foreach ( array( "cadmous_news", "cadmous_staff", "cadmous_program", "tribe_events" ) as $pt ) {
		if ( post_type_exists( $pt ) ) {
			$cpts[] = $pt;
		}
	}
	$opts["post_types"] = $cpts;
	$opts["taxonomies"] = array( "cadmous_news_category", "cadmous_staff_division", "tribe_events_cat" );
	update_option( "polylang", $opts );
	echo "polylang options set:\n";
	echo "  default_lang: " . $opts["default_lang"] . "\n";
	echo "  force_lang:   " . $opts["force_lang"] . "\n";
	echo "  post_types:   " . implode( ",", $opts["post_types"] ) . "\n";
'

# Re-flush rewrite rules so /fr/ and /ar/ prefixes resolve.
$WP rewrite flush --hard

echo "[polylang] setup complete."
