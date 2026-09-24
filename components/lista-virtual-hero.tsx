"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { TELA } from "@/components/phone";
import type { HeroNote, HeroSlide, Proof, Trust } from "@/content/lista-virtual";

/**
 * O palco do hero, na forma da VoltPeak: um telefone em pé, o anel da marca
 * atrás dele com três pontos, e dois fios finos ligando pontos da tela aos
 * cartões da coluna da direita. No alto dessa coluna, no lugar do bloco de
 * confiança da OKX, um número real de uso que muda junto com a tela, e a nota
 * da loja embaixo.
 *
 * Três slides se alternam: a entrada (o QR do convidado), a portaria ao vivo
 * (a lista com os check-ins) e o resultado (o relatório). Tela, pontos, fios,
 * o texto dos dois cartões e o número de uso trocam juntos, no mesmo relógio.
 * Cada número conversa com a sua tela: convidados com o convite, check-ins com
 * a lista, eventos com o relatório.
 *
 * O relógio não pausa com o mouse: quem olha o telefone deixa o mouse em cima
 * dele, e a troca parecia travada. Em vez de pausa, três barrinhas embaixo do
 * telefone mostram que está andando (a atual enche até a troca) e deixam
 * escolher a tela; escolher reinicia a contagem. Com movimento reduzido não
 * troca sozinho, só pelas barrinhas. Sem JavaScript, fica o primeiro slide.
 *
 * O texto não cruza: o que sai some primeiro e só depois o novo aparece
 * (`.lv-swap` no CSS). Só a tela cruza, porque imagem sobre imagem não
 * embaralha.
 */

const SLIDE_MS = 5500;

/**
 * Geometria do palco no desktop largo, a mesma do CSS: palco de 350 por 620,
 * telefone de 240 por 490.5 centrado nele, cartões centrados em 280 e 448,
 * coluna dos cartões começando em 374.
 */
const STAGE = { phoneX: 55, phoneY: 64.75, phoneW: 240, phoneH: 490.5, bendX: 311, cardX: 374, cardY: [280, 448] };

/**
 * O fio sai do ponto na horizontal até passar da borda do telefone, e só lá
 * fora dobra até o cartão. Em diagonal direta ele riscava a tela por cima do
 * conteúdo que está anotando.
 */
const wire = (note: HeroNote, index: number) => {
    const x = STAGE.phoneX + (note.x / 100) * STAGE.phoneW;
    const y = STAGE.phoneY + (note.y / 100) * STAGE.phoneH;
    return `M${x.toFixed(1)} ${y.toFixed(1)}H${STAGE.bendX}L${STAGE.cardX} ${STAGE.cardY[index]}`;
};

/* Estrela de cinco pontas com as quinas suaves, no desenho da `star.fill` das
   SF Symbols que o app usa. */
const STAR = "M12 2.6 14.85 8.4l6.35.93-4.6 4.48 1.09 6.33L12 17.15l-5.69 2.99 1.09-6.33-4.6-4.48 6.35-.93z";

/**
 * A nota da loja em estrelas de latão. Duas fileiras sobrepostas: a de baixo
 * apagada, a de cima em latão recortada na proporção da nota (4,5 de 5 enche
 * 90%), então a última estrela sai partida no ponto exato. Nada de "★" de
 * texto: ele sai na fonte do sistema e parece emoji.
 */
const Stars = ({ rating }: { rating: string }) => {
    // O id entra em `url(#...)`: fica só com o que é seguro numa referência.
    const id = `lv-stars${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
    const value = Math.max(0, Math.min(5, Number(rating.replace(",", "."))));
    const width = 5 * 24 + 4 * 4;

    return (
        <svg className="lv-stars" viewBox={`0 0 ${width} 24`} aria-hidden>
            <defs>
                <linearGradient id={`${id}-brass`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#eed48c" />
                    <stop offset="0.55" stopColor="#e0bd5a" />
                    <stop offset="1" stopColor="#b3861f" />
                </linearGradient>
                <clipPath id={`${id}-fill`}>
                    <rect x="0" y="0" width={(width * value) / 5} height="24" />
                </clipPath>
                <g id={`${id}-row`}>
                    {[0, 1, 2, 3, 4].map((i) => (
                        <path key={i} d={STAR} transform={`translate(${i * 28} 0)`} strokeLinejoin="round" />
                    ))}
                </g>
            </defs>
            <use href={`#${id}-row`} className="lv-stars-off" />
            <use
                href={`#${id}-row`}
                fill={`url(#${id}-brass)`}
                stroke={`url(#${id}-brass)`}
                clipPath={`url(#${id}-fill)`}
            />
        </svg>
    );
};

