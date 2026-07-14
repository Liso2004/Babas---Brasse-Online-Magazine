CREATE TABLE IF NOT EXISTS publication_state (
  id text PRIMARY KEY,
  data jsonb NOT NULL,
  schema_version integer NOT NULL DEFAULT 2,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT publication_state_primary_row CHECK (id = 'primary')
);

