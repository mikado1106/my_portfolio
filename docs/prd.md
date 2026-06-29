# PRD — Portfolio Website Upgrade (mikhaeledo.com)

- Date: 2026-06-29 · Tier: standard · Mode: 1
- Owner: Mikhael Edo Sinambela · Target role: **Junior Full-Stack Developer**
- Source of truth untuk semua konten: **`Mikhael Edo Sinambela_CV.pdf`** (versi terbaru, 2026-06-29)

---

## 1. Problem Statement

Portfolio Mikhael sudah solid secara teknis (Next.js 15, bilingual, animasi halus, SEO-ready), tapi sebagai **alat job-hunting untuk posisi Junior Full-Stack Developer**, ada gap di tiga lapis:

**Lapis 1 — Kredibilitas (paling kritis):** Konten website tidak sinkron dengan CV otentik. Ada klaim yang sudah usang (Supabase/admin panel — backend sudah dihapus), pencapaian yang tidak ada di CV ("99% uptime", "10+ bugs"), dan satu entri pengalaman kerja yang di CV justru diposisikan sebagai *project*, bukan *employment*. Recruiter rutin cross-check website vs CV vs GitHub — ketidakcocokan = red flag instan.

**Lapis 2 — First impression & konversi:** Hero hanya menampilkan nama (bukan value proposition + role). Copy generik ("clean code, easy to use") = buzzword yang tidak mendiferensiasi. Urutan section menaruh Projects di posisi ke-4, padahal riset recruiter menunjukkan Projects adalah bukti utama dan harus cepat dijangkau. Tidak ada tombol Download CV di hero.

**Lapis 3 — Depth & proof:** Projects hanya card + modal, tanpa case study, tanpa screenshot/demo. Recruiter tidak bisa menilai output. Tidak ada section About, tidak ada sinyal pertumbuhan (blog), tidak ada analytics untuk iterasi.

**Konteks user yang datang:** HRD/recruiter (scan ~10 detik untuk decide explore/skip, lalu 2–5 menit kalau lolos), tech lead (cek depth & GitHub), dan koneksi/referral.

---

## 2. Goals & Non-Goals

### Goals
1. **Kredibilitas 100% akurat** — seluruh konten website konsisten dengan CV terbaru dan repo GitHub publik. Nol klaim yang tidak bisa dibuktikan.
2. **Lolos gerbang 10 detik** — hero langsung menjawab: siapa, bisa apa, role yang dicari, cara kontak/CV.
3. **Tingkatkan konversi** — ≥30% pengunjung unik klik Download CV atau buka Contact.
4. **Beri depth ke projects** — tiap project punya narasi problem → action → result + visual + link yang berfungsi.
5. **Data-driven** — owner bisa lihat analytics dasar untuk iterasi konten.

### Non-Goals
- Tidak membangun ulang backend (Supabase/admin panel sudah dihapus secara sengaja — situs tetap static + Resend untuk contact).
- Tidak mengubah tech stack fundamental (tetap Next.js 15 + Tailwind + Framer Motion).
- Tidak membuat CMS dashboard untuk edit konten tanpa code.
- Tidak redesign total visual identity — *extend* sistem desain yang ada, bukan rebuild.
- Tidak menambah auth/user accounts, comment system, atau newsletter.
- Blog multilingual tidak dikerjakan — blog English-only (SEO global).

---

## 3. Target Users / Personas

### Persona A — HRD / Recruiter Non-Teknis
- **Konteks:** Buka 10–20 portfolio/hari, ~10 detik untuk decide explore-or-skip.
- **Cari:** Role jelas, pengalaman relevan, cara kontak gampang, ada CV.
- **Pain sekarang:** Hero cuma nama, harus buka modal untuk detail project, konten website beda dengan CV.

