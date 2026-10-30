import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyMessage } from "@/components/copy-message";
import { ModelDownloads, SheetPreview } from "@/components/lista-de-convidados";
import { LvShell, StoreBadges } from "@/components/lista-virtual";
import { Phone } from "@/components/phone";
import { getGuestModel, GUEST_MODELS, MODEL_COLUMNS, MODELS_CAMPAIGN, MODELS_COPY } from "@/content/lista-de-convidados";
import { getListaVirtual } from "@/content/lista-virtual";
import { SITE_URL } from "@/content/site-url";
import { wittgenstein } from "../../brand-font";
import { socialMetadata } from "../../social";

type Params = { params: Promise<{ locale: string; evento: string }> };

/**
 * Uma página por tipo de evento, só em português: a busca que elas atendem é
 * brasileira ("lista de convidados chá de bebê"). O inglês não é gerado e cai
 * no 404, e o seletor de idioma leva para a landing em inglês.
 */
export const generateStaticParams = () => GUEST_MODELS.map((model) => ({ locale: "pt", evento: model.slug }));
export const dynamicParams = false;

/** A tela de importar planilha, a mesma do passo 1 da landing. */
const IMPORT_SCREEN = {
    src: "/telas/lista-virtual-pt-import.5acc4b6b.webp",
    alt: "Lista da Gala Corporativa Aurora 2026 separada por empresa, com o menu de importar planilha aberto",
};
const SYMBOL = "/logos/lista-virtual-simbolo.1f90848d.webp";

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
    const { locale, evento } = await params;
    const model = getGuestModel(evento);
    if (locale !== "pt" || !model) return {};

    const path = `/lista-de-convidados/${model.slug}`;

    return {
        title: model.title,
        description: model.description,
        alternates: { canonical: `/pt/lista-virtual${path}` },
        ...socialMetadata("pt", { title: model.title, description: model.description, path }),
    };
};

