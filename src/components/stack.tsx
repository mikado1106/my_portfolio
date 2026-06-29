"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { stack } from "@/data/stack";
import { useLanguage } from "@/contexts/language-context";

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6 } },
};

// Category icons and colors
const categoryMeta: Record<string, { icon: string; color: string }> = {
  Languages: { icon: "⟨/⟩", color: "var(--green)" },
  Frontend: { icon: "◧", color: "var(--blue)" },
  Backend: { icon: "⚙", color: "var(--purple)" },
  "Data & Infra": { icon: "◉", color: "var(--amber)" },
  Tools: { icon: "◈", color: "var(--cyan)" },
};

export function StackSection() {
  const { lang } = useLanguage();

  return (
    <Section id="stack">
      <motion.div variants={fadeUp}>
        <p className="section-tag">{lang === 'id' ? 'Teknologi' : 'Stack'}</p>
        <h2 className="text-2xl font-bold text-[var(--text)] mb-8 tracking-tight">
          {lang === 'id' ? 'Teknologi yang saya gunakan' : 'Technologies I use'}
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stack.map((cat) => {
          const meta = categoryMeta[cat.label] || { icon: "●", color: "var(--text-muted)" };
          return (
            <motion.div
              key={cat.label}
              variants={fadeUp}
              className="p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all hover:shadow-md hover:shadow-black/5 group"
            >
              {/* Category header */}
              <div className="flex items-center gap-2.5 mb-4">
                <span
                  className="w-8 h-8 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center text-sm font-mono group-hover:border-[var(--border-hover)] transition-colors"
                  style={{ color: meta.color }}
                  aria-hidden="true"
                >
                  {meta.icon}
                </span>
                <span className="text-xs font-semibold text-[var(--text)] uppercase tracking-wider">{cat.label}</span>
              </div>

              {/* Tech items */}
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <motion.span
                    key={item}
                    className="tag cursor-default"
                    whileHover={{ scale: 1.05, borderColor: meta.color, color: meta.color }}
                    transition={{ duration: 0.15 }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
