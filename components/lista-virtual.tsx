import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/content/dictionary";
import { profile } from "@/content/dictionary";
import {
    APP_STORE_URL,
    type ListaVirtualContent,
    type LvIcon,
    PLAY_STORE_URL,
    SUPPORT_EMAIL,
} from "@/content/lista-virtual";

/**
 * Peças das páginas do Lista Virtual. Elas não usam a moldura do portfólio
 * (`ProductShell`): o cabeçalho aqui é a navegação de um produto, com a marca
 * e o botão de baixar, e o portfólio vira um crédito no rodapé. A página tem
 * que parecer a loja do app, não um capítulo do currículo.
 *
 * As regras de design estão em `docs/lista-virtual/design-system.md`, e cada
 * peça nova passa pela lista de proibidos de lá.
 */

/**
 * O LV do ícone do app sem o fundo branco. O ícone inteiro, com o quadrado
 * branco, era a peça mais clara da página e ficava colado no cabeçalho e no
 * rodapé como adesivo.
 */
export const MONOGRAM = "/logos/lista-virtual-monograma.f8442acf.webp";

/**
 * Selos oficiais das lojas, na língua da página. As diretrizes de marca da
 * Apple e do Google pedem o selo como ele é: sem recolorir, sem recortar a
 * arte e sem botão próprio com o logo deles. O do Google Play vem com uma
 * margem transparente em cima e embaixo; ela foi aparada para os dois selos
 * terem a mesma altura (é só respiro, a arte fica intacta).
 */
const BADGES: Record<Locale, { appStore: { src: string; width: number }; googlePlay: { src: string; width: number } }> = {
    pt: {
        appStore: { src: "/badges/app-store-pt-br.0e9291a9.svg", width: 144 },
        googlePlay: { src: "/badges/google-play-pt-br.1ef41b69.png", width: 162 },
    },
    en: {
        appStore: { src: "/badges/app-store-en.a26fc5b3.svg", width: 144 },
        googlePlay: { src: "/badges/google-play-en.b7392cca.png", width: 162 },
    },
};

export const StoreBadges = ({ locale, content }: { locale: Locale; content: ListaVirtualContent }) => {
    const badges = BADGES[locale];

    return (
        <div className="lv-badges">
            <a href={APP_STORE_URL}>
                <Image src={badges.appStore.src} alt={content.appStoreLabel} width={badges.appStore.width} height={48} />
            </a>
            <a href={PLAY_STORE_URL}>
                <Image src={badges.googlePlay.src} alt={content.playStoreLabel} width={badges.googlePlay.width} height={48} />
            </a>
        </div>
    );
};

/** A faísca de quatro pontas, desenhada como o brilho de uma joia. */
export const Sparkle = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={`lv-sparkle ${className}`} aria-hidden>
        <path d="M12 0c.6 6.4 5 11.2 12 12-7 .8-11.4 5.6-12 12-.6-6.4-5-11.2-12-12 7-.8 11.4-5.6 12-12Z" />
    </svg>
);

export const Check = () => (
    <span className="lv-check" aria-hidden>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
                d="M2.5 6.8 5.2 9.4 10.5 3.8"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    </span>
);

/* Ícones de traço fino, no peso das SF Symbols que o app usa. */
const ICON_PATHS: Record<LvIcon, React.ReactNode> = {
    qr: (
        <>
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3" />
        </>
    ),
    chat: (
        <>
            <path d="M4 19.5 5.3 16A8 8 0 1 1 8 18.7L4 19.5Z" />
            <path d="M9 10.5h6M9 13.5h4" />
        </>
    ),
    offline: (
        <>
            <path d="M3 3l18 18" />
            <path d="M8.5 16.5a5 5 0 0 1 7 0M5 13a10 10 0 0 1 5-2.7M14.5 10.4A10 10 0 0 1 19 13M2 9.5a15 15 0 0 1 4-2.6M11 5.5a15 15 0 0 1 11 4" />
            <path d="M12 20h.01" />
        </>
    ),
    team: (
        <>
            <circle cx="9" cy="8" r="3.2" />
            <path d="M3 20a6 6 0 0 1 12 0" />
            <path d="M16 5.2a3 3 0 0 1 0 5.6M18 14.5a5.5 5.5 0 0 1 3 5.5" />
        </>
    ),
    sheet: (
        <>
            <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
            <path d="M3.5 9h17M3.5 14.5h17M9.5 9v11.5" />
        </>
    ),
    report: (
        <>
            <path d="M6 3h8l5 5v13H6z" />
            <path d="M14 3v5h5M9.5 17v-3M12.5 17v-5M15.5 17v-2" />
        </>
    ),
};

