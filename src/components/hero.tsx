"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useLanguage } from "@/contexts/language-context";

// Framer Motion Variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeUpBlur = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6 }
  },
};

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
      aria-label={`Visit ${label} profile`}
    >
      {label} ↗
    </a>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const { dict } = useLanguage();
  
  // Enhanced Parallax Effects
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background - dot pattern + ambient glows */}
      <div className="absolute inset-0 dot-bg" aria-hidden="true" />
      <div className="ambient-glow w-[600px] h-[600px] bg-[var(--green)] top-[-20%] right-[-10%]" aria-hidden="true" />
      <div className="ambient-glow w-[500px] h-[500px] bg-[var(--blue)] bottom-[-10%] left-[-15%]" aria-hidden="true" />

      <div className="relative z-10 max-w-5xl mx-auto w-full px-5 sm:px-8 pt-20">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
          
          {/* Text Content */}
          <motion.div 
            style={{ y: textY, opacity: textOpacity }}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {/* Mobile photo - visible only on small screens */}
            <motion.div
              className="lg:hidden mb-8 flex justify-center"
              variants={fadeUp}
            >
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--border)] shadow-lg">
                <Image
                  src="/profile.jpg"
                  alt="Mikhael Edo Sinambela"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </motion.div>

            <motion.div variants={fadeUpBlur}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] text-[11px] text-[var(--text-muted)] mb-6 font-medium">
                <span className="w-[6px] h-[6px] rounded-full bg-[var(--green)] pulse" aria-hidden="true" />
                {dict.hero.available}
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tighter leading-[1.05] text-[var(--text)] mb-6"
              variants={fadeUpBlur}
            >
              Mikhael Edo
              <br />
              <span className="text-[var(--text-secondary)]">Sinambela</span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-lg mb-8 font-light"
              variants={fadeUpBlur}
            >
              {dict.hero.description}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              variants={fadeUpBlur}
            >
              <MagneticButton>
                <a
                  href="mailto:edomikhael@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--text)] text-[var(--bg)] text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-black/10"
                >
                  {dict.hero.contactBtn}
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text)] hover:border-[var(--border-hover)] transition-all shadow-sm"
                >
                  {dict.hero.projectsBtn}
                </a>
              </MagneticButton>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 mt-12 pt-6 border-t border-[var(--border)]"
              variants={fadeUp}
            >
              <SocialLink href="https://www.linkedin.com/in/mikhaeledo" label="LinkedIn" />
              <SocialLink href="https://github.com/mikado1106" label="GitHub" />
              <span className="text-[var(--border)]" aria-hidden="true">·</span>
              <span className="text-xs text-[var(--text-muted)]">Jakarta, Indonesia</span>
            </motion.div>
          </motion.div>

          {/* Right side: Photo (desktop) */}
          <motion.div
            className="hidden lg:flex items-start justify-end"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: photoY, scale: photoScale }}
          >
            <div className="relative w-full max-w-[320px] aspect-[3/4] rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl shadow-black/40 group -mt-2">
              <Image
                src="/profile.jpg"
                alt="Mikhael Edo Sinambela"
                fill
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-transparent opacity-60" aria-hidden="true" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
