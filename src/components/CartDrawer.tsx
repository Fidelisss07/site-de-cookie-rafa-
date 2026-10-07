"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { whatsappEnabled } from "@/config/site";
import { useCart } from "@/context/cart";
import { formatBRL } from "@/lib/format";
import { buildOrderMessage, whatsappLink } from "@/lib/order";
import { WhatsAppIcon } from "./icons";
import { Arrow, buttonClass, DevNote } from "./ui";

export function CartDrawer() {
  const { items, subtotal, count, isOpen, close, setQuantity, remove } = useCart();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [isOpen, close]);

  const link = whatsappLink(
    buildOrderMessage(items.map((i) => ({ name: i.product.name, quantity: i.quantity, price: i.product.price }))),
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-espresso/70 backdrop-blur-sm"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-cream text-cocoa shadow-2xl"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-cocoa/10 px-6 py-5">
              <div>
                <p className="eyebrow text-[10px] text-muted-brown">Seu pedido</p>
                <h2 id="cart-title" className="font-display text-3xl font-semibold">
                  Carrinho {count > 0 && <span className="text-xl text-muted-brown">({count})</span>}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="grid size-11 place-items-center rounded-full transition-colors hover:bg-cocoa/10"
                aria-label="Fechar carrinho"
              >
                <X className="size-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <span className="grid size-20 place-items-center rounded-full bg-cream-2 text-cocoa">
                  <ShoppingBag className="size-8" strokeWidth={1.4} />
                </span>
                <p className="font-display text-2xl">Seu carrinho está vazio.</p>
                <p className="text-sm text-muted-brown">Escolha seus sabores favoritos para começar.</p>
                <Link href="/cardapio" onClick={close} className={buttonClass("dark")}>
                  Ver cardápio
                  <Arrow />
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-cocoa/10 overflow-y-auto px-6">
                  {items.map(({ product, quantity }) => (
                    <li key={product.id} className="flex gap-4 py-5">
                      <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl">
                        <Image src={product.image} alt="" fill sizes="80px" className="photo-warm scale-110 object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-display text-xl leading-tight font-semibold">{product.name}</h3>
                          <button
                            type="button"
                            onClick={() => remove(product.id)}
                            className="grid size-8 place-items-center rounded-full text-muted-brown transition-colors hover:bg-cocoa/10 hover:text-cocoa"
                            aria-label={`Remover ${product.name}`}
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                        <p className="text-sm text-muted-brown">{formatBRL(product.price)} cada</p>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center rounded-full border border-cocoa/15" role="group" aria-label={`Quantidade de ${product.name}`}>
                            <button
                              type="button"
                              onClick={() => setQuantity(product.id, quantity - 1)}
                              className="grid size-10 place-items-center rounded-full hover:bg-cocoa/10"
                              aria-label="Diminuir"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="w-7 text-center text-sm font-semibold tabular-nums" aria-live="polite">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQuantity(product.id, quantity + 1)}
                              className="grid size-10 place-items-center rounded-full hover:bg-cocoa/10"
                              aria-label="Aumentar"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <p className="font-semibold tabular-nums">{formatBRL(product.price * quantity)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-cocoa/10 bg-warm-white px-6 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-muted-brown">Subtotal</span>
                    <span className="font-display text-3xl font-semibold tabular-nums">{formatBRL(subtotal)}</span>
                  </div>
                  {link ? (
                    <a href={link} target="_blank" rel="noopener noreferrer" className={buttonClass("dark", "mt-5 w-full")}>
                      <WhatsAppIcon className="size-4" />
                      Finalizar pelo WhatsApp
                      <Arrow />
                    </a>
                  ) : (
                    <>
                      <button type="button" disabled className={buttonClass("dark", "mt-5 w-full")}>
                        Finalizar pedido
                      </button>
                      <p className="mt-3 text-center text-xs text-muted-brown">
                        Finalização online em breve.{" "}
                        <Link href="/contato" onClick={close} className="underline underline-offset-2 hover:text-cocoa">
                          Fale com a gente
                        </Link>
                        .
                      </p>
                      {!whatsappEnabled() && (
                        <div className="mt-2 text-center">
                          <DevNote>defina NEXT_PUBLIC_WHATSAPP_NUMBER para ativar</DevNote>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
