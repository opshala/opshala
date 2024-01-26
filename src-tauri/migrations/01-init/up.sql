CREATE TABLE "projects" (
	"id"                                INTEGER NOT NULL UNIQUE,
	"name"                              TEXT NOT NULL,
	"label"                             TEXT,
	"repository_url"                    TEXT NOT NULL,
	"local_path"                        TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "apps" (
    "id"                                INTEGER NOT NULL UNIQUE,
    "name"                              TEXT NOT NULL,
    "label"                             TEXT,
    "config"                            JSON,
    PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "domains" (
    "id"                                INTEGER NOT NULL UNIQUE,
    "name"                              TEXT NOT NULL,
    "label"                             TEXT,
    "config"                            JSON,
    PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "providers" (
	"id"                                INTEGER NOT NULL UNIQUE,
	"name"                              TEXT NOT NULL UNIQUE,
	"label"                             TEXT,
	"description"                       TEXT,
	"url"                               TEXT NOT NULL,
	"terraform"                         JSON,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "resources" (
	"id"                                INTEGER NOT NULL UNIQUE,
	"name"                              TEXT NOT NULL,
	"label"                             TEXT,
	"description"                       TEXT,
    "url"                               TEXT NOT NULL,
	"terraform"                         JSON,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE "api_tokens" (
	"id"                                INTEGER NOT NULL UNIQUE,
	"provider_id"                       INTEGER NOT NULL,
	"token"                             TEXT NOT NULL,
	"project_id"                        INTEGER,
	FOREIGN KEY("project_id")           REFERENCES "projects"("id"),
	FOREIGN KEY("provider_id")          REFERENCES "providers"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);

INSERT INTO "providers" (
  "id",
  "name",
  "label",
  "description",
  "url",
  "terraform"
) VALUES (
  1,
  'github',
  'GitHub',
  'GitHub is a developer platform that allows developers to create, store, and manage their code. It uses Git software, providing the distributed version control of Git plus access control, bug tracking, software feature requests, task management, continuous integration, and wikis for every project.',
  'https://github.com',
  '{"name": "github", "source": "integrations/github", "version": "~> 5.0"}'
);
