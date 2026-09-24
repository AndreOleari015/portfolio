# Lista Virtual: de onde vem cada número

Todo número da landing precisa estar aqui, com fonte e data. O texto mora em
`content/lista-virtual.ts`; este arquivo diz de onde ele saiu e como conferir de novo.

## Planos e preços

Produtos e limites: Remote Config do app, parâmetro `screens`, condição "Lista Virtual 3.0.0"
(iOS e Android). Preços: seção "Compras dentro do app" da página pública da App Store. O app não tem
preço no código: ele mostra o `priceString` que a loja devolve.

| Plano | ID na loja | Tipo | Página promete | App Store BR | App Store US |
|---|---|---|---|---|---|
| Grátis | · | · | 1 evento, até 50 convidados | R$ 0 | $0 |
| 1 Evento | `one_shot_event` | pagamento único | 2 dias de Premium | R$ 4,90 | $0.99 |
| Semana da Festa | `event_week` | pagamento único | 7 dias de Premium | R$ 14,90 | $2.99 |
| Semanal | `org.name.roc.weekly` | assinatura | renova por semana | R$ 14,90 | $2.99 |
| Anual | `subscription_annual` | assinatura | renova por ano | R$ 129,90 | $19.99 |

Conferido em 24/09/2026.

- **Duração dos passes**: o Remote Config concede 3 e 8 dias (`duration_days`). A página promete 2 e 7
  por decisão do dono: o dia extra é folga para o passe não acabar à meia-noite.
- **Limites do grátis**: `screens.free.event_limit = 1` e `screens.free.guest_limit = 50` (convidados
  mais acompanhantes).
- **Contas derivadas**: Anual a R$ 129,90 dá R$ 10,83 por mês; 52 semanais somam R$ 774,80, então o
  Anual sai 83% mais barato. Em dólar: $1.67 por mês e 87% mais barato que 52 semanais.
- **Selos**: "Recomendado" na Semana da Festa é recomendação, não dado de venda. "Mais econômico" no
  Anual é a conta acima. "Mais popular" não pode: não há dado de venda por plano.
- **Não entram**: Mensal (R$ 14,90) e Vitalícia (R$ 119,90). A loja ainda lista, mas são legado e não
  estão no Remote Config.

## O que é grátis e o que é Premium

Os bloqueios estão no app (caminhos relativos ao repositório `expo-listavirtual`):

| Recurso | Grátis | Premium | Onde o app bloqueia |
|---|---|---|---|
| Eventos | 1 | ilimitados | `src/app/(home)/index.tsx` |
| Convidados por evento | até 50 | ilimitados | `src/app/(home)/view-guests.tsx` |
| Convites pelo WhatsApp e e-mail com confirmação | sim | sim | livre |
| QR individual, leitor e check-in manual | sim | sim | livre |
| Recepcionistas e código de acesso | não | sim | `src/app/(home)/settings.tsx` |
| Modo grupos, QR de grupo e VIP | não | sim | `src/app/(home)/manage-event.tsx` |
| Relatório PDF e Excel, com nome e logo do cliente | não | sim | `view-guests.tsx`, `manage-event.tsx` |
| Importar planilha | não | sim | `src/components/modals/options-modal.tsx` |
| Anúncios | com | sem | `src/utils/premium.ts` |

## Avaliações

A nota do hero soma as duas lojas no mundo todo, igual nas páginas em português e em inglês:
**4,5 com 203 avaliações**.

| Loja | Avaliações | Média | Fonte (24/09/2026) |
|---|---:|---:|---|
| App Store, 179 países somados | 168 | 4,405 | `itunes.apple.com/lookup?id=6738919953&country=<país>`, uma consulta por país. Brasil 145 (4,455), México 11, EUA 3, outros 7 países com 1 ou 2 |
| Google Play | 35 | 4,75 | página pública do app (a loja exibe 4,8) |
| **Total** | **203** | **4,464** | média ponderada pelo número de avaliações; a página mostra 4,5 |

As estrelas preenchem na proporção da nota mostrada. A nota e o total também estão na imagem de
compartilhamento: mudou aqui, gerar de novo (ver [seo.md](seo.md#imagem-de-compartilhamento)).

- **Avaliação citada**: 5 estrelas, "App excelente para Gestão de Presença!!!", Luiza Bittner,
  13/02/2025, App Store Brasil (feed `customerreviews` da loja). Fica na seção "para quem". No inglês
  vai traduzida e marcada como tradução.
- **Avaliações escritas no mundo**: só 3, todas no Brasil, em 25 lojas conferidas em 24/09/2026. A da
  Luiza é a única positiva.
- **Depoimentos do WhatsApp**: mensagens reais que clientes mandaram ao dono. Cada um entra com o texto
  original (trecho curto, sem mudar o sentido), o nome e o papel como a pessoa autorizou, a data da
  mensagem e a data da autorização. Alternam no hero junto com a avaliação da Luiza. Nenhum ainda
  registrado.
- **Google Play**: uma única avaliação escrita (5 estrelas, 21/06/2026, "estou começando a conhecer o app
  agora"), fraca para citar. Conferido em 24/09/2026.

## Números de uso (alternam no hero)

Medidos em 14/09/2026 no Firestore do projeto `roc1-916fb`, somando os dois bancos: o antigo
`(default)`, de antes da migração, e o `lista-virtual-db`, o atual. Só contagem, sem ler dado de
ninguém.

| | `(default)` | `lista-virtual-db` | total | página diz |
|---|---:|---:|---:|---|
| Eventos | 3.909 | 467 | 4.376 | +4 mil eventos criados desde 2025 |
| Convidados | 21.708 | 18.263 | 39.971 | +39 mil convidados cadastrados |
| Check-ins (`markedPresence == true`) | 4.604 | 8.802 | 13.406 | +13 mil check-ins na portaria |

- Fonte: `job-tailor/evidencias/lista-virtual/MEDICOES.md` e os prints do console
  (`firestore-eventos.png`, `firestore-convidados.png`, `firestore-checkin.png`, que mostram os números
  do banco atual). Os do banco antigo foram medidos por agregação na API, na mesma data.
- A página arredonda para baixo ("mais de"), então os números continuam verdadeiros enquanto crescem.
  A data da medição fica só aqui; a página não mostra (pedido do dono em 24/09).
- "Eventos criados" é literal: o banco antigo tem muitos eventos sem convidado (só 1.760 dos 3.909 têm
  lista). Por isso a frase diz "criados", e não "organizados".
- Para atualizar: Console › Firestore › cada banco › Criador de consultas › contar `/events`, `/guests` e
  `/guests` com `markedPresence == true`.

## Outros números

- **11 idiomas**: `src/locales/*.json` do app, 11 arquivos.

## Como conferir de novo

```sh
# nota e total da loja brasileira
curl -s "https://itunes.apple.com/lookup?id=6738919953&country=br" | python3 -m json.tool | grep -E "averageUserRating\"|userRatingCount\""

# produtos, durações e limites do grátis
firebase remoteconfig:get --project roc1-916fb -o /tmp/rc.json
```

Preços: página pública `apps.apple.com/br/app/id6738919953` (e `/us/`), seção "Compras dentro do app".
Mudou algum número: atualizar `content/lista-virtual.ts`, a tabela acima e a data.
