import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Leia os termos de uso e condições do site Fortnite XP.",
};
import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <Layout>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-20">
        <article className="prose prose-invert prose-emerald max-w-none">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-8">
            Termos de <span className="text-primary">Uso</span>
          </h1>
          
          <div className="space-y-6 text-slate-400 leading-relaxed">
            <h2 className="text-2xl font-bold text-white uppercase italic mt-10">1. Termos</h2>
            <p>
              Ao acessar ao site Fortnite XP, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site.
            </p>

            <h2 className="text-2xl font-bold text-white uppercase italic mt-10">2. Precisão dos Materiais</h2>
            <p>
              Os materiais exibidos no site da Fortnite XP podem incluir erros técnicos, tipográficos ou fotográficos. Fortnite XP não garante que qualquer material em seu site seja preciso, completo ou atual. Fortnite XP pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio.
            </p>

            <h2 className="text-2xl font-bold text-white uppercase italic mt-10">3. Links</h2>
            <p>
              O Fortnite XP não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por Fortnite XP do site. O uso de qualquer site vinculado é por conta e risco do usuário.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </Layout>
  );
}
