import Image from "next/image";
import type { Dictionary } from "@/content/dictionary";
import { profile } from "@/content/dictionary";

/**
 * Recorte frontal em resolução cheia. Ele fica no centro e o texto se parte em
 * volta dele: a frase de um lado e do outro da cabeça, o nome atravessando a
 * base. É o entrelace que faz a foto pertencer à composição em vez de parecer
 * colada ao lado do texto.
 */
const FIGURE = "/portrait/hero.66a85884.webp";

/** Atalho para escalonar a entrada sem repetir o objeto de estilo. */
const rise = (delay: number) => ({ "--rise-delay": `${delay}ms` }) as React.CSSProperties;

export const Opening = ({ dict }: { dict: Dictionary }) => {
    // A frase vem partida do dicionário, não cortada por um separador no meio
    // do texto: as duas metades passam uma de cada lado da cabeça.
    const { left, right } = dict.hero.headline;
    const [firstName, ...lastName] = profile.name.split(" ");

    return (
        <>
            {/* Sem overflow-hidden de propósito: a figura precisa passar da
                borda de baixo. O que impede dela cobrir as estatísticas e os
                links não é recorte, é a máscara que a dissolve no fundo. */}
            <section className="relative isolate">
                <div aria-hidden className="stage absolute inset-x-0 -top-10 -bottom-28 -z-30" />

                {/* A âncora é o topo, não a altura, em toda largura de tela.
                    Presa pela base, o quanto a figura subia dependia da altura da
                    janela: no desktop o cabeçalho fixo comia a cabeça acima de
                    ~930px de viewport, e no telefone ela caía 226px abaixo da
                    frase, que então se partia em volta de nada. Presa por `top`,
                    a cabeça fica sempre na altura da frase, e a base continua
                    sangrando pelos mesmos 7rem. */}
                <div
                    aria-hidden
                    style={rise(240)}
                    className="rise pointer-events-none absolute inset-x-0 top-48 -bottom-28 -z-20 mx-auto h-auto w-full max-w-[30rem] sm:top-12 sm:max-w-[36rem] lg:top-8 lg:max-w-[40rem]">
                    <Image
                        src={FIGURE}
                        alt=""
                        fill
                        priority
                        sizes="(max-width: 1024px) 36rem, 40rem"
                        className="figure-photo object-cover object-top"
                    />
                </div>

                <div
                    aria-hidden
                    className="figure-scrim pointer-events-none absolute inset-x-0 -bottom-28 -z-10 h-full"
                />

                <div className="shell relative flex min-h-[88svh] flex-col justify-between gap-12 pt-10 pb-10 md:pt-14">
                    {/* As duas metades só se separam a partir de `sm`. Num telefone
                        não sobra vão entre elas para a cabeça: ela ia parar atrás
                        do texto, com "you the parts" escrito em cima da testa.
                        Empilhadas, a frase é uma só e a figura entra embaixo. */}
                    <div className="mx-auto flex w-full max-w-[54rem] flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                        <p style={rise(0)} className="rise split-line sm:max-w-[7em]">
                            {left}
                        </p>
                        <p style={rise(80)} className="rise split-line sm:max-w-[7em] sm:text-right">
                            {right}
                        </p>
                    </div>

                    {/* Duas colunas empilhadas em vez de elementos soltos: a
                        pílula ancorada em cima do nome, o cargo fechando a
                        direita. Sozinha no meio do vazio ela ficava órfã. */}
                    <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                        <div>
                            <p
                                style={rise(160)}
                                className="rise label mb-5 inline-flex items-center gap-2 rounded-full whitespace-nowrap border border-border bg-bg/70 px-3.5 py-2 text-accent backdrop-blur-sm">
                                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                                {dict.hero.available}
                            </p>

                            <h1 style={rise(240)} className="rise poster">
                                {firstName}
                                <br />
                                {lastName.join(" ")}
                            </h1>
                        </div>

                        {/* Cargo e CV na mesma coluna, e o CV na primeira tela.
                            Antes ele só existia na faixa seguinte, abaixo dos
                            88svh desta seção, o que quer dizer que um
                            recrutador precisava rolar para achar a primeira
                            coisa que ele procura. */}
                        <div className="flex flex-col items-start gap-5 sm:items-end">
                            <p style={rise(300)} className="rise poster-sub text-muted sm:text-right">
                                {dict.hero.role}
                                <br />
                                {dict.hero.location}
                            </p>

                            <a
                                style={rise(360)}
                                href={profile.cv}
                                download
                                className="rise label inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-text transition-colors hover:border-accent hover:text-accent">
                                {dict.cv.label}
                                <span aria-hidden>↓</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* `relative` não é decorativo: a seção acima é posicionada, então sem
                isto ela pintaria por cima desta faixa e o gradiente apagaria o
                texto. */}
            {/* Empilhado, como o resto da página. Era uma linha com
                `justify-between`, e ali os links eram empurrados para a borda
                direita com um vão no meio: ficavam pendurados, sem nada que os
                ancorasse e sem relação visível com os números ao lado. */}
            <div className="shell relative pt-12 pb-12">
                <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
                    {dict.hero.intro}
                </p>

                <dl className="mt-11 grid grid-cols-3 gap-8 sm:max-w-lg">
                    {dict.hero.stats.map((stat) => (
                        <div key={stat.label}>
                            <dt className="num text-2xl text-accent md:text-3xl">{stat.value}</dt>
                            <dd className="margin-note mt-2">{stat.label}</dd>
                        </div>
                    ))}
                </dl>

                <div className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-sm">
                    <a href="#work" className="link-underline hover:text-accent">
                        {dict.hero.ctaWork} ↓
                    </a>
                    <a href={`mailto:${profile.email}`} className="link-underline hover:text-accent">
                        {dict.hero.ctaContact}
                    </a>
                    <a
                        href={profile.github}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="link-underline text-muted hover:text-accent">
                        GitHub
                    </a>
                    <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="link-underline text-muted hover:text-accent">
                        LinkedIn
                    </a>
                </div>
            </div>
        </>
    );
};
