import Image from "next/image";
import type { Dictionary } from "@/content/dictionary";
import { profile } from "@/content/dictionary";

/** Segundo momento da figura: ele olhando para quem lê, ao fim da página. */
const FIGURE = "/portrait/figure-desk.4d259b65.webp";

const channels = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, external: false },
    { label: "GitHub", value: profile.githubHandle, href: profile.github, external: true },
    { label: "LinkedIn", value: profile.linkedinHandle, href: profile.linkedin, external: true },
];

/**
 * Sangra pela direita. Mesma lógica da abertura: ela não é uma foto posta na
 * página, é o lado direito da composição.
 *
 * Dois gradientes, não um. O de baixo já existia, e sem ele o `overflow-hidden`
 * da seção cortava a figura num fio reto atravessando um terço da página, a
 * mesma divisória que o resto do site perdeu. O da esquerda é novo: a borda
 * esquerda do recorte é outro corte reto, invisível no tema claro (papel contra
 * fundo de estúdio quase branco) e uma parede luminosa no escuro.
 */
export const ContactFigure = ({ alt }: { alt: string }) => (
    <div
        aria-hidden
        title={alt}
        className="pointer-events-none absolute top-0 right-0 hidden h-full w-[42%] lg:block xl:w-[38%]">
        <Image
            src={FIGURE}
            alt=""
            fill
            sizes="42vw"
            className="figure-photo object-cover object-[50%_top]"
        />
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-bg to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-bg to-transparent" />
    </div>
);

/**
 * O fim do documento, e ele se lê como fim: frase, ação, canais, nada depois.
 *
 * Sem altura mínima nem alinhamento pela base. Tentei antes empurrar os canais
 * para o rodapé do bloco, para casarem com a base da figura, e o preço era um
 * vão de 120px no meio do texto. Um buraco entre dois parágrafos é pior do que
 * um bloco curto ao lado de uma figura alta.
 */
export const Contact = ({ dict }: { dict: Dictionary }) => (
    <div className="max-w-[34rem] lg:max-w-[32rem]">
        <p data-reveal className="lead text-muted">
            {dict.contact.body}
        </p>

        {/* O e-mail é a ação principal e o CV é a secundária, então um é
            botão cheio e o outro é link. Quem chega ao fim da página e não
            quer escrever ainda leva o PDF. */}
        <div data-reveal className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
                href={`mailto:${profile.email}`}
                className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm">
                {dict.contact.emailLabel}
            </a>

            <a href={profile.cv} download className="group/cv">
                <span className="link-underline font-mono text-xs text-muted group-hover/cv:text-accent">
                    {dict.cv.label}
                </span>
                <span className="label mt-1 block">{dict.cv.note}</span>
            </a>
        </div>

        <dl data-reveal className="mt-12 grid gap-x-10 gap-y-5 sm:grid-cols-3">
            {channels.map((channel) => (
                <div key={channel.label}>
                    <dt className="label">{channel.label}</dt>
                    <dd className="mt-1.5">
                        <a
                            href={channel.href}
                            {...(channel.external
                                ? { target: "_blank", rel: "noreferrer noopener" }
                                : {})}
                            className="link-underline font-mono text-xs text-muted hover:text-accent">
                            {channel.value}
                        </a>
                    </dd>
                </div>
            ))}
        </dl>
    </div>
);
