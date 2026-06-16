"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

      <div className="grid md:grid-cols-2 gap-4 perspective-1000">
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
          className="inline-flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--green)] transition-colors font-medium group"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
          {dict.projects.github}
        </a>
      </motion.div>
    </Section>
  );
}

// Gradient patterns for project thumbnails
const gradientPatterns = [
  "from-emerald-500/20 via-teal-500/10 to-cyan-500/5",
  "from-indigo-500/20 via-purple-500/10 to-blue-500/5",
  "from-amber-500/20 via-orange-500/10 to-yellow-500/5",
  "from-cyan-500/20 via-sky-500/10 to-blue-500/5",
];

function ProjectCard({ name, desc, impact, tags, color, github }: {
  name: string; desc: string; impact: string; tags: string[]; color: string; github: string;
}, index?: number) {
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
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

  // Determine gradient based on color
  const getGradient = () => {
    if (color.includes("green")) return gradientPatterns[0];
    if (color.includes("blue")) return gradientPatterns[1];
    if (color.includes("amber")) return gradientPatterns[2];
    return gradientPatterns[3];
  };

  return (
    <motion.a
      href={github}
      target="_blank"
      rel="noopener noreferrer"
      className="group h-full flex flex-col rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors cursor-pointer relative overflow-hidden will-change-transform"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
      transition={{ duration: 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      aria-label={`${name} — ${impact}`}
    >
      {/* Visual thumbnail area */}
      <div className={`relative h-32 w-full bg-gradient-to-br ${getGradient()} border-b border-[var(--border)] flex items-center justify-center overflow-hidden`}>
        {/* Decorative code pattern */}
        <div className="absolute inset-0 opacity-[0.07] font-mono text-[10px] leading-tight p-4 text-[var(--text)] overflow-hidden select-none" aria-hidden="true">
          <p>{`function ${name.replace(/\s/g, '')}() {`}</p>
          <p>{`  const data = await fetch(api);`}</p>
          <p>{`  return process(data);`}</p>
          <p>{`}`}</p>
        </div>
        {/* Project icon/indicator */}
        <motion.div
          className="relative z-10 w-12 h-12 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] flex items-center justify-center shadow-lg"
          animate={hovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-lg font-bold" style={{ color }}>{name.charAt(0)}</span>
        </motion.div>
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 80%, ${color}30, transparent 70%)` }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-col flex-grow p-6">
        <div className="relative z-10 flex items-center justify-between mb-3 transform-gpu" style={{ transform: "translateZ(20px)" }}>
          <div className="flex items-center gap-2">
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ background: color }}
              animate={hovered ? { scale: [1, 1.5, 1], boxShadow: `0 0 12px ${color}` } : { scale: 1 }}
              transition={{ duration: 0.5 }}
              aria-hidden="true"
            />
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color }}>
              {impact}
            </span>
          </div>
          <motion.svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors"
            animate={hovered ? { x: 3, y: -3 } : { x: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          >
            <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
          </motion.svg>
        </div>

        <h3 className="relative z-10 text-base font-bold text-[var(--text)] mb-2 transform-gpu" style={{ transform: "translateZ(30px)" }}>{name}</h3>
        <p className="relative z-10 text-sm text-[var(--text-secondary)] leading-relaxed flex-grow transform-gpu" style={{ transform: "translateZ(20px)" }}>{desc}</p>

        <div className="relative z-10 flex flex-wrap gap-2 mt-5 pt-4 border-t border-[var(--border)] transform-gpu" style={{ transform: "translateZ(10px)" }}>
          {tags.map((t, i) => (
            <motion.span
              key={t}
              className="tag px-2.5 py-1 text-[10px]"
              animate={hovered ? { y: -2 } : { y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.2 }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}
