create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  must_change_password boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.admin_profiles enable row level security;

revoke all on table public.admin_profiles from anon, authenticated;
