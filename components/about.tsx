import type { Dictionary } from "@/content/dictionary";

export const About = ({ dict }: { dict: Dictionary }) => (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-20">
        <div className="space-y-5">
            {dict.about.body.map((paragraph, i) => (
                <p
                    key={paragraph}
                    data-reveal
                    style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
                    className="leading-relaxed text-muted">
                    {paragraph}
                </p>
            ))}
        </div>

        <aside data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <h3 className="label">{dict.about.educationHeading}</h3>
            <ul className="mt-5 space-y-3">
                {dict.about.education.map((item) => (
                    <li
                        key={item.course}
                        className="card card-lift rounded-xl border border-border p-4">
                        <p className="text-sm font-medium tracking-tight">{item.course}</p>
                        <p className="mt-1 text-sm text-muted">{item.school}</p>
                        <p className="label mt-2">{item.period}</p>
                    </li>
                ))}
            </ul>
        </aside>
    </div>
);

export const Skills = ({ dict }: { dict: Dictionary }) => (
    <div className="grid gap-8 sm:grid-cols-3">
        {dict.skills.groups.map((group, i) => (
            <div
                key={group.label}
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
                className="card card-lift rounded-xl border border-border p-5">
                <h3 className="label text-accent">{group.label}</h3>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                        <li
                            key={item}
                            className="rounded-md border border-border bg-surface px-2 py-1 font-mono text-[0.6875rem] text-muted">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        ))}
    </div>
);
