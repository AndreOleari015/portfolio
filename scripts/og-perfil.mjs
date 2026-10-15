#!/usr/bin/env node
/**
 * Gera a imagem dos links compartilhados do portfólio, em en e pt.
 *
 * O desenho está em `scripts/og-perfil.html` e repete a abertura do site no tema
 * escuro. Aqui só abrimos esse arquivo num Chrome sem janela, esperamos as fontes
 * e a figura, e fotografamos 1200x630. É o mesmo processo de `og-lista-virtual.mjs`.
 *
 * Sai em JPEG, e não PNG: com a foto, o PNG passa de 1 MB, e o WhatsApp costuma não
 * mostrar a prévia de imagem acima de uns 300 KB. O nome leva o hash do conteúdo, para
 * o LinkedIn e o WhatsApp não continuarem mostrando a imagem antiga do cache.
 *
 * Uso:  node scripts/og-perfil.mjs      (roda da raiz do projeto)
 *       grava public/og-perfil-<idioma>.<hash>.jpg, apaga a versão anterior e
 *       imprime o caminho novo para `meta.ogImage` em `content/dictionary.ts`.
 *
 * Depende do Google Chrome instalado (macOS) e de internet, para as fontes.
 */
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DESENHO = join(RAIZ, "scripts", "og-perfil.html");
const DESTINO = join(RAIZ, "public");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const IDIOMAS = ["en", "pt"];
const QUALIDADE = 90;

const espera = (ms) => new Promise((r) => setTimeout(r, ms));

const porta = 9300 + Math.floor(Math.random() * 500);
const chrome = spawn(
    CHROME,
    [
        "--headless=new",
        `--remote-debugging-port=${porta}`,
        `--user-data-dir=${mkdtempSync(join(tmpdir(), "og-"))}`,
        "--allow-file-access-from-files",
        "--hide-scrollbars",
        "--no-first-run",
        "about:blank",
    ],
    { stdio: "ignore" },
);
const prazo = setTimeout(() => {
    console.error("O Chrome não respondeu em 60s.");
    chrome.kill();
    process.exit(1);
}, 60_000);

let alvo;
for (let i = 0; i < 50 && !alvo; i++) {
    try {
        const abas = await (await fetch(`http://127.0.0.1:${porta}/json`)).json();
        alvo = abas.find((a) => a.type === "page");
    } catch {}
    if (!alvo) await espera(200);
}

const ws = new WebSocket(alvo.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let id = 0;
const pendentes = new Map();
ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pendentes.has(m.id)) {
        pendentes.get(m.id)(m);
        pendentes.delete(m.id);
    }
});
const enviar = (method, params = {}) =>
    new Promise((r) => {
        const i = ++id;
        pendentes.set(i, r);
        ws.send(JSON.stringify({ id: i, method, params }));
    });
const avaliar = async (expressao) =>
    (await enviar("Runtime.evaluate", { expression: expressao, returnByValue: true, awaitPromise: true }))
        .result?.result?.value;

await enviar("Emulation.setDeviceMetricsOverride", { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
await enviar("Page.enable");

for (const idioma of IDIOMAS) {
    const url = `${pathToFileURL(DESENHO).href}?l=${idioma}`;
    await enviar("Page.navigate", { url });
    await espera(1000);
    const pronto = await avaliar(
        `document.fonts.ready
            .then(() => Promise.all([...document.images].map((i) => i.decode().catch(() => null))))
            .then(() => document.fonts.check('800 108px "Hanken Grotesk"') && document.fonts.check('500 18px "Geist Mono"') && [...document.images].every((i) => i.naturalWidth > 0))`,
    );
    if (!pronto) {
        console.error(`${idioma}: a fonte ou alguma imagem não carregou.`);
        chrome.kill();
        process.exit(1);
    }

    const foto = await enviar("Page.captureScreenshot", {
        format: "jpeg",
        quality: QUALIDADE,
        clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 },
    });
    const dados = Buffer.from(foto.result.data, "base64");
    const hash = createHash("sha256").update(dados).digest("hex").slice(0, 8);
    const nome = `og-perfil-${idioma}.${hash}.jpg`;

    for (const antigo of readdirSync(DESTINO)) {
        if (antigo.startsWith(`og-perfil-${idioma}.`) && antigo !== nome) rmSync(join(DESTINO, antigo));
    }
    writeFileSync(join(DESTINO, nome), dados);
    console.log(`${idioma}: /${nome}  (${Math.round(dados.length / 1024)} KB)`);
}

clearTimeout(prazo);
ws.close();
chrome.kill();
