# Lista Virtual: design system da landing

Vale para `/pt|en/lista-virtual` e `/pt|en/lista-virtual/privacy`. Essas páginas vestem a marca do app,
não a do portfólio. Este arquivo é critério de revisão: toda seção nova passa pela lista de
**Proibido** e **Obrigatório** antes de ser mostrada.

## Fonte da verdade

- Cores: `src/constants/colors.ts` do app (tema escuro). Mudou lá, muda aqui, no bloco `.brand-lista`
  de `app/globals.css`.
- Fontes: Wittgenstein nos títulos (a mesma do app, `Fonts` no mesmo arquivo), fonte do sistema (SF)
  no corpo. Carregada só nestas páginas por `app/[locale]/lista-virtual/brand-font.ts`.
- Números: cada número da página tem fonte e data em [content.md](content.md).

## Tokens

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#14110C` | fundo da página inteira, inclusive a raiz (`:root:has(.brand-lista)`) |
| `--bg-elevated` | `#1E1A12` | pergunta do FAQ |
| `--surface` / `--surface-high` | `#1B1710` / `#221D14` | cartões, painel de abas, tabela |
| `--border` / `--border-strong` | `#2E2718` / `#463C28` | contorno de cartão |
| `--text` / `--text-muted` / `--text-faint` | `#EDE4D0` / `#C7BCA2` / `#8A7F68` | texto (papéis em [Cores de texto](#cores-de-texto)) |
| latão | `#A9781A → #C9A227 → #E6C46A`, realce `#F5E1A0` | o ouro |
| `--gold-light` | `#E6C46A` | o único ouro de texto |
| `--gold-ink` | `#2A1E05` | texto sobre latão sólido |
| `--lv-font-serif` / `--lv-font-sans` | Wittgenstein / sistema (SF) | as duas famílias |
| `--lv-fs-*`, `--lv-track-label` | ver [Tipografia](#tipografia) | tamanhos e espaçamento do rótulo |

## Tipografia

Duas famílias, dez tamanhos, três pesos, tudo em token no bloco `.brand-lista`. Texto novo usa um
token, nunca um valor solto no CSS nem classe de tamanho do Tailwind no JSX.

A auditoria de 24/09 (estilo computado de cada texto da página, em 1440) achou 19 tamanhos, 5 pesos e
8 cores de texto: cada seção tinha nascido com o seu valor (13,5, 14, 19, 38, 44...), e três ouros
diferentes no texto. Depois da escala: 10 tamanhos, 3 pesos e 5 cores, também na privacidade.

| Token | Desktop | Celular | Estilo | Onde |
|---|---|---|---|---|
| `--lv-fs-display` | 68 | 46 | serifa 600 | título do hero, frase da dor, número de uso no celular |
| `--lv-fs-h1` | 52 | 32 | serifa 600 | título de seção, número de uso no desktop |
| `--lv-fs-h2` | 40 | 28 | serifa 600 | título do cartão grande, preço do plano, título da privacidade |
| `--lv-fs-h3` | 28 | 28 | serifa 600 | título do passo |
| `--lv-fs-h4` | 22 | 22 | serifa 600 | título de cartão, nome do plano, nota da loja, avaliação (itálico 500) |
| `--lv-fs-h5` | 18 | 18 | serifa 600 | nome no cabeçalho e no rodapé, título da anotação |
| `--lv-fs-lead` | 18 | 18 | sistema 400 | texto de abertura de seção, corpo do passo |
| `--lv-fs-body` | 17 | 17 | sistema 400 | parágrafo, resposta do FAQ (a pergunta em 600), frase do número |
| `--lv-fs-small` | 15 | 15 | sistema 400 | navegação, célula da tabela, texto da anotação, links do rodapé; botão em 600 |
| `--lv-fs-caption` | 13 | 13 | sistema 400 | letra miúda, etiqueta, pílula, nota do plano, assinatura, © |
| `--lv-fs-label` | 12 | 12 | sistema 600, caixa alta, `0.14em` | "PLANOS", tipo do plano, selo, legenda da nota, coluna do rodapé, número do passo, PT/EN |

Os três primeiros são fluidos (`clamp`); entre 390 e 1440 passam por valores intermediários, e é isso.
O número de uso troca de passo em 1180px porque ali ele passa a dividir uma coluna de 270px.

Regras:

- Serifa só em título, número e nome. Texto corrido, botão, rótulo e navegação na fonte do sistema.
- Pesos: 400 no texto; 600 em título, rótulo, botão e pergunta; 500 só no itálico (a palavra de
  destaque e a citação). Negrito 700 não existe no texto.
- Espaçamento de letra: negativo só na serifa grande (-0.012 a -0.028em); positivo só no rótulo em
  caixa alta, sempre 0.14em.
- Entrelinha: 0.95 a 1.1 nos títulos, 1.4 a 1.7 no texto.
- Nada abaixo de 12px. A exceção é o numeral dos pontos dourados do hero (10px, 700): ele é parte
  do desenho do ponto, como um ícone.
- O título do hero é o maior texto da página em qualquer largura.

## Cores de texto

Contraste medido no fundo da página (`--bg`) e nos cartões (`--surface` a `--surface-high`).

| Papel | Token | Onde | Contraste |
|---|---|---|---|
| principal | `--text` | títulos, texto em destaque, pergunta do FAQ | 14,9 (13,3 em cartão) |
| secundário | `--text-muted` | parágrafos, respostas, qualquer texto dentro de cartão | 10,0 (8,9) |
| apagado | `--text-faint` | letra miúda, aba inativa, rodapé, **só sobre o fundo da página** | 4,8 (4,2) |
| ouro | `--gold-light` | rótulo, número de uso, legenda da nota, etiqueta, ícone | 11,2 (9,9) |
| latão | `--brass-text` (gradiente) | só a palavra de destaque do título do hero | · |
| tinta | `--gold-ink` | texto sobre latão sólido (botão, selo, numeral do ponto) | 9,0 |

O apagado fica abaixo do AA (4,5:1) dentro de cartão; ali vai o secundário.

## Ritmo

- Coluna: `shell` (70rem, respiro lateral de 1.5rem e 2.5rem).
- Entre seções, só respiro embaixo: `pb-24 md:pb-36` (96 e 144px). Respiro em cima e embaixo somava com
  a seção vizinha e deixava vãos diferentes.

## Luz: meia-luz

O brilho é da marca (direção "Joalheria / Cofre"), mas em meia-luz. Com halo forte em tudo a página
parecia vitrine iluminada demais; sem halo nenhum o ouro virou tinta chapada. Os valores aprovados:

- luz de fundo: uma só, `rgb(212 168 58 / 0.1)`, atrás do telefone do hero;
- anel do hero: contorno de 1.5px em latão a 50%, halo `10px / 0.22`, respirando devagar (6s);
- faíscas: halos `4px / 0.45` e `12px / 0.3`;
- botão de latão: `0 8px 24px -10px / 0.32`;
- check de latão: `10px / 0.18`.

Regra: quando algo parecer forte demais, **diminuir, nunca remover**.

## Ouro é sinal

- Latão sólido: só o check de confirmado e o botão principal, quando houver.
- Anel de latão (contorno): botão secundário, plano recomendado, pergunta aberta.
- Texto em ouro: um ouro só, `--gold-light`, nos papéis da tabela de [cores de texto](#cores-de-texto).
  O `--accent` não é cor de texto.
- Texto em latão (gradiente): só a palavra de destaque do título.

## Componentes

- **Cabeçalho**: monograma + nome, âncoras, `PT/EN`, "Baixar grátis" em anel. Sem faixa, sem fio,
  não fixo.
- **Selos das lojas**: os oficiais da Apple e do Google, na língua da página, sem recolorir, sem
  recortar e com área de respiro. Botão próprio com o logo deles não pode.
- **Telefone**: `components/phone.tsx` (molde + tela real de 900px).
- **Anotação**: cartão pequeno com fio de 1px em latão, ligado a um ponto da tela do telefone. Os
  fios só existem a partir de 1180px, onde o hero tem medida fixa; abaixo disso o número do ponto
  aparece no cartão.
- **Abas do "como funciona"**: lista à esquerda, tela à direita; no celular, tudo em sequência.
- **Hero em slides**: três telas (QR, lista com check-ins, relatório) de 5,5 segundos cada (6 parecia lento, 4,5 rápido demais); tela,
  pontos, fios, o texto dos dois cartões e o número de uso trocam juntos. Três barrinhas embaixo do
  telefone mostram o andamento (a atual enche no tempo do slide) e deixam escolher a tela. Não pausa
  com o mouse: quem olha o telefone deixa o mouse em cima e achava que tinha travado. A tela cruza
  com a seguinte; texto nunca cruza (sai, depois entra). Moldura do cartão fixa, só o texto troca.
  Com movimento reduzido, só troca pelas barrinhas; sem JavaScript, fica o primeiro slide.
- **Anotações do hero**: título de até uns 18 caracteres (cabe numa linha na coluna de 270px) e duas
  ou três linhas de texto.
- **Números de uso**: o destaque da coluna da direita do hero, um por slide, trocando junto com a tela
  (mesmo relógio, mesma troca sem cruzar). Número grande em serifa dourada com meia-luz e a frase
  embaixo. Só número medido, arredondado para baixo.
- **Nota da loja**: cinco estrelas de latão desenhadas em SVG (a última preenchida na proporção da
  nota), a nota em serifa ao lado e a legenda embaixo em versalete dourado, o mesmo rótulo do
  "PAGAMENTO ÚNICO" dos planos. Nunca o "★" de texto (parece emoji) nem frase cinza solta.
- **Avaliação real**: na seção "para quem", embaixo do texto. Depoimento inventado é proibido, mesmo com
  autorização do dono: quem lê acredita que é um cliente.
- **Tabela de planos**: alternância no topo, uma coluna por plano, preço no topo, botão embaixo, o
  recomendado com anel.
- **FAQ**: `details/summary`, sem JavaScript.
- **Fechamento ("Baixar")**: o símbolo do app (o LV no círculo, `public/logos/lista-virtual-simbolo.*`,
  tirado de `assets/icon-no-bg.png` do app) grande atrás do telefone, no lugar do anel, a 60% e sem
  recolorir. O telefone tem no máximo 44% da largura do símbolo: assim o L aparece à esquerda e a
  perna direita do V à direita; maior que isso, sobra só o círculo. A tela é a lista com os
  contadores abertos (painel 5 da loja), a única que não aparece em outro ponto da página.

## Proibido

- Fio de ponta a ponta separando seções, e faixa de outra cor com emenda reta.
- Halo a pleno em tudo. E também zerar o brilho.
- O ícone do app com o quadrado branco sobre o fundo escuro (usar o monograma).
- Depoimento, avatar, logo de cliente ou número sem fonte. Nome fictício.
- "Mais popular" ou "mais escolhido" sem dado que prove.
- "100% offline": só o check-in na portaria funciona sem internet.
- Imagem de app gerada por IA.
- Travessão, em copy e em comentário.
- Cabeçalho em mono com "voltar ao portfólio".
- Três cartões iguais lado a lado.
- Botão de loja próprio no lugar do selo oficial.
- Segunda cor de acento. O verde do WhatsApp só aparece dentro das capturas.
- Tamanho, peso ou cor de texto fora das tabelas de tipografia e de cores. Terceira família de fonte,
  inclusive o mono do portfólio.
- Caractere fazendo papel de ícone ("★", "+", o travessão): desenhar em SVG ou CSS.

## Obrigatório

- Todo número com fonte e data em [content.md](content.md), e o mesmo número no texto e no JSON-LD.
- Layout assimétrico. Centralizar só quando for uma frase sozinha.
- Grão sutil (`body::after`, do portfólio): tira o aspecto chapado do fundo liso.
- Teste real antes de chamar de pronto: capturas em 1440 e 390, pt e en.
- Contraste AA (4,5:1) em todo texto. Mudou cor ou superfície, medir de novo.
- Mexeu em texto, rodar a auditoria de tipografia: tamanhos, pesos e cores não podem aumentar.
- Nada vai para o git antes de o dono ver no servidor local e aprovar.

## Tentativas rejeitadas

- **R1** (23/09): visual padrão do portfólio. "Muito padrão, quero uma extensão da marca."
- **R2** (23/09): marca do app com o esqueleto do portfólio, cabeçalho mono "voltar ao portfólio".
  "Aspecto de técnico, não passa o chique."
- **R3** (23/09): página de produto com barra fixa e fio, ícone branco, halo forte em tudo, números
  vazados (o contorno mostrava as peças sobrepostas da fonte) e divisórias entre seções.
- **R4** (24/09): sem barra, sem fio, monograma, números limpos, vãos iguais, e o brilho zerado. "Não
  era para remover, só diminuir." Com a meia-luz de volta: "ainda não está bom".
- **R5** (24/09): método deste guia, layout da OKX, da Ment Funding e da VoltPeak, preços reais.
