import Image from "next/image";
import { ChefHat, Cookie, Leaf } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Parallax } from "./Parallax";
import { Reveal, SectionHeading } from "./ui";

const icons = [Cookie, Leaf, ChefHat];

export function QualitySection() {
  const { quality: q, products } = siteConfig;
  const photo = products.find((p) => p.id === "chocolate-branco") ?? products[0];
  return (
    <section className="grain relative overflow-hidden bg-cocoa">
      <div className="grid lg:grid-cols-2">
        <div className="container-x relative z-10 py-20 md:py-28 lg:mr-0 lg:max-w-[660px] lg:py-36 lg:pr-16">
          <Reveal>
            <SectionHeading eyebrow={q.eyebrow} title={q.title} subtitle={q.text} tone="dark" />
          </Reveal>
          <ul className="mt-12 grid gap-6 sm:grid-cols-3">
            {q.points.map((point, i) => {
              const Icon = icons[i % icons.length];
              return (
                <Reveal as="li" key={point} delay={0.1 + i * 0.08} className="flex items-center gap-3 sm:flex-col sm:items-start">
                    <span className="grid size-12 place-items-center rounded-2xl border border-soft-gold/30 text-soft-gold">
                      <Icon className="size-5" strokeWidth={1.5} />
                    </span>
                    <span className="text-sm leading-snug font-medium text-cream/85">{point}</span>
                </Reveal>
              );
            })}
          </ul>
        </div>

        <Parallax className="min-h-[340px] sm:min-h-[440px] lg:min-h-full">
          <Image
            src={photo.imageWide ?? photo.image}
            alt={`Cookie ${photo.name} partido, mostrando o interior macio`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="photo-warm object-cover object-[50%_40%]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-cocoa via-transparent to-cocoa/60 lg:bg-gradient-to-r lg:from-cocoa lg:via-cocoa/10 lg:to-transparent" />
        </Parallax>
      </div>
    </section>
  );
}
