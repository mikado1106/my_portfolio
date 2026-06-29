"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";

const stats: Record<string, { value: string; label: string; labelId: string; color: string }[]> = {
  default: [
    { value: "99%", label: "Uptime maintained", labelId: "Uptime terjaga", color: "var(--green)" },
    { value: "50%", label: "Efficiency gain", labelId: "Peningkatan efisiensi", color: "var(--blue)" },
    { value: "40+", label: "Employees served", labelId: "Karyawan terlayani", color: "var(--amber)" },
    { value: "4+", label: "Projects shipped", labelId: "Proyek dirilis", color: "var(--cyan)" },
  ],
};

export function StatsBar() {
  const { lang } = useLanguage();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.default.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="relative text-center p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] group hover:border-[var(--border-hover)] transition-colors overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          {/* Subtle glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 50%, ${stat.color}10, transparent 70%)` }}
            aria-hidden="true"
          />
          <motion.div
            className="text-2xl sm:text-3xl font-bold font-mono relative z-10"
            style={{ color: stat.color }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 + 0.2, duration: 0.4, type: "spring" }}
          >
            {stat.value}
          </motion.div>
          <p className="text-[11px] text-[var(--text-muted)] mt-1.5 relative z-10">
            {lang === 'id' ? stat.labelId : stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
