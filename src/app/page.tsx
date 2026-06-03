"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

/* ═══════════════════════════════════════════════════
   ANIMATION UTILITIES
   ═══════════════════════════════════════════════════ */

// Stagger container
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// Fade up item
const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6 },
  },
};

// Scale in
const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

// Animated counter hook
function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// Magnetic button hook
function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  }, [x, y, strength]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, springX, springY, handleMouse, handleLeave };
}

// Section reveal wrapper
function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Terminal window
function Term({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div variants={scaleIn} className="term">
      <div className="term-bar">
        <div className="term-dots">
          <span className="bg-[#ff5f56]" />
          <span className="bg-[#ffbd2e]" />
          <span className="bg-[#27c93f]" />
        </div>
        <span className="term-title">{title}</span>
        <div className="w-[52px]" />
      </div>
      <div className="term-body">{children}</div>
    </motion.div>
  );
}

function P() {
  return <><span className="s-p">❯</span>{" "}</>;
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <main className="max-w-5xl mx-auto px-5 sm:px-8 space-y-24 pb-24">
        <ExperienceSection />
        <ProjectsSection />
        <StackSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}

/* ═══════════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════════ */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navItems = ["Experience", "Projects", "Stack", "Contact"];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]" : ""}`}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between h-14 px-5 sm:px-8">
          <a href="#" className="text-sm font-semibold tracking-tight text-[var(--text)]">
            M<span className="text-[var(--green)]">.</span>E<span className="text-[var(--green)]">.</span>S
          </a>
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
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
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-semibold text-[var(--text)] hover:text-[var(--green)] transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
            >
              {item}
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

function MagneticButton({ children }: { children: React.ReactNode }) {
  const { ref, springX, springY, handleMouse, handleLeave } = useMagnetic(0.25);
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════ */

function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section ref={containerRef} className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg" />
      <motion.div
        className="orb w-[500px] h-[500px] bg-[var(--green)] opacity-[0.04] top-[-10%] right-[-5%]"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb w-[400px] h-[400px] bg-[var(--blue)] opacity-[0.05] bottom-[0%] left-[-10%]"
        animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto w-full px-5 sm:px-8 pt-20">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          {/* Text */}
          <motion.div style={{ y: textY }}>
            <motion.div
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] text-[11px] text-[var(--text-muted)] mb-6 font-medium">
                <span className="w-[6px] h-[6px] rounded-full bg-[var(--green)] pulse" />
                Available for opportunities
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] text-[var(--text)] mb-5"
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            >
              Mikhael Edo
              <br />
              <span className="text-[var(--text-secondary)]">Sinambela</span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-md mb-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              Front-end developer with a passion for crafting modern, performant, and accessible user interfaces. Fresh graduate with hands-on experience building an employee management system and interning as a front-end developer.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <MagneticButton>
                <a
                  href="mailto:edomikhael@gmail.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--text)] text-[var(--bg)] text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Contact me
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)] hover:border-[var(--border-hover)] transition-all"
                >
                  View projects ↓
                </a>
              </MagneticButton>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 mt-10 pt-6 border-t border-[var(--border)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <SocialLink href="https://www.linkedin.com/in/mikhaeledo" label="LinkedIn" />
              <SocialLink href="https://github.com/mikado1106" label="GitHub" />
              <span className="text-[var(--border)]">·</span>
              <span className="text-xs text-[var(--text-muted)]">Jakarta, Indonesia</span>
            </motion.div>
          </motion.div>

          {/* Right side: Photo */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            style={{ y: photoY }}
          >
            <div className="relative w-full max-w-[320px] mx-auto aspect-[3/4] rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl shadow-black/30 group">
              <Image
                src="/profile.jpg"
                alt="Mikhael Edo Sinambela"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--bg)]/60 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
    >
      {label} ↗
    </a>
  );
}

/* ═══════════════════════════════════════════════════
   EXPERIENCE
   ═══════════════════════════════════════════════════ */

