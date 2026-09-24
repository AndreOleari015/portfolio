/**
 * Base absoluta para as URLs de metadata, sitemap e robots. Sem isso o Next
 * emite caminho relativo na imagem de Open Graph e LinkedIn/Slack não
 * conseguem resolver o preview. Na Vercel, VERCEL_URL já vem preenchida a cada
 * deploy.
 */
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (vercelHost ? `https://${vercelHost}` : "http://localhost:3000");
