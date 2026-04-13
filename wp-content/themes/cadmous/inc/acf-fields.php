<?php
/**
 * ACF Pro field groups — single source of truth.
 *
 * Field groups are defined in code (not in the ACF admin UI) so they ship
 * with the theme and remain reproducible across environments. ACF reads
 * these via the `acf/init` action automatically.
 *
 * If ACF Pro is not installed or active, every `acf_add_local_field_group`
 * call below is a no-op — the file is safe to load regardless.
 *
 * After ACF Pro is installed (set `ACF_LICENSE_KEY` in .env and re-run
 * bin/bootstrap.sh), the field groups below appear in every relevant
 * editor. Do NOT create field groups through the admin UI; always edit
 * this file and commit.
 *
 * @package Cadmous
 */

defined( 'ABSPATH' ) || exit;

/**
 * Register Cadmous ACF field groups.
 *
 * Hooked to `acf/init` so it runs after ACF has finished booting.
 *
 * @since 0.1.0
 *
 * @return void
 */
function cadmous_register_acf_field_groups() {
	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	// Page → Hero metadata.
	acf_add_local_field_group(
		array(
			'key'        => 'group_cadmous_page_hero',
			'title'      => 'Page Hero',
			'location'   => array(
				array(
					array(
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'page',
					),
				),
			),
			'menu_order' => 0,
			'position'   => 'side',
			'style'      => 'default',
			'fields'     => array(
				array(
					'key'          => 'field_cadmous_page_subtitle',
					'label'        => 'Subtitle',
					'name'         => 'cadmous_subtitle',
					'type'         => 'text',
					'instructions' => 'Shown under the page title in the hero.',
				),
				array(
					'key'           => 'field_cadmous_page_hero_image',
					'label'         => 'Hero image',
					'name'          => 'cadmous_hero_image',
					'type'          => 'image',
					'return_format' => 'array',
					'preview_size'  => 'medium',
				),
				array(
					'key'           => 'field_cadmous_page_hero_overlay',
					'label'         => 'Hero overlay strength',
					'name'          => 'cadmous_hero_overlay',
					'type'          => 'range',
					'default_value' => 60,
					'min'           => 0,
					'max'           => 100,
					'step'          => 5,
					'append'        => '%',
				),
			),
		)
	);

	// News CPT → article meta.
	acf_add_local_field_group(
		array(
			'key'        => 'group_cadmous_news_meta',
			'title'      => 'Article meta',
			'location'   => array(
				array(
					array(
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'cadmous_news',
					),
				),
			),
			'menu_order' => 0,
			'position'   => 'normal',
			'style'      => 'default',
			'fields'     => array(
				array(
					'key'           => 'field_cadmous_news_image',
					'label'         => 'Featured image',
					'name'          => 'cadmous_news_image',
					'type'          => 'image',
					'return_format' => 'array',
					'preview_size'  => 'medium',
					'instructions'  => 'Used by the news strip on the homepage and the article archive.',
				),
				array(
					'key'          => 'field_cadmous_news_excerpt',
					'label'        => 'Excerpt (280 chars)',
					'name'         => 'cadmous_news_excerpt',
					'type'         => 'textarea',
					'rows'         => 3,
					'maxlength'    => 280,
					'instructions' => 'Short teaser shown on the homepage and archive cards.',
				),
				array(
					'key'          => 'field_cadmous_news_language_hint',
					'label'        => 'Language hint',
					'name'         => 'cadmous_news_language',
					'type'         => 'select',
					'choices'      => array(
						'en' => 'English',
						'fr' => 'Français',
						'ar' => 'العربية',
					),
					'allow_null'   => 1,
					'instructions' => 'Polylang handles routing, this is a manual tag for filtering in custom queries.',
				),
			),
		)
	);

	// Staff CPT → profile.
	acf_add_local_field_group(
		array(
			'key'        => 'group_cadmous_staff_profile',
			'title'      => 'Staff profile',
			'location'   => array(
				array(
					array(
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'cadmous_staff',
					),
				),
			),
			'menu_order' => 0,
			'position'   => 'normal',
			'style'      => 'default',
			'fields'     => array(
				array(
					'key'          => 'field_cadmous_staff_role',
					'label'        => 'Role',
					'name'         => 'cadmous_staff_role',
					'type'         => 'text',
					'instructions' => 'e.g. Head of Kindergarten, Secondary Coordinator.',
				),
				array(
					'key'           => 'field_cadmous_staff_photo',
					'label'         => 'Photo',
					'name'          => 'cadmous_staff_photo',
					'type'          => 'image',
					'return_format' => 'array',
					'preview_size'  => 'medium',
				),
				array(
					'key'   => 'field_cadmous_staff_email',
					'label' => 'Email',
					'name'  => 'cadmous_staff_email',
					'type'  => 'email',
				),
				array(
					'key'          => 'field_cadmous_staff_bio',
					'label'        => 'Bio',
					'name'         => 'cadmous_staff_bio',
					'type'         => 'wysiwyg',
					'toolbar'      => 'basic',
					'media_upload' => 0,
				),
			),
		)
	);

	// Program CPT → department.
	acf_add_local_field_group(
		array(
			'key'        => 'group_cadmous_program_department',
			'title'      => 'Program / Department',
			'location'   => array(
				array(
					array(
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'cadmous_program',
					),
				),
			),
			'menu_order' => 0,
			'position'   => 'normal',
			'style'      => 'default',
			'fields'     => array(
				array(
					'key'           => 'field_cadmous_program_head',
					'label'         => 'Head of department',
					'name'          => 'cadmous_program_head',
					'type'          => 'post_object',
					'post_type'     => array( 'cadmous_staff' ),
					'return_format' => 'id',
					'ui'            => 1,
					'allow_null'    => 1,
				),
				array(
					'key'          => 'field_cadmous_program_years',
					'label'        => 'Years covered',
					'name'         => 'cadmous_program_years',
					'type'         => 'text',
					'instructions' => 'Free text, e.g. "Year 7 – Year 9" or "KG1 – KG3".',
				),
				array(
					'key'          => 'field_cadmous_program_curriculum',
					'label'        => 'Curriculum overview',
					'name'         => 'cadmous_program_curriculum',
					'type'         => 'wysiwyg',
					'toolbar'      => 'full',
					'media_upload' => 1,
				),
				array(
					'key'           => 'field_cadmous_program_gallery',
					'label'         => 'Photo gallery',
					'name'          => 'cadmous_program_gallery',
					'type'          => 'gallery',
					'return_format' => 'array',
					'preview_size'  => 'medium',
				),
			),
		)
	);
}
add_action( 'acf/init', 'cadmous_register_acf_field_groups' );
