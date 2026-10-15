import { AdminDashboard } from "@/app/admin/admin-dashboard";
import { AdminLogin } from "@/app/admin/admin-login";
import { PasswordChange } from "@/app/admin/password-change";
import { getAdminContext } from "@/lib/admin";
import type { InquiryRow, ReviewRow } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const context = await getAdminContext();
  const { user, isAdmin, adminClient } = context;
  if (!user) return <div className="min-h-screen bg-cream px-5 py-16"><AdminLogin /></div>;
  if (!isAdmin || !adminClient) return <div className="min-h-screen bg-cream px-5 py-16"><p className="mx-auto max-w-md rounded-xl border border-red-200 bg-white p-6 text-red-700">Dieser Benutzer ist nicht als NDS-Administrator freigeschaltet.</p></div>;
  if (context.mustChangePassword) return <PasswordChange />;

  const [{ data: reviews }, { data: inquiries }] = await Promise.all([
    adminClient.from("reviews").select("*").order("created_at", { ascending: false }),
    adminClient.from("inquiries").select("*").order("created_at", { ascending: false }),
  ]);

  return <AdminDashboard reviews={(reviews ?? []) as ReviewRow[]} inquiries={(inquiries ?? []) as InquiryRow[]} email={user.email ?? ""} />;
}
