import type { MetadataRoute } from "next";
import { locales } from "@/content/dictionary";
import { GUEST_MODELS } from "@/content/lista-de-convidados";
import { SITE_URL } from "@/content/site-url";

/**
 * Toda página pública, nos dois idiomas, com a outra língua como alternativa.
 * Rota nova entra aqui: o Search Console só descobre sozinho o que alguém
 * linka, e as políticas de privacidade não são linkadas da home.
 */
const PATHS = [
    "",
    "/lista-virtual",
    "/lista-virtual/privacy",
    "/product-radar",
    "/product-radar/privacy",
    "/product-radar/terms",
];

/** Os modelos de lista de convidados só existem em português, sem alternativa. */
const PT_ONLY = [
    "/lista-virtual/lista-de-convidados",
    ...GUEST_MODELS.map((model) => `/lista-virtual/lista-de-convidados/${model.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        ...PATHS.flatMap((path) =>
            locales.map((locale) => ({
                url: `${SITE_URL}/${locale}${path}`,
                alternates: {
                    languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])),
                },
            })),
        ),
        ...PT_ONLY.map((path) => ({ url: `${SITE_URL}/pt${path}` })),
    ];
}
