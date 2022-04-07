CREATE TABLE quotes (
	quote_id INTEGER PRIMARY KEY,
        language TEXT NOT NULL,
        tags     TEXT NOT NULL,
        author TEXT NOT NULL,
        quote  TEXT NOT NULL);

CREATE TABLE tags (
        tag_id INTEGER PRIMARY KEY,
        language TEXT NOT NULL,
        tag TEXT NOT NULL);
