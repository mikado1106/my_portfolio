"use client";

import { useTheme } from "@/hooks/use-theme";
import { useLanguage } from "@/contexts/language-context";
import { AnimatePresence, motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { ExperienceSection } from "@/components/experience";
import { OrganizationSection } from "@/components/organization";
import { ProjectsSection } from "@/components/projects";
import { EducationSection } from "@/components/education";
import { StackSection } from "@/components/stack";
import { ContactSection } from "@/components/contact";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";

function SectionDivider() {
  return <div className="h-px bg-[var(--border)] max-w-xs mx-auto opacity-50" aria-hidden="true" />;
}

export default function Home() {
  const { theme, toggle } = useTheme();
  const { lang } = useLanguage();

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
          <Hero />
          <main id="main-content" className="relative max-w-5xl mx-auto px-5 sm:px-8 pb-24">
            {/* Subtle ambient background for main content */}
            <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
              <div className="ambient-glow w-[400px] h-[400px] bg-[var(--green)] top-[15%] right-[-20%]" />
              <div className="ambient-glow w-[350px] h-[350px] bg-[var(--blue)] top-[45%] left-[-15%]" />
              <div className="ambient-glow w-[300px] h-[300px] bg-[var(--purple)] top-[75%] right-[-10%]" />
            </div>
            <div className="space-y-28">
              <ExperienceSection />
              <SectionDivider />
              <OrganizationSection />
              <SectionDivider />
              <ProjectsSection />
              <SectionDivider />
              <EducationSection />
              <SectionDivider />
              <StackSection />
              <SectionDivider />
              <ContactSection />
            </div>
          </main>
        </motion.div>
      </AnimatePresence>
      
      <Footer />
      <BackToTop />
    </>
  );
}
