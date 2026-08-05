-- Premiership of Darts — Cup Competitions
-- Run this once in Max's own Supabase project (the same one behind Chalkboard
-- and Ralph's Day): Dashboard -> SQL Editor -> New query -> paste -> Run.
--
-- One row per named cup competition, holding the whole competition object
-- (groups, fixtures, knockout bracket) as JSON. This mirrors exactly what the
-- app used to keep in localStorage — only where it's stored has changed, so
-- results now sync for everyone instead of living on one person's browser.

create table if not exists cup_competitions (
  id         text primary key,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

-- Row Level Security on, with an open policy for the public (anon) key —
-- same trust-based model as Chalkboard: anyone with the link can read and
-- write. Fine for a friendly league competition, not for anything sensitive.
alter table cup_competitions enable row level security;

create policy "cup competitions open" on cup_competitions
  for all to anon using (true) with check (true);
