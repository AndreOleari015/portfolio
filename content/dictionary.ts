/**
 * Conteúdo do site nos dois idiomas.
 * Fonte única de verdade — nenhum texto fica hardcoded nos componentes.
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
};

export type Project = {
    slug: string;
    name: string;
    tagline: string;
    year: string;
    summary: string;
    shots: { src: string; alt: string }[];
    highlights: { title: string; body: string }[];
    stack: string[];
    links: { label: string; href: string }[];
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
    hero: {
        role: string;
        location: string;
        available: string;
        headline: string;
        intro: string;
        ctaWork: string;
        ctaContact: string;
        stats: { value: string; label: string }[];
    };
    work: { heading: string; kicker: string; note: string };
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
        title: "Andre Oleari — Software Engineer, Mobile",
        description:
            "Mobile software engineer in Cork, Ireland. I build and ship cross-platform apps end to end — data pipeline, backend, app, and store release.",
    },
    nav: { work: "Work", experience: "Experience", about: "About", contact: "Contact" },
    a11y: { themeToggle: "Switch between light and dark" },
    hero: {
        role: "Software Engineer — Mobile",
        location: "Cork, Ireland",
        available: "Open to work",
        headline: "I ship mobile apps end to end.",
        intro:
            "React Native and Expo, but rarely only that. My last project needed a data pipeline, a serverless backend, iOS widgets and a native Apple Watch app — so I built those too. Three of my own apps are live on the App Store.",
        ctaWork: "See the work",
        ctaContact: "Get in touch",
        stats: [
            { value: "03", label: "Apps published on my own account" },
            { value: "11", label: "Languages shipped in a single app" },
            { value: "2022", label: "Building mobile since" },
        ],
    },
    work: {
        heading: "Selected work",
        kicker: "Three apps I designed, built and published on my own developer account.",
        note: "Each one solves a different technical problem — that is why these three.",
    },
    projects: [
        {
            slug: "bus-times",
            name: "Bus Times: Dublin & Ireland",
            tagline: "Live public transport departures for Ireland",
            year: "2026",
            summary:
                "An unofficial companion for Irish bus, tram and rail. It answers one question — do I run or do I have time? — and it has to be right, so it distinguishes clearly between real-time and scheduled departures.",
            shots: [
                { src: "/shots/bus-times-nearby.webp", alt: "Nearby stops with live departure times" },
                { src: "/shots/bus-times-map.webp", alt: "Map showing stops and live vehicle positions" },
                { src: "/shots/bus-times-widgets.webp", alt: "Home Screen widgets showing the next departures" },
            ],
            highlights: [
                {
                    title: "The whole stack, not just the app",
                    body: "A Node pipeline turns the 250 MB national GTFS feed into roughly 10,200 per-stop JSON files in Cloudflare R2. A Worker serves them, polls the GTFS-Realtime feed on a cron, and holds LRU caches, kill switches and a per-IP rate limit.",
                },
                {
                    title: "A 503 rate of 26–33%, measured and fixed",
                    body: "Batch requests for ~20 Cork stops blew the Worker's 10 ms CPU budget on a cold isolate. Splitting into chunks of eight gave each its own budget, and Promise.allSettled meant one bad chunk cost eight stops instead of the whole list. Failure rate went to zero.",
                },
                {
                    title: "A widget that updates itself while the app is closed",
                    body: "Scheduled departure times are deterministic — only the live delay drifts. So instead of trying to wake the widget, it pushes a 12-entry timeline covering an hour and lets iOS walk it, each entry recomputing from the absolute due time.",
                },
                {
                    title: "Native Apple Watch app in SwiftUI",
                    body: "The watch mirrors data the phone already fetched over WatchConnectivity, so it costs nothing extra on the backend. Payloads are deduplicated before transfer because the complication quota is about fifty pushes a day.",
                },
                {
                    title: "CI that repairs itself",
                    body: "The national feed rotates trip IDs periodically, which silently broke real-time matching. A scheduled workflow fingerprints trips.txt and rebuilds only when it actually changes.",
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
            name: "Scoreboard – Tournament Track",
            tagline: "Scorekeeper, bracket maker and tournament manager",
            year: "2025—2026",
            summary:
                "A digital scoreboard for amateur sport that grew into a tournament manager. Phone flat on the table in landscape, big readable numbers — and behind that, a full competition engine.",
            shots: [
                { src: "/shots/scoreboard-scoring.webp", alt: "Landscape scoreboard during a match" },
                { src: "/shots/scoreboard-tournament.webp", alt: "Tournament setup with sport, format and timing options" },
                { src: "/shots/scoreboard-standings.webp", alt: "Automatically generated group standings" },
            ],
            highlights: [
                {
                    title: "Tournament engine driven by data, not branches",
                    body: "Group stages, round-robin and knockout brackets, with standings and tiebreak ordering defined per sport as data. Those rules can be overridden through Firebase Remote Config, so a scoring rule changes without shipping a build.",
                },
                {
                    title: "A match state machine that has to survive edge cases",
                    body: "One timer loop resolves the cascade: period ends, is it the last, is it a draw, is there extra time, are there penalties, is it sudden death. Overtime and shootout carry their own parallel state.",
                },
                {
                    title: "Offline-first with self-healing storage",
                    body: "Everything lives in AsyncStorage — no backend for data. Loading a saved match validates it: if it claims to belong to a tournament but has no tournament ID, it is demoted to a casual match instead of crashing.",
                },
                {
                    title: "Entitlement logic that respects the user",
                    body: "Subscription plus two one-time purchases. A cancelled trial loses access immediately, but someone who paid and then cancelled keeps it until the period actually ends. The gate is fail-closed, so a missing config flag never hides the paywall.",
                },
            ],
            stack: ["Expo", "React Native", "TypeScript", "Firebase Remote Config", "RevenueCat", "expo-print"],
            links: [{ label: "App Store", href: "https://apps.apple.com/ie/app/scoreboard-tournament-track/id6756669003" }],
        },
        {
            slug: "lista-virtual",
            name: "Lista Virtual — Guest List",
            tagline: "Guest list, RSVP and live check-in for events",
            year: "2024—2026",
            summary:
                "Event organisers still run the door off a printed spreadsheet. This replaces it: import the guest list, send RSVP invitations, and have receptionists check people in at the door — including when the venue has no signal.",
            shots: [
                { src: "/shots/lista-virtual-guests.webp", alt: "Guest list with live attendance counters" },
                { src: "/shots/lista-virtual-checkin.webp", alt: "Live check-in marking guests as present" },
                { src: "/shots/lista-virtual-team.webp", alt: "Receptionist team management" },
            ],
            highlights: [
                {
                    title: "QR check-in that works with no connection",
                    body: "A compact custom payload encodes event and guest, and the scanner resolves it against the list already in memory. No network round-trip, which is the entire point in a function room with no coverage.",
                },
                {
                    title: "Three session modes, one codebase",
                    body: "Local with no account at all, signed-in with Firestore realtime sync, and a receptionist mode that logs in with an access code and never touches the owner's account. Creating an account migrates local data up in batched writes.",
                },
                {
                    title: "Reports the client can hand over",
                    body: "PDF and Excel exports generated on device, with optional white-label branding for the organiser's own client. The logo stays local by design and never leaves the phone.",
                },
                {
                    title: "Invitations with single-use tokens",
                    body: "Cloud Functions issue opaque, single-use RSVP tokens with rate limiting and an audit trail, so a forwarded invite link cannot be replayed.",
                },
            ],
            stack: ["Expo", "React Native", "TypeScript", "Firebase", "Cloud Functions", "Firestore", "RevenueCat"],
            links: [
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
                role: "Software Engineer — Mobile",
                company: "Pixel Logic Apps",
                period: `Nov 2024 — ${PIXEL_LOGIC_END.en}`,
                location: "Remote",
                bullets: [
                    "Shipped cross-platform apps in React Native, Expo and TypeScript on a shared architecture, from first commit through to App Store and Google Play release.",
                    "Contributed to more than thirty apps across the studio catalogue, as lead developer on over a dozen of them.",
                    "Worked across Firebase integrations, REST flows, real-time sync, ad placement and subscription billing with RevenueCat.",
                    "Helped shape the studio's shared Expo library — proposing features and diagnosing bugs that only surfaced from running it across the whole catalogue.",
                    "Localised apps and their store listings into as many as eleven languages.",
                ],
                apps: {
                    label: "Apps I worked on there",
                    items: [
                        "Bobbie Goods — colouring app built on Skia",
                        "We Are Not Really Strangers — conversation card game",
                        "Versículo do Dia — daily scripture with scheduled notifications",
                        "Loterias — Brazilian lottery results from public data",
                        "Omnia Model — AI video generation",
                        "Glassify Widgets — iOS home screen widgets",
                    ],
                },
            },
            {
                role: "Mobile Engineer",
                company: "Freelance",
                period: "Jan 2022 — Present",
                location: "Brazil / Remote",
                bullets: [
                    "Designed, built and published my own apps across event management, sport, public data and public transport.",
                    "Built the lightweight backends they needed — Node.js, PHP and Firebase Cloud Functions against Firestore and third-party APIs.",
                ],
            },
            {
                role: "Mobile Application Developer",
                company: "Starta Solutions",
                period: "Nov 2022 — Jan 2023",
                location: "Brazil",
                bullets: [
                    "Built offline-first authentication and data synchronisation modules in React Native against REST APIs backed by Node.js and MySQL.",
                ],
            },
        ],
        earlierNote:
            "Before moving into development full time, I spent two years in IT support in Brazil — corporate networks, workstations, permissions and remote assistance at Carajás Ambientes Planejados and Tecsil. It is where I learned to debug something I did not build.",
    },
    about: {
        heading: "About",
        kicker: "Short version",
        body: [
            "I am a mobile software engineer based in Cork. I work mainly in React Native and Expo, and I like the parts of the job that sit either side of the app — where the data comes from, and how it gets to the store.",
            "That tends to show up in what I build. Bus Times needed a GTFS pipeline and a Cloudflare Worker before it needed a screen. Scoreboard needed a tournament engine before it needed a scoreboard. I would rather understand the problem properly than reach for a library.",
            "I read and write code in English and Portuguese, and I have shipped apps localised into up to eleven languages.",
        ],
        educationHeading: "Education",
        education: [
            {
                course: "Technologist in Systems Analysis and Development",
                school: "Instituto Federal do Pará (IFPA)",
                period: "2022 — 2024",
            },
            {
                course: "Technical High School in IT",
                school: "Instituto Federal do Pará — Campus Paragominas",
                period: "2019 — 2022",
            },
        ],
    },
    skills: {
        heading: "Tools I reach for",
        groups: [
            { label: "Mobile", items: ["React Native", "Expo", "expo-router", "TypeScript", "SwiftUI", "WidgetKit"] },
            { label: "Backend & data", items: ["Cloudflare Workers", "R2", "Firebase", "Firestore", "Cloud Functions", "Node.js", "REST"] },
            { label: "Release & ops", items: ["EAS Build", "Fastlane", "GitHub Actions", "RevenueCat", "AdMob", "Remote Config"] },
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
        title: "Andre Oleari — Engenheiro de Software, Mobile",
        description:
            "Engenheiro de software mobile em Cork, Irlanda. Construo e publico apps multiplataforma de ponta a ponta — pipeline de dados, backend, app e publicação na loja.",
    },
    nav: { work: "Projetos", experience: "Experiência", about: "Sobre", contact: "Contato" },
    a11y: { themeToggle: "Alternar entre claro e escuro" },
    hero: {
        role: "Engenheiro de Software — Mobile",
        location: "Cork, Irlanda",
        available: "Aberto a propostas",
        headline: "Levo apps mobile do início ao ar.",
        intro:
            "React Native e Expo, mas raramente só isso. Meu último projeto precisou de pipeline de dados, backend serverless, widgets de iOS e um app nativo de Apple Watch — então construí também. Três apps meus estão publicados na App Store.",
        ctaWork: "Ver os projetos",
        ctaContact: "Falar comigo",
        stats: [
            { value: "03", label: "Apps publicados na minha própria conta" },
            { value: "11", label: "Idiomas em um único app" },
            { value: "2022", label: "Construindo mobile desde" },
        ],
    },
    work: {
        heading: "Projetos selecionados",
        kicker: "Três apps que projetei, construí e publiquei na minha própria conta de desenvolvedor.",
        note: "Cada um resolve um problema técnico diferente — é por isso que são esses três.",
    },
    projects: [
        {
            slug: "bus-times",
            name: "Bus Times: Dublin & Ireland",
            tagline: "Horários de transporte público da Irlanda em tempo real",
            year: "2026",
            summary:
                "Um companheiro não-oficial para ônibus, tram e trem na Irlanda. Ele responde a uma única pergunta — corro ou dá tempo? — e precisa acertar, então separa com clareza o que é tempo real do que é horário programado.",
            shots: [
                { src: "/shots/bus-times-nearby.webp", alt: "Paradas próximas com horários de partida ao vivo" },
                { src: "/shots/bus-times-map.webp", alt: "Mapa com paradas e veículos em tempo real" },
                { src: "/shots/bus-times-widgets.webp", alt: "Widgets na tela de início com as próximas partidas" },
            ],
            highlights: [
                {
                    title: "A pilha inteira, não só o app",
                    body: "Um pipeline em Node transforma o feed GTFS nacional de 250 MB em cerca de 10.200 arquivos JSON por parada no Cloudflare R2. Um Worker serve esses dados, consulta o feed GTFS-Realtime por cron e mantém caches LRU, kill switches e limite de requisições por IP.",
                },
                {
                    title: "26–33% de erro 503, medido e resolvido",
                    body: "Requisições em lote para ~20 paradas de Cork estouravam o limite de 10 ms de CPU do Worker em isolate frio. Dividir em blocos de oito deu a cada um seu próprio orçamento, e o Promise.allSettled fez um bloco com falha custar oito paradas em vez da lista toda. A taxa de falha foi a zero.",
                },
                {
                    title: "Um widget que se atualiza com o app fechado",
                    body: "Horário programado é determinístico — só o atraso ao vivo varia. Então, em vez de tentar acordar o widget, ele empurra uma timeline de 12 entradas cobrindo uma hora e deixa o iOS percorrer, cada entrada recalculando a partir do horário absoluto.",
                },
                {
                    title: "App nativo de Apple Watch em SwiftUI",
                    body: "O relógio espelha por WatchConnectivity o dado que o telefone já buscou, então não custa nada a mais no backend. Os payloads são deduplicados antes do envio porque a cota da complication é de cerca de cinquenta transferências por dia.",
                },
                {
                    title: "CI que se conserta sozinho",
                    body: "O feed nacional rotaciona os IDs de viagem periodicamente, o que quebrava o tempo real em silêncio. Um workflow agendado tira o fingerprint do trips.txt e só reconstrói quando ele realmente muda.",
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
            name: "Scoreboard – Tournament Track",
            tagline: "Placar, chaveamento e gestão de torneios",
            year: "2025—2026",
            summary:
                "Um placar digital para esporte amador que virou gerenciador de torneios. Celular deitado na mesa em paisagem, números grandes e legíveis — e, por trás disso, um motor de competição completo.",
            shots: [
                { src: "/shots/scoreboard-scoring.webp", alt: "Placar em modo paisagem durante uma partida" },
                { src: "/shots/scoreboard-tournament.webp", alt: "Criação de torneio com esporte, formato e tempo" },
                { src: "/shots/scoreboard-standings.webp", alt: "Tabela de classificação gerada automaticamente" },
            ],
            highlights: [
                {
                    title: "Motor de torneio orientado a dados, não a condicionais",
                    body: "Fase de grupos, pontos corridos e mata-mata, com classificação e critérios de desempate definidos por esporte como dado. Essas regras podem ser sobrescritas via Firebase Remote Config, então mudar uma regra de pontuação não exige publicar uma versão nova.",
                },
                {
                    title: "Uma máquina de estados que precisa aguentar os casos raros",
                    body: "Um único loop de timer resolve a cascata: acabou o período, é o último, deu empate, tem prorrogação, tem pênaltis, é morte súbita. Prorrogação e disputa carregam estado paralelo próprio.",
                },
                {
                    title: "Offline-first com armazenamento que se autocorrige",
                    body: "Tudo vive no AsyncStorage — não há backend de dados. Ao carregar uma partida salva, ela é validada: se diz pertencer a um torneio mas está sem o ID, é rebaixada para partida casual em vez de quebrar.",
                },
                {
                    title: "Lógica de assinatura que respeita o usuário",
                    body: "Assinatura mais duas compras avulsas. Um teste cancelado perde o acesso na hora, mas quem pagou e depois cancelou mantém até o período realmente terminar. O gate é fail-closed, então uma flag de config ausente nunca esconde o paywall.",
                },
            ],
            stack: ["Expo", "React Native", "TypeScript", "Firebase Remote Config", "RevenueCat", "expo-print"],
            links: [{ label: "App Store", href: "https://apps.apple.com/ie/app/scoreboard-tournament-track/id6756669003" }],
        },
        {
            slug: "lista-virtual",
            name: "Lista Virtual — Guest List",
            tagline: "Lista de convidados, RSVP e check-in ao vivo para eventos",
            year: "2024—2026",
            summary:
                "Organizador de evento ainda controla a portaria com planilha impressa. Este app substitui isso: importa a lista, dispara convites com RSVP e deixa recepcionistas fazerem check-in na porta — inclusive quando o salão não tem sinal.",
            shots: [
                { src: "/shots/lista-virtual-guests.webp", alt: "Lista de convidados com contadores de presença" },
                { src: "/shots/lista-virtual-checkin.webp", alt: "Check-in ao vivo marcando convidados presentes" },
                { src: "/shots/lista-virtual-team.webp", alt: "Gestão da equipe de recepcionistas" },
            ],
            highlights: [
                {
                    title: "Check-in por QR que funciona sem conexão",
                    body: "Um payload compacto e próprio codifica evento e convidado, e o leitor resolve contra a lista que já está em memória. Sem ida e volta de rede, que é justamente o ponto num salão sem cobertura.",
                },
                {
                    title: "Três modos de sessão, uma base de código",
                    body: "Local sem conta nenhuma, autenticado com sincronização em tempo real no Firestore, e um modo recepcionista que entra por código de acesso e nunca toca na conta do dono. Criar conta migra o dado local para a nuvem em escritas em lote.",
                },
                {
                    title: "Relatórios que o cliente pode entregar",
                    body: "Exportação em PDF e Excel gerada no próprio aparelho, com marca do cliente opcional para o organizador usar com o cliente dele. A logo fica local por decisão de projeto e nunca sai do telefone.",
                },
                {
                    title: "Convites com token de uso único",
                    body: "Cloud Functions emitem tokens de RSVP opacos e de uso único, com limite de taxa e trilha de auditoria, para que um link de convite repassado não possa ser reutilizado.",
                },
            ],
            stack: ["Expo", "React Native", "TypeScript", "Firebase", "Cloud Functions", "Firestore", "RevenueCat"],
            links: [
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
                role: "Engenheiro de Software — Mobile",
                company: "Pixel Logic Apps",
                period: `Nov 2024 — ${PIXEL_LOGIC_END.pt}`,
                location: "Remoto",
                bullets: [
                    "Publiquei apps multiplataforma em React Native, Expo e TypeScript sobre uma arquitetura compartilhada, do primeiro commit até a publicação na App Store e no Google Play.",
                    "Contribuí com mais de trinta apps do catálogo do estúdio, sendo o desenvolvedor principal em mais de uma dúzia deles.",
                    "Trabalhei com integrações Firebase, fluxos REST, sincronização em tempo real, veiculação de anúncios e cobrança de assinatura com RevenueCat.",
                    "Ajudei a moldar a biblioteca Expo compartilhada do estúdio — propondo funcionalidades e diagnosticando bugs que só apareciam ao rodá-la no catálogo inteiro.",
                    "Localizei apps e suas fichas de loja em até onze idiomas.",
                ],
                apps: {
                    label: "Apps em que trabalhei lá",
                    items: [
                        "Bobbie Goods — app de colorir feito com Skia",
                        "We Are Not Really Strangers — jogo de cartas de conversa",
                        "Versículo do Dia — versículo diário com notificações agendadas",
                        "Loterias — resultados das loterias a partir de dados públicos",
                        "Omnia Model — geração de vídeo com IA",
                        "Glassify Widgets — widgets de tela de início no iOS",
                    ],
                },
            },
            {
                role: "Engenheiro Mobile",
                company: "Autônomo",
                period: "Jan 2022 — Atual",
                location: "Brasil / Remoto",
                bullets: [
                    "Projetei, construí e publiquei apps próprios nas áreas de gestão de eventos, esporte, dados públicos e transporte público.",
                    "Construí os backends leves de que eles precisavam — Node.js, PHP e Firebase Cloud Functions contra Firestore e APIs de terceiros.",
                ],
            },
            {
                role: "Desenvolvedor de Aplicações Mobile",
                company: "Starta Solutions",
                period: "Nov 2022 — Jan 2023",
                location: "Brasil",
                bullets: [
                    "Construí módulos de autenticação e sincronização de dados offline-first em React Native, consumindo APIs REST com Node.js e integração MySQL.",
                ],
            },
        ],
        earlierNote:
            "Antes de migrar para desenvolvimento em tempo integral, passei dois anos em suporte de TI no Brasil — redes corporativas, estações de trabalho, permissões e atendimento remoto na Carajás Ambientes Planejados e na Tecsil. Foi onde aprendi a depurar algo que não fui eu que construí.",
    },
    about: {
        heading: "Sobre",
        kicker: "Versão curta",
        body: [
            "Sou engenheiro de software mobile e moro em Cork. Trabalho principalmente com React Native e Expo, e gosto justamente das partes que ficam de cada lado do app — de onde vem o dado e como ele chega à loja.",
            "Isso costuma aparecer no que eu construo. O Bus Times precisou de um pipeline GTFS e de um Cloudflare Worker antes de precisar de uma tela. O Scoreboard precisou de um motor de torneio antes de precisar de um placar. Prefiro entender o problema direito a sair procurando biblioteca.",
            "Leio e escrevo código em inglês e português, e já publiquei apps localizados em até onze idiomas.",
        ],
        educationHeading: "Formação",
        education: [
            {
                course: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
                school: "Instituto Federal do Pará (IFPA)",
                period: "2022 — 2024",
            },
            {
                course: "Técnico em Informática",
                school: "Instituto Federal do Pará — Campus Paragominas",
                period: "2019 — 2022",
            },
        ],
    },
    skills: {
        heading: "Ferramentas que uso",
        groups: [
            { label: "Mobile", items: ["React Native", "Expo", "expo-router", "TypeScript", "SwiftUI", "WidgetKit"] },
            { label: "Backend e dados", items: ["Cloudflare Workers", "R2", "Firebase", "Firestore", "Cloud Functions", "Node.js", "REST"] },
            { label: "Release e operação", items: ["EAS Build", "Fastlane", "GitHub Actions", "RevenueCat", "AdMob", "Remote Config"] },
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
