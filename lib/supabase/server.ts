import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using the public anon key, protected by RLS.
 * No Supabase project is connected in local/dev by default — this returns
 * `null` when the env vars are absent so pages can render a graceful
 * fallback instead of crashing. There is no user auth in this app, so no
 * session/cookie handling is needed here.
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;

  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}
