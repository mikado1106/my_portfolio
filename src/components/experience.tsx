"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Section } from "@/components/ui/section";
import { experiences } from "@/data/experience";
import { useLanguage } from "@/contexts/language-context";

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6 } },
};

export function ExperienceSection() {
  const { dict } = useLanguage();

  return (
    <Section id="experience">
      <motion.div variants={fadeUp}>
        <p className="section-tag">{dict.experience.title}</p>
        <h2 className="text-2xl font-bold text-[var(--text)] mb-8 tracking-tight">{dict.experience.subtitle}</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4 perspective-1000">
        {experiences.map((exp) => (
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
  const [hovered, setHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="h-full p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors relative overflow-hidden will-change-transform"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
      transition={{ duration: 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle hover gradient */}
      <motion.div
        className="absolute inset-0 opacity-0 pointer-events-none rounded-2xl bg-gradient-to-br from-[var(--border-hover)] to-transparent"
        animate={{ opacity: hovered ? 0.3 : 0 }}
        transition={{ duration: 0.4 }}
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-2 mb-5 relative z-10 transform-gpu" style={{ transform: "translateZ(20px)" }}>
        <div>
          <h3 className="text-base font-bold text-[var(--text)] group-hover:text-[var(--green)] transition-colors">{role}</h3>
          <p className="text-sm text-[var(--text-secondary)] mt-1 font-medium">{company}</p>
        </div>
        <span className="text-[10px] text-[var(--text-muted)] font-mono whitespace-nowrap bg-[var(--bg-elevated)] border border-[var(--border)] px-2 py-1 rounded-md tracking-wider">
          {period}
        </span>
      </div>
      <ul className="space-y-2 mb-5 relative z-10 transform-gpu" style={{ transform: "translateZ(15px)" }}>
        {items.map((item, i) => (
          <motion.li 
            key={i} 
            className="text-sm text-[var(--text-secondary)] flex items-start gap-3"
            animate={hovered ? { x: 3 } : { x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.2 }}
          >
            <span className="text-[var(--green)] mt-0.5" aria-hidden="true">✓</span>
            <span className="leading-relaxed">{item}</span>
          </motion.li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border)] relative z-10 transform-gpu" style={{ transform: "translateZ(10px)" }}>
        {tags.map((t) => <span key={t} className="tag px-2.5 py-1 text-[10px]">{t}</span>)}
      </div>
    </motion.div>
  );
}
