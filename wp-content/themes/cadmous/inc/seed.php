<?php
/**
 * `wp cadmous seed` WP-CLI command.
 *
 * One-shot idempotent seeder that populates a fresh WordPress install
 * with the full Cadmous content set: static pages, news articles,
 * programs (academic divisions), staff, nav menus, and site options.
 *
 * Usage:
 *   docker compose exec -u www-data WordPress wp cadmous seed
 *   docker compose exec -u www-data WordPress wp cadmous seed --force
 *
 * Idempotent by default: every item checks for an existing post by slug
 * before creating. Pass --force to delete and recreate everything.
 *
 * Content lives in inc/seed/data.php. See that file to edit or extend.
 *
 * @package Cadmous
 */

defined( 'ABSPATH' ) || exit;

require_once __DIR__ . '/seed/data.php';

if ( defined( 'WP_CLI' ) && WP_CLI ) {
	WP_CLI::add_command( 'cadmous', 'Cadmous_Seed_Command' );
}

/**
 * Seed command implementation.
 *
 * Exposed as `wp cadmous seed`.
 */
class Cadmous_Seed_Command {

	/**
	 * Seed the site with Cadmous content.
	 *
	 * ## OPTIONS
	 *
	 * [--force]
	 * : Delete existing seeded content and recreate it.
	 *
	 * ## EXAMPLES
	 *
	 *     wp cadmous seed
	 *     wp cadmous seed --force
	 *
	 * @param array<int,string>    $args       Positional args.
	 * @param array<string,string> $assoc_args Flags and options.
	 * @return void
	 */
	public function seed( $args, $assoc_args ) {
		$force = isset( $assoc_args['force'] );

		if ( $force ) {
			$this->wipe_seeded_content();
		}

		$this->seed_pages();
		$this->seed_programs();
		$this->seed_staff();
		$this->seed_news();
		$this->seed_menus();
		$this->seed_site_options();

		WP_CLI::success( 'Cadmous seed complete.' );
	}

	/**
	 * Delete everything we previously seeded.
	 *
	 * Identified by a meta key _cadmous_seeded = 1 so we never nuke
	 * editor-created content.
	 *
	 * @return void
	 */
	private function wipe_seeded_content() {
		$posts = get_posts(
			array(
				'post_type'      => array( 'page', 'cadmous_news', 'cadmous_staff', 'cadmous_program' ),
				'post_status'    => 'any',
				'posts_per_page' => -1,
				// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key,WordPress.DB.SlowDBQuery.slow_db_query_meta_value -- one-shot admin command, runs outside the front-end request cycle.
				'meta_key'       => '_cadmous_seeded',
				// phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_value
				'meta_value'     => '1',
			)
		);
		foreach ( $posts as $post ) {
			wp_delete_post( $post->ID, true );
		}
		WP_CLI::log( sprintf( 'wiped %d seeded posts', count( $posts ) ) );
	}

	/**
	 * Seed static pages.
	 *
	 * @return void
	 */
	private function seed_pages() {
		foreach ( cadmous_seed_pages() as $page ) {
			$existing = get_page_by_path( $page['slug'], OBJECT, 'page' );
			if ( $existing instanceof WP_Post ) {
				WP_CLI::log( sprintf( 'page exists: %s', $page['slug'] ) );
				continue;
			}
			$id = wp_insert_post(
				array(
					'post_type'    => 'page',
					'post_title'   => $page['title'],
					'post_name'    => $page['slug'],
					'post_content' => $this->markdown_to_blocks( $page['content'] ),
					'post_status'  => 'publish',
					'meta_input'   => array(
						'_cadmous_seeded' => '1',
					),
				),
				true
			);
			if ( is_wp_error( $id ) ) {
				WP_CLI::warning( sprintf( 'page failed: %s — %s', $page['slug'], $id->get_error_message() ) );
				continue;
			}
			if ( function_exists( 'pll_set_post_language' ) ) {
				pll_set_post_language( $id, 'en' );
			}
			WP_CLI::log( sprintf( 'created page: %s (id=%d)', $page['slug'], $id ) );
		}
	}

