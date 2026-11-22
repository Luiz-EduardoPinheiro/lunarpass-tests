# Storefront Lunar Pass: Especificação de Aceitação

## Objetivo de negócio

Permitir que viajantes busquem missões espaciais, escolham seus assentos na cabine, informem os dados dos passageiros, realizem o pagamento e recebam o ticket de confirmação da reserva.

**Ator:** Viajante.

## Como ler este documento

- Os cenários em Gherkin são a fonte de verdade dos requisitos e critérios de aceitação.
- Cada cenário é independente: traz as regras de negócio, as pré-condições, os dados e os resultados esperados no próprio texto.
- Tudo o que não está definido está na seção **Lacunas e decisões pendentes**, no final. Nada ali foi transformado em cenário.

## Funcionalidades

- [Busca de Missões](./busca-de-missoes.md)
- [Mapa de Assentos](./mapa-de-assentos.md)
- [Desconto automático na reserva](./desconto.md)
- [Passageiros](./passageiros.md)
- [Pagamento e Emissão do Ticket](./pagamento-e-emissao-do-ticket.md)

---

## Lacunas e decisões pendentes

Nenhum item abaixo foi resolvido ou transformado em cenário. Permanecem em aberto até decisão.

### Registradas na documentação de origem

| # | Pendência | Por que importa | Funcionalidade | Quem decide |
|---|---|---|---|---|
| P1 | O que acontece financeiramente no simulador se o pagamento for aprovado, mas a reserva falhar por conflito de assento? Haverá mensagem sobre estorno? | Define a experiência do viajante e a mensagem de erro correta. | Pagamento | Produto |
| P2 | Missões cuja data de partida já ocorreu continuam no catálogo? Se sim, é possível comprar passagem para o passado? Não há regra de negócio definida. | Evita reservas ilógicas caso não exista expiração automática. | Busca de Missões | Produto |
| P3 | Existe retenção temporária (lock) dos assentos enquanto o viajante preenche o checkout? A documentação de origem registrou a hipótese de que o assento fica livre para concorrência até o momento exato do pagamento. Essa hipótese não está validada e não é critério de aceitação. | Impacta a quantidade de cenários de concorrência e a arquitetura. | Assentos e Pagamento | Produto e DEV |
| P4 | Existe cancelamento de reservas prontas? Se existir, missões esgotadas poderiam reabrir vagas. O texto não cita essa jornada. | Define se é preciso tratar missões que voltam a ter lugares. | N/A | Produto |

### Identificadas durante a refatoração

| # | Lacuna | Detalhe |
|---|---|---|
| L1 | Busca com as quatro bases selecionadas | A regra de busca diz que selecionar todas as bases equivale a não selecionar nenhuma (a especificação de origem previa 0, 1 e 4 bases), mas só há cenários para nenhuma e para uma base. |
| L2 | Seleção de exatamente 1 assento | A especificação de origem previa 0, 1 e 4 assentos, mas só há cenários para 0 e 4. |
| L3 | Cartões de teste | Os números dos cartões de teste e o que cada um define não estão documentados. A especificação de origem previa o status "Negado", sem cenário correspondente. A frase "demais válidos dão erro de dados" não esclarece quais cartões entram nessa regra. |
| L4 | Textos das mensagens | O texto exato de cada aviso e mensagem de erro (ausência de missões, assento ocupado, validação de campo, pagamento recusado, concorrência) não está documentado. Os cenários descrevem apenas o sentido da mensagem. |
| L5 | Valores | O preço dos assentos e o valor total calculado não estão documentados. |
| L6 | Detalhes sem regra de negócio documentada | Estes itens aparecem somente nos cenários originais: ordenação por data de partida mais próxima, resumo de filtros ativos com quantidade de resultados, atalho para limpar a busca, código de reserva de seis caracteres, uma passagem por passageiro, aviso de cobrança simulada, dados preservados na tela de pagamento e foco no campo inválido. Foram mantidos como estavam e precisam de confirmação do Produto. |
| L7 | Nome e passaporte em maiúsculas | A regra de passaporte diz que ele é salvo em uppercase, mas não há cenário que o verifique nem dados concretos (nomes e passaportes) além do tamanho em caracteres. |
| L8 | Missões "vigentes" | O cenário de ausência de missões usa o termo "vigentes", cujo significado depende de P2. |
