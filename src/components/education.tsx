"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { education } from "@/data/education";
import { useLanguage } from "@/contexts/language-context";

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6 } },
};

export function EducationSection() {
  const { lang, dict } = useLanguage();
  return (
    <Section id="education">
      <motion.div variants={fadeUp}>
        <p className="section-tag">{dict.nav.education}</p>
        <h2 className="text-2xl font-bold text-[var(--text)] mb-8 tracking-tight">{lang === 'id' ? 'Latar belakang & sertifikasi' : 'Background & certifications'}</h2>
      </motion.div>

      {/* Timeline layout */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--green)] via-[var(--border)] to-transparent" aria-hidden="true" />

        <div className="space-y-6">
          {(education[lang] || education.en).map((edu, index) => (
            <motion.div key={edu.institution} variants={fadeUp} className="relative pl-9">
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 w-[23px] h-[23px] flex items-center justify-center" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--green)] ring-4 ring-[var(--bg)]" />
              </div>

              <div className="p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text)]">{edu.degree}</h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">{edu.institution}</p>
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono whitespace-nowrap bg-[var(--bg-elevated)] border border-[var(--border)] px-2 py-0.5 rounded">
                    {edu.period}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mb-3">{edu.description}</p>
                {edu.achievements && (
                  <ul className="space-y-1.5">
                    {edu.achievements.map((a, i) => (
                      <li key={i} className="text-xs text-[var(--text-secondary)] flex items-start gap-2">
                        <span className="text-[var(--blue)] mt-0.5" aria-hidden="true">◆</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
