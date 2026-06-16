"use client";

import { useTheme } from "@/hooks/use-theme";
import { useLanguage } from "@/contexts/language-context";
import { AnimatePresence, motion } from "framer-motion";
import { Preloader } from "@/components/preloader";
import { CustomCursor } from "@/components/custom-cursor";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { ExperienceSection } from "@/components/experience";
import { OrganizationSection } from "@/components/organization";
import { ProjectsSection } from "@/components/projects";
import { EducationSection } from "@/components/education";
import { StackSection } from "@/components/stack";
import { ContactSection } from "@/components/contact";
import { Footer } from "@/components/footer";
import { StatsBar } from "@/components/stats-bar";
import { BackToTop } from "@/components/back-to-top";

function SectionDivider() {
  return <div className="section-divider" aria-hidden="true" />;
}

export default function Home() {
  const { theme, toggle } = useTheme();
  const { lang } = useLanguage();

  return (
    <>
      <Preloader />
      <CustomCursor />
      <Nav theme={theme} toggleTheme={toggle} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={lang}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Hero />
          <main id="main-content" className="max-w-5xl mx-auto px-5 sm:px-8 pb-24">
            <div className="pt-8 mb-20">
              <StatsBar />
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
