export interface Experience {
  role: string;
  company: string;
  period: string;
  items: string[];
  tags: string[];
}

export const experiences: Experience[] = [
  {
    role: "Full Stack Developer Intern",
    company: "Mandiri Inhealth",
    period: "Jan – Jun 2025",
    items: [
      "Maintained corporate website — 99% uptime",
      "Resolved 10+ production bugs",
      "Built RESTful API integrations",
      "Docker-based dev environment setup",
    ],
    tags: ["PHP", "CodeIgniter", "Docker", "MySQL"],
  },
  {
    role: "Full Stack Developer",
    company: "HRIS System",
    period: "Jun 2022 – Jan 2026",
    items: [
      "Built full-cycle HRIS from scratch",
      "50% less manual data entry",
      "Managed ~40 employee records",
      "Automated attendance tracking",
    ],
    tags: ["PHP", "CodeIgniter 4", "MySQL"],
  },
];
