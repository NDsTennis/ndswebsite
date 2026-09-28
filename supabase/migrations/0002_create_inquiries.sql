-- Contact / training inquiries submitted from the contact form.
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 200),
  phone text check (phone is null or char_length(phone) <= 30),
  intent text not null check (
    intent in (
      'privattraining',
      'gruppentraining',
      'leistungstraining',
      'matchcoaching',
      'online-coaching',
      'vereinsanfrage',
      'sonstiges'
    )
  ),
  message text not null check (char_length(message) between 10 and 2000),
  consent boolean not null check (consent = true),
  language text check (language in ('de', 'en')),
  created_at timestamptz not null default now()
);

create index if not exists inquiries_created_at_idx
  on public.inquiries (created_at desc);

alter table public.inquiries enable row level security;

-- Anyone can submit an inquiry. There is intentionally no select/update/
-- delete policy for anon/authenticated: inquiries (which contain personal
-- contact details) are only readable via the service role from a future
-- admin/notification tool, which bypasses RLS by design. This also means a
-- submitter can never read back other people's contact details.
create policy "public can submit an inquiry"
  on public.inquiries for insert
  to anon, authenticated
  with check (true);
