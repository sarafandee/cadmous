<?php
/**
 * Cadmous admin branding.
 *
 * Makes the wp-admin environment feel like a bespoke tool for the school
 * instead of generic WordPress: custom color scheme, login logo,
 * welcome dashboard widget with quick links, and branded admin footer.
 *
 * @package Cadmous
 */

defined( 'ABSPATH' ) || exit;

/**
 * Register a Cadmous-branded admin color scheme (navy + gold).
 *
 * @since 0.1.0
 *
 * @return void
 */
function cadmous_register_admin_color_scheme() {
	wp_admin_css_color(
		'cadmous',
		_x( 'Cadmous', 'admin color scheme', 'cadmous' ),
		admin_url( 'css/colors/modern/colors.min.css' ),
		array( '#1B365D', '#C4933F', '#FAFAF7', '#F0EDE6' ),
		array(
			'base'    => '#FAFAF7',
			'focus'   => '#C4933F',
			'current' => '#C4933F',
		)
	);
}
add_action( 'admin_init', 'cadmous_register_admin_color_scheme' );

/**
 * Force the Cadmous admin color scheme as the default for every user.
 *
 * Users can still pick another scheme in Profile → Admin Color Scheme,
 * but they'll see Cadmous first-run.
 *
 * @since 0.1.0
 *
 * @param mixed $color Existing user color preference.
 * @return string
 */
function cadmous_default_admin_color( $color ) {
	if ( empty( $color ) || 'fresh' === $color ) {
		return 'cadmous';
	}
	return (string) $color;
}
add_filter( 'get_user_option_admin_color', 'cadmous_default_admin_color' );

/**
 * Enqueue the branded login stylesheet.
 *
 * @since 0.1.0
 *
 * @return void
 */
function cadmous_login_enqueue() {
	wp_enqueue_style(
		'cadmous-login',
		get_stylesheet_directory_uri() . '/assets/admin/login.css',
		array(),
		(string) filemtime( get_stylesheet_directory() . '/assets/admin/login.css' )
	);
}
add_action( 'login_enqueue_scripts', 'cadmous_login_enqueue' );

/**
 * Send the login logo link back to the site home rather than wordpress.org.
 *
 * @since 0.1.0
 *
 * @return string
 */
function cadmous_login_header_url() {
	return home_url( '/' );
}
add_filter( 'login_headerurl', 'cadmous_login_header_url' );

/**
 * Login logo alt text / title.
 *
 * @since 0.1.0
 *
 * @return string
 */
function cadmous_login_header_text() {
	return esc_html__( 'Cadmous College', 'cadmous' );
}
add_filter( 'login_headertext', 'cadmous_login_header_text' );

/**
 * Register the Cadmous welcome dashboard widget.
 *
 * @since 0.1.0
 *
 * @return void
 */
function cadmous_register_dashboard_widget() {
	wp_add_dashboard_widget(
		'cadmous_welcome',
		esc_html__( 'Welcome to Cadmous Admin', 'cadmous' ),
		'cadmous_render_dashboard_widget'
	);
}
add_action( 'wp_dashboard_setup', 'cadmous_register_dashboard_widget' );

/**
 * Render the Cadmous welcome dashboard widget.
 *
 * @since 0.1.0
 *
 * @return void
 */
function cadmous_render_dashboard_widget() {
	$links = array(
		array(
			'url'   => admin_url( 'post-new.php?post_type=cadmous_news' ),
			'label' => __( '+ Add News Article', 'cadmous' ),
			'desc'  => __( 'Publish an announcement or news item.', 'cadmous' ),
		),
		array(
			'url'   => admin_url( 'edit.php?post_type=tribe_events' ),
			'label' => __( '+ Add Event', 'cadmous' ),
			'desc'  => __( 'Schedule an event on the school calendar.', 'cadmous' ),
		),
		array(
			'url'   => admin_url( 'site-editor.php?postType=wp_template&postId=cadmous%2F%2Ffront-page' ),
			'label' => __( 'Edit Homepage', 'cadmous' ),
			'desc'  => __( 'Change hero, divisions, or CTA sections.', 'cadmous' ),
		),
		array(
			'url'   => home_url( '/' ),
			'label' => __( 'View Site', 'cadmous' ),
			'desc'  => __( 'Open the front-end in a new tab.', 'cadmous' ),
		),
	);
	?>
	<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
		<?php foreach ( $links as $link ) : ?>
			<a href="<?php echo esc_url( $link['url'] ); ?>" style="display:block;padding:16px;background:#F0EDE6;border-radius:8px;text-decoration:none;color:#1A1A1A;border-left:3px solid #C4933F;">
				<strong style="color:#1B365D;"><?php echo esc_html( $link['label'] ); ?></strong>
				<br>
				<span style="font-size:12px;color:#6B7280;"><?php echo esc_html( $link['desc'] ); ?></span>
			</a>
		<?php endforeach; ?>
	</div>

	<p style="margin-top:20px;padding-top:16px;border-top:1px solid #E5E1D8;">
		<strong><?php esc_html_e( 'Need help?', 'cadmous' ); ?></strong><br>
		<a href="https://wordpress.org/support/article/wordpress-editor/" target="_blank" rel="noopener"><?php esc_html_e( 'How to edit a page', 'cadmous' ); ?></a> ·
		<a href="https://wordpress.org/support/article/inserting-images-into-posts-and-pages/" target="_blank" rel="noopener"><?php esc_html_e( 'How to add images', 'cadmous' ); ?></a> ·
		<a href="https://wordpress.org/support/article/writing-posts/" target="_blank" rel="noopener"><?php esc_html_e( 'How to publish a news article', 'cadmous' ); ?></a>
	</p>
	<?php
}

/**
 * Custom admin footer text.
 *
 * @since 0.1.0
 *
 * @return string
 */
function cadmous_admin_footer_text() {
	return esc_html__( 'Cadmous College — built with care, 2026', 'cadmous' );
}
add_filter( 'admin_footer_text', 'cadmous_admin_footer_text' );

/**
 * Remove the WordPress version from the admin footer (security + branding).
 *
 * @since 0.1.0
 *
 * @return string
 */
function cadmous_admin_footer_version() {
	return '';
}
add_filter( 'update_footer', 'cadmous_admin_footer_version', PHP_INT_MAX );
