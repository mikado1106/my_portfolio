export interface StackCategory {
  label: string;
  items: string[];
}

export const stack: StackCategory[] = [
  { label: "Languages", items: ["JavaScript", "TypeScript", "PHP", "Dart", "HTML/CSS", "SQL"] },
  { label: "Frameworks", items: ["Next.js", "CodeIgniter 4", "Flutter", "Tailwind CSS", "Bootstrap"] },
  { label: "Database", items: ["MySQL"] },
  { label: "Tools", items: ["Git", "GitHub", "Docker", "Postman", "REST API", "VS Code"] },
];
