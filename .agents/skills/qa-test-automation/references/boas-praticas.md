# Specs

## Arquivo

- Pasta: `playwright/e2e/mission-control/` ou `playwright/e2e/storefront/`.
- Nome: `<funcionalidade>.spec.ts`, no padrão de `login.spec.ts`, `register.spec.ts` e `home.spec.ts`.
- Primeira linha, com sufixo `.ts`, como nos três specs:

```ts
import { test, expect } from '../../support/index.ts'
```

Não importe `test` de `@playwright/test` no spec. O `{ app }` vem de `playwright/support/index.ts`.

Outros imports, só se o cenário usar, no estilo de `register.spec.ts`:

```ts
import { Mission } from '../../support/types.ts'
import { clearAndInsertMission, clearMission } from '../../support/db.ts'
```

`home.spec.ts` também recebe `page` quando a asserção é do documento (`toHaveTitle`). Não peça `page` se o locator está no Page Object.

## Forma

A arquitetura chama a ordem de Arrange-Act-Assert. Os specs não marcam isso com comentário. Não adicione `// Arrange`, `// Act` nem `// Assert`.

Ordem dentro do teste:

1. Dados daquele teste (objeto `Mission` e `clearMission` ou `clearAndInsertMission`, quando houver).
2. Ações do **Quando**, pelos métodos de `app.mission`, `app.store` ou `app.toast`.
3. Asserções do **Então** e de cada **E**.

`test.beforeEach` fica para o que é comum ao arquivo, como o login de `register.spec.ts`. Expectativa que só um cenário tem fica dentro desse `test`, não no `beforeEach`. O `beforeEach` de `register.spec.ts` já espera o logout visível com `timeout: 20_000`; não duplique esse login dentro de cada teste do mesmo arquivo.

Não há `test.describe`. Não introduza.

## Asserções

Uma asserção por resultado esperado do cenário. Nada além disso.

| Situação já existente | Asserção |
|---|---|
| Alerta com texto inteiro conhecido | `toHaveText` em `loginPage.alert` ou `registerPage.alert` |
| Toast de missão cadastrada | `toContainText` em `app.toast.message` |
| Sessão autenticada | `toBeVisible` em `app.mission.navbar.logout` |
| Título da aba na home | `toHaveTitle` no `page` |

Não troque `toHaveText` por `toContainText` (nem o contrário) num elemento que o spec vizinho já verifica. Texto que o cenário não fixou e que veio da tela entra no resumo como texto observado.

`toHaveCount` não é usado. No storefront, não assertar quantidade total de missões nem índice na lista.

Timeout explícito: só os já presentes no arquivo que você edita (`10_000` no título do cadastro e no retorno à listagem, `20_000` no logout do `beforeEach` de `register.spec.ts`). Arquivo novo não ganha timeout por imitação de outro arquivo.

## Isolamento

- Nenhum teste depende de outro nem da ordem.
- Nenhum teste asserta missão que ele não semeou ou não cadastrou.
- Não altere o usuário de login já usado pela suíte.

## Idioma

Título, massa visível e texto esperado em português, como a tela. Nome de classe em inglês. Método novo de página: ver `references/page-objects.md`.

Indentação e pontuação: as do arquivo editado. `login.spec.ts` usa 4 espaços; `register.spec.ts` e `home.spec.ts` usam 2. Não reindentar o arquivo por causa do trecho novo.
