# Dúvidas em aberto

Estes pontos divergem entre documento e código, ou o código não decide. Não escolha um lado editando a suíte. Se o ponto impedir o teste, pergunte. Sempre cite o item no resumo quando ele aparecer no trabalho.

1. **Nome das funções de missão.** `docs/arquitetura.md` (seções 1 e 3.3) escreve `cleanMission` e `cleanAndInsertMission`. `playwright/support/db.ts` exporta `clearMission` e `clearAndInsertMission`. Use o código. Não renomeie o documento nem as funções.

2. **`goto` absoluto e `baseURL`.** Os dois projects usam `baseURL: 'http://localhost:3000'`. O do storefront tem o comentário `TODO: confirmar baseURL do storefront`. `LoginPage.acessarLogin` e `HomePage.acessar` navegam com a URL absoluta. Não converta para caminho relativo e não feche o TODO.

3. **Seletores citados só na aderência.** A seção 3.2 da arquitetura e os Page Objects param em `getByRole`, `getByLabel`, `getByPlaceholder` e `getByTestId`. `docs/aderencia.md` também mostra `getByText`, seletor por `href`, `data-mission-code` e `data-testid="mission-LP-0127A"`, em vários casos como solicitação de mudança na aplicação, não como DOM verificado. Não adote esses seletores sem vê-los na tela ou num Page Object existente.

4. **Título do teste.** A suíte inteira usa `Deve` ou `Não deve`. Os cenários em `docs/storefront.md` não usam esse prefixo. Não invente o prefixo e não reescreva o Gherkin. Pergunte o título.

5. **Limpeza depois do teste.** Não existe `test.afterEach`. Os specs limpam antes, com `clearMission` ou `clearAndInsertMission`, e o teste de cadastro com sucesso deixa a missão gravada. A arquitetura pede ID exclusivo e proíbe, no storefront, asserção por contagem ou posição. Não crie `afterEach` para "fechar" esse ponto.

6. **`expect` dentro do Page Object.** Há `expect` em `LoginPage.acessarLogin` e em `RegisterPage.submit`. `DashPage`, `Navbar`, `HomePage` e `Toast` não têm. As asserções de cenário estão nos specs. Não mova os `expect` existentes e não adicione `expect` em método novo.

7. **Estilo não unificado.** Há arquivos com 2 espaços e arquivos com 4. `playwright.config.ts` e `helpers.ts` usam ponto-e-vírgula; a maior parte da suíte não usa. Specs importam com sufixo `.ts`; `register.page.ts` importa `types` e `helpers` sem sufixo. Ao editar, copie o arquivo. Não faça uma passagem de padronização.

8. **Reserva e ticket.** Só há delete, e os tipos só têm `missionId`. Não há insert. Semear reserva ou ticket é decisão que o código não cobre.

9. **Valor de `baseId`.** Os specs usam `aurora` e `selene`. O documento de negócio do storefront cita quatro bases (Alpha, Orion, Aurora, Selene) sem o `value` da option. Não preencha outro `baseId` sem ler a option na tela.

10. **Lista do storefront por código da missão.** A arquitetura exige asserção da missão semeada, não da lista inteira. A aderência descreve a lista como `ul`/`li` e pede um identificador que, no próprio documento, ainda é solicitação. Sem um locator confirmado na tela para aquela missão, o cenário de catálogo fica bloqueado. Não invente o atributo.
