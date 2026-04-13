<?php
/**
 * Block pattern category registration.
 *
 * WordPress auto-discovers pattern files under `patterns/`, but the category
 * they're filed under must be registered explicitly. This file just registers
 * the `cadmous` category — the patterns themselves live in `patterns/*.php`.
 *
 * @package Cadmous
 */

defined( 'ABSPATH' ) || exit;

/**
 * Register the Cadmous block pattern category.
 *
 * @since 0.1.0
 *
 * @return void
 */
function cadmous_register_pattern_categories() {
	register_block_pattern_category(
		'cadmous',
		array(
			'label'       => _x( 'Cadmous', 'Block pattern category', 'cadmous' ),
			'description' => __( 'Reusable page sections for Cadmous College.', 'cadmous' ),
		)
	);
}
add_action( 'init', 'cadmous_register_pattern_categories' );
