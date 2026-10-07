"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { ProductCard } from "./ProductCard";
import { Reveal } from "./ui";

export function ProductGrid() {
  const { products, categories } = siteConfig;
  const [active, setActive] = useState("todos");
  const filters = [{ id: "todos", label: "Todos" }, ...categories];
  const list = active === "todos" ? products : products.filter((p) => p.category === active);

  return (
    <div>
      <div role="tablist" aria-label="Filtrar por categoria" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
        {filters.map((f) => {
          const count = f.id === "todos" ? products.length : products.filter((p) => p.category === f.id).length;
          const selected = active === f.id;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(f.id)}
              className={`min-h-11 shrink-0 rounded-full border px-5 text-sm font-medium transition-all duration-300 ${
                selected ? "border-cocoa bg-cocoa text-cream" : "border-cocoa/20 text-cocoa hover:border-cocoa/50"
              }`}
            >
              {f.label} <span className={selected ? "text-cream/60" : "text-muted-brown"}>({count})</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:gap-7">
        {list.map((product, i) => (
          <Reveal as="li" key={product.id} delay={(i % 2) * 0.08}>
            <ProductCard product={product} size="lg" priority={i < 2} />
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
