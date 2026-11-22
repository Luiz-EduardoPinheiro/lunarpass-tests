# Funcionalidade: Pagamento e Emissão do Ticket

### Cenário: Emissão de tickets com sucesso após pagamento aprovado

**Dado** que estou na etapa de pagamento com os dados dos passageiros preenchidos corretamente  
**Quando** eu submeto um pagamento com um cartão de crédito válido
**Então** minha reserva é confirmada com um código de seis caracteres  
**E** é emitida uma passagem para cada passageiro associado aos assentos

### Cenário: Manter dados na tela quando o pagamento é recusado

**Dado** que estou na etapa de pagamento com os dados dos passageiros preenchidos corretamente  
**Quando** eu submeto o pagamento utilizando um cartão sem saldo ou incorreto
**Então** o pagamento não é aprovado
**E** eu permaneço na tela de pagamento com meus dados preservados para corrigir o problema

### Cenário: Bloqueio da reserva por concorrência de assentos no momento do processamento

*Regras de negócio:* se outra pessoa comprar os assentos durante o fluxo, a reserva é bloqueada no momento do pagamento.

**Dado** que estou na etapa de pagamento com os dados dos passageiros preenchidos corretamente  
**E** que os assentos da minha seleção foram confirmados por outra pessoa instantes antes  
**Quando** eu submeto o pagamento  
**Então** a minha reserva falha  
**E** eu sou avisado de que o assento acabou de ser ocupado e preciso escolher outro lugar
