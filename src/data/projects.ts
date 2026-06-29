export interface Project {
  name: string;
  slug: string;
  desc: string;
  impact: string;
  tags: string[];
  category: "frontend" | "backend" | "mobile" | "fullstack";
  color: string;
  github: string;
  liveUrl?: string;
  highlights: string[];
  problem?: string;
  contributions?: string[];
  challenges?: string;
  result?: string;
}

export const projects: Record<"en" | "id", Project[]> = {
  en: [
    {
      name: "HRIS: Employee Management System",
      slug: "hris",
      desc: "Solo-built HRIS for PT. Papande Jaya Teknik (±40 employees) as a final year project. Covers 6 modules with role-based access.",
      impact: "Final Year Project",
      tags: ["PHP", "CodeIgniter 4", "MySQL", "Bootstrap"],
      category: "fullstack",
      color: "var(--green)",
      github: "https://github.com/mikado1106/employee-management-system",
      highlights: [
        "Gathered requirements directly from the HR head, then designed and developed the full system",
        "6 modules: employee data, attendance, leave requests, permission requests, recruitment, and admin dashboard",
        "MySQL database with 9 tables; two roles (Admin & Employee) with session-based auth",
      ],
      problem: "PT. Papande Jaya Teknik needed a digital HR system to replace manual spreadsheets, covering employee records, attendance, leave, and recruitment for ±40 employees.",
      contributions: [
        "Gathered functional requirements directly from the HR department head",
        "Designed a normalized MySQL schema with 9 tables covering all HR workflows",
        "Built 6 modules solo: employee data, attendance, leave, permission, recruitment, and admin dashboard",
        "Implemented two-role auth (Admin & Employee) with session-based access control",
      ],
      challenges: "Managing the full scope of an HRIS solo, from database design to frontend UI, within an academic deadline while ensuring each module worked reliably end-to-end.",
      result: "Delivered a fully functional HRIS used as the final year thesis project. All 6 modules operational with real data validated by the HR team.",
    },
    {
      name: "Company Website for PT. Papande Jaya Teknik",
      slug: "papande-website",
      desc: "8-page company profile website with WhatsApp integration, scroll animations, and responsive layout, deployed to production.",
      impact: "Client Project",
      tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
      category: "frontend",
      color: "var(--blue)",
      github: "https://github.com/mikado1106",
      liveUrl: "https://landing-page-pt-papande.vercel.app",
      highlights: [
        "Built and deployed an 8-page company profile site for a real client",
        "Pages include services, project portfolio, team profiles, careers, and contact",
        "WhatsApp integration, Framer Motion scroll animations, fully responsive",
      ],
      problem: "PT. Papande Jaya Teknik, a construction and engineering firm, needed a professional online presence to represent their services and attract potential clients.",
      contributions: [
        "Translated client requirements into 8 structured pages: home, services, portfolio, team, careers, and contact",
        "Implemented WhatsApp CTA integration for direct client inquiries",
        "Built scroll-triggered animations using Framer Motion throughout the site",
        "Deployed to Vercel with custom domain configuration",
      ],
      challenges: "Translating a non-technical client's vision into a clean, modern web presence, balancing visual appeal with fast load times and mobile responsiveness.",
      result: "Live at landing-page-pt-papande.vercel.app. A production-ready company profile that the client actively uses.",
    },
    {
      name: "Salon Reservation App",
      slug: "salon-app",
      desc: "Mobile booking app prototype. Browse services, pick time slots from a calendar, and complete bookings end-to-end.",
      impact: "Mobile Course Project",
      tags: ["Flutter", "Dart"],
      category: "mobile",
      color: "var(--amber)",
      github: "https://github.com/mikado1106/salon-reservation-app",
      highlights: [
        "Team of 3, built for the Mobile Programming course",
        "Full screen flow: login, signup, profile, service catalog, and booking confirmation",
        "Users can browse services, pick a time slot from a calendar, and add to cart",
      ],
      problem: "Build a functional mobile reservation app for a salon, covering browsing, scheduling, and booking, as part of a Mobile Programming course.",
      contributions: [
        "Collaborated in a team of 3 to design and implement the full app",
        "Built the service catalog and time-slot calendar booking flow",
        "Implemented login, signup, profile, and booking confirmation screens",
        "Integrated cart functionality for multi-service bookings",
      ],
      challenges: "Coordinating parallel development across 3 people with shared state, managing merge conflicts and keeping UI consistent across all screens.",
      result: "Delivered a complete Flutter prototype with end-to-end booking flow, submitted for the Mobile Programming course.",
    },
    {
      name: "Portfolio Website",
      slug: "portfolio",
      desc: "This site, built with Next.js 15, React 19, Framer Motion, and a terminal-inspired design system. Bilingual (EN/ID), dark/light theme, contact form via Resend.",
      impact: "Open Source",
      tags: ["Next.js 15", "React 19", "Tailwind CSS", "Framer Motion", "Resend"],
      category: "frontend",
      color: "var(--cyan)",
      github: "https://github.com/mikado1106",
      liveUrl: "https://mikhaeledo.com",
      highlights: [
        "Dark/light theme, bilingual (EN/ID), smooth Framer Motion animations",
        "Contact form powered by Resend, fully static with no backend required",
        "Terminal-inspired design system with custom CSS components and Geist typography",
      ],
      problem: "Needed a developer portfolio that passes a recruiter's 10-second scan and gives hiring managers enough depth to evaluate my work.",
      contributions: [
        "Designed the terminal-inspired visual identity from scratch, including CSS variables, typography, and component library",
        "Built bilingual (EN/ID) support via a custom language context and dictionary system",
        "Implemented dark/light theming, smooth scroll, and Framer Motion page animations",
        "Integrated Resend for contact form, zero backend, fully static deployment on Vercel",
      ],
      challenges: "Balancing visual complexity (animations, grain texture, ambient glows) with performance and accessibility, ensuring the site stays fast and readable across themes and locales.",
      result: "Live at mikhaeledo.com. The portfolio you're looking at right now.",
    },
  ],
  id: [
    {
      name: "HRIS: Sistem Manajemen Karyawan",
      slug: "hris",
      desc: "Dibangun sendiri sebagai tugas akhir untuk PT. Papande Jaya Teknik (±40 karyawan). Mencakup 6 modul dengan akses berbasis peran.",
      impact: "Tugas Akhir",
      tags: ["PHP", "CodeIgniter 4", "MySQL", "Bootstrap"],
      category: "fullstack",
      color: "var(--green)",
      github: "https://github.com/mikado1106/employee-management-system",
      highlights: [
        "Mengumpulkan kebutuhan langsung dari kepala HR, lalu merancang dan membangun sistem lengkap",
        "6 modul: data karyawan, absensi, cuti, izin, rekrutmen kandidat, dan dashboard admin",
        "Database MySQL dengan 9 tabel; dua role (Admin & Karyawan) dengan autentikasi berbasis sesi",
      ],
      problem: "PT. Papande Jaya Teknik membutuhkan sistem HR digital untuk menggantikan spreadsheet manual, mencakup data karyawan, absensi, cuti, dan rekrutmen untuk ±40 karyawan.",
      contributions: [
        "Mengumpulkan kebutuhan fungsional langsung dari kepala HRD",
        "Merancang skema MySQL yang dinormalisasi dengan 9 tabel untuk semua alur kerja HR",
        "Membangun 6 modul secara solo: data karyawan, absensi, cuti, izin, rekrutmen, dan dashboard admin",
        "Mengimplementasikan autentikasi dua peran (Admin & Karyawan) dengan kontrol akses berbasis sesi",
      ],
      challenges: "Menangani seluruh scope HRIS secara solo, dari desain database hingga UI frontend, dalam tenggat akademik sekaligus memastikan setiap modul berfungsi andal.",
      result: "Menghasilkan HRIS yang berfungsi penuh sebagai proyek tugas akhir. Semua 6 modul beroperasi dengan data nyata yang divalidasi oleh tim HR.",
    },
    {
      name: "Website Perusahaan untuk PT. Papande Jaya Teknik",
      slug: "papande-website",
      desc: "Website company profile 8 halaman dengan integrasi WhatsApp, animasi scroll, dan layout responsif, sudah di-deploy ke production.",
      impact: "Project Klien",
      tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
      category: "frontend",
      color: "var(--blue)",
      github: "https://github.com/mikado1106",
      liveUrl: "https://landing-page-pt-papande.vercel.app",
      highlights: [
        "Membangun dan men-deploy website company profile 8 halaman untuk klien nyata",
        "Halaman mencakup layanan, portofolio proyek, profil tim, karir, dan kontak",
        "Integrasi WhatsApp, animasi scroll Framer Motion, sepenuhnya responsif",
      ],
      problem: "PT. Papande Jaya Teknik, perusahaan konstruksi dan teknik, membutuhkan kehadiran online yang profesional untuk mewakili layanan mereka dan menarik klien potensial.",
      contributions: [
        "Menerjemahkan kebutuhan klien menjadi 8 halaman terstruktur: beranda, layanan, portofolio, tim, karir, dan kontak",
        "Mengimplementasikan integrasi WhatsApp CTA untuk pertanyaan langsung dari klien",
        "Membangun animasi scroll menggunakan Framer Motion di seluruh situs",
        "Men-deploy ke Vercel dengan konfigurasi domain kustom",
      ],
      challenges: "Menerjemahkan visi klien non-teknis menjadi tampilan web yang bersih dan modern, menyeimbangkan daya tarik visual dengan waktu muat cepat dan responsivitas mobile.",
      result: "Live di landing-page-pt-papande.vercel.app. Company profile siap produksi yang aktif digunakan oleh klien.",
    },
    {
      name: "Aplikasi Reservasi Salon",
      slug: "salon-app",
      desc: "Prototipe aplikasi booking mobile. Jelajahi layanan, pilih slot waktu dari kalender, dan selesaikan pemesanan dari awal hingga akhir.",
      impact: "Project Mobile",
      tags: ["Flutter", "Dart"],
      category: "mobile",
      color: "var(--amber)",
      github: "https://github.com/mikado1106/salon-reservation-app",
      highlights: [
        "Tim 3 orang, dibuat untuk mata kuliah Mobile Programming",
        "Alur layar lengkap: login, daftar, profil, katalog layanan, dan konfirmasi pemesanan",
        "Pengguna dapat menjelajahi layanan, memilih slot waktu dari kalender, dan menambah ke keranjang",
      ],
      problem: "Membangun aplikasi reservasi mobile untuk salon, mencakup penelusuran, penjadwalan, dan pemesanan, sebagai bagian dari mata kuliah Mobile Programming.",
      contributions: [
        "Berkolaborasi dalam tim 3 orang untuk merancang dan mengimplementasikan aplikasi lengkap",
        "Membangun katalog layanan dan alur pemesanan kalender slot waktu",
        "Mengimplementasikan layar login, daftar, profil, dan konfirmasi pemesanan",
        "Mengintegrasikan fungsionalitas keranjang untuk pemesanan multi-layanan",
      ],
      challenges: "Mengkoordinasikan pengembangan paralel 3 orang dengan state bersama, mengelola konflik merge dan menjaga konsistensi UI di semua layar.",
      result: "Menghasilkan prototipe Flutter lengkap dengan alur pemesanan end-to-end, diserahkan untuk mata kuliah Mobile Programming.",
    },
    {
      name: "Website Portofolio",
      slug: "portfolio",
      desc: "Situs ini, dibangun dengan Next.js 15, React 19, Framer Motion, dan sistem desain terinspirasi terminal. Bilingual (EN/ID), dark/light theme, formulir kontak via Resend.",
      impact: "Open Source",
      tags: ["Next.js 15", "React 19", "Tailwind CSS", "Framer Motion", "Resend"],
      category: "frontend",
      color: "var(--cyan)",
      github: "https://github.com/mikado1106",
      liveUrl: "https://mikhaeledo.com",
      highlights: [
        "Tema gelap/terang, bilingual (EN/ID), animasi Framer Motion yang halus",
        "Formulir kontak menggunakan Resend, sepenuhnya statis tanpa backend",
        "Sistem desain terinspirasi terminal dengan komponen CSS kustom dan tipografi Geist",
      ],
      problem: "Membutuhkan portofolio developer yang lolos pemindaian 10-detik recruiter dan memberi hiring manager kedalaman yang cukup untuk mengevaluasi pekerjaan saya.",
      contributions: [
        "Merancang identitas visual terinspirasi terminal dari nol, termasuk CSS variables, tipografi, dan pustaka komponen",
        "Membangun dukungan bilingual (EN/ID) melalui konteks bahasa dan sistem kamus kustom",
        "Mengimplementasikan tema gelap/terang, smooth scroll, dan animasi halaman Framer Motion",
        "Mengintegrasikan Resend untuk formulir kontak, zero backend, deployment statis penuh di Vercel",
      ],
      challenges: "Menyeimbangkan kompleksitas visual (animasi, tekstur grain, ambient glow) dengan performa dan aksesibilitas, memastikan situs tetap cepat dan terbaca di semua tema dan bahasa.",
      result: "Live di mikhaeledo.com. Portofolio yang sedang Anda lihat sekarang.",
    },
  ],
};
