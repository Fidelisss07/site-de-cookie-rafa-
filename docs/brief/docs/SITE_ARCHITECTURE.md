# Arquitetura do site

## Rotas
- `/` — Home
- `/cardapio` — catálogo
- `/sobre` — marca/processo
- `/contato` — contato e pedido

## Componentes
- Header / MobileMenu
- Hero
- ProductCard
- ProductGrid
- ProductQuickView (opcional)
- CartDrawer
- BenefitsGrid
- StorySection
- Testimonials
- OrderCTA
- Footer

## Modelo de produto
```ts
export type Product = {
  id: string
  name: string
  price: number
  description?: string
  image: string
  category?: string
  available?: boolean
}
```

## Dados iniciais
```ts
[
  { id: 'alpino', name: 'Alpino', price: 14 },
  { id: 'chocolate-branco', name: 'Chocolate Branco', price: 14 },
  { id: 'meio-amargo', name: 'Meio amargo', price: 14 },
  { id: 'ao-leite', name: 'Ao leite', price: 14 }
]
```

## Pedido via WhatsApp
Preparar a arquitetura, mas usar `WHATSAPP_NUMBER` configurável. A mensagem deve listar itens, quantidades e subtotal. Não inserir número fictício.

## CMS futuro
Estruture os dados para migração simples para Sanity/Strapi/Supabase ou painel próprio, mas não adicione complexidade agora sem necessidade.
