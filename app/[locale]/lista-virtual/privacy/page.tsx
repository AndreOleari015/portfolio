import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocument } from "@/components/legal-doc";
import { LvShell } from "@/components/lista-virtual";
import { isLocale, locales } from "@/content/dictionary";
import { getListaVirtual } from "@/content/lista-virtual";
import { wittgenstein } from "../brand-font";

type Params = { params: Promise<{ locale: string }> };

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
    const { locale } = await params;
    if (!isLocale(locale)) return {};

    const content = getListaVirtual(locale);

    return {
        title: `${content.privacy.title} · ${content.name}`,
        description: content.privacy.intro,
        alternates: {
            canonical: `/${locale}/lista-virtual/privacy`,
            languages: Object.fromEntries(
                locales.map((l) => [l, `/${l}/lista-virtual/privacy`]),
            ),
        },
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
