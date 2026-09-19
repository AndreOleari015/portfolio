#!/usr/bin/env python3
"""
Monta a figura de um projeto a partir de várias capturas reais.

Recortar uma tela só nunca resolveu, e a razão é aritmética: uma captura de
1320px é nítida até uns 660px de largura e legível a partir de uns 600px, então
numa coluna de 432px ela é sempre ou nítida e ilegível, ou legível e borrada.
Uma composição escapa disso porque escolhe quanto de cada tela aparece e em que
tamanho, em vez de aceitar o que o recorte impõe.

O arranjo é o das capas de divulgação (`~/Desktop/portfolio-*/00-cover`), com
três diferenças:

- **sem ícone, slogan nem linha de stack.** A página já diz as três coisas ao
  lado da figura, e repetir em outra tipografia é o que dava cara de peça de
  loja.
- **fundo transparente**, e não a cor da marca do app. O site tem tema claro e
  escuro; qualquer fundo chapado erra num dos dois. Transparente, as telas
  pousam no papel no claro e na tinta no escuro.
- **sem moldura de aparelho.** Fica o canto arredondado da própria tela e uma
  sombra, que é o que diz que uma está na frente da outra. Essa é a única
  sombra do site, e aqui ela é profundidade de verdade, não enfeite.

As telas sangram pela borda de baixo do quadro, como na capa. É o mesmo que o
retrato da abertura faz, então não é gesto novo.

Uso:  python3 scripts/compor-figura.py [slug ...]   (roda da raiz do projeto)
      sem argumento, monta todas as de COMPOSICOES

Depende de Pillow.  pip install pillow
"""
import sys
from hashlib import sha256
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

RAIZ = Path(__file__).resolve().parent.parent
ORIGENS = [RAIZ / "assets" / "paineis", RAIZ / "public" / "shots"]
DESTINO = RAIZ / "public" / "shots"


def achar(nome: str) -> Path:
    for pasta in ORIGENS:
        if (pasta / nome).exists():
            return pasta / nome
    raise SystemExit(f"origem não encontrada: {nome}")

# 2080 é 2x a largura do `shell` (1040px em CSS), para a figura sair nítida
# num monitor retina. A altura é menor que 16:9 porque as telas sangram pela
# borda de baixo: o quadro só precisa ir até onde ainda há o que mostrar, e
# cada pixel a mais é vão transparente na página.
QUADRO = (2080, 980)

def arredondar(tela: Image.Image, raio: int) -> Image.Image:
    """Recorta os cantos da tela, que numa captura crua vêm quadrados."""
    mascara = Image.new("L", tela.size, 0)
    ImageDraw.Draw(mascara).rounded_rectangle([(0, 0), (tela.size[0] - 1, tela.size[1] - 1)], raio, fill=255)
    fora = tela.convert("RGBA")
    fora.putalpha(mascara)
    return fora


