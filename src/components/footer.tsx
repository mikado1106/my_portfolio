"use client";

import { useLanguage } from "@/contexts/language-context";

export function Footer() {
  const { lang } = useLanguage();

  const links = [
    { href: "#experience", label: lang === 'id' ? "Pengalaman" : "Experience" },
    { href: "#projects", label: lang === 'id' ? "Proyek" : "Projects" },
    { href: "#contact", label: lang === 'id' ? "Kontak" : "Contact" },
  ];

  const socials = [
    { href: "https://www.linkedin.com/in/mikhaeledo", label: "LinkedIn" },
    { href: "https://github.com/mikado1106", label: "GitHub" },
    { href: "mailto:edomikhael@gmail.com", label: "Email" },
  ];

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-card)]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
        {/* Top section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          {/* Branding */}
          <div>
            <span className="text-sm font-medium tracking-tight text-[var(--text)] font-mono">
              Mikhaeledo<span className="text-[var(--green)]">.</span>
            </span>
            <p className="text-[11px] text-[var(--text-muted)] mt-1 max-w-[220px]">
              {lang === 'id'
                ? "Fullstack developer yang fokus pada solusi yang bersih dan berdampak."
                : "Fullstack developer focused on clean, impactful solutions."}
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
                {lang === 'id' ? 'Navigasi' : 'Navigate'}
              </span>
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
                {lang === 'id' ? 'Terhubung' : 'Connect'}
              </span>
              {socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-xs text-[var(--text-secondary)] hover:text-[var(--green)] transition-colors"
                >
                  {social.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom divider + copyright */}
        <div className="border-t border-[var(--border)] pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[var(--text-muted)]">
          <span>© 2026 Mikhael Edo Sinambela</span>
          <span className="font-mono flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" aria-hidden="true" />
            Built with Next.js + Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  );
}
