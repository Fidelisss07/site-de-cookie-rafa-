"use client";

import { useState } from "react";
import { siteConfig, whatsappEnabled } from "@/config/site";
import { WhatsAppIcon } from "./icons";
import { Arrow, buttonClass, DevNote } from "./ui";

const field =
  "w-full rounded-2xl border border-cocoa/15 bg-warm-white px-4 py-3.5 text-cocoa placeholder:text-muted-brown/60 transition-colors focus:border-caramel focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-caramel/30";

export function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const wa = whatsappEnabled();
  const email = siteConfig.contact.email;
  const enabled = wa || !!email;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = `Olá, ${siteConfig.shortName}! Meu nome é ${name.trim()}.\n\n${message.trim()}`;
    if (wa) {
      window.open(`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    } else if (email) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent("Contato pelo site")}&body=${encodeURIComponent(text)}`;
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-cocoa">
          Seu nome
        </label>
        <input id="name" name="name" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="Como podemos te chamar?" />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-cocoa">
          Mensagem
        </label>
        <textarea id="message" name="message" required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className={`${field} resize-none`} placeholder="Conte o que você precisa: pedido, presente, dúvida…" />
      </div>
      <button type="submit" disabled={!enabled} className={buttonClass("dark", "w-full sm:w-auto")}>
        {wa && <WhatsAppIcon className="size-4" />}
        {wa ? "Enviar pelo WhatsApp" : "Enviar mensagem"}
        <Arrow />
      </button>
      {!enabled && (
        <p className="text-sm text-muted-brown">
          Canal de envio em configuração. <DevNote>defina WhatsApp ou e-mail em site.ts</DevNote>
        </p>
      )}
    </form>
  );
}
