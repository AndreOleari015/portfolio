import type { Dictionary } from "@/content/dictionary";

/**
 * Sem fios entre os cargos: quem separa um do outro é o período, em mono, na
 * margem. O fio só repetiria a informação que a data já dá.
 *
 * A margem agora encosta na borda direita do `shell`: presa em 15rem ela
 * parava no meio da página e deixava 400px mortos à direita de cada cargo.
 * O nome da empresa saiu do azul: acento é para marca, § e link, e um nome em
 * azul que não é clicável é promessa quebrada três vezes na mesma página.
 *
 * Os cargos de antes do desenvolvimento em tempo integral vêm depois, numa
 * linha cada, na mesma grade de margem. Estão no LinkedIn e explicam a linha
 * do tempo; com destaques e corpo de cargo eles pesariam tanto quanto a
 * Pixel Logic numa página que é de mobile.
 */
export const Experience = ({ dict }: { dict: Dictionary }) => (
    <>
        <ol className="space-y-14 md:space-y-16">
            {dict.experience.jobs.map((job, i) => (
                <li
                    key={`${job.company}-${job.period}`}
                    data-reveal
                    style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
                    className="doc">
                    <div className="measure-wide">
                        <p className="label text-accent">{job.company}</p>
                        <h3 className="subhead mt-2.5">{job.role}</h3>

                        {job.summary ? (
                            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{job.summary}</p>
                        ) : null}

                        {job.bullets.length ? (
                            <ul className="mt-5 space-y-2">
                                {job.bullets.map((bullet) => (
                                    <li
                                        key={bullet}
                                        className="relative pl-5 text-[0.9375rem] leading-relaxed text-muted before:absolute before:top-[0.7em] before:left-0 before:size-1 before:rounded-full before:bg-border-strong">
                                        {bullet}
                                    </li>
                                ))}
                            </ul>
                        ) : null}

                        {job.apps ? (
                            <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                <span className="label">{job.apps.label}</span>
                                <span className="font-mono text-xs leading-relaxed text-muted">
                                    {job.apps.items.join("  ·  ")}
                                </span>
                            </p>
                        ) : null}
                    </div>

                    <p className="margin-note lg:pt-1.5 lg:text-right">
                        {job.period}
                        <br />
                        {job.location}
                    </p>
                </li>
            ))}
        </ol>

        <div data-reveal className="mt-16 md:mt-20">
            <p className="label">{dict.experience.earlier.label}</p>

            <ol className="mt-7 space-y-7">
                {dict.experience.earlier.jobs.map((job) => (
                    <li key={`${job.company}-${job.period}`} className="doc">
                        <div className="measure-wide">
                            <p className="text-[0.9375rem] leading-snug">
                                {job.company}
                                <span className="text-faint"> · </span>
                                {job.role}
                            </p>
                            <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{job.summary}</p>
                        </div>

                        <p className="margin-note lg:text-right">
                            {job.period}
                            <br />
                            {job.location}
                        </p>
                    </li>
                ))}
            </ol>
        </div>
    </>
);
