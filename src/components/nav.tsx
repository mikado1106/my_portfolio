"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useLanguage } from "@/contexts/language-context";

export function Nav({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const { lang, setLang, dict } = useLanguage();

  const navItems = [
    { id: "experience", label: dict.nav.experience },
    { id: "projects", label: dict.nav.projects },
    { id: "education", label: dict.nav.education },
    { id: "stack", label: dict.nav.stack },
    { id: "contact", label: dict.nav.contact },
  ];

  return (
    <>
      {/* Skip to content - a11y */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[var(--green)] focus:text-[var(--bg)] focus:rounded-md focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between h-14 px-5 sm:px-8">
          <a href="#" className="text-sm font-medium tracking-tight text-[var(--text)] font-mono">
            Mikhaeledo<span className="text-[var(--green)]">.</span>
          </a>
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="nav-link">{item.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
              className="w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--bg-elevated)] transition-colors uppercase"
              aria-label="Toggle language"
            >
              {lang}
            </button>
            <ThemeToggle theme={theme} toggle={toggleTheme} />
            <MagneticButton>
              <a
                href="/cv.pdf"
                download="CV-Mikhael-Edo-Sinambela.pdf"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text)] hover:border-[var(--border-hover)] transition-all"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Resume
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#contact"
                className="hidden md:inline-block text-xs font-medium px-3.5 py-1.5 rounded-md bg-[var(--text)] text-[var(--bg)] hover:opacity-90 transition-opacity"
              >
                Let&apos;s talk
              </a>
            </MagneticButton>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-[5px] w-7 h-7 items-center justify-center"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <motion.span
                className="block w-4 h-[1.5px] bg-[var(--text)] origin-center"
                animate={mobileOpen ? { rotate: 45, y: 3.25 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-4 h-[1.5px] bg-[var(--text)] origin-center"
                animate={mobileOpen ? { rotate: -45, y: -3.25 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <motion.div
        initial={false}
        animate={mobileOpen ? { opacity: 1, pointerEvents: "auto" as const } : { opacity: 0, pointerEvents: "none" as const }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-40 bg-[var(--bg)]/95 backdrop-blur-xl md:hidden"
        aria-hidden={!mobileOpen}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, i) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-semibold text-[var(--text)] hover:text-[var(--green)] transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
            >
              {item.label}
            </motion.a>
          ))}
          <motion.div
            className="flex flex-col gap-3 mt-4"
            initial={{ opacity: 0 }}
            animate={mobileOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <a
              href="/cv.pdf"
              download="CV-Mikhael-Edo-Sinambela.pdf"
              className="inline-flex items-center justify-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text-secondary)]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download CV
            </a>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center text-sm font-medium px-5 py-2.5 rounded-lg bg-[var(--text)] text-[var(--bg)]"
            >
              Let&apos;s talk
            </a>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
