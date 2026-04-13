<?php
/**
 * Multilingual (Polylang) integration.
 *
 * Makes the theme aware of right-to-left Arabic content and wires shared
 * theme strings into the Polylang string translation UI so editors can
 * translate them without touching code.
 *
 * If Polylang is not active, everything here is a no-op — none of these
 * functions touch Polylang APIs without guards.
 *
 * @package Cadmous
 */

defined( 'ABSPATH' ) || exit;

/**
 * Register shared theme strings for Polylang string translation.
 *
 * Editors can translate these in Languages → String translations in the
 * admin. Only runs if Polylang is installed.
 *
 * @since 0.1.0
 *
 * @return void
 */
function cadmous_register_polylang_strings() {
	if ( ! function_exists( 'pll_register_string' ) ) {
		return;
	}

	$strings = array(
		'apply_now'           => __( 'Apply Now', 'cadmous' ),
		'schedule_visit'      => __( 'Schedule Visit', 'cadmous' ),
		'view_all'            => __( 'View all →', 'cadmous' ),
		'read_more'           => __( 'Read more →', 'cadmous' ),
		'news_and_updates'    => __( 'News & Updates', 'cadmous' ),
		'upcoming_events'     => __( 'Upcoming Events', 'cadmous' ),
		'our_divisions'       => __( 'Our Divisions', 'cadmous' ),
		'admissions_open'     => __( 'Admissions Open', 'cadmous' ),
		'contact_us'          => __( 'Contact Us', 'cadmous' ),
		'begin_journey_title' => __( "Begin your child's journey at Cadmous", 'cadmous' ),
		'future_ready'        => __( 'Where every student is future ready', 'cadmous' ),
	);

	foreach ( $strings as $name => $value ) {
		pll_register_string( $name, $value, 'Cadmous Theme', false );
	}
}
add_action( 'init', 'cadmous_register_polylang_strings', 20 );

/**
 * Add a `dir="rtl"` attribute to the <html> tag when Polylang is viewing
 * an Arabic page. WordPress already flips direction via locale on core
 * admin screens, but the FSE front end needs this explicit hint on some
 * hosts.
 *
 * @since 0.1.0
 *
 * @param string $output Existing language_attributes output.
 * @return string
 */
function cadmous_language_attributes_rtl( $output ) {
	if ( is_rtl() && false === stripos( $output, 'dir=' ) ) {
		$output .= ' dir="rtl"';
	}
	return (string) $output;
}
add_filter( 'language_attributes', 'cadmous_language_attributes_rtl' );
