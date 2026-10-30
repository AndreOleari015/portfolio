/**
 * Modelos de lista de convidados, um por tipo de evento, em português.
 *
 * Cada evento vira uma página (`/pt/lista-virtual/lista-de-convidados/<slug>`)
 * e dois arquivos para baixar, a planilha e o PDF para imprimir, gerados por
 * `scripts/modelos-lista.mjs` a partir deste mesmo arquivo. Por isso aqui não
 * entra `import`: o script lê o arquivo direto pelo Node.
 *
 * As seis primeiras colunas da planilha são as do modelo do próprio app, com o
 * mesmo nome e na mesma posição (A a F). O importador
 * (`src/app/(home)/import-guests.tsx` do expo-listavirtual, desde 18/07/2026)
 * casa pelo nome e, quando não acha, pela posição; nome e posição iguais ao
 * modelo do app tiram as duas dúvidas. Só a versão nova do app conta (André,
 * 30/10/2026): o importador da 2.x, que lia só pelo nome exato, não entra na conta.
 * VIP fica sempre na sexta coluna, mesmo onde o evento não usa, porque sem ela
 * a primeira coluna extra cairia na posição do VIP e um "sim" de confirmação
 * viraria convidado VIP. As colunas do evento vêm depois e o app ignora.
 *
 * Por que estes dez: a busca do Google de 30/10/2026 (vault,
 * `apps/lista-virtual/2026-10-30-paginas-seo-buscas.md`).
 */

export const MODEL_COLUMNS = [
    "Nome",
    "Telefone",
    "Informações complementares",
    "Observações do recepcionista",
    "Quantidade de acompanhantes",
    "VIP",
] as const;

/** Linhas formatadas para preencher na planilha. */
export const XLSX_ROWS = 300;
/** Linhas do PDF, em páginas de paisagem com 20 linhas cada. */
export const PDF_ROWS = 60;
export const PDF_ROWS_PER_PAGE = 20;

export type ModelColumn = { name: string; hint: string };

export type GuestModel = {
    slug: string;
    /** Como o evento aparece em frase: "chá de bebê", "festa de 15 anos". */
    event: string;
    /** O evento com a preposição certa: "do casamento", "da festa infantil". */
    eventOf: string;
    /** Rótulo curto na lista de modelos e nos links. */
    label: string;
    title: string;
    description: string;
    h1: string;
    lead: string;
    /** O que escrever nas colunas do app que mudam de sentido por evento. */
    columnHints: Partial<Record<(typeof MODEL_COLUMNS)[number], string>>;
    /** Colunas próprias do evento, depois das seis do app. */
    extraColumns: ModelColumn[];
    /** Três linhas de exemplo para a prévia, na ordem das colunas do papel. */
    preview: {
        name: string;
        companions: number;
        extra: string;
        confirmed: boolean;
    }[];
    /** Qual coluna extra aparece na prévia. */
    previewExtra: string;
    tips: { title: string; body: string }[];
    message: string;
};

