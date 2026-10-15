import "server-only";

import { getSupabaseAdminClient, getSupabaseAuthServerClient } from "@/lib/supabase/server";

export async function getAdminContext() {
  const authClient = await getSupabaseAuthServerClient();
  const { data } = authClient ? await authClient.auth.getUser() : { data: { user: null } };
  const user = data.user;
  const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const isAdmin = Boolean(user?.email && configuredEmail && user.email.toLowerCase() === configuredEmail);

  const adminClient = isAdmin ? getSupabaseAdminClient() : null;
  if (!user || !isAdmin || !adminClient) return { user, isAdmin, adminClient, mustChangePassword: false };

  const { data: profile } = await adminClient
    .from("admin_profiles")
    .select("must_change_password")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!profile) {
    await adminClient.from("admin_profiles").insert({ user_id: user.id, must_change_password: true });
    return { user, isAdmin, adminClient, mustChangePassword: true };
  }

  return { user, isAdmin, adminClient, mustChangePassword: profile.must_change_password };
}

export async function requireAdmin() {
  const context = await getAdminContext();
  if (!context.user || !context.isAdmin || !context.adminClient) {
    throw new Error("Unauthorized");
  }
  if (context.mustChangePassword) throw new Error("Password change required");
  return context.adminClient;
}
