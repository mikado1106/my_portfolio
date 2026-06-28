export interface Experience {
  role: string;
  company: string;
  period: string;
  items: string[];
  tags: string[];
}

export const experiences: Record<"en" | "id", Experience[]> = {
  en: [
    {
      role: "Full Stack Developer Intern",
      company: "Mandiri Inhealth",
      period: "Jan 2025 – Jun 2025",
      items: [
        "Maintained the corporate website and ensured 99% uptime",
        "Found and fixed more than 10 bugs in production",
        "Created and integrated RESTful APIs",
        "Set up local development environments using Docker Desktop",
      ],
      tags: ["PHP", "CodeIgniter", "Docker", "MySQL"],
    },
    {
      role: "Fullstack Developer",
      company: "PT Papande Jaya Teknik",
      period: "Jun 2022 – Jan 2026",
      items: [
        "Developed a complete HRIS application from scratch",
        "Reduced manual data entry time by half",
        "Managed database systems for about 40 employee records",
        "Automated the attendance tracking for employees",
      ],
      tags: ["PHP", "CodeIgniter 4", "MySQL"],
    },
  ],
  id: [
    {
      role: "Full Stack Developer Intern",
      company: "Mandiri Inhealth",
      period: "Jan 2025 – Jun 2025",
      items: [
        "Memelihara website perusahaan dan memastikan uptime 99%",
        "Menemukan dan memperbaiki lebih dari 10 bug di tahap produksi",
        "Membuat dan mengintegrasikan RESTful API",
        "Menyiapkan lingkungan pengembangan lokal menggunakan Docker Desktop",
      ],
      tags: ["PHP", "CodeIgniter", "Docker", "MySQL"],
    },
    {
      role: "Fullstack Developer",
      company: "PT Papande Jaya Teknik",
      period: "Jun 2022 – Jan 2026",
      items: [
        "Membangun aplikasi HRIS secara menyeluruh dari nol",
        "Memangkas waktu entri data manual hingga 50%",
        "Mengelola sistem database untuk sekitar 40 data karyawan",
        "Mengotomatisasi sistem pelacakan kehadiran karyawan",
      ],
      tags: ["PHP", "CodeIgniter 4", "MySQL"],
    },
  ]
};
