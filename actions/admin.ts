"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";
import { getAdminContext } from "@/lib/admin";

export async function markPasswordChanged() {
  const context = await getAdminContext();
  if (!context.user || !context.isAdmin || !context.adminClient) throw new Error("Unauthorized");
  const { error } = await context.adminClient
    .from("admin_profiles")
    .update({ must_change_password: false })
    .eq("user_id", context.user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}

export async function updateReviewStatus(id: string, status: "approved" | "rejected" | "pending") {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("reviews").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}

export async function deleteReview(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}

export async function deleteInquiry(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("inquiries").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}
