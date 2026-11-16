# Diagnóstico de falhas

Use ao rodar um teste recém-escrito e no modo `corrigir`.

## Onde olhar

1. O erro no terminal: linha, locator, esperado e recebido.
2. `test-results/`, no `error-context.md` e no screenshot da falha. O config pede `screenshot: 'only-on-failure'` e `trace: 'on-first-retry'`.
3. O relatório HTML, se precisar: `npx playwright show-report`.
4. Se a causa ainda não estiver clara, reproduza o caminho com o Playwright MCP.

## Classifique antes de editar

| Causa | Sinais | O que fazer |
|---|---|---|
| **Locator** | Não encontra, ou encontra mais de um; papel ou nome mudou | Ajuste o locator no Page Object, na ordem `getByRole` → `getByLabel` → `getByPlaceholder` → `getByTestId` |
| **Sincronização** | Passa e falha sem mudança de dado; a ação ocorre antes da tela | Espere o estado visível que o spec vizinho já espera. Sem `waitForTimeout`. Não invente timeout em arquivo que não tem |
| **Dados** | ID repetido, registro ausente, sobra de outra execução | Ajuste `clearMission` ou `clearAndInsertMission` e o ID. Não crie `afterEach` neste passo |
| **Ambiente** | Aplicação fora; banco inacessível (`getaddrinfo ENOTFOUND` ou falha de autenticação no host do `Pool`); navegador ausente (`Executable doesn't exist`); erro de ExecutionPolicy no PowerShell do Windows (`npx.ps1 não pode ser carregado`) | Não altere teste, connection string nem config. Entregue "não executado" com a mensagem. No Windows PowerShell com bloqueio de script, use `npx.cmd`. Navegador ausente: `npx playwright install chromium`, só com autorização do usuário |
| **Produto** | A tela mostra, de forma estável, outro resultado que não o **Então** | Não mude asserção, texto esperado nem título. Reporte esperado e observado |

Conflito de chave única ao repetir o mesmo teste em paralelo não é instabilidade: os workers disputam o mesmo ID. Confirme instabilidade com uma repetição em série:

```bash
npx playwright test playwright/e2e/<modulo>/<arquivo>.spec.ts --project=<modulo> --repeat-each=5 --workers=1
```

Esse comando é só diagnóstico. A entrega normal roda uma vez, sem `--repeat-each`.

## Correção

- Uma causa por vez. Rode de novo o mesmo arquivo e o mesmo `--project`.
- Não altere asserção, valor esperado ou título para obter verde.
- Não use `test.skip`, `test.only` nem comentário para esconder falha.
- Não mude `retries` nem `workers` em `playwright.config.ts`. No CI o config já define `retries: 2` e `workers: 1`; fora do CI, `retries: 0`.
- Se a causa não fechar, entregue as evidências e as hipóteses, sem editar.
