"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/cart";
import { Arrow, buttonClass } from "./ui";

export function Header() {
  const pathname = usePathname();
  const { count, open } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href));

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-out-soft ${
        scrolled || menuOpen ? "bg-espresso/85 py-2 shadow-[0_1px_0_rgba(200,155,98,.15)] backdrop-blur-md" : "py-4"
      }`}
    >
      <div className="container-x flex items-center justify-between gap-6">
        <Link href="/" className="relative z-50 shrink-0" aria-label={`${siteConfig.name} — início`}>
          <Image
            src={siteConfig.logo.light}
            alt={siteConfig.name}
            width={siteConfig.logo.width}
            height={siteConfig.logo.height}
            priority
            className={`h-auto transition-all duration-500 ${scrolled ? "w-[92px]" : "w-[108px] md:w-[124px]"}`}
          />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="group relative py-2 text-sm font-medium text-cream/85 transition-colors hover:text-warm-white aria-[current=page]:text-warm-white"
                >
                  {item.label}
                  <span className="absolute inset-x-0 -bottom-0.5 mx-auto h-px w-0 bg-caramel transition-all duration-300 group-hover:w-full group-aria-[current=page]:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-50 flex items-center gap-2 sm:gap-3">
          <Link href="/cardapio" className={buttonClass("primary", "max-sm:!hidden !min-h-11")}>
            Fazer pedido
            <Arrow />
          </Link>
          <button
            type="button"
            onClick={open}
            className="relative grid size-11 place-items-center rounded-full text-cream transition-colors hover:bg-warm-white/10"
            aria-label={`Abrir carrinho${count ? `, ${count} ${count === 1 ? "item" : "itens"}` : ""}`}
          >
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute top-1 right-1 grid min-w-[18px] place-items-center rounded-full bg-caramel px-1 text-[10px] leading-[18px] font-bold text-espresso">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-full text-cream transition-colors hover:bg-warm-white/10 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>
    </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="grain fixed inset-0 z-30 flex flex-col bg-espresso px-6 pt-28 pb-10 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav aria-label="Menu móvel" className="flex-1">
              <ul className="space-y-1">
                {siteConfig.nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="flex items-baseline justify-between border-b border-warm-white/10 py-4 font-display text-4xl text-cream aria-[current=page]:text-caramel"
                    >
                      {item.label}
                      <span className="font-sans text-xs text-cream/40">0{i + 1}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <Link href="/cardapio" onClick={() => setMenuOpen(false)} className={buttonClass("primary", "w-full")}>
              Fazer pedido
              <Arrow />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
