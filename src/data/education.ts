export interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
  achievements?: string[];
}

export const education: Record<"en" | "id", Education[]> = {
  en: [
    {
      degree: "Bachelor of Information Systems, 3.55/4.00",
      institution: "Universitas Tarumanagara",
      period: "Jun 2022 – Jan 2026",
      description: "Focused on software engineering, web development, and database systems.",
      achievements: [
        "Built multiple fullstack projects",
        "Active in campus tech community",
        "Final project: Employee Management System (HRIS)",
      ],
    },
  ],
  id: [
    {
      degree: "Sarjana Komputer, 3.55/4.00",
      institution: "Universitas Tarumanagara",
      period: "Jun 2022 – Jan 2026",
      description: "Fokus pada rekayasa perangkat lunak, pengembangan web, dan sistem basis data.",
      achievements: [
        "Membangun berbagai proyek fullstack",
        "Aktif di komunitas teknologi kampus",
        "Tugas Akhir: Sistem Manajemen Karyawan (HRIS)",
      ],
    },
  ]
};

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  url?: string;
}

export const certifications: Certification[] = [
  {
    name: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    year: "2023",
  },
  {
    name: "Belajar Membuat Aplikasi Flutter untuk Pemula",
    issuer: "Dicoding Indonesia",
    year: "2023",
  },
];