function ExperienceSection() {
  return (
    <Section id="experience">
      <motion.div variants={fadeUp}>
        <p className="section-tag">Experience</p>
        <h2 className="text-2xl font-bold text-[var(--text)] mb-8 tracking-tight">Where I&apos;ve contributed</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        <motion.div variants={fadeUp}>
          <ExpCard
            role="Full Stack Developer Intern"
            company="Mandiri Inhealth"
            period="Jan – Jun 2025"
            items={[
              "Maintained corporate website — 99% uptime",
              "Resolved 10+ production bugs",
              "Built RESTful API integrations",
              "Docker-based dev environment setup",
            ]}
            tags={["PHP", "CodeIgniter", "Docker", "MySQL"]}
          />
        </motion.div>

        <motion.div variants={fadeUp}>
          <ExpCard
            role="Full Stack Developer"
            company="HRIS System"
            period="Jun 2022 – Jan 2026"
            items={[
              "Built full-cycle HRIS from scratch",
              "50% less manual data entry",
              "Managed ~40 employee records",
              "Automated attendance tracking",
            ]}
            tags={["PHP", "CodeIgniter 4", "MySQL"]}
          />
        </motion.div>
      </div>
    </Section>
  );
}

function ExpCard({ role, company, period, items, tags }: {
  role: string; company: string; period: string; items: string[]; tags: string[];
}) {
  return (
    <motion.div
      className="h-full p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors"
      whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(0,0,0,0.25)" }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-start justify-between gap-2 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-[var(--text)]">{role}</h3>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">{company}</p>
        </div>
        <span className="text-[10px] text-[var(--text-muted)] font-mono whitespace-nowrap bg-[var(--bg-elevated)] border border-[var(--border)] px-2 py-0.5 rounded">
          {period}
        </span>
      </div>
      <ul className="space-y-1.5 mb-4">
        {items.map((item, i) => (
          <li key={i} className="text-xs text-[var(--text-secondary)] flex items-start gap-2">
            <span className="text-[var(--green)] mt-0.5">✓</span>
            {item}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--border)]">
        {tags.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   PROJECTS
   ═══════════════════════════════════════════════════ */

function ProjectsSection() {
  const projects = [
    {
      name: "Employee Management System",
      desc: "Full-cycle HRIS — digitized HR processes, centralized data, automated attendance. Reduced manual entry time by half.",
      impact: "50% efficiency gain",
      tags: ["PHP", "CodeIgniter 4", "MySQL"],
      color: "var(--green)",
      github: "https://github.com/mikado1106",
    },
    {
      name: "Salon Reservation App",
      desc: "Mobile booking app with real-time Firebase sync. Optimized UX flow reduced booking friction significantly.",
      impact: "40% faster booking",
      tags: ["Flutter", "Dart", "Firebase"],
      color: "var(--blue)",
      github: "https://github.com/mikado1106",
    },
    {
      name: "Tourism Web Platform",
      desc: "Interactive tourism site with 20+ destinations, curated content, and responsive design for all devices.",
      impact: "20+ destinations live",
      tags: ["PHP", "MySQL", "HTML/CSS"],
      color: "var(--amber)",
      github: "https://github.com/mikado1106",
    },
  ];

  return (
    <Section id="projects">
      <motion.div variants={fadeUp}>
        <p className="section-tag">Projects</p>
        <h2 className="text-2xl font-bold text-[var(--text)] mb-8 tracking-tight">Things I&apos;ve built</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((p) => (
          <motion.div key={p.name} variants={fadeUp}>
            <ProjectCard {...p} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ name, desc, impact, tags, color, github }: {
  name: string; desc: string; impact: string; tags: string[]; color: string; github: string;
}) {
  return (
    <motion.a
      href={github}
      target="_blank"
      rel="noopener noreferrer"
      className="group h-full flex flex-col p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors cursor-pointer"
      whileHover={{ y: -4, boxShadow: "0 16px 50px rgba(0,0,0,0.3)" }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <motion.span
            className="w-2 h-2 rounded-full"
            style={{ background: color }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color }}>
            {impact}
          </span>
        </div>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="text-[var(--text-muted)] group-hover:text-[var(--text)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
        </svg>
      </div>

      <h3 className="text-sm font-semibold text-[var(--text)] mb-2">{name}</h3>
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed flex-grow">{desc}</p>

      <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-[var(--border)]">
        {tags.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
    </motion.a>
  );
}

/* ═══════════════════════════════════════════════════
   STACK
   ═══════════════════════════════════════════════════ */

function StackSection() {
  const categories = [
    { label: "Languages", items: ["PHP", "JavaScript", "TypeScript", "Dart", "SQL", "HTML/CSS"] },
    { label: "Frontend", items: ["React", "Next.js", "Flutter", "Tailwind CSS"] },
    { label: "Backend", items: ["CodeIgniter 4", "Node.js", "REST APIs"] },
    { label: "Data & Infra", items: ["MySQL", "Firebase", "Docker", "Git"] },
    { label: "Design", items: ["Figma", "UI/UX", "Responsive Design"] },
  ];

  return (
    <Section id="stack">
      <motion.div variants={fadeUp}>
        <p className="section-tag">Stack</p>
        <h2 className="text-2xl font-bold text-[var(--text)] mb-8 tracking-tight">Technologies I use</h2>
      </motion.div>

      <div className="space-y-5">
        {categories.map((cat) => (
          <motion.div key={cat.label} variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="text-xs font-medium text-[var(--text-muted)] w-24 shrink-0">{cat.label}</span>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <motion.span
                  key={item}
                  className="tag"
                  whileHover={{ scale: 1.05, borderColor: "var(--green)", color: "var(--green)" }}
                  transition={{ duration: 0.15 }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════════════ */

function ContactSection() {
  return (
    <Section id="contact">
      <motion.div variants={fadeUp}>
        <p className="section-tag">Contact</p>
        <h2 className="text-2xl font-bold text-[var(--text)] mb-3 tracking-tight">Let&apos;s build something</h2>
        <p className="text-sm text-[var(--text-secondary)] max-w-md mb-8">
          Open for full-time positions and freelance projects. Currently based in Jakarta,
          happy to work remote.
        </p>
      </motion.div>

      <Term title="contact">
        <p><P /><span className="s-cmd">open</span> <span className="s-str">contact.toml</span></p>
        <br />
        <ContactLine label="email" value="edomikhael@gmail.com" href="mailto:edomikhael@gmail.com" />
        <ContactLine label="phone" value="+62 814-1355-7945" href="tel:+6281413557945" />
        <ContactLine label="linkedin" value="mikhaeledo" href="https://www.linkedin.com/in/mikhaeledo" external />
        <ContactLine label="github" value="github.com/mikado1106" href="https://github.com/mikado1106" external />
        <ContactLine label="location" value="Jakarta, Indonesia" />
        <br />
        <p className="s-comment"># Looking forward to hearing from you.</p>
        <br />
        <p><P /><span className="caret" /></p>
      </Term>
    </Section>
  );
}

function ContactLine({ label, value, href, external }: { label: string; value: string; href?: string; external?: boolean }) {
  const content = href ? (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="s-str hover:underline underline-offset-2 decoration-[var(--amber)]"
    >
      &quot;{value}&quot;
    </a>
  ) : (
    <span className="s-str">&quot;{value}&quot;</span>
  );

  return (
    <p>
      <span className="s-key">{label}</span>
      <span className="s-dim"> = </span>
      {content}
    </p>
  );
}

/* ═══════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════ */

function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[var(--text-muted)]">
        <span>© 2026 Mikhael Edo Sinambela</span>
        <span className="font-mono flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" />
          Built with Next.js + Tailwind CSS
        </span>
      </div>
    </footer>
  );
}
