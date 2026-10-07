"use client";

import Image from "next/image";
import { Check, Plus } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/config/site";
import { useCart } from "@/context/cart";
import { formatBRL } from "@/lib/format";

export function ProductCard({ product, size = "md", priority }: { product: Product; size?: "md" | "lg"; priority?: boolean }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const available = product.available !== false;
  const large = size === "lg";

  function handleAdd() {
    add(product.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[20px] bg-cocoa ring-1 ring-soft-gold/15 transition-all duration-500 ease-out-soft hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-25px_rgba(22,13,8,.75)] hover:ring-soft-gold/40">
      <div className={`relative overflow-hidden ${large ? "aspect-[4/3.6]" : "aspect-square"}`}>
        <Image
          src={product.image}
          alt={`Cookie ${product.name}${product.description ? ` — ${product.description}` : ""}`}
          fill
          priority={priority}
          sizes={large ? "(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 90vw" : "(min-width: 1024px) 300px, (min-width: 640px) 45vw, 78vw"}
          className="photo-warm object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.08]"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-cocoa to-transparent" />
        {!available && (
          <span className="absolute top-4 left-4 rounded-full bg-espresso/85 px-3 py-1 text-xs font-semibold text-cream">Esgotado</span>
        )}
      </div>

      <div className={`flex flex-1 flex-col ${large ? "p-6 sm:p-7" : "p-5"}`}>
        <h3 className={`font-display font-semibold text-warm-white ${large ? "text-3xl sm:text-4xl" : "text-[1.7rem] leading-tight"}`}>
          {product.name}
        </h3>
        {product.description && (
          <p className={`mt-1.5 leading-relaxed text-cream/60 ${large ? "text-base" : "text-sm"}`}>{product.description}</p>
        )}
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <p className={`font-semibold text-warm-white tabular-nums ${large ? "text-2xl" : "text-xl"}`}>
            {formatBRL(product.price)}
          </p>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!available}
            aria-label={`Adicionar ${product.name} ao carrinho`}
            className={`grid shrink-0 place-items-center rounded-full bg-caramel text-espresso transition-all duration-300 ease-out-soft hover:scale-110 hover:bg-caramel-2 active:scale-95 disabled:opacity-40 ${
              large ? "size-12" : "size-11"
            }`}
          >
            {added ? <Check className="size-5" /> : <Plus className="size-5" />}
          </button>
        </div>
      </div>
    </article>
  );
}
