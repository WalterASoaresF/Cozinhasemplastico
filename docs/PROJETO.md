# Cozinha Sem Plástico: documentação da landing page

Documento de contexto para construir a landing page. Contém o projeto, a marca, os textos, a estrutura, o motion, as imagens e as regras.

---

## 1. O projeto

**O que é:** uma loja online de utensílios de cozinha sem plástico, vendidos em 3 kits.

**Quem somos:** três sócios universitários em Salvador (BA), todos com até 22 anos:
- **Walter:** engenharia de software. Cuida das redes sociais e da landing page.
- **Rios:** direito. Cuida da parte legal, da marca (INPI) e da formalização.
- **Félix:** medicina. Cuida dos fornecedores, da referência de preços e de parte dos vídeos.

**Modelo de teste (6 semanas, de ~30/11/2026 a ~10/01/2027):**
1. Vídeos diários ou em dias alternados no TikTok e no Instagram, com um pouco de anúncio pago.
2. A landing page captura uma **lista de espera**. Ninguém paga nada nesta fase.
3. Se batermos a meta de leads, fechamos com o fornecedor e fazemos um **lançamento com um primeiro lote limitado**. Aí, sim, os inscritos recebem o aviso e podem comprar.
4. Se não batermos, ajustamos ou paramos sem ter gasto com estoque.

**Objetivo da página:** transformar visitas vindas dos vídeos em inscrições na lista. Uma única ação: **entrar na lista**.

**Primeiro uso:** apresentar a ideia aos sócios e animá-los. Por isso a página precisa estar bonita e "viva" desde a primeira versão, mesmo com imagens provisórias.

---

## 2. O que o estudo de mercado mostrou (aplicado à página)

Resumo do relatório de pesquisa do nicho e das decisões que tomamos a partir dele:

- **O preço é a maior barreira.** No TikTok Shop, kits de potes custam entre R$ 12 e R$ 40, uma guerra de preço por baixo. **Não vamos competir por preço.** A página precisa vender durabilidade, beleza e "comprar uma vez só".
- **O visual "natural/rústico/verde" está saturado.** Kraft, folhinha e verde são o padrão do nicho. Nós somos **quentes, de cozinha de família, com letra grossa e cor de terracota**.
- **O inox gera dúvida ("gruda").** O kit Fogão precisa de demonstração de uso honesta e de uma dica de uso. Por isso ele aparece como "em breve" na fase de teste.
- **Desconfiança com marketing verde.** As pessoas estão cansadas de promessas vagas. Nossa resposta: a **etiqueta de material** (a lista honesta de cada material de cada peça).

---

## 3. Marca

### Nome e frase
- **Nome:** Cozinha Sem Plástico
- **Frase-assinatura (provisória, confirmar com os sócios):** "Tudo passa. O plástico, não."
- **Frase alternativa para o hero:** "Uma cozinha que dura."

### Logo
- Palavra "cozinha" em serifa gorda e curvilínea (retrô, anos 70), com "SEM PLÁSTICO" em versaletes espaçados embaixo.
- Uma **colher de pau desenhada à mão**, em traço de pincel, apoiada sobre o "z".
- Arquivos (gerados pelo ChatGPT, ainda em PNG):
  - `public/img/logo-creme.png`: terracota sobre creme (versão principal)
  - `public/img/logo-terracota.png`: creme sobre terracota (versão invertida)
  - `public/img/simbolo-colher.png`: só a colher (avatar, favicon, separador)
- **Pendente:** vetorizar em SVG (Vectorizer.ai ou similar) e remover o fundo. Enquanto isso, use os PNGs.
- No código, **não redesenhe o logo**. Use o arquivo.

### Paleta (tirada do logo)
| Token | Hex | Uso |
|---|---|---|
| `terracota` | `#AC4922` | Cor da marca. Títulos, logo, botão principal. |
| `terracota-escuro` | `#8A3A1C` | Fundos de seção escura, hover do botão, bordas. |
| `creme` | `#FBF0DC` | Fundo principal da página. |
| `creme-escuro` | `#F1E2C6` | Cards, faixas alternadas, campos do formulário. |
| `cafe` | `#3B2418` | Texto corrido. Mais quente e suave que o preto. |
| `oliva` | `#4A5240` | Detalhe secundário, com moderação (selos, ícones pequenos). |

