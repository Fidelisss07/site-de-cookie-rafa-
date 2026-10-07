/**
 * Configuração central da Sfornati Cookies.
 *
 * REGRA: nada de dado comercial inventado. Tudo que ainda não foi confirmado
 * pela marca fica vazio ("") ou marcado com `placeholder: true`. Componentes
 * escondem automaticamente o que estiver vazio em produção e mostram um aviso
 * discreto em desenvolvimento.
 *
 * Confirmado até agora (catálogo do WhatsApp da marca):
 *   Alpino, Chocolate Branco, Meio amargo e Ao leite — R$ 14,00 cada.
 */

export type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  image: string;
  /** Foto horizontal (opcional), usada em blocos editoriais. */
  imageWide?: string;
  category?: string;
  available?: boolean;
};

export type Testimonial = {
  quote: string;
  author: string;
  rating?: number;
  /** true = texto fictício de layout. Nunca é exibido em produção. */
  placeholder?: boolean;
};

export const isDev = process.env.NODE_ENV !== "production";

export const siteConfig = {
  name: "Sfornati Cookies",
  shortName: "Sfornati",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "pt_BR",
  currency: "BRL",

  seo: {
    title: "Sfornati Cookies | Cookies Artesanais",
    description: "Conheça os sabores da Sfornati Cookies e faça seu pedido.",
    ogImage: "/og.jpg",
  },

  logo: {
    // Extraída de screenshot. Substituir pela logo oficial (SVG/PNG) antes de produção.
    light: "/images/logo-light.png",
    dark: "/images/logo-dark.png",
    width: 600,
    height: 388,
  },

  /* ------------------------------------------------------------------ */
  /* Contato e canais — PREENCHER com dados reais confirmados pela marca */
  /* ------------------------------------------------------------------ */
  contact: {
    /** DDI + DDD + número, só dígitos. Ex.: "5511999999999". */
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
    /** Usuário sem @. Ex.: "sfornaticookies". */
    instagram: "",
    email: "",
    address: "",
    /** Ex.: "Ter a Sáb, 10h às 19h". */
    hours: "",
    /** Ex.: "Entregamos em bairros X e Y" — só quando confirmado. */
    delivery: "",
  },

  nav: [
    { label: "Início", href: "/" },
    { label: "Cardápio", href: "/cardapio" },
    { label: "Sobre", href: "/sobre" },
    { label: "Avaliações", href: "/#avaliacoes" },
    { label: "Contato", href: "/contato" },
  ],

  categories: [{ id: "classicos", label: "Clássicos" }],

  /* --------------------------- Produtos ---------------------------- */
  // Nomes e preços confirmados. Descrições são curtas e apenas repetem o
  // sabor — ajustar quando a marca enviar a descrição oficial.
  // Fotos: recortes do catálogo do WhatsApp; trocar pelos originais em alta.
  products: [
    {
      id: "alpino",
      name: "Alpino",
      price: 14,
      description: "Cookie artesanal sabor Alpino.",
      image: "/images/alpino.jpg",
      imageWide: "/images/alpino-wide.jpg",
      category: "classicos",
      available: true,
    },
    {
      id: "chocolate-branco",
      name: "Chocolate Branco",
      price: 14,
      description: "Cookie artesanal com chocolate branco.",
      image: "/images/chocolate-branco.jpg",
      imageWide: "/images/chocolate-branco-wide.jpg",
      category: "classicos",
      available: true,
    },
    {
      id: "meio-amargo",
      name: "Meio amargo",
      price: 14,
      description: "Cookie artesanal com chocolate meio amargo.",
      image: "/images/meio-amargo.jpg",
      imageWide: "/images/meio-amargo-wide.jpg",
      category: "classicos",
      available: true,
    },
    {
      id: "ao-leite",
      name: "Ao leite",
      price: 14,
      description: "Cookie artesanal com chocolate ao leite.",
      image: "/images/ao-leite.jpg",
      imageWide: "/images/ao-leite-wide.jpg",
      category: "classicos",
      available: true,
    },
  ] satisfies Product[] as Product[],

  /* ------------------------ Textos da home ------------------------- */
  hero: {
    eyebrow: "Cookies artesanais",
    titleStart: "Mais que um cookie,",
    titleAccent: "uma experiência.",
    subtitle:
      "Cookies artesanais preparados para transformar uma pausa simples em um momento especial.",
    badges: ["Receitas exclusivas", "Ingredientes selecionados", "Feito com carinho"],
  },

  flavorsSection: {
    eyebrow: "Nossos sabores",
    title: "Cookies que derretem no primeiro toque.",
    subtitle: "Cada sabor é pensado para entregar uma experiência única. Qual vai ser o seu favorito hoje?",
  },

  quality: {
    eyebrow: "Ingredientes que fazem a diferença",
    title: "Qualidade que você sente.",
    text: "Ingredientes selecionados e receita artesanal para um cookie macio por dentro e cheio de sabor em cada mordida.",
    points: ["Chocolate em cada mordida", "Ingredientes selecionados", "Receita artesanal"],
  },

  benefits: {
    eyebrow: "Por que a Sfornati?",
    title: "Detalhes que fazem toda a diferença.",
    items: [
      {
        icon: "heart",
        title: "Sabor inesquecível",
        text: "Receitas pensadas para quem realmente ama cookie.",
      },
      {
        icon: "leaf",
        title: "Ingredientes de qualidade",
        text: "Ingredientes selecionados com cuidado em cada fornada.",
      },
      {
        icon: "truck",
        title: "Pedido sem complicação",
        // Não afirmar prazo/área de entrega até a marca confirmar.
        text: "Escolha seus sabores e combine o recebimento direto com a gente.",
      },
      {
        icon: "gift",
        title: "Perfeito para presentear",
        text: "Surpreenda alguém especial com um mimo delicioso.",
      },
    ],
  },

  testimonialsSection: {
    eyebrow: "O que nossos clientes dizem",
    title: "Quem prova, sempre volta.",
    emptyText: "Em breve, as avaliações de quem já provou. Experimente e conte para a gente o que achou.",
  },

  // Depoimentos REAIS entram aqui sem `placeholder`. Os de exemplo abaixo
  // existem só para visualizar o layout e NUNCA aparecem em produção.
  testimonials: [
    { quote: "Exemplo de depoimento — substituir por avaliação real de cliente.", author: "Cliente A", rating: 5, placeholder: true },
    { quote: "Exemplo de depoimento — substituir por avaliação real de cliente.", author: "Cliente B", rating: 5, placeholder: true },
    { quote: "Exemplo de depoimento — substituir por avaliação real de cliente.", author: "Cliente C", rating: 5, placeholder: true },
  ] as Testimonial[],

  finalCta: {
    title: "Pronto para se deliciar?",
    text: "Escolha seus sabores favoritos e faça seu pedido.",
  },

  about: {
    eyebrow: "Sobre a Sfornati",
    title: "Feito no forno, servido com carinho.",
    intro:
      "Em italiano, “sfornati” quer dizer “recém-saídos do forno”. Cookies artesanais pensados para aquele momento em que tudo para — e só existe o próximo pedaço.",
    // Preencher com a história real. Blocos vazios não aparecem em produção.
    story: "",
    process: "",
    founders: "",
  },

  footer: {
    tagline: "Cookies artesanais feitos para transformar o seu dia em um momento mais doce.",
  },
};

export type SiteConfig = typeof siteConfig;

export const visibleTestimonials = siteConfig.testimonials.filter((t) => isDev || !t.placeholder);

export function whatsappEnabled() {
  return /^\d{10,15}$/.test(siteConfig.contact.whatsappNumber);
}

export function instagramUrl() {
  const handle = siteConfig.contact.instagram.replace(/^@/, "");
  return handle ? `https://instagram.com/${handle}` : "";
}
