import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mikhael Edo Sinambela | Front-end Developer",
  description:
    "Front-end developer with a passion for crafting modern, performant, and accessible user interfaces. Fresh graduate with hands-on experience in React, Next.js, and Flutter.",
  keywords: [
    "Mikhael Edo Sinambela",
    "Front-end Developer",
    "React Developer",
    "Next.js",
    "Jakarta",
    "Indonesia",
  ],
  authors: [{ name: "Mikhael Edo Sinambela" }],
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Mikhael Edo Sinambela | Front-end Developer",
    description:
      "Front-end developer with a passion for crafting modern, performant, and accessible user interfaces.",
    type: "website",
  },
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
