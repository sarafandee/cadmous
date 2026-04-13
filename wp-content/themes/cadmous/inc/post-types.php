<?php
/**
 * Custom post types and taxonomies.
 *
 * Post type names are prefixed `cadmous_` to satisfy WPCS
 * PrefixAllGlobals, but the public URL slugs stay short and readable
 * (`/news/`, `/staff/`, `/programs/`) via the `rewrite.slug` override.
 *
 * Events intentionally live outside this file — they're handled by
 * The Events Calendar plugin (CAD-13) so editors get a real calendar
 * widget rather than a hand-rolled CPT.
 *
 * @package Cadmous
 */

defined( 'ABSPATH' ) || exit;

/**
 * Register Cadmous custom post types.
 *
 * @since 0.1.0
 *
 * @return void
 */
function cadmous_register_post_types() {
	register_post_type(
		'cadmous_news',
		array(
			'labels'              => array(
				'name'                  => _x( 'News', 'post type general name', 'cadmous' ),
				'singular_name'         => _x( 'News Article', 'post type singular name', 'cadmous' ),
				'menu_name'             => _x( 'News', 'admin menu', 'cadmous' ),
				'name_admin_bar'        => _x( 'News Article', 'add new on admin bar', 'cadmous' ),
				'add_new'               => __( 'Add New', 'cadmous' ),
				'add_new_item'          => __( 'Add New News Article', 'cadmous' ),
				'new_item'              => __( 'New News Article', 'cadmous' ),
				'edit_item'             => __( 'Edit News Article', 'cadmous' ),
				'view_item'             => __( 'View News Article', 'cadmous' ),
				'all_items'             => __( 'All News', 'cadmous' ),
				'search_items'          => __( 'Search News', 'cadmous' ),
				'not_found'             => __( 'No news articles found.', 'cadmous' ),
				'not_found_in_trash'    => __( 'No news articles found in Trash.', 'cadmous' ),
				'featured_image'        => __( 'Article Image', 'cadmous' ),
				'set_featured_image'    => __( 'Set article image', 'cadmous' ),
				'remove_featured_image' => __( 'Remove article image', 'cadmous' ),
				'use_featured_image'    => __( 'Use as article image', 'cadmous' ),
				'archives'              => __( 'News Archive', 'cadmous' ),
				'filter_items_list'     => __( 'Filter news list', 'cadmous' ),
				'items_list_navigation' => __( 'News list navigation', 'cadmous' ),
				'items_list'            => __( 'News list', 'cadmous' ),
			),
			'description'         => __( 'News and announcements from Cadmous College.', 'cadmous' ),
			'public'              => true,
			'publicly_queryable'  => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'show_in_rest'        => true,
			'query_var'           => true,
			'rewrite'             => array(
				'slug'       => 'news',
				'with_front' => false,
			),
			'capability_type'     => 'post',
			'has_archive'         => 'news',
			'hierarchical'        => false,
			'menu_position'       => 20,
			'menu_icon'           => 'dashicons-megaphone',
			'supports'            => array(
				'title',
				'editor',
				'excerpt',
				'thumbnail',
				'revisions',
				'author',
				'custom-fields',
			),
			'exclude_from_search' => false,
			'delete_with_user'    => false,
			'template'            => array(),
		)
	);

	register_post_type(
		'cadmous_staff',
		array(
			'labels'             => array(
				'name'                  => _x( 'Staff', 'post type general name', 'cadmous' ),
				'singular_name'         => _x( 'Staff Member', 'post type singular name', 'cadmous' ),
				'menu_name'             => _x( 'Staff', 'admin menu', 'cadmous' ),
				'name_admin_bar'        => _x( 'Staff Member', 'add new on admin bar', 'cadmous' ),
				'add_new'               => __( 'Add New', 'cadmous' ),
				'add_new_item'          => __( 'Add New Staff Member', 'cadmous' ),
				'edit_item'             => __( 'Edit Staff Member', 'cadmous' ),
				'view_item'             => __( 'View Staff Member', 'cadmous' ),
				'all_items'             => __( 'All Staff', 'cadmous' ),
				'search_items'          => __( 'Search Staff', 'cadmous' ),
				'not_found'             => __( 'No staff members found.', 'cadmous' ),
				'not_found_in_trash'    => __( 'No staff members found in Trash.', 'cadmous' ),
				'featured_image'        => __( 'Photo', 'cadmous' ),
				'set_featured_image'    => __( 'Set photo', 'cadmous' ),
				'remove_featured_image' => __( 'Remove photo', 'cadmous' ),
				'use_featured_image'    => __( 'Use as photo', 'cadmous' ),
				'archives'              => __( 'Staff Directory', 'cadmous' ),
			),
			'description'        => __( 'Leadership, faculty, and department heads at Cadmous College.', 'cadmous' ),
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'show_in_rest'       => true,
			'query_var'          => true,
			'rewrite'            => array(
				'slug'       => 'staff',
				'with_front' => false,
			),
			'capability_type'    => 'post',
			'has_archive'        => 'staff',
			'hierarchical'       => false,
			'menu_position'      => 21,
			'menu_icon'          => 'dashicons-businessperson',
			'supports'           => array(
				'title',
				'editor',
				'thumbnail',
				'page-attributes',
				'custom-fields',
			),
		)
	);

	register_post_type(
		'cadmous_program',
		array(
			'labels'             => array(
				'name'               => _x( 'Programs', 'post type general name', 'cadmous' ),
				'singular_name'      => _x( 'Program', 'post type singular name', 'cadmous' ),
				'menu_name'          => _x( 'Programs', 'admin menu', 'cadmous' ),
				'name_admin_bar'     => _x( 'Program', 'add new on admin bar', 'cadmous' ),
				'add_new'            => __( 'Add New', 'cadmous' ),
				'add_new_item'       => __( 'Add New Program', 'cadmous' ),
				'edit_item'          => __( 'Edit Program', 'cadmous' ),
				'view_item'          => __( 'View Program', 'cadmous' ),
				'all_items'          => __( 'All Programs', 'cadmous' ),
				'search_items'       => __( 'Search Programs', 'cadmous' ),
				'not_found'          => __( 'No programs found.', 'cadmous' ),
				'not_found_in_trash' => __( 'No programs found in Trash.', 'cadmous' ),
				'featured_image'     => __( 'Program Image', 'cadmous' ),
				'archives'           => __( 'Programs', 'cadmous' ),
			),
			'description'        => __( 'Academic programs: Kindergarten, Elementary, Intermediate, Integrative, Secondary Lebanese, International Programs.', 'cadmous' ),
			'public'             => true,
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'show_in_rest'       => true,
			'query_var'          => true,
			'rewrite'            => array(
				'slug'       => 'programs',
				'with_front' => false,
			),
			'capability_type'    => 'page',
			'has_archive'        => 'programs',
			'hierarchical'       => true,
			'menu_position'      => 22,
			'menu_icon'          => 'dashicons-welcome-learn-more',
			'supports'           => array(
				'title',
				'editor',
				'thumbnail',
				'page-attributes',
				'revisions',
				'custom-fields',
			),
		)
	);
}
add_action( 'init', 'cadmous_register_post_types' );

