import { Quote, Star } from "lucide-react";
import { instagramUrl, siteConfig, visibleTestimonials } from "@/config/site";
import { InstagramIcon } from "./icons";
import { ButtonLink, Reveal, SectionHeading } from "./ui";

export function Testimonials() {
  const { testimonialsSection: s } = siteConfig;
  const ig = instagramUrl();
  return (
    <section id="avaliacoes" className="grain relative scroll-mt-20 overflow-hidden bg-espresso py-20 md:py-32">
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 size-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(215,154,91,.14),transparent)]" />
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:items-center lg:gap-16">
        <Reveal>
          <SectionHeading eyebrow={s.eyebrow} title={s.title} tone="dark" />
        </Reveal>

        {visibleTestimonials.length > 0 ? (
          <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
            {visibleTestimonials.map((t, i) => (
              <Reveal as="li" key={i} delay={i * 0.08} className="w-[82%] shrink-0 snap-center md:w-auto">
                <figure className="relative flex h-full flex-col rounded-[20px] border border-soft-gold/15 bg-cocoa/70 p-7 backdrop-blur-sm">
                  {t.placeholder && (
                    <span className="absolute top-4 right-4 rounded border border-dashed border-caramel/60 px-1.5 py-0.5 font-mono text-[10px] text-caramel">
                      exemplo · dev
                    </span>
                  )}
                  <Quote className="size-7 text-caramel" strokeWidth={1.5} />
                  <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-cream/85">“{t.quote}”</blockquote>
                  <figcaption className="mt-6">
                    <p className="text-sm font-semibold text-warm-white">{t.author}</p>
                    {t.rating ? (
                      <p className="mt-1.5 flex gap-0.5 text-caramel" aria-label={`${t.rating} de 5 estrelas`}>
                        {Array.from({ length: t.rating }).map((_, k) => (
                          <Star key={k} className="size-3.5 fill-current" />
                        ))}
                      </p>
                    ) : null}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal>
            <div className="rounded-[20px] border border-soft-gold/15 bg-cocoa/60 p-8 md:p-10">
              <p className="max-w-lg font-display text-2xl leading-snug text-cream md:text-3xl">{s.emptyText}</p>
              {ig && (
                <ButtonLink href={ig} external variant="outline" className="mt-8" icon={<InstagramIcon className="size-4" />}>
                  Siga no Instagram
                </ButtonLink>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
