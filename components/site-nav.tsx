"use client";

import { useEffect, useState } from "react";

type NavLink = { href: string; label: string };

/**
 * Navegação com seção ativa e barra de progresso da leitura.
 * Um único listener de scroll com rAF para não disparar layout a cada pixel.
 */
export const SiteNav = ({ links }: { links: NavLink[] }) => {
    const [active, setActive] = useState<string>("");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let frame = 0;

        const onScroll = () => {
            if (frame) return;
            frame = window.requestAnimationFrame(() => {
                frame = 0;
                const scrollable = document.documentElement.scrollHeight - window.innerHeight;
                setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
            });
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (frame) window.cancelAnimationFrame(frame);
        };
    }, []);

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
        <>
            <ul className="hidden items-center gap-0.5 md:flex">
                {links.map((link) => {
                    const isActive = active === link.href;
                    return (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                aria-current={isActive ? "true" : undefined}
                                className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                                    isActive ? "text-text" : "text-muted hover:text-text"
                                }`}>
                                {link.label}
                                <span
                                    aria-hidden
                                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300 ${
                                        isActive ? "scale-x-100" : "scale-x-0"
                                    }`}
                                />
                            </a>
                        </li>
                    );
                })}
            </ul>

            <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px overflow-hidden bg-transparent">
                <div
                    className="progress-bar h-full w-full"
                    style={{ transform: `scaleX(${progress})` }}
                />
            </div>
        </>
    );
};
