/**
 * Conteúdo das páginas do Lista Virtual: a home do app e a política de
 * privacidade.
 *
 * É a página de produto, não o estudo de caso: o card da home fala com quem
 * contrata (arquitetura, decisões); esta fala com quem organiza evento. Por
 * isso o texto é de benefício e a ordem segue a do ASO das lojas: lista sem
 * papel, convite pelo WhatsApp, check-in por QR, sem internet.
 *
 * O mercado principal é o Brasil. As telas do `pt` são capturas em português;
 * as do `en` são recortes em inglês dos painéis das lojas, menos a do QR do
 * hero, que só existe em português.
 *
 * Todo número daqui (preço, limite, nota) tem fonte e data em
 * `docs/lista-virtual/content.md`. Regras de design em `design-system.md`.
 *
 * A política de privacidade é a que estava no blogspot (efetiva desde
 * 25/08/2024), migrada sem mudança de conteúdo. O prestador continua sendo a
 * USAQ, que é quem publica o app nas lojas.
 */

import type { Locale } from "@/content/dictionary";
import type { LegalDoc } from "@/content/product-radar";

export const APP_STORE_URL = "https://apps.apple.com/app/id6738919953";
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.ROC";
export const SUPPORT_EMAIL = "usaqcontato@gmail.com";

export type LvIcon = "qr" | "chat" | "offline" | "team" | "sheet" | "report";
type Feature = { icon: LvIcon; title: string; body: string };
type Screen = { src: string; alt: string };

/**
 * Planos. Produtos, durações e limites do grátis vêm do Remote Config do app
 * (`screens`, condição "Lista Virtual 3.0.0"); preços, da página pública da
 * App Store. Fonte e data de cada número em `docs/lista-virtual/content.md`.
 */
export type PlanId = "free" | "event" | "week" | "weekly" | "annual";

export type Plan = {
    id: PlanId;
    name: string;
    kind: string;
    price: string;
    period: string;
    note: string;
    /** Recomendação ou conta real. "Mais popular" não: não há dado de venda. */
    badge?: string;
    cta: string;
};

/** `true` vira check, `false` vira traço, texto aparece como está. */
export type PlanCell = boolean | string;
export type PlanRow = { label: string; free: PlanCell; paid: PlanCell };

export type Plans = {
    eyebrow: string;
    heading: string;
    body: string;
    toggle: { event: string; subscription: string };
    free: Plan;
    event: [Plan, Plan];
    subscription: [Plan, Plan];
    rows: PlanRow[];
    /** O que o leitor de tela diz no lugar do check e do traço. */
    yes: string;
    no: string;
    note: string;
};

/**
 * Cartão ligado por fio a um ponto da tela do telefone do hero. `x` e `y` são
 * a posição do ponto em porcentagem do molde inteiro (não só da tela), medida
 * na captura e convertida pela área da tela dentro do molde.
 */
export type HeroNote = { title: string; body: string; x: number; y: number };

/** Um slide do hero: a tela e as duas anotações que apontam para ela. */
export type HeroSlide = { screen: Screen; notes: [HeroNote, HeroNote] };

/** Nota da loja, no lugar dos avatares das referências. */
export type Trust = { rating: string; ratingLabel: string };

/**
 * Número real de uso, um por slide do hero, na mesma ordem das telas. Os
 * valores são arredondados para baixo ("mais de"), então continuam verdadeiros
 * enquanto o app cresce. Contagem e fonte em `docs/lista-virtual/content.md`.
 */
export type Proof = { value: string; label: string };

/**
 * Depoimento real: o texto como a pessoa escreveu (trecho curto, até umas três
 * linhas na coluna do hero), o nome como ela autorizou e de onde veio.
 * Autorização e data registradas em `docs/lista-virtual/content.md`.
 */
export type Testimonial = { quote: string; author: string; source: string };

/** Um passo do "como funciona": a tela real do app e o que ela resolve. */
export type Step = { title: string; body: string; tags: string[]; screen: Screen };

