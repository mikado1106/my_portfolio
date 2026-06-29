# Decisions Log

> Append-only log of notable architecture / scope decisions and deviations from plan.

## 2026-06-27 — Project Modal (semi-demo) instead of iframe / screenshot

**Context:** User asked for a "pengenalan" / mini demo on each project card.
Options considered:
1. Iframe live preview — heavy, breaks for projects without a live URL
2. Screenshot mockup — requires assets, file size cost
3. Detail modal with CV-derived highlights + View Live + GitHub — lightweight, no assets needed

**Chosen:** Option 3. The modal slides up on mobile / centers on desktop, shows the CV bullet points, links to live demo and GitHub. Zero added image weight, works for every project (with or without `liveUrl`).

**Tradeoff:** Less visually rich than a real screenshot. Future improvement: add optional preview image lazy-loaded inside the modal.

---

## 2026-06-27 — Supabase `projects` schema missing `highlights`

**Context:** New `Project` interface adds `highlights: string[]` (CV bullet points) and `liveUrl?: string`. Static `src/data/projects.ts` has both. Supabase schema (`src/lib/supabase/types.ts`) only has: title, description, tech_stack, live_url, github_url, category, featured, image_url.

**Decision (temporary):** In `fetchProjects` mapping, default `highlights: []` and use `category` for `impact`. When Supabase returns data, the modal still renders but without bullet content — gracefully degrades.

**Future fix:** Either (a) add `highlights jsonb` and `impact text` columns to the Supabase `projects` table + matching admin form fields, or (b) drop Supabase override for projects and keep static data as the source of truth. Re-evaluate when admin panel is actively used.

---

## 2026-06-27 — Contact API hardening scope

**Context:** XSS risk found during build (Phase: build). User asked us to take security seriously.

**Applied:**
- HTML-escape `name`, `email`, `message` before embedding in email HTML
- Validate email with regex
- Clamp lengths: name 200, email 200, message 5000 chars

**Not applied (out of scope for this cycle):**
- Rate limiting — Resend has its own quota; can revisit if abuse appears
- CAPTCHA — adds complexity, unnecessary while traffic is low
- Origin / CSRF check — risk is low since the endpoint only sends email to one address

**Trigger to revisit:** receiving spam through the form, or before doing public marketing push.
