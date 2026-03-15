import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import React from "react";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://fortnite-xp.vercel.app",
  ),
  title: {
    default: "XP Fortnite | Fortnite XP Calculator & Níveis",
    template: "%s | XP Fortnite",
  },
  alternates: {
    canonical: "/",
  },
  description:
    "XP Fortnite: Acompanhe e calcule sua progressão de níveis e passos no Passe de Batalha de forma rápida e precisa. Saiba quanto falta para o nível 100 e 200.",
  keywords: [
    "Fortnite XP Calculator",
    "XP Fortnite",
    "Fortnite XP",
    "Fortnite",
    "XP",
    "Calculadora de XP Fortnite",
    "Passe de Batalha",
    "Battle Pass",
    "Níveis",
    "Progresso",
    "Como subir de nível rápido no fortnite",
    "Quanto de XP falta para o nível 100",
    "Quanto de XP falta para o nível 200",
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
    title: "XP Fortnite | Calculadora de Progressão",
    description:
      "XP Fortnite: Acompanhe sua progressão de níveis e passos no Passe de Batalha do Fortnite.",
    url: "/",
    siteName: "XP Fortnite",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XP Fortnite | Calculadora de Progressão",
    description:
      "XP Fortnite: Acompanhe sua progressão de níveis e passos no Passe de Batalha do Fortnite.",
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
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "XP Fortnite Calculator",
  "operatingSystem": "All",
  "applicationCategory": "ToolApplication",
  "description": "Calculadora precisa de XP Fortnite para progressão no Passe de Batalha. Saiba quanto XP falta para os níveis 100 e 200.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Person",
    "name": "Fortnite XP Team"
  }
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
