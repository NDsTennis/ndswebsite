-- Align the public Data API privileges with the RLS policies already used by
-- the NDS project. RLS still controls which rows are visible or writable.
grant usage on schema public to anon, authenticated;
grant select, insert on table public.reviews to anon, authenticated;
grant insert on table public.inquiries to anon, authenticated;

-- The remote reviews table has a BEFORE INSERT trigger that always forces a
-- new row to status = 'pending'. Let the trigger own that invariant so the
-- PostgREST insert path and the server action use the same rule.
drop policy if exists "Public can submit pending reviews" on public.reviews;
create policy "Public can submit pending reviews"
  on public.reviews for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Public can submit inquiries" on public.inquiries;
create policy "Public can submit inquiries"
  on public.inquiries for insert
  to anon, authenticated
  with check (privacy_consent = true);
