import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre o Projeto",
  description: "Saiba mais sobre a missão do Fortnite XP e como ajudamos a comunidade.",
};
import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <Layout>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-20">
        <article className="prose prose-invert prose-emerald max-w-none">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-8">
            Sobre o <span className="text-primary">Fortnite XP</span>
          </h1>
          
          <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
            <p>
              O <strong className="text-white">Fortnite XP</strong> é uma ferramenta independente criada para ajudar a comunidade de jogadores de Fortnite a otimizar sua progressão no Passe de Batalha. Sabemos que alcançar o nível 200 para desbloquear todos os Estilos de Supernível pode ser um desafio, e nossa missão é tornar esse processo mais claro e planejado.
            </p>

            <h2 className="text-2xl font-bold text-white uppercase italic mt-10">O que fazemos?</h2>
            <p>
              Nossa plataforma oferece uma calculadora de precisão que leva em conta diversos fatores:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Seu nível atual e seu objetivo final.</li>
              <li>O tempo restante na temporada atual (atualizado em tempo real).</li>
              <li>Seu estilo de jogo (casual, regular ou focado em XP).</li>
            </ul>

            <h2 className="text-2xl font-bold text-white uppercase italic mt-10">Nossa Missão</h2>
            <p>
              Queremos ser a fonte número um de informações sobre progressão de XP no Fortnite Brasil. Além da calculadora, fornecemos dicas estratégicas sobre como maximizar seus ganhos de XP através de missões, modos de jogo criativos, Salve o Mundo e eventos especiais.
            </p>

            <div className="bg-card-dark border-2 border-border-dark p-6 rounded-xl mt-12">
              <h3 className="text-xl font-bold text-primary uppercase italic mb-2">Transparência</h3>
              <p className="text-sm">
                O Fortnite XP não é afiliado, associado, autorizado, endossado por, ou de qualquer forma oficialmente conectado à Epic Games, Inc. O uso de nomes relacionados ao Fortnite é apenas de caráter informativo e educacional.
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </Layout>
  );
}
