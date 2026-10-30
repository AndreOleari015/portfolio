#!/usr/bin/env node
/**
 * Gera os arquivos para baixar das páginas de modelo de lista de convidados:
 * uma planilha (.xlsx) e um PDF para imprimir por evento, em
 * `public/modelos/`. Os dados vêm de `content/lista-de-convidados.ts`, o mesmo
 * arquivo que monta as páginas, então mudou lá, rodar de novo.
 *
 * Sem biblioteca nova. A planilha é o XML do formato do Excel escrito à mão e
 * zipado com o `zlib` do Node (o .xlsx é só um zip de XMLs). O PDF sai de um
 * HTML impresso pelo Chrome sem janela, como as imagens de compartilhamento
 * (`scripts/og-lista-virtual.mjs`).
 *
 * Uso:  node scripts/modelos-lista.mjs      (roda da raiz do projeto)
 *
 * Depende do Google Chrome instalado (macOS) e de internet, para a fonte do
 * título do PDF. Node 22 ou mais novo (lê o .ts direto e tem `zlib.crc32`).
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { crc32, deflateRawSync } from "node:zlib";

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DESTINO = join(RAIZ, "public", "modelos");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const { GUEST_MODELS, MODEL_COLUMNS, MODELS_COPY, PDF_ROWS, PDF_ROWS_PER_PAGE, XLSX_ROWS } = await import(
    pathToFileURL(join(RAIZ, "content", "lista-de-convidados.ts")).href
);

const xml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ── Zip ─────────────────────────────────────────────────────────────────── */

/** Zip mínimo: arquivos comprimidos com deflate, sem pasta e sem data. */
const zip = (files) => {
    const locais = [];
    const centrais = [];
    let offset = 0;

    for (const [nome, conteudo] of files) {
        const dado = Buffer.from(conteudo, "utf8");
        const comprimido = deflateRawSync(dado);
        const nomeBuf = Buffer.from(nome, "utf8");
        const crc = crc32(dado);

        const local = Buffer.alloc(30);
        local.writeUInt32LE(0x04034b50, 0);
        local.writeUInt16LE(20, 4);
        local.writeUInt16LE(0x0800, 6); // nomes em UTF-8
        local.writeUInt16LE(8, 8); // deflate
        local.writeUInt32LE(0, 10); // hora e data
        local.writeUInt32LE(crc, 14);
        local.writeUInt32LE(comprimido.length, 18);
        local.writeUInt32LE(dado.length, 22);
        local.writeUInt16LE(nomeBuf.length, 26);
        local.writeUInt16LE(0, 28);
        locais.push(local, nomeBuf, comprimido);

        const central = Buffer.alloc(46);
        central.writeUInt32LE(0x02014b50, 0);
        central.writeUInt16LE(20, 4);
        central.writeUInt16LE(20, 6);
        central.writeUInt16LE(0x0800, 8);
        central.writeUInt16LE(8, 10);
        central.writeUInt32LE(0, 12);
        central.writeUInt32LE(crc, 16);
        central.writeUInt32LE(comprimido.length, 20);
        central.writeUInt32LE(dado.length, 24);
        central.writeUInt16LE(nomeBuf.length, 28);
        central.writeUInt32LE(offset, 42);
        centrais.push(central, nomeBuf);

        offset += local.length + nomeBuf.length + comprimido.length;
    }

    const diretorio = Buffer.concat(centrais);
    const fim = Buffer.alloc(22);
    fim.writeUInt32LE(0x06054b50, 0);
    fim.writeUInt16LE(files.length, 8);
    fim.writeUInt16LE(files.length, 10);
    fim.writeUInt32LE(diretorio.length, 12);
    fim.writeUInt32LE(offset, 16);

    return Buffer.concat([...locais, diretorio, fim]);
};

/* ── Planilha ────────────────────────────────────────────────────────────── */

/*
 * No formato que o André aprovou na planilha da viagem
 * (vault, `pessoal/viagens/2026-10-18-plano-viagem-final.xlsx`): Arial,
 * cabeçalho de cor escura com texto branco em negrito, célula de preencher em
 * amarelo claro com texto azul, fórmula em cinza, zero aparecendo como "-",
 * fio fino cinza em volta das células e cabeçalho congelado. A cor do
 * cabeçalho é a da marca do app.
 *
 * O título e a linha cinza que explica a aba ficam à direita da lista, em
 * cima do resumo, e não acima do cabeçalho: o app lê a linha 1 como cabeçalho
 * na importação.
 */

