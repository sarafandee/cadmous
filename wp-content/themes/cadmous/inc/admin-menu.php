<?php
/**
 * Admin menu lockdown for non-administrators.
 *
 * Hides the scariest menus (Plugins, Themes, Users, Tools, some Settings)
 * from anyone without `manage_options`. Administrators still see everything.
 *
 * @package Cadmous
 */

defined( 'ABSPATH' ) || exit;

/**
 * Remove high-risk top-level menus for non-admins.
 *
 * @since 0.1.0
 *
 * @return void
 */
function cadmous_remove_admin_menus_for_editors() {
	if ( current_user_can( 'manage_options' ) ) {
		return;
	}

	remove_menu_page( 'plugins.php' );
	remove_menu_page( 'themes.php' );
	remove_menu_page( 'users.php' );
	remove_menu_page( 'tools.php' );
	remove_menu_page( 'options-general.php' );
}
add_action( 'admin_menu', 'cadmous_remove_admin_menus_for_editors', 999 );

/**
 * Hide the Customize link in the admin bar for non-admins.
 *
 * @since 0.1.0
 *
 * @param WP_Admin_Bar $wp_admin_bar Admin bar instance.
 * @return void
 */
function cadmous_remove_customize_admin_bar( $wp_admin_bar ) {
	if ( current_user_can( 'manage_options' ) ) {
		return;
	}
	$wp_admin_bar->remove_node( 'customize' );
}
add_action( 'admin_bar_menu', 'cadmous_remove_customize_admin_bar', 999 );

/**
 * Hide ACF admin UI from non-admins.
 *
 * Only runs if ACF is installed — the filter is registered unconditionally
 * but the value just passes through if ACF isn't active.
 *
 * @since 0.1.0
 *
 * @return bool
 */
function cadmous_hide_acf_from_editors() {
	return current_user_can( 'manage_options' );
}
add_filter( 'acf/settings/show_admin', 'cadmous_hide_acf_from_editors' );
