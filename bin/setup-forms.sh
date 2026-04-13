#!/usr/bin/env bash
#
# bin/setup-forms.sh — create 3 Cadmous application forms (EN / FR / AR)
# via Fluent Forms, plus 3 Polylang-tagged pages that embed them.
#
# Idempotent: checks for existing forms by title before creating.
#
# Run after bin/bootstrap.sh (Fluent Forms active) and bin/setup-polylang.sh
# (languages exist).

set -euo pipefail
cd "$(dirname "$0")/.."

WP="docker compose exec -u www-data wordpress wp"

if ! $WP plugin is-active fluentform 2>/dev/null; then
	echo "[forms] Fluent Forms is not active. Run bin/bootstrap.sh first." >&2
	exit 1
fi

$WP eval '
	global $wpdb;
	$forms_table = $wpdb->prefix . "fluentform_forms";

	// Shared field definition. One master schema, cloned per language.
	$make_form_fields = function( array $labels ) {
		return array(
			"fields" => array(
				array(
					"element"     => "section_break",
					"attributes"  => array( "name" => "student_info_section" ),
					"settings"    => array(
						"label"       => $labels["student_info"],
						"description" => "",
						"align"       => "left",
					),
					"editor_options" => array( "title" => "Section 1 — Student Information", "icon_class" => "" ),
				),
				array(
					"element"     => "input_text",
					"attributes"  => array(
						"type"        => "text",
						"name"        => "student_full_name",
						"required"    => true,
						"placeholder" => $labels["student_name"],
					),
					"settings"    => array(
						"label"          => $labels["student_name"],
						"container_class" => "",
						"label_placement" => "top",
					),
				),
				array(
					"element"     => "input_date",
					"attributes"  => array(
						"type"     => "date",
						"name"     => "date_of_birth",
						"required" => true,
					),
					"settings"    => array( "label" => $labels["dob"], "label_placement" => "top" ),
				),
				array(
					"element"     => "select",
					"attributes"  => array(
						"name"     => "grade_level",
						"required" => true,
					),
					"settings"    => array(
						"label"           => $labels["grade"],
						"label_placement" => "top",
						"placeholder"     => $labels["select_placeholder"],
						"advanced_options" => array(
							array( "label" => "KG 1", "value" => "kg1" ),
							array( "label" => "KG 2", "value" => "kg2" ),
							array( "label" => "KG 3", "value" => "kg3" ),
							array( "label" => "Year 1", "value" => "year1" ),
							array( "label" => "Year 2-6 (Elementary)", "value" => "elementary" ),
							array( "label" => "Year 7-9 (Intermediate)", "value" => "intermediate" ),
							array( "label" => "Year 10-12 (Secondary)", "value" => "secondary" ),
							array( "label" => "IB Diploma", "value" => "ib" ),
						),
					),
				),
				array(
					"element"     => "select",
					"attributes"  => array( "name" => "division", "required" => true ),
					"settings"    => array(
						"label"           => $labels["division"],
						"label_placement" => "top",
						"placeholder"     => $labels["select_placeholder"],
						"advanced_options" => array(
							array( "label" => "Lebanese Program", "value" => "lebanese" ),
							array( "label" => "International Program (IB)", "value" => "international" ),
							array( "label" => "Integrative Program", "value" => "integrative" ),
						),
					),
				),
				array(
					"element"     => "input_text",
					"attributes"  => array( "type" => "text", "name" => "previous_school" ),
					"settings"    => array( "label" => $labels["previous_school"], "label_placement" => "top" ),
				),
				array(
					"element"     => "section_break",
					"attributes"  => array( "name" => "parent_section" ),
					"settings"    => array( "label" => $labels["parent_section"], "description" => "", "align" => "left" ),
				),
				array(
					"element"     => "input_text",
					"attributes"  => array( "type" => "text", "name" => "parent_full_name", "required" => true ),
					"settings"    => array( "label" => $labels["parent_name"], "label_placement" => "top" ),
				),
				array(
					"element"     => "input_email",
					"attributes"  => array( "type" => "email", "name" => "parent_email", "required" => true ),
					"settings"    => array( "label" => $labels["email"], "label_placement" => "top" ),
				),
				array(
					"element"     => "phone",
					"attributes"  => array( "name" => "parent_phone", "required" => true ),
					"settings"    => array( "label" => $labels["phone"], "label_placement" => "top" ),
				),
				array(
					"element"     => "textarea",
					"attributes"  => array( "name" => "address" ),
					"settings"    => array( "label" => $labels["address"], "label_placement" => "top", "rows" => 3 ),
				),
				array(
					"element"     => "textarea",
					"attributes"  => array( "name" => "notes" ),
					"settings"    => array( "label" => $labels["notes"], "label_placement" => "top", "rows" => 4 ),
				),
				array(
					"element"     => "button",
					"attributes"  => array( "type" => "submit", "name" => "submit" ),
					"settings"    => array(
						"button_style" => "default",
						"button_size"  => "lg",
						"button_ui"    => array( "text" => $labels["submit"] ),
					),
				),
			),
			"submitButton" => array(
				"uniqElKey"    => "submit",
				"element"      => "button",
				"attributes"   => array( "type" => "submit", "name" => "submit" ),
				"settings"     => array(
					"button_ui" => array( "text" => $labels["submit"] ),
					"button_style" => "default",
					"button_size"  => "lg",
				),
			),
		);
	};

	$languages = array(
		"en" => array(
			"title"              => "Application Form — English",
			"student_info"       => "Student Information",
			"student_name"       => "Student Full Name",
			"dob"                => "Date of Birth",
			"grade"              => "Grade Level",
			"division"           => "Division",
			"previous_school"    => "Previous School",
			"parent_section"     => "Parent / Guardian",
			"parent_name"        => "Parent Full Name",
			"email"              => "Email",
			"phone"              => "Phone",
			"address"            => "Address",
			"notes"              => "Additional Notes",
			"select_placeholder" => "— select —",
			"submit"             => "Submit Application",
		),
		"fr" => array(
			"title"              => "Formulaire de candidature — Français",
			"student_info"       => "Informations sur l élève",
			"student_name"       => "Nom complet de l élève",
			"dob"                => "Date de naissance",
			"grade"              => "Niveau scolaire",
			"division"           => "Section",
			"previous_school"    => "École précédente",
			"parent_section"     => "Parent / Tuteur",
			"parent_name"        => "Nom complet du parent",
			"email"              => "Courriel",
			"phone"              => "Téléphone",
			"address"            => "Adresse",
			"notes"              => "Notes supplémentaires",
			"select_placeholder" => "— sélectionner —",
			"submit"             => "Envoyer la candidature",
		),
		"ar" => array(
			"title"              => "استمارة التقديم — العربية",
			"student_info"       => "معلومات الطالب",
			"student_name"       => "الاسم الكامل للطالب",
			"dob"                => "تاريخ الميلاد",
			"grade"              => "المرحلة الدراسية",
			"division"           => "القسم",
			"previous_school"    => "المدرسة السابقة",
			"parent_section"     => "ولي الأمر",
			"parent_name"        => "الاسم الكامل لولي الأمر",
			"email"              => "البريد الإلكتروني",
			"phone"              => "رقم الهاتف",
			"address"            => "العنوان",
			"notes"              => "ملاحظات إضافية",
			"select_placeholder" => "— اختر —",
			"submit"             => "إرسال الطلب",
		),
	);

	foreach ( $languages as $lang => $labels ) {
		// Skip if a form with this title already exists.
		$existing = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT id FROM {$wpdb->prefix}fluentform_forms WHERE title = %s LIMIT 1",
				$labels["title"]
			)
		);
		if ( $existing ) {
			WP_CLI::log( "form already exists for $lang: id=$existing" );
			$form_id = (int) $existing;
		} else {
			$form_fields = $make_form_fields( $labels );
			$form_meta   = array(
				"confirmationMessage" => "Thank you for your application. Our admissions team will be in touch within 3-5 business days.",
			);

			$insert = $wpdb->insert(
				$wpdb->prefix . "fluentform_forms",
				array(
					"title"        => $labels["title"],
					"status"       => "published",
					"form_fields"  => wp_json_encode( $form_fields ),
					"has_payment"  => 0,
					"type"         => "form",
					"conditions"   => "",
					"appearance_settings" => "",
					"created_by"   => 1,
					"created_at"   => current_time( "mysql" ),
					"updated_at"   => current_time( "mysql" ),
				)
			);
			if ( ! $insert ) {
				WP_CLI::warning( "failed to create form for $lang: " . $wpdb->last_error );
				continue;
			}
			$form_id = (int) $wpdb->insert_id;

			// Notification: route to admissions@cadmous.edu.lb
			$wpdb->insert(
				$wpdb->prefix . "fluentform_form_meta",
				array(
					"form_id"  => $form_id,
					"meta_key" => "notifications",
					"value"    => wp_json_encode( array(
						array(
							"sendTo"      => array( "type" => "email", "email" => "admissions@cadmous.edu.lb" ),
							"enabled"     => true,
							"name"        => "Admissions Notification — " . strtoupper( $lang ),
							"subject"     => "New application — {inputs.student_full_name}",
							"to"          => "admissions@cadmous.edu.lb",
							"replyTo"     => "{inputs.parent_email}",
							"message"     => "A new application has been submitted.\n\nStudent: {inputs.student_full_name}\nDOB: {inputs.date_of_birth}\nGrade: {inputs.grade_level}\nDivision: {inputs.division}\nPrevious School: {inputs.previous_school}\n\nParent: {inputs.parent_full_name}\n{inputs.parent_email}\n{inputs.parent_phone}\n{inputs.address}\n\nNotes:\n{inputs.notes}",
							"fromName"    => "Cadmous College",
							"fromEmail"   => "noreply@cadmous.edu.lb",
						),
					) ),
				)
			);

			WP_CLI::success( "created form for $lang: id=$form_id" );
		}

		// Create (or find) the embed page for this language.
		$page_slug = ( "en" === $lang ) ? "admissions-apply" : "$lang-admissions-apply";
		$existing_page = get_posts( array(
			"post_type"   => "page",
			"name"        => $page_slug,
			"post_status" => "publish",
			"numberposts" => 1,
		) );

		$shortcode = "<!-- wp:shortcode -->[fluentform id=\"{$form_id}\"]<!-- /wp:shortcode -->";
		$page_titles = array(
			"en" => "Apply Now",
			"fr" => "Postuler",
			"ar" => "قدم الآن",
		);

		if ( $existing_page ) {
			$page_id = (int) $existing_page[0]->ID;
			WP_CLI::log( "page already exists: $page_slug (id=$page_id)" );
		} else {
			$page_id = wp_insert_post( array(
				"post_title"   => $page_titles[ $lang ],
				"post_name"    => $page_slug,
				"post_content" => $shortcode,
				"post_status"  => "publish",
				"post_type"    => "page",
			) );
			if ( is_wp_error( $page_id ) ) {
				WP_CLI::warning( "failed to create page for $lang: " . $page_id->get_error_message() );
				continue;
			}
			WP_CLI::success( "created page for $lang: $page_slug (id=$page_id)" );
		}

		// Tag the page with Polylang language if Polylang is active.
		if ( function_exists( "pll_set_post_language" ) ) {
			pll_set_post_language( $page_id, $lang );
		}
	}
'

echo "[forms] done."
