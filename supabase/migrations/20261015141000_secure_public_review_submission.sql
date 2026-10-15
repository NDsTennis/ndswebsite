create or replace function public.submit_review(
  p_display_name text,
  p_rating smallint,
  p_message text,
  p_language text default 'de'
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if length(trim(p_display_name)) < 2 or length(trim(p_display_name)) > 80 then
    raise exception 'invalid display name';
  end if;

  if p_rating < 1 or p_rating > 5 then
    raise exception 'invalid rating';
  end if;

  if length(trim(p_message)) < 10 or length(trim(p_message)) > 1000 then
    raise exception 'invalid message';
  end if;

  insert into public.reviews (display_name, rating, message, language, source)
  values (trim(p_display_name), p_rating, trim(p_message), left(coalesce(p_language, 'de'), 5), 'website');
end;
$$;

revoke execute on function public.submit_review(text, smallint, text, text) from public;
grant execute on function public.submit_review(text, smallint, text, text) to anon, authenticated;
