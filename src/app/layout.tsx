import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { LanguageProvider } from "@/contexts/language-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mikhael Edo Sinambela | Full-Stack Developer",
  description:
    "Full-stack developer who shipped an HRIS serving 40+ employees and maintained a corporate site at 99% uptime. Building fast, accessible interfaces with React, Next.js, and modern tools.",
  keywords: [
    "Mikhael Edo Sinambela",
    "Full-Stack Developer",
    "Front-end Developer",
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
  metadataBase: new URL("https://mikhaeledo.vercel.app"),
  openGraph: {
    title: "Mikhael Edo Sinambela | Full-Stack Developer",
    description:
      "Full-stack developer who shipped an HRIS serving 40+ employees and maintained a corporate site at 99% uptime.",
    type: "website",
    locale: "en_US",
    url: "https://mikhaeledo.vercel.app",
    siteName: "Mikhael Edo Sinambela",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mikhael Edo Sinambela — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mikhael Edo Sinambela | Full-Stack Developer",
    description:
      "Full-stack developer who shipped an HRIS serving 40+ employees and maintained a corporate site at 99% uptime.",
    images: ["/og-image.png"],
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
  url: "https://mikhaeledo.vercel.app",
  jobTitle: "Full-Stack Developer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
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
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