const letra = (i) => String.fromCharCode(65 + i);

/** Célula de texto inline (sem tabela de textos compartilhados). */
const texto = (ref, valor, estilo) =>
    `<c r="${ref}" t="inlineStr" s="${estilo}"><is><t xml:space="preserve">${xml(valor)}</t></is></c>`;
/* O valor guardado é 0 (aparece "-"), certo para a planilha em branco; quem
   lê sem recalcular, como a prévia do Finder, mostra isso em vez de vazio. */
const formula = (ref, f) => `<c r="${ref}" s="${S.formula}"><f>${xml(f)}</f><v>0</v></c>`;
const vazia = (ref, estilo) => `<c r="${ref}" s="${estilo}"/>`;

/** Índices de `cellXfs` em `ESTILOS`. */
const S = {
    cabecalho: 1,
    titulo: 2,
    subtitulo: 3,
    entrada: 4,
    entradaNumero: 5,
    formula: 6,
    rotulo: 7,
    texto: 8,
    negrito: 9,
};

const ESTILOS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<numFmts count="1"><numFmt numFmtId="164" formatCode="0;-0;&quot;-&quot;"/></numFmts>
<fonts count="7">
<font><sz val="10"/><name val="Arial"/></font>
<font><b/><sz val="10"/><color rgb="FFFFFFFF"/><name val="Arial"/></font>
<font><b/><sz val="14"/><name val="Arial"/></font>
<font><i/><sz val="10"/><color rgb="FF555555"/><name val="Arial"/></font>
<font><sz val="10"/><color rgb="FF0000FF"/><name val="Arial"/></font>
<font><b/><sz val="10"/><name val="Arial"/></font>
<font><sz val="10"/><color rgb="FF000000"/><name val="Arial"/></font>
</fonts>
<fills count="5">
<fill><patternFill patternType="none"/></fill>
<fill><patternFill patternType="gray125"/></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FF2A1E05"/><bgColor indexed="64"/></patternFill></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FFFFF7D6"/><bgColor indexed="64"/></patternFill></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FFF2F2F2"/><bgColor indexed="64"/></patternFill></fill>
</fills>
<borders count="2">
<border><left/><right/><top/><bottom/><diagonal/></border>
<border><left style="thin"><color rgb="FFC9D3D6"/></left><right style="thin"><color rgb="FFC9D3D6"/></right><top style="thin"><color rgb="FFC9D3D6"/></top><bottom style="thin"><color rgb="FFC9D3D6"/></bottom><diagonal/></border>
</borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="10">
<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
<xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1"/>
<xf numFmtId="0" fontId="3" fillId="0" borderId="0" xfId="0" applyFont="1"/>
<xf numFmtId="0" fontId="4" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center"/></xf>
<xf numFmtId="164" fontId="4" fillId="3" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
<xf numFmtId="164" fontId="6" fillId="4" borderId="1" xfId="0" applyNumberFormat="1" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
<xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="center"/></xf>
<xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
<xf numFmtId="0" fontId="5" fillId="0" borderId="1" xfId="0" applyFont="1" applyBorder="1" applyAlignment="1"><alignment vertical="top"/></xf>
</cellXfs>
<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
<dxfs count="2">
<dxf><font><color rgb="FF006100"/></font><fill><patternFill><bgColor rgb="FFC6EFCE"/></patternFill></fill></dxf>
<dxf><font><color rgb="FF9C0006"/></font><fill><patternFill><bgColor rgb="FFFFC7CE"/></patternFill></fill></dxf>
</dxfs>
</styleSheet>`;

/** Larguras pensadas para o que vai em cada coluna, em caracteres. */
const LARGURA = {
    Nome: 30,
    Telefone: 17,
    "Informações complementares": 30,
    "Observações do recepcionista": 28,
    "Quantidade de acompanhantes": 15,
    VIP: 8,
};

/** Colunas de Sim/Não: lista para escolher e cor para ler de longe. */
const ESCOLHA = ["VIP", "Confirmou", "Cerimônia", "Festa"];

/** As contas do resumo, por evento. `c` dá a letra de uma coluna pelo nome. */
const resumo = (modelo, c, fim) => {
    const faixa = (nome) => `${c(nome)}2:${c(nome)}${fim}`;
    const acomp = faixa("Quantidade de acompanhantes");
    const linhas = [
        ["Convidados na lista", `COUNTA(${faixa("Nome")})`],
        ["Acompanhantes", `SUM(${acomp})`],
        ["Total de pessoas", "{0}+{1}"],
    ];
    const tem = (nome) => modelo.extraColumns.some((col) => col.name === nome);

    if (tem("Confirmou")) {
        const conf = faixa("Confirmou");
        linhas.push(
            ["Confirmaram", `COUNTIF(${conf},"Sim")`],
            ["Pessoas confirmadas", `{3}+SUMIF(${conf},"Sim",${acomp})`],
            ["Não vão", `COUNTIF(${conf},"Não")`],
            ["Ainda sem resposta", "{0}-{3}-{5}"],
        );
    }
    if (tem("Cerimônia")) {
        linhas.push(["Vão à cerimônia", `COUNTIF(${faixa("Cerimônia")},"Sim")`]);
    }
    if (tem("Festa")) {
        const festa = faixa("Festa");
        linhas.push(
            ["Vão à festa", `COUNTIF(${festa},"Sim")`],
            ["Pessoas na festa", `{${linhas.length}}+SUMIF(${festa},"Sim",${acomp})`],
        );
    }
    return linhas;
};

const planilha = (modelo) => {
    const colunas = [...MODEL_COLUMNS, ...modelo.extraColumns.map((col) => col.name)];
    const c = (nome) => letra(colunas.indexOf(nome));
    const ultima = letra(colunas.length - 1);
    const fim = XLSX_ROWS + 1;

    /* O painel da direita: uma coluna de respiro, o rótulo e o número. */
    const colRotulo = letra(colunas.length + 1);
    const colValor = letra(colunas.length + 2);
    const contas = resumo(modelo, c, fim);
    const linhaConta = (i) => i + 5;
    const ref = (i) => `${colValor}${linhaConta(i)}`;

    const cols = [
        ...colunas.map((nome, i) => {
            const largura = LARGURA[nome] ?? Math.max(14, nome.length + 6);
            return `<col min="${i + 1}" max="${i + 1}" width="${largura}" customWidth="1"/>`;
        }),
        `<col min="${colunas.length + 1}" max="${colunas.length + 1}" width="3" customWidth="1"/>`,
        `<col min="${colunas.length + 2}" max="${colunas.length + 2}" width="24" customWidth="1"/>`,
        `<col min="${colunas.length + 3}" max="${colunas.length + 3}" width="10" customWidth="1"/>`,
    ].join("");

    const painel = {
        1: texto(`${colRotulo}1`, `Lista de convidados para ${modelo.event}`, S.titulo),
        2: texto(
            `${colRotulo}2`,
            "Uma pessoa por linha. As colunas de A a F são as que o app Lista Virtual lê: não mude o nome delas.",
            S.subtitulo,
        ),
        4: texto(`${colRotulo}4`, "Resumo", S.cabecalho) + vazia(`${colValor}4`, S.cabecalho),
    };
    contas.forEach(([rotulo, f], i) => {
        const conta = f.replace(/\{(\d+)\}/g, (_, n) => ref(Number(n)));
        painel[linhaConta(i)] = texto(`${colRotulo}${linhaConta(i)}`, rotulo, S.rotulo) + formula(ref(i), conta);
    });

    const acomp = colunas.indexOf("Quantidade de acompanhantes");
    const linhas = [];
    for (let r = 1; r <= fim; r++) {
        const celulas =
            r === 1
                ? colunas.map((nome, i) => texto(`${letra(i)}1`, nome, S.cabecalho)).join("")
                : colunas.map((_, i) => vazia(`${letra(i)}${r}`, i === acomp ? S.entradaNumero : S.entrada)).join("");
        const altura = r === 1 ? ' ht="30" customHeight="1"' : "";
        linhas.push(`<row r="${r}"${altura}>${celulas}${painel[r] ?? ""}</row>`);
    }

    const escolhas = colunas.map((nome, i) => ({ nome, i })).filter(({ nome }) => ESCOLHA.includes(nome));
    const validacoes = [
        ...escolhas.map(
            ({ i }) =>
                `<dataValidation type="list" allowBlank="1" showErrorMessage="0" sqref="${letra(i)}2:${letra(i)}${fim}"><formula1>"Sim,Não"</formula1></dataValidation>`,
        ),
        `<dataValidation type="whole" operator="greaterThanOrEqual" allowBlank="1" showErrorMessage="1" errorTitle="Só números" error="Escreva quantas pessoas vêm junto, de 0 para cima." sqref="${letra(acomp)}2:${letra(acomp)}${fim}"><formula1>0</formula1></dataValidation>`,
    ];
    const cores = escolhas
        .map(({ i }) => {
            const faixa = `${letra(i)}2:${letra(i)}${fim}`;
            return `<conditionalFormatting sqref="${faixa}"><cfRule type="cellIs" dxfId="0" priority="${i * 2 + 1}" operator="equal"><formula>"Sim"</formula></cfRule><cfRule type="cellIs" dxfId="1" priority="${i * 2 + 2}" operator="equal"><formula>"Não"</formula></cfRule></conditionalFormatting>`;
        })
        .join("");

    const convidados = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<dimension ref="A1:${colValor}${fim}"/>
<sheetViews><sheetView workbookViewId="0" tabSelected="1"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/><selection pane="bottomLeft" activeCell="A2" sqref="A2"/></sheetView></sheetViews>
<sheetFormatPr defaultRowHeight="18" customHeight="1"/>
<cols>${cols}</cols>
<sheetData>${linhas.join("")}</sheetData>
<autoFilter ref="A1:${ultima}${fim}"/>
${cores}
<dataValidations count="${validacoes.length}">${validacoes.join("")}</dataValidations>
<pageMargins left="0.4" right="0.4" top="0.5" bottom="0.5" header="0.3" footer="0.3"/>
<pageSetup orientation="landscape" paperSize="9" fitToWidth="1" fitToHeight="0"/>
</worksheet>`;

    /* A segunda aba explica cada coluna, no mesmo formato. Fica atrás da
       lista porque o app lê só a primeira aba. */
    const ajuda = [
        `<row r="1">${texto("A1", `Como preencher a lista de convidados para ${modelo.event}`, S.titulo)}</row>`,
        `<row r="2">${texto("A2", "O que escrever em cada coluna da aba Convidados.", S.subtitulo)}</row>`,
        `<row r="4" ht="22" customHeight="1">${texto("A4", "Coluna", S.cabecalho)}${texto("B4", "O que escrever", S.cabecalho)}${texto("C4", "Lida pelo app", S.cabecalho)}</row>`,
        ...colunas.map((nome, i) => {
            const extra = modelo.extraColumns.find((col) => col.name === nome);
            const dica = extra?.hint ?? modelo.columnHints[nome] ?? MODELS_COPY.columnDefaults[nome];
            const r = i + 5;
            return `<row r="${r}">${texto(`A${r}`, nome, S.negrito)}${texto(`B${r}`, dica, S.texto)}${texto(`C${r}`, extra ? "Não" : "Sim", S.rotulo)}</row>`;
        }),
    ].join("");
    const abaAjuda = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<sheetFormatPr defaultRowHeight="18" customHeight="1"/>
