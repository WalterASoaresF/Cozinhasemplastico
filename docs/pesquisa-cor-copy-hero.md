# Pesquisa: cor e copy para o Hero e seções de conversão

Documento de apoio para decisões de **cor** e **copy** da landing page "Cozinha Sem Plástico". Separa claramente:
- **[ACHADO]** = evidência externa, com fonte. Não é opinião minha.
- **[SUGESTÃO]** = texto/cor que proponho a partir do achado. Usuário decide se entra na página. Nenhuma sugestão aqui viola as regras de conteúdo do CLAUDE.md (sem preço, sem saúde, sem escassez falsa, sem prova social inventada) — já filtrei isso antes de escrever.

A paleta (terracota `#AC4922`, terracota-escuro `#8A3A1C`, creme `#FBF0DC`, creme-escuro `#F1E2C6`, café `#3B2418`, oliva `#4A5240`) é decisão já tomada. Não sugiro paleta nova em nenhum ponto abaixo.

---

## 1. Psicologia de cor: terracota + creme vs. verde do nicho

### 1.1 O que a evidência diz sobre terracota/creme

- **[ACHADO]** Terracota é associada de forma consistente, em múltiplas fontes de design (Figma, Design Your Way, Kive.ai, Livarea), a calor, lar, segurança, estabilidade e "feito à mão" — a associação vem literalmente da cerâmica/argila queimada. Fontes: [Figma — Terracotta](https://www.figma.com/colors/terracotta/), [Design Your Way](https://www.designyourway.net/blog/terracotta-color/), [Kive.ai](https://kive.ai/colors/color-meanings/terracota), [Livarea — The Psychology of Earth Tones](https://www.livarea.de/en/trendblog/earth-tone-sofa).
- **[ACHADO]** Essas fontes são majoritariamente blogs de ferramentas/decoração comerciais, não pesquisa acadêmica revisada por pares — a psicologia de cor aplicada a marca é, em grande parte, convenção de design testada no mercado, não ciência dura. Tratar como "direção plausível", não como lei.
- **[ACHADO]** Não encontrei estudo comparando terracota vs. verde especificamente em branding de cozinha/alimentos. A evidência mais próxima é sobre **verde e ceticismo do consumidor**, não sobre terracota em si (ver 1.2).

### 1.2 Por que fugir do verde é uma decisão defensável

- **[ACHADO]** Um estudo publicado no *Journal of Advertising Research* (citado via phys.org) encontrou que consumidores julgaram versões "verdes"/eco de marcas mainstream como **menos eficazes** que as versões regulares do mesmo produto — o apelo visual de sustentabilidade pode gerar desconfiança em vez de confiança quando a marca não tinha esse histórico. Fonte: [phys.org — green easy mainstream brands](https://phys.org/news/2019-08-green-easy-mainstream-brands.pdf).
- **[ACHADO]** Uma reportagem da Design Week argumenta que o repertório visual "verde/folha/orgânico" do marketing sustentável remonta ao final dos anos 1990 e hoje é percebido como clichê; cita um estudo de caso em que a marca escolheu **azul** deliberadamente para evitar a "bagagem" associada ao verde. Fonte: [Design Week — "nature is weak"](https://www.designweek.co.uk/issues/15-21-november-2021/design-climate-action-sustainable-product-branding-must-not-show-nature-is-weak).
- **[ACHADO]** Um estudo da TU Delft sobre embalagens de alimentos encontrou que um selo/etiqueta de sustentabilidade tem **efeito mais forte quando colocado sobre uma embalagem "convencional"** (não com cara eco) do que sobre uma embalagem já com visual ecológico — ou seja, o conteúdo honesto (etiqueta) pesa mais que o figurino visual verde. Fonte: [TU Delft repository](https://repository.tudelft.nl/file/File_6729f382-5981-4eff-b1be-0101189e3226).
- **Conclusão da pesquisa aplicada ao projeto:** a decisão de fugir do verde/kraft (já tomada no PROJETO.md seção 2) é consistente com a literatura — fugir do clichê visual reduz o risco de ceticismo "marketing verde genérico", e a etiqueta de material (conteúdo honesto, não cor) é o que efetivamente constrói confiança, não a paleta em si. Isso confirma a estratégia atual: a cor terracota é a "assinatura de marca que não é sobre ecologia", e a etiqueta de material é a "prova que é sobre honestidade".

### 1.3 Contraste e onde concentrar o CTA

- **[ACHADO]** A fonte mais citada e com metodologia mais transparente nessa busca (CXL) conclui que o que move conversão em testes de cor de botão é o **contraste/isolamento do botão em relação ao fundo**, não a cor em si — os famosos testes "vermelho vs. verde" na verdade testaram contraste, não a cor vermelha. Fonte: [CXL — Which CTA Button Color Converts Best](https://cxl.com/blog/which-color-converts-the-best/?toc-variant-a=%2F).
- **[ACHADO]** Webflow e Shopify reforçam o mesmo ponto: cores quentes (como terracota) funcionam melhor como **cor de destaque/accent**, não como cor de fundo dominante — usadas como base, podem cansar visualmente. Fontes: [Webflow — CTA button colors](https://webflow.com/blog/cta-button-colors), [Shopify — color psychology](https://www.shopify.com/partners/blog/color-psychology).
- **[ACHADO]** Um risco concreto nomeado pelas fontes: terracota sobre creme é uma combinação de **contraste moderado**, não alto — se o botão não for perceptivelmente mais escuro/saturado que o fundo ao redor, ele pode "sumir" visualmente mesmo sendo uma cor "forte" na roda de cores.

**[SUGESTÃO]** Aplicação concreta à regra já existente no PROJETO.md ("creme ~70%, terracota ~20%, café no texto, oliva em detalhes"):
- Manter o CTA principal ("Entrar na lista" / "Quero entrar na lista") sempre em **terracota sólido sobre creme ou creme-escuro** (não terracota sobre terracota-escuro, que reduz contraste de borda) — ou, alternativamente, **creme sobre terracota-escuro** nas seções de fundo escuro (seção 5.4 "A virada"), que é o par de maior contraste da paleta.
- No hero e nos cards de kit, o botão deve ser **o único elemento terracota saturado perto do texto café/creme** — nenhum outro elemento na mesma viewport deve competir em saturação (ex.: ícones, bordas finas) para que o olho vá direto ao CTA. Isso é aplicação direta do achado de "isolamento visual" do CXL.
- Testar (via Lighthouse/contraste AA, já mencionado no PROJETO.md) a combinação exata terracota `#AC4922` sobre creme `#FBF0DC` com uma ferramenta de contraste antes de finalizar — o achado do Webflow é de que o texto *dentro* do botão (branco quebrado/creme) também precisa de contraste suficiente contra o preenchimento terracota.
- Reservar o oliva só para o selo "EM BREVE" do kit Fogão e ícones pequenos (já é a regra do projeto) — não usar oliva perto do CTA, para não dividir a atenção entre dois "centros de cor" na mesma seção.

---

## 2. Copywriting: headlines, objeção de preço, FAQ

### 2.1 Estrutura de headline para waitlist D2C mobile-first

- **[ACHADO]** Guias de landing page de waitlist convergem em: headline deve descrever a **transformação/benefício para quem compra**, não o produto ou a empresa — ex. comparação citada: "The inbox that writes replies for you" bate "The future of email" em clareza. Fonte: [dev.to — waitlist landing page guide](https://dev.to/sh20raj/how-to-build-a-waitlist-landing-page-that-actually-converts-2026-guide-4ni8).
- **[ACHADO]** Estrutura recomendada da página: headline → subheadline de uma frase → visual → prova (real) → um único campo/ação. Mobile é prioridade porque tráfego de post social é majoritariamente mobile — uma página que só funciona bem no desktop perde metade das inscrições antes do formulário carregar. Fontes: [Unicorn Platform — waitlist strategy 2026](https://unicornplatform.com/blog/waitlist-page-strategy-in-2026/), [getlaunchlist — waitlist examples](https://apizap.getlaunchlist.com/blog/waitlist-landing-page-examples-that-convert).
- Isso já é exatamente a estrutura do hero no PROJETO.md (selo → título → subtítulo → botão → linha de apoio), então a arquitetura está alinhada com a prática documentada.

**[SUGESTÃO] Variações de headline para o Hero** (além de "Uma cozinha que dura."), mantendo tom direto/caloroso/com humor e sem sermão ecológico, sem prova social falsa, sem preço:
1. **"Pote que não racha. Tampa que fecha."** — concreto, sensorial, zero abstração; nomeia a dor específica sem citar o problema do plástico ainda (guarda isso para a seção 5.3).
2. **"Essa cozinha não vai pra lixeira em 6 meses."** — mais ousada/humor seco, bate direto na frustração de pote plástico que estraga rápido; evita "saúde" porque fala de durabilidade do objeto, não do corpo.
3. **"Compra uma vez. Usa a vida toda."** — mais vendedor/direto, enfatiza o posicionamento "não competir por preço" (seção 8 do PROJETO.md) já na primeira linha, de forma afirmativa sem citar preço.

**[SUGESTÃO] Variações para o bloco "O problema" (5.3)**, no lugar/complemento de "Você conhece essa gaveta.":
1. **"Essa gaveta tem um cemitério de potes sem tampa."** — mais visual e com humor, reforça a identificação sem culpa.
2. **"Quantas vezes você já comprou o mesmo pote de plástico?"** — pergunta retórica direta, convida a reconhecer o padrão de recompra (reforça "comprar uma vez só" da seção da virada).
3. **"Toda cozinha tem uma gaveta de plástico derrotado."** — mantém o tom de humor seco e a palavra "gaveta" (ecoa o título original), com "derrotado" dando personalidade sem soar a sermão.

### 2.2 Responder objeção de preço sem mostrar preço

- **[ACHADO]** Não existe literatura específica sobre "esconder o preço" (a maioria dos guias de objeção de preço assume que o preço está visível). O achado mais transferível: a objeção deve ser respondida **no ponto de decisão**, não espalhada — ou seja, perto do CTA/formulário, não em qualquer lugar da página. Fonte: [boagworld — objection handling](https://boagworld.com/marketing/objection-handling/).
- **[ACHADO]** A tática recomendada quando o preço não pode ser mostrado é **deslocar o eixo da conversa de "quanto custa" para "o que você ganha"** — enfatizar valor e reduzir risco percebido (ex.: política de troca, "sem compromisso agora") em vez de justificar um número. Fonte: [Conversion Rate Experts — selling complex products](https://conversion-rate-experts.com/complex/).
- O PROJETO.md já faz exatamente isso na FAQ ("Ainda estamos fechando com os fornecedores...") e na seção 8 ("falar de durabilidade e 'comprar uma vez só'"). A pesquisa confirma que isso é a abordagem certa; não há achado que sugira mudança de estratégia, só reforço.

**[SUGESTÃO]** Pequeno ajuste de posicionamento: colocar uma frase curta de "reformulação de risco" **ao lado do botão do formulário** (não só na FAQ), do tipo "Sem pagar nada agora — você só garante a vez." Isso já existe como linha de apoio no hero ("Sem pagar nada agora. Avisamos no dia do lançamento.") — a sugestão é repetir essa mesma lógica de redução de risco imediatamente acima do botão de submit no formulário (5.9), não só no hero, porque é ali que a objeção de preço "aperta" de fato segundo o achado do boagworld.

### 2.3 FAQ que reduz atrito sem prova social falsa

- **[ACHADO]** A prática recomendada é construir a FAQ a partir de perguntas reais (suporte, DMs, comentários), não perguntas genéricas inventadas. Fonte: [Quicksprout — high converting FAQ](https://www.quicksprout.com/how-to-build-a-high-converting-faq-page/).
- **[ACHADO]** Risco identificado explicitamente: alguns exemplos de copy de FAQ no mercado usam estatísticas não verificadas tipo "Como 95% dos nossos clientes..." — isso é citado como **o que evitar**, exatamente o tipo de afirmação que o CLAUDE.md já proíbe (prova social inventada). Fonte: [Funnelfox FAQ docs](https://funnelfox.com/docs/elements/faq) (exemplo citado como caso a evitar).
- **[ACHADO]** Fontes também recomendam deixar uma "válvula de escape" para dúvidas fora do padrão (contato humano) em vez de forçar a FAQ a cobrir tudo. Fonte: [Webflow — FAQ pages](https://webflow.com/blog/faq-pages).
- A FAQ já escrita no PROJETO.md (5.8) segue exatamente essa lógica: perguntas reais e prováveis do público (preço, pagamento, data, plástico na peça, frete, inox, saída da lista), sem nenhuma estatística ou prova social. Nenhuma sugestão de alteração necessária aqui — está alinhada com o achado.

---

## 3. Benchmark de concorrentes: material, preço e posicionamento

- **[ACHADO]** No Magazine Luiza (proxy de e-commerce nacional, já que Shopee/Shein não retornaram resultados diretos na busca), kits de utensílios de cozinha em "bambu" variam de **R$ 19,80 a R$ 90**, com um kit de 4 potes de vidro + tampa de bambu encontrado a **R$ 61,00**. Isso confirma, com dados de mercado nacional, a faixa "R$ 12–40" já citada no PROJETO.md (que cita TikTok Shop) e mostra que mesmo em kits "maiores" (4 potes), o mercado trabalha na faixa de R$ 60 ou menos.
- **[ACHADO]** Um achado relevante para a seção de etiqueta de material (5.6): vários produtos anunciados como "bambu" no Magalu, ao conferir a descrição, **misturam materiais** — ex. garfos com "aço inox e cabo plástico imitando bambu", e kits de 12 peças costumam vir com silicone embutido sem destaque na descrição principal. Fonte: busca Magazine Luiza (ver lista de produtos no histórico da pesquisa).
- **[ACHADO]** Nos EUA, a Grove Co. (marca D2C "eco" estabelecida) vende potes de vidro com tampa de bambu e silicone a US$ 10,49, e já descreve a composição completa ("vidro borossilicato, bambu & silicone") na própria página do produto, não escondida. Fonte: [Grove Co. — glass bamboo storage jar](https://grove.co/products/glass-bamboo-storage-jar).

**O que isso confirma/ajusta no posicionamento do projeto:**
- Confirma a tese "não competir por preço" (seção 8 do PROJETO.md): o mercado de kits "sem plástico"/bambu já é uma faixa de preço baixo e brigada (R$ 20–90), e a maior parte dos concorrentes **não é transparente sobre materiais mistos** (plástico disfarçado de bambu, silicone não destacado). Isso é uma lacuna real de confiança que a etiqueta de material ataca diretamente — o achado da TU Delft (seção 1.2) sobre selo de sustentabilidade ter mais efeito em embalagem "convencional" reforça que a honestidade material é o diferencial mais defensável, não o preço nem a estética eco.
- **[SUGESTÃO]** Dado que concorrentes "escondem" silicone/plástico em descrições, a seção 5.6 (etiqueta de material) pode ganhar uma frase extra de contraste direto com o mercado, sem citar concorrentes nomeados (e sem comparação depreciativa, que fugiria do tom "caloroso"): algo como *"Se tiver silicone, a etiqueta mostra. Não escondemos atrás da palavra 'bambu'."* — é uma forma de usar o achado de benchmark sem virar ataque a concorrente específico.

---

## Resumo rápido para decisão

1. **Cor:** a paleta terracota/creme já é defensável pela psicologia de cor de design (calor, lar, estabilidade) e, mais importante, pela literatura sobre ceticismo do consumidor com marketing "verde" — fugir do clichê do nicho é estrategicamente correto, não só estético. O ponto de atenção real é **contraste e isolamento do CTA**, não a escolha da cor em si: o botão terracota precisa ser o único elemento saturado na viewport e deve ser testado contra AA.
2. **Copy do Hero/Problema:** a estrutura atual (selo → título → subtítulo → botão → linha de apoio) já segue a prática documentada para waitlists mobile-first. Dei 3 variações de headline para o Hero e 3 para "O problema", todas sem violar as regras de conteúdo.
3. **Objeção de preço e FAQ:** a abordagem do PROJETO.md já está alinhada com a literatura (responder no ponto de decisão, deslocar de preço para valor, sem prova social falsa). Sugiro só reforçar a frase de "sem compromisso" perto do botão do formulário, não só no hero.
4. **Benchmark:** confirma a faixa de preço baixa do nicho (R$ 20–90 no Brasil, não só TikTok Shop) e revela que concorrentes frequentemente escondem materiais sintéticos sob o rótulo "bambu" — isso fortalece o argumento para a etiqueta de material como diferencial central da marca.
