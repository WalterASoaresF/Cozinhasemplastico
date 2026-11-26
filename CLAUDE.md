# CLAUDE.md: Landing page "Cozinha Sem Plástico"

Leia `docs/PROJETO.md` antes de qualquer tarefa. Ele tem o contexto, a marca, os textos e as regras. Este arquivo é o resumo operacional.

## O que estamos construindo
Uma landing page de lista de espera para a loja **Cozinha Sem Plástico**: utensílios de cozinha sem plástico, em 3 kits (Despensa, Fogão e Pia). O objetivo único da página é **capturar leads** (nome + WhatsApp ou e-mail + kit de interesse) para avisar no lançamento. **Não há venda, preço nem pagamento nesta fase.**

Primeiro uso: mostrar aos sócios. Depois: receber tráfego do TikTok e do Instagram, quase todo pelo celular.

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS.
- GSAP + ScrollTrigger para a animação guiada pela rolagem. Lenis para rolagem suave.
- Framer Motion só para microinterações (botões, cards, acordeão), se for mais simples que o GSAP.
- Fontes do Google via `next/font`: **Fraunces** (títulos) e **Instrument Sans** (texto).
- Formulário: rota `app/api/lead/route.ts` gravando no Supabase (tabela `leads`). Sem chave pública exposta: grave pelo servidor.
- Deploy: Vercel.

## Comandos
- `npm run dev`: servidor local
- `npm run build && npm run start`: checar o build
- `npm run lint`: lint

## Regras de design
- Mobile first. Desenhe para 390px de largura e depois expanda.
- Use só os tokens de cor e fonte de `docs/PROJETO.md` (seção Marca). Não invente cores.
- Visual: quente, de delicatessen e cozinha de família, com letras grossas e curvas. **Nada de** verde, folhas, planeta, setas de reciclagem, gradientes neon, glassmorphism ou "cara de template de SaaS".
- Cantos arredondados generosos, como rótulo de conserva. Bordas finas em terracota escuro.
- Imagens em `public/img/`. Enquanto não existirem, use um placeholder com o nome do arquivo e o prompt correspondente de `docs/PROJETO.md`.

## Regras de motion
- A animação conta uma história: a cozinha se arruma e o plástico sai. Toda animação tem um propósito.
- Respeite `prefers-reduced-motion`: troque tudo por estados estáticos ou fade simples.
- Anime só `transform` e `opacity`. Nada de animar `width`, `top` ou `filter` pesado.
- O hero precisa estar legível e com o botão visível **antes** de qualquer animação carregar (LCP < 2,5 s no 4G).
- Teste a rolagem num celular Android médio. Se travar, simplifique.

## Regras de conteúdo (não negociáveis)
- **Sem preço** em nenhum lugar. Use "preço será anunciado no lançamento".
- **Sem promessas de saúde**: não use "sem toxinas", "desintoxique", "cancerígeno" nem nada que exija prova médica.
- Só afirmações de material que serão comprovadas pelo fornecedor. Itens com silicone (vedação) ou cabo de resina devem ser informados.
- **Sem escassez falsa**: nada de contador regressivo inventado, "restam 3 vagas" ou números de lista que não sejam reais.
- **Sem depoimentos inventados, selos de certificação ou logos de imprensa.**
- Imagens geradas por IA levam a legenda discreta "imagem ilustrativa".
- Formulário com consentimento LGPD explícito (checkbox desmarcado) e link para a política de privacidade.

## Estrutura de pastas
```
app/
  page.tsx            # monta as seções
  api/lead/route.ts   # grava o lead
  privacidade/page.tsx
components/
  sections/           # Hero, Problema, Kits, ComoFunciona, FAQ, Lista, Rodape
  ui/                 # Botao, EtiquetaMaterial, Campo, Acordeao
lib/
  motion.ts           # registro do GSAP/ScrollTrigger e helpers
  tokens.ts           # cores e fontes
public/img/
docs/PROJETO.md
```

## Como trabalhar
- Construa seção por seção, na ordem de `docs/PROJETO.md`. Mostre cada uma antes de seguir.
- Textos: use exatamente os de `docs/PROJETO.md`. Se precisar de texto novo, siga o tom descrito lá e marque com `{/* TEXTO PROVISÓRIO */}`.
- Não adicione bibliotecas além das listadas sem perguntar.
- Pixel do Meta e do TikTok: **só depois** do banner de consentimento. Deixe preparado, mas desligado.