Regras:
- Fundo creme em ~70% da página, terracota em ~20%, café no texto e oliva em pequenos detalhes.
- Texto corrido sempre café sobre creme, ou creme sobre terracota-escuro. Confira o contraste (mínimo AA).
- Nada de branco puro nem de preto puro.

### Tipografia
- **Títulos:** Fraunces (Google Fonts), peso 800 a 900, eixo `SOFT` alto e `WONK` ligado, para ficar próximo das curvas do logo. Tamanhos grandes, entrelinha apertada (0,95 a 1,05).
- **Texto e interface:** Instrument Sans, pesos 400 a 600.
- **Etiqueta de material:** Instrument Sans em caixa alta, 11 a 12 px, espaçamento de letra largo (0,12em).

### Tom de voz
- Direto, caloroso e com uma pitada de humor. Como um amigo que cozinha bem e não tem paciência para pote rachado.
- Frases curtas. Nada de culpa, de alarmismo ou de sermão ecológico.
- **Mostramos material e durabilidade. Não prometemos saúde.**
- Sim: "Vidro que vai do armário à mesa." "Uma colher de pau dura anos."
- Não: "Livre-se das toxinas." "Proteja sua família do câncer."

### Elemento-assinatura: a etiqueta de material
Uma pequena etiqueta com a lista honesta dos materiais de cada item, como um rótulo de conserva:

```
POTE 500 ML
VIDRO · TAMPA DE BAMBU · VEDAÇÃO DE SILICONE
```

Use em todos os cards de produto. Quando há silicone ou outro material sintético, **ele aparece na etiqueta**. É isso que nos dá credibilidade.

---

## 4. Os 3 kits

> Preços não definidos. Nenhum preço aparece na página.

### Kit Despensa (testar primeiro)
- 4 potes de vidro com tampa de bambu + 1 colher de pau.
- Etiqueta: `VIDRO · BAMBU · MADEIRA · VEDAÇÃO DE SILICONE`
- Frase: "Do armário à mesa, sem trocar de pote."

### Kit Pia (testar primeiro)
- Bucha vegetal + escova de madeira ou bambu + panos de linho + sabão em barra.
- Etiqueta: `FIBRA VEGETAL · MADEIRA · LINHO · SABÃO EM BARRA`
- Frase: "Lavar a louça sem deixar plástico no ralo."

### Kit Fogão (em breve)
- Frigideira de aço inox + caçarola pequena (material a confirmar).
- Etiqueta: `AÇO INOX · CAÇAROLA: MATERIAL A CONFIRMAR`
- Frase: "Inox não gruda quando você aprende o truque. A gente ensina."
- Aparece com o selo "em breve". Os interessados podem marcar esse kit no formulário.
- Observação: cabo ou tampa de resina/baquelite contam como plástico. Só anunciar "sem plástico" depois da confirmação do fornecedor.

---

## 5. Estrutura da página e textos

Ordem das seções. Cada uma tem um objetivo e um texto pronto.

### 5.1 Barra superior (fixa, aparece ao rolar)
- Logo pequeno à esquerda. Botão "Entrar na lista" à direita.
- Transparente no topo, fundo creme com sombra suave depois de 80 px de rolagem.

### 5.2 Hero: "a cozinha se arruma"
**Objetivo:** encantar em 3 segundos e já mostrar o botão.

Texto:
- Selo pequeno: `LISTA DE ESPERA ABERTA`
- Título: **"Uma cozinha que dura."**
- Subtítulo: "Potes de vidro, madeira, inox e linho. Kits bonitos para trocar o plástico da sua cozinha, de uma vez."
- Botão: **"Quero entrar na lista"** (rola até o formulário)
- Linha de apoio: "Sem pagar nada agora. Avisamos no dia do lançamento."

Motion (descrito na seção 6.1).

### 5.3 O problema (curto, sem sermão)
**Objetivo:** criar identificação com humor.

- Título: **"Você conhece essa gaveta."**
- Texto: "A tampa que não fecha. O pote manchado de molho. A espátula derretida na borda. Plástico de cozinha não foi feito para durar, e você vive comprando de novo."
- Três "cartões de plástico" que **amassam, mancham e somem** ao rolar (ver motion 6.2):
  - "Pote manchado de molho"
  - "Tampa que não fecha"
  - "Espátula com a borda derretida"

