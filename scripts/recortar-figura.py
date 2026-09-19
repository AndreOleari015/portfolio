#!/usr/bin/env python3
"""
Recorta a janela de prova de dentro de um painel de divulgação.

O que denuncia um screenshot é a tela inteira do aparelho: relógio falso das
09:41, ilha dinâmica, bateria, barra de abas. E a tela inteira, num retrato de
900×2000, só cabe na página encolhida a ponto de nenhum número ser legível.

Este script recorta **a região que prova o §**, na resolução da origem. O que
sobra é grande o bastante para ler e pequeno o bastante para a linha do projeto
não ficar com um buraco do lado.

Uso:  python3 scripts/recortar-figura.py            (roda da raiz do projeto)

Depende de Pillow.  pip install pillow

As caixas estão em RECORTES, em pixels da imagem de origem, e cada uma traz
escrito o que ela prova. Mudar a janela é mudar um número aqui e rodar de novo;
o nome de saída carrega `sha256[:8]` do conteúdo, então trocar a imagem sem o
hash acompanhar é o bug de cache de 4 horas que já aconteceu uma vez.

**Onde ficam as origens.** `assets/paineis/` está fora do git, junto com os
originais do ensaio fotográfico, porque dá para gerar de novo. `public/shots/`
tem as telas já extraídas pelo `extrair-tela.py`. O script procura nos dois.

**Ordem de preferência de origem, do melhor para o pior.** Nitidez é pixel real
da origem dividido pelo que a tela retina pede (largura em CSS vezes dois), e
abaixo de 0,5x o navegador inventa mais da metade do que aparece:

1. captura crua do simulador, em
   `<projeto>/fastlane/shared/screenshots/capture/raw-*` (1320×2868)
2. captura crua de iPad, em `<projeto>/fastlane/ios/fastlane/screenshots/*`
   (2752×2064; só o placar tem, os outros já vêm com moldura)
3. painel antigo de loja, um aparelho em 720px, o que deixa ~520px de tela
4. painel quadrado de divulgação, dois aparelhos em 1080px, ~330px de tela

Os três projetos ficam em `/Volumes/DiscoD/Projects/rn-projects/`: `expo-tfi`,
`expo-placar` e `expo-listavirtual`.

**Onde a janela para.** Sempre no vão entre dois itens da lista, nunca no meio
de um. Uma lista cortada pela borda de baixo lê como lista que continua, o que
é verdade; uma fatia de 10px com o topo das letras aparecendo lê como erro.

**Altura.** As três janelas ficam entre 1,2:1 e 1,5:1, e isso não é gosto: a
coluna de texto do projeto tem ~320px de altura, e uma figura mais alta do que
isso deixa vão embaixo do texto. Recortar uma linha a mais da lista custa 60px
de vão; é por isso que cada janela para na linha em que o argumento já está
feito.

`escala` existe porque os painéis quadrados novos empacotam dois telefones em
1080px, o que deixa cada tela com uns 330px de largura. Ampliar por Lanczos
antes de gravar não inventa detalhe, mas o navegador ampliaria de qualquer
jeito e com um filtro pior. É o mesmo que o `extrair-tela.py` já fazia.
"""
from hashlib import sha256
from pathlib import Path

from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
ORIGENS = [RAIZ / "assets" / "paineis", RAIZ / "public" / "shots"]
DESTINO = RAIZ / "public" / "shots"

