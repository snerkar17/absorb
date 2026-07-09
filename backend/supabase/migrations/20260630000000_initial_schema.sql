-- Absorb initial schema: profiles, days, notes
-- Categories are a fixed set (see PHASES.md Phase 2 discussion, supersedes the
-- list in absorb-prd.md §6.3); enforced here via CHECK so the DB also rejects
-- anything outside the set, not just the app layer.

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);


create table public.days (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  status text not null default 'draft' check (status in ('draft', 'finalized')),
  created_at timestamptz not null default now(),
  finalized_at timestamptz,
  unique (user_id, date)
);

alter table public.days enable row level security;

create policy "Users can view own days"
  on public.days for select
  using (auth.uid() = user_id);

create policy "Users can insert own days"
  on public.days for insert
  with check (auth.uid() = user_id);

create policy "Users can update own days"
  on public.days for update
  using (auth.uid() = user_id);

create policy "Users can delete own days"
  on public.days for delete
  using (auth.uid() = user_id);


create table public.notes (
  id uuid primary key default gen_random_uuid(),
  day_id uuid not null references public.days(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  text text not null,
  category text not null check (category in (
    'Science', 'History', 'Psychology', 'Finance', 'Tech News', 'Computer Science', 'Health/Wellness', 'Other'
  )),
  source text not null,
  created_at timestamptz not null default now()
);

create index notes_day_id_idx on public.notes (day_id);
create index notes_user_id_idx on public.notes (user_id);

alter table public.notes enable row level security;

create policy "Users can view own notes"
  on public.notes for select
  using (auth.uid() = user_id);

create policy "Users can insert own notes"
  on public.notes for insert
  with check (auth.uid() = user_id);

create policy "Users can update own notes"
  on public.notes for update
  using (auth.uid() = user_id);

create policy "Users can delete own notes"
  on public.notes for delete
  using (auth.uid() = user_id);


-- "Automatically expose new tables" is off at the project level (deliberate
-- access control), so the Data API needs explicit grants here before RLS
-- policies are even evaluated. No anon access anywhere — the whole app
-- requires sign-in.
grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.days to authenticated;
grant select, insert, update, delete on public.notes to authenticated;