### 5.4 A virada
- Título grande, centralizado, sobre fundo terracota-escuro: **"Tudo passa. O plástico, não."**
- Texto menor: "Então a gente tirou ele da cozinha. Vidro, madeira, inox e linho: materiais que duram anos, ficam bonitos na bancada e não deixam pedaço no ralo."

### 5.5 Os kits
**Objetivo:** mostrar o que vem e qual kit cada pessoa quer.

- Título: **"Três kits. Uma cozinha inteira."**
- 3 cards (Despensa, Pia e Fogão), cada um com: imagem, nome, lista de itens, etiqueta de material, frase e um botão "Quero esse kit", que rola até o formulário com o kit já marcado.
- Selo no Fogão: `EM BREVE`.
- Nota pequena embaixo: "Preços anunciados no lançamento. Imagens ilustrativas."

### 5.6 A etiqueta de material (seção de confiança)
- Título: **"A gente mostra o que tem em cada peça."**
- Texto: "Toda peça vem com a etiqueta de material. Se tem silicone na vedação, está escrito. Sem letra miúda."
- Visual: uma etiqueta grande, que se "escreve" letra por letra ao entrar na tela.

### 5.7 Como funciona
- Título: **"Como vai funcionar"**
- 3 passos numerados:
  1. **Você entra na lista.** Leva 20 segundos e não custa nada.
  2. **A gente lança.** No dia do lançamento, você recebe a mensagem primeiro.
  3. **Primeiro lote.** O primeiro lote é pequeno. Quem está na lista escolhe antes.
- **Não** coloque números de vagas nem contador.

### 5.8 Perguntas frequentes
- **Quanto vai custar?** "Ainda estamos fechando com os fornecedores. O preço sai no lançamento, e quem está na lista sabe primeiro."
- **Preciso pagar algo agora?** "Não. A lista é só para avisar você."
- **Quando é o lançamento?** "A previsão é janeiro de 2027. Vamos avisar a data por mensagem."
- **Tem plástico em alguma peça?** "Algumas tampas de vidro têm vedação de silicone para fechar bem. Isso aparece na etiqueta de material de cada item."
- **Entregam no Brasil todo?** "Essa é a ideia. Vamos confirmar os prazos e os fretes antes do lançamento."
- **Inox gruda?** "Gruda se a panela não estiver quente o suficiente. A gente vai ensinar o truque em vídeo."
- **Posso sair da lista?** "Pode, quando quiser. Basta responder a mensagem."

### 5.9 Formulário: entrar na lista
**Objetivo:** a conversão. Precisa ser rápido.

- Título: **"Entre na lista."**
- Texto: "Avisamos você primeiro no dia do lançamento."
- Campos:
  1. Nome (obrigatório)
  2. WhatsApp (obrigatório, com máscara `(00) 00000-0000`)
  3. E-mail (opcional)
  4. "Qual kit te interessa?" (múltipla escolha, em chips: Despensa, Pia, Fogão, Todos)
  5. Checkbox desmarcado: "Aceito receber mensagens da Cozinha Sem Plástico sobre o lançamento. Li a [política de privacidade](/privacidade)." (obrigatório)
- Botão: **"Entrar na lista"**
- Sucesso: tela de agradecimento com animação da colher "mexendo" e o texto "Pronto, você está na lista. Enquanto isso, acompanhe a gente no TikTok e no Instagram." com os dois links.
- Erros em linguagem humana ("Confere o número do WhatsApp?").

### 5.10 Rodapé
- Logo invertido (creme sobre terracota-escuro).
- Links: TikTok, Instagram, Política de privacidade.
- Texto: "Cozinha Sem Plástico. Salvador, Bahia." e "Imagens ilustrativas geradas por IA enquanto as fotos reais não chegam."

---

## 6. Motion design

Bibliotecas: GSAP + ScrollTrigger + Lenis. Sempre com uma versão estática para `prefers-reduced-motion`.

