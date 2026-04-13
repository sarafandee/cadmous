<?php
/**
 * Title: Hero — Home
 * Slug: cadmous/hero-home
 * Categories: cadmous
 * Description: Full-bleed campus photo hero with headline, subtitle, and dual CTA.
 * Keywords: hero, homepage, cover, campus, apply
 * Block Types: core/cover
 * Inserter: yes
 *
 * @package Cadmous
 */

$cadmous_campus = get_stylesheet_directory_uri() . '/assets/images/campus.jpg';
?>
<!-- wp:cover {"url":"<?php echo esc_url( $cadmous_campus ); ?>","dimRatio":55,"overlayColor":"navy","focalPoint":{"x":0.5,"y":0.4},"minHeight":640,"minHeightUnit":"px","contentPosition":"center center","align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|5xl","right":"var:preset|spacing|xl","bottom":"var:preset|spacing|5xl","left":"var:preset|spacing|xl"}}}} -->
<div class="wp-block-cover alignfull has-custom-content-position is-position-center-center" style="padding-top:var(--wp--preset--spacing--5xl);padding-right:var(--wp--preset--spacing--xl);padding-bottom:var(--wp--preset--spacing--5xl);padding-left:var(--wp--preset--spacing--xl);min-height:640px">
	<span aria-hidden="true" class="wp-block-cover__background has-navy-background-color has-background-dim-60 has-background-dim"></span>
	<img class="wp-block-cover__image-background" alt="" src="<?php echo esc_url( $cadmous_campus ); ?>" style="object-position:50% 40%" data-object-fit="cover" data-object-position="50% 40%"/>
	<div class="wp-block-cover__inner-container">
		<!-- wp:group {"layout":{"type":"constrained","contentSize":"900px"}} -->
		<div class="wp-block-group">
			<!-- wp:paragraph {"align":"center","textColor":"gold","fontSize":"small","style":{"typography":{"textTransform":"uppercase","letterSpacing":"0.15em","fontWeight":"600"}}} -->
			<p class="has-text-align-center has-gold-color has-text-color has-small-font-size" style="font-weight:600;letter-spacing:0.15em;text-transform:uppercase"><?php esc_html_e( 'IB World School · Tyre, Lebanon', 'cadmous' ); ?></p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"textAlign":"center","level":1,"textColor":"warm-white","fontSize":"hero","fontFamily":"fraunces","style":{"typography":{"lineHeight":"1.05","fontWeight":"600"},"spacing":{"margin":{"top":"var:preset|spacing|md","bottom":"var:preset|spacing|lg"}}}} -->
			<h1 class="wp-block-heading has-text-align-center has-warm-white-color has-text-color has-fraunces-font-family has-hero-font-size" style="margin-top:var(--wp--preset--spacing--md);margin-bottom:var(--wp--preset--spacing--lg);font-weight:600;line-height:1.05"><?php esc_html_e( 'Where every student is future ready', 'cadmous' ); ?></h1>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"align":"center","textColor":"warm-white","fontSize":"large","style":{"typography":{"lineHeight":"1.5"}}} -->
			<p class="has-text-align-center has-warm-white-color has-text-color has-large-font-size" style="line-height:1.5"><?php esc_html_e( 'Since 1966, Cadmous College has guided generations of learners through academic excellence and the values of the International Baccalaureate.', 'cadmous' ); ?></p>
			<!-- /wp:paragraph -->

			<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center","flexWrap":"wrap"},"style":{"spacing":{"margin":{"top":"var:preset|spacing|xl"},"blockGap":"var:preset|spacing|md"}}} -->
			<div class="wp-block-buttons" style="margin-top:var(--wp--preset--spacing--xl)">
				<!-- wp:button {"backgroundColor":"gold","textColor":"ink","style":{"border":{"radius":"12px"},"spacing":{"padding":{"top":"var:preset|spacing|md","right":"var:preset|spacing|xl","bottom":"var:preset|spacing|md","left":"var:preset|spacing|xl"}}}} -->
				<div class="wp-block-button"><a class="wp-block-button__link has-ink-color has-gold-background-color has-text-color has-background wp-element-button" href="/admissions/apply/" style="border-radius:12px;padding-top:var(--wp--preset--spacing--md);padding-right:var(--wp--preset--spacing--xl);padding-bottom:var(--wp--preset--spacing--md);padding-left:var(--wp--preset--spacing--xl)"><?php esc_html_e( 'Apply Now', 'cadmous' ); ?></a></div>
				<!-- /wp:button -->

				<!-- wp:button {"textColor":"warm-white","className":"is-style-outline","style":{"border":{"radius":"12px","width":"2px"},"spacing":{"padding":{"top":"var:preset|spacing|md","right":"var:preset|spacing|xl","bottom":"var:preset|spacing|md","left":"var:preset|spacing|xl"}}}} -->
				<div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-warm-white-color has-text-color wp-element-button" href="/admissions/requirements/" style="border-width:2px;border-radius:12px;padding-top:var(--wp--preset--spacing--md);padding-right:var(--wp--preset--spacing--xl);padding-bottom:var(--wp--preset--spacing--md);padding-left:var(--wp--preset--spacing--xl)"><?php esc_html_e( 'Schedule Visit', 'cadmous' ); ?></a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:group -->
	</div>
</div>
<!-- /wp:cover -->
