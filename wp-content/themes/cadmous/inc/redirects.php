<?php
/**
 * Legacy URL → new URL 301 redirects.
 *
 * The live cadmous.edu.lb static HTML site uses a URL structure that
 * mostly matches the new WordPress permalink structure, but a few paths
 * (application forms, department pages) moved. This file 301-redirects
 * every known legacy URL to its new home so SEO and inbound links stay
 * intact during the production cutover (CAD-19).
 *
 * Redirects run on template_redirect and exit immediately on match,
 * so the overhead is O(1) hash lookup per request.
 *
 * @package Cadmous
 */

defined( 'ABSPATH' ) || exit;

/**
 * Return the legacy → new URL map.
 *
 * Key is the normalized legacy path (no leading slash, no trailing
 * slash, no query string). Value is the new absolute URL or path.
 *
 * @return array<string,string>
 */
function cadmous_legacy_redirect_map() {
	return array(
		// Application forms — new Fluent Forms pages (CAD-12).
		'english_application'    => '/admissions-apply/',
		'french_application'     => '/fr/fr-admissions-apply/',
		'arabic_application'     => '/ar/ar-admissions-apply/',

		// Director's message — new page slug.
		'director'               => '/directors-message/',

		// Divisions — new CPT archive structure.
		'kindergarten'           => '/programs/kindergarten/',
		'elementary'             => '/programs/elementary/',
		'intermediate'           => '/programs/intermediate/',
		'integrative_program'    => '/programs/integrative-program/',
		'secondary_lebanese'     => '/programs/secondary-lebanese/',
		'international_programs' => '/programs/international-programs/',

		// Admissions.
		'requirements'           => '/admissions-requirements/',

		// About.
		'mission'                => '/vision-mission/',

		// News archive base — live site has /news, new site has /news/.
		'news'                   => '/news/',
	);
}

/**
 * Catch legacy URLs and 301 redirect to the new home.
 *
 * @since 0.1.0
 *
 * @return void
 */
function cadmous_handle_legacy_redirects() {
	if ( is_admin() || wp_doing_ajax() ) {
		return;
	}

	$request_uri = isset( $_SERVER['REQUEST_URI'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ) : '';
	$path        = trim( (string) wp_parse_url( $request_uri, PHP_URL_PATH ), '/' );

	if ( '' === $path ) {
		return;
	}

	$map = cadmous_legacy_redirect_map();
	if ( isset( $map[ $path ] ) ) {
		wp_safe_redirect( $map[ $path ], 301 );
		exit;
	}
}
add_action( 'template_redirect', 'cadmous_handle_legacy_redirects', 1 );
