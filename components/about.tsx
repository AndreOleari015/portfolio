import type { Dictionary } from "@/content/dictionary";

export const About = ({ dict }: { dict: Dictionary }) => (
    <div className="doc">
        <div className="measure-wide space-y-5">
            {dict.about.body.map((paragraph, i) => (
                <p
                    key={paragraph}
                    data-reveal
                    style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
                    className="lead text-muted">
                    {paragraph}
                </p>
            ))}
        </div>

        <div
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="lg:pt-1.5">
            <p className="label text-accent">{dict.about.educationHeading}</p>
            <dl className="mt-4 space-y-5">
                {dict.about.education.map((item) => (
                    <div key={item.course}>
                        <dt className="text-[0.9375rem] leading-snug">{item.course}</dt>
                        <dd className="margin-note mt-1.5">
                            {item.school}
                            <br />
                            {item.period}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    </div>
);

/**
 * Competências: rótulo em acento, itens em mono. Sem fios, porque o rótulo já marca
 * onde um grupo termina e o outro começa.
 *
 * Em quatro linhas de ponta a ponta, isto era a única coisa da página a usar a
 * largura toda, e é o conteúdo menos importante dela. Em dois por linha, com
 * medida curta, ele volta para o lugar que merece.
 */
export const Skills = ({ dict }: { dict: Dictionary }) => (
    <dl className="grid gap-x-14 gap-y-8 sm:grid-cols-2">
        {dict.skills.groups.map((group, i) => (
            <div
                key={group.label}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
                <dt className="label text-accent">{group.label}</dt>
                <dd className="mt-2.5 font-mono text-[0.8125rem] leading-relaxed text-muted">
                    {group.items.join("  ·  ")}
                </dd>
            </div>
        ))}
    </dl>
);
