<?php
/**
 * Title: CTA Banner
 * Slug: cadmous/cta-banner
 * Categories: cadmous
 * Description: Full-width navy call-to-action banner with headline and dual buttons.
 * Keywords: cta, banner, apply, contact
 * Inserter: yes
 *
 * @package Cadmous
 */

?>
<!-- wp:group {"align":"full","backgroundColor":"navy","textColor":"warm-white","style":{"spacing":{"padding":{"top":"var:preset|spacing|4xl","right":"var:preset|spacing|xl","bottom":"var:preset|spacing|4xl","left":"var:preset|spacing|xl"}}},"layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group alignfull has-warm-white-color has-navy-background-color has-text-color has-background" style="padding-top:var(--wp--preset--spacing--4xl);padding-right:var(--wp--preset--spacing--xl);padding-bottom:var(--wp--preset--spacing--4xl);padding-left:var(--wp--preset--spacing--xl)">
	<!-- wp:paragraph {"align":"center","textColor":"gold","fontSize":"small","style":{"typography":{"textTransform":"uppercase","letterSpacing":"0.15em","fontWeight":"600"}}} -->
	<p class="has-text-align-center has-gold-color has-text-color has-small-font-size" style="font-weight:600;letter-spacing:0.15em;text-transform:uppercase"><?php esc_html_e( 'Admissions Open', 'cadmous' ); ?></p>
	<!-- /wp:paragraph -->

	<!-- wp:heading {"textAlign":"center","level":2,"fontSize":"h1","fontFamily":"fraunces","style":{"spacing":{"margin":{"top":"var:preset|spacing|md","bottom":"var:preset|spacing|md"}}}} -->
	<h2 class="wp-block-heading has-text-align-center has-fraunces-font-family has-h-1-font-size" style="margin-top:var(--wp--preset--spacing--md);margin-bottom:var(--wp--preset--spacing--md)"><?php esc_html_e( "Begin your child's journey at Cadmous", 'cadmous' ); ?></h2>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"align":"center","fontSize":"large"} -->
	<p class="has-text-align-center has-large-font-size"><?php esc_html_e( 'Join a community of students dedicated to the love of learning and to becoming lifelong global citizens.', 'cadmous' ); ?></p>
	<!-- /wp:paragraph -->

	<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center","flexWrap":"wrap"},"style":{"spacing":{"margin":{"top":"var:preset|spacing|xl"},"blockGap":"var:preset|spacing|md"}}} -->
	<div class="wp-block-buttons" style="margin-top:var(--wp--preset--spacing--xl)">
		<!-- wp:button {"backgroundColor":"gold","textColor":"ink","style":{"border":{"radius":"12px"}}} -->
		<div class="wp-block-button"><a class="wp-block-button__link has-ink-color has-gold-background-color has-text-color has-background wp-element-button" href="/admissions/apply/" style="border-radius:12px"><?php esc_html_e( 'Apply Now', 'cadmous' ); ?></a></div>
		<!-- /wp:button -->

		<!-- wp:button {"textColor":"warm-white","className":"is-style-outline","style":{"border":{"radius":"12px","width":"2px"}}} -->
		<div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-warm-white-color has-text-color wp-element-button" href="/contact/" style="border-width:2px;border-radius:12px"><?php esc_html_e( 'Contact Us', 'cadmous' ); ?></a></div>
		<!-- /wp:button -->
	</div>
	<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
