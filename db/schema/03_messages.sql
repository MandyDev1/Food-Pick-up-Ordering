-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  to_id INTEGER REFERENCES  users(id) ON DELETE CASCADE,
  from_id INTEGER REFERENCES  restaurants(id) ON DELETE CASCADE,
  message TEXT DEFAULT '',
  date_sent TIMESTAMP
);