<cols><col min="1" max="1" width="30" customWidth="1"/><col min="2" max="2" width="80" customWidth="1"/><col min="3" max="3" width="14" customWidth="1"/></cols>
<sheetData>${ajuda}</sheetData>
</worksheet>`;

    const livro = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<sheets><sheet name="Convidados" sheetId="1" r:id="rId1"/><sheet name="Como preencher" sheetId="2" r:id="rId2"/></sheets>
<definedNames><definedName name="_xlnm._FilterDatabase" localSheetId="0" hidden="1">Convidados!$A$1:$${ultima}$${fim}</definedName></definedNames>
<calcPr calcId="191029" fullCalcOnLoad="1"/>
</workbook>`;

    return zip([
        [
            "[Content_Types].xml",
            `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
<Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`,
        ],
        [
            "_rels/.rels",
            `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
        ],
        ["xl/workbook.xml", livro],
        [
            "xl/_rels/workbook.xml.rels",
            `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/>
<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`,
        ],
        ["xl/worksheets/sheet1.xml", convidados],
        ["xl/worksheets/sheet2.xml", abaAjuda],
        ["xl/styles.xml", ESTILOS],
    ]);
};

/* ── PDF ─────────────────────────────────────────────────────────────────── */

/**
 * A4 deitado: na porta a folha fica numa prancheta ou na mesa, e em pé não
 * cabiam as colunas do evento junto com a de observação. Telefone e VIP ficam
 * de fora, porque não se usam com caneta. Tinta escura em fundo branco, para
 * imprimir em casa; o latão aparece só no fio do título.
 */
const folha = (modelo) => {
    const extras = modelo.extraColumns.map((col) => col.name);
    const cabecalho = ["", "Nome", "Acomp.", ...extras, "Observações", "Chegou"];
    const paginas = Math.ceil(PDF_ROWS / PDF_ROWS_PER_PAGE);

    const linhas = (pagina) =>
        Array.from({ length: PDF_ROWS_PER_PAGE }, (_, i) => {
            const n = pagina * PDF_ROWS_PER_PAGE + i + 1;
            return `<tr><td class="n">${n}</td><td></td><td></td>${extras.map(() => "<td></td>").join("")}<td></td><td class="box"><span></span></td></tr>`;
        }).join("");

    const pagina = (p) => `
<section class="page">
  <header>
    <h1>Lista de convidados para ${xml(modelo.event)}</h1>
    <div class="campos"><p>Evento <span></span></p><p>Data <span></span></p><p>Local <span></span></p><p class="pag">Página ${p + 1} de ${paginas}</p></div>
  </header>
  <table>
    <colgroup><col class="c-n"><col class="c-nome"><col class="c-acomp">${extras.map(() => '<col class="c-extra">').join("")}<col class="c-obs"><col class="c-box"></colgroup>
    <thead><tr>${cabecalho.map((col) => `<th>${xml(col)}</th>`).join("")}</tr></thead>
    <tbody>${linhas(p)}</tbody>
  </table>
  <footer>Modelo grátis da Lista Virtual: andreoleari.com.br/pt/lista-virtual</footer>
</section>`;

    return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Wittgenstein:wght@600&display=block" rel="stylesheet">
<style>
@page { size: A4 landscape; margin: 11mm 13mm 9mm; }
* { box-sizing: border-box; margin: 0; }
body { font-family: -apple-system, "Helvetica Neue", Arial, sans-serif; color: #1d1a14; font-size: 9.5pt; }
.page { height: 189mm; display: flex; flex-direction: column; page-break-after: always; }
.page:last-child { page-break-after: auto; }
header { display: flex; align-items: flex-end; gap: 10mm; padding-bottom: 3.5mm; border-bottom: 1.2pt solid #a9781a; margin-bottom: 3mm; }
h1 { font-family: "Wittgenstein", Georgia, serif; font-weight: 600; font-size: 17pt; letter-spacing: -0.01em; white-space: nowrap; }
.campos { flex: 1; display: grid; grid-template-columns: 1.3fr 0.7fr 1.3fr auto; gap: 6mm; color: #5b5242; }
.campos p { display: flex; gap: 2mm; align-items: flex-end; }
.campos span { flex: 1; border-bottom: 0.6pt solid #8a7f68; height: 4.5mm; }
.campos .pag { color: #8a7f68; font-size: 8pt; }
table { width: 100%; border-collapse: collapse; table-layout: fixed; flex: 1; }
th { text-align: left; font-weight: 600; font-size: 8.5pt; color: #5b5242; padding: 0 2mm 1.8mm; border-bottom: 0.8pt solid #1d1a14; }
td { border-bottom: 0.5pt solid #cfc6b2; height: 7.4mm; padding: 0 2mm; }
td + td, th + th { border-left: 0.5pt solid #e4dccb; }
.n { color: #8a7f68; font-size: 8pt; text-align: right; }
.box span { display: block; width: 4.2mm; height: 4.2mm; border: 0.8pt solid #1d1a14; border-radius: 1mm; margin: auto; }
.c-n { width: 9mm; } .c-acomp { width: 16mm; } .c-extra { width: 30mm; } .c-obs { width: 62mm; } .c-box { width: 15mm; }
footer { margin-top: 2.5mm; font-size: 7.5pt; color: #8a7f68; }
</style></head>
<body>${Array.from({ length: paginas }, (_, p) => pagina(p)).join("")}</body></html>`;
};

const imprimir = (html, saida) => {
    const pasta = mkdtempSync(join(tmpdir(), "modelo-"));
    const arquivo = join(pasta, "folha.html");
    writeFileSync(arquivo, html);
    const r = spawnSync(CHROME, [
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        "--virtual-time-budget=8000",
        `--print-to-pdf=${saida}`,
        pathToFileURL(arquivo).href,
    ]);
    rmSync(pasta, { recursive: true, force: true });
    if (r.status !== 0) throw new Error(`Chrome falhou: ${r.stderr}`);
};

/* ── Saída ───────────────────────────────────────────────────────────────── */

mkdirSync(DESTINO, { recursive: true });

for (const modelo of GUEST_MODELS) {
    const base = join(DESTINO, `lista-de-convidados-${modelo.slug}`);
    writeFileSync(`${base}.xlsx`, planilha(modelo));
    imprimir(folha(modelo), `${base}.pdf`);
    console.log(`public/modelos/lista-de-convidados-${modelo.slug}.{xlsx,pdf}`);
}
