import Image from "next/image";
import type { Project } from "@/content/dictionary";

const ArrowUpRight = () => (
    <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="size-3.5 shrink-0 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M5 11L11 5M11 5H6M11 5v5" />
    </svg>
);

/**
 * Tira de screenshots. Rola na horizontal no telefone, vira grade no desktop.
 * "phone" = retrato, três por linha. "wide" = captura de tela larga, duas por linha.
 */
const Shots = ({
    shots,
    media,
    priority,
}: {
    shots: NonNullable<Project["shots"]>;
    media: Project["media"];
    priority: boolean;
}) => {
    const wide = media === "wide";

    return (
        <ul
            className={`-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-3 md:mx-0 md:grid md:gap-4 md:overflow-visible md:px-0 ${
                wide ? "md:max-w-4xl md:grid-cols-2" : "md:max-w-3xl md:grid-cols-3"
            }`}>
            {shots.map((shot, i) => (
                <li
                    key={shot.src}
                    data-reveal
                    style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
                    className={`shrink-0 snap-start md:w-auto ${wide ? "w-[88%]" : "w-[62%]"}`}>
                    <div className="shot overflow-hidden rounded-xl border border-border shadow-soft">
                        <Image
                            src={shot.src}
                            alt={shot.alt}
                            width={wide ? 1440 : 720}
                            height={wide ? 712 : 1565}
                            priority={priority && i === 0}
                            sizes={
                                wide
                                    ? "(max-width: 768px) 88vw, 28rem"
                                    : "(max-width: 768px) 62vw, 16rem"
                            }
                            className="h-auto w-full"
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
};

/**
 * Ordem deliberada: nome, depois imagem, depois os detalhes.
 * O cabeçalho fica fora da grade — se a tira de screenshots virasse uma segunda
 * linha da grade, ela passaria por baixo da coluna sticky.
 */
const ProjectBlock = ({ project, index }: { project: Project; index: number }) => (
    <article>
        <div data-reveal className="max-w-3xl">
            <div className="flex items-baseline gap-3">
                <span className="label text-accent">{String(index + 1).padStart(2, "0")}</span>
                <span aria-hidden className="h-px w-6 bg-border-strong" />
                <span className="label">{project.year}</span>
            </div>

            <h3 className="mt-3 text-xl font-semibold tracking-tight text-balance md:text-2xl">
                {project.name}
            </h3>
            <p className="mt-2 text-sm text-accent">{project.tagline}</p>
        </div>

        {project.shots && project.shots.length > 0 && (
            <div className="mt-8">
                <Shots shots={project.shots} media={project.media} priority={index === 0} />
            </div>
        )}

        <div className="mt-10 grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
            {/* Coluna esquerda — o resumo e por onde se entra no projeto */}
            <div data-reveal className="lg:sticky lg:top-24 lg:self-start">
                <p className="leading-relaxed text-muted">{project.summary}</p>

                <ul className="mt-6 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                        <li
                            key={tech}
                            className="rounded-md border border-border bg-surface px-2 py-1 font-mono text-[0.6875rem] text-muted transition-colors hover:border-border-strong hover:text-text">
                            {tech}
                        </li>
                    ))}
                </ul>

                {project.links.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                        {project.links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="btn-ghost group/link inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium hover:border-accent hover:text-accent">
                                {link.label}
                                <ArrowUpRight />
                            </a>
                        ))}
                    </div>
                )}

                {project.note && (
                    <p className={`label ${project.links.length > 0 ? "mt-4" : "mt-6"}`}>
                        {project.note}
                    </p>
                )}
            </div>

            {/* Coluna direita — os detalhes técnicos, que é o que interessa a quem avalia */}
            <ul className="space-y-3">
                {project.highlights.map((item, i) => (
                    <li
                        key={item.title}
                        data-reveal
                        style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
                        <div className="card card-lift group/card rounded-xl border border-border p-5 md:p-6">
                            <div className="flex items-start gap-3">
                                <span
                                    aria-hidden
                                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-border-strong transition-colors duration-300 group-hover/card:bg-accent"
                                />
                                <div>
                                    <h4 className="font-medium tracking-tight">{item.title}</h4>
                                    <p className="mt-2 text-sm leading-relaxed text-muted">
                                        {item.body}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </article>
);

export const ProjectList = ({ projects }: { projects: Project[] }) => (
    <div className="space-y-24 md:space-y-32">
        {projects.map((project, index) => (
            <ProjectBlock key={project.slug} project={project} index={index} />
        ))}
    </div>
);
