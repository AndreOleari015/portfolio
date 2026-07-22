# Personal site — Andre Oleari

Mobile engineer portfolio. Single page, two languages, statically generated.

**Live:** _(pending deploy)_

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript.

No CMS, no database, no client-side data fetching. Both locales are prerendered at build
time — the whole site is static HTML.

## Layout

```
app/[locale]/layout.tsx   root layout — dynamic html lang, per-locale metadata and OG tags
app/[locale]/page.tsx     the page
app/globals.css           design tokens, animations, light/dark theme
content/dictionary.ts     every string, EN and PT — single source of truth
components/               section · hero · project-list · experience · about · contact ·
                          site-header · site-nav · site-footer · motion · theme-toggle
public/shots/             app screenshots
```

## Internationalisation

There is no i18n library. `content/dictionary.ts` exports one typed object per locale and
`generateStaticParams` emits `/en` and `/pt`. The shared TypeScript interface means a
missing translation is a build error, not a runtime fallback. `/` redirects to `/en`.

## Theme

Light and dark, following the system preference, with a manual toggle that persists to
`localStorage`. An inline boot script applies the stored theme before first paint so the
page never flashes the wrong one.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Configuration

`NEXT_PUBLIC_SITE_URL` — absolute origin used for canonical URLs and `og:image`. Set it
once a custom domain is attached; without it the deployment URL is used.

## Licence

Code is free to read and learn from. The written content, screenshots and images are not
licensed for reuse.
