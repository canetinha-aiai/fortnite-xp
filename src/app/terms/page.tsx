"use client";

import React from "react";
import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTranslation } from "@/context/LanguageContext";

export default function TermsPage() {
  const { t } = useTranslation();
  return (
    <Layout>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-20">
        <article className="prose prose-invert prose-emerald max-w-none">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-8">
            {t.nav.terms}
          </h1>
          
          <div className="space-y-6 text-slate-400 leading-relaxed">
            <h2 className="text-2xl font-bold text-white uppercase italic mt-10">{t.terms.section1Title}</h2>
            <p>{t.terms.section1Text}</p>

            <h2 className="text-2xl font-bold text-white uppercase italic mt-10">{t.terms.section2Title}</h2>
            <p>{t.terms.section2Text}</p>

            <h2 className="text-2xl font-bold text-white uppercase italic mt-10">{t.terms.section3Title}</h2>
            <p>{t.terms.section3Text}</p>
          </div>
        </article>
      </main>
      <Footer />
    </Layout>
  );
}
