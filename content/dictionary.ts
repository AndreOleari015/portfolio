/**
 * Conteúdo do site nos dois idiomas.
 * Fonte única de verdade: nenhum texto fica hardcoded nos componentes.
 *
 * O tom segue o LinkedIn do André (sobre, experiência e os posts de 2026):
 * primeira pessoa, frase inteira, de onde cada coisa veio e o que deu errado
 * antes de funcionar. Nada de slogan, de "X, não Y" e de software com
 * sentimento ("CI que se conserta sozinho"). Número e nome próprio só entram
 * com fonte: o repositório, o Firestore ou a própria loja.
 */

/** Fim do período na Pixel Logic Apps, como está no LinkedIn. */
const PIXEL_LOGIC_END = { en: "Jun 2026", pt: "Jun 2026" };

export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];

export const profile = {
    name: "Andre Oleari",
    email: "andre.oleari1@gmail.com",
    github: "https://github.com/AndreOleari015",
    githubHandle: "AndreOleari015",
    linkedin: "https://www.linkedin.com/in/andreoleari",
    linkedinHandle: "andreoleari",
    /** O CV está fora do ar desde 06/10, a pedido do André: a versão atual
     *  não está boa para publicar. Com `null` os dois botões somem, e o PDF
     *  saiu de `public/` para `assets/cv/`, que não vai para o git nem para
     *  o deploy, então a URL antiga dá 404.
     *
     *  Para voltar: pôr o PDF novo em `public/andre-oleari-cv.pdf` e trocar
     *  `null` por `"/andre-oleari-cv.pdf"`. Um arquivo só, em inglês, porque o
     *  mercado é irlandês, e com nome estável de propósito: é uma URL que as
     *  pessoas guardam, e um hash de conteúdo quebraria o link a cada versão.
     *
     *  A versão que saiu do ar veio do `job-tailor`, de
     *  `output/f24-senior-mobile-developer/oleari-cv-f24.pdf`. */
    cv: null,
};

export type Project = {
    slug: string;
    /** O nome do app na tela inicial do telefone. O da loja muda com o ASO
     *  ("Bus Times Ireland: Dublin Live", "Scoreboard: Volleyball & Timer") e
     *  não serve de nome de projeto. */
    name: string;
    tagline: string;
    year: string;
    summary: string;
    /** A figura do projeto: as telas do app lado a lado, cada uma dentro do
     *  molde de telefone, produzidas por `scripts/telas-do-molde.py`. Todo
     *  projeto do site tem, porque desde o corte de 19/09 todos são app de
     *  telefone.
     *
     *  Sem legenda de propósito: o rótulo embaixo de cada moldura diz o nome
     *  da tela, e o que ela prova está nos § ao lado, que é onde já estava. A
     *  legenda antiga repetia o § em outras palavras. */
    shot?: {
        alt: string;
        screens: { src: string; label: string }[];
        /** Um aparelho a mais, depois dos telefones. Só o Bus Times tem,
         *  porque só ele tem app de relógio, e o § dele afirma isso sem
         *  mostrar. Vai por último porque é a superfície que espelha as
         *  outras, e primeiro é onde o olho começa. */
        watch?: { src: string; alt: string; label: string };
    };
    highlights: { title: string; body: string }[];
    stack: string[];
    links: { label: string; href: string }[];
    /** Aparece onde ficam os links, quando não existe repositório público. */
    note?: string;
    /** Ícone do app. Só os apps têm. */
    logo?: string;
};

export type Job = {
    role: string;
    company: string;
    period: string;
    location: string;
    /** O que era o trabalho, em uma ou duas frases, antes dos destaques. */
    summary?: string;
    bullets: string[];
    /** Produtos do empregador em que trabalhou. Não são projetos próprios. */
    apps?: { label: string; items: string[] };
};

/** Cargo de antes do desenvolvimento em tempo integral. Entra porque está no
 *  LinkedIn e explica a linha do tempo, mas numa linha só: o site é de mobile. */
export type EarlierJob = { role: string; company: string; period: string; location: string; summary: string };

export type Dictionary = {
    meta: { title: string; description: string };
    nav: { work: string; experience: string; about: string; contact: string };
    a11y: { themeToggle: string };
    /** O CV em PDF. `note` avisa o idioma, que importa na página em português. */
    cv: { label: string; note: string };
    hero: {
        role: string;
        location: string;
        available: string;
        headline: { left: string; right: string };
        intro: string;
        ctaWork: string;
        ctaContact: string;
        portraitAlt: string;
        stats: { value: string; label: string }[];
    };
    work: { heading: string; kicker: string; tally: { projects: string; problems: string } };
    projects: Project[];
    experience: {
        heading: string;
        kicker: string;
        jobs: Job[];
        earlier: { label: string; jobs: EarlierJob[] };
    };
    about: { heading: string; kicker: string; body: string[]; educationHeading: string; education: { course: string; school: string; period: string }[] };
    skills: { heading: string; groups: { label: string; items: string[] }[] };
    contact: { heading: string; kicker: string; body: string; emailLabel: string };
    footer: { built: string; rights: string };
    localeSwitch: { label: string; to: string };
};

