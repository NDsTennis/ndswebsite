"use client";

import { deleteInquiry, deleteReview, updateReviewStatus } from "@/actions/admin";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { InquiryRow, ReviewRow } from "@/lib/supabase/types";

export function AdminDashboard({ reviews, inquiries, email }: { reviews: ReviewRow[]; inquiries: InquiryRow[]; email: string }) {
  async function logout() {
    await getSupabaseBrowserClient()?.auth.signOut();
    window.location.reload();
  }

  return (
    <main className="min-h-screen bg-cream px-5 py-10 text-ink sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col gap-4 border-b border-ink/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">NDS Admin</p><h1 className="mt-2 font-display text-4xl">Übersicht</h1><p className="mt-2 text-sm text-ink/60">Angemeldet als {email}</p></div>
          <button onClick={logout} className="rounded-full border border-ink/20 px-4 py-2 text-sm font-semibold hover:bg-white">Ausloggen</button>
        </header>
        <section className="mb-12"><h2 className="font-display text-2xl">Bewertungen ({reviews.length})</h2><div className="mt-4 grid gap-4">{reviews.length === 0 && <p className="rounded-xl border border-ink/10 bg-white p-5 text-sm text-ink/60">Keine Bewertungen vorhanden.</p>}{reviews.map((review) => <article key={review.id} className="rounded-xl border border-ink/10 bg-white p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-semibold">{review.display_name} · {"★".repeat(review.rating)}</p><p className="mt-2 text-sm text-ink/75">{review.message}</p><p className="mt-3 text-xs uppercase tracking-wider text-ink/45">Status: {review.status}</p></div><div className="flex flex-wrap gap-2 text-xs"><button onClick={() => updateReviewStatus(review.id, "approved")} className="rounded-full bg-lime px-3 py-2 font-semibold">Freigeben</button><button onClick={() => updateReviewStatus(review.id, "rejected")} className="rounded-full border border-ink/15 px-3 py-2">Ablehnen</button><button onClick={() => deleteReview(review.id)} className="rounded-full border border-red-200 px-3 py-2 text-red-700">Löschen</button></div></div></article>)}</div></section>
        <section><h2 className="font-display text-2xl">Anfragen ({inquiries.length})</h2><div className="mt-4 grid gap-4">{inquiries.length === 0 && <p className="rounded-xl border border-ink/10 bg-white p-5 text-sm text-ink/60">Keine Anfragen vorhanden.</p>}{inquiries.map((inquiry) => <article key={inquiry.id} className="rounded-xl border border-ink/10 bg-white p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-semibold">{inquiry.name} · <a className="underline" href={`mailto:${inquiry.email}`}>{inquiry.email}</a></p><p className="mt-2 text-sm text-ink/75">{inquiry.message}</p><p className="mt-3 text-xs text-ink/50">{inquiry.inquiry_type} · {new Date(inquiry.created_at).toLocaleString("de-DE")}</p></div><button onClick={() => deleteInquiry(inquiry.id)} className="rounded-full border border-red-200 px-3 py-2 text-xs text-red-700">Löschen</button></div></article>)}</div></section>
      </div>
    </main>
  );
}
