# NDS — Personal Tennis Coaching

Premium, mobile-first website for NDS, Andy Dumitrescu's personal tennis-coaching brand (`nds-game.com`). Next.js (App Router) + TypeScript + Tailwind CSS v4, with a Supabase-backed review/inquiry system.

## Working with other agents

This repository is also worked on by OpenAI Codex and Google Antigravity. Before making sweeping changes, check `git log`/`git status` and prefer small, understandable commits.

- **This pass (Claude)** built the foundation: Next.js architecture, the design system, DE/EN i18n, all sections, and the Supabase schema/RLS/server actions (scaffolded but not connected to a live project — see below).
- **Codex** is expected to focus on Supabase hookup/security, validation hardening, testing, and a review-moderation admin tool (there is none yet — see "Review moderation").
- **Antigravity** is expected to focus on cross-browser/responsive QA.

## Stack

- Next.js 16 (App Router, Turbopack, React 19), TypeScript strict
- Tailwind CSS v4 (CSS-first `@theme` tokens in `app/globals.css`)
- `@supabase/supabase-js` + `zod` for the reviews/inquiries backend
- No UI kit, no animation library, no i18n library — see `lib/i18n/` and `components/ui/reveal.tsx`

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/de` (default locale). The site runs and looks complete with **zero environment variables set**: Supabase-backed sections fall back to graceful empty/unavailable states instead of erroring.

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values as they become available:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Enables the Reviews section and both forms. Safe to expose client-side; all access is governed by RLS (see below). |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email shown in the Contact section. Defaults to an obviously fake placeholder. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Digits only (e.g. `491511234567`). The WhatsApp button is hidden entirely when unset. |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Optional footer link. |

## Supabase setup

No Supabase project is connected yet (the account available in this session wasn't the right one for NDS). The schema is fully written and ready to apply:

```bash
supabase login
supabase link --project-ref <your-project-ref>
supabase db push   # applies supabase/migrations/0001_create_reviews.sql and 0002_create_inquiries.sql
```

Or apply the two files in `supabase/migrations/` directly via the SQL editor / an MCP `apply_migration` call. Then set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from the project's API settings.

Both tables have RLS enabled from the start:

- **`reviews`** — anyone can `insert` (forced to `status = 'pending'` by both a check constraint and the RLS policy) and `select` only `status = 'approved'` rows. There is no anon/authenticated `update`/`delete` policy.
- **`inquiries`** — anyone can `insert`; there is no `select`/`update`/`delete` policy for anon/authenticated at all, since inquiries contain personal contact details.

### Review moderation

There is **no admin UI yet** — approving/rejecting a review means updating its `status` column directly (SQL editor, or the service-role key from a script), which bypasses RLS by design. Building a proper moderation tool is flagged as a follow-up for Codex.

## Content editing

All copy and structural data lives in `content/`, not scattered through components:

- `content/site.ts` — brand name, **the hero slogan** (not finalized yet — this is the one line to edit), section anchor ids, contact/social placeholders.
- `content/dictionaries/de.ts` / `en.ts` — every translated string, organized by section, matching the `Dictionary` type in `content/types.ts`.
- `content/clubs.ts` — the plain-text list of past clubs/venues (intentionally no logos — no usage permission confirmed).
- `content/services.ts` — the ordered list of training-format keys shown in the Training section.

**Positioning note:** copy must never imply NDS employs the 20+ coaches in its network (use "im professionellen Netzwerk", not "unser Team"/"Mitarbeiter"), and must not present NDS as an established multi-year tennis school — see the phrasing already used in `content/dictionaries/*.ts` as the reference.

## Image replacement

There are no final photos yet. Every photo slot renders via `components/ui/photo-placeholder.tsx` (`<Photo />`), which shows a clearly labeled placeholder box until a `src` is passed, at which point it renders an optimized `next/image`. To drop in a real photo: add the file under `public/images/`, then pass `src="/images/…"` at each `<Photo />` call site (hero, about, gallery).

## Legal pages

`/impressum` and `/datenschutz` are intentionally placeholder pages (`app/[locale]/impressum`, `app/[locale]/datenschutz`) — no address, tax ID, or entity details have been invented. Fill in `content/dictionaries/{de,en}.ts` → `legal.*` once the owner provides real business details.

## Deployment (Vercel)

Connect the GitHub repo to Vercel, set the environment variables above in the project settings, and deploy — no special build configuration is needed.
