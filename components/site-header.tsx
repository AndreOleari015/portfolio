import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Dictionary, Locale } from "@/content/dictionary";
import { profile } from "@/content/dictionary";

export const SiteHeader = ({ dict, locale }: { dict: Dictionary; locale: Locale }) => {
    // A ordem aqui é a ordem dos capítulos, e o índice é o mesmo `01..04` que
    // abre cada seção. Numerada, a navegação diz de relance que a página tem
    // quatro partes e onde elas terminam, o que uma lista de palavras soltas
    // não diz.
    const links = [
        { href: "#work", label: dict.nav.work },
        { href: "#experience", label: dict.nav.experience },
        { href: "#about", label: dict.nav.about },
        { href: "#contact", label: dict.nav.contact },
    ];

    return (
        <header className="sticky top-0 z-50 bg-bg/70 backdrop-blur-xl backdrop-saturate-150">
            <div className="shell flex h-12 items-center justify-between gap-6 md:h-14">
                <Link
                    href={`/${locale}`}
                    className="label text-text transition-colors hover:text-accent">
                    {profile.name}
                </Link>

                <nav className="flex items-center gap-1.5">
                    <SiteNav links={links} className="hidden gap-0.5 md:flex" />

                    <span className="mx-1.5 hidden h-3.5 w-px bg-border md:block" />

                    {/* `<a>` e não `Link`: trocar de idioma troca o parâmetro do
                        layout raiz, e na navegação do cliente o React refaz a
                        `<html>` e o `<head>`. O script de boot do layout não roda
                        de novo (o React avisa no console) e a classe `js` que ele
                        pôs some. Carregando a página inteira, o boot roda. */}
                    <a
                        href={`/${dict.localeSwitch.to}`}
                        hrefLang={dict.localeSwitch.to}
                        className="label px-2 py-2 transition-colors hover:text-text">
                        {dict.localeSwitch.label}
                    </a>

                    <ThemeToggle label={dict.a11y.themeToggle} />
                </nav>
            </div>

            {/* No telefone a navegação não cabe na mesma linha que o nome e os
                dois seletores, então desce para uma segunda. Ela quebra em vez
                de rolar na horizontal: rolagem esconde item e não se anuncia,
                e quebrar não esconde nada. Menu sanduíche está fora: é a
                convenção mais gasta que existe, e são quatro itens. */}
            <div className="shell pb-1.5 md:hidden">
                <SiteNav links={links} className="-mx-1 flex flex-wrap" />
            </div>
        </header>
    );
};
