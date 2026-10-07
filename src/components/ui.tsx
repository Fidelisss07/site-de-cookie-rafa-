"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { isDev } from "@/config/site";

type Variant = "primary" | "outline" | "outline-dark" | "dark";

const variants: Record<Variant, string> = {
  primary: "bg-caramel text-espresso hover:bg-caramel-2 shadow-[0_10px_30px_-12px_rgba(215,154,91,.7)]",
  outline: "border border-warm-white/35 text-warm-white hover:border-caramel hover:text-caramel",
  "outline-dark": "border border-cocoa/30 text-cocoa hover:border-cocoa hover:bg-cocoa hover:text-cream",
  dark: "bg-espresso text-cream hover:bg-cocoa",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `group inline-flex min-h-12 items-center whitespace-nowrap justify-center gap-2.5 rounded-full px-6 text-sm font-semibold tracking-wide transition-all duration-300 ease-out-soft disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${extra}`;
}

export function Arrow() {
  return <ArrowRight className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1" aria-hidden />;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  icon,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  icon?: React.ReactNode;
  external?: boolean;
}) {
  const content = (
    <>
      {icon}
      {children}
      <Arrow />
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClass(variant, className)}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {content}
    </Link>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const Comp = as === "li" ? motion.li : motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "light",
  className = "",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tone?: "light" | "dark";
  className?: string;
  as?: "h1" | "h2";
}) {
  const onDark = tone === "dark";
  return (
    <div className={className}>
      {eyebrow && <p className={`eyebrow mb-4 ${onDark ? "text-soft-gold" : "text-muted-brown"}`}>{eyebrow}</p>}
      <Tag
        className={`font-display text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.01em] text-balance sm:text-5xl lg:text-6xl ${
          onDark ? "text-warm-white" : "text-cocoa"
        }`}
      >
        {title}
      </Tag>
      {subtitle && (
        <p className={`mt-5 max-w-xl text-base leading-relaxed sm:text-lg ${onDark ? "text-cream/70" : "text-muted-brown"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/** Aviso visível apenas em desenvolvimento, para dados que faltam confirmar. */
export function DevNote({ children }: { children: React.ReactNode }) {
  if (!isDev) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-caramel/50 px-2 py-1 font-mono text-[11px] text-caramel/90">
      ⚙ {children}
    </span>
  );
}
