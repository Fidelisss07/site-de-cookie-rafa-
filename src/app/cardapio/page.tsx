import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProductGrid } from "@/components/ProductGrid";

export const metadata: Metadata = {
  title: "Cardápio",
  description: "Sabores da Sfornati Cookies: Alpino, Chocolate Branco, Meio amargo e Ao leite.",
  alternates: { canonical: "/cardapio" },
};

export default function CardapioPage() {
  return (
    <>
      <PageHero
        eyebrow="Cardápio"
        title="Escolha o seu favorito."
        text="Monte seu pedido com os sabores que você mais gosta. Adicione ao carrinho e finalize em poucos passos."
      />
      <section id="sabores" className="scroll-mt-20 bg-cream py-16 text-cocoa md:py-24">
        <div className="container-x">
          <ProductGrid />
        </div>
      </section>
    </>
  );
}
