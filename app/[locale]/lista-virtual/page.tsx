import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
    Check,
    FeatureIcon,
    LvShell,
    Sparkle,
    StoreBadges,
} from "@/components/lista-virtual";
import { LvHeroStage } from "@/components/lista-virtual-hero";
import { LvPlans } from "@/components/lista-virtual-plans";
import { LvSteps } from "@/components/lista-virtual-steps";
import { Phone } from "@/components/phone";
import { isLocale, locales } from "@/content/dictionary";
import { APP_STORE_URL, getListaVirtual, PLAY_STORE_URL } from "@/content/lista-virtual";
import { wittgenstein } from "./brand-font";

type Params = { params: Promise<{ locale: string }> };

/**
 * A tela do fechamento: a lista de um evento com os contadores abertos
 * (convidados, confirmados, presentes). É a única tela dos painéis da loja que
 * não aparece em outro ponto da página. A home com os eventos salvos, que
 * estava aqui, era quase toda vazia e tinha a faixa laranja do "sem conexão".
 */
const CLOSING_SCREEN = {
    pt: {
        src: "/telas/lista-virtual-pt-rsvp.175c8206.webp",
        alt: "Lista de um aniversário com quantos foram convidados, confirmaram e já chegaram",
    },
    en: {
        src: "/telas/lista-virtual-en-rsvp.a45c28f7.webp",
        alt: "A corporate gala's guest list showing how many were invited, confirmed and present",
    },
};

/** O símbolo do app (o LV no círculo), no tamanho cheio: vai grande atrás do telefone. */
const SYMBOL = "/logos/lista-virtual-simbolo.1f90848d.webp";

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
    const { locale } = await params;
    if (!isLocale(locale)) return {};

    const content = getListaVirtual(locale);

    return {
        title: content.meta.title,
        description: content.meta.description,
        alternates: {
            canonical: `/${locale}/lista-virtual`,
            languages: Object.fromEntries(locales.map((l) => [l, `/${l}/lista-virtual`])),
        },
        openGraph: {
            type: "website",
            url: `/${locale}/lista-virtual`,
            title: content.meta.title,
            description: content.meta.description,
            locale: locale === "pt" ? "pt_BR" : "en_IE",
        },
        itunes: { appId: "6738919953" },
    };
};

/** "R$ 14,90" e "$2.99" viram 14.90 e 2.99 para o dado estruturado. */
const toNumber = (price: string) => price.replace(/[^\d,.]/g, "").replace(",", ".");

