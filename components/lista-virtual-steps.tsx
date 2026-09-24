"use client";

import { useRef, useState } from "react";
import { Phone } from "@/components/phone";
import type { Step } from "@/content/lista-virtual";

/**
 * O "como funciona" em abas, na forma do painel de recursos da OKX: os passos
 * numa lista à esquerda, o ativo aceso, e à direita a tela real do passo no
 * molde, com o texto e as etiquetas.
 *
 * Um HTML só para as duas larguras, como as figuras do portfólio. No desktop a
 * lista escolhe o passo e só o painel ativo aparece. No telefone a lista some e
 * os quatro painéis ficam em sequência, cada um com o próprio título: aba em
 * tela estreita esconde conteúdo atrás de toque, e aqui são só quatro passos.
 *
 * Os botões usam `aria-pressed` e não o padrão de abas do ARIA: no telefone a
 * lista não existe, e painel com `role="tabpanel"` sem aba nenhuma confunde o
 * leitor de tela. As setas movem a escolha, como numa lista de abas.
 */
export const LvSteps = ({ steps }: { steps: Step[] }) => {
    const [active, setActive] = useState(0);
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);

    const move = (to: number) => {
        const next = (to + steps.length) % steps.length;
        setActive(next);
        buttons.current[next]?.focus();
    };

    const onKeyDown = (event: React.KeyboardEvent, index: number) => {
        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            event.preventDefault();
            move(index + 1);
        } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(index - 1);
        }
    };

    return (
        <div className="lv-steps">
            <ol className="lv-steps-list">
                {steps.map((step, i) => (
                    <li key={step.title}>
                        <button
                            ref={(node) => {
                                buttons.current[i] = node;
                            }}
                            type="button"
                            aria-pressed={i === active}
                            aria-controls={`lv-step-${i}`}
                            onClick={() => setActive(i)}
                            onKeyDown={(event) => onKeyDown(event, i)}>
                            <span className="lv-steps-num" aria-hidden>
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="lv-serif">{step.title}</span>
                        </button>
                    </li>
                ))}
            </ol>

            <div className="lv-steps-panels">
                {steps.map((step, i) => (
                    <div key={step.title} id={`lv-step-${i}`} className="lv-step" data-active={i === active}>
                        <div className="lv-step-copy">
                            <p className="lv-steps-num" aria-hidden>
                                {String(i + 1).padStart(2, "0")}
                            </p>
                            <h3 className="lv-serif lv-step-title">{step.title}</h3>
                            <p className="lv-step-body">{step.body}</p>
                            <ul className="lv-tags">
                                {step.tags.map((tag) => (
                                    <li key={tag}>{tag}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="lv-step-phone">
                            <Phone src={step.screen.src} alt={step.screen.alt} sizes="(min-width: 1024px) 260px, 62vw" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
