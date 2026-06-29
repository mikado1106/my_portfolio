"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects as staticProjects } from "@/data/projects";
import { useLanguage } from "@/contexts/language-context";
import { useTheme } from "@/hooks/use-theme";
import { Nav } from "@/components/nav";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function ProjectCaseStudy() {
  const params = useParams();
  const slug = params.slug as string;
  const { lang } = useLanguage();
  const { theme, toggle } = useTheme();

  const list = staticProjects[lang] || staticProjects.en;
  const project = list.find((p) => p.slug === slug);
  const currentIndex = list.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? list[currentIndex - 1] : null;
  const nextProject = currentIndex < list.length - 1 ? list[currentIndex + 1] : null;

  if (!project) {
    return (
      <>
        <Nav theme={theme} toggleTheme={toggle} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-[var(--text-muted)] mb-4 text-sm">Project not found.</p>
            <Link href="/#projects" className="text-sm text-[var(--green)] hover:underline">
              ← Back to portfolio
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav theme={theme} toggleTheme={toggle} />

      <AnimatePresence mode="wait">
        <motion.div
          key={lang}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >

      {/* Top accent bar */}
      <div className="h-0.5 w-full mt-14" style={{ background: project.color }} />

      <div className="min-h-screen bg-[var(--bg)] pb-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-10">

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-10 group"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to portfolio
            </Link>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate="visible">

            {/* Header */}
            <motion.div variants={fadeUp} className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                  {project.impact}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((t) => (
                    <span key={t} className="tag text-[10px]">{t}</span>
                  ))}
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text)] tracking-tighter mb-3" style={{ textWrap: "balance" } as React.CSSProperties}>
                {project.name}
              </h1>
              <p className="text-[var(--text-secondary)] leading-relaxed text-base">
                {project.desc}
              </p>
            </motion.div>

            {/* Visual mockup */}
            <motion.div variants={fadeUp} className="mb-8">
              <div className="rounded-xl overflow-hidden border border-[var(--border)]">
                {/* Browser chrome */}
                <div className="h-8 flex items-center gap-1.5 px-3 bg-[var(--bg-elevated)] border-b border-[var(--border)]">
                  <span className="w-2 h-2 rounded-full bg-[var(--border)]" />
                  <span className="w-2 h-2 rounded-full bg-[var(--border)]" />
                  <span className="w-2 h-2 rounded-full bg-[var(--border)]" />
                  <div className="flex-1 mx-2 h-4 rounded bg-[var(--bg)] flex items-center px-2 gap-1.5">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[var(--text-muted)]" aria-hidden="true">
                      <rect x="3" y="11" width="11" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>
                    </svg>
                    <span className="text-[9px] font-mono text-[var(--text-muted)] truncate leading-none">
                      {project.liveUrl ?? `mikhaeledo.com/projects/${project.slug}`}
                    </span>
                  </div>
                </div>
                {/* Screen */}
                <div className="relative h-44 sm:h-56 flex flex-col items-center justify-center gap-3 overflow-hidden bg-[var(--bg-card)]">
                  <div className="absolute inset-0 pointer-events-none" style={{ background: project.color, opacity: 0.05 }} />
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-base font-bold relative z-10 select-none"
                    style={{ border: `1.5px solid`, borderColor: project.color, color: project.color }}
                  >
                    {project.name.charAt(0)}
                  </div>
                  <p className="text-[11px] font-mono text-[var(--text-muted)] relative z-10">
                    {project.liveUrl
                      ? project.liveUrl.replace("https://", "")
                      : "preview not available"}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Action links */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-10 pb-10 border-b border-[var(--border)]">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--text)] text-[var(--bg)] text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  Live Demo
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)] hover:border-[var(--border-hover)] transition-all"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                GitHub
              </a>
            </motion.div>

            {/* Case study body */}
            <div className="space-y-10">
              {project.problem && (
                <motion.section variants={fadeUp}>
                  <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-3">
                    Problem / Context
                  </h2>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{project.problem}</p>
                </motion.section>
              )}

              {project.contributions && project.contributions.length > 0 && (
                <motion.section variants={fadeUp}>
                  <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-3">
                    What I Built
                  </h2>
                  <ul className="space-y-3">
                    {project.contributions.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[var(--text-secondary)] leading-relaxed">
                        <span
                          className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full"
                          style={{ background: project.color }}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.section>
              )}

              {project.challenges && (
                <motion.section variants={fadeUp}>
                  <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-3">
                    Challenges
                  </h2>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{project.challenges}</p>
                </motion.section>
              )}

              {project.result && (
                <motion.section variants={fadeUp}>
                  <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-3">
                    Result
                  </h2>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{project.result}</p>
                </motion.section>
              )}
            </div>

            {/* Prev / Next navigation */}
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-between mt-16 pt-8 border-t border-[var(--border)]"
            >
              {prevProject ? (
                <Link
                  href={`/projects/${prevProject.slug}`}
                  className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors group max-w-[45%]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  <span className="truncate">{prevProject.name}</span>
                </Link>
              ) : <div />}
              {nextProject ? (
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors group max-w-[45%] text-right"
                >
                  <span className="truncate">{nextProject.name}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:translate-x-0.5 transition-transform" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              ) : <div />}
            </motion.div>

          </motion.div>
        </div>
      </div>

        </motion.div>
      </AnimatePresence>
    </>
  );
}
