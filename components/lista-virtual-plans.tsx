"use client";

import { useState } from "react";
import type { Plan, PlanCell, PlanRow, Plans } from "@/content/lista-virtual";

/**
 * A tabela de planos, na forma da Ment Funding: alternância no topo, uma
 * coluna por plano, preço no alto, botão embaixo, e o plano recomendado com o
 * anel de latão.
 *
 * São dois grupos, "Por evento" (os passes) e "Assinatura", e cada um mostra o
 * Grátis e mais dois planos. Os dois grupos saem do servidor, com o que não está
 * escolhido em `hidden`: os preços dos quatro planos ficam no HTML para quem
 * lê sem clicar, e a troca não pisca.
 *
 * No desktop é tabela, com a coluna de rótulos à esquerda; no telefone, um
 * cartão por plano, com a lista de recursos dentro. Números e fontes em
 * `docs/lista-virtual/content.md`.
 */
type Group = "event" | "subscription";

export const LvPlans = ({ plans, ctaHref }: { plans: Plans; ctaHref: string }) => {
    const [group, setGroup] = useState<Group>("event");

    return (
        <>
            <div className="lv-plans-head">
                <div>
                    <p className="lv-eyebrow">{plans.eyebrow}</p>
                    <h2 className="lv-serif lv-section-title lv-plans-title">{plans.heading}</h2>
                    <p className="lv-lead mt-5 max-w-[34rem]">{plans.body}</p>
                </div>
                <div className="lv-toggle" role="group" aria-label={plans.eyebrow}>
                    {(["event", "subscription"] as const).map((key) => (
                        <button
                            key={key}
                            type="button"
                            aria-pressed={group === key}
                            onClick={() => setGroup(key)}>
                            {plans.toggle[key]}
                        </button>
                    ))}
                </div>
            </div>

            {(["event", "subscription"] as const).map((key) => {
                const columns = [plans.free, ...plans[key]];
                return (
                    <div key={key} hidden={group !== key}>
                        <Table columns={columns} rows={plans.rows} labels={plans} ctaHref={ctaHref} />
                        <Cards columns={columns} rows={plans.rows} labels={plans} ctaHref={ctaHref} />
                    </div>
                );
            })}

            <p className="lv-plans-note">{plans.note}</p>
        </>
    );
};

type Labels = { yes: string; no: string };

/** A primeira coluna é sempre o Grátis; as outras usam o valor pago da linha. */
const valueFor = (row: PlanRow, index: number): PlanCell => (index === 0 ? row.free : row.paid);

const Mark = ({ value, labels }: { value: PlanCell; labels: Labels }) => {
    if (value === true) {
        return (
            <span className="lv-yes" role="img" aria-label={labels.yes}>
                <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden>
                    <path
                        d="M2.5 6.8 5.2 9.4 10.5 3.8"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
        );
    }
    if (value === false) return <span className="lv-no" role="img" aria-label={labels.no} />;
    return <>{value}</>;
};

const PlanHead = ({ plan }: { plan: Plan }) => (
    <>
        <span className={`lv-plan-badge ${plan.badge ? "" : "lv-plan-badge-empty"}`}>{plan.badge ?? "\u00a0"}</span>
        <span className="lv-serif lv-plan-name">{plan.name}</span>
        <span className="lv-plan-kind">{plan.kind}</span>
        <span className="lv-plan-price">
            <strong className="lv-serif">{plan.price}</strong>
            <span>{plan.period}</span>
        </span>
        <span className="lv-plan-note">{plan.note}</span>
    </>
);

const PlanCta = ({ plan, href }: { plan: Plan; href: string }) =>
    plan.badge ? (
        <a href={href} className="lv-cta lv-cta-block">
            {plan.cta}
        </a>
    ) : (
        <a href={href} className="lv-cta-ring lv-cta-block">
            <span>{plan.cta}</span>
        </a>
    );

const Table = ({
    columns,
    rows,
    labels,
    ctaHref,
}: {
    columns: Plan[];
    rows: PlanRow[];
    labels: Labels;
    ctaHref: string;
}) => (
    <div className="lv-plans-table">
        <div className="lv-plans-col lv-plans-labels" aria-hidden>
            <div className="lv-plans-head-cell" />
            {rows.map((row) => (
                <div key={row.label} className="lv-plans-cell">
                    {row.label}
                </div>
            ))}
        </div>
        {columns.map((plan, index) => (
            <div key={plan.id} className={`lv-plans-col ${plan.badge ? "lv-plans-rec" : ""}`}>
                <div className="lv-plans-head-cell">
                    <PlanHead plan={plan} />
                </div>
                {rows.map((row) => (
                    <div key={row.label} className="lv-plans-cell">
                        <span className="sr-only">{row.label}: </span>
                        <Mark value={valueFor(row, index)} labels={labels} />
                    </div>
                ))}
                <div className="lv-plans-cta">
                    <PlanCta plan={plan} href={ctaHref} />
                </div>
            </div>
        ))}
    </div>
);

const Cards = ({
    columns,
    rows,
    labels,
    ctaHref,
}: {
    columns: Plan[];
    rows: PlanRow[];
    labels: Labels;
    ctaHref: string;
}) => (
    <div className="lv-plans-cards">
        {columns.map((plan, index) => (
            <div key={plan.id} className={`lv-plan-card ${plan.badge ? "lv-plans-rec" : ""}`}>
                <div className="lv-plan-card-head">
                    <PlanHead plan={plan} />
                </div>
                <ul>
                    {rows.map((row) => (
                        <li key={row.label}>
                            <span>{row.label}</span>
                            <span className="lv-plan-card-value">
                                <Mark value={valueFor(row, index)} labels={labels} />
                            </span>
                        </li>
                    ))}
                </ul>
                <div className="lv-plans-cta">
                    <PlanCta plan={plan} href={ctaHref} />
                </div>
            </div>
        ))}
    </div>
);
