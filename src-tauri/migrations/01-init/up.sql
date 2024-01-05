CREATE TABLE "projects" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	"label"	TEXT,
	"url"	TEXT NOT NULL,
	"local_path"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "providers" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL UNIQUE,
	"label"	TEXT,
	"description"	TEXT,
	"url"	TEXT NOT NULL,
	"tf_name"	TEXT NOT NULL,
	"tf_source"	TEXT,
	"tf_version"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "api_tokens" (
	"id"	INTEGER NOT NULL UNIQUE,
	"provider_id"	INTEGER NOT NULL,
	"token"	TEXT NOT NULL,
	"project_id"	INTEGER,
	FOREIGN KEY("project_id") REFERENCES "projects"("id"),
	FOREIGN KEY("provider_id") REFERENCES "providers"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);

INSERT INTO "providers" (
  "id",
  "name",
  "label",
  "description",
  "url",
  "tf_name",
  "tf_source",
  "tf_version"
) VALUES (
  1,
  'github',
  'GitHub',
  'GitHub is a developer platform that allows developers to create, store, and manage their code. It uses Git software, providing the distributed version control of Git plus access control, bug tracking, software feature requests, task management, continuous integration, and wikis for every project.',
  'https://github.com',
  'github',
  'integrations/github',
  '~> 5.0'
);
