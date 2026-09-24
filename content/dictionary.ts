/**
 * Conteúdo do site nos dois idiomas.
 * Fonte única de verdade: nenhum texto fica hardcoded nos componentes.
 */

const PIXEL_LOGIC_END = { en: "Jul 2026", pt: "Jul 2026" };

export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];

export const profile = {
    name: "Andre Oleari",
    email: "andre.oleari1@gmail.com",
    github: "https://github.com/AndreOleari015",
    githubHandle: "AndreOleari015",
    linkedin: "https://www.linkedin.com/in/andre-oleari-83406520b",
    linkedinHandle: "andre-oleari",
    /** Um arquivo só, em inglês, porque o mercado é irlandês. O nome é
     *  estável de propósito: é uma URL que as pessoas guardam e compartilham,
     *  e um hash de conteúdo quebraria o link a cada versão do CV.
     *
     *  A versão atual saiu do `job-tailor`, de
     *  `output/f24-senior-mobile-developer/oleari-cv-f24.pdf`. Entre as 57
     *  geradas, é a que traz o Lista Virtual, a camada nativa do Apple Watch,
     *  a Pixel Logic Apps na experiência e o NARIC, sem nomear a empresa da
     *  vaga em lugar nenhum do corpo. */
    cv: "/andre-oleari-cv.pdf",
};

export type Project = {
    slug: string;
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
    /** A figura do projeto: o molde de telefone com as telas passando por
     *  dentro. Só os três apps têm. Ferramenta de código fechado se apresenta
     *  pela prosa, e forçar uma figura nela já falhou três vezes hoje. */
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
    /** Ícone do app. Só os apps têm, e é o que o hero mostra na frente dos telefones. */
    logo?: string;
};

export type Job = {
    role: string;
    company: string;
    period: string;
    location: string;
    bullets: string[];
    /** Produtos do empregador em que trabalhou. Não são projetos próprios. */
    apps?: { label: string; items: string[] };
};

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
    experience: { heading: string; kicker: string; jobs: Job[]; earlierNote: string };
    about: { heading: string; kicker: string; body: string[]; educationHeading: string; education: { course: string; school: string; period: string }[] };
    skills: { heading: string; groups: { label: string; items: string[] }[] };
    contact: { heading: string; kicker: string; body: string; emailLabel: string };
    footer: { built: string; rights: string };
    localeSwitch: { label: string; to: string };
};

