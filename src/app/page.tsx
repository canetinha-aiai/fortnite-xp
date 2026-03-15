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

  return (
    <Layout>
      <Header onReset={reset} />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-6 md:py-10 lg:px-20 z-10 relative">
        <Hero
          onCalculate={calculate}
          daysRemaining={daysRemaining}
          seasonEndDate={seasonEndDate}
          isCalculated={calculated}
        />

        {calculated && currentLevel !== null && (
          <div className="animate-reveal delay-100">
            <SectionDivider label="Resultados" />
            <PlayerDashboard
              currentLevel={currentLevel}
              targetLevel={targetLevel}
              playstyleId={playstyleId}
              daysRemaining={daysRemaining}
            />
          </div>
        )}

        <div className="animate-reveal delay-200">
          <SectionDivider icon="menu_book" label="Guia de Uso" />
        </div>
        
        <section className="mt-8 space-y-12">
          {/* How to Use Section */}
          <article className="space-y-10 animate-reveal delay-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Nível Atual",
                  text: "Insira seu nível exato visto no jogo. É o ponto de partida essencial para o cálculo.",
                  icon: "pin",
                },
                {
                  title: "Defina seu Objetivo",
                  text: "Nível 100 para o passe base, ou 200 para desbloquear todos os estilos de supernível.",
                  icon: "target",
                },
                {
                  title: "Escolha seu Estilo",
                  text: "Selecione como você costuma jogar para obter uma estimativa precisa de partidas.",
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
                  <h3 className="text-xl font-black text-white uppercase italic">Dica de Mestre</h3>
                  <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
                    A calculadora se ajusta automaticamente ao tempo restante da temporada. Planeje-se agora para evitar o correria e o &quot;grind&quot; desesperado nos dias finais!
                  </p>
                </div>
              </div>
            </div>
          </article>

          <div className="animate-reveal delay-400">
            <SectionDivider icon="rocket_launch" label="Estratégias" />
          </div>

          <article className="space-y-8 animate-reveal delay-500">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
                Estratégias para{" "}
                <span className="text-primary">Maximizar seu XP</span>
              </h2>
              <p className="text-slate-400">
                Além de usar nossa calculadora, aqui estão as melhores formas de
                ganhar XP rapidamente nesta temporada do Fortnite.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Missões Diárias e Semanais",
                  desc: "São a fonte mais consistente. Foque nas Missões de História, pois elas oferecem grandes quantias de XP e contexto para a temporada.",
                  icon: "assignment",
                },
                {
                  title: "Modos Criativos (UEFN)",
                  desc: "Muitos mapas de UEFN premiam com XP por tempo de jogo. Mapas de Tycoon e Parkour costumam ser excelentes para 'farmar' XP passivo.",
                  icon: "map",
                },
                {
                  title: "Salve o Mundo",
                  desc: "Se você possui o modo Salve o Mundo, ele é uma das melhores fontes de XP para o Passe de Batalha através das missões diárias.",
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
            <SectionDivider icon="help" label="Dúvidas Comuns" />
          </div>

          <article className="pb-12 animate-reveal delay-500">
            <Accordion
              items={[
                {
                  q: "Quanto XP preciso por nível?",
                  a: "Na maioria das temporadas, cada nível exige exatos 80.000 XP. Isso significa que para ir do 1 ao 100, você precisa de 8 milhões de XP.",
                },
                {
                  q: "O XP do Modo Criativo é limitado?",
                  a: "Sim, existe um limite diário (cap) no Modo Criativo que costuma girar em torno de 400.000 XP por dia. Após isso, o ganho diminui drasticamente.",
                },
                {
                  q: "Qual o nível máximo necessário?",
                  a: "O nível 100 completa o passe base. O nível 200 é o objetivo da maioria dos jogadores, pois desbloqueia todos os estilos 'Super Level' (ouro, prismático, etc).",
                },
                {
                  q: "A calculadora considera missões?",
                  a: "Nossa calculadora foca na média de XP por tempo/estilo de jogo. As missões semanais são um bônus enorme que aceleram ainda mais o seu progresso.",
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