# slug -> (arquivo de origem, caixa (esq, topo, dir, base), escala, o que prova)
RECORTES = {
    # A lista de partidas de uma parada, com os dois tipos de horário: 2 min
    # com ponto verde (ao vivo) e 5h04 sem ponto (tabela). É a tese do app.
    #
    # Ela já tinha passado por aqui e saído, porque numa figura de 432px o
    # texto ficava pequeno demais e o mapa era mais bonito. Com a figura em
    # 640px ela volta legível, e aí ganha do mapa: prova e é bonita.
    #
    # Origem: `capture/raw-en-US/4-stop.png`, captura crua de 1320px.
    "bus-times": (
        "tfi-raw-stop.png",
        (0, 870, 1320, 1650),
        1,
        "o horário ao vivo e o de tabela na mesma lista, distinguidos só pelo "
        "ponto verde",
    ),
    # O placar em si. É a única origem do conjunto que já vem como captura
    # crua: sem maquete de aparelho, sem slogan, sem fundo de loja, 1600px de
    # largura. Bate literal com o resumo do projeto, "celular deitado na mesa,
    # números grandes e legíveis", e é a imagem mais forte de todo o material.
    #
    # Substituiu o recorte da chave de mata-mata, que provava melhor o §06 mas
    # eram dois cartões cinzas escritos "Waiting" num fundo creme: quase nada
    # para o olho. `PERIOD 1` e o cronômetro ancoram o §07 no lugar.
    #
    # A tela inteira do iPad não serve: ela é desenhada para ser vista em
    # tablet, tem muito branco em volta, e a 432px na página virava miniatura.
    # Apertado no bloco central, o algarismo passa de 55px para 95px.
    # Origem: a captura crua de iPad em 2752×2064, que é o `05-ipad-scoreboard`
    # do Desktop antes de ser reduzido 1,7×.
    "scoreboard": (
        "placar-ipad-deitado.jpg",
        (585, 470, 2176, 1600),
        1,
        "o placar rodando: dois números grandes, período e cronômetro",
    ),
    # A lista de convidados durante o check-in: contagem, vistos dourados,
    # 3/4 por empresa, um círculo vazio de quem não chegou.
    #
    # Origem: a tela extraída do painel de iPad, 1220px. O painel de iPhone
    # reduz a mesma tela para 860px, e o quadrado do Desktop para 330px.
    "lista-virtual": (
        "lista-tela-crua.webp",
        (0, 240, 1220, 900),
        1,
        "o check-in acontecendo: contagem, vistos e quem ainda não chegou",
    ),
    # Só a faixa de cinco cartões, não o painel inteiro. Tentei incluir a
    # tabela, onde NOTA e CONFIANÇA são colunas separadas, e o recorte de
    # 1340×735 numa figura de 704px deixou o texto com 7px: nítido e ilegível.
    # É a mesma armadilha do iPad, de novo: o que decide a legibilidade é o
    # tamanho do texto em relação à largura do recorte.
    #
    # Esta é a única figura que ainda não chega a 1,0x de nitidez, e não tem
    # como: para ser nítida numa largura em que se leia, ela precisaria de uma
    # captura em 2x, que é um print de retina do navegador. Ficou em 0,64x.
    #
    # Origem: a captura de 1600px que o próprio Product Radar guarda em
    # `apps/web/public/sobre/ranking.webp`, e não a de 1440px do Desktop.
    "product-radar": (
        "radar-ranking-1600.webp",
        (230, 165, 1570, 392),
        1,
        "as duas notas lado a lado e nunca somadas: 76/84 e 59/93 são produtos "
        "diferentes",
    ),
    # A faixa de cinco cartões tem 6,3:1. Num telefone ela cabe com 80px de
    # altura e nenhum número é legível, e esconder a prova num site que se
    # propõe a mostrar prova seria a saída errada. Dois cartões dizem a mesma
    # coisa (uma nota alta com confiança baixa ao lado de uma nota menor com
    # confiança maior) e cabem legíveis em 500px.
    "product-radar-narrow": (
        "radar-ranking-1600.webp",
        (230, 165, 900, 390),
        1,
        "os dois primeiros cartões, para a mesma leitura caber num telefone",
    ),
}


def achar(nome: str) -> Path:
    for pasta in ORIGENS:
        caminho = pasta / nome
        if caminho.exists():
            return caminho
    raise SystemExit(
        f"origem não encontrada: {nome}\n"
        f"procurei em: {', '.join(str(p) for p in ORIGENS)}"
    )


def recortar(slug: str, origem: str, caixa: tuple[int, int, int, int], escala: int) -> Path:
    janela = Image.open(achar(origem)).crop(caixa)
    if escala != 1:
        largura, altura = janela.size
        janela = janela.resize((largura * escala, altura * escala), Image.LANCZOS)

    # Grava uma vez para medir o hash do conteúdo, e só então dá o nome final.
    temporario = DESTINO / f".{slug}-fig.tmp.webp"
    janela.save(temporario, "WEBP", quality=88, method=6)
    conteudo = temporario.read_bytes()

    destino = DESTINO / f"{slug}-fig.{sha256(conteudo).hexdigest()[:8]}.webp"
    temporario.replace(destino)
    return destino


def main() -> None:
    for slug, (origem, caixa, escala, prova) in RECORTES.items():
        # Apaga versões anteriores: o hash muda a cada ajuste e elas se acumulam.
        for antigo in DESTINO.glob(f"{slug}-fig.*.webp"):
            antigo.unlink()

        destino = recortar(slug, origem, caixa, escala)
        largura, altura = Image.open(destino).size
        print(f"{destino.name}  {largura}×{altura}  ({largura / altura:.2f}:1)")
        print(f"    prova: {prova}")


if __name__ == "__main__":
    main()
