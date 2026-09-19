import { Counter } from "@/components/counter";

/**
 * Abertura de capítulo.
 *
 * Sem fio em cima. O que separa uma seção da outra é o espaço (o dobro do maior
 * vão interno) e o contador em cor de acento; um filete de ponta a ponta faria
 * o trabalho da margem e daria ao documento cara de formulário.
 *
 * O `01 / 04` é o que faz a página ter começo, meio e fim: quatro capítulos,
 * e o leitor sempre sabe em qual está. A mesma forma se repete no projeto
 * (`01 / 05`) e no problema (`§01`), então o site inteiro se conta com um
 * mecanismo só.
 *
 * `meta` é a linha de varredura, à direita do contador: "05 projetos · 21
 * problemas". Ela faz em uma linha o que um sumário de 21 linhas fazia.
 *
 * `figure` recebe uma figura que sangra pelas bordas. Só quem passa isso ganha
 * `overflow-hidden`: aplicar em todas as seções cortaria a tela do app que a
 * placa do projeto empurra para além da borda direita.
 */
export const Section = ({
    id,
    index,
    total,
    kicker,
    heading,
    meta,
    figure,
    children,
}: {
    id: string;
    index: number;
    total: number;
    kicker?: string;
    heading: string;
    meta?: string;
    figure?: React.ReactNode;
    children: React.ReactNode;
}) => (
    <section
        id={id}
        className={`scroll-mt-24 py-11 md:py-14 ${figure ? "relative isolate overflow-hidden" : ""}`}>
        {figure}
        <div className="shell relative">
            {/* Uma coluna, como o cabeçalho do projeto: contador, título,
                kicker. O kicker morava numa margem à direita e de lá ele
                flutuava longe do título que qualifica, alinhado pela base de
                um `display` de 46px, o que abria um vão no meio da linha.
                Empilhado ele lê como a frase de abertura do capítulo, que é
                o que ele é. */}
            <header data-reveal className="mb-14 md:mb-20">
                <p className="label flex flex-wrap items-baseline gap-x-5">
                    <Counter at={index} of={total} />
                    {meta ? <span className="text-faint">{meta}</span> : null}
                </p>

                <h2 className="display mt-4">{heading}</h2>

                {kicker ? <p className="measure mt-5 text-[0.9375rem] text-muted">{kicker}</p> : null}
            </header>
            {children}
        </div>
    </section>
);
