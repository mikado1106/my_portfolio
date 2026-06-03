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
  title: "Mikhael Edo Sinambela | Full Stack Developer",
  description:
    "Graduate of Information Systems from Universitas Tarumanagara with experience in software development. Specializing in Front-End Development and Project Management.",
  keywords: [
    "Mikhael Edo Sinambela",
    "Full Stack Developer",
    "Front-End Developer",
    "Software Engineer",
    "Jakarta",
    "Indonesia",
  ],
  authors: [{ name: "Mikhael Edo Sinambela" }],
  openGraph: {
    title: "Mikhael Edo Sinambela | Full Stack Developer",
    description:
      "Graduate of Information Systems with experience in software development.",
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
