import type { Metadata } from "next";
import { Clock, Mail, MapPin } from "lucide-react";
import { instagramUrl, siteConfig, whatsappEnabled } from "@/config/site";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { DevNote, Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Sfornati Cookies e faça seu pedido.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  const { contact } = siteConfig;
  const ig = instagramUrl();
  const channels = [
    whatsappEnabled() && {
      icon: WhatsAppIcon,
      title: "WhatsApp",
      text: "Faça seu pedido ou tire dúvidas.",
      href: `https://wa.me/${contact.whatsappNumber}`,
    },
    ig && { icon: InstagramIcon, title: "Instagram", text: `@${contact.instagram.replace(/^@/, "")}`, href: ig },
    contact.email && { icon: Mail, title: "E-mail", text: contact.email, href: `mailto:${contact.email}` },
  ].filter(Boolean) as { icon: React.ComponentType<{ className?: string }>; title: string; text: string; href: string }[];

  const details = [
    { icon: MapPin, value: contact.address },
    { icon: Clock, value: contact.hours },
  ].filter((d) => d.value);

  return (
    <>
      <PageHero eyebrow="Contato" title="Vamos conversar?" text="Pedidos, presentes ou dúvidas — mande uma mensagem e a gente responde." />

      <section className="bg-cream py-20 text-cocoa md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold">Canais de atendimento</h2>
            {channels.length > 0 ? (
              <ul className="mt-8 space-y-4">
                {channels.map(({ icon: Icon, title, text, href }) => (
                  <li key={title}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-5 rounded-[20px] border border-cocoa/10 bg-warm-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-caramel/50"
                    >
                      <span className="grid size-12 place-items-center rounded-full bg-cocoa text-cream transition-colors group-hover:bg-caramel group-hover:text-espresso">
                        <Icon className="size-5" />
                      </span>
                      <span>
                        <span className="block font-semibold">{title}</span>
                        <span className="text-sm text-muted-brown">{text}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 leading-relaxed text-muted-brown">
                Nossos canais de atendimento serão divulgados em breve.{" "}
                <DevNote>configure WhatsApp, Instagram e e-mail em site.ts</DevNote>
              </p>
            )}
            {details.length > 0 && (
              <ul className="mt-8 space-y-3 text-sm text-muted-brown">
                {details.map(({ icon: Icon, value }) => (
                  <li key={value} className="flex gap-3">
                    <Icon className="size-4 shrink-0 text-caramel" />
                    {value}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[24px] bg-cream-2 p-6 sm:p-10">
              <h2 className="font-display text-3xl font-semibold">Envie uma mensagem</h2>
              <p className="mt-2 mb-8 text-sm text-muted-brown">Preencha e continue a conversa pelo nosso canal oficial.</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
