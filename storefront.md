# Storefront Lunar Pass: Especificação por Exemplos

**Origem:** [storefront-rfs.md](file:///c:/Metodo-ADT/lunarpass-tests/docs/storefront-rfs.md)

---

# Etapa 1: Análise dos artefatos

## Resumo

- **Objetivo de negócio:** Permitir que viajantes busquem missões espaciais, escolham seus assentos na cabine do foguete, informem os dados dos passageiros, realizem o pagamento e recebam o ticket de confirmação da reserva.
- **Atores e perfis:**
  - **Viajante:** cliente final que realiza a busca, seleciona assentos, cadastra passageiros e efetua o pagamento.
  - **Outro viajante (concorrente):** ator externo que disputa simultaneamente os mesmos assentos em tempo real.
- **Artefatos analisados:** `docs/storefront-rfs.md` (especificação de aceitação prévia contendo regras, cenários preliminares e lacunas registradas).

## Regras identificadas

| # | Regra ou informação | Classe | Origem | Observação |
|---|---|---|---|---|
| R1 | Existem 4 bases lunares disponíveis: Alpha, Orion, Aurora e Selene. As missões são de ida e volta, com duração de 7 dias. | Explícita | Seção Busca | Bases fixas e duração padronizada de missão. |
| R2 | Uma busca sem seleção de bases (ou com todas selecionadas) retorna missões para todas as 4 bases lunares. | Explícita | Seção Busca | Selecionar 0 ou 4 bases produz exatamente o mesmo resultado. |
| R3 | Os resultados da busca de missões são ordenados pela data de partida mais próxima. | Explícita | Seção Busca | Critério padrão de ordenação temporal. |
| R4 | Filtrar por uma base específica exibe apenas missões com destino a ela, exibindo resumo dos filtros ativos e contagem de resultados. | Explícita | Seção Busca | Comportamento do filtro individual de base. |
| R5 | Quando não houver missões disponíveis para os filtros aplicados, o viajante é avisado e visualiza um atalho para limpar a busca e ver todas as missões. | Explícita | Seção Busca | Tratamento do estado vazio da busca com recuperação rápida. |
| R6 | Missões totalmente ocupadas aparecem nos resultados identificadas como "Esgotado" e não oferecem opção de iniciar reserva. | Explícita | Seção Busca | Visibilidade de missões sem assentos disponíveis. |
| R7 | Cada missão possui no máximo 4 assentos na cabine do foguete (A1, A2, B1 e B2). | Explícita | Seção Assentos | Capacidade física máxima fixa da cabine. |
| R8 | Os assentos possuem três estados: disponível, selecionado e ocupado. | Explícita | Seção Assentos | Estados do ciclo de vida dos assentos. |
| R9 | O avanço para a identificação dos passageiros exige a seleção de pelo menos 1 assento; avançar sem assento é bloqueado com instrução corretiva. | Explícita | Seção Assentos | Limite inferior da seleção de assentos. |
| R10 | É permitido selecionar até todos os 4 assentos disponíveis da cabine, calculando o valor total para os 4 passageiros e permitindo avançar. | Explícita | Seção Assentos | Limite superior da seleção de assentos (cabine cheia). |
| R11 | Selecionar exatamente 1 assento permite avançar e calcula o valor para 1 passageiro. | Derivável | R9 + R10 | Decorre logicamente da exigência de "pelo menos um lugar" e do cálculo individual por passageiro. |
| R12 | Assentos com estado "ocupado" não podem ser selecionados; a tentativa é bloqueada com aviso de que o lugar já está reservado. | Explícita | Seção Assentos | Transição de estado proibida na cabine. |
| R13 | O Nome do passageiro deve ter de 3 a 120 caracteres. | Explícita | Seção Passageiros | Regra de validação de tamanho do campo Nome. |
| R14 | O Passaporte do passageiro deve ter de 5 a 30 caracteres. | Explícita | Seção Passageiros | Regra de validação de tamanho do campo Passaporte. |
| R15 | O Passaporte do passageiro é salvo em letras maiúsculas (uppercase). | Explícita | Seção Passageiros | Regra de formatação e persistência do documento. |
| R16 | Dados de passageiro fora das faixas de caracteres são recusados com aviso indicando o campo inválido. | Explícita | Seção Passageiros | Tratamento de dados inválidos de passageiros. |
| R17 | A quantidade de passageiros a preencher corresponde à quantidade de assentos selecionados. | Derivável | R10 + R18 | Justificativa: cada passageiro é associado a um assento e recebe uma passagem individual. |
| R18 | Pagamento aprovado com cartão de crédito válido confirma a reserva com um código de seis caracteres e emite uma passagem por passageiro. | Explícita | Seção Pagamento | Conclusão do fluxo principal com sucesso. |
| R19 | Pagamento recusado (cartão incorreto ou sem saldo) mantém o viajante na tela com os dados preservados para correção. | Explícita | Seção Pagamento | Tratamento de erro de pagamento sem perda de contexto preenchido. |
| R20 | Se os assentos selecionados forem confirmados por outra pessoa antes da finalização, a reserva falha e avisa que o assento acabou de ser ocupado. | Explícita | Seção Pagamento | Tratamento de concorrência no momento do processamento. |
| R21 | Tratamento financeiro (estorno/cancelamento) caso ocorra aprovação de cartão concomitante a conflito de assentos. | A investigar | Seção Pendências (P1) | Sem definição de regra de negócio no simulador financeiro. |
| R22 | Exibição de missões passadas no catálogo e definição de missões "vigentes". | A investigar | Seção Pendências (P2, L8) | Não há definição se viagens anteriores à data atual continuam no catálogo. |
| R23 | Existência de bloqueio temporário (lock) de assentos durante a navegação pelo checkout. | A investigar | Seção Pendências (P3) | Hipótese não validada pelo negócio; atualmente assento fica vulnerável até o pagamento. |
| R24 | Política de cancelamento de reservas prontas e reabertura de vagas. | A investigar | Seção Pendências (P4) | Fluxo pós-venda não mencionado nos artefatos. |
| R25 | Tabela de cartões de teste e regras específicas para cada status de simulação. | A investigar | Seção Pendências (L3) | Não há catálogo formal dos números de cartão válidos/recusados. |
| R26 | Textos exatos das mensagens e alertas do sistema. | A investigar | Seção Pendências (L4) | Artefato original descreve apenas o sentido semântico das mensagens. |
| R27 | Valores monetários dos assentos, taxas e moeda utilizada. | A investigar | Seção Pendências (L5) | Artefato não informa o preço unitário de cada missão/assento. |

## Ambiguidades, lacunas e contradições

- **Ausência de política de expiração de missões passadas (P2/L8):** O documento cita "missões vigentes", mas não define se missões passadas devem ser ocultadas ou se podem ser compradas.
- **Conflito concorrencial vs cobrança (P1):** Não está definido se o gateway cobra antes ou depois de alocar o assento, gerando dúvida sobre estorno na concorrência.
- **Inexistência de Lock temporário (P3):** O viajante pode preencher passageiros e dados de cartão para descobrir no último clique que perdeu o assento.
- **Regra de uppercase do passaporte sem exemplo prático (L7):** Afirma que salva em maiúsculas, mas não trazia cenário ou critério se a conversão é automática em tela ou na persistência.
- **Detalhamento de tela acoplado nos critérios originais:** O artefato original citava "este ganha foco". Em nível de negócio, o foco visual é detalhe de UI/acessibilidade; o requisito de negócio é a identificação clara de qual campo contém erro.

---

# Etapa 2: Mapa de variantes

| # | Variante (o que muda o comportamento) | Eixo | Regra de origem | Técnica | Decisão |
|---|---|---|---|---|---|
| V1 | Busca de missões sem nenhum filtro aplicado | Dados | R1, R2, R3 | Classes de equivalência | Cenário |
| V2 | Busca de missões filtrando por uma base com missões (ex: Alpha) | Dados | R1, R4 | Classes de equivalência | Cenário |
| V3 | Busca de missões com as quatro bases marcadas | Dados | R2 | Classes de equivalência | Descartada: equivalente à V1 (R2 estabelece mesmo resultado) |
| V4 | Busca de missões filtrando por base sem missões vigentes | Estado inicial | R5 | Classes de equivalência (vazio) | Cenário |
| V5 | Missão no catálogo com todos os assentos ocupados (esgotada) | Estado inicial | R6 | Classes de equivalência | Cenário |
| V6 | Tentar avançar no mapa de assentos com 0 assentos selecionados | Dados / Limite | R9 | Valores-limite (logo abaixo) | Cenário |
| V7 | Avançar no mapa de assentos com 1 assento selecionado | Dados / Limite | R9, R11 | Valores-limite (mínimo válido) | Cenário (Hipótese derivável) |
| V8 | Avançar no mapa de assentos com 4 assentos selecionados (cabine cheia) | Dados / Limite | R10 | Valores-limite (máximo válido) | Cenário |
| V9 | Tentar selecionar um assento com estado "ocupado" | Estado inicial | R8, R12 | Transição de estado proibida | Cenário |
| V10 | Desmarcar um assento previamente selecionado | Desfazer | R8 | Transição de estado | Investigar (P5 - comportamento ao desmarcar) |
| V11 | Passageiro com Nome no limite inferior (3 caracteres) e Passaporte mínimo (5 caracteres) | Dados / Limite | R13, R14 | Valores-limite (fronteira válida) | Esquema |
| V12 | Passageiro com Nome no limite superior (120 caracteres) e Passaporte máximo (30 caracteres) | Dados / Limite | R13, R14 | Valores-limite (fronteira válida) | Esquema |
| V13 | Passageiro com Nome abaixo do limite mínimo (2 caracteres) | Dados / Limite | R13, R16 | Valores-limite (fronteira inválida) | Esquema |
| V14 | Passageiro com Nome acima do limite máximo (121 caracteres) | Dados / Limite | R13, R16 | Valores-limite (fronteira inválida) | Esquema |
| V15 | Passageiro com Passaporte abaixo do limite mínimo (4 caracteres) | Dados / Limite | R14, R16 | Valores-limite (fronteira inválida) | Esquema |
| V16 | Passageiro com Passaporte acima do limite máximo (31 caracteres) | Dados / Limite | R14, R16 | Valores-limite (fronteira inválida) | Esquema |
| V17 | Passaporte informado com letras minúsculas | Dados | R15 | Transformação de dado | Cenário (Hipótese derivável) |
| V18 | Pagamento submetido com cartão de crédito válido e saldo suficiente | Dados | R18 | Fluxo principal | Cenário |
| V19 | Pagamento submetido com cartão com saldo insuficiente ou dados incorretos | Falhas | R19 | Fluxo de exceção | Cenário |
| V20 | Assento selecionado é comprado por outro viajante antes da submissão do pagamento | Concorrência | R20 | Concorrência de recursos | Cenário |
| V21 | Assentos intermediários (seleção de 2 ou 3 assentos) | Dados | R7, R10 | Classes de equivalência | Descartada: coberta entre os limites 1 e 4 |
| V22 | Estorno de valor cobrado após concorrência confirmada | Falhas | R21 | Concorrência financeira | Investigar (P1) |
| V23 | Pesquisa de missões anteriores à data atual | Tempo | R22 | Tempo e validade | Investigar (P2) |
| V24 | Bloqueio temporário (reserva temporária por 10 min) | Tempo / Estado | R23 | Concorrência preventiva | Investigar (P3) |

---

# Etapa 3: Técnicas de design de testes aplicadas

- **Classes de equivalência:**
  - *Filtro de busca:* Classe sem filtro (V1, retornando todas as bases) e classe com filtro específico (V2, filtrando apenas a base escolhida). A busca com as quatro bases marcadas (V3) foi descartada por pertencer à mesma partição de equivalência de V1, conforme explicitado na regra R2.
  - *Meio de pagamento:* Classe válida (V18, cartão aceito com sucesso) e classe inválida (V19, cartão com dados incorretos ou sem limite).
- **Valores-limite:**
  - *Seleção de assentos (faixa de 1 a 4):* 0 assentos (V6, logo abaixo, bloqueado); 1 assento (V7, limite mínimo válido); 4 assentos (V8, limite máximo da cabine). A seleção de 2 e 3 assentos (V21) foi descartada por estar contida no interior da partição válida.
  - *Tamanho do Nome (faixa de 3 a 120 caracteres):* 2 caracteres (V13, logo abaixo, inválido); 3 caracteres (V11, limite inferior válido); 120 caracteres (V12, limite superior válido); 121 caracteres (V14, logo acima, inválido).
  - *Tamanho do Passaporte (faixa de 5 a 30 caracteres):* 4 caracteres (V15, logo abaixo, inválido); 5 caracteres (V11, limite inferior válido); 30 caracteres (V12, limite superior válido); 31 caracteres (V16, logo acima, inválido).
- **Transição de estados:**
  - *Ciclo dos assentos:* Um assento no estado "ocupado" não permite transição para "selecionado" (V9 - transição proibida).
- **Tratamento de concorrência e exceções:**
  - Assento disponível que passa a ocupado por outro viajante durante o checkout gera falha no momento do pagamento (V20).
  - Pagamento recusado preserva dados na tela para evitar retrabalho de digitação (V19).

---

# Etapa 4: Especificação em Gherkin Declarativo

**Origem:** [storefront-rfs.md](file:///c:/Metodo-ADT/lunarpass-tests/docs/storefront-rfs.md)

**Funcionalidade:** Busca de missões espaciais  
**Como** viajante espacial,  
**eu quero** pesquisar e filtrar missões lunares,  
**para que** eu encontre o destino e a data ideal para minha viagem.

**Contexto:**  
**Dado** que o catálogo de missões da Lunar Pass está disponível

### Caminho principal

**Cenário:** Buscar missões sem aplicar filtros  
*Regra de origem: R1, R2, R3*  
**Quando** eu busco missões sem aplicar nenhum filtro de destino  
**Então** eu devo ver missões com destino a todas as quatro bases lunares: Alpha, Orion, Aurora e Selene  
**E** as missões devem ser apresentadas ordenadas pela data de partida mais próxima

**Cenário:** Filtrar missões por uma base lunar específica  
*Regra de origem: R1, R4*  
**Quando** eu filtro as missões com destino à Base Lunar Alpha  
**Então** eu devo ver apenas missões com destino à Base Lunar Alpha  
**E** o resumo da busca deve indicar que o filtro para a Base Lunar Alpha está ativo junto com o total de missões encontradas

### Exceções e casos limite

**Cenário:** Buscar missões para uma base sem voos disponíveis  
*Regra de origem: R5*  
**Dado** que não existem missões vigentes cadastradas para a Base Lunar Aurora  
**Quando** eu filtro as missões com destino à Base Lunar Aurora  
**Então** eu devo ser informado de que nenhuma missão foi encontrada para os filtros selecionados  
**E** eu devo ter acesso a um atalho para limpar os filtros e visualizar todas as missões

**Cenário:** Visualizar missão com cabine totalmente ocupada  
*Regra de origem: R6*  
**Dado** que existe uma missão para a Base Lunar Selene com todos os assentos ocupados  
**Quando** eu consulto as missões para a Base Lunar Selene  
**Então** essa missão deve aparecer na lista indicada como "Esgotado"  
**E** eu não devo ter a opção de iniciar uma reserva para ela

---

**Funcionalidade:** Seleção de assentos na cabine  
**Como** viajante espacial,  
**eu quero** escolher meus assentos na cabine do foguete,  
**para que** eu garanta os lugares para a minha viagem lunar.

**Contexto:**  
**Dado** que estou visualizando o mapa de assentos de uma missão com lugares livres

### Caminho principal

**Cenário:** Selecionar a capacidade máxima da cabine  
*Regra de origem: R7, R10*  
**Quando** eu seleciono todos os quatro assentos da cabine: A1, A2, B1 e B2  
**Então** o valor total da viagem deve ser calculado para os quatro passageiros  
**E** eu devo ter permissão para avançar para a identificação dos passageiros

### Cenários baseados em hipótese

**Cenário:** Selecionar o número mínimo de assentos para avançar  
*Regra de origem: R9, R11*  
*Hipótese a validar: selecionar exatamente um assento permite avançar e calcula o valor individual para um passageiro*  
**Quando** eu seleciono apenas o assento A1  
**Então** o valor total da viagem deve ser calculado para um passageiro  
**E** eu devo ter permissão para avançar para a identificação dos passageiros

### Exceções e casos limite

**Cenário:** Tentar avançar sem selecionar nenhum assento  
*Regra de origem: R9*  
**Quando** eu tento avançar para a etapa de passageiros sem escolher nenhum assento  
**Então** o sistema não deve permitir o meu avanço  
**E** eu devo ser orientado a escolher ao menos um assento na cabine

**Cenário:** Tentar selecionar um assento que já foi ocupado  
*Regra de origem: R8, R12*  
**Dado** que o assento A1 já está comprado por outra reserva  
**Quando** eu tento selecionar o assento A1  
**Então** o assento A1 não deve ser marcado como selecionado  
**E** eu devo ser informado de que o lugar já está ocupado e que preciso escolher outro

---

**Funcionalidade:** Identificação dos passageiros  
**Como** viajante espacial,  
**eu quero** informar os dados de cada passageiro,  
**para que** as passagens sejam emitidas corretamente.

**Contexto:**  
**Dado** que estou na etapa de passageiros com os assentos da cabine já selecionados

### Casos limite válidos de identificação

**Esquema do Cenário:** Validar dados de passageiro nos limites permitidos  
*Regra de origem: R13, R14*  
**Quando** eu informo um passageiro com o nome "<nome>" e passaporte "<passaporte>"  
**Então** os dados do passageiro devem ser aceitos com sucesso

**Exemplos:**

| condicao | nome | passaporte |
|---|---|---|
| Limites mínimos válidos (3 letras no nome e 5 no passaporte) | Bob | BR001 |
| Limites máximos válidos (120 letras no nome e 30 no passaporte) | Alexander Bartholomew Constantino Montgomery Fitzwilliam Carrington Harrington Livingstone Kensington Worthington Richardson | PASSAPORTE-INTERPLANETARIO-999 |

### Exceções e dados inválidos

**Esquema do Cenário:** Recusar dados de passageiro fora dos limites exigidos  
*Regra de origem: R13, R14, R16*  
**Quando** eu informo um passageiro com o nome "<nome>" e passaporte "<passaporte>"  
**Então** os dados do passageiro devem ser recusados  
**E** eu devo ser informado de que o campo "<campo_invalido>" não atende ao tamanho exigido

**Exemplos:**

| motivo | nome | passaporte | campo_invalido |
|---|---|---|---|
| Nome abaixo do mínimo (2 caracteres) | Jo | BR12345 | Nome |
| Nome acima do máximo (121 caracteres) | Alexander Bartholomew Constantino Montgomery Fitzwilliam Carrington Harrington Livingstone Kensington Worthington Richardson X | BR12345 | Nome |
| Passaporte abaixo do mínimo (4 caracteres) | John Doe | PASS | Passaporte |
| Passaporte acima do máximo (31 caracteres) | John Doe | PASSAPORTE-INTERPLANETARIO-99901 | Passaporte |

### Cenários baseados em hipótese

**Cenário:** Registrar passaporte informado em letras minúsculas  
*Regra de origem: R15*  
*Hipótese a validar: passaportes preenchidos em caracteres minúsculos são automaticamente convertidos e salvos em letras maiúsculas*  
**Quando** eu informo o passaporte "br12345" para o passageiro "John Doe"  
**Então** o passaporte do passageiro deve ser registrado como "BR12345"

---

**Funcionalidade:** Pagamento e emissão de tickets  
**Como** viajante espacial,  
**eu quero** pagar pelos assentos reservados,  
**para que** minhas passagens espaciais sejam emitidas.

**Contexto:**  
**Dado** que estou na etapa de pagamento com os dados dos passageiros devidamente preenchidos

### Caminho principal

**Cenário:** Confirmar reserva com pagamento aprovado  
*Regra de origem: R18*  
**Quando** eu realizo o pagamento utilizando um cartão de crédito válido  
**Então** minha reserva deve ser confirmada gerando um código localizador de 6 caracteres  
**E** deve ser emitida uma passagem individual para cada passageiro associado aos assentos escolhidos

### Exceções e concorrência

**Cenário:** Tratar recusa de pagamento mantendo os dados preenchidos  
*Regra de origem: R19*  
**Quando** eu tento realizar o pagamento com um cartão sem saldo ou com dados divergentes  
**Então** o pagamento não deve ser aprovado  
**E** eu devo permanecer na página de pagamento com todos os meus dados preenchidos preservados para que eu possa tentar novamente

**Cenário:** Bloquear reserva por assento tomado por concorrência antes do pagamento  
*Regra de origem: R20*  
**Dado** que outro viajante concluiu a compra dos mesmos assentos que eu havia escolhido momentos antes da minha finalização  
**Quando** eu submeto o meu pagamento  
**Então** a minha reserva não deve ser concluída  
**E** eu devo ser avisado de que os assentos acabaram de ser ocupados e que devo escolher outros lugares

---

## Rastreabilidade

| Regra | Cenários correspondentes |
|---|---|
| R1 | Buscar missões sem aplicar filtros; Filtrar missões por uma base lunar específica |
| R2 | Buscar missões sem aplicar filtros (comportamento de todas as bases coberto) |
| R3 | Buscar missões sem aplicar filtros |
| R4 | Filtrar missões por uma base lunar específica |
| R5 | Buscar missões para uma base sem voos disponíveis |
| R6 | Visualizar missão com cabine totalmente ocupada |
| R7 | Selecionar a capacidade máxima da cabine |
| R8 | Tentar selecionar um assento que já foi ocupado |
| R9 | Tentar avançar sem selecionar nenhum assento; Selecionar o número mínimo de assentos para avançar |
| R10 | Selecionar a capacidade máxima da cabine |
| R11 | Selecionar o número mínimo de assentos para avançar |
| R12 | Tentar selecionar um assento que já foi ocupado |
| R13 | Validar dados de passageiro nos limites permitidos; Recusar dados de passageiro fora dos limites exigidos |
| R14 | Validar dados de passageiro nos limites permitidos; Recusar dados de passageiro fora dos limites exigidos |
| R15 | Registrar passaporte informado em letras minúsculas |
| R16 | Recusar dados de passageiro fora dos limites exigidos |
| R17 | Coberto em conjunto nos cenários de 1 e 4 assentos com emissão de passagens |
| R18 | Confirmar reserva com pagamento aprovado |
| R19 | Tratar recusa de pagamento mantendo os dados preenchidos |
| R20 | Bloquear reserva por assento tomado por concorrência antes do pagamento |
| R21 | Pendente de definição de negócio (ver pergunta P1) |
| R22 | Pendente de definição de negócio (ver pergunta P2) |
| R23 | Pendente de definição de arquitetura/negócio (ver pergunta P3) |
| R24 | Pendente de definição de negócio (ver pergunta P4) |
| R25 | Pendente de definição de dados (ver pergunta P6) |
| R26 | Pendente de definição de copy/UX (ver pergunta P7) |
| R27 | Pendente de definição de precificação (ver pergunta P8) |

---

# Etapa 5: Revisão e Perguntas para os Três Amigos

## Revisão realizada

- **Colaboração e clareza:** O texto foi estruturado para compreensão compartilhada entre Produto, DEV e QA, eliminando termos de interface técnica (como seletores, ids, foco de formulário ou URLs).
- **Semântica Gherkin:** Todas as ações de preenchimento, submissão e escolha foram posicionadas estritamente no **Quando**. O **Dado** foi reservado para o contexto de catálogo, cabine e concorrência prévia.
- **Evitação de redundância:** Os limites de validação de formulários foram sintetizados em Esquemas de Cenários objetivos, evitando repetição desnecessária de passos idênticos.
- **Isolamento de hipóteses:** As deduções lógicas (seleção de 1 assento e conversão para maiúsculas do passaporte) foram claramente demarcadas com a tag de hipótese a validar, sem inventar regras ocultas.
- **Tratamento das lacunas:** Todas as incertezas, mensagens sem texto exato e comportamentos ausentes foram convertidos em perguntas para a reunião de Três Amigos.

## Perguntas para os Três Amigos

| # | Pergunta ou hipótese | Por que importa | Regra ou variante relacionada | Quem decide |
|---|---|---|---|---|
| P1 | Se a operadora aprovar a transação no cartão mas a reserva falhar no mesmo segundo por concorrência de assentos, como deve ser o estorno financeiro e a comunicação imediata ao cliente? | Evita cobrança indevida no cartão do cliente e define se o cancelamento da transação é síncrono. | R20, R21, V20, V22 | Produto e DEV |
| P2 | Missões cuja data de embarque já passou devem continuar listadas no catálogo de busca ou ser filtradas automaticamente por expiração? | Evita que viajantes tentem comprar passagens para missões no passado. | R1, R22, V23 | Produto |
| P3 | Devemos implementar lock temporário de assentos (ex: retenção por 10 minutos durante o checkout) ou manter o assento aberto à concorrência até a confirmação do pagamento? | O lock temporário melhora a experiência de compra, mas exige controle de sessão, fila de expiração e arquitetura de concorrência. | R8, R20, R23, V24 | Produto e DEV |
| P4 | Haverá funcionalidade de cancelamento ou remarcação de reservas? Se um viajante cancelar, os assentos devem voltar automaticamente para o estado "disponível" no catálogo? | Define se uma missão esgotada pode voltar a ter assentos vagos e se o ciclo de vida do assento é bidirecional. | R6, R8, R24 | Produto |
| P5 | No mapa de assentos, ao clicar novamente em um assento já marcado como "selecionado", ele retorna imediatamente ao estado "disponível"? | Define o fluxo de desfazer seleção de assentos na cabine antes de prosseguir. | R8, V10 | Produto e DEV |
| P6 | Quais são os números oficiais de cartão de crédito de teste do simulador para cada cenário (aprovado, saldo insuficiente, dados inválidos, erro de gateway)? | Garante determinismo para os testes automatizados e manuais. | R18, R19, R25 | DEV e QA |
| P7 | Quais serão os textos e títulos oficiais de cada mensagem do sistema (busca vazia, assento ocupado, validação de campos, recusa de pagamento e concorrência)? | O design atual descreve apenas o propósito semântico da mensagem. Textos padronizados fecham o contrato de UX. | R5, R12, R16, R19, R20, R26 | Produto e UX |
| P8 | Qual é a tabela de preços dos assentos e moedas aceitas (ex: créditos estelares ou moeda padrão), e há taxa de embarque adicional? | Define os cálculos esperados no resumo de compra e na tela de pagamento. | R10, R11, R27 | Produto |
| P9 | Hipótese: confirmar a seleção de exatamente 1 assento calcula o valor para 1 passageiro e permite prosseguir. Confere? | Sustenta a dedução de R11 para o limite inferior válido de assentos. | R9, R11, V7 | Produto |
| P10 | Hipótese: passaportes digitados em minúsculas devem ser convertidos automaticamente para maiúsculas (uppercase) antes de salvar. Confere? | Valida se a conversão é tratada automaticamente pelo sistema ou se minúsculas deveriam ser rejeitadas. | R15, V17 | Produto e DEV |

## Cenários que dependem das respostas

- **P1** → Determina se haverá cenário adicional de "Estorno automático em caso de concorrência simultânea ao pagamento".
- **P2** → Determina se haverá cenário de "Ocultar missões passadas do catálogo".
- **P3** → Determina se haverá cenários de "Reserva temporária de assento" e "Expiração do tempo de reserva do assento".
- **P4** → Determina se haverá cenários para "Reabertura de assento em missão esgotada após cancelamento".
- **P5** → Determina a escrita do cenário explícito de "Desmarcar assento selecionado".
- **P6 e P7** → Permitirão parametrizar os cenários de pagamento e mensagens com dados literais homologados.
