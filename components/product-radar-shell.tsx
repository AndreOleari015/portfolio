import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import type { Dictionary, Locale } from "@/content/dictionary";

/**
 * Moldura das páginas do Product Radar. Cabeçalho próprio, sem a navegação por
 * âncoras da home: ali os links #work e #about não existem.
 */
export const ProductRadarShell = ({
    locale,
    dict,
    backLabel,
    children,
}: {
    locale: Locale;
    dict: Dictionary;
    backLabel: string;
    children: React.ReactNode;
}) => (
    <>
        <header className="sticky top-0 z-50 bg-bg/70 backdrop-blur-xl backdrop-saturate-150">
            <div className="shell flex h-16 items-center">
                <Link
                    href={`/${locale}`}
                    className="label transition-colors hover:text-text">
                    ← {backLabel}
                </Link>
            </div>
        </header>

        <main className="shell py-16 md:py-24">{children}</main>

        <SiteFooter dict={dict} />
    </>
);
