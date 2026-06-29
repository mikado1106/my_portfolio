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
        "Added auto-email notifications to the Whistleblowing System (WBS) using PHP CodeIgniter 4",
        "Redesigned 5 pages on the corporate website, both frontend and backend",
        "Set up local Docker environments; daily Git workflow with branching, pull requests, and code review",
      ],
      tags: ["PHP", "CodeIgniter 4", "Docker", "MySQL", "Git"],
    },
  ],
  id: [
    {
      role: "Full Stack Developer Intern",
      company: "Mandiri Inhealth",
      period: "Jan 2025 – Jun 2025",
      items: [
        "Menambahkan notifikasi email otomatis ke Whistleblowing System (WBS) menggunakan PHP CodeIgniter 4",
        "Mendesain ulang 5 halaman website korporat, baik frontend maupun backend",
        "Menyiapkan lingkungan Docker lokal; Git harian dengan branching, pull request, dan code review",
      ],
      tags: ["PHP", "CodeIgniter 4", "Docker", "MySQL", "Git"],
    },
  ]
};
