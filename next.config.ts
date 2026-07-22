import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Todas as rotas vivem sob /[locale]. A raiz manda para o inglês, que é o
    // idioma principal do site (mercado irlandês).
    redirects: async () => [{ source: "/", destination: "/en", permanent: false }],
};

export default nextConfig;
