<?php
/**
 * Title: News Strip
 * Slug: cadmous/news-strip
 * Categories: cadmous
 * Description: 3-column strip of the latest News CPT posts with featured image, title, and date.
 * Keywords: news, posts, query, latest, strip
 * Block Types: core/query
 * Inserter: yes
 *
 * @package Cadmous
 */

?>
<!-- wp:group {"align":"full","backgroundColor":"warm-white","style":{"spacing":{"padding":{"top":"var:preset|spacing|4xl","right":"var:preset|spacing|xl","bottom":"var:preset|spacing|4xl","left":"var:preset|spacing|xl"}}},"layout":{"type":"constrained","contentSize":"1280px"}} -->
<div class="wp-block-group alignfull has-warm-white-background-color has-background" style="padding-top:var(--wp--preset--spacing--4xl);padding-right:var(--wp--preset--spacing--xl);padding-bottom:var(--wp--preset--spacing--4xl);padding-left:var(--wp--preset--spacing--xl)">
	<!-- wp:group {"layout":{"type":"flex","justifyContent":"space-between","flexWrap":"wrap"}} -->
	<div class="wp-block-group">
		<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|xs"}}} -->
		<div class="wp-block-group">
			<!-- wp:paragraph {"textColor":"gold","fontSize":"small","style":{"typography":{"textTransform":"uppercase","letterSpacing":"0.15em","fontWeight":"600"}}} -->
			<p class="has-gold-color has-text-color has-small-font-size" style="font-weight:600;letter-spacing:0.15em;text-transform:uppercase"><?php esc_html_e( 'News &amp; Updates', 'cadmous' ); ?></p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":2,"fontSize":"h1","fontFamily":"fraunces"} -->
			<h2 class="wp-block-heading has-fraunces-font-family has-h-1-font-size"><?php esc_html_e( "What's happening at Cadmous", 'cadmous' ); ?></h2>
			<!-- /wp:heading -->
		</div>
		<!-- /wp:group -->

		<!-- wp:paragraph {"textColor":"navy","fontSize":"small","style":{"typography":{"fontWeight":"600"}}} -->
		<p class="has-navy-color has-text-color has-small-font-size" style="font-weight:600"><a href="/news/"><?php esc_html_e( 'View all →', 'cadmous' ); ?></a></p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->

	<!-- wp:spacer {"height":"var:preset|spacing|xl"} -->
	<div style="height:var(--wp--preset--spacing--xl)" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->

	<!-- wp:query {"queryId":0,"query":{"perPage":"3","pages":0,"offset":0,"postType":"cadmous_news","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false},"displayLayout":{"type":"flex","columns":3}} -->
	<div class="wp-block-query">
		<!-- wp:post-template {"style":{"spacing":{"blockGap":"var:preset|spacing|lg"}}} -->
			<!-- wp:group {"style":{"border":{"radius":"12px"},"spacing":{"padding":{"bottom":"var:preset|spacing|lg"}}},"backgroundColor":"cream"} -->
			<div class="wp-block-group has-cream-background-color has-background" style="border-radius:12px;padding-bottom:var(--wp--preset--spacing--lg)">
				<!-- wp:post-featured-image {"isLink":true,"aspectRatio":"16/9","style":{"border":{"radius":{"topLeft":"12px","topRight":"12px"}}}} /-->

				<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|lg","right":"var:preset|spacing|lg","bottom":"0","left":"var:preset|spacing|lg"}}}} -->
				<div class="wp-block-group" style="padding-top:var(--wp--preset--spacing--lg);padding-right:var(--wp--preset--spacing--lg);padding-bottom:0;padding-left:var(--wp--preset--spacing--lg)">
					<!-- wp:post-date {"textColor":"muted","fontSize":"small"} /-->

					<!-- wp:post-title {"level":3,"isLink":true,"fontSize":"h3","fontFamily":"fraunces","style":{"spacing":{"margin":{"top":"var:preset|spacing|sm"}}}} /-->

					<!-- wp:post-excerpt {"textColor":"muted","fontSize":"small","excerptLength":24} /-->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:group -->
		<!-- /wp:post-template -->

		<!-- wp:query-no-results -->
			<!-- wp:paragraph {"align":"center","textColor":"muted"} -->
			<p class="has-text-align-center has-muted-color has-text-color"><?php esc_html_e( 'News will appear here once published.', 'cadmous' ); ?></p>
			<!-- /wp:paragraph -->
		<!-- /wp:query-no-results -->
	</div>
	<!-- /wp:query -->
</div>
<!-- /wp:group -->
