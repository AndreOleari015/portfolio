#!/usr/bin/env python3
"""
Prepara as telas que passam por dentro do molde de telefone.

O molde é `assets/molde.png`, um iPhone com o miolo vago: a área da tela é
transparente, então basta pôr a captura atrás e a moldura desenha por cima,
cobrindo os cantos arredondados sem precisar de máscara. A área medida é
899×1954 em (54, 53), num molde de 1008×2060, e o aspecto dela bate com o das
capturas cruas do simulador (0,4601).

Este script não compõe nada: só entrega cada tela no tamanho e no formato
certos para a página. Quem escolhe qual aparece é o componente `Phone`, que
tem o ciclo automático e os botões.

O `label` sai em branco na saída de propósito: ele é o nome da tela que vira
botão na página, tem que existir nos dois idiomas e só quem escolheu a captura
sabe qual é.

**Largura de saída: até 900px.** O molde tem 20rem (320px em CSS) na página,
então a tela dentro dele tem uns 285px, e 900 dá mais que o dobro disso, que é
o que uma tela retina pede. Guardar as capturas cruas de 1320px custaria 3 MB
por app sem nada em troca.

É um teto, não um alvo: origem menor que 900 fica no tamanho dela. Ampliar não
cria pixel nenhum, só peso, e as telas tiradas de painel de loja saem com uns
824px, que já é 2,9x os 285 da página.

Uso:  python3 scripts/telas-do-molde.py      (roda da raiz do projeto)

Depende de Pillow.  pip install pillow
"""
from hashlib import sha256
from pathlib import Path

from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
ORIGENS = [RAIZ / "assets" / "paineis", RAIZ / "public" / "shots"]
DESTINO = RAIZ / "public" / "telas"

LARGURA_MAX = 900

# slug -> telas, na ordem em que passam pelo molde.
#
# A quantidade é livre desde que a lista aqui e os rótulos do dicionário
# batam: quem faz o ciclo é o `Phone`, com `screens.length`, e não mais um
# keyframe de CSS com atraso fixo.
#
# A chave de mata-mata saiu do Scoreboard: a única captura dela vinha de
# painel de loja, e as três exportações pedidas vieram com a aba Matches
# selecionada. Para trazer de volta, é `python3 scripts/extrair-tela.py` no
# painel 6 de `expo-placar/fastlane/ios/fastlane/screenshots/en-US/`.
TELAS = {
    "bus-times": ["tfi-4-stop.png", "tfi-3-widgets.png", "tfi-2-map.png"],
    "scoreboard": ["placar-criacao.png", "placar-jogos.png", "placar-classificacao.png"],
    "lista-virtual": ["lista-convidados.png", "lista-checkin.png", "lista-offline-limpa.png"],
}


def achar(nome: str) -> Path:
    for pasta in ORIGENS:
        if (pasta / nome).exists():
            return pasta / nome
    raise SystemExit(f"origem não encontrada: {nome}")


def preparar(slug: str, indice: int, arquivo: str) -> Path:
    im = Image.open(achar(arquivo)).convert("RGB")
    largura = min(LARGURA_MAX, im.size[0])
    if largura != im.size[0]:
        im = im.resize((largura, round(im.size[1] * largura / im.size[0])), Image.LANCZOS)

    temporario = DESTINO / f".{slug}-{indice}.tmp.webp"
    im.save(temporario, "WEBP", quality=86, method=6)
    destino = DESTINO / f"{slug}-{indice}.{sha256(temporario.read_bytes()).hexdigest()[:8]}.webp"
    temporario.replace(destino)
    return destino


def main() -> None:
    DESTINO.mkdir(exist_ok=True)
    for slug, arquivos in TELAS.items():
        for antigo in DESTINO.glob(f"{slug}-*.webp"):
            antigo.unlink()
        for i, arquivo in enumerate(arquivos, start=1):
            destino = preparar(slug, i, arquivo)
            largura, altura = Image.open(destino).size
            peso = destino.stat().st_size // 1024
            print(f'  {{ src: "/telas/{destino.name}", label: "?" }},'
                  f'  // {largura}×{altura}  {peso} KB  <- {arquivo}')


if __name__ == "__main__":
    main()
