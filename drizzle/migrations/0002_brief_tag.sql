CREATE TABLE `applications` (
	`id` text PRIMARY KEY NOT NULL,
	`payload` text NOT NULL,
	`student_name` text NOT NULL,
	`student_grade` text NOT NULL,
	`guardian_email` text,
	`guardian_phone` text,
	`applicant_locale` text DEFAULT 'en' NOT NULL,
	`app_lang` text DEFAULT 'en' NOT NULL,
	`ip_hash` text,
	`user_agent` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`read_at` integer,
	`archived_at` integer
);
--> statement-breakpoint
CREATE INDEX `applications_created_idx` ON `applications` (`created_at`);--> statement-breakpoint
CREATE INDEX `applications_read_idx` ON `applications` (`read_at`);--> statement-breakpoint
CREATE INDEX `applications_archived_idx` ON `applications` (`archived_at`);--> statement-breakpoint
CREATE TABLE `contact_submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`message` text NOT NULL,
	`locale` text DEFAULT 'en' NOT NULL,
	`ip_hash` text,
	`user_agent` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`read_at` integer,
	`archived_at` integer
);
--> statement-breakpoint
CREATE INDEX `contact_created_idx` ON `contact_submissions` (`created_at`);--> statement-breakpoint
CREATE INDEX `contact_read_idx` ON `contact_submissions` (`read_at`);--> statement-breakpoint
CREATE INDEX `contact_archived_idx` ON `contact_submissions` (`archived_at`);