"use client";

import React from "react";
import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTranslation } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useTranslation();
  return (
    <Layout>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-20">
        <article className="prose prose-invert prose-emerald max-w-none">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-8">
            {t.about.titleHeader.split('{name}')[0]} <span className="text-primary">Fortnite XP</span>
          </h1>
          
          <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
            <p>
              {t.about.description.replace('{name}', 'Fortnite XP')}
            </p>

            <h2 className="text-2xl font-bold text-white uppercase italic mt-10">{t.about.whatWeDo}</h2>
            <p>
              {t.about.whatWeDoText}
            </p>
            <ul className="list-disc pl-6 space-y-2">
              {t.about.factors.map((factor: string, i: number) => (
                <li key={i}>{factor}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-white uppercase italic mt-10">{t.about.mission}</h2>
            <p>
              {t.about.missionText}
            </p>

            <div className="bg-card-dark border-2 border-border-dark p-6 rounded-xl mt-12">
              <h3 className="text-xl font-bold text-primary uppercase italic mb-2">{t.about.transparency}</h3>
              <p className="text-sm text-slate-400">
                {t.about.transparencyText}
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </Layout>
  );
}