export const FeatureIcon = ({ icon }: { icon: LvIcon }) => (
    <span className="lv-icon" aria-hidden>
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round">
            {ICON_PATHS[icon]}
        </svg>
    </span>
);

/**
 * Cabeçalho e rodapé do produto em volta da página. `wrapperClass` leva a
 * classe da marca e a variável da fonte: aplicadas aqui, no topo, elas vestem
 * inclusive o cabeçalho e o rodapé. `path` é o que vem depois de
 * `/lista-virtual`, para o seletor de idioma levar à mesma página na outra
 * língua.
 *
 * Nenhum dos dois é faixa. O cabeçalho era uma barra fixa, com fundo próprio e
 * fio embaixo, e cortava a luz da vitrine numa emenda reta; o rodapé repetia o
 * fio em cima. Agora os dois ficam no fundo da página, sem fio, e o que os
 * separa do conteúdo é espaço. O cabeçalho também deixou de ser fixo: fixo, ele
 * precisa de fundo para o texto que passa por baixo, e o fundo é a faixa.
 */
export const LvShell = ({
    locale,
    content,
    path = "",
    wrapperClass,
    children,
}: {
    locale: Locale;
    content: ListaVirtualContent;
    path?: string;
    wrapperClass: string;
    children: React.ReactNode;
}) => {
    const home = `/${locale}/lista-virtual`;
    const other: Locale = locale === "pt" ? "en" : "pt";
    const anchors = [
        { href: `${home}#recursos`, label: content.nav.features },
        { href: `${home}#como-funciona`, label: content.nav.how },
        { href: `${home}#planos`, label: content.nav.plans },
        { href: `${home}#perguntas`, label: content.nav.faq },
    ];

    return (
        <div className={`flex flex-1 flex-col bg-bg text-text ${wrapperClass}`}>
            <header>
                <div className="shell lv-header">
                    <Link href={home} className="lv-brand">
                        <Image src={MONOGRAM} alt="" width={36} height={36} className="lv-seal" />
                        <span className="lv-serif">{content.name}</span>
                    </Link>

                    <nav className="lv-nav">
                        {anchors.map((anchor) => (
                            <a key={anchor.href} href={anchor.href}>
                                {anchor.label}
                            </a>
                        ))}
                    </nav>

                    <div className="lv-header-end">
                        {/* No telefone só cabe a outra língua; a atual aparece a
                            partir do tablet, acesa, como "PT · EN". */}
                        <p className="lv-lang">
                            <span className="lv-lang-current">
                                <b>{locale.toUpperCase()}</b> ·{" "}
                            </span>
                            {/* `<a>` e não `Link`: trocar de idioma troca o
                                layout raiz, e sem recarregar o script de boot não
                                roda de novo (ver `site-header.tsx`). */}
                            <a href={`/${other}/lista-virtual${path}`} hrefLang={other}>
                                {other.toUpperCase()}
                            </a>
                        </p>
                        <a href={`${home}#baixar`} className="lv-cta-ring lv-cta-sm">
                            <span>{content.nav.download}</span>
                        </a>
                    </div>
                </div>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="lv-footer">
                <div className="shell">
                    <div className="lv-footer-grid">
                        <div>
                            <Link href={home} className="lv-brand">
                                <Image src={MONOGRAM} alt="" width={30} height={30} className="lv-seal" />
                                <span className="lv-serif">{content.name}</span>
                            </Link>
                            <p className="lv-footer-tagline">{content.footer.tagline}</p>
                            <div className="mt-6">
                                <StoreBadges locale={locale} content={content} />
                            </div>
                        </div>

                        <div>
                            <p className="lv-footer-title">{content.footer.product}</p>
                            <ul className="lv-footer-links">
                                {anchors.map((anchor) => (
                                    <li key={anchor.href}>
                                        <a href={anchor.href}>{anchor.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <p className="lv-footer-title">{content.footer.support}</p>
                            <ul className="lv-footer-links">
                                <li>
                                    <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
                                </li>
                                <li>
                                    <Link href={`${home}/privacy`}>{content.privacyLabel}</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="lv-footer-bottom">
                        <p>
                            © {new Date().getFullYear()} {content.name}. {content.footer.rights}
                        </p>
                        <Link href={`/${locale}`}>
                            {content.madeBy} {profile.name}
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};
