import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist_Mono, Hanken_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { Motion } from "@/components/motion";
import { getDictionary, isLocale, locales, profile } from "@/content/dictionary";
import { SITE_URL } from "@/content/site-url";
import "../globals.css";

/**
 * Grotesca geométrica para texto e display, mono para dado. Hanken Grotesk tem
 * itálico próprio, usado na nota de rodapé da experiência.
 */
const hanken = Hanken_Grotesk({
    variable: "--font-hanken",
    subsets: ["latin"],
    style: ["normal", "italic"],
    display: "swap",
});

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

/**
 * Roda antes da primeira pintura: marca que há JS (para a revelação no scroll
 * poder esconder o conteúdo sem piscar) e aplica o tema salvo.
 */
const BOOT_SCRIPT = `try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('theme');if(t==='dark'||t==='light')d.dataset.theme=t;}catch(e){}`;

/**
 * Token de verificação de propriedade do Google Search Console. É público por
 * natureza, sai no HTML de toda página. Existe porque a Brand Verification do
 * OAuth exige que o domínio declarado como autorizado seja comprovadamente seu.
 */
const GOOGLE_SITE_VERIFICATION = "myZkF34bGLh-jYlMoZCBPviYKX5QFhJlihZocTWJr1Q";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
    const { locale } = await params;
    if (!isLocale(locale)) return {};
    const dict = getDictionary(locale);

    const ogImage = {
        url: `/og-${locale}.png`,
        width: 1200,
        height: 630,
        alt: `${profile.name}. ${dict.hero.role}, ${dict.hero.location}`,
    };

    return {
        metadataBase: new URL(SITE_URL),
        verification: { google: GOOGLE_SITE_VERIFICATION },
        title: dict.meta.title,
        description: dict.meta.description,
        authors: [{ name: profile.name, url: profile.github }],
        alternates: {
            canonical: `/${locale}`,
            languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
        },
        openGraph: {
            type: "profile",
            url: `/${locale}`,
            siteName: profile.name,
            title: dict.meta.title,
            description: dict.meta.description,
            locale: locale === "pt" ? "pt_BR" : "en_IE",
            images: [ogImage],
        },
        twitter: {
            card: "summary_large_image",
            title: dict.meta.title,
            description: dict.meta.description,
            images: [ogImage],
        },
    };
};

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();

    return (
        <html
            lang={locale}
            suppressHydrationWarning
            // O CSS usa `scroll-behavior: smooth` nas âncoras. Com este atributo o
            // Next 16 desliga a rolagem suave durante a troca de rota, que é o
            // comportamento de antes da versão 16 (guia de atualização).
            data-scroll-behavior="smooth"
            className={`${hanken.variable} ${geistMono.variable} h-full antialiased`}>
            <head>
                <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
            </head>
            <body className="flex min-h-full flex-col bg-bg text-text">
                {children}
                <Motion />
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
