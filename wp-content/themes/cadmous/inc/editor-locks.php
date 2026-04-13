<?php
/**
 * Block editor content locks.
 *
 * Applies `templateLock: contentOnly` to the FSE front-page template so
 * non-admin editors can edit text and media inside existing blocks but
 * cannot move, add, or delete structural blocks. Administrators bypass
 * the lock entirely.
 *
 * @package Cadmous
 */

defined( 'ABSPATH' ) || exit;

/**
 * Force `templateLock: contentOnly` on the homepage template for non-admins.
 *
 * Applied via the `block_editor_settings_all` filter so we don't have to
 * bake lock attributes into every pattern.
 *
 * @since 0.1.0
 *
 * @param array<string,mixed>     $settings Editor settings.
 * @param WP_Block_Editor_Context $context  Editor context.
 * @return array<string,mixed>
 */
function cadmous_apply_content_lock( $settings, $context ) {
	if ( current_user_can( 'manage_options' ) ) {
		return $settings;
	}

	// Only lock the FSE site editor for template editing. Regular post/page
	// editing stays fully unlocked so editors can freely shape body content.
	if ( 'core/edit-site' === $context->name ) {
		$settings['templateLock'] = 'contentOnly';
	}

	return $settings;
}
add_filter( 'block_editor_settings_all', 'cadmous_apply_content_lock', 10, 2 );
