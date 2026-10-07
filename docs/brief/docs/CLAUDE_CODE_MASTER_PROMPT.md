# MASTER PROMPT — SFORNATI COOKIES

Você é responsável por construir um site premium completo para a marca **Sfornati Cookies** usando os assets deste pacote.

## Resultado esperado
Não faça um template comum de confeitaria. A experiência deve parecer uma marca boutique de cookies artesanais: quente, sofisticada, indulgente, editorial e moderna. O produto precisa dominar a tela.

## Direção visual
Use como referência principal `assets/reference/04_homepage_visual_direction.png`.

Paleta base:
- Espresso quase preto: #160D08
- Chocolate profundo: #2A140B
- Creme quente: #F6ECDD
- Caramelo: #D79A5B
- Dourado suave: #C89B62
- Branco quente: #FFF9F0

Tipografia:
- Display: serif editorial elegante (preferir Cormorant Garamond, DM Serif Display ou equivalente web-safe/importável)
- UI/corpo: sans moderna e limpa (Inter, Manrope ou equivalente)

## Stack recomendada
- Next.js atual com App Router
- TypeScript
- Tailwind CSS
- Framer Motion para microinterações
- Lucide Icons
- `next/image` para imagens

Se o projeto existente usar outra stack, preserve-a em vez de reescrever sem necessidade.

## Home
### 1. Navbar transparente
Logo à esquerda. Links: Início, Cardápio, Sobre, Avaliações, Contato. CTA principal: `Fazer pedido`.

### 2. Hero cinematográfico
Tela ampla, fundo escuro, fotografia macro de cookie/recheio. Copy principal sugerida:
`Mais que um cookie, uma experiência.`
Subcopy curta sobre receita artesanal e qualidade.
CTAs: `Fazer pedido agora` e `Ver cardápio`.
Pequenos selos abaixo: receitas exclusivas, ingredientes selecionados, feito com carinho.

### 3. Sabores
Título editorial grande. Cards horizontais/grade com fotografia dominante, nome, descrição curta, preço e botão +.
Produtos confirmados: Alpino, Chocolate Branco, Meio amargo e Ao leite, todos a R$ 14,00.

### 4. Bloco de ingredientes
Fundo chocolate escuro. Fotografia macro de cookie partido. Texto `Qualidade que você sente.` com 3 benefícios.

### 5. Por que a Sfornati
4 cards claros: sabor, ingredientes, entrega, presente. Não afirmar detalhes logísticos não confirmados; deixar textos configuráveis.

### 6. Depoimentos
Área escura editorial com cards de avaliações. Use conteúdo fictício SOMENTE como placeholder claramente marcado no código, nunca como depoimento real publicado.

### 7. CTA final
Imagem de cookie + `Pronto para se deliciar?` + CTA de pedido.

### 8. Footer
Logo, navegação, contato e redes. Dados ainda desconhecidos devem vir de `siteConfig` e exibir placeholders discretos em desenvolvimento.

## Cardápio
Criar rota `/cardapio` com hero curto, filtros por categoria preparados para expansão, cards grandes e opção de adicionar ao carrinho. Não inventar sabores além dos quatro confirmados no conteúdo inicial.

## Carrinho / pedido
Drawer lateral elegante. Quantidade, subtotal e CTA de finalizar. Deixe a integração final configurável. Se não houver número de WhatsApp confirmado, não hardcode número falso. Preparar função para gerar mensagem de pedido quando o número for inserido.

## Sobre
Rota `/sobre`, com narrativa editorial da marca e áreas preparadas para história real, processo e fundadores. Não inventar história factual.

## Contato
Rota `/contato`, com CTA para WhatsApp/Instagram configuráveis e formulário simples. Não inventar canais.

## Interações
- Entrada suave do hero
- Parallax muito sutil em fotografias
- Cards com elevação e zoom de imagem no hover
- Botões com seta animada
- Carrinho em drawer
- Transições suaves entre blocos
- Respeitar `prefers-reduced-motion`

## Mobile
Mobile não pode parecer desktop espremido. Hero deve reorganizar fotografia e copy, navbar vira menu, cards podem virar carrossel horizontal com snap, CTAs devem ser confortáveis para toque.

## Performance e qualidade
- Lighthouse forte
- Sem layout shift evitável
- Imagens otimizadas
- Sem animações pesadas
- HTML semântico
- foco visível e navegação por teclado
- contraste adequado
- metadata e OpenGraph preparados
- sitemap/robots quando aplicável

## Regra crítica de conteúdo
Não invente dados comerciais. Centralize tudo em `src/config/site.ts` (ou equivalente): WhatsApp, Instagram, endereço, entrega, horário, textos institucionais, produtos e preços. Os quatro sabores e preços fornecidos são os únicos dados de produto confirmados neste pacote.

## Critério final
O resultado precisa parecer uma marca de cookie que poderia competir visualmente com uma confeitaria premium. O usuário deve sentir textura, chocolate e desejo antes mesmo de ler o cardápio.
