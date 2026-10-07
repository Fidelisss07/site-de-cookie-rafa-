"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Cookie, Heart, Leaf } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "./ui";

const badgeIcons = [Cookie, Leaf, Heart];
const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);

  const [main, ...rest] = siteConfig.products;
  const featured = siteConfig.products.find((p) => p.id === "meio-amargo") ?? main;
  const thumbs = rest.filter((p) => p.id !== featured.id).slice(0, 2);
  const { hero } = siteConfig;

  const enter = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } };

  return (
    <section ref={ref} className="grain relative isolate overflow-hidden bg-espresso pt-28 pb-16 md:pt-36 lg:min-h-[100svh] lg:pb-24">
      {/* atmosfera */}
      <motion.div
        aria-hidden
        style={{ y: glowY }}
        className="pointer-events-none absolute -top-40 right-[-10%] -z-10 size-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(215,154,91,.28),transparent)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-cocoa/70 to-transparent"
      />

      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        {/* Foto */}
        <motion.div
          className="relative order-first mx-auto w-full max-w-[420px] sm:max-w-[460px] lg:order-last lg:max-w-[500px]"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease }}
        >
          <div className="relative aspect-[4/4.4] overflow-hidden rounded-t-[999px] rounded-b-[28px] shadow-[0_40px_80px_-30px_rgba(0,0,0,.9)] ring-1 ring-soft-gold/25 sm:aspect-[4/5]">
            <motion.div style={{ y: imgY }} className="absolute inset-[-6%]">
              <Image
                src={featured.imageWide ?? featured.image}
                alt={`Cookie ${featured.name} partido ao meio, com recheio de chocolate aparente`}
                fill
                priority
                sizes="(min-width: 1024px) 500px, (min-width: 640px) 460px, 90vw"
                className="photo-warm object-cover object-[50%_42%]"
              />
            </motion.div>
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_30%,rgba(22,13,8,.55)_70%,rgba(22,13,8,.92)_100%)]"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-6">
              <div>
                <p className="eyebrow text-[10px] text-soft-gold">Sabor em destaque</p>
                <p className="font-display text-2xl text-warm-white sm:text-3xl">{featured.name}</p>
              </div>
            </div>
          </div>

          {/* miniaturas flutuantes */}
          {thumbs.map((p, i) => (
            <motion.div
              key={p.id}
              className={`absolute hidden size-24 overflow-hidden rounded-full ring-4 ring-espresso shadow-2xl sm:block lg:size-28 ${
                i === 0 ? "top-[16%] -left-10 lg:-left-14" : "-right-6 bottom-[22%] lg:-right-10"
              }`}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 + i * 0.15, ease }}
            >
              <Image src={p.image} alt={`Cookie ${p.name}`} fill sizes="112px" className="photo-warm scale-125 object-cover" />
            </motion.div>
          ))}

          <p
            aria-hidden
            className="absolute -top-2 right-0 hidden rotate-[-8deg] font-display text-3xl leading-none text-soft-gold/80 italic lg:block"
          >
            Cookies
            <br />
            <span className="pl-6">Artesanais</span>
          </p>
        </motion.div>

        {/* Copy */}
        <div className="relative text-center lg:text-left">
          <motion.p {...enter(0.1)} className="eyebrow text-soft-gold">
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            {...enter(0.2)}
            className="mt-5 font-display text-[2.9rem] leading-[0.98] font-semibold tracking-[-0.015em] text-warm-white text-balance sm:text-6xl lg:text-[5.25rem] xl:text-[5.9rem]"
          >
            {hero.titleStart} <span className="text-caramel italic">{hero.titleAccent}</span>
          </motion.h1>
          <motion.p
            {...enter(0.35)}
            className="mx-auto mt-6 max-w-md text-base leading-relaxed text-cream/75 sm:text-lg lg:mx-0"
          >
            {hero.subtitle}
          </motion.p>
          <motion.div
            {...enter(0.5)}
            className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start"
          >
            <ButtonLink href="/cardapio">
              Fazer pedido agora
            </ButtonLink>
            <ButtonLink href="/cardapio#sabores" variant="outline">
              Ver cardápio
            </ButtonLink>
          </motion.div>

          <motion.ul
            {...enter(0.65)}
            className="mt-12 grid grid-cols-3 gap-3 border-t border-warm-white/10 pt-7 sm:gap-6 lg:max-w-lg"
          >
            {hero.badges.map((badge, i) => {
              const Icon = badgeIcons[i % badgeIcons.length];
              return (
                <li key={badge} className="flex flex-col items-center gap-2.5 text-center sm:flex-row sm:text-left lg:items-center">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-soft-gold/35 text-soft-gold">
                    <Icon className="size-[18px]" strokeWidth={1.5} />
                  </span>
                  <span className="text-[11px] leading-tight font-medium text-cream/80 sm:text-xs">{badge}</span>
                </li>
              );
            })}
          </motion.ul>
        </div>
      </div>

      <a
        href="#sabores"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 place-items-center rounded-full border border-warm-white/20 p-2 text-cream/70 transition-colors hover:border-caramel hover:text-caramel lg:grid"
        aria-label="Ir para os sabores"
      >
        <ChevronDown className="size-4" />
      </a>
    </section>
  );
}
