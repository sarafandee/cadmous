PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_events` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer,
	`location` text,
	`image_media_id` text,
	`image_path` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_events`("id", "slug", "start_date", "end_date", "location", "image_media_id", "status", "created_at", "updated_at") SELECT "id", "slug", "start_date", "end_date", "location", "image_media_id", "status", "created_at", "updated_at" FROM `events`;--> statement-breakpoint
DROP TABLE `events`;--> statement-breakpoint
ALTER TABLE `__new_events` RENAME TO `events`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `events_slug_idx` ON `events` (`slug`);--> statement-breakpoint
CREATE TABLE `__new_news_posts` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`published_at` integer NOT NULL,
	`image_media_id` text,
	`image_path` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_news_posts`("id", "slug", "published_at", "image_media_id", "status", "created_at", "updated_at") SELECT "id", "slug", "published_at", "image_media_id", "status", "created_at", "updated_at" FROM `news_posts`;--> statement-breakpoint
DROP TABLE `news_posts`;--> statement-breakpoint
ALTER TABLE `__new_news_posts` RENAME TO `news_posts`;--> statement-breakpoint
CREATE UNIQUE INDEX `news_slug_idx` ON `news_posts` (`slug`);