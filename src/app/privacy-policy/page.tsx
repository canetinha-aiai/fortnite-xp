import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Conheça nossa política de privacidade e como tratamos seus dados no Fortnite XP.",
};
import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-20">
        <article className="prose prose-invert prose-emerald max-w-none">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-8">
            Política de <span className="text-primary">Privacidade</span>
          </h1>
          
          <div className="space-y-6 text-slate-400 leading-relaxed">
            <p>
              A sua privacidade é importante para nós. É política do Fortnite XP respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Fortnite XP, e outros sites que possuímos e operamos.
            </p>

            <h2 className="text-2xl font-bold text-white uppercase italic mt-10">1. Coleta de Informações</h2>
            <p>
              Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
            </p>

            <h2 className="text-2xl font-bold text-white uppercase italic mt-10">2. Google AdSense e Cookies</h2>
            <p>
              O Google, como fornecedor de terceiros, utiliza cookies para exibir anúncios em nosso site. Com o cookie DART, o Google pode exibir anúncios para você com base nas suas visitas ao nosso e a outros sites na Internet. Os usuários podem desativar o cookie DART visitando a Política de Privacidade da rede de conteúdo e anúncios do Google.
            </p>
            <p>
              Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos. Os cookies de publicidade comportamental usados por este site foram projetados para garantir que você receba os anúncios mais relevantes sempre que possível, rastreando anonimamente seus interesses.
            </p>

            <h2 className="text-2xl font-bold text-white uppercase italic mt-10">3. Uso de Dados</h2>
            <p>
              Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
            </p>

            <h2 className="text-2xl font-bold text-white uppercase italic mt-10">4. Seus Direitos</h2>
            <p>
              Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados. O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais.
            </p>

            <h2 className="text-2xl font-bold text-white uppercase italic mt-10">Contato</h2>
            <p>
              Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </Layout>
  );
}