export type ListaVirtualContent = {
    /** `ogImage`: a imagem dos links compartilhados, 1200x630, gerada com a identidade do app. */
    meta: { title: string; description: string; ogImage: string; ogImageAlt: string };
    nav: { features: string; how: string; plans: string; faq: string; download: string };
    name: string;
    /** Pílula acima do título. Afirmação verificável, nunca ranking inventado. */
    badge: string;
    /** Duas partes, como a legenda da screenshot 1 das lojas: a segunda vai em latão. */
    headline: string;
    headlineAccent: string;
    subhead: string;
    /** Texto alternativo dos selos oficiais das lojas. */
    appStoreLabel: string;
    playStoreLabel: string;
    freeNote: string;
    /** Três slides que se alternam no telefone do hero, cada um com as suas anotações. */
    heroSlides: HeroSlide[];
    /**
     * Nota e contagem reais, somando as duas lojas no mundo todo: a média é
     * ponderada pelo número de avaliações de cada uma. Fonte e conta em
     * `docs/lista-virtual/content.md`. Mudou nas lojas, muda aqui e lá.
     */
    trust: Trust;
    /** O destaque da coluna da direita do hero: alternam junto com as telas. */
    proofs: Proof[];
    /** Avaliações reais, na seção "para quem". */
    testimonials: Testimonial[];
    problemHeading: string;
    problem: string[];
    highlightsHeading: string;
    highlights: Feature[];
    stepsHeading: string;
    steps: Step[];
    plans: Plans;
    audienceHeading: string;
    audienceBody: string;
    audience: string[];
    closingHeading: string;
    closingBody: string;
    faqHeading: string;
    faqBody: string;
    faq: { question: string; answer: string }[];
    footer: { tagline: string; product: string; support: string; rights: string };
    privacyLabel: string;
    madeBy: string;
    privacy: LegalDoc;
};

const THIRD_PARTIES = [
    "Google Play Services",
    "Google Analytics for Firebase",
    "Firebase Crashlytics",
    "Expo",
    "RevenueCat",
];

