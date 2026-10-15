"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const client = getSupabaseBrowserClient();
    const result = client
      ? await client.auth.signInWithPassword({ email, password })
      : { error: new Error("Supabase ist nicht konfiguriert.") };
    if (result.error) {
      setError("Anmeldung fehlgeschlagen. Bitte E-Mail und Passwort prüfen.");
      setPending(false);
      return;
    }
    window.location.reload();
  }

  return (
    <form onSubmit={submit} className="mx-auto flex w-full max-w-md flex-col gap-5 rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">NDS Admin</p>
        <h1 className="mt-2 font-display text-3xl text-ink">Anmelden</h1>
      </div>
      <label className="flex flex-col gap-2 text-sm font-medium text-ink">
        E-Mail
        <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="rounded-lg border border-ink/15 bg-cream px-4 py-3 outline-none focus:border-green" />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium text-ink">
        Passwort
        <input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="rounded-lg border border-ink/15 bg-cream px-4 py-3 outline-none focus:border-green" />
      </label>
      {error && <p className="text-sm text-red-700" role="alert">{error}</p>}
      <button disabled={pending} className="rounded-full bg-green px-5 py-3 text-sm font-semibold text-cream disabled:opacity-60">
        {pending ? "Anmeldung …" : "Einloggen"}
      </button>
    </form>
  );
}
