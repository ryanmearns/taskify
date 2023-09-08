CREATE TABLE IF NOT EXISTS "messages" (
	"uuid" varchar(8) PRIMARY KEY NOT NULL,
	"content" varchar(5120) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
