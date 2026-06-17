# HACK-O-FEST

A cinematic Marvel-homage hackathon site. Built with Next.js 15 (App Router),
TypeScript, Tailwind v4, GSAP ScrollTrigger, Lenis smooth scroll, Motion, and
Supabase.

## Getting started

```bash
pnpm install
cp .env.example .env.local   # paste your Supabase URL + anon key
pnpm dev
```

Open <http://localhost:3000>.

## Pages

- `/` — cinematic landing (Hero × 3 slots, Tracks, Themes, Prizes, Timeline, FAQ)
- `/id-card` — generate a poster-grade Avenger ID PNG with live preview
- `/status` — look up a team's progression by team ID
- `/dashboard/[teamId]` — visual journey timeline for a single team

## Supabase

The app reads from a `teams` table via the anon key. If env vars are missing,
it falls back to seed data in `lib/mockTeams.ts` so every page still works.
Schema and seeds are in `supabase.sql`.

## 3D model slots

Hero has three `<div data-hero-slot="1|2|3">` containers in
`components/hero/Hero.tsx`. Drop a `<Canvas>` (React Three Fiber) inside each
when you're ready — the surrounding scrubbed timeline is already wired.

## Images

All required images and their target paths are documented in `imageprompts.md`.
The site renders intentional gradient placeholders until you swap in real images.
