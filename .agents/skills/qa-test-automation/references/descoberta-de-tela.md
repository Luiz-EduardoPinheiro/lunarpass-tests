# Descoberta de tela

O cenário diz o que acontece. A tela em `http://localhost:3000` diz como. Percorra o caminho antes de criar locator.

## Procedimento

1. Confirme que `http://localhost:3000` responde. Se não responder, pare. Não invente tela, não habilite o `webServer` comentado em `playwright.config.ts` e não procure um comando de start: `package.json` não tem script.
2. Abra o caminho do cenário com o Playwright MCP, em janela visível.
3. Leia o snapshot de acessibilidade de cada tela: papel, nome acessível, rótulo, placeholder e `data-testid` que já existirem.
4. Execute as ações do **Quando** para ver a tela do **Então**.
5. Anote, por tela, a URL observada e o locator de cada elemento que o cenário usa.
6. Feche a aba ao terminar.

Caminhos já usados nos Page Objects, com URL absoluta:

- Storefront: `http://localhost:3000/`
- Login do Mission Control: `http://localhost:3000/mission-control/login`

Qualquer outro caminho só entra no código depois de visto. O `baseURL` do config não substitui essa observação: os `goto` atuais não usam caminho relativo. Ver `references/duvidas.md`.

Se o Playwright MCP não estiver disponível nesta conversa, diga isso e pare a descoberta. Não substitua por outro automatizador de navegador.

## Credenciais e dados na exploração

- Mission Control autenticado: o e-mail e a senha já escritos em `playwright/e2e/mission-control/login.spec.ts` e `register.spec.ts`. Não crie usuário.
- E-mail tratado como não cadastrado na suíte: `luiz@lunarpass.dev`.
- Missão de exploração: crie com as funções de `db.ts`, com um ID que nenhum spec usa, e apague com `clearMission` ao terminar a descoberta.
- Não conclua reserva nem pagamento só para olhar a tela seguinte, se o cenário não pede isso.

## Locator

Ordem de `docs/arquitetura.md`, seção 3.2, igual à suíte:

| Ordem | Locator | Uso na suíte |
|---|---|---|
| 1 | `getByRole(papel, { name })` | Botão, link, heading, textbox, spinbutton, alert |
| 2 | `getByLabel(rótulo)` | Select "Base lunar" em `RegisterPage` |
| 3 | `getByPlaceholder(texto)` | E-mail e senha em `LoginPage` |
| 4 | `getByTestId(id)` | `mission-form-return-date` em `RegisterPage` |

`docs/aderencia.md` também cita `getByText`, `href`, `data-mission-code` e `data-testid` no formato `mission-LP-0127A`. Vários desses trechos estão na seção **Solicitação**, não como DOM confirmado. Não use nenhum deles sem ter visto o atributo no snapshot ou num Page Object já commitado. Se a ordem da arquitetura não identificar o elemento, registre a lacuna e pergunte. Não desça para XPath, `/..` nem classe CSS.

## O que o snapshot precisa esclarecer

- Botão desabilitado: o snapshot pode omitir o estado. Confira antes de planejar o clique.
- Texto que muda: anote o texto de cada estado que o cenário usa.
- Contraprova: se a asserção é um estado (alerta visível, botão desabilitado), confirme na tela que o estado oposto existe, para a asserção não passar por acaso.
- Lista de missões do storefront: a aderência registra que hoje não há, na descrição do documento, um gancho estável por código da missão. Confirme na tela. Sem um locator que aponte para a missão daquele teste, não escreva asserção de lista.
