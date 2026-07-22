import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Dictionary, Locale } from "@/content/dictionary";
import { profile } from "@/content/dictionary";

export const SiteHeader = ({ dict, locale }: { dict: Dictionary; locale: Locale }) => {
    const links = [
        { href: "#work", label: dict.nav.work },
        { href: "#experience", label: dict.nav.experience },
        { href: "#about", label: dict.nav.about },
        { href: "#contact", label: dict.nav.contact },
    ];

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-bg/70 backdrop-blur-xl backdrop-saturate-150">
            <div className="shell flex h-16 items-center justify-between gap-6">
                <Link
                    href={`/${locale}`}
                    className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight">
                    <span
                        aria-hidden
                        className="grid size-7 place-items-center rounded-md bg-accent font-mono text-[0.7rem] text-accent-contrast transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                        AO
                    </span>
                    <span className="transition-colors group-hover:text-accent">{profile.name}</span>
                </Link>

                <nav className="flex items-center gap-1.5">
                    <SiteNav links={links} />

                    <span className="mx-1.5 hidden h-4 w-px bg-border md:block" />

                    <Link
                        href={`/${dict.localeSwitch.to}`}
                        hrefLang={dict.localeSwitch.to}
                        className="label rounded-lg border border-border px-2.5 py-2 transition-colors hover:border-border-strong hover:text-text">
                        {dict.localeSwitch.label}
                    </Link>

                    <ThemeToggle label={dict.a11y.themeToggle} />
                </nav>
            </div>
        </header>
    );
};
