"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { siteConfig, type Product } from "@/config/site";

type CartState = Record<string, number>;

type CartContextValue = {
  items: { product: Product; quantity: number }[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (id: string, qty?: number) => void;
  setQuantity: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "sfornati-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>({});
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state, hydrated]);

  const setQuantity = useCallback((id: string, qty: number) => {
    setState((s) => {
      const next = { ...s };
      if (qty <= 0) delete next[id];
      else next[id] = Math.min(qty, 99);
      return next;
    });
  }, []);

  const add = useCallback((id: string, qty = 1) => {
    setState((s) => ({ ...s, [id]: Math.min((s[id] ?? 0) + qty, 99) }));
    setIsOpen(true);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const items = siteConfig.products
      .filter((p) => state[p.id])
      .map((product) => ({ product, quantity: state[product.id] }));
    return {
      items,
      count: items.reduce((n, i) => n + i.quantity, 0),
      subtotal: items.reduce((n, i) => n + i.quantity * i.product.price, 0),
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      setQuantity,
      remove: (id) => setQuantity(id, 0),
      clear: () => setState({}),
    };
  }, [state, isOpen, add, setQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de <CartProvider>");
  return ctx;
}
