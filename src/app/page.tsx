"use client";

import React from "react";
import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/dashboard/Hero";
import PlayerDashboard from "@/components/dashboard/PlayerDashboard";
import SectionDivider from "@/components/dashboard/SectionDivider";
import Accordion from "@/components/dashboard/Accordion";
import { useFortniteStats } from "@/hooks/useFortniteStats";
import { useTranslation } from "@/context/LanguageContext";

export default function Home() {
  const {
    currentLevel,
    targetLevel,
    playstyleId,
    daysRemaining,
    seasonEndDate,
    calculated,
    calculate,
    reset,
  } = useFortniteStats();
  const { t } = useTranslation();

  return (
    <Layout>
      <Header onReset={reset} />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-6 md:py-10 lg:px-20 z-10 relative">
        <Hero
          onCalculate={calculate}
          isCalculated={calculated}
        />

        {calculated && currentLevel !== null && (
          <div className="animate-reveal delay-100">
            <SectionDivider label={t.hero.resultsPanel} />
            <PlayerDashboard
              currentLevel={currentLevel}
              targetLevel={targetLevel}
              playstyleId={playstyleId}
              daysRemaining={daysRemaining}
            />
          </div>
        )}

        <div className="animate-reveal delay-200">
          <SectionDivider icon="menu_book" label={t.guide.title} />
        </div>
        
        <section className="mt-8 space-y-12 animate-reveal delay-300">
          {/* How to Use Section */}
          <article className="space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
                {t.guide.howTo.split('?')[0]} <span className="text-primary">XP Fortnite</span>?
              </h2>
              <p className="text-slate-400">
                {t.hero.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: t.guide.step1Title,
                  text: t.guide.step1Text,
                  icon: "pin",
                },
                {
                  title: t.guide.step2Title,
                  text: t.guide.step2Text,
                  icon: "target",
                },
                {
                  title: t.guide.step3Title,
                  text: t.guide.step3Text,
                  icon: "sports_esports",
                },
              ].map((step, i) => (
                <div key={i} className="bg-card-dark/40 border border-border-dark p-6 rounded-2xl space-y-4 hover:border-primary/30 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined text-primary text-2xl">{step.icon}</span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-white font-black text-lg uppercase italic tracking-tight">{step.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Master Tip Banner */}
            <div className="bg-linear-to-r from-primary/10 via-primary/5 to-transparent border-l-4 border-primary p-6 sm:p-8 rounded-r-2xl relative overflow-hidden group">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
                <div className="shrink-0 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(255,255,0,0.3)]">
                  <span className="material-symbols-outlined text-background-dark text-3xl font-bold">lightbulb</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white uppercase italic">{t.guide.masterTip}</h3>
                  <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
                    {t.guide.masterTipText}
                  </p>
                </div>
              </div>
            </div>
          </article>

          <div className="animate-reveal delay-400">
            <SectionDivider icon="rocket_launch" label={t.strategies.title} />
          </div>

          <article className="space-y-8 animate-reveal delay-500">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
                {t.strategies.maximize.replace('XP Fortnite', '')} <span className="text-primary">XP Fortnite</span>
              </h2>
              <p className="text-slate-400">
                {t.strategies.maximizeDesc}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: t.strategies.strategy1Title,
                  desc: t.strategies.strategy1Desc,
                  icon: "assignment",
                },
                {
                  title: t.strategies.strategy2Title,
                  desc: t.strategies.strategy2Desc,
                  icon: "map",
                },
                {
                  title: t.strategies.strategy3Title,
                  desc: t.strategies.strategy3Desc,
                  icon: "security",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-card-dark border border-border-dark p-6 rounded-xl hover:border-primary/50 transition-all group"
                >
                  <span className="material-symbols-outlined text-primary text-3xl mb-4 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <h4 className="text-lg font-bold text-white uppercase italic mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <div className="animate-reveal delay-500">
            <SectionDivider icon="help" label={t.faq.title} />
          </div>

          <article className="pb-12 animate-reveal delay-500">
            <Accordion
              items={[
                {
                  q: t.faq.q1,
                  a: t.faq.a1,
                },
                {
                  q: t.faq.q2,
                  a: t.faq.a2,
                },
                {
                  q: t.faq.q3,
                  a: t.faq.a3,
                },
                {
                  q: t.faq.q4,
                  a: t.faq.a4,
                },
              ]}
            />
          </article>
        </section>
      </main>
      <Footer />
    </Layout>
  );
}
