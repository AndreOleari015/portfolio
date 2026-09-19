"use client";

import { useEffect, useState } from "react";

type NavLink = { href: string; label: string };

/**
 * Navegação numerada, com a seção ativa sublinhada.
 *
 * Os números são os mesmos `01..04` que abrem cada seção. Eles existem para o
 * leitor saber de relance que a página tem quatro partes e em qual delas está,
 * que é o que faltava para ela ter começo, meio e fim.
 *
 * Sem barra de progresso: ela era a última linha horizontal do site, e no fim
 * da página ficava de ponta a ponta, a mesma divisória que todo o resto
 * perdeu. Quem diz onde se está é o sublinhado do item ativo, que tem a
 * largura da palavra e não a da janela.
 *
 * O cabeçalho monta este componente duas vezes, uma para cada largura, porque
 * no telefone a navegação vai para uma segunda linha e CSS não muda um
 * elemento de lugar no DOM. São dois observadores em quatro seções, que não
 * custa nada, e o preço alternativo seria içar o estado para fora por uma
 * economia que ninguém mede.
 */
export const SiteNav = ({ links, className }: { links: NavLink[]; className: string }) => {
    const [active, setActive] = useState<string>("");

    useEffect(() => {
        const sections = links
            .map(({ href }) => document.getElementById(href.slice(1)))
            .filter((el): el is HTMLElement => el !== null);

        if (!sections.length || !("IntersectionObserver" in window)) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActive(`#${visible[0].target.id}`);
            },
            { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, [links]);

    return (
        <ul className={`items-center ${className}`}>
            {links.map((link, index) => {
                const isActive = active === link.href;
                return (
                    <li key={link.href}>
                        <a
                            href={link.href}
                            aria-current={isActive ? "true" : undefined}
                            className={`relative px-1 py-2 font-mono text-xs transition-colors md:px-2.5 ${
                                isActive ? "text-text" : "text-muted hover:text-text"
                            }`}>
                            <span
                                aria-hidden
                                className={`mr-1.5 tabular-nums ${
                                    isActive ? "text-accent" : "text-faint"
                                }`}>
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            {link.label}
                            <span
                                aria-hidden
                                className={`absolute inset-x-1 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300 md:inset-x-2.5 ${
                                    isActive ? "scale-x-100" : "scale-x-0"
                                }`}
                            />
                        </a>
                    </li>
                );
            })}
        </ul>
    );
};
