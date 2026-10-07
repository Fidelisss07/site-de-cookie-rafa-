import { siteConfig, whatsappEnabled } from "@/config/site";
import { formatBRL } from "./format";

export type OrderLine = { name: string; quantity: number; price: number };

export function buildOrderMessage(lines: OrderLine[], note?: string) {
  const subtotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  const items = lines.map((l) => `• ${l.quantity}x ${l.name} — ${formatBRL(l.price * l.quantity)}`);
  return [
    `Olá, ${siteConfig.shortName}! Gostaria de fazer um pedido:`,
    "",
    ...items,
    "",
    `Subtotal: ${formatBRL(subtotal)}`,
    ...(note ? ["", note] : []),
  ].join("\n");
}

/** Link wa.me pronto, ou null enquanto o número real não estiver configurado. */
export function whatsappLink(message: string) {
  if (!whatsappEnabled()) return null;
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
