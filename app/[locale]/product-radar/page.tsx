import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductRadarShell } from "@/components/product-radar-shell";
import { getDictionary, isLocale, profile } from "@/content/dictionary";
import { getProductRadar } from "@/content/product-radar";

type Params = { params: Promise<{ locale: string }> };

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
    const { locale } = await params;
    if (!isLocale(locale)) return {};

    const content = getProductRadar(locale);

    return {
        title: content.meta.title,
        description: content.meta.description,
        alternates: { canonical: `/${locale}/product-radar` },
    };
};

export default async function ProductRadarPage({ params }: Params) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();

    const dict = getDictionary(locale);
    const content = getProductRadar(locale);

    return (
        <ProductRadarShell locale={locale} dict={dict} backLabel={content.backLabel}>
            <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">
                {content.name}
            </h1>
            <p className="mt-4 text-lg text-accent">{content.tagline}</p>

            <div className="mt-8 flex max-w-3xl flex-col gap-5">
                {content.intro.map((paragraph) => (
                    <p key={paragraph} className="text-muted">
                        {paragraph}
                    </p>
                ))}
            </div>

            <section className="mt-20 border-t border-border pt-12">
                <h2 className="text-2xl font-semibold tracking-tight">
                    {content.featuresHeading}
                </h2>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    {content.features.map((feature) => (
                        <div
                            key={feature.title}
                            className="rounded-xl border border-border bg-surface p-6">
                            <h3 className="font-semibold tracking-tight">{feature.title}</h3>
                            <p className="mt-3 text-sm text-muted">{feature.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-20 border-t border-border pt-12">
                <h2 className="text-2xl font-semibold tracking-tight">{content.apiHeading}</h2>
                <p className="mt-4 max-w-3xl text-muted">{content.apiIntro}</p>
                <ul className="mt-8 flex max-w-3xl flex-col gap-4">
                    {content.apiPoints.map((point) => (
                        <li key={point} className="border-l border-border pl-4 text-muted">
                            {point}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mt-20 border-t border-border pt-12">
                <h2 className="text-2xl font-semibold tracking-tight">
                    {content.contactHeading}
                </h2>
                <p className="mt-4 text-muted">{content.contactBody}</p>
                <a
                    href={`mailto:${profile.email}`}
                    className="mt-2 inline-block font-medium text-accent hover:underline">
                    {profile.email}
                </a>

                <div className="mt-10 flex flex-wrap gap-3">
                    <Link
                        href={`/${locale}/product-radar/privacy`}
                        className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-border-strong hover:text-accent">
                        {content.privacyLabel}
                    </Link>
                    <Link
                        href={`/${locale}/product-radar/terms`}
                        className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-border-strong hover:text-accent">
                        {content.termsLabel}
                    </Link>
                </div>
            </section>
        </ProductRadarShell>
    );
}
