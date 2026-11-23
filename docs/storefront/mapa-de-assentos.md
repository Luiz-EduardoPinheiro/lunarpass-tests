# Funcionalidade: Mapa de Assentos

### Cenário: Impedir o avanço sem seleção mínima de assentos


**Dado** que estou no mapa de assentos de uma missão com vagas  
**Quando** eu tento avançar para a etapa de passageiros sem escolher nenhum assento  
**Então** o sistema não permite o avanço  
**E** eu sou instruído a selecionar pelo menos um lugar na cabine

### Cenário: Avançar com seleção máxima de assentos permitida


**Dado** que estou no mapa de assentos de uma missão com vagas  
**Quando** eu seleciono todos os quatro assentos disponíveis (A1, A2, B1 e B2)  
**Então** o valor total é calculado para os quatro passageiros  
**E** eu consigo avançar para a identificação dos passageiros

### Cenário: Tentar selecionar assento já ocupado


**Dado** que estou no mapa de assentos de uma missão com vagas  
**E** que o assento A1 já foi comprado em outra reserva  
**Quando** eu tento selecionar o assento A1  
**Então** a seleção não é efetuada  
**E** eu sou avisado de que o lugar está ocupado e preciso escolher outro
