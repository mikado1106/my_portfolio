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
  title: "Mikhael Edo Sinambela | Full-Stack Developer",
  description:
    "Full-stack developer building practical web applications with PHP, CodeIgniter, and modern JavaScript. Fresh graduate with a 6-month full-stack internship and an end-to-end HRIS project.",
  keywords: [
    "Mikhael Edo Sinambela",
    "Full-Stack Developer",
    "PHP Developer",
    "CodeIgniter",
    "Jakarta",
    "Indonesia",
  ],
  authors: [{ name: "Mikhael Edo Sinambela" }],
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Mikhael Edo Sinambela | Full-Stack Developer",
    description:
      "Full-stack developer building practical web applications with PHP, CodeIgniter, and modern JavaScript.",
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
