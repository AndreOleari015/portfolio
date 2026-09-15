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
    /** Opcional — nem todo projeto é um app com telas de telefone. */
    shots?: { src: string; alt: string }[];
    /** "phone" (padrão) = retrato, três por linha. "wide" = captura larga. */
    media?: "phone" | "wide";
    highlights: { title: string; body: string }[];
    stack: string[];
    links: { label: string; href: string }[];
    /** Aparece onde ficam os links, quando não existe repositório público. */
    note?: string;
    /** Ícone do app. Só os apps têm — é o que o hero mostra na frente dos telefones. */
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
        kicker: "Five things I designed and built end to end — three apps on my own developer account, and two tools that solve problems away from the phone.",
        note: "Each one solves a different technical problem — that is why these five.",
    },
    projects: [
        {
            slug: "bus-times",
            logo: "/logos/bus-times.577ac812.webp",
            name: "Bus Times: Dublin & Ireland",
            tagline: "Live public transport departures for Ireland",
            year: "2026",
            summary:
                "An unofficial companion for Irish bus, tram and rail. It answers one question — do I run or do I have time? — and it has to be right, so it distinguishes clearly between real-time and scheduled departures.",
            shots: [
                { src: "/shots/bus-times-nearby.6f3e67da.webp", alt: "Nearby stops with live departure times" },
                { src: "/shots/bus-times-map.11709c8a.webp", alt: "Map showing stops and live vehicle positions" },
                { src: "/shots/bus-times-widgets.9efb147e.webp", alt: "Home Screen widgets showing the next departures" },
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
            logo: "/logos/scoreboard.8eac9fd5.webp",
            name: "Scoreboard – Tournament Track",
            tagline: "Scorekeeper, bracket maker and tournament manager",
            year: "2025—2026",
            summary:
                "A digital scoreboard for amateur sport that grew into a tournament manager. Phone flat on the table in landscape, big readable numbers — and behind that, a full competition engine.",
            shots: [
                { src: "/shots/scoreboard-tournament.294f798e.webp", alt: "Tournament setup with sport, format and timing options" },
                { src: "/shots/scoreboard-scoring.2a9b778b.webp", alt: "Scoring modes for each sport, from casual to full football" },
                { src: "/shots/scoreboard-standings.96570033.webp", alt: "Automatically generated group standings" },
            ],
            highlights: [
                {
                    title: "Tournament engine driven by data, not branches",
                    body: "Group stages, round-robin and knockout brackets, with standings and tiebreak ordering defined per sport as data. Those rules can be overridden through Firebase Remote Config, so a scoring rule changes without shipping a build. I later pulled the core out into a standalone, dependency-free TypeScript library, covered by 100 tests.",
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
            links: [
                { label: "App Store", href: "https://apps.apple.com/ie/app/scoreboard-tournament-track/id6756669003" },
                { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.scoreboardapp.app" },
                { label: "Engine source", href: "https://github.com/AndreOleari015/tournament-engine" },
            ],
        },
        {
            slug: "lista-virtual",
            logo: "/logos/lista-virtual.5eeeecb4.webp",
            name: "Lista Virtual — Guest List",
            tagline: "Guest list, RSVP and live check-in for events",
            year: "2025—2026",
            summary:
                "Event organisers still run the door off a printed spreadsheet. This replaces it: import the guest list, send RSVP invitations, and have receptionists check people in at the door — including when the venue has no signal.",
            shots: [
                { src: "/shots/lista-virtual-guests.09c204ac.webp", alt: "Guest list with live attendance counters" },
                { src: "/shots/lista-virtual-team.e558b6c6.webp", alt: "Receptionist team management" },
                { src: "/shots/lista-virtual-checkin.d8e69c27.webp", alt: "Live check-in marking guests as present" },
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
        {
            slug: "job-tailor",
            name: "Job Tailor",
            tagline: "CV and cover letter tailored to a posting, without inventing a fact",
            year: "2026",
            summary:
                "Applying for jobs is a volume game, and the obvious way to win it is to let a model write the letter. That is also how an employer ends up reading a bullet that never happened. This solves the volume problem under one constraint: the model may only select bullets I wrote by hand.",
            highlights: [
                {
                    title: "The model answers with ids, not prose",
                    body: "Everything checkable — employers, dates, technologies, numbers — lives in a profile file. The tailoring schema has no field through which invented prose could arrive, because the model replies with bullet ids. A reconciliation pass then drops any id that is not real, rebuilds the ordering, and recomputes every flag and the gap list from scratch rather than trusting the ones it was handed.",
                },
                {
                    title: "Two retry budgets, because two different things go wrong",
                    body: "A malformed answer and a well-formed but wrong answer are not the same failure. The first goes back to the model with its own output and the exact validation errors, on its own budget. The second gets a smaller, separate one — and when that runs out the value is accepted on purpose, so a flag surfaces it to a human instead of it disappearing into a retry loop.",
                },
                {
                    title: "A PDF is one drag away from a real application",
                    body: "Eighteen flag codes mark an application as unsafe to send: a technology claim the profile does not support, a cover letter naming the wrong company, a salary in the wrong currency. Rendering refuses outright on a blocking flag, and forcing it stamps the page DRAFT — UNVERIFIED CLAIMS.",
                },
                {
                    title: "Reply latency is the diagnosis, not a metric",
                    body: "A rejection inside an hour means an automatic filter read the CV and a person never did; days mean someone did. It reports the median, never the mean, so a single three-month reply cannot describe a funnel. An acknowledgement email is classified as its own kind and never as an outcome — recording it would manufacture a minutes-long latency and invert the reading of everything else.",
                },
            ],
            stack: ["TypeScript", "Node.js", "Fastify", "SQLite", "Zod", "Gemini", "Claude", "Puppeteer"],
            links: [{ label: "Source", href: "https://github.com/AndreOleari015/job-tailor" }],
        },
        {
            slug: "product-radar",
            name: "Product Radar",
            tagline: "Which product is worth selling, and in which country",
            year: "2026",
            media: "wide",
            shots: [
                { src: "/shots/product-radar-ranking.4f70580f.webp", alt: "Ranked product and market opportunities, each showing its score beside its confidence" },
                { src: "/shots/product-radar-matrix.75f33890.webp", alt: "Product by country heatmap showing where each product scores best" },
            ],
            summary:
                "Product intelligence for physical goods. It pulls supplier catalogues, marketplace listings, keyword demand and exchange rates, then scores every product against seven European markets. The hard part is not the score — it is refusing to show a number the data cannot support.",
            highlights: [
                {
                    title: "Two numbers that are never merged",
                    body: "Every opportunity carries a score — how attractive it is, if the data is right — and a confidence, how far that data can be trusted. 92/35 and 86/94 are different products, and averaging them into one figure would hide exactly the distinction the tool exists to make. Missing data lowers confidence; it never quietly becomes a zero.",
                },
                {
                    title: "Scoring that knows what it does not know",
                    body: "A component with no data is removed from the weighted average and the remaining weights are renormalised, with the gap recorded. Below half the surviving weight the row is marked as insufficient data instead of being scored badly — a product is not unattractive just because nobody measured it.",
                },
                {
                    title: "The architecture is a lint rule, not a convention",
                    body: "The domain package does no I/O at all: importing the database, an adapter or any node module fails the build, and a probe test checks that the rule still bites. Every external system sits behind a port with a real and a mock implementation, so the whole pipeline runs end to end with no credentials.",
                },
                {
                    title: "Postgres doing the work people reach for a queue to do",
                    body: "Collection steps claim work with FOR UPDATE SKIP LOCKED, and stale claims are released — which protects the API quota rather than the data, because the steps are idempotent. Observations are append-only and keyed by when they were observed, so any past day's ranking can be rebuilt. Fuzzing the scoring with NaN caught a real bug: NaN fails every comparison, so the clamp let it through, and Postgres sorts it above every real number.",
                },
            ],
            stack: ["TypeScript", "Next.js", "PostgreSQL", "Drizzle", "Zod", "Vitest", "PGlite"],
            links: [],
            note: "Source is private",
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
            { label: "Backend & data", items: ["Node.js", "Fastify", "PostgreSQL", "Drizzle", "SQLite", "Cloudflare Workers", "Firestore", "Zod"] },
            { label: "AI & computer vision", items: ["Gemini", "Claude", "Structured output", "Python", "YOLOv8", "Pose estimation", "FastAPI", "NumPy"] },
            { label: "Release & ops", items: ["EAS Build", "Fastlane", "GitHub Actions", "Vitest", "RevenueCat", "AdMob", "Remote Config"] },
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
        kicker: "Cinco coisas que projetei e construí do início ao fim — três apps na minha própria conta de desenvolvedor e duas ferramentas que resolvem problemas fora do telefone.",
        note: "Cada uma resolve um problema técnico diferente — é por isso que são essas cinco.",
    },
    projects: [
        {
            slug: "bus-times",
            logo: "/logos/bus-times.577ac812.webp",
            name: "Bus Times: Dublin & Ireland",
            tagline: "Horários de transporte público da Irlanda em tempo real",
            year: "2026",
            summary:
                "Um companheiro não-oficial para ônibus, tram e trem na Irlanda. Ele responde a uma única pergunta — corro ou dá tempo? — e precisa acertar, então separa com clareza o que é tempo real do que é horário programado.",
            shots: [
                { src: "/shots/bus-times-nearby.6f3e67da.webp", alt: "Paradas próximas com horários de partida ao vivo" },
                { src: "/shots/bus-times-map.11709c8a.webp", alt: "Mapa com paradas e veículos em tempo real" },
                { src: "/shots/bus-times-widgets.9efb147e.webp", alt: "Widgets na tela de início com as próximas partidas" },
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
            logo: "/logos/scoreboard.8eac9fd5.webp",
            name: "Scoreboard – Tournament Track",
            tagline: "Placar, chaveamento e gestão de torneios",
            year: "2025—2026",
            summary:
                "Um placar digital para esporte amador que virou gerenciador de torneios. Celular deitado na mesa em paisagem, números grandes e legíveis — e, por trás disso, um motor de competição completo.",
            shots: [
                { src: "/shots/scoreboard-tournament.294f798e.webp", alt: "Criação de torneio com esporte, formato e tempo" },
                { src: "/shots/scoreboard-scoring.2a9b778b.webp", alt: "Modos de pontuação para cada esporte, do casual ao futebol completo" },
                { src: "/shots/scoreboard-standings.96570033.webp", alt: "Tabela de classificação gerada automaticamente" },
            ],
            highlights: [
                {
                    title: "Motor de torneio orientado a dados, não a condicionais",
                    body: "Fase de grupos, pontos corridos e mata-mata, com classificação e critérios de desempate definidos por esporte como dado. Essas regras podem ser sobrescritas via Firebase Remote Config, então mudar uma regra de pontuação não exige publicar uma versão nova. Depois extraí o núcleo para uma biblioteca TypeScript independente, sem dependências e coberta por 100 testes.",
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
            links: [
                { label: "App Store", href: "https://apps.apple.com/ie/app/scoreboard-tournament-track/id6756669003" },
                { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.scoreboardapp.app" },
                { label: "Código do motor", href: "https://github.com/AndreOleari015/tournament-engine" },
            ],
        },
        {
            slug: "lista-virtual",
            logo: "/logos/lista-virtual.5eeeecb4.webp",
            name: "Lista Virtual — Guest List",
            tagline: "Lista de convidados, RSVP e check-in ao vivo para eventos",
            year: "2025—2026",
            summary:
                "Organizador de evento ainda controla a portaria com planilha impressa. Este app substitui isso: importa a lista, dispara convites com RSVP e deixa recepcionistas fazerem check-in na porta — inclusive quando o salão não tem sinal.",
            shots: [
                { src: "/shots/lista-virtual-guests.09c204ac.webp", alt: "Lista de convidados com contadores de presença" },
                { src: "/shots/lista-virtual-team.e558b6c6.webp", alt: "Gestão da equipe de recepcionistas" },
                { src: "/shots/lista-virtual-checkin.d8e69c27.webp", alt: "Check-in ao vivo marcando convidados presentes" },
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
        {
            slug: "job-tailor",
            name: "Job Tailor",
            tagline: "CV e carta de apresentação sob medida para a vaga, sem inventar um fato",
            year: "2026",
            summary:
                "Candidatar-se a vaga é um jogo de volume, e o jeito óbvio de vencer é deixar um modelo escrever a carta. É também assim que um empregador acaba lendo um item que nunca aconteceu. Isto resolve o volume sob uma única restrição: o modelo só pode escolher itens que eu escrevi à mão.",
            highlights: [
                {
                    title: "O modelo responde com ids, não com texto",
                    body: "Tudo que é verificável — empresas, datas, tecnologias, números — fica num arquivo de perfil. O schema não tem campo por onde texto inventado possa chegar, porque o modelo responde com ids de itens. Depois uma etapa de reconciliação descarta qualquer id que não exista, refaz a ordenação e recalcula do zero todas as flags e a lista de lacunas, em vez de confiar nas que recebeu.",
                },
                {
                    title: "Dois orçamentos de repetição, porque são dois erros diferentes",
                    body: "Uma resposta malformada e uma resposta bem formada porém errada não são a mesma falha. A primeira volta para o modelo com a própria saída e os erros exatos de validação, no orçamento dela. A segunda tem um orçamento menor e separado — e quando ele acaba o valor é aceito de propósito, para que uma flag mostre o problema a uma pessoa em vez de ele sumir dentro de um laço de repetição.",
                },
                {
                    title: "Um PDF está a um arrastar de uma candidatura real",
                    body: "Dezoito códigos de flag marcam uma candidatura como insegura de enviar: uma tecnologia que o perfil não sustenta, uma carta citando a empresa errada, um salário na moeda errada. A geração recusa de imediato diante de uma flag bloqueante, e forçar carimba a página com DRAFT — UNVERIFIED CLAIMS.",
                },
                {
                    title: "O tempo de resposta é o diagnóstico, não uma métrica",
                    body: "Uma recusa em menos de uma hora significa que um filtro automático leu o CV e nenhuma pessoa leu; dias significam que alguém leu. Ele usa a mediana, nunca a média, para que uma resposta de três meses não descreva o funil inteiro. Um email de confirmação de recebimento é uma categoria própria e nunca um desfecho — registrá-lo criaria um tempo de resposta de minutos e inverteria a leitura de todo o resto.",
                },
            ],
            stack: ["TypeScript", "Node.js", "Fastify", "SQLite", "Zod", "Gemini", "Claude", "Puppeteer"],
            links: [{ label: "Código", href: "https://github.com/AndreOleari015/job-tailor" }],
        },
        {
            slug: "product-radar",
            name: "Product Radar",
            tagline: "Qual produto vale vender, e em qual país",
            year: "2026",
            media: "wide",
            shots: [
                { src: "/shots/product-radar-ranking.4f70580f.webp", alt: "Oportunidades de produto e mercado ranqueadas, cada uma com a nota ao lado da confiança" },
                { src: "/shots/product-radar-matrix.75f33890.webp", alt: "Mapa de calor de produto por país mostrando onde cada produto pontua melhor" },
            ],
            summary:
                "Inteligência de produto para bens físicos. Puxa catálogos de fornecedor, anúncios de marketplace, demanda por palavra-chave e câmbio, e pontua cada produto contra sete mercados europeus. O difícil não é a nota — é recusar mostrar um número que os dados não sustentam.",
            highlights: [
                {
                    title: "Dois números que nunca se misturam",
                    body: "Cada oportunidade carrega uma nota — quão atrativa ela é, se o dado estiver certo — e uma confiança, o quanto dá para confiar nesse dado. 92/35 e 86/94 são produtos diferentes, e juntar os dois numa média só esconderia exatamente a distinção que a ferramenta existe para fazer. Dado faltando derruba a confiança; nunca vira zero calado.",
                },
                {
                    title: "Pontuação que sabe o que não sabe",
                    body: "Um componente sem dado sai da média ponderada e os pesos restantes são renormalizados, com a lacuna registrada. Abaixo de metade do peso que sobrou a linha é marcada como dado insuficiente em vez de receber nota baixa — um produto não é ruim só porque ninguém mediu.",
                },
                {
                    title: "A arquitetura é uma regra de lint, não uma convenção",
                    body: "O pacote de domínio não faz I/O nenhum: importar o banco, um adaptador ou qualquer módulo do node quebra o build, e um teste-sonda confere que a regra continua mordendo. Todo sistema externo fica atrás de uma porta com implementação real e simulada, então o pipeline inteiro roda de ponta a ponta sem nenhuma credencial.",
                },
                {
                    title: "Postgres fazendo o trabalho que as pessoas buscam uma fila para fazer",
                    body: "As etapas de coleta pegam trabalho com FOR UPDATE SKIP LOCKED, e reservas travadas são liberadas — o que protege a cota da API e não o dado, porque as etapas são idempotentes. As observações são append-only e indexadas por quando foram observadas, então o ranking de qualquer dia passado pode ser refeito. Fuzzing da pontuação com NaN pegou um bug real: NaN falha em toda comparação, então o clamp deixou passar, e o Postgres ordena esse valor acima de qualquer número real.",
                },
            ],
            stack: ["TypeScript", "Next.js", "PostgreSQL", "Drizzle", "Zod", "Vitest", "PGlite"],
            links: [],
            note: "Código fechado",
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
            { label: "Backend e dados", items: ["Node.js", "Fastify", "PostgreSQL", "Drizzle", "SQLite", "Cloudflare Workers", "Firestore", "Zod"] },
            { label: "IA e visão computacional", items: ["Gemini", "Claude", "Structured output", "Python", "YOLOv8", "Pose estimation", "FastAPI", "NumPy"] },
            { label: "Release e operação", items: ["EAS Build", "Fastlane", "GitHub Actions", "Vitest", "RevenueCat", "AdMob", "Remote Config"] },
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