const pt: ListaVirtualContent = {
    meta: {
        title: "Lista Virtual: lista de convidados sem papel, convite pelo WhatsApp e check-in por QR Code",
        description:
            "App de lista de convidados para casamento, festa, formatura e evento corporativo. Convites pelo WhatsApp com confirmação de presença, check-in por QR Code na portaria e funcionamento sem internet.",
        ogImage: "/og-lista-virtual-pt.ac6e3b68.jpg",
        ogImageAlt:
            "Lista Virtual: lista de convidados sem papel. O app aberto no QR de um convidado, com nota 4,5 nas lojas.",
    },
    nav: { features: "Recursos", how: "Como funciona", plans: "Planos", faq: "Perguntas", download: "Baixar grátis" },
    trust: { rating: "4,5", ratingLabel: "203 avaliações nas lojas" },
    proofs: [
        { value: "+39 mil", label: "convidados já cadastrados no app" },
        { value: "+13 mil", label: "check-ins feitos na portaria" },
        { value: "+4 mil", label: "eventos criados desde 2025" },
    ],
    testimonials: [
        {
            quote: "App excelente para Gestão de Presença",
            author: "Luiza Bittner",
            source: "5 estrelas na App Store",
        },
    ],
    plans: {
        eyebrow: "Planos",
        heading: "Comece grátis. Pague só quando o evento pedir.",
        body: "O plano grátis cobre um evento pequeno do começo ao fim. Para mais convidados, equipe na portaria e relatório, libere o Premium por evento ou por assinatura.",
        toggle: { event: "Por evento", subscription: "Assinatura" },
        free: {
            id: "free",
            name: "Grátis",
            kind: "Para começar",
            price: "R$ 0",
            period: "para sempre",
            note: "Com anúncios",
            cta: "Baixar grátis",
        },
        event: [
            {
                id: "event",
                name: "1 Evento",
                kind: "Pagamento único",
                price: "R$ 4,90",
                period: "2 dias de Premium",
                note: "Não renova",
                cta: "Baixar o app",
            },
            {
                id: "week",
                name: "Semana da Festa",
                kind: "Pagamento único",
                price: "R$ 14,90",
                period: "7 dias de Premium",
                note: "Não renova",
                badge: "Recomendado",
                cta: "Baixar o app",
            },
        ],
        subscription: [
            {
                id: "weekly",
                name: "Semanal",
                kind: "Assinatura",
                price: "R$ 14,90",
                period: "por semana",
                note: "Cancele quando quiser",
                cta: "Baixar o app",
            },
            {
                id: "annual",
                name: "Anual",
                kind: "Assinatura",
                price: "R$ 129,90",
                period: "por ano",
                note: "Equivale a R$ 10,83 por mês",
                badge: "Mais econômico",
                cta: "Baixar o app",
            },
        ],
        rows: [
            { label: "Eventos", free: "1", paid: "Ilimitados" },
            { label: "Convidados por evento", free: "Até 50", paid: "Ilimitados" },
            { label: "Convites pelo WhatsApp com confirmação", free: true, paid: true },
            { label: "Check-in por QR Code", free: true, paid: true },
            { label: "Recepcionistas no próprio celular", free: false, paid: true },
            { label: "Modo grupos, VIP e QR de grupo", free: false, paid: true },
            { label: "Relatório em PDF e Excel", free: false, paid: true },
            { label: "Importar planilha do Excel", free: false, paid: true },
            { label: "Sem anúncios", free: false, paid: true },
        ],
        yes: "Incluído",
        no: "Não incluído",
        note: "As compras são feitas dentro do app, pela App Store ou pelo Google Play. Preços da App Store Brasil em 24/09/2026; no Google Play e em outros países o valor pode variar. Os passes são pagamento único e não renovam; as assinaturas renovam até você cancelar na loja.",
    },
    footer: {
        tagline: "Lista de convidados, convites pelo WhatsApp e check-in por QR Code.",
        product: "Produto",
        support: "Suporte",
        rights: "Todos os direitos reservados.",
    },
    name: "Lista Virtual",
    badge: "Check-in por QR Code na portaria",
    headline: "Lista de convidados",
    headlineAccent: "sem papel",
    subhead:
        "Convide pelo WhatsApp, saiba quem confirmou e libere a entrada por QR Code. Na portaria, funciona até sem internet.",
    appStoreLabel: "Baixar na App Store",
    playStoreLabel: "Disponível no Google Play",
    freeNote: "Grátis para começar · iPhone, iPad e Android · 11 idiomas",
    heroSlides: [
        {
            screen: {
                src: "/telas/lista-virtual-pt-qr.99a9a98a.webp",
                alt: "QR Code individual do convidado Diego Souza, com o botão Enviar no WhatsApp",
            },
            notes: [
                { title: "QR individual", body: "Cada convidado recebe o seu, para mostrar na porta.", x: 70.5, y: 38.2 },
                { title: "Pelo WhatsApp", body: "Um toque e o QR chega ao convidado, com o link de confirmação.", x: 84.7, y: 70.8 },
            ],
        },
        {
            screen: {
                src: "/telas/lista-virtual-pt-lista.f36408fa.webp",
                alt: "Lista do Casamento Marina & Rafael com 9 presentes e quem já chegou marcado em dourado",
            },
            notes: [
                { title: "Presença ao vivo", body: "O contador sobe a cada check-in, em todos os aparelhos.", x: 68.7, y: 22.8 },
                { title: "Check-in num toque", body: "Quem chegou fica em dourado; a aba Não chegaram mostra quem falta.", x: 85.6, y: 57.6 },
            ],
        },
        {
            screen: {
                src: "/telas/lista-virtual-pt-report.11dd7e0e.webp",
                alt: "Relatório em PDF da Gala Corporativa Aurora 2026: 19 convidados, 12 presentes e 7 faltas, com o horário de chegada",
            },
            notes: [
                { title: "Relatório pronto", body: "Presentes, faltas e confirmados em PDF e Excel, no Premium.", x: 60.7, y: 24.9 },
                { title: "Hora da chegada", body: "Cada check-in fica registrado com o horário, pronto para o cliente.", x: 70.5, y: 45.7 },
            ],
        },
    ],
    problemHeading: "A portaria é onde a festa trava",
    problem: [
        "A lista impressa, a caneta, o nome que ninguém acha na terceira folha. Enquanto isso a fila cresce na porta e o convidado espera do lado de fora.",
        "Antes disso, a planilha: quem confirmou por mensagem, quem vai levar acompanhante, quem ainda não respondeu. Tudo espalhado entre conversa de WhatsApp e anotação.",
    ],
    highlightsHeading: "O que muda na portaria",
    stepsHeading: "Como funciona",
    steps: [
        {
            title: "Monte a lista",
            body: "Digite os convidados ou importe a planilha do Excel que você já tem, com os acompanhantes. No Premium, separe por mesa, empresa ou setor.",
            tags: ["Até 50 convidados no grátis", "Importar planilha · Premium"],
            screen: {
                src: "/telas/lista-virtual-pt-import.5acc4b6b.webp",
                alt: "Lista da Gala Corporativa Aurora 2026 separada por empresa, com o menu de importar planilha e gerar relatório aberto",
            },
        },
        {
            title: "Envie os convites",
            body: "Cada convidado recebe pelo WhatsApp ou por e-mail um link para confirmar ou recusar. As respostas chegam sozinhas, sem perguntar um por um.",
            tags: ["WhatsApp e e-mail", "Confirmação de presença"],
            screen: {
                src: "/telas/lista-virtual-pt-whatsapp.7b911b2d.webp",
                alt: "Ficha do convidado com os botões de enviar o convite pelo WhatsApp ou por e-mail",
            },
        },
        {
            title: "Libere a entrada",
            body: "Na porta, o recepcionista escaneia o QR Code do convidado ou marca com um toque. Na portaria, funciona até sem internet.",
            tags: ["QR individual", "Recepcionistas · Premium"],
            screen: {
                src: "/telas/lista-virtual-pt-lista.f36408fa.webp",
                alt: "Lista do Casamento Marina & Rafael com quem já chegou marcado em dourado",
            },
        },
        {
            title: "Entregue o relatório",
            body: "Presença, confirmações e horário de chegada em PDF e Excel, com o nome e o logo do seu cliente.",
            tags: ["PDF e Excel · Premium", "Logo do cliente"],
            screen: {
                src: "/telas/lista-virtual-pt-report.11dd7e0e.webp",
                alt: "Relatório em PDF da Gala Corporativa Aurora 2026: 19 convidados, 12 presentes e 7 faltas, com o resumo por empresa",
            },
        },
    ],
    highlights: [
        {
            icon: "qr",
            title: "Check-in por QR Code",
            body: "QR individual para cada convidado e, no Premium, QR de grupo para a mesa inteira. Sem procurar nome na lista.",
        },
        {
            icon: "chat",
            title: "Convite pelo WhatsApp",
            body: "Link de confirmação de presença que chega onde o convidado já está. As respostas aparecem sozinhas.",
        },
        {
            icon: "offline",
            title: "Funciona sem internet",
            body: "Na fazenda, na praia ou no salão sem sinal, a entrada continua. Sincroniza quando a conexão volta.",
        },
    ],
    audienceHeading: "Feito para quem organiza",
    audienceBody: "Do casamento ao evento da empresa, a mesma lista cuida do convite, da confirmação e da portaria.",
    audience: [
        "Noivos que querem uma entrada tranquila no casamento",
        "Cerimonialistas e assessorias que cuidam de vários eventos",
        "Comissões de formatura e festas de aniversário",
        "Eventos corporativos com lista por empresa ou setor",
    ],
    faqHeading: "Perguntas frequentes",
    faqBody: "Não achou a sua? Escreva para usaqcontato@gmail.com.",
    faq: [
        {
            question: "O convidado precisa baixar o app?",
            answer: "Não. O convite chega como um link pelo WhatsApp e abre no navegador. Só quem organiza e quem faz o check-in usam o app.",
        },
        {
            question: "Funciona sem internet?",
            answer: "O check-in na portaria, sim: a lista fica salva no aparelho e sincroniza quando a conexão volta. Enviar convites e receber confirmações precisa de internet.",
        },
        {
            question: "Quanto custa?",
            answer: "É grátis para 1 evento com até 50 convidados. Para mais, o Premium libera tudo por evento (R$ 4,90 por 2 dias ou R$ 14,90 por 7 dias, pagamento único) ou por assinatura (R$ 14,90 por semana ou R$ 129,90 por ano).",
        },
        {
            question: "O que o plano grátis inclui?",
            answer: "1 evento com até 50 convidados, convites pelo WhatsApp com confirmação de presença, check-in por QR Code e sincronização entre os seus aparelhos. O plano grátis tem anúncios.",
        },
        {
            question: "O passe renova sozinho?",
            answer: "Não. 1 Evento e Semana da Festa são pagamento único: liberam o Premium por 2 ou 7 dias e acabam sozinhos, sem cobrança nova.",
        },
        {
            question: "Como cancelo a assinatura?",
            answer: "Nos ajustes de assinatura da App Store ou do Google Play, quando quiser. O Premium continua até o fim do período já pago.",
        },
        {
            question: "Posso importar minha lista do Excel?",
            answer: "Pode, no Premium. O app lê a planilha pelo cabeçalho das colunas e traz nomes, telefones e acompanhantes de uma vez.",
        },
        {
            question: "Mais de uma pessoa pode fazer check-in?",
            answer: "Pode, no Premium. Você cria acessos de recepcionista, e cada um faz check-in no próprio aparelho sem ver dados sensíveis como telefone.",
        },
    ],
    closingHeading: "Sua próxima portaria, sem fila",
    closingBody: "Baixe grátis e monte a lista do seu próximo evento hoje.",
    privacyLabel: "Política de privacidade",
    madeBy: "Um app por",
    privacy: {
        title: "Política de Privacidade",
        updated: "Em vigor desde 25/08/2024",
        intro: 'Esta política de privacidade se aplica ao aplicativo Lista Virtual (doravante denominado "Aplicativo") para dispositivos móveis que foi criado pela USAQ (doravante denominado "Provedor de Serviços") como um serviço Comercial. Este serviço é destinado ao uso "COMO ESTÁ".',
        sections: [
            {
                heading: "Coleta e Uso de Informações",
                body: ["O Aplicativo coleta informações quando você o baixa e o usa. Essas informações podem incluir informações como:"],
                bullets: [
                    "O endereço de Protocolo de Internet do seu dispositivo (por exemplo, endereço IP)",
                    "As páginas do Aplicativo que você visita, a hora e a data da sua visita, o tempo gasto nessas páginas",
                    "O tempo gasto no Aplicativo",
                    "O sistema operacional que você usa no seu dispositivo móvel",
                ],
            },
            {
                heading: "Localização e contato",
                body: [
                    "O Aplicativo não coleta informações precisas sobre a localização do seu dispositivo móvel.",
                    "O Provedor de Serviços pode usar as informações que você forneceu para contatá-lo de tempos em tempos para fornecer informações importantes, avisos necessários e promoções de marketing.",
                    "Para uma melhor experiência, ao usar o Aplicativo, o Provedor de Serviços pode exigir que você nos forneça certas informações de identificação pessoal, incluindo, mas não se limitando a Nome, endereço, número de telefone. As informações que o Provedor de Serviços solicitar serão retidas por eles e usadas conforme descrito nesta política de privacidade.",
                ],
            },
            {
                heading: "Acesso de Terceiros",
                body: [
                    "Somente dados agregados e anônimos são transmitidos periodicamente para serviços externos para auxiliar o Provedor de Serviços a melhorar o Aplicativo e seu serviço. O Provedor de Serviços pode compartilhar suas informações com terceiros nas formas descritas nesta declaração de privacidade.",
                    "Observe que o Aplicativo utiliza serviços de terceiros que têm sua própria Política de Privacidade sobre o manuseio de dados:",
                ],
                bullets: THIRD_PARTIES,
            },
            {
                heading: "Divulgação",
                body: ["O Provedor de Serviços pode divulgar Informações Fornecidas pelo Usuário e Coletadas Automaticamente:"],
                bullets: [
                    "conforme exigido por lei, como para cumprir uma intimação ou processo legal semelhante;",
                    "quando eles acreditam de boa fé que a divulgação é necessária para proteger seus direitos, proteger sua segurança ou a segurança de outros, investigar fraudes ou responder a uma solicitação governamental;",
                    "com seus provedores de serviços confiáveis que trabalham em seu nome, não têm um uso independente das informações que divulgamos a eles e concordaram em aderir às regras estabelecidas nesta declaração de privacidade.",
                ],
            },
            {
                heading: "Direitos de Opt-Out",
                body: [
                    "Você pode interromper toda a coleta de informações pelo Aplicativo facilmente desinstalando-o. Você pode usar os processos de desinstalação padrão que podem estar disponíveis como parte do seu dispositivo móvel ou por meio do mercado ou rede de aplicativos móveis.",
                ],
            },
            {
                heading: "Política de Retenção de Dados",
                body: [
                    `O Provedor de Serviços reterá os dados Fornecidos pelo Usuário enquanto você usar o Aplicativo e por um tempo razoável depois disso. Se você quiser que eles excluam os Dados Fornecidos pelo Usuário que você forneceu por meio do Aplicativo, entre em contato com eles em ${SUPPORT_EMAIL} e eles responderão em um tempo razoável.`,
                ],
            },
            {
                heading: "Crianças",
                body: [
                    "O Provedor de Serviços não usa o Aplicativo para solicitar dados ou fazer marketing intencionalmente para crianças menores de 13 anos.",
                    `O Aplicativo não se dirige a ninguém com menos de 13 anos. O Provedor de Serviços não coleta intencionalmente informações de identificação pessoal de crianças menores de 13 anos. Caso o Provedor de Serviços descubra que uma criança menor de 13 anos forneceu informações pessoais, o Provedor de Serviços as excluirá imediatamente de seus servidores. Se você for pai/mãe ou responsável e estiver ciente de que seu filho nos forneceu informações pessoais, entre em contato com o Provedor de Serviços (${SUPPORT_EMAIL}) para que eles possam tomar as medidas necessárias.`,
                ],
            },
            {
                heading: "Segurança",
                body: [
                    "O Provedor de Serviços está preocupado em proteger a confidencialidade de suas informações. O Provedor de Serviços fornece salvaguardas físicas, eletrônicas e processuais para proteger as informações que o Provedor de Serviços processa e mantém.",
                ],
            },
            {
                heading: "Alterações",
                body: [
                    "Esta Política de Privacidade pode ser atualizada de tempos em tempos por qualquer motivo. O Provedor de Serviços notificará você sobre quaisquer alterações na Política de Privacidade atualizando esta página com a nova Política de Privacidade. Recomendamos que você consulte esta Política de Privacidade regularmente para quaisquer alterações, pois o uso contínuo é considerado aprovação de todas as alterações.",
                    "Esta política de privacidade entra em vigor em 25/08/2024.",
                ],
            },
            {
                heading: "Seu Consentimento",
                body: [
                    "Ao usar o Aplicativo, você está consentindo com o processamento de suas informações conforme estabelecido nesta Política de Privacidade agora e conforme alterado por nós.",
                ],
            },
            {
                heading: "Fale Conosco",
                body: [
                    `Se você tiver alguma dúvida sobre privacidade ao usar o Aplicativo, ou tiver dúvidas sobre as práticas, entre em contato com o Provedor de Serviços por e-mail em ${SUPPORT_EMAIL}.`,
                ],
            },
        ],
    },
};

