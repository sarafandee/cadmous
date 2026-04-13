<?php
/**
 * Role and capability modifications.
 *
 * Locks down the default `editor` role so school staff can manage content
 * but cannot install plugins, switch themes, edit code, or manage users.
 * Runs idempotently on after_switch_theme (theme activation) — re-running
 * the same calls never duplicates caps or creates new roles.
 *
 * @package Cadmous
 */

defined( 'ABSPATH' ) || exit;

/**
 * Dangerous caps that should NEVER belong to a content editor.
 *
 * @since 0.1.0
 *
 * @return array<int,string>
 */
function cadmous_editor_forbidden_caps() {
	return array(
		'update_plugins',
		'delete_plugins',
		'install_plugins',
		'activate_plugins',
		'update_themes',
		'install_themes',
		'delete_themes',
		'edit_themes',
		'switch_themes',
		'edit_theme_options',
		'customize',
		'edit_files',
		'update_core',
		'manage_options',
		'create_users',
		'edit_users',
		'delete_users',
		'list_users',
		'promote_users',
		'remove_users',
		'export',
		'import',
	);
}

/**
 * Strip forbidden caps from the built-in `editor` role, and clone it into
 * `cadmous_editor` without `unfiltered_html` (so editors can't paste script
 * tags into posts).
 *
 * @since 0.1.0
 *
 * @return void
 */
function cadmous_reshape_editor_role() {
	$editor = get_role( 'editor' );
	if ( $editor instanceof WP_Role ) {
		foreach ( cadmous_editor_forbidden_caps() as $cap ) {
			$editor->remove_cap( $cap );
		}
	}

	if ( null === get_role( 'cadmous_editor' ) ) {
		$source = $editor ? $editor->capabilities : array();
		unset( $source['unfiltered_html'] );
		foreach ( cadmous_editor_forbidden_caps() as $cap ) {
			unset( $source[ $cap ] );
		}
		add_role( 'cadmous_editor', __( 'Cadmous Editor', 'cadmous' ), $source );
	}
}
add_action( 'after_switch_theme', 'cadmous_reshape_editor_role' );

/**
 * Run the role reshape once on init too, so active installs pick up changes
 * the next time a request lands even without a theme switch. We use a
 * site-option flag to only run once per version of the forbidden-caps list.
 *
 * @since 0.1.0
 *
 * @return void
 */
function cadmous_maybe_run_role_reshape() {
	$marker  = get_option( 'cadmous_roles_version', '0' );
	$current = '1';
	if ( $marker !== $current ) {
		cadmous_reshape_editor_role();
		update_option( 'cadmous_roles_version', $current, false );
	}
}
add_action( 'init', 'cadmous_maybe_run_role_reshape', 20 );
