/**
 * Conteúdo das páginas do Product Radar — a home do app, a política de
 * privacidade e os termos.
 *
 * Existem porque a Brand Verification do Google exige que um app em produção
 * tenha home pública descrevendo a funcionalidade, com política de privacidade
 * e termos hospedados NO MESMO domínio da home e linkados a partir dela.
 *
 * O nome usado aqui tem que ser idêntico ao "App name" da tela de consentimento
 * OAuth. Mudou lá, muda aqui.
 */

import type { Locale } from "@/content/dictionary";

export type DocSection = {
    heading: string;
    body?: string[];
    bullets?: string[];
};

export type LegalDoc = {
    title: string;
    updated: string;
    intro: string;
    sections: DocSection[];
};

export type ProductRadarContent = {
    meta: { title: string; description: string };
    backLabel: string;
    name: string;
    tagline: string;
    intro: string[];
    featuresHeading: string;
    features: { title: string; body: string }[];
    apiHeading: string;
    apiIntro: string;
    apiPoints: string[];
    contactHeading: string;
    contactBody: string;
    privacyLabel: string;
    termsLabel: string;
    privacy: LegalDoc;
    terms: LegalDoc;
};

const SCOPE = "https://www.googleapis.com/auth/adwords";

const en: ProductRadarContent = {
    meta: {
        title: "Product Radar — private keyword research and campaign planning",
        description:
            "Private, single-operator tool that researches search demand for physical products and turns it into Google Ads campaigns.",
    },
    backLabel: "Back to portfolio",
    name: "Product Radar",
    tagline: "Private keyword research and Google Ads campaign planning",
    intro: [
        "Product Radar is a private web application built and operated by Andre Oleari. It researches search demand for physical products, decides which country is worth advertising in, and turns that research into the keyword list, geographic targeting and budget of the Google Ads campaigns launched for them.",
        "It is not a public service. There is no sign-up, no user accounts and no third-party users. The application runs on the operator's own machine, against the operator's own Google Ads manager account.",
    ],
    featuresHeading: "What it does",
    features: [
        {
            title: "Keyword demand",
            body: "Reads monthly search volume and twelve months of history per country from Google Ads Keyword Planner, for the keyword set of each product under consideration.",
        },
        {
            title: "Market comparison",
            body: "Compares demand, competition and price level across candidate countries, so a campaign is launched where the audience actually is instead of where it was assumed to be.",
        },
        {
            title: "Campaign planning",
            body: "The keywords, volumes and top-of-page bid range that identify an opportunity become the keyword list, geo targeting and daily budget of the campaign created in Google Ads.",
        },
        {
            title: "Cost transparency",
            body: "Product cost, shipping, marketplace fees and VAT are modelled line by line, so the advertising budget is set against a real margin rather than a guess.",
        },
    ],
    apiHeading: "How Product Radar uses the Google Ads API",
    apiIntro:
        "Product Radar authenticates as the operator and reads keyword planning data from the operator's own Google Ads manager account. Nothing is read from, or written to, any account that is not the operator's own.",
    apiPoints: [
        `Scope requested: ${SCOPE}.`,
        "Data read: keyword ideas, monthly search volume, historical metrics and top-of-page bid estimates, through KeywordPlanIdeaService.",
        "Purpose: planning and managing the operator's own Google Ads campaigns — choosing keywords, choosing the country to target, and sizing the budget.",
        "The data is never sold, published or shared with any third party.",
        "Access can be revoked at any time at myaccount.google.com/permissions, which invalidates the stored token immediately.",
    ],
    contactHeading: "Contact",
    contactBody: "Questions about this application or about how it handles data:",
    privacyLabel: "Privacy Policy",
    termsLabel: "Terms of Service",
    privacy: {
        title: "Product Radar — Privacy Policy",
        updated: "Last updated: 12 September 2026",
        intro: "This policy describes what information Product Radar accesses, how it is used, where it is stored and how it can be removed. Product Radar is a private tool operated by Andre Oleari. It is not offered to the public and has no users other than its operator.",
        sections: [
            {
                heading: "1. Information accessed",
                body: ["Product Radar accesses only two categories of information:"],
                bullets: [
                    `Google Ads data — keyword ideas, monthly search volume, historical metrics and bid estimates, read from the operator's own Google Ads manager account through the Google Ads API using the scope ${SCOPE}.`,
                    "OAuth credentials — the access and refresh tokens issued by Google when the operator grants that access.",
                ],
            },
            {
                heading: "2. Information not accessed",
                body: [
                    "Product Radar does not access Gmail, Drive, Calendar, Contacts, Photos or any other Google service. It does not access any Google Ads account other than the operator's own. It collects no personal data about any other person, and has no mechanism to do so — there is no registration, no form and no login for third parties.",
                ],
            },
            {
                heading: "3. How the information is used",
                body: [
                    "Keyword data is used exclusively to research search demand and to plan, create and manage the operator's own Google Ads campaigns: selecting keywords, selecting the countries to target, and sizing the budget against the product's margin.",
                    "The data is not used for advertising to third parties, for profiling, for training machine learning models, or for any purpose unrelated to the operator's own campaigns.",
                ],
            },
            {
                heading: "4. Limited Use disclosure",
                body: [
                    "Product Radar's use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements.",
                ],
            },
            {
                heading: "5. Storage and security",
                body: [
                    "Google Ads data retrieved by the application is stored in a PostgreSQL database on the operator's own machine. OAuth credentials are stored in a local environment file, are never committed to source control, and are transmitted only to Google's own endpoints over HTTPS.",
                    "The application is not hosted on a public server and exposes no public endpoint.",
                ],
            },
            {
                heading: "6. Sharing",
                body: [
                    "No information obtained through the Google Ads API is sold, rented, published, or shared with any third party — including any analytics, advertising or data-broker service. There are no third-party processors.",
                ],
            },
            {
                heading: "7. Retention and deletion",
                body: [
                    "Keyword snapshots are retained so that demand trends can be computed over time. The operator can delete the local database at any time, which removes all stored Google Ads data permanently.",
                    "Access granted to Product Radar can be revoked at any time at myaccount.google.com/permissions. Revoking access immediately invalidates the stored refresh token and stops all further data retrieval.",
                ],
            },
            {
                heading: "8. This website",
                body: [
                    "This page is part of the operator's personal portfolio site, hosted on Vercel. Vercel records standard server logs, and the site uses Vercel Analytics, which is aggregated and cookieless. No advertising cookies are set and no visitor is tracked across sites. The only value stored in your browser is your light or dark theme preference, kept in local storage on your own device.",
                ],
            },
            {
                heading: "9. Changes",
                body: [
                    "If this policy changes, the revised version is published on this page with a new update date.",
                ],
            },
            {
                heading: "10. Contact",
                body: [
                    "Questions about this policy can be sent to andre.oleari1@gmail.com.",
                ],
            },
        ],
    },
    terms: {
        title: "Product Radar — Terms of Service",
        updated: "Last updated: 12 September 2026",
        intro: "Product Radar is a private application operated by Andre Oleari. These terms describe the basis on which it is made available.",
        sections: [
            {
                heading: "1. Private use",
                body: [
                    "Product Radar is built for, and used by, a single operator. It is not offered as a product or a service to the public. No licence, account or right of use is granted to any other person, and there is no mechanism through which a third party could register or obtain access.",
                ],
            },
            {
                heading: "2. Google Ads API",
                body: [
                    "Product Radar accesses the Google Ads API strictly within the Google Ads API Terms and Conditions and the Required Minimum Functionality and permissible use policies. It reads keyword planning data from the operator's own account for the purpose of creating and managing the operator's own Google Ads campaigns.",
                    "The application does not resell Google Ads data, does not offer Google Ads data to third parties, and does not act on behalf of any advertiser other than its operator.",
                ],
            },
            {
                heading: "3. No warranty",
                body: [
                    "The application is provided as is. Search volumes, cost estimates and scores it produces are estimates derived from third-party data, and no guarantee is made as to their accuracy, completeness or fitness for any commercial decision. Every decision taken on the basis of its output is the operator's own.",
                ],
            },
            {
                heading: "4. Limitation of liability",
                body: [
                    "To the extent permitted by law, no liability is accepted for any loss arising from use of the application or reliance on its output.",
                ],
            },
            {
                heading: "5. Changes",
                body: [
                    "These terms may be revised. The current version is always the one published on this page.",
                ],
            },
            {
                heading: "6. Governing law",
                body: [
                    "These terms are governed by the laws of Brazil.",
                ],
            },
            {
                heading: "7. Contact",
                body: ["andre.oleari1@gmail.com"],
            },
        ],
    },
};