### 6.1 Hero: a cozinha se arruma (peça principal)
Uma bancada de cozinha vista de frente, montada em **camadas de imagem com fundo transparente** (PNG ou WebP), sobre um fundo creme.

Sequência na entrada (2 a 3 s, sem depender de rolagem):
1. A bancada aparece com um fade suave.
2. Os potes de vidro **descem e pousam** na prateleira um a um, com um leve quique (`ease: "back.out(1.6)"`, intervalo de 0,12 s).
3. A frigideira de inox **desliza** da direita e para no fogão.
4. A colher de pau **gira** até ficar apoiada no pote, ecoando o logo.
5. O pano de linho cai no canto com uma leve ondulação.
6. O título aparece palavra por palavra.

Na rolagem (ScrollTrigger com `scrub`):
- As camadas se movem em velocidades diferentes (paralaxe leve: no máximo 40 px).
- A bancada encolhe e o título sobe, abrindo espaço para a próxima seção.

Alternativa mais simples (se o tempo for curto): uma imagem única da cozinha arrumada com um zoom lento (escala de 1,08 para 1) e os títulos animados.

### 6.2 Problema: o plástico vai embora
- Os 3 cartões de plástico ficam presos (`pin`) na tela.
- Conforme a pessoa rola, cada cartão **amassa** (escala no eixo Y + rotação leve), **perde a cor** (opacidade) e **sai de cena**.
- No fim, a tela fica vazia e entra a frase da virada.

### 6.3 A virada
- O fundo passa de creme para terracota-escuro durante a rolagem (troca de cor da seção, sem gradiente).
- A frase "Tudo passa. O plástico, não." aparece com as letras subindo uma a uma.

### 6.4 Kits
- No celular: os cards entram em sequência de baixo para cima.
- No computador: rolagem horizontal presa (os 3 kits passam lado a lado enquanto a pessoa rola para baixo).
- Passando o mouse (ou tocando), a imagem do kit se aproxima de leve e a etiqueta de material desliza para cima.

### 6.5 Microinterações
- Botão principal: ao passar o mouse, um leve "aperto" (escala 0,97) e a cor escurece.
- Chips do formulário: ao marcar, enchem de terracota com uma animação curta.
- Cursor (só no computador): uma pequena colher de pau segue o mouse sobre os cards. Opcional.
- Sucesso do formulário: a colher gira dentro de um pote.

### 6.6 Desempenho
- Hero em WebP, abaixo de 200 KB por camada. As outras imagens com `loading="lazy"`.
- Nada de vídeo pesado no hero. Se usar vídeo, que seja curto, sem áudio, abaixo de 2 MB e com uma imagem de pôster.
- Meta: Lighthouse acima de 90 no celular.

---

## 7. Imagens para gerar no ChatGPT

Todas no mesmo estilo, para a página parecer uma coisa só. Cole o **bloco de estilo** antes de cada prompt.

**Bloco de estilo (sempre igual):**
```
Warm editorial product photography, soft natural afternoon light from a window, cream #FBF0DC and terracotta #AC4922 color story, light wood and glass and brushed stainless steel and natural linen, Brazilian home kitchen, calm and cozy, premium but not luxurious, no plastic objects anywhere, no text, no logos, no people's faces.
```

| Arquivo | Prompt (depois do bloco de estilo) | Uso |
|---|---|---|
| `hero-bancada.webp` | "Empty kitchen countertop and open wooden shelf seen straight from the front, cream tiled wall, nothing on it, lots of empty space, horizontal 16:9." | Fundo do hero |
| `hero-pote-1.png` a `hero-pote-4.png` | "A single glass storage jar with a bamboo lid, filled with [rice / pasta / beans / coffee], isolated on a transparent background, front view." | Camadas do hero |
| `hero-frigideira.png` | "A single brushed stainless steel frying pan with a stainless handle, isolated on a transparent background, three-quarter view." | Camada do hero |
| `hero-colher.png` | "A single wooden spoon, isolated on a transparent background, slight angle." | Camada do hero |
| `hero-pano.png` | "A folded natural linen kitchen towel in oatmeal color, isolated on a transparent background." | Camada do hero |
| `kit-despensa.webp` | "Four glass jars with bamboo lids and a wooden spoon arranged on a wooden counter, square 1:1." | Card do kit |
| `kit-pia.webp` | "A natural loofah sponge, a wooden dish brush, a folded linen towel and a bar of soap beside a ceramic sink, square 1:1." | Card do kit |
| `kit-fogao.webp` | "A stainless steel frying pan and a small stainless steel saucepan on a gas stove, square 1:1." | Card do kit |
| `cozinha-arrumada.webp` | "A beautifully organized home kitchen, glass jars on open shelves, wooden utensils in a ceramic holder, linen towel hanging, warm and lived-in, vertical 9:16." | Plano B do hero e redes |
| `og-image.png` | Montar a partir do logo + `kit-despensa.webp`, 1200×630. | Pré-visualização de link no WhatsApp |