def com_sombra(quadro: Image.Image, tela: Image.Image, posicao: tuple[int, int], forca: int) -> None:
    """Cola a tela no quadro, com uma sombra difusa por baixo.

    A sombra usa o canal alfa da própria tela, então ela segue o canto
    arredondado em vez de ser um retângulo por trás.
    """
    desfoque = forca
    folga = desfoque * 3
    sombra = Image.new("RGBA", (tela.size[0] + folga * 2, tela.size[1] + folga * 2), (0, 0, 0, 0))
    silhueta = Image.new("RGBA", tela.size, (0, 0, 0, 90))
    silhueta.putalpha(tela.getchannel("A").point(lambda v: v * 90 // 255))
    sombra.paste(silhueta, (folga, folga + desfoque), silhueta)
    sombra = sombra.filter(ImageFilter.GaussianBlur(desfoque))

    quadro.alpha_composite(sombra, (posicao[0] - folga, posicao[1] - folga))
    quadro.alpha_composite(tela, posicao)


# slug -> lista de telas, de trás para a frente.
#   arquivo, quanto cortar do topo (px da origem), largura no quadro,
#   canto superior esquerdo, força da sombra, raio do canto
#
# O raio é dado em pixels do quadro porque ele não é proporcional: tela de
# iPhone tem canto muito arredondado, iPad menos, e janela de navegador quase
# nada. Usar um raio proporcional deixava o painel do Product Radar com canto
# de telefone.
#
# O corte do topo tira a barra de status: relógio falso das 09:41, ilha
# dinâmica e bateria. É o que denuncia "print de celular", e some de graça
# porque o canto arredondado é aplicado depois do corte.
#
# A tela grande de cada quadro é a que prova o argumento e precisa ser legível;
# a pequena entra como contexto e diz que o app tem mais de uma tela. Foi assim
# que o widget do §03 e a chave do §06 couberam na página sem roubar espaço do
# que já estava lá.
COMPOSICOES = {
    "bus-times": [
        ("tfi-raw-widgets.png", 185, 780, (1300, 110), 26, 70),
        ("tfi-raw-stop.png", 185, 920, (0, 40), 34, 82),
    ],
    # Tablet deitado na frente e telefone em pé atrás: os dois formatos num
    # quadro só, que é o que o app é.
    "scoreboard": [
        ("placar-chave-tela.webp", 45, 620, (1450, 0), 26, 56),
        ("placar-ipad-deitado.jpg", 90, 1340, (0, 70), 34, 40),
    ],
    "lista-virtual": [
        ("lista-offline-tela.webp", 45, 700, (1360, 60), 26, 62),
        ("lista-tela-crua.webp", 50, 900, (0, 40), 34, 46),
    ],
    # Uma tela só, e de propósito. Tentei duas, como nos outros, e dois painéis
    # escuros e densos sobrepostos viram borrão: nenhum dos dois se lê e o
    # quadro não diz nada. Os outros três funcionam com duas porque a segunda
    # tela é um telefone, que é estreito e recorta bem contra a primeira.
    #
    # A largura no quadro é a mesma da origem, 1600px, então não há ampliação.
    "product-radar": [
        ("radar-ranking-1600.webp", 0, 1600, (240, 60), 34, 14),
    ],
}


def montar(slug: str, telas: list) -> Path:
    quadro = Image.new("RGBA", QUADRO, (0, 0, 0, 0))

    for arquivo, corte_topo, largura, posicao, forca, raio in telas:
        original = Image.open(achar(arquivo)).convert("RGBA")
        if corte_topo:
            original = original.crop((0, corte_topo, original.size[0], original.size[1]))
        escala = largura / original.size[0]
        altura = round(original.size[1] * escala)
        tela = original.resize((largura, altura), Image.LANCZOS)
        tela = arredondar(tela, raio)
        com_sombra(quadro, tela, posicao, forca)

    # O quadro corta as telas por baixo, como na capa. O que passa da borda
    # simplesmente não é colado.
    temporario = DESTINO / f".{slug}-comp.tmp.webp"
    quadro.save(temporario, "WEBP", quality=90, method=6)
    destino = DESTINO / f"{slug}-comp.{sha256(temporario.read_bytes()).hexdigest()[:8]}.webp"
    temporario.replace(destino)
    return destino


def main() -> None:
    pedidos = sys.argv[1:] or list(COMPOSICOES)
    for slug in pedidos:
        if slug not in COMPOSICOES:
            raise SystemExit(f"sem composição para {slug!r}; tenho {', '.join(COMPOSICOES)}")
        for antigo in DESTINO.glob(f"{slug}-comp.*.webp"):
            antigo.unlink()
        destino = montar(slug, COMPOSICOES[slug])
        largura, altura = Image.open(destino).size
        peso = destino.stat().st_size // 1024
        print(f"{destino.name}  {largura}×{altura}  {peso} KB")


if __name__ == "__main__":
    main()
