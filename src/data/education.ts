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
        "Final-year thesis: built a 6-module HRIS for PT. Papande Jaya Teknik (±40 employees) from scratch",
        "Completed web and mobile coursework: PHP, Next.js, Flutter across multiple course projects",
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
        "Tugas akhir: membangun HRIS 6 modul untuk PT. Papande Jaya Teknik (±40 karyawan) dari nol",
        "Menyelesaikan mata kuliah web dan mobile: PHP, Next.js, Flutter di berbagai proyek kuliah",
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
