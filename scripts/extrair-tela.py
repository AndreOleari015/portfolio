#!/usr/bin/env python3
"""
Tira a tela de dentro de um painel de App Store.

Os arquivos de `public/shots/*.webp` que vieram da loja não são screenshots: são
peças de marketing: fundo próprio por app, slogan embutido em outra tipografia e
uma maquete de aparelho, em vários casos cortada pela borda de baixo. Este script
descarta tudo isso e devolve só a tela, em retângulo reto.

Uso:  python3 scripts/extrair-tela.py <arquivo-do-painel> [mais arquivos...]
      (roda da raiz do projeto; grava em public/shots/<slug>-screen.<hash>.webp)

Depende de Pillow.  pip install pillow

Como ele acha a tela, e por que assim:

1. Cor de fundo pela moda das bordas, porque o painel tem fundo chapado.
2. Retângulo do aparelho: em fundo claro procura a MOLDURA escura, em fundo
   escuro procura a TELA clara (e depois abre pela espessura da moldura). Os dois
   sinais existem em painéis diferentes; nenhum existe nos dois.
3. Bordas da tela exigindo **14 pixels claros seguidos**. Sem essa exigência a
   varredura para na borda borrada da moldura contra o fundo e sobra um tarjão
   preto. A varredura vertical usa uma coluna fora do centro: a ilha dinâmica é
   preta e fica no meio do topo.
4. Margem para dentro, crescendo até os quatro cantos saírem claros. Os cantos da
   tela são arredondados; sem isso sobram quatro orelhinhas pretas que entregam
   que aquilo veio de uma maquete.
"""
from PIL import Image
from collections import Counter
import hashlib, io, os, re, sys

RUN = 14          # pixels claros seguidos para valer como tela
# Largura de saída. `None` mantém a resolução do recorte, que é o certo quando
# o painel de origem é grande: reduzir aqui joga fora justamente o pixel que se
# foi buscar. O 900 fixo existia de quando as origens eram painéis de 720px, em
# que a saída era ampliação de qualquer jeito.
LARGURA = None
QUALIDADE = 86


def cor_de_fundo(im):
    w, h = im.size
    px = im.load()
    c = Counter()
    for x in range(0, w, 5):
        c[px[x, 1]] += 1
        c[px[x, h - 2]] += 1
    for y in range(0, h, 5):
        c[px[1, y]] += 1
        c[px[w - 2, y]] += 1
    return c.most_common(1)[0][0]


def retangulo_do_aparelho(im):
    w, h = im.size
    g = im.convert("L")
    topo = int(h * 0.25)                      # corta o slogan
    faixa = g.crop((0, topo, w, h))
    if sum(cor_de_fundo(im)) / 3 > 170:
        mascara = faixa.point(lambda p: 255 if p < 70 else 0)   # moldura escura
        abre = 0
    else:
        mascara = faixa.point(lambda p: 255 if p > 190 else 0)  # tela clara
        abre = 19
    x0, y0, x1, y1 = mascara.getbbox()
    return (max(0, x0 - abre), max(0, y0 + topo - abre),
            min(w, x1 + abre), min(h, y1 + topo + abre))


def retangulo_da_tela(im, aparelho):
    px = im.convert("L").load()
    W, H = im.size
    x0, y0, x1, y1 = aparelho
    claro = lambda x, y: 0 <= x < W and 0 <= y < H and px[x, y] > 95

    ym = (y0 + y1) // 2
    esq = next(x for x in range(x0, x1) if all(claro(x + i, ym) for i in range(RUN)))
    dir_ = next(x for x in range(x1 - 1, x0, -1) if all(claro(x - i, ym) for i in range(RUN)))
    xq = esq + (dir_ - esq) // 4              # fora do centro por causa da ilha dinâmica
    topo = next(y for y in range(y0, y1) if all(claro(xq, y + i) for i in range(RUN)))
    base = next(y for y in range(min(y1, H) - 1, y0, -1) if all(claro(xq, y - i) for i in range(RUN)))
    return esq, topo, dir_ + 1, base + 1


def cantos_limpos(im, sonda=4):
    g = im.convert("L")
    w, h = im.size
    px = g.load()
    cantos = [(sonda, sonda), (w - 1 - sonda, sonda), (sonda, h - 1 - sonda), (w - 1 - sonda, h - 1 - sonda)]
    return min(px[x, y] for x, y in cantos) > 110


def extrair(caminho):
    im = Image.open(caminho).convert("RGB")
    l, t, r, b = retangulo_da_tela(im, retangulo_do_aparelho(im))
    largura = r - l
    for passo in range(20, 90, 2):
        margem = round(largura * passo / 1000)
        corte = im.crop((l + margem, t + margem, r - margem, b - margem - 14))
        if cantos_limpos(corte):
            break
    saida = (
        corte
        if LARGURA is None
        else corte.resize((LARGURA, round(LARGURA * corte.size[1] / corte.size[0])), Image.LANCZOS)
    )
    buf = io.BytesIO()
    saida.save(buf, "WEBP", quality=QUALIDADE, method=6)
    dados = buf.getvalue()

    slug = re.sub(r"-[^-]*$", "", os.path.basename(caminho).split(".")[0])
    nome = f"{slug}-screen.{hashlib.sha1(dados).hexdigest()[:8]}.webp"
    destino = os.path.join("public/shots", nome)
    open(destino, "wb").write(dados)
    print(f"{destino}  {saida.size[0]}x{saida.size[1]}  {len(dados) // 1024}KB  margem={margem}px")
    print("  → troque o caminho em content/dictionary.ts (nos dois idiomas)")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    for arquivo in sys.argv[1:]:
        extrair(arquivo)
