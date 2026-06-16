"use client";

import { motion } from "framer-motion";

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

function P() {
  return <><span className="s-p">❯</span>{" "}</>;
}

export function Terminal({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={scaleIn} className={`term ${className}`}>
      <div className="term-bar">
        <div className="term-dots">
          <span className="bg-[#ff5f56]" />
          <span className="bg-[#ffbd2e]" />
          <span className="bg-[#27c93f]" />
        </div>
        <span className="term-title">{title}</span>
        <div className="w-[52px]" />
      </div>
      <div className="term-body flex-grow flex flex-col">{children}</div>
    </motion.div>
  );
}

export { P };
