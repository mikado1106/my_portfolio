"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { useLanguage } from "@/contexts/language-context";

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6 } },
};

export function AboutSection() {
  const { dict } = useLanguage();

  return (
    <Section id="about">
      <motion.div variants={fadeUp} className="text-center">
        <p className="section-tag justify-center">{dict.about.title}</p>
        <h2 className="text-2xl font-semibold text-[var(--text)] mb-6 tracking-tighter">
          {dict.about.subtitle}
        </h2>
      </motion.div>
      <motion.div variants={fadeUp} className="max-w-2xl mx-auto text-center">
        <p className="text-[var(--text-secondary)] leading-relaxed text-base">
          {dict.about.body}
        </p>
      </motion.div>
    </Section>
  );
}
