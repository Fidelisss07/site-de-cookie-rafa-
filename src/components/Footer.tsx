import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Truck } from "lucide-react";
import { instagramUrl, siteConfig, whatsappEnabled } from "@/config/site";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { DevNote } from "./ui";

export function Footer() {
  const { contact, footer, nav, logo, name } = siteConfig;
  const ig = instagramUrl();
  const wa = whatsappEnabled() ? `https://wa.me/${contact.whatsappNumber}` : "";
  const year = new Date().getFullYear();

  const info = [
    { icon: MapPin, value: contact.address, label: "endereço" },
    { icon: Clock, value: contact.hours, label: "horário" },
    { icon: Truck, value: contact.delivery, label: "entrega" },
    { icon: Mail, value: contact.email, label: "e-mail", href: contact.email ? `mailto:${contact.email}` : "" },
  ];

  return (
    <footer className="grain relative bg-espresso pt-20 pb-8 text-cream/75">
      <div className="container-x grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr]">
        <div className="max-w-sm">
          <Image src={logo.light} alt={name} width={logo.width} height={logo.height} className="h-auto w-[140px]" />
          <p className="mt-6 text-sm leading-relaxed">{footer.tagline}</p>
          <div className="mt-6 flex items-center gap-3">
            {ig && (
              <a href={ig} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-11 place-items-center rounded-full border border-warm-white/15 transition-colors hover:border-caramel hover:text-caramel">
                <InstagramIcon className="size-5" />
              </a>
            )}
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid size-11 place-items-center rounded-full border border-warm-white/15 transition-colors hover:border-caramel hover:text-caramel">
                <WhatsAppIcon className="size-5" />
              </a>
            )}
            {!ig && !wa && <DevNote>Instagram/WhatsApp a configurar em site.ts</DevNote>}
          </div>
        </div>

        <nav aria-label="Rodapé">
          <p className="eyebrow text-soft-gold">Links</p>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-caramel">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow text-soft-gold">Atendimento</p>
          <ul className="mt-5 space-y-4 text-sm">
            {info.map(({ icon: Icon, value, label, href }) =>
              value ? (
                <li key={label} className="flex gap-3">
                  <Icon className="mt-0.5 size-4 shrink-0 text-soft-gold" strokeWidth={1.6} />
                  {href ? (
                    <a href={href} className="hover:text-caramel">
                      {value}
                    </a>
                  ) : (
                    <span>{value}</span>
                  )}
                </li>
              ) : (
                <li key={label} className="empty:hidden">
                  <DevNote>{label} a confirmar</DevNote>
                </li>
              ),
            )}
            <li>
              <Link href="/contato" className="inline-flex items-center gap-2 font-medium text-warm-white hover:text-caramel">
                Fale com a gente →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x mt-16 flex flex-col gap-3 border-t border-warm-white/10 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {name}. Todos os direitos reservados.
        </p>
        <p>Feito com carinho para quem ama cookie.</p>
      </div>
    </footer>
  );
}