const en: ListaVirtualContent = {
    meta: {
        title: "Lista Virtual: paperless guest list, WhatsApp invitations and QR code check-in",
        description:
            "Guest list app for weddings, parties, graduations and corporate events. WhatsApp invitations with RSVP, QR code check-in at the door, and it keeps working with no internet.",
        ogImage: "/og-lista-virtual-en.e3ff83fb.jpg",
        ogImageAlt:
            "Lista Virtual: the guest list, without paper. The app open on a guest list with check-ins, rated 4.5 in the stores.",
    },
    nav: { features: "Features", how: "How it works", plans: "Pricing", faq: "Questions", download: "Download free" },
    trust: { rating: "4.5", ratingLabel: "203 store ratings" },
    proofs: [
        { value: "39,000+", label: "guests added to the app" },
        { value: "13,000+", label: "check-ins at the door" },
        { value: "4,000+", label: "events created since 2025" },
    ],
    testimonials: [
        {
            quote: "An excellent app for managing attendance",
            author: "Luiza Bittner",
            source: "5 stars on the App Store, translated",
        },
    ],
    plans: {
        eyebrow: "Pricing",
        heading: "Start free. Pay only when the event calls for it.",
        body: "The free plan covers a small event from start to finish. For more guests, a team at the door and reports, unlock Premium per event or with a subscription.",
        toggle: { event: "Per event", subscription: "Subscription" },
        free: {
            id: "free",
            name: "Free",
            kind: "To get started",
            price: "$0",
            period: "forever",
            note: "With ads",
            cta: "Download free",
        },
        event: [
            {
                id: "event",
                name: "One Event",
                kind: "One-time payment",
                price: "$0.99",
                period: "2 days of Premium",
                note: "Doesn't renew",
                cta: "Get the app",
            },
            {
                id: "week",
                name: "Party Week",
                kind: "One-time payment",
                price: "$2.99",
                period: "7 days of Premium",
                note: "Doesn't renew",
                badge: "Recommended",
                cta: "Get the app",
            },
        ],
        subscription: [
            {
                id: "weekly",
                name: "Weekly",
                kind: "Subscription",
                price: "$2.99",
                period: "per week",
                note: "Cancel anytime",
                cta: "Get the app",
            },
            {
                id: "annual",
                name: "Annual",
                kind: "Subscription",
                price: "$19.99",
                period: "per year",
                note: "Works out to $1.67 a month",
                badge: "Best value",
                cta: "Get the app",
            },
        ],
        rows: [
            { label: "Events", free: "1", paid: "Unlimited" },
            { label: "Guests per event", free: "Up to 50", paid: "Unlimited" },
            { label: "WhatsApp invitations with RSVP", free: true, paid: true },
            { label: "QR code check-in", free: true, paid: true },
            { label: "Receptionists on their own phones", free: false, paid: true },
            { label: "Groups mode, VIPs and group QR", free: false, paid: true },
            { label: "PDF and Excel reports", free: false, paid: true },
            { label: "Excel spreadsheet import", free: false, paid: true },
            { label: "No ads", free: false, paid: true },
        ],
        yes: "Included",
        no: "Not included",
        note: "Purchases happen inside the app, through the App Store or Google Play. US App Store prices on 24 September 2026; they vary by country and on Google Play. Passes are one-time and don't renew; subscriptions renew until you cancel in the store.",
    },
    footer: {
        tagline: "Guest list, WhatsApp invitations and QR code check-in.",
        product: "Product",
        support: "Support",
        rights: "All rights reserved.",
    },
    name: "Lista Virtual",
    badge: "QR code check-in at the door",
    headline: "The guest list,",
    headlineAccent: "without paper",
    subhead:
        "Invite over WhatsApp, see who is coming and let people in with a QR code. At the door it works even with no signal.",
    appStoreLabel: "Download on the App Store",
    playStoreLabel: "Get it on Google Play",
    freeNote: "Free to start · iPhone, iPad and Android · 11 languages",
    /* A única captura crua do QR é em português; a legenda do botão aparece
       como "Enviar no WhatsApp" também aqui. As outras duas telas são em
       inglês e têm a mesma geometria das do pt, então os pontos são os mesmos. */
    heroSlides: [
        {
            screen: {
                src: "/telas/lista-virtual-pt-qr.99a9a98a.webp",
                alt: "A guest's personal QR code, with the button to send it over WhatsApp",
            },
            notes: [
                { title: "Personal QR code", body: "Every guest gets their own, to show at the door.", x: 70.5, y: 38.2 },
                { title: "Over WhatsApp", body: "One tap and the QR reaches the guest, with the RSVP link.", x: 84.7, y: 70.8 },
            ],
        },
        {
            screen: {
                src: "/telas/lista-virtual-1.4bee988d.webp",
                alt: "Guest list for Beatrice's 30th Birthday with 6 present and arrivals checked in in gold",
            },
            notes: [
                { title: "Live attendance", body: "The counter goes up with every check-in, on every device.", x: 64.2, y: 22.8 },
                { title: "One-tap check-in", body: "Arrivals turn gold; the Not arrived tab shows who is missing.", x: 85.6, y: 57.6 },
            ],
        },
        {
            screen: {
                src: "/telas/lista-virtual-en-report.dcd035ea.webp",
                alt: "PDF report for the Aurora Corporate Gala 2026: 19 guests, 12 attended and 7 no-shows, with arrival times",
            },
            notes: [
                { title: "Report, ready", body: "Attendance, no-shows and RSVPs in PDF and Excel, on Premium.", x: 60.7, y: 24.9 },
                { title: "Arrival times", body: "Each check-in is logged with the time, ready for your client.", x: 70.5, y: 45.7 },
            ],
        },
    ],
    problemHeading: "The door is where the party stalls",
    problem: [
        "The printed list, the pen, the name nobody can find on page three. Meanwhile the queue grows and guests wait outside.",
        "Before that, the spreadsheet: who replied by message, who is bringing a plus-one, who never answered. All of it scattered across chats and notes.",
    ],
    highlightsHeading: "What changes at the door",
    stepsHeading: "How it works",
    steps: [
        {
            title: "Build the list",
            body: "Type your guests in or import the Excel spreadsheet you already have, plus-ones included. On Premium, split them by table, company or department.",
            tags: ["Up to 50 guests free", "Spreadsheet import · Premium"],
            screen: {
                src: "/telas/lista-virtual-en-import.11bcce75.webp",
                alt: "Aurora Corporate Gala 2026 guest list split by company, with the import and report menu open",
            },
        },
        {
            title: "Send the invitations",
            body: "Each guest gets a WhatsApp or email link to accept or decline. Replies come in on their own, no chasing people one by one.",
            tags: ["WhatsApp and email", "RSVP"],
            screen: {
                src: "/telas/lista-virtual-en-invite.99380e30.webp",
                alt: "Guest details for Ben Wilson with the WhatsApp and email invitation buttons",
            },
        },
        {
            title: "Let people in",
            body: "At the door the receptionist scans the guest's QR code or checks them in with a tap. At the door it works even with no signal.",
            tags: ["Personal QR code", "Receptionists · Premium"],
            screen: {
                src: "/telas/lista-virtual-1.4bee988d.webp",
                alt: "Guest list for Beatrice's 30th Birthday, with arrivals checked in in gold",
            },
        },
        {
            title: "Hand over the report",
            body: "Attendance, RSVPs and arrival times in PDF and Excel, with your client's name and logo.",
            tags: ["PDF and Excel · Premium", "Client logo"],
            screen: {
                src: "/telas/lista-virtual-en-report.dcd035ea.webp",
                alt: "PDF report for the Aurora Corporate Gala 2026: 19 guests, 12 attended and 7 no-shows, with a summary by group",
            },
        },
    ],
    highlights: [
        {
            icon: "qr",
            title: "QR code check-in",
            body: "A personal QR for every guest and, on Premium, a group QR for the whole table. No hunting for names.",
        },
        {
            icon: "chat",
            title: "WhatsApp invitations",
            body: "An RSVP link that lands where your guests already are. Replies come in on their own.",
        },
        {
            icon: "offline",
            title: "Works offline",
            body: "At the farm, on the beach or in a hall with no signal, the door keeps moving. It syncs when the connection returns.",
        },
    ],
    audienceHeading: "Made for the people who organise",
    audienceBody: "From weddings to company events, one list takes care of the invitation, the RSVP and the door.",
    audience: [
        "Couples who want a calm entrance to their wedding",
        "Wedding and event planners running several events",
        "Graduation committees and birthday parties",
        "Corporate events with lists by company or department",
    ],
    faqHeading: "Frequently asked questions",
    faqBody: "Can't find yours? Write to usaqcontato@gmail.com.",
    faq: [
        {
            question: "Do guests need to download the app?",
            answer: "No. The invitation arrives as a WhatsApp link and opens in the browser. Only the organiser and the door staff use the app.",
        },
        {
            question: "Does it work without internet?",
            answer: "Check-in at the door does: the list is saved on the device and syncs when the connection returns. Sending invitations and receiving RSVPs needs internet.",
        },
        {
            question: "How much does it cost?",
            answer: "It is free for 1 event with up to 50 guests. Beyond that, Premium unlocks everything per event ($0.99 for 2 days or $2.99 for 7 days, one-time) or with a subscription ($2.99 a week or $19.99 a year).",
        },
        {
            question: "What does the free plan include?",
            answer: "1 event with up to 50 guests, WhatsApp invitations with RSVP, QR code check-in and sync across your devices. The free plan shows ads.",
        },
        {
            question: "Does a pass renew on its own?",
            answer: "No. One Event and Party Week are one-time payments: they unlock Premium for 2 or 7 days and simply end, with no new charge.",
        },
        {
            question: "How do I cancel a subscription?",
            answer: "In the subscription settings of the App Store or Google Play, whenever you like. Premium stays on until the end of the period you already paid for.",
        },
        {
            question: "Can I import my list from Excel?",
            answer: "Yes, on Premium. The app reads the spreadsheet by its column headers and brings in names, phone numbers and plus-ones in one go.",
        },
        {
            question: "Can more than one person check guests in?",
            answer: "Yes, on Premium. You create receptionist access, and each one checks guests in on their own device without seeing sensitive data such as phone numbers.",
        },
    ],
    closingHeading: "Your next door, without the queue",
    closingBody: "Download it free and build the list for your next event today.",
    privacyLabel: "Privacy policy",
    madeBy: "An app by",
    privacy: {
        title: "Privacy Policy",
        updated: "Effective as of 2024-08-25",
        intro: 'This privacy policy applies to the Lista Virtual app (hereby referred to as "Application") for mobile devices that was created by USAQ (hereby referred to as "Service Provider") as a Commercial service. This service is intended for use "AS IS".',
        sections: [
            {
                heading: "Information Collection and Use",
                body: ["The Application collects information when you download and use it. This information may include information such as:"],
                bullets: [
                    "Your device's Internet Protocol address (e.g. IP address)",
                    "The pages of the Application that you visit, the time and date of your visit, the time spent on those pages",
                    "The time spent on the Application",
                    "The operating system you use on your mobile device",
                ],
            },
            {
                heading: "Location and contact",
                body: [
                    "The Application does not gather precise information about the location of your mobile device.",
                    "The Service Provider may use the information you provided to contact you from time to time to provide you with important information, required notices and marketing promotions.",
                    "For a better experience, while using the Application, the Service Provider may require you to provide us with certain personally identifiable information, including but not limited to Name, address, phone number. The information that the Service Provider request will be retained by them and used as described in this privacy policy.",
                ],
            },
            {
                heading: "Third Party Access",
                body: [
                    "Only aggregated, anonymized data is periodically transmitted to external services to aid the Service Provider in improving the Application and their service. The Service Provider may share your information with third parties in the ways that are described in this privacy statement.",
                    "Please note that the Application utilizes third-party services that have their own Privacy Policy about handling data:",
                ],
                bullets: THIRD_PARTIES,
            },
            {
                heading: "Disclosure",
                body: ["The Service Provider may disclose User Provided and Automatically Collected Information:"],
                bullets: [
                    "as required by law, such as to comply with a subpoena, or similar legal process;",
                    "when they believe in good faith that disclosure is necessary to protect their rights, protect your safety or the safety of others, investigate fraud, or respond to a government request;",
                    "with their trusted services providers who work on their behalf, do not have an independent use of the information we disclose to them, and have agreed to adhere to the rules set forth in this privacy statement.",
                ],
            },
            {
                heading: "Opt-Out Rights",
                body: [
                    "You can stop all collection of information by the Application easily by uninstalling it. You may use the standard uninstall processes as may be available as part of your mobile device or via the mobile application marketplace or network.",
                ],
            },
            {
                heading: "Data Retention Policy",
                body: [
                    `The Service Provider will retain User Provided data for as long as you use the Application and for a reasonable time thereafter. If you'd like them to delete User Provided Data that you have provided via the Application, please contact them at ${SUPPORT_EMAIL} and they will respond in a reasonable time.`,
                ],
            },
            {
                heading: "Children",
                body: [
                    "The Service Provider does not use the Application to knowingly solicit data from or market to children under the age of 13.",
                    `The Application does not address anyone under the age of 13. The Service Provider does not knowingly collect personally identifiable information from children under 13 years of age. In the case the Service Provider discover that a child under 13 has provided personal information, the Service Provider will immediately delete this from their servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact the Service Provider (${SUPPORT_EMAIL}) so that they will be able to take the necessary actions.`,
                ],
            },
            {
                heading: "Security",
                body: [
                    "The Service Provider is concerned about safeguarding the confidentiality of your information. The Service Provider provides physical, electronic, and procedural safeguards to protect information the Service Provider processes and maintains.",
                ],
            },
            {
                heading: "Changes",
                body: [
                    "This Privacy Policy may be updated from time to time for any reason. The Service Provider will notify you of any changes to the Privacy Policy by updating this page with the new Privacy Policy. You are advised to consult this Privacy Policy regularly for any changes, as continued use is deemed approval of all changes.",
                    "This privacy policy is effective as of 2024-08-25.",
                ],
            },
            {
                heading: "Your Consent",
                body: [
                    "By using the Application, you are consenting to the processing of your information as set forth in this Privacy Policy now and as amended by us.",
                ],
            },
            {
                heading: "Contact Us",
                body: [
                    `If you have any questions regarding privacy while using the Application, or have questions about the practices, please contact the Service Provider via email at ${SUPPORT_EMAIL}.`,
                ],
            },
        ],
    },
};

const content: Record<Locale, ListaVirtualContent> = { en, pt };

export const getListaVirtual = (locale: Locale): ListaVirtualContent => content[locale];
