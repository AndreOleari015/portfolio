import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocument } from "@/components/legal-doc";
import { LvShell } from "@/components/lista-virtual";
import { isLocale, locales } from "@/content/dictionary";
import { getListaVirtual } from "@/content/lista-virtual";
import { wittgenstein } from "../brand-font";
import { socialMetadata } from "../social";

type Params = { params: Promise<{ locale: string }> };

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
    const { locale } = await params;
    if (!isLocale(locale)) return {};

    const content = getListaVirtual(locale);
    const title = `${content.privacy.title} · ${content.name}`;

    return {
        title,
        description: content.privacy.intro,
        alternates: {
            canonical: `/${locale}/lista-virtual/privacy`,
            languages: Object.fromEntries(
                locales.map((l) => [l, `/${l}/lista-virtual/privacy`]),
            ),
        },
        ...socialMetadata(locale, { title, description: content.privacy.intro, path: "/privacy" }),
    };
};

export default async function ListaVirtualPrivacyPage({ params }: Params) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();

    const content = getListaVirtual(locale);

    return (
        <LvShell
            locale={locale}
            content={content}
            path="/privacy"
            wrapperClass={`brand-lista ${wittgenstein.variable}`}>
            <div className="lv-legal shell py-16 md:py-24">
                <LegalDocument doc={content.privacy} />
            </div>
        </LvShell>
    );
}
