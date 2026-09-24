import type { Metadata } from "next";
import type { Locale } from "@/content/dictionary";
import { getListaVirtual } from "@/content/lista-virtual";

/**
 * Open Graph e cartão do X das páginas do Lista Virtual. Sem isto elas herdam
 * os do layout raiz, que são do portfólio: no X o link da landing aparecia
 * como "Andre Oleari · Engenheiro de Software Mobile", com a imagem do
 * portfólio, e no WhatsApp saía sem imagem. A metadata se junta de forma rasa,
 * então quem define `openGraph` precisa trazer a imagem de novo: por isso as
 * duas páginas passam por aqui.
 */
export const socialMetadata = (
    locale: Locale,
    { title, description, path }: { title: string; description: string; path: string },
): Pick<Metadata, "openGraph" | "twitter"> => {
    const { meta, name } = getListaVirtual(locale);
    const image = { url: meta.ogImage, width: 1200, height: 630, alt: meta.ogImageAlt };

    return {
        openGraph: {
            type: "website",
            url: `/${locale}/lista-virtual${path}`,
            siteName: name,
            title,
            description,
            locale: locale === "pt" ? "pt_BR" : "en_IE",
            images: [image],
        },
        twitter: { card: "summary_large_image", title, description, images: [image] },
    };
};
