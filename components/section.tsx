/** Cabeçalho de seção padrão — mantém o ritmo vertical igual em todo o site. */
export const Section = ({
    id,
    kicker,
    heading,
    index,
    children,
}: {
    id: string;
    kicker?: string;
    heading: string;
    index: string;
    children: React.ReactNode;
}) => (
    <section id={id} className="scroll-mt-24 border-t border-border py-20 md:py-28">
        <div className="shell">
            <header data-reveal className="mb-12 md:mb-16">
                <div className="flex items-center gap-3">
                    <span className="label text-accent">{index}</span>
                    <span aria-hidden className="h-px w-8 bg-border-strong" />
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-balance md:text-4xl">
                    {heading}
                </h2>
                {kicker ? <p className="mt-3 max-w-2xl text-muted">{kicker}</p> : null}
            </header>
            {children}
        </div>
    </section>
);