export const GUEST_MODELS: GuestModel[] = [
    {
        slug: "casamento",
        eventOf: "do casamento",
        event: "casamento",
        label: "Casamento",
        title: "Lista de convidados para casamento: modelo grátis em Excel e PDF",
        description:
            "Modelo de lista de convidados para casamento, com lado da noiva ou do noivo, mesa e confirmação. Planilha do Excel e PDF para imprimir, grátis.",
        h1: "Lista de convidados para casamento",
        lead: "Uma planilha com lado da família, mesa e confirmação, pronta para dividir com quem organiza com você. Tem também a versão em PDF, para levar impressa no dia.",
        columnHints: {
            "Informações complementares": "Restrição alimentar ou qualquer coisa que o buffet precise saber.",
            VIP: "Marque padrinhos, madrinhas e pais. No app, eles entram com destaque na portaria.",
        },
        extraColumns: [
            {
                name: "Lado",
                hint: "Noiva ou noivo. Ajuda a equilibrar a lista quando os dois lados negociam vagas.",
            },
            {
                name: "Mesa",
                hint: "Preencha depois da confirmação, quando o número fechar.",
            },
            {
                name: "Confirmou",
                hint: "Sim, não ou em branco para quem ainda não respondeu.",
            },
        ],
        preview: [
            { name: "Helena Duarte", companions: 1, extra: "Noiva", confirmed: true },
            {
                name: "Otávio Martins",
                companions: 2,
                extra: "Noivo",
                confirmed: true,
            },
            { name: "Lúcia Ferraz", companions: 0, extra: "Noiva", confirmed: false },
        ],
        previewExtra: "Lado",
        tips: [
            {
                title: "Combine o acompanhante antes de convidar",
                body: "Decida se o convite vale para o casal, para a família ou só para o nome escrito. A coluna de acompanhantes existe para isso ficar registrado e não virar surpresa na porta.",
            },
            {
                title: "Feche o número pelo prazo do buffet",
                body: "Quem manda no prazo da confirmação é o contrato do buffet. Peça as respostas com folga para ainda dar tempo de ajustar mesas e cardápio.",
            },
            {
                title: "Uma lista só para os dois lados",
                body: "Duas planilhas, uma de cada família, sempre terminam com nome repetido. Uma lista com a coluna Lado resolve isso e mostra quantas vagas cada lado já usou.",
            },
        ],
        message:
            "Oi, [nome]! Nosso casamento é dia [data], às [hora], em [local]. Queremos muito você lá. Pode confirmar se vem até [prazo]? Se for levar acompanhante, conta pra gente também.",
    },
    {
        slug: "aniversario",
        eventOf: "do aniversário",
        event: "aniversário",
        label: "Aniversário",
        title: "Lista de convidados para aniversário: modelo grátis em Excel e PDF",
        description:
            "Modelo de lista de convidados para festa de aniversário, com acompanhantes e confirmação. Planilha do Excel e PDF para imprimir, grátis.",
        h1: "Lista de convidados para aniversário",
        lead: "Para festa em casa, no salão ou no bar: nome, telefone, quantos vêm com cada um e quem já confirmou. Baixe a planilha ou o PDF para imprimir.",
        columnHints: {
            "Informações complementares": "Restrição alimentar ou qualquer detalhe que você queira lembrar.",
            VIP: "Use se a festa tiver área reservada ou entrada com nome na lista.",
        },
        extraColumns: [
            {
                name: "Grupo",
                hint: "Família, trabalho, faculdade. Ajuda a lembrar quem falta convidar.",
            },
            {
                name: "Confirmou",
                hint: "Sim, não ou em branco para quem ainda não respondeu.",
            },
        ],
        preview: [
            {
                name: "Rafaela Nunes",
                companions: 1,
                extra: "Trabalho",
                confirmed: true,
            },
            {
                name: "Bruno Teixeira",
                companions: 0,
                extra: "Faculdade",
                confirmed: true,
            },
            {
                name: "Sônia Almeida",
                companions: 2,
                extra: "Família",
                confirmed: false,
            },
        ],
        previewExtra: "Grupo",
        tips: [
            {
                title: "Separe por grupo",
                body: "Família, trabalho, amigos de infância. Com o grupo anotado fica fácil ver se esqueceu alguém de uma turma inteira.",
            },
            {
                title: "Conte acompanhantes desde o começo",
                body: "Vinte convites com acompanhante são quarenta pessoas. Somar a coluna de acompanhantes antes de fechar o lugar evita festa apertada.",
            },
            {
                title: "Bar e salão costumam pedir lista na porta",
                body: "Se o lugar libera a entrada pelo nome, mande a lista a eles com antecedência e leve uma cópia impressa ou no celular.",
            },
        ],
        message:
            "Oi, [nome]! Vou comemorar meu aniversário dia [data], a partir das [hora], em [local]. Bora? Me confirma até [prazo] se você vem e se vai levar alguém.",
    },
    {
        slug: "festa-infantil",
        eventOf: "da festa infantil",
        event: "festa infantil",
        label: "Festa infantil",
        title: "Lista de convidados para festa infantil: modelo grátis em Excel e PDF",
        description:
            "Modelo de lista de convidados para aniversário infantil, com a criança, o responsável e a confirmação. Planilha do Excel e PDF para imprimir, grátis.",
        h1: "Lista de convidados para festa infantil",
        lead: "Em festa de criança o convite é para a criança, mas quem responde é o pai ou a mãe. Esta planilha tem lugar para os dois e para saber quantos adultos vêm junto.",
        columnHints: {
            Nome: "O nome da criança convidada.",
            Telefone: "O telefone do responsável, que é quem vai responder.",
            "Informações complementares":
                "Idade, alergia alimentar ou qualquer cuidado que a equipe da festa precise saber.",
            "Quantidade de acompanhantes": "Quantos adultos e irmãos vêm com a criança.",
        },
        extraColumns: [
            { name: "Grupo", hint: "Turma da escola, família ou vizinhos. No app, vira o grupo do convidado." },
            {
                name: "Responsável",
                hint: "Nome de quem traz a criança e busca no fim.",
            },
            {
                name: "Confirmou",
                hint: "Sim, não ou em branco para quem ainda não respondeu.",
            },
        ],
        preview: [
            {
                name: "Theo Lacerda",
                companions: 2,
                extra: "Mariana",
                confirmed: true,
            },
            { name: "Alice Prado", companions: 1, extra: "Jorge", confirmed: true },
            {
                name: "Miguel Costa",
                companions: 3,
                extra: "Patrícia",
                confirmed: false,
            },
        ],
        previewExtra: "Responsável",
        tips: [
            {
                title: "Os adultos também comem",
                body: "Cada criança costuma vir com pelo menos um adulto, às vezes com irmão. Some a coluna de acompanhantes antes de fechar o buffet e a quantidade de doces.",
            },
            {
                title: "Anote alergias na lista",
                body: "Escreva a alergia ao lado do nome da criança. Assim a informação chega a quem serve, sem depender de alguém lembrar no dia.",
            },
            {
                title: "Grupo da escola não confirma sozinho",
                body: "Convite mandado no grupo da turma rende pouca resposta. Mandar para cada responsável, com o nome da criança, funciona melhor.",
            },
        ],
        message:
            "Oi, [responsável]! O [aniversariante] vai fazer [idade] anos e quer muito o [criança] na festa: dia [data], das [hora] às [hora], em [local]. Consegue me confirmar até [prazo] e me dizer quantos adultos vêm junto?",
    },
    {
        slug: "15-anos",
        eventOf: "da festa de 15 anos",
        event: "festa de 15 anos",
        label: "15 anos",
        title: "Lista de convidados para 15 anos: modelo grátis em Excel e PDF",
        description:
            "Modelo de lista de convidados para festa de 15 anos, com mesa, corte de valsa e confirmação. Planilha do Excel e PDF para imprimir, grátis.",
        h1: "Lista de convidados para festa de 15 anos",
        lead: "Família, amigos da escola e o corte da valsa na mesma planilha. Tem a versão em PDF para a recepção conferir na porta.",
        columnHints: {
            "Informações complementares": "Restrição alimentar ou recado para o cerimonial.",
            VIP: "Marque quem faz parte do corte de valsa. No app, essas pessoas aparecem destacadas na portaria.",
        },
        extraColumns: [
            {
                name: "Grupo",
                hint: "Família, escola ou amigos. Ajuda a montar as mesas depois.",
            },
            { name: "Mesa", hint: "Preencha depois da confirmação." },
            {
                name: "Confirmou",
                hint: "Sim, não ou em branco para quem ainda não respondeu.",
            },
        ],
        preview: [
            {
                name: "Valentina Rocha",
                companions: 0,
                extra: "Escola",
                confirmed: true,
            },
            {
                name: "Cláudio Mendes",
                companions: 3,
                extra: "Família",
                confirmed: true,
            },
            {
                name: "Isadora Lima",
                companions: 1,
                extra: "Escola",
                confirmed: false,
            },
        ],
        previewExtra: "Grupo",
        tips: [
            {
                title: "O corte de valsa vem primeiro",
                body: "Damas e cavalheiros precisam ensaiar, então são as primeiras confirmações a fechar. Marque essas pessoas na coluna VIP para achar todas de uma vez.",
            },
            {
                title: "Amigos da escola com o telefone dos pais",
                body: "Em muitas famílias quem decide se o adolescente vai é o responsável. Ter o telefone dele na lista agiliza a confirmação.",
            },
            {
                title: "Mesa só depois de confirmar",
                body: "Montar mesas com a lista aberta é refazer o mapa toda semana. Espere o prazo da confirmação fechar e use a coluna Mesa.",
            },
        ],
        message:
            "Oi, [nome]! A [aniversariante] vai comemorar os 15 anos dia [data], às [hora], em [local], e sua presença é muito importante pra gente. Pode confirmar até [prazo] quantas pessoas vêm?",
    },
    {
        slug: "cha-de-bebe",
        eventOf: "do chá de bebê",
        event: "chá de bebê",
        label: "Chá de bebê",
        title: "Lista de convidados para chá de bebê: modelo grátis em Excel e PDF",
        description:
            "Modelo de lista de convidados para chá de bebê, com o presente de cada um e a confirmação. Planilha do Excel e PDF para imprimir, grátis.",
        h1: "Lista de convidados para chá de bebê",
        lead: "Quem vem, quem confirmou e o que cada um vai levar, numa planilha só. Assim dá para pedir tamanhos de fralda diferentes e não receber tudo igual.",
        columnHints: {
            "Informações complementares": "Tamanho da fralda que você pediu para essa pessoa (P, M, G).",
        },
        extraColumns: [
            { name: "Grupo", hint: "Família, trabalho ou amigos. No app, vira o grupo do convidado." },
            {
                name: "Presente",
                hint: "O que a pessoa disse que vai levar. Ajuda depois, na hora de agradecer.",
            },
            {
                name: "Confirmou",
                hint: "Sim, não ou em branco para quem ainda não respondeu.",
            },
        ],
        preview: [
            {
                name: "Fernanda Souto",
                companions: 0,
                extra: "Fralda M",
                confirmed: true,
            },
            {
                name: "Daniela Viana",
                companions: 1,
                extra: "Fralda G",
                confirmed: true,
            },
            {
                name: "Rosana Pires",
                companions: 0,
                extra: "Fralda P",
                confirmed: false,
            },
        ],
        previewExtra: "Presente",
        tips: [
            {
                title: "Distribua os tamanhos de fralda",
                body: "Se todo mundo levar o mesmo tamanho, sobra fralda que o bebê perde em semanas. Combine o tamanho com cada convidado e anote na lista.",
            },
            {
                title: "A lista serve para agradecer",
                body: "Depois do chá, a coluna Presente vira a lista de agradecimentos. Fica fácil mandar uma mensagem para cada pessoa sem esquecer ninguém.",
            },
            {
                title: "Confirme mais perto da data",
                body: "No fim da gravidez os planos mudam rápido. Um lembrete alguns dias antes ajuda a saber quem vem de verdade.",
            },
        ],
        message:
            "Oi, [nome]! Vamos fazer o chá de bebê do(a) [nome do bebê] dia [data], às [hora], em [local]. Adoraria ter você lá! Pode me confirmar até [prazo]? Se for levar fralda, o tamanho que ficou pra você é [tamanho].",
    },
    {
        slug: "cha-revelacao",
        eventOf: "do chá revelação",
        event: "chá revelação",
        label: "Chá revelação",
        title: "Lista de convidados para chá revelação: modelo grátis em Excel e PDF",
        description:
            "Modelo de lista de convidados para chá revelação, com o palpite de cada convidado e a confirmação. Planilha do Excel e PDF para imprimir, grátis.",
        h1: "Lista de convidados para chá revelação",
        lead: "Uma lista com espaço para o palpite de cada convidado, menino ou menina. Na hora da revelação dá para ver quem acertou.",
        columnHints: {
            "Informações complementares": "Restrição alimentar ou qualquer detalhe que você queira lembrar.",
        },
        extraColumns: [
            {
                name: "Grupo",
                hint: "Família ou amigos. Mostra de que lado veio cada palpite e, no app, vira o grupo do convidado.",
            },
            {
                name: "Palpite",
                hint: "Menino ou menina. Peça junto com a confirmação.",
            },
            {
                name: "Confirmou",
                hint: "Sim, não ou em branco para quem ainda não respondeu.",
            },
        ],
        preview: [
            { name: "Gustavo Reis", companions: 1, extra: "Menino", confirmed: true },
            {
                name: "Beatriz Moura",
                companions: 0,
                extra: "Menina",
                confirmed: true,
            },
            {
                name: "Paulo Henrique",
                companions: 2,
                extra: "Menina",
                confirmed: false,
            },
        ],
        previewExtra: "Palpite",
        tips: [
            {
                title: "Peça o palpite na confirmação",
                body: "A mensagem que pede a confirmação pode já perguntar o palpite. Você junta as duas respostas numa vez só.",
            },
            {
                title: "Lista menor, confirmação mais rápida",
                body: "Chá revelação costuma ser para família e amigos próximos. Com menos gente, dá para confirmar um por um sem planilha enorme.",
            },
            {
                title: "Quem não vem também quer saber",
                body: "Marque quem não pode ir para mandar o vídeo da revelação depois. A coluna Confirmou já mostra quem são.",
            },
        ],
        message:
            "Oi, [nome]! Vamos descobrir se é menino ou menina no dia [data], às [hora], em [local]. Você vem? Me confirma até [prazo] e já manda seu palpite!",
    },
    {
        slug: "formatura",
        eventOf: "da formatura",
        event: "formatura",
        label: "Formatura",
        title: "Lista de convidados para formatura: modelo grátis em Excel e PDF",
        description:
            "Modelo de lista de convidados para formatura, com o formando de cada convidado, mesa e confirmação. Planilha do Excel e PDF para imprimir, grátis.",
        h1: "Lista de convidados para formatura",
        lead: "Em formatura cada formando tem sua cota de convites. Esta planilha junta todos os convidados da turma, com o formando de cada um, para a comissão e a portaria.",
        columnHints: {
            "Informações complementares": "Número do convite ou da pulseira, se a turma usar.",
            VIP: "Marque os formandos e os pais, se tiverem área ou entrada separada.",
        },
        extraColumns: [
            {
                name: "Formando",
                hint: "De quem é o convite. É o que a comissão mais precisa na hora de conferir as cotas.",
            },
            { name: "Mesa", hint: "Mesa da família do formando." },
            {
                name: "Confirmou",
                hint: "Sim, não ou em branco para quem ainda não respondeu.",
            },
        ],
        preview: [
            {
                name: "Regina Albuquerque",
                companions: 0,
                extra: "Lucas A.",
                confirmed: true,
            },
            {
                name: "Marcos Albuquerque",
                companions: 0,
                extra: "Lucas A.",
                confirmed: true,
            },
            {
                name: "Teresa Campos",
                companions: 1,
                extra: "Júlia C.",
                confirmed: false,
            },
        ],
        previewExtra: "Formando",
        tips: [
            {
                title: "Cada formando preenche a sua parte",
                body: "A comissão monta a planilha e cada formando completa os próprios convidados. Com a coluna Formando, dá para filtrar e conferir quem passou da cota.",
            },
            {
                title: "Colação e baile podem ter cotas diferentes",
                body: "Se a turma tem um número de convites para a colação e outro para o baile, faça uma lista para cada. Misturar as duas confunde a portaria.",
            },
            {
                title: "A portaria confere pelo nome",
                body: "Na entrada, quem confere precisa achar o nome rápido. Ordem alfabética no PDF impresso, ou QR Code no celular, evita fila.",
            },
        ],
        message:
            "Oi, [nome]! Vou me formar e quero você comigo: [colação ou baile] dia [data], às [hora], em [local]. Pode confirmar até [prazo]? Preciso passar a lista para a comissão.",
    },
    {
        slug: "noivado",
        eventOf: "do noivado",
        event: "noivado",
        label: "Noivado",
        title: "Lista de convidados para noivado: modelo grátis em Excel e PDF",
        description:
            "Modelo de lista de convidados para festa de noivado, com o lado de cada família e a confirmação. Planilha do Excel e PDF para imprimir, grátis.",
        h1: "Lista de convidados para noivado",
        lead: "Uma lista curta, com as duas famílias e os amigos mais próximos. Quem entrar aqui provavelmente vai estar na lista do casamento, então ela já serve de começo.",
        columnHints: {
            "Informações complementares": "Restrição alimentar ou recado para quem recebe.",
        },
        extraColumns: [
            { name: "Grupo", hint: "Família ou amigos. No app, vira o grupo do convidado." },
            { name: "Lado", hint: "Noiva ou noivo." },
            {
                name: "Confirmou",
                hint: "Sim, não ou em branco para quem ainda não respondeu.",
            },
        ],
        preview: [
            {
                name: "Carolina Batista",
                companions: 1,
                extra: "Noiva",
                confirmed: true,
            },
            {
                name: "Renato Gouveia",
                companions: 1,
                extra: "Noivo",
                confirmed: true,
            },
            { name: "Elisa Moraes", companions: 0, extra: "Noivo", confirmed: false },
        ],
        previewExtra: "Lado",
        tips: [
            {
                title: "Guarde a planilha para o casamento",
                body: "Os nomes, telefones e lados já estão aqui. Na hora de montar a lista do casamento, você começa desta, sem digitar tudo de novo.",
            },
            {
                title: "Combine o tamanho com as duas famílias",
                body: "Noivado costuma ser íntimo. Combinar antes quantas pessoas cada lado chama evita a lista crescer pela metade de uma família.",
            },
            {
                title: "Confirmação simples basta",
                body: "Com pouca gente, uma mensagem para cada um e a coluna Confirmou resolvem. Não precisa de formulário.",
            },
        ],
        message:
            "Oi, [nome]! Vamos comemorar nosso noivado dia [data], às [hora], em [local], só com quem é importante pra gente. Pode confirmar até [prazo]?",
    },
    {
        slug: "batizado",
        eventOf: "do batizado",
        event: "batizado",
        label: "Batizado",
        title: "Lista de convidados para batizado: modelo grátis em Excel e PDF",
        description:
            "Modelo de lista de convidados para batizado, separando quem vai à cerimônia e quem vai à festa. Planilha do Excel e PDF para imprimir, grátis.",
        h1: "Lista de convidados para batizado",
        lead: "Batizado tem dois momentos, a igreja e a festa, e nem todo mundo vai aos dois. Esta planilha separa as duas presenças e destaca padrinhos e madrinhas.",
        columnHints: {
            "Informações complementares": "Restrição alimentar ou qualquer detalhe que você queira lembrar.",
            VIP: "Marque padrinho e madrinha. No app, eles aparecem destacados na portaria.",
        },
        extraColumns: [
            { name: "Grupo", hint: "Família ou amigos. No app, vira o grupo do convidado." },
            { name: "Cerimônia", hint: "Sim se a pessoa vai à igreja." },
            { name: "Festa", hint: "Sim se a pessoa vai ao almoço ou à festa." },
        ],
        preview: [
            { name: "Antônio Ribeiro", companions: 1, extra: "Sim", confirmed: true },
            { name: "Graça Fontes", companions: 0, extra: "Sim", confirmed: true },
            { name: "Vera Machado", companions: 2, extra: "Não", confirmed: false },
        ],
        previewExtra: "Cerimônia",
        tips: [
            {
                title: "Pergunte pelos dois momentos",
                body: "Na confirmação, pergunte se a pessoa vai à cerimônia, à festa ou às duas. A igreja costuma ter limite de lugares, e o buffet conta só quem vai à festa.",
            },
            {
                title: "Padrinhos confirmam primeiro",
                body: "A igreja geralmente pede os nomes dos padrinhos com antecedência, às vezes com documento. Feche esses dois antes do resto.",
            },
            {
                title: "Deixe os dois horários claros",
                body: "Escreva na mensagem o horário da cerimônia e o da festa, separados. Assim ninguém vai direto para o almoço achando que é tudo junto.",
            },
        ],
        message:
            "Oi, [nome]! O batizado do(a) [nome] vai ser dia [data]: cerimônia às [hora] na [igreja] e depois almoço em [local]. Você vem? Me conta até [prazo] se vai à cerimônia, ao almoço ou aos dois.",
    },
    {
        slug: "cha-de-casa-nova",
        eventOf: "do chá de casa nova",
        event: "chá de casa nova",
        label: "Chá de casa nova",
        title: "Lista de convidados para chá de casa nova: modelo grátis em Excel e PDF",
        description:
            "Modelo de lista de convidados para chá de casa nova, com o presente combinado e a confirmação. Planilha do Excel e PDF para imprimir, grátis.",
        h1: "Lista de convidados para chá de casa nova",
        lead: "Uma lista para a primeira festa na casa nova, com o presente que cada um vai levar. Assim você não ganha três sanduicheiras e nenhuma panela.",
        columnHints: {
            "Informações complementares": "Restrição alimentar ou qualquer detalhe que você queira lembrar.",
        },
        extraColumns: [
            { name: "Grupo", hint: "Família, trabalho ou amigos. No app, vira o grupo do convidado." },
            { name: "Presente", hint: "O que a pessoa combinou de levar." },
            {
                name: "Confirmou",
                hint: "Sim, não ou em branco para quem ainda não respondeu.",
            },
        ],
        preview: [
            {
                name: "Pedro Antunes",
                companions: 1,
                extra: "Jogo de panelas",
                confirmed: true,
            },
            {
                name: "Larissa Queiroz",
                companions: 0,
                extra: "Toalhas",
                confirmed: true,
            },
            {
                name: "Fábio Lins",
                companions: 1,
                extra: "Liquidificador",
                confirmed: false,
            },
        ],
        previewExtra: "Presente",
        tips: [
            {
                title: "Combine o presente na confirmação",
                body: "Quando a pessoa confirma, já diga o que falta. A coluna Presente mostra o que já foi escolhido e evita repetição.",
            },
            {
                title: "Conte quantos cabem",
                body: "Apartamento novo nem sempre comporta todo mundo de uma vez. Some os acompanhantes e, se passar do espaço, divida em dois dias.",
            },
            {
                title: "Avise o prédio",
                body: "Em condomínio, a portaria costuma pedir os nomes dos visitantes. Mande a lista dos confirmados no dia anterior.",
            },
        ],
        message:
            "Oi, [nome]! Mudei de casa e quero comemorar com você: dia [data], às [hora], no [endereço]. Pode confirmar até [prazo]? Se quiser levar alguma coisa, me fala que eu te digo o que ainda falta.",
    },
];

