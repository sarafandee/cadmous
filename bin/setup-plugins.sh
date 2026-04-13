#!/usr/bin/env bash
#
# bin/setup-plugins.sh — configure Rank Math SEO, LiteSpeed Cache, and
# Wordfence Free. All settings are written via wp option update / wp eval
# so the script is idempotent and reproducible on fresh installs.
#
# Run after bin/bootstrap.sh (which installs + activates the plugins).

set -euo pipefail
cd "$(dirname "$0")/.."

WP="docker compose exec -u www-data wordpress wp"

# ---- Rank Math SEO ---------------------------------------------------------

if $WP plugin is-active seo-by-rank-math 2>/dev/null; then
	echo "[seo] configuring Rank Math…"

	# General SEO settings: organization type, schema defaults.
	$WP eval '
		$general = get_option( "rank-math-options-general", array() );
		$general = is_array( $general ) ? $general : array();
		$general["setup_mode"]              = "advanced";
		$general["usage_tracking"]          = "off";
		$general["frontend_seo_score"]      = "off";
		$general["breadcrumbs"]             = "on";
		$general["breadcrumbs_separator"]   = "›";
		$general["breadcrumbs_home_label"]  = "Home";
		$general["remove_category_base"]    = "off";
		update_option( "rank-math-options-general", $general );

		// Titles & Meta — EducationalOrganization schema for the site.
		$titles = get_option( "rank-math-options-titles", array() );
		$titles = is_array( $titles ) ? $titles : array();
		$titles["knowledgegraph_type"]          = "company";
		$titles["knowledgegraph_name"]          = "Cadmous College";
		$titles["company_name"]                 = "Cadmous College";
		$titles["organization_name"]            = "Cadmous College";
		$titles["company_logo"]                 = get_stylesheet_directory_uri() . "/assets/images/logo.png";
		$titles["local_business_type"]          = "EducationalOrganization";
		$titles["local_address"]                = array(
			"streetAddress"   => "Jwar al Nakhel",
			"addressLocality" => "Tyre",
			"addressRegion"   => "South Lebanon",
			"postalCode"      => "",
			"addressCountry"  => "LB",
		);
		$titles["phone_numbers"]                = array(
			array( "type" => "customer support", "number" => "+961 7 349 038" ),
		);
		$titles["social_url_facebook"]          = "https://www.facebook.com/CadmousCollegeTyre/";

		// News article schema
		$titles["pt_cadmous_news_default_rich_snippet"] = "article";
		$titles["pt_cadmous_news_default_article_type"] = "NewsArticle";
		$titles["pt_cadmous_news_default_snippet_name"] = "%title%";

		// Staff schema
		$titles["pt_cadmous_staff_default_rich_snippet"] = "person";

		// Turn OFF modules we do not need for v1
		update_option( "rank-math-options-titles", $titles );

		// Modules: disable 404 monitor + redirections (DB heavy + unused)
		$modules = (array) get_option( "rank_math_modules", array() );
		$disabled = array( "404-monitor", "redirections", "local-seo" );
		foreach ( $disabled as $m ) {
			$modules[ $m ] = "off";
		}
		// Enable: seo-analysis, sitemap, rich-snippet
		foreach ( array( "sitemap", "rich-snippet", "seo-analysis" ) as $m ) {
			$modules[ $m ] = "on";
		}
		update_option( "rank_math_modules", $modules );

		WP_CLI::log( "rank math configured" );
	'

	# Mark the Rank Math setup wizard as complete so it stops nagging.
	$WP option update rank_math_is_configured 1
else
	echo "[seo] Rank Math not active — skipping."
fi

# ---- LiteSpeed Cache -------------------------------------------------------

if $WP plugin is-active litespeed-cache 2>/dev/null; then
	echo "[cache] configuring LiteSpeed Cache…"

	# LiteSpeed stores settings in litespeed.conf (new) or under individual
	# option rows with the 'litespeed.conf.' prefix. Use litespeed_conf()
	# helper via wp eval if available, otherwise fall back to option_update.
	$WP eval '
		$settings = array(
			"cache"                  => 1,
			"cache-priv"             => 1,
			"cache-commenter"        => 1,
			"cache-rest"             => 0, // do not cache REST API
			"cache-browser"          => 1,
			"cache-browser_ttl"      => 31557600,
			"cache-ttl_pub"          => 604800,
			"cache-ttl_priv"         => 1800,
			"cache-ttl_frontpage"    => 604800,
			"cache-login"            => 0,
			"css_min"                => 1,
			"js_min"                 => 1,
			"html_min"               => 1,
			"media-lazy"             => 1,
			"media-lazyjs_inline"    => 1,
			"img_optm-auto"          => 1,
			"img_optm-webp"          => 1,
			"optm-qs_rm"             => 0,
			"optm-ggfonts_rm"        => 1,
			"object"                 => 0,
			"cdn"                    => 0,
		);
		foreach ( $settings as $key => $value ) {
			update_option( "litespeed.conf." . $key, $value );
		}

		// Exclude wp-admin and wp-json from cache.
		update_option( "litespeed.conf.cache-exc", "/wp-admin/\n/wp-json/\n/sitemap_index.xml\n/sitemap.xml" );
		WP_CLI::log( "litespeed cache configured" );
	'
else
	echo "[cache] LiteSpeed Cache not active — skipping."
fi

# ---- Wordfence Free --------------------------------------------------------

if $WP plugin is-active wordfence 2>/dev/null; then
	echo "[security] configuring Wordfence…"

	$WP eval '
		// Wordfence stores settings in wfConfig rows. The wfConfig class
		// is loaded when the plugin boots, so these call paths are safe.
		if ( class_exists( "wfConfig" ) ) {
			wfConfig::set( "alertOn_critical", 1 );
			wfConfig::set( "alertOn_warnings", 0 );
			wfConfig::set( "alertOn_severityLevel", 50 ); // critical only
			wfConfig::set( "alertOn_block", 0 );
			wfConfig::set( "alertOn_loginLockout", 1 );
			wfConfig::set( "alertOn_lostPasswdForm", 0 );

			// Login security
			wfConfig::set( "loginSecurityEnabled", 1 );
			wfConfig::set( "loginSec_maxFailures", 5 );
			wfConfig::set( "loginSec_lockoutMins", 30 );
			wfConfig::set( "loginSec_strongPasswds", "pubs" );
			wfConfig::set( "loginSec_disableAuthorScan", 1 );
			wfConfig::set( "loginSec_maskLoginErrors", 1 );

			// Hide WP version
			wfConfig::set( "other_hideWPVersion", 1 );

			// Firewall in "Learning Mode" for 1 week
			wfConfig::set( "firewallEnabled", 1 );
			wfConfig::set( "wafStatus", "learning-mode" );

			// Disable Live Traffic (DB heavy)
			wfConfig::set( "liveTrafficEnabled", 0 );

			WP_CLI::log( "wordfence configured" );
		} else {
			WP_CLI::warning( "wfConfig class not available yet — run this script after a first admin visit to the Wordfence dashboard" );
		}
	'
else
	echo "[security] Wordfence not active — skipping."
fi

echo "[plugins] setup complete."
