<?php
/**
 * Cadmous theme bootstrap.
 *
 * Loads modular files under inc/, registers theme supports, menu locations,
 * and image sizes. Follow the `inc/<topic>.php` convention for new code so
 * everything stays discoverable and the lint hook picks up every file.
 *
 * @package Cadmous
 */

defined( 'ABSPATH' ) || exit;

define( 'CADMOUS_THEME_VERSION', '0.1.0' );
define( 'CADMOUS_THEME_DIR', get_stylesheet_directory() );
define( 'CADMOUS_THEME_URI', get_stylesheet_directory_uri() );

$cadmous_inc_files = glob( CADMOUS_THEME_DIR . '/inc/*.php' );
if ( is_array( $cadmous_inc_files ) ) {
	sort( $cadmous_inc_files );
	foreach ( $cadmous_inc_files as $cadmous_inc_file ) {
		require_once $cadmous_inc_file;
	}
}
unset( $cadmous_inc_files, $cadmous_inc_file );

/**
 * Theme setup: theme supports, nav menus, i18n.
 *
 * @since 0.1.0
 *
 * @return void
 */
function cadmous_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'editor-styles' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'custom-logo' );
	add_theme_support(
		'html5',
		array(
			'comment-list',
			'comment-form',
			'search-form',
			'gallery',
			'caption',
			'style',
			'script',
			'navigation-widgets',
		)
	);

	register_nav_menus(
		array(
			'primary' => __( 'Primary Menu', 'cadmous' ),
			'footer'  => __( 'Footer Menu', 'cadmous' ),
			'topbar'  => __( 'Top Bar Menu', 'cadmous' ),
		)
	);

	load_theme_textdomain( 'cadmous', CADMOUS_THEME_DIR . '/languages' );
}
add_action( 'after_setup_theme', 'cadmous_setup' );
