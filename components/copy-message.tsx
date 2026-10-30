"use client";

import { useState } from "react";

/**
 * Botão que copia a mensagem de confirmação. É a única peça com JavaScript
 * nas páginas de modelo: o resto é servidor. O rótulo troca para "copiada"
 * por dois segundos, que é a resposta ao toque, e volta sozinho.
 */
export const CopyMessage = ({ text, label, done }: { text: string; label: string; done: string }) => {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button type="button" onClick={copy} className="lv-cta-ring">
            <span aria-live="polite">{copied ? done : label}</span>
        </button>
    );
};
