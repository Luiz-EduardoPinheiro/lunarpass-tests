# Exemplo: cadastro de missão (suíte real)

Calibragem com o Mission Control como ele está hoje. Se este texto divergir dos arquivos, os arquivos mandam. Não use este exemplo para introduzir limpeza posterior, factory ou locator novo.

## 1. O cenário que a suíte já cobre

**Funcionalidade:** cadastro de missão no Mission Control

**Contexto:** operador autenticado

**Cenário:** Deve realizar o cadastro com sucesso de uma missão
**Quando** o operador grava uma missão nova
**Então** o sistema informa que a missão foi adicionada ao catálogo e está disponível para reservas

O título já começa com `Deve`, então o `test` usa esse texto.

## 2. Onde isso mora

| Peça | Arquivo |
|---|---|
| Spec | `playwright/e2e/mission-control/register.spec.ts` |
| Formulário | `playwright/support/pages/mission-control/register.page.ts` |
| Atalho "Nova missão" | `playwright/support/pages/mission-control/dash.page.ts` |
| Toast | `playwright/support/pages/shared/toast.ts` |
| Massa | `clearMission` em `playwright/support/db.ts` |
| Project | `mission-control` |

O `beforeEach` do arquivo abre `http://localhost:3000/mission-control/login`, entra com o usuário já escrito nesse spec e espera `app.mission.navbar.logout`. A senha não se copia para esta skill: leia o spec.

## 3. A massa e o teste

O teste declara a missão, limpa esse ID e só então usa a tela. Não há `afterEach`.

```ts
test('Deve realizar o cadastro com sucesso de uma missão', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-0827A',
    rocket: 'Starship',
    baseId: 'aurora',
    departureDate: '2027-01-07',
    returnDate: '2027-01-14',
    price: 1284.99
  }
  await clearMission(mission)
  await app.mission.dashPage.abrirTelacadastro.click()
  await expect(app.mission.registerPage.tittle).toBeVisible({ timeout: 10_000 })
  await app.mission.registerPage.submit(mission)
  await expect(app.toast.message).toContainText('A nova missão foi adicionada ao catálogo e já está disponível para reservas.')
})
```

`LP-0827A` já está em uso. Outro cenário precisa de outro ID.

## 4. O que não copiar como se fosse regra nova

- `submit` contém um `expect` da data de retorno formatada. Método novo não ganha `expect`.
- A propriedade se chama `tittle`. Não corrija.
- O toast usa `toContainText`. Um alerta que o spec vizinho verifica com `toHaveText` continua com `toHaveText`.
- O `timeout: 10_000` pertence a este arquivo. Não leve o número para um spec que não o tem.
- `abrirTelacadastro` é locator exposto; o spec chama `.click()`. Não crie um método em volta só neste fluxo, a menos que esteja estendendo `DashPage` para uma ação que o cenário novo peça e o vizinho ainda não tenha.

## 5. Como rodar este arquivo

```bash
npx playwright test playwright/e2e/mission-control/register.spec.ts --project=mission-control
```

*(No Windows PowerShell, use `npx.cmd` se houver restrição de execução de scripts `.ps1`).*
