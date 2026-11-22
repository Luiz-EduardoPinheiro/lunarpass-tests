# Funcionalidade: Passageiros

### Cenário: Aceitar nome com 3 caracteres e passaporte com 5 caracteres (mínimos válidos)

**Dado** que estou na etapa de passageiros com assentos já selecionados  
**E** eu preencho o formulário de passageiro com um nome de 3 caracteres e passaporte de 5 caracteres
**E** informo a data de nascimento sendo maior de idade com 25 anos
**Quando** Submeto os formulários
**Então** a validação retorna sucesso

### Cenário: Aceitar nome com 120 caracteres e passaporte com 30 caracteres (máximos válidos)

**Dado** que estou na etapa de passageiros com assentos já selecionados  
**E** eu preencho o formulário de passageiro com um nome de 120 caracteres e passaporte de 30 caracteres
**E** informo a data de nascimento sendo maior de idade com 25 anos
**Quando** Submeto os formulários
**Então** a validação retorna sucesso

### Cenário: Recusar nome com 2 caracteres (abaixo do limite mínimo)

**Dado** que estou na etapa de passageiros com assentos já selecionados  
**E** eu preencho o formulário de passageiro com um nome de 2 caracteres e passaporte de 15 caracteres  
**E** informo a data de nascimento sendo maior de idade com 25 anos
**Quando** Submeto os formulários
**Então** a validação retorna erro  
**E** a mensagem indica que o campo Nome é inválido e este ganha foco

### Cenário: Recusar nome com 121 caracteres (acima do limite máximo)

**Dado** que estou na etapa de passageiros com assentos já selecionados  
**E** eu preencho o formulário de passageiro com um nome de 121 caracteres e passaporte de 15 caracteres
**E** informo a data de nascimento sendo maior de idade com 25 anos
**Quando** Submeto os formulários
**Então** a validação retorna erro  
**E** a mensagem indica que o campo Nome é inválido e este ganha foco

### Cenário: Recusar passaporte com 4 caracteres (abaixo do limite mínimo)

**Dado** que estou na etapa de passageiros com assentos já selecionados  
**E** eu preencho o formulário de passageiro com um nome de 30 caracteres e passaporte de 4 caracteres  
**E** informo a data de nascimento sendo maior de idade com 25 anos
**Quando** Submeto os formulários
**Então** a validação retorna erro 
**E** a mensagem indica que o campo Passaporte é inválido e este ganha foco

### Cenário: Recusar passaporte com 31 caracteres (acima do limite máximo)

**Dado** que estou na etapa de passageiros com assentos já selecionados  
**E** eu preencho o formulário de passageiro com um nome de 30 caracteres e passaporte de 31 caracteres  
**E** informo a data de nascimento sendo maior de idade com 25 anos
**Quando** Submeto os formulários
**Então** a validação retorna erro
**E** a mensagem indica que o campo Passaporte é inválido e este ganha foco


### Cenário: Não deve permitir o cadastro de passageiro menor de idade

**Dado** que estou na etapa de passageiros com assentos já selecionados  
**E** eu preencho o formulário de passageiro com nome e passaporte validos
**E** informo a data de nascimento sendo menor de idade com 17 anos
**Quando** Submeto os formulários
**Então** devo ver a mensagem de alerta com o texto "O passageiro precisa ser maior de idade."

### Cenário: Deve permitir o cadastro de passageiro maior de idade

**Dado** que estou na etapa de passageiros com assentos já selecionados  
**E** eu preencho o formulário de passageiro com nome e passaporte validos
**E** informo a data de nascimento sendo maior de idade com 25 anos
**Quando** Submeto os formulários
**Então** a validação retorna sucesso