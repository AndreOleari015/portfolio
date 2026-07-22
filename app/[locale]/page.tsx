import { notFound } from "next/navigation";
import { About, Skills } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { ProjectList } from "@/components/project-list";
import { Section } from "@/components/section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary, isLocale } from "@/content/dictionary";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();

    const dict = getDictionary(locale);

    return (
        <>
            <SiteHeader dict={dict} locale={locale} />

            <main>
                <Hero dict={dict} />

                <Section
                    id="work"
                    index="01"
                    heading={dict.work.heading}
                    kicker={dict.work.kicker}>
                    <p data-reveal className="label -mt-8 mb-14">
                        {dict.work.note}
                    </p>
                    <ProjectList projects={dict.projects} />
                </Section>

                <Section
                    id="experience"
                    index="02"
                    heading={dict.experience.heading}
                    kicker={dict.experience.kicker}>
                    <Experience dict={dict} />
                </Section>

                <Section
                    id="about"
                    index="03"
                    heading={dict.about.heading}
                    kicker={dict.about.kicker}>
                    <About dict={dict} />
                    <div className="mt-16 border-t border-border pt-12">
                        <h3 data-reveal className="mb-8 text-lg font-semibold tracking-tight">
                            {dict.skills.heading}
                        </h3>
                        <Skills dict={dict} />
                    </div>
                </Section>

                <Section
                    id="contact"
                    index="04"
                    heading={dict.contact.heading}
                    kicker={dict.contact.kicker}>
                    <Contact dict={dict} />
                </Section>
            </main>

            <SiteFooter dict={dict} />
        </>
    );
}
