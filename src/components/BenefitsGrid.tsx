import { Gift, Heart, Leaf, Truck, type LucideIcon } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ButtonLink, Reveal, SectionHeading } from "./ui";

const iconMap: Record<string, LucideIcon> = { heart: Heart, leaf: Leaf, truck: Truck, gift: Gift };

export function BenefitsGrid() {
  const { benefits: b } = siteConfig;
  return (
    <section className="bg-cream py-20 text-cocoa md:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading eyebrow={b.eyebrow} title={b.title} className="max-w-xl" />
          </Reveal>
          <Reveal delay={0.1}>
            <ButtonLink href="/sobre" variant="outline-dark">
              Conheça a Sfornati
            </ButtonLink>
          </Reveal>
        </div>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {b.items.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Heart;
            return (
              <Reveal as="li" key={item.title} delay={i * 0.08} className="h-full">
                <div className="group h-full rounded-[20px] border border-cocoa/10 bg-warm-white p-7 transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:border-caramel/40 hover:shadow-[0_24px_50px_-28px_rgba(42,20,11,.45)]">
                  <span className="grid size-12 place-items-center rounded-full bg-cream text-cocoa transition-colors duration-300 group-hover:bg-caramel group-hover:text-espresso">
                    <Icon className="size-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold text-cocoa">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-brown">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
