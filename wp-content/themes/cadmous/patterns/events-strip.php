<?php
/**
 * Title: Events Strip
 * Slug: cadmous/events-strip
 * Categories: cadmous
 * Description: 3-column strip of upcoming events. Placeholder until The Events Calendar plugin is installed (CAD-13).
 * Keywords: events, calendar, upcoming, strip
 * Inserter: yes
 *
 * @package Cadmous
 */

?>
<!-- wp:group {"align":"full","backgroundColor":"cream","style":{"spacing":{"padding":{"top":"var:preset|spacing|4xl","right":"var:preset|spacing|xl","bottom":"var:preset|spacing|4xl","left":"var:preset|spacing|xl"}}},"layout":{"type":"constrained","contentSize":"1280px"}} -->
<div class="wp-block-group alignfull has-cream-background-color has-background" style="padding-top:var(--wp--preset--spacing--4xl);padding-right:var(--wp--preset--spacing--xl);padding-bottom:var(--wp--preset--spacing--4xl);padding-left:var(--wp--preset--spacing--xl)">
	<!-- wp:group {"layout":{"type":"flex","justifyContent":"space-between","flexWrap":"wrap"}} -->
	<div class="wp-block-group">
		<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|xs"}}} -->
		<div class="wp-block-group">
			<!-- wp:paragraph {"textColor":"gold","fontSize":"small","style":{"typography":{"textTransform":"uppercase","letterSpacing":"0.15em","fontWeight":"600"}}} -->
			<p class="has-gold-color has-text-color has-small-font-size" style="font-weight:600;letter-spacing:0.15em;text-transform:uppercase"><?php esc_html_e( 'Upcoming Events', 'cadmous' ); ?></p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":2,"fontSize":"h1","fontFamily":"fraunces"} -->
			<h2 class="wp-block-heading has-fraunces-font-family has-h-1-font-size"><?php esc_html_e( 'Come visit the campus', 'cadmous' ); ?></h2>
			<!-- /wp:heading -->
		</div>
		<!-- /wp:group -->

		<!-- wp:paragraph {"textColor":"navy","fontSize":"small","style":{"typography":{"fontWeight":"600"}}} -->
		<p class="has-navy-color has-text-color has-small-font-size" style="font-weight:600"><a href="/events/"><?php esc_html_e( 'View all →', 'cadmous' ); ?></a></p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->

	<!-- wp:spacer {"height":"var:preset|spacing|xl"} -->
	<div style="height:var(--wp--preset--spacing--xl)" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->

	<!-- wp:group {"style":{"border":{"radius":"12px","width":"1px","color":"var:preset|color|border","style":"dashed"},"spacing":{"padding":{"top":"var:preset|spacing|3xl","right":"var:preset|spacing|xl","bottom":"var:preset|spacing|3xl","left":"var:preset|spacing|xl"}}}} -->
	<div class="wp-block-group has-border-color" style="border-color:var(--wp--preset--color--border);border-style:dashed;border-width:1px;border-radius:12px;padding-top:var(--wp--preset--spacing--3xl);padding-right:var(--wp--preset--spacing--xl);padding-bottom:var(--wp--preset--spacing--3xl);padding-left:var(--wp--preset--spacing--xl)">
		<!-- wp:paragraph {"align":"center","textColor":"muted","fontSize":"body"} -->
		<p class="has-text-align-center has-muted-color has-text-color has-body-font-size"><?php esc_html_e( 'Events will appear here once added from the Events admin panel.', 'cadmous' ); ?></p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
