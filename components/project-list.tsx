import Image from "next/image";
import { Counter } from "@/components/counter";
import { Phone } from "@/components/phone";
import type { Project } from "@/content/dictionary";

const ArrowUpRight = () => (
    <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="size-3 shrink-0 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M5 11L11 5M11 5H6M11 5v5" />
    </svg>
);

const pad = (n: number) => String(n).padStart(2, "0");

/** Uma volta completa da alternância no telefone, em segundos. Três telas,
 *  quatro segundos cada. Está aqui e no `@keyframes alterna` do CSS, e os
 *  dois têm que concordar. */
const CICLO = 12;

/**
 * A figura de um projeto: as telas do app, com o nome de cada uma embaixo.
 *
 * **Duas formas, e o mesmo HTML.** No desktop as molduras ficam lado a lado.
 * No telefone não cabem: três delas em 355px dariam 108px cada, e antes disso
 * a fileira rolava na horizontal, o que o André achou ruim com razão, porque
 * pede um gesto para ver o que devia estar à vista. Então lá elas empilham na
 * mesma célula e se alternam sozinhas.
 *
 * A troca é CSS puro, `@keyframes alterna` com `animation-delay` escalonado.
 * Não voltou o estado nem o `"use client"`: o que muda entre as duas larguras
 * é só o `display` da pilha, `contents` acima de `lg` e `grid` abaixo.
 *
 * **O relógio vai por último no desktop e sobreposto no telefone.** Ele é a
 * superfície que espelha as outras, então não abre a fileira; e no telefone,
 * onde só há uma moldura por vez, ele encosta no canto de baixo dela, que é
 * como os dois aparelhos aparecem juntos na vida real.
 */
const Figura = ({ shot }: { shot: NonNullable<Project["shot"]> }) => (
    <figure data-reveal className="fileira mt-12 md:mt-14">
        <div className="pilha">
            {shot.screens.map((tela, i) => (
                <div
                    key={tela.src}
                    style={{ animationDelay: `${(i * CICLO) / shot.screens.length}s` }}
                    className="tela-item w-[13.5rem] shrink-0 lg:w-[16rem]">
                    {/* A moldura e o rótulo têm tempos diferentes de propósito.
                        A moldura atravessa, porque imagem cruzando com imagem é
                        suave; o rótulo troca em degrau, porque texto cruzando
                        com texto vira borrão ilegível por meio segundo. */}
                    <div className="tela-moldura">
                        <Phone
                            src={tela.src}
                            alt={`${shot.alt}: ${tela.label}`}
                            sizes="(max-width: 1024px) 13.5rem, 16rem"
                        />
                    </div>
                    <p className="tela-rotulo label mt-4 text-center">{tela.label}</p>
                </div>
            ))}
        </div>

        {/* `self-stretch` porque a fileira alinha pelo topo: sem ele o item do
            relógio tem a altura do relógio, e o rótulo dele sobe para o meio da
            figura em vez de ficar na linha dos outros. */}
        {shot.watch && (
            <div className="relogio-item flex w-[8rem] shrink-0 flex-col justify-end self-stretch lg:w-[11rem]">
                <Image
                    src={shot.watch.src}
                    alt={shot.watch.alt}
                    width={666}
                    height={907}
                    sizes="(max-width: 1024px) 8rem, 11rem"
                    className="relogio h-auto w-full"
                />
                <p className="label mt-4 hidden text-center lg:block">{shot.watch.label}</p>
            </div>
        )}
    </figure>
);

/**
 * Um projeto: cabeçalho em cima, problemas embaixo.
 *
 * Texto e tela alinhados pelo topo, numa grade de duas colunas. A tela tem
 * largura fixa e é empurrada para fora pela margem, então a coluna encolhe
 * sozinha e a linha fica com a altura do mais alto dos dois. Foi assim que
 * morreu o buraco de 500px: ele vinha de uma caixa de altura fixa ao lado de
 * um texto de altura variável, e antes disso de tentar alinhar os dois pela
 * base, o que só mudava o buraco de lugar.
 *
 * A numeração dos § é contínua e atravessa os projetos: ela conta os problemas
 * do site, não os do projeto.
 */