### Persona B — Tech Lead / Senior Developer
- **Konteks:** Di-tag HRD atau datang dari GitHub/LinkedIn untuk review teknis.
- **Cari:** Depth teknis, problem-solving, kontribusi spesifik, GitHub hygiene (repo, README, commit history).
- **Pain sekarang:** Tidak ada case study, link GitHub project generik (ke profil, bukan repo).

### Persona C — Koneksi / Referral
- **Konteks:** Dapat link, ingin overview cepat.
- **Cari:** Quick "at a glance" yang compelling + cara kontak.

---

## 4. Scope — Task Diurutkan dari KRUSIAL → BIASA

> Format: tiap task punya prioritas (P0 paling krusial → P3 nice-to-have), deskripsi, dan acceptance criteria (AC) yang testable.

---

### 🔴 P0 — CRITICAL: Credibility & Truthfulness
*Tidak bisa ditawar. Ini aktif merugikan sekarang. Effort kecil, dampak besar.*

**P0-1 — Sinkronkan SELURUH konten ke CV terbaru**
Audit & samakan semua data website dengan `Mikhael Edo Sinambela_CV.pdf`.
- AC: **Hapus klaim "Supabase + admin panel"** dari project "Portfolio Website" ([projects.ts](../src/data/projects.ts)) — ganti deskripsi sesuai realita (static site, Resend contact, bilingual, dark/light).
- AC: **Perbaiki bullet pengalaman Mandiri Inhealth** ([experience.ts](../src/data/experience.ts)) agar match CV: auto-email notification untuk Whistleblowing System (WBS); redesign 5 halaman corporate website; kerja frontend+backend PHP CI4, setup Docker, Git harian (branching, PR, code review). **Hapus klaim yang tidak ada di CV** ("99% uptime", "10+ bugs", "RESTful APIs" generik).
- AC: **Hapus entri employment PT Papande Jaya Teknik.** Klarifikasi user: PT Papande adalah **mitra/klien** tempat aplikasi tugas akhir skripsi (HRIS) dibangun — BUKAN tempat kerja. Hapus entri "Fullstack Developer, Jun 2022 – Jan 2026" dari section Experience. Section Experience hanya berisi **magang Mandiri Inhealth** (sesuai CV). Karya untuk PT Papande tetap muncul di section Projects (HRIS + company website).
- AC: **Samakan skills** ([stack.ts](../src/data/stack.ts)) ke CV: JS, TS, PHP, Dart, HTML, CSS, SQL / Next.js, CodeIgniter 4, Flutter, Tailwind, Bootstrap / MySQL / Git, GitHub, Docker, Postman, REST API, VS Code. Hapus yang tidak ada di CV (mis. Python, Firebase, Node.js, React terpisah).
- AC: **Samakan tanggal project** ke CV (HRIS Aug–Dec 2025, Company Website 2026, Salon 2024).

**P0-2 — Ganti file CV**
- AC: File CV baru (`Mikhael Edo Sinambela_CV.pdf`) menggantikan `public/cv.pdf` lama.
- AC: Tombol download mengunduh dengan nama profesional (mis. `Mikhael-Edo-Sinambela-FullStack-CV.pdf` via atribut `download`).
- AC: Link/tombol CV berfungsi di semua tempat (nav + hero).

**P0-3 — Verifikasi & perbaiki semua link**
*Broken link / demo mati = penolakan instan (konsensus kuat riset).*
- AC: Semua `liveUrl` diuji hidup (`landing-page-pt-papande.vercel.app`, `mikhaeledo.com`).
- AC: Link GitHub per-project menunjuk ke **repo spesifik**, bukan profil generik `github.com/mikado1106`.
- AC: Semua link sosial (LinkedIn, GitHub) terverifikasi & buka di tab baru.

---

### 🟠 P1 — HIGH: First Impression & Conversion
*Menentukan apakah pengunjung lolos gerbang 10 detik. Effort kecil-sedang.*

