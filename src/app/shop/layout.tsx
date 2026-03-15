import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loja de Itens Hoje",
  description: "Confira os itens disponíveis na loja do Fortnite hoje. Skins, danças, picaretas e pacotões com preços em V-Bucks atualizados.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
