"use client";

import { useState } from "react";
import { markPasswordChanged } from "@/actions/admin";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

export function PasswordChange() {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (password.length < 8) return setError("Das neue Passwort muss mindestens 8 Zeichen lang sein.");
    if (password !== confirmation) return setError("Die Passwörter stimmen nicht überein.");
    const client = getSupabaseBrowserClient();
    if (!client) return setError("Supabase ist nicht konfiguriert.");
    setPending(true);
    const { error: updateError } = await client.auth.updateUser({ password });
    if (updateError) {
      setError("Das Passwort konnte nicht geändert werden.");
      setPending(false);
      return;
    }
    await markPasswordChanged();
    window.location.reload();
  }

  return (
    <main className="min-h-screen bg-cream px-5 py-16 text-ink">
      <form onSubmit={submit} className="mx-auto flex w-full max-w-md flex-col gap-5 rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
        <div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">NDS Admin</p><h1 className="mt-2 font-display text-3xl">Passwort ändern</h1><p className="mt-3 text-sm leading-relaxed text-ink/65">Bitte ändere dein Passwort, bevor du das Admin-Panel verwenden kannst.</p></div>
        <label className="flex flex-col gap-2 text-sm font-medium">Neues Passwort<input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="rounded-lg border border-ink/15 bg-cream px-4 py-3 outline-none focus:border-green" /></label>
        <label className="flex flex-col gap-2 text-sm font-medium">Passwort wiederholen<input required minLength={8} type="password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="rounded-lg border border-ink/15 bg-cream px-4 py-3 outline-none focus:border-green" /></label>
        {error && <p className="text-sm text-red-700" role="alert">{error}</p>}
        <button disabled={pending} className="rounded-full bg-green px-5 py-3 text-sm font-semibold text-cream disabled:opacity-60">{pending ? "Speichern …" : "Passwort speichern"}</button>
      </form>
    </main>
  );
}
