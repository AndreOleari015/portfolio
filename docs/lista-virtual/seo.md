# Lista Virtual: SEO da landing

## Metadata

- Título e descrição por idioma em `content/lista-virtual.ts` (`meta`). O título repete a legenda da
  screenshot 1 das lojas, para quem chega pela busca reconhecer o app ao abrir a loja.
- `canonical` na própria página e `alternates.languages` apontando pt e en uma para a outra.
- Open Graph com `locale` `pt_BR` e `en_IE`. `itunes.appId` para o banner inteligente do Safari.

## Dado estruturado (JSON-LD)

Dois blocos, montados em `app/[locale]/lista-virtual/page.tsx`:

1. `MobileApplication`:
   - nome, descrição, sistemas, categoria, `installUrl` das duas lojas e idioma;
   - `offers` com os preços reais da página (moeda do idioma: BRL no pt, USD no en);
   - `aggregateRating` com a mesma nota e o mesmo total que a página mostra. O Google recusa dado
     estruturado que a página não exibe.
2. `FAQPage`: o mesmo texto das perguntas que está na tela.

Depoimentos coletados pelo WhatsApp **não** vão como `Review`: são coletados pelo próprio dono do app,
e marcação de avaliação vinda da própria empresa é motivo de ação manual do Google.

## Sitemap e robots

- `app/sitemap.ts` lista `/lista-virtual` e `/lista-virtual/privacy` nos dois idiomas, com alternativas.
- `app/robots.ts` libera tudo e aponta o sitemap.
- Depois do deploy: enviar `sitemap.xml` no Search Console (a propriedade já está verificada).

## Imagem de compartilhamento

- `public/og-lista-virtual-{pt,en}.*.jpg`, 1200x630: o título do hero com "sem papel" em latão, o
  subtítulo, a nota da loja e o telefone com o símbolo atrás (QR do convidado no pt, lista com
  check-ins no en). Vai no `og:image` e no cartão do X da landing e da política, por
  `app/[locale]/lista-virtual/social.ts`.
- Sem isso as páginas herdavam o Open Graph e o cartão do X do layout raiz: no X o link da landing
  saía como o portfólio ("Andre Oleari · Engenheiro de Software Mobile") e no WhatsApp, sem imagem.
- Gerar de novo: `node scripts/og-lista-virtual.mjs` (desenho em `scripts/og-lista-virtual.html`),
  e colar os caminhos que ele imprime em `meta.ogImage`. JPEG abaixo de 300 KB, porque acima disso o
  WhatsApp costuma não mostrar a prévia.
- A imagem repete a nota e o total de avaliações: mudou o número em `content/lista-virtual.ts`, mudar
  no desenho e gerar de novo.

## Ícone da aba

- `public/logos/lista-virtual-icon.*.png` (256px, recorte justo do anel do ícone do app, para o LV se
  ler em 16px) e `lista-virtual-apple-icon.*.png` (180px, o ícone do app inteiro), declarados no
  `metadata.icons` de `app/[locale]/lista-virtual/layout.tsx`. Valem para a landing e a política de
  privacidade; o resto do site continua com `app/icon.png` e `app/apple-icon.png`, do portfólio.
- A metadata de segmentos diferentes se junta de forma rasa: o `icons` do layout da landing
  substitui o da raiz inteiro. O Next troca o `<link rel="icon">` na navegação sem recarregar, nos
  dois sentidos e no Voltar do navegador.
- Não usar os arquivos `icon.png` e `apple-icon.png` dentro de `app/[locale]/lista-virtual/`: debaixo
  do segmento dinâmico o build local passa, mas o da Vercel para em "Invariant: failed to find source
  route /[locale]/lista-virtual/apple-icon.png" (24/09/2026, Next 16.2.10).

## Imagens

- `alt` na língua da página, descrevendo o que a tela mostra.
- A primeira tela do hero e a moldura carregam com `loading="eager"` e `fetchPriority="high"`
  (`components/lista-virtual-hero.tsx`). No Next 16 o `priority` ficou obsoleto, e a documentação
  prefere esses dois ao `preload`.
- Telas de 900px no máximo, WebP.

## Modelos de lista de convidados (30/10/2026)

- Dez páginas por tipo de evento, só em pt, escolhidas pela busca do Google no Brasil (vault:
  `apps/lista-virtual/2026-10-30-paginas-seo-buscas.md`). Título "Lista de convidados para <evento>:
  modelo grátis em Excel e PDF", `canonical` própria, sem `alternates.languages`.
- `BreadcrumbList` em JSON-LD (Lista Virtual > Modelos > evento).
- No `app/sitemap.ts`, em `PT_ONLY`. A landing em pt linka a página de modelos em dois lugares: no passo 1 do "Como funciona" ("Ainda não tem planilha? Baixe um modelo grátis", campo `link` do `Step`) e no rodapé.
- Teste: 10 páginas primeiro. Em 4 a 8 semanas, ver impressões e cliques no Search Console antes de
  fazer mais.
- A planilha tem as colunas do importador do app, na mesma ordem, e o VIP sempre na sexta coluna
  (ver o comentário no topo de `content/lista-de-convidados.ts`).

## Campanhas nos links das lojas (30/10/2026)

- `storeUrls(campaign)` em `content/lista-virtual.ts` monta os links com campanha: Apple com `pt=127458243`
  (número de provedor, do gerador de link do App Store Connect) e `ct=<campanha>`; Google Play com
  `referrer` em UTM (`utm_source=andreoleari.com.br`, `utm_medium=site`, `utm_campaign=<campanha>`).
- Campanhas: `site-landing` (landing) e `site-modelos` (páginas de modelo e a lista delas). A política de
  privacidade fica com o link limpo. O JSON-LD também.
- Onde ler: App Store Connect › App Analytics › Aquisição › Campanhas (aparece a partir de 5 instalações
  na campanha) e Play Console › Aquisição de usuários, por campanha UTM.