/** Lojas dos apps. As URLs da App Store levam o nome da ficha, que muda com o
 *  ASO; a Apple resolve pelo ID, mas o nome certo no link evita estranheza. */
const stores = {
    busTimes: {
        appStore: "https://apps.apple.com/ie/app/bus-times-ireland-dublin-live/id6783506737",
        googlePlay: "https://play.google.com/store/apps/details?id=com.tfibusguide.app",
    },
    scoreboard: {
        appStore: "https://apps.apple.com/ie/app/scoreboard-volleyball-timer/id6756669003",
        googlePlay: "https://play.google.com/store/apps/details?id=com.scoreboardapp.app",
    },
    listaVirtual: {
        appStore: "https://apps.apple.com/ie/app/lista-virtual-guest-list/id6738919953",
        googlePlay: "https://play.google.com/store/apps/details?id=com.ROC",
    },
};

// ---------------------------------------------------------------------------
// EN
// ---------------------------------------------------------------------------
const en: Dictionary = {
    meta: {
        title: "Andre Oleari · Mobile Software Engineer",
        description:
            "Mobile software engineer in Cork, Ireland, working mostly with React Native and Expo. I have three apps of my own on the App Store and Google Play, and worked on more than 30 at Pixel Logic Apps.",
    },
    nav: { work: "Projects", experience: "Experience", about: "About", contact: "Contact" },
    a11y: { themeToggle: "Switch between light and dark" },
    cv: { label: "Download CV", note: "PDF, one page" },
    hero: {
        role: "Mobile Software Engineer",
        location: "Cork, Ireland",
        available: "Open to work",
        headline: {
            left: "I build mobile apps,",
            right: "but the interesting part is behind the screen.",
        },
        intro:
            "I work mostly with React Native and Expo. What I enjoy is the whole path of an app: taking an idea that's still rough, building it, putting it in people's hands and improving it based on what happens next.",
        ctaWork: "See the projects",
        ctaContact: "Get in touch",
        portraitAlt: "Andre Oleari",
        stats: [
            { value: "03", label: "My own apps, on both stores" },
            { value: "30+", label: "Apps I worked on at Pixel Logic Apps" },
            { value: "2019", label: "The year I started with React Native" },
        ],
    },
    work: {
        heading: "Projects",
        kicker: "Three apps I built on my own and still maintain, all on the App Store and Google Play. Each one started with something I saw up close: waiting at a bus stop, volleyball tournaments run on paper, guest check-in at a real event.",
        tally: { projects: "apps", problems: "problems solved" },
    },
    projects: [
        {
            slug: "bus-times",
            logo: "/logos/bus-times.577ac812.webp",
            name: "Bus Times",
            tagline: "Live bus, Luas and rail times for Ireland",
            year: "2026",
            summary:
                "About a week after moving to Ireland, I noticed something that kept bothering me: there was already a public transport app, but I still found myself at the stop wondering if the bus was actually coming. So I built my own. It lists the departures from the stops around you, keeps live times apart from scheduled ones and puts the vehicles on a map, using official TFI data.",
            shot: {
                alt: "Three screens of Bus Times cycling inside a phone: a stop's departures, the home screen widgets and the live map",
                watch: {
                    src: "/telas/clock.png",
                    alt: "The Apple Watch app, showing the next departures from a saved stop",
                    label: "Watch",
                },
                screens: [
                    { src: "/telas/bus-times-1.2ddd7db3.webp", label: "Departures" },
                    { src: "/telas/bus-times-2.9bafc43b.webp", label: "Widgets" },
                    { src: "/telas/bus-times-3.fbedf1d2.webp", label: "Map" },
                ],
            },
            highlights: [
                {
                    title: "Turning a 250 MB feed into something a phone can use",
                    body: "The national GTFS feed is a 250 MB file, far too big to send to a phone. A Node script splits it into about 10,200 small JSON files, one per stop, stored in Cloudflare R2. A Worker serves them, checks GTFS-Realtime on a cron and takes care of caching, kill switches and per-IP limits.",
                },
                {
                    title: "The 503 errors in Cork",
                    body: "While testing in Cork, 26% to 33% of departure requests came back as 503 and the app showed “Couldn't reach server”. It turned out to be CPU: a batch of twenty stops made the Worker parse 3.8 MB of JSON on a cold start, past its 10 ms limit. I split the batch into chunks of eight, each with its own budget, and the errors went to zero.",
                },
                {
                    title: "Live times for 4.3% of departures",
                    body: "At first only 4.3% of departures showed a live time, even though the official feed was working. The Irish feed only reports a delay at some stops of each trip, so I carry that delay forward along the rest of the trip on the server. Live coverage went to 67.9% of departures, with no extra cost per user.",
                },
                {
                    title: "Keeping the widget right while the app is closed",
                    body: "iOS decides when a widget refreshes, so polling isn't an option. A scheduled time never changes, only the delay does. The app gives the widget a timeline of 12 entries covering the next hour, each counting down from the absolute due time, and the minutes stay right with the app closed.",
                },
                {
                    title: "An Apple Watch app in SwiftUI",
                    body: "The watch app is native SwiftUI and never calls the backend. It shows the departures the phone already fetched, sent over WatchConnectivity. Complications can only be updated about fifty times a day, which is why the phone only sends something when the data has actually changed.",
                },
                {
                    title: "Live times breaking without an error",
                    body: "Every so often the national feed changes its trip IDs, and when that happened live times stopped matching the schedule without any warning. Now a GitHub Actions workflow runs twice a week, compares a hash of trips.txt and rebuilds the data only when it changed. A Worker cron couldn't do it: parsing 250 MB takes far more than the 128 MB of memory a Worker gets.",
                },
            ],
            stack: ["Expo", "React Native", "TypeScript", "Cloudflare Workers", "R2", "SwiftUI", "WidgetKit", "GitHub Actions"],
            links: [
                { label: "App Store", href: stores.busTimes.appStore },
                { label: "Google Play", href: stores.busTimes.googlePlay },
                { label: "Backend source", href: "https://github.com/AndreOleari015/tfi-departures-worker" },
            ],
        },
        {
            slug: "scoreboard",
            logo: "/logos/scoreboard.8eac9fd5.webp",
            name: "Scoreboard",
            tagline: "Scoreboard and tournament manager for amateur sport",
            year: "2025 to 2026",
            summary:
                "Scoreboard came from years of seeing volleyball tournaments run with a mix of apps, and sometimes on paper. Apps for keeping score were everywhere. The hard part was running the tournament itself, with groups, standings and knockouts. So it started as a scoreboard and grew into a tournament manager that works fully offline.",
            shot: {
                alt: "Three screens of Scoreboard inside a phone: tournament setup, the group matches and the standings",
                screens: [
                    { src: "/telas/scoreboard-1.4adc5506.webp", label: "Setup" },
                    { src: "/telas/scoreboard-2.23eb834d.webp", label: "Matches" },
                    { src: "/telas/scoreboard-3.f9343d92.webp", label: "Standings" },
                ],
            },
            highlights: [
                {
                    title: "Each sport's rules kept as data",
                    body: "Volleyball, futsal and basketball don't score or break ties the same way. Instead of a branch per sport, the rules live in a table that Remote Config can override, so I can fix a rule without a new build. Later I pulled the engine out into an open source TypeScript library with no dependencies and 100 tests.",
                },
                {
                    title: "What happens when the clock runs out",
                    body: "When time is up, several questions come at once: was that the last period, is it a draw, does this sport go to extra time, then penalties, then sudden death? A single timer loop answers them in order, and extra time and the shootout each keep their own state next to the match.",
                },
                {
                    title: "Everything stays on the phone",
                    body: "There's no server for match data. Everything is saved with AsyncStorage on the device, so the app works in a sports hall with no signal. Some saved matches ended up marked as tournament games without a tournament ID, and instead of crashing, the app now opens them as casual matches.",
                },
                {
                    title: "Trials and cancellations",
                    body: "If you cancel during the free trial, premium ends right away. If you paid and then cancelled, you keep it until the end of the period you paid for. And if Remote Config doesn't load, purchases stay enabled, so a missing flag can never hide the paywall by accident.",
                },
            ],
            stack: ["Expo", "React Native", "TypeScript", "Firebase Remote Config", "RevenueCat", "expo-print"],
            links: [
                { label: "App Store", href: stores.scoreboard.appStore },
                { label: "Google Play", href: stores.scoreboard.googlePlay },
                { label: "Engine source", href: "https://github.com/AndreOleari015/tournament-engine" },
            ],
        },
        {
            slug: "lista-virtual",
            logo: "/logos/lista-virtual.5eeeecb4.webp",
            name: "Lista Virtual",
            tagline: "Guest list, RSVP and check-in for events",
            year: "2025 to 2026",
            summary:
                "Lista Virtual came from seeing how messy guest check-in can get at a real event, usually with a printed list at the door. It imports the guest list, sends RSVP invitations and handles check-in, even with no signal. Organisers have created more than 4,000 events with it, and more than 13,000 guests have been checked in.",
            shot: {
                alt: "Three screens of Lista Virtual cycling inside a phone: the guest list, check-in in progress and the app with no connection",
                screens: [
                    { src: "/telas/lista-virtual-1.4bee988d.webp", label: "List" },
                    { src: "/telas/lista-virtual-2.d0874f96.webp", label: "Check-in" },
                    { src: "/telas/lista-virtual-3.2b945b1a.webp", label: "No signal" },
                ],
            },
            highlights: [
                {
                    title: "Check-in that works with no signal",
                    body: "A lot of venues have weak or no signal, and that's exactly where check-in happens. Each guest's QR code carries a short payload with the event and the guest, and the scanner looks it up in the list that's already on the phone, without going over the network.",
                },
                {
                    title: "Three ways to use the same app",
                    body: "You can use it without an account, with everything on the phone, or sign in and sync your lists in real time through Firestore. Whoever works the door gets a receptionist mode that logs in with an access code and never touches the owner's account. If someone creates an account later, their local data is uploaded in batches.",
                },
                {
                    title: "Reports for the organiser's client",
                    body: "After the event, organisers usually need to show their own client who came. The app builds PDF and Excel reports on the device, with the organiser's logo if they want it, and the logo stays on the phone instead of being uploaded.",
                },
                {
                    title: "Invitation links that can't be reused",
                    body: "Invitations go out over WhatsApp, and WhatsApp messages get forwarded. Each RSVP link carries a single-use token issued by a Cloud Function, with rate limiting and an audit log, so a forwarded copy stops working once the guest has answered.",
                },
            ],
            stack: ["Expo", "React Native", "TypeScript", "Firebase", "Cloud Functions", "Firestore", "RevenueCat"],
            links: [
                { label: "App page", href: "/en/lista-virtual" },
                { label: "App Store", href: stores.listaVirtual.appStore },
                { label: "Google Play", href: stores.listaVirtual.googlePlay },
            ],
        },
    ],
    experience: {
        heading: "Experience",
        kicker: "My first jobs were in an accounting office and in IT support in Pará, Brazil. Development became my full-time job at the end of 2024.",
        jobs: [
            {
                role: "Software Engineer, React Native and Expo",
                company: "Pixel Logic Apps",
                period: `Nov 2024 to ${PIXEL_LOGIC_END.en}`,
                location: "Remote",
                summary:
                    "I worked across more than 30 mobile products, often from an early idea all the way to release. Over time the job grew beyond writing code, into owning delivery, making technical decisions and keeping apps running well in production.",
                bullets: [
                    "Built the new version of Bobbie Goods: Coloring Book from the first commit to the App Store in 18 days, with six monetisation features tested through four A/B experiments.",
                    "Took Vale Gás / Auxílio Meu Social from the first commit to Google Play in three days. It passed 500,000 downloads, turning complicated public-benefit information into something simple to use on a phone.",
                    "Every new app repeated the same setup and integrations, so they went into a shared Expo toolkit. I helped shape it and chased the bugs that only showed up once it ran across the whole catalogue, and new apps became faster and more consistent to start.",
                    "Automated store releases with Fastlane across 18 apps. Sending a build to the stores went from most of a working day to about a minute.",
                    "Led a small team of two developers, helping unblock decisions and keep delivery moving while staying hands-on with the apps.",
                ],
                apps: {
                    label: "Other apps I worked on",
                    items: ["We Are Not Really Strangers", "Versículo do Dia", "Loterias", "Omnia Model", "Glassify Widgets"],
                },
            },
            {
                role: "Software Engineer",
                company: "Starta Solutions",
                period: "Nov 2022 to Jan 2023",
                location: "Freelance, remote",
                summary: "I worked with a full-stack team on a mobile product that had to stay useful with limited connectivity.",
                bullets: [
                    "Built the authentication and data sync flows in React Native, designed to keep working on unreliable networks, against REST APIs on Node.js and MySQL.",
                    "It was my first time on a real product with other developers, instead of only my own projects.",
                ],
            },
        ],
        earlier: {
            label: "Before development full time",
            jobs: [
                {
                    role: "IT Specialist",
                    company: "Carajás Ambientes Planejados",
                    period: "May 2024 to Nov 2024",
                    location: "Remote",
                    summary: "Looked after file access, sync and backups on OneDrive and SharePoint, and supported users, devices and network access.",
                },
                {
                    role: "IT Specialist",
                    company: "Tecsil",
                    period: "May 2023 to Aug 2023",
                    location: "On-site, Paragominas",
                    summary: "Networks, devices, internal systems and remote support, dealing with the technical problem and with the person affected by it at the same time.",
                },
                {
                    role: "IT Specialist",
                    company: "Tecsil",
                    period: "May 2022 to Nov 2022",
                    location: "On-site, Paragominas",
                    summary: "One of my first jobs in tech: network, equipment and access problems, solved directly with the people who depended on them.",
                },
                {
                    role: "Trainee",
                    company: "Contabilidade Destro e Destro",
                    period: "Jun 2021 to Apr 2022",
                    location: "Paragominas",
                    summary: "My first job. I entered, cross-checked and reconciled financial data in Fortes Contábil, and learned how much it matters that the data is right.",
                },
            ],
        },
    },
    about: {
        heading: "About",
        kicker: "How I got here",
        body: [
            "I started programming in 2019 at IFPA, in Brazil, when a professor introduced me to React Native through a course that still taught class components. I struggled quite a bit at first, so most of what I learned came from building things on my own: searching, testing and fixing problems as they came up.",
            "Over time those projects stopped being exercises and became real apps, and the work grew with them: Firebase, APIs, payments, App Store and Google Play releases, CI/CD, OTA updates. Today I live in Cork, and what keeps me going is still what got me started: understanding how things work, and building them.",
        ],
        educationHeading: "Education",
        education: [
            {
                course: "Technologist in Systems Analysis and Development",
                school: "Instituto Federal do Pará (IFPA)",
                period: "2022 to 2024",
            },
            {
                course: "Technical High School in IT",
                school: "Instituto Federal do Pará, Campus Paragominas",
                period: "2019 to 2022",
            },
        ],
    },
    skills: {
        heading: "What I work with",
        groups: [
            { label: "Mobile", items: ["React Native", "Expo", "TypeScript", "SwiftUI", "WidgetKit", "WatchConnectivity", "AsyncStorage"] },
            { label: "Backend and data", items: ["Node.js", "Cloudflare Workers", "R2", "Firebase", "Cloud Functions", "Firestore"] },
            { label: "Releases and payments", items: ["EAS Build", "GitHub Actions", "RevenueCat", "Remote Config"] },
        ],
    },
    contact: {
        heading: "Get in touch",
        kicker: "I'm looking for mobile engineer, React Native or software engineer roles, in Ireland or remote.",
        body: "Email is the quickest way to reach me, but LinkedIn works too.",
        emailLabel: "Email me",
    },
    footer: {
        built: "Built with Next.js and Tailwind.",
        rights: "All rights reserved.",
    },
    localeSwitch: { label: "Português", to: "pt" },
};

