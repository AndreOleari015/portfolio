import type { MetadataRoute } from "next";
import { locales } from "@/content/dictionary";
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

export default function sitemap(): MetadataRoute.Sitemap {
    return PATHS.flatMap((path) =>
        locales.map((locale) => ({
            url: `${SITE_URL}/${locale}${path}`,
            alternates: {
                languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])),
            },
        })),
    );
}
