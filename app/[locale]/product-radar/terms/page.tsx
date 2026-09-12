import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocument } from "@/components/legal-doc";
import { ProductRadarShell } from "@/components/product-radar-shell";
import { getDictionary, isLocale } from "@/content/dictionary";
import { getProductRadar } from "@/content/product-radar";

type Params = { params: Promise<{ locale: string }> };

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
    const { locale } = await params;
    if (!isLocale(locale)) return {};

    const content = getProductRadar(locale);

    return {
        title: content.terms.title,
        description: content.terms.intro,
        alternates: { canonical: `/${locale}/product-radar/terms` },
    };
};

export default async function ProductRadarTermsPage({ params }: Params) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();

    const dict = getDictionary(locale);
    const content = getProductRadar(locale);

    return (
        <ProductRadarShell locale={locale} dict={dict} backLabel={content.backLabel}>
            <LegalDocument doc={content.terms} />
        </ProductRadarShell>
    );
}