export default async function ListaVirtualPage({ params }: Params) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();

    const content = getListaVirtual(locale);
    const { plans, trust } = content;
    const currency = locale === "pt" ? "BRL" : "USD";

    /* Dois blocos de dado estruturado: o app (para o Google entender que a
       página é de um aplicativo, de quais lojas, quanto custa e qual a nota) e
       as perguntas. O Google recusa dado estruturado que a página não mostra,
       então preço, nota e texto do FAQ são exatamente os que estão na tela. Os
       depoimentos não entram como `Review`: foram coletados pelo próprio dono
       do app. */
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "MobileApplication",
            name: content.name,
            description: content.meta.description,
            operatingSystem: "iOS, Android",
            applicationCategory: "LifestyleApplication",
            installUrl: [APP_STORE_URL, PLAY_STORE_URL],
            inLanguage: locale === "pt" ? "pt-BR" : "en",
            offers: [plans.free, ...plans.event, ...plans.subscription].map((plan) => ({
                "@type": "Offer",
                name: plan.name,
                price: toNumber(plan.price),
                priceCurrency: currency,
            })),
            aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: toNumber(trust.rating),
                ratingCount: trust.ratingLabel.replace(/\D.*$/, ""),
                bestRating: "5",
            },
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: content.faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
        },
    ];

    return (
        <LvShell locale={locale} content={content} wrapperClass={`brand-lista ${wittgenstein.variable}`}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* ── Vitrine ─────────────────────────────────────────────────
                Três zonas, como a OKX: a promessa à esquerda, o produto no
                centro e a confiança à direita. O título repete a legenda da
                screenshot 1 das lojas, para quem chega pela busca reconhecer o
                app quando abrir a loja. */}
            <section>
                <div className="shell lv-hero">
                    <div className="lv-hero-copy lv-rise">
                        <p className="lv-pill">
                            <Sparkle className="h-3 w-3" />
                            {content.badge}
                        </p>

                        <h1 className="lv-serif lv-display mt-7">
                            {content.headline}{" "}
                            <span className="lv-accent-word">
                                <em className="lv-brass-text">{content.headlineAccent}</em>
                                <svg
                                    className="lv-swash"
                                    viewBox="0 0 300 22"
                                    preserveAspectRatio="none"
                                    aria-hidden>
                                    <defs>
                                        <linearGradient id="lv-swash-gold" x1="0" x2="1">
                                            <stop offset="0" stopColor="#a9781a" />
                                            <stop offset="0.5" stopColor="#ead08a" />
                                            <stop offset="1" stopColor="#c9a227" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M4 15C70 6 170 3 296 9" />
                                    <path d="M40 19C110 13 190 12 262 15" className="lv-swash-thin" />
                                </svg>
                            </span>
                        </h1>

                        <p className="lv-lead lv-hero-sub mt-6">{content.subhead}</p>

                        <div className="mt-9">
                            <StoreBadges locale={locale} content={content} />
                        </div>
                        <p className="lv-fine mt-4">{content.freeNote}</p>
                    </div>

                    <LvHeroStage slides={content.heroSlides} trust={trust} proofs={content.proofs} />
                </div>
            </section>

            {/* ── A dor, dita uma vez e em voz alta ─────────────────────────
                Título de um lado, texto do outro, como a linha "Your trusted
                partner" da OKX. */}
            <section className="shell pb-24 md:pb-36">
                <div className="lv-pain">
                    <h2 className="lv-serif lv-statement">{content.problemHeading}.</h2>
                    <div className="lv-pain-body">
                        {content.problem.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── O que muda na portaria ────────────────────────────────────
                Um cartão grande e dois empilhados. Três cartões iguais lado a
                lado estão na lista de proibidos do design system. */}
            <section id="recursos" className="shell scroll-mt-24 pb-24 md:pb-36">
                <h2 className="lv-serif lv-section-title">{content.highlightsHeading}</h2>
                <ul className="lv-bento mt-12">
                    {content.highlights.map((item, i) => (
                        <li key={item.title} className={`lv-bento-item ${i === 0 ? "lv-bento-main" : ""}`}>
                            <FeatureIcon icon={item.icon} />
                            <h3 className="lv-serif lv-bento-title">{item.title}</h3>
                            <p className="lv-bento-body">{item.body}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {/* ── Como funciona, em abas ─────────────────────────────────── */}
            <section id="como-funciona" className="shell scroll-mt-24 pb-24 md:pb-36">
                <h2 className="lv-serif lv-section-title">{content.stepsHeading}</h2>
                <div className="mt-12">
                    <LvSteps steps={content.steps} />
                </div>
            </section>

            {/* ── Planos ─────────────────────────────────────────────────── */}
            <section id="planos" className="shell scroll-mt-24 pb-24 md:pb-36">
                <LvPlans plans={plans} ctaHref="#baixar" />
            </section>

            {/* ── Para quem ──────────────────────────────────────────────────
                Linhas de convidado confirmado, copiadas do app: cada público
                "já está na lista". A avaliação real fica aqui, embaixo do
                texto: é de quem organiza, falando para quem organiza. */}
            <section className="shell pb-24 md:pb-36">
                <div className="lv-audience">
                    <div>
                        <h2 className="lv-serif lv-section-title">{content.audienceHeading}</h2>
                        <p className="lv-lead mt-5 max-w-[26rem]">{content.audienceBody}</p>
                        {content.testimonials.map((item) => (
                            <figure key={item.quote} className="lv-testimonial">
                                <blockquote className="lv-serif">“{item.quote}”</blockquote>
                                <figcaption>
                                    {item.author} · {item.source}
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                    <ul className="lv-audience-list">
                        {content.audience.map((item) => (
                            <li key={item} className="lv-guest">
                                <Check />
                                <span className="leading-snug">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── Baixar ──────────────────────────────────────────────────────
                Telefone de um lado, convite do outro, como o "Begin your
                journey" da OKX. O cartão centralizado que existia aqui saiu: o
                guia pede layout assimétrico. */}
            <section id="baixar" className="shell scroll-mt-24 pb-24 md:pb-36">
                <div className="lv-download">
                    <div className="lv-download-stage">
                        <Image
                            src={SYMBOL}
                            alt=""
                            aria-hidden
                            width={1024}
                            height={987}
                            sizes="(min-width: 900px) 496px, 94vw"
                            className="lv-download-mark"
                        />
                        <div className="lv-download-phone">
                            <Phone
                                src={CLOSING_SCREEN[locale].src}
                                alt={CLOSING_SCREEN[locale].alt}
                                sizes="(min-width: 900px) 220px, 42vw"
                            />
                        </div>
                    </div>
                    <div className="lv-download-copy">
                        <h2 className="lv-serif lv-section-title">{content.closingHeading}</h2>
                        <p className="lv-lead mt-5 max-w-[28rem]">{content.closingBody}</p>
                        <div className="mt-9">
                            <StoreBadges locale={locale} content={content} />
                        </div>
                        <p className="lv-fine mt-4">{content.freeNote}</p>
                    </div>
                </div>
            </section>

            {/* ── Perguntas ────────────────────────────────────────────────── */}
            <section id="perguntas" className="shell scroll-mt-24 pb-24 md:pb-36">
                <div className="lv-faq-grid">
                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <h2 className="lv-serif lv-section-title">{content.faqHeading}</h2>
                        <p className="lv-lead mt-5 max-w-[22rem]">{content.faqBody}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        {content.faq.map((item) => (
                            <details key={item.question} className="lv-faq">
                                <summary className="lv-faq-q flex min-h-16 cursor-pointer list-none items-center justify-between gap-6">
                                    {item.question}
                                    <svg viewBox="0 0 20 20" className="lv-faq-icon" aria-hidden>
                                        <path
                                            d="M10 4v12M4 10h12"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </summary>
                                <p className="pb-6 leading-relaxed text-muted">{item.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
        </LvShell>
    );
}