	/**
	 * Seed academic programs.
	 *
	 * @return void
	 */
	private function seed_programs() {
		foreach ( cadmous_seed_programs() as $program ) {
			$existing = get_posts(
				array(
					'post_type'      => 'cadmous_program',
					'name'           => $program['slug'],
					'post_status'    => 'any',
					'posts_per_page' => 1,
				)
			);
			if ( $existing ) {
				WP_CLI::log( sprintf( 'program exists: %s', $program['slug'] ) );
				continue;
			}
			$id = wp_insert_post(
				array(
					'post_type'    => 'cadmous_program',
					'post_title'   => $program['title'],
					'post_name'    => $program['slug'],
					'post_content' => $this->markdown_to_blocks( $program['content'] ),
					'post_status'  => 'publish',
					'meta_input'   => array(
						'_cadmous_seeded'       => '1',
						'cadmous_program_head'  => '',
						'cadmous_program_years' => $program['years'],
					),
				),
				true
			);
			if ( is_wp_error( $id ) ) {
				WP_CLI::warning( sprintf( 'program failed: %s — %s', $program['slug'], $id->get_error_message() ) );
				continue;
			}
			if ( function_exists( 'pll_set_post_language' ) ) {
				pll_set_post_language( $id, 'en' );
			}
			WP_CLI::log( sprintf( 'created program: %s (id=%d)', $program['slug'], $id ) );
		}
	}

	/**
	 * Seed staff records and link programs to their head.
	 *
	 * @return void
	 */
	private function seed_staff() {
		$staff_ids = array();
		foreach ( cadmous_seed_staff() as $staff ) {
			$existing = get_posts(
				array(
					'post_type'      => 'cadmous_staff',
					'name'           => $staff['slug'],
					'post_status'    => 'any',
					'posts_per_page' => 1,
				)
			);
			if ( $existing ) {
				$staff_ids[ $staff['name'] ] = (int) $existing[0]->ID;
				WP_CLI::log( sprintf( 'staff exists: %s', $staff['slug'] ) );
				continue;
			}
			$id = wp_insert_post(
				array(
					'post_type'    => 'cadmous_staff',
					'post_title'   => $staff['name'],
					'post_name'    => $staff['slug'],
					'post_content' => $staff['bio'],
					'post_status'  => 'publish',
					'meta_input'   => array(
						'_cadmous_seeded'     => '1',
						'cadmous_staff_role'  => $staff['role'],
						'cadmous_staff_email' => $staff['email'],
					),
				),
				true
			);
			if ( is_wp_error( $id ) ) {
				WP_CLI::warning( sprintf( 'staff failed: %s — %s', $staff['slug'], $id->get_error_message() ) );
				continue;
			}
			if ( function_exists( 'pll_set_post_language' ) ) {
				pll_set_post_language( $id, 'en' );
			}
			$staff_ids[ $staff['name'] ] = (int) $id;
			WP_CLI::log( sprintf( 'created staff: %s (id=%d)', $staff['slug'], $id ) );
		}

		// Link each program to its head of department.
		foreach ( cadmous_seed_programs() as $program ) {
			if ( empty( $program['head'] ) || ! isset( $staff_ids[ $program['head'] ] ) ) {
				continue;
			}
			$program_post = get_posts(
				array(
					'post_type'      => 'cadmous_program',
					'name'           => $program['slug'],
					'post_status'    => 'any',
					'posts_per_page' => 1,
				)
			);
			if ( $program_post ) {
				update_post_meta( $program_post[0]->ID, 'cadmous_program_head', $staff_ids[ $program['head'] ] );
				WP_CLI::log( sprintf( 'linked %s → head %s', $program['slug'], $program['head'] ) );
			}
		}
	}

	/**
	 * Seed news articles.
	 *
	 * @return void
	 */
	private function seed_news() {
		foreach ( cadmous_seed_news() as $article ) {
			$existing = get_posts(
				array(
					'post_type'      => 'cadmous_news',
					'name'           => $article['slug'],
					'post_status'    => 'any',
					'posts_per_page' => 1,
				)
			);
			if ( $existing ) {
				WP_CLI::log( sprintf( 'news exists: %s', $article['slug'] ) );
				continue;
			}
			$id = wp_insert_post(
				array(
					'post_type'    => 'cadmous_news',
					'post_title'   => $article['title'],
					'post_name'    => $article['slug'],
					'post_content' => $this->markdown_to_blocks( $article['content'] ),
					'post_status'  => 'publish',
					'post_date'    => $article['published_at'],
					'meta_input'   => array(
						'_cadmous_seeded'       => '1',
						'cadmous_news_language' => $article['lang'],
					),
				),
				true
			);
			if ( is_wp_error( $id ) ) {
				WP_CLI::warning( sprintf( 'news failed: %s — %s', $article['slug'], $id->get_error_message() ) );
				continue;
			}
			if ( function_exists( 'pll_set_post_language' ) ) {
				pll_set_post_language( $id, $article['lang'] );
			}
			WP_CLI::log( sprintf( 'created news (%s): %s (id=%d)', $article['lang'], $article['slug'], $id ) );
		}
	}

