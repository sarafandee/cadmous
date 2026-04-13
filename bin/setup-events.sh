#!/usr/bin/env bash
#
# bin/setup-events.sh — configure The Events Calendar defaults + seed 3
# sample events, a venue, and an organizer.
#
# Idempotent: checks for existing content by post_title before creating.

set -euo pipefail
cd "$(dirname "$0")/.."

WP="docker compose exec -u www-data wordpress wp"

if ! $WP plugin is-active the-events-calendar 2>/dev/null; then
	echo "[events] The Events Calendar is not active. Run bin/bootstrap.sh first." >&2
	exit 1
fi

# Plugin settings — stored in the tribe_events_calendar_options option.
$WP eval '
	$opts = (array) get_option( "tribe_events_calendar_options", array() );
	$opts["dateTimeSeparator"]    = " @ ";
	$opts["timeRangeSeparator"]   = " - ";
	$opts["dateWithYearFormat"]   = "j F Y";
	$opts["dateWithoutYearFormat"] = "j F";
	$opts["multiDayCutoff"]       = "00:00";
	$opts["timezone_string"]      = "Asia/Beirut";
	$opts["week_start_day"]       = 1; // Monday
	$opts["schemaVersion"]        = get_option( "schemaVersion", "1.0.0" );
	update_option( "tribe_events_calendar_options", $opts );
	WP_CLI::log( "events settings updated" );
'

# Create a venue — Cadmous College campus.
$WP eval '
	$existing = get_posts( array(
		"post_type"   => "tribe_venue",
		"name"        => "cadmous-college-campus",
		"post_status" => "publish",
		"numberposts" => 1,
	) );
	if ( $existing ) {
		WP_CLI::log( "venue already exists: " . $existing[0]->ID );
		return;
	}
	if ( ! function_exists( "tribe_create_venue" ) ) {
		WP_CLI::error( "tribe_create_venue not available" );
	}
	$venue_id = tribe_create_venue( array(
		"Venue"    => "Cadmous College Campus",
		"Address"  => "Jwar al Nakhel",
		"City"     => "Tyre",
		"Country"  => "Lebanon",
		"Province" => "South Lebanon",
	) );
	if ( $venue_id ) {
		WP_CLI::log( "created venue: " . $venue_id );
	}
'

# Create an organizer.
$WP eval '
	$existing = get_posts( array(
		"post_type"   => "tribe_organizer",
		"name"        => "cadmous-college",
		"post_status" => "publish",
		"numberposts" => 1,
	) );
	if ( $existing ) {
		WP_CLI::log( "organizer already exists: " . $existing[0]->ID );
		return;
	}
	if ( ! function_exists( "tribe_create_organizer" ) ) {
		WP_CLI::error( "tribe_create_organizer not available" );
	}
	$org_id = tribe_create_organizer( array(
		"Organizer" => "Cadmous College",
		"Email"     => "admissions@cadmous.edu.lb",
		"Phone"     => "+961 7 349 038",
		"Website"   => "https://cadmous.edu.lb",
	) );
	if ( $org_id ) {
		WP_CLI::log( "created organizer: " . $org_id );
	}
'

# Create 3 sample events — upcoming.
$WP eval '
	if ( ! function_exists( "tribe_create_event" ) ) {
		WP_CLI::error( "tribe_create_event not available" );
	}
	$venue     = get_posts( array( "post_type" => "tribe_venue", "numberposts" => 1 ) );
	$organizer = get_posts( array( "post_type" => "tribe_organizer", "numberposts" => 1 ) );
	$venue_id  = $venue ? $venue[0]->ID : 0;
	$org_id    = $organizer ? $organizer[0]->ID : 0;

	$events = array(
		array( "title" => "Open House — Spring 2026",      "start" => "2026-05-15 10:00:00", "end" => "2026-05-15 13:00:00", "desc" => "An open campus day for prospective families. Meet the faculty, tour the school, and learn about the IB and Lebanese programs." ),
		array( "title" => "Parent-Teacher Conference",      "start" => "2026-04-25 14:00:00", "end" => "2026-04-25 18:00:00", "desc" => "End-of-term parent-teacher conferences across all divisions." ),
		array( "title" => "Sports Day 2026",                "start" => "2026-06-10 09:00:00", "end" => "2026-06-10 15:00:00", "desc" => "Annual Sports Day — field events, team games, and awards for all divisions." ),
	);

	foreach ( $events as $e ) {
		$existing = get_posts( array(
			"post_type"   => "tribe_events",
			"title"       => $e["title"],
			"post_status" => array( "publish", "draft" ),
			"numberposts" => 1,
		) );
		if ( $existing ) {
			WP_CLI::log( "event already exists: " . $e["title"] );
			continue;
		}
		$event_id = tribe_create_event( array(
			"post_title"      => $e["title"],
			"post_content"    => $e["desc"],
			"post_status"     => "publish",
			"EventStartDate"  => substr( $e["start"], 0, 10 ),
			"EventStartHour"  => substr( $e["start"], 11, 2 ),
			"EventStartMinute" => substr( $e["start"], 14, 2 ),
			"EventEndDate"    => substr( $e["end"], 0, 10 ),
			"EventEndHour"    => substr( $e["end"], 11, 2 ),
			"EventEndMinute"  => substr( $e["end"], 14, 2 ),
			"EventTimezone"   => "Asia/Beirut",
			"EventAllDay"     => "no",
			"venue"           => array( "VenueID" => $venue_id ),
			"organizer"       => array( "OrganizerID" => array( $org_id ) ),
		) );
		if ( $event_id ) {
			WP_CLI::log( "created event: " . $e["title"] . " (" . $event_id . ")" );
		} else {
			WP_CLI::warning( "failed to create: " . $e["title"] );
		}
	}
'

$WP rewrite flush --hard

echo "[events] done."
