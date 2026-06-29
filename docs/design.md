# Design & Plan (Ringan) — Portfolio Upgrade

> Dokumen gabungan **design + plan** untuk skala portfolio 1 orang. Fokus: P0 (konten) siap eksekusi, P1/P2 yang butuh visual dapat blueprint. Mengacu ke [`prd.md`](./prd.md). Sumber kebenaran konten: CV terbaru (2026-06-29).

---

## A. Design System — yang DIPERTAHANKAN

Sistem desain existing sudah matang & konsisten (terminal-inspired, CSS variable terpusat, dark/light, reduced-motion handler). **Kita extend, bukan rebuild.**

- **Type:** Geist Sans (UI) + Geist Mono (kode/tag) — sudah pas untuk persona "developer". Tidak diganti.
- **Layout:** `max-w-5xl` container, grid + gap, section-tag uppercase. Dipertahankan.
- **Motion:** fadeUpBlur / stagger Framer Motion — bagus, dipertahankan.

## B. Design System — yang DIUBAH (P2-5, fix kontras)

Token warna saat ini punya 2 masalah aksesibilitas nyata di [`globals.css`](../src/app/globals.css):

| Token | Sekarang | Jadi | Alasan |
|-------|----------|------|--------|
| `--bg` (dark) | `#09090b` | `#0d0d10` | `#09090b` near-pure-black → eye fatigue. Naik tipis, tetap "deep dark". |
| `--text-muted` (dark) | `#52525b` | `#71717a` | Kontras `#52525b` di atas bg ≈ 3.5:1 (gagal WCAG AA 4.5:1). `#71717a` ≈ 4.6:1 ✅ |

> Aksen (`--green` primary, `--blue` secondary) **tidak ditambah** — sudah cukup. Amber/cyan/purple hanya dipakai di syntax highlight terminal (kontekstual, OK).

---

## C. Hero Baru (P1-1, P1-2) — Blueprint

**Masalah sekarang:** `<h1>` cuma nama. Tidak ada role, tidak ada value-prop, tidak ada tombol CV.

**Struktur baru (urut atas→bawah):**
1. Badge "Open to work" (sudah ada) — dipertahankan.
2. **Eyebrow:** `Junior Full-Stack Developer` (mono, text-secondary) — role eksplisit DI ATAS nama.
3. **`<h1>`:** "Mikhael Edo Sinambela" (tetap, tapi sekarang ada konteks role di atasnya).
4. **Value-prop (pengganti `dict.hero.description`):** berbasis bukti, bukan buzzword.
   - **EN:** *"I build full-stack web apps — from a complete HRIS for a 40-employee company to corporate sites with PHP/CodeIgniter, Next.js, and Flutter."*
   - **ID:** *"Saya membangun aplikasi web full-stack — dari HRIS lengkap untuk perusahaan 40 karyawan hingga website korporat, dengan PHP/CodeIgniter, Next.js, dan Flutter."*
   - ❌ Buang: "clean code", "easy to use" (buzzword kosong).
5. **CTA group:**
   - Primary: "Get in touch" / "Hubungi saya" (filled, mailto) — sudah ada, copy diperhalus.
   - Secondary: **"Download CV"** (outline, `href="/cv.pdf" download`) — BARU.
   - Tertiary: "View projects" / "Lihat proyek" (ghost/link, `#projects`) — turun jadi link biasa biar CV menonjol.
6. Social links + lokasi — dipertahankan.

**Tidak diubah:** foto, parallax, animasi. Cuma tambah teks + 1 tombol.

---

## D. Reorder Section (P1-3)

Di [`page.tsx`](../src/app/page.tsx):

```
SEKARANG: Hero → Experience → Organization → Projects → Education → Stack → Contact
BARU:     Hero → Experience → Projects → Stack → Education → Organization → Contact
```

Cuma pindah urutan render — anchor & smooth-scroll otomatis ikut. Test nav links setelah pindah.

---

## E. Case Study Pages (P2-1) — Blueprint ringan

Route baru `/projects/[slug]`. Data extend dari [`projects.ts`](../src/data/projects.ts) (tambah field opsional: `slug`, `problem`, `contributions[]`, `challenges`, `result`, `images[]`).

**Layout halaman:** Back link → Title + impact badge → Hero image/placeholder → Overview (problem) → Tech stack tags → "What I did" (3-4 bullet pola *X using Y resulting in Z*) → Challenges & solusi → Result/learning → Live + GitHub button → Prev/next nav.

> Reuse komponen existing (`.term`, `.tag`, `.metric-card`). Tidak ada komponen visual baru yang berat.

---

## F. PLAN EKSEKUSI — urut, dengan temuan konkret

### 🔴 P0 — Konten (SIAP EKSEKUSI, ~30-45 menit, murni edit teks)

**P0-1a — `experience.ts`:**
- Perbaiki bullet Mandiri (EN+ID) → sesuai CV: auto-email notification untuk WBS; redesign 5 halaman website korporat; frontend+backend PHP CI4; Docker; Git harian (branching, PR, code review). **Buang:** "99% uptime", "10+ bugs", "RESTful APIs" generik.
- **Hapus seluruh entri PT Papande** (employment) dari array EN & ID.

**P0-1b — `projects.ts`:**
- Entri "Portfolio Website": hapus klaim Supabase/admin panel (EN+ID). Tag `Supabase` → ganti `Resend`. Desc & highlights → realita (static, bilingual, dark/light, contact via Resend).
- Link GitHub generik `github.com/mikado1106` → repo spesifik. **⚠️ Perlu konfirmasi URL repo:** Company Website PT Papande & Portfolio Website. (HRIS & Salon sudah spesifik.)

**P0-1c — `stack.ts`** (temuan: banyak yang TIDAK ada di CV):
- **Buang:** Python, Visual Basic .NET, Node.js, Firebase, Mindview, ProjectLibre, Figma, UI/UX.
- **Tambah (ada di CV):** Bootstrap, GitHub, Postman, VS Code.
- Hasil akhir sesuai CV: Languages (JS, TS, PHP, Dart, HTML/CSS, SQL) / Frameworks (Next.js, CodeIgniter 4, Flutter, Tailwind, Bootstrap) / Database (MySQL) / Tools (Git, GitHub, Docker, Postman, REST API, VS Code).

**P0-2 — Ganti file CV:**
- Copy CV baru → `public/cv.pdf`. Atribut `download="Mikhael-Edo-Sinambela-CV.pdf"`.

**P0-3 — Verifikasi link:** cek liveUrl hidup + GitHub per-project + social (butuh konfirmasi 2 URL repo di atas).

### 🟠 P1 — Hero & Reorder (~1 jam, butuh edit komponen)
- P1-1/P1-2: `hero.tsx` + `dictionaries.ts` (eyebrow role, value-prop baru, tombol Download CV).
- P1-3: reorder `page.tsx`.
- P2-5 (digabung): fix 2 token warna di `globals.css`.

### 🟡 P2 — Depth (terpisah, setelah P0+P1 di-approve)
Case study pages, screenshot, About, filtering. Ini sprint sendiri.

---

## G. Yang BUTUH input kamu sebelum eksekusi

1. **URL repo GitHub** untuk: (a) Company Website PT Papande, (b) Portfolio Website ini. Kalau belum di-push/private, sementara kita arahkan ke live demo aja (tanpa link GitHub palsu).
2. **File CV baru** — konfirmasi path: `D:\File Mikhael\My_Doc\Mikhael Edo Sinambela_CV.pdf`?
