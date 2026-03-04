import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import React from "react";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://fortnite-xp.vercel.app",
  ),
  title: {
    default: "Fortnite XP | Calculadora de Progressão",
    template: "%s | Fortnite XP",
  },
  alternates: {
    canonical: "/",
  },
  description:
    "Fortnite XP: Acompanhe e calcule sua progressão de níveis e passos no Passe de Batalha do Fortnite de forma rápida e precisa.",
  keywords: [
    "Fortnite XP",
    "Fortnite",
    "XP",
    "Calculadora",
    "Passe de Batalha",
    "Battle Pass",
    "Níveis",
    "Progresso",
    "Fortnite XP Calculator",
  ],
  authors: [{ name: "Fortnite XP Team" }],
  creator: "Fortnite XP",
  publisher: "Fortnite XP",
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
  openGraph: {
    title: "Fortnite XP | Calculadora de Progressão",
    description:
      "Fortnite XP: Acompanhe sua progressão de níveis e passos no Passe de Batalha do Fortnite.",
    url: "/",
    siteName: "Fortnite XP",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fortnite XP | Calculadora de Progressão",
    description:
      "Fortnite XP: Acompanhe sua progressão de níveis e passos no Passe de Batalha do Fortnite.",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4134297425551055"
          crossOrigin="anonymous"
        ></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${spaceGrotesk.variable} antialiased`}>{children}</body>
    </html>
  );
}