const ProjectBlock = ({
    project,
    index,
    total,
    startMark,
}: {
    project: Project;
    index: number;
    total: number;
    startMark: number;
}) => {
    return (
        <article>
            {/* Uma coluna só, na ordem em que se lê: nome, o que é, com que
                foi feito, o que faz, onde ver. Os metadados viviam numa margem
                à direita, e ali a linha de stack embrulhava em quatro linhas
                estreitas e os links empilhavam num bloco separado do texto que
                eles pertencem. */}
            <div data-reveal>
                <p className="label">
                    <Counter at={index + 1} of={total} />
                </p>

                <h3 className="title mt-4">{project.name}</h3>
                <p className="title-sub mt-2.5">{project.tagline}</p>

                {/* A stack vem antes da descrição: ela diz com o que foi feito,
                    que é a pergunta que vem logo depois de o que é. Sem
                    `measure-wide`, ao contrário do resumo: ela é metadado que se
                    varre, não prosa que se lê, e em 44rem quebrava em duas
                    linhas à toa. */}
                <p className="margin-note mt-5">
                    {project.year} · {project.stack.join(" · ")}
                </p>

                <p className="measure-wide mt-6 text-muted">{project.summary}</p>

                {/* Em linha, e não empilhados. Eles empilharam enquanto viviam
                    numa margem de 14rem, onde embrulhavam em dois em cima e um
                    embaixo; na coluna cheia os três somam menos de 400px e
                    cabem numa linha só. */}
                {(project.links.length > 0 || project.note) && (
                    <ul className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-2.5">
                        {project.links.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="group/link inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent">
                                    {link.label}
                                    <ArrowUpRight />
                                </a>
                            </li>
                        ))}
                        {project.note && <li className="label">{project.note}</li>}
                    </ul>
                )}
            </div>

            {project.shot && <Figura shot={project.shot} />}

            {/* Dois por linha, com o § pendurado na margem. O corpo de cada
                problema cabe numa frase, e em coluna única a metade direita da
                página ficava vazia ao lado dela. */}
            <ol className="mt-16 grid gap-x-14 gap-y-9 md:mt-20 lg:grid-cols-2">
                {project.highlights.map((item, i) => {
                    const mark = startMark + i + 1;
                    return (
                        <li
                            key={item.title}
                            id={`s-${mark}`}
                            data-reveal
                            className="grid scroll-mt-28 grid-cols-[2.75rem_minmax(0,1fr)]">
                            <p className="section-mark pt-[0.45em]">§{pad(mark)}</p>
                            <div>
                                <h4 className="problem">{item.title}</h4>
                                <p className="mt-2 text-[0.9375rem] text-muted">{item.body}</p>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </article>
    );
};

/**
 * A numeração dos § é contínua e atravessa os projetos: ela diz quantos
 * problemas o site tem, não quantos aquele projeto tem. Calculada por soma dos
 * anteriores, porque um contador mutável aqui é reatribuição depois do render
 * e o compilador do React reprova com razão. As figuras contam à parte, já que
 * nem todo projeto tem uma.
 */
export const ProjectList = ({ projects }: { projects: Project[] }) => {
    const startMarks = projects.map((_, index) =>
        projects.slice(0, index).reduce((total, project) => total + project.highlights.length, 0),
    );

    // O `space-y` anda junto com o `py` de `Section`: a quebra de capítulo
    // tem que ser maior que a de projeto, senão a hierarquia inverte.
    return (
        <div className="space-y-20 md:space-y-22">
            {projects.map((project, index) => (
                <ProjectBlock
                    key={project.slug}
                    project={project}
                    index={index}
                    total={projects.length}
                    startMark={startMarks[index]}
                />
            ))}
        </div>
    );
};