**P1-1 — Tulis ulang Hero jadi value proposition**
- AC: Hero menampilkan: nama + **role spesifik "Junior Full-Stack Developer"** + one-liner value prop berbasis bukti (bukan "clean code/easy to use").
- AC: Mengikuti pola `[Nama] — [role] + value prop + CTA`. Contoh arah: *"Membangun HRIS lengkap untuk 40 karyawan & website korporat dengan PHP/CodeIgniter & Next.js."*
- AC: Tidak ada buzzword terlarang ("passionate", "hardworking", "clean code lover", "easy to use" sebagai klaim kosong).

**P1-2 — Tambah CTA Download CV + perbaiki copy CTA**
- AC: Hero punya CTA primer ("Get in touch"/"Hubungi saya") + CTA sekunder **"Download CV (PDF)"** (outline, subordinat secara visual).
- AC: Copy contact lebih hangat & spesifik ("Get in touch"/"Email me" daripada plain "Contact").
- AC: Microcopy reassurance di dekat kontak (mis. "Biasanya saya balas dalam sehari").

**P1-3 — Reorder sections: Projects naik**
- AC: Projects muncul lebih awal — di atas Organization/Leadership. Urutan baru (final di design phase): Hero → Experience → **Projects** → Stack → Education → Organization → Contact.
- AC: Project paling polished tampil pertama.
- AC: Smooth scroll & anchor nav tetap berfungsi setelah reorder.

---

### 🟡 P2 — MEDIUM: Depth, Proof & Polish
*Membuat portfolio meyakinkan untuk review mendalam (2–5 menit). Effort sedang-besar.*

**P2-1 — Project Case Study Pages (`/projects/[slug]`)**
- AC: Tiap project punya URL `/projects/[slug]` ter-index Google (meta unik).
- AC: Tiap halaman: overview (problem), tech stack, **kontribusi spesifik kamu (3–4 bullet)**, challenges & solusi, hasil/learning, link live + GitHub.
- AC: Bullet pakai pola **"Accomplished X, using Y, resulting in Z"** dengan angka bila ada.
- AC: Navigasi "back to portfolio" + prev/next project.

**P2-2 — Visual per project (screenshot / GIF)**
- AC: Tiap project menampilkan ≥1 screenshot atau GIF demo (10 detik). Riset: visual/demo near-mandatory.
- AC: Graceful placeholder bila belum ada visual (bukan broken image).

**P2-3 — Tambah section "About"**
- AC: Section About (2–4 kalimat spesifik): siapa, fokus stack, yang dicari. Ditaruh setelah Projects.
- AC: Boleh sertakan AI-honesty framing (pakai AI tools + tunjukkan layer kontribusi sendiri) — sinyal positif 2025-26.
- AC: Bilingual (EN/ID) konsisten.

**P2-4 — Project Filtering (client-side)**
- AC: Filter di section Projects: "All / Frontend / Backend / Mobile / Full Stack".
- AC: Client-side, animasi smooth (pakai `AnimatePresence` yang sudah ada), tanpa reload.

**P2-5 — Perbaikan kontras & hierarki visual**
- AC: Naikkan base bg dari `#09090b` (near-black, bikin eye fatigue) ke ~`#0f0f12`.
- AC: Naikkan kontras `--text-muted` agar ≥4.5:1 (WCAG) di atas bg.
- AC: Kurangi jumlah warna aksen yang dipakai serempak (target ~2 utama + 2 sekunder per NN/g). Lolos "squint test".
- AC: Pastikan Stack section TIDAK pakai skill-bar/persentase (red flag) — gunakan label terkelompok. *(Verifikasi `stack.tsx` saat build.)*

**P2-6 — Availability status config-driven**
- AC: Badge "Open to work" yang sudah ada di hero dijadikan satu nilai di config/data (mudah toggle), bukan hardcoded di banyak tempat.

---

### 🟢 P3 — LOW / NICE-TO-HAVE
*Diferensiator jangka panjang, tapi bergantung konten eksternal atau efek tambahan. Kerjakan terakhir.*

