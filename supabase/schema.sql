-- ─────────────────────────────────────────────
-- ASCEND — Database Schema
-- Supabase PostgreSQL
-- ─────────────────────────────────────────────

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ─── Players Table ───
create table public.players (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  path text not null default 'thinker',
  created_at timestamptz default now()
);

-- ─── Player Stats ───
create table public.player_stats (
  id uuid references public.players on delete cascade primary key,
  play_xp int default 0,
  life_xp int default 0,
  lane_logic int default 0,
  lane_memory int default 0,
  lane_communication int default 0,
  lane_money int default 0,
  streak int default 0,
  best_streak int default 0,
  challenges_solved int default 0,
  missions_completed int default 0,
  duels_played int default 0,
  duels_won int default 0,
  last_play_date text default '',
  updated_at timestamptz default now()
);

-- ─── Daily Results ───
create table public.daily_results (
  id uuid default uuid_generate_v4() primary key,
  player_id uuid references public.players on delete cascade not null,
  play_date text not null,
  mind boolean,
  life boolean,
  edge boolean,
  xp_earned int default 0,
  created_at timestamptz default now(),
  unique(player_id, play_date)
);

-- ─── Duels ───
create table public.duels (
  id uuid default uuid_generate_v4() primary key,
  challenger_id uuid references public.players on delete cascade not null,
  opponent_id uuid references public.players on delete set null,
  category text not null,
  challenger_correct boolean,
  opponent_correct boolean,
  status text default 'pending',
  created_at timestamptz default now()
);

-- ─── Leaderboard View ───
create or replace view public.leaderboard as
  select
    p.id,
    p.name,
    p.path,
    s.play_xp + s.life_xp as total_xp,
    s.play_xp,
    s.life_xp,
    s.streak,
    s.best_streak,
    s.challenges_solved,
    rank() over (order by s.play_xp + s.life_xp desc) as rank
  from public.players p
  join public.player_stats s on p.id = s.id;

-- ─── Row Level Security ───
alter table public.players enable row level security;
alter table public.player_stats enable row level security;
alter table public.daily_results enable row level security;
alter table public.duels enable row level security;

-- Players: read all, write own
create policy "Anyone can view players" on public.players for select using (true);
create policy "Users can insert own player" on public.players for insert with check (auth.uid() = id);
create policy "Users can update own player" on public.players for update using (auth.uid() = id);

-- Stats: read all (for leaderboard), write own
create policy "Anyone can view stats" on public.player_stats for select using (true);
create policy "Users can insert own stats" on public.player_stats for insert with check (auth.uid() = id);
create policy "Users can update own stats" on public.player_stats for update using (auth.uid() = id);

-- Daily results: read own, write own
create policy "Users can view own results" on public.daily_results for select using (auth.uid() = player_id);
create policy "Users can insert own results" on public.daily_results for insert with check (auth.uid() = player_id);

-- Duels: read all, write own
create policy "Anyone can view duels" on public.duels for select using (true);
create policy "Users can create duels" on public.duels for insert with check (auth.uid() = challenger_id);
create policy "Users can update own duels" on public.duels for update using (auth.uid() = challenger_id or auth.uid() = opponent_id);

-- ─── Auto-create stats on player signup ───
create or replace function public.handle_new_player()
returns trigger as $$
begin
  insert into public.player_stats (id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_player_created
  after insert on public.players
  for each row execute procedure public.handle_new_player();
