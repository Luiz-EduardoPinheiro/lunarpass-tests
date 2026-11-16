# Massa de teste

A suíte é paralela (`fullyParallel: true`) e o storefront lê o mesmo catálogo que o Mission Control grava. Cada teste que depende de uma missão usa um ID que nenhum outro teste usa.

## Funções que existem

Em `playwright/support/db.ts`, com Kysely e `CamelCasePlugin`:

| Função | O que faz |
|---|---|
| `clearMission(mission)` | Apaga reserva, ticket e a missão, nessa ordem |
| `clearAndInsertMission(mission)` | `clearMission` e em seguida `insertMission` |
| `insertMission(mission)` | Insere a missão |
| `deleteMission(id)` | Apaga a missão pelo id |
| `deleteReservation(missionId)` | Apaga reservas da missão |
| `deleteTicket(missionId)` | Apaga tickets da missão |

A arquitetura cita `cleanMission` e `cleanAndInsertMission`. Esses nomes não existem no código. Importe `clearMission` e `clearAndInsertMission`. Não renomeie.

Não altere host, porta, usuário, senha, SSL nem o `Pool`.

## Tipo `Mission`

```ts
export interface Mission {
    id: string,
    rocket: string,
    baseId: string,
    departureDate: string,
    returnDate: string,
    price: number
}
```

`departureDate` e `returnDate` estão em `AAAA-MM-DD`. `formatDate` em `playwright/support/helpers.ts` produz o texto da tela, no formato `7 de jan. de 2027`.

IDs válidos já usados: `LP-0827A` e `LP-0827B`. Os exemplos da arquitetura (`LP-0128A`, `LP-3001A`) têm a mesma forma: `LP-`, quatro dígitos, uma letra. A mensagem de ID inválido já assertada é `Use o formato LP-0000`.

Antes de escolher um ID, procure `LP-` em `playwright/`. Não reutilize.

`baseId` já gravado nos specs: `aurora` e `selene`. `rocket` já usado: `Starship`. Outro `baseId` só depois de ver o valor da option na tela. `docs/storefront.md` lista Alpha, Orion, Aurora e Selene; isso não autoriza inventar o `value` do select.

Preço nos specs: número com centavos (`1284.99`), preenchido com `toString()` dentro de `submit`.

## Como os specs preparam o estado

- Cadastro novo pela UI (`Deve realizar o cadastro com sucesso de uma missão`): `clearMission` e depois `submit`. A tela cria a missão.
- Missão que já precisa existir (`Não deve realizar o cadastro de missão com o nome já existente`): `clearAndInsertMission` e depois a ação na tela.
- ID fora do formato: `faker.string.alphanumeric` de 5 caracteres, como em `register.spec.ts`. Não use `faker` para missão válida. Não crie módulo de factory. A arquitetura deixa factory para uma evolução que não está priorizada.
- Login e home não semeiam banco.

Não há `test.afterEach` na suíte. A limpeza implementada é a limpeza anterior (`clearMission` / `clearAndInsertMission`). Não acrescente `afterEach` por conta própria. Ver `references/duvidas.md`.

Na descoberta de tela, a massa criada só para olhar a UI é removida com `clearMission` antes de encerrar. Isso não vira regra nova dos specs.

## Storefront

Asserção em cima da missão daquele teste, localizada por um gancho visto na tela. Proibido assertar contagem total de missões ou posição fixa na lista: o catálogo é compartilhado.

## O que o banco ainda não faz

`Reservation` e `Ticket` em `types.ts` só declaram `missionId`. Só existem deletes. Se o **Dado** exigir reserva ou ticket já gravado, pare e pergunte. Não crie `insertReservation` nem `insertTicket` sem o usuário confirmar as colunas.

Não altere dados que o teste não criou. O usuário `buzz@lunarpass.dev` é o usuário já usado nos specs de login; não o apague e não o recadastre.
