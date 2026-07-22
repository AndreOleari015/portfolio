"use client";

import { useEffect } from "react";

/**
 * Observa tudo que tem [data-reveal] e marca como visível ao entrar na tela.
 * Fica solto no layout para que os componentes de servidor continuem sendo de
 * servidor — eles só precisam declarar o atributo.
 */
export const Motion = () => {
    useEffect(() => {
        const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
        const revealAll = () => nodes.forEach((node) => (node.dataset.visible = "true"));

        if (!("IntersectionObserver" in window)) {
            revealAll();
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    (entry.target as HTMLElement).dataset.visible = "true";
                    observer.unobserve(entry.target);
                }
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
        );

        nodes.forEach((node) => observer.observe(node));

        // Rede de segurança: se algo der errado, o conteúdo não fica invisível.
        const failsafe = window.setTimeout(revealAll, 4000);

        return () => {
            observer.disconnect();
            window.clearTimeout(failsafe);
        };
    }, []);

    return null;
};
