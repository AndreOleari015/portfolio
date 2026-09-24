import Image from "next/image";

/**
 * Uma tela de app dentro do molde de telefone.
 *
 * `public/molde.png` tem o miolo vago: a área da tela é transparente, então a
 * captura fica **atrás** e a moldura desenha por cima. É o que cobre os cantos
 * arredondados sem precisar de máscara e o que faz a ilha dinâmica do molde
 * cair exatamente sobre a barra de status da captura.
 *
 * As medidas abaixo saíram do canal alfa do próprio arquivo: a área vaga é
 * 899×1954 em (54, 53), num molde de 1008×2060. Em porcentagem para o
 * enquadramento acompanhar qualquer largura.
 *
 * **Sem estado.** Houve uma versão que passava três telas por dentro de um
 * molde só, com botões para escolher, e ela saiu quando as três passaram a
 * aparecer lado a lado: não há o que escolher quando está tudo à vista. Com
 * isso o componente voltou a ser de servidor, sem `useState`, sem efeito e
 * sem JavaScript no cliente.
 */
/** Exportada para o hero do Lista Virtual, que empilha três telas dentro do mesmo molde. */
export const TELA = { left: "5.357%", top: "2.573%", width: "89.187%", height: "94.854%" };

export type Tela = { src: string; label: string };

export const Phone = ({ src, alt, sizes }: { src: string; alt: string; sizes: string }) => (
    <div className="relative aspect-[1008/2060] w-full">
        {/* `overflow-hidden` e o raio são cinto e suspensório: a moldura já
            cobre os cantos, mas se a captura vier com proporção um pouco
            diferente é aqui que ela para. */}
        <div className="absolute overflow-hidden rounded-[12%/5.6%]" style={TELA}>
            <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
        </div>

        <Image
            src="/molde.png"
            alt=""
            aria-hidden
            fill
            sizes={sizes}
            className="molde pointer-events-none object-contain"
        />
    </div>
);
