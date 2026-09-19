/**
 * `01 / 04`. O contador que dá começo, meio e fim ao documento.
 *
 * Ele aparece em três níveis encaixados, sempre com a mesma forma: a seção
 * dentro das quatro, o projeto dentro dos cinco, e o § dentro dos vinte e um.
 * Quem chega em `03 / 04` sabe onde está sem ter rolado a barra de volta,
 * e é isso que uma página longa precisa ter e não tinha.
 *
 * O número da posição vai em acento e o total em cinza: é a diferença de cor
 * que faz os dois números não serem lidos como um só.
 */
export const Counter = ({ at, of }: { at: number; of: number }) => (
    <span className="num">
        <span className="text-accent">{String(at).padStart(2, "0")}</span>
        <span className="text-faint"> / {String(of).padStart(2, "0")}</span>
    </span>
);
