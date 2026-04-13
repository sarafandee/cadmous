<?php
/**
 * Title: Footer Contact Strip
 * Slug: cadmous/footer-contact-strip
 * Categories: cadmous
 * Description: 4-column footer with about/logo, quick links, academics, and contact info on navy background.
 * Keywords: footer, contact, links, address
 * Inserter: yes
 *
 * @package Cadmous
 */

$cadmous_logo = get_stylesheet_directory_uri() . '/assets/images/logo.png';
?>
<!-- wp:group {"align":"full","backgroundColor":"navy","textColor":"warm-white","style":{"spacing":{"padding":{"top":"var:preset|spacing|4xl","right":"var:preset|spacing|xl","bottom":"var:preset|spacing|xl","left":"var:preset|spacing|xl"}}},"layout":{"type":"constrained","contentSize":"1280px"}} -->
<div class="wp-block-group alignfull has-warm-white-color has-navy-background-color has-text-color has-background" style="padding-top:var(--wp--preset--spacing--4xl);padding-right:var(--wp--preset--spacing--xl);padding-bottom:var(--wp--preset--spacing--xl);padding-left:var(--wp--preset--spacing--xl)">
	<!-- wp:columns {"style":{"spacing":{"blockGap":{"top":"var:preset|spacing|xl","left":"var:preset|spacing|2xl"}}}} -->
	<div class="wp-block-columns">
		<!-- wp:column {"width":"30%"} -->
		<div class="wp-block-column" style="flex-basis:30%">
			<!-- wp:image {"width":"160px","sizeSlug":"thumbnail"} -->
			<figure class="wp-block-image size-thumbnail is-resized"><img src="<?php echo esc_url( $cadmous_logo ); ?>" alt="<?php esc_attr_e( 'Cadmous College', 'cadmous' ); ?>" style="width:160px"/></figure>
			<!-- /wp:image -->

			<!-- wp:paragraph {"fontSize":"small","style":{"spacing":{"margin":{"top":"var:preset|spacing|md"}},"typography":{"lineHeight":"1.6"}}} -->
			<p class="has-small-font-size" style="margin-top:var(--wp--preset--spacing--md);line-height:1.6"><?php esc_html_e( 'An IB World School in Southern Lebanon — dedicated to developing knowledgeable, caring, and principled young people since 1966.', 'cadmous' ); ?></p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:heading {"level":4,"textColor":"gold","fontSize":"small","style":{"typography":{"textTransform":"uppercase","letterSpacing":"0.15em","fontWeight":"600"}}} -->
			<h4 class="wp-block-heading has-gold-color has-text-color has-small-font-size" style="font-weight:600;letter-spacing:0.15em;text-transform:uppercase"><?php esc_html_e( 'Quick Links', 'cadmous' ); ?></h4>
			<!-- /wp:heading -->

			<!-- wp:list {"fontSize":"small","style":{"typography":{"lineHeight":"2"},"spacing":{"margin":{"top":"var:preset|spacing|md"}}},"className":"is-style-none"} -->
			<ul class="is-style-none has-small-font-size" style="margin-top:var(--wp--preset--spacing--md);line-height:2">
				<!-- wp:list-item --><li><a href="/about-us/"><?php esc_html_e( 'About Us', 'cadmous' ); ?></a></li><!-- /wp:list-item -->
				<!-- wp:list-item --><li><a href="/admissions/"><?php esc_html_e( 'Admissions', 'cadmous' ); ?></a></li><!-- /wp:list-item -->
				<!-- wp:list-item --><li><a href="/news/"><?php esc_html_e( 'News', 'cadmous' ); ?></a></li><!-- /wp:list-item -->
				<!-- wp:list-item --><li><a href="/events/"><?php esc_html_e( 'Events', 'cadmous' ); ?></a></li><!-- /wp:list-item -->
				<!-- wp:list-item --><li><a href="/contact/"><?php esc_html_e( 'Contact', 'cadmous' ); ?></a></li><!-- /wp:list-item -->
			</ul>
			<!-- /wp:list -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:heading {"level":4,"textColor":"gold","fontSize":"small","style":{"typography":{"textTransform":"uppercase","letterSpacing":"0.15em","fontWeight":"600"}}} -->
			<h4 class="wp-block-heading has-gold-color has-text-color has-small-font-size" style="font-weight:600;letter-spacing:0.15em;text-transform:uppercase"><?php esc_html_e( 'Academics', 'cadmous' ); ?></h4>
			<!-- /wp:heading -->

			<!-- wp:list {"fontSize":"small","style":{"typography":{"lineHeight":"2"},"spacing":{"margin":{"top":"var:preset|spacing|md"}}},"className":"is-style-none"} -->
			<ul class="is-style-none has-small-font-size" style="margin-top:var(--wp--preset--spacing--md);line-height:2">
				<!-- wp:list-item --><li><a href="/programs/kindergarten/"><?php esc_html_e( 'Kindergarten', 'cadmous' ); ?></a></li><!-- /wp:list-item -->
				<!-- wp:list-item --><li><a href="/programs/elementary/"><?php esc_html_e( 'Elementary', 'cadmous' ); ?></a></li><!-- /wp:list-item -->
				<!-- wp:list-item --><li><a href="/programs/intermediate/"><?php esc_html_e( 'Intermediate', 'cadmous' ); ?></a></li><!-- /wp:list-item -->
				<!-- wp:list-item --><li><a href="/programs/secondary-lebanese/"><?php esc_html_e( 'Secondary Lebanese', 'cadmous' ); ?></a></li><!-- /wp:list-item -->
				<!-- wp:list-item --><li><a href="/programs/international-programs/"><?php esc_html_e( 'International Programs', 'cadmous' ); ?></a></li><!-- /wp:list-item -->
			</ul>
			<!-- /wp:list -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:heading {"level":4,"textColor":"gold","fontSize":"small","style":{"typography":{"textTransform":"uppercase","letterSpacing":"0.15em","fontWeight":"600"}}} -->
			<h4 class="wp-block-heading has-gold-color has-text-color has-small-font-size" style="font-weight:600;letter-spacing:0.15em;text-transform:uppercase"><?php esc_html_e( 'Contact', 'cadmous' ); ?></h4>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"fontSize":"small","style":{"spacing":{"margin":{"top":"var:preset|spacing|md"}},"typography":{"lineHeight":"1.6"}}} -->
			<p class="has-small-font-size" style="margin-top:var(--wp--preset--spacing--md);line-height:1.6">
				<?php esc_html_e( 'Jwar al Nakhel, Tyre, Lebanon', 'cadmous' ); ?><br>
				<?php esc_html_e( '+961 7 349 038', 'cadmous' ); ?><br>
				<a href="mailto:info@cadmous.edu.lb">info@cadmous.edu.lb</a>
			</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->

	<!-- wp:separator {"backgroundColor":"border","style":{"spacing":{"margin":{"top":"var:preset|spacing|xl","bottom":"var:preset|spacing|md"}}}} -->
	<hr class="wp-block-separator has-text-color has-border-background-color has-alpha-channel-opacity has-background" style="margin-top:var(--wp--preset--spacing--xl);margin-bottom:var(--wp--preset--spacing--md)"/>
	<!-- /wp:separator -->

	<!-- wp:paragraph {"align":"center","fontSize":"caption"} -->
	<p class="has-text-align-center has-caption-font-size">© <?php echo esc_html( (string) gmdate( 'Y' ) ); ?> <?php esc_html_e( 'Cadmous College. All rights reserved.', 'cadmous' ); ?></p>
	<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
