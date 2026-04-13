<?php
/**
 * Title: Department Hero
 * Slug: cadmous/department-hero
 * Categories: cadmous
 * Description: Two-column hero for a program or department page — head-of-department photo on the left, title and intro on the right.
 * Keywords: department, program, hero, head, faculty
 * Inserter: yes
 *
 * @package Cadmous
 */

$cadmous_director = get_stylesheet_directory_uri() . '/assets/images/director.jpg';
?>
<!-- wp:group {"align":"full","backgroundColor":"warm-white","style":{"spacing":{"padding":{"top":"var:preset|spacing|4xl","right":"var:preset|spacing|xl","bottom":"var:preset|spacing|4xl","left":"var:preset|spacing|xl"}}},"layout":{"type":"constrained","contentSize":"1280px"}} -->
<div class="wp-block-group alignfull has-warm-white-background-color has-background" style="padding-top:var(--wp--preset--spacing--4xl);padding-right:var(--wp--preset--spacing--xl);padding-bottom:var(--wp--preset--spacing--4xl);padding-left:var(--wp--preset--spacing--xl)">
	<!-- wp:columns {"verticalAlignment":"center","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|xl","left":"var:preset|spacing|2xl"}}}} -->
	<div class="wp-block-columns are-vertically-aligned-center">
		<!-- wp:column {"verticalAlignment":"center","width":"42%"} -->
		<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:42%">
			<!-- wp:image {"sizeSlug":"large","style":{"border":{"radius":"20px"}}} -->
			<figure class="wp-block-image size-large has-custom-border"><img src="<?php echo esc_url( $cadmous_director ); ?>" alt="<?php esc_attr_e( 'Head of department', 'cadmous' ); ?>" style="border-radius:20px"/></figure>
			<!-- /wp:image -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"verticalAlignment":"center","width":"58%"} -->
		<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:58%">
			<!-- wp:paragraph {"textColor":"gold","fontSize":"small","style":{"typography":{"textTransform":"uppercase","letterSpacing":"0.15em","fontWeight":"600"}}} -->
			<p class="has-gold-color has-text-color has-small-font-size" style="font-weight:600;letter-spacing:0.15em;text-transform:uppercase"><?php esc_html_e( 'Head of Department', 'cadmous' ); ?></p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":1,"fontSize":"h1","fontFamily":"fraunces","style":{"spacing":{"margin":{"top":"var:preset|spacing|sm","bottom":"var:preset|spacing|md"}}}} -->
			<h1 class="wp-block-heading has-fraunces-font-family has-h-1-font-size" style="margin-top:var(--wp--preset--spacing--sm);margin-bottom:var(--wp--preset--spacing--md)"><?php esc_html_e( 'Department Name', 'cadmous' ); ?></h1>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"textColor":"muted","fontSize":"body"} -->
			<p class="has-muted-color has-text-color has-body-font-size"><?php esc_html_e( 'Replace this with the department head message or a short intro paragraph about this program.', 'cadmous' ); ?></p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->
