export interface StackCategory {
  label: string;
  items: string[];
}

export const stack: StackCategory[] = [
  { label: "Languages", items: ["PHP", "JavaScript", "TypeScript", "Python", "Dart", "SQL", "Visual Basic .NET", "HTML/CSS"] },
  { label: "Frontend", items: ["React", "Next.js", "Flutter", "Tailwind CSS"] },
  { label: "Backend", items: ["CodeIgniter 4", "Node.js", "REST APIs"] },
  { label: "Data & Infra", items: ["MySQL", "Firebase", "Docker Desktop", "Git"] },
  { label: "Tools", items: ["Mindview", "ProjectLibre", "Figma", "UI/UX"] },
];
