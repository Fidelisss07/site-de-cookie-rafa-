import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Parallax } from "./Parallax";
import { ButtonLink, Reveal } from "./ui";

export function OrderCTA() {
  const { finalCta, products } = siteConfig;
  const photo = products.find((p) => p.id === "ao-leite") ?? products[0];
  return (
    <section className="relative overflow-hidden bg-cream-2 text-cocoa">
      <div className="grid items-stretch md:grid-cols-2">
        <Parallax className="min-h-[280px] md:min-h-[460px]" distance={30}>
          <Image
            src={photo.imageWide ?? photo.image}
            alt={`Cookie ${photo.name} partido ao meio`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="photo-warm object-cover object-[50%_40%]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-cream-2 via-transparent to-transparent md:bg-gradient-to-l" />
        </Parallax>
        <div className="container-x flex flex-col justify-center py-16 md:ml-0 md:max-w-[620px] md:py-24 md:pl-14">
          <Reveal>
            <p className="eyebrow text-muted-brown">Peça já o seu</p>
            <h2 className="mt-4 font-display text-[2.6rem] leading-[1.02] font-semibold text-balance sm:text-5xl lg:text-6xl">
              {finalCta.title}
            </h2>
            <p className="mt-4 max-w-md text-base text-muted-brown sm:text-lg">{finalCta.text}</p>
            <ButtonLink href="/cardapio" variant="dark" className="mt-8">
              Fazer pedido
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
