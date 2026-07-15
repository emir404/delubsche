import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`prompt\` text,
  	\`ergebnis\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`documents_updated_at_idx\` ON \`documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`documents_created_at_idx\` ON \`documents\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`documents_filename_idx\` ON \`documents\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`change_requests\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`prompt\` text NOT NULL,
  	\`status\` text DEFAULT 'offen',
  	\`summary\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`change_requests_updated_at_idx\` ON \`change_requests\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`change_requests_created_at_idx\` ON \`change_requests\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`change_requests_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`documents_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`change_requests\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`documents_id\`) REFERENCES \`documents\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`change_requests_rels_order_idx\` ON \`change_requests_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`change_requests_rels_parent_idx\` ON \`change_requests_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`change_requests_rels_path_idx\` ON \`change_requests_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`change_requests_rels_documents_id_idx\` ON \`change_requests_rels\` (\`documents_id\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	\`documents_id\` integer,
  	\`change_requests_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`documents_id\`) REFERENCES \`documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`change_requests_id\`) REFERENCES \`change_requests\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_documents_id_idx\` ON \`payload_locked_documents_rels\` (\`documents_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_change_requests_id_idx\` ON \`payload_locked_documents_rels\` (\`change_requests_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`homepage_hero_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_hero_columns_order_idx\` ON \`homepage_hero_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_hero_columns_parent_id_idx\` ON \`homepage_hero_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_owners_people\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_owners_people_order_idx\` ON \`homepage_owners_people\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_owners_people_parent_id_idx\` ON \`homepage_owners_people\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_owners_people_image_idx\` ON \`homepage_owners_people\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_owners_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_owners_paragraphs_order_idx\` ON \`homepage_owners_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_owners_paragraphs_parent_id_idx\` ON \`homepage_owners_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_gallery_images_order_idx\` ON \`homepage_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_gallery_images_parent_id_idx\` ON \`homepage_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_gallery_images_image_idx\` ON \`homepage_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_contact_info_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_contact_info_items_order_idx\` ON \`homepage_contact_info_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_contact_info_items_parent_id_idx\` ON \`homepage_contact_info_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_image_id\` integer NOT NULL,
  	\`hero_reserve_label\` text NOT NULL,
  	\`about_heading\` text NOT NULL,
  	\`about_text\` text NOT NULL,
  	\`about_quote\` text NOT NULL,
  	\`about_quote_author\` text NOT NULL,
  	\`about_cta_label\` text NOT NULL,
  	\`about_image_large_id\` integer NOT NULL,
  	\`about_image_small_id\` integer NOT NULL,
  	\`owners_heading\` text NOT NULL,
  	\`owners_intro\` text NOT NULL,
  	\`owners_pullquote_before\` text NOT NULL,
  	\`owners_pullquote_accent\` text NOT NULL,
  	\`owners_pullquote_after\` text NOT NULL,
  	\`owners_cta_label\` text NOT NULL,
  	\`contact_heading\` text NOT NULL,
  	\`contact_reserve_eyebrow\` text NOT NULL,
  	\`contact_hours_heading\` text NOT NULL,
  	\`contact_map_cta_label\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_image_large_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_image_small_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_hero_hero_image_idx\` ON \`homepage\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_about_about_image_large_idx\` ON \`homepage\` (\`about_image_large_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_about_about_image_small_idx\` ON \`homepage\` (\`about_image_small_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_hours\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`day\` text NOT NULL,
  	\`time\` text NOT NULL,
  	\`open_from\` text,
  	\`open_until\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_hours_order_idx\` ON \`site_settings_hours\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_hours_parent_id_idx\` ON \`site_settings_hours\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`phillip_enabled\` integer DEFAULT true,
  	\`meta_title\` text NOT NULL,
  	\`meta_description\` text NOT NULL,
  	\`contact_name\` text NOT NULL,
  	\`contact_street\` text NOT NULL,
  	\`contact_city\` text NOT NULL,
  	\`contact_phone_display\` text NOT NULL,
  	\`contact_phone_number\` text NOT NULL,
  	\`contact_email\` text NOT NULL,
  	\`contact_maps_embed_src\` text NOT NULL,
  	\`contact_maps_link\` text NOT NULL,
  	\`contact_menu_pdf_url\` text NOT NULL,
  	\`hours_note\` text NOT NULL,
  	\`tagline\` text NOT NULL,
  	\`marquee\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`documents\`;`)
  await db.run(sql`DROP TABLE \`change_requests\`;`)
  await db.run(sql`DROP TABLE \`change_requests_rels\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`homepage_hero_columns\`;`)
  await db.run(sql`DROP TABLE \`homepage_owners_people\`;`)
  await db.run(sql`DROP TABLE \`homepage_owners_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`homepage_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`homepage_contact_info_items\`;`)
  await db.run(sql`DROP TABLE \`homepage\`;`)
  await db.run(sql`DROP TABLE \`site_settings_hours\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
}
