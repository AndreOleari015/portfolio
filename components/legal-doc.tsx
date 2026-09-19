import type { LegalDoc } from "@/content/product-radar";

/** Renderiza política de privacidade e termos, que têm a mesma estrutura. */
export const LegalDocument = ({ doc }: { doc: LegalDoc }) => (
    <article className="max-w-3xl">
        <p className="label">{doc.updated}</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            {doc.title}
        </h1>
        <p className="mt-6 text-lg text-muted">{doc.intro}</p>

        <div className="mt-14 flex flex-col gap-12">
            {doc.sections.map((section) => (
                <section key={section.heading}>
                    <h2 className="text-lg font-semibold tracking-tight">{section.heading}</h2>

                    {section.body?.map((paragraph) => (
                        <p key={paragraph} className="mt-4 text-muted">
                            {paragraph}
                        </p>
                    ))}

                    {section.bullets ? (
                        <ul className="mt-4 flex flex-col gap-3">
                            {section.bullets.map((bullet) => (
                                <li
                                    key={bullet}
                                    className="border-l border-border pl-4 text-muted">
                                    {bullet}
                                </li>
                            ))}
                        </ul>
                    ) : null}
                </section>
            ))}
        </div>
    </article>
);
