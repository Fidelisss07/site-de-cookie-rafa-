import { Reveal } from "./ui";

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="grain relative overflow-hidden bg-espresso pt-36 pb-16 md:pt-44 md:pb-24">
      <div aria-hidden className="pointer-events-none absolute -top-32 right-[-10%] size-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(215,154,91,.22),transparent)] blur-2xl" />
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow text-soft-gold">{eyebrow}</p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[0.98] font-semibold text-warm-white text-balance sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {text && <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg">{text}</p>}
        </Reveal>
      </div>
    </section>
  );
}
