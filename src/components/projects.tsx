"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { projects as staticProjects } from "@/data/projects";
import { fetchProjects } from "@/lib/portfolio-data";
import { useLanguage } from "@/contexts/language-context";

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6 } },
};

export function ProjectsSection() {
  const [projects, setProjects] = useState<any>(staticProjects);
  const { lang, dict } = useLanguage();

  useEffect(() => {
    fetchProjects().then(result => {
      if (result.data) setProjects(result.data);
    });
  }, []);

  return (
    <Section id="projects">
      <motion.div variants={fadeUp}>
        <p className="section-tag">{dict.projects.title}</p>
        <h2 className="text-2xl font-semibold text-[var(--text)] mb-8 tracking-tighter">{dict.projects.subtitle}</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        {(Array.isArray(projects) ? projects : (projects[lang] || projects.en)).map((p: any) => (
          <motion.div key={p.name} variants={fadeUp}>
            <ProjectCard {...p} />
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeUp} className="mt-8 text-center">
        <a
          href="https://github.com/mikado1106"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors font-medium"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
          {dict.projects.github}
        </a>
      </motion.div>
    </Section>
  );
}

function ProjectCard({ name, desc, impact, tags, color, github }: {
  name: string; desc: string; impact: string; tags: string[]; color: string; github: string;
}) {
  return (
    <a
      href={github}
      target="_blank"
      rel="noopener noreferrer"
      className="group h-full flex flex-col p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10"
      aria-label={`${name} — ${impact}`}
    >
      {/* Top accent line */}
      <div className="h-px w-12 mb-5 rounded-full" style={{ background: color }} aria-hidden="true" />

      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
          {impact}
        </span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="text-[var(--text-muted)] group-hover:text-[var(--text)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
          aria-hidden="true"
        >
          <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
        </svg>
      </div>

      <h3 className="text-base font-bold text-[var(--text)] mb-2 group-hover:text-[var(--green)] transition-colors">{name}</h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-grow">{desc}</p>

      <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-[var(--border)]">
        {tags.map((t) => (
          <span key={t} className="tag px-2.5 py-1 text-[10px]">{t}</span>
        ))}
      </div>
    </a>
  );
}
