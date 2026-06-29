"use client";

import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/use-magnetic";

export function MagneticButton({ children }: { children: React.ReactNode }) {
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
