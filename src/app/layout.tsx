import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { LanguageProvider } from "@/contexts/language-context";
import { HtmlLang } from "@/components/html-lang";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mikhael Edo Sinambela | Junior Full-Stack Developer",
  description:
    "Junior Full-Stack Developer — built a complete HRIS for 40 employees and a corporate website using PHP/CodeIgniter, Next.js, and Flutter. Based in Jakarta, open to remote.",
  keywords: [
    "Mikhael Edo Sinambela",
    "Junior Full-Stack Developer",
    "Full-Stack Developer",
    "React Developer",
    "Next.js",
    "Jakarta",
    "Indonesia",
    "PHP",
    "CodeIgniter",
    "Flutter",
  ],
  authors: [{ name: "Mikhael Edo Sinambela" }],
  creator: "Mikhael Edo Sinambela",
  icons: { icon: "/icon.svg" },
  metadataBase: new URL("https://mikhaeledo.com"),
  openGraph: {
    title: "Mikhael Edo Sinambela | Junior Full-Stack Developer",
    description:
      "Junior Full-Stack Developer — built a complete HRIS for 40 employees and a corporate website using PHP/CodeIgniter, Next.js, and Flutter.",
    type: "website",
    locale: "en_US",
    url: "https://mikhaeledo.com",
    siteName: "Mikhael Edo Sinambela",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mikhael Edo Sinambela | Junior Full-Stack Developer",
    description:
      "Junior Full-Stack Developer — built a complete HRIS for 40 employees and a corporate website using PHP/CodeIgniter, Next.js, and Flutter.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mikhael Edo Sinambela",
  url: "https://mikhaeledo.com",
  jobTitle: "Junior Full-Stack Developer",
  worksFor: {
    "@type": "Organization",
    name: "Open to opportunities",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jakarta",
    addressCountry: "ID",
  },
  sameAs: [
    "https://www.linkedin.com/in/mikhaeledo",
    "https://github.com/mikado1106",
  ],
  knowsAbout: [
    "React", "Next.js", "TypeScript", "PHP", "CodeIgniter",
    "Flutter", "MySQL", "Docker", "Tailwind CSS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <HtmlLang />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