	/**
	 * Build the Primary nav menu with the same hierarchy as the live site.
	 *
	 * @return void
	 */
	private function seed_menus() {
		$menu_name = 'Cadmous Primary';
		$menu      = wp_get_nav_menu_object( $menu_name );
		if ( ! $menu ) {
			$menu_id = wp_create_nav_menu( $menu_name );
			if ( is_wp_error( $menu_id ) ) {
				WP_CLI::warning( 'menu create failed: ' . $menu_id->get_error_message() );
				return;
			}
			$menu = wp_get_nav_menu_object( $menu_id );
		}

		// Only populate if empty.
		$existing_items = wp_get_nav_menu_items( $menu->term_id );
		if ( ! empty( $existing_items ) ) {
			WP_CLI::log( 'primary menu already has items' );
		} else {
			$items = array(
				array(
					'title' => 'Home',
					'url'   => home_url( '/' ),
				),
				array(
					'title' => "Director's Message",
					'slug'  => 'directors-message',
				),
				array(
					'title' => 'Vision & Mission',
					'slug'  => 'vision-mission',
				),
				array(
					'title' => 'History',
					'slug'  => 'history',
				),
				array(
					'title' => 'Programs',
					'url'   => home_url( '/programs/' ),
				),
				array(
					'title' => 'Admissions',
					'slug'  => 'admissions-requirements',
				),
				array(
					'title' => 'News',
					'url'   => home_url( '/news/' ),
				),
				array(
					'title' => 'Events',
					'url'   => home_url( '/events/' ),
				),
				array(
					'title' => 'Contact',
					'slug'  => 'contact',
				),
			);
			foreach ( $items as $idx => $item ) {
				$args = array(
					'menu-item-title'    => $item['title'],
					'menu-item-status'   => 'publish',
					'menu-item-position' => $idx + 1,
				);
				if ( isset( $item['slug'] ) ) {
					$page = get_page_by_path( $item['slug'] );
					if ( $page ) {
						$args['menu-item-type']      = 'post_type';
						$args['menu-item-object']    = 'page';
						$args['menu-item-object-id'] = $page->ID;
					} else {
						continue;
					}
				} else {
					$args['menu-item-type'] = 'custom';
					$args['menu-item-url']  = $item['url'];
				}
				wp_update_nav_menu_item( $menu->term_id, 0, $args );
			}
			WP_CLI::log( sprintf( 'built primary menu with %d items', count( $items ) ) );
		}

		// Assign menu to the primary location.
		$locations            = get_theme_mod( 'nav_menu_locations' );
		$locations            = is_array( $locations ) ? $locations : array();
		$locations['primary'] = (int) $menu->term_id;
		set_theme_mod( 'nav_menu_locations', $locations );
	}

	/**
	 * Site options — blogname, tagline, front page.
	 *
	 * @return void
	 */
	private function seed_site_options() {
		update_option( 'blogname', 'Cadmous College' );
		update_option( 'blogdescription', 'IB World School in Tyre, Lebanon' );
		update_option( 'timezone_string', 'Asia/Beirut' );
		update_option( 'date_format', 'j F Y' );

		/*
		 * Front page stays as latest posts until we add a dedicated Home
		 * page from a pattern. The front-page.html template already renders
		 * the Cadmous homepage on any show_on_front value, so nothing more
		 * to do here.
		 */

		WP_CLI::log( 'site options updated' );
	}

	/**
	 * Cheap markdown → block content shim.
	 *
	 * Splits content on blank lines, turns each paragraph into a core/paragraph
	 * block or core/heading if it starts/ends with **. Good enough for the
	 * straightforward seed content.
	 *
	 * @param string $markdown Source content.
	 * @return string          Block markup.
	 */
	private function markdown_to_blocks( $markdown ) {
		$paragraphs = preg_split( '/\n\n+/', trim( $markdown ) );
		$blocks     = array();
		foreach ( (array) $paragraphs as $p ) {
			$p = trim( $p );
			if ( '' === $p ) {
				continue;
			}
			if ( preg_match( '/^\*\*(.+)\*\*$/u', $p, $m ) ) {
				$blocks[] = '<!-- wp:heading {"level":2,"fontFamily":"fraunces"} -->' . "\n" .
					'<h2 class="wp-block-heading has-fraunces-font-family">' . esc_html( $m[1] ) . '</h2>' . "\n" .
					'<!-- /wp:heading -->';
				continue;
			}
			$blocks[] = '<!-- wp:paragraph -->' . "\n" .
				'<p>' . wp_kses_post( $p ) . '</p>' . "\n" .
				'<!-- /wp:paragraph -->';
		}
		return implode( "\n\n", $blocks );
	}
}
