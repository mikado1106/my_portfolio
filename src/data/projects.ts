export interface Project {
  name: string;
  desc: string;
  impact: string;
  tags: string[];
  color: string;
  github: string;
  liveUrl?: string;
  highlights: string[];
}

export const projects: Record<"en" | "id", Project[]> = {
  en: [
    {
      name: "HRIS — Employee Management System",
      desc: "Solo-built HRIS for PT. Papande Jaya Teknik (±40 employees) as a final year project. Covers 6 modules with role-based access.",
      impact: "Final Year Project",
      tags: ["PHP", "CodeIgniter 4", "MySQL", "Bootstrap"],
      color: "var(--green)",
      github: "https://github.com/mikado1106/employee-management-system",
      highlights: [
        "Gathered requirements directly from the HR head, then designed and developed the full system",
        "6 modules: employee data, attendance, leave requests, permission requests, recruitment, and admin dashboard",
        "MySQL database with 9 tables; two roles (Admin & Employee) with session-based auth",
      ],
    },
    {
      name: "Company Website — PT. Papande Jaya Teknik",
      desc: "8-page company profile website with WhatsApp integration, scroll animations, and responsive layout — deployed to production.",
      impact: "Client Project",
      tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
      color: "var(--blue)",
      github: "https://github.com/mikado1106",
      liveUrl: "https://landing-page-pt-papande.vercel.app",
      highlights: [
        "Built and deployed an 8-page company profile site for a real client",
        "Pages include services, project portfolio, team profiles, careers, and contact",
        "WhatsApp integration, Framer Motion scroll animations, fully responsive",
      ],
    },
    {
      name: "Salon Reservation App",
      desc: "Mobile booking app prototype — browse services, pick time slots from a calendar, and complete bookings end-to-end.",
      impact: "Mobile Course Project",
      tags: ["Flutter", "Dart"],
      color: "var(--amber)",
      github: "https://github.com/mikado1106/salon-reservation-app",
      highlights: [
        "Team of 3 — built for the Mobile Programming course",
        "Full screen flow: login, signup, profile, service catalog, and booking confirmation",
        "Users can browse services, pick a time slot from a calendar, and add to cart",
      ],
    },
    {
      name: "Portfolio Website",
      desc: "This site — built with Next.js 15, React 19, Framer Motion, and a terminal-inspired design system. Includes admin panel and Supabase backend.",
      impact: "Open Source",
      tags: ["Next.js 15", "React 19", "Tailwind CSS", "Supabase"],
      color: "var(--cyan)",
      github: "https://github.com/mikado1106",
      liveUrl: "https://mikhaeledo.com",
      highlights: [
        "Dark/light theme, bilingual (EN/ID), smooth Framer Motion animations",
        "Admin panel with Supabase backend for managing projects and content",
        "Terminal-inspired design system with custom CSS components",
      ],
    },
  ],
  id: [
    {
      name: "HRIS — Sistem Manajemen Karyawan",
      desc: "Dibangun sendiri sebagai tugas akhir untuk PT. Papande Jaya Teknik (±40 karyawan). Mencakup 6 modul dengan akses berbasis peran.",
      impact: "Tugas Akhir",
      tags: ["PHP", "CodeIgniter 4", "MySQL", "Bootstrap"],
      color: "var(--green)",
      github: "https://github.com/mikado1106/employee-management-system",
      highlights: [
        "Mengumpulkan kebutuhan langsung dari kepala HR, lalu merancang dan membangun sistem lengkap",
        "6 modul: data karyawan, absensi, cuti, izin, rekrutmen kandidat, dan dashboard admin",
        "Database MySQL dengan 9 tabel; dua role (Admin & Karyawan) dengan autentikasi berbasis sesi",
      ],
    },
    {
      name: "Website Perusahaan — PT. Papande Jaya Teknik",
      desc: "Website company profile 8 halaman dengan integrasi WhatsApp, animasi scroll, dan layout responsif — sudah di-deploy ke production.",
      impact: "Project Klien",
      tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
      color: "var(--blue)",
      github: "https://github.com/mikado1106",
      liveUrl: "https://landing-page-pt-papande.vercel.app",
      highlights: [
        "Membangun dan men-deploy website company profile 8 halaman untuk klien nyata",
        "Halaman mencakup layanan, portofolio proyek, profil tim, karir, dan kontak",
        "Integrasi WhatsApp, animasi scroll Framer Motion, sepenuhnya responsif",
      ],
    },
    {
      name: "Aplikasi Reservasi Salon",
      desc: "Prototipe aplikasi booking mobile — jelajahi layanan, pilih slot waktu dari kalender, dan selesaikan pemesanan dari awal hingga akhir.",
      impact: "Project Mobile",
      tags: ["Flutter", "Dart"],
      color: "var(--amber)",
      github: "https://github.com/mikado1106/salon-reservation-app",
      highlights: [
        "Tim 3 orang — dibuat untuk mata kuliah Mobile Programming",
        "Alur layar lengkap: login, daftar, profil, katalog layanan, dan konfirmasi pemesanan",
        "Pengguna dapat menjelajahi layanan, memilih slot waktu dari kalender, dan menambah ke keranjang",
      ],
    },
    {
      name: "Website Portofolio",
      desc: "Situs ini — dibangun dengan Next.js 15, React 19, Framer Motion, dan sistem desain terinspirasi terminal. Termasuk admin panel dan backend Supabase.",
      impact: "Open Source",
      tags: ["Next.js 15", "React 19", "Tailwind CSS", "Supabase"],
      color: "var(--cyan)",
      github: "https://github.com/mikado1106",
      liveUrl: "https://mikhaeledo.com",
      highlights: [
        "Tema gelap/terang, bilingual (EN/ID), animasi Framer Motion yang halus",
        "Admin panel dengan backend Supabase untuk mengelola proyek dan konten",
        "Sistem desain terinspirasi terminal dengan komponen CSS kustom",
      ],
    },
  ],
};
