"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { experiences } from "@/data/experience";
import { useLanguage } from "@/contexts/language-context";

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6 } },
};

export function ExperienceSection() {
  const { lang, dict } = useLanguage();

  return (
    <Section id="experience">
      <motion.div variants={fadeUp}>
        <p className="section-tag">{dict.experience.title}</p>
        <h2 className="text-2xl font-semibold text-[var(--text)] mb-8 tracking-tighter">{dict.experience.subtitle}</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        {(experiences[lang] || experiences.en).map((exp) => (
          <motion.div key={exp.company} variants={fadeUp}>
            <ExpCard {...exp} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function ExpCard({ role, company, period, items, tags }: {
  role: string; company: string; period: string; items: string[]; tags: string[];
}) {
  return (
    <div className="h-full p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all hover:shadow-md hover:shadow-black/5 group">
      <div className="flex items-start justify-between gap-2 mb-5">
        <div>
          <h3 className="text-base font-bold text-[var(--text)] group-hover:text-[var(--green)] transition-colors">{role}</h3>
          <p className="text-sm text-[var(--text-secondary)] mt-1 font-medium">{company}</p>
        </div>
        <span className="text-[10px] text-[var(--text-muted)] font-mono whitespace-nowrap bg-[var(--bg-elevated)] border border-[var(--border)] px-2 py-1 rounded-md tracking-wider">
          {period}
        </span>
      </div>
      <ul className="space-y-2.5 mb-5">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-3">
            <span className="text-[var(--green)] mt-1.5 w-1 h-1 rounded-full bg-[var(--green)] shrink-0" aria-hidden="true" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border)]">
        {tags.map((t) => <span key={t} className="tag px-2.5 py-1 text-[10px]">{t}</span>)}
      </div>
    </div>
  );
}
