import { Wittgenstein } from "next/font/google";

/**
 * A serifa de marca do app (`Fonts` em `src/constants/colors.ts` do app),
 * carregada só nas páginas do Lista Virtual. O resto do site não paga por ela.
 */
export const wittgenstein = Wittgenstein({
    variable: "--font-wittgenstein",
    subsets: ["latin"],
    weight: ["500", "600", "700"],
    style: ["normal", "italic"],
    display: "swap",
});
