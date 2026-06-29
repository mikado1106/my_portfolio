# AI Flow State

project: Portfolio Website Upgrade — mikhaeledo.com
mode: 1
tier: standard
phase: ship-v2
phases_done: [prd, design, plan, build-p0-p1, review, ship, prd-v2, build-v2]
next: ship-v2
updated: 2026-06-30

## Flow Log
- 2026-06-29 | prd | PRD dibuat berdasarkan analisis codebase + riset 5 area (design, copywriting, recruiter, struktur, CTA) + audit vs CV terbaru. Task ter-prioritisasi P0→P3. Keputusan: PT Papande = klien tugas akhir (bukan employment, hapus dari Experience); blog & testimonials di-hide untuk launch. PRD approved → lanjut design.
- 2026-06-29 | build | P0+P1+P2 selesai di branch feat/content-sync-p0-p1. P0: sinkron konten ke CV (experience, projects, stack, cv.pdf), fix layout metadata. P1: hero value-prop + role eyebrow + Download CV CTA, reorder sections (Projects naik), fix kontras globals.css. P2: case study pages /projects/[slug], project filtering, About section, availability config-driven (site.ts). TypeScript clean. Siap review.
- 2026-06-30 | ship | Merge ke master + push + deploy production. Fix: env var RESEND_API_KEY korup (RTK hook) → re-add via Node clean. P2-2 visual placeholder (browser mockup) ditambahkan. Live di mikhaeledo.com.
- 2026-06-30 | review | Security review: Origin allowlist + honeypot + strip control chars + generic error + security headers (next.config.ts) + shadcn ke devDeps. Recruiter/copywriting review: Organization overclaim & Education vague teridentifikasi.
- 2026-06-30 | prd-v2 | Audit teknis menyeluruh menemukan bug nyata: sitemap/robots domain salah, OG image broken (/og-image.png tidak ada), case study tanpa metadata SEO, lang attribute statis, 4 dead components. PRD v2 dibuat (docs/prd-v2.md) konsolidasi temuan security+recruiter+audit.
- 2026-06-30 | build-v2 | Semua P0-P2 selesai: P0-1 sitemap/robots domain fix + 5 routes. P0-2 OG image fix (hapus /og-image.png, update opengraph-image.tsx: title Junior, bg #0d0d10, badge conditional). P0-3 case study refactor server+client (generateMetadata + generateStaticParams, 4 routes SSG). P0-4 Organization copy rewrite (hapus overclaim/20%/buzzwords). P1-1 HtmlLang client component (dynamic lang attr). P1-2 Education achievements spesifik. P1-3 replyTime microcopy di contact. P2-1 hapus 4 dead components + 5 SVG boilerplate + dict about keys. P2-2 focus-visible ring pada submit button. Build clean, TypeScript clean.
