-- Supabase Schema Migration: Bible Reading PWA Architecture

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  timezone text default 'UTC',
  active_plan_id uuid,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. READING PLANS
create table if not exists public.reading_plans (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description text,
  is_system_plan boolean default true,
  created_at timestamptz default now()
);

-- 3. READING PLAN TRACKS
create table if not exists public.reading_plan_tracks (
  id uuid primary key default uuid_generate_v4(),
  reading_plan_id uuid references public.reading_plans(id) on delete cascade,
  slug text not null,
  name text not null,
  display_order int not null,
  rotation_target int not null default 1,
  sequence_type text default 'canonical',
  accent_color text default '#536B92',
  created_at timestamptz default now(),
  unique(reading_plan_id, slug)
);

-- 4. READING YEARS
create table if not exists public.reading_years (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  reading_plan_id uuid not null references public.reading_plans(id),
  calendar_year int not null,
  start_date date not null,
  end_date date not null,
  status text default 'active' check (status in ('active', 'archived', 'completed')),
  generated_at timestamptz default now(),
  created_at timestamptz default now(),
  unique(user_id, reading_plan_id, calendar_year)
);

-- 5. DAILY READINGS
create table if not exists public.daily_readings (
  id uuid primary key default uuid_generate_v4(),
  reading_year_id uuid not null references public.reading_years(id) on delete cascade,
  reading_date date not null,
  day_number int not null,
  created_at timestamptz default now(),
  unique(reading_year_id, reading_date)
);

-- 6. READING ASSIGNMENTS
create table if not exists public.reading_assignments (
  id uuid primary key default uuid_generate_v4(),
  daily_reading_id uuid not null references public.daily_readings(id) on delete cascade,
  track_id uuid not null references public.reading_plan_tracks(id),
  book_id text not null,
  book_code text not null,
  chapter int not null,
  rotation_number int not null default 1,
  position_in_track int not null default 1,
  display_order int not null default 1,
  created_at timestamptz default now()
);

-- 7. READING COMPLETION
create table if not exists public.reading_completion (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  assignment_id uuid not null references public.reading_assignments(id) on delete cascade,
  completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, assignment_id)
);

-- 8. STUDY NOTES
create table if not exists public.study_notes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  daily_reading_id uuid not null references public.daily_readings(id) on delete cascade,
  assignment_id uuid references public.reading_assignments(id) on delete cascade,
  content text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- INDEXES
create index if not exists idx_daily_readings_date on public.daily_readings(reading_date);
create index if not exists idx_daily_readings_year on public.daily_readings(reading_year_id);
create index if not exists idx_assignments_daily on public.reading_assignments(daily_reading_id);
create index if not exists idx_assignments_track on public.reading_assignments(track_id);
create index if not exists idx_completion_user on public.reading_completion(user_id);
create index if not exists idx_completion_assignment on public.reading_completion(assignment_id);
create index if not exists idx_notes_user_daily on public.study_notes(user_id, daily_reading_id);

-- ROW LEVEL SECURITY (RLS) POLICIES
alter table public.profiles enable row level security;
alter table public.reading_plans enable row level security;
alter table public.reading_plan_tracks enable row level security;
alter table public.reading_years enable row level security;
alter table public.daily_readings enable row level security;
alter table public.reading_assignments enable row level security;
alter table public.reading_completion enable row level security;
alter table public.study_notes enable row level security;

-- System Reading Plans: Public Read
create policy "Reading plans readable by authenticated users"
  on public.reading_plans for select
  to authenticated using (true);

create policy "Reading plan tracks readable by authenticated users"
  on public.reading_plan_tracks for select
  to authenticated using (true);

-- User Profiles: Self access
create policy "Users can view own profile"
  on public.profiles for select
  to authenticated using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  to authenticated using (auth.uid() = id);

-- Reading Years: User owns row
create policy "Users manage own reading years"
  on public.reading_years for all
  to authenticated using (auth.uid() = user_id);

-- Daily Readings: Accessible if belongs to user's reading year
create policy "Users read own daily readings"
  on public.daily_readings for select
  to authenticated using (
    exists (
      select 1 from public.reading_years ry
      where ry.id = daily_readings.reading_year_id
      and ry.user_id = auth.uid()
    )
  );

-- Reading Assignments: Accessible if belongs to user's daily reading
create policy "Users read own reading assignments"
  on public.reading_assignments for select
  to authenticated using (
    exists (
      select 1 from public.daily_readings dr
      join public.reading_years ry on ry.id = dr.reading_year_id
      where dr.id = reading_assignments.daily_reading_id
      and ry.user_id = auth.uid()
    )
  );

-- Completion Records: User owns row
create policy "Users manage own completion records"
  on public.reading_completion for all
  to authenticated using (auth.uid() = user_id);

-- Study Notes: User owns row
create policy "Users manage own study notes"
  on public.study_notes for all
  to authenticated using (auth.uid() = user_id);
