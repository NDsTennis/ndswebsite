import "server-only";

import { getSupabaseAdminClient, getSupabaseAuthServerClient } from "@/lib/supabase/server";

export async function getAdminContext() {
  const authClient = await getSupabaseAuthServerClient();
  const { data } = authClient ? await authClient.auth.getUser() : { data: { user: null } };
  const user = data.user;
  const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const isAdmin = Boolean(user?.email && configuredEmail && user.email.toLowerCase() === configuredEmail);

  return { user, isAdmin, adminClient: isAdmin ? getSupabaseAdminClient() : null };
}

export async function requireAdmin() {
  const context = await getAdminContext();
  if (!context.user || !context.isAdmin || !context.adminClient) {
    throw new Error("Unauthorized");
  }
  return context.adminClient;
}