/**
 * Register Cadmous taxonomies.
 *
 * @since 0.1.0
 *
 * @return void
 */
function cadmous_register_taxonomies() {
	register_taxonomy(
		'cadmous_news_category',
		array( 'cadmous_news' ),
		array(
			'labels'            => array(
				'name'          => _x( 'News Categories', 'taxonomy general name', 'cadmous' ),
				'singular_name' => _x( 'News Category', 'taxonomy singular name', 'cadmous' ),
				'menu_name'     => __( 'Categories', 'cadmous' ),
				'search_items'  => __( 'Search Categories', 'cadmous' ),
				'all_items'     => __( 'All Categories', 'cadmous' ),
				'edit_item'     => __( 'Edit Category', 'cadmous' ),
				'update_item'   => __( 'Update Category', 'cadmous' ),
				'add_new_item'  => __( 'Add New Category', 'cadmous' ),
				'new_item_name' => __( 'New Category Name', 'cadmous' ),
				'not_found'     => __( 'No categories found.', 'cadmous' ),
			),
			'hierarchical'      => true,
			'show_ui'           => true,
			'show_admin_column' => true,
			'show_in_rest'      => true,
			'query_var'         => true,
			'rewrite'           => array(
				'slug'       => 'news-category',
				'with_front' => false,
			),
		)
	);

	register_taxonomy(
		'cadmous_staff_division',
		array( 'cadmous_staff' ),
		array(
			'labels'            => array(
				'name'          => _x( 'Divisions', 'taxonomy general name', 'cadmous' ),
				'singular_name' => _x( 'Division', 'taxonomy singular name', 'cadmous' ),
				'menu_name'     => __( 'Divisions', 'cadmous' ),
				'search_items'  => __( 'Search Divisions', 'cadmous' ),
				'all_items'     => __( 'All Divisions', 'cadmous' ),
				'edit_item'     => __( 'Edit Division', 'cadmous' ),
				'update_item'   => __( 'Update Division', 'cadmous' ),
				'add_new_item'  => __( 'Add New Division', 'cadmous' ),
				'new_item_name' => __( 'New Division Name', 'cadmous' ),
				'not_found'     => __( 'No divisions found.', 'cadmous' ),
			),
			'hierarchical'      => true,
			'show_ui'           => true,
			'show_admin_column' => true,
			'show_in_rest'      => true,
			'query_var'         => true,
			'rewrite'           => array(
				'slug'       => 'division',
				'with_front' => false,
			),
		)
	);
}
add_action( 'init', 'cadmous_register_taxonomies' );

/**
 * Flush rewrite rules on theme activation so the new CPT and taxonomy
 * URLs resolve without a manual Settings → Permalinks save.
 *
 * Note: flushing on every request is expensive; we only flush once, on
 * theme activation, by hooking into `after_switch_theme`.
 *
 * @since 0.1.0
 *
 * @return void
 */
function cadmous_flush_rewrites_on_activation() {
	cadmous_register_post_types();
	cadmous_register_taxonomies();
	flush_rewrite_rules( false );
}
add_action( 'after_switch_theme', 'cadmous_flush_rewrites_on_activation' );
