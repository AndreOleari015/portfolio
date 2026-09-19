import { notFound } from "next/navigation";
import { About, Skills } from "@/components/about";
import { Contact, ContactFigure } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Opening } from "@/components/opening";
import { ProjectList } from "@/components/project-list";
import { Section } from "@/components/section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary, isLocale } from "@/content/dictionary";

/** Quantos capítulos o documento tem. É o denominador do `01 / 04` que aparece
 *  na abertura de cada seção e na navegação. */
const SECTIONS = 4;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();

    const dict = getDictionary(locale);

    /**
     * "05 projetos · 21 problemas resolvidos". Um tech lead varre isso em dois
     * segundos; é o que o sumário de 21 linhas fazia ocupando 780px de página.
     * Contado, nunca escrito à mão, porque a conta desandaria no primeiro projeto novo.
     */
    const problems = dict.projects.reduce((total, project) => total + project.highlights.length, 0);
    const tally = [
        `${String(dict.projects.length).padStart(2, "0")} ${dict.work.tally.projects}`,
        `${problems} ${dict.work.tally.problems}`,
    ].join("  ·  ");

    return (
        <>
            <SiteHeader dict={dict} locale={locale} />

            <main>
                <Opening dict={dict} />

                <Section
                    id="work"
                    index={1}
                    total={SECTIONS}
                    heading={dict.work.heading}
                    kicker={dict.work.kicker}
                    meta={tally}>
                    <ProjectList projects={dict.projects} />
                </Section>

                <Section
                    id="experience"
                    index={2}
                    total={SECTIONS}
                    heading={dict.experience.heading}
                    kicker={dict.experience.kicker}>
                    <Experience dict={dict} />
                </Section>

                <Section
                    id="about"
                    index={3}
                    total={SECTIONS}
                    heading={dict.about.heading}
                    kicker={dict.about.kicker}>
                    <About dict={dict} />
                    <div className="mt-16 md:mt-20">
                        <h3 data-reveal className="subhead mb-8">
                            {dict.skills.heading}
                        </h3>
                        <Skills dict={dict} />
                    </div>
                </Section>

                <Section
                    id="contact"
                    index={4}
                    total={SECTIONS}
                    heading={dict.contact.heading}
                    kicker={dict.contact.kicker}
                    figure={<ContactFigure alt={dict.hero.portraitAlt} />}>
                    <Contact dict={dict} />
                </Section>
            </main>

            <SiteFooter dict={dict} />
        </>
    );
}
