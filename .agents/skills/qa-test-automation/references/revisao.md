# Revisão antes de entregar

Corrija o item que falhar. Só então entregue.

## Cenário

- [ ] Um `test` por cenário. Em Esquema do Cenário, um `test` por linha, sem `test.each`.
- [ ] O título é o nome do cenário quando ele já começa com `Deve` ou `Não deve`. Caso contrário, o título foi confirmado com o usuário.
- [ ] Há uma asserção para cada **Então** e cada **E**, e nenhuma a mais.
- [ ] Nenhum passo ou regra foi inventado. Item "a investigar" ficou de fora.
- [ ] Texto visto na tela e ausente na especificação está no resumo.

## Lunar Pass

- [ ] Spec em `playwright/e2e/<modulo>/`, importando `{ test, expect }` de `../../support/index.ts`.
- [ ] Page Object novo em `playwright/support/pages/<modulo>/` (ou `shared/` só se os dois módulos usam), registrado em `createApp`.
- [ ] Método novo sem `expect`. Os `expect` de `acessarLogin` e `submit` permanecem.
- [ ] `goto` novo é URL absoluta em `http://localhost:3000`, no estilo do módulo. `baseURL` não foi editado.
- [ ] Nenhum arquivo fora do pedido foi refatorado. `tittle` e os nomes `clear*` permanecem.
- [ ] Config, connection string, dependências, `.env`, `storageState`, factory e `db.destroy()` não foram alterados.

## Locators e espera

- [ ] Ordem `getByRole` → `getByLabel` → `getByPlaceholder` → `getByTestId`.
- [ ] Nenhum locator saiu só de um exemplo de `docs/aderencia.md`.
- [ ] Sem XPath, `/..`, classe CSS ou `waitForTimeout`.
- [ ] Timeout numérico só onde o arquivo editado já usava.

## Dados

- [ ] ID de missão novo não aparece em outro teste e segue a forma `LP-` + quatro dígitos + uma letra.
- [ ] Preparação com `clearMission` ou `clearAndInsertMission`, não com `cleanMission`.
- [ ] Nenhum `test.afterEach` foi introduzido.
- [ ] Storefront não asserta contagem total nem posição na lista.
- [ ] Não foi criada função de insert para reserva ou ticket.

## Execução

- [ ] Rodou `npx playwright test <arquivo> --project=<modulo>` (ou `npx.cmd` no Windows PowerShell), e o resumo diz o que aconteceu.
- [ ] Falha de produto está com esperado e observado, sem asserção alterada.
- [ ] Não ficou `test.only`, `test.skip` nem asserção comentada.
- [ ] Dúvida de `references/duvidas.md` que apareceu no trabalho está no resumo, sem ter sido "resolvida" no código.
