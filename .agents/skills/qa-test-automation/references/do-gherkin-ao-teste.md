# Do Gherkin ao teste

O Gherkin descreve comportamento, sem botão nem campo. A automação traduz cada parte para o código do Lunar Pass sem acrescentar regra.

A especificação pode estar colada na conversa, em texto puro, em negrito ou num arquivo que o usuário apontar. `docs/storefront.md` é especificação de negócio do storefront, não modelo de código. Não puxe dali um **Então** que o cenário pedido não tem. Regra marcada como "a investigar" não se automatiza.

## Como cada parte vira código

| Gherkin | No teste | Como neste projeto |
|---|---|---|
| **Contexto** | `test.beforeEach` | O que todos os cenários do arquivo fazem. Em `login.spec.ts`, abre o login. Em `register.spec.ts`, abre o login, autentica e espera o botão Sair. |
| **Dado** | Preparação, antes da ação | Missão: funções de `playwright/support/db.ts`. Pela tela só quando o próprio cenário pede aquela navegação. Login de Mission Control é pela tela, com o usuário já usado nos specs. |
| **Quando** | Ação | Métodos do Page Object já injetado em `{ app }`. |
| **Então** / **E** | Asserção no spec | Uma asserção para cada resultado, no locator do Page Object. |
| **Esquema do Cenário** + **Exemplos** | Um `test` por linha | A suíte não usa `test.each` nem `test.describe`. Não introduza. |
| Anotação de rastreio (regra de origem, IDs de regra) | Nada no código | Fica no resumo, se ajudar a achar o cenário. |

## Título

Os testes atuais começam com `Deve` ou `Não deve`. Os cenários de `docs/storefront.md` não usam esse prefixo.

- Se o nome do cenário já começa com `Deve` ou `Não deve`, o título do `test` é esse nome, palavra por palavra.
- Se não começa, não reescreva o cenário e não invente o prefixo. Pergunte o título e registre em `references/duvidas.md` no resumo.
- Não renomeie testes que já existem.

Um arquivo de spec por funcionalidade, ao lado dos specs do módulo: `login.spec.ts`, `register.spec.ts`, `home.spec.ts`.

## Quando o cenário não fecha

| Situação | O que fazer |
|---|---|
| O **Então** não diz o que verificar | Pergunte antes de escrever |
| O **Então** descreve uma mensagem sem o texto exato | Use o texto visto na tela e marque no resumo: "texto observado, não definido na especificação" |
| O **Quando** é uma ação que a tela impede | Não force o clique. Verifique o estado que impede a ação |
| O **Então** não aparece na tela | Automatize só o que for verificável, no elemento mais próximo, e registre a divergência como pergunta |
| O **Dado** pede estado que `db.ts` não cria (reserva ou ticket semeado, por exemplo) | Pare e pergunte. Não crie função de insert por analogia |
| O cenário depende de regra em aberto | Não automatize |
| A tela diverge do **Então** | O teste fica falhando. Reporte esperado e observado |