// ---------------------------------------------------------------------------
// PT
// ---------------------------------------------------------------------------
const pt: Dictionary = {
    meta: {
        title: "Andre Oleari · Engenheiro de Software Mobile",
        description:
            "Engenheiro de software mobile em Cork, na Irlanda, trabalhando principalmente com React Native e Expo. Tenho três apps meus na App Store e no Google Play, e trabalhei em mais de 30 na Pixel Logic Apps.",
    },
    nav: { work: "Projetos", experience: "Experiência", about: "Sobre", contact: "Contato" },
    a11y: { themeToggle: "Alternar entre claro e escuro" },
    cv: { label: "Baixar o CV", note: "PDF, uma página, em inglês" },
    hero: {
        role: "Engenheiro de Software Mobile",
        location: "Cork, Irlanda",
        available: "Aberto a propostas",
        headline: {
            left: "Construo apps mobile,",
            right: "mas o mais interessante acontece fora da tela.",
        },
        intro:
            "Trabalho principalmente com React Native e Expo. O que mais gosto é do caminho inteiro de um app: pegar uma ideia ainda crua, construir, colocar na mão das pessoas e melhorar a partir do que acontece depois.",
        ctaWork: "Ver os projetos",
        ctaContact: "Falar comigo",
        portraitAlt: "Andre Oleari",
        stats: [
            { value: "03", label: "Apps meus, nas duas lojas" },
            { value: "30+", label: "Apps em que trabalhei na Pixel Logic Apps" },
            { value: "2019", label: "O ano em que comecei com React Native" },
        ],
    },
    work: {
        heading: "Projetos",
        kicker: "Três apps que construí sozinho e ainda mantenho, todos na App Store e no Google Play. Cada um começou com algo que vi de perto: a espera no ponto de ônibus, torneio de vôlei organizado no papel, a recepção de convidados num evento de verdade.",
        tally: { projects: "apps", problems: "problemas resolvidos" },
    },
    projects: [
        {
            slug: "bus-times",
            logo: "/logos/bus-times.577ac812.webp",
            name: "Bus Times",
            tagline: "Horários ao vivo de ônibus, Luas e trem na Irlanda",
            year: "2026",
            summary:
                "Mais ou menos uma semana depois de chegar à Irlanda, percebi uma coisa que me incomodava: já existia um app de transporte público, mas eu continuava no ponto sem saber se o ônibus ia mesmo passar. Então fiz o meu. Ele lista as partidas dos pontos perto de você, separa o horário ao vivo do programado e põe os veículos no mapa, com os dados oficiais da TFI.",
            shot: {
                alt: "Três telas do Bus Times passando por dentro de um telefone: as partidas de um ponto, os widgets da tela inicial e o mapa ao vivo",
                watch: {
                    src: "/telas/clock.png",
                    alt: "O app de Apple Watch, mostrando as próximas partidas de um ponto salvo",
                    label: "Relógio",
                },
                screens: [
                    { src: "/telas/bus-times-1.2ddd7db3.webp", label: "Partidas" },
                    { src: "/telas/bus-times-2.9bafc43b.webp", label: "Widgets" },
                    { src: "/telas/bus-times-3.fbedf1d2.webp", label: "Mapa" },
                ],
            },
            highlights: [
                {
                    title: "Transformar um feed de 250 MB em algo que cabe no celular",
                    body: "O feed GTFS nacional é um arquivo de 250 MB, grande demais para mandar a um celular. Um script em Node quebra esse arquivo em cerca de 10.200 JSONs pequenos, um por ponto, guardados no Cloudflare R2. Um Worker serve esses arquivos, consulta o GTFS-Realtime por cron e cuida de cache, kill switches e limite por IP.",
                },
                {
                    title: "Os erros 503 em Cork",
                    body: "Testando em Cork, de 26% a 33% das consultas de partidas voltavam com 503, e o app avisava que não conseguia falar com o servidor. O problema era CPU: um lote de vinte pontos fazia o Worker processar 3,8 MB de JSON num cold start, passando do limite de 10 ms. Dividi o lote em blocos de oito, cada um com seu próprio limite, e os erros foram a zero.",
                },
                {
                    title: "Tempo real em só 4,3% das partidas",
                    body: "No começo só 4,3% das partidas mostravam horário ao vivo, mesmo com o feed oficial funcionando. O feed irlandês só informa o atraso em algumas paradas de cada viagem, então o servidor leva esse atraso adiante pelo resto da viagem. A cobertura ao vivo foi para 67,9% das partidas, sem custo extra por usuário.",
                },
                {
                    title: "O widget certo com o app fechado",
                    body: "Quem decide quando um widget atualiza é o iOS, então ficar consultando não é opção. O horário programado nunca muda, só o atraso. O app entrega ao widget uma linha do tempo de 12 entradas cobrindo a próxima hora, cada uma contando a partir do horário absoluto, e os minutos continuam certos com o app fechado.",
                },
                {
                    title: "Um app de Apple Watch em SwiftUI",
                    body: "O app do relógio é SwiftUI nativo e nunca chama o backend. Ele mostra as partidas que o celular já buscou, enviadas por WatchConnectivity. As complications só podem ser atualizadas umas cinquenta vezes por dia, e por isso o celular só envia alguma coisa quando o dado mudou de verdade.",
                },
                {
                    title: "Tempo real quebrando sem erro nenhum",
                    body: "De tempos em tempos o feed nacional troca os IDs das viagens, e quando isso acontecia o tempo real parava de bater com o horário programado, sem nenhum aviso. Hoje um workflow do GitHub Actions roda duas vezes por semana, compara um hash do trips.txt e só reconstrói os dados quando ele mudou. Um cron no Worker não dava conta: processar 250 MB pede muito mais que os 128 MB de memória de um Worker.",
                },
            ],
            stack: ["Expo", "React Native", "TypeScript", "Cloudflare Workers", "R2", "SwiftUI", "WidgetKit", "GitHub Actions"],
            links: [
                { label: "App Store", href: stores.busTimes.appStore },
                { label: "Google Play", href: stores.busTimes.googlePlay },
                { label: "Código do backend", href: "https://github.com/AndreOleari015/tfi-departures-worker" },
            ],
        },
        {
            slug: "scoreboard",
            logo: "/logos/scoreboard.8eac9fd5.webp",
            name: "Scoreboard",
            tagline: "Placar e gestão de torneios para esporte amador",
            year: "2025 a 2026",
            summary:
                "O Scoreboard veio de anos vendo torneios de vôlei organizados com vários apps diferentes e, às vezes, no papel. App de placar sempre existiu. O difícil era organizar o torneio em si, com grupos, classificação e mata-mata. Então ele começou como placar e virou um gerenciador de torneios que funciona totalmente offline.",
            shot: {
                alt: "Três telas do Scoreboard por dentro de um telefone: criação de torneio, os jogos dos grupos e a classificação",
                screens: [
                    { src: "/telas/scoreboard-1.4adc5506.webp", label: "Criação" },
                    { src: "/telas/scoreboard-2.23eb834d.webp", label: "Jogos" },
                    { src: "/telas/scoreboard-3.f9343d92.webp", label: "Classificação" },
                ],
            },
            highlights: [
                {
                    title: "As regras de cada esporte guardadas como dado",
                    body: "Vôlei, futsal e basquete não pontuam nem desempatam do mesmo jeito. Em vez de um if para cada esporte, as regras ficam numa tabela que o Remote Config pode sobrescrever, então dá para corrigir uma regra sem lançar versão nova. Depois tirei o motor de dentro do app, e ele virou uma biblioteca TypeScript de código aberto, sem dependências e com 100 testes.",
                },
                {
                    title: "O que acontece quando o tempo acaba",
                    body: "Quando o tempo acaba, várias perguntas aparecem de uma vez: era o último período, deu empate, esse esporte tem prorrogação, depois pênaltis, depois morte súbita? Um único loop do timer responde uma por uma, e a prorrogação e a disputa de pênaltis guardam estado próprio, ao lado da partida.",
                },
                {
                    title: "Tudo fica no celular",
                    body: "Não existe servidor para os dados das partidas. Tudo é salvo com AsyncStorage no aparelho, então o app funciona num ginásio sem sinal. Algumas partidas salvas acabavam marcadas como jogo de torneio sem o ID do torneio, e em vez de travar, o app agora abre essas partidas como casuais.",
                },
                {
                    title: "Teste grátis e cancelamento",
                    body: "Quem cancela durante o teste grátis perde o premium na hora. Quem pagou e depois cancelou mantém até o fim do período pago. E se o Remote Config não carregar, as compras continuam liberadas, para que uma flag faltando nunca esconda o paywall por engano.",
                },
            ],
            stack: ["Expo", "React Native", "TypeScript", "Firebase Remote Config", "RevenueCat", "expo-print"],
            links: [
                { label: "App Store", href: stores.scoreboard.appStore },
                { label: "Google Play", href: stores.scoreboard.googlePlay },
                { label: "Código do motor", href: "https://github.com/AndreOleari015/tournament-engine" },
            ],
        },
        {
            slug: "lista-virtual",
            logo: "/logos/lista-virtual.5eeeecb4.webp",
            name: "Lista Virtual",
            tagline: "Lista de convidados, RSVP e check-in para eventos",
            year: "2025 a 2026",
            summary:
                "A Lista Virtual surgiu de problemas que eu conhecia de perto na organização e na recepção de eventos, quase sempre com uma lista impressa na porta. Ela importa a lista de convidados, envia convites com confirmação de presença e faz o check-in, mesmo sem sinal. Já são mais de 4 mil eventos criados e mais de 13 mil check-ins feitos com ela.",
            shot: {
                alt: "Três telas do Lista Virtual passando por dentro de um telefone: a lista de convidados, o check-in acontecendo e o app sem conexão",
                screens: [
                    { src: "/telas/lista-virtual-1.4bee988d.webp", label: "Lista" },
                    { src: "/telas/lista-virtual-2.d0874f96.webp", label: "Check-in" },
                    { src: "/telas/lista-virtual-3.2b945b1a.webp", label: "Sem rede" },
                ],
            },
            highlights: [
                {
                    title: "Check-in que funciona sem sinal",
                    body: "Muito salão de festa tem sinal fraco ou nenhum, e é justamente ali que o check-in acontece. O QR de cada convidado leva um payload curto com o evento e o convidado, e o leitor procura na lista que já está no celular, sem passar pela rede.",
                },
                {
                    title: "Três jeitos de usar o mesmo app",
                    body: "Dá para usar sem conta, com tudo no celular, ou entrar e sincronizar as listas em tempo real pelo Firestore. Quem trabalha na porta usa o modo recepcionista, que entra com um código de acesso e nunca mexe na conta do dono. Se a pessoa cria conta depois, o que estava no celular sobe em lotes.",
                },
                {
                    title: "Relatório para o cliente do organizador",
                    body: "Depois do evento, o organizador normalmente precisa mostrar ao cliente dele quem compareceu. O app gera relatórios em PDF e Excel no próprio aparelho, com a logo do organizador se ele quiser, e a logo fica no celular em vez de ser enviada.",
                },
                {
                    title: "Links de convite que não dá para reaproveitar",
                    body: "Os convites vão pelo WhatsApp, e mensagem de WhatsApp é encaminhada. Cada link de confirmação leva um token de uso único, emitido por uma Cloud Function, com limite de tentativas e registro de auditoria, então uma cópia encaminhada para de funcionar assim que o convidado responde.",
                },
            ],
            stack: ["Expo", "React Native", "TypeScript", "Firebase", "Cloud Functions", "Firestore", "RevenueCat"],
            links: [
                { label: "Página do app", href: "/pt/lista-virtual" },
                { label: "App Store", href: stores.listaVirtual.appStore },
                { label: "Google Play", href: stores.listaVirtual.googlePlay },
            ],
        },
    ],
    experience: {
        heading: "Experiência",
        kicker: "Meus primeiros empregos foram num escritório de contabilidade e em suporte de TI, no Pará. O desenvolvimento virou meu trabalho em tempo integral no fim de 2024.",
        jobs: [
            {
                role: "Engenheiro de Software, React Native e Expo",
                company: "Pixel Logic Apps",
                period: `Nov 2024 a ${PIXEL_LOGIC_END.pt}`,
                location: "Remoto",
                summary:
                    "Trabalhei em mais de 30 produtos mobile, muitas vezes da ideia inicial até a publicação. Com o tempo o trabalho foi além de escrever código: passei a responder pela entrega, pelas decisões técnicas e por manter os apps funcionando bem em produção.",
                bullets: [
                    "Construí a nova versão do Bobbie Goods: Coloring Book do primeiro commit até a App Store em 18 dias, com seis recursos de monetização testados em quatro experimentos A/B.",
                    "Levei o Vale Gás / Auxílio Meu Social do primeiro commit ao Google Play em três dias. Ele passou de 500 mil downloads, transformando informação complicada sobre benefícios sociais em algo simples de usar no celular.",
                    "Todo app novo repetia a mesma configuração e as mesmas integrações, então isso foi para um toolkit Expo compartilhado. Ajudei a moldar a biblioteca e a caçar os bugs que só apareciam quando ela rodava no catálogo inteiro, e os apps novos passaram a começar mais rápido e mais padronizados.",
                    "Automatizei a publicação nas lojas com Fastlane em 18 apps. Mandar uma versão para as lojas deixou de tomar boa parte do dia e passou a levar cerca de um minuto.",
                    "Liderei um time pequeno de dois desenvolvedores, ajudando a destravar decisões e a manter a entrega andando, sem largar o código.",
                ],
                apps: {
                    label: "Outros apps em que trabalhei",
                    items: ["We Are Not Really Strangers", "Versículo do Dia", "Loterias", "Omnia Model", "Glassify Widgets"],
                },
            },
            {
                role: "Engenheiro de Software",
                company: "Starta Solutions",
                period: "Nov 2022 a Jan 2023",
                location: "Freelance, remoto",
                summary: "Trabalhei com um time full-stack num produto mobile que precisava continuar útil mesmo com pouca conexão.",
                bullets: [
                    "Construí os fluxos de autenticação e de sincronização de dados em React Native, pensados para continuar funcionando em rede instável, consumindo APIs REST em Node.js e MySQL.",
                    "Foi minha primeira vez num produto de verdade com outros desenvolvedores, e não só nos meus próprios projetos.",
                ],
            },
        ],
        earlier: {
            label: "Antes de programar em tempo integral",
            jobs: [
                {
                    role: "Especialista em TI",
                    company: "Carajás Ambientes Planejados",
                    period: "Mai 2024 a Nov 2024",
                    location: "Remoto",
                    summary: "Cuidei de acesso, sincronização e backup no OneDrive e no SharePoint, e dei suporte a usuários, aparelhos e acesso à rede.",
                },
                {
                    role: "Especialista em TI",
                    company: "Tecsil",
                    period: "Mai 2023 a Ago 2023",
                    location: "Presencial, Paragominas",
                    summary: "Redes, aparelhos, sistemas internos e suporte remoto, lidando ao mesmo tempo com o problema técnico e com a pessoa afetada por ele.",
                },
                {
                    role: "Especialista em TI",
                    company: "Tecsil",
                    period: "Mai 2022 a Nov 2022",
                    location: "Presencial, Paragominas",
                    summary: "Um dos meus primeiros trabalhos com tecnologia: problemas de rede, equipamento e acesso, resolvidos direto com quem dependia deles.",
                },
                {
                    role: "Trainee",
                    company: "Contabilidade Destro e Destro",
                    period: "Jun 2021 a Abr 2022",
                    location: "Paragominas",
                    summary: "Meu primeiro emprego. Lançava, conferia e conciliava dados financeiros no Fortes Contábil, e aprendi ali o quanto importa o dado estar certo.",
                },
            ],
        },
    },
    about: {
        heading: "Sobre",
        kicker: "Como cheguei aqui",
        body: [
            "Comecei a programar em 2019 no IFPA, quando um professor me apresentou o React Native num curso que ainda ensinava class components. No começo apanhei bastante, então a maior parte do que aprendi veio de construir coisas sozinho: pesquisando, testando e resolvendo os problemas conforme apareciam.",
            "Com o tempo esses projetos deixaram de ser exercício e viraram apps de verdade, e o trabalho cresceu junto: Firebase, APIs, pagamentos, publicação na App Store e no Google Play, CI/CD, atualizações OTA. Hoje moro em Cork, e o que me move ainda é o mesmo do começo: entender como as coisas funcionam, e construir.",
        ],
        educationHeading: "Formação",
        education: [
            {
                course: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
                school: "Instituto Federal do Pará (IFPA)",
                period: "2022 a 2024",
            },
            {
                course: "Técnico em Informática",
                school: "Instituto Federal do Pará, Campus Paragominas",
                period: "2019 a 2022",
            },
        ],
    },
    skills: {
        heading: "Com o que trabalho",
        groups: [
            { label: "Mobile", items: ["React Native", "Expo", "TypeScript", "SwiftUI", "WidgetKit", "WatchConnectivity", "AsyncStorage"] },
            { label: "Backend e dados", items: ["Node.js", "Cloudflare Workers", "R2", "Firebase", "Cloud Functions", "Firestore"] },
            { label: "Publicação e pagamentos", items: ["EAS Build", "GitHub Actions", "RevenueCat", "Remote Config"] },
        ],
    },
    contact: {
        heading: "Falar comigo",
        kicker: "Estou buscando vagas de Mobile Engineer, React Native Developer ou Software Engineer, na Irlanda ou remotas.",
        body: "O jeito mais rápido de falar comigo é por email, mas pelo LinkedIn também funciona.",
        emailLabel: "Mandar um email",
    },
    footer: {
        built: "Feito com Next.js e Tailwind.",
        rights: "Todos os direitos reservados.",
    },
    localeSwitch: { label: "English", to: "en" },
};

const dictionaries: Record<Locale, Dictionary> = { en, pt };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale] ?? dictionaries.en;

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);