// ---------------------------------------------------------------------------
// EN
// ---------------------------------------------------------------------------
const en: Dictionary = {
    meta: {
        title: "Andre Oleari · Mobile Software Engineer",
        description:
            "Mobile software engineer in Cork, Ireland. I build and ship cross-platform apps end to end: data pipeline, backend, app and store release.",
    },
    nav: { work: "Work", experience: "Experience", about: "About", contact: "Contact" },
    a11y: { themeToggle: "Switch between light and dark" },
    cv: { label: "Download CV", note: "PDF, one page" },
    hero: {
        role: "Mobile Software Engineer",
        location: "Cork, Ireland",
        available: "Open to work",
        headline: {
            left: "I ship mobile apps end to end",
            right: "and I can show you the parts that were hard.",
        },
        intro:
            "React Native and Expo, but rarely only that. My last project needed a data pipeline, a serverless backend, iOS widgets and a native Apple Watch app, so I built those too. Three of my own apps are live on the App Store.",
        ctaWork: "Read the work",
        ctaContact: "Get in touch",
        portraitAlt: "Andre Oleari",
        stats: [
            { value: "03", label: "Apps published on my own account" },
            { value: "11", label: "Languages shipped in a single app" },
            { value: "2022", label: "Building mobile since" },
        ],
    },
    work: {
        heading: "Selected work",
        kicker: "Three apps on my own developer account, live on the App Store. Each one is here for a different technical problem, and none of them stopped at the app.",
        tally: { projects: "projects", problems: "problems solved" },
    },
    projects: [
        {
            slug: "bus-times",
            logo: "/logos/bus-times.577ac812.webp",
            name: "Bus Times",
            tagline: "Live public transport departures for Ireland",
            year: "2026",
            summary:
                "Unofficial companion for Irish bus, tram and rail. It answers one question: run, or do I have time? That is why it can never blur real-time with scheduled.",
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
                    title: "The whole stack, not just the app",
                    body: "A Node pipeline slices the 250 MB national GTFS feed into ~10,200 per-stop JSON files in R2. A Worker serves them, polls GTFS-Realtime on a cron, and carries the caches, kill switches and per-IP limits.",
                },
                {
                    title: "A 503 rate of 26% to 33%, measured and fixed",
                    body: "Twenty Cork stops in one batch blew the Worker's 10 ms CPU budget on a cold isolate. Chunks of eight each get their own budget, so a bad chunk costs eight stops, not the list. Failures went to zero.",
                },
                {
                    title: "A widget that updates itself while the app is closed",
                    body: "Scheduled times are deterministic; only the live delay drifts. So the widget gets a 12-entry timeline covering an hour and iOS walks it, each entry recomputing from the absolute due time.",
                },
                {
                    title: "Native Apple Watch app in SwiftUI",
                    body: "The watch mirrors data the phone already fetched over WatchConnectivity, so the backend pays nothing. Payloads are deduplicated first, because the complication quota is about fifty pushes a day.",
                },
                {
                    title: "CI that repairs itself",
                    body: "The national feed rotates trip IDs, which silently broke real-time matching. A scheduled workflow fingerprints trips.txt and rebuilds only when it actually changed.",
                },
            ],
            stack: ["Expo", "React Native", "TypeScript", "Cloudflare Workers", "R2", "SwiftUI", "WidgetKit", "GitHub Actions"],
            links: [
                { label: "App Store", href: "https://apps.apple.com/ie/app/bus-times-dublin-ireland/id6783506737" },
                { label: "Backend source", href: "https://github.com/AndreOleari015/tfi-departures-worker" },
            ],
        },
        {
            slug: "scoreboard",
            logo: "/logos/scoreboard.8eac9fd5.webp",
            name: "Scoreboard",
            tagline: "Scorekeeper, bracket maker and tournament manager",
            year: "2025 to 2026",
            summary:
                "A digital scoreboard for amateur sport that grew into a tournament manager. Phone flat on the table, big readable numbers, and a full competition engine behind them.",
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
                    title: "Tournament engine driven by data, not branches",
                    body: "Groups, round-robin and knockout, with standings and tiebreaks defined per sport as data, overridable through Remote Config, so a scoring rule changes without a new build. The core is now a dependency-free library under 100 tests.",
                },
                {
                    title: "A match state machine that has to survive edge cases",
                    body: "One timer loop resolves the cascade: period over, was it the last, is it a draw, extra time, penalties, sudden death. Overtime and shootout carry their own parallel state.",
                },
                {
                    title: "Offline-first with self-healing storage",
                    body: "Everything lives in AsyncStorage; there is no data backend. A saved match that claims a tournament but carries no tournament ID is demoted to a casual match instead of crashing.",
                },
                {
                    title: "Entitlement logic that respects the user",
                    body: "A cancelled trial loses access immediately; someone who paid and then cancelled keeps it until the period ends. The gate is fail-closed, so a missing config flag never hides the paywall.",
                },
            ],
            stack: ["Expo", "React Native", "TypeScript", "Firebase Remote Config", "RevenueCat", "expo-print"],
            links: [
                { label: "App Store", href: "https://apps.apple.com/ie/app/scoreboard-tournament-track/id6756669003" },
                { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.scoreboardapp.app" },
                { label: "Engine source", href: "https://github.com/AndreOleari015/tournament-engine" },
            ],
        },
        {
            slug: "lista-virtual",
            logo: "/logos/lista-virtual.5eeeecb4.webp",
            name: "Lista Virtual",
            tagline: "Guest list, RSVP and live check-in for events",
            year: "2025 to 2026",
            summary:
                "Event organisers still run the door off a printed spreadsheet. This imports the list, sends RSVP invitations and checks people in at the door, including with no signal.",
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
                    title: "QR check-in that works with no connection",
                    body: "A compact custom payload encodes event and guest, and the scanner resolves it against the list already in memory. No network round-trip, which is the whole point in a room with no coverage.",
                },
                {
                    title: "Three session modes, one codebase",
                    body: "Local with no account, signed-in with Firestore realtime sync, and a receptionist mode that logs in by access code and never touches the owner's account. Creating an account migrates local data up in batched writes.",
                },
                {
                    title: "Reports the client can hand over",
                    body: "PDF and Excel exports generated on device, with optional white-label branding for the organiser's own client. The logo stays local by design and never leaves the phone.",
                },
                {
                    title: "Invitations with single-use tokens",
                    body: "Cloud Functions issue opaque, single-use RSVP tokens with rate limiting and an audit trail, so a forwarded invite cannot be replayed.",
                },
            ],
            stack: ["Expo", "React Native", "TypeScript", "Firebase", "Cloud Functions", "Firestore", "RevenueCat"],
            links: [
                { label: "App page", href: "/en/lista-virtual" },
                { label: "App Store", href: "https://apps.apple.com/ie/app/lista-virtual-guest-list/id6738919953" },
                { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.ROC" },
            ],
        },
    ],
    experience: {
        heading: "Experience",
        kicker: "From IT support in Brazil to shipping mobile products from Ireland.",
        jobs: [
            {
                role: "Mobile Software Engineer",
                company: "Pixel Logic Apps",
                period: `Nov 2024 to ${PIXEL_LOGIC_END.en}`,
                location: "Remote",
                bullets: [
                    "Shipped cross-platform apps in React Native, Expo and TypeScript on a shared architecture, from first commit to App Store and Google Play release.",
                    "Over thirty apps in the studio catalogue, lead developer on more than a dozen: Firebase, REST, realtime sync, ad placement and RevenueCat billing.",
                    "Helped shape the studio's shared Expo library, diagnosing bugs that only surfaced from running it across the whole catalogue.",
                    "Localised apps and their store listings into as many as eleven languages.",
                ],
                apps: {
                    label: "Apps I worked on",
                    items: [
                        "Bobbie Goods",
                        "We Are Not Really Strangers",
                        "Versículo do Dia",
                        "Loterias",
                        "Omnia Model",
                        "Glassify Widgets",
                    ],
                },
            },
            {
                role: "Mobile Engineer",
                company: "Freelance",
                period: "Jan 2022 to Present",
                location: "Brazil / Remote",
                bullets: [
                    "Designed, built and published my own apps across events, sport, public data and public transport.",
                    "Built the backends they needed: Node.js, PHP and Firebase Cloud Functions against Firestore and third-party APIs.",
                ],
            },
            {
                role: "Mobile Application Developer",
                company: "Starta Solutions",
                period: "Nov 2022 to Jan 2023",
                location: "Brazil",
                bullets: [
                    "Built offline-first authentication and sync modules in React Native against REST APIs backed by Node.js and MySQL.",
                ],
            },
        ],
        earlierNote:
            "Two years in IT support in Brazil before development full time: corporate networks, workstations, permissions, remote assistance. Where I learned to debug something I did not build.",
    },
    about: {
        heading: "About",
        kicker: "Short version",
        body: [
            "I am a mobile engineer in Cork, mainly React Native and Expo. What I like sits either side of the app: where the data comes from, and how it gets to the store.",
            "It shows in what I build. Bus Times needed a GTFS pipeline before it needed a screen; Scoreboard needed a tournament engine before it needed a scoreboard. I read and write code in English and Portuguese.",
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
        heading: "Tools I reach for",
        groups: [
            { label: "The app", items: ["React Native", "Expo", "TypeScript", "SwiftUI", "WidgetKit", "WatchConnectivity", "AsyncStorage"] },
            { label: "What the apps needed behind them", items: ["Node.js", "Cloudflare Workers", "R2", "Firebase", "Cloud Functions", "Firestore"] },
            { label: "Shipping them", items: ["EAS Build", "GitHub Actions", "RevenueCat", "Remote Config"] },
        ],
    },
    contact: {
        heading: "Get in touch",
        kicker: "Open to mobile engineering roles in Ireland and remote.",
        body: "The fastest way to reach me is email. I read everything, and I reply.",
        emailLabel: "Email me",
    },
    footer: {
        built: "Built with Next.js and Tailwind. Written in two languages, by hand.",
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
            "Engenheiro de software mobile em Cork, Irlanda. Construo e publico apps multiplataforma de ponta a ponta: pipeline de dados, backend, app e publicação na loja.",
    },
    nav: { work: "Projetos", experience: "Experiência", about: "Sobre", contact: "Contato" },
    a11y: { themeToggle: "Alternar entre claro e escuro" },
    cv: { label: "Baixar o CV", note: "PDF, uma página, em inglês" },
    hero: {
        role: "Engenheiro de Software Mobile",
        location: "Cork, Irlanda",
        available: "Aberto a propostas",
        headline: {
            left: "Levo apps mobile do início ao ar",
            right: "e posso mostrar as partes que foram difíceis.",
        },
        intro:
            "React Native e Expo, mas raramente só isso. Meu último projeto precisou de pipeline de dados, backend serverless, widgets de iOS e um app nativo de Apple Watch, então construí também. Três apps meus estão publicados na App Store.",
        ctaWork: "Ler os projetos",
        ctaContact: "Falar comigo",
        portraitAlt: "Andre Oleari",
        stats: [
            { value: "03", label: "Apps publicados na minha própria conta" },
            { value: "11", label: "Idiomas em um único app" },
            { value: "2022", label: "Construindo mobile desde" },
        ],
    },
    work: {
        heading: "Projetos selecionados",
        kicker: "Três apps na minha própria conta de desenvolvedor, publicados na App Store. Cada um está aqui por um problema técnico diferente, e nenhum deles parou no app.",
        tally: { projects: "projetos", problems: "problemas resolvidos" },
    },
    projects: [
        {
            slug: "bus-times",
            logo: "/logos/bus-times.577ac812.webp",
            name: "Bus Times",
            tagline: "Horários de transporte público da Irlanda em tempo real",
            year: "2026",
            summary:
                "Companheiro não-oficial para ônibus, tram e trem na Irlanda. Responde a uma pergunta: corro ou dá tempo? É por isso que nunca pode confundir tempo real com horário programado.",
            shot: {
                alt: "Três telas do Bus Times passando por dentro de um telefone: as partidas de uma parada, os widgets da tela inicial e o mapa ao vivo",
                watch: {
                    src: "/telas/clock.png",
                    alt: "O app de Apple Watch, mostrando as próximas partidas de uma parada salva",
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
                    title: "A pilha inteira, não só o app",
                    body: "Um pipeline em Node fatia o feed GTFS nacional de 250 MB em ~10.200 JSONs por parada no R2. Um Worker os serve, consulta o GTFS-Realtime por cron e carrega os caches, os kill switches e o limite por IP.",
                },
                {
                    title: "De 26% a 33% de erro 503, medido e resolvido",
                    body: "Vinte paradas de Cork num lote estouravam o limite de 10 ms de CPU do Worker em isolate frio. Blocos de oito ganham orçamento próprio, então um bloco ruim custa oito paradas e não a lista. A falha foi a zero.",
                },
                {
                    title: "Um widget que se atualiza com o app fechado",
                    body: "Horário programado é determinístico; só o atraso ao vivo varia. Então o widget recebe uma timeline de 12 entradas cobrindo uma hora e o iOS a percorre, cada entrada recalculando a partir do horário absoluto.",
                },
                {
                    title: "App nativo de Apple Watch em SwiftUI",
                    body: "O relógio espelha por WatchConnectivity o dado que o telefone já buscou, então o backend não paga nada. Os payloads são deduplicados antes, porque a cota da complication é de cerca de cinquenta envios por dia.",
                },
                {
                    title: "CI que se conserta sozinho",
                    body: "O feed nacional rotaciona os IDs de viagem, o que quebrava o tempo real em silêncio. Um workflow agendado tira o fingerprint do trips.txt e só reconstrói quando ele mudou de verdade.",
                },
            ],
            stack: ["Expo", "React Native", "TypeScript", "Cloudflare Workers", "R2", "SwiftUI", "WidgetKit", "GitHub Actions"],
            links: [
                { label: "App Store", href: "https://apps.apple.com/ie/app/bus-times-dublin-ireland/id6783506737" },
                { label: "Código do backend", href: "https://github.com/AndreOleari015/tfi-departures-worker" },
            ],
        },
        {
            slug: "scoreboard",
            logo: "/logos/scoreboard.8eac9fd5.webp",
            name: "Scoreboard",
            tagline: "Placar, chaveamento e gestão de torneios",
            year: "2025 a 2026",
            summary:
                "Um placar digital para esporte amador que virou gerenciador de torneios. Celular deitado na mesa, números grandes e legíveis, e um motor de competição completo atrás deles.",
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
                    title: "Motor de torneio orientado a dados, não a condicionais",
                    body: "Grupos, pontos corridos e mata-mata, com classificação e desempate definidos por esporte como dado, sobrescritos por Remote Config, então mudar uma regra não exige versão nova. O núcleo hoje é uma biblioteca sem dependências, com 100 testes.",
                },
                {
                    title: "Uma máquina de estados que precisa aguentar os casos raros",
                    body: "Um único loop de timer resolve a cascata: acabou o período, era o último, deu empate, prorrogação, pênaltis, morte súbita. Prorrogação e disputa carregam estado paralelo próprio.",
                },
                {
                    title: "Offline-first com armazenamento que se autocorrige",
                    body: "Tudo vive no AsyncStorage; não há backend de dados. Partida salva que diz pertencer a um torneio mas está sem o ID é rebaixada para casual em vez de quebrar.",
                },
                {
                    title: "Lógica de assinatura que respeita o usuário",
                    body: "Teste cancelado perde o acesso na hora; quem pagou e depois cancelou mantém até o período terminar. O gate é fail-closed, então uma flag de config ausente nunca esconde o paywall.",
                },
            ],
            stack: ["Expo", "React Native", "TypeScript", "Firebase Remote Config", "RevenueCat", "expo-print"],
            links: [
                { label: "App Store", href: "https://apps.apple.com/ie/app/scoreboard-tournament-track/id6756669003" },
                { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.scoreboardapp.app" },
                { label: "Código do motor", href: "https://github.com/AndreOleari015/tournament-engine" },
            ],
        },
        {
            slug: "lista-virtual",
            logo: "/logos/lista-virtual.5eeeecb4.webp",
            name: "Lista Virtual",
            tagline: "Lista de convidados, RSVP e check-in ao vivo para eventos",
            year: "2025 a 2026",
            summary:
                "Organizador de evento ainda controla a portaria com planilha impressa. Este importa a lista, dispara convites com RSVP e faz o check-in na porta, inclusive sem sinal.",
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
                    title: "Check-in por QR que funciona sem conexão",
                    body: "Um payload compacto e próprio codifica evento e convidado, e o leitor resolve contra a lista já em memória. Sem ida e volta de rede, que é o ponto num salão sem cobertura.",
                },
                {
                    title: "Três modos de sessão, uma base de código",
                    body: "Local sem conta, autenticado com sincronização em tempo real no Firestore, e um modo recepcionista que entra por código e nunca toca na conta do dono. Criar conta migra o dado local em escritas em lote.",
                },
                {
                    title: "Relatórios que o cliente pode entregar",
                    body: "Exportação em PDF e Excel gerada no próprio aparelho, com marca opcional para o organizador usar com o cliente dele. A logo fica local por decisão de projeto e nunca sai do telefone.",
                },
                {
                    title: "Convites com token de uso único",
                    body: "Cloud Functions emitem tokens de RSVP opacos e de uso único, com limite de taxa e trilha de auditoria, para que um convite repassado não seja reutilizado.",
                },
            ],
            stack: ["Expo", "React Native", "TypeScript", "Firebase", "Cloud Functions", "Firestore", "RevenueCat"],
            links: [
                { label: "Página do app", href: "/pt/lista-virtual" },
                { label: "App Store", href: "https://apps.apple.com/ie/app/lista-virtual-guest-list/id6738919953" },
                { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.ROC" },
            ],
        },
    ],
    experience: {
        heading: "Experiência",
        kicker: "De suporte de TI no Brasil a publicar produtos mobile desde a Irlanda.",
        jobs: [
            {
                role: "Engenheiro de Software Mobile",
                company: "Pixel Logic Apps",
                period: `Nov 2024 a ${PIXEL_LOGIC_END.pt}`,
                location: "Remoto",
                bullets: [
                    "Publiquei apps multiplataforma em React Native, Expo e TypeScript sobre arquitetura compartilhada, do primeiro commit à publicação na App Store e no Google Play.",
                    "Mais de trinta apps do catálogo do estúdio, desenvolvedor principal em mais de uma dúzia: Firebase, REST, tempo real, anúncios e cobrança com RevenueCat.",
                    "Ajudei a moldar a biblioteca Expo compartilhada do estúdio, diagnosticando bugs que só apareciam ao rodá-la no catálogo inteiro.",
                    "Localizei apps e suas fichas de loja em até onze idiomas.",
                ],
                apps: {
                    label: "Apps em que trabalhei",
                    items: [
                        "Bobbie Goods",
                        "We Are Not Really Strangers",
                        "Versículo do Dia",
                        "Loterias",
                        "Omnia Model",
                        "Glassify Widgets",
                    ],
                },
            },
            {
                role: "Engenheiro Mobile",
                company: "Autônomo",
                period: "Jan 2022 até hoje",
                location: "Brasil / Remoto",
                bullets: [
                    "Projetei, construí e publiquei apps próprios em eventos, esporte, dados públicos e transporte público.",
                    "Construí os backends de que eles precisavam: Node.js, PHP e Firebase Cloud Functions contra Firestore e APIs de terceiros.",
                ],
            },
            {
                role: "Desenvolvedor de Aplicações Mobile",
                company: "Starta Solutions",
                period: "Nov 2022 a Jan 2023",
                location: "Brasil",
                bullets: [
                    "Construí módulos de autenticação e sincronização offline-first em React Native, consumindo APIs REST com Node.js e MySQL.",
                ],
            },
        ],
        earlierNote:
            "Dois anos em suporte de TI no Brasil antes de migrar para desenvolvimento em tempo integral: redes corporativas, estações de trabalho, permissões, atendimento remoto. Onde aprendi a depurar algo que não fui eu que construí.",
    },
    about: {
        heading: "Sobre",
        kicker: "Versão curta",
        body: [
            "Sou engenheiro de software mobile e moro em Cork, principalmente React Native e Expo. O que eu gosto fica de cada lado do app: de onde vem o dado e como ele chega à loja.",
            "Isso aparece no que eu construo. O Bus Times precisou de um pipeline GTFS antes de precisar de tela; o Scoreboard precisou de um motor de torneio antes de precisar de um placar. Leio e escrevo código em inglês e português.",
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
        heading: "Ferramentas que uso",
        groups: [
            { label: "O app", items: ["React Native", "Expo", "TypeScript", "SwiftUI", "WidgetKit", "WatchConnectivity", "AsyncStorage"] },
            { label: "O que os apps precisaram atrás deles", items: ["Node.js", "Cloudflare Workers", "R2", "Firebase", "Cloud Functions", "Firestore"] },
            { label: "Publicar", items: ["EAS Build", "GitHub Actions", "RevenueCat", "Remote Config"] },
        ],
    },
    contact: {
        heading: "Falar comigo",
        kicker: "Aberto a vagas de engenharia mobile na Irlanda e remotas.",
        body: "O jeito mais rápido de me achar é por email. Eu leio tudo, e respondo.",
        emailLabel: "Me mandar um email",
    },
    footer: {
        built: "Feito com Next.js e Tailwind. Escrito nos dois idiomas, à mão.",
        rights: "Todos os direitos reservados.",
    },
    localeSwitch: { label: "English", to: "en" },
};

const dictionaries: Record<Locale, Dictionary> = { en, pt };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale] ?? dictionaries.en;

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);
