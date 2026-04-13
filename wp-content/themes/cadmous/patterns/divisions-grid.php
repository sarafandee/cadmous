<?php
/**
 * Title: Divisions Grid
 * Slug: cadmous/divisions-grid
 * Categories: cadmous
 * Description: 3×2 grid of academic division cards — KG, Elementary, Intermediate, Integrative, Secondary Lebanese, International Programs.
 * Keywords: divisions, departments, grid, programs
 * Inserter: yes
 *
 * @package Cadmous
 */

?>
<!-- wp:group {"align":"full","backgroundColor":"cream","style":{"spacing":{"padding":{"top":"var:preset|spacing|4xl","right":"var:preset|spacing|xl","bottom":"var:preset|spacing|4xl","left":"var:preset|spacing|xl"}}},"layout":{"type":"constrained","contentSize":"1280px"}} -->
<div class="wp-block-group alignfull has-cream-background-color has-background" style="padding-top:var(--wp--preset--spacing--4xl);padding-right:var(--wp--preset--spacing--xl);padding-bottom:var(--wp--preset--spacing--4xl);padding-left:var(--wp--preset--spacing--xl)">
	<!-- wp:columns {"verticalAlignment":"center","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|lg","left":"var:preset|spacing|2xl"}}}} -->
	<div class="wp-block-columns are-vertically-aligned-center">
		<!-- wp:column {"verticalAlignment":"center","width":"58%"} -->
		<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:58%">
			<!-- wp:paragraph {"textColor":"gold","fontSize":"small","style":{"typography":{"textTransform":"uppercase","letterSpacing":"0.15em","fontWeight":"600"}}} -->
			<p class="has-gold-color has-text-color has-small-font-size" style="font-weight:600;letter-spacing:0.15em;text-transform:uppercase"><?php esc_html_e( 'Our Divisions', 'cadmous' ); ?></p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":2,"fontSize":"h1","fontFamily":"fraunces","style":{"spacing":{"margin":{"top":"var:preset|spacing|sm"}}}} -->
			<h2 class="wp-block-heading has-fraunces-font-family has-h-1-font-size" style="margin-top:var(--wp--preset--spacing--sm)"><?php esc_html_e( 'A path for every stage of learning', 'cadmous' ); ?></h2>
			<!-- /wp:heading -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"verticalAlignment":"center","width":"42%"} -->
		<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:42%">
			<!-- wp:paragraph {"textColor":"muted","fontSize":"body"} -->
			<p class="has-muted-color has-text-color has-body-font-size"><?php esc_html_e( 'Six divisions across the Lebanese and International curricula, each led by a head of department who has spent years shaping how students here learn and grow.', 'cadmous' ); ?></p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->

	<!-- wp:spacer {"height":"var:preset|spacing|xl"} -->
	<div style="height:var(--wp--preset--spacing--xl)" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->

	<!-- wp:columns {"style":{"spacing":{"blockGap":{"top":"var:preset|spacing|lg","left":"var:preset|spacing|lg"}}}} -->
	<div class="wp-block-columns">
		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:group {"backgroundColor":"warm-white","style":{"spacing":{"padding":{"top":"var:preset|spacing|xl","right":"var:preset|spacing|xl","bottom":"var:preset|spacing|xl","left":"var:preset|spacing|xl"}},"border":{"radius":"12px"}}} -->
			<div class="wp-block-group has-warm-white-background-color has-background" style="border-radius:12px;padding-top:var(--wp--preset--spacing--xl);padding-right:var(--wp--preset--spacing--xl);padding-bottom:var(--wp--preset--spacing--xl);padding-left:var(--wp--preset--spacing--xl)">
				<!-- wp:heading {"level":3,"fontSize":"h3","fontFamily":"fraunces"} -->
				<h3 class="wp-block-heading has-fraunces-font-family has-h-3-font-size"><?php esc_html_e( 'Kindergarten', 'cadmous' ); ?></h3>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"textColor":"muted","fontSize":"small"} -->
				<p class="has-muted-color has-text-color has-small-font-size"><?php esc_html_e( 'A nurturing first step into school life for children aged 3 and up.', 'cadmous' ); ?></p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"style":{"typography":{"fontWeight":"600"},"spacing":{"margin":{"top":"var:preset|spacing|md"}}},"textColor":"gold","fontSize":"small"} -->
				<p class="has-gold-color has-text-color has-small-font-size" style="margin-top:var(--wp--preset--spacing--md);font-weight:600"><a href="/programs/kindergarten/"><?php esc_html_e( 'Read more →', 'cadmous' ); ?></a></p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:group {"backgroundColor":"warm-white","style":{"spacing":{"padding":{"top":"var:preset|spacing|xl","right":"var:preset|spacing|xl","bottom":"var:preset|spacing|xl","left":"var:preset|spacing|xl"}},"border":{"radius":"12px"}}} -->
			<div class="wp-block-group has-warm-white-background-color has-background" style="border-radius:12px;padding-top:var(--wp--preset--spacing--xl);padding-right:var(--wp--preset--spacing--xl);padding-bottom:var(--wp--preset--spacing--xl);padding-left:var(--wp--preset--spacing--xl)">
				<!-- wp:heading {"level":3,"fontSize":"h3","fontFamily":"fraunces"} -->
				<h3 class="wp-block-heading has-fraunces-font-family has-h-3-font-size"><?php esc_html_e( 'Elementary', 'cadmous' ); ?></h3>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"textColor":"muted","fontSize":"small"} -->
				<p class="has-muted-color has-text-color has-small-font-size"><?php esc_html_e( 'Years 2 to 6 building academic foundations on the Lebanese National Curriculum.', 'cadmous' ); ?></p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"style":{"typography":{"fontWeight":"600"},"spacing":{"margin":{"top":"var:preset|spacing|md"}}},"textColor":"gold","fontSize":"small"} -->
				<p class="has-gold-color has-text-color has-small-font-size" style="margin-top:var(--wp--preset--spacing--md);font-weight:600"><a href="/programs/elementary/"><?php esc_html_e( 'Read more →', 'cadmous' ); ?></a></p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:group {"backgroundColor":"warm-white","style":{"spacing":{"padding":{"top":"var:preset|spacing|xl","right":"var:preset|spacing|xl","bottom":"var:preset|spacing|xl","left":"var:preset|spacing|xl"}},"border":{"radius":"12px"}}} -->
			<div class="wp-block-group has-warm-white-background-color has-background" style="border-radius:12px;padding-top:var(--wp--preset--spacing--xl);padding-right:var(--wp--preset--spacing--xl);padding-bottom:var(--wp--preset--spacing--xl);padding-left:var(--wp--preset--spacing--xl)">
				<!-- wp:heading {"level":3,"fontSize":"h3","fontFamily":"fraunces"} -->
				<h3 class="wp-block-heading has-fraunces-font-family has-h-3-font-size"><?php esc_html_e( 'Intermediate', 'cadmous' ); ?></h3>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"textColor":"muted","fontSize":"small"} -->
				<p class="has-muted-color has-text-color has-small-font-size"><?php esc_html_e( 'Years 7 to 9 deepening curiosity, critical thinking, and study skills.', 'cadmous' ); ?></p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"style":{"typography":{"fontWeight":"600"},"spacing":{"margin":{"top":"var:preset|spacing|md"}}},"textColor":"gold","fontSize":"small"} -->
				<p class="has-gold-color has-text-color has-small-font-size" style="margin-top:var(--wp--preset--spacing--md);font-weight:600"><a href="/programs/intermediate/"><?php esc_html_e( 'Read more →', 'cadmous' ); ?></a></p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->

	<!-- wp:columns {"style":{"spacing":{"blockGap":{"top":"var:preset|spacing|lg","left":"var:preset|spacing|lg"},"margin":{"top":"var:preset|spacing|lg"}}}} -->
	<div class="wp-block-columns" style="margin-top:var(--wp--preset--spacing--lg)">
		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:group {"backgroundColor":"warm-white","style":{"spacing":{"padding":{"top":"var:preset|spacing|xl","right":"var:preset|spacing|xl","bottom":"var:preset|spacing|xl","left":"var:preset|spacing|xl"}},"border":{"radius":"12px"}}} -->
			<div class="wp-block-group has-warm-white-background-color has-background" style="border-radius:12px;padding-top:var(--wp--preset--spacing--xl);padding-right:var(--wp--preset--spacing--xl);padding-bottom:var(--wp--preset--spacing--xl);padding-left:var(--wp--preset--spacing--xl)">
				<!-- wp:heading {"level":3,"fontSize":"h3","fontFamily":"fraunces"} -->
				<h3 class="wp-block-heading has-fraunces-font-family has-h-3-font-size"><?php esc_html_e( 'Integrative Program', 'cadmous' ); ?></h3>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"textColor":"muted","fontSize":"small"} -->
				<p class="has-muted-color has-text-color has-small-font-size"><?php esc_html_e( 'Individualized support for students with diverse learning needs across every grade.', 'cadmous' ); ?></p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"style":{"typography":{"fontWeight":"600"},"spacing":{"margin":{"top":"var:preset|spacing|md"}}},"textColor":"gold","fontSize":"small"} -->
				<p class="has-gold-color has-text-color has-small-font-size" style="margin-top:var(--wp--preset--spacing--md);font-weight:600"><a href="/programs/integrative-program/"><?php esc_html_e( 'Read more →', 'cadmous' ); ?></a></p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:group {"backgroundColor":"warm-white","style":{"spacing":{"padding":{"top":"var:preset|spacing|xl","right":"var:preset|spacing|xl","bottom":"var:preset|spacing|xl","left":"var:preset|spacing|xl"}},"border":{"radius":"12px"}}} -->
			<div class="wp-block-group has-warm-white-background-color has-background" style="border-radius:12px;padding-top:var(--wp--preset--spacing--xl);padding-right:var(--wp--preset--spacing--xl);padding-bottom:var(--wp--preset--spacing--xl);padding-left:var(--wp--preset--spacing--xl)">
				<!-- wp:heading {"level":3,"fontSize":"h3","fontFamily":"fraunces"} -->
				<h3 class="wp-block-heading has-fraunces-font-family has-h-3-font-size"><?php esc_html_e( 'Secondary Lebanese', 'cadmous' ); ?></h3>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"textColor":"muted","fontSize":"small"} -->
				<p class="has-muted-color has-text-color has-small-font-size"><?php esc_html_e( 'Lebanese Baccalaureate across General Sciences, Life Sciences, and Economics & Sociology streams.', 'cadmous' ); ?></p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"style":{"typography":{"fontWeight":"600"},"spacing":{"margin":{"top":"var:preset|spacing|md"}}},"textColor":"gold","fontSize":"small"} -->
				<p class="has-gold-color has-text-color has-small-font-size" style="margin-top:var(--wp--preset--spacing--md);font-weight:600"><a href="/programs/secondary-lebanese/"><?php esc_html_e( 'Read more →', 'cadmous' ); ?></a></p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:group {"backgroundColor":"warm-white","style":{"spacing":{"padding":{"top":"var:preset|spacing|xl","right":"var:preset|spacing|xl","bottom":"var:preset|spacing|xl","left":"var:preset|spacing|xl"}},"border":{"radius":"12px"}}} -->
			<div class="wp-block-group has-warm-white-background-color has-background" style="border-radius:12px;padding-top:var(--wp--preset--spacing--xl);padding-right:var(--wp--preset--spacing--xl);padding-bottom:var(--wp--preset--spacing--xl);padding-left:var(--wp--preset--spacing--xl)">
				<!-- wp:heading {"level":3,"fontSize":"h3","fontFamily":"fraunces"} -->
				<h3 class="wp-block-heading has-fraunces-font-family has-h-3-font-size"><?php esc_html_e( 'International Programs', 'cadmous' ); ?></h3>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"textColor":"muted","fontSize":"small"} -->
				<p class="has-muted-color has-text-color has-small-font-size"><?php esc_html_e( 'IB Diploma and Advanced Placement — the only IB World School in the Tyre area.', 'cadmous' ); ?></p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"style":{"typography":{"fontWeight":"600"},"spacing":{"margin":{"top":"var:preset|spacing|md"}}},"textColor":"gold","fontSize":"small"} -->
				<p class="has-gold-color has-text-color has-small-font-size" style="margin-top:var(--wp--preset--spacing--md);font-weight:600"><a href="/programs/international-programs/"><?php esc_html_e( 'Read more →', 'cadmous' ); ?></a></p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->
