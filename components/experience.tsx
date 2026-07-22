import type { Dictionary } from "@/content/dictionary";

export const Experience = ({ dict }: { dict: Dictionary }) => (
    <>
        <ol className="relative space-y-10 pl-7 md:pl-10">
            {/* Trilho da linha do tempo, esmaecendo no fim */}
            <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-border-strong via-border to-transparent"
            />

            {dict.experience.jobs.map((job, i) => (
                <li
                    key={`${job.company}-${job.period}`}
                    data-reveal
                    style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
                    className="relative">
                    <span
                        aria-hidden
                        className="timeline-dot absolute top-2 -left-7 size-2 rounded-full bg-accent ring-4 ring-bg md:-left-10"
                    />

                    <div className="card card-lift rounded-xl border border-border p-5 md:p-6">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                            <h3 className="font-semibold tracking-tight">
                                {job.role}
                                <span className="text-faint"> · </span>
                                <span className="font-normal text-muted">{job.company}</span>
                            </h3>
                            <p className="label">
                                {job.period} <span className="text-border-strong">/</span>{" "}
                                {job.location}
                            </p>
                        </div>

                        <ul className="mt-4 space-y-2.5">
                            {job.bullets.map((bullet) => (
                                <li
                                    key={bullet}
                                    className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:top-[0.6875em] before:left-0 before:size-1 before:rounded-full before:bg-border-strong">
                                    {bullet}
                                </li>
                            ))}
                        </ul>

                        {job.apps ? (
                            <div className="mt-6 border-t border-border pt-5">
                                <h4 className="label">{job.apps.label}</h4>
                                <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                                    {job.apps.items.map((app) => {
                                        const [name, ...rest] = app.split(" — ");
                                        return (
                                            <li key={app} className="text-sm text-muted">
                                                <span className="text-text">{name}</span>
                                                {rest.length ? (
                                                    <span className="text-faint"> — {rest.join(" — ")}</span>
                                                ) : null}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ) : null}
                    </div>
                </li>
            ))}
        </ol>

        <p
            data-reveal
            className="mt-12 max-w-2xl border-l-2 border-accent/40 pl-5 text-sm leading-relaxed text-muted italic">
            {dict.experience.earlierNote}
        </p>
    </>
);
