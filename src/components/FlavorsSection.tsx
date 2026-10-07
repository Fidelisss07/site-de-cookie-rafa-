import { siteConfig } from "@/config/site";
import { ProductCard } from "./ProductCard";
import { ButtonLink, Reveal, SectionHeading } from "./ui";

export function FlavorsSection() {
  const { flavorsSection: s, products } = siteConfig;
  return (
    <section id="sabores" className="relative scroll-mt-20 overflow-hidden bg-cream py-20 text-cocoa md:py-32">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(215,154,91,.18),transparent)]" />
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} className="max-w-2xl" />
          </Reveal>
          <Reveal delay={0.1} className="hidden md:block">
            <ButtonLink href="/cardapio" variant="outline-dark">
              Ver todos os sabores
            </ButtonLink>
          </Reveal>
        </div>
      </div>

      {/* mobile: carrossel com snap · desktop: grade */}
      <ul className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:container-x md:mt-16 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0 lg:grid-cols-4">
        {products.map((product, i) => (
          <Reveal as="li" key={product.id} delay={i * 0.08} className="w-[76%] shrink-0 snap-center sm:w-[46%] md:w-auto">
            <ProductCard product={product} />
          </Reveal>
        ))}
      </ul>

      <div className="container-x mt-8 md:hidden">
        <ButtonLink href="/cardapio" variant="outline-dark" className="w-full">
          Ver todos os sabores
        </ButtonLink>
      </div>
    </section>
  );
}
