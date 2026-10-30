import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LvShell } from "@/components/lista-virtual";
import { GUEST_MODELS, MODELS_CAMPAIGN, MODELS_COPY } from "@/content/lista-de-convidados";
import { getListaVirtual } from "@/content/lista-virtual";
import { wittgenstein } from "../brand-font";
import { socialMetadata } from "../social";

type Params = { params: Promise<{ locale: string }> };

/**
 * A lista dos modelos. Existe para o Google achar as dez páginas a partir de
 * um lugar só e para quem chega num modelo achar o do próprio evento. Só em
 * português, como os modelos.
 */
export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
    const { locale } = await params;
    if (locale !== "pt") return {};

    const { title, description } = MODELS_COPY.hub;

    return {
        title,
        description,
        alternates: { canonical: "/pt/lista-virtual/lista-de-convidados" },
        ...socialMetadata("pt", { title, description, path: "/lista-de-convidados" }),
    };
};

export default async function GuestModelsPage({ params }: Params) {
    const { locale } = await params;
    if (locale !== "pt") notFound();

    const content = getListaVirtual("pt");
    const hub = "/pt/lista-virtual/lista-de-convidados";

    return (
        <LvShell
            locale="pt"
            content={content}
            otherHref="/en/lista-virtual"
            campaign={MODELS_CAMPAIGN}
            wrapperClass={`brand-lista ${wittgenstein.variable}`}>
            <section className="shell pb-24 md:pb-36">
                <div className="lv-models-head lv-rise">
                    <h1 className="lv-serif lv-model-title">{MODELS_COPY.hub.h1}</h1>
                    <p className="lv-lead max-w-[30rem]">{MODELS_COPY.hub.lead}</p>
                </div>

                <ul className="lv-models mt-14">
                    {GUEST_MODELS.map((model) => (
                        <li key={model.slug}>
                            <Link href={`${hub}/${model.slug}`} className="lv-models-item">
                                <span className="lv-serif lv-models-name">{model.label}</span>
                                <span className="lv-models-lead">{model.lead}</span>
                                <span className="lv-models-files">{MODELS_COPY.hub.each}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </LvShell>
    );
}
