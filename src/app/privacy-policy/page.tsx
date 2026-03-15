"use client";

import React from "react";
import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTranslation } from "@/context/LanguageContext";

export default function PrivacyPolicyPage() {
  const { t } = useTranslation();
  return (
    <Layout>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-20">
        <article className="prose prose-invert prose-emerald max-w-none">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-8">
            {t.nav.privacy}
          </h1>
          
          <div className="space-y-6 text-slate-400 leading-relaxed">
            <p>{t.privacy.intro}</p>

            <h2 className="text-2xl font-bold text-white uppercase italic mt-10">{t.privacy.section1Title}</h2>
            <p>{t.privacy.section1Text}</p>

            <h2 className="text-2xl font-bold text-white uppercase italic mt-10">{t.privacy.section2Title}</h2>
            <p>{t.privacy.section2Text}</p>
            <p>{t.privacy.section2Text2}</p>

            <h2 className="text-2xl font-bold text-white uppercase italic mt-10">{t.privacy.section3Title}</h2>
            <p>{t.privacy.section3Text}</p>

            <h2 className="text-2xl font-bold text-white uppercase italic mt-10">{t.privacy.section4Title}</h2>
            <p>{t.privacy.section4Text}</p>

            <h2 className="text-2xl font-bold text-white uppercase italic mt-10">{t.privacy.contactTitle}</h2>
            <p>{t.privacy.contactText}</p>
          </div>
        </article>
      </main>
      <Footer />
    </Layout>
  );
}
