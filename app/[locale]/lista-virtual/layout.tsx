import type { Metadata } from "next";

/**
 * O ícone da aba do Lista Virtual, na landing e na política de privacidade; o
 * resto do site segue com o do portfólio. A metadata de segmentos diferentes
 * se junta de forma rasa, então este `icons` substitui o da raiz inteiro, e o
 * ícone do portfólio não vem junto.
 *
 * Vai pela config, e não pelos arquivos `icon.png` e `apple-icon.png` dentro
 * desta pasta: debaixo do segmento dinâmico `[locale]` o build local passa,
 * mas o da Vercel para em "Invariant: failed to find source route
 * /[locale]/lista-virtual/apple-icon.png".
 */
export const metadata: Metadata = {
    icons: {
        icon: { url: "/logos/lista-virtual-icon.d8a3e5cf.png", type: "image/png", sizes: "256x256" },
        apple: { url: "/logos/lista-virtual-apple-icon.03a6a259.png", type: "image/png", sizes: "180x180" },
    },
};

export default function ListaVirtualLayout({ children }: { children: React.ReactNode }) {
    return children;
}
