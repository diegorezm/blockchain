CREATE TABLE `sessions` (
	`user_id` text NOT NULL,
	`id` text(255) PRIMARY KEY NOT NULL,
	`expires_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`email` text(255) NOT NULL,
	`img_url` text,
	`img_key` text,
	`password` text(255) NOT NULL,
	`created_at` text DEFAULT '1740510285888',
	`updated_at` text DEFAULT '1740510285888'
);
