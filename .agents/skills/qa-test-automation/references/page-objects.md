# Page Objects

Page Object é a tela ou o componente que o usuário usa. O spec chama métodos; não repete locator.

## O que já existe

| Classe | Arquivo | No `app` |
|---|---|---|
| `LoginPage` | `playwright/support/pages/mission-control/login.page.ts` | `app.mission.loginPage` |
| `DashPage` | `playwright/support/pages/mission-control/dash.page.ts` | `app.mission.dashPage` |
| `RegisterPage` | `playwright/support/pages/mission-control/register.page.ts` | `app.mission.registerPage` |
| `Navbar` | `playwright/support/pages/mission-control/navbar.ts` | `app.mission.navbar` |
| `HomePage` | `playwright/support/pages/storefront/home.page.ts` | `app.store.homePage` |
| `Toast` | `playwright/support/pages/shared/toast.ts` | `app.toast` |

Página de rota: arquivo `<nome>.page.ts` e classe `<Nome>Page`. Componente sem rota: arquivo sem o sufixo `.page`, como `navbar.ts` e `toast.ts`.

`RegisterPage` expõe a propriedade `tittle`. É o nome que os specs usam. Não renomeie.

## Como estes arquivos são escritos

- Classe concreta. Nenhuma estende outra.
- Construtor recebe `page: Page`.
- Locator reutilizado ou assertado no spec é propriedade `readonly`, criada no construtor.
- Campo usado só dentro da ação fica no método. É o que `realizarLogin` e `submit` fazem com `getByRole`, `getByLabel` e `getByPlaceholder`.
- Elemento que depende de um dado vira método que devolve `Locator`. A suíte ainda não tem esse caso; se precisar, confirme o atributo na tela antes.
- Ação com nome de ação. Nos arquivos atuais as ações estão em português: `acessarLogin`, `realizarLogin`, `acessar`. A exceção existente é `RegisterPage.submit`. Ao completar um arquivo, use o idioma desse arquivo. Página nova no mesmo módulo: português, no estilo do vizinho. Não renomeie `submit`.
- `goto` com a URL absoluta `http://localhost:3000` mais o caminho visto na descoberta. `LoginPage` e `HomePage` são o modelo. Não use só o caminho relativo.
- Sem credencial e sem missão de teste dentro do Page Object. E-mail e senha ficam no spec, como em `login.spec.ts` e `register.spec.ts`.
- Sem `waitForTimeout`.

`LoginPage.acessarLogin` e `RegisterPage.submit` já contêm `expect`. Os outros Page Objects não contêm. Não retire esses `expect` e não acrescente `expect` em método novo. O resultado do **Então** fica no spec.

`submit` preenche a partida e espera `getByTestId('mission-form-return-date')` com `formatDate(mission.returnDate)`. Os cadastros existentes usam retorno sete dias depois da partida. Ao chamar `submit`, `returnDate` tem de ser a data que a tela mostra. Não altere esse `expect`.

Import de tipo no Page Object, como em `register.page.ts`: `../../types` e `../../helpers`, sem sufixo `.ts`. Specs usam sufixo `.ts`. Não unifique.

## Reutilizar ou criar

| Situação | Decisão |
|---|---|
| A tela já tem Page Object | Complete sem mudar o comportamento dos métodos existentes |
| O trecho já é `Navbar` ou `Toast` | Use `app.mission.navbar` ou `app.toast` |
| Tela nova de um módulo existente | Arquivo na pasta do módulo e registro no grupo correspondente de `createApp` |
| Componente usado só por um módulo | Pasta desse módulo, não `shared/` |
| Componente já usado por mission-control e storefront | `playwright/support/pages/shared/`, no mesmo nível de `toast` dentro de `createApp` |
| Módulo que ainda não existe | Siga a seção "Como adicionar um novo módulo" de `docs/arquitetura.md`: pasta de páginas, grupo em `createApp`, pasta em `playwright/e2e/<modulo>/`, project novo. Não altere `baseURL`, `retries` nem `workers`. Se o cenário cabe em `mission-control` ou `storefront`, não crie módulo |

Ao registrar, importe no topo de `playwright/support/index.ts` e instancie dentro de `createApp`. O tipo `App` já é `ReturnType<typeof createApp>`. Não crie outro fixture.

Indentação, aspas e ponto-e-vírgula: copie o arquivo que você está editando. Arquivo novo: copie o Page Object mais próximo do mesmo módulo. O repositório mistura 2 e 4 espaços; não padronize o resto.
