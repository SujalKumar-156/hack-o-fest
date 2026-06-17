-- Run this in your Supabase project's SQL editor.
-- Then set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.
-- Without env vars set, the app falls back to lib/mockTeams.ts seeds.

create table if not exists teams (
  id text primary key,
  name text not null,
  track text not null,
  current_stage text not null check (current_stage in ('registered','round1','round2','semifinal','final')),
  score int,
  members jsonb not null default '[]'::jsonb,
  stage_history jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table teams enable row level security;

drop policy if exists "public read" on teams;
create policy "public read" on teams for select to anon using (true);

-- Seed examples (matches lib/mockTeams.ts):
insert into teams (id, name, track, current_stage, score, members, stage_history)
values
  ('AVNG-7K2', 'Quantum Avengers', 'reality', 'semifinal', 87,
   '[{"name":"Tony Reyes","role":"Captain · Frontend"},{"name":"Riri Park","role":"ML Engineer"},{"name":"Sam Okafor","role":"Backend"},{"name":"Kamala Singh","role":"Design"}]'::jsonb,
   '[{"stage":"registered","status":"passed","at":"2026-08-14"},{"stage":"round1","status":"passed","at":"2026-09-03"},{"stage":"round2","status":"passed","at":"2026-09-12"},{"stage":"semifinal","status":"pending","at":"2026-09-22"},{"stage":"final","status":"pending","at":"2026-10-05"}]'::jsonb),
  ('XMEN-3PQ', 'Mutant Stack', 'mind', 'round2', 72,
   '[{"name":"Logan Vega","role":"Captain · Systems"},{"name":"Jean Park","role":"Realtime"},{"name":"Ororo Diallo","role":"Design Lead"}]'::jsonb,
   '[{"stage":"registered","status":"passed","at":"2026-08-14"},{"stage":"round1","status":"passed","at":"2026-09-03"},{"stage":"round2","status":"pending","at":"2026-09-12"},{"stage":"semifinal","status":"pending","at":"2026-09-22"},{"stage":"final","status":"pending","at":"2026-10-05"}]'::jsonb),
  ('GRDN-9MZ', 'Cosmic Pylon', 'space', 'final', 94,
   '[{"name":"Peter Quill","role":"Captain · Full-stack"},{"name":"Gamora Wei","role":"Infra"},{"name":"Rocket Tan","role":"Hardware"},{"name":"Mantis Roy","role":"UX"}]'::jsonb,
   '[{"stage":"registered","status":"passed","at":"2026-08-14"},{"stage":"round1","status":"passed","at":"2026-09-03"},{"stage":"round2","status":"passed","at":"2026-09-12"},{"stage":"semifinal","status":"passed","at":"2026-09-22"},{"stage":"final","status":"pending","at":"2026-10-05"}]'::jsonb),
  ('WKDA-1ZR', 'Vibranium Devs', 'soul', 'round1', 58,
   '[{"name":"Shuri Adeyemi","role":"Captain · Hardware"},{"name":"M''Baku Okello","role":"Edge"}]'::jsonb,
   '[{"stage":"registered","status":"passed","at":"2026-08-14"},{"stage":"round1","status":"failed","at":"2026-09-03"},{"stage":"round2","status":"pending","at":"2026-09-12"},{"stage":"semifinal","status":"pending","at":"2026-09-22"},{"stage":"final","status":"pending","at":"2026-10-05"}]'::jsonb)
on conflict (id) do nothing;
