<?php
/**
 * Front-end + editor asset enqueue.
 *
 * Fonts are self-hosted and registered via theme.json `fontFamilies.fontFace`
 * entries, so WP injects the @font-face rules for us. This file covers the
 * theme's own stylesheet (style.css), editor styles, and any future JS.
 *
 * @package Cadmous
 */

defined( 'ABSPATH' ) || exit;

/**
 * Enqueue front-end styles.
 *
 * Versioned by filemtime so browsers drop cache on deploy.
 *
 * @since 0.1.0
 *
 * @return void
 */
function cadmous_enqueue_front_assets() {
	$style_path = get_stylesheet_directory() . '/style.css';
	$version    = file_exists( $style_path ) ? (string) filemtime( $style_path ) : '0.1.0';

	wp_enqueue_style(
		'cadmous-style',
		get_stylesheet_uri(),
		array(),
		$version
	);
}
add_action( 'wp_enqueue_scripts', 'cadmous_enqueue_front_assets' );

/**
 * Register the theme's style.css as an editor stylesheet so block editors
 * see the same defaults as the front end.
 *
 * @since 0.1.0
 *
 * @return void
 */
function cadmous_register_editor_styles() {
	add_editor_style( 'style.css' );
}
add_action( 'after_setup_theme', 'cadmous_register_editor_styles' );
