import { type GuestModel, MODEL_COLUMNS, MODELS_COPY, modelFiles } from "@/content/lista-de-convidados";

/**
 * Peças das páginas de modelo de lista de convidados. Elas vestem a marca da
 * landing (`docs/lista-virtual/design-system.md`) e acrescentam uma coisa só:
 * os dois arquivos, mostrados como eles são.
 */

const letter = (i: number) => String.fromCharCode(65 + i);

/** As colunas de Sim/Não do arquivo pintam a célula: verde no sim, vermelho no não. */
const choice = (value: string) => (value === "Sim" ? "lv-xl-yes" : value === "Não" ? "lv-xl-no" : undefined);

/**
 * A prévia mostra os dois arquivos que a página entrega, do jeito que eles
 * abrem: a planilha na frente, com as letras das colunas, o número das linhas,
 * as cores do arquivo e as abas embaixo, e o PDF deitado atrás, inclinado como
 * o telefone do fechamento da landing.
 *
 * As cores da planilha (cabeçalho escuro, célula amarela com texto azul, o
 * verde do "Sim") são as do arquivo, não da página: aqui elas valem como o
 * verde do WhatsApp dentro das capturas. As letras puladas (A, E, G...) são as
 * colunas que a prévia esconde, como o Excel mostra coluna oculta.
 */
export const SheetPreview = ({ model }: { model: GuestModel }) => {
    const columns = [...MODEL_COLUMNS, ...model.extraColumns.map((column) => column.name)];
    const markColumn = columns.includes("Confirmou") ? "Confirmou" : columns[columns.length - 1];
    const shown = [
        { name: "Nome", short: "Nome" },
        {
            name: "Quantidade de acompanhantes",
            short: "Quantidade de acompanhantes",
        },
        { name: model.previewExtra, short: model.previewExtra },
        { name: markColumn, short: markColumn },
    ];
    const files = modelFiles(model.slug);
    const fileName = files.xlsx.split("/").pop();
    const pdfColumns = ["Nome", "Acomp.", ...model.extraColumns.map((column) => column.name), "Chegou"];

    return (
        <figure className="lv-files" aria-label={MODELS_COPY.previewAlt(model.event)}>
            <div className="lv-files-stage">
                {/* O PDF, atrás. Só o desenho da folha: o texto dele já está
                    no título da página. */}
                <div className="lv-pdf" aria-hidden>
                    <p className="lv-pdf-title lv-serif">Lista de convidados para {model.event}</p>
                    <div className="lv-pdf-fields">
                        <span>Evento</span>
                        <span>Data</span>
                        <span>Local</span>
                    </div>
                    <div
                        className="lv-pdf-head"
                        style={{
                            gridTemplateColumns: `2.4fr repeat(${pdfColumns.length - 2}, 1fr) 0.6fr`,
                        }}
                    >
                        {pdfColumns.map((column) => (
                            <span key={column}>{column}</span>
                        ))}
                    </div>
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className="lv-pdf-row">
                            <i />
                        </div>
                    ))}
                </div>

                {/* A planilha, na frente. */}
                <div className="lv-xl">
                    <p className="lv-xl-file">{fileName}</p>
                    <table>
                        <thead>
                            <tr className="lv-xl-letters">
                                <th aria-hidden />
                                {shown.map((column) => (
                                    <th key={column.name} aria-hidden>
                                        {letter(columns.indexOf(column.name))}
                                    </th>
                                ))}
                            </tr>
                            <tr className="lv-xl-header">
                                <td className="lv-xl-row">1</td>
                                {shown.map((column) => (
                                    <th key={column.name}>{column.short}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {model.preview.map((row, i) => (
                                <tr key={row.name}>
                                    <td className="lv-xl-row">{i + 2}</td>
                                    <td>{row.name}</td>
                                    <td className="lv-xl-num">{row.companions === 0 ? "-" : row.companions}</td>
                                    <td className={choice(row.extra)}>{row.extra}</td>
                                    <td className={row.confirmed ? "lv-xl-yes" : undefined}>
                                        {row.confirmed ? "Sim" : ""}
                                    </td>
                                </tr>
                            ))}
                            {[0, 1, 2].map((i) => (
                                <tr key={i} aria-hidden>
                                    <td className="lv-xl-row">{model.preview.length + i + 2}</td>
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="lv-xl-tabs" aria-hidden>
                        <span className="lv-xl-tab-on">Convidados</span>
                        <span>Como preencher</span>
                    </p>
                </div>
            </div>
            <figcaption className="lv-fine">{MODELS_COPY.previewNote}</figcaption>
        </figure>
    );
};

/** Os dois arquivos: a planilha em latão, que é o principal, e o PDF em anel. */
export const ModelDownloads = ({ slug }: { slug: string }) => {
    const files = modelFiles(slug);

    return (
        <div className="lv-model-downloads">
            <a href={files.xlsx} download className="lv-cta">
                {MODELS_COPY.downloadXlsx}
            </a>
            <a href={files.pdf} download className="lv-cta-ring">
                <span>{MODELS_COPY.downloadPdf}</span>
            </a>
        </div>
    );
};
