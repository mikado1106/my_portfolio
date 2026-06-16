export interface Project {
  name: string;
  desc: string;
  impact: string;
  tags: string[];
  color: string;
  github: string;
}

export const projects: Project[] = [
  {
    name: "Employee Management System",
    desc: "Full-cycle HRIS — digitized HR processes, centralized data, automated attendance. Reduced manual entry time by half.",
    impact: "50% efficiency gain",
    tags: ["PHP", "CodeIgniter 4", "MySQL"],
    color: "var(--green)",
    github: "https://github.com/mikado1106",
  },
  {
    name: "Salon Reservation App",
    desc: "Mobile booking app with real-time Firebase sync. Optimized UX flow reduced booking friction significantly.",
    impact: "40% faster booking",
    tags: ["Flutter", "Dart", "Firebase"],
    color: "var(--blue)",
    github: "https://github.com/mikado1106",
  },
  {
    name: "Tourism Web Platform",
    desc: "Interactive tourism site with 20+ destinations, curated content, and responsive design for all devices.",
    impact: "20+ destinations live",
    tags: ["PHP", "MySQL", "HTML/CSS"],
    color: "var(--amber)",
    github: "https://github.com/mikado1106",
  },
  {
    name: "Portfolio Website",
    desc: "Modern developer portfolio built with Next.js 16, React 19, Framer Motion, and terminal-inspired design system.",
    impact: "Open source",
    tags: ["Next.js", "React 19", "Tailwind CSS"],
    color: "var(--cyan)",
    github: "https://github.com/mikado1106",
  },
];
