"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/section";
import { projects as staticProjects } from "@/data/projects";
import type { Project } from "@/data/projects";
import { fetchProjects } from "@/lib/portfolio-data";
import { useLanguage } from "@/contexts/language-context";

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6 } },
};

type ProjectsData = Project[] | Record<"en" | "id", Project[]>;

export function ProjectsSection() {
  const [projects, setProjects] = useState<ProjectsData>(staticProjects);
  const [selected, setSelected] = useState<Project | null>(null);
  const { lang, dict } = useLanguage();

  useEffect(() => {
    let cancelled = false;
    fetchProjects().then(result => {
      if (!cancelled && result.data) setProjects(result.data as ProjectsData);
    });
    return () => { cancelled = true; };
  }, []);

  const list: Project[] = Array.isArray(projects)
    ? projects
    : (projects[lang] || projects.en);

  return (
    <Section id="projects">
      <motion.div variants={fadeUp}>
        <p className="section-tag">{dict.projects.title}</p>
        <h2 className="text-2xl font-semibold text-[var(--text)] mb-8 tracking-tighter">{dict.projects.subtitle}</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        {list.map((p) => (
          <motion.div key={p.name} variants={fadeUp}>
            <ProjectCard {...p} onClick={() => setSelected(p)} />
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
          {dict.projects.github}
        </a>
      </motion.div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}

function ProjectCard({ name, desc, impact, tags, color, onClick }: Project & { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group w-full h-full text-left flex flex-col p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green)]"
      aria-label={`${name} — ${impact}. Click to see details.`}
    >
      {/* Top accent line */}
      <div className="h-px w-12 mb-5 rounded-full" style={{ background: color }} aria-hidden="true" />

      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
          {impact}
        </span>
        {/* "expand" hint icon */}
        <svg
          width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors"
          aria-hidden="true"
        >
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </div>

      <h3 className="text-base font-bold text-[var(--text)] mb-2 group-hover:text-[var(--green)] transition-colors">{name}</h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-grow">{desc}</p>

      <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-[var(--border)]">
        {tags.map((t) => (
          <span key={t} className="tag px-2.5 py-1 text-[10px]">{t}</span>
        ))}
      </div>
    </button>
  );
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  // Close on Escape key
  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [project, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label={project.name}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 bottom-0 sm:inset-auto sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 z-50 w-full sm:max-w-lg"
          >
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-t-2xl sm:rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
              {/* Accent bar */}
              <div className="h-1 w-full" style={{ background: project.color }} />

              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-1 block">
                      {project.impact}
                    </span>
                    <h3 className="text-lg font-bold text-[var(--text)] leading-snug">{project.name}</h3>
                  </div>
                  <button
                    onClick={onClose}
                    className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>

                {/* Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="space-y-2.5 mb-5">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)] leading-relaxed">
                        <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full" style={{ background: project.color }} aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((t) => (
                    <span key={t} className="tag px-2.5 py-1 text-[10px]">{t}</span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--text)] text-[var(--bg)] text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                      </svg>
                      View Live
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${project.liveUrl ? "" : "flex-1"} inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)] hover:border-[var(--border-hover)] transition-all`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