Dicas:
- O ChatGPT nem sempre entrega fundo transparente de verdade. Se vier com fundo, remova com o remove.bg ou com o Photoroom.
- Gere os potes numa única imagem com os 4 lado a lado e recorte depois. Assim eles ficam com a mesma luz e o mesmo estilo.
- Imagens de IA levam a legenda "imagem ilustrativa". Substitua pelas fotos reais quando o fornecedor mandar as amostras.

---

## 8. Conversão: boas práticas aplicadas

- **Uma única ação** na página inteira: entrar na lista. Todo botão leva ao formulário.
- **Botão visível sem rolar** no celular.
- **Formulário curto:** no máximo 4 campos e 1 checkbox. O WhatsApp é o canal principal (taxa de abertura alta no Brasil).
- **Kit pré-marcado** quando a pessoa clica em "Quero esse kit".
- **Prova honesta** no lugar de prova social inventada: a etiqueta de material, os bastidores e os vídeos reais.
- **Responder à objeção de preço** sem mostrar preço: falar de durabilidade e de "comprar uma vez só".
- **UTMs:** grave `utm_source`, `utm_medium`, `utm_campaign` e `utm_content` com o lead, para saber qual vídeo trouxe cada inscrição.
- **Botão de compartilhar** no sucesso: "Manda para quem vive perdendo tampa" (abre o WhatsApp com o link).

---

## 9. Dados e integrações

### Tabela `leads` (Supabase)
| Coluna | Tipo |
|---|---|
| `id` | uuid |
| `created_at` | timestamptz |
| `nome` | text |
| `whatsapp` | text |
| `email` | text, opcional |
| `kits` | text[] |
| `consentimento` | boolean |
| `consentimento_texto` | text (o texto exato aceito) |
| `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` | text |
| `user_agent` | text |

- Gravação pela rota do servidor, com a chave de serviço em variável de ambiente.
- Validação no cliente e no servidor (zod).
- Proteção simples contra spam: campo invisível (honeypot) e limite de envios por IP.
- Evite duplicados pelo WhatsApp.

### Métricas
- Vercel Analytics para as visitas.
- Pixel do Meta e do TikTok preparados, **desligados até o consentimento**.
- Evento de conversão: `Lead`, disparado no sucesso do formulário.

---

## 10. Regras legais e de comunicação

- **LGPD:** consentimento explícito, finalidade clara (avisar sobre o lançamento), política de privacidade em `/privacidade` e opção de sair. O texto da política será revisado pelo Rios.
- **CDC:** se um preço aparecer no futuro, ele será tratado como oferta. Por isso, nenhum preço nesta fase.
- **Afirmações:** só sobre material, com comprovação do fornecedor. Nada de saúde.
- **Sem:** depoimentos inventados, selos falsos, "visto na mídia", contadores falsos, números de lista inventados.
- **"Movimento":** não sugerir ONG, doação ou causa sem fins lucrativos. Somos uma loja.
- **Imagens de IA:** identificadas como ilustrativas.

---

## 11. Pendências que afetam a página

- [ ] Vetorizar o logo (SVG) e remover os fundos.
- [ ] Confirmar a frase "Tudo passa. O plástico, não." com os sócios.
- [ ] Verificar @ no TikTok e no Instagram, o domínio (.com.br) e a marca no INPI.
- [ ] Confirmar com o fornecedor os materiais da caçarola e das tampas.
- [ ] Texto final da política de privacidade (Rios).
- [ ] Trocar as imagens de IA pelas fotos reais quando as amostras chegarem.
