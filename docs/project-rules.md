# Project Rules — mikhaeledo-portfolio

> Non-negotiable rules for this project. AI must obey these in every phase.

## Stack & Versions
- Language/runtime: TypeScript, Node 20+
- Framework: Next.js 15 (App Router), React 19
- Database: Supabase (Postgres)
- Key libraries: Framer Motion, Tailwind CSS v4, shadcn/ui, Resend (email)
- Deployment target: Vercel

## Conventions
- Naming: kebab-case for files, PascalCase for components, camelCase for vars/functions
- Folder structure: `src/app` (routes), `src/components` (shared UI), `src/data` (static content), `src/lib` (utilities), `src/contexts` (React contexts)
- Formatting/lint: ESLint default (Next.js config)
- Commit messages: Conventional Commits in English (feat, fix, refactor, style, docs, chore)
- i18n: every user-facing string goes through `dictionaries.ts` with both `en` and `id` entries

## Quality Bar
- Type safety: required — no implicit `any`, all props typed
- Error handling: API routes must return proper status codes; no silent failures
- Testing: not required for now; add when logic gets non-trivial
- Security:
  - All API inputs validated and length-capped at the boundary
  - Escape HTML entities before embedding user input in emails or templates
  - Never expose Supabase service-role key to client
  - Use `rel="noopener noreferrer"` on all external links

## Performance
- Prefer static rendering where possible; client components only when needed
- Use `next/image` for all images
- Lazy-load heavy components (modals, sections below the fold) when bundle grows
- Animations should run on `transform`/`opacity` only — avoid layout-shifting properties
- Respect `prefers-reduced-motion`

## AI Must Always
- Make a new branch before starting non-trivial work
- Show step-by-step git operations when committing
- Sync portfolio content (projects, experience, education) with the current CV
- Keep both EN and ID dictionaries updated together
- Verify before declaring "done" — run `npm run build` for production-impacting changes

## AI Must Never
- Auto-commit without user approval
- Add new dependencies without explaining why
- Hardcode secrets or production URLs in committed code
- Embed unsanitized user input into HTML templates or emails
- Break the dark/light theme contract (use `var(--...)` tokens, not hex)
