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
