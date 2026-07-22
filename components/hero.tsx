import Image from "next/image";
import type { Dictionary } from "@/content/dictionary";
import { profile } from "@/content/dictionary";

/** Atalho para escalonar a entrada sem repetir o objeto de estilo. */
const rise = (delay: number) => ({ "--rise-delay": `${delay}ms` }) as React.CSSProperties;

export const Hero = ({ dict }: { dict: Dictionary }) => (
    <section className="relative isolate overflow-hidden pt-20 pb-20 md:pt-28 md:pb-24">
        <div aria-hidden className="grid-bg" />
        <div aria-hidden className="aurora" />

        <div className="shell">
            <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-10">
                <div>
                    <div
                        style={rise(0)}
                        className="rise inline-flex items-center gap-2.5 rounded-full border border-border bg-bg-elevated/60 py-1.5 pr-4 pl-3 backdrop-blur-sm">
                        <span aria-hidden className="pulse-dot size-1.5 rounded-full bg-accent" />
                        <span className="label text-text">{dict.hero.available}</span>
                    </div>

                    <p
                        style={rise(70)}
                        className="rise label mt-7 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span>{dict.hero.role}</span>
                        <span aria-hidden className="text-border-strong">
                            /
                        </span>
                        <span>{dict.hero.location}</span>
                    </p>

                    <h1
                        style={rise(140)}
                        className="rise text-gradient mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-balance md:text-6xl md:leading-[1.05]">
                        {dict.hero.headline}
                    </h1>

                    <p
                        style={rise(220)}
                        className="rise mt-7 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
                        {dict.hero.intro}
                    </p>

                    <div style={rise(300)} className="rise mt-10 flex flex-wrap items-center gap-3">
                        <a href="#work" className="btn-primary rounded-lg px-5 py-2.5 text-sm font-medium">
                            {dict.hero.ctaWork}
                        </a>
                        <a
                            href="#contact"
                            className="btn-ghost rounded-lg px-5 py-2.5 text-sm font-medium">
                            {dict.hero.ctaContact}
                        </a>
                        <div className="flex items-center gap-5 sm:ml-4">
                            <a
                                href={profile.github}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="link-underline text-sm text-muted hover:text-accent">
                                GitHub
                            </a>
                            <a
                                href={profile.linkedin}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="link-underline text-sm text-muted hover:text-accent">
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>

                {/* Dois aparelhos flutuando — preenchem a coluna direita e dizem
                    "mobile" antes de a pessoa ler qualquer palavra. */}
                <div
                    aria-hidden
                    style={rise(380)}
                    className="rise device-stack relative hidden lg:block">
                    <div
                        className="absolute top-1/2 left-1/2 -z-10 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                        style={{
                            background: "radial-gradient(circle, rgb(var(--glow) / 0.28), transparent 70%)",
                        }}
                    />
                    <div className="relative flex justify-center gap-4">
                        <div className="device device-back w-[9.5rem] overflow-hidden rounded-2xl border border-border">
                            <Image
                                src="/shots/bus-times-widgets.webp"
                                alt=""
                                width={720}
                                height={1564}
                                priority
                                sizes="10rem"
                                className="h-auto w-full"
                            />
                        </div>
                        <div className="device device-front w-[9.5rem] overflow-hidden rounded-2xl border border-border">
                            <Image
                                src="/shots/bus-times-nearby.webp"
                                alt=""
                                width={720}
                                height={1564}
                                priority
                                sizes="10rem"
                                className="h-auto w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <dl
                style={rise(460)}
                className="rise mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-border pt-8 md:gap-10">
                {dict.hero.stats.map((stat) => (
                    <div key={stat.label}>
                        <dt className="font-mono text-2xl font-semibold tracking-tight text-accent tabular-nums md:text-3xl">
                            {stat.value}
                        </dt>
                        <dd className="mt-1.5 text-xs leading-snug text-muted md:text-sm">
                            {stat.label}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    </section>
);