export const LvHeroStage = ({
    slides,
    trust,
    proofs,
}: {
    slides: HeroSlide[];
    trust: Trust;
    proofs: Proof[];
}) => {
    const [active, setActive] = useState(0);
    const proof = proofs.length > 0 ? active % proofs.length : 0;

    /* Um `setTimeout` por slide, e não um `setInterval`: escolher uma tela
       pelas barrinhas reinicia a contagem, e a barrinha enche no mesmo tempo. */
    useEffect(() => {
        if (slides.length < 2) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const timer = window.setTimeout(() => setActive((i) => (i + 1) % slides.length), SLIDE_MS);
        return () => window.clearTimeout(timer);
    }, [active, slides.length]);

    return (
        <div className="lv-hero-stage" style={{ "--slide-ms": `${SLIDE_MS}ms` } as React.CSSProperties}>
            <div className="lv-stage">
                <div className="lv-ring" aria-hidden>
                    <i />
                    <i />
                    <i />
                </div>
                <svg viewBox="0 0 24 24" className="lv-sparkle lv-float lv-sparkle-a" aria-hidden>
                    <path d="M12 0c.6 6.4 5 11.2 12 12-7 .8-11.4 5.6-12 12-.6-6.4-5-11.2-12-12 7-.8 11.4-5.6 12-12Z" />
                </svg>
                <svg viewBox="0 0 24 24" className="lv-sparkle lv-float lv-float-late lv-sparkle-b" aria-hidden>
                    <path d="M12 0c.6 6.4 5 11.2 12 12-7 .8-11.4 5.6-12 12-.6-6.4-5-11.2-12-12 7-.8 11.4-5.6 12-12Z" />
                </svg>

                <div className="lv-stage-phone">
                    <div className="relative aspect-[1008/2060] w-full">
                        <div className="absolute overflow-hidden rounded-[12%/5.6%]" style={TELA}>
                            {slides.map((item, i) => (
                                <Image
                                    key={item.screen.src}
                                    src={item.screen.src}
                                    alt={item.screen.alt}
                                    fill
                                    sizes="(min-width: 1180px) 240px, 200px"
                                    className="lv-slide object-cover object-top"
                                    data-active={i === active}
                                    aria-hidden={i !== active}
                                    {...(i === 0 ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
                                />
                            ))}
                        </div>
                        {/* A moldura é o maior elemento da primeira dobra (o LCP), então
                            carrega com prioridade, como a primeira tela. Vai com
                            medida fixa, e não `fill`: com `fill` o endereço de reserva
                            dela é o mesmo das molduras das abas, que são `lazy`, e o
                            aviso de LCP do Next (que acha a imagem pelo endereço) pegava
                            a errada. */}
                        <Image
                            src="/molde.png"
                            alt=""
                            aria-hidden
                            width={240}
                            height={490}
                            loading="eager"
                            fetchPriority="high"
                            className="molde pointer-events-none absolute inset-0 h-full w-full object-contain"
                        />
                        {slides.map((item, i) => (
                            <span key={item.screen.src} className="lv-dots lv-swap" data-active={i === active} aria-hidden>
                                {item.notes.map((note, j) => (
                                    <span
                                        key={note.title}
                                        className="lv-dot"
                                        style={{ left: `${note.x}%`, top: `${note.y}%` }}>
                                        <b>{j + 1}</b>
                                    </span>
                                ))}
                            </span>
                        ))}
                    </div>
                </div>

                <svg className="lv-lines" viewBox="0 0 620 620" aria-hidden>
                    {slides.map((item, i) => (
                        <g key={item.screen.src} className="lv-swap" data-active={i === active}>
                            {item.notes.map((note, j) => (
                                <path key={note.title} d={wire(note, j)} />
                            ))}
                        </g>
                    ))}
                </svg>

                {/* A barrinha ativa ganha um miolo novo a cada troca (`key`),
                    e é isso que faz a animação de encher recomeçar do zero. */}
                <div className="lv-progress">
                    {slides.map((item, i) => (
                        <button
                            key={item.screen.src}
                            type="button"
                            aria-label={item.notes[0].title}
                            aria-pressed={i === active}
                            onClick={() => setActive(i)}>
                            <span key={i === active ? `on-${active}` : "off"} />
                        </button>
                    ))}
                </div>
            </div>

            <aside className="lv-side">
                {/* O número de uso é o destaque do bloco; a nota da loja vem
                    embaixo, com as estrelas em latão. */}
                <div className="lv-trust">
                    <div className="lv-stack">
                        {proofs.map((item, i) => (
                            <p key={item.value} className="lv-swap lv-proof" data-active={i === proof} aria-hidden={i !== proof}>
                                <strong className="lv-serif">{item.value}</strong>
                                <span>{item.label}</span>
                            </p>
                        ))}
                    </div>
                    <div className="lv-rating">
                        <div className="lv-rating-row">
                            <strong className="lv-serif">{trust.rating}</strong>
                            <Stars rating={trust.rating} />
                        </div>
                        <p className="lv-rating-label">{trust.ratingLabel}</p>
                    </div>
                </div>

                {/* Moldura fixa, texto que troca: o contorno do cartão não pisca
                    entre um slide e outro, e ele tem a altura do texto mais
                    alto dos três, então não pula. */}
                {[0, 1].map((j) => (
                    <div key={j} className={`lv-note lv-note-${j + 1}`}>
                        <div className="lv-stack">
                            {slides.map((item, i) => (
                                <div
                                    key={item.screen.src}
                                    className="lv-swap"
                                    data-active={i === active}
                                    aria-hidden={i !== active}>
                                    <p className="lv-note-title">
                                        <i aria-hidden>{j + 1}</i>
                                        {item.notes[j].title}
                                    </p>
                                    <p className="lv-note-body">{item.notes[j].body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </aside>
        </div>
    );
};