export default async function GuestModelPage({ params }: Params) {
    const { locale, evento } = await params;
    const model = getGuestModel(evento);
    if (locale !== "pt" || !model) notFound();

    const content = getListaVirtual("pt");
    const hub = "/pt/lista-virtual/lista-de-convidados";
    const others = GUEST_MODELS.filter((other) => other.slug !== model.slug);
    const hint = (name: string) =>
        model.columnHints[name as (typeof MODEL_COLUMNS)[number]] ??
        MODELS_COPY.columnDefaults[name as (typeof MODEL_COLUMNS)[number]];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: content.name, item: `${SITE_URL}/pt/lista-virtual` },
            { "@type": "ListItem", position: 2, name: MODELS_COPY.hub.h1, item: `${SITE_URL}${hub}` },
            { "@type": "ListItem", position: 3, name: model.label, item: `${SITE_URL}${hub}/${model.slug}` },
        ],
    };

    return (
        <LvShell
            locale="pt"
            content={content}
            otherHref="/en/lista-virtual"
            campaign={MODELS_CAMPAIGN}
            wrapperClass={`brand-lista ${wittgenstein.variable}`}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* ── A folha ─────────────────────────────────────────────────
                Texto e botões à esquerda, a folha à direita, no lugar onde a
                landing põe o telefone. */}
            <section>
                <div className="shell lv-model-hero">
                    <div className="lv-rise">
                        <Link href={hub} className="lv-model-back">
                            {MODELS_COPY.breadcrumb}
                        </Link>
                        <h1 className="lv-serif lv-model-title mt-5">{model.h1}</h1>
                        <p className="lv-lead mt-6 max-w-[34rem]">{model.lead}</p>
                        <div className="mt-9">
                            <ModelDownloads slug={model.slug} />
                        </div>
                        <p className="lv-fine mt-4">{MODELS_COPY.downloadNote}</p>
                    </div>
                    <SheetPreview model={model} />
                </div>
            </section>

            {/* ── As colunas ──────────────────────────────────────────────
                Em dois grupos, porque são duas coisas diferentes: o que o app
                lê na importação e o que é deste evento. */}
            <section className="shell pb-24 md:pb-36">
                <div className="lv-faq-grid">
                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <h2 className="lv-serif lv-section-title">{MODELS_COPY.columnsHeading}</h2>
                        <p className="lv-lead mt-5 max-w-[24rem]">{MODELS_COPY.columnsBody}</p>
                    </div>
                    <div className="lv-columns">
                        <h3 className="lv-columns-group">{MODELS_COPY.appColumns}</h3>
                        <dl>
                            {MODEL_COLUMNS.map((name) => (
                                <div key={name} className="lv-column">
                                    <dt className="lv-serif">{name}</dt>
                                    <dd>{hint(name)}</dd>
                                </div>
                            ))}
                        </dl>
                        <h3 className="lv-columns-group mt-14">{MODELS_COPY.eventColumns}</h3>
                        <dl>
                            {model.extraColumns.map((column) => (
                                <div key={column.name} className="lv-column">
                                    <dt className="lv-serif">{column.name}</dt>
                                    <dd>{column.hint}</dd>
                                </div>
                            ))}
                        </dl>
                        <h3 className="lv-columns-group mt-14">{MODELS_COPY.summaryHeading}</h3>
                        <p className="lv-columns-note">
                            {MODELS_COPY.summaryBody(model.extraColumns.some((column) => column.name === "Confirmou"))}
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Dicas ─────────────────────────────────────────────────── */}
            <section className="shell pb-24 md:pb-36">
                <h2 className="lv-serif lv-section-title max-w-[22ch]">{MODELS_COPY.tipsHeading(model.eventOf)}</h2>
                <div className="lv-tips mt-12">
                    {model.tips.map((tip) => (
                        <div key={tip.title}>
                            <h3 className="lv-serif lv-tip-title">{tip.title}</h3>
                            <p className="lv-tip-body">{tip.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── A mensagem ─────────────────────────────────────────────
                Um balão de conversa, porque é isso que ela vai virar. */}
            <section className="shell pb-24 md:pb-36">
                <div className="lv-message">
                    <div>
                        <h2 className="lv-serif lv-section-title">{MODELS_COPY.messageHeading}</h2>
                        <p className="lv-lead mt-5 max-w-[26rem]">{MODELS_COPY.messageBody}</p>
                    </div>
                    <div className="lv-message-side">
                        <p className="lv-bubble">{model.message}</p>
                        <div className="mt-6">
                            <CopyMessage text={model.message} label={MODELS_COPY.copy} done={MODELS_COPY.copied} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── O app ─────────────────────────────────────────────────
                O mesmo fechamento da landing, com a tela de importar. */}
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
                            <Phone src={IMPORT_SCREEN.src} alt={IMPORT_SCREEN.alt} sizes="(min-width: 900px) 220px, 42vw" />
                        </div>
                    </div>
                    <div className="lv-download-copy">
                        <h2 className="lv-serif lv-section-title">{MODELS_COPY.appHeading}</h2>
                        <p className="lv-lead mt-5 max-w-[28rem]">{MODELS_COPY.appBody}</p>
                        <div className="mt-9">
                            <StoreBadges locale="pt" content={content} campaign={MODELS_CAMPAIGN} />
                        </div>
                        <p className="lv-fine mt-4">{MODELS_COPY.appNote}</p>
                    </div>
                </div>
            </section>

            {/* ── Outros modelos ─────────────────────────────────────── */}
            <section className="shell pb-24 md:pb-36">
                <h2 className="lv-serif lv-section-title">{MODELS_COPY.othersHeading}</h2>
                <ul className="lv-model-links mt-10">
                    {others.map((other) => (
                        <li key={other.slug}>
                            <Link href={`${hub}/${other.slug}`}>{other.label}</Link>
                        </li>
                    ))}
                </ul>
            </section>
        </LvShell>
    );
}
