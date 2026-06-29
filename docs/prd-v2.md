# PRD v2 — Portfolio Website Upgrade (mikhaeledo.com)

- Date: 2026-06-30 · Tier: standard · Mode: 1
- Owner: Mikhael Edo Sinambela · Target role: **Junior Full-Stack Developer**
- Source of truth konten: **`Mikhael Edo Sinambela_CV.pdf`** (2026-06-29)
- Status v1: P0–P2 selesai & deployed. P3 deferred.

---

## 0. Konteks — Kenapa v2?

PRD v1 fokus pada **kredibilitas konten, first impression, dan depth**. Setelah deploy, dilakukan tiga review lanjutan:
1. **Security review** (selesai — Origin check, honeypot, headers, dll).
2. **Recruiter + copywriting review** (menemukan overclaim di Organization & copy lemah).
3. **Technical audit menyeluruh** (menemukan beberapa **bug SEO/metadata nyata** yang lolos dari v1).

PRD v2 mengonsolidasikan temuan #2 dan #3 + sisa item v1 yang belum tuntas. **Penekanan: ini bukan fitur baru, ini menutup gap & bug yang aktif merugikan sekarang.**

---

## 1. Problem Statement

Tiga lapis masalah yang tersisa:

**Lapis 1 — Bug teknis SEO/sharing (silent, merugikan tanpa terlihat):**
Sitemap & robots menunjuk domain lama, OG image broken (file tidak ada), dan halaman case study tidak punya metadata. Akibatnya: link preview di WhatsApp/LinkedIn berpotensi rusak, dan case study tidak ter-index dengan baik di Google. Recruiter sering pertama kali lihat situs lewat **link preview** — kalau rusak, first impression hancur sebelum situs kebuka.

**Lapis 2 — Overclaim yang merusak trust (ironis, justru menurunkan kredibilitas):**
Section Organization penuh buzzword korporat dan metrik yang terdengar mengada-ada ("Orchestrated security protocols", "20% increase", "Mitigated risks through proactive incident response planning"). Senior recruiter membaca ini sebagai AI-padded/inflated, dan kecurigaan itu menular ke seluruh CV.

**Lapis 3 — Kebersihan & polish:**
Dead code (4 komponen tak terpakai + aset bawaan), `lang` attribute statis, microcopy yang dijanjikan v1 belum ada.

---

## 2. Goals & Non-Goals

### Goals
1. **Nol bug SEO/metadata** — semua URL canonical benar, OG image tampil, case study punya meta unik & ter-index.
2. **Kredibilitas 100%** — hapus semua overclaim; setiap klaim bisa dipertanggungjawabkan & terdengar manusiawi.
3. **Codebase bersih** — nol dead code, nol aset boilerplate.
4. **Aksesibilitas dasar** — `lang` dinamis, focus state terlihat, kontras lolos di kedua tema.

### Non-Goals
- Tidak menambah backend/CMS (tetap static + Resend).
- Tidak ubah tech stack (Next.js 15 + Tailwind + Framer Motion).
- Blog & Testimonials tetap deferred sampai konten siap (lihat P3).
- Tidak redesign visual — hanya perbaikan & pembersihan.

---

## 3. Scope — Task Diprioritaskan

> Format: prioritas (P0 krusial → P3 nice-to-have), deskripsi, acceptance criteria (AC) yang testable.

---

### 🔴 P0 — CRITICAL: Bug yang aktif merugikan

**P0-1 — Perbaiki sitemap & robots (domain salah + route hilang)**
- AC: [sitemap.ts](../src/app/sitemap.ts) pakai `https://mikhaeledo.com` (bukan `.vercel.app`).
- AC: Sitemap menyertakan **semua route**: `/` + 4 case study `/projects/[slug]` (hris, papande-website, salon-app, portfolio).
- AC: [robots.ts](../src/app/robots.ts) pakai domain `mikhaeledo.com` untuk URL sitemap.
- AC: `/sitemap.xml` di production menampilkan 5 URL dengan domain benar.

