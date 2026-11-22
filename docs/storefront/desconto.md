# Desconto automático na reserva

## História

**Como** passageiro do Lunar Pass  
**Quero** receber desconto ao reservar mais de um assento na mesma compra  
**Para** pagar menos pela viagem em grupo

## Regra de negócio

- 2 ou 3 assentos na mesma compra dão 5% de desconto.
- 4 assentos na mesma compra dão 10% de desconto.

## Cenários

### Cenário: Compra de 1 assento sem desconto

**Dado** que temos uma missão de USD 1,000.00 por assento  
**Quando** eu seleciono 1 único assento  
**Então** nenhum desconto deve ser aplicado na minha compra  
**E** o total da reserva deve ser de USD 1,000.00

### Cenário: Compra de 2 assentos com 5% de desconto

**Dado** que temos uma missão de USD 1,000.00 por assento  
**Quando** eu seleciono 2 assentos  
**Então** o desconto de 5% deve ser aplicado na minha compra  
**E** o total da reserva passa a ser de USD 1,900.00

### Cenário: Compra de 3 assentos com 5% de desconto

**Dado** que temos uma missão de USD 1,000.00 por assento  
**Quando** eu seleciono 3 assentos  
**Então** o desconto de 5% deve ser aplicado na minha compra  
**E** o total da reserva passa a ser de USD 2,850.00

### Cenário: Compra de 4 assentos com 10% de desconto

**Dado** que temos uma missão de USD 1,000.00 por assento  
**Quando** eu seleciono 4 assentos  
**Então** o desconto de 10% deve ser aplicado na minha compra  
**E** o total da reserva passa a ser de USD 3,600.00

### Cenário: Desconto recalculado ao desmarcar um assento

**Dado** que temos uma missão de USD 1,000.00 por assento  
**E** que eu selecionei 4 assentos  
**Quando** eu desmarco 1 assento  
**Então** o desconto aplicado é reduzido para 5%  
**E** o total da reserva passa a ser de USD 2,850.00

### Cenário: Finalização do pagamento com desconto aplicado

**Dado** que temos uma missão de USD 1,000.00 por assento  
**E** que eu selecionei 4 assentos e cadastrei os passageiros  
**Quando** eu pago a reserva com um cartão de crédito válido  
**Então** o pagamento deve ser cobrado no valor de USD 3,600.00  
**E** a confirmação da reserva deve exibir o total pago com desconto