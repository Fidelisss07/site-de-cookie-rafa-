# Sfornati Cookies — site

Site da **Sfornati Cookies**, construído a partir do pacote de briefing em [`docs/brief/`](docs/brief/README.md).

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Copie `.env.example` para `.env.local` e preencha quando os dados existirem.

## Onde trocar conteúdo

Tudo fica em **`src/config/site.ts`**: produtos e preços, textos, WhatsApp, Instagram, e-mail, endereço, horário, entrega, história da marca e depoimentos.

- Campo vazio = escondido em produção. Em desenvolvimento aparece um aviso tracejado `⚙` lembrando o que falta.
- **WhatsApp**: defina `NEXT_PUBLIC_WHATSAPP_NUMBER` (ex.: `5511999999999`). Só então o botão "Finalizar pelo WhatsApp" do carrinho e o formulário de contato ficam ativos; a mensagem lista itens, quantidades e subtotal (`src/lib/order.ts`).
- **Depoimentos**: os de exemplo têm `placeholder: true` e **nunca aparecem em produção**. Adicione avaliações reais sem essa flag.

## Rotas

| Rota | Conteúdo |
|---|---|
| `/` | Hero, sabores, qualidade, por que a Sfornati, avaliações, CTA final |
| `/cardapio` | Catálogo com filtro por categoria e carrinho |
| `/sobre` | Narrativa da marca + blocos para história, processo e fundadores |
| `/contato` | Canais configuráveis + formulário (envia via WhatsApp ou e-mail) |

Também: `sitemap.xml`, `robots.txt`, OpenGraph (`public/og.jpg`) e favicon.

## Assets — trocar antes de publicar

- `public/images/logo-*.png` — logo extraída de um screenshot. Substituir pela logo oficial (SVG ou PNG transparente).
- `public/images/<sabor>.jpg` e `<sabor>-wide.jpg` — recortes das fotos do catálogo do WhatsApp (sem a interface do app). Substituir por fotos originais em alta resolução, mantendo os nomes. Prompts sugeridos para novas fotos em `docs/brief/docs/IMAGE_PROMPTS.md`.
- `public/og.jpg` — imagem de compartilhamento; regenerar quando houver fotos finais.

> Observação: no pacote, os nomes `02_menu_alpino_chocolate_branco.jpeg` e `03_menu_meio_amargo_ao_leite.jpeg` estão trocados em relação ao conteúdo das imagens. Os recortes já foram feitos com o sabor correto.

## QA feito

- Build de produção sem erros; typecheck (`npm run lint`).
- Sem overflow horizontal em 390px e 1440px em todas as rotas.
- Carrinho mantém quantidades entre páginas (localStorage); valores em BRL.
- Menu mobile, drawer com foco preso, Esc para fechar, skip link, foco visível.
- `prefers-reduced-motion` desliga parallax e animações.