/** Nome da campanha nos links das lojas destas páginas (ver `storeUrls` em `content/lista-virtual.ts`). */
export const MODELS_CAMPAIGN = "site-modelos";

export const getGuestModel = (slug: string) => GUEST_MODELS.find((model) => model.slug === slug);

/** Arquivos para baixar, em `public/modelos/`. */
export const modelFiles = (slug: string) => ({
    xlsx: `/modelos/lista-de-convidados-${slug}.xlsx`,
    pdf: `/modelos/lista-de-convidados-${slug}.pdf`,
});

/** Textos fixos das páginas de modelo. */
export const MODELS_COPY = {
    hub: {
        title: "Modelos de lista de convidados grátis: Excel e PDF por tipo de evento",
        description:
            "Modelos de lista de convidados para casamento, aniversário, festa infantil, 15 anos, chá de bebê, formatura e mais. Planilha do Excel e PDF para imprimir, grátis e sem cadastro.",
        h1: "Modelos de lista de convidados",
        lead: "Uma planilha e um PDF para cada tipo de festa, com as colunas que aquele evento pede. Grátis e sem cadastro.",
        each: "Planilha e PDF",
    },
    breadcrumb: "Modelos de lista",
    downloadXlsx: "Baixar planilha do Excel",
    downloadPdf: "Baixar PDF para imprimir",
    downloadNote: "Grátis, sem cadastro. A planilha também abre no Google Planilhas e no Numbers.",
    previewAlt: (event: string) => `Prévia da lista de convidados de ${event}, preenchida com exemplos`,
    previewConfirmed: "Confirmou",
    previewCompanions: "Acomp.",
    previewName: "Nome",
    previewNote: "Prévia preenchida com exemplos. A planilha vem em branco.",
    columnsHeading: "O que vem na planilha",
    columnsBody:
        "As seis primeiras colunas são as que a Lista Virtual lê quando você importa a planilha. As outras são deste tipo de evento.",
    appColumns: "As que o app lê na importação",
    eventColumns: "Só deste modelo",
    summaryHeading: "O resumo, que se preenche sozinho",
    summaryBody: (confirm: boolean) =>
        confirm
            ? "À direita da lista, a planilha conta quantos convidados você tem, o total de pessoas com os acompanhantes, quem confirmou, quem não vai e quem ainda não respondeu."
            : "À direita da lista, a planilha conta quantos convidados você tem, o total de pessoas com os acompanhantes, quem vai à cerimônia, quem vai à festa e quantas pessoas a festa vai receber.",
    columnDefaults: {
        Nome: "Nome do convidado, do jeito que ele vai se apresentar na porta.",
        Telefone: "Com DDD. É por ele que o convite sai pelo WhatsApp.",
        "Informações complementares": "Qualquer detalhe que ajude a organizar.",
        "Observações do recepcionista":
            "Recado para quem está na porta, como chegar mais cedo ou entrada pela lateral.",
        "Quantidade de acompanhantes": "Quantas pessoas vêm com o convidado, sem contar ele.",
        VIP: "Sim para quem precisa de destaque na entrada.",
    } as Record<(typeof MODEL_COLUMNS)[number], string>,
    tipsHeading: (eventOf: string) => `Dicas para a lista ${eventOf}`,
    messageHeading: "Mensagem para pedir a confirmação",
    messageBody: "Troque o que está entre colchetes e mande para cada convidado pelo WhatsApp.",
    copy: "Copiar mensagem",
    copied: "Mensagem copiada",
    appHeading: "Na portaria, a planilha vira check-in",
    appBody:
        "Importe esta planilha na Lista Virtual e cada convidado recebe o convite pelo WhatsApp, com o link para confirmar e um QR Code para entrar. Na porta, o recepcionista libera com um toque, até sem internet.",
    appNote: "Grátis até 50 convidados. Importar planilha faz parte do Premium.",
    othersHeading: "Outros modelos",
    hubLink: "Modelos de lista de convidados",
};
