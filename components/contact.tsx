import type { Dictionary } from "@/content/dictionary";
import { profile } from "@/content/dictionary";

const channels = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, external: false },
    { label: "GitHub", value: profile.githubHandle, href: profile.github, external: true },
    { label: "LinkedIn", value: profile.linkedinHandle, href: profile.linkedin, external: true },
];

export const Contact = ({ dict }: { dict: Dictionary }) => (
    <div className="relative isolate overflow-hidden rounded-2xl border border-border bg-bg-elevated p-8 md:p-12">
        <div
            aria-hidden
            className="absolute -top-24 -right-16 -z-10 size-72 rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle, rgb(var(--glow) / 0.18), transparent 70%)" }}
        />

        <div data-reveal className="max-w-2xl">
            <p className="text-lg leading-relaxed text-muted">{dict.contact.body}</p>

            <a
                href={`mailto:${profile.email}`}
                className="btn-primary mt-8 inline-flex items-center gap-2 rounded-lg px-5 py-3 font-medium">
                {dict.contact.emailLabel}
            </a>
        </div>

        <dl className="mt-12 grid gap-x-8 gap-y-6 border-t border-border pt-8 sm:grid-cols-3">
            {channels.map((channel, i) => (
                <div
                    key={channel.label}
                    data-reveal
                    style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}>
                    <dt className="label">{channel.label}</dt>
                    <dd className="mt-2">
                        <a
                            href={channel.href}
                            {...(channel.external
                                ? { target: "_blank", rel: "noreferrer noopener" }
                                : {})}
                            className="link-underline text-sm break-all hover:text-accent">
                            {channel.value}
                        </a>
                    </dd>
                </div>
            ))}
        </dl>
    </div>
);
