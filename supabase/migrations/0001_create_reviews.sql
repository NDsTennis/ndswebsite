-- Public reviews, moderated before becoming visible.
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  display_name text not null check (char_length(display_name) between 2 and 80),
  rating smallint not null check (rating between 1 and 5),
  message text not null check (char_length(message) between 10 and 1000),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  language text check (language in ('de', 'en')),
  source text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists reviews_status_created_at_idx
  on public.reviews (status, created_at desc);

alter table public.reviews enable row level security;

-- Anyone can read reviews that have been approved.
create policy "public can read approved reviews"
  on public.reviews for select
  to anon, authenticated
  using (status = 'approved');

-- Anyone can submit a review, but it always lands as 'pending' — the check
-- constraint above and this policy both enforce that a submitter can never
-- insert a row with any other status.
create policy "public can submit a pending review"
  on public.reviews for insert
  to anon, authenticated
  with check (status = 'pending');

-- Intentionally no update/delete policy for anon/authenticated: moderation
-- (approving/rejecting a review) is performed with the service role only
-- (e.g. from a future admin tool), which bypasses RLS by design.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger reviews_set_updated_at
  before update on public.reviews
  for each row
  execute function public.set_updated_at();
