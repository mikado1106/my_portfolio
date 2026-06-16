export interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
  achievements?: string[];
}

export const education: Education[] = [
  {
    degree: "Bachelor of Information Systems",
    institution: "Universitas Bunda Mulia",
    period: "2020 – 2024",
    description: "Focused on software engineering, web development, and database systems.",
    achievements: [
      "Built multiple full-stack projects",
      "Active in campus tech community",
      "Final project: Employee Management System (HRIS)",
    ],
  },
];

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
