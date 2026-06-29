"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Terminal, P } from "@/components/ui/terminal";
import { useLanguage } from "@/contexts/language-context";

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6 } },
};

export function ContactSection() {
  const { dict } = useLanguage();

  return (
    <Section id="contact">
      <motion.div variants={fadeUp} className="mb-8">
        <p className="section-tag">{dict.contact.title}</p>
        <h2 className="text-2xl font-bold text-[var(--text)] mb-3 tracking-tight">{dict.contact.subtitle}</h2>
        <p className="text-sm text-[var(--text-secondary)] max-w-md">
          {dict.contact.desc}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        <motion.div variants={fadeUp} className="h-full">
          <Terminal title="contact" className="h-full flex flex-col">
            <p><P /><span className="s-cmd">open</span> <span className="s-str">contact.toml</span></p>
            <br />
            <ContactLine label="email" value="edomikhael@gmail.com" href="mailto:edomikhael@gmail.com" />
            <ContactLine label="phone" value="+62 814-1355-7945" href="tel:+6281413557945" />
            <ContactLine label="linkedin" value="mikhaeledo" href="https://www.linkedin.com/in/mikhaeledo" external />
            <ContactLine label="github" value="github.com/mikado1106" href="https://github.com/mikado1106" external />
            <ContactLine label="location" value="Jakarta, Indonesia" />
            <br />
            <p className="s-comment"># Looking forward to hearing from you.</p>
            <div className="flex-grow" />
            <p><P /><span className="caret" /></p>
          </Terminal>
        </motion.div>

        <motion.div variants={fadeUp} className="h-full">
          <ContactForm />
        </motion.div>
      </div>
    </Section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const { dict } = useLanguage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const message = data.get("message") as string;

    setStatus("sending");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website: '' }), // honeypot always empty for humans
      });

      if (!response.ok) throw new Error('Failed to send');

      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-full p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] flex flex-col gap-4">
      {/* Honeypot — visually hidden, bots fill this */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
      />
      <h3 className="text-sm font-semibold text-[var(--text)]">{dict.contact.quickMsg}</h3>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider">{dict.contact.name}</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          className="px-3 py-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--green)] transition-colors"
          placeholder={dict.contact.name}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider">{dict.contact.email}</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="px-3 py-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--green)] transition-colors"
          placeholder="you@email.com"
        />
      </div>

      <div className="flex flex-col gap-1.5 flex-grow">
        <label htmlFor="contact-message" className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider">{dict.contact.message}</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          className="px-3 py-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--green)] transition-colors resize-none flex-grow"
          placeholder="..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-2.5 rounded-lg bg-[var(--text)] text-[var(--bg)] text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === "idle" && dict.contact.send}
        {status === "sending" && dict.contact.sending}
        {status === "sent" && dict.contact.sent}
        {status === "error" && dict.contact.error}
      </button>
    </form>
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