**P0-2 — Perbaiki OG image (broken + inkonsisten)**
- AC: Tentukan satu sumber OG image. Rekomendasi: pakai **`opengraph-image.tsx` dinamis** (sudah ada), hapus referensi manual `/og-image.png` di [layout.tsx](../src/app/layout.tsx:47) yang menunjuk file tidak ada.
- AC: [opengraph-image.tsx](../src/app/opengraph-image.tsx) diupdate: title **"Junior Full-Stack Developer"** (bukan "Full-Stack Developer"), warna bg `#0d0d10` (samakan dgn `--bg` baru), badge konsisten dgn `siteConfig.openToWork`.
- AC: Test via [opengraph.xyz](https://www.opengraph.xyz) atau share ke WhatsApp — preview tampil benar.

**P0-3 — Metadata untuk case study pages (SEO gap dari v1)**
- AC: Tiap `/projects/[slug]` punya `<title>` & meta description unik (problem: halaman `"use client"` tidak bisa export `metadata`).
- AC: Solusi: pisahkan jadi **Server Component `page.tsx` + `generateMetadata()` + `generateStaticParams()`**, render konten interaktif lewat child `"use client"` (mis. `case-study-client.tsx`). Atau gunakan pendekatan setara yang memungkinkan metadata per-slug.
- AC: OG tag per project (title, description, gambar) ter-set.
- AC: `view-source` tiap case study menampilkan title & meta unik (bukan title homepage).

**P0-4 — Hapus overclaim di Organization (red flag kredibilitas)**
- AC: [organization.ts](../src/data/organization.ts) ditulis ulang EN+ID: hapus buzzword korporat ("Orchestrated", "Mitigated...proactive incident response", "Directed strategic planning"), hapus bullet duplikat, **hapus metrik "20%" kecuali ada data nyata**.
- AC: Tiap entri maksimal 2–3 bullet, pakai action verb jujur & spesifik, terdengar manusiawi.
- AC: Tetap bilingual konsisten.

---

### 🟠 P1 — HIGH: Konsistensi & kelengkapan

**P1-1 — `<html lang>` dinamis**
- AC: Attribute `lang` di [layout.tsx](../src/app/layout.tsx:107) mengikuti bahasa aktif (`en`/`id`), bukan hardcode `"en"`. Penting untuk screen reader & SEO.

**P1-2 — Education achievements lebih spesifik**
- AC: [education.ts](../src/data/education.ts) ganti bullet vague ("Built multiple fullstack projects", "Active in campus tech community") jadi 2 bullet konkret (tugas akhir HRIS + ringkasan coursework). EN+ID.

**P1-3 — Microcopy reassurance di contact (carry-over v1 P1-2)**
- AC: Dekat form/contact ada microcopy tipis seperti "Biasanya saya balas dalam 1 hari" / "I usually reply within a day". Bilingual.

**P1-4 — Verifikasi link GitHub per-project (carry-over v1 P0-3)**
- AC: Konfirmasi: HRIS & Salon → repo spesifik (sudah). Papande & Portfolio → profil generik (intentional krn private). Dokumentasikan keputusan; tidak ada link 404.

---

### 🟡 P2 — MEDIUM: Pembersihan & aksesibilitas

**P2-1 — Hapus dead code**
- AC: Hapus komponen tak terpakai: `about.tsx`, `stats-bar.tsx`, `custom-cursor.tsx`, `preloader.tsx` (verifikasi tidak diimpor di mana pun sebelum hapus).
- AC: Hapus key `about` di [dictionaries.ts](../src/i18n/dictionaries.ts) (EN+ID) yang tidak terpakai.
- AC: Hapus aset boilerplate Next di `public/`: `next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`.
- AC: Build tetap hijau setelah pembersihan.

**P2-2 — Audit aksesibilitas dasar**
- AC: Semua elemen interaktif punya focus state terlihat (keyboard nav).
- AC: Kontras teks lolos WCAG AA di tema **gelap & terang** (tema terang sering terlewat).
- AC: `prefers-reduced-motion` dihormati untuk animasi berat (Framer Motion).
- AC: Semua gambar punya `alt` deskriptif (cek `profile.jpg`).

**P2-3 — Visual case study lebih kuat (carry-over v1 P2-2)**
- AC: Untuk project dgn live URL (Papande, Portfolio), pertimbangkan screenshot asli menggantikan placeholder browser-mockup. Graceful fallback tetap untuk yang tanpa demo (HRIS private, Salon).

---

### 🟢 P3 — LOW / NICE-TO-HAVE (carry-over v1, tergantung konten/waktu)

**P3-1 — Analytics (Umami)** — page view + event (CV download, contact submit, klik eksternal). Privacy-friendly, async.

**P3-2 — Blog / Technical Writing (MDX)** — `/blog` + `/blog/[slug]`, English-only. Min. 1 artikel saat launch. *(Tergantung Mikhael menulis.)*

**P3-3 — Testimonials** — section dgn auto-hide bila kosong. *(Tergantung pengumpulan dari supervisor/kolega.)*

**P3-4 — Growth signal** — "Currently learning X" atau bagian kecil yang menunjukkan arah belajar (sinyal positif untuk junior).

**P3-5 — Trim efek berlebih** — evaluasi animasi/efek berat untuk performa mobile. *(Dead `custom-cursor.tsx` menunjukkan ini sudah sebagian dipertimbangkan.)*

---

## 4. Success Metrics

| Metric | Sebelum v2 | Target v2 |
|--------|-----------|-----------|
| Bug SEO/metadata | 3 (sitemap, robots, OG) | 0 |
| Case study dgn meta unik | 0 | 4 |
| Overclaim di konten | Ada (Organization) | 0 |
| Dead code (komponen) | 4 | 0 |
| `lang` attribute akurat saat switch | Tidak | Ya |
| OG preview tampil benar saat di-share | Broken | Tampil |

---

## 5. Constraints & Assumptions

**Constraints:**
- Deploy tetap Vercel, budget $0.
- Static + Resend; bilingual EN/ID untuk homepage; blog English-only.

**Assumptions:**
- Angka di Organization (40+/60+/15) akurat — **butuh konfirmasi owner** sebelum ditulis ulang.
- Screenshot project bisa diambil dari live app.

**Risks:**
| Risiko | Kemungkinan | Dampak | Mitigasi |
|--------|------------|--------|---------|
| Refactor case study (client→server) merusak animasi lang/theme | Medium | Medium | Pisah server (metadata) + client (interaktif); test toggle setelahnya. |
| Hapus dead code ternyata masih dipakai | Low | Low | Grep import sebelum hapus; build check. |
| Angka Organization tak terverifikasi | Medium | Medium | Konfirmasi owner; default ke klaim tanpa angka. |

---

## 6. Urutan Eksekusi yang Disarankan

1. **P0-1, P0-2** (sitemap/robots/OG) — quick win, fix bug paling silent.
2. **P0-4, P1-2** (copy: Organization + Education) — butuh konfirmasi angka dulu.
3. **P0-3** (case study metadata) — refactor paling teknis, kerjakan saat fokus.
4. **P1-1, P1-3, P1-4** — perbaikan kecil.
5. **P2** — pembersihan & a11y setelah fungsional beres.
6. **P3** — sesuai kesiapan konten.

---

> NOTE: PRD v2 fokus WHAT & WHY. Detail teknis refactor case study (struktur file server/client) masuk ke design/build phase. Semua P0–P2 zero-dependency, tidak ubah arsitektur fundamental.