**P3-1 — Analytics (Umami)**
- AC: Page view tracking per route (termasuk `/projects/[slug]`).
- AC: Event tracking: Download CV, Contact submit, klik link eksternal (GitHub/LinkedIn).
- AC: Privacy-friendly, async/non-blocking (tidak merusak LCP).

**P3-2 — Blog / Technical Writing (MDX)**
- AC: Route `/blog` (list) + `/blog/[slug]` (detail), MDX, syntax highlighting, responsive.
- AC: Min. 1 artikel placeholder saat launch. *(Bergantung Mikhael menulis konten — lihat Risks.)*

**P3-3 — Testimonials**
- AC: Section testimonials (nama, jabatan/perusahaan, foto opsional, quote).
- AC: Auto-hide bila array kosong (graceful). *(Bergantung pengumpulan dari supervisor/kolega.)*

**P3-4 — Trim efek berlebih**
- AC: Evaluasi & pangkas efek yang berisiko "trying too hard" / berat (mis. custom cursor) demi kecepatan baca & performa mobile.

---

## 5. Success Metrics

| Metric | Baseline (estimasi) | Target |
|--------|--------------------|----|
| Konsistensi konten vs CV | Tidak sinkron (≥4 diskrepansi) | 100% sinkron, 0 klaim tak terbukti |
| CV download rate | Unknown | ≥ 30% unique visitors |
| Avg. pages/session | ~1 | 2.5+ (project pages + blog) |
| Avg. session duration | Unknown | ≥ 2 menit |
| Projects dengan case study + visual | 0 | 3 (semua project) |
| Broken links | Unknown | 0 |

---

## 6. Constraints & Assumptions

**Constraints:**
- Deploy tetap di Vercel.
- Budget $0 — analytics pakai Umami (free tier / self-host).
- Konten via MDX/file di repo (no paid CMS).
- Maintain bilingual (EN/ID) untuk homepage; blog English-only.

**Assumptions:**
- `Mikhael Edo Sinambela_CV.pdf` (2026-06-29) adalah sumber kebenaran konten.
- Screenshot project bisa dibuat dari app yang ada.
- Blog & testimonials bergantung konten dari Mikhael — bila belum siap, section di-hide / di-deprioritize (P3).

**Dependencies:**
- Umami Cloud account (gratis).
- MDX packages (`next-mdx-remote` / `@next/mdx`, `gray-matter`, `rehype-highlight`).

---

## 7. Risks

| Risiko | Kemungkinan | Dampak | Mitigasi |
|--------|------------|--------|---------|
| Konten case study / blog belum siap | High | Medium | Buat skeleton dulu, isi bertahap post-deploy. Blog & testimonial di P3 (non-blocking). |
| Rekonsiliasi PT Papande salah arah | Medium | Tinggi | Confirm keputusan dengan user di build phase sebelum eksekusi. |
| Reorder section merusak anchor/scroll | Low | Low | Test smooth-scroll & nav links setelah reorder. |
| Perubahan warna merusak konsistensi tema | Low | Medium | Ubah lewat CSS variable terpusat; test dark & light. |
| Analytics merusak performa | Low | Medium | Umami async + defer. |

---

## 8. Resolved Decisions

1. **PT Papande Jaya Teknik** ✅ — Mitra/klien tempat aplikasi tugas akhir skripsi (HRIS) dibangun, bukan employment. Entri "Fullstack Developer Jun 2022–Jan 2026" dihapus dari Experience; Experience hanya Mandiri Inhealth (sesuai CV). Karya Papande tetap di Projects.
2. **Blog & Testimonials** ✅ — Di-hide untuk launch (tetap P3). Fokus eksekusi P0–P2. Diaktifkan saat konten siap.

---

> NOTE: No ERD, schema, atau mockup di sini — itu masuk design.md. PRD ini fokus WHAT & WHY, dengan task ter-prioritisasi sebagai panduan urutan eksekusi.
