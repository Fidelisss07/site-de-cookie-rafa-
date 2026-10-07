import type { Metadata } from "next";
import Image from "next/image";
import { isDev, siteConfig } from "@/config/site";
import { PageHero } from "@/components/PageHero";
import { OrderCTA } from "@/components/OrderCTA";
import { DevNote, Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a Sfornati Cookies.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  const { about, products } = siteConfig;
  // Blocos institucionais: só aparecem quando preenchidos em site.ts
  // (em desenvolvimento aparecem como espaço reservado).
  const blocks = [
    { id: "historia", title: "Nossa história", text: about.story },
    { id: "processo", title: "Nosso processo", text: about.process },
    { id: "fundadores", title: "Quem faz", text: about.founders },
  ].filter((b) => b.text || isDev);

  return (
    <>
      <PageHero eyebrow={about.eyebrow} title={about.title} />

      <section className="bg-cream py-20 text-cocoa md:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="font-display text-3xl leading-snug text-balance md:text-4xl">{about.intro}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {products.map((p, i) => (
                <div
                  key={p.id}
                  className={`relative aspect-square overflow-hidden rounded-[20px] ${i % 2 === 1 ? "translate-y-8" : ""}`}
                >
                  <Image src={p.image} alt={`Cookie ${p.name}`} fill sizes="(min-width: 1024px) 280px, 45vw" className="photo-warm scale-110 object-cover" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {blocks.length > 0 && (
        <section className="bg-warm-white py-20 text-cocoa md:py-28">
          <div className="container-x grid gap-6 md:grid-cols-3">
            {blocks.map((b, i) => (
              <Reveal key={b.id} delay={i * 0.08}>
                <article id={b.id} className="h-full rounded-[20px] border border-cocoa/10 bg-cream p-8">
                  <p className="font-display text-5xl text-caramel">0{i + 1}</p>
                  <h2 className="mt-4 font-display text-3xl font-semibold">{b.title}</h2>
                  {b.text ? (
                    <p className="mt-3 leading-relaxed text-muted-brown">{b.text}</p>
                  ) : (
                    <p className="mt-4">
                      <DevNote>preencher about.{b.id === "historia" ? "story" : b.id === "processo" ? "process" : "founders"} em site.ts</DevNote>
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <OrderCTA />
    </>
  );
}
