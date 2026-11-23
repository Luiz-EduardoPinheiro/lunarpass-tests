# Funcionalidade: Busca de Missões

### Cenário: Buscar missões para todas as bases lunares disponíveis


**Dado** que o catálogo de missões da Lunar Pass está disponível  
**Quando** eu busco missões sem aplicar filtro de base lunar  
**Então** eu visualizo missões com destino a qualquer uma das quatro bases (Alpha, Orion, Aurora e Selene)  
**E** os resultados são ordenados pela data de partida mais próxima

### Cenário: Buscar missões filtrando por uma base específica


**Dado** que o catálogo de missões da Lunar Pass está disponível  
**Quando** eu aplico o filtro pela Base Lunar Alpha  
**Então** a lista exibe apenas missões com destino à Base Lunar Alpha  
**E** o resumo indica quais filtros estão ativos e a quantidade de resultados

### Cenário: Lidar com ausência de missões para os filtros


**Dado** que o catálogo de missões da Lunar Pass está disponível  
**E** que não existem missões vigentes para a Base Lunar Aurora  
**Quando** eu aplico o filtro por essa base  
**Então** eu sou avisado de que nenhuma missão atende aos filtros  
**E** visualizo um atalho para limpar a busca e ver todas as missões

### Cenário: Missão esgotada aparece nos resultados sem opção de reserva


**Dado** que o catálogo de missões da Lunar Pass está disponível  
**E** que existe uma missão para a Base Lunar Selene sem assentos disponíveis  
**Quando** eu busco por essa base  
**Então** essa missão aparece nos resultados identificada como "Esgotado"  
**E** eu não tenho a opção de iniciar a reserva para ela