const pt: ProductRadarContent = {
    meta: {
        title: "Product Radar — pesquisa de palavras-chave e planejamento de campanhas",
        description:
            "Ferramenta privada, de operador único, que pesquisa demanda de busca para produtos físicos e a transforma em campanhas do Google Ads.",
    },
    backLabel: "Voltar ao portfólio",
    name: "Product Radar",
    tagline: "Pesquisa de palavras-chave e planejamento de campanhas do Google Ads",
    intro: [
        "O Product Radar é uma aplicação web privada, construída e operada por Andre Oleari. Ele pesquisa a demanda de busca por produtos físicos, decide em qual país vale anunciar, e transforma essa pesquisa na lista de palavras-chave, na segmentação geográfica e no orçamento das campanhas do Google Ads criadas para eles.",
        "Não é um serviço público. Não há cadastro, não há contas de usuário e não há usuários além do operador. A aplicação roda na máquina do próprio operador, contra a conta de administrador do Google Ads dele.",
    ],
    featuresHeading: "O que ele faz",
    features: [
        {
            title: "Demanda de busca",
            body: "Lê o volume mensal de busca e doze meses de histórico por país no Planejador de Palavras-chave do Google Ads, para o conjunto de termos de cada produto avaliado.",
        },
        {
            title: "Comparação de mercados",
            body: "Compara demanda, concorrência e nível de preço entre os países candidatos, para que a campanha seja lançada onde o público realmente está.",
        },
        {
            title: "Planejamento de campanha",
            body: "As palavras-chave, os volumes e a faixa de lance do topo da página que identificam uma oportunidade viram a lista de termos, a segmentação e o orçamento diário da campanha criada no Google Ads.",
        },
        {
            title: "Transparência de custo",
            body: "Custo do produto, frete, taxas de marketplace e impostos são modelados linha a linha, para que o orçamento de anúncio seja definido sobre uma margem real.",
        },
    ],
    apiHeading: "Como o Product Radar usa a API do Google Ads",
    apiIntro:
        "O Product Radar se autentica como o operador e lê dados de planejamento de palavras-chave da conta de administrador do próprio operador. Nada é lido de, nem gravado em, qualquer conta que não seja a dele.",
    apiPoints: [
        `Escopo solicitado: ${SCOPE}.`,
        "Dados lidos: sugestões de palavras-chave, volume mensal de busca, métricas históricas e estimativas de lance, via KeywordPlanIdeaService.",
        "Finalidade: planejar e gerenciar as campanhas do Google Ads do próprio operador — escolher palavras-chave, escolher o país a segmentar e dimensionar o orçamento.",
        "Os dados nunca são vendidos, publicados ou compartilhados com terceiros.",
        "O acesso pode ser revogado a qualquer momento em myaccount.google.com/permissions, o que invalida o token armazenado imediatamente.",
    ],
    contactHeading: "Contato",
    contactBody: "Dúvidas sobre a aplicação ou sobre o tratamento de dados:",
    privacyLabel: "Política de Privacidade",
    termsLabel: "Termos de Serviço",
    privacy: {
        title: "Product Radar — Política de Privacidade",
        updated: "Última atualização: 12 de setembro de 2026",
        intro: "Esta política descreve quais informações o Product Radar acessa, como são usadas, onde ficam armazenadas e como podem ser removidas. O Product Radar é uma ferramenta privada operada por Andre Oleari. Não é oferecida ao público e não tem usuários além do operador.",
        sections: [
            {
                heading: "1. Informações acessadas",
                body: ["O Product Radar acessa apenas duas categorias de informação:"],
                bullets: [
                    `Dados do Google Ads — sugestões de palavras-chave, volume mensal de busca, métricas históricas e estimativas de lance, lidos da conta de administrador do próprio operador pela API do Google Ads, usando o escopo ${SCOPE}.`,
                    "Credenciais OAuth — os tokens de acesso e de atualização emitidos pelo Google quando o operador concede esse acesso.",
                ],
            },
            {
                heading: "2. Informações não acessadas",
                body: [
                    "O Product Radar não acessa Gmail, Drive, Agenda, Contatos, Fotos ou qualquer outro serviço do Google. Não acessa nenhuma conta do Google Ads além da do operador. Não coleta dados pessoais de nenhuma outra pessoa, e não tem mecanismo para isso — não há cadastro, formulário ou login para terceiros.",
                ],
            },
            {
                heading: "3. Como as informações são usadas",
                body: [
                    "Os dados de palavras-chave são usados exclusivamente para pesquisar demanda de busca e para planejar, criar e gerenciar as campanhas do Google Ads do próprio operador: selecionar termos, selecionar os países a segmentar e dimensionar o orçamento frente à margem do produto.",
                    "Os dados não são usados para anunciar a terceiros, para criar perfis, para treinar modelos de aprendizado de máquina, nem para qualquer finalidade alheia às campanhas do operador.",
                ],
            },
            {
                heading: "4. Declaração de Uso Limitado",
                body: [
                    "O uso e a transferência, pelo Product Radar, de informações recebidas das APIs do Google seguem a Política de Dados do Usuário dos Serviços de API do Google, incluindo os requisitos de Uso Limitado.",
                ],
            },
            {
                heading: "5. Armazenamento e segurança",
                body: [
                    "Os dados do Google Ads obtidos pela aplicação são armazenados em um banco PostgreSQL na máquina do próprio operador. As credenciais OAuth ficam em um arquivo de ambiente local, nunca são versionadas e são transmitidas apenas aos endpoints do Google, por HTTPS.",
                    "A aplicação não é hospedada em servidor público e não expõe nenhum endpoint público.",
                ],
            },
            {
                heading: "6. Compartilhamento",
                body: [
                    "Nenhuma informação obtida pela API do Google Ads é vendida, alugada, publicada ou compartilhada com terceiros — incluindo serviços de analytics, de publicidade ou de intermediação de dados. Não há operadores terceirizados.",
                ],
            },
            {
                heading: "7. Retenção e exclusão",
                body: [
                    "Os registros de volume de busca são mantidos para que a tendência de demanda possa ser calculada ao longo do tempo. O operador pode apagar o banco local a qualquer momento, o que remove permanentemente todos os dados do Google Ads armazenados.",
                    "O acesso concedido ao Product Radar pode ser revogado a qualquer momento em myaccount.google.com/permissions. A revogação invalida o token imediatamente e interrompe qualquer coleta posterior.",
                ],
            },
            {
                heading: "8. Sobre este site",
                body: [
                    "Esta página faz parte do portfólio pessoal do operador, hospedado na Vercel. A Vercel registra logs padrão de servidor, e o site usa o Vercel Analytics, que é agregado e sem cookies. Nenhum cookie de publicidade é gravado e nenhum visitante é rastreado entre sites. O único valor guardado no seu navegador é a preferência de tema claro ou escuro, mantida no armazenamento local do seu próprio dispositivo.",
                ],
            },
            {
                heading: "9. Alterações",
                body: [
                    "Se esta política mudar, a versão revisada é publicada nesta página com nova data de atualização.",
                ],
            },
            {
                heading: "10. Contato",
                body: [
                    "Dúvidas sobre esta política podem ser enviadas para andre.oleari1@gmail.com.",
                ],
            },
        ],
    },
    terms: {
        title: "Product Radar — Termos de Serviço",
        updated: "Última atualização: 12 de setembro de 2026",
        intro: "O Product Radar é uma aplicação privada operada por Andre Oleari. Estes termos descrevem a base sobre a qual ela é disponibilizada.",
        sections: [
            {
                heading: "1. Uso privado",
                body: [
                    "O Product Radar foi construído para, e é usado por, um único operador. Não é oferecido como produto ou serviço ao público. Nenhuma licença, conta ou direito de uso é concedido a terceiros, e não há mecanismo pelo qual um terceiro possa se cadastrar ou obter acesso.",
                ],
            },
            {
                heading: "2. API do Google Ads",
                body: [
                    "O Product Radar acessa a API do Google Ads estritamente dentro dos Termos e Condições da API do Google Ads e das políticas de Funcionalidade Mínima Exigida e de uso permitido. Ele lê dados de planejamento de palavras-chave da conta do próprio operador, com a finalidade de criar e gerenciar as campanhas do Google Ads dele.",
                    "A aplicação não revende dados do Google Ads, não oferece esses dados a terceiros e não atua em nome de nenhum anunciante além do seu operador.",
                ],
            },
            {
                heading: "3. Ausência de garantia",
                body: [
                    "A aplicação é fornecida no estado em que se encontra. Volumes de busca, estimativas de custo e notas por ela produzidos são estimativas derivadas de dados de terceiros, sem garantia de exatidão, completude ou adequação a qualquer decisão comercial. Toda decisão tomada com base no resultado é do próprio operador.",
                ],
            },
            {
                heading: "4. Limitação de responsabilidade",
                body: [
                    "Na extensão permitida por lei, não se assume responsabilidade por qualquer perda decorrente do uso da aplicação ou da confiança em seus resultados.",
                ],
            },
            {
                heading: "5. Alterações",
                body: [
                    "Estes termos podem ser revisados. A versão vigente é sempre a publicada nesta página.",
                ],
            },
            {
                heading: "6. Lei aplicável",
                body: ["Estes termos são regidos pelas leis do Brasil."],
            },
            {
                heading: "7. Contato",
                body: ["andre.oleari1@gmail.com"],
            },
        ],
    },
};

const content: Record<Locale, ProductRadarContent> = { en, pt };

export const getProductRadar = (locale: Locale): ProductRadarContent => content[locale];
