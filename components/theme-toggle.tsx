"use client";

/**
 * Alterna claro/escuro. Qual ícone aparece é decidido só por CSS
 * (`.icon-sun` / `.icon-moon`), então não há divergência de hidratação —
 * o servidor não precisa saber o tema do visitante.
 */
export const ThemeToggle = ({ label }: { label: string }) => {
    const toggle = () => {
        const root = document.documentElement;
        const isDark =
            root.dataset.theme === "dark" ||
            (!root.dataset.theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
        const next = isDark ? "light" : "dark";
        root.dataset.theme = next;
        try {
            localStorage.setItem("theme", next);
        } catch {
            // modo privado bloqueia storage — o toggle ainda funciona nesta sessão
        }
    };

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={label}
            title={label}
            className="grid size-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-border-strong hover:text-text">
            <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="icon-moon size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="icon-sun size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
        </button>
    );
};
