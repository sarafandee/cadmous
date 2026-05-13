CREATE TABLE `application_documents` (
	`id` text PRIMARY KEY NOT NULL,
	`draft_id` text NOT NULL,
	`application_id` text,
	`kind` text NOT NULL,
	`original_name` text NOT NULL,
	`stored_path` text NOT NULL,
	`mime` text NOT NULL,
	`size` integer NOT NULL,
	`ip_hash` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`application_id`) REFERENCES `applications`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `app_docs_draft_idx` ON `application_documents` (`draft_id`);--> statement-breakpoint
CREATE INDEX `app_docs_application_idx` ON `application_documents` (`application_id`);