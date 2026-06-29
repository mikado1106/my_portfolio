"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
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
